"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var compiler_1 = require("angular2/compiler");
var router_1 = require("angular2/router");
var injector_1 = require("../common/injector");
function createLoader(componentModuleId, componentModuleProperty, parentModuleId) {
    if (componentModuleProperty === void 0) { componentModuleProperty = "default"; }
    var baseUrl = parentModuleId == null ? String.EMPTY : parentModuleId;
    function componentLoader() {
        var injector = injector_1.get();
        var resolver = injector.get(compiler_1.UrlResolver);
        return System.normalize(resolver.resolve(baseUrl, componentModuleId)).then(function (normalized) {
            return System.import(normalized).then(function (componentModule) {
                return componentModule[componentModuleProperty];
            });
        });
    }
    return componentLoader;
}
var AsyncRoute = (function (_super) {
    __extends(AsyncRoute, _super);
    function AsyncRoute(_a) {
        var path = _a.path, name = _a.name, componentModuleId = _a.componentModuleId, componentModuleProperty = _a.componentModuleProperty, parentModuleId = _a.parentModuleId, data = _a.data, useAsDefault = _a.useAsDefault;
        if (componentModuleProperty == null) {
            componentModuleProperty = "default";
        }
        _super.call(this, {
            path: path,
            name: name,
            data: data,
            useAsDefault: useAsDefault,
            loader: createLoader(componentModuleId, componentModuleProperty, parentModuleId)
        });
    }
    return AsyncRoute;
}(router_1.AsyncRoute));
exports.AsyncRoute = AsyncRoute;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci9Bc3luY1JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlCQUEwQixtQkFBbUIsQ0FBQyxDQUFBO0FBQzlDLHVCQUE4RCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hGLHlCQUFpQyxvQkFBb0IsQ0FBQyxDQUFBO0FBa0J0RCxzQkFBc0IsaUJBQXlCLEVBQUUsdUJBQTJDLEVBQUUsY0FBdUI7SUFBcEUsdUNBQTJDLEdBQTNDLG1DQUEyQztJQUN4RixJQUFNLE9BQU8sR0FBRyxjQUFjLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO0lBQ3ZFO1FBQ0ksSUFBTSxRQUFRLEdBQUcsY0FBVyxFQUFFLENBQUM7UUFDL0IsSUFBTSxRQUFRLEdBQWdCLFFBQVEsQ0FBQyxHQUFHLENBQUMsc0JBQVcsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxVQUFVO1lBQ2pGLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLGVBQWU7Z0JBQ2pELE1BQU0sQ0FBQyxlQUFlLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE1BQU0sQ0FBQyxlQUFlLENBQUM7QUFDM0IsQ0FBQztBQUVEO0lBQWdDLDhCQUFnQjtJQUM1QyxvQkFBWSxFQUFxRztZQUFwRyxjQUFJLEVBQUUsY0FBSSxFQUFFLHdDQUFpQixFQUFFLG9EQUF1QixFQUFFLGtDQUFjLEVBQUUsY0FBSSxFQUFFLDhCQUFZO1FBQ25HLEVBQUUsQ0FBQyxDQUFDLHVCQUF1QixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEMsdUJBQXVCLEdBQUcsU0FBUyxDQUFDO1FBQ3hDLENBQUM7UUFDRCxrQkFBTTtZQUNGLE1BQUEsSUFBSTtZQUNKLE1BQUEsSUFBSTtZQUNKLE1BQUEsSUFBSTtZQUNKLGNBQUEsWUFBWTtZQUNaLE1BQU0sRUFBRSxZQUFZLENBQUMsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsY0FBYyxDQUFDO1NBQ25GLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxpQkFBQztBQUFELENBYkEsQUFhQyxDQWIrQixtQkFBZ0IsR0FhL0M7QUFiWSxrQkFBVSxhQWF0QixDQUFBIiwiZmlsZSI6InJvdXRlci9Bc3luY1JvdXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtVcmxSZXNvbHZlcn0gZnJvbSBcImFuZ3VsYXIyL2NvbXBpbGVyXCI7XG5pbXBvcnQge0FzeW5jUm91dGUgYXMgUm91dGVyQXN5bmNSb3V0ZSwgUm91dGVEZWZpbml0aW9ufSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge2dldCBhcyBnZXRJbmplY3Rvcn0gZnJvbSBcIi4uL2NvbW1vbi9pbmplY3RvclwiO1xuXG5kZWNsYXJlIGNvbnN0IFN5c3RlbToge1xuICAgIGltcG9ydCh1cmk6IHN0cmluZyk6IFByb21pc2U8YW55PjtcbiAgICBub3JtYWxpemUodXJpOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz47XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnMge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29tcG9uZW50TW9kdWxlSWQ6IHN0cmluZztcbiAgICBjb21wb25lbnRNb2R1bGVQcm9wZXJ0eT86IHN0cmluZztcbiAgICBwYXJlbnRNb2R1bGVJZD86IHN0cmluZztcbiAgICBkYXRhPzogYW55O1xuICAgIHVzZUFzRGVmYXVsdD86IGJvb2xlYW47XG59XG5cbnR5cGUgTG9hZGVyID0gKCkgPT4gUHJvbWlzZTxhbnk+O1xuZnVuY3Rpb24gY3JlYXRlTG9hZGVyKGNvbXBvbmVudE1vZHVsZUlkOiBzdHJpbmcsIGNvbXBvbmVudE1vZHVsZVByb3BlcnR5OiBzdHJpbmcgPSBcImRlZmF1bHRcIiwgcGFyZW50TW9kdWxlSWQ/OiBzdHJpbmcpOiBMb2FkZXIge1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwYXJlbnRNb2R1bGVJZCA9PSBudWxsID8gU3RyaW5nLkVNUFRZIDogcGFyZW50TW9kdWxlSWQ7XG4gICAgZnVuY3Rpb24gY29tcG9uZW50TG9hZGVyKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IGluamVjdG9yID0gZ2V0SW5qZWN0b3IoKTtcbiAgICAgICAgY29uc3QgcmVzb2x2ZXI6IFVybFJlc29sdmVyID0gaW5qZWN0b3IuZ2V0KFVybFJlc29sdmVyKTtcbiAgICAgICAgcmV0dXJuIFN5c3RlbS5ub3JtYWxpemUocmVzb2x2ZXIucmVzb2x2ZShiYXNlVXJsLCBjb21wb25lbnRNb2R1bGVJZCkpLnRoZW4obm9ybWFsaXplZCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gU3lzdGVtLmltcG9ydChub3JtYWxpemVkKS50aGVuKGNvbXBvbmVudE1vZHVsZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudE1vZHVsZVtjb21wb25lbnRNb2R1bGVQcm9wZXJ0eV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnRMb2FkZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBBc3luY1JvdXRlIGV4dGVuZHMgUm91dGVyQXN5bmNSb3V0ZSB7XG4gICAgY29uc3RydWN0b3Ioe3BhdGgsIG5hbWUsIGNvbXBvbmVudE1vZHVsZUlkLCBjb21wb25lbnRNb2R1bGVQcm9wZXJ0eSwgcGFyZW50TW9kdWxlSWQsIGRhdGEsIHVzZUFzRGVmYXVsdH06IE9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGNvbXBvbmVudE1vZHVsZVByb3BlcnR5ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudE1vZHVsZVByb3BlcnR5ID0gXCJkZWZhdWx0XCI7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgdXNlQXNEZWZhdWx0LFxuICAgICAgICAgICAgbG9hZGVyOiBjcmVhdGVMb2FkZXIoY29tcG9uZW50TW9kdWxlSWQsIGNvbXBvbmVudE1vZHVsZVByb3BlcnR5LCBwYXJlbnRNb2R1bGVJZClcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9