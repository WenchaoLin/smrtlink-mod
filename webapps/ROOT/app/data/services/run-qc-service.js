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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require("angular2/core");
var http_1 = require("athenaeum/services/http");
var run_qc_1 = require("../facets/run-qc");
var run_model_1 = require("../models/run-model");
exports.RunModel = run_model_1.RunModel;
var run_qc_model_1 = require("../models/run-qc-model");
__export(require("../models/run-model"));
var RunQcService = (function () {
    function RunQcService(http, apiServers) {
        this.http = http;
        this.apiServers = apiServers;
    }
    Object.defineProperty(RunQcService.prototype, "runQcFacet", {
        get: function () {
            return run_qc_1.RUN_QC_FACET;
        },
        enumerable: true,
        configurable: true
    });
    RunQcService.messageForError = function (error) {
        var message = String.EMPTY;
        if (error) {
            if (error.name) {
                message += error.name;
            }
            if (error.status) {
                message += " (%d)".sprintf(error.status);
            }
            if (error.message) {
                message += ": %s".sprintf(error.message);
            }
        }
        return message;
    };
    RunQcService.prototype.getRuns = function () {
        var _this = this;
        return this.http.get("api://smrt-link/smrt-link/runs?reserved=true")
            .map(function (items) { return items.map(function (item) { return _this.responseToRunQcModel(item); }); })
            .toPromise();
    };
    RunQcService.prototype.getRun = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promise = _this.http.get("api://smrt-link/smrt-link/runs/" + id)
                .map(function (item) { return _this.responseToRunQcModel(item); })
                .toPromise();
            promise.then(function (run) {
                var promise2 = _this.http.get("api://smrt-link/smrt-link/runs/" + id + "/collections")
                    .map(function (items) { return items.map(function (item) { return _this.responseToRunQcSampleModel(item); }); })
                    .toPromise();
                promise2.then(function (samples) {
                    run.samples = samples;
                    samples.forEach(function (s) {
                        var promiseSubread = _this.http.get("api://smrt-link/secondary-analysis/datasets/subreads/" + s.uniqueId)
                            .toPromise();
                        promiseSubread.then(function () {
                            s.hasSubreadset = true;
                            var promiseReports = _this.http.get("api://smrt-link/secondary-analysis/datasets/subreads/" + s.uniqueId + "/reports")
                                .toPromise();
                            promiseReports.then(function (reports) {
                                var statsUniqueId = _this.getReportUniqueId(reports, "filter_stats_xml.json");
                                var statsPromise = _this.getReportData(statsUniqueId);
                                if (statsPromise) {
                                    statsPromise.then(function (report) {
                                        var numBases = _this.getReportAttributeValue(report, "raw_data_report.nbases");
                                        if (numBases) {
                                            s.totalGigabases = numBases / 1.0e9;
                                        }
                                        var readLength = _this.getReportAttributeValue(report, "raw_data_report.read_length");
                                        if (readLength) {
                                            s.readStats = { length: readLength, quality: null };
                                        }
                                        var insertReadLength = _this.getReportAttributeValue(report, "raw_data_report.insert_length");
                                        if (insertReadLength) {
                                            s.insertReadStats = { length: insertReadLength, quality: null };
                                        }
                                        var readLengthPlotImage = _this.getReportPlotImage(report, "raw_data_report.read_length_plot_group", "raw_data_report.read_length_plot_group.read_length_plot_0");
                                        if (readLengthPlotImage) {
                                            s.readLengthPlotUrl = _this.apiServers.getUrl("api://smrt-link/secondary-analysis/datastore-files/" +
                                                (statsUniqueId + "/resources?relpath=" + readLengthPlotImage));
                                        }
                                        var insertReadLengthPlotImage = _this.getReportPlotImage(report, "raw_data_report.insert_length_plot_group", "raw_data_report.insert_length_plot_group.insert_length_plot_0");
                                        if (insertReadLengthPlotImage) {
                                            s.insertReadLengthPlotUrl = _this.apiServers.getUrl("api://smrt-link/secondary-analysis/datastore-files/" +
                                                (statsUniqueId + "/resources?relpath=" + insertReadLengthPlotImage));
                                        }
                                    }).catch(function (error) {
                                        if (error.status !== 404 && !s.metricsAccessError) {
                                            s.metricsAccessError = RunQcService.messageForError(error);
                                        }
                                    }).then();
                                }
                                var loadingUniqueId = _this.getReportUniqueId(reports, "loading_xml.json");
                                var loadingPromise = _this.getReportData(loadingUniqueId);
                                if (loadingPromise) {
                                    loadingPromise.then(function (report) {
                                        var productiveZmws = _this.getReportTableValue(report, "loading_xml_report.loading_xml_table", "loading_xml_report.loading_xml_table.productive_zmws");
                                        var productivity_0 = _this.getReportTableValue(report, "loading_xml_report.loading_xml_table", "loading_xml_report.loading_xml_table.productivity_0");
                                        var productivity_1 = _this.getReportTableValue(report, "loading_xml_report.loading_xml_table", "loading_xml_report.loading_xml_table.productivity_1");
                                        var productivity_2 = _this.getReportTableValue(report, "loading_xml_report.loading_xml_table", "loading_xml_report.loading_xml_table.productivity_2");
                                        if (productiveZmws && productivity_0 && productivity_1 && productivity_2) {
                                            s.productivity = {
                                                p0: productiveZmws * productivity_0 / 100,
                                                p1: productiveZmws * productivity_1 / 100,
                                                p2: productiveZmws * productivity_2 / 100
                                            };
                                        }
                                    }).catch(function (error) {
                                        if (error.status !== 404 && !s.metricsAccessError) {
                                            s.metricsAccessError = RunQcService.messageForError(error);
                                        }
                                    }).then();
                                }
                            }).catch(function (error) {
                                if (error.status !== 404) {
                                    s.metricsAccessError = RunQcService.messageForError(error);
                                }
                            }).then();
                        }).catch(function (error) {
                            s.hasSubreadset = false;
                            if (error.status !== 404) {
                                s.metricsAccessError = RunQcService.messageForError(error);
                            }
                        }).then();
                    });
                });
                resolve(run);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    RunQcService.prototype.getReportUniqueId = function (reports, reportId) {
        var matchingReports = reports.filter(function (r) { return r.dataStoreFile.path.endsWith(reportId); });
        if (matchingReports.length > 0) {
            return matchingReports[0].dataStoreFile.uuid;
        }
        return undefined;
    };
    RunQcService.prototype.getReportData = function (id) {
        if (id) {
            return this.http.get("api://smrt-link/secondary-analysis/datastore-files/" + id + "/download")
                .toPromise();
        }
        return undefined;
    };
    RunQcService.prototype.getReportItemOrDefault = function (items, id) {
        var matchingItems = items.filter(function (a) { return a.id === id; });
        return (matchingItems.length === 1) ? matchingItems[0] : undefined;
    };
    RunQcService.prototype.getReportPlotImage = function (report, plotGroupId, plotId) {
        var plotGroup = this.getReportItemOrDefault(report.plotGroups, plotGroupId);
        if (plotGroup) {
            var plot = this.getReportItemOrDefault(plotGroup.plots, plotId);
            if (plot) {
                return plot.image;
            }
        }
        return undefined;
    };
    RunQcService.prototype.getReportAttributeValue = function (report, attrId) {
        var attr = this.getReportItemOrDefault(report.attributes, attrId);
        return attr ? attr.value : undefined;
    };
    RunQcService.prototype.getReportTableValue = function (report, tableId, columnId, rowIndex) {
        if (rowIndex === void 0) { rowIndex = 0; }
        var table = this.getReportItemOrDefault(report.tables, tableId);
        if (!table) {
            return undefined;
        }
        var column = this.getReportItemOrDefault(table.columns, columnId);
        if (!column) {
            return undefined;
        }
        return (column.values.length > rowIndex && rowIndex >= 0) ? column.values[rowIndex] : undefined;
    };
    RunQcService.prototype.responseToRunQcModel = function (run) {
        return new run_qc_model_1.RunQcModel({
            uniqueId: run.uniqueId,
            name: run.name,
            summary: run.summary,
            instrumentName: run.instrumentName,
            instrumentSerialNumber: run.instrumentSerialNumber,
            instrumentSwVersion: run.instrumentSwVersion,
            primaryAnalysisSwVersion: run.primaryAnalysisSwVersion,
            context: run.context,
            startedAt: run.startedAt,
            completedAt: run.completedAt,
            status: run.status,
            totalCells: run.totalCells,
            numCellsCompleted: run.numCellsCompleted,
            numCellsFailed: run.numCellsFailed
        });
    };
    RunQcService.prototype.responseToRunQcSampleModel = function (sample) {
        return new run_qc_model_1.RunQcSampleModel({
            uniqueId: sample.uniqueId,
            well: sample.well,
            name: sample.name,
            summary: sample.summary,
            startedAt: sample.startedAt,
            completedAt: sample.completedAt,
            status: sample.status,
            movieMinutes: sample.movieMinutes,
            context: sample.context,
            terminationInfo: sample.terminationInfo,
            collectionPathUri: sample.collectionPathUri
        });
    };
    RunQcService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_1.APIServers])
    ], RunQcService);
    return RunQcService;
}());
exports.RunQcService = RunQcService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL3NlcnZpY2VzL3J1bi1xYy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFFekMscUJBQStCLHlCQUF5QixDQUFDLENBQUE7QUFHekQsdUJBQTJCLGtCQUFrQixDQUFDLENBQUE7QUFFOUMsMEJBQXVCLHFCQUFxQixDQUFDLENBQUE7QUFJcEMsZ0JBQVE7QUFGakIsNkJBQTJDLHdCQUF3QixDQUFDLENBQUE7QUFJcEUsaUJBQWMscUJBQXFCLENBQUMsRUFBQTtBQUdwQztJQVFJLHNCQUFZLElBQVUsRUFBRSxVQUFzQjtRQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBVkQsc0JBQUksb0NBQVU7YUFBZDtZQUNJLE1BQU0sQ0FBQyxxQkFBWSxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBVWMsNEJBQWUsR0FBOUIsVUFBK0IsS0FBVTtRQUNyQyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDYixPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQztZQUMxQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8s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QVM7WUFDM0IsV0FBVyxFQUFFLE1BQU0sQ0FBQyxXQUFXO1lBQy9CLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVk7WUFDakMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3ZCLGVBQWUsRUFBRSxNQUFNLENBQUMsZUFBZTtZQUN2QyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsaUJBQWlCO1NBQzlDLENBQUMsQ0FBQztJQUVQLENBQUM7SUF6UUw7UUFBQyxpQkFBVSxFQUFFOztvQkFBQTtJQTBRYixtQkFBQztBQUFELENBelFBLEFBeVFDLElBQUE7QUF6UVksb0JBQVksZUF5UXhCLENBQUEiLCJmaWxlIjoiYXBwL2RhdGEvc2VydmljZXMvcnVuLXFjLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5cbmltcG9ydCB7SHR0cCwgQVBJU2VydmVyc30gZnJvbSBcImF0aGVuYWV1bS9zZXJ2aWNlcy9odHRwXCI7XG5pbXBvcnQge1N0YXNofSBmcm9tIFwiLi4vaW8vc3Rhc2hcIjtcbmltcG9ydCB7QVBJfSBmcm9tIFwiLi4vaW8vYXBpXCI7XG5pbXBvcnQge1JVTl9RQ19GQUNFVH0gZnJvbSBcIi4uL2ZhY2V0cy9ydW4tcWNcIjtcblxuaW1wb3J0IHtSdW5Nb2RlbH0gZnJvbSBcIi4uL21vZGVscy9ydW4tbW9kZWxcIjtcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5pbXBvcnQge1J1blFjTW9kZWwsIFJ1blFjU2FtcGxlTW9kZWx9IGZyb20gXCIuLi9tb2RlbHMvcnVuLXFjLW1vZGVsXCI7XG5cbmV4cG9ydCB7IFJ1bk1vZGVsIH1cblxuZXhwb3J0ICogZnJvbSBcIi4uL21vZGVscy9ydW4tbW9kZWxcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJ1blFjU2VydmljZSB7XG4gICAgZ2V0IHJ1blFjRmFjZXQoKSB7XG4gICAgICAgIHJldHVybiBSVU5fUUNfRkFDRVQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwO1xuICAgIHByaXZhdGUgYXBpU2VydmVyczogQVBJU2VydmVycztcblxuICAgIGNvbnN0cnVjdG9yKGh0dHA6IEh0dHAsIGFwaVNlcnZlcnM6IEFQSVNlcnZlcnMpIHtcbiAgICAgICAgdGhpcy5odHRwID0gaHR0cDtcbiAgICAgICAgdGhpcy5hcGlTZXJ2ZXJzID0gYXBpU2VydmVycztcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBtZXNzYWdlRm9yRXJyb3IoZXJyb3I6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBtZXNzYWdlID0gU3RyaW5nLkVNUFRZO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChlcnJvci5uYW1lKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBlcnJvci5uYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBcIiAoJWQpXCIuc3ByaW50ZihlcnJvci5zdGF0dXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gXCI6ICVzXCIuc3ByaW50ZihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH1cblxuICAgIGdldFJ1bnMoKTogUHJvbWlzZTxSdW5RY01vZGVsW10+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgYXBpOi8vc21ydC1saW5rL3NtcnQtbGluay9ydW5zP3Jlc2VydmVkPXRydWVgKVxuICAgICAgICAgICAgLm1hcChpdGVtcyA9PiBpdGVtcy5tYXAoaXRlbSA9PiB0aGlzLnJlc3BvbnNlVG9SdW5RY01vZGVsKGl0ZW0pKSlcbiAgICAgICAgICAgIC50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBnZXRSdW4oaWQ6IHN0cmluZyB8IG51bWJlcik6IFByb21pc2U8UnVuUWNNb2RlbD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMuaHR0cC5nZXQoYGFwaTovL3NtcnQtbGluay9zbXJ0LWxpbmsvcnVucy8ke2lkfWApXG4gICAgICAgICAgICAgICAgLm1hcChpdGVtID0+IHRoaXMucmVzcG9uc2VUb1J1blFjTW9kZWwoaXRlbSkpXG4gICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4ocnVuID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZTIgPSB0aGlzLmh0dHAuZ2V0KGBhcGk6Ly9zbXJ0LWxpbmsvc21ydC1saW5rL3J1bnMvJHtpZH0vY29sbGVjdGlvbnNgKVxuICAgICAgICAgICAgICAgICAgICAubWFwKGl0ZW1zID0+IGl0ZW1zLm1hcChpdGVtID0+IHRoaXMucmVzcG9uc2VUb1J1blFjU2FtcGxlTW9kZWwoaXRlbSkpKVxuICAgICAgICAgICAgICAgICAgICAudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgICAgICAgICBwcm9taXNlMi50aGVuKHNhbXBsZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBydW4uc2FtcGxlcyA9IHNhbXBsZXM7XG5cbiAgICAgICAgICAgICAgICAgICAgc2FtcGxlcy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb21pc2VTdWJyZWFkID0gdGhpcy5odHRwLmdldChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgYXBpOi8vc21ydC1saW5rL3NlY29uZGFyeS1hbmFseXNpcy9kYXRhc2V0cy9zdWJyZWFkcy8ke3MudW5pcXVlSWR9YClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VTdWJyZWFkLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5oYXNTdWJyZWFkc2V0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9taXNlUmVwb3J0cyA9IHRoaXMuaHR0cC5nZXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBhcGk6Ly9zbXJ0LWxpbmsvc2Vjb25kYXJ5LWFuYWx5c2lzL2RhdGFzZXRzL3N1YnJlYWRzLyR7cy51bmlxdWVJZH0vcmVwb3J0c2ApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1Byb21pc2UoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VSZXBvcnRzLnRoZW4ocmVwb3J0cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGF0c1VuaXF1ZUlkID0gdGhpcy5nZXRSZXBvcnRVbmlxdWVJZChyZXBvcnRzLCBcImZpbHRlcl9zdGF0c194bWwuanNvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXRzUHJvbWlzZSA9IHRoaXMuZ2V0UmVwb3J0RGF0YShzdGF0c1VuaXF1ZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRzUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHNQcm9taXNlLnRoZW4ocmVwb3J0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbnVtQmFzZXMgPSB0aGlzLmdldFJlcG9ydEF0dHJpYnV0ZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmF3X2RhdGFfcmVwb3J0Lm5iYXNlc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVtQmFzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy50b3RhbEdpZ2FiYXNlcyA9IG51bUJhc2VzIC8gMS4wZTk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWFkTGVuZ3RoID0gdGhpcy5nZXRSZXBvcnRBdHRyaWJ1dGVWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJhd19kYXRhX3JlcG9ydC5yZWFkX2xlbmd0aFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVhZExlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnJlYWRTdGF0cyA9IHsgbGVuZ3RoOiByZWFkTGVuZ3RoLCBxdWFsaXR5OiBudWxsIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnNlcnRSZWFkTGVuZ3RoID0gdGhpcy5nZXRSZXBvcnRBdHRyaWJ1dGVWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJhd19kYXRhX3JlcG9ydC5pbnNlcnRfbGVuZ3RoXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnNlcnRSZWFkTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuaW5zZXJ0UmVhZFN0YXRzID0geyBsZW5ndGg6IGluc2VydFJlYWRMZW5ndGgsIHF1YWxpdHk6IG51bGwgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlYWRMZW5ndGhQbG90SW1hZ2UgPSB0aGlzLmdldFJlcG9ydFBsb3RJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJhd19kYXRhX3JlcG9ydC5yZWFkX2xlbmd0aF9wbG90X2dyb3VwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmF3X2RhdGFfcmVwb3J0LnJlYWRfbGVuZ3RoX3Bsb3RfZ3JvdXAucmVhZF9sZW5ndGhfcGxvdF8wXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWFkTGVuZ3RoUGxvdEltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMucmVhZExlbmd0aFBsb3RVcmwgPSB0aGlzLmFwaVNlcnZlcnMuZ2V0VXJsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGFwaTovL3NtcnQtbGluay9zZWNvbmRhcnktYW5hbHlzaXMvZGF0YXN0b3JlLWZpbGVzL2ArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHtzdGF0c1VuaXF1ZUlkfS9yZXNvdXJjZXM/cmVscGF0aD0ke3JlYWRMZW5ndGhQbG90SW1hZ2V9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnNlcnRSZWFkTGVuZ3RoUGxvdEltYWdlID0gdGhpcy5nZXRSZXBvcnRQbG90SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyYXdfZGF0YV9yZXBvcnQuaW5zZXJ0X2xlbmd0aF9wbG90X2dyb3VwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmF3X2RhdGFfcmVwb3J0Lmluc2VydF9sZW5ndGhfcGxvdF9ncm91cC5pbnNlcnRfbGVuZ3RoX3Bsb3RfMFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zZXJ0UmVhZExlbmd0aFBsb3RJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmluc2VydFJlYWRMZW5ndGhQbG90VXJsID0gdGhpcy5hcGlTZXJ2ZXJzLmdldFVybChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBhcGk6Ly9zbXJ0LWxpbmsvc2Vjb25kYXJ5LWFuYWx5c2lzL2RhdGFzdG9yZS1maWxlcy9gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7c3RhdHNVbmlxdWVJZH0vcmVzb3VyY2VzP3JlbHBhdGg9JHtpbnNlcnRSZWFkTGVuZ3RoUGxvdEltYWdlfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyAhPT0gNDA0ICYmICFzLm1ldHJpY3NBY2Nlc3NFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLm1ldHJpY3NBY2Nlc3NFcnJvciA9IFJ1blFjU2VydmljZS5tZXNzYWdlRm9yRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2FkaW5nVW5pcXVlSWQgPSB0aGlzLmdldFJlcG9ydFVuaXF1ZUlkKHJlcG9ydHMsIFwibG9hZGluZ194bWwuanNvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxvYWRpbmdQcm9taXNlID0gdGhpcy5nZXRSZXBvcnREYXRhKGxvYWRpbmdVbmlxdWVJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2FkaW5nUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ1Byb21pc2UudGhlbihyZXBvcnQgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb2R1Y3RpdmVabXdzID0gdGhpcy5nZXRSZXBvcnRUYWJsZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibG9hZGluZ194bWxfcmVwb3J0LmxvYWRpbmdfeG1sX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibG9hZGluZ194bWxfcmVwb3J0LmxvYWRpbmdfeG1sX3RhYmxlLnByb2R1Y3RpdmVfem13c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvZHVjdGl2aXR5XzAgPSB0aGlzLmdldFJlcG9ydFRhYmxlVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsb2FkaW5nX3htbF9yZXBvcnQubG9hZGluZ194bWxfdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsb2FkaW5nX3htbF9yZXBvcnQubG9hZGluZ194bWxfdGFibGUucHJvZHVjdGl2aXR5XzBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb2R1Y3Rpdml0eV8xID0gdGhpcy5nZXRSZXBvcnRUYWJsZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibG9hZGluZ194bWxfcmVwb3J0LmxvYWRpbmdfeG1sX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibG9hZGluZ194bWxfcmVwb3J0LmxvYWRpbmdfeG1sX3RhYmxlLnByb2R1Y3Rpdml0eV8xXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9kdWN0aXZpdHlfMiA9IHRoaXMuZ2V0UmVwb3J0VGFibGVWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxvYWRpbmdfeG1sX3JlcG9ydC5sb2FkaW5nX3htbF90YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxvYWRpbmdfeG1sX3JlcG9ydC5sb2FkaW5nX3htbF90YWJsZS5wcm9kdWN0aXZpdHlfMlwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0aXZlWm13cyAmJiBwcm9kdWN0aXZpdHlfMCAmJiBwcm9kdWN0aXZpdHlfMSAmJiBwcm9kdWN0aXZpdHlfMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnByb2R1Y3Rpdml0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAwOiBwcm9kdWN0aXZlWm13cyAqIHByb2R1Y3Rpdml0eV8wIC8gMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcDE6IHByb2R1Y3RpdmVabXdzICogcHJvZHVjdGl2aXR5XzEgLyAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwMjogcHJvZHVjdGl2ZVptd3MgKiBwcm9kdWN0aXZpdHlfMiAvIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyAhPT0gNDA0ICYmICFzLm1ldHJpY3NBY2Nlc3NFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLm1ldHJpY3NBY2Nlc3NFcnJvciA9IFJ1blFjU2VydmljZS5tZXNzYWdlRm9yRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyAhPT0gNDA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLm1ldHJpY3NBY2Nlc3NFcnJvciA9IFJ1blFjU2VydmljZS5tZXNzYWdlRm9yRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuaGFzU3VicmVhZHNldCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgIT09IDQwNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLm1ldHJpY3NBY2Nlc3NFcnJvciA9IFJ1blFjU2VydmljZS5tZXNzYWdlRm9yRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUocnVuKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmVwb3J0VW5pcXVlSWQocmVwb3J0czogYW55W10sIHJlcG9ydElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBsZXQgbWF0Y2hpbmdSZXBvcnRzID0gcmVwb3J0cy5maWx0ZXIociA9PiByLmRhdGFTdG9yZUZpbGUucGF0aC5lbmRzV2l0aChyZXBvcnRJZCkpO1xuICAgICAgICBpZiAobWF0Y2hpbmdSZXBvcnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGluZ1JlcG9ydHNbMF0uZGF0YVN0b3JlRmlsZS51dWlkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJlcG9ydERhdGEoaWQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYGFwaTovL3NtcnQtbGluay9zZWNvbmRhcnktYW5hbHlzaXMvZGF0YXN0b3JlLWZpbGVzLyR7aWR9L2Rvd25sb2FkYClcbiAgICAgICAgICAgICAgICAudG9Qcm9taXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmVwb3J0SXRlbU9yRGVmYXVsdChpdGVtczogYW55W10sIGlkOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBsZXQgbWF0Y2hpbmdJdGVtcyA9IGl0ZW1zLmZpbHRlcihhID0+IGEuaWQgPT09IGlkKTtcbiAgICAgICAgcmV0dXJuIChtYXRjaGluZ0l0ZW1zLmxlbmd0aCA9PT0gMSkgPyBtYXRjaGluZ0l0ZW1zWzBdIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmVwb3J0UGxvdEltYWdlKHJlcG9ydDogYW55LCBwbG90R3JvdXBJZDogc3RyaW5nLCBwbG90SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBwbG90R3JvdXAgPSB0aGlzLmdldFJlcG9ydEl0ZW1PckRlZmF1bHQocmVwb3J0LnBsb3RHcm91cHMsIHBsb3RHcm91cElkKTtcbiAgICAgICAgaWYgKHBsb3RHcm91cCkge1xuICAgICAgICAgICAgbGV0IHBsb3QgPSB0aGlzLmdldFJlcG9ydEl0ZW1PckRlZmF1bHQocGxvdEdyb3VwLnBsb3RzLCBwbG90SWQpO1xuICAgICAgICAgICAgaWYgKHBsb3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxvdC5pbWFnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmVwb3J0QXR0cmlidXRlVmFsdWUocmVwb3J0OiBhbnksIGF0dHJJZDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGF0dHIgPSB0aGlzLmdldFJlcG9ydEl0ZW1PckRlZmF1bHQocmVwb3J0LmF0dHJpYnV0ZXMsICBhdHRySWQpO1xuICAgICAgICByZXR1cm4gYXR0ciA/IGF0dHIudmFsdWUgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSZXBvcnRUYWJsZVZhbHVlKHJlcG9ydDogYW55LCB0YWJsZUlkOiBzdHJpbmcsIGNvbHVtbklkOiBzdHJpbmcsIHJvd0luZGV4OiBudW1iZXIgPSAwKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHRhYmxlID0gdGhpcy5nZXRSZXBvcnRJdGVtT3JEZWZhdWx0KHJlcG9ydC50YWJsZXMsICB0YWJsZUlkKTtcblxuICAgICAgICBpZiAoIXRhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvbHVtbiA9IHRoaXMuZ2V0UmVwb3J0SXRlbU9yRGVmYXVsdCh0YWJsZS5jb2x1bW5zLCBjb2x1bW5JZCk7XG5cbiAgICAgICAgaWYgKCFjb2x1bW4pIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gIChjb2x1bW4udmFsdWVzLmxlbmd0aCA+IHJvd0luZGV4ICYmIHJvd0luZGV4ID49IDApID8gY29sdW1uLnZhbHVlc1tyb3dJbmRleF0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNwb25zZVRvUnVuUWNNb2RlbChydW46IGFueSkge1xuICAgICAgICByZXR1cm4gbmV3IFJ1blFjTW9kZWwoe1xuICAgICAgICAgICAgdW5pcXVlSWQ6IHJ1bi51bmlxdWVJZCxcbiAgICAgICAgICAgIG5hbWU6IHJ1bi5uYW1lLFxuICAgICAgICAgICAgc3VtbWFyeTogcnVuLnN1bW1hcnksXG4gICAgICAgICAgICBpbnN0cnVtZW50TmFtZTogcnVuLmluc3RydW1lbnROYW1lLFxuICAgICAgICAgICAgaW5zdHJ1bWVudFNlcmlhbE51bWJlcjogcnVuLmluc3RydW1lbnRTZXJpYWxOdW1iZXIsXG4gICAgICAgICAgICBpbnN0cnVtZW50U3dWZXJzaW9uOiBydW4uaW5zdHJ1bWVudFN3VmVyc2lvbixcbiAgICAgICAgICAgIHByaW1hcnlBbmFseXNpc1N3VmVyc2lvbjogcnVuLnByaW1hcnlBbmFseXNpc1N3VmVyc2lvbixcbiAgICAgICAgICAgIGNvbnRleHQ6IHJ1bi5jb250ZXh0LFxuICAgICAgICAgICAgc3RhcnRlZEF0OiBydW4uc3RhcnRlZEF0LFxuICAgICAgICAgICAgY29tcGxldGVkQXQ6IHJ1bi5jb21wbGV0ZWRBdCxcbiAgICAgICAgICAgIHN0YXR1czogcnVuLnN0YXR1cyxcbiAgICAgICAgICAgIHRvdGFsQ2VsbHM6IHJ1bi50b3RhbENlbGxzLFxuICAgICAgICAgICAgbnVtQ2VsbHNDb21wbGV0ZWQ6IHJ1bi5udW1DZWxsc0NvbXBsZXRlZCxcbiAgICAgICAgICAgIG51bUNlbGxzRmFpbGVkOiBydW4ubnVtQ2VsbHNGYWlsZWRcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc3BvbnNlVG9SdW5RY1NhbXBsZU1vZGVsKHNhbXBsZTogYW55KSB7XG4gICAgICAgIHJldHVybiBuZXcgUnVuUWNTYW1wbGVNb2RlbCh7XG4gICAgICAgICAgICB1bmlxdWVJZDogc2FtcGxlLnVuaXF1ZUlkLFxuICAgICAgICAgICAgd2VsbDogc2FtcGxlLndlbGwsXG4gICAgICAgICAgICBuYW1lOiBzYW1wbGUubmFtZSxcbiAgICAgICAgICAgIHN1bW1hcnk6IHNhbXBsZS5zdW1tYXJ5LFxuICAgICAgICAgICAgc3RhcnRlZEF0OiBzYW1wbGUuc3RhcnRlZEF0LFxuICAgICAgICAgICAgY29tcGxldGVkQXQ6IHNhbXBsZS5jb21wbGV0ZWRBdCxcbiAgICAgICAgICAgIHN0YXR1czogc2FtcGxlLnN0YXR1cyxcbiAgICAgICAgICAgIG1vdmllTWludXRlczogc2FtcGxlLm1vdmllTWludXRlcyxcbiAgICAgICAgICAgIGNvbnRleHQ6IHNhbXBsZS5jb250ZXh0LFxuICAgICAgICAgICAgdGVybWluYXRpb25JbmZvOiBzYW1wbGUudGVybWluYXRpb25JbmZvLFxuICAgICAgICAgICAgY29sbGVjdGlvblBhdGhVcmk6IHNhbXBsZS5jb2xsZWN0aW9uUGF0aFVyaVxuICAgICAgICB9KTtcblxuICAgIH1cbn1cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==