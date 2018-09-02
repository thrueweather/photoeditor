import React, {Component}  from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicon from 'react-ionicons';

import { eventDecor } from '../actions'

class ThemeController extends Component {
    controller() {
        if(this.props.decor.background === 'white' && this.props.decor.color === 'black') {
            this.props.eventDecor('#0b0f12', 'white')
        } else {
            this.props.eventDecor('white', 'black')
        }
    }

    render() {
        const { decor } = this.props
        return (
            <button onClick={() => this.controller()}>
                {decor.color === 'white' ? <Ionicon icon="ios-sunny-outline" color={decor.color} fontSize="23px"/> : <Ionicon icon="ios-moon-outline" color={decor.color} fontSize="23px"/>}
            </button>
        )
    }
} 

const mapStateToProps = state => {
    return {
        decor: state.decor
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        eventDecor: eventDecor
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeController);