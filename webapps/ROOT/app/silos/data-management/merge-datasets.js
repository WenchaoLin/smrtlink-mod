/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:dbarreto@pacificbiosciences.com">David Barreto</a>
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
var router_1 = require("angular2/router");
var status_1 = require("../../navigation/status");
var imprint_1 = require("../../directives/imprint");
var stamp_1 = require("../../strings/stamp");
var text_1 = require("../../strings/en-us/text");
var catalog_1 = require("athenaeum/components/catalog/catalog");
var modal_1 = require("athenaeum/components/modal/modal");
var error_service_1 = require("../error/error-service");
var api_1 = require("../../data/io/api");
var io_1 = require("athenaeum/data/api/io");
var subread_1 = require("../../data/facets/subread");
var dataset_service_1 = require("../shared/dataset-service");
var common_1 = require("angular2/common");
var MergeDatasets = (function () {
    function MergeDatasets(router, cdr, datasetService, builder, io) {
        this.TEXT = text_1.TEXT;
        this.STAMP = stamp_1.STAMP;
        this.datasets = [];
        this.router = router;
        this.cdr = cdr;
        this.formBuilder = builder;
        this.datasetService = datasetService;
        this.io = io;
        this.datasets = datasetService.getSelectedDatasets();
        this.facet = datasetService.getFacet() || subread_1.SUBREAD_FACET;
        this.initializeCatalogArgs();
        this.configureForm();
    }
    MergeDatasets.prototype.ngAfterViewInit = function () {
        this.configureCatalog();
        this.populateCatalog();
        this.cdr.detectChanges();
    };
    MergeDatasets.prototype.doCancel = function () {
        this.router.navigate(["/DataManagement"]);
    };
    MergeDatasets.prototype.canStart = function () {
        return this.form.valid && this.datasets.length > 0;
    };
    MergeDatasets.prototype.doStart = function () {
        var _this = this;
        var merge = {
            datasetType: this.datasetService.getDatasetType().filetype,
            ids: this.datasets.map(function (dataset) { return dataset.id; }),
            name: this.nameField.value
        };
        this.io.postToEndpointAsync(merge, api_1.API.aMergeJob)
            .then(function (response) {
            _this.router.navigate(["/DataManagement"]);
        }).catch(function (response) {
            _this.errorMessage = error_service_1.ErrorService.messageForError(response);
            _this.openModal();
        });
    };
    MergeDatasets.prototype.openModal = function () {
        this.modal.show();
    };
    MergeDatasets.prototype.closeModal = function () {
        this.modal.hide();
    };
    MergeDatasets.prototype.configureForm = function () {
        this.nameField = new common_1.Control("", common_1.Validators.required);
        this.form = this.formBuilder.group({
            name: this.nameField
        });
    };
    MergeDatasets.prototype.configureCatalog = function () {
        this.catalog.setSchemaProperties(this.facet.frame.properties, this.facet.defaultColumns, this.facet.additionalColumns);
    };
    MergeDatasets.prototype.populateCatalog = function () {
        this.catalog.setContentItems(this.datasets);
    };
    MergeDatasets.prototype.initializeCatalogArgs = function () {
        this.catalogArgs = {
            title: text_1.TEXT.DATASETS_SELECTED,
            show: {
                searchBox: false,
                customizeButton: false
            },
            agGridOptions: {
                columnDefs: [],
                rowData: [],
                enableSorting: true,
                enableFilter: true,
                groupUseEntireRow: true,
                groupDefaultExpanded: true,
                enableColResize: true,
                toolPanelSuppressPivot: true,
                toolPanelSuppressValues: true,
                rowHeight: 40,
                headerHeight: 40
            }
        };
    };
    __decorate([
        core_1.ViewChild(catalog_1.Catalog), 
        __metadata('design:type', catalog_1.Catalog)
    ], MergeDatasets.prototype, "catalog", void 0);
    __decorate([
        core_1.ViewChild(modal_1.ModalDialog), 
        __metadata('design:type', modal_1.ModalDialog)
    ], MergeDatasets.prototype, "modal", void 0);
    MergeDatasets = __decorate([
        core_1.Component({
            selector: "merge-datasets",
            moduleId: module.id,
            directives: [imprint_1.Imprint, catalog_1.Catalog, modal_1.MODAL_DIRECTIVES],
            templateUrl: "merge-datasets.html",
            styleUrls: [
                "merge-datasets.css",
                "../../css/simple-table.css"
            ],
            host: {
                class: "simple-table"
            },
            encapsulation: core_1.ViewEncapsulation.None
        }),
        router_1.CanActivate(status_1.canConnect), 
        __metadata('design:paramtypes', [router_1.Router, core_1.ChangeDetectorRef, dataset_service_1.DatasetService, common_1.FormBuilder, io_1.IO])
    ], MergeDatasets);
    return MergeDatasets;
}());
exports.MergeDatasets = MergeDatasets;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9kYXRhLW1hbmFnZW1lbnQvbWVyZ2UtZGF0YXNldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOzs7Ozs7Ozs7OztBQUVILHFCQUVPLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLHVCQUFrQyxpQkFBaUIsQ0FBQyxDQUFBO0FBRXBELHVCQUF5Qix5QkFBeUIsQ0FBQyxDQUFBO0FBRW5ELHdCQUFzQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ2pELHNCQUFvQixxQkFBcUIsQ0FBQyxDQUFBO0FBQzFDLHFCQUFtQiwwQkFBMEIsQ0FBQyxDQUFBO0FBRTlDLHdCQUErQixzQ0FBc0MsQ0FBQyxDQUFBO0FBQ3RFLHNCQUE0QyxrQ0FBa0MsQ0FBQyxDQUFBO0FBRS9FLDhCQUEyQix3QkFBd0IsQ0FBQyxDQUFBO0FBRXBELG9CQUFrQixtQkFBbUIsQ0FBQyxDQUFBO0FBQ3RDLG1CQUFpQix1QkFBdUIsQ0FBQyxDQUFBO0FBSXpDLHdCQUE0QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ3hELGdDQUE2QiwyQkFBMkIsQ0FBQyxDQUFBO0FBRXpELHVCQUE4RSxpQkFBaUIsQ0FBQyxDQUFBO0FBdUJoRztJQXdCSSx1QkFDSSxNQUFjLEVBQ2QsR0FBc0IsRUFDdEIsY0FBOEIsRUFDOUIsT0FBb0IsRUFDcEIsRUFBTTtRQTVCSCxTQUFJLEdBQVEsV0FBSSxDQUFDO1FBQ2pCLFVBQUssR0FBUSxhQUFLLENBQUM7UUFpQmxCLGFBQVEsR0FBZSxFQUFFLENBQUM7UUFZOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUVyQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUViLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDLG1CQUFt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WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLFlBQVksRUFBRSxJQUFJO2dCQUNsQixpQkFBaUIsRUFBRSxJQUFJO2dCQUN2QixvQkFBb0IsRUFBRSxJQUFJO2dCQUMxQixlQUFlLEVBQUUsSUFBSTtnQkFDckIsc0JBQXNCLEVBQUUsSUFBSTtnQkFDNUIsdUJBQXVCLEVBQUUsSUFBSTtnQkFDN0IsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsWUFBWSxFQUFFLEVBQUU7YUFDbkI7U0FDSixDQUFDO0lBRU4sQ0FBQztJQXpHRDtRQUFDLGdCQUFTLENBQUMsaUJBQU8sQ0FBQzs7a0RBQUE7SUFDbkI7UUFBQyxnQkFBUyxDQUFDLG1CQUFXLENBQUM7O2dEQUFBO0lBckMzQjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixVQUFVLEVBQUUsQ0FBQyxpQkFBTyxFQUFFLGlCQUFPLEVBQUUsd0JBQWdCLENBQUM7WUFDaEQsV0FBVyxFQUFFLHFCQUFxQjtZQUNsQyxTQUFTLEVBQUU7Z0JBQ1Asb0JBQW9CO2dCQUNwQiw0QkFBNEI7YUFDL0I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFLGNBQWM7YUFDeEI7WUFDRCxhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtTQUN4QyxDQUFDO1FBQ0Qsb0JBQVcsQ0FBQyxtQkFBVSxDQUFDOztxQkFBQTtJQWdJeEIsb0JBQUM7QUFBRCxDQS9IQSxBQStIQyxJQUFBO0FBL0hZLHFCQUFhLGdCQStIekIsQ0FBQSIsImZpbGUiOiJhcHAvc2lsb3MvZGF0YS1tYW5hZ2VtZW50L21lcmdlLWRhdGFzZXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhLCBJbmMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86ZGJhcnJldG9AcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbVwiPkRhdmlkIEJhcnJldG88L2E+XG4gKi9cblxuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge1JvdXRlciwgQ2FuQWN0aXZhdGV9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcblxuaW1wb3J0IHtjYW5Db25uZWN0fSBmcm9tIFwiLi4vLi4vbmF2aWdhdGlvbi9zdGF0dXNcIjtcblxuaW1wb3J0IHtJbXByaW50fSBmcm9tIFwiLi4vLi4vZGlyZWN0aXZlcy9pbXByaW50XCI7XG5pbXBvcnQge1NUQU1QfSBmcm9tIFwiLi4vLi4vc3RyaW5ncy9zdGFtcFwiO1xuaW1wb3J0IHtURVhUfSBmcm9tIFwiLi4vLi4vc3RyaW5ncy9lbi11cy90ZXh0XCI7XG5cbmltcG9ydCB7Q2F0YWxvZywgSVBiQXJnc30gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL2NhdGFsb2cvY2F0YWxvZ1wiO1xuaW1wb3J0IHtNT0RBTF9ESVJFQ1RJVkVTLCBNb2RhbERpYWxvZ30gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL21vZGFsL21vZGFsXCI7XG5cbmltcG9ydCB7RXJyb3JTZXJ2aWNlfSBmcm9tIFwiLi4vZXJyb3IvZXJyb3Itc2VydmljZVwiO1xuXG5pbXBvcnQge0FQSX0gZnJvbSBcIi4uLy4uL2RhdGEvaW8vYXBpXCI7XG5pbXBvcnQge0lPfSBmcm9tIFwiYXRoZW5hZXVtL2RhdGEvYXBpL2lvXCI7XG5pbXBvcnQge0VuZHBvaW50fSBmcm9tIFwiYXRoZW5hZXVtL2RhdGEvYXBpL2VuZHBvaW50XCI7XG5cbmltcG9ydCB7RmFjZXR9IGZyb20gXCIuLi8uLi9kYXRhL2ZhY2V0cy9mYWNldFwiO1xuaW1wb3J0IHtTVUJSRUFEX0ZBQ0VUfSBmcm9tIFwiLi4vLi4vZGF0YS9mYWNldHMvc3VicmVhZFwiO1xuaW1wb3J0IHtEYXRhc2V0U2VydmljZX0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhc2V0LXNlcnZpY2VcIjtcblxuaW1wb3J0IHtGb3JtQnVpbGRlciwgQ29udHJvbCwgQ29udHJvbEdyb3VwLCBGT1JNX0RJUkVDVElWRVMsIFZhbGlkYXRvcnN9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcblxuaW50ZXJmYWNlIElNZXJnZUFQSSB7XG4gICAgZGF0YXNldFR5cGU6IHN0cmluZztcbiAgICBpZHM6IG51bWJlcltdO1xuICAgIG5hbWU6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibWVyZ2UtZGF0YXNldHNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIGRpcmVjdGl2ZXM6IFtJbXByaW50LCBDYXRhbG9nLCBNT0RBTF9ESVJFQ1RJVkVTXSxcbiAgICB0ZW1wbGF0ZVVybDogXCJtZXJnZS1kYXRhc2V0cy5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgIFwibWVyZ2UtZGF0YXNldHMuY3NzXCIsXG4gICAgICAgIFwiLi4vLi4vY3NzL3NpbXBsZS10YWJsZS5jc3NcIlxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogXCJzaW1wbGUtdGFibGVcIlxuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbkBDYW5BY3RpdmF0ZShjYW5Db25uZWN0KVxuZXhwb3J0IGNsYXNzIE1lcmdlRGF0YXNldHMgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgICBwdWJsaWMgVEVYVDogYW55ID0gVEVYVDtcbiAgICBwdWJsaWMgU1RBTVA6IGFueSA9IFNUQU1QO1xuXG4gICAgcHVibGljIGNhdGFsb2dBcmdzOiBJUGJBcmdzO1xuXG4gICAgcHVibGljIGZvcm06IENvbnRyb2xHcm91cDtcbiAgICBwdWJsaWMgbmFtZUZpZWxkOiBDb250cm9sO1xuXG4gICAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmO1xuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXI7XG4gICAgcHJpdmF0ZSBkYXRhc2V0U2VydmljZTogRGF0YXNldFNlcnZpY2U7XG5cbiAgICBwcml2YXRlIGlvOiBJTztcblxuICAgIHByaXZhdGUgZmFjZXQ6IEZhY2V0O1xuICAgIHByaXZhdGUgZGF0YXNldHM6IEFycmF5PGFueT4gPSBbXTtcblxuICAgIEBWaWV3Q2hpbGQoQ2F0YWxvZykgcHJpdmF0ZSBjYXRhbG9nOiBDYXRhbG9nO1xuICAgIEBWaWV3Q2hpbGQoTW9kYWxEaWFsb2cpIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBkYXRhc2V0U2VydmljZTogRGF0YXNldFNlcnZpY2UsXG4gICAgICAgIGJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgICAgICBpbzogSU9cbiAgICApIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgICAgIHRoaXMuY2RyID0gY2RyO1xuICAgICAgICB0aGlzLmZvcm1CdWlsZGVyID0gYnVpbGRlcjtcbiAgICAgICAgdGhpcy5kYXRhc2V0U2VydmljZSA9IGRhdGFzZXRTZXJ2aWNlO1xuXG4gICAgICAgIHRoaXMuaW8gPSBpbztcblxuICAgICAgICB0aGlzLmRhdGFzZXRzID0gZGF0YXNldFNlcnZpY2UuZ2V0U2VsZWN0ZWREYXRhc2V0cygpO1xuICAgICAgICB0aGlzLmZhY2V0ID0gZGF0YXNldFNlcnZpY2UuZ2V0RmFjZXQoKSB8fCBTVUJSRUFEX0ZBQ0VUO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNhdGFsb2dBcmdzKCk7XG4gICAgICAgIHRoaXMuY29uZmlndXJlRm9ybSgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmVDYXRhbG9nKCk7XG4gICAgICAgIHRoaXMucG9wdWxhdGVDYXRhbG9nKCk7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZG9DYW5jZWwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9EYXRhTWFuYWdlbWVudFwiXSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNhblN0YXJ0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtLnZhbGlkICYmIHRoaXMuZGF0YXNldHMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZG9TdGFydCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbWVyZ2U6IElNZXJnZUFQSSA9IHtcbiAgICAgICAgICAgIGRhdGFzZXRUeXBlOiB0aGlzLmRhdGFzZXRTZXJ2aWNlLmdldERhdGFzZXRUeXBlKCkuZmlsZXR5cGUsXG4gICAgICAgICAgICBpZHM6IHRoaXMuZGF0YXNldHMubWFwKGRhdGFzZXQgPT4gZGF0YXNldC5pZCksXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWVGaWVsZC52YWx1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuaW8ucG9zdFRvRW5kcG9pbnRBc3luYyhtZXJnZSwgQVBJLmFNZXJnZUpvYilcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL0RhdGFNYW5hZ2VtZW50XCJdKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBFcnJvclNlcnZpY2UubWVzc2FnZUZvckVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5Nb2RhbCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW5Nb2RhbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlTW9kYWwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9kYWwuaGlkZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29uZmlndXJlRm9ybSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5uYW1lRmllbGQgPSBuZXcgQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcblxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZUZpZWxkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29uZmlndXJlQ2F0YWxvZygpIHtcbiAgICAgICAgdGhpcy5jYXRhbG9nLnNldFNjaGVtYVByb3BlcnRpZXMoXG4gICAgICAgICAgICB0aGlzLmZhY2V0LmZyYW1lLnByb3BlcnRpZXMsXG4gICAgICAgICAgICB0aGlzLmZhY2V0LmRlZmF1bHRDb2x1bW5zLFxuICAgICAgICAgICAgdGhpcy5mYWNldC5hZGRpdGlvbmFsQ29sdW1uc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgcG9wdWxhdGVDYXRhbG9nKCkge1xuICAgICAgICB0aGlzLmNhdGFsb2cuc2V0Q29udGVudEl0ZW1zKHRoaXMuZGF0YXNldHMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUNhdGFsb2dBcmdzKCkge1xuXG4gICAgICAgIHRoaXMuY2F0YWxvZ0FyZ3MgPSB7XG4gICAgICAgICAgICB0aXRsZTogVEVYVC5EQVRBU0VUU19TRUxFQ1RFRCxcbiAgICAgICAgICAgIHNob3c6IHtcbiAgICAgICAgICAgICAgICBzZWFyY2hCb3g6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGN1c3RvbWl6ZUJ1dHRvbjogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZ0dyaWRPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgY29sdW1uRGVmczogW10sXG4gICAgICAgICAgICAgICAgcm93RGF0YTogW10sXG4gICAgICAgICAgICAgICAgZW5hYmxlU29ydGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbmFibGVGaWx0ZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgZ3JvdXBVc2VFbnRpcmVSb3c6IHRydWUsXG4gICAgICAgICAgICAgICAgZ3JvdXBEZWZhdWx0RXhwYW5kZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZW5hYmxlQ29sUmVzaXplOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRvb2xQYW5lbFN1cHByZXNzUGl2b3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgdG9vbFBhbmVsU3VwcHJlc3NWYWx1ZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgcm93SGVpZ2h0OiA0MCxcbiAgICAgICAgICAgICAgICBoZWFkZXJIZWlnaHQ6IDQwXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=