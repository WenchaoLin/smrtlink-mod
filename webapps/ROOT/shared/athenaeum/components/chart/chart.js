"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var router_1 = require("angular2/router");
var charts_1 = require("./charts");
var charts_2 = require("./charts");
exports.ChartType = charts_2.ChartType;
exports.ChartDefaultSettings = charts_2.ChartDefaultSettings;
var parameters_1 = require("./parameters");
exports.Axes = parameters_1.Axes;
var annotations_1 = require("./annotations");
exports.AnnotationType = annotations_1.AnnotationType;
exports.Align = annotations_1.Align;
exports.Baseline = annotations_1.Baseline;
var types_1 = require("./types");
exports.FontWeight = types_1.FontWeight;
exports.FontStyle = types_1.FontStyle;
exports.Shape = types_1.Shape;
var Chart = (function () {
    function Chart(elementRef) {
        this.nativeElement = elementRef.nativeElement;
        this.chartid = "chart" + (Chart.numberOfCharts + 1);
        Chart.numberOfCharts++;
    }
    Chart.prototype.ngAfterViewInit = function () {
        this.chart = charts_1.ChartFactory.MakeChart(this.spec.type, {
            xaxis: this.spec.xaxistitle,
            yaxis: this.spec.yaxistitle,
            y2axis: this.spec.y2axistitle
        }, this.spec.parameters, this.spec.style);
        this.chart.show(this.chartid, this.spec.data);
    };
    Chart.prototype.ngOnDestroy = function () {
    };
    Chart.numberOfCharts = 0;
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "spec", void 0);
    Chart = __decorate([
        core_1.Component({
            selector: "pb-chart",
            moduleId: module.id,
            templateUrl: "chart.html",
            directives: [router_1.ROUTER_DIRECTIVES],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Chart);
    return Chart;
}());
exports.Chart = Chart;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2hhcnQvY2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLHFCQUVPLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLHVCQUFnQyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2xELHVCQUEyQixVQUFVLENBQUMsQ0FBQTtBQUN0Qyx1QkFBOEMsVUFBVSxDQUFDLENBQUE7QUFPakQsaUJBQVM7QUFBRSw0QkFBb0I7QUFOdkMsMkJBQXFDLGNBQWMsQ0FBQyxDQUFBO0FBTUYsWUFBSTtBQUx0RCw0QkFBMkQsZUFBZSxDQUFDLENBQUE7QUFLbkIsc0JBQWM7QUFDakQsYUFBSztBQUFFLGdCQUFRO0FBSnBDLHNCQUFnRSxTQUFTLENBQUMsQ0FBQTtBQUdJLGtCQUFVO0FBQUUsaUJBQVM7QUFDckYsYUFBSztBQXFCbkI7SUFXSSxlQUFZLFVBQXFCO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUM5QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCwrQkFBZSxHQUFmO1FBRUksSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBWSxDQUFDLFNBQVMsQ0FDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQ2Q7WUFDSSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO1lBQzNCLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVU7WUFDM0IsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztTQUNoQyxFQUNELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDbEIsQ0FBQztRQUVGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsMkJBQVcsR0FBWDtJQUNBLENBQUM7SUFqQ00sb0JBQWMsR0FBVyxDQUFDLENBQUM7SUFFbEM7UUFBQyxZQUFLLEVBQUU7O3VDQUFBO0lBVlo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxZQUFZO1lBQ3pCLFVBQVUsRUFBRSxDQUFDLDBCQUFpQixDQUFDO1lBQy9CLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3hDLENBQUM7O2FBQUE7SUFvQ0YsWUFBQztBQUFELENBbkNBLEFBbUNDLElBQUE7QUFuQ1ksYUFBSyxRQW1DakIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2NoYXJ0L2NoYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1ld2FuIG9uIDIvMjIvMjAxNi5cbiAqL1xuXG5cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgRWxlbWVudFJlZiwgSW5wdXRcbn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcbmltcG9ydCB7Q2hhcnRGYWN0b3J5fSBmcm9tIFwiLi9jaGFydHNcIjtcbmltcG9ydCB7Q2hhcnRUeXBlLCBDaGFydERlZmF1bHRTZXR0aW5nc30gZnJvbSBcIi4vY2hhcnRzXCI7XG5pbXBvcnQge0lDaGFydFBhcmFtZXRlcnMsIEF4ZXN9IGZyb20gXCIuL3BhcmFtZXRlcnNcIjtcbmltcG9ydCB7SUFubm90YXRpb24sIEFubm90YXRpb25UeXBlLCBBbGlnbiwgQmFzZWxpbmV9IGZyb20gXCIuL2Fubm90YXRpb25zXCI7XG5pbXBvcnQge0lDaGFydFN0eWxlfSBmcm9tIFwiLi9zdHlsZXNcIjtcbmltcG9ydCB7UGFkZGluZywgRm9udCwgRm9udFdlaWdodCwgRm9udFN0eWxlLCBTaXplLCBTaGFwZX0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7QmFyLCBEaXN0cmlidXRpb24sIER1YWxEaXN0cmlidXRpb25zLCBEaXN0cmlidXRpb25QbHVzTGluZSwgTmFtZWREaXN0cmlidXRpb24sIFBsb3QsIFBvaW50fSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQge0NoYXJ0VHlwZSwgQ2hhcnREZWZhdWx0U2V0dGluZ3MsIFBhZGRpbmcsIEF4ZXMsIEFubm90YXRpb25UeXBlLCBGb250LCBGb250V2VpZ2h0LCBGb250U3R5bGV9O1xuZXhwb3J0IHtTaXplLCBTaGFwZSwgQWxpZ24sIEJhc2VsaW5lfTtcbmV4cG9ydCB7SUNoYXJ0UGFyYW1ldGVycywgSUFubm90YXRpb24sIElDaGFydFN0eWxlfTtcbmV4cG9ydCB7QmFyLCBEaXN0cmlidXRpb24sIER1YWxEaXN0cmlidXRpb25zLCBEaXN0cmlidXRpb25QbHVzTGluZSwgTmFtZWREaXN0cmlidXRpb24sIFBsb3QsIFBvaW50fTtcblxuZXhwb3J0IGludGVyZmFjZSBDaGFydFNwZWMge1xuICAgIHR5cGU6IENoYXJ0VHlwZTtcbiAgICBkYXRhOiBhbnk7XG4gICAgeGF4aXN0aXRsZT86IHN0cmluZztcbiAgICB5YXhpc3RpdGxlPzogc3RyaW5nO1xuICAgIHkyYXhpc3RpdGxlPzogc3RyaW5nO1xuICAgIHBhcmFtZXRlcnM/OiBJQ2hhcnRQYXJhbWV0ZXJzO1xuICAgIHN0eWxlPzogSUNoYXJ0U3R5bGU7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBiLWNoYXJ0XCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCJjaGFydC5odG1sXCIsXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIENoYXJ0IHtcbiAgICBzdGF0aWMgbnVtYmVyT2ZDaGFydHM6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzcGVjOiBDaGFydFNwZWM7XG5cbiAgICBwdWJsaWMgY2hhcnRpZDogc3RyaW5nO1xuICAgIHB1YmxpYyBjaGFydDogYW55O1xuXG4gICAgcHJpdmF0ZSBuYXRpdmVFbGVtZW50OkhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjpFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5jaGFydGlkID0gXCJjaGFydFwiICsgKENoYXJ0Lm51bWJlck9mQ2hhcnRzICsgMSk7XG4gICAgICAgIENoYXJ0Lm51bWJlck9mQ2hhcnRzKys7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuXG4gICAgICAgIHRoaXMuY2hhcnQgPSBDaGFydEZhY3RvcnkuTWFrZUNoYXJ0KFxuICAgICAgICAgICAgdGhpcy5zcGVjLnR5cGUsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeGF4aXM6IHRoaXMuc3BlYy54YXhpc3RpdGxlLFxuICAgICAgICAgICAgICAgIHlheGlzOiB0aGlzLnNwZWMueWF4aXN0aXRsZSxcbiAgICAgICAgICAgICAgICB5MmF4aXM6IHRoaXMuc3BlYy55MmF4aXN0aXRsZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoaXMuc3BlYy5wYXJhbWV0ZXJzLFxuICAgICAgICAgICAgdGhpcy5zcGVjLnN0eWxlXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5jaGFydC5zaG93KHRoaXMuY2hhcnRpZCwgdGhpcy5zcGVjLmRhdGEpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==