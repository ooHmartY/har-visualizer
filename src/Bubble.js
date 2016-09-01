import React, { Component, PropTypes } from 'react'
import * as d3 from 'd3';

class Bubble extends Component {

    constructor(props) {
        super(props);
        this.state = {
            r: 0,
        };
        this._showBubble.bind(this);
        this._hideBubble.bind(this);
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

                //this.setState({r: this.props.r });
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

    componentWillReceiveProps(prev, next) {
        console.log('received props');
        if(prev.r === next.r) {
            return;
        }

        d3.select(this.bubble)
            .select('circle')
            .transition(this.props.transition)
            .attr('r', next.r)
            .on('end', () => {
                this.setState({r: next.r});
            });
    }

    render() {
        const {
            x,
            y,
            r,
            style,
            children
        } = this.props;
        return (
            <g {...{
                ref: c => { this.bubble = c },
                transform: `translate(${x},${y}),scale(0)`,
                className: 'har-bubbles__entry'
            }}>
                <circle {...{ r, style }} />
                { children }
            </g>
        )
    }
}

Bubble.propTypes = {
    transition: PropTypes.instanceOf(d3.transition).isRequired,
    r: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    className: PropTypes.string,
    children: PropTypes.node
};

Bubble.defaultProps = {
    transition: d3.transition().duration(1000).ease(d3.easeElasticInOut)
};

export default Bubble;
