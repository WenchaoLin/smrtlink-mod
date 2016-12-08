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
var index_1 = require("./run-qc/index");
var run_view_1 = require("./run-qc/run-view");
var navbar_settings_1 = require("../navbar-settings");
var silo_1 = require("./silo");
var silo_service_1 = require("./silo-service");
var run_qc_service_1 = require("../data/services/run-qc-service");
var run_qc_1 = require("../data/facets/run-qc");
var status_1 = require("../navigation/status");
function route(path, name, component, data, useAsDefault) {
    if (useAsDefault === void 0) { useAsDefault = false; }
    return {
        path: path,
        name: name,
        component: component,
        data: data,
        useAsDefault: useAsDefault
    };
}
var RunQC = (function () {
    function RunQC(siloService) {
        var _this = this;
        siloService.state.subscribe(function (state) {
            _this.title = state.title;
            _this.buttons = state.buttons;
            _this.status = state.status;
        });
        navbar_settings_1.navbarSettings.setSilo(silo_1.SILO.RUN_QC);
    }
    RunQC = __decorate([
        core_1.Component({
            selector: "run-qc",
            moduleId: module.id,
            templateUrl: "run-qc/silo.html",
            styleUrls: ["run-qc/silo.css"],
            directives: [router_1.RouterOutlet],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [silo_service_1.SiloService, run_qc_service_1.RunQcService]
        }),
        router_1.RouteConfig([
            route("/", "Index", index_1.Index, {
                title: "Run QC",
                pageId: "run-qc",
                facet: run_qc_1.RUN_QC_FACET
            }, true),
            route("/:id", "RunView", run_view_1.RunView)
        ]),
        router_1.CanActivate(status_1.canConnect), 
        __metadata('design:paramtypes', [silo_service_1.SiloService])
    ], RunQC);
    return RunQC;
}());
exports.RunQC = RunQC;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9ydW4tcWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFpRCxlQUFlLENBQUMsQ0FBQTtBQUNqRSx1QkFBc0UsaUJBQWlCLENBQUMsQ0FBQTtBQUN4RixzQkFBb0IsZ0JBQWdCLENBQUMsQ0FBQTtBQUVyQyx5QkFBc0IsbUJBQW1CLENBQUMsQ0FBQTtBQUUxQyxnQ0FBNkIsb0JBQW9CLENBQUMsQ0FBQTtBQUNsRCxxQkFBbUIsUUFBUSxDQUFDLENBQUE7QUFFNUIsNkJBQTBCLGdCQUFnQixDQUFDLENBQUE7QUFDM0MsK0JBQTJCLGlDQUFpQyxDQUFDLENBQUE7QUFDN0QsdUJBQTJCLHVCQUF1QixDQUFDLENBQUE7QUFFbkQsdUJBQXlCLHNCQUFzQixDQUFDLENBQUE7QUFFaEQsZUFBZSxJQUFZLEVBQUUsSUFBWSxFQUFFLFNBQWUsRUFDM0MsSUFBVSxFQUFFLFlBQW9CO0lBQXBCLDRCQUFvQixHQUFwQixvQkFBb0I7SUFDM0MsTUFBTSxDQUFDO1FBQ0gsTUFBQSxJQUFJO1FBQ0osTUFBQSxJQUFJO1FBQ0osV0FBQSxTQUFTO1FBQ1QsTUFBQSxJQUFJO1FBQ0osY0FBQSxZQUFZO0tBQ2YsQ0FBQztBQUNOLENBQUM7QUF1Q0Q7SUFLSSxlQUFZLFdBQW1DO1FBTG5ELGlCQWNDO1FBUk8sV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO1lBQzlCLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUN6QixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDN0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBRUgsZ0NBQWMsQ0FBQyxPQUFPLENBQUMsV0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFyQ0w7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxrQkFBa0I7WUFDL0IsU0FBUyxFQUFFLENBQUUsaUJBQWlCLENBQUU7WUFDaEMsVUFBVSxFQUFFLENBQUMscUJBQVksQ0FBQztZQUMxQixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtZQUNyQyxTQUFTLEVBQUUsQ0FBQywwQkFBVyxFQUFFLDZCQUFZLENBQUM7U0FDekMsQ0FBQztRQUNELG9CQUFXLENBQUM7WUFDVCxLQUFLLENBQ0QsR0FBRyxFQUNILE9BQU8sRUFDUCxhQUFLLEVBQ0w7Z0JBQ0ksS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLEtBQUssRUFBRSxxQkFBWTthQUN0QixFQUNELElBQUksQ0FDUDtZQUNELEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLGtCQUFPLENBQUM7U0FDcEMsQ0FBQztRQUNELG9CQUFXLENBQUMsbUJBQVUsQ0FBQzs7YUFBQTtJQWV4QixZQUFDO0FBQUQsQ0FkQSxBQWNDLElBQUE7QUFkWSxhQUFLLFFBY2pCLENBQUEiLCJmaWxlIjoiYXBwL3NpbG9zL3J1bi1xYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgVHlwZX0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVyT3V0bGV0LCBSb3V0ZUNvbmZpZywgUm91dGVEZWZpbml0aW9uLCBDYW5BY3RpdmF0ZX0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuaW1wb3J0IHtJbmRleH0gZnJvbSBcIi4vcnVuLXFjL2luZGV4XCI7XG5cbmltcG9ydCB7UnVuVmlld30gZnJvbSBcIi4vcnVuLXFjL3J1bi12aWV3XCI7XG5cbmltcG9ydCB7bmF2YmFyU2V0dGluZ3N9IGZyb20gXCIuLi9uYXZiYXItc2V0dGluZ3NcIjtcbmltcG9ydCB7U0lMT30gZnJvbSBcIi4vc2lsb1wiO1xuXG5pbXBvcnQge1NpbG9TZXJ2aWNlfSBmcm9tIFwiLi9zaWxvLXNlcnZpY2VcIjtcbmltcG9ydCB7UnVuUWNTZXJ2aWNlfSBmcm9tIFwiLi4vZGF0YS9zZXJ2aWNlcy9ydW4tcWMtc2VydmljZVwiO1xuaW1wb3J0IHtSVU5fUUNfRkFDRVR9IGZyb20gXCIuLi9kYXRhL2ZhY2V0cy9ydW4tcWNcIjtcblxuaW1wb3J0IHtjYW5Db25uZWN0fSBmcm9tIFwiLi4vbmF2aWdhdGlvbi9zdGF0dXNcIjtcblxuZnVuY3Rpb24gcm91dGUocGF0aDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNvbXBvbmVudDogVHlwZSxcbiAgICAgICAgICAgICAgIGRhdGE/OiBhbnksIHVzZUFzRGVmYXVsdCA9IGZhbHNlKTogUm91dGVEZWZpbml0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYXRoLFxuICAgICAgICBuYW1lLFxuICAgICAgICBjb21wb25lbnQsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIHVzZUFzRGVmYXVsdFxuICAgIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2lsb0J1dHRvbiB7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBjbGFzc05hbWU6IHN0cmluZztcbiAgICBpc0Rpc2FibGVkPzogRnVuY3Rpb247XG4gICAgb25DbGljaz86IEZ1bmN0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNpbG9TdGF0ZSB7XG4gICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgYnV0dG9ucz86IFNpbG9CdXR0b25bXTtcbiAgICBzdGF0dXM/OiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInJ1bi1xY1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwicnVuLXFjL3NpbG8uaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWyBcInJ1bi1xYy9zaWxvLmNzc1wiIF0sXG4gICAgZGlyZWN0aXZlczogW1JvdXRlck91dGxldF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFtTaWxvU2VydmljZSwgUnVuUWNTZXJ2aWNlXVxufSlcbkBSb3V0ZUNvbmZpZyhbXG4gICAgcm91dGUoXG4gICAgICAgIFwiL1wiLFxuICAgICAgICBcIkluZGV4XCIsXG4gICAgICAgIEluZGV4LFxuICAgICAgICB7XG4gICAgICAgICAgICB0aXRsZTogXCJSdW4gUUNcIixcbiAgICAgICAgICAgIHBhZ2VJZDogXCJydW4tcWNcIixcbiAgICAgICAgICAgIGZhY2V0OiBSVU5fUUNfRkFDRVRcbiAgICAgICAgfSxcbiAgICAgICAgdHJ1ZVxuICAgICksXG4gICAgcm91dGUoXCIvOmlkXCIsIFwiUnVuVmlld1wiLCBSdW5WaWV3KVxuXSlcbkBDYW5BY3RpdmF0ZShjYW5Db25uZWN0KVxuZXhwb3J0IGNsYXNzIFJ1blFDIHtcbiAgICBwcml2YXRlIHRpdGxlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBidXR0b25zOiBTaWxvQnV0dG9uW107XG4gICAgcHJpdmF0ZSBzdGF0dXM6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHNpbG9TZXJ2aWNlOiBTaWxvU2VydmljZTxTaWxvU3RhdGU+KSB7XG4gICAgICAgIHNpbG9TZXJ2aWNlLnN0YXRlLnN1YnNjcmliZSgoc3RhdGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBzdGF0ZS50aXRsZTtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9ucyA9IHN0YXRlLmJ1dHRvbnM7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXRlLnN0YXR1cztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmF2YmFyU2V0dGluZ3Muc2V0U2lsbyhTSUxPLlJVTl9RQyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9