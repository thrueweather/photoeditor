import React, {Component} from 'react';

import Canvas from './Canvas'
import CanvasSettings from '../containers/CanvasSettings';

import '../assets/App.css';
import '../assets/scrolls.css';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Canvas/>
                <CanvasSettings/>
            </div>
        )
    }
}