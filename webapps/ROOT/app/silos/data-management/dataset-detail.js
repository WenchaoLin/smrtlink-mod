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
var common_1 = require("angular2/common");
var router_1 = require("angular2/router");
var status_1 = require("../../navigation/status");
var error_service_1 = require("../error/error-service");
// import {PAGE_FOR_FILETYPE} from "../../page";
var dataset_type_1 = require("../../data/dataset-type");
var progress_circular_1 = require("athenaeum/components/progress-circular/progress-circular");
var imprint_1 = require("../../directives/imprint");
var stamp_1 = require("../../strings/stamp");
var text_1 = require("../../strings/en-us/text");
var http_1 = require("athenaeum/services/http");
var io_1 = require("athenaeum/data/api/io");
var api_1 = require("../../data/io/api");
var lookup_pipe_1 = require("../../pipes/lookup-pipe");
var rules_pipe_1 = require("../../pipes/rules-pipe");
var analysis_1 = require("../analysis");
var report_view_rules_1 = require("../analysis/report-view-rules");
var DatasetDetail = (function () {
    function DatasetDetail(params, router, errorService, io, servers) {
        this.TEXT = text_1.TEXT;
        this.STAMP = stamp_1.STAMP;
        this.vm = {
            // state: "...",
            isOpen: null,
            show: null,
            dataset: {
                id: null,
                jobId: null,
                name: null,
                numRecords: 0,
                totalLength: 0,
                createdAt: null,
                updatedAt: null,
                path: null
            },
            job: {
                name: null,
                id: null,
                state: "Loading...",
                createdAt: null,
                updatedAt: null,
                path: null
            },
            jobCreatedAt: null,
            jobUpdatedAt: null,
            jobApplicationName: "",
            log: "<empty>",
            taskOptions: [],
            fileDownloadList: []
        };
        this.title = "";
        this.keys = [];
        this.jobEvents = [];
        this.content = {
            settings: {}
        };
        this.dataSetType = "";
        this.jobId = null;
        this.logUuid = null;
        this.reportNamesByIds = null;
        this.pipelineTemplatesByIds = null;
        this.reportRules = report_view_rules_1.REPORT_VIEW_RULES;
        this.datasetId = parseInt(params.get("datasetId"), 10);
        this.dataSetType = params.get("type") || "subreads";
        this.vm.isOpen = {};
        this.vm.show = {};
        this.initMenus();
        this.showNothing();
        this.io = io;
        this.errorService = errorService;
        this.router = router;
        this.servers = servers;
    }
    DatasetDetail.jobStatesIncludesFinishedState = function (jobStates) {
        return ((jobStates.indexOf("SUCCESSFUL") !== -1) ||
            (jobStates.indexOf("FAILED") !== -1) ||
            (jobStates.indexOf("KILLED") !== -1));
    };
    DatasetDetail.reformatDate = function (date) {
        return new Date(date).toLocaleString();
    };
    DatasetDetail.prototype.ngOnInit = function () {
        this.fetchReportViewRules();
        this.fetchPipelineTemplates();
        this.fetchDataset();
    };
    DatasetDetail.prototype.routerOnActivate = function (next, prev) {
        this.waitForPipelineTemplatesAndThenLoadAnalysisJob();
    };
    DatasetDetail.prototype.waitForPipelineTemplatesAndThenLoadAnalysisJob = function () {
        var _this = this;
        setTimeout(function () {
            if ((_this.reportNamesByIds !== null) &&
                (_this.pipelineTemplatesByIds !== null) &&
                (_this.jobId !== null)) {
                _this.onViewContentLoaded();
            }
            else {
                _this.waitForPipelineTemplatesAndThenLoadAnalysisJob();
            }
        }, 250);
    };
    DatasetDetail.prototype.onViewContentLoaded = function () {
        this.loadAnalysisJob();
        this.loadAnalysisEvents();
        this.loadLogUuid();
        this.vm.show.jobStatus = true;
    };
    DatasetDetail.prototype.doCancel = function () {
        this.router.navigate(["../Index"]);
    };
    DatasetDetail.prototype.doCreateAnalysis = function () {
        this.router.navigate(["/Analysis", "Setting", { shortName: this.dataSetType, id: this.datasetId, src: "dm" }]);
    };
    DatasetDetail.prototype.toggleMenu = function (menuItem, event) {
        var menuId = (menuItem && menuItem.name) ? menuItem.name : menuItem;
        var wasOpen = this.vm.isOpen[menuId];
        this.closeAllMenus();
        this.vm.isOpen[menuId] = !wasOpen;
        event.preventDefault();
    };
    DatasetDetail.prototype.isShowingAttributes = function (reportId) {
        var show = this.vm.show;
        return (show.everything || (show.attributes === reportId));
    };
    DatasetDetail.prototype.isShowingPlot = function (plotId) {
        return (this.vm.show.everything || (this.vm.show.plot === plotId));
    };
    DatasetDetail.prototype.isShowingTable = function (tableId) {
        return (this.vm.show.everything || (this.vm.show.table === tableId));
    };
    DatasetDetail.prototype.goJobStatus = function () {
        this.showNothing();
        this.vm.show.jobStatus = true;
    };
    DatasetDetail.prototype.goThumbnails = function () {
        this.showNothing();
        this.vm.show.thumbnails = true;
    };
    DatasetDetail.prototype.goEverything = function () {
        this.showEverything();
    };
    DatasetDetail.prototype.goAttributes = function (reportId) {
        this.showNothing();
        this.vm.show.attributes = reportId;
    };
    DatasetDetail.prototype.goPlot = function (plotId) {
        this.showNothing();
        this.vm.show.plot = plotId;
    };
    DatasetDetail.prototype.goTable = function (tableId) {
        this.showNothing();
        this.vm.show.table = tableId;
    };
    DatasetDetail.prototype.goDownloads = function () {
        this.showNothing();
        this.vm.show.downloads = true;
    };
    DatasetDetail.prototype.goLog = function () {
        this.showNothing();
        this.vm.show.log = true;
    };
    DatasetDetail.prototype.fileTypeNameFromId = function (fileTypeId) {
        return fileTypeId.split(".").pop();
    };
    DatasetDetail.prototype.initMenus = function () {
        this.vm.isOpen = {};
        this.vm.isOpen.overview = true;
    };
    DatasetDetail.prototype.closeAllMenus = function () {
        for (var menu in this.vm.isOpen) {
            if (this.vm.isOpen.hasOwnProperty(menu)) {
                this.vm.isOpen[menu] = false;
            }
        }
    };
    DatasetDetail.prototype.showNothing = function () {
        this.setShowFlagsTo(false);
    };
    DatasetDetail.prototype.showEverything = function () {
        this.setShowFlagsTo(true);
    };
    DatasetDetail.prototype.setShowFlagsTo = function (value) {
        this.vm.show.jobStatus = value;
        this.vm.show.thumbnails = value;
        this.vm.show.metrics = value;
        this.vm.show.overview = value;
        this.vm.show.report = value;
        this.vm.show.attributes = value;
        this.vm.show.plot = value;
        this.vm.show.table = value;
        this.vm.show.downloads = value;
        this.vm.show.log = value;
        this.vm.show.everything = value;
    };
    DatasetDetail.prototype.fetchReportViewRules = function () {
        var _this = this;
        var endpoint = api_1.API.nReportViewRules;
        var promise = this.io
            .getEndpointAsync(endpoint);
        promise.then(function (result) {
            _this.reportNamesByIds = {};
            /*
                // TODO: Add these to the data returned from the endpoint
                {
                    "adapter_xml_report": "Adapter Report",
                    "filtering_stats_xml_report": "Filtering Statistics Report",
                    "loading_xml_report": "Loading Report",
                    "simple_dataset_report": "Simple Report"
                };
            */
            for (var _i = 0, _a = result; _i < _a.length; _i++) {
                var entry = _a[_i];
                _this.reportNamesByIds[entry.id] = entry.name;
            }
        })
            .catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    DatasetDetail.prototype.fetchPipelineTemplates = function () {
        var _this = this;
        var endpoint = api_1.API.nPipelineTemplates;
        var promise = this.io
            .getEndpointAsync(endpoint);
        promise.then(function (result) {
            _this.pipelineTemplatesByIds = {};
            for (var _i = 0, _a = result; _i < _a.length; _i++) {
                var entry = _a[_i];
                _this.pipelineTemplatesByIds[entry.id] = entry;
            }
        })
            .catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    DatasetDetail.prototype.fetchDataset = function () {
        var _this = this;
        var endpoint = api_1.API.anyDatasetByInt
            .and({ $set_int: this.datasetId });
        var promise = this.io
            .getEndpointAsync(endpoint);
        promise.then(function (data) {
            var HTTP_CODE = "httpCode";
            if (data[HTTP_CODE] === 404) {
                _this.errorService.showError(data);
            }
            else {
                _this.vm.dataset = data;
                _this.title = data.name;
                _this.keys = Object.keys(data).sort(function (a, b) {
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                    // a must be equal to b
                    return 0;
                });
                _this.jobId = _this.vm.dataset.jobId.toString();
            }
        })
            .catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    DatasetDetail.prototype.loadAnalysisJob = function () {
        var _this = this;
        var endpoint = api_1.API.aJob
            .and({ $job_int: this.jobId });
        var promise = this.io
            .getEndpointAsync(endpoint);
        promise.then(function (result) {
            var HTTP_CODE = "httpCode";
            if (result[HTTP_CODE] === 404) {
                _this.errorService.showError(result);
            }
            else {
                _this.vm.job = result;
                _this.vm.jobCreatedAt = DatasetDetail.reformatDate(_this.vm.job.createdAt);
                _this.vm.jobUpdatedAt = DatasetDetail.reformatDate(_this.vm.job.updatedAt);
            }
        })
            .catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    DatasetDetail.prototype.loadAnalysisEvents = function () {
        var _this = this;
        var endpoint = api_1.API.nJobEvents
            .and({ $job_int: this.jobId });
        var promise = this.io
            .getEndpointAsync(endpoint);
        promise.then(function (result) {
            if (Array.isArray(result)) {
                var arrayResult = result;
                if (arrayResult.length > _this.jobEvents.length) {
                    _this.jobEvents = arrayResult;
                    _this.loadAnalysisJob();
                    _this.loadEntryPoints();
                    _this.loadOptions();
                    _this.loadAnalysisReports();
                    _this.loadFileDownloadList();
                    _this.loadLogUuid();
                }
                else {
                }
                var jobStates = arrayResult.map(function (item) { return item.state; });
                if (!DatasetDetail.jobStatesIncludesFinishedState(jobStates)) {
                    var fourSeconds = 4000;
                    setTimeout(function () { return _this.loadAnalysisEvents(); }, fourSeconds);
                }
            }
            else {
            }
        })
            .catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    DatasetDetail.prototype.loadEntryPoints = function () {
        var _this = this;
        this.entryPoints = [];
        var endpoint = api_1.API.nJobEntryPoints
            .and({ $job_int: this.jobId });
        var promise = this.io
            .getEndpointAsync(endpoint);
        promise.then(function (result) {
            if (Array.isArray(result)) {
                var arrayResult = result;
                for (var _i = 0, arrayResult_1 = arrayResult; _i < arrayResult_1.length; _i++) {
                    var entry = arrayResult_1[_i];
                    _this.loadEntryPoint(entry);
                }
            }
            else {
            }
        })
            .catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    DatasetDetail.prototype.loadOptions = function () {
        var _this = this;
        this.entryPoints = [];
        var endpoint = api_1.API.nJobOptions
            .and({ $job_int: this.jobId });
        var promise = this.io
            .getEndpointAsync(endpoint);
        promise.then(function (result) {
            var options = result;
            var pt = _this.pipelineTemplatesByIds[options.pipelineId];
            _this.vm.jobApplicationName =
                (pt && pt.name) ? pt.name : options.pipelineId;
            if (options.taskOptions) {
                _this.vm.taskOptions = options.taskOptions.sort(function (x, y) { return x.optionId.localeCompare(y.optionId); });
                if (pt && pt.taskOptions && pt.taskOptions.properties) {
                    var properties = pt.taskOptions.properties;
                    for (var _i = 0, _a = _this.vm.taskOptions; _i < _a.length; _i++) {
                        var option = _a[_i];
                        var schema = properties[option.optionId];
                        var title = schema ? schema.title : null;
                        option.name = title || option.optionId;
                    }
                }
            }
            else {
                _this.vm.taskOptions = [];
            }
            if (_this.vm.taskOptions.length === 0) {
                _this.vm.taskOptions.push({ name: "none", value: "" });
            }
        })
            .catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    DatasetDetail.prototype.loadEntryPoint = function (entryPoint) {
        var _this = this;
        var uuid = entryPoint.datasetUUID;
        var endpoint = api_1.API.anyDatasetByUuid
            .and({ $set_uuid: uuid });
        var promise = this.io
            .getEndpointAsync(endpoint);
        promise.then(function (result) {
            var id = result.id;
            var datasetType = dataset_type_1.DatasetType.byFiletype(entryPoint.datasetType);
            _this.entryPoints.push({
                title: datasetType.title,
                route: ["/Analysis", ("" + analysis_1.PAGE_FOR_FILETYPE[entryPoint.datasetType]), { id: id }],
                id: id
            });
        })
            .catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    DatasetDetail.prototype.loadAnalysisReports = function () {
        var _this = this;
        this.reports = [];
        this.thumbnails = [];
        // const TEMPLATE_URL = API.nJobReports;
        var endpoint = api_1.API.nJobReports.and({ $job_int: this.jobId });
        var promise = this.io.getEndpointAsync(endpoint);
        promise.then(function (result) {
            if (Array.isArray(result)) {
                var arrayResult = result;
                for (var _i = 0, arrayResult_2 = arrayResult; _i < arrayResult_2.length; _i++) {
                    var entry = arrayResult_2[_i];
                    if (entry.dataStoreFile && entry.dataStoreFile.uuid) {
                        var reportUuid = entry.dataStoreFile.uuid;
                        _this.loadAnalysisReport(reportUuid);
                    }
                }
            }
            else {
            }
        })
            .catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    DatasetDetail.prototype.loadAnalysisReport = function (reportUuid) {
        var _this = this;
        var endpoint = api_1.API.aJobReport.and({
            $job_int: this.jobId,
            $report_uuid: reportUuid
        });
        var promise = this.io.getEndpointAsync(endpoint);
        promise.then(function (result) {
            var report = result;
            _this.preprocessReportImages(report);
            _this.preprocessReportTables(report);
            _this.reports.push(report);
            _this.addThumbnailsForReport(report);
        })
            .catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    DatasetDetail.prototype.loadLogUuid = function () {
        var _this = this;
        if (this.logUuid) {
            this.loadAnalysisLog();
            return;
        }
        var endpoint = api_1.API.nJobDatastores
            .and({ $job_int: this.jobId });
        var promise = this.io
            .getEndpointAsync(endpoint);
        promise.then(function (result) {
            var masterLogs = result.filter(function (x) { return x.sourceId.endsWith("master.log"); });
            if (masterLogs.length > 0) {
                _this.logUuid = masterLogs[0].uuid;
            }
            _this.loadAnalysisLog();
        }).catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    // eventually the analysis job log should be loaded this way as well
    DatasetDetail.prototype.loadAnalysisLog = function () {
        var _this = this;
        if (!this.logUuid) {
            return;
        }
        var endpoint = api_1.API.aJobFileDownload.and({
            $job_int: this.jobId,
            $store_uuid: this.logUuid
        });
        var promise = this.io.getEndpointAsync(endpoint);
        promise.then(function (result) {
            _this.vm.log = result;
        }).catch(function (error) {
            _this.vm.log = null;
        });
    };
    DatasetDetail.prototype.loadFileDownloadList = function () {
        var _this = this;
        var endpoint = api_1.API.nJobDatastores
            .and({ $job_int: this.jobId });
        var promise = this.io
            .getEndpointAsync(endpoint);
        promise.then(function (result) {
            _this.vm.fileDownloadList = _this.addDownloadUrls(result);
        })
            .catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    DatasetDetail.prototype.addDownloadUrls = function (fileDownloadList) {
        for (var _i = 0, fileDownloadList_1 = fileDownloadList; _i < fileDownloadList_1.length; _i++) {
            var entry = fileDownloadList_1[_i];
            var endpoint = api_1.API.aJobFileDownload.and({
                $job_int: this.jobId,
                $store_uuid: entry.uuid
            });
            entry.downloadUrl = this.io.urlFor(endpoint);
        }
        return fileDownloadList;
    };
    DatasetDetail.prototype.addThumbnailsForReport = function (report) {
        var i = 0;
        for (var _i = 0, _a = report.plotGroups; _i < _a.length; _i++) {
            var plotGroup = _a[_i];
            for (var _b = 0, _c = plotGroup.plots; _b < _c.length; _b++) {
                var plot = _c[_b];
                this.thumbnails.push({
                    id: plot.id,
                    caption: plot.caption,
                    imageUrl: plot.imageUrl
                });
            }
        }
    };
    DatasetDetail.prototype.preprocessReportImages = function (report) {
        report.name = this.reportNamesByIds[report.id] || report.id;
        report.plots = [];
        var i = 0;
        for (var _i = 0, _a = report.plotGroups; _i < _a.length; _i++) {
            var plotGroup = _a[_i];
            for (var _b = 0, _c = plotGroup.plots; _b < _c.length; _b++) {
                var plot = _c[_b];
                plot.imageUrl = this.urlForImageFile(plot.image);
                plot.caption = plot.caption || plotGroup.title;
                report.plots.push(plot);
            }
        }
        return report;
    };
    DatasetDetail.prototype.preprocessReportTables = function (report) {
        for (var _i = 0, _a = report.tables; _i < _a.length; _i++) {
            var table = _a[_i];
            // fail gracefully if the title is missing
            table.title = table.title || table.id.split(".")[0];
            var rows = table.rows = [];
            for (var _b = 0, _c = table.columns; _b < _c.length; _b++) {
                var column = _c[_b];
                for (var i = 0; i < column.values.length; ++i) {
                    if (!rows[i]) {
                        rows[i] = [];
                    }
                    rows[i].push({
                        id: column.id,
                        value: column.values[i]
                    });
                }
            }
        }
        return report;
    };
    DatasetDetail.prototype.urlForImageFile = function (fileName) {
        var endpoint = api_1.API.aJobReportResource.and({
            $job_int: this.jobId,
            $file_name: fileName
        });
        return this.servers.getUrl("api://smrt-link/" + endpoint.url().replace("$job_type", "pbsmrtpipe"));
    };
    DatasetDetail = __decorate([
        core_1.Component({
            selector: "dataset-detail",
            providers: [error_service_1.ErrorService],
            moduleId: module.id,
            templateUrl: "dataset-detail.html",
            styleUrls: ["dataset-detail.css"],
            directives: [imprint_1.Imprint, common_1.CORE_DIRECTIVES, router_1.RouterLink, progress_circular_1.ProgressCircular],
            pipes: [lookup_pipe_1.LookupPipe, rules_pipe_1.RulesPipe],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        router_1.CanActivate(status_1.canConnect), 
        __metadata('design:paramtypes', [router_1.RouteParams, router_1.Router, error_service_1.ErrorService, io_1.IO, http_1.APIServers])
    ], DatasetDetail);
    return DatasetDetail;
}());
exports.DatasetDetail = DatasetDetail;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9kYXRhLW1hbmFnZW1lbnQvZGF0YXNldC1kZXRhaWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOzs7Ozs7Ozs7OztBQUVILHFCQUFtRCxlQUFlLENBQUMsQ0FBQTtBQUNuRSx1QkFBOEIsaUJBQWlCLENBQUMsQ0FBQTtBQUNoRCx1QkFFTyxpQkFBaUIsQ0FBQyxDQUFBO0FBRXpCLHVCQUF5Qix5QkFBeUIsQ0FBQyxDQUFBO0FBRW5ELDhCQUEyQix3QkFBd0IsQ0FBQyxDQUFBO0FBRXBELGdEQUFnRDtBQUVoRCw2QkFBMEIseUJBQXlCLENBQUMsQ0FBQTtBQUVwRCxrQ0FFTywwREFBMEQsQ0FBQyxDQUFBO0FBRWxFLHdCQUFzQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ2pELHNCQUFvQixxQkFBcUIsQ0FBQyxDQUFBO0FBQzFDLHFCQUFtQiwwQkFBMEIsQ0FBQyxDQUFBO0FBSTlDLHFCQUF5Qix5QkFBeUIsQ0FBQyxDQUFBO0FBRW5ELG1CQUFpQix1QkFBdUIsQ0FBQyxDQUFBO0FBRXpDLG9CQUFrQixtQkFBbUIsQ0FBQyxDQUFBO0FBRXRDLDRCQUF5Qix5QkFBeUIsQ0FBQyxDQUFBO0FBQ25ELDJCQUF3Qix3QkFBd0IsQ0FBQyxDQUFBO0FBRWpELHlCQUFnQyxhQUFhLENBQUMsQ0FBQTtBQUM5QyxrQ0FBZ0MsK0JBQStCLENBQUMsQ0FBQTtBQTZEaEU7SUE2REksdUJBQVksTUFBbUIsRUFDbkIsTUFBYyxFQUNkLFlBQTBCLEVBQzFCLEVBQU0sRUFDTixPQUFtQjtRQS9EeEIsU0FBSSxHQUFRLFdBQUksQ0FBQztRQUNqQixVQUFLLEdBQVEsYUFBSyxDQUFDO1FBRW5CLE9BQUUsR0FBRztZQUNSLGdCQUFnQjtZQUNoQixNQUFNLEVBQUUsSUFBSTtZQUNaLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFhO2dCQUNoQixFQUFFLEVBQUUsSUFBSTtnQkFDUixLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUUsSUFB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LENBQUMsTUFBTSxDQUN0QixxQkFBbUIsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFHLENBQ3pFLENBQUM7SUFDTixDQUFDO0lBdG1CTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7WUFDekIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxxQkFBcUI7WUFDbEMsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDakMsVUFBVSxFQUFFLENBQUMsaUJBQU8sRUFBRSx3QkFBZSxFQUFFLG1CQUFVLEVBQUUsb0NBQWdCLENBQUM7WUFDcEUsS0FBSyxFQUFFLENBQUMsd0JBQVUsRUFBRSxzQkFBUyxDQUFDO1lBQzlCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3hDLENBQUM7UUFDRCxvQkFBVyxDQUFDLG1CQUFVLENBQUM7O3FCQUFBO0lBNmxCeEIsb0JBQUM7QUFBRCxDQTVsQkEsQUE0bEJDLElBQUE7QUE1bEJZLHFCQUFhLGdCQTRsQnpCLENBQUEiLCJmaWxlIjoiYXBwL3NpbG9zL2RhdGEtbWFuYWdlbWVudC9kYXRhc2V0LWRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTUsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYSwgSW5jLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmRiYXJyZXRvQHBhY2lmaWNiaW9zY2llbmNlcy5jb21cIj5EYXZpZCBCYXJyZXRvPC9hPlxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgT25Jbml0fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcbmltcG9ydCB7XG4gICAgUm91dGVyLCBSb3V0ZVBhcmFtcywgUm91dGVyTGluaywgQ2FuQWN0aXZhdGUsIE9uQWN0aXZhdGVcbn0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuXG5pbXBvcnQge2NhbkNvbm5lY3R9IGZyb20gXCIuLi8uLi9uYXZpZ2F0aW9uL3N0YXR1c1wiO1xuXG5pbXBvcnQge0Vycm9yU2VydmljZX0gZnJvbSBcIi4uL2Vycm9yL2Vycm9yLXNlcnZpY2VcIjtcblxuLy8gaW1wb3J0IHtQQUdFX0ZPUl9GSUxFVFlQRX0gZnJvbSBcIi4uLy4uL3BhZ2VcIjtcblxuaW1wb3J0IHtEYXRhc2V0VHlwZX0gZnJvbSBcIi4uLy4uL2RhdGEvZGF0YXNldC10eXBlXCI7XG5cbmltcG9ydCB7XG4gICAgUHJvZ3Jlc3NDaXJjdWxhclxufSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvcHJvZ3Jlc3MtY2lyY3VsYXIvcHJvZ3Jlc3MtY2lyY3VsYXJcIjtcblxuaW1wb3J0IHtJbXByaW50fSBmcm9tIFwiLi4vLi4vZGlyZWN0aXZlcy9pbXByaW50XCI7XG5pbXBvcnQge1NUQU1QfSBmcm9tIFwiLi4vLi4vc3RyaW5ncy9zdGFtcFwiO1xuaW1wb3J0IHtURVhUfSBmcm9tIFwiLi4vLi4vc3RyaW5ncy9lbi11cy90ZXh0XCI7XG5cbmltcG9ydCB7U0lMT30gZnJvbSBcIi4uL3NpbG9cIjtcblxuaW1wb3J0IHtBUElTZXJ2ZXJzfSBmcm9tIFwiYXRoZW5hZXVtL3NlcnZpY2VzL2h0dHBcIjtcbmltcG9ydCB7RW5kcG9pbnR9IGZyb20gXCJhdGhlbmFldW0vZGF0YS9hcGkvZW5kcG9pbnRcIjtcbmltcG9ydCB7SU99IGZyb20gXCJhdGhlbmFldW0vZGF0YS9hcGkvaW9cIjtcblxuaW1wb3J0IHtBUEl9IGZyb20gXCIuLi8uLi9kYXRhL2lvL2FwaVwiO1xuXG5pbXBvcnQge0xvb2t1cFBpcGV9IGZyb20gXCIuLi8uLi9waXBlcy9sb29rdXAtcGlwZVwiO1xuaW1wb3J0IHtSdWxlc1BpcGV9IGZyb20gXCIuLi8uLi9waXBlcy9ydWxlcy1waXBlXCI7XG5cbmltcG9ydCB7UEFHRV9GT1JfRklMRVRZUEV9IGZyb20gXCIuLi9hbmFseXNpc1wiO1xuaW1wb3J0IHtSRVBPUlRfVklFV19SVUxFU30gZnJvbSBcIi4uL2FuYWx5c2lzL3JlcG9ydC12aWV3LXJ1bGVzXCI7XG5cbmludGVyZmFjZSBJSm9iSW5mbyB7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICBpZD86IG51bWJlcjtcbiAgICBzdGF0ZTogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdD86IHN0cmluZztcbiAgICB1cGRhdGVkQXQ/OiBzdHJpbmc7XG4gICAgcGF0aD86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElFbnRyeVBvaW50IHtcbiAgICBqb2JJZDogbnVtYmVyO1xuICAgIGRhdGFzZXRVVUlEOiBzdHJpbmc7XG4gICAgZGF0YXNldFR5cGU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElPcHRpb25zIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZW50cnlQb2ludHM6IEFycmF5PGFueT47XG4gICAgd29ya2Zsb3dPcHRpb25zOiBBcnJheTxhbnk+O1xuICAgIHRhc2tPcHRpb25zOiBBcnJheTxhbnk+O1xuICAgIHBpcGVsaW5lSWQ6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElEYXRhc2V0IHtcbiAgICBiaW9TYW1wbGVOYW1lOiBzdHJpbmc7XG4gICAgY2VsbEluZGV4OiBudW1iZXI7XG4gICAgY29tbWVudHM6IHN0cmluZztcbiAgICBjcmVhdGVkQXQ6IHN0cmluZztcbiAgICBpZDogbnVtYmVyO1xuICAgIGluc3RydW1lbnROYW1lOiBzdHJpbmc7XG4gICAgam9iSWQ6IG51bWJlcjtcbiAgICBtZDU6IHN0cmluZztcbiAgICBtZXRhZGF0YUNvbmV4dElkOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIG51bVJlY29yZHM6IG51bWJlcjtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgcHJvamVjdElkOiBudW1iZXI7XG4gICAgcnVuTmFtZTogc3RyaW5nO1xuICAgIHRhZ3M6IHN0cmluZztcbiAgICB0b3RhbExlbmd0aDogbnVtYmVyO1xuICAgIHVwZGF0ZWRBdDogc3RyaW5nO1xuICAgIHVzZXJJZDogbnVtYmVyO1xuICAgIHV1aWQ6IHN0cmluZztcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG4gICAgd2VsbE5hbWU6IHN0cmluZztcbiAgICB3ZWxsU2FtcGxlTmFtZTogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJkYXRhc2V0LWRldGFpbFwiLFxuICAgIHByb3ZpZGVyczogW0Vycm9yU2VydmljZV0sXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCJkYXRhc2V0LWRldGFpbC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJkYXRhc2V0LWRldGFpbC5jc3NcIl0sXG4gICAgZGlyZWN0aXZlczogW0ltcHJpbnQsIENPUkVfRElSRUNUSVZFUywgUm91dGVyTGluaywgUHJvZ3Jlc3NDaXJjdWxhcl0sXG4gICAgcGlwZXM6IFtMb29rdXBQaXBlLCBSdWxlc1BpcGVdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5AQ2FuQWN0aXZhdGUoY2FuQ29ubmVjdClcbmV4cG9ydCBjbGFzcyBEYXRhc2V0RGV0YWlsIGltcGxlbWVudHMgT25Jbml0LCBPbkFjdGl2YXRlIHtcblxuICAgIHB1YmxpYyBURVhUOiBhbnkgPSBURVhUO1xuICAgIHB1YmxpYyBTVEFNUDogYW55ID0gU1RBTVA7XG5cbiAgICBwdWJsaWMgdm0gPSB7XG4gICAgICAgIC8vIHN0YXRlOiBcIi4uLlwiLFxuICAgICAgICBpc09wZW46IG51bGwsXG4gICAgICAgIHNob3c6IG51bGwsXG4gICAgICAgIGRhdGFzZXQ6IDxJRGF0YXNldD4ge1xuICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICBqb2JJZDogbnVsbCxcbiAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICBudW1SZWNvcmRzOiAwLFxuICAgICAgICAgICAgdG90YWxMZW5ndGg6IDAsXG4gICAgICAgICAgICBjcmVhdGVkQXQ6IG51bGwsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IG51bGwsXG4gICAgICAgICAgICBwYXRoOiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIGpvYjogPElKb2JJbmZvPntcbiAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgIHN0YXRlOiBcIkxvYWRpbmcuLi5cIixcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogbnVsbCxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogbnVsbCxcbiAgICAgICAgICAgIHBhdGg6IG51bGxcbiAgICAgICAgfSxcbiAgICAgICAgam9iQ3JlYXRlZEF0OiBudWxsLFxuICAgICAgICBqb2JVcGRhdGVkQXQ6IG51bGwsXG4gICAgICAgIGpvYkFwcGxpY2F0aW9uTmFtZTogXCJcIixcbiAgICAgICAgbG9nOiBcIjxlbXB0eT5cIixcbiAgICAgICAgdGFza09wdGlvbnM6IFtdLFxuICAgICAgICBmaWxlRG93bmxvYWRMaXN0OiBbXVxuICAgIH07XG5cbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyA9IFwiXCI7XG4gICAgcHVibGljIGtleXM6IHN0cmluZ1tdID0gW107XG5cbiAgICBwdWJsaWMgZW50cnlQb2ludHM7XG4gICAgcHVibGljIGpvYkV2ZW50cyA9IFtdO1xuICAgIHB1YmxpYyByZXBvcnRzO1xuICAgIHB1YmxpYyB0aHVtYm5haWxzO1xuICAgIHB1YmxpYyBjb250ZW50ID0ge1xuICAgICAgICBzZXR0aW5nczoge31cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBkYXRhc2V0SWQ6IG51bWJlcjtcbiAgICBwcml2YXRlIGRhdGFTZXRUeXBlOiBzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgam9iSWQ6IHN0cmluZyA9IG51bGw7XG4gICAgcHJpdmF0ZSBsb2dVdWlkOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcjtcbiAgICBwcml2YXRlIGlvOiBJTztcbiAgICBwcml2YXRlIGVycm9yU2VydmljZTogRXJyb3JTZXJ2aWNlO1xuICAgIHByaXZhdGUgc2VydmVyczogQVBJU2VydmVycztcblxuICAgIHByaXZhdGUgcmVwb3J0TmFtZXNCeUlkcyA9IG51bGw7XG4gICAgcHJpdmF0ZSBwaXBlbGluZVRlbXBsYXRlc0J5SWRzID0gbnVsbDtcblxuICAgIHByaXZhdGUgcmVwb3J0UnVsZXMgPSBSRVBPUlRfVklFV19SVUxFUztcblxuICAgIGNvbnN0cnVjdG9yKHBhcmFtczogUm91dGVQYXJhbXMsXG4gICAgICAgICAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgZXJyb3JTZXJ2aWNlOiBFcnJvclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgaW86IElPLFxuICAgICAgICAgICAgICAgIHNlcnZlcnM6IEFQSVNlcnZlcnMpIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0SWQgPSBwYXJzZUludChwYXJhbXMuZ2V0KFwiZGF0YXNldElkXCIpLCAxMCk7XG4gICAgICAgIHRoaXMuZGF0YVNldFR5cGUgPSBwYXJhbXMuZ2V0KFwidHlwZVwiKSB8fCBcInN1YnJlYWRzXCI7XG5cbiAgICAgICAgdGhpcy52bS5pc09wZW4gPSB7fTtcbiAgICAgICAgdGhpcy52bS5zaG93ID0ge307XG4gICAgICAgIHRoaXMuaW5pdE1lbnVzKCk7XG4gICAgICAgIHRoaXMuc2hvd05vdGhpbmcoKTtcblxuXG4gICAgICAgIHRoaXMuaW8gPSBpbztcbiAgICAgICAgdGhpcy5lcnJvclNlcnZpY2UgPSBlcnJvclNlcnZpY2U7XG4gICAgICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuICAgICAgICB0aGlzLnNlcnZlcnMgPSBzZXJ2ZXJzO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGpvYlN0YXRlc0luY2x1ZGVzRmluaXNoZWRTdGF0ZShqb2JTdGF0ZXM6IEFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIChqb2JTdGF0ZXMuaW5kZXhPZihcIlNVQ0NFU1NGVUxcIikgIT09IC0xKSB8fFxuICAgICAgICAgICAgKGpvYlN0YXRlcy5pbmRleE9mKFwiRkFJTEVEXCIpICE9PSAtMSkgfHxcbiAgICAgICAgICAgIChqb2JTdGF0ZXMuaW5kZXhPZihcIktJTExFRFwiKSAhPT0gLTEpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVmb3JtYXREYXRlKGRhdGU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZSkudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5mZXRjaFJlcG9ydFZpZXdSdWxlcygpO1xuICAgICAgICB0aGlzLmZldGNoUGlwZWxpbmVUZW1wbGF0ZXMoKTtcbiAgICAgICAgdGhpcy5mZXRjaERhdGFzZXQoKTtcbiAgICB9XG5cbiAgICByb3V0ZXJPbkFjdGl2YXRlKG5leHQsIHByZXYpIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yUGlwZWxpbmVUZW1wbGF0ZXNBbmRUaGVuTG9hZEFuYWx5c2lzSm9iKCk7XG4gICAgfVxuXG4gICAgd2FpdEZvclBpcGVsaW5lVGVtcGxhdGVzQW5kVGhlbkxvYWRBbmFseXNpc0pvYigpIHtcbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMucmVwb3J0TmFtZXNCeUlkcyAhPT0gbnVsbCkgJiZcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucGlwZWxpbmVUZW1wbGF0ZXNCeUlkcyAhPT0gbnVsbCkgJiZcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuam9iSWQgIT09IG51bGwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25WaWV3Q29udGVudExvYWRlZCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdEZvclBpcGVsaW5lVGVtcGxhdGVzQW5kVGhlbkxvYWRBbmFseXNpc0pvYigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAyNTBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBvblZpZXdDb250ZW50TG9hZGVkKCkge1xuICAgICAgICB0aGlzLmxvYWRBbmFseXNpc0pvYigpO1xuICAgICAgICB0aGlzLmxvYWRBbmFseXNpc0V2ZW50cygpO1xuICAgICAgICB0aGlzLmxvYWRMb2dVdWlkKCk7XG4gICAgICAgIHRoaXMudm0uc2hvdy5qb2JTdGF0dXMgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBkb0NhbmNlbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiLi4vSW5kZXhcIl0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBkb0NyZWF0ZUFuYWx5c2lzKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvQW5hbHlzaXNcIiwgXCJTZXR0aW5nXCIsIHsgc2hvcnROYW1lOiB0aGlzLmRhdGFTZXRUeXBlLCBpZDogdGhpcy5kYXRhc2V0SWQsIHNyYzogXCJkbVwiIH1dKTtcbiAgICB9XG5cbiAgICB0b2dnbGVNZW51KG1lbnVJdGVtLCBldmVudCkge1xuICAgICAgICBsZXQgbWVudUlkID0gKG1lbnVJdGVtICYmIG1lbnVJdGVtLm5hbWUpID8gbWVudUl0ZW0ubmFtZSA6IG1lbnVJdGVtO1xuICAgICAgICBsZXQgd2FzT3BlbiA9IHRoaXMudm0uaXNPcGVuW21lbnVJZF07XG4gICAgICAgIHRoaXMuY2xvc2VBbGxNZW51cygpO1xuICAgICAgICB0aGlzLnZtLmlzT3BlblttZW51SWRdID0gIXdhc09wZW47XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaXNTaG93aW5nQXR0cmlidXRlcyhyZXBvcnRJZCkge1xuICAgICAgICBsZXQgc2hvdyA9IHRoaXMudm0uc2hvdztcbiAgICAgICAgcmV0dXJuIChzaG93LmV2ZXJ5dGhpbmcgfHwgKHNob3cuYXR0cmlidXRlcyA9PT0gcmVwb3J0SWQpKTtcbiAgICB9XG5cbiAgICBpc1Nob3dpbmdQbG90KHBsb3RJZCkge1xuICAgICAgICByZXR1cm4gKHRoaXMudm0uc2hvdy5ldmVyeXRoaW5nIHx8ICh0aGlzLnZtLnNob3cucGxvdCA9PT0gcGxvdElkKSk7XG4gICAgfVxuXG4gICAgaXNTaG93aW5nVGFibGUodGFibGVJZCkge1xuICAgICAgICByZXR1cm4gKHRoaXMudm0uc2hvdy5ldmVyeXRoaW5nIHx8ICh0aGlzLnZtLnNob3cudGFibGUgPT09IHRhYmxlSWQpKTtcbiAgICB9XG5cbiAgICBnb0pvYlN0YXR1cygpIHtcbiAgICAgICAgdGhpcy5zaG93Tm90aGluZygpO1xuICAgICAgICB0aGlzLnZtLnNob3cuam9iU3RhdHVzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnb1RodW1ibmFpbHMoKSB7XG4gICAgICAgIHRoaXMuc2hvd05vdGhpbmcoKTtcbiAgICAgICAgdGhpcy52bS5zaG93LnRodW1ibmFpbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIGdvRXZlcnl0aGluZygpIHtcbiAgICAgICAgdGhpcy5zaG93RXZlcnl0aGluZygpO1xuICAgIH1cblxuICAgIGdvQXR0cmlidXRlcyhyZXBvcnRJZCkge1xuICAgICAgICB0aGlzLnNob3dOb3RoaW5nKCk7XG4gICAgICAgIHRoaXMudm0uc2hvdy5hdHRyaWJ1dGVzID0gcmVwb3J0SWQ7XG4gICAgfVxuXG4gICAgZ29QbG90KHBsb3RJZCkge1xuICAgICAgICB0aGlzLnNob3dOb3RoaW5nKCk7XG4gICAgICAgIHRoaXMudm0uc2hvdy5wbG90ID0gcGxvdElkO1xuICAgIH1cblxuICAgIGdvVGFibGUodGFibGVJZCkge1xuICAgICAgICB0aGlzLnNob3dOb3RoaW5nKCk7XG4gICAgICAgIHRoaXMudm0uc2hvdy50YWJsZSA9IHRhYmxlSWQ7XG4gICAgfVxuXG4gICAgZ29Eb3dubG9hZHMoKSB7XG4gICAgICAgIHRoaXMuc2hvd05vdGhpbmcoKTtcbiAgICAgICAgdGhpcy52bS5zaG93LmRvd25sb2FkcyA9IHRydWU7XG4gICAgfVxuXG4gICAgZ29Mb2coKSB7XG4gICAgICAgIHRoaXMuc2hvd05vdGhpbmcoKTtcbiAgICAgICAgdGhpcy52bS5zaG93LmxvZyA9IHRydWU7XG4gICAgfVxuXG4gICAgZmlsZVR5cGVOYW1lRnJvbUlkKGZpbGVUeXBlSWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gZmlsZVR5cGVJZC5zcGxpdChcIi5cIikucG9wKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0TWVudXMoKSB7XG4gICAgICAgIHRoaXMudm0uaXNPcGVuID0ge307XG4gICAgICAgIHRoaXMudm0uaXNPcGVuLm92ZXJ2aWV3ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsb3NlQWxsTWVudXMoKSB7XG4gICAgICAgIGZvciAobGV0IG1lbnUgaW4gdGhpcy52bS5pc09wZW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZtLmlzT3Blbi5oYXNPd25Qcm9wZXJ0eShtZW51KSkge1xuICAgICAgICAgICAgICAgIHRoaXMudm0uaXNPcGVuW21lbnVdID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dOb3RoaW5nKCkge1xuICAgICAgICB0aGlzLnNldFNob3dGbGFnc1RvKGZhbHNlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dFdmVyeXRoaW5nKCkge1xuICAgICAgICB0aGlzLnNldFNob3dGbGFnc1RvKHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0U2hvd0ZsYWdzVG8odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy52bS5zaG93LmpvYlN0YXR1cyA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZtLnNob3cudGh1bWJuYWlscyA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZtLnNob3cubWV0cmljcyA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMudm0uc2hvdy5vdmVydmlldyA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZtLnNob3cucmVwb3J0ID0gdmFsdWU7XG4gICAgICAgIHRoaXMudm0uc2hvdy5hdHRyaWJ1dGVzID0gdmFsdWU7XG4gICAgICAgIHRoaXMudm0uc2hvdy5wbG90ID0gdmFsdWU7XG4gICAgICAgIHRoaXMudm0uc2hvdy50YWJsZSA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMudm0uc2hvdy5kb3dubG9hZHMgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52bS5zaG93LmxvZyA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZtLnNob3cuZXZlcnl0aGluZyA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmV0Y2hSZXBvcnRWaWV3UnVsZXMoKSB7XG4gICAgICAgIGxldCBlbmRwb2ludCA9IEFQSS5uUmVwb3J0Vmlld1J1bGVzO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMuaW9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEVuZHBvaW50QXN5bmMoZW5kcG9pbnQpO1xuICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydE5hbWVzQnlJZHMgPSB7fTtcblxuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IEFkZCB0aGVzZSB0byB0aGUgZGF0YSByZXR1cm5lZCBmcm9tIHRoZSBlbmRwb2ludFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImFkYXB0ZXJfeG1sX3JlcG9ydFwiOiBcIkFkYXB0ZXIgUmVwb3J0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZpbHRlcmluZ19zdGF0c194bWxfcmVwb3J0XCI6IFwiRmlsdGVyaW5nIFN0YXRpc3RpY3MgUmVwb3J0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxvYWRpbmdfeG1sX3JlcG9ydFwiOiBcIkxvYWRpbmcgUmVwb3J0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNpbXBsZV9kYXRhc2V0X3JlcG9ydFwiOiBcIlNpbXBsZSBSZXBvcnRcIlxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgPEFycmF5PGFueT4+cmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVwb3J0TmFtZXNCeUlkc1tlbnRyeS5pZF0gPSBlbnRyeS5uYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnNob3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZldGNoUGlwZWxpbmVUZW1wbGF0ZXMoKSB7XG4gICAgICAgIGxldCBlbmRwb2ludCA9IEFQSS5uUGlwZWxpbmVUZW1wbGF0ZXM7XG4gICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5pb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RW5kcG9pbnRBc3luYyhlbmRwb2ludCk7XG4gICAgICAgIHByb21pc2UudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGlwZWxpbmVUZW1wbGF0ZXNCeUlkcyA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudHJ5IG9mIDxBcnJheTxhbnk+PnJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpcGVsaW5lVGVtcGxhdGVzQnlJZHNbZW50cnkuaWRdID0gZW50cnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2Uuc2hvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmV0Y2hEYXRhc2V0KCk6IHZvaWQge1xuICAgICAgICBsZXQgZW5kcG9pbnQgPSBBUEkuYW55RGF0YXNldEJ5SW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbmQoeyRzZXRfaW50OiB0aGlzLmRhdGFzZXRJZH0pO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMuaW9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEVuZHBvaW50QXN5bmMoZW5kcG9pbnQpO1xuICAgICAgICBwcm9taXNlLnRoZW4oKGRhdGE6IElEYXRhc2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgSFRUUF9DT0RFID0gXCJodHRwQ29kZVwiO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhW0hUVFBfQ09ERV0gPT09IDQwNCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5zaG93RXJyb3IoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52bS5kYXRhc2V0ID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IGRhdGEubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlzID0gT2JqZWN0LmtleXMoZGF0YSkuc29ydCgoYSwgYik6IG51bWJlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYSA+IGIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGEgbXVzdCBiZSBlcXVhbCB0byBiXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuam9iSWQgPSB0aGlzLnZtLmRhdGFzZXQuam9iSWQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5zaG93RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkQW5hbHlzaXNKb2IoKSB7XG4gICAgICAgIGxldCBlbmRwb2ludCA9IEFQSS5hSm9iXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbmQoeyRqb2JfaW50OiB0aGlzLmpvYklkfSk7XG4gICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5pb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RW5kcG9pbnRBc3luYyhlbmRwb2ludCk7XG4gICAgICAgIHByb21pc2UudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IEhUVFBfQ09ERSA9IFwiaHR0cENvZGVcIjtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0W0hUVFBfQ09ERV0gPT09IDQwNCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5zaG93RXJyb3IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZtLmpvYiA9IDxJSm9iSW5mbz5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudm0uam9iQ3JlYXRlZEF0ID0gRGF0YXNldERldGFpbC5yZWZvcm1hdERhdGUodGhpcy52bS5qb2IuY3JlYXRlZEF0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52bS5qb2JVcGRhdGVkQXQgPSBEYXRhc2V0RGV0YWlsLnJlZm9ybWF0RGF0ZSh0aGlzLnZtLmpvYi51cGRhdGVkQXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnNob3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRBbmFseXNpc0V2ZW50cygpIHtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gQVBJLm5Kb2JFdmVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFuZCh7JGpvYl9pbnQ6IHRoaXMuam9iSWR9KTtcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLmlvXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRFbmRwb2ludEFzeW5jKGVuZHBvaW50KTtcbiAgICAgICAgcHJvbWlzZS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXlSZXN1bHQgPSA8QXJyYXk8e3N0YXRlOiBzdHJpbmd9Pj4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlSZXN1bHQubGVuZ3RoID4gdGhpcy5qb2JFdmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmpvYkV2ZW50cyA9IGFycmF5UmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRBbmFseXNpc0pvYigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkRW50cnlQb2ludHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZE9wdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEFuYWx5c2lzUmVwb3J0cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkRmlsZURvd25sb2FkTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkTG9nVXVpZCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXNzZXJ0KGFuZ3VsYXIuZXF1YWxzKHJlc3VsdCwgdGhpcy5qb2JFdmVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGpvYlN0YXRlcyA9IGFycmF5UmVzdWx0Lm1hcChpdGVtID0+IGl0ZW0uc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIURhdGFzZXREZXRhaWwuam9iU3RhdGVzSW5jbHVkZXNGaW5pc2hlZFN0YXRlKGpvYlN0YXRlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvdXJTZWNvbmRzID0gNDAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5sb2FkQW5hbHlzaXNFdmVudHMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VyU2Vjb25kc1xuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8oYnNraW5uZXIpOiBMb2cgZXJyb3Igb25jZSB3ZSBoYXZlIGEgbG9nZ2luZyBzZXJ2aWNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2Uuc2hvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZEVudHJ5UG9pbnRzKCkge1xuICAgICAgICB0aGlzLmVudHJ5UG9pbnRzID0gW107XG4gICAgICAgIGxldCBlbmRwb2ludCA9IEFQSS5uSm9iRW50cnlQb2ludHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFuZCh7JGpvYl9pbnQ6IHRoaXMuam9iSWR9KTtcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLmlvXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRFbmRwb2ludEFzeW5jKGVuZHBvaW50KTtcbiAgICAgICAgcHJvbWlzZS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXlSZXN1bHQgPSA8QXJyYXk8SUVudHJ5UG9pbnQ+PnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgYXJyYXlSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEVudHJ5UG9pbnQoZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyhic2tpbm5lcik6IExvZyBlcnJvciBvbmNlIHdlIGhhdmUgYSBsb2dnaW5nIHNlcnZpY2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5zaG93RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkT3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5lbnRyeVBvaW50cyA9IFtdO1xuICAgICAgICBsZXQgZW5kcG9pbnQgPSBBUEkubkpvYk9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFuZCh7JGpvYl9pbnQ6IHRoaXMuam9iSWR9KTtcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLmlvXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRFbmRwb2ludEFzeW5jKGVuZHBvaW50KTtcbiAgICAgICAgcHJvbWlzZS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IDxJT3B0aW9ucz4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGNvbnN0IHB0ID0gdGhpcy5waXBlbGluZVRlbXBsYXRlc0J5SWRzW29wdGlvbnMucGlwZWxpbmVJZF07XG4gICAgICAgICAgICAgICAgdGhpcy52bS5qb2JBcHBsaWNhdGlvbk5hbWUgPVxuICAgICAgICAgICAgICAgICAgICAocHQgJiYgcHQubmFtZSkgPyBwdC5uYW1lIDogb3B0aW9ucy5waXBlbGluZUlkO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudGFza09wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52bS50YXNrT3B0aW9ucyA9IG9wdGlvbnMudGFza09wdGlvbnMuc29ydChcbiAgICAgICAgICAgICAgICAgICAgICAgICh4LCB5KSA9PiB4Lm9wdGlvbklkLmxvY2FsZUNvbXBhcmUoeS5vcHRpb25JZClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHB0ICYmIHB0LnRhc2tPcHRpb25zICYmIHB0LnRhc2tPcHRpb25zLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0aWVzID0gcHQudGFza09wdGlvbnMucHJvcGVydGllcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG9wdGlvbiBvZiB0aGlzLnZtLnRhc2tPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjaGVtYSA9IHByb3BlcnRpZXNbb3B0aW9uLm9wdGlvbklkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGl0bGUgPSBzY2hlbWEgPyBzY2hlbWEudGl0bGUgOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5uYW1lID0gdGl0bGUgfHwgb3B0aW9uLm9wdGlvbklkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52bS50YXNrT3B0aW9ucyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZtLnRhc2tPcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZtLnRhc2tPcHRpb25zLnB1c2goe25hbWU6IFwibm9uZVwiLCB2YWx1ZTogXCJcIn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnNob3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRFbnRyeVBvaW50KGVudHJ5UG9pbnQ6IElFbnRyeVBvaW50KSB7XG4gICAgICAgIGxldCB1dWlkID0gZW50cnlQb2ludC5kYXRhc2V0VVVJRDtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gQVBJLmFueURhdGFzZXRCeVV1aWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFuZCh7JHNldF91dWlkOiB1dWlkfSk7XG4gICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5pb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RW5kcG9pbnRBc3luYyhlbmRwb2ludCk7XG4gICAgICAgIHByb21pc2UudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpZCA9ICg8YW55PnJlc3VsdCkuaWQ7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFzZXRUeXBlID0gRGF0YXNldFR5cGUuYnlGaWxldHlwZShlbnRyeVBvaW50LmRhdGFzZXRUeXBlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVudHJ5UG9pbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogZGF0YXNldFR5cGUudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIHJvdXRlOiBbIFwiL0FuYWx5c2lzXCIsIGAke1BBR0VfRk9SX0ZJTEVUWVBFW2VudHJ5UG9pbnQuZGF0YXNldFR5cGVdfWAsIHsgaWQ6IGlkIH0gXSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5zaG93RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkQW5hbHlzaXNSZXBvcnRzKCkge1xuICAgICAgICB0aGlzLnJlcG9ydHMgPSBbXTtcbiAgICAgICAgdGhpcy50aHVtYm5haWxzID0gW107XG4gICAgICAgIC8vIGNvbnN0IFRFTVBMQVRFX1VSTCA9IEFQSS5uSm9iUmVwb3J0cztcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gQVBJLm5Kb2JSZXBvcnRzLmFuZCh7JGpvYl9pbnQ6IHRoaXMuam9iSWR9KTtcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLmlvLmdldEVuZHBvaW50QXN5bmMoZW5kcG9pbnQpO1xuICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcnJheVJlc3VsdCA9IDxBcnJheTx7ZGF0YVN0b3JlRmlsZToge3V1aWQ6IGFueX19Pj4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBhcnJheVJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LmRhdGFTdG9yZUZpbGUgJiYgZW50cnkuZGF0YVN0b3JlRmlsZS51dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcG9ydFV1aWQgPSBlbnRyeS5kYXRhU3RvcmVGaWxlLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQW5hbHlzaXNSZXBvcnQocmVwb3J0VXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPKGJza2lubmVyKTogTG9nIGVycm9yIG9uY2Ugd2UgaGF2ZSBhIGxvZ2dpbmcgc2VydmljZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnNob3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRBbmFseXNpc1JlcG9ydChyZXBvcnRVdWlkOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gQVBJLmFKb2JSZXBvcnQuYW5kKHtcbiAgICAgICAgICAgICRqb2JfaW50OiB0aGlzLmpvYklkLFxuICAgICAgICAgICAgJHJlcG9ydF91dWlkOiByZXBvcnRVdWlkXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMuaW8uZ2V0RW5kcG9pbnRBc3luYyhlbmRwb2ludCk7XG4gICAgICAgIHByb21pc2UudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXBvcnQgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwcm9jZXNzUmVwb3J0SW1hZ2VzKHJlcG9ydCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwcm9jZXNzUmVwb3J0VGFibGVzKHJlcG9ydCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRzLnB1c2gocmVwb3J0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRodW1ibmFpbHNGb3JSZXBvcnQocmVwb3J0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnNob3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRMb2dVdWlkKCkge1xuICAgICAgICBpZiAodGhpcy5sb2dVdWlkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRBbmFseXNpc0xvZygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVuZHBvaW50ID0gQVBJLm5Kb2JEYXRhc3RvcmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbmQoeyRqb2JfaW50OiB0aGlzLmpvYklkfSk7XG4gICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5pb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RW5kcG9pbnRBc3luYyhlbmRwb2ludCk7XG4gICAgICAgIHByb21pc2UudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgbGV0IG1hc3RlckxvZ3MgPSByZXN1bHQuZmlsdGVyKFxuICAgICAgICAgICAgICAgIHggPT4geC5zb3VyY2VJZC5lbmRzV2l0aChcIm1hc3Rlci5sb2dcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAobWFzdGVyTG9ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dVdWlkID0gbWFzdGVyTG9nc1swXS51dWlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2FkQW5hbHlzaXNMb2coKTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2Uuc2hvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZXZlbnR1YWxseSB0aGUgYW5hbHlzaXMgam9iIGxvZyBzaG91bGQgYmUgbG9hZGVkIHRoaXMgd2F5IGFzIHdlbGxcbiAgICBwcml2YXRlIGxvYWRBbmFseXNpc0xvZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ1V1aWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbmRwb2ludCA9IEFQSS5hSm9iRmlsZURvd25sb2FkLmFuZCh7XG4gICAgICAgICAgICAkam9iX2ludDogdGhpcy5qb2JJZCxcbiAgICAgICAgICAgICRzdG9yZV91dWlkOiB0aGlzLmxvZ1V1aWRcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5pby5nZXRFbmRwb2ludEFzeW5jKGVuZHBvaW50KTtcbiAgICAgICAgcHJvbWlzZS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnZtLmxvZyA9IDxzdHJpbmc+cmVzdWx0O1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLnZtLmxvZyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZEZpbGVEb3dubG9hZExpc3QoKSB7XG4gICAgICAgIGxldCBlbmRwb2ludCA9IEFQSS5uSm9iRGF0YXN0b3Jlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuYW5kKHskam9iX2ludDogdGhpcy5qb2JJZH0pO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMuaW9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEVuZHBvaW50QXN5bmMoZW5kcG9pbnQpO1xuICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZtLmZpbGVEb3dubG9hZExpc3QgPSB0aGlzLmFkZERvd25sb2FkVXJscyhyZXN1bHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2Uuc2hvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRG93bmxvYWRVcmxzKGZpbGVEb3dubG9hZExpc3QpIHtcbiAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgZmlsZURvd25sb2FkTGlzdCkge1xuICAgICAgICAgICAgbGV0IGVuZHBvaW50ID0gQVBJLmFKb2JGaWxlRG93bmxvYWQuYW5kKHtcbiAgICAgICAgICAgICAgICAkam9iX2ludDogdGhpcy5qb2JJZCxcbiAgICAgICAgICAgICAgICAkc3RvcmVfdXVpZDogZW50cnkudXVpZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbnRyeS5kb3dubG9hZFVybCA9IHRoaXMuaW8udXJsRm9yKGVuZHBvaW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsZURvd25sb2FkTGlzdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRodW1ibmFpbHNGb3JSZXBvcnQocmVwb3J0KSB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yIChsZXQgcGxvdEdyb3VwIG9mIHJlcG9ydC5wbG90R3JvdXBzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwbG90IG9mIHBsb3RHcm91cC5wbG90cykge1xuICAgICAgICAgICAgICAgIHRoaXMudGh1bWJuYWlscy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHBsb3QuaWQsXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHBsb3QuY2FwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmw6IHBsb3QuaW1hZ2VVcmxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcHJvY2Vzc1JlcG9ydEltYWdlcyhyZXBvcnQpIHtcbiAgICAgICAgcmVwb3J0Lm5hbWUgPSB0aGlzLnJlcG9ydE5hbWVzQnlJZHNbcmVwb3J0LmlkXSB8fCByZXBvcnQuaWQ7XG4gICAgICAgIHJlcG9ydC5wbG90cyA9IFtdO1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAobGV0IHBsb3RHcm91cCBvZiByZXBvcnQucGxvdEdyb3Vwcykge1xuICAgICAgICAgICAgZm9yIChsZXQgcGxvdCBvZiBwbG90R3JvdXAucGxvdHMpIHtcbiAgICAgICAgICAgICAgICBwbG90LmltYWdlVXJsID0gdGhpcy51cmxGb3JJbWFnZUZpbGUocGxvdC5pbWFnZSk7XG4gICAgICAgICAgICAgICAgcGxvdC5jYXB0aW9uID0gcGxvdC5jYXB0aW9uIHx8IHBsb3RHcm91cC50aXRsZTtcbiAgICAgICAgICAgICAgICByZXBvcnQucGxvdHMucHVzaChwbG90KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVwb3J0O1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcHJvY2Vzc1JlcG9ydFRhYmxlcyhyZXBvcnQpIHtcbiAgICAgICAgZm9yIChsZXQgdGFibGUgb2YgcmVwb3J0LnRhYmxlcykge1xuICAgICAgICAgICAgLy8gZmFpbCBncmFjZWZ1bGx5IGlmIHRoZSB0aXRsZSBpcyBtaXNzaW5nXG4gICAgICAgICAgICB0YWJsZS50aXRsZSA9IHRhYmxlLnRpdGxlIHx8IHRhYmxlLmlkLnNwbGl0KFwiLlwiKVswXTtcblxuICAgICAgICAgICAgY29uc3Qgcm93cyA9IHRhYmxlLnJvd3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiBvZiB0YWJsZS5jb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW4udmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcm93c1tpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93c1tpXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJvd3NbaV0ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogY29sdW1uLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNvbHVtbi52YWx1ZXNbaV1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXBvcnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cmxGb3JJbWFnZUZpbGUoZmlsZU5hbWU6IHN0cmluZykge1xuICAgICAgICBsZXQgZW5kcG9pbnQgPSBBUEkuYUpvYlJlcG9ydFJlc291cmNlLmFuZCh7XG4gICAgICAgICAgICAkam9iX2ludDogdGhpcy5qb2JJZCxcbiAgICAgICAgICAgICRmaWxlX25hbWU6IGZpbGVOYW1lXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXJzLmdldFVybChcbiAgICAgICAgICAgIGBhcGk6Ly9zbXJ0LWxpbmsvJHtlbmRwb2ludC51cmwoKS5yZXBsYWNlKFwiJGpvYl90eXBlXCIsIFwicGJzbXJ0cGlwZVwiKX1gXG4gICAgICAgICk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9