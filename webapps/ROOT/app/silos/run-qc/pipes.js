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
/**
 * Created by mewan on 4/5/2016.
 */
var core_1 = require("angular2/core");
var chart_1 = require("athenaeum/components/chart/chart");
var chart_2 = require("athenaeum/components/chart/chart");
var NumberFormatPipe = (function () {
    function NumberFormatPipe() {
    }
    NumberFormatPipe.prototype.transform = function (value, _a) {
        var digits = _a[0];
        if (value === undefined) {
            return "-";
        }
        if (digits === undefined) {
            return value.toFixed(0);
        }
        return value.toFixed(digits);
    };
    NumberFormatPipe = __decorate([
        core_1.Pipe({ name: "format" }), 
        __metadata('design:paramtypes', [])
    ], NumberFormatPipe);
    return NumberFormatPipe;
}());
exports.NumberFormatPipe = NumberFormatPipe;
var PercentProductivityPipe = (function () {
    function PercentProductivityPipe() {
    }
    PercentProductivityPipe.prototype.transform = function (productivity, _a) {
        var fieldname = _a[0];
        if (!productivity) {
            return undefined;
        }
        var count = productivity[fieldname];
        if (count === undefined) {
            return undefined;
        }
        var total = productivity.p0 + productivity.p1 + productivity.p2;
        return (count * 100.0) / total;
    };
    PercentProductivityPipe = __decorate([
        core_1.Pipe({ name: "percentproductivity" }), 
        __metadata('design:paramtypes', [])
    ], PercentProductivityPipe);
    return PercentProductivityPipe;
}());
exports.PercentProductivityPipe = PercentProductivityPipe;
var ProductivityCountPipe = (function () {
    function ProductivityCountPipe() {
    }
    ProductivityCountPipe.prototype.transform = function (productivity, _a) {
        var fieldname = _a[0];
        if (!productivity) {
            return undefined;
        }
        return productivity[fieldname];
    };
    ProductivityCountPipe = __decorate([
        core_1.Pipe({ name: "productivitycount" }), 
        __metadata('design:paramtypes', [])
    ], ProductivityCountPipe);
    return ProductivityCountPipe;
}());
exports.ProductivityCountPipe = ProductivityCountPipe;
var ReadStatPipe = (function () {
    function ReadStatPipe() {
    }
    ReadStatPipe.prototype.transform = function (readStats, _a) {
        var fieldname = _a[0];
        if (!readStats) {
            return undefined;
        }
        return readStats[fieldname];
    };
    ReadStatPipe = __decorate([
        core_1.Pipe({ name: "readstat" }), 
        __metadata('design:paramtypes', [])
    ], ReadStatPipe);
    return ReadStatPipe;
}());
exports.ReadStatPipe = ReadStatPipe;
var HistogramSpecPipe = (function () {
    function HistogramSpecPipe() {
    }
    HistogramSpecPipe.prototype.transform = function (data, _a) {
        var xLabel = _a[0], colorIndex = _a[1];
        return {
            type: chart_1.ChartType.Histogram,
            data: data,
            xaxistitle: xLabel,
            yaxistitle: "",
            parameters: {
                showgridlines: chart_2.Axes.None
            },
            style: {
                color: chart_1.ChartDefaultSettings.getPaletteColor(colorIndex ? colorIndex : 0)
            }
        };
    };
    HistogramSpecPipe = __decorate([
        core_1.Pipe({ name: "histogramspec" }), 
        __metadata('design:paramtypes', [])
    ], HistogramSpecPipe);
    return HistogramSpecPipe;
}());
exports.HistogramSpecPipe = HistogramSpecPipe;
var StatusCategoryPipe = (function () {
    function StatusCategoryPipe() {
    }
    StatusCategoryPipe.prototype.transform = function (status) {
        switch (status) {
            case "Complete":
                return "green";
            case "TransferFailed":
            case "Error":
            case "Failed":
                return "red";
            case "Pending":
            case "Initializing":
            case "SensorDiagnostics":
            case "Aligning":
            case "Aligned":
            case "ReadyToCalibrate":
            case "Calibrating":
            case "CalibrationComplete":
            case "ReadyToAcquire":
            case "Acquiring":
            case "FinishingAnalysis":
            case "PostPrimaryPending":
            case "TransferPending":
            case "TransferringResults":
            case "Completing":
                return "blue";
            case "Unknown":
            case "Stopped":
            case "Aborting":
            case "Aborted":
                return "orange";
            default:
                return "";
        }
    };
    StatusCategoryPipe = __decorate([
        core_1.Pipe({ name: "statuscategory" }), 
        __metadata('design:paramtypes', [])
    ], StatusCategoryPipe);
    return StatusCategoryPipe;
}());
exports.StatusCategoryPipe = StatusCategoryPipe;
var IsStatusComplete = (function () {
    function IsStatusComplete() {
    }
    IsStatusComplete.prototype.transform = function (status) {
        return status === "Complete";
    };
    IsStatusComplete = __decorate([
        core_1.Pipe({ name: "isstatuscomplete" }), 
        __metadata('design:paramtypes', [])
    ], IsStatusComplete);
    return IsStatusComplete;
}());
exports.IsStatusComplete = IsStatusComplete;
var PrettyTextPipe = (function () {
    function PrettyTextPipe() {
    }
    PrettyTextPipe.prototype.transform = function (text) {
        return text ? text.replace(/([A-Z])/g, " $1").trim() : String.EMPTY;
    };
    PrettyTextPipe = __decorate([
        core_1.Pipe({ name: "prettytext" }), 
        __metadata('design:paramtypes', [])
    ], PrettyTextPipe);
    return PrettyTextPipe;
}());
exports.PrettyTextPipe = PrettyTextPipe;
var DateTimeFormatePipe = (function () {
    function DateTimeFormatePipe() {
    }
    DateTimeFormatePipe.prototype.transform = function (value) {
        if (!value) {
            return "";
        }
        var date = new Date(value);
        return date.toLocaleString();
    };
    DateTimeFormatePipe = __decorate([
        core_1.Pipe({ name: "datetimeformat" }), 
        __metadata('design:paramtypes', [])
    ], DateTimeFormatePipe);
    return DateTimeFormatePipe;
}());
exports.DateTimeFormatePipe = DateTimeFormatePipe;
var SampleTooltipPipe = (function () {
    function SampleTooltipPipe() {
    }
    SampleTooltipPipe.prototype.transform = function (sample) {
        return sample ? sample.summary : "";
    };
    SampleTooltipPipe = __decorate([
        core_1.Pipe({ name: "sampletooltip" }), 
        __metadata('design:paramtypes', [])
    ], SampleTooltipPipe);
    return SampleTooltipPipe;
}());
exports.SampleTooltipPipe = SampleTooltipPipe;
exports.PIPES = [NumberFormatPipe, PercentProductivityPipe, ProductivityCountPipe, ReadStatPipe,
    HistogramSpecPipe, StatusCategoryPipe, IsStatusComplete, DateTimeFormatePipe, PrettyTextPipe, SampleTooltipPipe];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9ydW4tcWMvcGlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gscUJBQWtDLGVBQWUsQ0FBQyxDQUFBO0FBRWxELHNCQUF5RCxrQ0FBa0MsQ0FBQyxDQUFBO0FBQzVGLHNCQUFtRCxrQ0FBa0MsQ0FBQyxDQUFBO0FBR3RGO0lBQUE7SUFXQSxDQUFDO0lBVkcsb0NBQVMsR0FBVCxVQUFVLEtBQWEsRUFBRSxFQUFRO1lBQVAsY0FBTTtRQUM1QixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBWEw7UUFBQyxXQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7O3dCQUFBO0lBWXZCLHVCQUFDO0FBQUQsQ0FYQSxBQVdDLElBQUE7QUFYWSx3QkFBZ0IsbUJBVzVCLENBQUE7QUFHRDtJQUFBO0lBZ0JBLENBQUM7SUFmRywyQ0FBUyxHQUFULFVBQVUsWUFBMEIsRUFBRSxFQUFXO1lBQVYsaUJBQVM7UUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVELElBQUksS0FBSyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsU0FBUyxDQUFDO1FB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SUFBQTtJQVFBLENBQUM7SUFQRyx1Q0FBUyxHQUFULFVBQVUsS0FBYTtRQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVCxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUNELElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQVJMO1FBQUMsV0FBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFDLENBQUM7OzJCQUFBO0lBUy9CLDBCQUFDO0FBQUQsQ0FSQSxBQVFDLElBQUE7QUFSWSwyQkFBbUIsc0JBUS9CLENBQUE7QUFHRDtJQUFBO0lBSUEsQ0FBQztJQUhHLHFDQUFTLEdBQVQsVUFBVSxNQUF3QjtRQUM5QixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFKTDtRQUFDLFdBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxlQUFlLEVBQUMsQ0FBQzs7eUJBQUE7SUFLOUIsd0JBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLHlCQUFpQixvQkFJN0IsQ0FBQTtBQUVZLGFBQUssR0FBRyxDQUFFLGdCQUFnQixFQUFFLHVCQUF1QixFQUFFLHFCQUFxQixFQUFFLFlBQVk7SUFDakcsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixDQUFFLENBQUMiLCJmaWxlIjoiYXBwL3NpbG9zL3J1bi1xYy9waXBlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtZXdhbiBvbiA0LzUvMjAxNi5cbiAqL1xuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtSdW5RY1NhbXBsZU1vZGVsLCBSZWFkU3RhdHMsIFByb2R1Y3Rpdml0eX0gZnJvbSBcIi4uLy4uL2RhdGEvbW9kZWxzL3J1bi1xYy1tb2RlbFwiO1xuaW1wb3J0IHtDaGFydERlZmF1bHRTZXR0aW5ncywgQ2hhcnRUeXBlLCBDaGFydFNwZWN9IGZyb20gXCJhdGhlbmFldW0vY29tcG9uZW50cy9jaGFydC9jaGFydFwiO1xuaW1wb3J0IHtJQ2hhcnRQYXJhbWV0ZXJzLCBBeGVzLCBEaXN0cmlidXRpb259IGZyb20gXCJhdGhlbmFldW0vY29tcG9uZW50cy9jaGFydC9jaGFydFwiO1xuXG5AUGlwZSh7bmFtZTogXCJmb3JtYXRcIn0pXG5leHBvcnQgY2xhc3MgTnVtYmVyRm9ybWF0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogbnVtYmVyLCBbZGlnaXRzXSk6IHN0cmluZyB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gXCItXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGlnaXRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b0ZpeGVkKDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZS50b0ZpeGVkKGRpZ2l0cyk7XG4gICAgfVxufVxuXG5AUGlwZSh7bmFtZTogXCJwZXJjZW50cHJvZHVjdGl2aXR5XCJ9KVxuZXhwb3J0IGNsYXNzIFBlcmNlbnRQcm9kdWN0aXZpdHlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHByb2R1Y3Rpdml0eTogUHJvZHVjdGl2aXR5LCBbZmllbGRuYW1lXSk6IG51bWJlciB7XG4gICAgICAgIGlmICghcHJvZHVjdGl2aXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvdW50ID0gcHJvZHVjdGl2aXR5W2ZpZWxkbmFtZV07XG5cbiAgICAgICAgaWYgKGNvdW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdG90YWwgPSBwcm9kdWN0aXZpdHkucDAgKyBwcm9kdWN0aXZpdHkucDEgKyBwcm9kdWN0aXZpdHkucDI7XG5cbiAgICAgICAgcmV0dXJuIChjb3VudCAqIDEwMC4wKSAvIHRvdGFsO1xuICAgIH1cbn1cblxuQFBpcGUoe25hbWU6IFwicHJvZHVjdGl2aXR5Y291bnRcIn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdGl2aXR5Q291bnRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHByb2R1Y3Rpdml0eTogUHJvZHVjdGl2aXR5LCBbZmllbGRuYW1lXSk6IG51bWJlciB7XG4gICAgICAgIGlmICghcHJvZHVjdGl2aXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb2R1Y3Rpdml0eVtmaWVsZG5hbWVdO1xuICAgIH1cbn1cblxuQFBpcGUoe25hbWU6IFwicmVhZHN0YXRcIn0pXG5leHBvcnQgY2xhc3MgUmVhZFN0YXRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHJlYWRTdGF0czogUmVhZFN0YXRzLCBbZmllbGRuYW1lXSk6IG51bWJlciB7XG4gICAgICAgIGlmICghcmVhZFN0YXRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlYWRTdGF0c1tmaWVsZG5hbWVdO1xuICAgIH1cbn1cblxuQFBpcGUoe25hbWU6IFwiaGlzdG9ncmFtc3BlY1wifSlcbmV4cG9ydCBjbGFzcyBIaXN0b2dyYW1TcGVjUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybShkYXRhOiBEaXN0cmlidXRpb24sIFt4TGFiZWwsIGNvbG9ySW5kZXhdKTogQ2hhcnRTcGVjIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IENoYXJ0VHlwZS5IaXN0b2dyYW0sXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgeGF4aXN0aXRsZTogeExhYmVsLFxuICAgICAgICAgICAgeWF4aXN0aXRsZTogXCJcIixcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgICBzaG93Z3JpZGxpbmVzOiBBeGVzLk5vbmVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBDaGFydERlZmF1bHRTZXR0aW5ncy5nZXRQYWxldHRlQ29sb3IoY29sb3JJbmRleCA/IGNvbG9ySW5kZXggOiAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuQFBpcGUoe25hbWU6IFwic3RhdHVzY2F0ZWdvcnlcIn0pXG5leHBvcnQgY2xhc3MgU3RhdHVzQ2F0ZWdvcnlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHN0YXR1czogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgXCJDb21wbGV0ZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcImdyZWVuXCI7XG4gICAgICAgICAgICBjYXNlIFwiVHJhbnNmZXJGYWlsZWRcIjpcbiAgICAgICAgICAgIGNhc2UgXCJFcnJvclwiOlxuICAgICAgICAgICAgY2FzZSBcIkZhaWxlZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcInJlZFwiO1xuICAgICAgICAgICAgY2FzZSBcIlBlbmRpbmdcIjpcbiAgICAgICAgICAgIGNhc2UgXCJJbml0aWFsaXppbmdcIjpcbiAgICAgICAgICAgIGNhc2UgXCJTZW5zb3JEaWFnbm9zdGljc1wiOlxuICAgICAgICAgICAgY2FzZSBcIkFsaWduaW5nXCI6XG4gICAgICAgICAgICBjYXNlIFwiQWxpZ25lZFwiOlxuICAgICAgICAgICAgY2FzZSBcIlJlYWR5VG9DYWxpYnJhdGVcIjpcbiAgICAgICAgICAgIGNhc2UgXCJDYWxpYnJhdGluZ1wiOlxuICAgICAgICAgICAgY2FzZSBcIkNhbGlicmF0aW9uQ29tcGxldGVcIjpcbiAgICAgICAgICAgIGNhc2UgXCJSZWFkeVRvQWNxdWlyZVwiOlxuICAgICAgICAgICAgY2FzZSBcIkFjcXVpcmluZ1wiOlxuICAgICAgICAgICAgY2FzZSBcIkZpbmlzaGluZ0FuYWx5c2lzXCI6XG4gICAgICAgICAgICBjYXNlIFwiUG9zdFByaW1hcnlQZW5kaW5nXCI6XG4gICAgICAgICAgICBjYXNlIFwiVHJhbnNmZXJQZW5kaW5nXCI6XG4gICAgICAgICAgICBjYXNlIFwiVHJhbnNmZXJyaW5nUmVzdWx0c1wiOlxuICAgICAgICAgICAgY2FzZSBcIkNvbXBsZXRpbmdcIjpcbiAgICAgICAgICAgICAgIHJldHVybiBcImJsdWVcIjtcbiAgICAgICAgICAgIGNhc2UgXCJVbmtub3duXCI6XG4gICAgICAgICAgICBjYXNlIFwiU3RvcHBlZFwiOlxuICAgICAgICAgICAgY2FzZSBcIkFib3J0aW5nXCI6XG4gICAgICAgICAgICBjYXNlIFwiQWJvcnRlZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIm9yYW5nZVwiO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cbn1cbkBQaXBlKHtuYW1lOiBcImlzc3RhdHVzY29tcGxldGVcIn0pXG5leHBvcnQgY2xhc3MgSXNTdGF0dXNDb21wbGV0ZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybShzdGF0dXM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gc3RhdHVzID09PSBcIkNvbXBsZXRlXCI7XG4gICAgfVxufVxuXG5cbkBQaXBlKHtuYW1lOiBcInByZXR0eXRleHRcIn0pXG5leHBvcnQgY2xhc3MgUHJldHR5VGV4dFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRleHQgPyB0ZXh0LnJlcGxhY2UoLyhbQS1aXSkvZywgXCIgJDFcIikudHJpbSgpIDogU3RyaW5nLkVNUFRZO1xuICAgIH1cbn1cblxuQFBpcGUoe25hbWU6IFwiZGF0ZXRpbWVmb3JtYXRcIn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVGb3JtYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBkYXRlLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgfVxufVxuXG5AUGlwZSh7bmFtZTogXCJzYW1wbGV0b29sdGlwXCJ9KVxuZXhwb3J0IGNsYXNzIFNhbXBsZVRvb2x0aXBQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHNhbXBsZTogUnVuUWNTYW1wbGVNb2RlbCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBzYW1wbGUgPyBzYW1wbGUuc3VtbWFyeSA6IFwiXCI7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgUElQRVMgPSBbIE51bWJlckZvcm1hdFBpcGUsIFBlcmNlbnRQcm9kdWN0aXZpdHlQaXBlLCBQcm9kdWN0aXZpdHlDb3VudFBpcGUsIFJlYWRTdGF0UGlwZSxcbiAgICBIaXN0b2dyYW1TcGVjUGlwZSwgU3RhdHVzQ2F0ZWdvcnlQaXBlLCBJc1N0YXR1c0NvbXBsZXRlLCBEYXRlVGltZUZvcm1hdGVQaXBlLCBQcmV0dHlUZXh0UGlwZSwgU2FtcGxlVG9vbHRpcFBpcGUgXTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==