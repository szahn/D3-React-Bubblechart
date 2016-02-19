"use strict";
import React = require("react");
class Breadcrumb extends React.Component<any, any> {
    onClicked() {
        if (this.props.onClicked) {
            this.props.onClicked(this.props.index);
        }
    }

    render() {
        if (this.props.isLast) {
            return <span>{this.props.label}</span>;
        }

        return <span><a onClick={this.onClicked.bind(this) } href="#">{this.props.label}</a>&nbsp;&raquo;&nbsp;</span>;
    }
}

export = Breadcrumb;
