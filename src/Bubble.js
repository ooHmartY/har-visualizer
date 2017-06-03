import React, { Component } from 'react';
import PT from 'prop-types';
import * as d3 from 'd3';

class Bubble extends Component {

    static propTypes = {
        children: PT.node.isRequired,
        className: PT.string.isRequired,
        r: PT.number.isRequired,
        style: PT.shape({
            fill: PT.string.isRequired,
        }).isRequired,
        transition: PT.instanceOf(d3.transition).isRequired,
        x: PT.number.isRequired,
        y: PT.number.isRequired,
    };

    static defaultProps = {
        transition: d3.transition().duration(1000).ease(d3.easeElasticInOut),
    };

    constructor(props) {
        super(props);
        this.state = {
            r: 0,
        };
        this._showBubble.bind(this);
        this._hideBubble.bind(this);
    }

    componentWillReceiveProps(prev, next) {
        if (prev.r === next.r) {
            return;
        }

        d3.select(this.bubble)
            .select('circle')
            .transition(this.props.transition)
            .attr('r', next.r)
            .on('end', () => {
                this.setState({ r: next.r });
            });
    }

    componentWillEnter(callback) {
        this._showBubble(callback);
    }

    componentWillAppear(callback) {
        this._showBubble(callback);
    }

    _showBubble(callback) {
        const { x, y } = this.props;
        d3.select(this.bubble)
            .transition(this.props.transition)
            .attr('transform', `translate(${x},${y}),scale(1)`)
            .on('end', () => {
                this.setState({ r: this.props.r });
                callback();
            });
    }

    componentWillLeave(callback) {
        this._hideBubble(callback);
    }

    _hideBubble(callback) {
        d3.select(this.bubble)
            .select('circle')
            .transition(this.props.transition)
            .attr('r', 0)
            .on('end', () => {
                callback();
            });
    }

    render() {
        const {
            children,
            className,
            r,
            style,
            x,
            y,
        } = this.props;
        return (
          <g
            {...{
                ref: (c) => { this.bubble = c; },
                transform: `translate(${x},${y}),scale(0)`,
                className: 'har-bubbles__entry',
            }}
          >
            <circle {...{ r, style, className }} />
            { children }
          </g>
        );
    }
}

export default Bubble;
