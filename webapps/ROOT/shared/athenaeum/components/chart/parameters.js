"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var annotations_1 = require("./annotations");
(function (Axes) {
    Axes[Axes["XY"] = 0] = "XY";
    Axes[Axes["X"] = 1] = "X";
    Axes[Axes["Y"] = 2] = "Y";
    Axes[Axes["None"] = 3] = "None";
})(exports.Axes || (exports.Axes = {}));
var Axes = exports.Axes;
var ChartParameters = (function () {
    function ChartParameters(paramsObj) {
        if (paramsObj === void 0) { paramsObj = null; }
        if (paramsObj == null) {
            return;
        }
        for (var prop in paramsObj) {
            if (paramsObj.hasOwnProperty(prop)) {
                this[prop] = paramsObj[prop];
            }
        }
    }
    return ChartParameters;
}());
exports.ChartParameters = ChartParameters;
var XyChartParameters = (function (_super) {
    __extends(XyChartParameters, _super);
    function XyChartParameters(paramsObj) {
        if (paramsObj === void 0) { paramsObj = null; }
        _super.call(this, paramsObj);
        for (var ai in this.annotations) {
            if (this.annotations.hasOwnProperty(ai)) {
                this.annotations[ai] = annotations_1.Annotation.Create(this.annotations[ai]);
            }
        }
    }
    return XyChartParameters;
}(ChartParameters));
exports.XyChartParameters = XyChartParameters;
var XyyChartParameters = (function (_super) {
    __extends(XyyChartParameters, _super);
    function XyyChartParameters() {
        _super.apply(this, arguments);
    }
    return XyyChartParameters;
}(XyChartParameters));
exports.XyyChartParameters = XyyChartParameters;
var BarChartParameters = (function (_super) {
    __extends(BarChartParameters, _super);
    function BarChartParameters() {
        _super.apply(this, arguments);
    }
    return BarChartParameters;
}(XyChartParameters));
exports.BarChartParameters = BarChartParameters;
var HistogramParameters = (function (_super) {
    __extends(HistogramParameters, _super);
    function HistogramParameters() {
        _super.apply(this, arguments);
    }
    return HistogramParameters;
}(XyChartParameters));
exports.HistogramParameters = HistogramParameters;
var HistogramPlusLineParameters = (function (_super) {
    __extends(HistogramPlusLineParameters, _super);
    function HistogramPlusLineParameters() {
        _super.apply(this, arguments);
    }
    return HistogramPlusLineParameters;
}(XyyChartParameters));
exports.HistogramPlusLineParameters = HistogramPlusLineParameters;
var SimpleLineChartParameters = (function (_super) {
    __extends(SimpleLineChartParameters, _super);
    function SimpleLineChartParameters() {
        _super.apply(this, arguments);
    }
    return SimpleLineChartParameters;
}(XyChartParameters));
exports.SimpleLineChartParameters = SimpleLineChartParameters;
var MultiScatterPlotParameters = (function (_super) {
    __extends(MultiScatterPlotParameters, _super);
    function MultiScatterPlotParameters() {
        _super.apply(this, arguments);
    }
    return MultiScatterPlotParameters;
}(XyChartParameters));
exports.MultiScatterPlotParameters = MultiScatterPlotParameters;
var ScatterPlotParameters = (function (_super) {
    __extends(ScatterPlotParameters, _super);
    function ScatterPlotParameters() {
        _super.apply(this, arguments);
    }
    return ScatterPlotParameters;
}(MultiScatterPlotParameters));
exports.ScatterPlotParameters = ScatterPlotParameters;
var MultiHistogramParameters = (function (_super) {
    __extends(MultiHistogramParameters, _super);
    function MultiHistogramParameters() {
        _super.apply(this, arguments);
    }
    return MultiHistogramParameters;
}(XyChartParameters));
exports.MultiHistogramParameters = MultiHistogramParameters;
var DualHistogramsParameters = (function (_super) {
    __extends(DualHistogramsParameters, _super);
    function DualHistogramsParameters() {
        _super.apply(this, arguments);
    }
    return DualHistogramsParameters;
}(MultiHistogramParameters));
exports.DualHistogramsParameters = DualHistogramsParameters;
var MultiLineChartParameters = (function (_super) {
    __extends(MultiLineChartParameters, _super);
    function MultiLineChartParameters() {
        _super.apply(this, arguments);
    }
    return MultiLineChartParameters;
}(XyChartParameters));
exports.MultiLineChartParameters = MultiLineChartParameters;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2hhcnQvcGFyYW1ldGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQSw0QkFBc0MsZUFBZSxDQUFDLENBQUE7QUFNdEQsV0FBWSxJQUFJO0lBQUcsMkJBQUUsQ0FBQTtJQUFFLHlCQUFDLENBQUE7SUFBRSx5QkFBQyxDQUFBO0lBQUUsK0JBQUksQ0FBQTtBQUFDLENBQUMsRUFBdkIsWUFBSSxLQUFKLFlBQUksUUFBbUI7QUFBbkMsSUFBWSxJQUFJLEdBQUosWUFBdUIsQ0FBQTtBQStDbkM7SUFDSSx5QkFBWSxTQUFrQztRQUFsQyx5QkFBa0MsR0FBbEMsZ0JBQWtDO1FBRTFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUtMLHNCQUFDO0FBQUQsQ0FqQkEsQUFpQkMsSUFBQTtBQWpCWSx1QkFBZSxrQkFpQjNCLENBQUE7QUFLRDtJQUF1QyxxQ0FBZTtJQUNsRCwyQkFBWSxTQUFxQjtRQUFyQix5QkFBcUIsR0FBckIsZ0JBQXFCO1FBQzdCLGtCQUFNLFNBQVMsQ0FBQyxDQUFDO1FBRWpCLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyx3QkFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkUsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBV0wsd0JBQUM7QUFBRCxDQXBCQSxBQW9CQyxDQXBCc0MsZUFBZSxHQW9CckQ7QUFwQlkseUJBQWlCLG9CQW9CN0IsQ0FBQTtBQUtEO0lBQXdDLHNDQUFpQjtJQUF6RDtRQUF3Qyw4QkFBaUI7SUFJekQsQ0FBQztJQUFELHlCQUFDO0FBQUQsQ0FKQSxBQUlDLENBSnVDLGlCQUFpQixHQUl4RDtBQUpZLDBCQUFrQixxQkFJOUIsQ0FBQTtBQWFEO0lBQXdDLHNDQUFpQjtJQUF6RDtRQUF3Qyw4QkFBaUI7SUFLekQsQ0FBQztJQUFELHlCQUFDO0FBQUQsQ0FMQSxBQUtDLENBTHVDLGlCQUFpQixHQUt4RDtBQUxZLDBCQUFrQixxQkFLOUIsQ0FBQTtBQUtEO0lBQXlDLHVDQUFpQjtJQUExRDtRQUF5Qyw4QkFBaUI7SUFFMUQsQ0FBQztJQUFELDBCQUFDO0FBQUQsQ0FGQSxBQUVDLENBRndDLGlCQUFpQixHQUV6RDtBQUZZLDJCQUFtQixzQkFFL0IsQ0FBQTtBQUtEO0lBQWlELCtDQUFrQjtJQUFuRTtRQUFpRCw4QkFBa0I7SUFFbkUsQ0FBQztJQUFELGtDQUFDO0FBQUQsQ0FGQSxBQUVDLENBRmdELGtCQUFrQixHQUVsRTtBQUZZLG1DQUEyQiw4QkFFdkMsQ0FBQTtBQUtEO0lBQStDLDZDQUFpQjtJQUFoRTtRQUErQyw4QkFBaUI7SUFDaEUsQ0FBQztJQUFELGdDQUFDO0FBQUQsQ0FEQSxBQUNDLENBRDhDLGlCQUFpQixHQUMvRDtBQURZLGlDQUF5Qiw0QkFDckMsQ0FBQTtBQUtEO0lBQWdELDhDQUFpQjtJQUFqRTtRQUFnRCw4QkFBaUI7SUFNakUsQ0FBQztJQUFELGlDQUFDO0FBQUQsQ0FOQSxBQU1DLENBTitDLGlCQUFpQixHQU1oRTtBQU5ZLGtDQUEwQiw2QkFNdEMsQ0FBQTtBQUtEO0lBQTJDLHlDQUEwQjtJQUFyRTtRQUEyQyw4QkFBMEI7SUFDckUsQ0FBQztJQUFELDRCQUFDO0FBQUQsQ0FEQSxBQUNDLENBRDBDLDBCQUEwQixHQUNwRTtBQURZLDZCQUFxQix3QkFDakMsQ0FBQTtBQUtEO0lBQThDLDRDQUFpQjtJQUEvRDtRQUE4Qyw4QkFBaUI7SUFHL0QsQ0FBQztJQUFELCtCQUFDO0FBQUQsQ0FIQSxBQUdDLENBSDZDLGlCQUFpQixHQUc5RDtBQUhZLGdDQUF3QiwyQkFHcEMsQ0FBQTtBQUtEO0lBQThDLDRDQUF3QjtJQUF0RTtRQUE4Qyw4QkFBd0I7SUFDdEUsQ0FBQztJQUFELCtCQUFDO0FBQUQsQ0FEQSxBQUNDLENBRDZDLHdCQUF3QixHQUNyRTtBQURZLGdDQUF3QiwyQkFDcEMsQ0FBQTtBQUtEO0lBQThDLDRDQUFpQjtJQUEvRDtRQUE4Qyw4QkFBaUI7SUFHL0QsQ0FBQztJQUFELCtCQUFDO0FBQUQsQ0FIQSxBQUdDLENBSDZDLGlCQUFpQixHQUc5RDtBQUhZLGdDQUF3QiwyQkFHcEMsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2NoYXJ0L3BhcmFtZXRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWV3YW4gb24gMy80LzIwMTYuXG4gKi9cbmltcG9ydCB7UGFkZGluZywgUG9pbnQsIFNpemUsIE9mZnNldH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7SUFubm90YXRpb24sIEFubm90YXRpb259IGZyb20gXCIuL2Fubm90YXRpb25zXCI7XG5pbXBvcnQge0Jhcn0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqXG4gKiBBeGlzIHNlbGVjdG9yXG4gKi9cbmV4cG9ydCBlbnVtIEF4ZXMgeyBYWSwgWCwgWSwgTm9uZSB9XG5cbi8qKlxuICogQ2hhcnQgcGFyYW1ldGVycyBhcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ2hhcnRQYXJhbWV0ZXJzIHtcbiAgICAvLyBjaGFydCBkaW1lbnNpb24gcGFyYW1ldGVyc1xuICAgIHdpZHRoPzogbnVtYmVyO1xuICAgIGhlaWdodD86IG51bWJlcjtcbiAgICBwYWRkaW5nPzogUGFkZGluZztcblxuICAgIC8vIGNoYXJ0IGF4ZXMgcGFyYW1ldGVyc1xuICAgIHNob3dheGVzPzogQXhlczsgICAgICAgLy8gQXhlcyB0byBzaG93OiBYWSwgWCwgWSBvciBOb25lXG4gICAgc2hvd2dyaWRsaW5lcz86IEF4ZXM7ICAvLyBBeGlzIGdyaWRsaW5lcyB0byBzaG93OiBYWSwgWCwgWSBvciBOb25lXG4gICAgeHRpY2tzPzogbnVtYmVyOyAgLy8gbnVtYmVyIG9mIHRpY2tzIG9uIHggYXhpc1xuICAgIHl0aWNrcz86IG51bWJlcjsgIC8vIG51bWJlciBvZiB0aWNrcyBvbiB5IGF4aXNcbiAgICB5MnRpY2tzPzogbnVtYmVyOyAvLyBudW1iZXIgb2YgdGlja3Mgb24geTIgYXhpc1xuICAgIHhtaW4/OiBudW1iZXI7ICAgIC8vIHggYXhpcyBtaW5pbXVtXG4gICAgeG1heD86IG51bWJlcjsgICAgLy8geCBheGlzIG1heGltdW1cbiAgICB5bWluPzogbnVtYmVyOyAgICAvLyB5IGF4aXMgbWluaW11bVxuICAgIHltYXg/OiBudW1iZXI7ICAgIC8vIHkgYXhpcyBtYXhpbXVtXG4gICAgeTJtaW4/OiBudW1iZXI7ICAgLy8geTIgYXhpcyBtaW5pbXVtXG4gICAgeTJtYXg/OiBudW1iZXI7ICAgLy8geTIgYXhpcyBtYXhpbXVtXG5cbiAgICAvLyBiYXIgY2hhcnQgcGFyYW1ldGVyc1xuICAgIGJhcnNwYWNpbmc/OiBudW1iZXI7ICAgIC8vIHNwYWNpbmcgKGluIHBpeGVscykgYmV0d2VlbiBiYXJzXG4gICAgb25iYXJjbGljaz86IChiYXI6IEJhcikgPT4gdm9pZDsgIC8vIGFjdGlvbiB0byBwZXJmb3JtIG9uIGJhciBjbGlja1xuICAgIG9uYmFyaG92ZXI/OiAoYmFyOiBCYXIpID0+IHZvaWQ7ICAvLyBhY3Rpb24gdG8gcGVyZm9ybSBvbiBiYXIgaG92ZXJcblxuICAgIC8vIGhpZ2hsaWdodCBiYXJzIG9uIGhvdmVyIGZvciBiYXIgY2hhcnRzIGFuZCBoaXN0b2dyYW1zXG4gICAgaGlnaGxpZ2h0PzogYm9vbGVhbjtcblxuICAgIC8vIGxlZ2VuZCBkaXNwbGF5IHBhcmFtZXRlcnMgKGZvciBjaGFydHMgdGhhdCBzaG93IG11bHRpcGxlIGRhdGEpXG4gICAgc2hvd2xlZ2VuZD86IGJvb2xlYW47XG4gICAgbGVnZW5kb2Zmc2V0PzogT2Zmc2V0O1xuXG4gICAgLy8gc2NhdHRlciBwbG90IHBhcmFtZXRlcnNcbiAgICBvbmRvdGNsaWNrPzogKGRvdDogUG9pbnQpID0+IHZvaWQ7IC8vIGFjdGlvbiB0byBwZXJmb3JtIG9uIGRvdCBjbGlja1xuICAgIG9uZG90aG92ZXI/OiAoZG90OiBQb2ludCkgPT4gdm9pZDsgLy8gYWN0aW9uIHRvIHBlcmZvcm0gb24gZG90IGhvdmVyXG5cbiAgICAvLyBhbm5vdGF0aW9uIHBhcmFtZXRlcnNcbiAgICBhbm5vdGF0aW9ucz86IElBbm5vdGF0aW9uW107XG59XG5cbi8qKlxuICogQmFzZSBwYXJhbWV0ZXJzIGNsYXNzIGZvciBhbGwgY2hhcnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBDaGFydFBhcmFtZXRlcnMge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtc09iajogSUNoYXJ0UGFyYW1ldGVycyA9IG51bGwpIHtcblxuICAgICAgICBpZiAocGFyYW1zT2JqID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gcGFyYW1zT2JqKSB7XG4gICAgICAgICAgICBpZiAocGFyYW1zT2JqLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgdGhpc1twcm9wXSA9IHBhcmFtc09ialtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgcGFkZGluZzogUGFkZGluZztcbn1cblxuLyoqXG4gKiBCYXNlIHBhcmFtZXRlcnMgY2xhc3MgZm9yIGNoYXJ0cyB3aXRoIGFuIHggYW5kIHkgYXhpc1xuICovXG5leHBvcnQgY2xhc3MgWHlDaGFydFBhcmFtZXRlcnMgZXh0ZW5kcyBDaGFydFBhcmFtZXRlcnMge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtc09iajogYW55ID0gbnVsbCkge1xuICAgICAgICBzdXBlcihwYXJhbXNPYmopO1xuXG4gICAgICAgIGZvciAobGV0IGFpIGluIHRoaXMuYW5ub3RhdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFubm90YXRpb25zLmhhc093blByb3BlcnR5KGFpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5ub3RhdGlvbnNbYWldID0gQW5ub3RhdGlvbi5DcmVhdGUodGhpcy5hbm5vdGF0aW9uc1thaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd2F4ZXM6IEF4ZXM7XG4gICAgc2hvd2dyaWRsaW5lczogQXhlcztcbiAgICB4dGlja3M6IG51bWJlcjtcbiAgICB5dGlja3M6IG51bWJlcjtcbiAgICB4bWluOiBudW1iZXI7XG4gICAgeG1heDogbnVtYmVyO1xuICAgIHltaW46IG51bWJlcjtcbiAgICB5bWF4OiBudW1iZXI7XG4gICAgYW5ub3RhdGlvbnM6IElBbm5vdGF0aW9uW107XG59XG5cbi8qKlxuICogQmFzZSBwYXJhbWV0ZXJzIGNsYXNzIGZvciBjaGFydHMgd2l0aCBhbiB4IGF4aXMgYW5kIHR3byB5IGF4ZXNcbiAqL1xuZXhwb3J0IGNsYXNzIFh5eUNoYXJ0UGFyYW1ldGVycyBleHRlbmRzIFh5Q2hhcnRQYXJhbWV0ZXJzIHtcbiAgICB5Mm1pbjogbnVtYmVyO1xuICAgIHkybWF4OiBudW1iZXI7XG4gICAgeTJ0aWNrczogbnVtYmVyO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgY2hhcnQgbGVnZW5kIHBhcmFtZXRlcnNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMZWdlbmRQYXJhbWV0ZXJzIHtcbiAgICBzaG93bGVnZW5kOiBib29sZWFuO1xuICAgIGxlZ2VuZG9mZnNldDogT2Zmc2V0O1xufVxuXG4vKipcbiAqIEJhciBjaGFydCBwYXJhbWV0ZXJzXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXJDaGFydFBhcmFtZXRlcnMgZXh0ZW5kcyBYeUNoYXJ0UGFyYW1ldGVycyB7XG4gICAgYmFyc3BhY2luZzogbnVtYmVyO1xuICAgIG9uYmFyY2xpY2s6IChiYXI6IEJhcikgPT4gdm9pZDtcbiAgICBvbmJhcmhvdmVyOiAoYmFyOiBCYXIpID0+IHZvaWQ7XG4gICAgaGlnaGxpZ2h0OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEhpc3RvZ3JhbSBwYXJhbWV0ZXJzXG4gKi9cbmV4cG9ydCBjbGFzcyBIaXN0b2dyYW1QYXJhbWV0ZXJzIGV4dGVuZHMgWHlDaGFydFBhcmFtZXRlcnMge1xuICAgIGhpZ2hsaWdodDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBIaXN0b2dyYW0gcGx1cyBhIGxpbmUgcGFyYW1ldGVyc1xuICovXG5leHBvcnQgY2xhc3MgSGlzdG9ncmFtUGx1c0xpbmVQYXJhbWV0ZXJzIGV4dGVuZHMgWHl5Q2hhcnRQYXJhbWV0ZXJzIHtcbiAgICBoaWdobGlnaHQ6IGJvb2xlYW47XG59XG5cbi8qKlxuICogU2ltcGxlIGxpbmUgY2hhcnQgcGFyYW1ldGVyc1xuICovXG5leHBvcnQgY2xhc3MgU2ltcGxlTGluZUNoYXJ0UGFyYW1ldGVycyBleHRlbmRzIFh5Q2hhcnRQYXJhbWV0ZXJzIHtcbn1cblxuLyoqXG4gKiBNdWx0aS1zY2F0dGVyIHBsb3QgcGFyYW1ldGVyc1xuICovXG5leHBvcnQgY2xhc3MgTXVsdGlTY2F0dGVyUGxvdFBhcmFtZXRlcnMgZXh0ZW5kcyBYeUNoYXJ0UGFyYW1ldGVycyBpbXBsZW1lbnRzIExlZ2VuZFBhcmFtZXRlcnMge1xuICAgIG9uZG90Y2xpY2s6IChkb3Q6IFBvaW50KSA9PiB2b2lkO1xuICAgIG9uZG90aG92ZXI6IChkb3Q6IFBvaW50KSA9PiB2b2lkO1xuXG4gICAgc2hvd2xlZ2VuZDogYm9vbGVhbjtcbiAgICBsZWdlbmRvZmZzZXQ6IE9mZnNldDtcbn1cblxuLyoqXG4gKiBTY2F0dGVyIHBsb3QgcGFyYW1ldGVyc1xuICovXG5leHBvcnQgY2xhc3MgU2NhdHRlclBsb3RQYXJhbWV0ZXJzIGV4dGVuZHMgTXVsdGlTY2F0dGVyUGxvdFBhcmFtZXRlcnMge1xufVxuXG4vKipcbiAqIE11bHRpLWhpc3RvZ3JhbSBwYXJhbWV0ZXJzXG4gKi9cbmV4cG9ydCBjbGFzcyBNdWx0aUhpc3RvZ3JhbVBhcmFtZXRlcnMgZXh0ZW5kcyBYeUNoYXJ0UGFyYW1ldGVycyBpbXBsZW1lbnRzIExlZ2VuZFBhcmFtZXRlcnMge1xuICAgIGxlZ2VuZG9mZnNldDogT2Zmc2V0O1xuICAgIHNob3dsZWdlbmQ6IGJvb2xlYW47XG59XG5cbi8qKlxuICogRHVhbCBoaXN0b2dyYW0gcGFyYW1ldGVyc1xuICovXG5leHBvcnQgY2xhc3MgRHVhbEhpc3RvZ3JhbXNQYXJhbWV0ZXJzIGV4dGVuZHMgTXVsdGlIaXN0b2dyYW1QYXJhbWV0ZXJzIHtcbn1cblxuLyoqXG4gKiBNdWx0aS1saW5lIGNoYXJ0IHBhcmFtZXRlcnNcbiAqL1xuZXhwb3J0IGNsYXNzIE11bHRpTGluZUNoYXJ0UGFyYW1ldGVycyBleHRlbmRzIFh5Q2hhcnRQYXJhbWV0ZXJzIGltcGxlbWVudHMgTGVnZW5kUGFyYW1ldGVycyB7XG4gICAgbGVnZW5kb2Zmc2V0OiBPZmZzZXQ7XG4gICAgc2hvd2xlZ2VuZDogYm9vbGVhbjtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==