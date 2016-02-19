"use strict";
import Reflux = require("reflux");
import BubbleChartActions = require("./BubbleChartActions");
import IBubbleChartDataSource = require("./IBubbleChartDataSource");
import IDataTable = require("./common/IDataTable");
import Transforms = require("./Transforms");
import D3DColorTransforms = require("./D3ColorTransforms");
import IIndexedLabel = require("./common/IIndexedLabel");
import IIndexedKeyValue = require("./common/IIndexedKeyValue");
import _ = require('lodash');
import D3 = require('d3');

export class BubbleChartStore {
    private dataCache: any;
    private dataSource: IBubbleChartDataSource = {};
    private refluxStore: any;

    constructor() {
        const _this = this;
        this.refluxStore = Reflux.createStore({
            listenables: BubbleChartActions,
            init: function () {
                _this.initStore(this);
            }
        });        
    }

    initStore(store: any) {
        store.listenTo(BubbleChartActions.fieldChanged, this.onFieldChanged.bind(this));
        store.listenTo(BubbleChartActions.levelChanged, this.onLevelChanged.bind(this));
        store.listenTo(BubbleChartActions.getInitialData, this.onGetInitialData.bind(this));
        store.listenTo(BubbleChartActions.drillDown, this.onDrillDown.bind(this));
        store.listenTo(BubbleChartActions.drillTo, this.onDrillTo.bind(this));
    }

    notifyDataChanged() {
        this.refluxStore.trigger(this.dataSource);
    }

    listenToChanges(callback : Function) {
        this.refluxStore.listen(callback);
    }

    transformCachedData(level: IIndexedLabel, field: IIndexedLabel, colorCategory: string, filters: any = []) {        
        const filter = _.curry(Transforms.filterBy)(filters).bind(Transforms);
        const groupData = _.curry(Transforms.groupByLabelWithValue)(field.label, level.label, <string[]>_.map(this.dataSource.fields, 'label')).bind(Transforms);
        const mapColors = _.curry(D3DColorTransforms.ValueColorMap.mapColors)(["#F00", "#0F0"], colorCategory).bind(Transforms);
        return _.flow(filter, groupData, mapColors)(this.dataCache);
    }

    onGetInitialData(config: any) {
        d3.json(`./products.json`, (err: any, dataTable: IDataTable) => {
            if (err) {
                throw err;
            }

            this.dataSource.fields = Transforms.mapLabels(config.fields);
            const defaultField = this.dataSource.fields[0];
            this.dataSource.levels = Transforms.mapLabels(config.levels);
            const defaultLevel = this.dataSource.levels[0];
            this.dataCache = Transforms.mapRowsToColumns(dataTable);           
            this.dataSource.data = this.transformCachedData(defaultLevel, defaultField, defaultField.label),
            this.dataSource.fieldIndex = defaultField.index,
            this.dataSource.levelIndex =  defaultLevel.index,
            this.dataSource.filters = new Array<IIndexedKeyValue[]>()
            this.notifyDataChanged();
        });
    }

    onDrillTo(index: number) {
        this.onLevelChanged(index);
    }

    onDrillDown(node: any) {
        if (this.dataSource.levelIndex === this.dataSource.levels.length - 1) {
            return;
        }

        const filterOnPropName = this.dataSource.levels[this.dataSource.levelIndex].label;
        const filterValue = node[filterOnPropName];
        const nextLevel = this.dataSource.levelIndex + 1;
        this.pushLevelFilter(filterOnPropName, filterValue, nextLevel);
        this.onLevelChanged(nextLevel);
    }

    onLevelChanged(levelIndex: number) {
        this.dataSource.data = this.transformCachedData(this.level(levelIndex), this.field(),
            this.colorCategory(), this.levelFilters());
        this.notifyDataChanged();
    }
    
    onFieldChanged(fieldIndex: number) {
        this.dataSource.data = this.transformCachedData(this.level(), this.field(fieldIndex),
            this.colorCategory(), this.levelFilters());
        this.notifyDataChanged();
    }

    levelFilters() {
        let filters = [];
        for (let level = 0; level <= this.dataSource.levelIndex; level++) {
            filters = filters.concat(this.dataSource.filters[level] || []);
        }
        return filters;
    }

    colorCategory(): string {
        return  this.dataSource.fields[this.dataSource.fieldIndex].label;
    }

    level(newLevel?: number): IIndexedLabel {
        if (newLevel !== undefined) { this.dataSource.levelIndex = newLevel; }
        return this.dataSource.levels[this.dataSource.levelIndex];
    }

    field(newField?: number): IIndexedLabel {
        if (newField !== undefined) { this.dataSource.fieldIndex = newField; }
        return this.dataSource.fields[this.dataSource.fieldIndex];
    }

    pushLevelFilter(name: string, value: string, level: number) {
        const levelFilters = !this.dataSource.filters[level]
            ? this.dataSource.filters[level] = new Array<IIndexedKeyValue>()
            : this.dataSource.filters[level];

        levelFilters.push({
            key: name,
            value: value,
            index: levelFilters.length > 0 ? 1 + _.maxBy(levelFilters, 'index').index : 0
        });
    }
}

export var singleton = new BubbleChartStore();
