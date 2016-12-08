/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:dbarreto@pacificbiosciences.com">David Barreto</a>
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var imprint_1 = require("../../directives/imprint");
var io_1 = require("athenaeum/data/api/io");
var catalog_1 = require("athenaeum/components/catalog/catalog");
var progress_circular_1 = require("athenaeum/components/progress-circular/progress-circular");
var dataset_service_1 = require("../shared/dataset-service");
var select_datasets_base_1 = require("../shared/select-datasets-base");
var SelectDatasets = (function (_super) {
    __extends(SelectDatasets, _super);
    function SelectDatasets(io, router, routeData, cdr, datasetService) {
        _super.call(this, io, router, routeData, cdr);
        this.datasetService = datasetService;
    }
    SelectDatasets.prototype.ngOnInit = function () {
        this.configureDatasetTypeSelector();
        this.initializeCatalogArgs();
    };
    SelectDatasets.prototype.ngAfterViewInit = function () {
        this.onDatasetTypeChange();
        this.cdr.detectChanges();
    };
    /**
     * Event handler for the cancel button.
     * Navigates back to Data Management home screen.
     */
    SelectDatasets.prototype.doCancel = function () {
        this.router.navigate(["../Index"]);
    };
    /**
     * Enables the button "Create New Dataset" if the right
     * catalog has items, disables it otherwise.
     */
    SelectDatasets.prototype.canNext = function () {
        return this.hasItems(this.rightCatalog);
    };
    SelectDatasets.prototype.doNext = function () {
        var datasets = this.rightCatalog.getContentItems();
        this.datasetService.setSelectedDatasets(datasets);
        this.datasetService.setFacet(this.facet);
        this.datasetService.setDatasetType(this.datasetType);
        this.router.navigate(["../MergeDatasets"]);
    };
    /**
     * Booelan that defines if data can be moved to the right catalog
     */
    SelectDatasets.prototype.canMoveRight = function () {
        return catalog_1.Catalog.hasSelectedRows(this.leftCatalogArgs);
    };
    /**
     * Booelan that defines if data can be moved back to the left catalog
     */
    SelectDatasets.prototype.canMoveLeft = function () {
        return catalog_1.Catalog.hasSelectedRows(this.rightCatalogArgs);
    };
    __decorate([
        core_1.ViewChild("leftCatalog"), 
        __metadata('design:type', catalog_1.Catalog)
    ], SelectDatasets.prototype, "leftCatalog", void 0);
    __decorate([
        core_1.ViewChild("rightCatalog"), 
        __metadata('design:type', catalog_1.Catalog)
    ], SelectDatasets.prototype, "rightCatalog", void 0);
    __decorate([
        core_1.ViewChildren(catalog_1.Catalog), 
        __metadata('design:type', core_1.QueryList)
    ], SelectDatasets.prototype, "catalogs", void 0);
    SelectDatasets = __decorate([
        core_1.Component({
            selector: "select-datasets",
            moduleId: module.id,
            directives: [imprint_1.Imprint, catalog_1.Catalog, progress_circular_1.ProgressCircular],
            host: {
                class: "select-datasets"
            },
            templateUrl: "select-datasets.html",
            styleUrls: [
                "../../css/select-datasets.css"
            ],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        router_1.CanActivate(status_1.canConnect), 
        __metadata('design:paramtypes', [io_1.IO, router_1.Router, router_1.RouteData, core_1.ChangeDetectorRef, dataset_service_1.DatasetService])
    ], SelectDatasets);
    return SelectDatasets;
}(select_datasets_base_1.SelectDatasetsBase));
exports.SelectDatasets = SelectDatasets;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9kYXRhLW1hbmFnZW1lbnQvc2VsZWN0LWRhdGFzZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7Ozs7Ozs7Ozs7Ozs7OztBQUVILHFCQUVPLGVBQWUsQ0FBQyxDQUFBO0FBRXZCLHVCQUE2QyxpQkFBaUIsQ0FBQyxDQUFBO0FBRS9ELHVCQUF5Qix5QkFBeUIsQ0FBQyxDQUFBO0FBQ25ELHdCQUFzQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ2pELG1CQUFpQix1QkFBdUIsQ0FBQyxDQUFBO0FBRXpDLHdCQUFzQixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzdELGtDQUErQiwwREFBMEQsQ0FBQyxDQUFBO0FBRTFGLGdDQUE2QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ3pELHFDQUFpQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBZ0JsRTtJQUFvQyxrQ0FBa0I7SUFNbEQsd0JBQ0ksRUFBTSxFQUNOLE1BQWMsRUFDZCxTQUFvQixFQUNwQixHQUFzQixFQUNkLGNBQThCO1FBRXRDLGtCQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRjFCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUcxQyxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCx3Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksaUNBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksZ0NBQU8sR0FBZDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sK0JBQU0sR0FBYjtRQUNJLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7T0FFRztJQUNJLHFDQUFZLEdBQW5CO1FBQ0ksTUFBTSxDQUFDLGlCQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxvQ0FBVyxHQUFsQjtRQUNJLE1BQU0sQ0FBQyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBNUREO1FBQUMsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7O3VEQUFBO0lBQ3pCO1FBQUMsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7O3dEQUFBO0lBQzFCO1FBQUMsbUJBQVksQ0FBQyxpQkFBTyxDQUFDOztvREFBQTtJQWxCMUI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsVUFBVSxFQUFFLENBQUMsaUJBQU8sRUFBRSxpQkFBTyxFQUFFLG9DQUFnQixDQUFDO1lBQ2hELElBQUksRUFBRTtnQkFDRixLQUFLLEVBQUUsaUJBQWlCO2FBQzNCO1lBQ0QsV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxTQUFTLEVBQUU7Z0JBQ1AsK0JBQStCO2FBQ2xDO1lBQ0QsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7U0FDeEMsQ0FBQztRQUNELG9CQUFXLENBQUMsbUJBQVUsQ0FBQzs7c0JBQUE7SUFnRXhCLHFCQUFDO0FBQUQsQ0EvREEsQUErREMsQ0EvRG1DLHlDQUFrQixHQStEckQ7QUEvRFksc0JBQWMsaUJBK0QxQixDQUFBIiwiZmlsZSI6ImFwcC9zaWxvcy9kYXRhLW1hbmFnZW1lbnQvc2VsZWN0LWRhdGFzZXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhLCBJbmMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86ZGJhcnJldG9AcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbVwiPkRhdmlkIEJhcnJldG88L2E+XG4gKi9cblxuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVuLCBRdWVyeUxpc3QsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuXG5pbXBvcnQge1JvdXRlciwgQ2FuQWN0aXZhdGUsIFJvdXRlRGF0YX0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuXG5pbXBvcnQge2NhbkNvbm5lY3R9IGZyb20gXCIuLi8uLi9uYXZpZ2F0aW9uL3N0YXR1c1wiO1xuaW1wb3J0IHtJbXByaW50fSBmcm9tIFwiLi4vLi4vZGlyZWN0aXZlcy9pbXByaW50XCI7XG5pbXBvcnQge0lPfSBmcm9tIFwiYXRoZW5hZXVtL2RhdGEvYXBpL2lvXCI7XG5cbmltcG9ydCB7Q2F0YWxvZ30gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL2NhdGFsb2cvY2F0YWxvZ1wiO1xuaW1wb3J0IHtQcm9ncmVzc0NpcmN1bGFyfSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvcHJvZ3Jlc3MtY2lyY3VsYXIvcHJvZ3Jlc3MtY2lyY3VsYXJcIjtcblxuaW1wb3J0IHtEYXRhc2V0U2VydmljZX0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhc2V0LXNlcnZpY2VcIjtcbmltcG9ydCB7U2VsZWN0RGF0YXNldHNCYXNlfSBmcm9tIFwiLi4vc2hhcmVkL3NlbGVjdC1kYXRhc2V0cy1iYXNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNlbGVjdC1kYXRhc2V0c1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgZGlyZWN0aXZlczogW0ltcHJpbnQsIENhdGFsb2csIFByb2dyZXNzQ2lyY3VsYXJdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6IFwic2VsZWN0LWRhdGFzZXRzXCJcbiAgICB9LFxuICAgIHRlbXBsYXRlVXJsOiBcInNlbGVjdC1kYXRhc2V0cy5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgIFwiLi4vLi4vY3NzL3NlbGVjdC1kYXRhc2V0cy5jc3NcIlxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbkBDYW5BY3RpdmF0ZShjYW5Db25uZWN0KVxuZXhwb3J0IGNsYXNzIFNlbGVjdERhdGFzZXRzIGV4dGVuZHMgU2VsZWN0RGF0YXNldHNCYXNlIHtcblxuICAgIEBWaWV3Q2hpbGQoXCJsZWZ0Q2F0YWxvZ1wiKSBwcm90ZWN0ZWQgbGVmdENhdGFsb2c6IENhdGFsb2c7XG4gICAgQFZpZXdDaGlsZChcInJpZ2h0Q2F0YWxvZ1wiKSBwcm90ZWN0ZWQgcmlnaHRDYXRhbG9nOiBDYXRhbG9nO1xuICAgIEBWaWV3Q2hpbGRyZW4oQ2F0YWxvZykgcHJvdGVjdGVkIGNhdGFsb2dzOiBRdWVyeUxpc3Q8Q2F0YWxvZz47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaW86IElPLFxuICAgICAgICByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcm91dGVEYXRhOiBSb3V0ZURhdGEsXG4gICAgICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgZGF0YXNldFNlcnZpY2U6IERhdGFzZXRTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGlvLCByb3V0ZXIsIHJvdXRlRGF0YSwgY2RyKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmVEYXRhc2V0VHlwZVNlbGVjdG9yKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNhdGFsb2dBcmdzKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLm9uRGF0YXNldFR5cGVDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZXIgZm9yIHRoZSBjYW5jZWwgYnV0dG9uLlxuICAgICAqIE5hdmlnYXRlcyBiYWNrIHRvIERhdGEgTWFuYWdlbWVudCBob21lIHNjcmVlbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZG9DYW5jZWwoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi4uL0luZGV4XCJdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbmFibGVzIHRoZSBidXR0b24gXCJDcmVhdGUgTmV3IERhdGFzZXRcIiBpZiB0aGUgcmlnaHRcbiAgICAgKiBjYXRhbG9nIGhhcyBpdGVtcywgZGlzYWJsZXMgaXQgb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIHB1YmxpYyBjYW5OZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNJdGVtcyh0aGlzLnJpZ2h0Q2F0YWxvZyk7XG4gICAgfVxuXG4gICAgcHVibGljIGRvTmV4dCgpIHtcbiAgICAgICAgbGV0IGRhdGFzZXRzID0gdGhpcy5yaWdodENhdGFsb2cuZ2V0Q29udGVudEl0ZW1zKCk7XG4gICAgICAgIHRoaXMuZGF0YXNldFNlcnZpY2Uuc2V0U2VsZWN0ZWREYXRhc2V0cyhkYXRhc2V0cyk7XG4gICAgICAgIHRoaXMuZGF0YXNldFNlcnZpY2Uuc2V0RmFjZXQodGhpcy5mYWNldCk7XG4gICAgICAgIHRoaXMuZGF0YXNldFNlcnZpY2Uuc2V0RGF0YXNldFR5cGUodGhpcy5kYXRhc2V0VHlwZSk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi4uL01lcmdlRGF0YXNldHNcIl0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJvb2VsYW4gdGhhdCBkZWZpbmVzIGlmIGRhdGEgY2FuIGJlIG1vdmVkIHRvIHRoZSByaWdodCBjYXRhbG9nXG4gICAgICovXG4gICAgcHVibGljIGNhbk1vdmVSaWdodCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIENhdGFsb2cuaGFzU2VsZWN0ZWRSb3dzKHRoaXMubGVmdENhdGFsb2dBcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCb29lbGFuIHRoYXQgZGVmaW5lcyBpZiBkYXRhIGNhbiBiZSBtb3ZlZCBiYWNrIHRvIHRoZSBsZWZ0IGNhdGFsb2dcbiAgICAgKi9cbiAgICBwdWJsaWMgY2FuTW92ZUxlZnQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBDYXRhbG9nLmhhc1NlbGVjdGVkUm93cyh0aGlzLnJpZ2h0Q2F0YWxvZ0FyZ3MpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==