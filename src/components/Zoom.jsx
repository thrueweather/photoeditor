import React, { Component } from 'react'
import { connect } from 'react-redux'
import Ionicon from 'react-ionicons';

class Zoom extends Component {
    render() {
        if(this.props.image) {
            return (
                <div className="zoom">
                    Zoom: 
                    <button onClick={this.props.zoomDecrement}>
                        <Ionicon icon="ios-remove-circle-outline" color={this.props.decor.color} fontSize="20px"/>
                    </button>
                    {`${this.props.zoom}%`}
                    <button onClick={this.props.zoomIncrement}>
                        <Ionicon icon="ios-add-circle-outline" color={this.props.decor.color} fontSize="20px"/>
                    </button>
                </div>
            )
        }
        return <div></div>;
    }
}

const mapStateToProps = state => {
    return {
        image: state.image,
        zoom: state.zoom,
        decor: state.decor
    }
}

export default connect(mapStateToProps, null)(Zoom)