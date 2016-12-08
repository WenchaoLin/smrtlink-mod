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
var accordion_1 = require("athenaeum/components/accordion/accordion");
var tooltip_1 = require("athenaeum/directives/tooltip");
var error_service_1 = require("../error/error-service");
var silo_service_1 = require("../silo-service");
var pipes_1 = require("./pipes");
var run_qc_service_1 = require("../../data/services/run-qc-service");
var run_qc_model_1 = require("../../data/models/run-qc-model");
var chart_1 = require("athenaeum/components/chart/chart");
var RunView = (function () {
    function RunView(siloService, runQcService, router, errorService) {
        this.expanded = false;
        this.siloService = siloService;
        this.runQcService = runQcService;
        this.router = router;
        this.errorService = errorService;
        chart_1.ChartDefaultSettings.chartWidth = 200;
        chart_1.ChartDefaultSettings.chartHeight = 135;
        chart_1.ChartDefaultSettings.xticks = 3;
        chart_1.ChartDefaultSettings.yticks = 3;
        chart_1.ChartDefaultSettings.font.size = 9;
        chart_1.ChartDefaultSettings.padding.left = 35;
        chart_1.ChartDefaultSettings.padding.top = 15;
        chart_1.ChartDefaultSettings.padding.bottom = 35;
    }
    RunView.prototype.routerOnActivate = function (next) {
        var id = next.params["id"];
        this.siloService.setState({
            title: "Run QC - %s".sprintf("?"),
            status: null
        });
        var promise = this.runQcService.getRun(id);
        this.setRunContent(promise);
    };
    RunView.prototype.onExpandCollapseClick = function (event) {
        var _this = this;
        this.expanded = !this.expanded;
        this.panes.forEach(function (p) { return p.expanded = _this.expanded; });
    };
    RunView.prototype.setRunContent = function (promise) {
        var _this = this;
        promise.then(function (result) {
            _this.siloService.setState({
                title: "Run QC - %s".sprintf(result.name),
                status: result.status
            });
            _this.run = result;
        }).catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', run_qc_model_1.RunQcModel)
    ], RunView.prototype, "run", void 0);
    __decorate([
        core_1.ViewChildren("pane"), 
        __metadata('design:type', core_1.QueryList)
    ], RunView.prototype, "panes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RunView.prototype, "expanded", void 0);
    RunView = __decorate([
        core_1.Component({
            selector: "run-view",
            moduleId: module.id,
            templateUrl: "run-view.html",
            styleUrls: ["run-view.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [error_service_1.ErrorService],
            directives: [accordion_1.ACCORDION_DIRECTIVES, chart_1.Chart, tooltip_1.Tooltip],
            pipes: [pipes_1.PIPES]
        }), 
        __metadata('design:paramtypes', [silo_service_1.SiloService, run_qc_service_1.RunQcService, router_1.Router, error_service_1.ErrorService])
    ], RunView);
    return RunView;
}());
exports.RunView = RunView;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9ydW4tcWMvcnVuLXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3RixlQUFlLENBQUMsQ0FBQTtBQUN4Ryx1QkFBb0UsaUJBQWlCLENBQUMsQ0FBQTtBQUN0RiwwQkFBa0QsMENBQTBDLENBQUMsQ0FBQTtBQUM3Rix3QkFBc0IsOEJBQThCLENBQUMsQ0FBQTtBQUVyRCw4QkFBNkIsd0JBQXdCLENBQUMsQ0FBQTtBQUV0RCw2QkFBMEIsaUJBQWlCLENBQUMsQ0FBQTtBQUU1QyxzQkFBb0IsU0FBUyxDQUFDLENBQUE7QUFDOUIsK0JBQTJCLG9DQUFvQyxDQUFDLENBQUE7QUFDaEUsNkJBQTJDLGdDQUFnQyxDQUFDLENBQUE7QUFDNUUsc0JBQTBDLGtDQUFrQyxDQUFDLENBQUE7QUFZN0U7SUFlSSxpQkFBWSxXQUFtQyxFQUNuQyxZQUEwQixFQUMxQixNQUFjLEVBQ2QsWUFBMEI7UUFWOUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQVk5QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUVqQyw0QkFBb0IsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3RDLDRCQUFvQixDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkMsNEJBQW9CLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQyw0QkFBb0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLDRCQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLDRCQUFvQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3ZDLDRCQUFvQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ3RDLDRCQUFvQixDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxrQ0FBZ0IsR0FBaEIsVUFBaUIsSUFBMEI7UUFDdkMsSUFBTSxFQUFFLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUN0QixLQUFLLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDakMsTUFBTSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFFSCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCx1Q0FBcUIsR0FBckIsVUFBc0IsS0FBaUI7UUFBdkMsaUJBSUM7UUFIRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUUvQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLFFBQVEsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTywrQkFBYSxHQUFyQixVQUFzQixPQUE0QjtRQUFsRCxpQkFXQztRQVZHLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ2YsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7Z0JBQ3RCLEtBQUssRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ3pDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTthQUN4QixDQUFDLENBQUM7WUFFSCxLQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1YsS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBL0REO1FBQUMsWUFBSyxFQUFFOzt3Q0FBQTtJQUdSO1FBQUMsbUJBQVksQ0FBQyxNQUFNLENBQUM7OzBDQUFBO0lBR3JCO1FBQUMsWUFBSyxFQUFFOzs2Q0FBQTtJQWpCWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGVBQWU7WUFDNUIsU0FBUyxFQUFFLENBQUUsY0FBYyxDQUFFO1lBQzdCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7WUFDekIsVUFBVSxFQUFFLENBQUMsZ0NBQW9CLEVBQUUsYUFBSyxFQUFFLGlCQUFPLENBQUM7WUFDbEQsS0FBSyxFQUFFLENBQUMsYUFBSyxDQUFDO1NBQ2pCLENBQUM7O2VBQUE7SUFrRUYsY0FBQztBQUFELENBakVBLEFBaUVDLElBQUE7QUFqRVksZUFBTyxVQWlFbkIsQ0FBQSIsImZpbGUiOiJhcHAvc2lsb3MvcnVuLXFjL3J1bi12aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCwgZm9yd2FyZFJlZiwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlUGFyYW1zLCBPbkFjdGl2YXRlLCBDb21wb25lbnRJbnN0cnVjdGlvbn0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuaW1wb3J0IHtBY2NvcmRpb25QYW5lLCBBQ0NPUkRJT05fRElSRUNUSVZFU30gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL2FjY29yZGlvbi9hY2NvcmRpb25cIjtcbmltcG9ydCB7VG9vbHRpcH0gZnJvbSBcImF0aGVuYWV1bS9kaXJlY3RpdmVzL3Rvb2x0aXBcIjtcblxuaW1wb3J0IHsgRXJyb3JTZXJ2aWNlIH0gZnJvbSBcIi4uL2Vycm9yL2Vycm9yLXNlcnZpY2VcIjtcblxuaW1wb3J0IHtTaWxvU2VydmljZX0gZnJvbSBcIi4uL3NpbG8tc2VydmljZVwiO1xuaW1wb3J0IHtTaWxvU3RhdGV9IGZyb20gXCIuLi9ydW4tcWNcIjtcbmltcG9ydCB7UElQRVN9IGZyb20gXCIuL3BpcGVzXCI7XG5pbXBvcnQge1J1blFjU2VydmljZX0gZnJvbSBcIi4uLy4uL2RhdGEvc2VydmljZXMvcnVuLXFjLXNlcnZpY2VcIjtcbmltcG9ydCB7UnVuUWNNb2RlbCwgUnVuUWNTYW1wbGVNb2RlbH0gZnJvbSBcIi4uLy4uL2RhdGEvbW9kZWxzL3J1bi1xYy1tb2RlbFwiO1xuaW1wb3J0IHtDaGFydCwgQ2hhcnREZWZhdWx0U2V0dGluZ3N9IGZyb20gXCJhdGhlbmFldW0vY29tcG9uZW50cy9jaGFydC9jaGFydFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJydW4tdmlld1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwicnVuLXZpZXcuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWyBcInJ1bi12aWV3LmNzc1wiIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFtFcnJvclNlcnZpY2VdLFxuICAgIGRpcmVjdGl2ZXM6IFtBQ0NPUkRJT05fRElSRUNUSVZFUywgQ2hhcnQsIFRvb2x0aXBdLFxuICAgIHBpcGVzOiBbUElQRVNdXG59KVxuZXhwb3J0IGNsYXNzIFJ1blZpZXcgaW1wbGVtZW50cyBPbkFjdGl2YXRlIHtcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBydW46IFJ1blFjTW9kZWw7XG5cbiAgICBAVmlld0NoaWxkcmVuKFwicGFuZVwiKVxuICAgIHByaXZhdGUgcGFuZXM6IFF1ZXJ5TGlzdDxBY2NvcmRpb25QYW5lPjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBleHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBzaWxvU2VydmljZTogU2lsb1NlcnZpY2U8U2lsb1N0YXRlPjtcbiAgICBwcml2YXRlIHJ1blFjU2VydmljZTogUnVuUWNTZXJ2aWNlO1xuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XG4gICAgcHJpdmF0ZSBlcnJvclNlcnZpY2U6IEVycm9yU2VydmljZTtcblxuICAgIGNvbnN0cnVjdG9yKHNpbG9TZXJ2aWNlOiBTaWxvU2VydmljZTxTaWxvU3RhdGU+LFxuICAgICAgICAgICAgICAgIHJ1blFjU2VydmljZTogUnVuUWNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICAgIGVycm9yU2VydmljZTogRXJyb3JTZXJ2aWNlKSB7XG5cbiAgICAgICAgdGhpcy5zaWxvU2VydmljZSA9IHNpbG9TZXJ2aWNlO1xuICAgICAgICB0aGlzLnJ1blFjU2VydmljZSA9IHJ1blFjU2VydmljZTtcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlID0gZXJyb3JTZXJ2aWNlO1xuXG4gICAgICAgIENoYXJ0RGVmYXVsdFNldHRpbmdzLmNoYXJ0V2lkdGggPSAyMDA7XG4gICAgICAgIENoYXJ0RGVmYXVsdFNldHRpbmdzLmNoYXJ0SGVpZ2h0ID0gMTM1O1xuICAgICAgICBDaGFydERlZmF1bHRTZXR0aW5ncy54dGlja3MgPSAzO1xuICAgICAgICBDaGFydERlZmF1bHRTZXR0aW5ncy55dGlja3MgPSAzO1xuICAgICAgICBDaGFydERlZmF1bHRTZXR0aW5ncy5mb250LnNpemUgPSA5O1xuICAgICAgICBDaGFydERlZmF1bHRTZXR0aW5ncy5wYWRkaW5nLmxlZnQgPSAzNTtcbiAgICAgICAgQ2hhcnREZWZhdWx0U2V0dGluZ3MucGFkZGluZy50b3AgPSAxNTtcbiAgICAgICAgQ2hhcnREZWZhdWx0U2V0dGluZ3MucGFkZGluZy5ib3R0b20gPSAzNTtcbiAgICB9XG5cbiAgICByb3V0ZXJPbkFjdGl2YXRlKG5leHQ6IENvbXBvbmVudEluc3RydWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGlkOiBzdHJpbmcgPSBuZXh0LnBhcmFtc1tcImlkXCJdO1xuXG4gICAgICAgIHRoaXMuc2lsb1NlcnZpY2Uuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdGl0bGU6IFwiUnVuIFFDIC0gJXNcIi5zcHJpbnRmKFwiP1wiKSxcbiAgICAgICAgICAgIHN0YXR1czogbnVsbFxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMucnVuUWNTZXJ2aWNlLmdldFJ1bihpZCk7XG4gICAgICAgIHRoaXMuc2V0UnVuQ29udGVudChwcm9taXNlKTtcbiAgICB9XG5cbiAgICBvbkV4cGFuZENvbGxhcHNlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuXG4gICAgICAgIHRoaXMucGFuZXMuZm9yRWFjaCgocCkgPT4gcC5leHBhbmRlZCA9IHRoaXMuZXhwYW5kZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0UnVuQ29udGVudChwcm9taXNlOiBQcm9taXNlPFJ1blFjTW9kZWw+KSB7XG4gICAgICAgIHByb21pc2UudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaWxvU2VydmljZS5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiUnVuIFFDIC0gJXNcIi5zcHJpbnRmKHJlc3VsdC5uYW1lKSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3VsdC5zdGF0dXNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnJ1biA9IHJlc3VsdDtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2Uuc2hvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9