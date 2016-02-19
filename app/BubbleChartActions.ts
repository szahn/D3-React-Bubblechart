"use strict";
import Reflux = require('reflux');
var BubbleChartActions = Reflux.createActions(["drillDown", "drillTo", "fieldChanged", "levelChanged", "getInitialData", "levelChanged"]);
export = BubbleChartActions;