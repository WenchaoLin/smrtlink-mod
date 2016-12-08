"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("angular2/core");
var browser_1 = require("angular2/platform/browser");
var router_1 = require("angular2/router");
var http_1 = require("athenaeum/services/http");
var compiler_1 = require("angular2/compiler");
var tree_view_1 = require("athenaeum/components/tree-view/tree-view");
var error_service_1 = require("./silos/error/error-service");
var parts_service_1 = require("./data/services/parts-service");
var app_1 = require("./app");
var partNumbers = require("../partnumbers.json!");
var AppUrlResolver = (function (_super) {
    __extends(AppUrlResolver, _super);
    function AppUrlResolver() {
        _super.apply(this, arguments);
    }
    AppUrlResolver.prototype.resolve = function (baseUrl, url) {
        return _super.prototype.resolve.call(this, baseUrl, url + "?v=3.1.1.182868");
    };
    return AppUrlResolver;
}(compiler_1.UrlResolver));
exports.AppUrlResolver = AppUrlResolver;
browser_1.bootstrap(app_1.App, [
    router_1.ROUTER_PROVIDERS,
    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
    core_1.provide(http_1.API_SERVER_CONFIGURATION, {
        useValue: require("../api-server.config.json!")
    }),
    http_1.HTTP_PROVIDERS,
    error_service_1.ErrorService,
    tree_view_1.TREE_VIEW_PROVIDERS,
    core_1.provide(parts_service_1.PART_NUMBERS_JSON, { useValue: partNumbers }),
    core_1.provide(compiler_1.UrlResolver, { useClass: AppUrlResolver }),
    browser_1.ELEMENT_PROBE_PROVIDERS
]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFCQUFzQixlQUFlLENBQUMsQ0FBQTtBQUN0Qyx3QkFBaUQsMkJBQTJCLENBQUMsQ0FBQTtBQUM3RSx1QkFBaUYsaUJBQWlCLENBQUMsQ0FBQTtBQUNuRyxxQkFBdUQseUJBQXlCLENBQUMsQ0FBQTtBQUNqRix5QkFBMEIsbUJBQW1CLENBQUMsQ0FBQTtBQUU5QywwQkFBa0MsMENBQTBDLENBQUMsQ0FBQTtBQUU3RSw4QkFBMkIsNkJBQTZCLENBQUMsQ0FBQTtBQUN6RCw4QkFBZ0MsK0JBQStCLENBQUMsQ0FBQTtBQUNoRSxvQkFBa0IsT0FBTyxDQUFDLENBQUE7QUFFMUIsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFcEQ7SUFBb0Msa0NBQVc7SUFBL0M7UUFBb0MsOEJBQVc7SUFJL0MsQ0FBQztJQUhHLGdDQUFPLEdBQVAsVUFBUSxPQUFlLEVBQUUsR0FBVztRQUNoQyxNQUFNLENBQUMsZ0JBQUssQ0FBQyxPQUFPLFlBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxhQUFhLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUpBLEFBSUMsQ0FKbUMsc0JBQVcsR0FJOUM7QUFKWSxzQkFBYyxpQkFJMUIsQ0FBQTtBQUVELG1CQUFTLENBQUMsU0FBRyxFQUFFO0lBQ1gseUJBQWdCO0lBQ2hCLGNBQU8sQ0FBQyx5QkFBZ0IsRUFBRSxFQUFFLFFBQVEsRUFBRSw2QkFBb0IsRUFBRSxDQUFDO0lBQzdELGNBQU8sQ0FBQywrQkFBd0IsRUFBRTtRQUM5QixRQUFRLEVBQUUsT0FBTyxDQUFDLDRCQUE0QixDQUFDO0tBQ2xELENBQUM7SUFDRixxQkFBYztJQUNkLDRCQUFZO0lBQ1osK0JBQW1CO0lBQ25CLGNBQU8sQ0FBQyxpQ0FBaUIsRUFBRSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUNyRCxjQUFPLENBQUMsc0JBQVcsRUFBRSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsQ0FBQztJQUNsRCxpQ0FBdUI7Q0FDMUIsQ0FBQyxDQUFDIiwiZmlsZSI6ImFwcC9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtwcm92aWRlfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtib290c3RyYXAsIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTfSBmcm9tIFwiYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3NlclwiO1xuaW1wb3J0IHtST1VURVJfUFJPVklERVJTLCBMb2NhdGlvbiwgTG9jYXRpb25TdHJhdGVneSwgSGFzaExvY2F0aW9uU3RyYXRlZ3l9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcbmltcG9ydCB7SFRUUF9QUk9WSURFUlMsIEFQSV9TRVJWRVJfQ09ORklHVVJBVElPTn0gZnJvbSBcImF0aGVuYWV1bS9zZXJ2aWNlcy9odHRwXCI7XG5pbXBvcnQge1VybFJlc29sdmVyfSBmcm9tIFwiYW5ndWxhcjIvY29tcGlsZXJcIjtcblxuaW1wb3J0IHtUUkVFX1ZJRVdfUFJPVklERVJTfSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvdHJlZS12aWV3L3RyZWUtdmlld1wiO1xuXG5pbXBvcnQge0Vycm9yU2VydmljZX0gZnJvbSBcIi4vc2lsb3MvZXJyb3IvZXJyb3Itc2VydmljZVwiO1xuaW1wb3J0IHtQQVJUX05VTUJFUlNfSlNPTn0gZnJvbSBcIi4vZGF0YS9zZXJ2aWNlcy9wYXJ0cy1zZXJ2aWNlXCI7XG5pbXBvcnQge0FwcH0gZnJvbSBcIi4vYXBwXCI7XG5cbmNvbnN0IHBhcnROdW1iZXJzID0gcmVxdWlyZShcIi4uL3BhcnRudW1iZXJzLmpzb24hXCIpO1xuXG5leHBvcnQgY2xhc3MgQXBwVXJsUmVzb2x2ZXIgZXh0ZW5kcyBVcmxSZXNvbHZlciB7XG4gICAgcmVzb2x2ZShiYXNlVXJsOiBzdHJpbmcsIHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnJlc29sdmUoYmFzZVVybCwgdXJsICsgXCI/dj08JT12ZXIlPlwiKTtcbiAgICB9XG59XG5cbmJvb3RzdHJhcChBcHAsIFtcbiAgICBST1VURVJfUFJPVklERVJTLFxuICAgIHByb3ZpZGUoTG9jYXRpb25TdHJhdGVneSwgeyB1c2VDbGFzczogSGFzaExvY2F0aW9uU3RyYXRlZ3kgfSksXG4gICAgcHJvdmlkZShBUElfU0VSVkVSX0NPTkZJR1VSQVRJT04sIHtcbiAgICAgICAgdXNlVmFsdWU6IHJlcXVpcmUoXCIuLi9hcGktc2VydmVyLmNvbmZpZy5qc29uIVwiKVxuICAgIH0pLFxuICAgIEhUVFBfUFJPVklERVJTLFxuICAgIEVycm9yU2VydmljZSxcbiAgICBUUkVFX1ZJRVdfUFJPVklERVJTLFxuICAgIHByb3ZpZGUoUEFSVF9OVU1CRVJTX0pTT04sIHsgdXNlVmFsdWU6IHBhcnROdW1iZXJzIH0pLFxuICAgIHByb3ZpZGUoVXJsUmVzb2x2ZXIsIHsgdXNlQ2xhc3M6IEFwcFVybFJlc29sdmVyIH0pLFxuICAgIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTXG5dKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==