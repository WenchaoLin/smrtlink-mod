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
var modal_1 = require("athenaeum/components/modal/modal");
var status_1 = require("../../navigation/status");
var catalog_1 = require("athenaeum/components/catalog/catalog");
var imprint_1 = require("../../directives/imprint");
var run_qc_service_1 = require("../../data/services/run-qc-service");
var silo_service_1 = require("../silo-service");
var Index = (function () {
    function Index(cdr, router, routeData, runQcService, siloService) {
        this.catalogArgs = null;
        siloService.setState({
            title: routeData.get("title"),
            buttons: null,
            status: null
        });
        this.router = router;
        this.facet = routeData.get("facet");
        this.routeData = routeData;
        this.cdr = cdr;
        this.runQcService = runQcService;
    }
    Index.prototype.routerCanReuse = function (next, prev) {
        return false;
    };
    Index.prototype.ngOnInit = function () {
        this.initializeCatalogArgs();
    };
    Index.prototype.ngAfterViewInit = function () {
        this.configureCatalog();
        this.loadContentIntoCatalog();
        this.cdr.detectChanges();
    };
    Index.prototype.onLinkCellClick = function (event) {
        this.router.navigate(["RunView", { id: event.itemId }]);
    };
    Index.prototype.loadContentIntoCatalog = function () {
        var promise = this.runQcService.getRuns();
        this.catalog.setContentItems(promise, null, this.facet.initialSort);
    };
    Index.prototype.initializeCatalogArgs = function () {
        this.catalogArgs = {
            title: null,
            storageId: this.routeData.get("pageId"),
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
                // groupKeys: ["status"],
                groupUseEntireRow: true,
                groupDefaultExpanded: true,
                enableColResize: true,
                dontUseScrolls: false,
                toolPanelSuppressPivot: true,
                toolPanelSuppressValues: true,
                // note: the 40 below needs to match the 40px in catalog.css
                // TODO(bskinner)(2015-12-11): refactor to make code more DRY
                rowHeight: 40,
                headerHeight: 40
            }
        };
    };
    Index.prototype.configureCatalog = function () {
        var RUN_STATE_FILTERBAR_ARGS = {
            // we should be getting this info from the Frame (schema)
            property: "status",
            items: [
                { label: "Complete", checked: true, field: "COMPLETE" },
                { label: "Running", checked: true, field: "RUNNING" },
                { label: "Terminated", checked: true, field: "TERMINATED" },
                { label: "Aborted", checked: true, field: "ABORTED" },
                { label: "Paused", checked: true, field: "PAUSED" },
                { label: "Ready", checked: false, field: "READY" }
            ]
        };
        this.catalogArgs.filterBarArgs = RUN_STATE_FILTERBAR_ARGS;
        this.catalog.setSchemaProperties(this.facet.frame.properties, this.facet.defaultColumns, this.facet.additionalColumns);
    };
    __decorate([
        core_1.ViewChild(catalog_1.Catalog), 
        __metadata('design:type', catalog_1.Catalog)
    ], Index.prototype, "catalog", void 0);
    Index = __decorate([
        core_1.Component({
            selector: "run-qc-index",
            moduleId: module.id,
            templateUrl: "index.html",
            styleUrls: [
                "index.css",
                "../../css/simple-table.css"
            ],
            directives: [catalog_1.Catalog, imprint_1.Imprint, common_1.CORE_DIRECTIVES, router_1.RouterLink, modal_1.MODAL_DIRECTIVES],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        router_1.CanActivate(status_1.canConnect), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, router_1.Router, router_1.RouteData, run_qc_service_1.RunQcService, silo_service_1.SiloService])
    ], Index);
    return Index;
}());
exports.Index = Index;

