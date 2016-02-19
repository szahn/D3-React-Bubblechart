"use strict";
import React = require("react");
import BreadcrumbTrail = require("./BreadcrumbTrail");
import BubbleChartActions = require('../BubbleChartActions');
class BubbleChartNav extends React.Component<any, any> {
    onBreadcrumbClicked(index: number) {
        BubbleChartActions.drillTo(index);
    }

    breadcrumbTrail() {
        if (!this.props.levels) { return []; }
        const trail = [{ index: 0, label: this.props.levels[0].label }];
        for (let level = 1; level <= this.props.levelIndex; level++) {
            const levelFilters = this.props.filters[level];
            const levelLabel = this.props.levels[level - 1].label;
            const filter: any = _.find(levelFilters, { key: levelLabel });
            const pathLabel = !!filter ? filter.value : levelLabel;
            trail.push({ index: level, label: pathLabel });
        }
        return trail;
    }

    render() {
        return <div>
            <BreadcrumbTrail onClicked={this.onBreadcrumbClicked.bind(this) } path={this.breadcrumbTrail() }/>
        </div>;
    }
}
export = BubbleChartNav;