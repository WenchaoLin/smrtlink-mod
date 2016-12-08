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
var core_1 = require("angular2/core");
var common_1 = require("angular2/common");
var navbar_settings_1 = require("../../navbar-settings");
var silo_1 = require("../silo");
var http_1 = require("athenaeum/services/http");
var error_service_1 = require("../error/error-service");
var AboutIndex = (function () {
    /* TODO(bskinner)(2015-12-11): Add this back in again when the services
     *                             give more info in response to this request.
     *private serverComponents = this.io.getEndpointAsync(this.api.nComponents);
     */
    function AboutIndex(errorService, http, servers) {
        var _this = this;
        this.vm = {
            loading: true,
            components: null,
            errorMessage: null
        };
        this.appVersionInfo = {
            name: "SMRT Link UI",
            version: "3.1.1",
            details: "Change 182734 on 2016/07/07"
        };
        this.errorService = errorService;
        this.http = http;
        this.serverStatus = this.http.get("api://smrt-link/status").toPromise();
        this.serverLocation = {
            name: "Sequel API Server",
            version: servers.getUrl("api://smrt-link/")
        };
        navbar_settings_1.navbarSettings.setSilo(silo_1.SILO.ABOUT);
        var components = Promise.all([
            this.appVersionInfo,
            this.serverLocation,
            this.serverStatus
        ]);
        components
            .then(function (results) { return _this.setComponents(results); })
            .catch(function (error) {
            _this.setComponents([_this.appVersionInfo, _this.serverLocation]);
            _this.setErrorMessage(error);
        });
    }
    AboutIndex.prototype.setComponents = function (results) {
        var components = [];
        var NAMES_BY_ID = {
            "pacbio.smrtservices.smrtlink_analysis": "SMRT Link Web Services"
        };
        function transform(object) {
            return {
                name: NAMES_BY_ID[object.id],
                version: object.version
            };
        }
        for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
            var result = results_1[_i];
            if (!Array.isArray(result)) {
                if ("name" in result) {
                    components.push(result);
                }
                else {
                    components.push(transform(result));
                }
            }
            else {
                components.push.apply(components, result.map(transform));
            }
        }
        this.vm.components = components;
        this.vm.loading = false;
    };
    AboutIndex.prototype.setErrorMessage = function (error) {
        this.errorService.logError(error);
        this.vm.errorMessage = error_service_1.ErrorService.messageForError(error);
        this.vm.loading = false;
    };
    AboutIndex = __decorate([
        core_1.Component({
            selector: "about",
            providers: [error_service_1.ErrorService, http_1.Http],
            moduleId: module.id,
            templateUrl: "index.html",
            directives: [common_1.CORE_DIRECTIVES],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [error_service_1.ErrorService, http_1.Http, http_1.APIServers])
    ], AboutIndex);
    return AboutIndex;
}());
exports.AboutIndex = AboutIndex;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9hYm91dC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7Ozs7Ozs7Ozs7O0FBRUgscUJBQTJDLGVBQWUsQ0FBQyxDQUFBO0FBQzNELHVCQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBRWhELGdDQUE2Qix1QkFBdUIsQ0FBQyxDQUFBO0FBQ3JELHFCQUFtQixTQUFTLENBQUMsQ0FBQTtBQUU3QixxQkFBK0IseUJBQXlCLENBQUMsQ0FBQTtBQUN6RCw4QkFBMkIsd0JBQXdCLENBQUMsQ0FBQTtBQXFCcEQ7SUFtQkk7OztPQUdHO0lBRUgsb0JBQVksWUFBMEIsRUFBRSxJQUFVLEVBQUUsT0FBbUI7UUF4QjNFLGlCQXNGQztRQXJGVSxPQUFFLEdBQUc7WUFDUixPQUFPLEVBQUUsSUFBSTtZQUNiLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFlBQVksRUFBRSxJQUFJO1NBQ3JCLENBQUM7UUFNTSxtQkFBYyxHQUFHO1lBQ3JCLElBQUksRUFBRSxjQUFjO1lBQ3BCLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsT0FBTyxFQUFFLGdDQUFnQztTQUM1QyxDQUFDO1FBVUUsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXhFLElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDbEIsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztTQUM5QyxDQUFDO1FBRUYsZ0NBQWMsQ0FBQyxPQUFPLENBQUMsV0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5DLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDM0IsSUFBSSxDQUFDLGNBQWM7WUFDbkIsSUFBSSxDQUFDLGNBQWM7WUFDbkIsSUFBSSxDQUFDLFlBQVk7U0FHcEIsQ0FBQyxDQUFDO1FBRUgsVUFBVTthQUNMLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQTNCLENBQTJCLENBQUM7YUFDNUMsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUNSLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFJLENBQUMsY0FBYyxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQy9ELEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU8sa0NBQWEsR0FBckIsVUFBc0IsT0FBTztRQUN6QixJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBTSxXQUFXLEdBQUc7WUFDaEIsdUNBQXVDLEVBQUUsd0JBQXdCO1NBQ3BFLENBQUM7UUFFRixtQkFBbUIsTUFBTTtZQUNyQixNQUFNLENBQUM7Z0JBQ0gsSUFBSSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUM1QixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87YUFDMUIsQ0FBQztRQUNOLENBQUM7UUFFRCxHQUFHLENBQUMsQ0FBZSxVQUFPLEVBQVAsbUJBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU8sQ0FBQztZQUF0QixJQUFJLE1BQU0sZ0JBQUE7WUFDWCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDbkIsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsQ0FBQyxJQUFJLE9BQWYsVUFBVSxFQUFnQixNQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRU8sb0NBQWUsR0FBdkIsVUFBd0IsS0FBSztRQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksR0FBRyw0QkFBWSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQTdGTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLFdBQUksQ0FBQztZQUMvQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLFlBQVk7WUFDekIsVUFBVSxFQUFFLENBQUMsd0JBQWUsQ0FBQztZQUM3QixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtTQUN4QyxDQUFDOztrQkFBQTtJQXVGRixpQkFBQztBQUFELENBdEZBLEFBc0ZDLElBQUE7QUF0Rlksa0JBQVUsYUFzRnRCLENBQUEiLCJmaWxlIjoiYXBwL3NpbG9zL2Fib3V0L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhLCBJbmMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86YnNraW5uZXJAcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbVwiPkJyaWFuIFNraW5uZXI8L2E+XG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcblxuaW1wb3J0IHtuYXZiYXJTZXR0aW5nc30gZnJvbSBcIi4uLy4uL25hdmJhci1zZXR0aW5nc1wiO1xuaW1wb3J0IHtTSUxPfSBmcm9tIFwiLi4vc2lsb1wiO1xuXG5pbXBvcnQge0h0dHAsIEFQSVNlcnZlcnN9IGZyb20gXCJhdGhlbmFldW0vc2VydmljZXMvaHR0cFwiO1xuaW1wb3J0IHtFcnJvclNlcnZpY2V9IGZyb20gXCIuLi9lcnJvci9lcnJvci1zZXJ2aWNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvbmVudEluZm8ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG4gICAgZGV0YWlscz86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU2VydmVyQ29tcG9uZW50IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHZlcnNpb246IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiYWJvdXRcIixcbiAgICBwcm92aWRlcnM6IFtFcnJvclNlcnZpY2UsIEh0dHBdLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiaW5kZXguaHRtbFwiLFxuICAgIGRpcmVjdGl2ZXM6IFtDT1JFX0RJUkVDVElWRVNdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQWJvdXRJbmRleCB7XG4gICAgcHVibGljIHZtID0ge1xuICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICBjb21wb25lbnRzOiBudWxsLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IG51bGxcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBlcnJvclNlcnZpY2U6IEVycm9yU2VydmljZTtcbiAgICBwcml2YXRlIGh0dHA6IEh0dHA7XG4gICAgcHJpdmF0ZSBzZXJ2ZXJTdGF0dXM6IFByb21pc2U8YW55PjtcblxuICAgIHByaXZhdGUgYXBwVmVyc2lvbkluZm8gPSB7XG4gICAgICAgIG5hbWU6IFwiU01SVCBMaW5rIFVJXCIsXG4gICAgICAgIHZlcnNpb246IFwiPCU9VkVSU0lPTl9PTkxZJT5cIixcbiAgICAgICAgZGV0YWlsczogXCI8JT1MQVNUX1BFUkZPUkNFX0NIQU5HRV9MSVNUJT5cIlxuICAgIH07XG5cbiAgICBwcml2YXRlIHNlcnZlckxvY2F0aW9uOiB7fTtcblxuICAgIC8qIFRPRE8oYnNraW5uZXIpKDIwMTUtMTItMTEpOiBBZGQgdGhpcyBiYWNrIGluIGFnYWluIHdoZW4gdGhlIHNlcnZpY2VzXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdpdmUgbW9yZSBpbmZvIGluIHJlc3BvbnNlIHRvIHRoaXMgcmVxdWVzdC5cbiAgICAgKnByaXZhdGUgc2VydmVyQ29tcG9uZW50cyA9IHRoaXMuaW8uZ2V0RW5kcG9pbnRBc3luYyh0aGlzLmFwaS5uQ29tcG9uZW50cyk7XG4gICAgICovXG5cbiAgICBjb25zdHJ1Y3RvcihlcnJvclNlcnZpY2U6IEVycm9yU2VydmljZSwgaHR0cDogSHR0cCwgc2VydmVyczogQVBJU2VydmVycykge1xuICAgICAgICB0aGlzLmVycm9yU2VydmljZSA9IGVycm9yU2VydmljZTtcbiAgICAgICAgdGhpcy5odHRwID0gaHR0cDtcbiAgICAgICAgdGhpcy5zZXJ2ZXJTdGF0dXMgPSB0aGlzLmh0dHAuZ2V0KFwiYXBpOi8vc21ydC1saW5rL3N0YXR1c1wiKS50b1Byb21pc2UoKTtcblxuICAgICAgICB0aGlzLnNlcnZlckxvY2F0aW9uID0ge1xuICAgICAgICAgICAgbmFtZTogXCJTZXF1ZWwgQVBJIFNlcnZlclwiLFxuICAgICAgICAgICAgdmVyc2lvbjogc2VydmVycy5nZXRVcmwoXCJhcGk6Ly9zbXJ0LWxpbmsvXCIpXG4gICAgICAgIH07XG5cbiAgICAgICAgbmF2YmFyU2V0dGluZ3Muc2V0U2lsbyhTSUxPLkFCT1VUKTtcblxuICAgICAgICBjb25zdCBjb21wb25lbnRzID0gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5hcHBWZXJzaW9uSW5mbyxcbiAgICAgICAgICAgIHRoaXMuc2VydmVyTG9jYXRpb24sXG4gICAgICAgICAgICB0aGlzLnNlcnZlclN0YXR1c1xuICAgICAgICAgICAgLy8gVE9ETyhic2tpbm5lcikoMjAxNS0xMi0xMSk6IEFkZCB0aGlzIGJhY2sgaW4gYWdhaW5cbiAgICAgICAgICAgIC8vIHRoaXMuc2VydmVyQ29tcG9uZW50c1xuICAgICAgICBdKTtcblxuICAgICAgICBjb21wb25lbnRzXG4gICAgICAgICAgICAudGhlbihyZXN1bHRzID0+IHRoaXMuc2V0Q29tcG9uZW50cyhyZXN1bHRzKSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb21wb25lbnRzKFt0aGlzLmFwcFZlcnNpb25JbmZvLCB0aGlzLnNlcnZlckxvY2F0aW9uXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFcnJvck1lc3NhZ2UoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDb21wb25lbnRzKHJlc3VsdHMpIHtcbiAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IFtdO1xuICAgICAgICBjb25zdCBOQU1FU19CWV9JRCA9IHtcbiAgICAgICAgICAgIFwicGFjYmlvLnNtcnRzZXJ2aWNlcy5zbXJ0bGlua19hbmFseXNpc1wiOiBcIlNNUlQgTGluayBXZWIgU2VydmljZXNcIlxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIHRyYW5zZm9ybShvYmplY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbmFtZTogTkFNRVNfQllfSURbb2JqZWN0LmlkXSxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBvYmplY3QudmVyc2lvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHJlc3VsdCBvZiByZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgIGlmIChcIm5hbWVcIiBpbiByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cy5wdXNoKHRyYW5zZm9ybShyZXN1bHQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMucHVzaCguLi4oPGFueT4gcmVzdWx0KS5tYXAodHJhbnNmb3JtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZtLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuICAgICAgICB0aGlzLnZtLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEVycm9yTWVzc2FnZShlcnJvcikge1xuICAgICAgICB0aGlzLmVycm9yU2VydmljZS5sb2dFcnJvcihlcnJvcik7XG4gICAgICAgIHRoaXMudm0uZXJyb3JNZXNzYWdlID0gRXJyb3JTZXJ2aWNlLm1lc3NhZ2VGb3JFcnJvcihlcnJvcik7XG4gICAgICAgIHRoaXMudm0ubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==