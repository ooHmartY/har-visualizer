import React, { Component } from 'react'
import * as d3 from 'd3';
import './HarBubbles.css';
import harData from './data';

export default class HarBubbles extends Component {

    componentDidMount() {
        this.renderBubbles();
        window.addEventListener('resize', this.renderBubbles.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.renderBubbles.bind(this));
    }

    renderBubbles() {
        const { clientHeight, clientWidth } = this.container;

        const data = d3.hierarchy({children: harData()})
            .sum(d => d.size)
            .sort((current, previous) => current.size);
        const color = d3.scaleOrdinal(d3.schemeCategory20c);

        d3.selectAll('svg').remove();

        const svg = d3.select(this.container).append('svg')
            .attr("width", clientWidth)
            .attr("height", clientHeight)
            .attr("class", "har-bubbles__svg");

        const bubble = d3.pack()
            .size([clientWidth, clientHeight])
            .padding(1)(data).descendants();

        console.log(bubble);

        const node = svg.selectAll('.node')
            .data(bubble)
            .enter()
            .filter(d => d.data.size > 0)
            .append('g')
            .attr('class', 'har-bubbles__entry')
            .attr('transform', n => `translate(${n.x},${n.y})`);

        node.append('title')
            .text(e => `${e.data.fileName} - ${e.data.mimeType} - ${e.data.size.toFixed(2)}KB`);

        node.append('circle')
            .attr('r', d => d.r)
            .style('fill', (d) => d.data.size ? color(d.data.size) : 'transparent')
            .style('opacity', 0.7);

        node.filter(d => d.r > 30)
            .append('text')
            .attr('dy', '.1em')
            .style('text-anchor', 'middle')
            .style('font-size', d => d.r > 50 ? '13px' : '10px')
            .text(e => e.data.fileName.substring(0, e.r / 3));


    }

    render() {
        return (
            <div className="har-bubbles">
                <div className="har-bubbles__container" ref={c => {this.container = c}}></div>
            </div>
        )
    }
}
