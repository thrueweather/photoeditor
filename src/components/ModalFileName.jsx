import React from 'react';

import '../assets/ModalWindows.css'

const ModalFileName = ({name, onChange, download, close}) => (
    <div className="modal-wrapp">
        <div className="modal-container">
            <div className="modal-content">
                <p>File name:</p>
                <div className="input">
                    <input className="input" type="text" onChange={onChange} value={name}/>.png
                </div><br/>
                <button onClick={download}>Download</button>
                <button className="close" onClick={close}>Cancel</button>
            </div>
        </div>
    </div>
)

export default ModalFileName;