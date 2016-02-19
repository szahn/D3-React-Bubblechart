"use strict";
import React = require('react');
import BubbleChartNode = require('./BubbleChartNode');
import SvgContainer = require('./SvgContainer');
import BubbleChartActions = require('../BubbleChartActions');
import NodeToolTip = require('./NodeToolTip');
class BubbleChart extends React.Component<any, any>{
    refs: {
        [key: string]: React.ReactInstance
        container: React.ReactInstance
    };

    isPointerDown: boolean;
    pointerOrigin: number[];

    constructor() {
        super();
        this.state = {
            x: 0,
            y: 0,
            zoom: 1
        }
    }

    onDown(props: React.MouseEvent) {
        this.isPointerDown = true;
        this.pointerOrigin = [props.clientX, props.clientY];
    }

    onMove(props: React.MouseEvent) {
        if (!this.isPointerDown) { return; }
        this.setState({
            x: this.state.x + (props.clientX - this.pointerOrigin[0]),
            y: this.state.y + (props.clientY - this.pointerOrigin[1])
        });
    }

    onUp(props: React.MouseEvent) {
        this.isPointerDown = false;
    }

    onWheel(props: React.WheelEvent) {
        const zoom = Math.min(2, Math.max(.1, this.state.zoom + (props.deltaY / 1000)));
        this.setState({
            zoom: zoom
        });
    }
    
    onNodeClick(node: any) {
        BubbleChartActions.drillDown(node);
    }
    
    onNodeMouseEnter(node: any) {
        this.setState({
            toolTipNode: node,
        });
    }

    onNodeMouseLeave() {
        this.setState({
            toolTipNode: null,
        });
    }

    render() {
        if (!this.props.nodes || this.props.nodes.length === 0) {
            return <div/>;
        }    
        
        const toolTip = this.state.toolTipNode ? <NodeToolTip node={this.state.toolTipNode}/> : <span/>;

        const svgPoints = this.props.nodes.map((node: any) =>
            <BubbleChartNode key={node.index} node={node}
                onClicked={this.onNodeClick.bind(this)}
                onMouseEnter={this.onNodeMouseEnter.bind(this)}
                onMouseLeave={this.onNodeMouseLeave.bind(this)}/>);
        return (<div className="container" ref="container">
            <SvgContainer width={this.props.width}
            height={this.props.height}
            viewWidth={this.props.width * this.state.zoom}
            viewHeight={this.props.height * this.state.zoom}
            onPointerDown={this.onDown.bind(this)}
            onPointerMove={this.onMove.bind(this)}
            onPointerUp={this.onUp.bind(this)}
            onPointerWheel={this.onWheel.bind(this)}
            x={this.state.x} y={this.state.y}>
            {svgPoints}
            </SvgContainer>
            {toolTip}
        </div>);
    }

}

export = BubbleChart;