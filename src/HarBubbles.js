import React, { Component } from 'react'
import ReactTransitionGroup from 'react-addons-transition-group';
import map from 'lodash/map';
import compact from 'lodash/compact';
import debounce from 'lodash/debounce';
import partial from 'lodash/partial';
import * as d3 from 'd3';
import './HarBubbles.css';
import harData from './data';
import Bubble from './Bubble';

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
        window.addEventListener('resize', debounce(this.updateDimensions.bind(this), 300));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', debounce(this.updateDimensions.bind(this), 300));
    }

    updateDimensions() {
        const {
            clientHeight,
            clientWidth
        } = this.container;
        this.setState({height: clientHeight, width: clientWidth});
    }

    renderBubble(color, {data,x ,y, r }, key) {
        if(!data.size || data.size < 1) {
            return null;
        }

        return (
            <Bubble {...{ key, x, y, r, style: {fill: color(r)}, className: 'har-bubbles__entry' }}>
                <title>{data.fileName} - {data.mimeType} - {data.size}</title>
                <text {...{dy: '.1em', style: {textAnchor: 'middle', fontSize: '10px'}}}>
                    {data.fileName.substring(0, r / 3)}
                </text>
            </Bubble>
        )
    }

    renderBubbles() {
        const { width, height } = this.state;
        if(!(width && height)) {
            return null;
        }

        const color = d3.scaleOrdinal(d3.schemeCategory20c);

        const data = d3.hierarchy({children: harData(this.props.data)})
            .sum(d => d.size)
            .sort((current, previous) => current.size);

        const bubbles = d3.pack()
            .size([width, height])
            .padding(1.5)(data).descendants();

        return (
            <svg width={width} height={height}>
                <ReactTransitionGroup component="g" width={width} height={height}>
                    {compact(map(bubbles, partial(this.renderBubble, color)))}
                </ReactTransitionGroup>
            </svg>
        );
    }

    render() {
        return (
            <div className="har-bubbles">
                <div className="har-bubbles__actions">
                    <button type="button" className="har-bubbles__reset" onClick={this.props.onResetData}>Back</button>
                </div>
                <div className="har-bubbles__container" ref={c => {this.container = c}}>
                    { this.renderBubbles()}
                </div>
            </div>
        )
    }
}
