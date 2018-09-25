import React, { Component } from 'react'
import { connect } from 'react-redux';
import Ionicon from 'react-ionicons';

class SaveReset extends Component {
    render() {
        return (
            <div className="save_reset" style={this.props.image ? {opacity: '1'} : {opacity: '0.5', cursor: 'not-allowed'}}>
                <button onClick={this.props.resetImage} title={'reload image filters'}>
                    <Ionicon icon="ios-refresh-circle-outline" color={this.props.decor.color} fontSize="23px"/>
                </button>
                <button className="save" onClick={this.props.openWindow} title={'save'}>
                    <Ionicon icon="ios-cloud-download-outline" color={this.props.decor.color} fontSize="23px"/>
                </button>
                <button onClick={this.props.cleaning} title={"in trash"}>
                    <Ionicon icon="ios-trash" color={this.props.decor.color} fontSize="23px"/>
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        image: state.image,
        decor: state.decor,
        sizes: state.sizes
    }
}

export default connect(mapStateToProps, null)(SaveReset)