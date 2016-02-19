"use strict";
import React = require("react");
import IIndexedKeyValue = require("./common/IIndexedKeyValue");
import BubbleChart = require('./components/BubbleChart');
import BubbleChartStore = require('./BubbleChartStore');
import BubbleChartNav = require("./components/BubbleChartNav");
import IBubbleChartDataSource = require("./IBubbleChartDataSource");
import WindowSize = require('./util/WindowSize');
import D3 = require('d3');
import _ = require("lodash");
import $ = require("jquery");

class BubbleChartContainer extends React.Component<any, any>{
    refs: {
        [key: string]: React.ReactInstance
        toolbar: React.ReactInstance
        nav: React.ReactInstance
    }

    packLayout: D3.layout.Pack<any>;

    constructor() {
        super();
        this.packLayout = D3.layout.pack().sort(null).padding(0);
        this.state = {
            data: [],
            fieldIndex: 0,
            fields: [],
            filters: [],
            widgetSize: this.getContainerSize()
        }

        window.onresize = () => {
            this.setState({
                widgetSize: this.getContainerSize()
            });
        }
    }

    getContainerSize() {
        const windowSize = WindowSize.getSize();
        const toolbarHeight = this.refs.toolbar ? $(this.refs.toolbar).height() || 40 : 40;
        const navHeight = this.refs.nav ? $(this.refs.nav).height() || 40 : 40;
        return [windowSize[0], (windowSize[1]) - (toolbarHeight + navHeight)];
    }

    componentDidMount() {
        BubbleChartStore.singleton.listenToChanges((dataSource: IBubbleChartDataSource) => {
            this.setState({
                filters: dataSource.filters,
                data: dataSource.data,
                fieldIndex: dataSource.fieldIndex,
                fields: dataSource.fields,
                levelIndex: dataSource.levelIndex,
                levels: dataSource.levels
            });
        });
    }

    renderNav() {
        return <div ref="nav">
            <BubbleChartNav levels={this.state.levels} filters={this.state.filters} levelIndex={this.state.levelIndex}/>
        </div>;
    }

    renderBubbleChart() {
        const widgetSize = this.state.widgetSize;
        const chartWidth = widgetSize[0];
        const chartHeight = widgetSize[1];

        const containerStyle = {
            width: chartWidth,
            height: chartHeight
        };

        const nodes = this.nodesFromData(chartWidth, chartHeight);
        return <div style={containerStyle}>
            <BubbleChart nodes={nodes} width={chartWidth} height={chartHeight}/>
        </div>;
    }

    nodesFromData(width: number, height: number) {
        if (!this.state.data || this.state.data.length === 0) { return [] };
        return this.packLayout.size([width, height])
            .nodes({ children: this.state.data })
            .filter((d) => !d.children);
    }

    render() {             
        return (<div>
            {this.renderNav()}
            {this.renderBubbleChart()}
        </div>);
    }
}

export = BubbleChartContainer;