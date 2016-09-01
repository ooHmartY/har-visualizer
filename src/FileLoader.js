import React, { Component, PropTypes } from 'react';
import './FileLoader.css';
import fileReader from './utils/FileReader';

function first(list) {
    return (list && list.length && list[0]) || undefined;
}

export default class FileLoader extends Component {

    constructor(props) {
        super(props);
        this.onFileAdded.bind(this);
    }

    onFileAdded(e) {
        const { onFileAdded } = this.props;
        fileReader(first(e.target.files || e.dataTransfer.files))
            .then(data => {
                onFileAdded(data);
            });
    }

    render() {
        return (
            <div
                className="file-loader"
                onDrop={e => {
                    e.preventDefault();
                    this.onFileAdded.call(this, e);
                }}
                onDragOver={e => e.preventDefault()}
                onDragEnter={e => e.preventDefault()}
            >
                <div className="file-loader__content">
                    <div className="file-loader__copy">
                        Drag and Drop a File or Click Below to Upload
                    </div>
                    <div className="file-loader__actions">
                        <label className="file-loader__upload-button">
                        <span className="file-loader__upload-label">
                            Add File +
                        </span>
                            <input
                                type="file"
                                className="file-loader__upload-input"
                                onChange={this.onFileAdded.bind(this)} />
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

FileLoader.propTypes = {
    onFileAdded: PropTypes.func.isRequired
};

FileLoader.defaultProps = {
    onFileAdded: () => {}
};
