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
var common_1 = require("angular2/common");
var io_1 = require("athenaeum/data/api/io");
var status_1 = require("../../navigation/status");
var modal_1 = require("athenaeum/components/modal/modal");
var error_service_1 = require("../error/error-service");
var imprint_1 = require("../../directives/imprint");
var text_1 = require("../../strings/en-us/text");
var stamp_1 = require("../../strings/stamp");
var api_1 = require("../../data/io/api");
var stash_1 = require("../../data/io/stash");
var subread_1 = require("../../data/facets/subread");
var hdf_subread_1 = require("../../data/facets/hdf-subread");
var file_chooser_modal_1 = require("athenaeum/components/file-chooser/file-chooser-modal");
var dataset_type_1 = require("../../data/dataset-type");
var catalog_1 = require("athenaeum/components/catalog/catalog");
var SUBREADS = "subreads";
var HDF_SUBREADS = "hdfsubreads";
var Index = (function () {
    function Index(io, stash, router, routeData, cdr) {
        this.io = io;
        this.stash = stash;
        this.router = router;
        this.routeData = routeData;
        this.cdr = cdr;
        this.TEXT = text_1.TEXT;
        this.STAMP = stamp_1.STAMP;
    }
    Index.prototype.ngOnInit = function () {
        this.configureDatasetTypeSelector();
        this.initializeCatalogArgs();
    };
    Index.prototype.ngAfterViewInit = function () {
        this.setFacet();
        this.configureCatalog();
        this.onDatasetTypeChange();
        this.cdr.detectChanges();
    };
    Index.prototype.fileFilterFn = function (file) {
        var result = ((file.name.endsWith(dataset_type_1.DatasetType.HDF_SUBREAD.filter)) ||
            (file.name.endsWith(dataset_type_1.DatasetType.SUBREAD.filter)) ||
            (file.name.endsWith(dataset_type_1.DatasetType.REFERENCE.filter)) ||
            (file.name.endsWith("fasta")) ||
            (file.name.endsWith("fa")));
        return result;
    };
    Index.prototype.fileChosen = function (file) {
        var _this = this;
        var datasetType;
        if (file.name.endsWith(dataset_type_1.DatasetType.HDF_SUBREAD.filter)) {
            datasetType = dataset_type_1.DatasetType.HDF_SUBREAD.filetype;
        }
        else if (file.name.endsWith(dataset_type_1.DatasetType.SUBREAD.filter)) {
            datasetType = dataset_type_1.DatasetType.SUBREAD.filetype;
        }
        else if (file.name.endsWith(dataset_type_1.DatasetType.REFERENCE.filter)) {
            datasetType = dataset_type_1.DatasetType.REFERENCE.filetype;
        }
        if (datasetType) {
            this.io
                .postToEndpointAsync({ path: file.path, datasetType: datasetType }, api_1.API.aImportJob)
                .then(function (job) {
                setTimeout(function () { return _this.router.navigate(["/Analysis", "Job", { id: job.id }]); }, 100);
            })
                .catch(function (response) {
                _this.errorMessage = error_service_1.ErrorService.messageForError(response);
                _this.openModal();
            });
        }
    };
    Index.prototype.openModal = function () {
        this.modal.show();
    };
    Index.prototype.onLinkCellClick = function (event) {
        this.router.navigate(["../DatasetDetail", { datasetId: event.itemId, type: this.datasetType.shortName }]);
    };
    Index.prototype.stringify = function (o) {
        return JSON.stringify(o);
    };
    Index.prototype.configureDatasetTypeSelector = function () {
        var _this = this;
        this.datasetTypes = dataset_type_1.DatasetType.DATASET_TYPES.filter(function (datasetType) {
            var shortName = datasetType.shortName;
            return (shortName === HDF_SUBREADS || shortName === SUBREADS) ? true : false;
        });
        // Set default value of the selector to "BAM Data"
        this.datasetType = this.datasetTypes.find(function (value, index) {
            return (value.shortName === SUBREADS) ? true : false;
        });
        this.datasetTypeControl = new common_1.Control(this.stringify(this.datasetType));
        this.datasetTypeControl.valueChanges.subscribe(function (datasetType) {
            _this.datasetType = JSON.parse(datasetType);
            _this.onDatasetTypeChange();
        });
    };
    Index.prototype.onDatasetTypeChange = function () {
        this.setFacet();
        this.configureCatalog();
        this.clearContentOfCatalogs();
        this.loadContentIntoCatalog();
    };
    Index.prototype.setFacet = function () {
        switch (this.datasetType.shortName) {
            case SUBREADS:
                this.facet = subread_1.SUBREAD_FACET;
                break;
            case HDF_SUBREADS:
                this.facet = hdf_subread_1.HDF_SUBREAD_FACET;
                break;
            default:
                this.facet = subread_1.SUBREAD_FACET;
        }
    };
    Index.prototype.configureCatalog = function () {
        this.catalog.setSchemaProperties(this.facet.frame.properties, this.facet.defaultColumns, this.facet.additionalColumns);
    };
    Index.prototype.clearContentOfCatalogs = function () {
        this.catalog.setContentItems([]);
    };
    Index.prototype.loadContentIntoCatalog = function () {
        var promise = this.stash.getAllItems(this.facet.frame);
        this.catalog.setContentItems(promise, null, this.facet.initialSort);
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
    __decorate([
        core_1.ViewChild(modal_1.ModalDialog), 
        __metadata('design:type', modal_1.ModalDialog)
    ], Index.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild("catalog"), 
        __metadata('design:type', catalog_1.Catalog)
    ], Index.prototype, "catalog", void 0);
    Index = __decorate([
        core_1.Component({
            selector: "index",
            moduleId: module.id,
            templateUrl: "index.html",
            styleUrls: [
                "index.css",
                "../../css/simple-table.css"
            ],
            host: {
                class: "simple-table home"
            },
            directives: [catalog_1.Catalog, imprint_1.Imprint, file_chooser_modal_1.FileChooserModal, router_1.RouterLink],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        router_1.CanActivate(status_1.canConnect), 
        __metadata('design:paramtypes', [io_1.IO, stash_1.Stash, router_1.Router, router_1.RouteData, core_1.ChangeDetectorRef])
    ], Index);
    return Index;
}());
exports.Index = Index;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9kYXRhLW1hbmFnZW1lbnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOzs7Ozs7Ozs7OztBQUVILHFCQUVPLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLHVCQUF5RCxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNFLHVCQUF1QyxpQkFBaUIsQ0FBQyxDQUFBO0FBRXpELG1CQUFpQix1QkFBdUIsQ0FBQyxDQUFBO0FBRXpDLHVCQUF5Qix5QkFBeUIsQ0FBQyxDQUFBO0FBRW5ELHNCQUE0QyxrQ0FBa0MsQ0FBQyxDQUFBO0FBRS9FLDhCQUEyQix3QkFBd0IsQ0FBQyxDQUFBO0FBRXBELHdCQUFzQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ2pELHFCQUFtQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQzlDLHNCQUFvQixxQkFBcUIsQ0FBQyxDQUFBO0FBRTFDLG9CQUFrQixtQkFBbUIsQ0FBQyxDQUFBO0FBQ3RDLHNCQUFvQixxQkFBcUIsQ0FBQyxDQUFBO0FBRzFDLHdCQUE0QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ3hELDRCQUFnQywrQkFBK0IsQ0FBQyxDQUFBO0FBR2hFLG1DQUErQixzREFBc0QsQ0FBQyxDQUFBO0FBRXRGLDZCQUEwQix5QkFBeUIsQ0FBQyxDQUFBO0FBRXBELHdCQUFvRCxzQ0FBc0MsQ0FBQyxDQUFBO0FBRzNGLElBQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQztBQUM1QixJQUFNLFlBQVksR0FBRyxhQUFhLENBQUM7QUFpQm5DO0lBZ0JJLGVBQ1ksRUFBTSxFQUNOLEtBQVksRUFDWixNQUFjLEVBQ2QsU0FBb0IsRUFDcEIsR0FBc0I7UUFKdEIsT0FBRSxHQUFGLEVBQUUsQ0FBSTtRQUNOLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWxCM0IsU0FBSSxHQUFHLFdBQUksQ0FBQztRQUNa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QkFBNEI7YUFDL0I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFLG1CQUFtQjthQUM3QjtZQUNELFVBQVUsRUFBRSxDQUFDLGlCQUFPLEVBQUUsaUJBQU8sRUFBRSxxQ0FBZ0IsRUFBRSxtQkFBVSxDQUFDO1lBQzVELGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3hDLENBQUM7UUFDRCxvQkFBVyxDQUFDLG1CQUFVLENBQUM7O2FBQUE7SUFvS3hCLFlBQUM7QUFBRCxDQW5LQSxBQW1LQyxJQUFBO0FBbktZLGFBQUssUUFtS2pCLENBQUEiLCJmaWxlIjoiYXBwL3NpbG9zL2RhdGEtbWFuYWdlbWVudC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTUsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYSwgSW5jLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmRiYXJyZXRvQHBhY2lmaWNiaW9zY2llbmNlcy5jb21cIj5EYXZpZCBCYXJyZXRvPC9hPlxuICovXG5cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFF1ZXJ5TGlzdCwgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge1JvdXRlciwgUm91dGVyTGluaywgQ2FuQWN0aXZhdGUsIFJvdXRlRGF0YX0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuaW1wb3J0IHtGT1JNX0RJUkVDVElWRVMsIENvbnRyb2x9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcblxuaW1wb3J0IHtJT30gZnJvbSBcImF0aGVuYWV1bS9kYXRhL2FwaS9pb1wiO1xuXG5pbXBvcnQge2NhbkNvbm5lY3R9IGZyb20gXCIuLi8uLi9uYXZpZ2F0aW9uL3N0YXR1c1wiO1xuXG5pbXBvcnQge01PREFMX0RJUkVDVElWRVMsIE1vZGFsRGlhbG9nfSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvbW9kYWwvbW9kYWxcIjtcblxuaW1wb3J0IHtFcnJvclNlcnZpY2V9IGZyb20gXCIuLi9lcnJvci9lcnJvci1zZXJ2aWNlXCI7XG5cbmltcG9ydCB7SW1wcmludH0gZnJvbSBcIi4uLy4uL2RpcmVjdGl2ZXMvaW1wcmludFwiO1xuaW1wb3J0IHtURVhUfSBmcm9tIFwiLi4vLi4vc3RyaW5ncy9lbi11cy90ZXh0XCI7XG5pbXBvcnQge1NUQU1QfSBmcm9tIFwiLi4vLi4vc3RyaW5ncy9zdGFtcFwiO1xuXG5pbXBvcnQge0FQSX0gZnJvbSBcIi4uLy4uL2RhdGEvaW8vYXBpXCI7XG5pbXBvcnQge1N0YXNofSBmcm9tIFwiLi4vLi4vZGF0YS9pby9zdGFzaFwiO1xuaW1wb3J0IHtGYWNldH0gZnJvbSBcIi4uLy4uL2RhdGEvZmFjZXRzL2ZhY2V0XCI7XG5cbmltcG9ydCB7U1VCUkVBRF9GQUNFVH0gZnJvbSBcIi4uLy4uL2RhdGEvZmFjZXRzL3N1YnJlYWRcIjtcbmltcG9ydCB7SERGX1NVQlJFQURfRkFDRVR9IGZyb20gXCIuLi8uLi9kYXRhL2ZhY2V0cy9oZGYtc3VicmVhZFwiO1xuXG5pbXBvcnQge0ZpbGVNb2RlbH0gZnJvbSBcImF0aGVuYWV1bS9kYXRhL21vZGVscy9scy1tb2RlbFwiO1xuaW1wb3J0IHtGaWxlQ2hvb3Nlck1vZGFsfSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvZmlsZS1jaG9vc2VyL2ZpbGUtY2hvb3Nlci1tb2RhbFwiO1xuXG5pbXBvcnQge0RhdGFzZXRUeXBlfSBmcm9tIFwiLi4vLi4vZGF0YS9kYXRhc2V0LXR5cGVcIjtcblxuaW1wb3J0IHtDYXRhbG9nLCBJTGlua0NlbGxDbGlja0V2ZW50LCBJUGJBcmdzfSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvY2F0YWxvZy9jYXRhbG9nXCI7XG5cblxuY29uc3QgU1VCUkVBRFMgPSBcInN1YnJlYWRzXCI7XG5jb25zdCBIREZfU1VCUkVBRFMgPSBcImhkZnN1YnJlYWRzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImluZGV4XCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCJpbmRleC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgIFwiaW5kZXguY3NzXCIsXG4gICAgICAgIFwiLi4vLi4vY3NzL3NpbXBsZS10YWJsZS5jc3NcIlxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogXCJzaW1wbGUtdGFibGUgaG9tZVwiXG4gICAgfSxcbiAgICBkaXJlY3RpdmVzOiBbQ2F0YWxvZywgSW1wcmludCwgRmlsZUNob29zZXJNb2RhbCwgUm91dGVyTGlua10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbkBDYW5BY3RpdmF0ZShjYW5Db25uZWN0KVxuZXhwb3J0IGNsYXNzIEluZGV4IHtcblxuICAgIHB1YmxpYyBjYXRhbG9nQXJnczogSVBiQXJncztcbiAgICBwdWJsaWMgVEVYVCA9IFRFWFQ7XG4gICAgcHVibGljIFNUQU1QID0gU1RBTVA7XG5cbiAgICBwdWJsaWMgZGF0YXNldFR5cGVzOiBEYXRhc2V0VHlwZVtdO1xuICAgIHB1YmxpYyBkYXRhc2V0VHlwZTogRGF0YXNldFR5cGU7XG4gICAgcHVibGljIGRhdGFzZXRUeXBlQ29udHJvbDogQ29udHJvbDtcblxuICAgIHB1YmxpYyBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgICBwcml2YXRlIGZhY2V0OiBGYWNldDtcblxuICAgIEBWaWV3Q2hpbGQoTW9kYWxEaWFsb2cpIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nO1xuICAgIEBWaWV3Q2hpbGQoXCJjYXRhbG9nXCIpIHByaXZhdGUgY2F0YWxvZzogQ2F0YWxvZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGlvOiBJTyxcbiAgICAgICAgcHJpdmF0ZSBzdGFzaDogU3Rhc2gsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgcm91dGVEYXRhOiBSb3V0ZURhdGEsXG4gICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyZURhdGFzZXRUeXBlU2VsZWN0b3IoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplQ2F0YWxvZ0FyZ3MoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0RmFjZXQoKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmVDYXRhbG9nKCk7XG4gICAgICAgIHRoaXMub25EYXRhc2V0VHlwZUNoYW5nZSgpO1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZmlsZUZpbHRlckZuKGZpbGU6IEZpbGVNb2RlbCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAoKGZpbGUubmFtZS5lbmRzV2l0aChEYXRhc2V0VHlwZS5IREZfU1VCUkVBRC5maWx0ZXIpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKGZpbGUubmFtZS5lbmRzV2l0aChEYXRhc2V0VHlwZS5TVUJSRUFELmZpbHRlcikpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAoZmlsZS5uYW1lLmVuZHNXaXRoKERhdGFzZXRUeXBlLlJFRkVSRU5DRS5maWx0ZXIpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKGZpbGUubmFtZS5lbmRzV2l0aChcImZhc3RhXCIpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKGZpbGUubmFtZS5lbmRzV2l0aChcImZhXCIpKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGZpbGVDaG9zZW4oZmlsZTogRmlsZU1vZGVsKSB7XG4gICAgICAgIGxldCBkYXRhc2V0VHlwZTogc3RyaW5nO1xuICAgICAgICBpZiAoZmlsZS5uYW1lLmVuZHNXaXRoKERhdGFzZXRUeXBlLkhERl9TVUJSRUFELmZpbHRlcikpIHtcbiAgICAgICAgICAgIGRhdGFzZXRUeXBlID0gRGF0YXNldFR5cGUuSERGX1NVQlJFQUQuZmlsZXR5cGU7XG4gICAgICAgIH0gZWxzZSBpZiAoZmlsZS5uYW1lLmVuZHNXaXRoKERhdGFzZXRUeXBlLlNVQlJFQUQuZmlsdGVyKSkge1xuICAgICAgICAgICAgZGF0YXNldFR5cGUgPSBEYXRhc2V0VHlwZS5TVUJSRUFELmZpbGV0eXBlO1xuICAgICAgICB9IGVsc2UgaWYgKGZpbGUubmFtZS5lbmRzV2l0aChEYXRhc2V0VHlwZS5SRUZFUkVOQ0UuZmlsdGVyKSkge1xuICAgICAgICAgICAgZGF0YXNldFR5cGUgPSBEYXRhc2V0VHlwZS5SRUZFUkVOQ0UuZmlsZXR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YXNldFR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuaW9cbiAgICAgICAgICAgICAgICAucG9zdFRvRW5kcG9pbnRBc3luYyh7IHBhdGg6IGZpbGUucGF0aCwgZGF0YXNldFR5cGU6IGRhdGFzZXRUeXBlIH0sIEFQSS5hSW1wb3J0Sm9iKVxuICAgICAgICAgICAgICAgIC50aGVuKGpvYiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL0FuYWx5c2lzXCIsIFwiSm9iXCIsIHsgaWQ6IGpvYi5pZCB9XSksIDEwMCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2gocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IEVycm9yU2VydmljZS5tZXNzYWdlRm9yRXJyb3IocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Nb2RhbCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW5Nb2RhbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uTGlua0NlbGxDbGljayhldmVudDogSUxpbmtDZWxsQ2xpY2tFdmVudCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIuLi9EYXRhc2V0RGV0YWlsXCIsIHsgZGF0YXNldElkOiBldmVudC5pdGVtSWQsIHR5cGU6IHRoaXMuZGF0YXNldFR5cGUuc2hvcnROYW1lIH1dKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RyaW5naWZ5KG86IGFueSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbmZpZ3VyZURhdGFzZXRUeXBlU2VsZWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGF0YXNldFR5cGVzID0gRGF0YXNldFR5cGUuREFUQVNFVF9UWVBFUy5maWx0ZXIoKGRhdGFzZXRUeXBlOiBEYXRhc2V0VHlwZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHNob3J0TmFtZSA9IGRhdGFzZXRUeXBlLnNob3J0TmFtZTtcbiAgICAgICAgICAgIHJldHVybiAoc2hvcnROYW1lID09PSBIREZfU1VCUkVBRFMgfHwgc2hvcnROYW1lID09PSBTVUJSRUFEUykgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFNldCBkZWZhdWx0IHZhbHVlIG9mIHRoZSBzZWxlY3RvciB0byBcIkJBTSBEYXRhXCJcbiAgICAgICAgdGhpcy5kYXRhc2V0VHlwZSA9IHRoaXMuZGF0YXNldFR5cGVzLmZpbmQoKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZS5zaG9ydE5hbWUgPT09IFNVQlJFQURTKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kYXRhc2V0VHlwZUNvbnRyb2wgPSBuZXcgQ29udHJvbCh0aGlzLnN0cmluZ2lmeSh0aGlzLmRhdGFzZXRUeXBlKSk7XG5cbiAgICAgICAgdGhpcy5kYXRhc2V0VHlwZUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoZGF0YXNldFR5cGU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0VHlwZSA9IEpTT04ucGFyc2UoZGF0YXNldFR5cGUpO1xuICAgICAgICAgICAgdGhpcy5vbkRhdGFzZXRUeXBlQ2hhbmdlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25EYXRhc2V0VHlwZUNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5zZXRGYWNldCgpO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyZUNhdGFsb2coKTtcbiAgICAgICAgdGhpcy5jbGVhckNvbnRlbnRPZkNhdGFsb2dzKCk7XG4gICAgICAgIHRoaXMubG9hZENvbnRlbnRJbnRvQ2F0YWxvZygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0RmFjZXQoKSB7XG4gICAgICAgIHN3aXRjaCh0aGlzLmRhdGFzZXRUeXBlLnNob3J0TmFtZSkge1xuICAgICAgICAgICAgY2FzZSBTVUJSRUFEUzpcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2V0ID0gU1VCUkVBRF9GQUNFVDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgSERGX1NVQlJFQURTOlxuICAgICAgICAgICAgICAgIHRoaXMuZmFjZXQgPSBIREZfU1VCUkVBRF9GQUNFVDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNldCA9IFNVQlJFQURfRkFDRVQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbmZpZ3VyZUNhdGFsb2coKSB7XG4gICAgICAgIHRoaXMuY2F0YWxvZy5zZXRTY2hlbWFQcm9wZXJ0aWVzKFxuICAgICAgICAgICAgdGhpcy5mYWNldC5mcmFtZS5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgdGhpcy5mYWNldC5kZWZhdWx0Q29sdW1ucyxcbiAgICAgICAgICAgIHRoaXMuZmFjZXQuYWRkaXRpb25hbENvbHVtbnNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFyQ29udGVudE9mQ2F0YWxvZ3MoKSB7XG4gICAgICAgIHRoaXMuY2F0YWxvZy5zZXRDb250ZW50SXRlbXMoW10pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZENvbnRlbnRJbnRvQ2F0YWxvZygpIHtcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLnN0YXNoLmdldEFsbEl0ZW1zKHRoaXMuZmFjZXQuZnJhbWUpO1xuICAgICAgICB0aGlzLmNhdGFsb2cuc2V0Q29udGVudEl0ZW1zKHByb21pc2UsIG51bGwsIHRoaXMuZmFjZXQuaW5pdGlhbFNvcnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUNhdGFsb2dBcmdzKCkge1xuICAgICAgICB0aGlzLmNhdGFsb2dBcmdzID0ge1xuICAgICAgICAgICAgc3RvcmFnZUlkOiB0aGlzLnJvdXRlRGF0YS5nZXQoXCJwYWdlSWRcIiksXG4gICAgICAgICAgICB0aXRsZTogbnVsbCxcbiAgICAgICAgICAgIHNob3c6IHtcbiAgICAgICAgICAgICAgICBzZWFyY2hCb3g6IHRydWUsXG4gICAgICAgICAgICAgICAgY3VzdG9taXplQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNwaW5uZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFnR3JpZE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5EZWZzOiBbXSxcbiAgICAgICAgICAgICAgICByb3dEYXRhOiBbXSxcbiAgICAgICAgICAgICAgICBlbmFibGVTb3J0aW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVuYWJsZUZpbHRlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBncm91cFVzZUVudGlyZVJvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBncm91cERlZmF1bHRFeHBhbmRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbmFibGVDb2xSZXNpemU6IHRydWUsXG4gICAgICAgICAgICAgICAgZG9udFVzZVNjcm9sbHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRvb2xQYW5lbFN1cHByZXNzUGl2b3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgdG9vbFBhbmVsU3VwcHJlc3NWYWx1ZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgcm93SGVpZ2h0OiA0MCxcbiAgICAgICAgICAgICAgICBoZWFkZXJIZWlnaHQ6IDQwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlsdGVyQmFyQXJnczogbnVsbFxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==