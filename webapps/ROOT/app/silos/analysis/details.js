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
var router_1 = require("angular2/router");
var status_1 = require("../../navigation/status");
var error_service_1 = require("../error/error-service");
var imprint_1 = require("../../directives/imprint");
var stamp_1 = require("../../strings/stamp");
var stash_1 = require("../../data/io/stash");
var schema_property_pipe_1 = require("../../pipes/schema-property-pipe");
var Details = (function () {
    function Details(errorService, router, routeParams, routeData, stash) {
        this.errorService = errorService;
        this.router = router;
        this.routeParams = routeParams;
        this.STAMP = stamp_1.STAMP;
        this.previousPage = routeData.get("previousPage");
        this.datasetShortname = routeData.get("datasetShortname");
        this.facet = routeData.get("facet");
        this.stash = stash;
        this.vm = {
            title: "untitled",
            labeledValues: [],
            advancedLabeledValues: [],
            canAnalyze: !!routeData.get("canAnalyze")
        };
    }
    Details.prototype.routerCanReuse = function (next, prev) {
        return false;
    };
    Details.prototype.routerOnActivate = function (next, prev) {
        var _this = this;
        setTimeout(function () {
            _this.onViewContentLoaded();
        });
    };
    Details.prototype.onViewContentLoaded = function () {
        this.fetchAndDisplay(this.facet, this.routeParams.get("id"));
    };
    Details.prototype.fetchAndDisplay = function (facet, id) {
        var _this = this;
        var promise = this.stash.getItemById(facet.frame, id);
        promise.then(function (result) {
            var HTTP_CODE = "httpCode";
            if (result[HTTP_CODE] === 404) {
                _this.errorService.showError(result);
            }
            else {
                _this.displayResult(facet, result);
            }
        });
        promise.catch(function (error) { return _this.errorService.showError(error); });
    };
    Details.prototype.doCancel = function () {
        this.router.navigate([("../" + this.previousPage)]);
    };
    Details.prototype.doAnalyze = function () {
        var id = this.routeParams.get("id");
        this.router.navigate(["../Setting", { shortName: this.datasetShortname, id: id }]);
    };
    Details.prototype.displayResult = function (facet, result) {
        var NAME = "name";
        var ADVANCED_FIELDS = [
            "tags",
            "uuid",
            "path",
            "projectId",
            "userId",
            "id",
            "md5"
        ];
        this.vm.title = result[NAME];
        this.vm.labeledValues = [];
        for (var _i = 0, _a = facet.displayProperties; _i < _a.length; _i++) {
            var propName = _a[_i];
            var value = result[propName];
            var schemaForProperty = facet.frame.properties[propName];
            var labeledValue = {
                label: schemaForProperty.title,
                schema: schemaForProperty,
                value: value
            };
            if (ADVANCED_FIELDS.indexOf(propName) === -1) {
                this.vm.labeledValues.push(labeledValue);
            }
            else {
                this.vm.advancedLabeledValues.push(labeledValue);
            }
        }
    };
    Details = __decorate([
        core_1.Component({
            selector: "pb-details",
            providers: [error_service_1.ErrorService],
            pipes: [schema_property_pipe_1.SchemaPropertyPipe],
            moduleId: module.id,
            templateUrl: "details.html",
            host: {
                class: "detail-page"
            },
            styleUrls: [
                "details.css",
                "../../css/detail-page.css"
            ],
            directives: [imprint_1.Imprint, common_1.CORE_DIRECTIVES],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        router_1.CanActivate(status_1.canConnect), 
        __metadata('design:paramtypes', [error_service_1.ErrorService, router_1.Router, router_1.RouteParams, router_1.RouteData, stash_1.Stash])
    ], Details);
    return Details;
}());
exports.Details = Details;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9hbmFseXNpcy9kZXRhaWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7Ozs7Ozs7Ozs7QUFFSCxxQkFFTyxlQUFlLENBQUMsQ0FBQTtBQUN2Qix1QkFBOEIsaUJBQWlCLENBQUMsQ0FBQTtBQUNoRCx1QkFFTyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pCLHVCQUF5Qix5QkFBeUIsQ0FBQyxDQUFBO0FBRW5ELDhCQUEyQix3QkFBd0IsQ0FBQyxDQUFBO0FBRXBELHdCQUFzQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ2pELHNCQUFvQixxQkFBcUIsQ0FBQyxDQUFBO0FBTTFDLHNCQUFvQixxQkFBcUIsQ0FBQyxDQUFBO0FBRTFDLHFDQUFpQyxrQ0FBa0MsQ0FBQyxDQUFBO0FBb0JwRTtJQVNJLGlCQUFvQixZQUEwQixFQUMxQixNQUFjLEVBQ2QsV0FBd0IsRUFDaEMsU0FBb0IsRUFDcEIsS0FBWTtRQUpKLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVZyQyxVQUFLLEdBQUcsYUFBSyxDQUFDO1FBYWpCLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLFVBQVU7WUFDakIsYUFBYSxFQUFFLEVBQUU7WUFDakIscUJBQXFCLEVBQUUsRUFBRTtZQUN6QixVQUFVLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMs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aUI7Z0JBQ3pCLEtBQUssRUFBRSxLQUFLO2FBQ2YsQ0FBQztZQUNGLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxFQUFFLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3JELENBQUM7U0FDSjtJQUNMLENBQUM7SUEvR0w7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztZQUN6QixLQUFLLEVBQUUsQ0FBQyx5Q0FBa0IsQ0FBQztZQUMzQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGNBQWM7WUFDM0IsSUFBSSxFQUFFO2dCQUNGLEtBQUssRUFBRSxhQUFhO2FBQ3ZCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGFBQWE7Z0JBQ2IsMkJBQTJCO2FBQzlCO1lBRUQsVUFBVSxFQUFFLENBQUMsaUJBQU8sRUFBRSx3QkFBZSxDQUFDO1lBQ3RDLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3hDLENBQUM7UUFDRCxvQkFBVyxDQUFDLG1CQUFVLENBQUM7O2VBQUE7SUFnR3hCLGNBQUM7QUFBRCxDQS9GQSxBQStGQyxJQUFBO0FBL0ZZLGVBQU8sVUErRm5CLENBQUEiLCJmaWxlIjoiYXBwL3NpbG9zL2FuYWx5c2lzL2RldGFpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge0NPUkVfRElSRUNUSVZFU30gZnJvbSBcImFuZ3VsYXIyL2NvbW1vblwiO1xuaW1wb3J0IHtcbiAgICBSb3V0ZXIsIFJvdXRlRGF0YSwgUm91dGVQYXJhbXMsIENhbkFjdGl2YXRlLCBPbkFjdGl2YXRlLCBDYW5SZXVzZVxufSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge2NhbkNvbm5lY3R9IGZyb20gXCIuLi8uLi9uYXZpZ2F0aW9uL3N0YXR1c1wiO1xuXG5pbXBvcnQge0Vycm9yU2VydmljZX0gZnJvbSBcIi4uL2Vycm9yL2Vycm9yLXNlcnZpY2VcIjtcblxuaW1wb3J0IHtJbXByaW50fSBmcm9tIFwiLi4vLi4vZGlyZWN0aXZlcy9pbXByaW50XCI7XG5pbXBvcnQge1NUQU1QfSBmcm9tIFwiLi4vLi4vc3RyaW5ncy9zdGFtcFwiO1xuXG5pbXBvcnQge0VuZHBvaW50fSBmcm9tIFwiYXRoZW5hZXVtL2RhdGEvYXBpL2VuZHBvaW50XCI7XG5cbmltcG9ydCB7U0lMT30gZnJvbSBcIi4uL3NpbG9cIjtcblxuaW1wb3J0IHtTdGFzaH0gZnJvbSBcIi4uLy4uL2RhdGEvaW8vc3Rhc2hcIjtcbmltcG9ydCB7RmFjZXR9IGZyb20gXCIuLi8uLi9kYXRhL2ZhY2V0cy9mYWNldFwiO1xuaW1wb3J0IHtTY2hlbWFQcm9wZXJ0eVBpcGV9IGZyb20gXCIuLi8uLi9waXBlcy9zY2hlbWEtcHJvcGVydHktcGlwZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwYi1kZXRhaWxzXCIsXG4gICAgcHJvdmlkZXJzOiBbRXJyb3JTZXJ2aWNlXSxcbiAgICBwaXBlczogW1NjaGVtYVByb3BlcnR5UGlwZV0sXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCJkZXRhaWxzLmh0bWxcIixcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiBcImRldGFpbC1wYWdlXCJcbiAgICB9LFxuICAgIHN0eWxlVXJsczogW1xuICAgICAgICBcImRldGFpbHMuY3NzXCIsXG4gICAgICAgIFwiLi4vLi4vY3NzL2RldGFpbC1wYWdlLmNzc1wiXG4gICAgXSxcblxuICAgIGRpcmVjdGl2ZXM6IFtJbXByaW50LCBDT1JFX0RJUkVDVElWRVNdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5AQ2FuQWN0aXZhdGUoY2FuQ29ubmVjdClcbmV4cG9ydCBjbGFzcyBEZXRhaWxzIGltcGxlbWVudHMgT25BY3RpdmF0ZSwgQ2FuUmV1c2Uge1xuICAgIHB1YmxpYyBTVEFNUCA9IFNUQU1QO1xuICAgIHByaXZhdGUgdm07XG5cbiAgICBwcml2YXRlIHN0YXNoO1xuICAgIHByaXZhdGUgcHJldmlvdXNQYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBkYXRhc2V0U2hvcnRuYW1lOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBmYWNldDogRmFjZXQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9yU2VydmljZTogRXJyb3JTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZVBhcmFtczogUm91dGVQYXJhbXMsXG4gICAgICAgICAgICAgICAgcm91dGVEYXRhOiBSb3V0ZURhdGEsXG4gICAgICAgICAgICAgICAgc3Rhc2g6IFN0YXNoKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNQYWdlID0gcm91dGVEYXRhLmdldChcInByZXZpb3VzUGFnZVwiKTtcbiAgICAgICAgdGhpcy5kYXRhc2V0U2hvcnRuYW1lID0gcm91dGVEYXRhLmdldChcImRhdGFzZXRTaG9ydG5hbWVcIik7XG4gICAgICAgIHRoaXMuZmFjZXQgPSByb3V0ZURhdGEuZ2V0KFwiZmFjZXRcIik7XG5cbiAgICAgICAgdGhpcy5zdGFzaCA9IHN0YXNoO1xuICAgICAgICB0aGlzLnZtID0ge1xuICAgICAgICAgICAgdGl0bGU6IFwidW50aXRsZWRcIixcbiAgICAgICAgICAgIGxhYmVsZWRWYWx1ZXM6IFtdLFxuICAgICAgICAgICAgYWR2YW5jZWRMYWJlbGVkVmFsdWVzOiBbXSxcbiAgICAgICAgICAgIGNhbkFuYWx5emU6ICEhcm91dGVEYXRhLmdldChcImNhbkFuYWx5emVcIilcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByb3V0ZXJDYW5SZXVzZShuZXh0LCBwcmV2KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByb3V0ZXJPbkFjdGl2YXRlKG5leHQsIHByZXYpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uVmlld0NvbnRlbnRMb2FkZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25WaWV3Q29udGVudExvYWRlZCgpIHtcbiAgICAgICAgdGhpcy5mZXRjaEFuZERpc3BsYXkoXG4gICAgICAgICAgICB0aGlzLmZhY2V0LFxuICAgICAgICAgICAgdGhpcy5yb3V0ZVBhcmFtcy5nZXQoXCJpZFwiKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZldGNoQW5kRGlzcGxheShmYWNldCwgaWQpIHtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuc3Rhc2guZ2V0SXRlbUJ5SWQoZmFjZXQuZnJhbWUsIGlkKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBIVFRQX0NPREUgPSBcImh0dHBDb2RlXCI7XG4gICAgICAgICAgICBpZiAocmVzdWx0W0hUVFBfQ09ERV0gPT09IDQwNCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnNob3dFcnJvcihyZXN1bHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlSZXN1bHQoZmFjZXQsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBwcm9taXNlLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3JTZXJ2aWNlLnNob3dFcnJvcihlcnJvcikpO1xuICAgIH1cblxuICAgIGRvQ2FuY2VsKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbYC4uLyR7dGhpcy5wcmV2aW91c1BhZ2V9YF0pO1xuICAgIH1cblxuICAgIGRvQW5hbHl6ZSgpIHtcbiAgICAgICAgbGV0IGlkID0gdGhpcy5yb3V0ZVBhcmFtcy5nZXQoXCJpZFwiKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiLi4vU2V0dGluZ1wiLCB7IHNob3J0TmFtZTogdGhpcy5kYXRhc2V0U2hvcnRuYW1lLCBpZDogaWQgfV0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzcGxheVJlc3VsdChmYWNldDogRmFjZXQsIHJlc3VsdCkge1xuICAgICAgICBjb25zdCBOQU1FID0gXCJuYW1lXCI7XG4gICAgICAgIGNvbnN0IEFEVkFOQ0VEX0ZJRUxEUyA9IFtcbiAgICAgICAgICAgIFwidGFnc1wiLFxuICAgICAgICAgICAgXCJ1dWlkXCIsXG4gICAgICAgICAgICBcInBhdGhcIixcbiAgICAgICAgICAgIFwicHJvamVjdElkXCIsXG4gICAgICAgICAgICBcInVzZXJJZFwiLFxuICAgICAgICAgICAgXCJpZFwiLFxuICAgICAgICAgICAgXCJtZDVcIlxuICAgICAgICBdO1xuICAgICAgICB0aGlzLnZtLnRpdGxlID0gcmVzdWx0W05BTUVdO1xuICAgICAgICB0aGlzLnZtLmxhYmVsZWRWYWx1ZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgcHJvcE5hbWUgb2YgZmFjZXQuZGlzcGxheVByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHJlc3VsdFtwcm9wTmFtZV07XG4gICAgICAgICAgICBsZXQgc2NoZW1hRm9yUHJvcGVydHkgPSBmYWNldC5mcmFtZS5wcm9wZXJ0aWVzW3Byb3BOYW1lXTtcbiAgICAgICAgICAgIGxldCBsYWJlbGVkVmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IHNjaGVtYUZvclByb3BlcnR5LnRpdGxlLFxuICAgICAgICAgICAgICAgIHNjaGVtYTogc2NoZW1hRm9yUHJvcGVydHksXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKEFEVkFOQ0VEX0ZJRUxEUy5pbmRleE9mKHByb3BOYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZtLmxhYmVsZWRWYWx1ZXMucHVzaChsYWJlbGVkVmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZtLmFkdmFuY2VkTGFiZWxlZFZhbHVlcy5wdXNoKGxhYmVsZWRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==