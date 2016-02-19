"use strict";
import React = require("react");
import Breadcrumb = require("./Breadcrumb");
import _ = require("lodash");

class BreadcrumbTrail extends React.Component<any, any> {    
    render() {
        const crumbs = _.map(this.props.path, (path: any, idx, ary) => {
            const isLast = idx === ary.length - 1;
            return <Breadcrumb key={path.index} isLast={isLast} onClicked={this.props.onClicked} {...path}/>
        });

        return <div className="breadcrumb">{crumbs}</div>;
    }
}

export = BreadcrumbTrail;