//# sourceMappingURL=data:application/json;base64,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QUFTLENBQUMsaUJBQU8sQ0FBQzs7MENBQUE7SUF0QnZCO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsWUFBWTtZQUN6QixTQUFTLEVBQUU7Z0JBQ1AsV0FBVztnQkFDWCw0QkFBNEI7YUFDL0I7WUFDRCxVQUFVLEVBQUUsQ0FBQyxpQkFBTyxFQUFFLGlCQUFPLEVBQUUsd0JBQWUsRUFBRSxtQkFBVSxFQUFFLHdCQUFnQixDQUFFO1lBQzlFLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3hDLENBQUM7UUFDRCxvQkFBVyxDQUFDLG1CQUFVLENBQUM7O2FBQUE7SUE2R3hCLFlBQUM7QUFBRCxDQTVHQSxBQTRHQyxJQUFBO0FBNUdZLGFBQUssUUE0R2pCLENBQUEiLCJmaWxlIjoiYXBwL3NpbG9zL3J1bi1xYy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcbmltcG9ydCB7XG4gICAgUm91dGVyTGluaywgUm91dGVyLCBSb3V0ZURhdGEsIENhbkFjdGl2YXRlLCBDYW5SZXVzZVxufSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5cbmltcG9ydCB7TU9EQUxfRElSRUNUSVZFUywgTW9kYWxEaWFsb2d9IGZyb20gXCJhdGhlbmFldW0vY29tcG9uZW50cy9tb2RhbC9tb2RhbFwiO1xuXG5pbXBvcnQge2NhbkNvbm5lY3R9IGZyb20gXCIuLi8uLi9uYXZpZ2F0aW9uL3N0YXR1c1wiO1xuXG5pbXBvcnQge0NhdGFsb2csIElMaW5rQ2VsbENsaWNrRXZlbnR9IGZyb20gXCJhdGhlbmFldW0vY29tcG9uZW50cy9jYXRhbG9nL2NhdGFsb2dcIjtcbmltcG9ydCB7SW1wcmludH0gZnJvbSBcIi4uLy4uL2RpcmVjdGl2ZXMvaW1wcmludFwiO1xuXG5pbXBvcnQge0lGYWNldH0gZnJvbSBcIi4uLy4uL2RhdGEvZmFjZXRzL2ZhY2V0XCI7XG5cbmltcG9ydCB7UnVuUWNTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vZGF0YS9zZXJ2aWNlcy9ydW4tcWMtc2VydmljZVwiO1xuXG5pbXBvcnQge1NpbG9TZXJ2aWNlfSBmcm9tIFwiLi4vc2lsby1zZXJ2aWNlXCI7XG5pbXBvcnQge1NpbG9TdGF0ZX0gZnJvbSBcIi4uL3J1bi1xY1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJydW4tcWMtaW5kZXhcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcImluZGV4Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgXCJpbmRleC5jc3NcIixcbiAgICAgICAgXCIuLi8uLi9jc3Mvc2ltcGxlLXRhYmxlLmNzc1wiXG4gICAgXSxcbiAgICBkaXJlY3RpdmVzOiBbQ2F0YWxvZywgSW1wcmludCwgQ09SRV9ESVJFQ1RJVkVTLCBSb3V0ZXJMaW5rLCBNT0RBTF9ESVJFQ1RJVkVTIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbkBDYW5BY3RpdmF0ZShjYW5Db25uZWN0KVxuZXhwb3J0IGNsYXNzIEluZGV4IGltcGxlbWVudHMgQ2FuUmV1c2UsIEFmdGVyVmlld0luaXQge1xuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XG4gICAgcHJpdmF0ZSBmYWNldDogSUZhY2V0O1xuICAgIHByaXZhdGUgcm91dGVEYXRhOiBSb3V0ZURhdGE7XG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmO1xuXG4gICAgcHJpdmF0ZSBydW5RY1NlcnZpY2U6IFJ1blFjU2VydmljZTtcblxuICAgIHByaXZhdGUgY2F0YWxvZ0FyZ3MgPSBudWxsO1xuXG4gICAgQFZpZXdDaGlsZChDYXRhbG9nKVxuICAgIHByaXZhdGUgY2F0YWxvZzogQ2F0YWxvZztcblxuICAgIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcm91dGVEYXRhOiBSb3V0ZURhdGEsXG4gICAgICAgICAgICAgICAgcnVuUWNTZXJ2aWNlOiBSdW5RY1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgc2lsb1NlcnZpY2U6IFNpbG9TZXJ2aWNlPFNpbG9TdGF0ZT4pIHtcbiAgICAgICAgc2lsb1NlcnZpY2Uuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdGl0bGU6IHJvdXRlRGF0YS5nZXQoXCJ0aXRsZVwiKSxcbiAgICAgICAgICAgIGJ1dHRvbnM6IG51bGwsXG4gICAgICAgICAgICBzdGF0dXM6IG51bGxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgICAgIHRoaXMuZmFjZXQgPSByb3V0ZURhdGEuZ2V0KFwiZmFjZXRcIik7XG4gICAgICAgIHRoaXMucm91dGVEYXRhID0gcm91dGVEYXRhO1xuICAgICAgICB0aGlzLmNkciA9IGNkcjtcblxuICAgICAgICB0aGlzLnJ1blFjU2VydmljZSA9IHJ1blFjU2VydmljZTtcblxuICAgIH1cblxuICAgIHJvdXRlckNhblJldXNlKG5leHQsIHByZXYpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVDYXRhbG9nQXJncygpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmVDYXRhbG9nKCk7XG4gICAgICAgIHRoaXMubG9hZENvbnRlbnRJbnRvQ2F0YWxvZygpO1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uTGlua0NlbGxDbGljayhldmVudDogSUxpbmtDZWxsQ2xpY2tFdmVudCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJSdW5WaWV3XCIsIHsgaWQ6IGV2ZW50Lml0ZW1JZCB9XSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkQ29udGVudEludG9DYXRhbG9nKCkge1xuICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMucnVuUWNTZXJ2aWNlLmdldFJ1bnMoKTtcbiAgICAgICAgdGhpcy5jYXRhbG9nLnNldENvbnRlbnRJdGVtcyhwcm9taXNlLCBudWxsLCB0aGlzLmZhY2V0LmluaXRpYWxTb3J0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRpYWxpemVDYXRhbG9nQXJncygpIHtcbiAgICAgICAgdGhpcy5jYXRhbG9nQXJncyA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBudWxsLFxuICAgICAgICAgICAgc3RvcmFnZUlkOiB0aGlzLnJvdXRlRGF0YS5nZXQoXCJwYWdlSWRcIiksXG4gICAgICAgICAgICBzaG93OiB7XG4gICAgICAgICAgICAgICAgc2VhcmNoQm94OiB0cnVlLFxuICAgICAgICAgICAgICAgIGN1c3RvbWl6ZUJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzcGlubmVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZ0dyaWRPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgY29sdW1uRGVmczogW10sXG4gICAgICAgICAgICAgICAgcm93RGF0YTogW10sXG4gICAgICAgICAgICAgICAgZW5hYmxlU29ydGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbmFibGVGaWx0ZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8gZ3JvdXBLZXlzOiBbXCJzdGF0dXNcIl0sXG4gICAgICAgICAgICAgICAgZ3JvdXBVc2VFbnRpcmVSb3c6IHRydWUsXG4gICAgICAgICAgICAgICAgZ3JvdXBEZWZhdWx0RXhwYW5kZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZW5hYmxlQ29sUmVzaXplOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRvbnRVc2VTY3JvbGxzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0b29sUGFuZWxTdXBwcmVzc1Bpdm90OiB0cnVlLFxuICAgICAgICAgICAgICAgIHRvb2xQYW5lbFN1cHByZXNzVmFsdWVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIC8vIG5vdGU6IHRoZSA0MCBiZWxvdyBuZWVkcyB0byBtYXRjaCB0aGUgNDBweCBpbiBjYXRhbG9nLmNzc1xuICAgICAgICAgICAgICAgIC8vIFRPRE8oYnNraW5uZXIpKDIwMTUtMTItMTEpOiByZWZhY3RvciB0byBtYWtlIGNvZGUgbW9yZSBEUllcbiAgICAgICAgICAgICAgICByb3dIZWlnaHQ6IDQwLFxuICAgICAgICAgICAgICAgIGhlYWRlckhlaWdodDogNDBcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgY29uZmlndXJlQ2F0YWxvZygpIHtcbiAgICAgICAgY29uc3QgUlVOX1NUQVRFX0ZJTFRFUkJBUl9BUkdTID0ge1xuICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIGJlIGdldHRpbmcgdGhpcyBpbmZvIGZyb20gdGhlIEZyYW1lIChzY2hlbWEpXG4gICAgICAgICAgICBwcm9wZXJ0eTogXCJzdGF0dXNcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAge2xhYmVsOiBcIkNvbXBsZXRlXCIsIGNoZWNrZWQ6IHRydWUsIGZpZWxkOiBcIkNPTVBMRVRFXCJ9LFxuICAgICAgICAgICAgICAgIHtsYWJlbDogXCJSdW5uaW5nXCIsIGNoZWNrZWQ6IHRydWUsIGZpZWxkOiBcIlJVTk5JTkdcIn0sXG4gICAgICAgICAgICAgICAge2xhYmVsOiBcIlRlcm1pbmF0ZWRcIiwgY2hlY2tlZDogdHJ1ZSwgZmllbGQ6IFwiVEVSTUlOQVRFRFwifSxcbiAgICAgICAgICAgICAgICB7bGFiZWw6IFwiQWJvcnRlZFwiLCBjaGVja2VkOiB0cnVlLCBmaWVsZDogXCJBQk9SVEVEXCJ9LFxuICAgICAgICAgICAgICAgIHtsYWJlbDogXCJQYXVzZWRcIiwgY2hlY2tlZDogdHJ1ZSwgZmllbGQ6IFwiUEFVU0VEXCJ9LFxuICAgICAgICAgICAgICAgIHtsYWJlbDogXCJSZWFkeVwiLCBjaGVja2VkOiBmYWxzZSwgZmllbGQ6IFwiUkVBRFlcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmNhdGFsb2dBcmdzLmZpbHRlckJhckFyZ3MgPSBSVU5fU1RBVEVfRklMVEVSQkFSX0FSR1M7XG5cbiAgICAgICAgdGhpcy5jYXRhbG9nLnNldFNjaGVtYVByb3BlcnRpZXMoXG4gICAgICAgICAgICB0aGlzLmZhY2V0LmZyYW1lLnByb3BlcnRpZXMsXG4gICAgICAgICAgICB0aGlzLmZhY2V0LmRlZmF1bHRDb2x1bW5zLFxuICAgICAgICAgICAgdGhpcy5mYWNldC5hZGRpdGlvbmFsQ29sdW1ucyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9