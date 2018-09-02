import * as types from '../constants/actionTypes.js';
import { INITIAL_ZOOM } from '../constants/types';

const initialState = {
    disclosureSidebar: false,
    decor: {background: "white", color: 'black'},
    image: '',
    sizes: {
        image: {
            width: 0,
            height: 0
        },
        width: window.innerWidth,
        height: window.innerHeight
    },
    filters: [
        {name: 'brightness', default: 100, max: 200, em: '%'},
        {name: 'saturate', default: 100, max: 200, em: '%'},
        {name: 'contrast', default: 100, max: 200, em: '%'},
        {name: 'sepia', default: 0, max: 100, em: '%'},
        {name: 'opacity', default: 100, max: 100, em: '%'},
        {name: 'grayscale', default: 0, max: 100, em: '%'},
        {name: 'invert', default: 0, max: 100, em: '%'},
        {name: 'blur', default: 0, max: 100, em: 'px'}
    ],
    zoom: 100, 
    points: [],
    redo: [],
    painting: false,
    color: 'black',
    fontSize: 6, 
    cleaning: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.OPEN_SIDEBAR:
            return {...state, disclosureSidebar: true};
        case types.CLOSE_SIDEBAR:
            return {...state, disclosureSidebar: false};
        case types.EVENT_ON_DECOR:
            let switchBackgroung = document.body.style.background = action.background;
            let switchColor = document.body.style.color = action.color;
            return {
                ...state,
                decor: {
                    background: switchBackgroung,
                    color: switchColor
                }
            };
        case types.UPLOAD_IMAGE: 
            return {...state, image: action.text}
        case types.UPLOAD_FILTERS:
            return {...state, filters: action.filter};
        case types.IMAGE_SIZES:
            return {
                ...state,
                sizes: {
                    image:  {
                        width: action.imageWidth,
                        height: action.imageHeight
                    },
                    width: action.canvasWidth,
                    height: action.canvasHeight
                }
            };
        case types.CANVAS_WIDTH:
            return {
                ...state,
                sizes: {
                    width: action.width,
                    height: state.sizes.height,
                    image: {
                        width: action.width,
                        height: state.sizes.height
                    }
                }
            };
        case types.CANVAS_HEIGHT:
            return {
                ...state,
                sizes: {
                    width: state.sizes.width,
                    height: action.height,
                    image: {
                        width: state.sizes.width,
                        height: action.height
                    } 
                }
            };
        case types.ZOOM_INCREMENT:
            return {...state, zoom: state.zoom + action.increment};
        case types.ZOOM_DECREMENT:
            return {...state, zoom: state.zoom - action.decrement};
        case types.PAINTING_ON_CANVAS:
            return {
                ...state, 
                zoom: INITIAL_ZOOM, 
                painting: action.boolean,
                points: state.painting ? [...state.points].concat({
                    size: state.fontSize,
                    color: state.color,
                    x: action.x,
                    y: action.y,
                    mode: action.mode
                }) : state.points,
                redo: [...state.points]
            };
        case types.UNDO_PAINTING:
            let pop = [...state.points].slice(0, state.points.length - 10);
            return {...state, points: pop};
        case types.REDO_PAINTING:
            return {
                ...state, 
                points: [...state.points].splice().concat(...state.redo),
                redo: [...state.redo].splice().concat(...state.redo)
            };
        case types.CLEAR_ARRAY_POINTS:
            return {...state, points: [], redo: []};
        case types.PAINT_COLOR:
            return {...state, color: action.color};
        case types.PAINT_FONT_SIZE: 
            return {...state, fontSize: action.size};
        case types.CLEANING_PAINT:
            return {...state, cleaning: action.payload};
        default:
            return state;
    }  
};

export default reducer;