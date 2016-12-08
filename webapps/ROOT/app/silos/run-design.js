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
var index_1 = require("./run-design/index");
var run_editor_1 = require("./run-design/run-editor");
var summary_1 = require("./run-design/summary");
var navbar_settings_1 = require("../navbar-settings");
var silo_1 = require("./silo");
var silo_service_1 = require("./silo-service");
var run_service_1 = require("../data/services/run-service");
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
var RunDesign = (function () {
    function RunDesign(siloService) {
        var _this = this;
        siloService.state.subscribe(function (state) {
            _this.title = state.title;
            _this.buttons = state.buttons;
        });
        navbar_settings_1.navbarSettings.setSilo(silo_1.SILO.RUN_DESIGN);
    }
    RunDesign = __decorate([
        core_1.Component({
            selector: "run-design",
            moduleId: module.id,
            templateUrl: "run-design/silo.html",
            styleUrls: ["run-design/silo.css"],
            directives: [router_1.RouterOutlet],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [silo_service_1.SiloService, run_service_1.RunService]
        }),
        router_1.RouteConfig([
            route("/", "Index", index_1.Index, {
                title: "Run Design",
                pageId: "run-design"
            }, true),
            route("/new", "NewRun", run_editor_1.RunEditor),
            route("/:id", "EditRun", run_editor_1.RunEditor),
            route("/:id/summary", "Summary", summary_1.Summary)
        ]),
        router_1.CanActivate(status_1.canConnect), 
        __metadata('design:paramtypes', [silo_service_1.SiloService])
    ], RunDesign);
    return RunDesign;
}());
exports.RunDesign = RunDesign;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9ydW4tZGVzaWduLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBaUQsZUFBZSxDQUFDLENBQUE7QUFDakUsdUJBQXNFLGlCQUFpQixDQUFDLENBQUE7QUFDeEYsc0JBQW9CLG9CQUFvQixDQUFDLENBQUE7QUFDekMsMkJBQXdCLHlCQUF5QixDQUFDLENBQUE7QUFDbEQsd0JBQXNCLHNCQUFzQixDQUFDLENBQUE7QUFFN0MsZ0NBQTZCLG9CQUFvQixDQUFDLENBQUE7QUFDbEQscUJBQW1CLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZCQUEwQixnQkFBZ0IsQ0FBQyxDQUFBO0FBQzNDLDRCQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBRXhELHVCQUF5QixzQkFBc0IsQ0FBQyxDQUFBO0FBRWhELGVBQWUsSUFBWSxFQUFFLElBQVksRUFBRSxTQUFlLEVBQzNDLElBQVUsRUFBRSxZQUFvQjtJQUFwQiw0QkFBb0IsR0FBcEIsb0JBQW9CO0lBQzNDLE1BQU0sQ0FBQztRQUNILE1BQUEsSUFBSTtRQUNKLE1BQUEsSUFBSTtRQUNKLFdBQUEsU0FBUztRQUNULE1BQUEsSUFBSTtRQUNKLGNBQUEsWUFBWTtLQUNmLENBQUM7QUFDTixDQUFDO0FBdUNEO0lBSUksbUJBQVksV0FBbUM7UUFKbkQsaUJBWUM7UUFQTyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQUs7WUFDOUIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3pCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUVILGdDQUFjLENBQUMsT0FBTyxDQUFDLFdBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBcENMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLFNBQVMsRUFBRSxDQUFFLHFCQUFxQixDQUFFO1lBQ3BDLFVBQVUsRUFBRSxDQUFDLHFCQUFZLENBQUM7WUFDMUIsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7WUFDckMsU0FBUyxFQUFFLENBQUMsMEJBQVcsRUFBRSx3QkFBVSxDQUFDO1NBQ3ZDLENBQUM7UUFDRCxvQkFBVyxDQUFDO1lBQ1QsS0FBSyxDQUNELEdBQUcsRUFDSCxPQUFPLEVBQ1AsYUFBSyxFQUNMO2dCQUNJLEtBQUssRUFBRSxZQUFZO2dCQUNuQixNQUFNLEVBQUUsWUFBWTthQUN2QixFQUNELElBQUksQ0FDUDtZQUNELEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLHNCQUFTLENBQUM7WUFDbEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsc0JBQVMsQ0FBQztZQUNuQyxLQUFLLENBQUMsY0FBYyxFQUFFLFNBQVMsRUFBRSxpQkFBTyxDQUFDO1NBQzVDLENBQUM7UUFDRCxvQkFBVyxDQUFDLG1CQUFVLENBQUM7O2lCQUFBO0lBYXhCLGdCQUFDO0FBQUQsQ0FaQSxBQVlDLElBQUE7QUFaWSxpQkFBUyxZQVlyQixDQUFBIiwiZmlsZSI6ImFwcC9zaWxvcy9ydW4tZGVzaWduLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBUeXBlfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtSb3V0ZXJPdXRsZXQsIFJvdXRlQ29uZmlnLCBSb3V0ZURlZmluaXRpb24sIENhbkFjdGl2YXRlfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge0luZGV4fSBmcm9tIFwiLi9ydW4tZGVzaWduL2luZGV4XCI7XG5pbXBvcnQge1J1bkVkaXRvcn0gZnJvbSBcIi4vcnVuLWRlc2lnbi9ydW4tZWRpdG9yXCI7XG5pbXBvcnQge1N1bW1hcnl9IGZyb20gXCIuL3J1bi1kZXNpZ24vc3VtbWFyeVwiO1xuXG5pbXBvcnQge25hdmJhclNldHRpbmdzfSBmcm9tIFwiLi4vbmF2YmFyLXNldHRpbmdzXCI7XG5pbXBvcnQge1NJTE99IGZyb20gXCIuL3NpbG9cIjtcblxuaW1wb3J0IHtTaWxvU2VydmljZX0gZnJvbSBcIi4vc2lsby1zZXJ2aWNlXCI7XG5pbXBvcnQge1J1blNlcnZpY2V9IGZyb20gXCIuLi9kYXRhL3NlcnZpY2VzL3J1bi1zZXJ2aWNlXCI7XG5cbmltcG9ydCB7Y2FuQ29ubmVjdH0gZnJvbSBcIi4uL25hdmlnYXRpb24vc3RhdHVzXCI7XG5cbmZ1bmN0aW9uIHJvdXRlKHBhdGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjb21wb25lbnQ6IFR5cGUsXG4gICAgICAgICAgICAgICBkYXRhPzogYW55LCB1c2VBc0RlZmF1bHQgPSBmYWxzZSk6IFJvdXRlRGVmaW5pdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgY29tcG9uZW50LFxuICAgICAgICBkYXRhLFxuICAgICAgICB1c2VBc0RlZmF1bHRcbiAgICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNpbG9CdXR0b24ge1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgY2xhc3NOYW1lOiBzdHJpbmc7XG4gICAgaXNEaXNhYmxlZD86IEZ1bmN0aW9uO1xuICAgIG9uQ2xpY2s/OiBGdW5jdGlvbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTaWxvU3RhdGUge1xuICAgIHRpdGxlPzogc3RyaW5nO1xuICAgIGJ1dHRvbnM/OiBTaWxvQnV0dG9uW107XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInJ1bi1kZXNpZ25cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcInJ1bi1kZXNpZ24vc2lsby5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbIFwicnVuLWRlc2lnbi9zaWxvLmNzc1wiIF0sXG4gICAgZGlyZWN0aXZlczogW1JvdXRlck91dGxldF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFtTaWxvU2VydmljZSwgUnVuU2VydmljZV1cbn0pXG5AUm91dGVDb25maWcoW1xuICAgIHJvdXRlKFxuICAgICAgICBcIi9cIixcbiAgICAgICAgXCJJbmRleFwiLFxuICAgICAgICBJbmRleCxcbiAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6IFwiUnVuIERlc2lnblwiLFxuICAgICAgICAgICAgcGFnZUlkOiBcInJ1bi1kZXNpZ25cIlxuICAgICAgICB9LFxuICAgICAgICB0cnVlXG4gICAgKSxcbiAgICByb3V0ZShcIi9uZXdcIiwgXCJOZXdSdW5cIiwgUnVuRWRpdG9yKSxcbiAgICByb3V0ZShcIi86aWRcIiwgXCJFZGl0UnVuXCIsIFJ1bkVkaXRvciksXG4gICAgcm91dGUoXCIvOmlkL3N1bW1hcnlcIiwgXCJTdW1tYXJ5XCIsIFN1bW1hcnkpXG5dKVxuQENhbkFjdGl2YXRlKGNhbkNvbm5lY3QpXG5leHBvcnQgY2xhc3MgUnVuRGVzaWduIHtcbiAgICBwcml2YXRlIHRpdGxlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBidXR0b25zOiBTaWxvQnV0dG9uW107XG5cbiAgICBjb25zdHJ1Y3RvcihzaWxvU2VydmljZTogU2lsb1NlcnZpY2U8U2lsb1N0YXRlPikge1xuICAgICAgICBzaWxvU2VydmljZS5zdGF0ZS5zdWJzY3JpYmUoKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gc3RhdGUudGl0bGU7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnMgPSBzdGF0ZS5idXR0b25zO1xuICAgICAgICB9KTtcblxuICAgICAgICBuYXZiYXJTZXR0aW5ncy5zZXRTaWxvKFNJTE8uUlVOX0RFU0lHTik7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9