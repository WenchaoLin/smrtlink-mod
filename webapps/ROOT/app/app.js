/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
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
// Angular imports
var core_1 = require("angular2/core");
var router_1 = require("angular2/router");
// SMRT Link imports
var injector_1 = require("athenaeum/common/injector");
var io_1 = require("athenaeum/data/api/io");
var stash_1 = require("./data/io/stash");
var job_service_1 = require("./data/services/job-service");
var parts_service_1 = require("./data/services/parts-service");
var auth_service_1 = require("athenaeum/data/services/auth-service");
var navbar_settings_1 = require("./navbar-settings");
var navbar_1 = require("athenaeum/components/navbar/navbar");
var menu_1 = require("athenaeum/components/menu/menu");
var modal_1 = require("athenaeum/components/modal/modal");
var error_service_1 = require("./silos/error/error-service");
var error_1 = require("./silos/error");
var welcome_1 = require("./silos/welcome");
var about_1 = require("./silos/about");
var analysis_1 = require("./silos/analysis");
var run_design_1 = require("./silos/run-design");
var run_qc_1 = require("./silos/run-qc");
var data_management_1 = require("./silos/data-management");
var login_1 = require("./silos/login/login");
var file_chooser_1 = require("athenaeum/components/file-chooser/file-chooser");
var local_storage_service_1 = require("athenaeum/services/local-storage-service");
var dataset_service_1 = require("./silos/shared/dataset-service");
var App = (function () {
    function App(router, injector, authService, localStorage) {
        var _this = this;
        injector_1.set(injector);
        this.router = router;
        this.authService = authService;
        this.localStorage = localStorage;
        this.navbarSettings = navbar_settings_1.navbarSettings;
        this.navbarSettings.onHelp = function () { _this.doHelp(); };
    }
    App.prototype.doHelp = function () {
        /* TODO(bskinner):
         * Welcome page: Clicking ? should display SL_Home.htm.
         * Sample Setup page: ? should display SL_CS_SampleSetUp_Top.htm.
         * Run Design page: Clicking ? should display SL_CS_RunDes_Top.htm.
         * Run QC page: Clicking ? should display Dash_Top.htm.
         * Data Analysis pages: Clicking ? should display SL_CS_SA_Top.htm.
         */
        window.open(this.navbarSettings.helpUrl, "detab", "toolbar=0, top=100, left=500, width=600, height=600");
    };
    App.prototype.isUserLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    App.prototype.getUsername = function () {
        var user = this.authService.getUser();
        return (user) ? user.name : null;
    };
    App.prototype.doLogout = function () {
        var _this = this;
        this.authService.logout().subscribe(function (result) {
            _this.router.navigate(["/Login"]);
            _this.localStorage.deleteAll();
        });
    };
    App = __decorate([
        core_1.Component({
            selector: "pb-app",
            moduleId: module.id,
            templateUrl: "app.html",
            styleUrls: ["app.css"],
            directives: [
                welcome_1.Welcome, navbar_1.Navbar, router_1.RouterOutlet, router_1.RouterLink,
                menu_1.MENU_DIRECTIVES, modal_1.MODAL_DIRECTIVES
            ],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [
                io_1.IO,
                stash_1.Stash,
                modal_1.MODAL_BINDINGS,
                file_chooser_1.FILE_CHOOSER_PROVIDERS,
                auth_service_1.AuthenticationService,
                error_service_1.ErrorService,
                parts_service_1.PartsService,
                dataset_service_1.DatasetService,
                job_service_1.JobService,
                local_storage_service_1.LocalStorageService
            ]
        }),
        router_1.RouteConfig([
            { path: "/", redirectTo: ["Welcome"] },
            { path: "/error", name: "Error", component: error_1.Error },
            { path: "/login", name: "Login", component: login_1.LoginPage },
            { path: "/welcome", name: "Welcome", component: welcome_1.Welcome },
            { path: "/about", name: "About", component: about_1.About },
            { path: "/analysis/...", name: "Analysis", component: analysis_1.Analysis },
            // { path: "/sample-setup/...", name: "SampleSetup", component: SampleSetup },
            { path: "/run-design/...", name: "RunDesign", component: run_design_1.RunDesign },
            { path: "/run-qc/...", name: "RunQC", component: run_qc_1.RunQC },
            { path: "/data-management/...", name: "DataManagement", component: data_management_1.DataManagement }
        ]), 
        __metadata('design:paramtypes', [router_1.Router, core_1.Injector, auth_service_1.AuthenticationService, local_storage_service_1.LocalStorageService])
    ], App);
    return App;
}());
exports.App = App;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOzs7Ozs7Ozs7OztBQUVILGtCQUFrQjtBQUVsQixxQkFBcUQsZUFBZSxDQUFDLENBQUE7QUFDckUsdUJBQTRELGlCQUFpQixDQUFDLENBQUE7QUFFOUUsb0JBQW9CO0FBQ3BCLHlCQUFpQywyQkFBMkIsQ0FBQyxDQUFBO0FBQzdELG1CQUFpQix1QkFBdUIsQ0FBQyxDQUFBO0FBQ3pDLHNCQUFvQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3RDLDRCQUF5Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBQ3ZELDhCQUEyQiwrQkFBK0IsQ0FBQyxDQUFBO0FBQzNELDZCQUFvQyxzQ0FBc0MsQ0FBQyxDQUFBO0FBRTNFLGdDQUE2QixtQkFBbUIsQ0FBQyxDQUFBO0FBQ2pELHVCQUFxQixvQ0FBb0MsQ0FBQyxDQUFBO0FBQzFELHFCQUE4QixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQy9ELHNCQUErQyxrQ0FBa0MsQ0FBQyxDQUFBO0FBRWxGLDhCQUEyQiw2QkFBNkIsQ0FBQyxDQUFBO0FBQ3pELHNCQUFzQyxlQUFlLENBQUMsQ0FBQTtBQUN0RCx3QkFBc0IsaUJBQWlCLENBQUMsQ0FBQTtBQUN4QyxzQkFBb0IsZUFBZSxDQUFDLENBQUE7QUFDcEMseUJBQXVCLGtCQUFrQixDQUFDLENBQUE7QUFFMUMsMkJBQXdCLG9CQUFvQixDQUFDLENBQUE7QUFDN0MsdUJBQW9CLGdCQUFnQixDQUFDLENBQUE7QUFDckMsZ0NBQTZCLHlCQUF5QixDQUFDLENBQUE7QUFDdkQsc0JBQXdCLHFCQUFxQixDQUFDLENBQUE7QUFFOUMsNkJBQXFDLGdEQUFnRCxDQUFDLENBQUE7QUFDdEYsc0NBQWtDLDBDQUEwQyxDQUFDLENBQUE7QUFDN0UsZ0NBQTZCLGdDQUFnQyxDQUFDLENBQUE7QUFxQzlEO0lBTUksYUFDSSxNQUFjLEVBQ2QsUUFBa0IsRUFDbEIsV0FBa0MsRUFDbEMsWUFBaUM7UUFWekMsaUJBZ0RDO1FBcENPLGNBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV0QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUVqQyxJQUFJLENBQUMsY0FBYyxHQUFHLGdDQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsY0FBTyxLQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELG9CQUFNLEdBQU47UUFDSTs7Ozs7O1dBTUc7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxxREFBcUQsQ0FBQyxDQUFDO0lBQzdHLENBQUM7SUFFTSw0QkFBYyxHQUFyQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFTSx5QkFBVyxHQUFsQjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckMsQ0FBQztJQUVNLHNCQUFRLEdBQWY7UUFBQSxpQkFLQztRQUpHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUN2QyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakMsS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFsRkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxVQUFVO1lBQ3ZCLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUN0QixVQUFVLEVBQUU7Z0JBQ1IsaUJBQU8sRUFBRSxlQUFNLEVBQUUscUJBQVksRUFBRSxtQkFBVTtnQkFDekMsc0JBQWUsRUFBRSx3QkFBZ0I7YUFDcEM7WUFDRCxhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtZQUNyQyxTQUFTLEVBQUU7Z0JBQ1AsT0FBRTtnQkFDRixhQUFLO2dCQUNMLHNCQUFjO2dCQUNkLHFDQUFzQjtnQkFDdEIsb0NBQXFCO2dCQUNyQiw0QkFBWTtnQkFDWiw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCx3QkFBVTtnQkFDViwyQ0FBbUI7YUFDdEI7U0FDSixDQUFDO1FBQ0Qsb0JBQVcsQ0FBQztZQUNULEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsQ0FBRSxTQUFTLENBQUUsRUFBRTtZQUN4QyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsYUFBYyxFQUFFO1lBQzVELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxpQkFBUyxFQUFFO1lBQ3ZELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBTyxFQUFFO1lBQ3pELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxhQUFLLEVBQUU7WUFDbkQsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLG1CQUFRLEVBQUU7WUFDaEUsOEVBQThFO1lBQzlFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLHNCQUFTLEVBQUU7WUFDcEUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQUssRUFBRTtZQUN4RCxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLGdDQUFjLEVBQUU7U0FDdEYsQ0FBQzs7V0FBQTtJQWlERixVQUFDO0FBQUQsQ0FoREEsQUFnREMsSUFBQTtBQWhEWSxXQUFHLE1BZ0RmLENBQUEiLCJmaWxlIjoiYXBwL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTUsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYSwgSW5jLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmJza2lubmVyQHBhY2lmaWNiaW9zY2llbmNlcy5jb21cIj5CcmlhbiBTa2lubmVyPC9hPlxuICovXG5cbi8vIEFuZ3VsYXIgaW1wb3J0c1xuXG5pbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIEluamVjdG9yfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtSb3V0ZUNvbmZpZywgUm91dGVyT3V0bGV0LCBSb3V0ZXJMaW5rLCBSb3V0ZXJ9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcblxuLy8gU01SVCBMaW5rIGltcG9ydHNcbmltcG9ydCB7c2V0IGFzIHNldEluamVjdG9yfSBmcm9tIFwiYXRoZW5hZXVtL2NvbW1vbi9pbmplY3RvclwiO1xuaW1wb3J0IHtJT30gZnJvbSBcImF0aGVuYWV1bS9kYXRhL2FwaS9pb1wiO1xuaW1wb3J0IHtTdGFzaH0gZnJvbSBcIi4vZGF0YS9pby9zdGFzaFwiO1xuaW1wb3J0IHtKb2JTZXJ2aWNlfSBmcm9tIFwiLi9kYXRhL3NlcnZpY2VzL2pvYi1zZXJ2aWNlXCI7XG5pbXBvcnQge1BhcnRzU2VydmljZX0gZnJvbSBcIi4vZGF0YS9zZXJ2aWNlcy9wYXJ0cy1zZXJ2aWNlXCI7XG5pbXBvcnQge0F1dGhlbnRpY2F0aW9uU2VydmljZX0gZnJvbSBcImF0aGVuYWV1bS9kYXRhL3NlcnZpY2VzL2F1dGgtc2VydmljZVwiO1xuXG5pbXBvcnQge25hdmJhclNldHRpbmdzfSBmcm9tIFwiLi9uYXZiYXItc2V0dGluZ3NcIjtcbmltcG9ydCB7TmF2YmFyfSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhclwiO1xuaW1wb3J0IHtNRU5VX0RJUkVDVElWRVN9IGZyb20gXCJhdGhlbmFldW0vY29tcG9uZW50cy9tZW51L21lbnVcIjtcbmltcG9ydCB7TU9EQUxfRElSRUNUSVZFUywgTU9EQUxfQklORElOR1N9IGZyb20gXCJhdGhlbmFldW0vY29tcG9uZW50cy9tb2RhbC9tb2RhbFwiO1xuXG5pbXBvcnQge0Vycm9yU2VydmljZX0gZnJvbSBcIi4vc2lsb3MvZXJyb3IvZXJyb3Itc2VydmljZVwiO1xuaW1wb3J0IHtFcnJvciBhcyBFcnJvckNvbXBvbmVudH0gZnJvbSBcIi4vc2lsb3MvZXJyb3JcIjtcbmltcG9ydCB7V2VsY29tZX0gZnJvbSBcIi4vc2lsb3Mvd2VsY29tZVwiO1xuaW1wb3J0IHtBYm91dH0gZnJvbSBcIi4vc2lsb3MvYWJvdXRcIjtcbmltcG9ydCB7QW5hbHlzaXN9IGZyb20gXCIuL3NpbG9zL2FuYWx5c2lzXCI7XG5pbXBvcnQge1NhbXBsZVNldHVwfSBmcm9tIFwiLi9zaWxvcy9zYW1wbGUtc2V0dXBcIjtcbmltcG9ydCB7UnVuRGVzaWdufSBmcm9tIFwiLi9zaWxvcy9ydW4tZGVzaWduXCI7XG5pbXBvcnQge1J1blFDfSBmcm9tIFwiLi9zaWxvcy9ydW4tcWNcIjtcbmltcG9ydCB7RGF0YU1hbmFnZW1lbnR9IGZyb20gXCIuL3NpbG9zL2RhdGEtbWFuYWdlbWVudFwiO1xuaW1wb3J0IHtMb2dpblBhZ2V9IGZyb20gXCIuL3NpbG9zL2xvZ2luL2xvZ2luXCI7XG5cbmltcG9ydCB7RklMRV9DSE9PU0VSX1BST1ZJREVSU30gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL2ZpbGUtY2hvb3Nlci9maWxlLWNob29zZXJcIjtcbmltcG9ydCB7TG9jYWxTdG9yYWdlU2VydmljZX0gZnJvbSBcImF0aGVuYWV1bS9zZXJ2aWNlcy9sb2NhbC1zdG9yYWdlLXNlcnZpY2VcIjtcbmltcG9ydCB7RGF0YXNldFNlcnZpY2V9IGZyb20gXCIuL3NpbG9zL3NoYXJlZC9kYXRhc2V0LXNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicGItYXBwXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiYXBwLmNzc1wiXSxcbiAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgIFdlbGNvbWUsIE5hdmJhciwgUm91dGVyT3V0bGV0LCBSb3V0ZXJMaW5rLFxuICAgICAgICBNRU5VX0RJUkVDVElWRVMsIE1PREFMX0RJUkVDVElWRVNcbiAgICBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIElPLFxuICAgICAgICBTdGFzaCxcbiAgICAgICAgTU9EQUxfQklORElOR1MsXG4gICAgICAgIEZJTEVfQ0hPT1NFUl9QUk9WSURFUlMsXG4gICAgICAgIEF1dGhlbnRpY2F0aW9uU2VydmljZSxcbiAgICAgICAgRXJyb3JTZXJ2aWNlLFxuICAgICAgICBQYXJ0c1NlcnZpY2UsXG4gICAgICAgIERhdGFzZXRTZXJ2aWNlLFxuICAgICAgICBKb2JTZXJ2aWNlLFxuICAgICAgICBMb2NhbFN0b3JhZ2VTZXJ2aWNlXG4gICAgXVxufSlcbkBSb3V0ZUNvbmZpZyhbXG4gICAgeyBwYXRoOiBcIi9cIiwgcmVkaXJlY3RUbzogWyBcIldlbGNvbWVcIiBdIH0sXG4gICAgeyBwYXRoOiBcIi9lcnJvclwiLCBuYW1lOiBcIkVycm9yXCIsIGNvbXBvbmVudDogRXJyb3JDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwiL2xvZ2luXCIsIG5hbWU6IFwiTG9naW5cIiwgY29tcG9uZW50OiBMb2dpblBhZ2UgfSxcbiAgICB7IHBhdGg6IFwiL3dlbGNvbWVcIiwgbmFtZTogXCJXZWxjb21lXCIsIGNvbXBvbmVudDogV2VsY29tZSB9LFxuICAgIHsgcGF0aDogXCIvYWJvdXRcIiwgbmFtZTogXCJBYm91dFwiLCBjb21wb25lbnQ6IEFib3V0IH0sXG4gICAgeyBwYXRoOiBcIi9hbmFseXNpcy8uLi5cIiwgbmFtZTogXCJBbmFseXNpc1wiLCBjb21wb25lbnQ6IEFuYWx5c2lzIH0sXG4gICAgLy8geyBwYXRoOiBcIi9zYW1wbGUtc2V0dXAvLi4uXCIsIG5hbWU6IFwiU2FtcGxlU2V0dXBcIiwgY29tcG9uZW50OiBTYW1wbGVTZXR1cCB9LFxuICAgIHsgcGF0aDogXCIvcnVuLWRlc2lnbi8uLi5cIiwgbmFtZTogXCJSdW5EZXNpZ25cIiwgY29tcG9uZW50OiBSdW5EZXNpZ24gfSxcbiAgICB7IHBhdGg6IFwiL3J1bi1xYy8uLi5cIiwgbmFtZTogXCJSdW5RQ1wiLCBjb21wb25lbnQ6IFJ1blFDIH0sXG4gICAgeyBwYXRoOiBcIi9kYXRhLW1hbmFnZW1lbnQvLi4uXCIsIG5hbWU6IFwiRGF0YU1hbmFnZW1lbnRcIiwgY29tcG9uZW50OiBEYXRhTWFuYWdlbWVudCB9XG5dKVxuZXhwb3J0IGNsYXNzIEFwcCB7XG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcjtcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2U7XG4gICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2U6IExvY2FsU3RvcmFnZVNlcnZpY2U7XG4gICAgcHJpdmF0ZSBuYXZiYXJTZXR0aW5nczogYW55O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIGF1dGhTZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UsXG4gICAgICAgIGxvY2FsU3RvcmFnZTogTG9jYWxTdG9yYWdlU2VydmljZVxuICAgICkge1xuICAgICAgICBzZXRJbmplY3RvcihpbmplY3Rvcik7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UgPSBhdXRoU2VydmljZTtcbiAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2U7XG5cbiAgICAgICAgdGhpcy5uYXZiYXJTZXR0aW5ncyA9IG5hdmJhclNldHRpbmdzO1xuICAgICAgICB0aGlzLm5hdmJhclNldHRpbmdzLm9uSGVscCA9ICgpID0+IHt0aGlzLmRvSGVscCgpO307XG4gICAgfVxuXG4gICAgZG9IZWxwKCkge1xuICAgICAgICAvKiBUT0RPKGJza2lubmVyKTpcbiAgICAgICAgICogV2VsY29tZSBwYWdlOiBDbGlja2luZyA/IHNob3VsZCBkaXNwbGF5IFNMX0hvbWUuaHRtLlxuICAgICAgICAgKiBTYW1wbGUgU2V0dXAgcGFnZTogPyBzaG91bGQgZGlzcGxheSBTTF9DU19TYW1wbGVTZXRVcF9Ub3AuaHRtLlxuICAgICAgICAgKiBSdW4gRGVzaWduIHBhZ2U6IENsaWNraW5nID8gc2hvdWxkIGRpc3BsYXkgU0xfQ1NfUnVuRGVzX1RvcC5odG0uXG4gICAgICAgICAqIFJ1biBRQyBwYWdlOiBDbGlja2luZyA/IHNob3VsZCBkaXNwbGF5IERhc2hfVG9wLmh0bS5cbiAgICAgICAgICogRGF0YSBBbmFseXNpcyBwYWdlczogQ2xpY2tpbmcgPyBzaG91bGQgZGlzcGxheSBTTF9DU19TQV9Ub3AuaHRtLlxuICAgICAgICAgKi9cbiAgICAgICAgd2luZG93Lm9wZW4odGhpcy5uYXZiYXJTZXR0aW5ncy5oZWxwVXJsLCBcImRldGFiXCIsIFwidG9vbGJhcj0wLCB0b3A9MTAwLCBsZWZ0PTUwMCwgd2lkdGg9NjAwLCBoZWlnaHQ9NjAwXCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1VzZXJMb2dnZWRJbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UuaXNMb2dnZWRJbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2VybmFtZSgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgdXNlciA9IHRoaXMuYXV0aFNlcnZpY2UuZ2V0VXNlcigpO1xuICAgICAgICByZXR1cm4gKHVzZXIpID8gdXNlci5uYW1lIDogbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZG9Mb2dvdXQoKSB7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UubG9nb3V0KCkuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9Mb2dpblwiXSk7XG4gICAgICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZS5kZWxldGVBbGwoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9