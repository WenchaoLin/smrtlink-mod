"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require("athenaeum/common/model");
var RunQcModel = (function (_super) {
    __extends(RunQcModel, _super);
    function RunQcModel(object) {
        _super.call(this);
        this.uniqueId = String.EMPTY;
        this.name = String.EMPTY;
        this.summary = String.EMPTY;
        this.status = String.EMPTY;
        this.totalCells = 0;
        this.numCellsCompleted = 0;
        this.numCellsFailed = 0;
        this.instrumentName = String.EMPTY;
        this.instrumentSerialNumber = String.EMPTY;
        this.instrumentSwVersion = String.EMPTY;
        this.primaryAnalysisSwVersion = String.EMPTY;
        this.context = String.EMPTY;
        this.samples = [];
        this.initialize(object);
        if (object && object.samples) {
            this.samples = object.samples.map(function (s) { return new RunQcSampleModel(s); });
        }
    }
    Object.defineProperty(RunQcModel.prototype, "runSummary", {
        get: function () {
            var summaryPrefix = "%d SMRT Cell%s".sprintf(this.totalCells, ((this.totalCells !== 1) ? "s" : ""));
            return (!this.summary || !this.summary.startsWith(summaryPrefix))
                ? "%s, %s".sprintf(summaryPrefix, this.summary)
                : this.summary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RunQcModel.prototype, "sortValue", {
        get: function () {
            return this.startedAt ? this.startedAt : "Z";
        },
        enumerable: true,
        configurable: true
    });
    return RunQcModel;
}(model_1.Model));
exports.RunQcModel = RunQcModel;
var RunQcSampleModel = (function (_super) {
    __extends(RunQcSampleModel, _super);
    function RunQcSampleModel(object) {
        _super.call(this);
        this.uniqueId = String.EMPTY;
        this.well = String.EMPTY;
        this.name = String.EMPTY;
        this.summary = String.EMPTY;
        this.startedAt = String.EMPTY;
        this.completedAt = String.EMPTY;
        this.status = String.EMPTY;
        this.context = String.EMPTY;
        this.movieMinutes = 0;
        this.terminationInfo = null;
        this.collectionPathUri = null;
        this.hasSubreadset = false;
        this.metricsAccessError = null;
        this.readStats = null;
        this.insertReadStats = null;
        this.productivity = null;
        this.readLengthDist = null;
        this.readQualityDist = null;
        this.insertReadLengthDist = null;
        this.insertReadQualityDist = null;
        this.readLengthPlotUrl = String.EMPTY;
        this.readQualityPlotUrl = String.EMPTY;
        this.insertReadLengthPlotUrl = String.EMPTY;
        this.insertReadQualityPlotUrl = String.EMPTY;
        this.initialize(object);
    }
    Object.defineProperty(RunQcSampleModel.prototype, "subreadsetXmlPath", {
        get: function () {
            return (this.collectionPathUri && this.context)
                ? this.collectionPathUri + "/" + this.context + ".subreadset.xml"
                : String.EMPTY;
        },
        enumerable: true,
        configurable: true
    });
    return RunQcSampleModel;
}(model_1.Model));
exports.RunQcSampleModel = RunQcSampleModel;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL21vZGVscy9ydW4tcWMtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esc0JBQW9CLHdCQUF3QixDQUFDLENBQUE7QUFzQjdDO0lBQWdDLDhCQUFLO0lBa0JqQyxvQkFBWSxNQUFvQjtRQUM1QixpQkFBTyxDQUFDO1FBbEJaLGFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3hCLFNBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3BCLFlBQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBR3ZCLFdBQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3RCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixzQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsbUJBQWMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzlCLDJCQUFzQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDdEMsd0JBQW1CLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNuQyw2QkFBd0IsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3hDLFlBQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRXZCLFlBQU8sR0FBd0IsRUFBRSxDQUFDO1FBSzlCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFeEIsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUF2QixDQUF1QixDQUFDLENBQUM7UUFDcEUsQ0FBQztJQUNMLENBQUM7SUFFRCxzQkFBSSxrQ0FBVTthQUFkO1lBQ0ksSUFBSSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7a0JBQzNELFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7a0JBQzdDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxpQ0FBUzthQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7SUFDTCxpQkFBQztBQUFELENBdENBLEFBc0NDLENBdEMrQixhQUFLLEdBc0NwQztBQXRDWSxrQkFBVSxhQXNDdEIsQ0FBQTtBQThCRDtJQUFzQyxvQ0FBSztJQTJCdkMsMEJBQVksTUFBMEI7UUFDbEMsaUJBQU8sQ0FBQztRQTNCWixhQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN4QixTQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNwQixTQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNwQixZQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN2QixjQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN6QixnQkFBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDM0IsV0FBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDdEIsWUFBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDdkIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsb0JBQWUsR0FBVyxJQUFJLENBQUM7UUFDL0Isc0JBQWlCLEdBQVcsSUFBSSxDQUFDO1FBQ2pDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHVCQUFrQixHQUFXLElBQUksQ0FBQztRQUVsQyxjQUFTLEdBQWMsSUFBSSxDQUFDO1FBQzVCLG9CQUFlLEdBQWMsSUFBSSxDQUFDO1FBQ2xDLGlCQUFZLEdBQWlCLElBQUksQ0FBQztRQUNsQyxtQkFBYyxHQUFpQixJQUFJLENBQUM7UUFDcEMsb0JBQWUsR0FBaUIsSUFBSSxDQUFDO1FBQ3JDLHlCQUFvQixHQUFpQixJQUFJLENBQUM7UUFDMUMsMEJBQXFCLEdBQWlCLElBQUksQ0FBQztRQUMzQyxzQkFBaUIsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pDLHVCQUFrQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDbEMsNEJBQXVCLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN2Qyw2QkFBd0IsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBS3BDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELHNCQUFJLCtDQUFpQjthQUFyQjtZQUNJLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO2tCQUN6QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCO2tCQUMvRCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBQ0wsdUJBQUM7QUFBRCxDQXRDQSxBQXNDQyxDQXRDcUMsYUFBSyxHQXNDMUM7QUF0Q1ksd0JBQWdCLG1CQXNDNUIsQ0FBQSIsImZpbGUiOiJhcHAvZGF0YS9tb2RlbHMvcnVuLXFjLW1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoXCJtb21lbnRcIik7XG5pbXBvcnQge01vZGVsfSBmcm9tIFwiYXRoZW5hZXVtL2NvbW1vbi9tb2RlbFwiO1xuaW1wb3J0IHtEaXN0cmlidXRpb259IGZyb20gXCJhdGhlbmFldW0vY29tcG9uZW50cy9jaGFydC9jaGFydFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJ1blFjT2JqZWN0IHtcbiAgICB1bmlxdWVJZD86IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHN1bW1hcnk/OiBzdHJpbmc7XG4gICAgc3RhcnRlZEF0Pzogc3RyaW5nO1xuICAgIGNvbXBsZXRlZEF0Pzogc3RyaW5nO1xuICAgIHN0YXR1cz86IHN0cmluZztcbiAgICB0b3RhbENlbGxzPzogbnVtYmVyO1xuICAgIG51bUNlbGxzQ29tcGxldGVkPzogbnVtYmVyO1xuICAgIG51bUNlbGxzRmFpbGVkPzogbnVtYmVyO1xuICAgIGluc3RydW1lbnROYW1lPzogc3RyaW5nO1xuICAgIGluc3RydW1lbnRTZXJpYWxOdW1iZXI/OiBzdHJpbmc7XG4gICAgaW5zdHJ1bWVudFN3VmVyc2lvbj86IHN0cmluZztcbiAgICBwcmltYXJ5QW5hbHlzaXNTd1ZlcnNpb24/OiBzdHJpbmc7XG4gICAgY29udGV4dD86IHN0cmluZztcbiAgICB0ZXJtaW5hdGlvbkluZm8/OiBzdHJpbmc7XG4gICAgc2FtcGxlcz86IFJ1blFjU2FtcGxlT2JqZWN0W107XG59XG5cbmV4cG9ydCBjbGFzcyBSdW5RY01vZGVsIGV4dGVuZHMgTW9kZWwgaW1wbGVtZW50cyBSdW5RY09iamVjdCB7XG4gICAgdW5pcXVlSWQgPSBTdHJpbmcuRU1QVFk7XG4gICAgbmFtZSA9IFN0cmluZy5FTVBUWTtcbiAgICBzdW1tYXJ5ID0gU3RyaW5nLkVNUFRZO1xuICAgIHN0YXJ0ZWRBdDtcbiAgICBjb21wbGV0ZWRBdDtcbiAgICBzdGF0dXMgPSBTdHJpbmcuRU1QVFk7XG4gICAgdG90YWxDZWxscyA9IDA7XG4gICAgbnVtQ2VsbHNDb21wbGV0ZWQgPSAwO1xuICAgIG51bUNlbGxzRmFpbGVkID0gMDtcbiAgICBpbnN0cnVtZW50TmFtZSA9IFN0cmluZy5FTVBUWTtcbiAgICBpbnN0cnVtZW50U2VyaWFsTnVtYmVyID0gU3RyaW5nLkVNUFRZO1xuICAgIGluc3RydW1lbnRTd1ZlcnNpb24gPSBTdHJpbmcuRU1QVFk7XG4gICAgcHJpbWFyeUFuYWx5c2lzU3dWZXJzaW9uID0gU3RyaW5nLkVNUFRZO1xuICAgIGNvbnRleHQgPSBTdHJpbmcuRU1QVFk7XG4gICAgdGVybWluYXRpb25JbmZvOiBzdHJpbmc7XG4gICAgc2FtcGxlczogUnVuUWNTYW1wbGVPYmplY3RbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3Iob2JqZWN0PzogUnVuUWNPYmplY3QpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemUob2JqZWN0KTtcblxuICAgICAgICBpZiAob2JqZWN0ICYmIG9iamVjdC5zYW1wbGVzKSB7XG4gICAgICAgICAgICB0aGlzLnNhbXBsZXMgPSBvYmplY3Quc2FtcGxlcy5tYXAocyA9PiBuZXcgUnVuUWNTYW1wbGVNb2RlbChzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgcnVuU3VtbWFyeSgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc3VtbWFyeVByZWZpeCA9IFwiJWQgU01SVCBDZWxsJXNcIi5zcHJpbnRmKHRoaXMudG90YWxDZWxscywgKCh0aGlzLnRvdGFsQ2VsbHMgIT09IDEpID8gXCJzXCIgOiBcIlwiKSk7XG4gICAgICAgIHJldHVybiAoIXRoaXMuc3VtbWFyeSB8fCAhdGhpcy5zdW1tYXJ5LnN0YXJ0c1dpdGgoc3VtbWFyeVByZWZpeCkpXG4gICAgICAgICAgICA/IFwiJXMsICVzXCIuc3ByaW50ZihzdW1tYXJ5UHJlZml4LCB0aGlzLnN1bW1hcnkpXG4gICAgICAgICAgICA6IHRoaXMuc3VtbWFyeTtcbiAgICB9XG5cbiAgICBnZXQgc29ydFZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0ZWRBdCA/IHRoaXMuc3RhcnRlZEF0IDogXCJaXCI7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJ1blFjU2FtcGxlT2JqZWN0IHtcbiAgICB1bmlxdWVJZD86IHN0cmluZztcbiAgICB3ZWxsPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgc3VtbWFyeT86IHN0cmluZztcbiAgICBzdGFydGVkQXQ/OiBzdHJpbmc7XG4gICAgY29tcGxldGVkQXQ/OiBzdHJpbmc7XG4gICAgc3RhdHVzPzogc3RyaW5nO1xuICAgIGNvbnRleHQ/OiBzdHJpbmc7XG4gICAgbW92aWVNaW51dGVzPzogbnVtYmVyO1xuICAgIHRlcm1pbmF0aW9uSW5mbz86IHN0cmluZztcbiAgICBjb2xsZWN0aW9uUGF0aFVyaT86IHN0cmluZztcbiAgICBoYXNTdWJyZWFkc2V0PzogYm9vbGVhbjtcbiAgICBtZXRyaWNzQWNjZXNzRXJyb3I/OiBzdHJpbmc7XG4gICAgdG90YWxHaWdhYmFzZXM/OiBudW1iZXI7XG4gICAgcmVhZFN0YXRzPzogUmVhZFN0YXRzO1xuICAgIGluc2VydFJlYWRTdGF0cz86IFJlYWRTdGF0cztcbiAgICBwcm9kdWN0aXZpdHk/OiBQcm9kdWN0aXZpdHk7XG4gICAgcmVhZExlbmd0aERpc3Q/OiBEaXN0cmlidXRpb247XG4gICAgcmVhZFF1YWxpdHlEaXN0PzogRGlzdHJpYnV0aW9uO1xuICAgIGluc2VydFJlYWRMZW5ndGhEaXN0PzogRGlzdHJpYnV0aW9uO1xuICAgIGluc2VydFJlYWRRdWFsaXR5RGlzdD86IERpc3RyaWJ1dGlvbjtcbiAgICByZWFkTGVuZ3RoUGxvdFVybD86IHN0cmluZztcbiAgICByZWFkUXVhbGl0eVBsb3RVcmw/OiBzdHJpbmc7XG4gICAgaW5zZXJ0UmVhZExlbmd0aFBsb3RVcmw/OiBzdHJpbmc7XG4gICAgaW5zZXJ0UmVhZFF1YWxpdHlQbG90VXJsPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgUnVuUWNTYW1wbGVNb2RlbCBleHRlbmRzIE1vZGVsIGltcGxlbWVudHMgUnVuUWNTYW1wbGVPYmplY3Qge1xuICAgIHVuaXF1ZUlkID0gU3RyaW5nLkVNUFRZO1xuICAgIHdlbGwgPSBTdHJpbmcuRU1QVFk7XG4gICAgbmFtZSA9IFN0cmluZy5FTVBUWTtcbiAgICBzdW1tYXJ5ID0gU3RyaW5nLkVNUFRZO1xuICAgIHN0YXJ0ZWRBdCA9IFN0cmluZy5FTVBUWTtcbiAgICBjb21wbGV0ZWRBdCA9IFN0cmluZy5FTVBUWTtcbiAgICBzdGF0dXMgPSBTdHJpbmcuRU1QVFk7XG4gICAgY29udGV4dCA9IFN0cmluZy5FTVBUWTtcbiAgICBtb3ZpZU1pbnV0ZXMgPSAwO1xuICAgIHRlcm1pbmF0aW9uSW5mbzogc3RyaW5nID0gbnVsbDtcbiAgICBjb2xsZWN0aW9uUGF0aFVyaTogc3RyaW5nID0gbnVsbDtcbiAgICBoYXNTdWJyZWFkc2V0OiBib29sZWFuID0gZmFsc2U7XG4gICAgbWV0cmljc0FjY2Vzc0Vycm9yOiBzdHJpbmcgPSBudWxsO1xuICAgIHRvdGFsR2lnYWJhc2VzOiBudW1iZXI7XG4gICAgcmVhZFN0YXRzOiBSZWFkU3RhdHMgPSBudWxsO1xuICAgIGluc2VydFJlYWRTdGF0czogUmVhZFN0YXRzID0gbnVsbDtcbiAgICBwcm9kdWN0aXZpdHk6IFByb2R1Y3Rpdml0eSA9IG51bGw7XG4gICAgcmVhZExlbmd0aERpc3Q6IERpc3RyaWJ1dGlvbiA9IG51bGw7XG4gICAgcmVhZFF1YWxpdHlEaXN0OiBEaXN0cmlidXRpb24gPSBudWxsO1xuICAgIGluc2VydFJlYWRMZW5ndGhEaXN0OiBEaXN0cmlidXRpb24gPSBudWxsO1xuICAgIGluc2VydFJlYWRRdWFsaXR5RGlzdDogRGlzdHJpYnV0aW9uID0gbnVsbDtcbiAgICByZWFkTGVuZ3RoUGxvdFVybCA9IFN0cmluZy5FTVBUWTtcbiAgICByZWFkUXVhbGl0eVBsb3RVcmwgPSBTdHJpbmcuRU1QVFk7XG4gICAgaW5zZXJ0UmVhZExlbmd0aFBsb3RVcmwgPSBTdHJpbmcuRU1QVFk7XG4gICAgaW5zZXJ0UmVhZFF1YWxpdHlQbG90VXJsID0gU3RyaW5nLkVNUFRZO1xuXG4gICAgY29uc3RydWN0b3Iob2JqZWN0PzogUnVuUWNTYW1wbGVPYmplY3QpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemUob2JqZWN0KTtcbiAgICB9XG5cbiAgICBnZXQgc3VicmVhZHNldFhtbFBhdGgoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5jb2xsZWN0aW9uUGF0aFVyaSAmJiB0aGlzLmNvbnRleHQpXG4gICAgICAgICAgICA/IHRoaXMuY29sbGVjdGlvblBhdGhVcmkgKyBcIi9cIiArIHRoaXMuY29udGV4dCArIFwiLnN1YnJlYWRzZXQueG1sXCJcbiAgICAgICAgICAgIDogU3RyaW5nLkVNUFRZO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWFkU3RhdHMge1xuICAgIGxlbmd0aDogbnVtYmVyO1xuICAgIHF1YWxpdHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9kdWN0aXZpdHkge1xuICAgIHAwOiBudW1iZXI7XG4gICAgcDE6IG51bWJlcjtcbiAgICBwMjogbnVtYmVyO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9