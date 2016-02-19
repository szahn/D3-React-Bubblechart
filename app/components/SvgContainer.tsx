"use strict";
import React = require("react");

interface SvgContainerProps {
    width: number;
    height: number;
    viewWidth ?: number;
    viewHeight ?: number;
    children?: any;
    x ?: number;
    y ?: number;
}

class SvgContainer extends React.Component<any, any>{

    onMouseDown(e: React.MouseEvent) {
        if (this.props.onPointerDown) {
            this.props.onPointerDown(e);
        }
    }

    onMouseMove(e: React.MouseEvent) {
        if (this.props.onPointerMove) {
            this.props.onPointerMove(e);
        }
    }

    onMouseUp(e: React.MouseEvent) {
        if (this.props.onPointerUp) {
            this.props.onPointerUp(e);
        }
    }

    onMouseWheel(e: React.WheelEvent) {
        if (this.props.onPointerWheel) {
            this.props.onPointerWheel(e);
        }
    }

    render() {
        const viewBox = `${this.props.x || 0} ${this.props.y || 0} ${this.props.viewWidth || this.props.width} ${this.props.viewHeight || this.props.height}`;
        return (<svg
            onMouseDown={this.onMouseDown.bind(this) }
            onMouseMove={this.onMouseMove.bind(this) }
            onMouseUp={this.onMouseUp.bind(this) }
            onWheel={this.onMouseWheel.bind(this) }
            width={this.props.width} height={this.props.height} viewBox={viewBox}>
            {this.props.children}
        </svg>);
    }

}

export = SvgContainer;