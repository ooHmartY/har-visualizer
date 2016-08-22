import React, { Component, PropTypes } from 'react';

export default class Circle extends Component {

    render() {
        return (<circle {...this.props} />)
    }
}
