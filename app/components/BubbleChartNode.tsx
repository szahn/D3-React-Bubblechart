"use strict";
import React = require('react');

class BubbleChartNode extends React.Component<any, any>{
    onClicked() {
        if (!this.props.onClicked) { return; }
        this.props.onClicked(this.props.node);
    }

    onMouseEnter() {
        if (!this.props.onMouseEnter) { return; }
        this.props.onMouseEnter(this.props.node);
    }

    onMouseLeave() {
        if (!this.props.onMouseLeave) { return; }
        this.props.onMouseLeave(this.props.node);
    }

    render() {
        const node = this.props.node;
        const transform = `translate(${node.x}, ${node.y})`;
        const textCenter = node.r / 4;

        const nodeStyle = this.props.cursorIndex === node.index ? {
            strokeWidth: 3,
            stroke: "#666"
        } : {}

        return (<g key={node.index} style={nodeStyle} className="node" transform={transform}
            onMouseEnter={this.onMouseEnter.bind(this)}
            onMouseLeave={this.onMouseLeave.bind(this) }
            onClick={this.onClicked.bind(this) }>
            <circle className="circle" r={node.r} fill={node.color}/>
        </g>);
    }
}

export = BubbleChartNode;