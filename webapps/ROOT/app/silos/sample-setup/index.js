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
var status_1 = require("../../navigation/status");
var sample_setup_1 = require("../../data/facets/sample-setup");
var catalog_1 = require("athenaeum/components/catalog/catalog");
var imprint_1 = require("../../directives/imprint");
var text_1 = require("../../strings/en-us/text");
var binding_calculation_service_1 = require("./binding-calculation-service");
var Index = (function () {
    function Index(routeData, router) {
        this.routeData = routeData;
        this.router = router;
        this.TEXT = text_1.TEXT;
        this.catalogArgs = null;
    }
    Index.prototype.ngOnInit = function () {
        this.initializeCatalogArgs();
    };
    Index.prototype.ngAfterViewInit = function () {
        this.facet = sample_setup_1.SAMPLE_SETUP_FACET;
        this.configureCatalog();
        this.catalog.setContentItems(binding_calculation_service_1.allBindingCalculations);
    };
    Index.prototype.onLinkCellClick = function (event) {
        this.router.navigate(["../NewBindingCalculation", { id: event.itemId }]);
    };
    Index.prototype.initializeCatalogArgs = function () {
        this.catalogArgs = {
            storageId: this.routeData.get("pageId"),
            title: null,
            show: {
                searchBox: true,
                customizeButton: true,
                spinner: false,
                error: false
            },
            agGridOptions: {
                columnDefs: [],
                rowData: [],
                enableSorting: true,
                enableFilter: true,
                groupUseEntireRow: true,
                groupDefaultExpanded: true,
                enableColResize: true,
                dontUseScrolls: false,
                toolPanelSuppressPivot: true,
                toolPanelSuppressValues: true,
                rowHeight: 40,
                headerHeight: 40
            },
            filterBarArgs: null
        };
    };
    Index.prototype.configureCatalog = function () {
        this.catalog.setSchemaProperties(this.facet.frame.properties, this.facet.defaultColumns, this.facet.additionalColumns);
    };
    __decorate([
        core_1.ViewChild("catalog"), 
        __metadata('design:type', catalog_1.Catalog)
    ], Index.prototype, "catalog", void 0);
    Index = __decorate([
        core_1.Component({
            selector: "sample-setup-index",
            moduleId: module.id,
            templateUrl: "index.html",
            styleUrls: [
                "index.css",
                "../../css/simple-table.css"
            ],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [catalog_1.Catalog, imprint_1.Imprint, router_1.RouterLink]
        }),
        router_1.CanActivate(status_1.canConnect), 
        __metadata('design:paramtypes', [router_1.RouteData, router_1.Router])
    ], Index);
    return Index;
}());
exports.Index = Index;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9zYW1wbGUtc2V0dXAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3RCxlQUFlLENBQUMsQ0FBQTtBQUN4RSx1QkFBMkQsaUJBQWlCLENBQUMsQ0FBQTtBQUU3RSx1QkFBMkIseUJBQXlCLENBQUMsQ0FBQTtBQUdyRCw2QkFBaUMsZ0NBQWdDLENBQUMsQ0FBQTtBQUVsRSx3QkFBNkMsc0NBQXNDLENBQUMsQ0FBQTtBQUNwRix3QkFBd0IsMEJBQTBCLENBQUMsQ0FBQTtBQUNuRCxxQkFBcUIsMEJBQTBCLENBQUMsQ0FBQTtBQUloRCw0Q0FBdUMsK0JBQStCLENBQUMsQ0FBQTtBQWlCdkU7SUFTSSxlQUFvQixTQUFvQixFQUFVLE1BQWM7UUFBNUMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFSeEQsU0FBSSxHQUFHLFdBQUksQ0FBQztRQUVaLGdCQUFXLEdBQUcsSUFBSSxDQUFDO0lBTzNCLENBQUM7SUFFRCx3QkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELCtCQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLGlDQUFrQixDQUFDO1FBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLG9EQUFzQixDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVNLCtCQUFlLEdBQXRCLFVBQXVCLEtBQTBCO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU8scUNBQXFCLEdBQTdCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNmLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDdkMsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUU7Z0JBQ0YsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsZUFBZSxFQUFFLElBQUk7Z0JBQ3JCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxLQUFLO2FBQ2Y7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLFlBQVksRUFBRSxJQUFJO2dCQUNsQixpQkFBaUIsRUFBRSxJQUFJO2dCQUN2QixvQkFBb0IsRUFBRSxJQUFJO2dCQUMxQixlQUFlLEVBQUUsSUFBSTtnQkFDckIsY0FBYyxFQUFFLEtBQUs7Z0JBQ3JCLHNCQUFzQixFQUFFLElBQUk7Z0JBQzVCLHVCQUF1QixFQUFFLElBQUk7Z0JBQzdCLFNBQVMsRUFBRSxFQUFFO2dCQUNiLFlBQVksRUFBRSxFQUFFO2FBQ25CO1lBQ0QsYUFBYSxFQUFFLElBQUk7U0FDdEIsQ0FBQztJQUNOLENBQUM7SUFFTyxnQ0FBZ0IsR0FBeEI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUMvQixDQUFDO0lBQ04sQ0FBQztJQXJERDtRQUFDLGdCQUFTLENBQUMsU0FBUyxDQUFDOzswQ0FBQTtJQXRCekI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFFbkIsV0FBVyxFQUFFLFlBQVk7WUFFekIsU0FBUyxFQUFFO2dCQUNQLFdBQVc7Z0JBQ1gsNEJBQTRCO2FBQy9CO1lBRUQsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7WUFDckMsVUFBVSxFQUFFLENBQUMsaUJBQU8sRUFBRSxpQkFBTyxFQUFFLG1CQUFVLENBQUU7U0FDOUMsQ0FBQztRQUNELG9CQUFXLENBQUMsbUJBQVUsQ0FBQzs7YUFBQTtJQThEeEIsWUFBQztBQUFELENBN0RBLEFBNkRDLElBQUE7QUE3RFksYUFBSyxRQTZEakIsQ0FBQSIsImZpbGUiOiJhcHAvc2lsb3Mvc2FtcGxlLXNldHVwL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciwgUm91dGVyTGluaywgUm91dGVEYXRhLCBDYW5BY3RpdmF0ZSB9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcblxuaW1wb3J0IHsgY2FuQ29ubmVjdCB9IGZyb20gXCIuLi8uLi9uYXZpZ2F0aW9uL3N0YXR1c1wiO1xuXG5pbXBvcnQge0lGYWNldH0gZnJvbSBcIi4uLy4uL2RhdGEvZmFjZXRzL2ZhY2V0XCI7XG5pbXBvcnQge1NBTVBMRV9TRVRVUF9GQUNFVH0gZnJvbSBcIi4uLy4uL2RhdGEvZmFjZXRzL3NhbXBsZS1zZXR1cFwiO1xuXG5pbXBvcnQgeyBDYXRhbG9nLCBJTGlua0NlbGxDbGlja0V2ZW50IH0gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL2NhdGFsb2cvY2F0YWxvZ1wiO1xuaW1wb3J0IHsgSW1wcmludCB9IGZyb20gXCIuLi8uLi9kaXJlY3RpdmVzL2ltcHJpbnRcIjtcbmltcG9ydCB7IFRFWFQgfSBmcm9tIFwiLi4vLi4vc3RyaW5ncy9lbi11cy90ZXh0XCI7XG5cbmltcG9ydCB7IEJpbmRpbmdDYWxjdWxhdGlvbk1vZGVsIH0gZnJvbSBcIi4uLy4uL2RhdGEvbW9kZWxzL3NhbXBsZS1zZXR1cC1tb2RlbFwiO1xuXG5pbXBvcnQgeyBhbGxCaW5kaW5nQ2FsY3VsYXRpb25zIH0gZnJvbSBcIi4vYmluZGluZy1jYWxjdWxhdGlvbi1zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNhbXBsZS1zZXR1cC1pbmRleFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cbiAgICB0ZW1wbGF0ZVVybDogXCJpbmRleC5odG1sXCIsXG5cbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgXCJpbmRleC5jc3NcIixcbiAgICAgICAgXCIuLi8uLi9jc3Mvc2ltcGxlLXRhYmxlLmNzc1wiXG4gICAgXSxcblxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgZGlyZWN0aXZlczogW0NhdGFsb2csIEltcHJpbnQsIFJvdXRlckxpbmsgXVxufSlcbkBDYW5BY3RpdmF0ZShjYW5Db25uZWN0KVxuZXhwb3J0IGNsYXNzIEluZGV4IHtcbiAgICBwcml2YXRlIFRFWFQgPSBURVhUO1xuXG4gICAgcHJpdmF0ZSBjYXRhbG9nQXJncyA9IG51bGw7XG5cbiAgICBwcml2YXRlIGZhY2V0OiBJRmFjZXQ7XG5cbiAgICBAVmlld0NoaWxkKFwiY2F0YWxvZ1wiKSBwcml2YXRlIGNhdGFsb2c6IENhdGFsb2c7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlRGF0YTogUm91dGVEYXRhLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNhdGFsb2dBcmdzKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmZhY2V0ID0gU0FNUExFX1NFVFVQX0ZBQ0VUO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyZUNhdGFsb2coKTtcbiAgICAgICAgdGhpcy5jYXRhbG9nLnNldENvbnRlbnRJdGVtcyhhbGxCaW5kaW5nQ2FsY3VsYXRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25MaW5rQ2VsbENsaWNrKGV2ZW50OiBJTGlua0NlbGxDbGlja0V2ZW50KSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi4uL05ld0JpbmRpbmdDYWxjdWxhdGlvblwiLCB7IGlkOiBldmVudC5pdGVtSWQgfV0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUNhdGFsb2dBcmdzKCkge1xuICAgICAgICB0aGlzLmNhdGFsb2dBcmdzID0ge1xuICAgICAgICAgICAgc3RvcmFnZUlkOiB0aGlzLnJvdXRlRGF0YS5nZXQoXCJwYWdlSWRcIiksXG4gICAgICAgICAgICB0aXRsZTogbnVsbCxcbiAgICAgICAgICAgIHNob3c6IHtcbiAgICAgICAgICAgICAgICBzZWFyY2hCb3g6IHRydWUsXG4gICAgICAgICAgICAgICAgY3VzdG9taXplQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNwaW5uZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFnR3JpZE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5EZWZzOiBbXSxcbiAgICAgICAgICAgICAgICByb3dEYXRhOiBbXSxcbiAgICAgICAgICAgICAgICBlbmFibGVTb3J0aW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVuYWJsZUZpbHRlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBncm91cFVzZUVudGlyZVJvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBncm91cERlZmF1bHRFeHBhbmRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbmFibGVDb2xSZXNpemU6IHRydWUsXG4gICAgICAgICAgICAgICAgZG9udFVzZVNjcm9sbHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRvb2xQYW5lbFN1cHByZXNzUGl2b3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgdG9vbFBhbmVsU3VwcHJlc3NWYWx1ZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgcm93SGVpZ2h0OiA0MCxcbiAgICAgICAgICAgICAgICBoZWFkZXJIZWlnaHQ6IDQwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlsdGVyQmFyQXJnczogbnVsbFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgY29uZmlndXJlQ2F0YWxvZygpIHtcbiAgICAgICAgdGhpcy5jYXRhbG9nLnNldFNjaGVtYVByb3BlcnRpZXMoXG4gICAgICAgICAgICB0aGlzLmZhY2V0LmZyYW1lLnByb3BlcnRpZXMsXG4gICAgICAgICAgICB0aGlzLmZhY2V0LmRlZmF1bHRDb2x1bW5zLFxuICAgICAgICAgICAgdGhpcy5mYWNldC5hZGRpdGlvbmFsQ29sdW1uc1xuICAgICAgICApO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==