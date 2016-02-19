"use strict";
import React = require('react');

class NodeToolTip extends React.Component<any, any>{
    render() {
        const node = this.props.node;
        const style = {
            left: node.x,
            top: node.y,
            position: "absolute"
        };
        
        return (<div style={style} className="tooltip">
            <span className="toolTipRow"><b>{node.label}</b></span>
            <span className="toolTipRow">Revenue: $${node.Revenue}</span>
            <span className="toolTipRow">Cost of goods: $${node.CostOfGoods}</span>
       </div>);            
    }
}

export = NodeToolTip