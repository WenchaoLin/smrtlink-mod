/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:dbarreto@pacificbiosciences.com">David Barreto</a>
 */
"use strict";
var common_1 = require("angular2/common");
var select_data_subread_1 = require("../../data/facets/select-data.subread");
var select_data_hdf_subread_1 = require("../../data/facets/select-data.hdf-subread");
var dataset_type_1 = require("../../data/dataset-type");
var stamp_1 = require("../../strings/stamp");
var text_1 = require("../../strings/en-us/text");
var SelectDatasetsBase = (function () {
    function SelectDatasetsBase(io, router, routeData, cdr) {
        this.TEXT = text_1.TEXT;
        this.STAMP = stamp_1.STAMP;
        this.cdr = cdr;
        this.router = router;
        this.io = io;
        this.routeData = routeData;
    }
    /**
     * Gets datasets array from server
     */
    SelectDatasetsBase.prototype.getDatasets = function () {
        var endpoint = this.datasetType.endpoint;
        return this.io.getEndpointAsync(endpoint);
    };
    /**
     * Function that moves the selected datasets from the left catalog to the right catalog
     */
    SelectDatasetsBase.prototype.doMoveRight = function () {
        this.doMove(this.leftCatalog, this.leftCatalogArgs, this.rightCatalog);
    };
    /**
     * Function that moves the selected datasets from the right catalog back to the left catalog
     */
    SelectDatasetsBase.prototype.doMoveLeft = function () {
        this.doMove(this.rightCatalog, this.rightCatalogArgs, this.leftCatalog);
    };
    /**
     * Handles the change of the Dataset Type selector
     */
    SelectDatasetsBase.prototype.onDatasetTypeChange = function () {
        this.setFacet();
        this.configureCatalogs();
        this.clearContentOfCatalogs();
        this.loadContentIntoCatalog(this.leftCatalog);
    };
    /**
     * Boolean that defines if a catalog contains at least one item
     */
    SelectDatasetsBase.prototype.hasItems = function (catalog) {
        return catalog && catalog.getContentItems().length > 0;
    };
    /**
     * Loads the dataset selector with a subset of the values returned by the server
     * and setup the subscriber for the control. This method should be invoked just
     * once at component initialization.
     */
    SelectDatasetsBase.prototype.configureDatasetTypeSelector = function () {
        var _this = this;
        this.datasetTypes = SelectDatasetsBase.DATASET_MAP.map(function (datasetMap) {
            return datasetMap.datasetType;
        });
        this.datasetType = this.datasetTypes[0];
        this.datasetTypeControl = new common_1.Control(0);
        this.datasetTypeControl.valueChanges.subscribe(function (index) {
            _this.datasetType = SelectDatasetsBase.DATASET_MAP[index].datasetType;
            _this.onDatasetTypeChange();
        });
    };
    /**
     * Loads the appropriate Facet depending on the Dataset Type selected
     */
    SelectDatasetsBase.prototype.setFacet = function () {
        var _this = this;
        var activeMap = SelectDatasetsBase.DATASET_MAP.find(function (datasetMap) {
            return datasetMap.datasetType.shortName === _this.datasetType.shortName;
        });
        this.facet = activeMap.facet;
    };
    /**
     * Configure the catalogs with the appropriate values. This method runs every time the
     * Dataset Type selector changes
     */
    SelectDatasetsBase.prototype.configureCatalogs = function () {
        var _this = this;
        this.catalogs.toArray().forEach(function (catalog) {
            catalog.setSchemaProperties(_this.facet.frame.properties, _this.facet.defaultColumns, _this.facet.additionalColumns);
        });
    };
    /**
     * Remove all items from both catalogs
     */
    SelectDatasetsBase.prototype.clearContentOfCatalogs = function () {
        this.catalogs.toArray().forEach(function (catalog) {
            catalog.setContentItems([]);
        });
    };
    /**
     * Loads the items returned from the server in the Catalog passed as an argument
     */
    SelectDatasetsBase.prototype.loadContentIntoCatalog = function (catalog) {
        var promise = this.getDatasets();
        catalog.setContentItems(promise, null, this.facet.initialSort);
    };
    /**
     * Generic function used to move items from one Catalog to the other. Not used directly
     * in the template. Use "doMoveRight" or "doMoveLeft" instead wich are high level wrappers
     * around this method.
     */
    SelectDatasetsBase.prototype.doMove = function (sourceCatalog, sourceArgs, targetCatalog) {
        var sourceItemsSelected = sourceArgs.agGridOptions.selectedRows;
        var oldTargetItems = targetCatalog.getContentItems();
        var newTargetItems = oldTargetItems.concat(sourceItemsSelected);
        var oldSourceItems = sourceCatalog.getContentItems();
        var newSourceItems = oldSourceItems.filter(function (SourceItem) { return sourceItemsSelected.indexOf(SourceItem) === -1; });
        sourceCatalog.setContentItems(newSourceItems);
        targetCatalog.setContentItems(newTargetItems);
    };
    /**
     * Initialize all the variables used in the template. Method invoked at Component startup time
     */
    SelectDatasetsBase.prototype.initializeCatalogArgs = function () {
        var agGridOptions = {
            columnDefs: [],
            rowData: [],
            enableSorting: true,
            enableFilter: true,
            groupUseEntireRow: true,
            groupDefaultExpanded: true,
            enableColResize: true,
            rowSelection: "multiple",
            enableRowHeaderSelection: true,
            toolPanelSuppressPivot: true,
            toolPanelSuppressValues: true,
            rowHeight: 40,
            headerHeight: 40
        };
        this.leftCatalogArgs = {
            storageId: this.routeData.get("pageId") + "-left",
            title: text_1.TEXT.SELECT_DATA,
            show: {
                searchBox: true,
                customizeButton: true
            },
            agGridOptions: Object.assign({}, agGridOptions)
        };
        this.rightCatalogArgs = {
            storageId: this.routeData.get("pageId") + "-right",
            title: text_1.TEXT.DATA_SET,
            show: {
                searchBox: false,
                customizeButton: false
            },
            agGridOptions: Object.assign({}, agGridOptions)
        };
    };
    SelectDatasetsBase.DATASET_MAP = [
        { datasetType: dataset_type_1.DatasetType.SUBREAD, facet: select_data_subread_1.SELECT_DATA_SUBREAD_FACET },
        { datasetType: dataset_type_1.DatasetType.HDF_SUBREAD, facet: select_data_hdf_subread_1.SELECT_DATA_HDF_SUBREAD_FACET }
    ];
    return SelectDatasetsBase;
}());
exports.SelectDatasetsBase = SelectDatasetsBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9zaGFyZWQvc2VsZWN0LWRhdGFzZXRzLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUdILHVCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBSXhDLG9DQUF3Qyx1Q0FBdUMsQ0FBQyxDQUFBO0FBQ2hGLHdDQUE0QywyQ0FBMkMsQ0FBQyxDQUFBO0FBRXhGLDZCQUEwQix5QkFBeUIsQ0FBQyxDQUFBO0FBR3BELHNCQUFvQixxQkFBcUIsQ0FBQyxDQUFBO0FBQzFDLHFCQUFtQiwwQkFBMEIsQ0FBQyxDQUFBO0FBWTlDO0lBNEJJLDRCQUNJLEVBQU0sRUFDTixNQUFjLEVBQ2QsU0FBb0IsRUFDcEIsR0FBc0I7UUF6Qm5CLFNBQUksR0FBUSxXQUFJLENBQUM7UUFDakIsVUFBSyxHQUFRLGFBQUssQ0FBQztRQTBCdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7T0FFRztJQUNJLHdDQUFXLEdBQWxCO1FBQ0ksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksd0NBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVEOztPQUVHO0lBQ0ksdUNBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUs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LElBQUk7Z0JBQ2YsZUFBZSxFQUFFLElBQUk7YUFDeEI7WUFDRCxhQUFhLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDO1NBQ2xELENBQUM7UUFFRixJQUFJLENBQUMsZ0JBQWdCLEdBQUc7WUFDcEIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVE7WUFDbEQsS0FBSyxFQUFFLFdBQUksQ0FBQyxRQUFRO1lBQ3BCLElBQUksRUFBRTtnQkFDRixTQUFTLEVBQUUsS0FBSztnQkFDaEIsZUFBZSxFQUFFLEtBQUs7YUFDekI7WUFDRCxhQUFhLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDO1NBQ2xELENBQUM7SUFDTixDQUFDO0lBcE1NLDhCQUFXLEdBQWtCO1FBQ2hDLEVBQUMsV0FBVyxFQUFFLDBCQUFXLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSwrQ0FBeUIsRUFBQztRQUNwRSxFQUFDLFdBQVcsRUFBRSwwQkFBVyxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsdURBQTZCLEVBQUM7S0FDL0UsQ0FBQztJQWtNTix5QkFBQztBQUFELENBdk1BLEFBdU1DLElBQUE7QUF2TVksMEJBQWtCLHFCQXVNOUIsQ0FBQSIsImZpbGUiOiJhcHAvc2lsb3Mvc2hhcmVkL3NlbGVjdC1kYXRhc2V0cy1iYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhLCBJbmMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86ZGJhcnJldG9AcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbVwiPkRhdmlkIEJhcnJldG88L2E+XG4gKi9cblxuaW1wb3J0IHtRdWVyeUxpc3QsIENoYW5nZURldGVjdG9yUmVmfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtDb250cm9sfSBmcm9tIFwiYW5ndWxhcjIvY29tbW9uXCI7XG5pbXBvcnQge1JvdXRlciwgUm91dGVEYXRhfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5cbmltcG9ydCB7RmFjZXR9IGZyb20gXCIuLi8uLi9kYXRhL2ZhY2V0cy9mYWNldFwiO1xuaW1wb3J0IHtTRUxFQ1RfREFUQV9TVUJSRUFEX0ZBQ0VUfSBmcm9tIFwiLi4vLi4vZGF0YS9mYWNldHMvc2VsZWN0LWRhdGEuc3VicmVhZFwiO1xuaW1wb3J0IHtTRUxFQ1RfREFUQV9IREZfU1VCUkVBRF9GQUNFVH0gZnJvbSBcIi4uLy4uL2RhdGEvZmFjZXRzL3NlbGVjdC1kYXRhLmhkZi1zdWJyZWFkXCI7XG5cbmltcG9ydCB7RGF0YXNldFR5cGV9IGZyb20gXCIuLi8uLi9kYXRhL2RhdGFzZXQtdHlwZVwiO1xuXG5pbXBvcnQge0ltcHJpbnR9IGZyb20gXCIuLi8uLi9kaXJlY3RpdmVzL2ltcHJpbnRcIjtcbmltcG9ydCB7U1RBTVB9IGZyb20gXCIuLi8uLi9zdHJpbmdzL3N0YW1wXCI7XG5pbXBvcnQge1RFWFR9IGZyb20gXCIuLi8uLi9zdHJpbmdzL2VuLXVzL3RleHRcIjtcblxuaW1wb3J0IHtJT30gZnJvbSBcImF0aGVuYWV1bS9kYXRhL2FwaS9pb1wiO1xuaW1wb3J0IHtFbmRwb2ludH0gZnJvbSBcImF0aGVuYWV1bS9kYXRhL2FwaS9lbmRwb2ludFwiO1xuXG5pbXBvcnQge0NhdGFsb2d9IGZyb20gXCJhdGhlbmFldW0vY29tcG9uZW50cy9jYXRhbG9nL2NhdGFsb2dcIjtcblxuaW50ZXJmYWNlIElEYXRhc2V0TWFwIHtcbiAgICBkYXRhc2V0VHlwZTogRGF0YXNldFR5cGU7XG4gICAgZmFjZXQ6IEZhY2V0O1xufVxuXG5leHBvcnQgY2xhc3MgU2VsZWN0RGF0YXNldHNCYXNlIHtcblxuICAgIHN0YXRpYyBEQVRBU0VUX01BUDogSURhdGFzZXRNYXBbXSA9IFtcbiAgICAgICAge2RhdGFzZXRUeXBlOiBEYXRhc2V0VHlwZS5TVUJSRUFELCBmYWNldDogU0VMRUNUX0RBVEFfU1VCUkVBRF9GQUNFVH0sXG4gICAgICAgIHtkYXRhc2V0VHlwZTogRGF0YXNldFR5cGUuSERGX1NVQlJFQUQsIGZhY2V0OiBTRUxFQ1RfREFUQV9IREZfU1VCUkVBRF9GQUNFVH1cbiAgICBdO1xuXG4gICAgcHVibGljIFRFWFQ6IGFueSA9IFRFWFQ7XG4gICAgcHVibGljIFNUQU1QOiBhbnkgPSBTVEFNUDtcblxuICAgIHB1YmxpYyBsZWZ0Q2F0YWxvZ0FyZ3M6IGFueTtcbiAgICBwdWJsaWMgcmlnaHRDYXRhbG9nQXJnczogYW55O1xuXG4gICAgcHVibGljIGRhdGFzZXRUeXBlczogRGF0YXNldFR5cGVbXTtcbiAgICBwdWJsaWMgZGF0YXNldFR5cGU6IERhdGFzZXRUeXBlO1xuICAgIHB1YmxpYyBkYXRhc2V0VHlwZUNvbnRyb2w6IENvbnRyb2w7XG5cbiAgICBwcm90ZWN0ZWQgbGVmdENhdGFsb2c6IENhdGFsb2c7XG4gICAgcHJvdGVjdGVkIHJpZ2h0Q2F0YWxvZzogQ2F0YWxvZztcbiAgICBwcm90ZWN0ZWQgY2F0YWxvZ3M6IFF1ZXJ5TGlzdDxDYXRhbG9nPjtcblxuICAgIHByb3RlY3RlZCBmYWNldDogRmFjZXQ7XG5cbiAgICBwcm90ZWN0ZWQgaW86IElPO1xuICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcjtcbiAgICBwcm90ZWN0ZWQgcm91dGVEYXRhOiBSb3V0ZURhdGE7XG4gICAgcHJvdGVjdGVkIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaW86IElPLFxuICAgICAgICByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcm91dGVEYXRhOiBSb3V0ZURhdGEsXG4gICAgICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgdGhpcy5jZHIgPSBjZHI7XG4gICAgICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuICAgICAgICB0aGlzLmlvID0gaW87XG4gICAgICAgIHRoaXMucm91dGVEYXRhID0gcm91dGVEYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgZGF0YXNldHMgYXJyYXkgZnJvbSBzZXJ2ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0RGF0YXNldHMoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gdGhpcy5kYXRhc2V0VHlwZS5lbmRwb2ludDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW8uZ2V0RW5kcG9pbnRBc3luYyhlbmRwb2ludCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBtb3ZlcyB0aGUgc2VsZWN0ZWQgZGF0YXNldHMgZnJvbSB0aGUgbGVmdCBjYXRhbG9nIHRvIHRoZSByaWdodCBjYXRhbG9nXG4gICAgICovXG4gICAgcHVibGljIGRvTW92ZVJpZ2h0KCkge1xuICAgICAgICB0aGlzLmRvTW92ZSh0aGlzLmxlZnRDYXRhbG9nLCB0aGlzLmxlZnRDYXRhbG9nQXJncywgdGhpcy5yaWdodENhdGFsb2cpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgbW92ZXMgdGhlIHNlbGVjdGVkIGRhdGFzZXRzIGZyb20gdGhlIHJpZ2h0IGNhdGFsb2cgYmFjayB0byB0aGUgbGVmdCBjYXRhbG9nXG4gICAgICovXG4gICAgcHVibGljIGRvTW92ZUxlZnQoKSB7XG4gICAgICAgIHRoaXMuZG9Nb3ZlKHRoaXMucmlnaHRDYXRhbG9nLCB0aGlzLnJpZ2h0Q2F0YWxvZ0FyZ3MsIHRoaXMubGVmdENhdGFsb2cpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGNoYW5nZSBvZiB0aGUgRGF0YXNldCBUeXBlIHNlbGVjdG9yXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG9uRGF0YXNldFR5cGVDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuc2V0RmFjZXQoKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmVDYXRhbG9ncygpO1xuICAgICAgICB0aGlzLmNsZWFyQ29udGVudE9mQ2F0YWxvZ3MoKTtcbiAgICAgICAgdGhpcy5sb2FkQ29udGVudEludG9DYXRhbG9nKHRoaXMubGVmdENhdGFsb2cpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJvb2xlYW4gdGhhdCBkZWZpbmVzIGlmIGEgY2F0YWxvZyBjb250YWlucyBhdCBsZWFzdCBvbmUgaXRlbVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBoYXNJdGVtcyhjYXRhbG9nOiBDYXRhbG9nKSB7XG4gICAgICAgIHJldHVybiBjYXRhbG9nICYmIGNhdGFsb2cuZ2V0Q29udGVudEl0ZW1zKCkubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyB0aGUgZGF0YXNldCBzZWxlY3RvciB3aXRoIGEgc3Vic2V0IG9mIHRoZSB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIHNlcnZlciBcbiAgICAgKiBhbmQgc2V0dXAgdGhlIHN1YnNjcmliZXIgZm9yIHRoZSBjb250cm9sLiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgaW52b2tlZCBqdXN0IFxuICAgICAqIG9uY2UgYXQgY29tcG9uZW50IGluaXRpYWxpemF0aW9uLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjb25maWd1cmVEYXRhc2V0VHlwZVNlbGVjdG9yKCkge1xuICAgICAgICB0aGlzLmRhdGFzZXRUeXBlcyA9IFNlbGVjdERhdGFzZXRzQmFzZS5EQVRBU0VUX01BUC5tYXAoKGRhdGFzZXRNYXA6IElEYXRhc2V0TWFwKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YXNldE1hcC5kYXRhc2V0VHlwZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZGF0YXNldFR5cGUgPSB0aGlzLmRhdGFzZXRUeXBlc1swXTtcblxuICAgICAgICB0aGlzLmRhdGFzZXRUeXBlQ29udHJvbCA9IG5ldyBDb250cm9sKDApO1xuICAgICAgICB0aGlzLmRhdGFzZXRUeXBlQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRUeXBlID0gU2VsZWN0RGF0YXNldHNCYXNlLkRBVEFTRVRfTUFQW2luZGV4XS5kYXRhc2V0VHlwZTtcbiAgICAgICAgICAgIHRoaXMub25EYXRhc2V0VHlwZUNoYW5nZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyB0aGUgYXBwcm9wcmlhdGUgRmFjZXQgZGVwZW5kaW5nIG9uIHRoZSBEYXRhc2V0IFR5cGUgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgc2V0RmFjZXQoKSB7XG4gICAgICAgIGxldCBhY3RpdmVNYXA6IElEYXRhc2V0TWFwID0gU2VsZWN0RGF0YXNldHNCYXNlLkRBVEFTRVRfTUFQLmZpbmQoKGRhdGFzZXRNYXApID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhc2V0TWFwLmRhdGFzZXRUeXBlLnNob3J0TmFtZSA9PT0gdGhpcy5kYXRhc2V0VHlwZS5zaG9ydE5hbWU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZhY2V0ID0gYWN0aXZlTWFwLmZhY2V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbmZpZ3VyZSB0aGUgY2F0YWxvZ3Mgd2l0aCB0aGUgYXBwcm9wcmlhdGUgdmFsdWVzLiBUaGlzIG1ldGhvZCBydW5zIGV2ZXJ5IHRpbWUgdGhlIFxuICAgICAqIERhdGFzZXQgVHlwZSBzZWxlY3RvciBjaGFuZ2VzXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyZUNhdGFsb2dzKCkge1xuICAgICAgICB0aGlzLmNhdGFsb2dzLnRvQXJyYXkoKS5mb3JFYWNoKChjYXRhbG9nOiBDYXRhbG9nKSA9PiB7XG4gICAgICAgICAgICBjYXRhbG9nLnNldFNjaGVtYVByb3BlcnRpZXMoXG4gICAgICAgICAgICAgICAgdGhpcy5mYWNldC5mcmFtZS5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgIHRoaXMuZmFjZXQuZGVmYXVsdENvbHVtbnMsXG4gICAgICAgICAgICAgICAgdGhpcy5mYWNldC5hZGRpdGlvbmFsQ29sdW1uc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBpdGVtcyBmcm9tIGJvdGggY2F0YWxvZ3NcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY2xlYXJDb250ZW50T2ZDYXRhbG9ncygpIHtcbiAgICAgICAgdGhpcy5jYXRhbG9ncy50b0FycmF5KCkuZm9yRWFjaCgoY2F0YWxvZzogQ2F0YWxvZykgPT4ge1xuICAgICAgICAgICAgY2F0YWxvZy5zZXRDb250ZW50SXRlbXMoW10pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyB0aGUgaXRlbXMgcmV0dXJuZWQgZnJvbSB0aGUgc2VydmVyIGluIHRoZSBDYXRhbG9nIHBhc3NlZCBhcyBhbiBhcmd1bWVudFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBsb2FkQ29udGVudEludG9DYXRhbG9nKGNhdGFsb2c6IENhdGFsb2cpIHtcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLmdldERhdGFzZXRzKCk7XG4gICAgICAgIGNhdGFsb2cuc2V0Q29udGVudEl0ZW1zKHByb21pc2UsIG51bGwsIHRoaXMuZmFjZXQuaW5pdGlhbFNvcnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyaWMgZnVuY3Rpb24gdXNlZCB0byBtb3ZlIGl0ZW1zIGZyb20gb25lIENhdGFsb2cgdG8gdGhlIG90aGVyLiBOb3QgdXNlZCBkaXJlY3RseVxuICAgICAqIGluIHRoZSB0ZW1wbGF0ZS4gVXNlIFwiZG9Nb3ZlUmlnaHRcIiBvciBcImRvTW92ZUxlZnRcIiBpbnN0ZWFkIHdpY2ggYXJlIGhpZ2ggbGV2ZWwgd3JhcHBlcnNcbiAgICAgKiBhcm91bmQgdGhpcyBtZXRob2QuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGRvTW92ZShzb3VyY2VDYXRhbG9nOiBDYXRhbG9nLCBzb3VyY2VBcmdzLCB0YXJnZXRDYXRhbG9nOiBDYXRhbG9nKSB7XG4gICAgICAgIGxldCBzb3VyY2VJdGVtc1NlbGVjdGVkID0gc291cmNlQXJncy5hZ0dyaWRPcHRpb25zLnNlbGVjdGVkUm93cztcblxuICAgICAgICBsZXQgb2xkVGFyZ2V0SXRlbXMgPSB0YXJnZXRDYXRhbG9nLmdldENvbnRlbnRJdGVtcygpO1xuICAgICAgICBsZXQgbmV3VGFyZ2V0SXRlbXMgPSBvbGRUYXJnZXRJdGVtcy5jb25jYXQoc291cmNlSXRlbXNTZWxlY3RlZCk7XG5cbiAgICAgICAgbGV0IG9sZFNvdXJjZUl0ZW1zID0gc291cmNlQ2F0YWxvZy5nZXRDb250ZW50SXRlbXMoKTtcbiAgICAgICAgbGV0IG5ld1NvdXJjZUl0ZW1zID0gb2xkU291cmNlSXRlbXMuZmlsdGVyKFxuICAgICAgICAgICAgU291cmNlSXRlbSA9PiBzb3VyY2VJdGVtc1NlbGVjdGVkLmluZGV4T2YoU291cmNlSXRlbSkgPT09IC0xXG4gICAgICAgICk7XG5cbiAgICAgICAgc291cmNlQ2F0YWxvZy5zZXRDb250ZW50SXRlbXMobmV3U291cmNlSXRlbXMpO1xuICAgICAgICB0YXJnZXRDYXRhbG9nLnNldENvbnRlbnRJdGVtcyhuZXdUYXJnZXRJdGVtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBhbGwgdGhlIHZhcmlhYmxlcyB1c2VkIGluIHRoZSB0ZW1wbGF0ZS4gTWV0aG9kIGludm9rZWQgYXQgQ29tcG9uZW50IHN0YXJ0dXAgdGltZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBpbml0aWFsaXplQ2F0YWxvZ0FyZ3MoKSB7XG5cbiAgICAgICAgY29uc3QgYWdHcmlkT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbHVtbkRlZnM6IFtdLFxuICAgICAgICAgICAgcm93RGF0YTogW10sXG4gICAgICAgICAgICBlbmFibGVTb3J0aW5nOiB0cnVlLFxuICAgICAgICAgICAgZW5hYmxlRmlsdGVyOiB0cnVlLFxuICAgICAgICAgICAgZ3JvdXBVc2VFbnRpcmVSb3c6IHRydWUsXG4gICAgICAgICAgICBncm91cERlZmF1bHRFeHBhbmRlZDogdHJ1ZSxcbiAgICAgICAgICAgIGVuYWJsZUNvbFJlc2l6ZTogdHJ1ZSxcbiAgICAgICAgICAgIHJvd1NlbGVjdGlvbjogXCJtdWx0aXBsZVwiLFxuICAgICAgICAgICAgZW5hYmxlUm93SGVhZGVyU2VsZWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgdG9vbFBhbmVsU3VwcHJlc3NQaXZvdDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2xQYW5lbFN1cHByZXNzVmFsdWVzOiB0cnVlLFxuICAgICAgICAgICAgcm93SGVpZ2h0OiA0MCxcbiAgICAgICAgICAgIGhlYWRlckhlaWdodDogNDBcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxlZnRDYXRhbG9nQXJncyA9IHtcbiAgICAgICAgICAgIHN0b3JhZ2VJZDogdGhpcy5yb3V0ZURhdGEuZ2V0KFwicGFnZUlkXCIpICsgXCItbGVmdFwiLFxuICAgICAgICAgICAgdGl0bGU6IFRFWFQuU0VMRUNUX0RBVEEsXG4gICAgICAgICAgICBzaG93OiB7XG4gICAgICAgICAgICAgICAgc2VhcmNoQm94OiB0cnVlLFxuICAgICAgICAgICAgICAgIGN1c3RvbWl6ZUJ1dHRvbjogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFnR3JpZE9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIGFnR3JpZE9wdGlvbnMpXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yaWdodENhdGFsb2dBcmdzID0ge1xuICAgICAgICAgICAgc3RvcmFnZUlkOiB0aGlzLnJvdXRlRGF0YS5nZXQoXCJwYWdlSWRcIikgKyBcIi1yaWdodFwiLFxuICAgICAgICAgICAgdGl0bGU6IFRFWFQuREFUQV9TRVQsXG4gICAgICAgICAgICBzaG93OiB7XG4gICAgICAgICAgICAgICAgc2VhcmNoQm94OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjdXN0b21pemVCdXR0b246IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWdHcmlkT3B0aW9uczogT2JqZWN0LmFzc2lnbih7fSwgYWdHcmlkT3B0aW9ucylcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=