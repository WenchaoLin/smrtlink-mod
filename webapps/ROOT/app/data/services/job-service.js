/**
 * Copyright (c) 2015, Pacific Biosciences of California
 *
 * Created by ssanfilippo <ssanfilippo@pacificbiosciences.com> on 4/22/16.
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
var http_1 = require("athenaeum/services/http");
var dataset_type_1 = require("../dataset-type");
var error_factory_1 = require("athenaeum/common/errors/error-factory");
var JobService = (function () {
    function JobService(http) {
        this.http = http;
    }
    JobService.prototype.getResolvedPipelineTemplates = function () {
        return this.http
            .get("api://smrt-link/secondary-analysis/resolved-pipeline-templates")
            .map(function (templates) {
            var map = new Map();
            templates.forEach(function (template) {
                map.set(template.id, template);
            });
            return map;
        })
            .toPromise();
    };
    JobService.prototype.import = function (filePath, fileType) {
        var url;
        var payload;
        switch (fileType) {
            case dataset_type_1.DatasetType.REFERENCE.filetype:
                var name_1 = JobService.getName(filePath);
                url = "api://smrt-link/secondary-analysis/job-manager/jobs/convert-fasta-reference";
                payload = {
                    "path": filePath,
                    "name": name_1,
                    "organism": name_1,
                    "ploidy": "haploid"
                };
                break;
            case dataset_type_1.DatasetType.HDF_SUBREAD.filetype:
            case dataset_type_1.DatasetType.SUBREAD.filetype:
                url = "api://smrt-link/secondary-analysis/job-manager/jobs/import-dataset";
                payload = {
                    path: filePath,
                    datasetType: fileType
                };
                break;
            default:
                return new Promise(function (resolve, reject) {
                    reject(new error_factory_1.PacBioError("Invalid dataset type."));
                });
        }
        // TODO (bforbes)(2016-05-04): During refactor of auth, this needs
        // to be removed once auth headers are sent as part of Http
        var headers = {};
        var token = localStorage.getItem("token");
        if (token && localStorage.getItem("user")) {
            headers["Authorization"] = "Bearer " + token;
        }
        return this.http
            .post(url, payload, headers)
            .toPromise();
    };
    JobService.getName = function (filePath) {
        var pathParts = filePath.split("/");
        var fileName = pathParts[pathParts.length - 1];
        var fileParts = fileName.split(".");
        fileParts.pop();
        return fileParts.join(".");
    };
    JobService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], JobService);
    return JobService;
}());
exports.JobService = JobService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL3NlcnZpY2VzL2pvYi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7Ozs7Ozs7Ozs7O0FBRUgscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBRXpDLHFCQUFtQix5QkFBeUIsQ0FBQyxDQUFBO0FBQzdDLDZCQUEwQixpQkFBaUIsQ0FBQyxDQUFBO0FBQzVDLDhCQUEwQix1Q0FBdUMsQ0FBQyxDQUFBO0FBU2xFO0lBR0ksb0JBQVksSUFBVTtRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsaURBQTRCLEdBQTVCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ0osR0FBRyxDQUFDLGdFQUFnRSxDQUFDO2FBQ3JFLEdBQUcsQ0FBQyxVQUFDLFNBQTZCO1lBQy9CLElBQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUE0QixDQUFDO1lBRWhELFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO2dCQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFDO2FBQ0QsU0FBUyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELDJCQUFNLEdBQU4sVUFBTyxRQUFnQixFQUFFLFFBQWdCO1FBQ3JDLElBQUksR0FBVyxDQUFDO1FBQ2hCLElBQUksT0FBWSxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFLLDBCQUFXLENBQUMsU0FBUyxDQUFDLFFBQVE7Z0JBQy9CLElBQU0sTUFBSSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFDLEdBQUcsR0FBRyw2RUFBNkUsQ0FBQztnQkFDcEYsT0FBTyxHQUFHO29CQUNOLE1BQU0sRUFBRSxRQUFRO29CQUNoQixNQUFNLEVBQUUsTUFBSTtvQkFDWixVQUFVLEVBQUUsTUFBSTtvQkFDaEIsUUFBUSxFQUFFLFNBQVM7aUJBQ3RCLENBQUM7Z0JBQ0YsS0FBSyxDQUFDO1lBRVYsS0FBSywwQkFBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFDdEMsS0FBSywwQkFBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRO2dCQUM3QixHQUFHLEdBQUcsb0VBQW9FLENBQUM7Z0JBQzNFLE9BQU8sR0FBRztvQkFDTixJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsUUFBUTtpQkFDeEIsQ0FBQztnQkFDRixLQUFLLENBQUM7WUFFVjtnQkFDSSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtvQkFDL0IsTUFBTSxDQUFDLElBQUksMkJBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUVELGtFQUFrRTtRQUNsRSwyREFBMkQ7UUFDM0QsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFNUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxZQUFVLEtBQU8sQ0FBQztRQUNqRCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ0osSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQzNCLFNBQVMsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFYyxrQkFBTyxHQUF0QixVQUF1QixRQUFnQjtRQUNuQyxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWhCLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUEzRUw7UUFBQyxpQkFBVSxFQUFFOztrQkFBQTtJQTRFYixpQkFBQztBQUFELENBM0VBLEFBMkVDLElBQUE7QUEzRVksa0JBQVUsYUEyRXRCLENBQUEiLCJmaWxlIjoiYXBwL2RhdGEvc2VydmljZXMvam9iLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhXG4gKlxuICogQ3JlYXRlZCBieSBzc2FuZmlsaXBwbyA8c3NhbmZpbGlwcG9AcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbT4gb24gNC8yMi8xNi5cbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5cbmltcG9ydCB7SHR0cH0gZnJvbSBcImF0aGVuYWV1bS9zZXJ2aWNlcy9odHRwXCI7XG5pbXBvcnQge0RhdGFzZXRUeXBlfSBmcm9tIFwiLi4vZGF0YXNldC10eXBlXCI7XG5pbXBvcnQge1BhY0Jpb0Vycm9yfSBmcm9tIFwiYXRoZW5hZXVtL2NvbW1vbi9lcnJvcnMvZXJyb3ItZmFjdG9yeVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBpcGVsaW5lVGVtcGxhdGUge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHZlcnNpb246IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEpvYlNlcnZpY2Uge1xuICAgIHByaXZhdGUgaHR0cDogSHR0cDtcblxuICAgIGNvbnN0cnVjdG9yKGh0dHA6IEh0dHApIHtcbiAgICAgICAgdGhpcy5odHRwID0gaHR0cDtcbiAgICB9XG5cbiAgICBnZXRSZXNvbHZlZFBpcGVsaW5lVGVtcGxhdGVzKCk6IFByb21pc2U8TWFwPHN0cmluZywgUGlwZWxpbmVUZW1wbGF0ZT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgICAgICAgIC5nZXQoXCJhcGk6Ly9zbXJ0LWxpbmsvc2Vjb25kYXJ5LWFuYWx5c2lzL3Jlc29sdmVkLXBpcGVsaW5lLXRlbXBsYXRlc1wiKVxuICAgICAgICAgICAgICAgICAgIC5tYXAoKHRlbXBsYXRlczogUGlwZWxpbmVUZW1wbGF0ZVtdKSAgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgUGlwZWxpbmVUZW1wbGF0ZT4oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZXMuZm9yRWFjaCh0ZW1wbGF0ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAuc2V0KHRlbXBsYXRlLmlkLCB0ZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXA7XG4gICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgaW1wb3J0KGZpbGVQYXRoOiBzdHJpbmcsIGZpbGVUeXBlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBsZXQgdXJsOiBzdHJpbmc7XG4gICAgICAgIGxldCBwYXlsb2FkOiBhbnk7XG5cbiAgICAgICAgc3dpdGNoIChmaWxlVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBEYXRhc2V0VHlwZS5SRUZFUkVOQ0UuZmlsZXR5cGU6XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IEpvYlNlcnZpY2UuZ2V0TmFtZShmaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgdXJsID0gXCJhcGk6Ly9zbXJ0LWxpbmsvc2Vjb25kYXJ5LWFuYWx5c2lzL2pvYi1tYW5hZ2VyL2pvYnMvY29udmVydC1mYXN0YS1yZWZlcmVuY2VcIjtcbiAgICAgICAgICAgICAgICBwYXlsb2FkID0ge1xuICAgICAgICAgICAgICAgICAgICBcInBhdGhcIjogZmlsZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBcIm9yZ2FuaXNtXCI6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwicGxvaWR5XCI6IFwiaGFwbG9pZFwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBEYXRhc2V0VHlwZS5IREZfU1VCUkVBRC5maWxldHlwZTpcbiAgICAgICAgICAgIGNhc2UgRGF0YXNldFR5cGUuU1VCUkVBRC5maWxldHlwZTpcbiAgICAgICAgICAgICAgICB1cmwgPSBcImFwaTovL3NtcnQtbGluay9zZWNvbmRhcnktYW5hbHlzaXMvam9iLW1hbmFnZXIvam9icy9pbXBvcnQtZGF0YXNldFwiO1xuICAgICAgICAgICAgICAgIHBheWxvYWQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IGZpbGVQYXRoLFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0VHlwZTogZmlsZVR5cGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgUGFjQmlvRXJyb3IoXCJJbnZhbGlkIGRhdGFzZXQgdHlwZS5cIikpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETyAoYmZvcmJlcykoMjAxNi0wNS0wNCk6IER1cmluZyByZWZhY3RvciBvZiBhdXRoLCB0aGlzIG5lZWRzXG4gICAgICAgIC8vIHRvIGJlIHJlbW92ZWQgb25jZSBhdXRoIGhlYWRlcnMgYXJlIHNlbnQgYXMgcGFydCBvZiBIdHRwXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpO1xuXG4gICAgICAgIGlmICh0b2tlbiAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJcIikpIHtcbiAgICAgICAgICAgIGhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdID0gYEJlYXJlciAke3Rva2VufWA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAgICAgICAgLnBvc3QodXJsLCBwYXlsb2FkLCBoZWFkZXJzKVxuICAgICAgICAgICAgICAgICAgIC50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXROYW1lKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwYXRoUGFydHMgPSBmaWxlUGF0aC5zcGxpdChcIi9cIik7XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gcGF0aFBhcnRzW3BhdGhQYXJ0cy5sZW5ndGgtMV07XG4gICAgICAgIGxldCBmaWxlUGFydHMgPSBmaWxlTmFtZS5zcGxpdChcIi5cIik7XG4gICAgICAgIGZpbGVQYXJ0cy5wb3AoKTtcblxuICAgICAgICByZXR1cm4gZmlsZVBhcnRzLmpvaW4oXCIuXCIpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==