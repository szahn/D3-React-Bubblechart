"use strict";
import IIndexedLabel = require("./common/IIndexedLabel");
import IIndexedKeyValue = require("./common/IIndexedKeyValue");
import IDataTable = require("./common/IDataTable");
import _ = require("lodash");
class Transforms {

    static mapLabels(array: string[]): IIndexedLabel[] {
        return array.map((label: string, idx: number) => {
            return {
                index: idx,
                label: label
            }
        });
    }

    static mapRowsToColumns(dataTable: IDataTable) {
        const columns = dataTable.columns;
        return dataTable.rows.map((row, idx) => {
            const item = {
                index: 1 + idx
            };

            for (let i = 0; i < row.length; i++) {
                item[columns[i]] = row[i];
            }
            return item;
        });
    }

    static filterBy(filters: IIndexedKeyValue[], data: any[]) {
        const filterQuery = _.reduce(filters, (obj: any, filter: IIndexedKeyValue) =>
            { obj[filter.key] = filter.value; return obj; }, {});

        return _.filter(data, filterQuery);
    }

    static groupByLabelWithValue(valueProp: string, labelProp: string, sumProps : string[], data: any[]) {
        const groups = _.groupBy(data, labelProp);
        return _.map(Object.keys(groups), (groupName, groupIndex) => {            
            const items = groups[groupName];
            const baseItem = _.first(items);
            const aggregatedProps =_.reduce([valueProp].concat(sumProps), (obj : any, sumPropName: string) => {
                obj[sumPropName] = _.reduce(items, (sum: number, groupItem: any) => {
                    return sum + parseInt(groupItem[sumPropName], 10);
                }, 0);
                return obj;
            }, {});            

            return _.assign({}, baseItem, aggregatedProps, {
                index: groupIndex,
                label: groupName,
                value: aggregatedProps[valueProp]
            });
        });
    }

    static mapWithLabelValue(valueColumn: string, labelColumn: string, data: any[]) {
        return data.map((row) => {
            row.value = parseInt(row[valueColumn], 10);
            row.label = row[labelColumn];
            return row;
        });
    }
}

export = Transforms;