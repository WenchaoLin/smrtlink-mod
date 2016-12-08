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
var common_1 = require("angular2/common");
var router_1 = require("angular2/router");
var Rx_1 = require("rxjs/Rx");
var status_1 = require("../../navigation/status");
var error_service_1 = require("../error/error-service");
var analysis_1 = require("../analysis");
var dataset_type_1 = require("../../data/dataset-type");
var progress_circular_1 = require("athenaeum/components/progress-circular/progress-circular");
var imprint_1 = require("../../directives/imprint");
var stamp_1 = require("../../strings/stamp");
var text_1 = require("../../strings/en-us/text");
var io_1 = require("athenaeum/data/api/io");
var http_1 = require("athenaeum/services/http");
var api_1 = require("../../data/io/api");
var lookup_pipe_1 = require("../../pipes/lookup-pipe");
var rules_pipe_1 = require("../../pipes/rules-pipe");
var report_view_rules_1 = require("./report-view-rules");
var Results = (function () {
    function Results(io, routeParams, errorService, servers) {
        this.STAMP = stamp_1.STAMP;
        this.vm = {
            // state: "...",
            isSmrtViewVisible: false,
            isSmrtViewEnabled: false,
            isOpen: null,
            show: null,
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
        this.content = {
            settings: {}
        };
        this.jobEvents = [];
        this.reportNamesByIds = null;
        this.pipelineTemplatesByIds = null;
        this.TEXT = text_1.TEXT;
        this.reportRules = report_view_rules_1.REPORT_VIEW_RULES;
        this.io = io;
        this.routeParams = routeParams;
        this.errorService = errorService;
        this.servers = servers;
        this.vm.isOpen = {};
        this.vm.show = {};
        this.initMenus();
        this.showNothing();
        // TODO(bskinner)(2015-11-06): All of the code below operates on the
        // assumption that the results of these queries (to report-view-rules
        // and resolved-pipeline-templates) will have already come back before
        // the results from other queries.  We should code this more defensively
        // to handle the case where results come in any order.
        this.fetchReportViewRules();
        this.fetchPipelineTemplates();
    }
    Results.jobStatesIncludesFinishedState = function (jobStates) {
        return ((jobStates.indexOf("SUCCESSFUL") !== -1) ||
            (jobStates.indexOf("FAILED") !== -1) ||
            (jobStates.indexOf("KILLED") !== -1));
    };
    Results.reformatDate = function (date) {
        return new Date(date).toLocaleString();
    };
    Results.prototype.routerOnActivate = function (next, prev) {
        this.waitForPipelineTemplatesAndThenLoadAnalysisJob();
    };
    Results.prototype.waitForPipelineTemplatesAndThenLoadAnalysisJob = function () {
        var _this = this;
        setTimeout(function () {
            if ((_this.reportNamesByIds !== null) &&
                (_this.pipelineTemplatesByIds !== null)) {
                _this.onViewContentLoaded();
            }
            else {
                _this.waitForPipelineTemplatesAndThenLoadAnalysisJob();
            }
        });
    };
    Results.prototype.onViewContentLoaded = function () {
        this.jobId = this.routeParams.get("id");
        this.loadAnalysisJob();
        this.loadAnalysisEvents();
        this.loadAnalysisLog();
        this.vm.show.jobStatus = true;
    };
    Results.prototype.ngOnDestroy = function () {
        this.stopPolling();
    };
    Results.prototype.toggleMenuOverview = function (event) {
        this.toggleMenu("overview", event);
        this.goJobStatus();
    };
    Results.prototype.toggleMenuReport = function (report, event) {
        this.toggleMenu(report, event);
        this.goAttributes(report.id);
    };
    Results.prototype.toggleMenuData = function (event) {
        this.toggleMenu("data", event);
        this.goDownloads();
    };
    Results.prototype.toggleMenu = function (menuItem, event) {
        var menuId = (menuItem && menuItem.name) ? menuItem.name : menuItem;
        var wasOpen = this.vm.isOpen[menuId];
        this.closeAllMenus();
        this.vm.isOpen[menuId] = !wasOpen;
        event.preventDefault();
    };
    Results.prototype.isShowingAttributes = function (reportId) {
        var show = this.vm.show;
        return (show.everything || (show.attributes === reportId));
    };
    Results.prototype.isShowingPlot = function (plotId) {
        return (this.vm.show.everything || (this.vm.show.plot === plotId));
    };
    Results.prototype.isShowingTable = function (tableId) {
        return (this.vm.show.everything || (this.vm.show.table === tableId));
    };
    Results.prototype.goJobStatus = function () {
        this.showNothing();
        this.vm.show.jobStatus = true;
    };
    Results.prototype.goThumbnails = function () {
        this.showNothing();
        this.vm.show.thumbnails = true;
    };
    Results.prototype.goEverything = function () {
        this.showEverything();
    };
    Results.prototype.goAttributes = function (reportId) {
        this.showNothing();
        this.vm.show.attributes = reportId;
    };
    Results.prototype.goPlot = function (plotId) {
        this.showNothing();
        this.vm.show.plot = plotId;
    };
    Results.prototype.goTable = function (tableId) {
        this.showNothing();
        this.vm.show.table = tableId;
    };
    Results.prototype.goDownloads = function () {
        this.showNothing();
        this.vm.show.downloads = true;
    };
    Results.prototype.goLog = function () {
        this.showNothing();
        this.vm.show.log = true;
    };
    Results.prototype.fileTypeNameFromId = function (fileTypeId) {
        return fileTypeId.split(".").pop();
    };
    Results.prototype.openSmrtView = function () {
        var server = "api://smrt-view";
        var path = encodeURIComponent(this.vm.job.path);
        var url = this.servers.getUrl(server + "/smrtview/servlet/jnlp?datastore=" + path);
        window.open(url);
    };
    Results.prototype.initMenus = function () {
        this.vm.isOpen = {};
        this.vm.isOpen.overview = true;
    };
    Results.prototype.closeAllMenus = function () {
        for (var menu in this.vm.isOpen) {
            if (this.vm.isOpen.hasOwnProperty(menu)) {
                this.vm.isOpen[menu] = false;
            }
        }
    };
    Results.prototype.showNothing = function () {
        this.setShowFlagsTo(false);
    };
    Results.prototype.showEverything = function () {
        this.setShowFlagsTo(true);
    };
    Results.prototype.setShowFlagsTo = function (value) {
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
    Results.prototype.fetchReportViewRules = function () {
        var _this = this;
        var endpoint = api_1.API.nReportViewRules;
        var promise = this.io
            .getEndpointAsync(endpoint);
        promise.then(function (result) {
            _this.reportNamesByIds = {};
            for (var _i = 0, _a = result; _i < _a.length; _i++) {
                var entry = _a[_i];
                _this.reportNamesByIds[entry.id] = entry.name;
            }
        })
            .catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    Results.prototype.fetchPipelineTemplates = function () {
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
    Results.prototype.loadAnalysisJob = function () {
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
                _this.vm.jobCreatedAt = Results.reformatDate(_this.vm.job.createdAt);
                _this.vm.jobUpdatedAt = Results.reformatDate(_this.vm.job.updatedAt);
            }
        })
            .catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    Results.prototype.loadAnalysisEvents = function () {
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
                    _this.loadAnalysisLog();
                }
                else {
                }
                var jobStates = arrayResult.map(function (item) { return item.state; });
                if (!Results.jobStatesIncludesFinishedState(jobStates)) {
                    _this.startPolling();
                }
                else {
                    _this.stopPolling();
                }
            }
            else {
            }
        })
            .catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    Results.prototype.startPolling = function () {
        var _this = this;
        if (this.pollSubscription) {
            return;
        }
        this.pollSubscription = Rx_1.Observable.timer(4000, 4000).subscribe(function () {
            _this.loadAnalysisEvents();
        });
    };
    Results.prototype.stopPolling = function () {
        if (!this.pollSubscription) {
            return;
        }
        this.pollSubscription.unsubscribe();
        this.pollSubscription = null;
    };
    Results.prototype.loadEntryPoints = function () {
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
    Results.prototype.loadOptions = function () {
        var _this = this;
        this.entryPoints = [];
        var endpoint = api_1.API.nJobOptions
            .and({ $job_int: this.jobId });
        var promise = this.io.getEndpointAsync(endpoint);
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
    Results.prototype.loadEntryPoint = function (entryPoint) {
        var _this = this;
        var uuid = entryPoint.datasetUUID;
        var endpoint = api_1.API.anyDatasetByUuid
            .and({ $set_uuid: uuid });
        var promise = this.io.getEndpointAsync(endpoint);
        promise.then(function (result) {
            var id = result.id;
            var datasetType = dataset_type_1.DatasetType.byFiletype(entryPoint.datasetType);
            _this.entryPoints.push({
                title: datasetType.title,
                route: [("../" + analysis_1.PAGE_FOR_FILETYPE[entryPoint.datasetType]), { id: id }],
                id: id
            });
        })
            .catch(function (error) {
            _this.errorService.showError(error);
        });
    };
    Results.prototype.loadAnalysisReports = function () {
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
    Results.prototype.loadAnalysisReport = function (reportUuid) {
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
    Results.prototype.loadAnalysisLog = function () {
        var _this = this;
        var endpoint = api_1.API.aJobLog.and({ $job_int: this.jobId });
        var promise = this.io.getEndpointAsync(endpoint);
        promise.then(function (result) {
            _this.vm.log = result;
        }).catch(function (error) {
            _this.vm.log = null;
        });
    };
    Results.prototype.addThumbnailsForReport = function (report) {
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
    Results.prototype.urlForImageFile = function (fileName) {
        var endpoint = api_1.API.aJobReportResource.and({
            $job_int: this.jobId,
            $file_name: fileName
        });
        return this.servers.getUrl("api://smrt-link/" + endpoint.url().replace("$job_type", "pbsmrtpipe"));
    };
    Results.prototype.preprocessReportTables = function (report) {
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
    Results.prototype.preprocessReportImages = function (report) {
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
    Results.prototype.loadFileDownloadList = function () {
        var _this = this;
        var endpoint = api_1.API.nJobDatastores.and({ $job_int: this.jobId });
        var promise = this.io.getEndpointAsync(endpoint);
        promise.then(function (serverFiles) {
            var frontendFiles = serverFiles
                .map(_this.addDownloadUrl.bind(_this))
                .map(_this.addDisplayName.bind(_this));
            _this.vm.fileDownloadList = frontendFiles;
            _this.vm.isSmrtViewVisible = _this.canSmrtViewLinkBeVisible(frontendFiles);
            _this.vm.isSmrtViewEnabled = _this.canSmrtViewBeEnabled();
        });
        promise.catch(function (error) { return _this.errorService.showError(error); });
    };
    Results.prototype.addDownloadUrl = function (serverFile) {
        var frontendFile = Object.assign({}, serverFile);
        var endpoint = api_1.API.aJobFileDownload.and({
            $job_int: this.jobId,
            $store_uuid: serverFile.uuid
        });
        frontendFile.downloadUrl = this.io.urlFor(endpoint);
        return frontendFile;
    };
    Results.prototype.addDisplayName = function (frontendFile) {
        var newFrontendFile = Object.assign({}, frontendFile);
        newFrontendFile.displayName = (frontendFile.name) ? frontendFile.name : frontendFile.sourceId;
        return newFrontendFile;
    };
    Results.prototype.canSmrtViewLinkBeVisible = function (downloads) {
        return this.isAlignmentSetPresent(downloads) && !!this.vm.job.path;
    };
    Results.prototype.canSmrtViewBeEnabled = function () {
        return this.vm.job.state === "SUCCESSFUL";
    };
    Results.prototype.isAlignmentSetPresent = function (downloads) {
        var alignmentSetFiles = this.vm.fileDownloadList.filter(function (file) {
            return file.fileTypeId === dataset_type_1.DatasetType.ALIGNMENT.filetype;
        });
        return (alignmentSetFiles.length > 0) ? true : false;
    };
    Results = __decorate([
        core_1.Component({
            selector: "results",
            providers: [error_service_1.ErrorService],
            moduleId: module.id,
            templateUrl: "results.html",
            styleUrls: ["results.css"],
            directives: [imprint_1.Imprint, common_1.CORE_DIRECTIVES, router_1.RouterLink, progress_circular_1.ProgressCircular],
            encapsulation: core_1.ViewEncapsulation.None,
            pipes: [lookup_pipe_1.LookupPipe, rules_pipe_1.RulesPipe]
        }),
        router_1.CanActivate(status_1.canConnect), 
        __metadata('design:paramtypes', [io_1.IO, router_1.RouteParams, error_service_1.ErrorService, http_1.APIServers])
    ], Results);
    return Results;
}());
exports.Results = Results;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9hbmFseXNpcy9yZXN1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7Ozs7Ozs7Ozs7QUFFSCxxQkFBMkMsZUFBZSxDQUFDLENBQUE7QUFDM0QsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQsdUJBRU8saUJBQWlCLENBQUMsQ0FBQTtBQUN6QixtQkFBdUMsU0FBUyxDQUFDLENBQUE7QUFFakQsdUJBQXlCLHlCQUF5QixDQUFDLENBQUE7QUFFbkQsOEJBQTJCLHdCQUF3QixDQUFDLENBQUE7QUFFcEQseUJBQWdDLGFBQWEsQ0FBQyxDQUFBO0FBRTlDLDZCQUEwQix5QkFBeUIsQ0FBQyxDQUFBO0FBRXBELGtDQUVPLDBEQUEwRCxDQUFDLENBQUE7QUFFbEUsd0JBQXNCLDBCQUEwQixDQUFDLENBQUE7QUFDakQsc0JBQW9CLHFCQUFxQixDQUFDLENBQUE7QUFDMUMscUJBQW1CLDBCQUEwQixDQUFDLENBQUE7QUFJOUMsbUJBQWlCLHVCQUF1QixDQUFDLENBQUE7QUFDekMscUJBQXlCLHlCQUF5QixDQUFDLENBQUE7QUFFbkQsb0JBQWtCLG1CQUFtQixDQUFDLENBQUE7QUFFdEMsNEJBQXlCLHlCQUF5QixDQUFDLENBQUE7QUFDbkQsMkJBQXdCLHdCQUF3QixDQUFDLENBQUE7QUFDakQsa0NBQWdDLHFCQUFxQixDQUFDLENBQUE7QUF5RHREO0lBNkNJLGlCQUNJLEVBQU0sRUFDTixXQUF3QixFQUN4QixZQUEwQixFQUMxQixPQUFtQjtRQWhEaEIsVUFBSyxHQUFHLGFBQUssQ0FBQztRQUNkLE9BQUUsR0FBRztZQUNSLGdCQUFnQjtZQUNoQixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsTUFBTSxFQUFFLElBQUk7WUFDWixJQUFJLEVBQUUsSUFBSTtZQUNWLEdBQUcsRUFBWTtnQkFDWCxJQUFJLEVBQUUsSUFBSTtnQkFDVixFQUFFLEVBQUUsSUFBSTtnQkFDUixLQUFL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ZmlsZSI6ImFwcC9zaWxvcy9hbmFseXNpcy9yZXN1bHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhLCBJbmMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86YnNraW5uZXJAcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbVwiPkJyaWFuIFNraW5uZXI8L2E+XG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcbmltcG9ydCB7XG4gICAgUm91dGVQYXJhbXMsIFJvdXRlckxpbmssIENhbkFjdGl2YXRlLCBPbkFjdGl2YXRlXG59IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqcy9SeFwiO1xuXG5pbXBvcnQge2NhbkNvbm5lY3R9IGZyb20gXCIuLi8uLi9uYXZpZ2F0aW9uL3N0YXR1c1wiO1xuXG5pbXBvcnQge0Vycm9yU2VydmljZX0gZnJvbSBcIi4uL2Vycm9yL2Vycm9yLXNlcnZpY2VcIjtcblxuaW1wb3J0IHtQQUdFX0ZPUl9GSUxFVFlQRX0gZnJvbSBcIi4uL2FuYWx5c2lzXCI7XG5cbmltcG9ydCB7RGF0YXNldFR5cGV9IGZyb20gXCIuLi8uLi9kYXRhL2RhdGFzZXQtdHlwZVwiO1xuXG5pbXBvcnQge1xuICAgIFByb2dyZXNzQ2lyY3VsYXJcbn0gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL3Byb2dyZXNzLWNpcmN1bGFyL3Byb2dyZXNzLWNpcmN1bGFyXCI7XG5cbmltcG9ydCB7SW1wcmludH0gZnJvbSBcIi4uLy4uL2RpcmVjdGl2ZXMvaW1wcmludFwiO1xuaW1wb3J0IHtTVEFNUH0gZnJvbSBcIi4uLy4uL3N0cmluZ3Mvc3RhbXBcIjtcbmltcG9ydCB7VEVYVH0gZnJvbSBcIi4uLy4uL3N0cmluZ3MvZW4tdXMvdGV4dFwiO1xuXG5pbXBvcnQge1NJTE99IGZyb20gXCIuLi9zaWxvXCI7XG5cbmltcG9ydCB7SU99IGZyb20gXCJhdGhlbmFldW0vZGF0YS9hcGkvaW9cIjtcbmltcG9ydCB7QVBJU2VydmVyc30gZnJvbSBcImF0aGVuYWV1bS9zZXJ2aWNlcy9odHRwXCI7XG5cbmltcG9ydCB7QVBJfSBmcm9tIFwiLi4vLi4vZGF0YS9pby9hcGlcIjtcblxuaW1wb3J0IHtMb29rdXBQaXBlfSBmcm9tIFwiLi4vLi4vcGlwZXMvbG9va3VwLXBpcGVcIjtcbmltcG9ydCB7UnVsZXNQaXBlfSBmcm9tIFwiLi4vLi4vcGlwZXMvcnVsZXMtcGlwZVwiO1xuaW1wb3J0IHtSRVBPUlRfVklFV19SVUxFU30gZnJvbSBcIi4vcmVwb3J0LXZpZXctcnVsZXNcIjtcblxuXG5pbnRlcmZhY2UgSUpvYkluZm8ge1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgaWQ/OiBudW1iZXI7XG4gICAgc3RhdGU6IHN0cmluZztcbiAgICBjcmVhdGVkQXQ/OiBzdHJpbmc7XG4gICAgdXBkYXRlZEF0Pzogc3RyaW5nO1xuICAgIHBhdGg/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJRW50cnlQb2ludCB7XG4gICAgam9iSWQ6IG51bWJlcjtcbiAgICBkYXRhc2V0VVVJRDogc3RyaW5nO1xuICAgIGRhdGFzZXRUeXBlOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJT3B0aW9ucyB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGVudHJ5UG9pbnRzOiBBcnJheTxhbnk+O1xuICAgIHdvcmtmbG93T3B0aW9uczogQXJyYXk8YW55PjtcbiAgICB0YXNrT3B0aW9uczogQXJyYXk8YW55PjtcbiAgICBwaXBlbGluZUlkOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJU2VydmVyRmlsZSB7XG4gICAgY3JlYXRlZEF0Pzogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIGZpbGVTaXplPzogbnVtYmVyO1xuICAgIGZpbGVUeXBlSWQ/OiBzdHJpbmc7XG4gICAgaW1wb3J0ZWRBdD86IHN0cmluZztcbiAgICBqb2JJZD86IG51bWJlcjtcbiAgICBqb2JVVUlEPzogc3RyaW5nO1xuICAgIG1vZGlmaWVkQXQ/OiBzdHJpbmc7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICBwYXRoPzogc3RyaW5nO1xuICAgIHNvdXJjZUlkPzogc3RyaW5nO1xuICAgIHV1aWQ/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJRnJvbnRlbmRGaWxlIGV4dGVuZHMgSVNlcnZlckZpbGUge1xuICAgIGRpc3BsYXlOYW1lPzogc3RyaW5nO1xuICAgIGRvd25sb2FkVXJsPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJyZXN1bHRzXCIsXG4gICAgcHJvdmlkZXJzOiBbRXJyb3JTZXJ2aWNlXSxcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcInJlc3VsdHMuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicmVzdWx0cy5jc3NcIl0sXG4gICAgZGlyZWN0aXZlczogW0ltcHJpbnQsIENPUkVfRElSRUNUSVZFUywgUm91dGVyTGluaywgUHJvZ3Jlc3NDaXJjdWxhcl0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwaXBlczogW0xvb2t1cFBpcGUsIFJ1bGVzUGlwZV1cbn0pXG5AQ2FuQWN0aXZhdGUoY2FuQ29ubmVjdClcbmV4cG9ydCBjbGFzcyBSZXN1bHRzIGltcGxlbWVudHMgT25BY3RpdmF0ZSB7XG4gICAgcHVibGljIFNUQU1QID0gU1RBTVA7XG4gICAgcHVibGljIHZtID0ge1xuICAgICAgICAvLyBzdGF0ZTogXCIuLi5cIixcbiAgICAgICAgaXNTbXJ0Vmlld1Zpc2libGU6IGZhbHNlLFxuICAgICAgICBpc1NtcnRWaWV3RW5hYmxlZDogZmFsc2UsXG4gICAgICAgIGlzT3BlbjogbnVsbCxcbiAgICAgICAgc2hvdzogbnVsbCxcbiAgICAgICAgam9iOiA8SUpvYkluZm8+e1xuICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgc3RhdGU6IFwiTG9hZGluZy4uLlwiLFxuICAgICAgICAgICAgY3JlYXRlZEF0OiBudWxsLFxuICAgICAgICAgICAgdXBkYXRlZEF0OiBudWxsLFxuICAgICAgICAgICAgcGF0aDogbnVsbFxuICAgICAgICB9LFxuICAgICAgICBqb2JDcmVhdGVkQXQ6IG51bGwsXG4gICAgICAgIGpvYlVwZGF0ZWRBdDogbnVsbCxcbiAgICAgICAgam9iQXBwbGljYXRpb25OYW1lOiBcIlwiLFxuICAgICAgICBsb2c6IFwiPGVtcHR5PlwiLFxuICAgICAgICB0YXNrT3B0aW9uczogW10sXG4gICAgICAgIGZpbGVEb3dubG9hZExpc3Q6IFtdXG4gICAgfTtcbiAgICBwdWJsaWMgZW50cnlQb2ludHM7XG4gICAgcHVibGljIHJlcG9ydHM7XG4gICAgcHVibGljIHRodW1ibmFpbHM7XG4gICAgcHVibGljIGNvbnRlbnQgPSB7XG4gICAgICAgIHNldHRpbmdzOiB7fVxuICAgIH07XG4gICAgcHVibGljIGpvYjtcbiAgICBwdWJsaWMgam9iSWQ7XG4gICAgcHVibGljIGpvYkV2ZW50cyA9IFtdO1xuICAgIHByaXZhdGUgcmVwb3J0TmFtZXNCeUlkcyA9IG51bGw7XG4gICAgcHJpdmF0ZSBwaXBlbGluZVRlbXBsYXRlc0J5SWRzID0gbnVsbDtcbiAgICBwcml2YXRlIFRFWFQgPSBURVhUO1xuXG4gICAgcHJpdmF0ZSBpbzogSU87XG4gICAgcHJpdmF0ZSByb3V0ZVBhcmFtczogUm91dGVQYXJhbXM7XG4gICAgcHJpdmF0ZSBlcnJvclNlcnZpY2U6IEVycm9yU2VydmljZTtcbiAgICBwcml2YXRlIHNlcnZlcnM6IEFQSVNlcnZlcnM7XG5cbiAgICBwcml2YXRlIHJlcG9ydFJ1bGVzID0gUkVQT1JUX1ZJRVdfUlVMRVM7XG5cbiAgICBwcml2YXRlIHBvbGxTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpbzogSU8sXG4gICAgICAgIHJvdXRlUGFyYW1zOiBSb3V0ZVBhcmFtcyxcbiAgICAgICAgZXJyb3JTZXJ2aWNlOiBFcnJvclNlcnZpY2UsXG4gICAgICAgIHNlcnZlcnM6IEFQSVNlcnZlcnNcbiAgICApIHtcblxuICAgICAgICB0aGlzLmlvID0gaW87XG4gICAgICAgIHRoaXMucm91dGVQYXJhbXMgPSByb3V0ZVBhcmFtcztcbiAgICAgICAgdGhpcy5lcnJvclNlcnZpY2UgPSBlcnJvclNlcnZpY2U7XG4gICAgICAgIHRoaXMuc2VydmVycyA9IHNlcnZlcnM7XG5cbiAgICAgICAgdGhpcy52bS5pc09wZW4gPSB7fTtcbiAgICAgICAgdGhpcy52bS5zaG93ID0ge307XG4gICAgICAgIHRoaXMuaW5pdE1lbnVzKCk7XG4gICAgICAgIHRoaXMuc2hvd05vdGhpbmcoKTtcblxuICAgICAgICAvLyBUT0RPKGJza2lubmVyKSgyMDE1LTExLTA2KTogQWxsIG9mIHRoZSBjb2RlIGJlbG93IG9wZXJhdGVzIG9uIHRoZVxuICAgICAgICAvLyBhc3N1bXB0aW9uIHRoYXQgdGhlIHJlc3VsdHMgb2YgdGhlc2UgcXVlcmllcyAodG8gcmVwb3J0LXZpZXctcnVsZXNcbiAgICAgICAgLy8gYW5kIHJlc29sdmVkLXBpcGVsaW5lLXRlbXBsYXRlcykgd2lsbCBoYXZlIGFscmVhZHkgY29tZSBiYWNrIGJlZm9yZVxuICAgICAgICAvLyB0aGUgcmVzdWx0cyBmcm9tIG90aGVyIHF1ZXJpZXMuICBXZSBzaG91bGQgY29kZSB0aGlzIG1vcmUgZGVmZW5zaXZlbHlcbiAgICAgICAgLy8gdG8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIHJlc3VsdHMgY29tZSBpbiBhbnkgb3JkZXIuXG4gICAgICAgIHRoaXMuZmV0Y2hSZXBvcnRWaWV3UnVsZXMoKTtcbiAgICAgICAgdGhpcy5mZXRjaFBpcGVsaW5lVGVtcGxhdGVzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgam9iU3RhdGVzSW5jbHVkZXNGaW5pc2hlZFN0YXRlKGpvYlN0YXRlczogQXJyYXk8c3RyaW5nPikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKGpvYlN0YXRlcy5pbmRleE9mKFwiU1VDQ0VTU0ZVTFwiKSAhPT0gLTEpIHx8XG4gICAgICAgICAgICAoam9iU3RhdGVzLmluZGV4T2YoXCJGQUlMRURcIikgIT09IC0xKSB8fFxuICAgICAgICAgICAgKGpvYlN0YXRlcy5pbmRleE9mKFwiS0lMTEVEXCIpICE9PSAtMSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyByZWZvcm1hdERhdGUoZGF0ZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlKS50b0xvY2FsZVN0cmluZygpO1xuICAgIH1cblxuICAgIHJvdXRlck9uQWN0aXZhdGUobmV4dCwgcHJldikge1xuICAgICAgICB0aGlzLndhaXRGb3JQaXBlbGluZVRlbXBsYXRlc0FuZFRoZW5Mb2FkQW5hbHlzaXNKb2IoKTtcbiAgICB9XG5cbiAgICB3YWl0Rm9yUGlwZWxpbmVUZW1wbGF0ZXNBbmRUaGVuTG9hZEFuYWx5c2lzSm9iKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICgodGhpcy5yZXBvcnROYW1lc0J5SWRzICE9PSBudWxsKSAmJlxuICAgICAgICAgICAgICAgICh0aGlzLnBpcGVsaW5lVGVtcGxhdGVzQnlJZHMgIT09IG51bGwpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblZpZXdDb250ZW50TG9hZGVkKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud2FpdEZvclBpcGVsaW5lVGVtcGxhdGVzQW5kVGhlbkxvYWRBbmFseXNpc0pvYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblZpZXdDb250ZW50TG9hZGVkKCkge1xuICAgICAgICB0aGlzLmpvYklkID0gdGhpcy5yb3V0ZVBhcmFtcy5nZXQoXCJpZFwiKTtcbiAgICAgICAgdGhpcy5sb2FkQW5hbHlzaXNKb2IoKTtcbiAgICAgICAgdGhpcy5sb2FkQW5hbHlzaXNFdmVudHMoKTtcbiAgICAgICAgdGhpcy5sb2FkQW5hbHlzaXNMb2coKTtcbiAgICAgICAgdGhpcy52bS5zaG93LmpvYlN0YXR1cyA9IHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3RvcFBvbGxpbmcoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVNZW51T3ZlcnZpZXcoZXZlbnQpIHtcbiAgICAgICAgdGhpcy50b2dnbGVNZW51KFwib3ZlcnZpZXdcIiwgZXZlbnQpO1xuICAgICAgICB0aGlzLmdvSm9iU3RhdHVzKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlTWVudVJlcG9ydChyZXBvcnQsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMudG9nZ2xlTWVudShyZXBvcnQsIGV2ZW50KTtcbiAgICAgICAgdGhpcy5nb0F0dHJpYnV0ZXMocmVwb3J0LmlkKTtcbiAgICB9XG5cbiAgICB0b2dnbGVNZW51RGF0YShldmVudCkge1xuICAgICAgICB0aGlzLnRvZ2dsZU1lbnUoXCJkYXRhXCIsIGV2ZW50KTtcbiAgICAgICAgdGhpcy5nb0Rvd25sb2FkcygpO1xuICAgIH1cblxuICAgIHRvZ2dsZU1lbnUobWVudUl0ZW0sIGV2ZW50KSB7XG4gICAgICAgIGxldCBtZW51SWQgPSAobWVudUl0ZW0gJiYgbWVudUl0ZW0ubmFtZSkgPyBtZW51SXRlbS5uYW1lIDogbWVudUl0ZW07XG4gICAgICAgIGxldCB3YXNPcGVuID0gdGhpcy52bS5pc09wZW5bbWVudUlkXTtcbiAgICAgICAgdGhpcy5jbG9zZUFsbE1lbnVzKCk7XG4gICAgICAgIHRoaXMudm0uaXNPcGVuW21lbnVJZF0gPSAhd2FzT3BlbjtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpc1Nob3dpbmdBdHRyaWJ1dGVzKHJlcG9ydElkKSB7XG4gICAgICAgIGxldCBzaG93ID0gdGhpcy52bS5zaG93O1xuICAgICAgICByZXR1cm4gKHNob3cuZXZlcnl0aGluZyB8fCAoc2hvdy5hdHRyaWJ1dGVzID09PSByZXBvcnRJZCkpO1xuICAgIH1cblxuICAgIGlzU2hvd2luZ1Bsb3QocGxvdElkKSB7XG4gICAgICAgIHJldHVybiAodGhpcy52bS5zaG93LmV2ZXJ5dGhpbmcgfHwgKHRoaXMudm0uc2hvdy5wbG90ID09PSBwbG90SWQpKTtcbiAgICB9XG5cbiAgICBpc1Nob3dpbmdUYWJsZSh0YWJsZUlkKSB7XG4gICAgICAgIHJldHVybiAodGhpcy52bS5zaG93LmV2ZXJ5dGhpbmcgfHwgKHRoaXMudm0uc2hvdy50YWJsZSA9PT0gdGFibGVJZCkpO1xuICAgIH1cblxuICAgIGdvSm9iU3RhdHVzKCkge1xuICAgICAgICB0aGlzLnNob3dOb3RoaW5nKCk7XG4gICAgICAgIHRoaXMudm0uc2hvdy5qb2JTdGF0dXMgPSB0cnVlO1xuICAgIH1cblxuICAgIGdvVGh1bWJuYWlscygpIHtcbiAgICAgICAgdGhpcy5zaG93Tm90aGluZygpO1xuICAgICAgICB0aGlzLnZtLnNob3cudGh1bWJuYWlscyA9IHRydWU7XG4gICAgfVxuXG4gICAgZ29FdmVyeXRoaW5nKCkge1xuICAgICAgICB0aGlzLnNob3dFdmVyeXRoaW5nKCk7XG4gICAgfVxuXG4gICAgZ29BdHRyaWJ1dGVzKHJlcG9ydElkKSB7XG4gICAgICAgIHRoaXMuc2hvd05vdGhpbmcoKTtcbiAgICAgICAgdGhpcy52bS5zaG93LmF0dHJpYnV0ZXMgPSByZXBvcnRJZDtcbiAgICB9XG5cbiAgICBnb1Bsb3QocGxvdElkKSB7XG4gICAgICAgIHRoaXMuc2hvd05vdGhpbmcoKTtcbiAgICAgICAgdGhpcy52bS5zaG93LnBsb3QgPSBwbG90SWQ7XG4gICAgfVxuXG4gICAgZ29UYWJsZSh0YWJsZUlkKSB7XG4gICAgICAgIHRoaXMuc2hvd05vdGhpbmcoKTtcbiAgICAgICAgdGhpcy52bS5zaG93LnRhYmxlID0gdGFibGVJZDtcbiAgICB9XG5cbiAgICBnb0Rvd25sb2FkcygpIHtcbiAgICAgICAgdGhpcy5zaG93Tm90aGluZygpO1xuICAgICAgICB0aGlzLnZtLnNob3cuZG93bmxvYWRzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnb0xvZygpIHtcbiAgICAgICAgdGhpcy5zaG93Tm90aGluZygpO1xuICAgICAgICB0aGlzLnZtLnNob3cubG9nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBmaWxlVHlwZU5hbWVGcm9tSWQoZmlsZVR5cGVJZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBmaWxlVHlwZUlkLnNwbGl0KFwiLlwiKS5wb3AoKTtcbiAgICB9XG5cbiAgICBvcGVuU21ydFZpZXcoKSB7XG4gICAgICAgIGNvbnN0IHNlcnZlcjogc3RyaW5nID0gXCJhcGk6Ly9zbXJ0LXZpZXdcIjtcbiAgICAgICAgY29uc3QgcGF0aDogc3RyaW5nID0gZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMudm0uam9iLnBhdGgpO1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9IHRoaXMuc2VydmVycy5nZXRVcmwoYCR7c2VydmVyfS9zbXJ0dmlldy9zZXJ2bGV0L2pubHA/ZGF0YXN0b3JlPSR7cGF0aH1gKTtcbiAgICAgICAgd2luZG93Lm9wZW4odXJsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRNZW51cygpIHtcbiAgICAgICAgdGhpcy52bS5pc09wZW4gPSB7fTtcbiAgICAgICAgdGhpcy52bS5pc09wZW4ub3ZlcnZpZXcgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xvc2VBbGxNZW51cygpIHtcbiAgICAgICAgZm9yIChsZXQgbWVudSBpbiB0aGlzLnZtLmlzT3Blbikge1xuICAgICAgICAgICAgaWYgKHRoaXMudm0uaXNPcGVuLmhhc093blByb3BlcnR5KG1lbnUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52bS5pc09wZW5bbWVudV0gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd05vdGhpbmcoKSB7XG4gICAgICAgIHRoaXMuc2V0U2hvd0ZsYWdzVG8oZmFsc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0V2ZXJ5dGhpbmcoKSB7XG4gICAgICAgIHRoaXMuc2V0U2hvd0ZsYWdzVG8odHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRTaG93RmxhZ3NUbyh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnZtLnNob3cuam9iU3RhdHVzID0gdmFsdWU7XG4gICAgICAgIHRoaXMudm0uc2hvdy50aHVtYm5haWxzID0gdmFsdWU7XG4gICAgICAgIHRoaXMudm0uc2hvdy5tZXRyaWNzID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy52bS5zaG93Lm92ZXJ2aWV3ID0gdmFsdWU7XG4gICAgICAgIHRoaXMudm0uc2hvdy5yZXBvcnQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52bS5zaG93LmF0dHJpYnV0ZXMgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52bS5zaG93LnBsb3QgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52bS5zaG93LnRhYmxlID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy52bS5zaG93LmRvd25sb2FkcyA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZtLnNob3cubG9nID0gdmFsdWU7XG4gICAgICAgIHRoaXMudm0uc2hvdy5ldmVyeXRoaW5nID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmZXRjaFJlcG9ydFZpZXdSdWxlcygpIHtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gQVBJLm5SZXBvcnRWaWV3UnVsZXM7XG4gICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5pb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RW5kcG9pbnRBc3luYyhlbmRwb2ludCk7XG4gICAgICAgIHByb21pc2UudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVwb3J0TmFtZXNCeUlkcyA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudHJ5IG9mIDxBcnJheTxhbnk+PnJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydE5hbWVzQnlJZHNbZW50cnkuaWRdID0gZW50cnkubmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5zaG93RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmZXRjaFBpcGVsaW5lVGVtcGxhdGVzKCkge1xuICAgICAgICBsZXQgZW5kcG9pbnQgPSBBUEkublBpcGVsaW5lVGVtcGxhdGVzO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMuaW9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEVuZHBvaW50QXN5bmMoZW5kcG9pbnQpO1xuICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBpcGVsaW5lVGVtcGxhdGVzQnlJZHMgPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiA8QXJyYXk8YW55Pj5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waXBlbGluZVRlbXBsYXRlc0J5SWRzW2VudHJ5LmlkXSA9IGVudHJ5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnNob3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRBbmFseXNpc0pvYigpIHtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gQVBJLmFKb2JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFuZCh7JGpvYl9pbnQ6IHRoaXMuam9iSWR9KTtcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLmlvXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRFbmRwb2ludEFzeW5jKGVuZHBvaW50KTtcbiAgICAgICAgcHJvbWlzZS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgSFRUUF9DT0RFID0gXCJodHRwQ29kZVwiO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbSFRUUF9DT0RFXSA9PT0gNDA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnNob3dFcnJvcihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudm0uam9iID0gPElKb2JJbmZvPnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52bS5qb2JDcmVhdGVkQXQgPSBSZXN1bHRzLnJlZm9ybWF0RGF0ZSh0aGlzLnZtLmpvYi5jcmVhdGVkQXQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZtLmpvYlVwZGF0ZWRBdCA9IFJlc3VsdHMucmVmb3JtYXREYXRlKHRoaXMudm0uam9iLnVwZGF0ZWRBdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2Uuc2hvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZEFuYWx5c2lzRXZlbnRzKCkge1xuICAgICAgICBsZXQgZW5kcG9pbnQgPSBBUEkubkpvYkV2ZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuYW5kKHskam9iX2ludDogdGhpcy5qb2JJZH0pO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMuaW9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEVuZHBvaW50QXN5bmMoZW5kcG9pbnQpO1xuICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcnJheVJlc3VsdCA9IDxBcnJheTx7c3RhdGU6IHN0cmluZ30+PiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJheVJlc3VsdC5sZW5ndGggPiB0aGlzLmpvYkV2ZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuam9iRXZlbnRzID0gYXJyYXlSZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEFuYWx5c2lzSm9iKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRFbnRyeVBvaW50cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkT3B0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQW5hbHlzaXNSZXBvcnRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRGaWxlRG93bmxvYWRMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRBbmFseXNpc0xvZygpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXNzZXJ0KGFuZ3VsYXIuZXF1YWxzKHJlc3VsdCwgdGhpcy5qb2JFdmVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGpvYlN0YXRlcyA9IGFycmF5UmVzdWx0Lm1hcChpdGVtID0+IGl0ZW0uc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIVJlc3VsdHMuam9iU3RhdGVzSW5jbHVkZXNGaW5pc2hlZFN0YXRlKGpvYlN0YXRlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRQb2xsaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BQb2xsaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPKGJza2lubmVyKTogTG9nIGVycm9yIG9uY2Ugd2UgaGF2ZSBhIGxvZ2dpbmcgc2VydmljZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnNob3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXJ0UG9sbGluZygpIHtcbiAgICAgICAgaWYgKHRoaXMucG9sbFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wb2xsU3Vic2NyaXB0aW9uID0gT2JzZXJ2YWJsZS50aW1lcig0MDAwLCA0MDAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkQW5hbHlzaXNFdmVudHMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdG9wUG9sbGluZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBvbGxTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvbGxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5wb2xsU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRFbnRyeVBvaW50cygpIHtcbiAgICAgICAgdGhpcy5lbnRyeVBvaW50cyA9IFtdO1xuXG4gICAgICAgIGxldCBlbmRwb2ludCA9IEFQSS5uSm9iRW50cnlQb2ludHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFuZCh7JGpvYl9pbnQ6IHRoaXMuam9iSWR9KTtcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLmlvXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRFbmRwb2ludEFzeW5jKGVuZHBvaW50KTtcbiAgICAgICAgcHJvbWlzZS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXlSZXN1bHQgPSA8QXJyYXk8SUVudHJ5UG9pbnQ+PnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgYXJyYXlSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEVudHJ5UG9pbnQoZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyhic2tpbm5lcik6IExvZyBlcnJvciBvbmNlIHdlIGhhdmUgYSBsb2dnaW5nIHNlcnZpY2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5zaG93RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkT3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5lbnRyeVBvaW50cyA9IFtdO1xuICAgICAgICBsZXQgZW5kcG9pbnQgPSBBUEkubkpvYk9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFuZCh7JGpvYl9pbnQ6IHRoaXMuam9iSWR9KTtcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLmlvLmdldEVuZHBvaW50QXN5bmMoZW5kcG9pbnQpO1xuICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0gPElPcHRpb25zPiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgY29uc3QgcHQgPSB0aGlzLnBpcGVsaW5lVGVtcGxhdGVzQnlJZHNbb3B0aW9ucy5waXBlbGluZUlkXTtcbiAgICAgICAgICAgICAgICB0aGlzLnZtLmpvYkFwcGxpY2F0aW9uTmFtZSA9XG4gICAgICAgICAgICAgICAgICAgIChwdCAmJiBwdC5uYW1lKSA/IHB0Lm5hbWUgOiBvcHRpb25zLnBpcGVsaW5lSWQ7XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy50YXNrT3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZtLnRhc2tPcHRpb25zID0gb3B0aW9ucy50YXNrT3B0aW9ucy5zb3J0KFxuICAgICAgICAgICAgICAgICAgICAgICAgKHgsIHkpID0+IHgub3B0aW9uSWQubG9jYWxlQ29tcGFyZSh5Lm9wdGlvbklkKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHQgJiYgcHQudGFza09wdGlvbnMgJiYgcHQudGFza09wdGlvbnMucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BlcnRpZXMgPSBwdC50YXNrT3B0aW9ucy5wcm9wZXJ0aWVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgb3B0aW9uIG9mIHRoaXMudm0udGFza09wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NoZW1hID0gcHJvcGVydGllc1tvcHRpb24ub3B0aW9uSWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aXRsZSA9IHNjaGVtYSA/IHNjaGVtYS50aXRsZSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLm5hbWUgPSB0aXRsZSB8fCBvcHRpb24ub3B0aW9uSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZtLnRhc2tPcHRpb25zID0gW107XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudm0udGFza09wdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudm0udGFza09wdGlvbnMucHVzaCh7bmFtZTogXCJub25lXCIsIHZhbHVlOiBcIlwifSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2Uuc2hvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZEVudHJ5UG9pbnQoZW50cnlQb2ludDogSUVudHJ5UG9pbnQpIHtcbiAgICAgICAgbGV0IHV1aWQgPSBlbnRyeVBvaW50LmRhdGFzZXRVVUlEO1xuICAgICAgICBsZXQgZW5kcG9pbnQgPSBBUEkuYW55RGF0YXNldEJ5VXVpZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYW5kKHskc2V0X3V1aWQ6IHV1aWR9KTtcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLmlvLmdldEVuZHBvaW50QXN5bmMoZW5kcG9pbnQpO1xuICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSAoPGFueT5yZXN1bHQpLmlkO1xuICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0VHlwZSA9IERhdGFzZXRUeXBlLmJ5RmlsZXR5cGUoZW50cnlQb2ludC5kYXRhc2V0VHlwZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRyeVBvaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGRhdGFzZXRUeXBlLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICByb3V0ZTogWyBgLi4vJHtQQUdFX0ZPUl9GSUxFVFlQRVtlbnRyeVBvaW50LmRhdGFzZXRUeXBlXX1gLCB7IGlkOiBpZCB9XSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5zaG93RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkQW5hbHlzaXNSZXBvcnRzKCkge1xuICAgICAgICB0aGlzLnJlcG9ydHMgPSBbXTtcbiAgICAgICAgdGhpcy50aHVtYm5haWxzID0gW107XG4gICAgICAgIC8vIGNvbnN0IFRFTVBMQVRFX1VSTCA9IEFQSS5uSm9iUmVwb3J0cztcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gQVBJLm5Kb2JSZXBvcnRzLmFuZCh7JGpvYl9pbnQ6IHRoaXMuam9iSWR9KTtcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLmlvLmdldEVuZHBvaW50QXN5bmMoZW5kcG9pbnQpO1xuICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcnJheVJlc3VsdCA9IDxBcnJheTx7ZGF0YVN0b3JlRmlsZToge3V1aWQ6IGFueX19Pj4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBhcnJheVJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LmRhdGFTdG9yZUZpbGUgJiYgZW50cnkuZGF0YVN0b3JlRmlsZS51dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcG9ydFV1aWQgPSBlbnRyeS5kYXRhU3RvcmVGaWxlLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQW5hbHlzaXNSZXBvcnQocmVwb3J0VXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPKGJza2lubmVyKTogTG9nIGVycm9yIG9uY2Ugd2UgaGF2ZSBhIGxvZ2dpbmcgc2VydmljZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnNob3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRBbmFseXNpc1JlcG9ydChyZXBvcnRVdWlkOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gQVBJLmFKb2JSZXBvcnQuYW5kKHtcbiAgICAgICAgICAgICRqb2JfaW50OiB0aGlzLmpvYklkLFxuICAgICAgICAgICAgJHJlcG9ydF91dWlkOiByZXBvcnRVdWlkXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMuaW8uZ2V0RW5kcG9pbnRBc3luYyhlbmRwb2ludCk7XG4gICAgICAgIHByb21pc2UudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXBvcnQgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwcm9jZXNzUmVwb3J0SW1hZ2VzKHJlcG9ydCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwcm9jZXNzUmVwb3J0VGFibGVzKHJlcG9ydCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRzLnB1c2gocmVwb3J0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRodW1ibmFpbHNGb3JSZXBvcnQocmVwb3J0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnNob3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRBbmFseXNpc0xvZygpIHtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gQVBJLmFKb2JMb2cuYW5kKHskam9iX2ludDogdGhpcy5qb2JJZH0pO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMuaW8uZ2V0RW5kcG9pbnRBc3luYyhlbmRwb2ludCk7XG4gICAgICAgIHByb21pc2UudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudm0ubG9nID0gPHN0cmluZz5yZXN1bHQ7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52bS5sb2cgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUaHVtYm5haWxzRm9yUmVwb3J0KHJlcG9ydCkge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAobGV0IHBsb3RHcm91cCBvZiByZXBvcnQucGxvdEdyb3Vwcykge1xuICAgICAgICAgICAgZm9yIChsZXQgcGxvdCBvZiBwbG90R3JvdXAucGxvdHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRodW1ibmFpbHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBwbG90LmlkLFxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBwbG90LmNhcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVXJsOiBwbG90LmltYWdlVXJsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVybEZvckltYWdlRmlsZShmaWxlTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBlbmRwb2ludCA9IEFQSS5hSm9iUmVwb3J0UmVzb3VyY2UuYW5kKHtcbiAgICAgICAgICAgICRqb2JfaW50OiB0aGlzLmpvYklkLFxuICAgICAgICAgICAgJGZpbGVfbmFtZTogZmlsZU5hbWVcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlcnMuZ2V0VXJsKFxuICAgICAgICAgICAgYGFwaTovL3NtcnQtbGluay8ke2VuZHBvaW50LnVybCgpLnJlcGxhY2UoXCIkam9iX3R5cGVcIiwgXCJwYnNtcnRwaXBlXCIpfWBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXByb2Nlc3NSZXBvcnRUYWJsZXMocmVwb3J0KSB7XG4gICAgICAgIGZvciAobGV0IHRhYmxlIG9mIHJlcG9ydC50YWJsZXMpIHtcbiAgICAgICAgICAgIC8vIGZhaWwgZ3JhY2VmdWxseSBpZiB0aGUgdGl0bGUgaXMgbWlzc2luZ1xuICAgICAgICAgICAgdGFibGUudGl0bGUgPSB0YWJsZS50aXRsZSB8fCB0YWJsZS5pZC5zcGxpdChcIi5cIilbMF07XG5cbiAgICAgICAgICAgIGNvbnN0IHJvd3MgPSB0YWJsZS5yb3dzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gb2YgdGFibGUuY29sdW1ucykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1uLnZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJvd3NbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3NbaV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByb3dzW2ldLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGNvbHVtbi5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBjb2x1bW4udmFsdWVzW2ldXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVwb3J0O1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcHJvY2Vzc1JlcG9ydEltYWdlcyhyZXBvcnQpIHtcbiAgICAgICAgcmVwb3J0Lm5hbWUgPSB0aGlzLnJlcG9ydE5hbWVzQnlJZHNbcmVwb3J0LmlkXSB8fCByZXBvcnQuaWQ7XG4gICAgICAgIHJlcG9ydC5wbG90cyA9IFtdO1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAobGV0IHBsb3RHcm91cCBvZiByZXBvcnQucGxvdEdyb3Vwcykge1xuICAgICAgICAgICAgZm9yIChsZXQgcGxvdCBvZiBwbG90R3JvdXAucGxvdHMpIHtcbiAgICAgICAgICAgICAgICBwbG90LmltYWdlVXJsID0gdGhpcy51cmxGb3JJbWFnZUZpbGUocGxvdC5pbWFnZSk7XG4gICAgICAgICAgICAgICAgcGxvdC5jYXB0aW9uID0gcGxvdC5jYXB0aW9uIHx8IHBsb3RHcm91cC50aXRsZTtcbiAgICAgICAgICAgICAgICByZXBvcnQucGxvdHMucHVzaChwbG90KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVwb3J0O1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZEZpbGVEb3dubG9hZExpc3QoKSB7XG4gICAgICAgIGxldCBlbmRwb2ludCA9IEFQSS5uSm9iRGF0YXN0b3Jlcy5hbmQoeyRqb2JfaW50OiB0aGlzLmpvYklkfSk7XG4gICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5pby5nZXRFbmRwb2ludEFzeW5jKGVuZHBvaW50KTtcbiAgICAgICAgcHJvbWlzZS50aGVuKChzZXJ2ZXJGaWxlczogSVNlcnZlckZpbGVbXSkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgZnJvbnRlbmRGaWxlczogSUZyb250ZW5kRmlsZVtdID0gc2VydmVyRmlsZXNcbiAgICAgICAgICAgICAgICAubWFwKHRoaXMuYWRkRG93bmxvYWRVcmwuYmluZCh0aGlzKSlcbiAgICAgICAgICAgICAgICAubWFwKHRoaXMuYWRkRGlzcGxheU5hbWUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIHRoaXMudm0uZmlsZURvd25sb2FkTGlzdCA9IGZyb250ZW5kRmlsZXM7XG4gICAgICAgICAgICB0aGlzLnZtLmlzU21ydFZpZXdWaXNpYmxlID0gdGhpcy5jYW5TbXJ0Vmlld0xpbmtCZVZpc2libGUoZnJvbnRlbmRGaWxlcyk7XG4gICAgICAgICAgICB0aGlzLnZtLmlzU21ydFZpZXdFbmFibGVkID0gdGhpcy5jYW5TbXJ0Vmlld0JlRW5hYmxlZCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvbWlzZS5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yU2VydmljZS5zaG93RXJyb3IoZXJyb3IpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZERvd25sb2FkVXJsKHNlcnZlckZpbGU6IElTZXJ2ZXJGaWxlKTogSUZyb250ZW5kRmlsZSB7XG4gICAgICAgIGxldCBmcm9udGVuZEZpbGU6IElGcm9udGVuZEZpbGUgPSBPYmplY3QuYXNzaWduKHt9LCBzZXJ2ZXJGaWxlKTtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gQVBJLmFKb2JGaWxlRG93bmxvYWQuYW5kKHtcbiAgICAgICAgICAgICRqb2JfaW50OiB0aGlzLmpvYklkLFxuICAgICAgICAgICAgJHN0b3JlX3V1aWQ6IHNlcnZlckZpbGUudXVpZFxuICAgICAgICB9KTtcbiAgICAgICAgZnJvbnRlbmRGaWxlLmRvd25sb2FkVXJsID0gdGhpcy5pby51cmxGb3IoZW5kcG9pbnQpO1xuICAgICAgICByZXR1cm4gZnJvbnRlbmRGaWxlO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRGlzcGxheU5hbWUoZnJvbnRlbmRGaWxlOiBJRnJvbnRlbmRGaWxlKTogSUZyb250ZW5kRmlsZSB7XG4gICAgICAgIGxldCBuZXdGcm9udGVuZEZpbGU6IElGcm9udGVuZEZpbGUgPSBPYmplY3QuYXNzaWduKHt9LCBmcm9udGVuZEZpbGUpO1xuICAgICAgICBuZXdGcm9udGVuZEZpbGUuZGlzcGxheU5hbWUgPSAoZnJvbnRlbmRGaWxlLm5hbWUpID8gZnJvbnRlbmRGaWxlLm5hbWUgOiBmcm9udGVuZEZpbGUuc291cmNlSWQ7XG4gICAgICAgIHJldHVybiBuZXdGcm9udGVuZEZpbGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYW5TbXJ0Vmlld0xpbmtCZVZpc2libGUoZG93bmxvYWRzKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQWxpZ25tZW50U2V0UHJlc2VudChkb3dubG9hZHMpICYmICEhdGhpcy52bS5qb2IucGF0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhblNtcnRWaWV3QmVFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy52bS5qb2Iuc3RhdGUgPT09IFwiU1VDQ0VTU0ZVTFwiO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNBbGlnbm1lbnRTZXRQcmVzZW50KGRvd25sb2Fkcyk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgYWxpZ25tZW50U2V0RmlsZXMgPSB0aGlzLnZtLmZpbGVEb3dubG9hZExpc3QuZmlsdGVyKChmaWxlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmlsZS5maWxlVHlwZUlkID09PSBEYXRhc2V0VHlwZS5BTElHTk1FTlQuZmlsZXR5cGU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gKGFsaWdubWVudFNldEZpbGVzLmxlbmd0aCA+IDApID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9