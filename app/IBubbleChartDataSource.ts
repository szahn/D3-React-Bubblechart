import IIndexedLabel = require("./common/IIndexedLabel");
import IIndexedKeyValue = require("./common/IIndexedKeyValue");
interface IBubbleChartDataSource {
    data ?: any[];
    fieldIndex?: number;
    fields?: IIndexedLabel[];
    levelIndex?: number;
    levels?: IIndexedLabel[];
    filters?: IIndexedKeyValue[][];
}

export = IBubbleChartDataSource