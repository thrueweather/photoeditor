export const openSidebar = () => {
    return {
        type: 'OPEN_SIDEBAR'
    }
}

export const eventDecor = (bg, clr) => {
    return {
        type: 'EVENT_ON_DECOR',
        background: bg,
        color: clr
    }
}

export const closeSidebar = () => { 
    return { 
        type: 'CLOSE_SIDEBAR' 
    }
}

export const uploadImage = link => {
    return {
        type: 'UPLOAD_IMAGE',
        text: link
    }
}

export const imageSizes = (iw, ih, cw, ch) => {
    return {
        type: 'IMAGE_SIZES',
        imageWidth: iw,
        imageHeight: ih,
        canvasWidth: cw,
        canvasHeight: ch
    }
}

export const uploadFilters = data => {
    return {
        type: 'UPLOAD_FILTERS',
        filter: data
    }
}

export const canvasWidth = x => {
    return {
        type: 'CANVAS_WIDTH',
        width: x
    }
}

export const canvasHeight = y => {
    return {
        type: 'CANVAS_HEIGHT',
        height: y
    }
}

export const eventZoomIncrement = event => {
    return {
        type: 'ZOOM_INCREMENT',
        increment: event
    }
}

export const eventZoomDecrement = event => {
    return {
        type: 'ZOOM_DECREMENT',
        decrement: event
    }
}

export const paintingOnCanvas = (painting, mouseX, mouseY, str) => {
    return {
        type: 'PAINTING_ON_CANVAS',
        boolean: painting,
        x: mouseX,
        y: mouseY,
        mode: str
    }
}

export const undoLastPoint = () => {
    return {
        type: 'UNDO_PAINTING'
    }
}

export const redoLastPoint = () => {
    return {
        type: 'REDO_PAINTING'
    }
}

export const eventOnColor = value => {
    return {
        type: 'PAINT_COLOR',
        color: value
    }
}

export const eventOnFontSize = value => {
    return {
        type: 'PAINT_FONT_SIZE',
        size: value
    }
}

export const eventOnCleaning = cleaning => {
    return {
        type: 'CLEANING_PAINT',
        payload: cleaning
    }
}

export const reloadCanvas = () => {
    return {
        type: 'CLEAR_ARRAY_POINTS'
    }
}