import React, { Component, PropTypes } from 'react';
import Cicle from './Circle';
import d3 from 'd3';

export default class Bubbles extends Component {

    renderBubble({data, x, y, r}, key) {

        const color = d3.scaleOrdinal(d3.schemeCategory20c);

        return (
            <g {...{key, transform: `translate(${x},${y})`}}>
                <title>{data.fileName} - {data.mimeType} - {data.size}</title>
                <Cicle {...{
                    r,
                    style: {
                        fill: data.size ? color(data.size) : 'transparent',
                        opacity: 0.7}
                }} />
                <text {...{
                    dy: '.1em',
                    style: {
                        textAnchor: 'middle',
                        fontSize: '10px'
                    }}
                }>
                    {data.fileName.substring(0, r / 3)}
                </text>
            </g>
        )
    }

    render() {
        this.props.data.map(this.renderBubble);
    }
}
