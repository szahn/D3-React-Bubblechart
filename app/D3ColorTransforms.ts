"use strict";
import D3 = require('d3');
import _ = require("lodash");

export class ValueColorMap {
    static mapColors(palette: string[], valueColumn: string, data: any[]) {
        const colors = palette.map((color: string) => D3.rgb(color));
        const values = _.map(data, (item) => parseInt(item[valueColumn], 10));
        const colorScale = D3.scale.linear<D3.Color, number>().domain([_.min(values), _.max(values)]).range(colors);
        return data.map((item: any, idx) => {
            item.color = colorScale(values[idx]);
            return item;
        });
    }
}