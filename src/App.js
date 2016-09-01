import React, { Component } from 'react';
import './App.css';
import HarBubbles from './HarBubbles';
import FileLoader from './FileLoader';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          data: null
      };
      this.onFileAdded.bind(this);
  }

  onFileAdded(data) {
      this.setState({
          data: JSON.parse(data)
      });
  }

  render() {
      const { data } = this.state;
    return (
      <div className="App">
          {data ?
              (<HarBubbles data={data} onResetData={() => this.setState({data: null})}/>) :
              (<FileLoader onFileAdded={this.onFileAdded.bind(this)}/>)}
      </div>
    );
  }
}

export default App;
