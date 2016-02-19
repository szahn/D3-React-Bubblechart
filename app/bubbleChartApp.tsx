"use strict";
import React = require('react');
import ReactDOM = require('react-dom');
import BubbleChartActions = require('./BubbleChartActions');
import BubbleChartContainer = require('./BubbleChartContainer');

ReactDOM.render(<BubbleChartContainer/>, document.getElementById("d3container"));

BubbleChartActions.getInitialData({
    fields: ["Revenue", "CostOfGoods"],
	levels: ["Category", "Subcategory", "Product"]
});