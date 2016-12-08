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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("angular2/core");
var common_1 = require("angular2/common");
var router_1 = require("angular2/router");
var status_1 = require("../../navigation/status");
var error_service_1 = require("../error/error-service");
var io_1 = require("athenaeum/data/api/io");
var endpoint_1 = require("athenaeum/data/api/endpoint");
var http_1 = require("athenaeum/services/http");
var error_factory_1 = require("athenaeum/common/errors/error-factory");
var api_1 = require("../../data/io/api");
var stash_1 = require("../../data/io/stash");
var dataset_type_1 = require("../../data/dataset-type");
var catalog_1 = require("athenaeum/components/catalog/catalog");
var menu_1 = require("athenaeum/components/menu/menu");
var menu_button_1 = require("athenaeum/components/menu/menu-button");
var modal_1 = require("athenaeum/components/modal/modal");
var square_toggle_1 = require("athenaeum/components/square-toggle/square-toggle");
var imprint_1 = require("../../directives/imprint");
var info_1 = require("../../directives/info");
var stamp_1 = require("../../strings/stamp");
var text_1 = require("../../strings/en-us/text");
var pipeline_template_1 = require("../../data/frames/pipeline-template");
var subread_1 = require("../../data/frames/subread");
var hdf_subread_1 = require("../../data/frames/hdf-subread");
var reference_1 = require("../../data/frames/reference");
var job_1 = require("../../data/frames/job");
var barcode_1 = require("../../data/frames/barcode");
var facet_1 = require("../../data/facets/facet");
var property_sort_1 = require("athenaeum/common/property-sort");
var collection_1 = require("../../data/facets/collection");
var preset_1 = require("../../data/facets/preset");
var ATTRIBUTES_FOR_OPTION_TYPE = {
    "pbsmrtpipe.option_types.boolean": {
        inputType: "checkbox"
    },
    "pbsmrtpipe.option_types.float": {
        inputType: "number",
        step: 0.001
    },
    "pbsmrtpipe.option_types.integer": {
        inputType: "number",
        step: 1
    },
    "pbsmrtpipe.option_types.string": {
        inputType: "textarea"
    }
};
var GROUP_NAMES = {
    falcon_ns: "Assembly",
    genomic_consensus: "Consensus",
    kinetics_tools: "Base Mods",
    motif_maker: "Motifs",
    pbalign: "Alignment",
    pbccs: "CCS",
    pblaa: "LAA",
    pbreports: "Reports",
    pbsmrtpipe: "SMRT Pipe",
    pbtranscript: "IsoSeq"
};
var AnalysisSettings = (function () {
    function AnalysisSettings(el, modals, errorService, router, routeParams, formBuilder, io, stash, http) {
        var _this = this;
        this.errorService = errorService;
        this.router = router;
        this.routeParams = routeParams;
        this.formBuilder = formBuilder;
        this.STAMP = stamp_1.STAMP;
        this.TEXT = text_1.TEXT;
        this.vm = {
            form: null,
            basicOptionsGroup: null,
            advancedOptionsGroup: null,
            entryPointsGroup: null,
            preselectedDataSetName: "",
            collectionCatalog: null,
            pipelineOptions: null,
            datasetCatalogs: [],
            presetOptions: null,
            show: {
                presets: false,
                preselectedDataSet: true,
                advancedOptions: false
            },
            includeForms: false,
            basicParameters: [],
            advancedParameters: [],
            errorMessage: ""
        };
        this.defaultAdvancedOptions = null;
        this.rootNode = el.nativeElement;
        this.modals = modals;
        this.vm.basicOptionsGroup = this.formBuilder.group({});
        this.vm.advancedOptionsGroup = this.formBuilder.group({});
        this.vm.entryPointsGroup = this.formBuilder.group({});
        this.vm.form = this.formBuilder.group({
            name: ["", common_1.Validators.required],
            pipelineId: ["", common_1.Validators.required],
            basicOptions: this.vm.basicOptionsGroup,
            advancedOptions: this.vm.advancedOptionsGroup,
            entryPoints: this.vm.entryPointsGroup
        });
        this.stash = stash;
        this.io = io;
        this.http = http;
        this.datasetId = this.routeParams.get("id");
        this.fromDataManagement = (this.routeParams.get("src") || "") === "dm";
        this.hasStarted = false;
        this.vm.show.presets = false;
        this.vm.includeForms = false;
        this.vm.basicParameters = [];
        this.vm.advancedParameters = [];
        this.filterFunction = null;
        this.filterOnFileTypeId = null;
        this.vm.show.preselectedDataSet = false;
        this.vm.collectionCatalog = null;
        var id = this.datasetId;
        var shortName = this.routeParams.get("shortName");
        var datasetType = dataset_type_1.DatasetType.byShortName(shortName);
        var fileTypeId = datasetType.filetype;
        if (shortName && id) {
            this.vm.show.preselectedDataSet = true;
            this.vm.preselectedDataSetName = "Data Set #" + id;
            this.fetchAndDisplayDataSetName(datasetType.endpoint, id);
            this.filterFunction = function (pipeTemplate) {
                if (!pipeTemplate) {
                    return false;
                }
                if ((pipeTemplate.tags.indexOf(pipeline_template_1.PIPELINE_TAG.DEV) >= 0)
                    ||
                        (pipeTemplate.tags.indexOf(pipeline_template_1.PIPELINE_TAG.INTERNAL) >= 0)) {
                    return false;
                }
                if (pipeTemplate.entryPoints) {
                    for (var _i = 0, _a = pipeTemplate.entryPoints; _i < _a.length; _i++) {
                        var entryPoint = _a[_i];
                        if (entryPoint.fileTypeId === _this.filterOnFileTypeId) {
                            return true;
                        }
                    }
                }
                return false;
            };
            this.filterOnFileTypeId = fileTypeId;
            // TODO(bskinner): refactor this with code below & move into Stash
            var collection = collection_1.COLLECTION_FACET;
            collection.frame.endpoint =
                collection.frame.endpoint.and({ $set_type: shortName, $set_int: id });
            this.vm.collectionCatalog = this.createCatalogSpec({
                name: "Collections",
                gridId: "collectioncatalog",
                facet: collection_1.COLLECTION_FACET
            });
        }
        this.vm.datasetCatalogs = [];
        var promise = this.io.getEndpointAsync(api_1.API.nPipelineViewRules);
        promise.then(function (result) {
            _this.pipelineTemplateViewRules = result;
            _this.createPipelineOptions();
        });
        promise.catch(function (error) { return _this.errorService.showError(error); });
    }
    // TODO(bskinner)(2015-10-22): consider moving this to a shared util,
    // and merging it together with the code in app/pipes
    AnalysisSettings.parseValueAsType = function (value, optionType) {
        switch (optionType) {
            case "pbsmrtpipe.option_types.integer":
                return parseInt(value, 10);
            case "pbsmrtpipe.option_types.float":
                return parseFloat(value);
            case "pbsmrtpipe.option_types.boolean":
                return value;
            case "pbsmrtpipe.option_types.string":
                return value;
            default:
                return value;
        }
    };
    AnalysisSettings.prototype.noop = function (value) {
        /* console.log("noop:", value); */
    };
    AnalysisSettings.prototype.doCancel = function () {
        if (this.fromDataManagement) {
            this.router.navigate(["/DataManagement", "DatasetDetail", { datasetId: this.datasetId }]);
        }
        else {
            this.router.navigate(["../Jobs"]);
        }
    };
    AnalysisSettings.prototype.doStart = function (errorDialog) {
        var _this = this;
        var formValue = this.vm.form.value;
        var data = {
            name: formValue.name,
            pipelineId: formValue.pipelineId,
            entryPoints: null,
            taskOptions: null,
            workflowOptions: []
        };
        data.taskOptions = this.allParameters.map(function (parameter) {
            var value = AnalysisSettings.parseValueAsType(parameter.id in formValue.basicOptions ?
                formValue.basicOptions[parameter.id] :
                formValue.advancedOptions[parameter.id], parameter.optionTypeId);
            return {
                optionId: parameter.id,
                optionTypeId: parameter.optionTypeId,
                value: value
            };
        });
        if (this.selectedPipeline.entryPoints) {
            data.entryPoints = this.selectedPipeline.entryPoints.map(function (entryPoint) {
                var result = {};
                for (var key in entryPoint) {
                    if (entryPoint.hasOwnProperty(key)) {
                        result[key] = entryPoint[key];
                    }
                }
                result.datasetId = formValue.entryPoints[result.entryId];
                return result;
            });
        }
        this.hasStarted = true;
        var endpoint = job_1.JOB_FRAME.endpoint;
        // TODO (bforbes)(2016-05-04): During refactor of auth, this needs
        // to be removed once auth headers are sent as part of Http
        var headers = {};
        var token = localStorage.getItem("token");
        if (token && localStorage.getItem("user")) {
            headers["Authorization"] = "Bearer " + token;
        }
        this.http.post(this.io.urlFor(endpoint), data, headers).subscribe(function (jsonData) {
            _this.router.navigate(["../Job", { id: jsonData.id }]);
        }, function (reason) {
            if (reason instanceof error_factory_1.UnauthorizedError) {
                _this.router.navigate(["/Login"]);
            }
            else {
                _this.vm.errorMessage = reason;
                errorDialog.show();
            }
        });
    };
    AnalysisSettings.prototype.canSave = function () {
        return this.canStart();
    };
    AnalysisSettings.prototype.canStart = function () {
        return this.vm.form.valid && !this.hasStarted;
    };
    AnalysisSettings.prototype.fetchAndDisplayDataSetName = function (endpoint, id) {
        var _this = this;
        // TODO(bskinner)(2015-10-25): use endpoint.and({id: id}) instead of:
        var url = endpoint.url() + "/" + id;
        var promise = this.io.getEndpointAsync(new endpoint_1.Endpoint(url));
        promise.then(function (result) {
            _this.vm.preselectedDataSetName =
                result.wellSampleName;
        });
        promise.catch(function (error) { return _this.errorService.showError(error); });
    };
    AnalysisSettings.prototype.createCatalogSpec = function (args) {
        var _this = this;
        var catalogSpec = {
            name: args.name,
            selectionName: "",
            selectedData: null,
            open: false,
            args: null,
            instance: null
        };
        catalogSpec.args = {
            gridId: args.gridId,
            show: {
                searchBox: false,
                customizeButton: false
            },
            agGridOptions: {
                columnDefs: [],
                rowData: [],
                rowSelection: "single",
                toolPanelSuppressPivot: true,
                toolPanelSuppressValues: true,
                // note: the 40 below needs to match the 40px in catalog.css
                // TODO(bskinner)(2015-12-11): refactor to make code more DRY
                rowHeight: 40,
                headerHeight: 40
            },
            registerCatalogInstance: function (catalog, catalogId) {
                catalogSpec.instance = catalog;
                catalog.setSchemaProperties(args.facet.frame.properties, args.facet.defaultColumns, args.facet.additionalColumns);
                if (args.name === "Collections") {
                    args.facet.frame.endpoint = api_1.API.aDatasetDetailsByInt
                        .and({ $set_type: _this.routeParams
                            .get("shortName"),
                        $set_int: _this.routeParams
                            .get("id") });
                }
                var promise = _this.stash.getAllItems(args.facet.frame, args.withParams);
                catalog.setContentItems(promise, args.filterFunction, args.facet.initialSort);
            }
        };
        return catalogSpec;
    };
    AnalysisSettings.prototype.createPipelineOptions = function () {
        var _this = this;
        var pipelineFacet = new facet_1.Facet({
            frame: pipeline_template_1.PIPELINE_TEMPLATE_FRAME,
            defaultColumns: ["name"],
            initialSort: property_sort_1.asc(property_sort_1.value("name"))
        });
        this.stash.getAllItems(pipelineFacet.frame).then(function (result) {
            if (_this.filterFunction) {
                result = result.filter(_this.filterFunction);
            }
            result.sort(pipelineFacet.initialSort);
            _this.vm.pipelineOptions = result;
        });
    };
    AnalysisSettings.prototype.onSelectedPipelineChanged = function (selectedPipeline) {
        var pipelineControl = this.vm.form.find("pipelineId");
        pipelineControl.updateValue(selectedPipeline.id);
        this.showDatasetCatalogsFor(selectedPipeline);
        this.showPresetsFor(selectedPipeline);
        this.showTaskOptionsFor(selectedPipeline);
        this.vm.show.advancedOptions = this.hasAdvancedOptions();
        this.vm.includeForms = true;
    };
    AnalysisSettings.prototype.facetForDatasetType = function (datasetType) {
        switch (datasetType) {
            case dataset_type_1.DatasetType.SUBREAD:
                return new facet_1.Facet({
                    frame: subread_1.SUBREAD_FRAME,
                    defaultColumns: ["name", "cellIndex"]
                });
            case dataset_type_1.DatasetType.HDF_SUBREAD:
                return new facet_1.Facet({
                    frame: hdf_subread_1.HDF_SUBREAD_FRAME,
                    defaultColumns: ["name", "cellIndex"]
                });
            case dataset_type_1.DatasetType.REFERENCE:
                return new facet_1.Facet({
                    frame: reference_1.REFERENCE_FRAME,
                    defaultColumns: ["name", "totalLength", "numRecords"],
                    initialSort: property_sort_1.asc(property_sort_1.valueToLowercase("name"))
                });
            case dataset_type_1.DatasetType.BARCODE:
                return new facet_1.Facet({
                    frame: barcode_1.BARCODE_FRAME,
                    defaultColumns: ["name", "totalLength", "numRecords"],
                    initialSort: property_sort_1.asc(property_sort_1.valueToLowercase("name"))
                });
            default:
                return null;
        }
    };
    AnalysisSettings.prototype.showDatasetCatalogsFor = function (selectedPipeline) {
        var formEntries = {};
        var entryPoints = selectedPipeline.entryPoints;
        this.vm.datasetCatalogs.length = 0;
        if (entryPoints) {
            for (var _i = 0, entryPoints_1 = entryPoints; _i < entryPoints_1.length; _i++) {
                var entryPoint = entryPoints_1[_i];
                var fileTypeId = entryPoint.fileTypeId;
                var filterType = this.filterOnFileTypeId;
                if (filterType && filterType === fileTypeId) {
                    var idAsString = this.routeParams.get("id");
                    formEntries[entryPoint.entryId] = [
                        parseInt(idAsString, 10),
                        common_1.Validators.required
                    ];
                }
                else {
                    var catName = dataset_type_1.DatasetType.byFiletype(fileTypeId).shortName;
                    catName = catName[0].toUpperCase() + catName.substring(1);
                    var catalogId = entryPoint.entryId;
                    var dataset = dataset_type_1.DatasetType.byFiletype(fileTypeId);
                    var facet = this.facetForDatasetType(dataset);
                    var catalog = this.createCatalogSpec({
                        name: catName,
                        gridId: catalogId,
                        facet: facet
                    });
                    catalog.args.show.searchBox = true;
                    catalog.args.show.customizeButton = true;
                    this.vm.datasetCatalogs.push(catalog);
                    formEntries[entryPoint.entryId] = [
                        "",
                        common_1.Validators.required
                    ];
                }
            }
            this.vm.entryPointsGroup = this.formBuilder.group(formEntries);
            this.vm.form.addControl("entryPoints", this.vm.entryPointsGroup);
            this.vm.entryPointsGroup.updateValueAndValidity();
        }
    };
    AnalysisSettings.prototype.showPresetsFor = function (pipeline) {
        var _this = this;
        this.vm.show.presets = false;
        this.stash.getAllItems(preset_1.PRESET_FACET.frame, { $pt_dotdotid: pipeline.id }).then(function (result) {
            if (!result || !result.length) {
                return;
            }
            _this.vm.presetOptions = result;
            _this.vm.show.presets = true;
        }).catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    AnalysisSettings.prototype.onSelectedPresetChanged = function (selectedPreset) {
        if (selectedPreset) {
            this.showTaskOptionsFor(selectedPreset);
            this.vm.show.advancedOptions = this.hasAdvancedOptions();
        }
    };
    AnalysisSettings.prototype.hasAdvancedOptions = function () {
        return !!(this.vm.advancedParameters.length);
    };
    AnalysisSettings.prototype.viewRulesForPipeline = function (pipelineId) {
        for (var _i = 0, _a = this.pipelineTemplateViewRules; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.id === pipelineId) {
                return entry;
            }
        }
        return null;
    };
    // example: taskOption = {
    //      title: "Consolidate .bam",
    //      description: "Merge chunked/gathered .bam files",
    //      id: "pbalign.task_options.consolidate_aligned_bam",
    //      type: "boolean", // or "number" or "string"
    //      optionTypeId: "pbsmrtpipe.option_types.boolean"
    //      default: false
    AnalysisSettings.prototype.fieldSpecForTaskOption = function (taskOption) {
        var attributes = ATTRIBUTES_FOR_OPTION_TYPE[taskOption.optionTypeId];
        var fieldSpec = {
            id: taskOption.id,
            title: taskOption.title,
            description: taskOption.description.split(/\r?\n/).map(function (line) {
                return line.replace(/^\s+/, function (match) {
                    return "&nbsp;".repeat(match.length);
                });
            }).join("<br>"),
            default: taskOption.default,
            inputType: attributes.inputType,
            optionTypeId: taskOption.optionTypeId,
            step: attributes.step
        };
        if (fieldSpec.inputType === "textarea") {
            fieldSpec.rows = fieldSpec.default.split("\n").length;
        }
        return fieldSpec;
    };
    AnalysisSettings.prototype.showTaskOptionsFor = function (pipeline) {
        var _this = this;
        this.allParameters = [];
        var basicFormEntries = {};
        var advancedFormEntries = {};
        if (pipeline.taskOptions && pipeline.taskOptions.properties) {
            var allPropIds_1 = [];
            var basicOptionIds_1 = Object.create(null);
            // Process the pipeline-template-view-rules options before
            // anything else, so that options in pipeline-template-view-rules
            // go to the from of the list in allPropIds.
            var viewRules = this.viewRulesForPipeline(pipeline.id);
            if (viewRules && viewRules.taskOptions) {
                for (var _i = 0, _a = viewRules.taskOptions; _i < _a.length; _i++) {
                    var taskOption = _a[_i];
                    allPropIds_1.push(taskOption.id);
                    if (!taskOption.hidden) {
                        basicOptionIds_1[taskOption.id] = true;
                    }
                }
            }
            // The pipeline-template-view-rules may not include rules for all
            // of the taskOptions in the pipeline.  Make sure our list of ids
            // is complete before we start working through the list.
            Object.keys(pipeline.taskOptions.properties).forEach(function (propId) {
                if (allPropIds_1.indexOf(propId) === -1) {
                    allPropIds_1.push(propId);
                }
            });
            var basicMap_1 = Object.create(null);
            var advancedMap_1 = Object.create(null);
            // iterate in the order specified by pipeline-template-view-rules
            allPropIds_1.forEach(function (propId) {
                var property = pipeline.taskOptions.properties[propId];
                if (property) {
                    var fieldSpec = _this.fieldSpecForTaskOption(property);
                    var isBasic = basicOptionIds_1[propId];
                    var groupKey = propId.split(".")[0];
                    var group = (isBasic ? basicMap_1 : advancedMap_1)[groupKey];
                    if (!group) {
                        group = (isBasic ? basicMap_1 : advancedMap_1)[groupKey] = {
                            name: GROUP_NAMES[groupKey],
                            fields: []
                        };
                    }
                    group.fields.push(fieldSpec);
                    _this.allParameters.push(fieldSpec);
                    var formEntries = (isBasic ? basicFormEntries : advancedFormEntries);
                    formEntries[fieldSpec.id] = [
                        fieldSpec.default
                    ];
                }
                else {
                }
            });
            this.vm.basicParameters = this.formGroupMapToArray(basicMap_1);
            this.vm.advancedParameters = this.formGroupMapToArray(advancedMap_1);
        }
        this.vm.basicOptionsGroup = this.formBuilder.group(basicFormEntries);
        this.vm.advancedOptionsGroup =
            this.formBuilder.group(advancedFormEntries);
        this.vm.form.addControl("basicOptions", this.vm.basicOptionsGroup);
        this.vm.form.addControl("advancedOptions", this.vm.advancedOptionsGroup);
        this.vm.basicOptionsGroup.updateValueAndValidity({ onlySelf: true });
        this.vm.advancedOptionsGroup.updateValueAndValidity();
    };
    /* example
        input = {
            foo: { name: "Foo Name", fields: [] },
            bar: { name: "Bar Name", fields: [] }
        }
        output = this.formGroupMapToArray(input);
        output === [
            { name: "Bar Name", fields: [] }
            { name: "Foo Name", fields: [] },
        ]
     */
    AnalysisSettings.prototype.formGroupMapToArray = function (map) {
        var array = [];
        var keys = Object.keys(map);
        keys.forEach(function (key) {
            array.push(map[key]);
        });
        // this sorts the groups themselves, not the fields in the groups
        array.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        return array;
    };
    AnalysisSettings.prototype.onDatasetItemSelected = function (catalogSpec, modal) {
        var item = catalogSpec.selectedData;
        if (item) {
            this.vm.entryPointsGroup.find(catalogSpec.args.gridId)
                .updateValue(item.id);
            catalogSpec.selectionName = item.name;
            modal.hide();
        }
    };
    AnalysisSettings.prototype.onDatasetModalHiddenChange = function (hidden, catalogSpec, button) {
        if (hidden) {
            catalogSpec.selectedData = null;
            button.focus();
        }
        else {
            catalogSpec.args.agGridOptions.api.sizeColumnsToFit();
        }
    };
    AnalysisSettings.prototype.onAdvancedModalHiddenChange = function (hidden, content) {
        var group = this.vm.advancedOptionsGroup;
        if (!hidden) {
            // Reset the content scroller when the modal opens
            content.scrollTop = 0;
            // Store the values for the group when showing so they can be
            // used to reset the form if the user clicks "Cancel"
            this.defaultAdvancedOptions = group.value;
        }
        else if (this.defaultAdvancedOptions) {
            // Reset the form to the values stored before it was launched
            for (var key in this.defaultAdvancedOptions) {
                if (this.defaultAdvancedOptions.hasOwnProperty(key)) {
                    var value_1 = this.defaultAdvancedOptions[key];
                    var control = group.controls[key];
                    if (control.value !== value_1) {
                        control.updateValue(value_1, { onlySelf: true });
                    }
                }
            }
            this.defaultAdvancedOptions = null;
            group.updateValueAndValidity();
        }
    };
    AnalysisSettings.prototype.onAcceptAdvancedParameters = function (modal) {
        // Clear out the defaults so the reset routine doesn't run
        // in `onAdvancedModalHiddenChange`
        this.defaultAdvancedOptions = null;
        modal.hide();
    };
    AnalysisSettings.SEND_OPTIONS_AS_STRING = true;
    __decorate([
        modal_1.ModalDialog.HideOnDeactivate(), 
        __metadata('design:type', core_1.QueryList)
    ], AnalysisSettings.prototype, "modals", void 0);
    AnalysisSettings = __decorate([
        core_1.Component({
            selector: "analysis-settings",
            providers: [error_service_1.ErrorService],
            viewProviders: [common_1.FormBuilder],
            moduleId: module.id,
            templateUrl: "analysis-settings.html",
            styleUrls: ["analysis-settings.css"],
            directives: [
                catalog_1.Catalog, imprint_1.Imprint, info_1.Info, menu_1.MENU_DIRECTIVES, menu_button_1.MenuButton,
                modal_1.MODAL_DIRECTIVES, square_toggle_1.SquareToggle, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES
            ],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        router_1.CanActivate(status_1.canConnect),
        __param(1, core_1.ViewQuery(modal_1.ModalDialog, { descendants: true })), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.QueryList, error_service_1.ErrorService, router_1.Router, router_1.RouteParams, common_1.FormBuilder, io_1.IO, stash_1.Stash, http_1.Http])
    ], AnalysisSettings);
    return AnalysisSettings;
}());
exports.AnalysisSettings = AnalysisSettings;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9hbmFseXNpcy9hbmFseXNpcy1zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7Ozs7Ozs7Ozs7Ozs7O0FBRUgscUJBRU8sZUFBZSxDQUFDLENBQUE7QUFDdkIsdUJBR08saUJBQWlCLENBQUMsQ0FBQTtBQUN6Qix1QkFBK0MsaUJBQWlCLENBQUMsQ0FBQTtBQUNqRSx1QkFBeUIseUJBQXlCLENBQUMsQ0FBQTtBQUVuRCw4QkFBMkIsd0JBQXdCLENBQUMsQ0FBQTtBQUVwRCxtQkFBaUIsdUJBQXVCLENBQUMsQ0FBQTtBQUN6Qyx5QkFBdUIsNkJBQTZCLENBQUMsQ0FBQTtBQUNyRCxxQkFBbUIseUJBQXlCLENBQUMsQ0FBQTtBQUM3Qyw4QkFBZ0MsdUNBQXVDLENBQUMsQ0FBQTtBQUV4RSxvQkFBa0IsbUJBQW1CLENBQUMsQ0FBQTtBQUN0QyxzQkFBb0IscUJBQXFCLENBQUMsQ0FBQTtBQUUxQyw2QkFBMEIseUJBQXlCLENBQUMsQ0FBQTtBQUVwRCx3QkFBc0Isc0NBQXNDLENBQUMsQ0FBQTtBQUM3RCxxQkFBOEIsZ0NBQWdDLENBQUMsQ0FBQTtBQUMvRCw0QkFBeUIsdUNBQXVDLENBQUMsQ0FBQTtBQUNqRSxzQkFBNEMsa0NBQWtDLENBQUMsQ0FBQTtBQUMvRSw4QkFBMkIsa0RBQWtELENBQUMsQ0FBQTtBQUU5RSx3QkFBc0IsMEJBQTBCLENBQUMsQ0FBQTtBQUNqRCxxQkFBbUIsdUJBQXVCLENBQUMsQ0FBQTtBQUMzQyxzQkFBb0IscUJBQXFCLENBQUMsQ0FBQTtBQUMxQyxxQkFBbUIsMEJBQTBCLENBQUMsQ0FBQTtBQUk5QyxrQ0FFTyxxQ0FBcUMsQ0FBQyxDQUFBO0FBQzdDLHdCQUE0QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ3hELDRCQUFnQywrQkFBK0IsQ0FBQyxDQUFBO0FBQ2hFLDBCQUE4Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBQzVELG9CQUF3Qix1QkFBdUIsQ0FBQyxDQUFBO0FBQ2hELHdCQUE0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RUFBRSx3QkFBVTtnQkFDbkQsd0JBQWdCLEVBQUUsNEJBQVksRUFBRSx3QkFBZSxFQUFFLHdCQUFlO2FBQ25FO1lBQ0QsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7U0FDeEMsQ0FBQztRQUNELG9CQUFXLENBQUMsbUJBQVUsQ0FBQzttQkFnRGYsZ0JBQVMsQ0FBQyxtQkFBVyxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDOzt3QkFoRDlCO0lBNm5CeEIsdUJBQUM7QUFBRCxDQTVuQkEsQUE0bkJDLElBQUE7QUE1bkJZLHdCQUFnQixtQkE0bkI1QixDQUFBIiwiZmlsZSI6ImFwcC9zaWxvcy9hbmFseXNpcy9hbmFseXNpcy1zZXR0aW5ncy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTUsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYSwgSW5jLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmJza2lubmVyQHBhY2lmaWNiaW9zY2llbmNlcy5jb21cIj5CcmlhbiBTa2lubmVyPC9hPlxuICovXG5cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgRWxlbWVudFJlZiwgVmlld1F1ZXJ5LCBRdWVyeUxpc3Rcbn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgQ09SRV9ESVJFQ1RJVkVTLCBGT1JNX0RJUkVDVElWRVMsIEZvcm1CdWlsZGVyLCBDb250cm9sR3JvdXAsXG4gICAgQ29udHJvbCwgVmFsaWRhdG9yc1xufSBmcm9tIFwiYW5ndWxhcjIvY29tbW9uXCI7XG5pbXBvcnQge1JvdXRlciwgUm91dGVQYXJhbXMsIENhbkFjdGl2YXRlfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge2NhbkNvbm5lY3R9IGZyb20gXCIuLi8uLi9uYXZpZ2F0aW9uL3N0YXR1c1wiO1xuXG5pbXBvcnQge0Vycm9yU2VydmljZX0gZnJvbSBcIi4uL2Vycm9yL2Vycm9yLXNlcnZpY2VcIjtcblxuaW1wb3J0IHtJT30gZnJvbSBcImF0aGVuYWV1bS9kYXRhL2FwaS9pb1wiO1xuaW1wb3J0IHtFbmRwb2ludH0gZnJvbSBcImF0aGVuYWV1bS9kYXRhL2FwaS9lbmRwb2ludFwiO1xuaW1wb3J0IHtIdHRwfSBmcm9tIFwiYXRoZW5hZXVtL3NlcnZpY2VzL2h0dHBcIjtcbmltcG9ydCB7VW5hdXRob3JpemVkRXJyb3J9IGZyb20gXCJhdGhlbmFldW0vY29tbW9uL2Vycm9ycy9lcnJvci1mYWN0b3J5XCI7XG5cbmltcG9ydCB7QVBJfSBmcm9tIFwiLi4vLi4vZGF0YS9pby9hcGlcIjtcbmltcG9ydCB7U3Rhc2h9IGZyb20gXCIuLi8uLi9kYXRhL2lvL3N0YXNoXCI7XG5cbmltcG9ydCB7RGF0YXNldFR5cGV9IGZyb20gXCIuLi8uLi9kYXRhL2RhdGFzZXQtdHlwZVwiO1xuXG5pbXBvcnQge0NhdGFsb2d9IGZyb20gXCJhdGhlbmFldW0vY29tcG9uZW50cy9jYXRhbG9nL2NhdGFsb2dcIjtcbmltcG9ydCB7TUVOVV9ESVJFQ1RJVkVTfSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvbWVudS9tZW51XCI7XG5pbXBvcnQge01lbnVCdXR0b259IGZyb20gXCJhdGhlbmFldW0vY29tcG9uZW50cy9tZW51L21lbnUtYnV0dG9uXCI7XG5pbXBvcnQge01PREFMX0RJUkVDVElWRVMsIE1vZGFsRGlhbG9nfSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvbW9kYWwvbW9kYWxcIjtcbmltcG9ydCB7U3F1YXJlVG9nZ2xlfSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvc3F1YXJlLXRvZ2dsZS9zcXVhcmUtdG9nZ2xlXCI7XG5cbmltcG9ydCB7SW1wcmludH0gZnJvbSBcIi4uLy4uL2RpcmVjdGl2ZXMvaW1wcmludFwiO1xuaW1wb3J0IHtJbmZvfSBmcm9tIFwiLi4vLi4vZGlyZWN0aXZlcy9pbmZvXCI7XG5pbXBvcnQge1NUQU1QfSBmcm9tIFwiLi4vLi4vc3RyaW5ncy9zdGFtcFwiO1xuaW1wb3J0IHtURVhUfSBmcm9tIFwiLi4vLi4vc3RyaW5ncy9lbi11cy90ZXh0XCI7XG5cbmltcG9ydCB7U0lMT30gZnJvbSBcIi4uL3NpbG9cIjtcblxuaW1wb3J0IHtcbiAgICBQSVBFTElORV9URU1QTEFURV9GUkFNRSwgUElQRUxJTkVfVEFHLCBJVGFza09wdGlvblxufSBmcm9tIFwiLi4vLi4vZGF0YS9mcmFtZXMvcGlwZWxpbmUtdGVtcGxhdGVcIjtcbmltcG9ydCB7U1VCUkVBRF9GUkFNRX0gZnJvbSBcIi4uLy4uL2RhdGEvZnJhbWVzL3N1YnJlYWRcIjtcbmltcG9ydCB7SERGX1NVQlJFQURfRlJBTUV9IGZyb20gXCIuLi8uLi9kYXRhL2ZyYW1lcy9oZGYtc3VicmVhZFwiO1xuaW1wb3J0IHtSRUZFUkVOQ0VfRlJBTUV9IGZyb20gXCIuLi8uLi9kYXRhL2ZyYW1lcy9yZWZlcmVuY2VcIjtcbmltcG9ydCB7Sk9CX0ZSQU1FfSBmcm9tIFwiLi4vLi4vZGF0YS9mcmFtZXMvam9iXCI7XG5pbXBvcnQge0JBUkNPREVfRlJBTUV9IGZyb20gXCIuLi8uLi9kYXRhL2ZyYW1lcy9iYXJjb2RlXCI7XG5cbmltcG9ydCB7RmFjZXR9IGZyb20gXCIuLi8uLi9kYXRhL2ZhY2V0cy9mYWNldFwiO1xuaW1wb3J0IHthc2MsIHZhbHVlVG9Mb3dlcmNhc2UsIHZhbHVlfSBmcm9tIFwiYXRoZW5hZXVtL2NvbW1vbi9wcm9wZXJ0eS1zb3J0XCI7XG5cbmltcG9ydCB7Q09MTEVDVElPTl9GQUNFVH0gZnJvbSBcIi4uLy4uL2RhdGEvZmFjZXRzL2NvbGxlY3Rpb25cIjtcbmltcG9ydCB7UFJFU0VUX0ZBQ0VUfSBmcm9tIFwiLi4vLi4vZGF0YS9mYWNldHMvcHJlc2V0XCI7XG5pbXBvcnQge1BJUEVMSU5FX1RFTVBMQVRFX0ZBQ0VUfSBmcm9tIFwiLi4vLi4vZGF0YS9mYWNldHMvcGlwZWxpbmUtdGVtcGxhdGVcIjtcbmltcG9ydCB7T25BY3RpdmF0ZX0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElGaWVsZFNwZWMge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGRlZmF1bHQ6IHN0cmluZztcbiAgICBpbnB1dFR5cGU6IHN0cmluZztcbiAgICBvcHRpb25UeXBlSWQ6IHN0cmluZztcbiAgICBzdGVwPzogbnVtYmVyO1xuICAgIHJvd3M/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1Hcm91cCB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGZpZWxkczogSUZpZWxkU3BlY1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGb3JtR3JvdXBNYXAge1xuICAgIFsga2V5OiBzdHJpbmcgXTogSUZvcm1Hcm91cDtcbn1cblxuY29uc3QgQVRUUklCVVRFU19GT1JfT1BUSU9OX1RZUEUgPSB7XG4gICAgXCJwYnNtcnRwaXBlLm9wdGlvbl90eXBlcy5ib29sZWFuXCI6IHtcbiAgICAgICAgaW5wdXRUeXBlOiBcImNoZWNrYm94XCJcbiAgICB9LFxuICAgIFwicGJzbXJ0cGlwZS5vcHRpb25fdHlwZXMuZmxvYXRcIjoge1xuICAgICAgICBpbnB1dFR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgIHN0ZXA6IDAuMDAxXG4gICAgfSxcbiAgICBcInBic21ydHBpcGUub3B0aW9uX3R5cGVzLmludGVnZXJcIjoge1xuICAgICAgICBpbnB1dFR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgIHN0ZXA6IDFcbiAgICB9LFxuICAgIFwicGJzbXJ0cGlwZS5vcHRpb25fdHlwZXMuc3RyaW5nXCI6IHtcbiAgICAgICAgaW5wdXRUeXBlOiBcInRleHRhcmVhXCJcbiAgICB9XG59O1xuXG5jb25zdCBHUk9VUF9OQU1FUyA9IHtcbiAgICBmYWxjb25fbnM6IFwiQXNzZW1ibHlcIixcbiAgICBnZW5vbWljX2NvbnNlbnN1czogXCJDb25zZW5zdXNcIixcbiAgICBraW5ldGljc190b29sczogXCJCYXNlIE1vZHNcIixcbiAgICBtb3RpZl9tYWtlcjogXCJNb3RpZnNcIixcbiAgICBwYmFsaWduOiBcIkFsaWdubWVudFwiLFxuICAgIHBiY2NzOiBcIkNDU1wiLFxuICAgIHBibGFhOiBcIkxBQVwiLFxuICAgIHBicmVwb3J0czogXCJSZXBvcnRzXCIsXG4gICAgcGJzbXJ0cGlwZTogXCJTTVJUIFBpcGVcIixcbiAgICBwYnRyYW5zY3JpcHQ6IFwiSXNvU2VxXCJcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImFuYWx5c2lzLXNldHRpbmdzXCIsXG4gICAgcHJvdmlkZXJzOiBbRXJyb3JTZXJ2aWNlXSxcbiAgICB2aWV3UHJvdmlkZXJzOiBbRm9ybUJ1aWxkZXJdLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiYW5hbHlzaXMtc2V0dGluZ3MuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiYW5hbHlzaXMtc2V0dGluZ3MuY3NzXCJdLFxuICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgQ2F0YWxvZywgSW1wcmludCwgSW5mbywgTUVOVV9ESVJFQ1RJVkVTLCBNZW51QnV0dG9uLFxuICAgICAgICBNT0RBTF9ESVJFQ1RJVkVTLCBTcXVhcmVUb2dnbGUsIENPUkVfRElSRUNUSVZFUywgRk9STV9ESVJFQ1RJVkVTXG4gICAgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuQENhbkFjdGl2YXRlKGNhbkNvbm5lY3QpXG5leHBvcnQgY2xhc3MgQW5hbHlzaXNTZXR0aW5ncyB7XG4gICAgc3RhdGljIFNFTkRfT1BUSU9OU19BU19TVFJJTkcgPSB0cnVlO1xuXG4gICAgcHVibGljIFNUQU1QID0gU1RBTVA7XG4gICAgcHVibGljIFRFWFQgPSBURVhUO1xuXG4gICAgcHVibGljIHZtID0ge1xuICAgICAgICBmb3JtOiA8Q29udHJvbEdyb3VwPiBudWxsLFxuICAgICAgICBiYXNpY09wdGlvbnNHcm91cDogPENvbnRyb2xHcm91cD4gbnVsbCxcbiAgICAgICAgYWR2YW5jZWRPcHRpb25zR3JvdXA6IDxDb250cm9sR3JvdXA+IG51bGwsXG4gICAgICAgIGVudHJ5UG9pbnRzR3JvdXA6IDxDb250cm9sR3JvdXA+IG51bGwsXG4gICAgICAgIHByZXNlbGVjdGVkRGF0YVNldE5hbWU6IFwiXCIsXG4gICAgICAgIGNvbGxlY3Rpb25DYXRhbG9nOiBudWxsLFxuICAgICAgICBwaXBlbGluZU9wdGlvbnM6IG51bGwsXG4gICAgICAgIGRhdGFzZXRDYXRhbG9nczogW10sXG4gICAgICAgIHByZXNldE9wdGlvbnM6IG51bGwsXG4gICAgICAgIHNob3c6IHtcbiAgICAgICAgICAgIHByZXNldHM6IGZhbHNlLFxuICAgICAgICAgICAgcHJlc2VsZWN0ZWREYXRhU2V0OiB0cnVlLFxuICAgICAgICAgICAgYWR2YW5jZWRPcHRpb25zOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlRm9ybXM6IGZhbHNlLFxuICAgICAgICBiYXNpY1BhcmFtZXRlcnM6IFtdLFxuICAgICAgICBhZHZhbmNlZFBhcmFtZXRlcnM6IFtdLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IFwiXCJcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBhbGxQYXJhbWV0ZXJzOiBJRmllbGRTcGVjW107XG4gICAgcHJpdmF0ZSBkZWZhdWx0QWR2YW5jZWRPcHRpb25zOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IGFueTtcbiAgICB9ID0gbnVsbDtcblxuICAgIHByaXZhdGUgcGlwZWxpbmVUZW1wbGF0ZVZpZXdSdWxlcztcbiAgICBwcml2YXRlIHNlbGVjdGVkUGlwZWxpbmU7XG4gICAgcHJpdmF0ZSBmaWx0ZXJGdW5jdGlvbjtcbiAgICBwcml2YXRlIGZpbHRlck9uRmlsZVR5cGVJZDtcbiAgICBwcml2YXRlIGhhc1N0YXJ0ZWQ7XG4gICAgcHJpdmF0ZSBzdGFzaDogU3Rhc2g7XG4gICAgcHJpdmF0ZSBpbzogSU87XG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwO1xuICAgIHByaXZhdGUgcm9vdE5vZGU6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgZGF0YXNldElkOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBmcm9tRGF0YU1hbmFnZW1lbnQ6IGJvb2xlYW47XG4gICAgQE1vZGFsRGlhbG9nLkhpZGVPbkRlYWN0aXZhdGUoKSBwcml2YXRlIG1vZGFsczogUXVlcnlMaXN0PE1vZGFsRGlhbG9nPjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBlbDogRWxlbWVudFJlZixcbiAgICAgICAgQFZpZXdRdWVyeShNb2RhbERpYWxvZywgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgICAgICAgICAgbW9kYWxzOiBRdWVyeUxpc3Q8TW9kYWxEaWFsb2c+LFxuICAgICAgICBwcml2YXRlIGVycm9yU2VydmljZTogRXJyb3JTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwcml2YXRlIHJvdXRlUGFyYW1zOiBSb3V0ZVBhcmFtcyxcbiAgICAgICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIGlvOiBJTyxcbiAgICAgICAgc3Rhc2g6IFN0YXNoLFxuICAgICAgICBodHRwOiBIdHRwXG4gICAgKSB7XG4gICAgICAgIHRoaXMucm9vdE5vZGUgPSBlbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLm1vZGFscyA9IG1vZGFscztcblxuICAgICAgICB0aGlzLnZtLmJhc2ljT3B0aW9uc0dyb3VwID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7fSk7XG4gICAgICAgIHRoaXMudm0uYWR2YW5jZWRPcHRpb25zR3JvdXAgPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHt9KTtcbiAgICAgICAgdGhpcy52bS5lbnRyeVBvaW50c0dyb3VwID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7fSk7XG4gICAgICAgIHRoaXMudm0uZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgbmFtZTogW1wiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcGlwZWxpbmVJZDogW1wiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgYmFzaWNPcHRpb25zOiB0aGlzLnZtLmJhc2ljT3B0aW9uc0dyb3VwLFxuICAgICAgICAgICAgYWR2YW5jZWRPcHRpb25zOiB0aGlzLnZtLmFkdmFuY2VkT3B0aW9uc0dyb3VwLFxuICAgICAgICAgICAgZW50cnlQb2ludHM6IHRoaXMudm0uZW50cnlQb2ludHNHcm91cFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnN0YXNoID0gc3Rhc2g7XG4gICAgICAgIHRoaXMuaW8gPSBpbztcbiAgICAgICAgdGhpcy5odHRwID0gaHR0cDtcblxuICAgICAgICB0aGlzLmRhdGFzZXRJZCA9IHRoaXMucm91dGVQYXJhbXMuZ2V0KFwiaWRcIik7XG4gICAgICAgIHRoaXMuZnJvbURhdGFNYW5hZ2VtZW50ID0gKHRoaXMucm91dGVQYXJhbXMuZ2V0KFwic3JjXCIpIHx8IFwiXCIpID09PSBcImRtXCI7XG4gICAgICAgIHRoaXMuaGFzU3RhcnRlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudm0uc2hvdy5wcmVzZXRzID0gZmFsc2U7XG4gICAgICAgIHRoaXMudm0uaW5jbHVkZUZvcm1zID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy52bS5iYXNpY1BhcmFtZXRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy52bS5hZHZhbmNlZFBhcmFtZXRlcnMgPSBbXTtcblxuICAgICAgICB0aGlzLmZpbHRlckZ1bmN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5maWx0ZXJPbkZpbGVUeXBlSWQgPSBudWxsO1xuICAgICAgICB0aGlzLnZtLnNob3cucHJlc2VsZWN0ZWREYXRhU2V0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudm0uY29sbGVjdGlvbkNhdGFsb2cgPSBudWxsO1xuXG4gICAgICAgIGxldCBpZCA9IHRoaXMuZGF0YXNldElkO1xuICAgICAgICBsZXQgc2hvcnROYW1lID0gdGhpcy5yb3V0ZVBhcmFtcy5nZXQoXCJzaG9ydE5hbWVcIik7XG4gICAgICAgIGxldCBkYXRhc2V0VHlwZSA9IERhdGFzZXRUeXBlLmJ5U2hvcnROYW1lKHNob3J0TmFtZSk7XG4gICAgICAgIGxldCBmaWxlVHlwZUlkID0gZGF0YXNldFR5cGUuZmlsZXR5cGU7XG4gICAgICAgIGlmIChzaG9ydE5hbWUgJiYgaWQpIHtcbiAgICAgICAgICAgIHRoaXMudm0uc2hvdy5wcmVzZWxlY3RlZERhdGFTZXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy52bS5wcmVzZWxlY3RlZERhdGFTZXROYW1lID0gYERhdGEgU2V0ICMke2lkfWA7XG4gICAgICAgICAgICB0aGlzLmZldGNoQW5kRGlzcGxheURhdGFTZXROYW1lKGRhdGFzZXRUeXBlLmVuZHBvaW50LCBpZCk7XG4gICAgICAgICAgICB0aGlzLmZpbHRlckZ1bmN0aW9uID0gKHBpcGVUZW1wbGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghIHBpcGVUZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgocGlwZVRlbXBsYXRlLnRhZ3MuaW5kZXhPZihQSVBFTElORV9UQUcuREVWKSA+PSAwKVxuICAgICAgICAgICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgICAgICAocGlwZVRlbXBsYXRlLnRhZ3MuaW5kZXhPZihQSVBFTElORV9UQUcuSU5URVJOQUwpID49IDApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBpcGVUZW1wbGF0ZS5lbnRyeVBvaW50cykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRyeVBvaW50IG9mIHBpcGVUZW1wbGF0ZS5lbnRyeVBvaW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5UG9pbnQuZmlsZVR5cGVJZCA9PT0gdGhpcy5maWx0ZXJPbkZpbGVUeXBlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJPbkZpbGVUeXBlSWQgPSBmaWxlVHlwZUlkO1xuICAgICAgICAgICAgLy8gVE9ETyhic2tpbm5lcik6IHJlZmFjdG9yIHRoaXMgd2l0aCBjb2RlIGJlbG93ICYgbW92ZSBpbnRvIFN0YXNoXG4gICAgICAgICAgICBsZXQgY29sbGVjdGlvbiA9IENPTExFQ1RJT05fRkFDRVQ7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLmZyYW1lLmVuZHBvaW50ID1cbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uLmZyYW1lLmVuZHBvaW50LmFuZCh7JHNldF90eXBlOiBzaG9ydE5hbWUsICRzZXRfaW50OiBpZH0pO1xuICAgICAgICAgICAgdGhpcy52bS5jb2xsZWN0aW9uQ2F0YWxvZyA9IHRoaXMuY3JlYXRlQ2F0YWxvZ1NwZWMoe1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiQ29sbGVjdGlvbnNcIixcbiAgICAgICAgICAgICAgICBncmlkSWQ6IFwiY29sbGVjdGlvbmNhdGFsb2dcIixcbiAgICAgICAgICAgICAgICBmYWNldDogQ09MTEVDVElPTl9GQUNFVFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZtLmRhdGFzZXRDYXRhbG9ncyA9IFtdO1xuXG4gICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5pby5nZXRFbmRwb2ludEFzeW5jKEFQSS5uUGlwZWxpbmVWaWV3UnVsZXMpO1xuICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMucGlwZWxpbmVUZW1wbGF0ZVZpZXdSdWxlcyA9IHJlc3VsdDtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUGlwZWxpbmVPcHRpb25zKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBwcm9taXNlLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3JTZXJ2aWNlLnNob3dFcnJvcihlcnJvcikpO1xuICAgIH1cblxuICAgIC8vIFRPRE8oYnNraW5uZXIpKDIwMTUtMTAtMjIpOiBjb25zaWRlciBtb3ZpbmcgdGhpcyB0byBhIHNoYXJlZCB1dGlsLFxuICAgIC8vIGFuZCBtZXJnaW5nIGl0IHRvZ2V0aGVyIHdpdGggdGhlIGNvZGUgaW4gYXBwL3BpcGVzXG4gICAgc3RhdGljIHBhcnNlVmFsdWVBc1R5cGUodmFsdWU6IHN0cmluZywgb3B0aW9uVHlwZTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgc3dpdGNoIChvcHRpb25UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwicGJzbXJ0cGlwZS5vcHRpb25fdHlwZXMuaW50ZWdlclwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgICAgICAgY2FzZSBcInBic21ydHBpcGUub3B0aW9uX3R5cGVzLmZsb2F0XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgY2FzZSBcInBic21ydHBpcGUub3B0aW9uX3R5cGVzLmJvb2xlYW5cIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICBjYXNlIFwicGJzbXJ0cGlwZS5vcHRpb25fdHlwZXMuc3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBub29wKHZhbHVlKSB7XG4gICAgICAgIC8qIGNvbnNvbGUubG9nKFwibm9vcDpcIiwgdmFsdWUpOyAqL1xuICAgIH1cblxuICAgIGRvQ2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy5mcm9tRGF0YU1hbmFnZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9EYXRhTWFuYWdlbWVudFwiLCBcIkRhdGFzZXREZXRhaWxcIiwgeyBkYXRhc2V0SWQ6IHRoaXMuZGF0YXNldElkIH1dKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi4uL0pvYnNcIl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZG9TdGFydChlcnJvckRpYWxvZzogTW9kYWxEaWFsb2cpIHtcbiAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gdGhpcy52bS5mb3JtLnZhbHVlO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBuYW1lOiBmb3JtVmFsdWUubmFtZSxcbiAgICAgICAgICAgIHBpcGVsaW5lSWQ6IGZvcm1WYWx1ZS5waXBlbGluZUlkLFxuICAgICAgICAgICAgZW50cnlQb2ludHM6IG51bGwsXG4gICAgICAgICAgICB0YXNrT3B0aW9uczogbnVsbCxcbiAgICAgICAgICAgIHdvcmtmbG93T3B0aW9uczogW11cbiAgICAgICAgfTtcblxuICAgICAgICBkYXRhLnRhc2tPcHRpb25zID0gdGhpcy5hbGxQYXJhbWV0ZXJzLm1hcCgocGFyYW1ldGVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IEFuYWx5c2lzU2V0dGluZ3MucGFyc2VWYWx1ZUFzVHlwZShcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXIuaWQgaW4gZm9ybVZhbHVlLmJhc2ljT3B0aW9ucyA/XG4gICAgICAgICAgICAgICAgICAgIGZvcm1WYWx1ZS5iYXNpY09wdGlvbnNbcGFyYW1ldGVyLmlkXSA6XG4gICAgICAgICAgICAgICAgICAgIGZvcm1WYWx1ZS5hZHZhbmNlZE9wdGlvbnNbcGFyYW1ldGVyLmlkXSxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXIub3B0aW9uVHlwZUlkXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBvcHRpb25JZDogcGFyYW1ldGVyLmlkLFxuICAgICAgICAgICAgICAgIG9wdGlvblR5cGVJZDogcGFyYW1ldGVyLm9wdGlvblR5cGVJZCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUGlwZWxpbmUuZW50cnlQb2ludHMpIHtcbiAgICAgICAgICAgIGRhdGEuZW50cnlQb2ludHMgPSB0aGlzLnNlbGVjdGVkUGlwZWxpbmUuZW50cnlQb2ludHMubWFwKFxuICAgICAgICAgICAgICAgIChlbnRyeVBvaW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBlbnRyeVBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnlQb2ludC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBlbnRyeVBvaW50W2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGFzZXRJZCA9IGZvcm1WYWx1ZS5lbnRyeVBvaW50c1tyZXN1bHQuZW50cnlJZF07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGFzU3RhcnRlZCA9IHRydWU7XG5cbiAgICAgICAgbGV0IGVuZHBvaW50ID0gSk9CX0ZSQU1FLmVuZHBvaW50O1xuXG4gICAgICAgIC8vIFRPRE8gKGJmb3JiZXMpKDIwMTYtMDUtMDQpOiBEdXJpbmcgcmVmYWN0b3Igb2YgYXV0aCwgdGhpcyBuZWVkc1xuICAgICAgICAvLyB0byBiZSByZW1vdmVkIG9uY2UgYXV0aCBoZWFkZXJzIGFyZSBzZW50IGFzIHBhcnQgb2YgSHR0cFxuICAgICAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKTtcblxuICAgICAgICBpZiAodG9rZW4gJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyXCIpKSB7XG4gICAgICAgICAgICBoZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaHR0cC5wb3N0KHRoaXMuaW8udXJsRm9yKGVuZHBvaW50KSwgZGF0YSwgaGVhZGVycykuc3Vic2NyaWJlKFxuICAgICAgICAgICAganNvbkRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi4uL0pvYlwiLCB7IGlkOiBqc29uRGF0YS5pZCB9XSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVhc29uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVhc29uIGluc3RhbmNlb2YgVW5hdXRob3JpemVkRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWyBcIi9Mb2dpblwiIF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudm0uZXJyb3JNZXNzYWdlID0gcmVhc29uO1xuICAgICAgICAgICAgICAgICAgICBlcnJvckRpYWxvZy5zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNhblNhdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhblN0YXJ0KCk7XG4gICAgfVxuXG4gICAgY2FuU3RhcnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZtLmZvcm0udmFsaWQgJiYgIXRoaXMuaGFzU3RhcnRlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZldGNoQW5kRGlzcGxheURhdGFTZXROYW1lKGVuZHBvaW50OiBFbmRwb2ludCwgaWQ6IHN0cmluZykge1xuICAgICAgICAvLyBUT0RPKGJza2lubmVyKSgyMDE1LTEwLTI1KTogdXNlIGVuZHBvaW50LmFuZCh7aWQ6IGlkfSkgaW5zdGVhZCBvZjpcbiAgICAgICAgbGV0IHVybCA9IGAke2VuZHBvaW50LnVybCgpfS8ke2lkfWA7XG4gICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5pby5nZXRFbmRwb2ludEFzeW5jKG5ldyBFbmRwb2ludCh1cmwpKTtcblxuICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMudm0ucHJlc2VsZWN0ZWREYXRhU2V0TmFtZSA9XG4gICAgICAgICAgICAgICAgKDx7d2VsbFNhbXBsZU5hbWU6IHN0cmluZ30+cmVzdWx0KS53ZWxsU2FtcGxlTmFtZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHByb21pc2UuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvclNlcnZpY2Uuc2hvd0Vycm9yKGVycm9yKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVDYXRhbG9nU3BlYyhhcmdzOiB7XG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgICAgZ3JpZElkOiBzdHJpbmcsXG4gICAgICAgIGZhY2V0OiBGYWNldCxcbiAgICAgICAgd2l0aFBhcmFtcz86IHt9LFxuICAgICAgICBmaWx0ZXJGdW5jdGlvbj86IEZ1bmN0aW9uXG4gICAgfSkge1xuICAgICAgICBsZXQgY2F0YWxvZ1NwZWMgPSB7XG4gICAgICAgICAgICBuYW1lOiBhcmdzLm5hbWUsXG4gICAgICAgICAgICBzZWxlY3Rpb25OYW1lOiBcIlwiLFxuICAgICAgICAgICAgc2VsZWN0ZWREYXRhOiBudWxsLFxuICAgICAgICAgICAgb3BlbjogZmFsc2UsXG4gICAgICAgICAgICBhcmdzOiBudWxsLFxuICAgICAgICAgICAgaW5zdGFuY2U6IG51bGxcbiAgICAgICAgfTtcbiAgICAgICAgY2F0YWxvZ1NwZWMuYXJncyA9IHtcbiAgICAgICAgICAgIGdyaWRJZDogYXJncy5ncmlkSWQsXG4gICAgICAgICAgICBzaG93OiB7XG4gICAgICAgICAgICAgICAgc2VhcmNoQm94OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjdXN0b21pemVCdXR0b246IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWdHcmlkT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGNvbHVtbkRlZnM6IFtdLFxuICAgICAgICAgICAgICAgIHJvd0RhdGE6IFtdLFxuICAgICAgICAgICAgICAgIHJvd1NlbGVjdGlvbjogXCJzaW5nbGVcIixcbiAgICAgICAgICAgICAgICB0b29sUGFuZWxTdXBwcmVzc1Bpdm90OiB0cnVlLFxuICAgICAgICAgICAgICAgIHRvb2xQYW5lbFN1cHByZXNzVmFsdWVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIC8vIG5vdGU6IHRoZSA0MCBiZWxvdyBuZWVkcyB0byBtYXRjaCB0aGUgNDBweCBpbiBjYXRhbG9nLmNzc1xuICAgICAgICAgICAgICAgIC8vIFRPRE8oYnNraW5uZXIpKDIwMTUtMTItMTEpOiByZWZhY3RvciB0byBtYWtlIGNvZGUgbW9yZSBEUllcbiAgICAgICAgICAgICAgICByb3dIZWlnaHQ6IDQwLFxuICAgICAgICAgICAgICAgIGhlYWRlckhlaWdodDogNDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWdpc3RlckNhdGFsb2dJbnN0YW5jZTogKGNhdGFsb2csIGNhdGFsb2dJZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNhdGFsb2dTcGVjLmluc3RhbmNlID0gY2F0YWxvZztcbiAgICAgICAgICAgICAgICBjYXRhbG9nLnNldFNjaGVtYVByb3BlcnRpZXMoYXJncy5mYWNldC5mcmFtZS5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmZhY2V0LmRlZmF1bHRDb2x1bW5zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmZhY2V0LmFkZGl0aW9uYWxDb2x1bW5zKTtcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5uYW1lID09PSBcIkNvbGxlY3Rpb25zXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJncy5mYWNldC5mcmFtZS5lbmRwb2ludCA9IEFQSS5hRGF0YXNldERldGFpbHNCeUludFxuICAgICAgICAgICAgICAgICAgICAgICAgLmFuZCh7JHNldF90eXBlOiB0aGlzLnJvdXRlUGFyYW1zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KFwic2hvcnROYW1lXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNldF9pbnQ6IHRoaXMucm91dGVQYXJhbXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldChcImlkXCIpfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5zdGFzaC5nZXRBbGxJdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgYXJncy5mYWNldC5mcmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYXJncy53aXRoUGFyYW1zXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjYXRhbG9nLnNldENvbnRlbnRJdGVtcyhwcm9taXNlLCBhcmdzLmZpbHRlckZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MuZmFjZXQuaW5pdGlhbFNvcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gY2F0YWxvZ1NwZWM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVQaXBlbGluZU9wdGlvbnMoKSB7XG4gICAgICAgIGxldCBwaXBlbGluZUZhY2V0ID0gbmV3IEZhY2V0KHtcbiAgICAgICAgICAgIGZyYW1lOiBQSVBFTElORV9URU1QTEFURV9GUkFNRSxcbiAgICAgICAgICAgIGRlZmF1bHRDb2x1bW5zOiBbXCJuYW1lXCJdLFxuICAgICAgICAgICAgaW5pdGlhbFNvcnQ6IGFzYyh2YWx1ZShcIm5hbWVcIikpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN0YXNoLmdldEFsbEl0ZW1zKHBpcGVsaW5lRmFjZXQuZnJhbWUpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuZmlsdGVyKHRoaXMuZmlsdGVyRnVuY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnNvcnQocGlwZWxpbmVGYWNldC5pbml0aWFsU29ydCk7XG4gICAgICAgICAgICB0aGlzLnZtLnBpcGVsaW5lT3B0aW9ucyA9IHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNlbGVjdGVkUGlwZWxpbmVDaGFuZ2VkKHNlbGVjdGVkUGlwZWxpbmUpIHtcbiAgICAgICAgY29uc3QgcGlwZWxpbmVDb250cm9sOiBDb250cm9sID0gPGFueT4gdGhpcy52bS5mb3JtLmZpbmQoXCJwaXBlbGluZUlkXCIpO1xuICAgICAgICBwaXBlbGluZUNvbnRyb2wudXBkYXRlVmFsdWUoc2VsZWN0ZWRQaXBlbGluZS5pZCk7XG4gICAgICAgIHRoaXMuc2hvd0RhdGFzZXRDYXRhbG9nc0ZvcihzZWxlY3RlZFBpcGVsaW5lKTtcbiAgICAgICAgdGhpcy5zaG93UHJlc2V0c0ZvcihzZWxlY3RlZFBpcGVsaW5lKTtcbiAgICAgICAgdGhpcy5zaG93VGFza09wdGlvbnNGb3Ioc2VsZWN0ZWRQaXBlbGluZSk7XG4gICAgICAgIHRoaXMudm0uc2hvdy5hZHZhbmNlZE9wdGlvbnMgPSB0aGlzLmhhc0FkdmFuY2VkT3B0aW9ucygpO1xuICAgICAgICB0aGlzLnZtLmluY2x1ZGVGb3JtcyA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmYWNldEZvckRhdGFzZXRUeXBlKGRhdGFzZXRUeXBlOiBEYXRhc2V0VHlwZSkge1xuICAgICAgICBzd2l0Y2ggKGRhdGFzZXRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIERhdGFzZXRUeXBlLlNVQlJFQUQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGYWNldCh7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lOiBTVUJSRUFEX0ZSQU1FLFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0Q29sdW1uczogW1wibmFtZVwiLCBcImNlbGxJbmRleFwiXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2FzZSBEYXRhc2V0VHlwZS5IREZfU1VCUkVBRDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZhY2V0KHtcbiAgICAgICAgICAgICAgICAgICAgZnJhbWU6IEhERl9TVUJSRUFEX0ZSQU1FLFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0Q29sdW1uczogW1wibmFtZVwiLCBcImNlbGxJbmRleFwiXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2FzZSBEYXRhc2V0VHlwZS5SRUZFUkVOQ0U6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGYWNldCh7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lOiBSRUZFUkVOQ0VfRlJBTUUsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRDb2x1bW5zOiBbXCJuYW1lXCIsIFwidG90YWxMZW5ndGhcIiwgXCJudW1SZWNvcmRzXCJdLFxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsU29ydDogYXNjKHZhbHVlVG9Mb3dlcmNhc2UoXCJuYW1lXCIpKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2FzZSBEYXRhc2V0VHlwZS5CQVJDT0RFOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRmFjZXQoe1xuICAgICAgICAgICAgICAgICAgICBmcmFtZTogQkFSQ09ERV9GUkFNRSxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdENvbHVtbnM6IFtcIm5hbWVcIiwgXCJ0b3RhbExlbmd0aFwiLCBcIm51bVJlY29yZHNcIl0sXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxTb3J0OiBhc2ModmFsdWVUb0xvd2VyY2FzZShcIm5hbWVcIikpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93RGF0YXNldENhdGFsb2dzRm9yKHNlbGVjdGVkUGlwZWxpbmUpIHtcbiAgICAgICAgY29uc3QgZm9ybUVudHJpZXMgPSB7fTtcblxuICAgICAgICBsZXQgZW50cnlQb2ludHMgPSBzZWxlY3RlZFBpcGVsaW5lLmVudHJ5UG9pbnRzO1xuICAgICAgICB0aGlzLnZtLmRhdGFzZXRDYXRhbG9ncy5sZW5ndGggPSAwO1xuICAgICAgICBpZiAoZW50cnlQb2ludHMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGVudHJ5UG9pbnQgb2YgZW50cnlQb2ludHMpIHtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZVR5cGVJZCA9IGVudHJ5UG9pbnQuZmlsZVR5cGVJZDtcbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyVHlwZSA9IHRoaXMuZmlsdGVyT25GaWxlVHlwZUlkO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJUeXBlICYmIGZpbHRlclR5cGUgPT09IGZpbGVUeXBlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkQXNTdHJpbmcgPSB0aGlzLnJvdXRlUGFyYW1zLmdldChcImlkXCIpO1xuICAgICAgICAgICAgICAgICAgICBmb3JtRW50cmllc1tlbnRyeVBvaW50LmVudHJ5SWRdID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoaWRBc1N0cmluZywgMTApLFxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjYXROYW1lID0gRGF0YXNldFR5cGUuYnlGaWxldHlwZShmaWxlVHlwZUlkKS5zaG9ydE5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGNhdE5hbWUgPSBjYXROYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBjYXROYW1lLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhdGFsb2dJZCA9IGVudHJ5UG9pbnQuZW50cnlJZDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFzZXQgPSBEYXRhc2V0VHlwZS5ieUZpbGV0eXBlKGZpbGVUeXBlSWQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmFjZXQgPSB0aGlzLmZhY2V0Rm9yRGF0YXNldFR5cGUoZGF0YXNldCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhdGFsb2cgPSB0aGlzLmNyZWF0ZUNhdGFsb2dTcGVjKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGNhdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkSWQ6IGNhdGFsb2dJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY2V0OiBmYWNldFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY2F0YWxvZy5hcmdzLnNob3cuc2VhcmNoQm94ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2F0YWxvZy5hcmdzLnNob3cuY3VzdG9taXplQnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52bS5kYXRhc2V0Q2F0YWxvZ3MucHVzaChjYXRhbG9nKTtcbiAgICAgICAgICAgICAgICAgICAgZm9ybUVudHJpZXNbZW50cnlQb2ludC5lbnRyeUlkXSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy52bS5lbnRyeVBvaW50c0dyb3VwID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cChmb3JtRW50cmllcyk7XG4gICAgICAgICAgICB0aGlzLnZtLmZvcm0uYWRkQ29udHJvbChcImVudHJ5UG9pbnRzXCIsIHRoaXMudm0uZW50cnlQb2ludHNHcm91cCk7XG4gICAgICAgICAgICB0aGlzLnZtLmVudHJ5UG9pbnRzR3JvdXAudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93UHJlc2V0c0ZvcihwaXBlbGluZSkge1xuICAgICAgICB0aGlzLnZtLnNob3cucHJlc2V0cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXNoLmdldEFsbEl0ZW1zKFxuICAgICAgICAgICAgUFJFU0VUX0ZBQ0VULmZyYW1lLCB7ICRwdF9kb3Rkb3RpZDogcGlwZWxpbmUuaWQgfVxuICAgICAgICApLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQgfHwgIXJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZtLnByZXNldE9wdGlvbnMgPSByZXN1bHQ7XG4gICAgICAgICAgICB0aGlzLnZtLnNob3cucHJlc2V0cyA9IHRydWU7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2Uuc2hvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNlbGVjdGVkUHJlc2V0Q2hhbmdlZChzZWxlY3RlZFByZXNldCkge1xuICAgICAgICBpZiAoc2VsZWN0ZWRQcmVzZXQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1Rhc2tPcHRpb25zRm9yKHNlbGVjdGVkUHJlc2V0KTtcbiAgICAgICAgICAgIHRoaXMudm0uc2hvdy5hZHZhbmNlZE9wdGlvbnMgPSB0aGlzLmhhc0FkdmFuY2VkT3B0aW9ucygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNBZHZhbmNlZE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiAhISh0aGlzLnZtLmFkdmFuY2VkUGFyYW1ldGVycy5sZW5ndGgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdmlld1J1bGVzRm9yUGlwZWxpbmUocGlwZWxpbmVJZDogc3RyaW5nKSB7XG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHRoaXMucGlwZWxpbmVUZW1wbGF0ZVZpZXdSdWxlcykge1xuICAgICAgICAgICAgaWYgKGVudHJ5LmlkID09PSBwaXBlbGluZUlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudHJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIGV4YW1wbGU6IHRhc2tPcHRpb24gPSB7XG4gICAgLy8gICAgICB0aXRsZTogXCJDb25zb2xpZGF0ZSAuYmFtXCIsXG4gICAgLy8gICAgICBkZXNjcmlwdGlvbjogXCJNZXJnZSBjaHVua2VkL2dhdGhlcmVkIC5iYW0gZmlsZXNcIixcbiAgICAvLyAgICAgIGlkOiBcInBiYWxpZ24udGFza19vcHRpb25zLmNvbnNvbGlkYXRlX2FsaWduZWRfYmFtXCIsXG4gICAgLy8gICAgICB0eXBlOiBcImJvb2xlYW5cIiwgLy8gb3IgXCJudW1iZXJcIiBvciBcInN0cmluZ1wiXG4gICAgLy8gICAgICBvcHRpb25UeXBlSWQ6IFwicGJzbXJ0cGlwZS5vcHRpb25fdHlwZXMuYm9vbGVhblwiXG4gICAgLy8gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIHByaXZhdGUgZmllbGRTcGVjRm9yVGFza09wdGlvbih0YXNrT3B0aW9uOiBJVGFza09wdGlvbik6IElGaWVsZFNwZWMge1xuICAgICAgICBsZXQgYXR0cmlidXRlcyA9IEFUVFJJQlVURVNfRk9SX09QVElPTl9UWVBFW3Rhc2tPcHRpb24ub3B0aW9uVHlwZUlkXTtcbiAgICAgICAgY29uc3QgZmllbGRTcGVjOiBJRmllbGRTcGVjID0ge1xuICAgICAgICAgICAgaWQ6IHRhc2tPcHRpb24uaWQsXG4gICAgICAgICAgICB0aXRsZTogdGFza09wdGlvbi50aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0YXNrT3B0aW9uLmRlc2NyaXB0aW9uLnNwbGl0KC9cXHI/XFxuLykubWFwKChsaW5lKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpbmUucmVwbGFjZSgvXlxccysvLCAobWF0Y2gpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiJm5ic3A7XCIucmVwZWF0KG1hdGNoLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5qb2luKFwiPGJyPlwiKSxcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRhc2tPcHRpb24uZGVmYXVsdCxcbiAgICAgICAgICAgIGlucHV0VHlwZTogYXR0cmlidXRlcy5pbnB1dFR5cGUsXG4gICAgICAgICAgICBvcHRpb25UeXBlSWQ6IHRhc2tPcHRpb24ub3B0aW9uVHlwZUlkLFxuICAgICAgICAgICAgc3RlcDogYXR0cmlidXRlcy5zdGVwXG4gICAgICAgIH07XG4gICAgICAgIGlmIChmaWVsZFNwZWMuaW5wdXRUeXBlID09PSBcInRleHRhcmVhXCIpIHtcbiAgICAgICAgICAgIGZpZWxkU3BlYy5yb3dzID0gZmllbGRTcGVjLmRlZmF1bHQuc3BsaXQoXCJcXG5cIikubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWVsZFNwZWM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93VGFza09wdGlvbnNGb3IocGlwZWxpbmUpIHtcbiAgICAgICAgdGhpcy5hbGxQYXJhbWV0ZXJzID0gW107XG4gICAgICAgIGNvbnN0IGJhc2ljRm9ybUVudHJpZXMgPSB7fTtcbiAgICAgICAgY29uc3QgYWR2YW5jZWRGb3JtRW50cmllcyA9IHt9O1xuXG4gICAgICAgIGlmIChwaXBlbGluZS50YXNrT3B0aW9ucyAmJiBwaXBlbGluZS50YXNrT3B0aW9ucy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBjb25zdCBhbGxQcm9wSWRzID0gW107XG4gICAgICAgICAgICBjb25zdCBiYXNpY09wdGlvbklkczogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPVxuICAgICAgICAgICAgICAgIE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIHBpcGVsaW5lLXRlbXBsYXRlLXZpZXctcnVsZXMgb3B0aW9ucyBiZWZvcmVcbiAgICAgICAgICAgIC8vIGFueXRoaW5nIGVsc2UsIHNvIHRoYXQgb3B0aW9ucyBpbiBwaXBlbGluZS10ZW1wbGF0ZS12aWV3LXJ1bGVzXG4gICAgICAgICAgICAvLyBnbyB0byB0aGUgZnJvbSBvZiB0aGUgbGlzdCBpbiBhbGxQcm9wSWRzLlxuICAgICAgICAgICAgY29uc3Qgdmlld1J1bGVzID0gdGhpcy52aWV3UnVsZXNGb3JQaXBlbGluZShwaXBlbGluZS5pZCk7XG4gICAgICAgICAgICBpZiAodmlld1J1bGVzICYmIHZpZXdSdWxlcy50YXNrT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHRhc2tPcHRpb24gb2Ygdmlld1J1bGVzLnRhc2tPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbFByb3BJZHMucHVzaCh0YXNrT3B0aW9uLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXNrT3B0aW9uLmhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzaWNPcHRpb25JZHNbdGFza09wdGlvbi5pZF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUaGUgcGlwZWxpbmUtdGVtcGxhdGUtdmlldy1ydWxlcyBtYXkgbm90IGluY2x1ZGUgcnVsZXMgZm9yIGFsbFxuICAgICAgICAgICAgLy8gb2YgdGhlIHRhc2tPcHRpb25zIGluIHRoZSBwaXBlbGluZS4gIE1ha2Ugc3VyZSBvdXIgbGlzdCBvZiBpZHNcbiAgICAgICAgICAgIC8vIGlzIGNvbXBsZXRlIGJlZm9yZSB3ZSBzdGFydCB3b3JraW5nIHRocm91Z2ggdGhlIGxpc3QuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhwaXBlbGluZS50YXNrT3B0aW9ucy5wcm9wZXJ0aWVzKS5mb3JFYWNoKChwcm9wSWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYWxsUHJvcElkcy5pbmRleE9mKHByb3BJZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbFByb3BJZHMucHVzaChwcm9wSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBiYXNpY01hcDogSUZvcm1Hcm91cE1hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgICBjb25zdCBhZHZhbmNlZE1hcDogSUZvcm1Hcm91cE1hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICAgICAgICAgIC8vIGl0ZXJhdGUgaW4gdGhlIG9yZGVyIHNwZWNpZmllZCBieSBwaXBlbGluZS10ZW1wbGF0ZS12aWV3LXJ1bGVzXG4gICAgICAgICAgICBhbGxQcm9wSWRzLmZvckVhY2goKHByb3BJZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BlcnR5ID0gcGlwZWxpbmUudGFza09wdGlvbnMucHJvcGVydGllc1twcm9wSWRdO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZFNwZWMgPSB0aGlzLmZpZWxkU3BlY0ZvclRhc2tPcHRpb24ocHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0Jhc2ljID0gYmFzaWNPcHRpb25JZHNbcHJvcElkXTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cEtleSA9IHByb3BJZC5zcGxpdChcIi5cIilbMF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBncm91cCA9IChpc0Jhc2ljID8gYmFzaWNNYXAgOiBhZHZhbmNlZE1hcClbZ3JvdXBLZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cCA9IChpc0Jhc2ljID8gYmFzaWNNYXAgOiBhZHZhbmNlZE1hcClbZ3JvdXBLZXldID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEdST1VQX05BTUVTW2dyb3VwS2V5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5wdXNoKGZpZWxkU3BlYyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsUGFyYW1ldGVycy5wdXNoKGZpZWxkU3BlYyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1FbnRyaWVzID1cbiAgICAgICAgICAgICAgICAgICAgICAgIChpc0Jhc2ljID8gYmFzaWNGb3JtRW50cmllcyA6IGFkdmFuY2VkRm9ybUVudHJpZXMpO1xuICAgICAgICAgICAgICAgICAgICBmb3JtRW50cmllc1tmaWVsZFNwZWMuaWRdID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRTcGVjLmRlZmF1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gKGJmb3JiZXMpKDIwMTUtMTEtMTkpOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVmFsaWRhdG9ycy5yZXF1aXJlZCByZXR1cm5zIGFuIGludmFsaWQgc3RhdHVzIGZvclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2tib3hlcy90b2dnbGVzIHRoYXQgYXJlbid0IGNoZWNrZWQvdG9nZ2xlZCBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvciB0ZXh0Ym94ZXMgdGhhdCBhcmUgbm90IGZpbGxlZCBvdXQuIFNpbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBgcGlwZWxpbmUudGFza09wdGlvbnMucmVxdWlyZWRgIGhhcyBhbGwgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW4gaXQsIHRoZXJlJ3Mgbm90IGEgZ29vZCB3YXkgdG8gZGV0ZXJtaW5lIHdoaWNoXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmaWVsZHMgY2Fubm90IGJlIGJsYW5rIG9yIGZhbHNlLlxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEVycm9yOiB0aGUgcGlwZWxpbmUtdGVtcGxhdGUtdmlldy1ydWxlcyBpbmNsdWRlc1xuICAgICAgICAgICAgICAgICAgICAvLyBhIHByb3BlcnR5IGlkIHRoYXQgaXMgbm90IGluIHRoZSB0YXNrT3B0aW9ucyFcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvcElkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52bS5iYXNpY1BhcmFtZXRlcnMgPSB0aGlzLmZvcm1Hcm91cE1hcFRvQXJyYXkoYmFzaWNNYXApO1xuICAgICAgICAgICAgdGhpcy52bS5hZHZhbmNlZFBhcmFtZXRlcnMgPSB0aGlzLmZvcm1Hcm91cE1hcFRvQXJyYXkoYWR2YW5jZWRNYXApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudm0uYmFzaWNPcHRpb25zR3JvdXAgPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKGJhc2ljRm9ybUVudHJpZXMpO1xuICAgICAgICB0aGlzLnZtLmFkdmFuY2VkT3B0aW9uc0dyb3VwID1cbiAgICAgICAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoYWR2YW5jZWRGb3JtRW50cmllcyk7XG4gICAgICAgIHRoaXMudm0uZm9ybS5hZGRDb250cm9sKFwiYmFzaWNPcHRpb25zXCIsIHRoaXMudm0uYmFzaWNPcHRpb25zR3JvdXApO1xuICAgICAgICB0aGlzLnZtLmZvcm0uYWRkQ29udHJvbChcbiAgICAgICAgICAgIFwiYWR2YW5jZWRPcHRpb25zXCIsIHRoaXMudm0uYWR2YW5jZWRPcHRpb25zR3JvdXBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy52bS5iYXNpY09wdGlvbnNHcm91cC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgICAgIHRoaXMudm0uYWR2YW5jZWRPcHRpb25zR3JvdXAudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgIH1cblxuICAgIC8qIGV4YW1wbGVcbiAgICAgICAgaW5wdXQgPSB7XG4gICAgICAgICAgICBmb286IHsgbmFtZTogXCJGb28gTmFtZVwiLCBmaWVsZHM6IFtdIH0sXG4gICAgICAgICAgICBiYXI6IHsgbmFtZTogXCJCYXIgTmFtZVwiLCBmaWVsZHM6IFtdIH1cbiAgICAgICAgfVxuICAgICAgICBvdXRwdXQgPSB0aGlzLmZvcm1Hcm91cE1hcFRvQXJyYXkoaW5wdXQpO1xuICAgICAgICBvdXRwdXQgPT09IFtcbiAgICAgICAgICAgIHsgbmFtZTogXCJCYXIgTmFtZVwiLCBmaWVsZHM6IFtdIH1cbiAgICAgICAgICAgIHsgbmFtZTogXCJGb28gTmFtZVwiLCBmaWVsZHM6IFtdIH0sXG4gICAgICAgIF1cbiAgICAgKi9cbiAgICBwcml2YXRlIGZvcm1Hcm91cE1hcFRvQXJyYXkobWFwOiBJRm9ybUdyb3VwTWFwKTogSUZvcm1Hcm91cFtdIHtcbiAgICAgICAgY29uc3QgYXJyYXk6IElGb3JtR3JvdXBbXSA9IFtdO1xuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobWFwKTtcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGFycmF5LnB1c2gobWFwW2tleV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gdGhpcyBzb3J0cyB0aGUgZ3JvdXBzIHRoZW1zZWx2ZXMsIG5vdCB0aGUgZmllbGRzIGluIHRoZSBncm91cHNcbiAgICAgICAgYXJyYXkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgaWYgKGEubmFtZSA8IGIubmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhLm5hbWUgPiBiLm5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cblxuICAgIHByaXZhdGUgb25EYXRhc2V0SXRlbVNlbGVjdGVkKFxuICAgICAgICAgICAgY2F0YWxvZ1NwZWM6IGFueSwgbW9kYWw6IHsgaGlkZTogRnVuY3Rpb24gfSkge1xuICAgICAgICBjb25zdCBpdGVtID0gY2F0YWxvZ1NwZWMuc2VsZWN0ZWREYXRhO1xuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgKDxDb250cm9sPiB0aGlzLnZtLmVudHJ5UG9pbnRzR3JvdXAuZmluZChjYXRhbG9nU3BlYy5hcmdzLmdyaWRJZCkpXG4gICAgICAgICAgICAgICAgLnVwZGF0ZVZhbHVlKGl0ZW0uaWQpO1xuICAgICAgICAgICAgY2F0YWxvZ1NwZWMuc2VsZWN0aW9uTmFtZSA9IGl0ZW0ubmFtZTtcbiAgICAgICAgICAgIG1vZGFsLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25EYXRhc2V0TW9kYWxIaWRkZW5DaGFuZ2UoXG4gICAgICAgIGhpZGRlbjogYm9vbGVhbiwgY2F0YWxvZ1NwZWM6IGFueSwgYnV0dG9uOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBpZiAoaGlkZGVuKSB7XG4gICAgICAgICAgICBjYXRhbG9nU3BlYy5zZWxlY3RlZERhdGEgPSBudWxsO1xuICAgICAgICAgICAgYnV0dG9uLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYXRhbG9nU3BlYy5hcmdzLmFnR3JpZE9wdGlvbnMuYXBpLnNpemVDb2x1bW5zVG9GaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25BZHZhbmNlZE1vZGFsSGlkZGVuQ2hhbmdlKGhpZGRlbjogYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMudm0uYWR2YW5jZWRPcHRpb25zR3JvdXA7XG5cbiAgICAgICAgaWYgKCFoaWRkZW4pIHtcbiAgICAgICAgICAgIC8vIFJlc2V0IHRoZSBjb250ZW50IHNjcm9sbGVyIHdoZW4gdGhlIG1vZGFsIG9wZW5zXG4gICAgICAgICAgICBjb250ZW50LnNjcm9sbFRvcCA9IDA7XG5cbiAgICAgICAgICAgIC8vIFN0b3JlIHRoZSB2YWx1ZXMgZm9yIHRoZSBncm91cCB3aGVuIHNob3dpbmcgc28gdGhleSBjYW4gYmVcbiAgICAgICAgICAgIC8vIHVzZWQgdG8gcmVzZXQgdGhlIGZvcm0gaWYgdGhlIHVzZXIgY2xpY2tzIFwiQ2FuY2VsXCJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEFkdmFuY2VkT3B0aW9ucyA9IGdyb3VwLnZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdEFkdmFuY2VkT3B0aW9ucykge1xuICAgICAgICAgICAgLy8gUmVzZXQgdGhlIGZvcm0gdG8gdGhlIHZhbHVlcyBzdG9yZWQgYmVmb3JlIGl0IHdhcyBsYXVuY2hlZFxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuZGVmYXVsdEFkdmFuY2VkT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlZmF1bHRBZHZhbmNlZE9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZGVmYXVsdEFkdmFuY2VkT3B0aW9uc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sOiBDb250cm9sID0gPGFueT4gZ3JvdXAuY29udHJvbHNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sLnVwZGF0ZVZhbHVlKHZhbHVlLCB7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0QWR2YW5jZWRPcHRpb25zID0gbnVsbDtcbiAgICAgICAgICAgIGdyb3VwLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25BY2NlcHRBZHZhbmNlZFBhcmFtZXRlcnMobW9kYWw6IE1vZGFsRGlhbG9nKSB7XG4gICAgICAgIC8vIENsZWFyIG91dCB0aGUgZGVmYXVsdHMgc28gdGhlIHJlc2V0IHJvdXRpbmUgZG9lc24ndCBydW5cbiAgICAgICAgLy8gaW4gYG9uQWR2YW5jZWRNb2RhbEhpZGRlbkNoYW5nZWBcbiAgICAgICAgdGhpcy5kZWZhdWx0QWR2YW5jZWRPcHRpb25zID0gbnVsbDtcbiAgICAgICAgbW9kYWwuaGlkZSgpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==