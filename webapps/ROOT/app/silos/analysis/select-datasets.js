/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
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
var error_service_1 = require("../error/error-service");
var io_1 = require("athenaeum/data/api/io");
var api_1 = require("../../data/io/api");
var stash_1 = require("../../data/io/stash");
var imprint_1 = require("../../directives/imprint");
var frame_1 = require("../../data/frames/frame");
var catalog_1 = require("athenaeum/components/catalog/catalog");
var ferry_1 = require("athenaeum/components/ferry/ferry");
var modal_1 = require("athenaeum/components/modal/modal");
var select_datasets_base_1 = require("../shared/select-datasets-base");
var progress_circular_1 = require("athenaeum/components/progress-circular/progress-circular");
var SelectDatasets = (function (_super) {
    __extends(SelectDatasets, _super);
    function SelectDatasets(io, router, routeData, cdr, stash, errorService) {
        _super.call(this, io, router, routeData, cdr);
        this.stash = stash;
        this.errorService = errorService;
        this.showSpinner = false;
        this.errorMessage = "";
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
     * Enables the button "Next" if the right catalog has items, disables it otherwise.
     */
    SelectDatasets.prototype.canNext = function () {
        return (this.isUnsent() && this.hasItems(this.rightCatalog));
    };
    /**
     * Event handler to initiate the merge of the datasets
     */
    SelectDatasets.prototype.doNext = function () {
        var _this = this;
        var datasets = this.rightCatalog.getContentItems();
        if (datasets.length === 1) {
            var id = datasets[0].id;
            this.gotoSettingsPage(id);
        }
        else {
            this.showSpinner = true;
            var datasetShortName = this.datasetType.shortName;
            var datasetName = frame_1.AUTO_MERGE_PREFIX + " " + datasetShortName + " @ " + Date.now();
            var endpoint = api_1.API.nJobs.and({ $job_type: "merge-datasets" });
            var data = {
                datasetType: this.datasetType.filetype,
                name: datasetName,
                ids: datasets.map(function (dataset) { return dataset.id; })
            };
            var promise = this.stash.postToEndpoint(data, endpoint);
            promise
                .then(function (jsonData) {
                _this.processMergeResponse(jsonData);
            });
            promise.catch(function (reason) {
                _this.showSpinner = false;
                _this.errorMessage = reason;
                _this.showModal();
            });
        }
    };
    /**
     * Booelan that defines if data can be moved to the right catalog
     */
    SelectDatasets.prototype.canMoveRight = function () {
        return (this.isUnsent() &&
            catalog_1.Catalog.hasSelectedRows(this.leftCatalogArgs));
    };
    /**
     * Booelan that defines if data can be moved back to the left catalog
     */
    SelectDatasets.prototype.canMoveLeft = function () {
        return (this.isUnsent() &&
            catalog_1.Catalog.hasSelectedRows(this.rightCatalogArgs));
    };
    /**
     * Event handler for the cancel button.
     * Navigates back to Data Management home screen.
     */
    SelectDatasets.prototype.doCancel = function () {
        this.router.navigate(["../Jobs"]);
    };
    /**
     * Shows the modal window
     */
    SelectDatasets.prototype.showModal = function () {
        this.modal.show();
    };
    /**
     * Hides the modal window
     */
    SelectDatasets.prototype.hideModal = function () {
        this.modal.hide();
    };
    SelectDatasets.prototype.isUnsent = function () {
        return !this.showSpinner;
    };
    SelectDatasets.prototype.getDatastoreForJobId = function (jobId) {
        var _this = this;
        var datasetShortName = this.datasetType.shortName;
        var oneTenthSecond = 100;
        var endpoint = api_1.API.nJobDatastores.and({
            $job_type: "merge-datasets",
            $job_int: jobId
        });
        var promise = this.io.getEndpointAsync(endpoint);
        promise.then(function (result) {
            if (result.length === 0) {
                // TODO(bskinner): we should be repeatedly checking the status
                // of the job itself, and waiting for the job to finish before
                // getting the datastore, rather than checking for the length
                // of the array in the datastore.
                setTimeout(function () { return _this.getDatastoreForJobId(jobId); }, oneTenthSecond);
            }
            else {
                var endpoint_1 = api_1.API.aDatasetByUuid.and({
                    $set_type: datasetShortName,
                    $set_uuid: result[0].uuid
                });
                var promise_1 = _this.io.getEndpointAsync(endpoint_1);
                promise_1.then(function (result) { return _this.gotoSettingsPage(result.id); });
                promise_1.catch(function (error) { return _this.errorService.showError(error); });
            }
        });
        promise.catch(function (error) { return _this.errorService.showError(error); });
    };
    SelectDatasets.prototype.gotoSettingsPage = function (id) {
        this.showSpinner = false;
        var datasetShortName = this.datasetType.shortName;
        this.router.navigate(["../Setting", { shortName: datasetShortName, id: id }]);
    };
    SelectDatasets.prototype.processMergeResponse = function (result) {
        var _this = this;
        var oneTenthSecond = 100;
        var jobId = result.id;
        var jobTypeId = result.jobTypeId;
        setTimeout(function () { return _this.getDatastoreForJobId(jobId); }, oneTenthSecond);
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
    __decorate([
        core_1.ViewChild(modal_1.ModalDialog), 
        __metadata('design:type', modal_1.ModalDialog)
    ], SelectDatasets.prototype, "modal", void 0);
    SelectDatasets = __decorate([
        core_1.Component({
            selector: "select-datasets",
            providers: [error_service_1.ErrorService],
            moduleId: module.id,
            host: {
                class: "select-datasets"
            },
            templateUrl: "select-datasets.html",
            styleUrls: [
                "../../css/select-datasets.css"
            ],
            directives: [ferry_1.Ferry, catalog_1.Catalog, imprint_1.Imprint, modal_1.MODAL_DIRECTIVES, progress_circular_1.ProgressCircular],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        router_1.CanActivate(status_1.canConnect), 
        __metadata('design:paramtypes', [io_1.IO, router_1.Router, router_1.RouteData, core_1.ChangeDetectorRef, stash_1.Stash, error_service_1.ErrorService])
    ], SelectDatasets);
    return SelectDatasets;
}(select_datasets_base_1.SelectDatasetsBase));
exports.SelectDatasets = SelectDatasets;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9hbmFseXNpcy9zZWxlY3QtZGF0YXNldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7Ozs7Ozs7Ozs7Ozs7OztBQUVILHFCQUVPLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLHVCQUF1RCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pFLHVCQUF5Qix5QkFBeUIsQ0FBQyxDQUFBO0FBRW5ELDhCQUEyQix3QkFBd0IsQ0FBQyxDQUFBO0FBRXBELG1CQUFpQix1QkFBdUIsQ0FBQyxDQUFBO0FBR3pDLG9CQUFrQixtQkFBbUIsQ0FBQyxDQUFBO0FBQ3RDLHNCQUFvQixxQkFBcUIsQ0FBQyxDQUFBO0FBRTFDLHdCQUFzQiwwQkFBMEIsQ0FBQyxDQUFBO0FBRWpELHNCQUFnQyx5QkFBeUIsQ0FBQyxDQUFBO0FBRTFELHdCQUFzQixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzdELHNCQUFvQixrQ0FBa0MsQ0FBQyxDQUFBO0FBQ3ZELHNCQUE0QyxrQ0FBa0MsQ0FBQyxDQUFBO0FBRS9FLHFDQUFpQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRWxFLGtDQUVPLDBEQUEwRCxDQUFDLENBQUE7QUFrQmxFO0lBQW9DLGtDQUFrQjtJQVVsRCx3QkFDSSxFQUFNLEVBQ04sTUFBYyxFQUNkLFNBQW9CLEVBQ3BCLEdBQXNCLEVBQ2QsS0FBWSxFQUNaLFlBQTBCO1FBRWxDLGtCQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBSDFCLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWQvQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixpQkFBWSxHQUFXLEVBQUUsQ0FBQztJQWdCakMsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsd0NBQWUs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QUFDLGNBQWMsQ0FBQzs7d0RBQUE7SUFDMUI7UUFBQyxtQkFBWSxDQUFDLGlCQUFPLENBQUM7O29EQUFBO0lBQ3RCO1FBQUMsZ0JBQVMsQ0FBQyxtQkFBVyxDQUFDOztpREFBQTtJQXZCM0I7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1lBQ3pCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixJQUFJLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFLGlCQUFpQjthQUMzQjtZQUNELFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsU0FBUyxFQUFFO2dCQUNQLCtCQUErQjthQUNsQztZQUNELFVBQVUsRUFBRSxDQUFDLGFBQUssRUFBRSxpQkFBTyxFQUFFLGlCQUFPLEVBQUUsd0JBQWdCLEVBQUUsb0NBQWdCLENBQUM7WUFDekUsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7U0FDeEMsQ0FBQztRQUNELG9CQUFXLENBQUMsbUJBQVUsQ0FBQzs7c0JBQUE7SUE4SnhCLHFCQUFDO0FBQUQsQ0E3SkEsQUE2SkMsQ0E3Sm1DLHlDQUFrQixHQTZKckQ7QUE3Slksc0JBQWMsaUJBNkoxQixDQUFBIiwiZmlsZSI6ImFwcC9zaWxvcy9hbmFseXNpcy9zZWxlY3QtZGF0YXNldHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpkYmFycmV0b0BwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+RGF2aWQgQmFycmV0bzwvYT5cbiAqL1xuXG5pbXBvcnQge1xuICAgIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVuLCBRdWVyeUxpc3QsIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge1JvdXRlciwgQ2FuQWN0aXZhdGUsIExvY2F0aW9uLCBSb3V0ZURhdGF9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcbmltcG9ydCB7Y2FuQ29ubmVjdH0gZnJvbSBcIi4uLy4uL25hdmlnYXRpb24vc3RhdHVzXCI7XG5cbmltcG9ydCB7RXJyb3JTZXJ2aWNlfSBmcm9tIFwiLi4vZXJyb3IvZXJyb3Itc2VydmljZVwiO1xuXG5pbXBvcnQge0lPfSBmcm9tIFwiYXRoZW5hZXVtL2RhdGEvYXBpL2lvXCI7XG5pbXBvcnQge0VuZHBvaW50fSBmcm9tIFwiYXRoZW5hZXVtL2RhdGEvYXBpL2VuZHBvaW50XCI7XG5cbmltcG9ydCB7QVBJfSBmcm9tIFwiLi4vLi4vZGF0YS9pby9hcGlcIjtcbmltcG9ydCB7U3Rhc2h9IGZyb20gXCIuLi8uLi9kYXRhL2lvL3N0YXNoXCI7XG5cbmltcG9ydCB7SW1wcmludH0gZnJvbSBcIi4uLy4uL2RpcmVjdGl2ZXMvaW1wcmludFwiO1xuXG5pbXBvcnQge0FVVE9fTUVSR0VfUFJFRklYfSBmcm9tIFwiLi4vLi4vZGF0YS9mcmFtZXMvZnJhbWVcIjtcblxuaW1wb3J0IHtDYXRhbG9nfSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvY2F0YWxvZy9jYXRhbG9nXCI7XG5pbXBvcnQge0ZlcnJ5fSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvZmVycnkvZmVycnlcIjtcbmltcG9ydCB7TU9EQUxfRElSRUNUSVZFUywgTW9kYWxEaWFsb2d9IGZyb20gXCJhdGhlbmFldW0vY29tcG9uZW50cy9tb2RhbC9tb2RhbFwiO1xuXG5pbXBvcnQge1NlbGVjdERhdGFzZXRzQmFzZX0gZnJvbSBcIi4uL3NoYXJlZC9zZWxlY3QtZGF0YXNldHMtYmFzZVwiO1xuXG5pbXBvcnQge1xuICAgIFByb2dyZXNzQ2lyY3VsYXJcbn0gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL3Byb2dyZXNzLWNpcmN1bGFyL3Byb2dyZXNzLWNpcmN1bGFyXCI7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic2VsZWN0LWRhdGFzZXRzXCIsXG4gICAgcHJvdmlkZXJzOiBbRXJyb3JTZXJ2aWNlXSxcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6IFwic2VsZWN0LWRhdGFzZXRzXCJcbiAgICB9LFxuICAgIHRlbXBsYXRlVXJsOiBcInNlbGVjdC1kYXRhc2V0cy5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgIFwiLi4vLi4vY3NzL3NlbGVjdC1kYXRhc2V0cy5jc3NcIlxuICAgIF0sXG4gICAgZGlyZWN0aXZlczogW0ZlcnJ5LCBDYXRhbG9nLCBJbXByaW50LCBNT0RBTF9ESVJFQ1RJVkVTLCBQcm9ncmVzc0NpcmN1bGFyXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuQENhbkFjdGl2YXRlKGNhbkNvbm5lY3QpXG5leHBvcnQgY2xhc3MgU2VsZWN0RGF0YXNldHMgZXh0ZW5kcyBTZWxlY3REYXRhc2V0c0Jhc2Uge1xuXG4gICAgcHVibGljIHNob3dTcGlubmVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nID0gXCJcIjtcblxuICAgIEBWaWV3Q2hpbGQoXCJsZWZ0Q2F0YWxvZ1wiKSBwcm90ZWN0ZWQgbGVmdENhdGFsb2c6IENhdGFsb2c7XG4gICAgQFZpZXdDaGlsZChcInJpZ2h0Q2F0YWxvZ1wiKSBwcm90ZWN0ZWQgcmlnaHRDYXRhbG9nOiBDYXRhbG9nO1xuICAgIEBWaWV3Q2hpbGRyZW4oQ2F0YWxvZykgcHJvdGVjdGVkIGNhdGFsb2dzOiBRdWVyeUxpc3Q8Q2F0YWxvZz47XG4gICAgQFZpZXdDaGlsZChNb2RhbERpYWxvZykgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2c7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaW86IElPLFxuICAgICAgICByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcm91dGVEYXRhOiBSb3V0ZURhdGEsXG4gICAgICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgc3Rhc2g6IFN0YXNoLFxuICAgICAgICBwcml2YXRlIGVycm9yU2VydmljZTogRXJyb3JTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGlvLCByb3V0ZXIsIHJvdXRlRGF0YSwgY2RyKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmVEYXRhc2V0VHlwZVNlbGVjdG9yKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNhdGFsb2dBcmdzKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLm9uRGF0YXNldFR5cGVDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgdGhlIGJ1dHRvbiBcIk5leHRcIiBpZiB0aGUgcmlnaHQgY2F0YWxvZyBoYXMgaXRlbXMsIGRpc2FibGVzIGl0IG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgY2FuTmV4dCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlzVW5zZW50KCkgJiYgdGhpcy5oYXNJdGVtcyh0aGlzLnJpZ2h0Q2F0YWxvZykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZXIgdG8gaW5pdGlhdGUgdGhlIG1lcmdlIG9mIHRoZSBkYXRhc2V0c1xuICAgICAqL1xuICAgIHB1YmxpYyBkb05leHQoKSB7XG4gICAgICAgIGxldCBkYXRhc2V0czogYW55W10gPSB0aGlzLnJpZ2h0Q2F0YWxvZy5nZXRDb250ZW50SXRlbXMoKTtcblxuICAgICAgICBpZiAoZGF0YXNldHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBsZXQgaWQgPSBkYXRhc2V0c1swXS5pZDtcbiAgICAgICAgICAgIHRoaXMuZ290b1NldHRpbmdzUGFnZShpZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dTcGlubmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBkYXRhc2V0U2hvcnROYW1lID0gdGhpcy5kYXRhc2V0VHlwZS5zaG9ydE5hbWU7XG4gICAgICAgICAgICBsZXQgZGF0YXNldE5hbWUgPVxuICAgICAgICAgICAgICAgIGAke0FVVE9fTUVSR0VfUFJFRklYfSAke2RhdGFzZXRTaG9ydE5hbWV9IEAgJHtEYXRlLm5vdygpfWA7XG4gICAgICAgICAgICBsZXQgZW5kcG9pbnQgPSBBUEkubkpvYnMuYW5kKHskam9iX3R5cGU6IFwibWVyZ2UtZGF0YXNldHNcIn0pO1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgZGF0YXNldFR5cGU6IHRoaXMuZGF0YXNldFR5cGUuZmlsZXR5cGUsXG4gICAgICAgICAgICAgICAgbmFtZTogZGF0YXNldE5hbWUsXG4gICAgICAgICAgICAgICAgaWRzOiBkYXRhc2V0cy5tYXAoZGF0YXNldCA9PiBkYXRhc2V0LmlkKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLnN0YXNoLnBvc3RUb0VuZHBvaW50KGRhdGEsIGVuZHBvaW50KTtcbiAgICAgICAgICAgIHByb21pc2VcbiAgICAgICAgICAgICAgICAudGhlbihqc29uRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc01lcmdlUmVzcG9uc2UoanNvbkRhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChyZWFzb24gPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NwaW5uZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHJlYXNvbjtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNb2RhbCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCb29lbGFuIHRoYXQgZGVmaW5lcyBpZiBkYXRhIGNhbiBiZSBtb3ZlZCB0byB0aGUgcmlnaHQgY2F0YWxvZ1xuICAgICAqL1xuICAgIHB1YmxpYyBjYW5Nb3ZlUmlnaHQoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pc1Vuc2VudCgpICYmXG4gICAgICAgICAgICBDYXRhbG9nLmhhc1NlbGVjdGVkUm93cyh0aGlzLmxlZnRDYXRhbG9nQXJncykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJvb2VsYW4gdGhhdCBkZWZpbmVzIGlmIGRhdGEgY2FuIGJlIG1vdmVkIGJhY2sgdG8gdGhlIGxlZnQgY2F0YWxvZ1xuICAgICAqL1xuICAgIHB1YmxpYyBjYW5Nb3ZlTGVmdCgpIHtcbiAgICAgICAgcmV0dXJuICAodGhpcy5pc1Vuc2VudCgpICYmXG4gICAgICAgICAgICBDYXRhbG9nLmhhc1NlbGVjdGVkUm93cyh0aGlzLnJpZ2h0Q2F0YWxvZ0FyZ3MpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciB0aGUgY2FuY2VsIGJ1dHRvbi5cbiAgICAgKiBOYXZpZ2F0ZXMgYmFjayB0byBEYXRhIE1hbmFnZW1lbnQgaG9tZSBzY3JlZW4uXG4gICAgICovXG4gICAgcHVibGljIGRvQ2FuY2VsKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIuLi9Kb2JzXCJdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgbW9kYWwgd2luZG93XG4gICAgICovXG4gICAgcHVibGljIHNob3dNb2RhbCgpIHtcbiAgICAgIHRoaXMubW9kYWwuc2hvdygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSBtb2RhbCB3aW5kb3dcbiAgICAgKi9cbiAgICBwdWJsaWMgaGlkZU1vZGFsKCkge1xuICAgICAgdGhpcy5tb2RhbC5oaWRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1Vuc2VudCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnNob3dTcGlubmVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0YXN0b3JlRm9ySm9iSWQoam9iSWQpIHtcbiAgICAgICAgbGV0IGRhdGFzZXRTaG9ydE5hbWUgPSB0aGlzLmRhdGFzZXRUeXBlLnNob3J0TmFtZTtcblxuICAgICAgICBjb25zdCBvbmVUZW50aFNlY29uZCA9IDEwMDtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gQVBJLm5Kb2JEYXRhc3RvcmVzLmFuZCh7XG4gICAgICAgICAgICAkam9iX3R5cGU6IFwibWVyZ2UtZGF0YXNldHNcIixcbiAgICAgICAgICAgICRqb2JfaW50OiBqb2JJZFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLmlvLmdldEVuZHBvaW50QXN5bmMoZW5kcG9pbnQpO1xuICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyhic2tpbm5lcik6IHdlIHNob3VsZCBiZSByZXBlYXRlZGx5IGNoZWNraW5nIHRoZSBzdGF0dXNcbiAgICAgICAgICAgICAgICAvLyBvZiB0aGUgam9iIGl0c2VsZiwgYW5kIHdhaXRpbmcgZm9yIHRoZSBqb2IgdG8gZmluaXNoIGJlZm9yZVxuICAgICAgICAgICAgICAgIC8vIGdldHRpbmcgdGhlIGRhdGFzdG9yZSwgcmF0aGVyIHRoYW4gY2hlY2tpbmcgZm9yIHRoZSBsZW5ndGhcbiAgICAgICAgICAgICAgICAvLyBvZiB0aGUgYXJyYXkgaW4gdGhlIGRhdGFzdG9yZS5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLmdldERhdGFzdG9yZUZvckpvYklkKGpvYklkKSwgb25lVGVudGhTZWNvbmQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZW5kcG9pbnQgPSBBUEkuYURhdGFzZXRCeVV1aWQuYW5kKHtcbiAgICAgICAgICAgICAgICAgICAgJHNldF90eXBlOiBkYXRhc2V0U2hvcnROYW1lLFxuICAgICAgICAgICAgICAgICAgICAkc2V0X3V1aWQ6IHJlc3VsdFswXS51dWlkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLmlvLmdldEVuZHBvaW50QXN5bmMoZW5kcG9pbnQpO1xuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihyZXN1bHQgPT4gdGhpcy5nb3RvU2V0dGluZ3NQYWdlKHJlc3VsdC5pZCkpO1xuICAgICAgICAgICAgICAgIHByb21pc2UuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvclNlcnZpY2Uuc2hvd0Vycm9yKGVycm9yKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBwcm9taXNlLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3JTZXJ2aWNlLnNob3dFcnJvcihlcnJvcikpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ290b1NldHRpbmdzUGFnZShpZCkge1xuICAgICAgICB0aGlzLnNob3dTcGlubmVyID0gZmFsc2U7XG4gICAgICAgIGxldCBkYXRhc2V0U2hvcnROYW1lID0gdGhpcy5kYXRhc2V0VHlwZS5zaG9ydE5hbWU7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi4uL1NldHRpbmdcIiwgeyBzaG9ydE5hbWU6IGRhdGFzZXRTaG9ydE5hbWUsIGlkOiBpZCB9IF0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc01lcmdlUmVzcG9uc2UocmVzdWx0KSB7XG4gICAgICAgIGNvbnN0IG9uZVRlbnRoU2Vjb25kID0gMTAwO1xuICAgICAgICBsZXQgam9iSWQgPSByZXN1bHQuaWQ7XG4gICAgICAgIGxldCBqb2JUeXBlSWQgPSByZXN1bHQuam9iVHlwZUlkO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZ2V0RGF0YXN0b3JlRm9ySm9iSWQoam9iSWQpLCBvbmVUZW50aFNlY29uZCk7XG4gICAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=