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
var navbar_settings_1 = require("../navbar-settings");
var silo_1 = require("./silo");
var index_1 = require("./data-management/index");
var select_datasets_1 = require("./data-management/select-datasets");
var merge_datasets_1 = require("./data-management/merge-datasets");
var dataset_detail_1 = require("./data-management/dataset-detail");
var dataset_service_1 = require("./shared/dataset-service");
var DataManagement = (function () {
    function DataManagement() {
        navbar_settings_1.navbarSettings.setSilo(silo_1.SILO.DATA_MANAGEMENT);
    }
    DataManagement = __decorate([
        core_1.Component({
            template: "\n        <router-outlet></router-outlet>\n    ",
            directives: [router_1.RouterOutlet],
            providers: [dataset_service_1.DatasetService],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        router_1.RouteConfig([
            {
                path: "/",
                as: "Index",
                component: index_1.Index,
                data: {
                    pageId: "list-datasets"
                },
                useAsDefault: true
            },
            {
                path: "/select-datasets",
                as: "SelectDatasets",
                component: select_datasets_1.SelectDatasets,
                data: {
                    pageId: "select-datasets"
                }
            },
            {
                path: "/merge-datasets",
                as: "MergeDatasets",
                component: merge_datasets_1.MergeDatasets,
                data: {
                    pageId: "merge-datasets"
                }
            },
            {
                path: "/dataset-detail/:datasetId",
                as: "DatasetDetail",
                component: dataset_detail_1.DatasetDetail,
                data: {
                    pageId: "dataset-detail"
                }
            }
        ]), 
        __metadata('design:paramtypes', [])
    ], DataManagement);
    return DataManagement;
}());
exports.DataManagement = DataManagement;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9kYXRhLW1hbmFnZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUMzRCx1QkFBd0MsaUJBQWlCLENBQUMsQ0FBQTtBQUUxRCxnQ0FBNkIsb0JBQW9CLENBQUMsQ0FBQTtBQUNsRCxxQkFBbUIsUUFBUSxDQUFDLENBQUE7QUFFNUIsc0JBQW9CLHlCQUF5QixDQUFDLENBQUE7QUFDOUMsZ0NBQTZCLG1DQUFtQyxDQUFDLENBQUE7QUFDakUsK0JBQTRCLGtDQUFrQyxDQUFDLENBQUE7QUFDL0QsK0JBQTRCLGtDQUFrQyxDQUFDLENBQUE7QUFFL0QsZ0NBQTZCLDBCQUEwQixDQUFDLENBQUE7QUE2Q3hEO0lBQ0k7UUFDSSxnQ0FBYyxDQUFDLE9BQU8sQ0FBQyxXQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQTlDTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsaURBRVQ7WUFDRCxVQUFVLEVBQUUsQ0FBQyxxQkFBWSxDQUFDO1lBQzFCLFNBQVMsRUFBRSxDQUFDLGdDQUFjLENBQUM7WUFDM0IsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7U0FDeEMsQ0FBQztRQUNELG9CQUFXLENBQUM7WUFDVDtnQkFDSSxJQUFJLEVBQUUsR0FBRztnQkFDVCxFQUFFLEVBQUUsT0FBTztnQkFDWCxTQUFTLEVBQUUsYUFBSztnQkFDaEIsSUFBSSxFQUFFO29CQUNGLE1BQU0sRUFBRSxlQUFlO2lCQUMxQjtnQkFDRCxZQUFZLEVBQUUsSUFBSTthQUNyQjtZQUNEO2dCQUNJLElBQUksRUFBRSxrQkFBa0I7Z0JBQ3hCLEVBQUUsRUFBRSxnQkFBZ0I7Z0JBQ3BCLFNBQVMsRUFBRSxnQ0FBYztnQkFDekIsSUFBSSxFQUFFO29CQUNGLE1BQU0sRUFBRSxpQkFBaUI7aUJBQzVCO2FBQ0o7WUFDRDtnQkFDSSxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixFQUFFLEVBQUUsZUFBZTtnQkFDbkIsU0FBUyxFQUFFLDhCQUFhO2dCQUN4QixJQUFJLEVBQUU7b0JBQ0YsTUFBTSxFQUFFLGdCQUFnQjtpQkFDM0I7YUFDSjtZQUNEO2dCQUNJLElBQUksRUFBRSw0QkFBNEI7Z0JBQ2xDLEVBQUUsRUFBRSxlQUFlO2dCQUNuQixTQUFTLEVBQUUsOEJBQWE7Z0JBQ3hCLElBQUksRUFBRTtvQkFDRixNQUFNLEVBQUUsZ0JBQWdCO2lCQUMzQjthQUNKO1NBQ0osQ0FBQzs7c0JBQUE7SUFLRixxQkFBQztBQUFELENBSkEsQUFJQyxJQUFBO0FBSlksc0JBQWMsaUJBSTFCLENBQUEiLCJmaWxlIjoiYXBwL3NpbG9zL2RhdGEtbWFuYWdlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVyT3V0bGV0LCBSb3V0ZUNvbmZpZ30gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuXG5pbXBvcnQge25hdmJhclNldHRpbmdzfSBmcm9tIFwiLi4vbmF2YmFyLXNldHRpbmdzXCI7XG5pbXBvcnQge1NJTE99IGZyb20gXCIuL3NpbG9cIjtcblxuaW1wb3J0IHtJbmRleH0gZnJvbSBcIi4vZGF0YS1tYW5hZ2VtZW50L2luZGV4XCI7XG5pbXBvcnQge1NlbGVjdERhdGFzZXRzfSBmcm9tIFwiLi9kYXRhLW1hbmFnZW1lbnQvc2VsZWN0LWRhdGFzZXRzXCI7XG5pbXBvcnQge01lcmdlRGF0YXNldHN9IGZyb20gXCIuL2RhdGEtbWFuYWdlbWVudC9tZXJnZS1kYXRhc2V0c1wiO1xuaW1wb3J0IHtEYXRhc2V0RGV0YWlsfSBmcm9tIFwiLi9kYXRhLW1hbmFnZW1lbnQvZGF0YXNldC1kZXRhaWxcIjtcblxuaW1wb3J0IHtEYXRhc2V0U2VydmljZX0gZnJvbSBcIi4vc2hhcmVkL2RhdGFzZXQtc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbUm91dGVyT3V0bGV0XSxcbiAgICBwcm92aWRlcnM6IFtEYXRhc2V0U2VydmljZV0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbkBSb3V0ZUNvbmZpZyhbXG4gICAge1xuICAgICAgICBwYXRoOiBcIi9cIixcbiAgICAgICAgYXM6IFwiSW5kZXhcIixcbiAgICAgICAgY29tcG9uZW50OiBJbmRleCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgcGFnZUlkOiBcImxpc3QtZGF0YXNldHNcIlxuICAgICAgICB9LFxuICAgICAgICB1c2VBc0RlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCIvc2VsZWN0LWRhdGFzZXRzXCIsXG4gICAgICAgIGFzOiBcIlNlbGVjdERhdGFzZXRzXCIsXG4gICAgICAgIGNvbXBvbmVudDogU2VsZWN0RGF0YXNldHMsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHBhZ2VJZDogXCJzZWxlY3QtZGF0YXNldHNcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiL21lcmdlLWRhdGFzZXRzXCIsXG4gICAgICAgIGFzOiBcIk1lcmdlRGF0YXNldHNcIixcbiAgICAgICAgY29tcG9uZW50OiBNZXJnZURhdGFzZXRzLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBwYWdlSWQ6IFwibWVyZ2UtZGF0YXNldHNcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiL2RhdGFzZXQtZGV0YWlsLzpkYXRhc2V0SWRcIixcbiAgICAgICAgYXM6IFwiRGF0YXNldERldGFpbFwiLFxuICAgICAgICBjb21wb25lbnQ6IERhdGFzZXREZXRhaWwsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHBhZ2VJZDogXCJkYXRhc2V0LWRldGFpbFwiXG4gICAgICAgIH1cbiAgICB9XG5dKVxuZXhwb3J0IGNsYXNzIERhdGFNYW5hZ2VtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgbmF2YmFyU2V0dGluZ3Muc2V0U2lsbyhTSUxPLkRBVEFfTUFOQUdFTUVOVCk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9