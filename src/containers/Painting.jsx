import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicon from 'react-ionicons';

import { START_ANGLE, END_ANGLE } from '../constants/types';
import { 
    eventZoomIncrement, 
    paintingOnCanvas,  
    eventOnColor, 
    eventOnFontSize, 
    eventOnCleaning 
} from '../actions';

import UndoRedo from './UndoRedo'

class Painting  extends Component {
    painting() {
        const canvasBody = document.getElementById('canvas');
        const ctx = canvasBody.getContext('2d');   
        canvasBody.addEventListener('mousedown', e => {
            this.props.paintingOnCanvas(true, e.offsetX, e.offsetY, "begin");
            this.props.eventOnCleaning(false);
        });
        canvasBody.addEventListener('mousemove', e => {
            let {painting, points} = this.props;
            let x = e.offsetX;
            let y = e.offsetY;

            if(painting) {
                this.props.paintingOnCanvas(painting, x, y, "draw");
                for(let item in points) {
                    ctx.fillStyle = `${points[item].color}`;
                    ctx.strokeStyle = `${points[item].color}`;
                    ctx.beginPath();
                    ctx.arc(points[item].x, points[item].y, points[item].size, START_ANGLE, END_ANGLE);
                    ctx.stroke();
                    ctx.fill();
                }
            }
        });
        canvasBody.addEventListener('mouseup', e => this.props.paintingOnCanvas(false, e.offsetX, e.offsetY, "end"));
    };
    cleaningPencil() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.addEventListener('mousedown', () => {
            this.props.paintingOnCanvas(false);
            this.props.eventOnCleaning(true);
        });
        canvas.addEventListener('mousemove', event => {
            if(this.props.cleaning) {
                let x = event.offsetX;
                let y = event.offsetY;
                ctx.clearRect(x, y, this.props.fontSize, END_ANGLE);
            }
        });
        canvas.addEventListener('mouseup', () => this.props.eventOnCleaning(false))
    };

    fontSizeChange = e => this.props.eventOnFontSize(e.target.value);

    color = e => this.props.eventOnColor(e.target.value);

    render() {
        return (
            <div className="painting">
                <div className="painting_color_size">
                    <button onClick={()=> this.painting()} title={"paint"}>
                        <Ionicon icon="ios-brush-outline" color={this.props.decor.color} fontSize="23px"/>
                    </button>
                    <button onClick={() => this.cleaningPencil()} title={"cleaning"}>
                        <Ionicon icon="ios-cube-outline" color={this.props.decor.color} fontSize="15px"/>
                    </button>
                    <input onChange={this.color} type="text" placeholder={this.props.color} maxLength="10" />
                    <input onChange={this.fontSizeChange} value={this.props.fontSize} type="number" />
                </div>
                <UndoRedo/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        decor: state.decor,
        zoom: state.zoom,
        painting: state.painting,
        points: state.points,
        redo: state.redo,
        color: state.color,
        fontSize: state.fontSize,
        cleaning: state.cleaning,
        image: state.image
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        eventZoomIncrement: eventZoomIncrement,
        paintingOnCanvas: paintingOnCanvas,
        eventOnColor: eventOnColor,
        eventOnFontSize: eventOnFontSize,
        eventOnCleaning: eventOnCleaning
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Painting);