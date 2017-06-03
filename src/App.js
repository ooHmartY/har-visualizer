import React, { Component } from 'react';
import autoBind from 'react-autobind';

import './App.css';
import HarBubbles from './HarBubbles';
import FileLoader from './FileLoader';

class App extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            data: null,
        };
        autoBind(this);
    }

    onFileAdded(data) {
        this.setState({
            data: JSON.parse(data),
        });
    }

    render() {
        const { data } = this.state;
        console.log(data);
        return (
          <div className="App">
            {data ?
              (<HarBubbles
                data={data}
                onResetData={() => this.setState({ data: null })}
              />) :
              (<FileLoader onFileAdded={this.onFileAdded} />)}
          </div>
        );
    }
}

export default App;
