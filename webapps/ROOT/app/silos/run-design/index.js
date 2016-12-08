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
var common_1 = require("angular2/common");
var router_1 = require("angular2/router");
var modal_1 = require("athenaeum/components/modal/modal");
var status_1 = require("../../navigation/status");
var catalog_1 = require("athenaeum/components/catalog/catalog");
var imprint_1 = require("../../directives/imprint");
var text_1 = require("../../strings/en-us/text");
var run_service_1 = require("../../data/services/run-service");
var silo_service_1 = require("../silo-service");
var ReadError = (function (_super) {
    __extends(ReadError, _super);
    function ReadError(message, filename) {
        _super.call(this, message);
        this.filename = filename;
    }
    ReadError.is = function (object) {
        return object instanceof ReadError;
    };
    return ReadError;
}(Error));
var Index = (function () {
    function Index(router, routeData, runService, siloService, renderer) {
        this.importRunFile = String.EMPTY;
        this.importRunError = null;
        this.importRunErrorMessage = String.EMPTY;
        this.TEXT = text_1.TEXT;
        this.catalogArgs = null;
        siloService.setState({
            title: routeData.get("title"),
            buttons: null
        });
        this.router = router;
        this.facet = routeData.get("facet");
        this.runService = runService;
        this.renderer = renderer;
        this.catalogArgs = {
            title: null,
            storageId: routeData.get("pageId"),
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
    }
    Index.prototype.routerCanReuse = function (next, prev) {
        return false;
    };
    Index.prototype.routerOnActivate = function (next, prev) {
        var oneFifthSecond = 200;
        setTimeout(this.loadContentIntoGrid.bind(this, this.facet), oneFifthSecond);
    };
    Index.prototype.importRunDefinition = function (event) {
        var _this = this;
        this.getFile()
            .then(function (file) {
            _this.importRunFile = file.name;
            try {
                return _this.runService.parseCSV(file.result);
            }
            catch (error) {
                return Promise.reject(error);
            }
        })
            .then(function (design) {
            var existingNames = _this.catalog.getContentItems().map(function (item) {
                return item.name.toLowerCase();
            });
            var runName = design.run.runName;
            var lowerName = runName.toLowerCase();
            if (existingNames.some(function (name) { return name === lowerName; })) {
                return Promise.reject(new Error("A run with the name \"%s\" already exists.".sprintf(runName)));
            }
            return _this.runService.addDesign(design);
        })
            .then(function () {
            _this.loadContentIntoGrid();
        })
            .catch(function (error) {
            _this.importRunError = error;
            if (run_service_1.ParseError.is(error)) {
                _this.importRunErrorMessage = "Errors found in CSV file entries:";
            }
            else if (run_service_1.MissingColumnsError.is(error)) {
                _this.importRunErrorMessage = "These required columns are missing:";
            }
            else {
                _this.importRunErrorMessage = error.message;
            }
            _this.errorDialog.show();
        });
    };
    Index.prototype.onLinkCellClick = function (event) {
        this.router.navigate(["EditRun", { id: event.itemId }]);
    };
    Index.prototype.loadContentIntoGrid = function () {
        this.catalogArgs.filterBarArgs = null;
        var facet = this.runService.runDesignFacet;
        this.catalog.setSchemaProperties(facet.frame.properties, facet.defaultColumns, facet.additionalColumns);
        var promise = this.runService.getDesigns();
        this.catalog.setContentItems(promise, null, facet.initialSort);
    };
    Index.prototype.getFile = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var input = _this.renderer.createElement(null, "input");
            _this.renderer.setElementAttribute(input, "type", "file");
            _this.renderer.projectNodes(_this.inputContainerRef.nativeElement, [input]);
            input.addEventListener("change", function () {
                var file = input.files[0];
                _this.renderer.detachView([input]);
                var reader = new FileReader();
                reader.addEventListener("loadend", function () {
                    if (reader.error) {
                        reject(new ReadError(reader.error.toString(), file.name));
                        return;
                    }
                    resolve({
                        name: file.name,
                        result: reader.result
                    });
                });
                reader.readAsText(file);
            });
            input.click();
        });
    };
    __decorate([
        core_1.ViewChild(catalog_1.Catalog), 
        __metadata('design:type', catalog_1.Catalog)
    ], Index.prototype, "catalog", void 0);
    __decorate([
        core_1.ViewChild(modal_1.ModalDialog), 
        __metadata('design:type', modal_1.ModalDialog)
    ], Index.prototype, "errorDialog", void 0);
    __decorate([
        core_1.ViewChild("inputContainer"), 
        __metadata('design:type', core_1.ElementRef)
    ], Index.prototype, "inputContainerRef", void 0);
    Index = __decorate([
        core_1.Component({
            selector: "run-design-index",
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
        __metadata('design:paramtypes', [router_1.Router, router_1.RouteData, run_service_1.RunService, silo_service_1.SiloService, core_1.Renderer])
    ], Index);
    return Index;
}());
exports.Index = Index;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9ydW4tZGVzaWduL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUVPLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLHVCQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hELHVCQUVPLGlCQUFpQixDQUFDLENBQUE7QUFFekIsc0JBQTRDLGtDQUFrQyxDQUFDLENBQUE7QUFFL0UsdUJBQXlCLHlCQUF5QixDQUFDLENBQUE7QUFFbkQsd0JBQTJDLHNDQUFzQyxDQUFDLENBQUE7QUFDbEYsd0JBQXNCLDBCQUEwQixDQUFDLENBQUE7QUFDakQscUJBQW1CLDBCQUEwQixDQUFDLENBQUE7QUFJOUMsNEJBQXVFLGlDQUFpQyxDQUFDLENBQUE7QUFFekcsNkJBQTBCLGlCQUFpQixDQUFDLENBQUE7QUFHNUM7SUFBd0IsNkJBQUs7SUFHekIsbUJBQVksT0FBZSxFQUFFLFFBQWdCO1FBQ3pDLGtCQUFNLE9BQU8sQ0FBQyxDQUFDO1FBRWYsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVNLFlBQUUsR0FBVCxVQUFVLE1BQVc7UUFDakIsTUFBTSxDQUFDLE1BQU0sWUFBWSxTQUFTLENBQUM7SUFDdkMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FaQSxBQVlDLENBWnVCLEtBQUssR0FZNUI7QUFtQkQ7SUF3QkksZUFBWSxNQUFjLEVBQ2QsU0FBb0IsRUFDcEIsVUFBc0IsRUFDdEIsV0FBbUMsRUFDbkMsUUFBa0I7UUEzQnRCLGtCQUFhLEdBQVcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNyQyxtQkFBYyxHQUFVLElBQUksQ0FBQztRQUM3QiwwQkFBcUIsR0FBVyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBTTdDLFNBQUksR0FBRyxXQUFJLENBQUM7UUFFWixnQkFBVyxHQUFHLElBQUksQ0FBQztRQWtCdkIsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUNqQixLQUFLLEVBQUUsU0FBUyxDQUFD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IHtcbiAgICBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyXG59IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge0NPUkVfRElSRUNUSVZFU30gZnJvbSBcImFuZ3VsYXIyL2NvbW1vblwiO1xuaW1wb3J0IHtcbiAgICBSb3V0ZXJMaW5rLCBSb3V0ZXIsIFJvdXRlRGF0YSwgQ2FuQWN0aXZhdGUsIE9uQWN0aXZhdGUsIENhblJldXNlXG59IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcblxuaW1wb3J0IHtNT0RBTF9ESVJFQ1RJVkVTLCBNb2RhbERpYWxvZ30gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL21vZGFsL21vZGFsXCI7XG5cbmltcG9ydCB7Y2FuQ29ubmVjdH0gZnJvbSBcIi4uLy4uL25hdmlnYXRpb24vc3RhdHVzXCI7XG5cbmltcG9ydCB7Q2F0YWxvZywgSUxpbmtDZWxsQ2xpY2tFdmVudH0gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL2NhdGFsb2cvY2F0YWxvZ1wiO1xuaW1wb3J0IHtJbXByaW50fSBmcm9tIFwiLi4vLi4vZGlyZWN0aXZlcy9pbXByaW50XCI7XG5pbXBvcnQge1RFWFR9IGZyb20gXCIuLi8uLi9zdHJpbmdzL2VuLXVzL3RleHRcIjtcblxuaW1wb3J0IHtJRmFjZXR9IGZyb20gXCIuLi8uLi9kYXRhL2ZhY2V0cy9mYWNldFwiO1xuXG5pbXBvcnQge1J1blNlcnZpY2UsIFBhcnNlRXJyb3IsIE1pc3NpbmdDb2x1bW5zRXJyb3IsIERlc2lnbk1vZGVsfSBmcm9tIFwiLi4vLi4vZGF0YS9zZXJ2aWNlcy9ydW4tc2VydmljZVwiO1xuXG5pbXBvcnQge1NpbG9TZXJ2aWNlfSBmcm9tIFwiLi4vc2lsby1zZXJ2aWNlXCI7XG5pbXBvcnQge1NpbG9TdGF0ZX0gZnJvbSBcIi4uL3J1bi1kZXNpZ25cIjtcblxuY2xhc3MgUmVhZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGZpbGVuYW1lOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG5cbiAgICAgICAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xuICAgIH1cblxuICAgIHN0YXRpYyBpcyhvYmplY3Q6IGFueSk6IG9iamVjdCBpcyBSZWFkRXJyb3Ige1xuICAgICAgICByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgUmVhZEVycm9yO1xuICAgIH1cbn1cblxuaW50ZXJmYWNlIEltcG9ydEZpbGUge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICByZXN1bHQ6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicnVuLWRlc2lnbi1pbmRleFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiaW5kZXguaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1xuICAgICAgICBcImluZGV4LmNzc1wiLFxuICAgICAgICBcIi4uLy4uL2Nzcy9zaW1wbGUtdGFibGUuY3NzXCJcbiAgICBdLFxuICAgIGRpcmVjdGl2ZXM6IFtDYXRhbG9nLCBJbXByaW50LCBDT1JFX0RJUkVDVElWRVMsIFJvdXRlckxpbmssIE1PREFMX0RJUkVDVElWRVMgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuQENhbkFjdGl2YXRlKGNhbkNvbm5lY3QpXG5leHBvcnQgY2xhc3MgSW5kZXggaW1wbGVtZW50cyBPbkFjdGl2YXRlLCBDYW5SZXVzZSB7XG4gICAgcHJpdmF0ZSBpbXBvcnRSdW5GaWxlOiBzdHJpbmcgPSBTdHJpbmcuRU1QVFk7XG4gICAgcHJpdmF0ZSBpbXBvcnRSdW5FcnJvcjogRXJyb3IgPSBudWxsO1xuICAgIHByaXZhdGUgaW1wb3J0UnVuRXJyb3JNZXNzYWdlOiBzdHJpbmcgPSBTdHJpbmcuRU1QVFk7XG5cbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyO1xuICAgIHByaXZhdGUgZmFjZXQ6IElGYWNldDtcbiAgICBwcml2YXRlIHJ1blNlcnZpY2U6IFJ1blNlcnZpY2U7XG5cbiAgICBwcml2YXRlIFRFWFQgPSBURVhUO1xuXG4gICAgcHJpdmF0ZSBjYXRhbG9nQXJncyA9IG51bGw7XG5cbiAgICBAVmlld0NoaWxkKENhdGFsb2cpXG4gICAgcHJpdmF0ZSBjYXRhbG9nOiBDYXRhbG9nO1xuXG4gICAgQFZpZXdDaGlsZChNb2RhbERpYWxvZylcbiAgICBwcml2YXRlIGVycm9yRGlhbG9nOiBNb2RhbERpYWxvZztcblxuICAgIEBWaWV3Q2hpbGQoXCJpbnB1dENvbnRhaW5lclwiKVxuICAgIHByaXZhdGUgaW5wdXRDb250YWluZXJSZWY6IEVsZW1lbnRSZWY7XG5cbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICAgIHJvdXRlRGF0YTogUm91dGVEYXRhLFxuICAgICAgICAgICAgICAgIHJ1blNlcnZpY2U6IFJ1blNlcnZpY2UsXG4gICAgICAgICAgICAgICAgc2lsb1NlcnZpY2U6IFNpbG9TZXJ2aWNlPFNpbG9TdGF0ZT4sXG4gICAgICAgICAgICAgICAgcmVuZGVyZXI6IFJlbmRlcmVyKSB7XG4gICAgICAgIHNpbG9TZXJ2aWNlLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRpdGxlOiByb3V0ZURhdGEuZ2V0KFwidGl0bGVcIiksXG4gICAgICAgICAgICBidXR0b25zOiBudWxsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuICAgICAgICB0aGlzLmZhY2V0ID0gcm91dGVEYXRhLmdldChcImZhY2V0XCIpO1xuXG4gICAgICAgIHRoaXMucnVuU2VydmljZSA9IHJ1blNlcnZpY2U7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcblxuICAgICAgICB0aGlzLmNhdGFsb2dBcmdzID0ge1xuICAgICAgICAgICAgdGl0bGU6IG51bGwsXG4gICAgICAgICAgICBzdG9yYWdlSWQ6IHJvdXRlRGF0YS5nZXQoXCJwYWdlSWRcIiksXG4gICAgICAgICAgICBzaG93OiB7XG4gICAgICAgICAgICAgICAgc2VhcmNoQm94OiB0cnVlLFxuICAgICAgICAgICAgICAgIGN1c3RvbWl6ZUJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzcGlubmVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZ0dyaWRPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgY29sdW1uRGVmczogW10sXG4gICAgICAgICAgICAgICAgcm93RGF0YTogW10sXG4gICAgICAgICAgICAgICAgZW5hYmxlU29ydGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbmFibGVGaWx0ZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8gZ3JvdXBLZXlzOiBbXCJzdGF0dXNcIl0sXG4gICAgICAgICAgICAgICAgZ3JvdXBVc2VFbnRpcmVSb3c6IHRydWUsXG4gICAgICAgICAgICAgICAgZ3JvdXBEZWZhdWx0RXhwYW5kZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZW5hYmxlQ29sUmVzaXplOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRvbnRVc2VTY3JvbGxzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0b29sUGFuZWxTdXBwcmVzc1Bpdm90OiB0cnVlLFxuICAgICAgICAgICAgICAgIHRvb2xQYW5lbFN1cHByZXNzVmFsdWVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIC8vIG5vdGU6IHRoZSA0MCBiZWxvdyBuZWVkcyB0byBtYXRjaCB0aGUgNDBweCBpbiBjYXRhbG9nLmNzc1xuICAgICAgICAgICAgICAgIC8vIFRPRE8oYnNraW5uZXIpKDIwMTUtMTItMTEpOiByZWZhY3RvciB0byBtYWtlIGNvZGUgbW9yZSBEUllcbiAgICAgICAgICAgICAgICByb3dIZWlnaHQ6IDQwLFxuICAgICAgICAgICAgICAgIGhlYWRlckhlaWdodDogNDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByb3V0ZXJDYW5SZXVzZShuZXh0LCBwcmV2KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByb3V0ZXJPbkFjdGl2YXRlKG5leHQsIHByZXYpIHtcbiAgICAgICAgY29uc3Qgb25lRmlmdGhTZWNvbmQgPSAyMDA7XG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICB0aGlzLmxvYWRDb250ZW50SW50b0dyaWQuYmluZCh0aGlzLCB0aGlzLmZhY2V0KSxcbiAgICAgICAgICAgIG9uZUZpZnRoU2Vjb25kXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGltcG9ydFJ1bkRlZmluaXRpb24oZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLmdldEZpbGUoKVxuICAgICAgICAgICAgLnRoZW4oZmlsZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbXBvcnRSdW5GaWxlID0gZmlsZS5uYW1lO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1blNlcnZpY2UucGFyc2VDU1YoZmlsZS5yZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdDxEZXNpZ25Nb2RlbD4oZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihkZXNpZ24gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nTmFtZXMgPSB0aGlzLmNhdGFsb2cuZ2V0Q29udGVudEl0ZW1zKCkubWFwKChpdGVtOiB7IG5hbWU6IHN0cmluZzsgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcnVuTmFtZSA9IGRlc2lnbi5ydW4ucnVuTmFtZTtcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlck5hbWUgPSBydW5OYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdOYW1lcy5zb21lKG5hbWUgPT4gbmFtZSA9PT0gbG93ZXJOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Q8RGVzaWduTW9kZWw+KG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBydW4gd2l0aCB0aGUgbmFtZSBcXFwiJXNcXFwiIGFscmVhZHkgZXhpc3RzLlwiLnNwcmludGYocnVuTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucnVuU2VydmljZS5hZGREZXNpZ24oZGVzaWduKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQ29udGVudEludG9HcmlkKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmltcG9ydFJ1bkVycm9yID0gZXJyb3I7XG5cbiAgICAgICAgICAgICAgICBpZiAoUGFyc2VFcnJvci5pcyhlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbXBvcnRSdW5FcnJvck1lc3NhZ2UgPSBcIkVycm9ycyBmb3VuZCBpbiBDU1YgZmlsZSBlbnRyaWVzOlwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoTWlzc2luZ0NvbHVtbnNFcnJvci5pcyhlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbXBvcnRSdW5FcnJvck1lc3NhZ2UgPSBcIlRoZXNlIHJlcXVpcmVkIGNvbHVtbnMgYXJlIG1pc3Npbmc6XCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbXBvcnRSdW5FcnJvck1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JEaWFsb2cuc2hvdygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkxpbmtDZWxsQ2xpY2soZXZlbnQ6IElMaW5rQ2VsbENsaWNrRXZlbnQpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiRWRpdFJ1blwiLCB7IGlkOiBldmVudC5pdGVtSWQgfV0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZENvbnRlbnRJbnRvR3JpZCgpIHtcbiAgICAgICAgdGhpcy5jYXRhbG9nQXJncy5maWx0ZXJCYXJBcmdzID0gbnVsbDtcblxuICAgICAgICBjb25zdCBmYWNldCA9IHRoaXMucnVuU2VydmljZS5ydW5EZXNpZ25GYWNldDtcbiAgICAgICAgdGhpcy5jYXRhbG9nLnNldFNjaGVtYVByb3BlcnRpZXMoXG4gICAgICAgICAgICBmYWNldC5mcmFtZS5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgZmFjZXQuZGVmYXVsdENvbHVtbnMsXG4gICAgICAgICAgICBmYWNldC5hZGRpdGlvbmFsQ29sdW1ucyk7XG4gICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5ydW5TZXJ2aWNlLmdldERlc2lnbnMoKTtcbiAgICAgICAgdGhpcy5jYXRhbG9nLnNldENvbnRlbnRJdGVtcyhwcm9taXNlLCBudWxsLCBmYWNldC5pbml0aWFsU29ydCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRGaWxlKCk6IFByb21pc2U8SW1wb3J0RmlsZT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQobnVsbCwgXCJpbnB1dFwiKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZShpbnB1dCwgXCJ0eXBlXCIsIFwiZmlsZVwiKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucHJvamVjdE5vZGVzKHRoaXMuaW5wdXRDb250YWluZXJSZWYubmF0aXZlRWxlbWVudCwgW2lucHV0XSk7XG5cbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBpbnB1dC5maWxlc1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmRldGFjaFZpZXcoW2lucHV0XSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgICAgIHJlYWRlci5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWFkZXIuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgUmVhZEVycm9yKHJlYWRlci5lcnJvci50b1N0cmluZygpLCBmaWxlLm5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogcmVhZGVyLnJlc3VsdFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpbnB1dC5jbGljaygpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=