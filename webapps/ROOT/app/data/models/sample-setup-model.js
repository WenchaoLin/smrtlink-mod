"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require("athenaeum/common/model");
var PolymeraseChemistry;
(function (PolymeraseChemistry) {
    PolymeraseChemistry[PolymeraseChemistry["P4"] = 0] = "P4";
    PolymeraseChemistry[PolymeraseChemistry["P5"] = 1] = "P5";
    PolymeraseChemistry[PolymeraseChemistry["P6V2"] = 2] = "P6V2";
})(PolymeraseChemistry || (PolymeraseChemistry = {}));
var Loading;
(function (Loading) {
    Loading[Loading["Diffusion"] = 0] = "Diffusion";
    Loading[Loading["MagBead"] = 1] = "MagBead";
})(Loading || (Loading = {}));
;
// TODO: Reconcile with interface SampleObject?
var BindingCalculationModel = (function (_super) {
    __extends(BindingCalculationModel, _super);
    function BindingCalculationModel(object) {
        _super.call(this);
        this.initialize(object);
    }
    return BindingCalculationModel;
}(model_1.Model));
exports.BindingCalculationModel = BindingCalculationModel;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL21vZGVscy9zYW1wbGUtc2V0dXAtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0JBQW9CLHdCQUF3QixDQUFDLENBQUE7QUFFN0MsSUFBSyxtQkFJSjtBQUpELFdBQUssbUJBQW1CO0lBQ3BCLHlEQUFFLENBQUE7SUFDRix5REFBRSxDQUFBO0lBQ0YsNkRBQUksQ0FBQTtBQUNSLENBQUMsRUFKSSxtQkFBbUIsS0FBbkIsbUJBQW1CLFFBSXZCO0FBRUQsSUFBSyxPQUdKO0FBSEQsV0FBSyxPQUFPO0lBQ1IsK0NBQVMsQ0FBQTtJQUNULDJDQUFPLENBQUE7QUFDWCxDQUFDLEVBSEksT0FBTyxLQUFQLE9BQU8sUUFHWDtBQUFBLENBQUM7QUFFRiwrQ0FBK0M7QUFDL0M7SUFBNkMsMkNBQUs7SUFxQjlDLGlDQUFZLE1BQWdDO1FBQ3hDLGlCQUFPLENBQUM7UUFFUixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDTCw4QkFBQztBQUFELENBMUJBLEFBMEJDLENBMUI0QyxhQUFLLEdBMEJqRDtBQTFCWSwrQkFBdUIsMEJBMEJuQyxDQUFBIiwiZmlsZSI6ImFwcC9kYXRhL21vZGVscy9zYW1wbGUtc2V0dXAtbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZGVsfSBmcm9tIFwiYXRoZW5hZXVtL2NvbW1vbi9tb2RlbFwiO1xuXG5lbnVtIFBvbHltZXJhc2VDaGVtaXN0cnkge1xuICAgIFA0LFxuICAgIFA1LFxuICAgIFA2VjJcbn1cblxuZW51bSBMb2FkaW5nIHtcbiAgICBEaWZmdXNpb24sXG4gICAgTWFnQmVhZFxufTtcblxuLy8gVE9ETzogUmVjb25jaWxlIHdpdGggaW50ZXJmYWNlIFNhbXBsZU9iamVjdD9cbmV4cG9ydCBjbGFzcyBCaW5kaW5nQ2FsY3VsYXRpb25Nb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogc3RyaW5nO1xuICAgIGNyZWF0ZWRCeTogc3RyaW5nO1xuXG4gICAgLy8gU2FtcGxlXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGNvbmNlbnRyYXRpb25fbmdfcGVyX3VMOiBudW1iZXI7XG4gICAgYXZhaWxhYmxlVm9sdW1lX3VMOiBudW1iZXI7XG4gICAgaW5zZXJ0U2l6ZV9icDogbnVtYmVyO1xuICAgIHNpemVTZWxlY3Rpb246IGJvb2xlYW47XG5cbiAgICAvLyBDYWxjdWxhdGlvblxuICAgIC8vIG51bWJlck9mU01SVENlbGxzIGNvdWxkIGluc3RlYWQgYmUgY2FsbGVkIGNlbGxzVG9CaW5kXG4gICAgbnVtYmVyT2ZTTVJUQ2VsbHM6IG51bWJlcjtcbiAgICBsb2FkaW5nVGl0cmF0aW9uOiBib29sZWFuO1xuICAgIGxvYWRpbmc6IExvYWRpbmc7XG4gICAgcG9seW1lcmFzZUNoZW1pc3RyeTogUG9seW1lcmFzZUNoZW1pc3RyeTtcbiAgICBkbmFDb250cm9sQ29tcGxleDogYm9vbGVhbjtcbiAgICBjZWxsUmV1c2U6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihvYmplY3Q/OiBCaW5kaW5nQ2FsY3VsYXRpb25Nb2RlbCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZShvYmplY3QpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==