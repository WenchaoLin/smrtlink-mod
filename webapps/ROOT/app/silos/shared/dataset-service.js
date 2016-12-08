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
var DatasetService = (function () {
    function DatasetService() {
        this.selectedDatasets = [];
    }
    DatasetService.prototype.setSelectedDatasets = function (datasets) {
        this.selectedDatasets = datasets;
    };
    DatasetService.prototype.getSelectedDatasets = function () {
        return this.selectedDatasets;
    };
    DatasetService.prototype.setFacet = function (facet) {
        this.facet = facet;
    };
    DatasetService.prototype.getFacet = function () {
        return this.facet;
    };
    DatasetService.prototype.setDatasetType = function (datasetType) {
        this.datasetType = datasetType;
    };
    DatasetService.prototype.getDatasetType = function () {
        return this.datasetType;
    };
    DatasetService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DatasetService);
    return DatasetService;
}());
exports.DatasetService = DatasetService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9zaGFyZWQvZGF0YXNldC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFLekM7SUFBQTtRQUNZLHFCQUFnQixHQUFlLEVBQUUsQ0FBQztJQTJCOUMsQ0FBQztJQXZCVSw0Q0FBbUIsR0FBMUIsVUFBMkIsUUFBb0I7UUFDM0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRU0sNENBQW1CLEdBQTFCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUNqQyxDQUFDO0lBRU0saUNBQVEsR0FBZixVQUFnQixLQUFZO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxpQ0FBUSxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVNLHVDQUFjLEdBQXJCLFVBQXNCLFdBQXdCO1FBQzFDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ25DLENBQUM7SUFFTSx1Q0FBYyxHQUFyQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUE1Qkw7UUFBQyxpQkFBVSxFQUFFOztzQkFBQTtJQTZCYixxQkFBQztBQUFELENBNUJBLEFBNEJDLElBQUE7QUE1Qlksc0JBQWMsaUJBNEIxQixDQUFBIiwiZmlsZSI6ImFwcC9zaWxvcy9zaGFyZWQvZGF0YXNldC1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtGYWNldH0gZnJvbSBcIi4uLy4uL2RhdGEvZmFjZXRzL2ZhY2V0XCI7XG5pbXBvcnQge0RhdGFzZXRUeXBlfSBmcm9tIFwiLi4vLi4vZGF0YS9kYXRhc2V0LXR5cGVcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFzZXRTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHNlbGVjdGVkRGF0YXNldHM6IEFycmF5PGFueT4gPSBbXTtcbiAgICBwcml2YXRlIGZhY2V0OiBGYWNldDtcbiAgICBwcml2YXRlIGRhdGFzZXRUeXBlOiBEYXRhc2V0VHlwZTtcblxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZERhdGFzZXRzKGRhdGFzZXRzOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRhc2V0cyA9IGRhdGFzZXRzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZWxlY3RlZERhdGFzZXRzKCk6IEFycmF5PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZERhdGFzZXRzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRGYWNldChmYWNldDogRmFjZXQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mYWNldCA9IGZhY2V0O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGYWNldCgpOiBGYWNldCB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhY2V0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXREYXRhc2V0VHlwZShkYXRhc2V0VHlwZTogRGF0YXNldFR5cGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0VHlwZSA9IGRhdGFzZXRUeXBlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRhc2V0VHlwZSgpOiBEYXRhc2V0VHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFzZXRUeXBlO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==