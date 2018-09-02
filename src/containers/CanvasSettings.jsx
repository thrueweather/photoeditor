import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicon from 'react-ionicons';
import { saveAs } from 'file-saver';

import { DEFAULT_FILTERS, ZOOM_COEFFICIENT, ZOOM_STEP, MAX_ZOOM } from '../constants/types'
import { 
    uploadImage, 
    imageSizes, 
    uploadFilters, 
    canvasWidth, 
    canvasHeight,
    eventZoomIncrement,
    eventZoomDecrement,
    paintingOnCanvas,
    openSidebar,
    reloadCanvas
} from '../actions';

import Painting from './Painting';
import ModalFileName from '../components/ModalFileName';
import ThemeController from '../containers/ThemeController';

class CanvasSettings extends Component {
    state = {modalImageName: {visible: false, fileName: "image"}};
    fileImage = () => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const imageFile = this.imageFile.files[0];

        if(imageFile.type.substring(0, 6) === "image/") {
            let objectUrl = window.URL.createObjectURL(imageFile);
            this.props.uploadImage(objectUrl);
            let image = new Image();
            image.src = objectUrl;

            image.onload = () => {
                const { sizes } = this.props;
                let imageWidth = sizes.image.width;
                let imageHeight = sizes.image.height;
                let canvasWidth = sizes.width;
                let canvasHeight = sizes.height;
                let x = 0;
                let y = 0;

                if(imageWidth && imageHeight !== canvasWidth && canvasHeight) {
                    this.props.imageSizes(imageWidth, imageHeight, imageWidth, imageHeight)
                } else {
                    this.props.imageSizes(image.width, image.height, image.width, image.height)
                }

                ctx.save();
                ctx.drawImage(image, x, y, this.props.sizes.width, this.props.sizes.height);
                ctx.restore();
            }

            const filters = [
                {name: 'brightness', default: this.brightness.value, max: 200, em: '%'},
                {name: 'saturate', default: this.saturate.value, max: 200, em: '%'},
                {name: 'contrast', default: this.contrast.value, max: 200, em: '%'},
                {name: 'sepia', default: this.sepia.value, max: 100, em: '%'},
                {name: 'opacity', default: this.opacity.value, max: 100, em: '%'},
                {name: 'grayscale', default: this.grayscale.value, max: 100, em: '%'},
                {name: 'invert', default: this.invert.value, max: 100, em: '%'},
                {name: 'blur', default: this.blur.value, max: 100, em: 'px'}
            ];

            this.props.uploadFilters(filters);

            let stringFilters = "";
            for(let v = 0; v < filters.length; v++) {
                stringFilters += `${filters[v].name}(${filters[v].default}${filters[v].em}) `
            }
            ctx.filter = stringFilters;
        }
    };

    canvasSizesWidth = x => {
        this.props.canvasWidth(x.target.value);
        this.fileImage();
    };

    canvasSizesHeight = y => {
        this.props.canvasHeight(y.target.value);
        this.fileImage();
    };

    zoomIncrement = () => this.props.eventZoomIncrement(ZOOM_STEP);

    zoomDecrement = () => this.props.zoom <= MAX_ZOOM ? this.props.eventZoomDecrement(ZOOM_COEFFICIENT) : this.props.eventZoomDecrement(ZOOM_STEP);

    resetImageSettings() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');   
        let x = 0;
        let y = 0;

        ctx.clearRect(x, y, canvas.width, canvas.height);
        this.props.reloadCanvas();

        if(this.props.image) {
            this.props.uploadFilters(DEFAULT_FILTERS);
            setTimeout(() => {
                this.fileImage();
            }, 100)
        }
    };

    saveImageOnDisk = () => document.getElementById("canvas").toBlob((blob) => saveAs(blob, `${this.state.modalImageName.fileName}.png`));

    canvasCleaning() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => {
            window.location.reload();
        }, 300)
    };

    changeOnImageName = e => this.setState({modalImageName: {visible: true, fileName: e.target.value}});

    openDownloadWindow = () => this.setState({modalImageName: {visible: true, fileName: this.state.modalImageName.fileName}});

    closeDownloadWindow = () => this.setState({modalImageName: {visible: false, fileName: this.state.modalImageName.fileName}});

    render() {
        const visibleSidebar = this.props.disclosureSidebar ? 'App-sidebar width-sidebar' : 'App-sidebar';

        const ImageFile = (
            <div className="image-file">
                <label className="file-upload">
                    <span><Ionicon icon="ios-folder-open-outline" color={this.props.decor.color} fontSize="23px"/></span>
                    <input name="myFile" type="file" onChange={this.fileImage} ref={imageFile=> this.imageFile = imageFile}/>
                </label>
            </div>
        );

        const styleOnSpan = this.props.image ? {opacity: 1} : {opacity: 0};

        const ranges = (
            <div className="wrapp-filters" style={this.props.image ? {opacity: '1' } : {opacity: '0.5' , cursor: 'not-allowed' }}>
                <div className="filter">
                    <p>{this.props.filters[0].name}</p>
                    <span style={styleOnSpan}>{this.props.image ? `${this.brightness.value}%` : null}</span>
                    <input type="range" id="brightness" name="brightness" min="0" max={this.props.filters[0].max} disabled={!this.props.image} ref={brightness=> this.brightness = brightness}
                    value={this.props.filters[0].default}
                    onChange={this.fileImage}
                    />
                </div>
                <div className="filter">
                    <p>{this.props.filters[1].name}</p>
                    <span style={styleOnSpan}>{this.props.image ? `${this.saturate.value}%` : null}</span>
                    <input type="range" id="saturate" name="saturate" min="0" max={this.props.filters[1].max} disabled={!this.props.image} ref={saturate=> this.saturate = saturate}
                    value={this.props.filters[1].default}
                    onChange={this.fileImage}
                    />
                </div>
                <div className="filter">
                    <p>{this.props.filters[2].name}</p>
                    <span style={styleOnSpan}>{this.props.image ? `${this.contrast.value}%` : null}</span>
                    <input type="range" id="saturate" name="contrast" min="0" max={this.props.filters[2].max} disabled={!this.props.image} ref={contrast=> this.contrast = contrast}
                    value={this.props.filters[2].default}
                    onChange={this.fileImage}
                    />
                </div>
                <div className="filter">
                    <p>{this.props.filters[3].name}</p>
                    <span style={styleOnSpan}>{this.props.image ? `${this.sepia.value}%` : null}</span>
                    <input type="range" id="sepia" name="sepia" min="0" max={this.props.filters[3].max} disabled={!this.props.image} ref={sepia=> this.sepia = sepia}
                    value={this.props.filters[3].default}
                    onChange={this.fileImage}
                    />
                </div>
                <div className="filter">
                    <p>{this.props.filters[4].name}</p>
                    <span style={styleOnSpan}>{this.props.image ? `${this.opacity.value}%` : null}</span>
                    <input type="range" id="opacity" name="opacity" min="0" max={this.props.filters[4].max} disabled={!this.props.image} ref={opacity=> this.opacity = opacity}
                    value={this.props.filters[4].default}
                    onChange={this.fileImage}
                    />
                </div>
                <div className="filter">
                    <p>{this.props.filters[5].name}</p>
                    <span style={styleOnSpan}>{this.props.image ? `${this.grayscale.value}%` : null}</span>
                    <input type="range" id="grayscale" name="grayscale" min="0" max={this.props.filters[5].max} disabled={!this.props.image} ref={grayscale=> this.grayscale = grayscale}
                    value={this.props.filters[5].default}
                    onChange={this.fileImage}
                    />
                </div>
                <div className="filter">
                    <p>{this.props.filters[6].name}</p>
                    <span style={styleOnSpan}>{this.props.image ? `${this.invert.value}%` : null}</span>
                    <input type="range" id="invert" name="invert" min="0" max={this.props.filters[6].max} disabled={!this.props.image} ref={invert=> this.invert = invert}
                    value={this.props.filters[6].default}
                    onChange={this.fileImage}
                    />
                </div>
                <div className="filter">
                    <p>{this.props.filters[7].name}</p>
                    <span style={styleOnSpan}>{this.props.image ? `${this.blur.value}%` : null}</span>
                    <input type="range" id="blur" name="blur" min="0" max={this.props.filters[7].max} disabled={!this.props.image} ref={blur=> this.blur = blur}
                    value={this.props.filters[7].default}
                    onChange={this.fileImage}
                    />
                </div>
            </div>
        );

        const Sizes = (
            <div className="wrapp-sizes" style={this.props.image ? {opacity: '1'} : {opacity: '0'}}>
                <span>width:</span>
                <input type="number" onChange={this.canvasSizesWidth} value={this.props.sizes.width} />
                <span>height:</span>
                <input type="number" onChange={this.canvasSizesHeight} value={this.props.sizes.height} />
            </div>
        );

        const Zoom = () => {
            if(this.props.image) {
                return (
                    <div className="zoom">
                        Zoom: 
                        <button onClick={this.zoomDecrement}>
                            <Ionicon icon="ios-remove-circle-outline" color={this.props.decor.color} fontSize="20px"/>
                        </button>
                        {`${this.props.zoom}%`}
                        <button onClick={this.zoomIncrement}>
                            <Ionicon icon="ios-add-circle-outline" color={this.props.decor.color} fontSize="20px"/>
                        </button>
                    </div>
                )
            } else {
                return <div></div>;
            }
        };

        const SaveReset = () => (
            <div className="save_reset" style={this.props.image ? {opacity: '1'} : {opacity: '0.5', cursor: 'not-allowed'}}>
                <button onClick={() => this.resetImageSettings()} title={'reload image filters'}>
                    <Ionicon icon="ios-refresh-circle-outline" color={this.props.decor.color} fontSize="23px"/>
                </button>
                <button className="save" onClick={() => this.openDownloadWindow()} title={'save'}>
                    <Ionicon icon="ios-cloud-download-outline" color={this.props.decor.color} fontSize="23px"/>
                </button>
                <button onClick={() => this.canvasCleaning()} title={"in trash"}>
                    <Ionicon icon="ios-trash" color={this.props.decor.color} fontSize="23px"/>
                </button>
            </div>
        );

        const VisibleModalWindow = this.state.modalImageName.visible && 
            <ModalFileName 
                visible={this.state.modalImageName.visible} 
                name={this.state.modalImageName.fileName}
                onChange={this.changeOnImageName}
                download={() => {this.saveImageOnDisk(); this.closeDownloadWindow()}}
                close={() => this.closeDownloadWindow()}
            />

        return (
            <div>
                <div className={visibleSidebar} style={{background: this.props.decor.background}} onMouseOver={() => this.props.openSidebar()}>
                    <ThemeController/>
                    {ImageFile}
                    {Sizes}
                    <Zoom/>
                    <Painting/>
                    {ranges}
                    <SaveReset/>
                </div>
                {VisibleModalWindow}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        disclosureSidebar: state.disclosureSidebar,
        decor: state.decor,
        image: state.image,
        sizes: state.sizes,
        zoom: state.zoom,
        filters: state.filters
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        uploadImage: uploadImage,
        imageSizes: imageSizes,
        uploadFilters: uploadFilters,
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        eventZoomIncrement: eventZoomIncrement,
        eventZoomDecrement: eventZoomDecrement,
        paintingOnCanvas: paintingOnCanvas,
        openSidebar: openSidebar,
        reloadCanvas: reloadCanvas
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasSettings);