import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Ionicon from 'react-ionicons';

import { undoLastPoint, redoLastPoint } from '../actions'

import { START_ANGLE, END_ANGLE } from '../constants/types';

class UndoRedo extends Component {
    eventOnUndo() {
        const canvasBody = document.getElementById('canvas');
        const ctx = canvasBody.getContext('2d');
        let {points} = this.props;

        ctx.clearRect(0, 0, canvasBody.width, canvasBody.height);

        this.props.undoLastPoint();

        for(let item in points) {
            ctx.fillStyle = `${points[item].color}`;
            ctx.strokeStyle = `${points[item].color}`;
            ctx.beginPath();
            ctx.arc(points[item].x, points[item].y, points[item].size, START_ANGLE, END_ANGLE);
            ctx.stroke();
            ctx.fill();
        }
    };

    eventOnRedo() {
        const canvasBody = document.getElementById('canvas');
        const ctx = canvasBody.getContext('2d');
        let {redo} = this.props;

        ctx.clearRect(0, 0, canvasBody.width, canvasBody.height);

        this.props.redoLastPoint();
        
        for(let item in redo) {
            ctx.fillStyle = `${redo[item].color}`;
            ctx.strokeStyle = `${redo[item].color}`;
            ctx.beginPath();
            ctx.arc(redo[item].x, redo[item].y, redo[item].size, START_ANGLE, END_ANGLE);
            ctx.stroke();
            ctx.fill();
        }
    };

    render() {
        let visibleBlock = !this.props.image ? {display: 'block'} : {display: 'none'};
        let visibleUndo = (this.props.points.length && this.props.redo.length);
        let visibleRedo = (this.props.points.length < this.props.redo.length);

        return (
            <div style={visibleBlock}>
                {visibleUndo
                ? <button onClick={() => this.eventOnUndo()}>
                    <Ionicon icon="ios-undo-outline" color={this.props.decor.color} fontSize="23px"/>
                    </button> 
                : <div></div>}
                {visibleRedo
                ? <button onClick={() => this.eventOnRedo()}>
                    <Ionicon icon="ios-redo-outline" color={this.props.decor.color} fontSize="23px"/>
                    </button>
                : <div></div>}
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
        undoLastPoint: undoLastPoint,
        redoLastPoint: redoLastPoint
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo)