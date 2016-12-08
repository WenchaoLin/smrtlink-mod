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
var router_1 = require("angular2/router");
var status_1 = require("../../navigation/status");
var modal_1 = require("athenaeum/components/modal/modal");
var error_factory_1 = require("athenaeum/common/errors/error-factory");
var error_service_1 = require("../error/error-service");
var catalog_1 = require("athenaeum/components/catalog/catalog");
var menu_1 = require("athenaeum/components/menu/menu");
var menu_button_1 = require("athenaeum/components/menu/menu-button");
var imprint_1 = require("../../directives/imprint");
var stamp_1 = require("../../strings/stamp");
var text_1 = require("../../strings/en-us/text");
var stash_1 = require("../../data/io/stash");
var job_1 = require("../../data/facets/job");
var job_service_1 = require("../../data/services/job-service");
var dataset_type_1 = require("../../data/dataset-type");
var file_chooser_modal_1 = require("athenaeum/components/file-chooser/file-chooser-modal");
var Explorer = (function () {
    function Explorer(cdr, router, routeData, stash, jobService) {
        this.STAMP = stamp_1.STAMP;
        this.TEXT = text_1.TEXT;
        this.importRootPath = String.EMPTY;
        this.importTitle = String.EMPTY;
        this.initiallyEmpty = false;
        this.router = router;
        this.routeData = routeData;
        this.cdr = cdr;
        this.jobService = jobService;
        this.facet = routeData.get("facet");
        this.detailsPage = routeData.get("detailsPage");
        this.stash = stash;
    }
    Explorer.prototype.ngOnInit = function () {
        this.initializeViewVariables();
        this.initializeCatalogArgs();
    };
    Explorer.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.configureCatalog();
        if (this.facet !== job_1.JOB_FACET) {
            this.loadContentIntoCatalog();
        }
        this.cdr.detectChanges();
        this.chooser.errorEvent.subscribe(function (error) {
            if (error instanceof error_factory_1.UnauthorizedError) {
                _this.router.navigate(["/Login"]);
            }
            else {
                throw error;
            }
        });
    };
    Explorer.prototype.routerOnActivate = function () {
        var _this = this;
        if (this.facet === job_1.JOB_FACET) {
            return this.jobService.getResolvedPipelineTemplates()
                .then(function (map) {
                _this.pipelineTemplateMap = map;
                return _this.loadContentIntoCatalog();
            });
        }
    };
    Explorer.prototype.routerOnDeactivate = function () {
        var _this = this;
        return modal_1.ModalDialog.hideDialogs([
            this.modal
        ]).then(function () {
            return new Promise(function (resolve) {
                if (_this.chooser.isHidden) {
                    resolve();
                    return;
                }
                _this.chooser.hiddenEvent.take(1).subscribe(function () { resolve(); });
                _this.chooser.hide();
            });
        });
    };
    Explorer.prototype.doImport = function (value) {
        var _this = this;
        if (value) {
            var datasetType_1 = dataset_type_1.DatasetType[value];
            if (Boolean(datasetType_1)) {
                this.importRootPath = "";
                this.importRootPath = "/pbi";
                this.importTitle = datasetType_1.browseForTitle;
                this.chooser.fileFilterFn = function (file) {
                    var extensions = datasetType_1.filter.split(",");
                    return Boolean(extensions.find(function (extension) { return file.name.endsWith(extension); }));
                };
                var chosenFn_1 = function (file) {
                    _this.jobService
                        .import(file.path, datasetType_1.filetype)
                        .then(function (job) {
                        setTimeout(function () {
                            _this.router.navigate([
                                "/Analysis",
                                "Job",
                                { id: job.id }
                            ]);
                        }, 100);
                    })
                        .catch(function (response) {
                        if (response instanceof error_factory_1.UnauthorizedError) {
                            _this.router.navigate(["/Login"]);
                        }
                        else {
                            _this.errorMessage = error_service_1.ErrorService.messageForError(response);
                            _this.openModal();
                        }
                    });
                };
                var sub_1 = this.chooser.fileChosen.subscribe(function (file) { return chosenFn_1(file); });
                this.chooser.hiddenEvent.take(1).subscribe(function () {
                    sub_1.unsubscribe();
                    sub_1 = null;
                });
                this.chooser.show();
            }
        }
    };
    Explorer.prototype.openModal = function () {
        this.modal.show();
    };
    Explorer.prototype.importFile = function () {
        var inputField = document.getElementById("pb-import-file-input");
        inputField.click();
    };
    Explorer.prototype.routerCanReuse = function (next, prev) {
        return false;
    };
    Explorer.prototype.initializeViewVariables = function () {
        this.vm = {
            title: this.routeData.get("title"),
            selectedItem: null,
            showRecords: true,
            show: {
                controls: this.routeData.get("explorerControls")
            }
        };
    };
    Explorer.prototype.initializeCatalogArgs = function () {
        this.vm.catalogArgs = {
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
                groupUseEntireRow: true,
                groupDefaultExpanded: true,
                enableColResize: true,
                dontUseScrolls: false,
                toolPanelSuppressPivot: true,
                toolPanelSuppressValues: true,
                rowHeight: 40,
                headerHeight: 40
            }
        };
    };
    Explorer.prototype.configureCatalog = function () {
        var _this = this;
        var JOB_STATE_FILTERBAR_ARGS = {
            // TODO(bskinner)(2015-09-16): this should not be hard-coded here
            // we should be getting this info from the Frame (schema)
            property: "state",
            items: [
                { label: "Created", checked: true, field: "CREATED" },
                { label: "Running", checked: true, field: "RUNNING" },
                { label: "Submitted", checked: true, field: "SUBMITTED" },
                { label: "Terminated", checked: true, field: "TERMINATED" },
                { label: "Successful", checked: true, field: "SUCCESSFUL" },
                { label: "Failed", checked: true, field: "FAILED" }
            ]
        };
        if (this.facet === job_1.JOB_FACET) {
            this.vm.catalogArgs.filterBarArgs = JOB_STATE_FILTERBAR_ARGS;
        }
        else {
            this.vm.catalogArgs.filterBarArgs = null;
        }
        var properties = Object.assign({}, this.facet.frame.properties);
        if (this.facet === job_1.JOB_FACET) {
            properties["pipelineId"] = Object.assign({}, properties["pipelineId"], {
                cellRenderer: function (params) {
                    var template = _this.pipelineTemplateMap.get(params.value);
                    if (template) {
                        return template.name;
                    }
                    return params.value;
                }
            });
        }
        this.catalog.setSchemaProperties(properties, this.facet.defaultColumns, this.facet.additionalColumns);
    };
    Explorer.prototype.loadContentIntoCatalog = function () {
        var promise = this.stash.getAllItems(this.facet.frame);
        this.catalog.setContentItems(promise, null, this.facet.initialSort);
        return promise;
    };
    Explorer.prototype.onLinkCellClick = function (event) {
        this.router.navigate([("../" + this.detailsPage), { id: event.itemId }]);
    };
    __decorate([
        core_1.ViewChild("errors"), 
        __metadata('design:type', modal_1.ModalDialog)
    ], Explorer.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild("catalog"), 
        __metadata('design:type', catalog_1.Catalog)
    ], Explorer.prototype, "catalog", void 0);
    __decorate([
        core_1.ViewChild("chooser"), 
        __metadata('design:type', file_chooser_modal_1.FileChooserModal)
    ], Explorer.prototype, "chooser", void 0);
    Explorer = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "explorer",
            host: {
                "[class.home]": "vm.show.controls.createNewAnalysis",
                "class": "simple-table"
            },
            templateUrl: "explorer.html",
            styleUrls: [
                "explorer.css",
                "../../css/simple-table.css"
            ],
            directives: [
                catalog_1.Catalog, imprint_1.Imprint, router_1.RouterLink, menu_1.MENU_DIRECTIVES, menu_button_1.MenuButton,
                file_chooser_modal_1.FileChooserModal, modal_1.MODAL_DIRECTIVES
            ],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        router_1.CanActivate(status_1.canConnect), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, router_1.Router, router_1.RouteData, stash_1.Stash, job_service_1.JobService])
    ], Explorer);
    return Explorer;
}());
exports.Explorer = Explorer;
// === Additional propsed functionality ===
// routerOnDeactivate(next, prev)   { console.log("onDeactivate") }
// routerOnReuse(next, prev)       { console.log("onReuse") }
// routerCanDeactivate(next, prev) { console.log("canDeactivate") }
/* ******************************************************************
  * TODO(bskinner): Port these old Portal features
doStart() {
    let message = "";
    if (this.countOfNotStartedJobs === 1) {
        // TODO(bskinner): don't hard-code "name"
        message = `Start analysis: ${this.selectedItem.name}?`;
    } else {
        message = `Start ${this.countOfNotStartedJobs} analyses?`;
    }
    this.$window.confirm(message);
}

doStop() {
    let message = "";
    if (this.countOfStoppableJobs === 1) {
        // TODO(bskinner): don't hard-code "name"
        message = `Stop analysis: ${this.selectedItem.name}?`;
    } else {
        message = `Stop ${this.countOfStoppableJobs} analyses?`;
    }
    this.$window.confirm(message);
}

doDelete() {
    let message = "",
            name;
    if (this.selectedItems.length === 1) {
        // TODO(bskinner): don't hard-code "name" and "filename"
        name = this.selectedItem.name ||
                this.selectedItem.filename;
        message = `Delete: ${name}?`;
    } else {
        message = `Delete ${this.selectedItems.length} items?`;
    }
    this.$window.confirm(message);
}

private onAnalysisSelectionChange(selectedItems) {
    this.countOfNotStartedJobs = 0;
    this.countOfStoppableJobs = 0;
    this.canStartSelectedItem = false;
    this.canStopSelectedItem = false;

    for (let candidate of selectedItems) {
        // TODO(bskinner): DO NOT HARD-CODE the status values
        // "Not Started", "Queued", "Running", etc.
        if (candidate.status === "Not Started") {
            this.countOfNotStartedJobs++;
            this.canStartSelectedItem = true;
        }
        if (candidate.status === "Queued" ||
                candidate.status === "Running") {
            this.countOfStoppableJobs++;
            this.canStopSelectedItem = true;
        }
    }
}
  */
