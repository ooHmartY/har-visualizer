import React, { Component } from 'react';
import PT from 'prop-types';
import autoBind from 'react-autobind';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import map from 'lodash/map';
import compact from 'lodash/compact';
import debounce from 'lodash/debounce';
import partial from 'lodash/partial';
import * as d3 from 'd3';
import './HarBubbles.css';
import harData from './utils/data';
import Bubble from './Bubble';

export default class HarBubbles extends Component {

    static propTypes = {
        data: PT.shape({
            log: PT.object.isRequired,
        }).isRequired,
        onResetData: PT.func.isRequired,
    };

    constructor(...args) {
        super(...args);
        this.state = { height: null, width: null };
        autoBind(this);
    }

    componentDidMount() {
        this.updateDimensions();
    }

    updateDimensions() {
        const {
            clientHeight,
            clientWidth,
        } = this.container;
        this.setState({ height: clientHeight, width: clientWidth });
    }

    renderBubble(color, { data, x, y, r }, key) { // eslint-disable-line
        if (!data.size || data.size < 1) {
            return null;
        }

        return (
          <Bubble {...{
              key,
              x,
              y,
              r,
              style: { fill: color(r) },
              className: 'har-bubbles__entry' }
         }>
            <title>{data.fileName} - {data.mimeType} - {data.size}</title>
            <text {...{
                dy: '.1em',
                style: { textAnchor: 'middle', fontSize: '10px' },
            }}
            >
              {data.fileName.substring(0, r / 3)}
            </text>
          </Bubble>
        );
    }

    renderBubbles() {
        const { width, height } = this.state;
        if (!(width && height)) {
            return null;
        }

        const color = d3.scaleOrdinal(d3.schemeCategory20c);

        const data = d3.hierarchy({ children: harData(this.props.data) })
            .sum(d => d.size)
            .sort(current => current.size);

        const bubbles = d3.pack()
            .size([width, height])
            .padding(1.5)(data).descendants();

        return (
          <svg width={width} height={height}>
            <TransitionGroup component="g" width={width} height={height}>
              {compact(map(bubbles, partial(this.renderBubble, color)))}
            </TransitionGroup>
          </svg>
        );
    }

    render() {
        return (
          <div className="har-bubbles">
            <div className="har-bubbles__actions">
              <button
                type="button"
                className="har-bubbles__reset"
                onClick={this.props.onResetData}
              >Back</button>
            </div>
            <div
              className="har-bubbles__container"
              ref={(c) => { this.container = c; }}
            >
              { this.renderBubbles()}
            </div>
          </div>
        );
    }
}
