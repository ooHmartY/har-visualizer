import React, { Component } from 'react'
import map from 'lodash/map';
import partial from 'lodash/partial';
import * as d3 from 'd3';
import './HarBubbles.css';
import harData from './data';

export default class HarBubbles extends Component {

    constructor(props) {
        super(props);
        this.state = { height: null, width: null };
        this.updateDimensions.bind(this);
        this.renderBubbles.bind(this);
        this.renderBubble.bind(this);
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
        const {
            clientHeight,
            clientWidth
        } = this.container;
        this.setState({height: clientHeight, width: clientWidth});
    }

    renderBubble(color, bubble) {
        if(bubble.data.size) {
            return null;
        }

        return (
            <g {...{transform: `translate(${bubble.x},${bubble.y})`, className: 'har-bubbles__entry'}}>
                <title>{bubble.data.fileName} - ${bubble.data.mimeType} - ${bubble.data.size}</title>
                <circle {...{r: bubble.r, style: {fill: color(bubble.data.size)}}} />
                {
                    (bubble.r > 30) && (
                        <text {...{dy: '.1em', style: {textAnchor: 'middle', fontSize: '10px'}}}>
                            {bubble.data.fileName.substring(0, bubble.r / 3)}
                        </text>
                    )
                }
            </g>
        )
    }

    renderBubbles() {
        const { width, height } = this.state;
        if(!(width && height)) {
            return null;
        }

        const color = d3.scaleOrdinal(d3.schemeCategory20c);

        const data = d3.hierarchy({children: harData()})
            .sum(d => d.size)
            .sort((current, previous) => current.size);

        const bubbles = d3.pack()
            .size([width, height])
            .padding(1)(data).descendants();

        console.log(bubbles);

        return null;
    }

    render() {
        const {height, width} = this.state;
        return (
            <div className="har-bubbles">
                <div className="har-bubbles__container" ref={c => {this.container = c}}>
                    { !!(height && width) && this.renderBubbles()}
                </div>
            </div>
        )
    }
}
