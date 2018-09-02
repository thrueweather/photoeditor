export const DEFAULT_FILTERS = [
    {name: 'brightness', default: 100, max: 200, em: '%'},
    {name: 'saturate', default: 100, max: 200, em: '%'},
    {name: 'contrast', default: 100, max: 200, em: '%'},
    {name: 'sepia', default: 0, max: 100, em: '%'},
    {name: 'opacity', default: 100, max: 100, em: '%'},
    {name: 'grayscale', default: 0, max: 100, em: '%'},
    {name: 'invert', default: 0, max: 100, em: '%'},
    {name: 'blur', default: 0, max: 100, em: 'px'}
];
export const START_ANGLE = 0;
export const END_ANGLE = Math.PI * 2;
export const INITIAL_ZOOM = 100;
export const ZOOM_COEFFICIENT = 0.5;
export const ZOOM_STEP = 5;
export const MAX_ZOOM = 20;