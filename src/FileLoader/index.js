import React, { Component } from 'react';
import PT from 'prop-types';
import autoBind from 'react-autobind';
import { head } from 'lodash';

import classNames from 'classnames';
import './FileLoader.css';
import fileReader from '../utils/FileReader';

export default class FileLoader extends Component {

    static propTypes = {
        onFileAdded: PT.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isDragOver: false,
        };
        autoBind(this);
    }

    onFileAdded(e) {
        const { onFileAdded } = this.props;
        fileReader(head(e.target.files || e.dataTransfer.files))
            .then((data) => {
                onFileAdded(data);
            });
    }

    render() {
        const { isDragOver } = this.state;
        const className = classNames(
            'file-loader',
            {
                'file-loader--over': isDragOver,
            },
        );

        return (
          <div
            className={className}
            onDrop={(e) => {
                e.preventDefault();
                this.onFileAdded.call(this, e);
            }}
            onDragOver={e => e.preventDefault()}
            onDragEnter={(e) => {
                e.preventDefault();
                this.setState({
                    isDragOver: true,
                });
            }}
            onDragLeave={() => this.setState({
                isDragOver: false,
            })}
          >
            <div className="file-loader__content">
              <div className="file-loader__copy">
                  Drag and Drop a File or Click Below to Upload
               </div>
              <div className="file-loader__actions">
                <label
                  className="file-loader__upload-button"
                  htmlFor="fileInput"
                >
                  <span className="file-loader__upload-label">
                            Add File +
                        </span>
                  <input
                    type="file"
                    id="fileInput"
                    className="file-loader__upload-input"
                    onChange={this.onFileAdded}
                  />
                </label>
              </div>
            </div>
          </div>
        );
    }
}