/* *******************************************************************/

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9hbmFseXNpcy9leHBsb3Jlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7Ozs7Ozs7Ozs7O0FBRUgscUJBRU8sZUFBZSxDQUFDLENBQUE7QUFFdkIsdUJBRU8saUJBQWlCLENBQUMsQ0FBQTtBQUN6Qix1QkFBeUIseUJBQXlCLENBQUMsQ0FBQTtBQUVuRCxzQkFBNEMsa0NBQWtDLENBQUMsQ0FBQTtBQUMvRSw4QkFBZ0MsdUNBQXVDLENBQUMsQ0FBQTtBQUV4RSw4QkFBMkIsd0JBQXdCLENBQUMsQ0FBQTtBQUVwRCx3QkFFTyxzQ0FBc0MsQ0FBQyxDQUFBO0FBRTlDLHFCQUE4QixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQy9ELDRCQUF5Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBRWpFLHdCQUFzQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ2pELHNCQUFvQixxQkFBcUIsQ0FBQyxDQUFBO0FBQzFDLHFCQUFtQiwwQkFBMEIsQ0FBQyxDQUFBO0FBRTlDLHNCQUFvQixxQkFBcUIsQ0FBQyxDQUFBO0FBSzFDLG9CQUF3Qix1QkFBdUIsQ0FBQyxDQUFBO0FBRWhELDRCQUEyQyxpQ0FBaUMsQ0FBQyxDQUFBO0FBQzdFLDZCQUEwQix5QkFBeUIsQ0FBQyxDQUFBO0FBR3BELG1DQUErQixzREFBc0QsQ0FBQyxDQUFBO0FBMEN0RjtJQTBCSSxrQkFBWSxHQUFzQixFQUN0QixNQUFjLEVBQ2QsU0FBb0IsRUFDcEIsS0FBWSxFQUNaLFVBQXNCO1FBN0IzQixVQUFLLEdBQUcsYUFBSyxDQUFDO1FBQ2QsU0FBSSxHQUFHLFdBQUksQ0FBQztRQUlaLG1CQUFjLEdBQVcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN0QyxnQkFBVyxHQUFXLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFPbEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFrQjNCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFD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LGlCQUFPLEVBQUUsaUJBQU8sRUFBRSxtQkFBVSxFQUFFLHNCQUFlLEVBQUUsd0JBQVU7Z0JBQ3pELHFDQUFnQixFQUFFLHdCQUFnQjthQUNyQztZQUNELGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3hDLENBQUM7UUFDRCxvQkFBVyxDQUFDLG1CQUFVLENBQUM7O2dCQUFBO0lBeVB4QixlQUFDO0FBQUQsQ0F4UEEsQUF3UEMsSUFBQTtBQXhQWSxnQkFBUSxXQXdQcEIsQ0FBQTtBQUtELDJDQUEyQztBQUUzQyxtRUFBbUU7QUFDbkUsNkRBQTZEO0FBQzdELG1FQUFtRTtBQUVuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTBESTtBQUVKLHVFQUF1RSIsImZpbGUiOiJhcHAvc2lsb3MvYW5hbHlzaXMvZXhwbG9yZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge1xuICAgIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIFZpZXdDaGlsZCwgUXVlcnlMaXN0LCBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcbmltcG9ydCB7XG4gICAgUm91dGVyTGluaywgUm91dGVyLCBSb3V0ZURhdGEsIENhbkFjdGl2YXRlLCBPbkFjdGl2YXRlLCBDYW5SZXVzZVxufSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge2NhbkNvbm5lY3R9IGZyb20gXCIuLi8uLi9uYXZpZ2F0aW9uL3N0YXR1c1wiO1xuXG5pbXBvcnQge01PREFMX0RJUkVDVElWRVMsIE1vZGFsRGlhbG9nfSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvbW9kYWwvbW9kYWxcIjtcbmltcG9ydCB7VW5hdXRob3JpemVkRXJyb3J9IGZyb20gXCJhdGhlbmFldW0vY29tbW9uL2Vycm9ycy9lcnJvci1mYWN0b3J5XCI7XG5cbmltcG9ydCB7RXJyb3JTZXJ2aWNlfSBmcm9tIFwiLi4vZXJyb3IvZXJyb3Itc2VydmljZVwiO1xuXG5pbXBvcnQge1xuICAgIENhdGFsb2csIElMaW5rQ2VsbENsaWNrRXZlbnQsIElQYkFyZ3Ncbn0gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL2NhdGFsb2cvY2F0YWxvZ1wiO1xuXG5pbXBvcnQge01FTlVfRElSRUNUSVZFU30gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL21lbnUvbWVudVwiO1xuaW1wb3J0IHtNZW51QnV0dG9ufSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvbWVudS9tZW51LWJ1dHRvblwiO1xuXG5pbXBvcnQge0ltcHJpbnR9IGZyb20gXCIuLi8uLi9kaXJlY3RpdmVzL2ltcHJpbnRcIjtcbmltcG9ydCB7U1RBTVB9IGZyb20gXCIuLi8uLi9zdHJpbmdzL3N0YW1wXCI7XG5pbXBvcnQge1RFWFR9IGZyb20gXCIuLi8uLi9zdHJpbmdzL2VuLXVzL3RleHRcIjtcblxuaW1wb3J0IHtTdGFzaH0gZnJvbSBcIi4uLy4uL2RhdGEvaW8vc3Rhc2hcIjtcblxuaW1wb3J0IHtTSUxPfSBmcm9tIFwiLi4vc2lsb1wiO1xuXG5pbXBvcnQge0lGYWNldH0gZnJvbSBcIi4uLy4uL2RhdGEvZmFjZXRzL2ZhY2V0XCI7XG5pbXBvcnQge0pPQl9GQUNFVH0gZnJvbSBcIi4uLy4uL2RhdGEvZmFjZXRzL2pvYlwiO1xuXG5pbXBvcnQge0pvYlNlcnZpY2UsIFBpcGVsaW5lVGVtcGxhdGV9IGZyb20gXCIuLi8uLi9kYXRhL3NlcnZpY2VzL2pvYi1zZXJ2aWNlXCI7XG5pbXBvcnQge0RhdGFzZXRUeXBlfSBmcm9tIFwiLi4vLi4vZGF0YS9kYXRhc2V0LXR5cGVcIjtcblxuaW1wb3J0IHtGaWxlTW9kZWx9IGZyb20gXCJhdGhlbmFldW0vZGF0YS9tb2RlbHMvbHMtbW9kZWxcIjtcbmltcG9ydCB7RmlsZUNob29zZXJNb2RhbH0gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL2ZpbGUtY2hvb3Nlci9maWxlLWNob29zZXItbW9kYWxcIjtcblxuaW50ZXJmYWNlIElWbSB7XG4gICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgc2VsZWN0ZWRJdGVtPzogYW55O1xuICAgIHNob3dSZWNvcmRzPzogYm9vbGVhbjtcbiAgICBzaG93PzogSVNob3c7XG4gICAgY2F0YWxvZ0FyZ3M/OiBJUGJBcmdzO1xufVxuXG5pbnRlcmZhY2UgSVNob3cge1xuICAgIGNvbnRyb2xzPzogSUNvbnRyb2w7XG59XG5cbmludGVyZmFjZSBJQ29udHJvbCB7XG4gICAgY3JlYXRlTmV3QW5hbHlzaXM/OiBib29sZWFuO1xuICAgIGNyZWF0ZU5ld0RhdGFTZXQ/OiBib29sZWFuO1xuICAgIGltcG9ydEV4cG9ydEFyY2hpdmVSZXN0b3JlPzogYm9vbGVhbjtcbiAgICBkYXRhc2V0QnV0dG9ucz86IGJvb2xlYW47XG4gICAgdmlld0RldGFpbHNDb3B5RGVsZXRlPzogYm9vbGVhbjtcbiAgICBzdGFydFN0b3A/OiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiBcImV4cGxvcmVyXCIsXG4gICAgaG9zdDoge1xuICAgICAgICBcIltjbGFzcy5ob21lXVwiOiBcInZtLnNob3cuY29udHJvbHMuY3JlYXRlTmV3QW5hbHlzaXNcIixcbiAgICAgICAgXCJjbGFzc1wiOiBcInNpbXBsZS10YWJsZVwiXG4gICAgfSxcbiAgICB0ZW1wbGF0ZVVybDogXCJleHBsb3Jlci5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgIFwiZXhwbG9yZXIuY3NzXCIsXG4gICAgICAgICBcIi4uLy4uL2Nzcy9zaW1wbGUtdGFibGUuY3NzXCJcbiAgICBdLFxuICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgQ2F0YWxvZywgSW1wcmludCwgUm91dGVyTGluaywgTUVOVV9ESVJFQ1RJVkVTLCBNZW51QnV0dG9uLFxuICAgICAgICBGaWxlQ2hvb3Nlck1vZGFsLCBNT0RBTF9ESVJFQ1RJVkVTXG4gICAgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuQENhbkFjdGl2YXRlKGNhbkNvbm5lY3QpXG5leHBvcnQgY2xhc3MgRXhwbG9yZXIgaW1wbGVtZW50cyBDYW5SZXVzZSwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgcHVibGljIFNUQU1QID0gU1RBTVA7XG4gICAgcHVibGljIFRFWFQgPSBURVhUO1xuICAgIHB1YmxpYyB2bTogSVZtO1xuXG4gICAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBpbXBvcnRSb290UGF0aDogc3RyaW5nID0gU3RyaW5nLkVNUFRZO1xuICAgIHB1YmxpYyBpbXBvcnRUaXRsZTogc3RyaW5nID0gU3RyaW5nLkVNUFRZO1xuXG4gICAgQFZpZXdDaGlsZChcImVycm9yc1wiKSBwdWJsaWMgbW9kYWw6IE1vZGFsRGlhbG9nO1xuICAgIEBWaWV3Q2hpbGQoXCJjYXRhbG9nXCIpIHB1YmxpYyBjYXRhbG9nOiBDYXRhbG9nO1xuXG4gICAgQFZpZXdDaGlsZChcImNob29zZXJcIikgcHJpdmF0ZSBjaG9vc2VyOiBGaWxlQ2hvb3Nlck1vZGFsO1xuXG4gICAgcHJpdmF0ZSBpbml0aWFsbHlFbXB0eSA9IGZhbHNlO1xuICAgIHByaXZhdGUgZmFjZXQ6IElGYWNldDtcbiAgICBwcml2YXRlIGRldGFpbHNQYWdlOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIGpvYlNlcnZpY2U6IEpvYlNlcnZpY2U7XG4gICAgcHJpdmF0ZSBzdGFzaDtcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyO1xuICAgIHByaXZhdGUgcm91dGVEYXRhOiBSb3V0ZURhdGE7XG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmO1xuXG4gICAgcHJpdmF0ZSBwaXBlbGluZVRlbXBsYXRlTWFwOiBNYXA8c3RyaW5nLCBQaXBlbGluZVRlbXBsYXRlPjtcblxuICAgIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcm91dGVEYXRhOiBSb3V0ZURhdGEsXG4gICAgICAgICAgICAgICAgc3Rhc2g6IFN0YXNoLFxuICAgICAgICAgICAgICAgIGpvYlNlcnZpY2U6IEpvYlNlcnZpY2UpIHtcblxuICAgICAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcbiAgICAgICAgdGhpcy5yb3V0ZURhdGEgPSByb3V0ZURhdGE7XG4gICAgICAgIHRoaXMuY2RyID0gY2RyO1xuICAgICAgICB0aGlzLmpvYlNlcnZpY2UgPSBqb2JTZXJ2aWNlO1xuXG4gICAgICAgIHRoaXMuZmFjZXQgPSByb3V0ZURhdGEuZ2V0KFwiZmFjZXRcIik7XG4gICAgICAgIHRoaXMuZGV0YWlsc1BhZ2UgPSByb3V0ZURhdGEuZ2V0KFwiZGV0YWlsc1BhZ2VcIik7XG4gICAgICAgIHRoaXMuc3Rhc2ggPSBzdGFzaDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplVmlld1ZhcmlhYmxlcygpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVDYXRhbG9nQXJncygpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmVDYXRhbG9nKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZmFjZXQgIT09IEpPQl9GQUNFVCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkQ29udGVudEludG9DYXRhbG9nKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAgICAgdGhpcy5jaG9vc2VyLmVycm9yRXZlbnQuc3Vic2NyaWJlKGVycm9yID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFVuYXV0aG9yaXplZEVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWyBcIi9Mb2dpblwiIF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcm91dGVyT25BY3RpdmF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmFjZXQgPT09IEpPQl9GQUNFVCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuam9iU2VydmljZS5nZXRSZXNvbHZlZFBpcGVsaW5lVGVtcGxhdGVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4obWFwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGlwZWxpbmVUZW1wbGF0ZU1hcCA9IG1hcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRDb250ZW50SW50b0NhdGFsb2coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByb3V0ZXJPbkRlYWN0aXZhdGUoKSB7XG4gICAgICAgIHJldHVybiBNb2RhbERpYWxvZy5oaWRlRGlhbG9ncyhbXG4gICAgICAgICAgICB0aGlzLm1vZGFsXG4gICAgICAgIF0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNob29zZXIuaXNIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2hvb3Nlci5oaWRkZW5FdmVudC50YWtlKDEpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyByZXNvbHZlKCk7IH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hvb3Nlci5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRvSW1wb3J0KHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldFR5cGUgPSBEYXRhc2V0VHlwZVt2YWx1ZV07XG4gICAgICAgICAgICBpZiAoQm9vbGVhbihkYXRhc2V0VHlwZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltcG9ydFJvb3RQYXRoID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmltcG9ydFJvb3RQYXRoID0gXCIvcGJpXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pbXBvcnRUaXRsZSA9IGRhdGFzZXRUeXBlLmJyb3dzZUZvclRpdGxlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hvb3Nlci5maWxlRmlsdGVyRm4gPSAoZmlsZTogRmlsZU1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbnMgPSBkYXRhc2V0VHlwZS5maWx0ZXIuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQm9vbGVhbihcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbnMuZmluZChleHRlbnNpb24gPT4gZmlsZS5uYW1lLmVuZHNXaXRoKGV4dGVuc2lvbikpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNob3NlbkZuID0gKGZpbGU6IEZpbGVNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmpvYlNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pbXBvcnQoZmlsZS5wYXRoLCBkYXRhc2V0VHlwZS5maWxldHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGpvYiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiL0FuYWx5c2lzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJKb2JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiBqb2IuaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBVbmF1dGhvcml6ZWRFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbIFwiL0xvZ2luXCIgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBFcnJvclNlcnZpY2UubWVzc2FnZUZvckVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuTW9kYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgbGV0IHN1YiA9IHRoaXMuY2hvb3Nlci5maWxlQ2hvc2VuLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKGZpbGU6IEZpbGVNb2RlbCkgPT4gY2hvc2VuRm4oZmlsZSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hvb3Nlci5oaWRkZW5FdmVudC50YWtlKDEpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNob29zZXIuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW5Nb2RhbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGltcG9ydEZpbGUoKSB7XG4gICAgICAgIGxldCBpbnB1dEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYi1pbXBvcnQtZmlsZS1pbnB1dFwiKTtcbiAgICAgICAgaW5wdXRGaWVsZC5jbGljaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyByb3V0ZXJDYW5SZXVzZShuZXh0LCBwcmV2KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRpYWxpemVWaWV3VmFyaWFibGVzKCkge1xuICAgICAgICB0aGlzLnZtID0ge1xuICAgICAgICAgICAgdGl0bGU6IHRoaXMucm91dGVEYXRhLmdldChcInRpdGxlXCIpLFxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtOiBudWxsLFxuICAgICAgICAgICAgc2hvd1JlY29yZHM6IHRydWUsXG4gICAgICAgICAgICBzaG93OiB7XG4gICAgICAgICAgICAgICAgY29udHJvbHM6IHRoaXMucm91dGVEYXRhLmdldChcImV4cGxvcmVyQ29udHJvbHNcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRpYWxpemVDYXRhbG9nQXJncygpIHtcbiAgICAgIHRoaXMudm0uY2F0YWxvZ0FyZ3MgPSB7XG4gICAgICAgICAgICB0aXRsZTogbnVsbCxcbiAgICAgICAgICAgIHN0b3JhZ2VJZDogdGhpcy5yb3V0ZURhdGEuZ2V0KFwicGFnZUlkXCIpLFxuICAgICAgICAgICAgc2hvdzoge1xuICAgICAgICAgICAgICAgIHNlYXJjaEJveDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjdXN0b21pemVCdXR0b246IHRydWUsXG4gICAgICAgICAgICAgICAgc3Bpbm5lcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWdHcmlkT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGNvbHVtbkRlZnM6IFtdLFxuICAgICAgICAgICAgICAgIHJvd0RhdGE6IFtdLFxuICAgICAgICAgICAgICAgIGVuYWJsZVNvcnRpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgZW5hYmxlRmlsdGVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIGdyb3VwVXNlRW50aXJlUm93OiB0cnVlLFxuICAgICAgICAgICAgICAgIGdyb3VwRGVmYXVsdEV4cGFuZGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVuYWJsZUNvbFJlc2l6ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkb250VXNlU2Nyb2xsczogZmFsc2UsXG4gICAgICAgICAgICAgICAgdG9vbFBhbmVsU3VwcHJlc3NQaXZvdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0b29sUGFuZWxTdXBwcmVzc1ZhbHVlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICByb3dIZWlnaHQ6IDQwLFxuICAgICAgICAgICAgICAgIGhlYWRlckhlaWdodDogNDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbmZpZ3VyZUNhdGFsb2coKSB7XG4gICAgICBjb25zdCBKT0JfU1RBVEVfRklMVEVSQkFSX0FSR1MgPSB7XG4gICAgICAgICAgLy8gVE9ETyhic2tpbm5lcikoMjAxNS0wOS0xNik6IHRoaXMgc2hvdWxkIG5vdCBiZSBoYXJkLWNvZGVkIGhlcmVcbiAgICAgICAgICAvLyB3ZSBzaG91bGQgYmUgZ2V0dGluZyB0aGlzIGluZm8gZnJvbSB0aGUgRnJhbWUgKHNjaGVtYSlcbiAgICAgICAgICBwcm9wZXJ0eTogXCJzdGF0ZVwiLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtsYWJlbDogXCJDcmVhdGVkXCIsIGNoZWNrZWQ6IHRydWUsIGZpZWxkOiBcIkNSRUFURURcIn0sXG4gICAgICAgICAgICAgIHtsYWJlbDogXCJSdW5uaW5nXCIsIGNoZWNrZWQ6IHRydWUsIGZpZWxkOiBcIlJVTk5JTkdcIn0sXG4gICAgICAgICAgICAgIHtsYWJlbDogXCJTdWJtaXR0ZWRcIiwgY2hlY2tlZDogdHJ1ZSwgZmllbGQ6IFwiU1VCTUlUVEVEXCJ9LFxuICAgICAgICAgICAgICB7bGFiZWw6IFwiVGVybWluYXRlZFwiLCBjaGVja2VkOiB0cnVlLCBmaWVsZDogXCJURVJNSU5BVEVEXCJ9LFxuICAgICAgICAgICAgICB7bGFiZWw6IFwiU3VjY2Vzc2Z1bFwiLCBjaGVja2VkOiB0cnVlLCBmaWVsZDogXCJTVUNDRVNTRlVMXCJ9LFxuICAgICAgICAgICAgICB7bGFiZWw6IFwiRmFpbGVkXCIsIGNoZWNrZWQ6IHRydWUsIGZpZWxkOiBcIkZBSUxFRFwifVxuICAgICAgICAgIF1cbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5mYWNldCA9PT0gSk9CX0ZBQ0VUKSB7XG4gICAgICAgICAgdGhpcy52bS5jYXRhbG9nQXJncy5maWx0ZXJCYXJBcmdzID0gSk9CX1NUQVRFX0ZJTFRFUkJBUl9BUkdTO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZtLmNhdGFsb2dBcmdzLmZpbHRlckJhckFyZ3MgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5mYWNldC5mcmFtZS5wcm9wZXJ0aWVzKTtcbiAgICAgIGlmICh0aGlzLmZhY2V0ID09PSBKT0JfRkFDRVQpIHtcbiAgICAgICAgICBwcm9wZXJ0aWVzW1wicGlwZWxpbmVJZFwiXSA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICBwcm9wZXJ0aWVzW1wicGlwZWxpbmVJZFwiXSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY2VsbFJlbmRlcmVyOiAocGFyYW1zOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMucGlwZWxpbmVUZW1wbGF0ZU1hcC5nZXQocGFyYW1zLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbXMudmFsdWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNhdGFsb2cuc2V0U2NoZW1hUHJvcGVydGllcyhwcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWNldC5kZWZhdWx0Q29sdW1ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmFjZXQuYWRkaXRpb25hbENvbHVtbnMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZENvbnRlbnRJbnRvQ2F0YWxvZygpIHtcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLnN0YXNoLmdldEFsbEl0ZW1zKHRoaXMuZmFjZXQuZnJhbWUpO1xuICAgICAgICB0aGlzLmNhdGFsb2cuc2V0Q29udGVudEl0ZW1zKHByb21pc2UsIG51bGwsIHRoaXMuZmFjZXQuaW5pdGlhbFNvcnQpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTGlua0NlbGxDbGljayhldmVudDogSUxpbmtDZWxsQ2xpY2tFdmVudCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbYC4uLyR7dGhpcy5kZXRhaWxzUGFnZX1gLCB7IGlkOiBldmVudC5pdGVtSWQgfV0pO1xuICAgIH1cblxufVxuXG5cblxuXG4vLyA9PT0gQWRkaXRpb25hbCBwcm9wc2VkIGZ1bmN0aW9uYWxpdHkgPT09XG5cbi8vIHJvdXRlck9uRGVhY3RpdmF0ZShuZXh0LCBwcmV2KSAgIHsgY29uc29sZS5sb2coXCJvbkRlYWN0aXZhdGVcIikgfVxuLy8gcm91dGVyT25SZXVzZShuZXh0LCBwcmV2KSAgICAgICB7IGNvbnNvbGUubG9nKFwib25SZXVzZVwiKSB9XG4vLyByb3V0ZXJDYW5EZWFjdGl2YXRlKG5leHQsIHByZXYpIHsgY29uc29sZS5sb2coXCJjYW5EZWFjdGl2YXRlXCIpIH1cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICogVE9ETyhic2tpbm5lcik6IFBvcnQgdGhlc2Ugb2xkIFBvcnRhbCBmZWF0dXJlc1xuZG9TdGFydCgpIHtcbiAgICBsZXQgbWVzc2FnZSA9IFwiXCI7XG4gICAgaWYgKHRoaXMuY291bnRPZk5vdFN0YXJ0ZWRKb2JzID09PSAxKSB7XG4gICAgICAgIC8vIFRPRE8oYnNraW5uZXIpOiBkb24ndCBoYXJkLWNvZGUgXCJuYW1lXCJcbiAgICAgICAgbWVzc2FnZSA9IGBTdGFydCBhbmFseXNpczogJHt0aGlzLnNlbGVjdGVkSXRlbS5uYW1lfT9gO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgPSBgU3RhcnQgJHt0aGlzLmNvdW50T2ZOb3RTdGFydGVkSm9ic30gYW5hbHlzZXM/YDtcbiAgICB9XG4gICAgdGhpcy4kd2luZG93LmNvbmZpcm0obWVzc2FnZSk7XG59XG5cbmRvU3RvcCgpIHtcbiAgICBsZXQgbWVzc2FnZSA9IFwiXCI7XG4gICAgaWYgKHRoaXMuY291bnRPZlN0b3BwYWJsZUpvYnMgPT09IDEpIHtcbiAgICAgICAgLy8gVE9ETyhic2tpbm5lcik6IGRvbid0IGhhcmQtY29kZSBcIm5hbWVcIlxuICAgICAgICBtZXNzYWdlID0gYFN0b3AgYW5hbHlzaXM6ICR7dGhpcy5zZWxlY3RlZEl0ZW0ubmFtZX0/YDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlID0gYFN0b3AgJHt0aGlzLmNvdW50T2ZTdG9wcGFibGVKb2JzfSBhbmFseXNlcz9gO1xuICAgIH1cbiAgICB0aGlzLiR3aW5kb3cuY29uZmlybShtZXNzYWdlKTtcbn1cblxuZG9EZWxldGUoKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSBcIlwiLFxuICAgICAgICAgICAgbmFtZTtcbiAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAvLyBUT0RPKGJza2lubmVyKTogZG9uJ3QgaGFyZC1jb2RlIFwibmFtZVwiIGFuZCBcImZpbGVuYW1lXCJcbiAgICAgICAgbmFtZSA9IHRoaXMuc2VsZWN0ZWRJdGVtLm5hbWUgfHxcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbS5maWxlbmFtZTtcbiAgICAgICAgbWVzc2FnZSA9IGBEZWxldGU6ICR7bmFtZX0/YDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlID0gYERlbGV0ZSAke3RoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGh9IGl0ZW1zP2A7XG4gICAgfVxuICAgIHRoaXMuJHdpbmRvdy5jb25maXJtKG1lc3NhZ2UpO1xufVxuXG5wcml2YXRlIG9uQW5hbHlzaXNTZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0ZWRJdGVtcykge1xuICAgIHRoaXMuY291bnRPZk5vdFN0YXJ0ZWRKb2JzID0gMDtcbiAgICB0aGlzLmNvdW50T2ZTdG9wcGFibGVKb2JzID0gMDtcbiAgICB0aGlzLmNhblN0YXJ0U2VsZWN0ZWRJdGVtID0gZmFsc2U7XG4gICAgdGhpcy5jYW5TdG9wU2VsZWN0ZWRJdGVtID0gZmFsc2U7XG5cbiAgICBmb3IgKGxldCBjYW5kaWRhdGUgb2Ygc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAvLyBUT0RPKGJza2lubmVyKTogRE8gTk9UIEhBUkQtQ09ERSB0aGUgc3RhdHVzIHZhbHVlc1xuICAgICAgICAvLyBcIk5vdCBTdGFydGVkXCIsIFwiUXVldWVkXCIsIFwiUnVubmluZ1wiLCBldGMuXG4gICAgICAgIGlmIChjYW5kaWRhdGUuc3RhdHVzID09PSBcIk5vdCBTdGFydGVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuY291bnRPZk5vdFN0YXJ0ZWRKb2JzKys7XG4gICAgICAgICAgICB0aGlzLmNhblN0YXJ0U2VsZWN0ZWRJdGVtID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FuZGlkYXRlLnN0YXR1cyA9PT0gXCJRdWV1ZWRcIiB8fFxuICAgICAgICAgICAgICAgIGNhbmRpZGF0ZS5zdGF0dXMgPT09IFwiUnVubmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50T2ZTdG9wcGFibGVKb2JzKys7XG4gICAgICAgICAgICB0aGlzLmNhblN0b3BTZWxlY3RlZEl0ZW0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuICAqL1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9