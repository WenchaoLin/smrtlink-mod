"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChartStyle = (function () {
    function ChartStyle(styleObj) {
        if (styleObj === void 0) { styleObj = null; }
        if (styleObj == null) {
            return;
        }
        for (var prop in styleObj) {
            if (styleObj.hasOwnProperty(prop)) {
                this[prop] = styleObj[prop];
            }
        }
    }
    return ChartStyle;
}());
exports.ChartStyle = ChartStyle;
var XyChartStyle = (function (_super) {
    __extends(XyChartStyle, _super);
    function XyChartStyle() {
        _super.apply(this, arguments);
    }
    return XyChartStyle;
}(ChartStyle));
exports.XyChartStyle = XyChartStyle;
var XyyChartStyle = (function (_super) {
    __extends(XyyChartStyle, _super);
    function XyyChartStyle() {
        _super.apply(this, arguments);
    }
    return XyyChartStyle;
}(XyChartStyle));
exports.XyyChartStyle = XyyChartStyle;
var BarChartStyle = (function (_super) {
    __extends(BarChartStyle, _super);
    function BarChartStyle() {
        _super.apply(this, arguments);
    }
    return BarChartStyle;
}(XyChartStyle));
exports.BarChartStyle = BarChartStyle;
var HistogramStyle = (function (_super) {
    __extends(HistogramStyle, _super);
    function HistogramStyle() {
        _super.apply(this, arguments);
    }
    return HistogramStyle;
}(BarChartStyle));
exports.HistogramStyle = HistogramStyle;
var HistogramPlusLineStyle = (function (_super) {
    __extends(HistogramPlusLineStyle, _super);
    function HistogramPlusLineStyle() {
        _super.apply(this, arguments);
    }
    return HistogramPlusLineStyle;
}(XyyChartStyle));
exports.HistogramPlusLineStyle = HistogramPlusLineStyle;
var MultiHistogramStyle = (function (_super) {
    __extends(MultiHistogramStyle, _super);
    function MultiHistogramStyle() {
        _super.apply(this, arguments);
    }
    return MultiHistogramStyle;
}(XyChartStyle));
exports.MultiHistogramStyle = MultiHistogramStyle;
var DualHistogramStyle = (function (_super) {
    __extends(DualHistogramStyle, _super);
    function DualHistogramStyle() {
        _super.apply(this, arguments);
    }
    return DualHistogramStyle;
}(MultiHistogramStyle));
exports.DualHistogramStyle = DualHistogramStyle;
var MultiLineChartStyle = (function (_super) {
    __extends(MultiLineChartStyle, _super);
    function MultiLineChartStyle() {
        _super.apply(this, arguments);
    }
    return MultiLineChartStyle;
}(XyChartStyle));
exports.MultiLineChartStyle = MultiLineChartStyle;
var SimpleLineChartStyle = (function (_super) {
    __extends(SimpleLineChartStyle, _super);
    function SimpleLineChartStyle() {
        _super.apply(this, arguments);
    }
    return SimpleLineChartStyle;
}(XyChartStyle));
exports.SimpleLineChartStyle = SimpleLineChartStyle;
var MultiScatterPlotStyle = (function (_super) {
    __extends(MultiScatterPlotStyle, _super);
    function MultiScatterPlotStyle() {
        _super.apply(this, arguments);
    }
    return MultiScatterPlotStyle;
}(XyChartStyle));
exports.MultiScatterPlotStyle = MultiScatterPlotStyle;
var ScatterPlotStyle = (function (_super) {
    __extends(ScatterPlotStyle, _super);
    function ScatterPlotStyle() {
        _super.apply(this, arguments);
    }
    return ScatterPlotStyle;
}(MultiScatterPlotStyle));
exports.ScatterPlotStyle = ScatterPlotStyle;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2hhcnQvc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQTBDQTtJQUNJLG9CQUFZLFFBQTRCO1FBQTVCLHdCQUE0QixHQUE1QixlQUE0QjtRQUNwQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFJTCxpQkFBQztBQUFELENBZkEsQUFlQyxJQUFBO0FBZlksa0JBQVUsYUFldEIsQ0FBQTtBQUtEO0lBQWtDLGdDQUFVO0lBQTVDO1FBQWtDLDhCQUFVO0lBUTVDLENBQUM7SUFBRCxtQkFBQztBQUFELENBUkEsQUFRQyxDQVJpQyxVQUFVLEdBUTNDO0FBUlksb0JBQVksZUFReEIsQ0FBQTtBQUtEO0lBQW1DLGlDQUFZO0lBQS9DO1FBQW1DLDhCQUFZO0lBQy9DLENBQUM7SUFBRCxvQkFBQztBQUFELENBREEsQUFDQyxDQURrQyxZQUFZLEdBQzlDO0FBRFkscUJBQWEsZ0JBQ3pCLENBQUE7QUFhRDtJQUFtQyxpQ0FBWTtJQUEvQztRQUFtQyw4QkFBWTtJQUcvQyxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUhBLEFBR0MsQ0FIa0MsWUFBWSxHQUc5QztBQUhZLHFCQUFhLGdCQUd6QixDQUFBO0FBS0Q7SUFBb0Msa0NBQWE7SUFBakQ7UUFBb0MsOEJBQWE7SUFDakQsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FEQSxBQUNDLENBRG1DLGFBQWEsR0FDaEQ7QUFEWSxzQkFBYyxpQkFDMUIsQ0FBQTtBQUtEO0lBQTRDLDBDQUFhO0lBQXpEO1FBQTRDLDhCQUFhO0lBSXpELENBQUM7SUFBRCw2QkFBQztBQUFELENBSkEsQUFJQyxDQUoyQyxhQUFhLEdBSXhEO0FBSlksOEJBQXNCLHlCQUlsQyxDQUFBO0FBS0Q7SUFBeUMsdUNBQVk7SUFBckQ7UUFBeUMsOEJBQVk7SUFJckQsQ0FBQztJQUFELDBCQUFDO0FBQUQsQ0FKQSxBQUlDLENBSndDLFlBQVksR0FJcEQ7QUFKWSwyQkFBbUIsc0JBSS9CLENBQUE7QUFLRDtJQUF3QyxzQ0FBbUI7SUFBM0Q7UUFBd0MsOEJBQW1CO0lBQzNELENBQUM7SUFBRCx5QkFBQztBQUFELENBREEsQUFDQyxDQUR1QyxtQkFBbUIsR0FDMUQ7QUFEWSwwQkFBa0IscUJBQzlCLENBQUE7QUFLRDtJQUF5Qyx1Q0FBWTtJQUFyRDtRQUF5Qyw4QkFBWTtJQUtyRCxDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQUxBLEFBS0MsQ0FMd0MsWUFBWSxHQUtwRDtBQUxZLDJCQUFtQixzQkFLL0IsQ0FBQTtBQUtEO0lBQTBDLHdDQUFZO0lBQXREO1FBQTBDLDhCQUFZO0lBR3RELENBQUM7SUFBRCwyQkFBQztBQUFELENBSEEsQUFHQyxDQUh5QyxZQUFZLEdBR3JEO0FBSFksNEJBQW9CLHVCQUdoQyxDQUFBO0FBS0Q7SUFBMkMseUNBQVk7SUFBdkQ7UUFBMkMsOEJBQVk7SUFRdkQsQ0FBQztJQUFELDRCQUFDO0FBQUQsQ0FSQSxBQVFDLENBUjBDLFlBQVksR0FRdEQ7QUFSWSw2QkFBcUIsd0JBUWpDLENBQUE7QUFLRDtJQUFzQyxvQ0FBcUI7SUFBM0Q7UUFBc0MsOEJBQXFCO0lBRTNELENBQUM7SUFBRCx1QkFBQztBQUFELENBRkEsQUFFQyxDQUZxQyxxQkFBcUIsR0FFMUQ7QUFGWSx3QkFBZ0IsbUJBRTVCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9jaGFydC9zdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWV3YW4gb24gMy80LzIwMTYuXG4gKi9cbmltcG9ydCB7Rm9udCwgU2hhcGV9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8qKlxuICogQ2hhcnQgc3R5bGUgYXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNoYXJ0U3R5bGUge1xuICAgIC8vIGRlZmF1bHQgZm9udCBhbmQgdGV4dCBjb2xvciB0byB1c2UgZm9yIGF4aXMgYW5kIGxlZ2VuZCBsYWJlbHNcbiAgICBkZWZhdWx0Rm9udD86IEZvbnQ7XG4gICAgZGVmYXVsdFRleHRDb2xvcj86IHN0cmluZztcblxuICAgIC8vIGF4aXMgc3R5bGluZ1xuICAgIGF4aXNDb2xvcj86IHN0cmluZztcbiAgICBheGlzU3Ryb2tlV2lkdGg/OiBudW1iZXI7XG4gICAgYXhpc0xhYmVsRm9udD86IEZvbnQ7XG4gICAgYXhpc0xhYmVsQ29sb3I/OiBzdHJpbmc7XG4gICAgYXhpc1RpdGxlRm9udD86IEZvbnQ7XG4gICAgYXhpc1RpdGxlQ29sb3I/OiBzdHJpbmc7XG4gICAgYXhpc0dyaWRDb2xvcj86IHN0cmluZztcblxuICAgIC8vIGNoYXJ0IGxpbmUsIHN5bWJvbCwgYmFyIGNvbG9yc1xuICAgIGNvbG9yPzogc3RyaW5nO1xuICAgIGNvbG9ycz86IHN0cmluZ1tdO1xuICAgIGhvdmVyY29sb3I/OiBzdHJpbmc7XG5cbiAgICAvLyBjaGFydCBsaW5lIHdpZHRoXG4gICAgbGluZXdpZHRoPzogbnVtYmVyO1xuXG4gICAgLy8gc3ltYm9sIHN0eWxpbmcgZm9yIHNjYXR0ZXIgcGxvdHNcbiAgICBzeW1ib2xzaGFwZT86IFNoYXBlO1xuICAgIHN5bWJvbHNpemU/OiBudW1iZXI7XG5cbiAgICAvLyBsZWdlbmQgc3R5bGluZ1xuICAgIGxlZ2VuZExhYmVsRm9udD86Rm9udDtcbiAgICBsZWdlbmRMYWJlbENvbG9yPzpzdHJpbmc7XG59XG5cbi8qKlxuICogQmFzZSBzdHlsZSBjYWxsIGZvciBhbGwgY2hhcnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBDaGFydFN0eWxlIGltcGxlbWVudHMgSUNoYXJ0U3R5bGUge1xuICAgIGNvbnN0cnVjdG9yKHN0eWxlT2JqOiBJQ2hhcnRTdHlsZSA9IG51bGwpIHtcbiAgICAgICAgaWYgKHN0eWxlT2JqID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gc3R5bGVPYmopIHtcbiAgICAgICAgICAgIGlmIChzdHlsZU9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgIHRoaXNbcHJvcF0gPSBzdHlsZU9ialtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlZmF1bHRGb250OiBGb250O1xuICAgIGRlZmF1bHRUZXh0Q29sb3I6IHN0cmluZztcbn1cblxuLyoqXG4gKiBCYXNlIHN0eWxlIGNsYXNzIGZvciBjaGFydCB3aXRoIHggYW5kIHkgYXhpc1xuICovXG5leHBvcnQgY2xhc3MgWHlDaGFydFN0eWxlIGV4dGVuZHMgQ2hhcnRTdHlsZSB7XG4gICAgYXhpc0NvbG9yOiBzdHJpbmc7XG4gICAgYXhpc1N0cm9rZVdpZHRoOiBudW1iZXI7XG4gICAgYXhpc0xhYmVsRm9udDogRm9udDtcbiAgICBheGlzTGFiZWxDb2xvcjogc3RyaW5nO1xuICAgIGF4aXNUaXRsZUZvbnQ6IEZvbnQ7XG4gICAgYXhpc1RpdGxlQ29sb3I6IHN0cmluZztcbiAgICBheGlzR3JpZENvbG9yOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQmFzZSBzdHlsZSBjbGFzcyBmb3IgY2hhcnQgd2l0aCBhbiB4IGF4aXMgYW5kIHR3byB5IGF4ZXNcbiAqL1xuZXhwb3J0IGNsYXNzIFh5eUNoYXJ0U3R5bGUgZXh0ZW5kcyBYeUNoYXJ0U3R5bGUge1xufVxuXG4vKipcbiAqICBJbnRlcmZhY2UgZm9yIGxlZ2VuZCBzdHlsaW5nXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTGVnZW5kU3R5bGUge1xuICAgIGxlZ2VuZExhYmVsRm9udDogRm9udDtcbiAgICBsZWdlbmRMYWJlbENvbG9yOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQmFyIGNoYXJ0IHN0eWxlXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXJDaGFydFN0eWxlIGV4dGVuZHMgWHlDaGFydFN0eWxlIHtcbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIGhvdmVyY29sb3I6IHN0cmluZztcbn1cblxuLyoqXG4gKiBIaXN0b2dyYW0gc3R5bGVcbiAqL1xuZXhwb3J0IGNsYXNzIEhpc3RvZ3JhbVN0eWxlIGV4dGVuZHMgQmFyQ2hhcnRTdHlsZSB7XG59XG5cbi8qKlxuICogSGlzdG9ncmFtIHBsdXMgbGluZSBzdHlsZVxuICovXG5leHBvcnQgY2xhc3MgSGlzdG9ncmFtUGx1c0xpbmVTdHlsZSBleHRlbmRzIFh5eUNoYXJ0U3R5bGUge1xuICAgIGNvbG9yczogc3RyaW5nW107XG4gICAgbGluZXdpZHRoOiBudW1iZXI7XG4gICAgaG92ZXJjb2xvcjogc3RyaW5nO1xufVxuXG4vKipcbiAqIE11bHRpLWhpc3RvZ3JhbSBzdHlsZVxuICovXG5leHBvcnQgY2xhc3MgTXVsdGlIaXN0b2dyYW1TdHlsZSBleHRlbmRzIFh5Q2hhcnRTdHlsZSBpbXBsZW1lbnRzIExlZ2VuZFN0eWxlIHtcbiAgICBsZWdlbmRMYWJlbEZvbnQ6Rm9udDtcbiAgICBsZWdlbmRMYWJlbENvbG9yOnN0cmluZztcbiAgICBjb2xvcnM6IHN0cmluZ1tdO1xufVxuXG4vKipcbiAqIER1YWwgaGlzdG9ncmFtIHN0eWxlXG4gKi9cbmV4cG9ydCBjbGFzcyBEdWFsSGlzdG9ncmFtU3R5bGUgZXh0ZW5kcyBNdWx0aUhpc3RvZ3JhbVN0eWxlIHtcbn1cblxuLyoqXG4gKiBNdWx0aS1saW5lIGNoYXJ0IHN0eWxlXG4gKi9cbmV4cG9ydCBjbGFzcyBNdWx0aUxpbmVDaGFydFN0eWxlIGV4dGVuZHMgWHlDaGFydFN0eWxlIGltcGxlbWVudHMgTGVnZW5kU3R5bGUge1xuICAgIGxlZ2VuZExhYmVsRm9udDogRm9udDtcbiAgICBsZWdlbmRMYWJlbENvbG9yOiBzdHJpbmc7XG4gICAgY29sb3JzOiBzdHJpbmdbXTtcbiAgICBsaW5ld2lkdGg6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBTaW1sZSBsaW5lIGNoYXJ0IHN0eWxlXG4gKi9cbmV4cG9ydCBjbGFzcyBTaW1wbGVMaW5lQ2hhcnRTdHlsZSBleHRlbmRzIFh5Q2hhcnRTdHlsZSB7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBsaW5ld2lkdGg6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBNdWx0aS1zY2F0dGVyIHBsb3Qgc3R5bGVcbiAqL1xuZXhwb3J0IGNsYXNzIE11bHRpU2NhdHRlclBsb3RTdHlsZSBleHRlbmRzIFh5Q2hhcnRTdHlsZSBpbXBsZW1lbnRzIExlZ2VuZFN0eWxlIHtcbiAgICBzeW1ib2xzaGFwZTogU2hhcGU7XG4gICAgc3ltYm9sc2l6ZTogbnVtYmVyO1xuICAgIGhvdmVyY29sb3I6IHN0cmluZztcblxuICAgIGxlZ2VuZExhYmVsRm9udDogRm9udDtcbiAgICBsZWdlbmRMYWJlbENvbG9yOiBzdHJpbmc7XG4gICAgY29sb3JzOiBzdHJpbmdbXTtcbn1cblxuLyoqXG4gKiBTY2F0dGVyIHBsb3Qgc3R5bGVcbiAqL1xuZXhwb3J0IGNsYXNzIFNjYXR0ZXJQbG90U3R5bGUgZXh0ZW5kcyBNdWx0aVNjYXR0ZXJQbG90U3R5bGUge1xuICAgIGNvbG9yOiBzdHJpbmc7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=