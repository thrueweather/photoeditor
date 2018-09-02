import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeSidebar } from '../actions'

class Canvas extends Component { 
    render() {
        const stylesForImage = {
            zoom: `${this.props.zoom}%`,
            margin: 'auto'
        };

        return (
            <div className="App-image-wrapp" onMouseOver={() => this.props.closeSidebar()}>
                <canvas 
                    id="canvas" 
                    style={stylesForImage}
                    width={this.props.sizes.width}
                    height={this.props.sizes.height}>
                </canvas>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sizes: state.sizes,
        zoom: state.zoom,
        disclosureSidebar: state.disclosureSidebar
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        closeSidebar: closeSidebar
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);