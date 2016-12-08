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
var run_design_1 = require("../facets/run-design");
var parts_service_1 = require("../services/parts-service");
var run_model_1 = require("../models/run-model");
exports.DesignModel = run_model_1.DesignModel;
var design_xml_1 = require("../parsers/design-xml");
var design_csv_1 = require("../parsers/design-csv");
exports.ParseError = design_csv_1.ParseError;
exports.MissingColumnsError = design_csv_1.MissingColumnsError;
var moment = require("moment");
var uuid_1 = require("uuid");
__export(require("../models/run-model"));
var RunService = (function () {
    function RunService(http, partsService) {
        this.http = http;
        this.partsService = partsService;
    }
    Object.defineProperty(RunService.prototype, "runDesignFacet", {
        get: function () {
            return run_design_1.RUN_DESIGN_FACET;
        },
        enumerable: true,
        configurable: true
    });
    RunService.prototype.getDesigns = function () {
        var _this = this;
        return this.http.get("api://smrt-link/smrt-link/runs")
            .map(function (items) { return items.map(function (item) { return _this.responseToDesignModel(item); }); })
            .toPromise();
    };
    RunService.prototype.getDesign = function (id) {
        var _this = this;
        return this.http.get("api://smrt-link/smrt-link/runs/" + id)
            .map(function (item) { return _this.responseToDesignModel(item); })
            .toPromise();
    };
    RunService.prototype.addDesign = function (design) {
        var _this = this;
        var data = this.designModelToData(design);
        return this.http.post("api://smrt-link/smrt-link/runs", data)
            .map(function (item) { return _this.responseToDesignModel(item); })
            .toPromise();
    };
    RunService.prototype.updateDesign = function (design) {
        var _this = this;
        var data = this.designModelToData(design);
        return this.http.post("api://smrt-link/smrt-link/runs/" + design.uniqueId, data)
            .toPromise()
            .then(function () { return _this.getDesign(design.uniqueId); });
    };
    RunService.prototype.saveDesign = function (design) {
        if (design.uniqueId === String.EMPTY) {
            return this.addDesign(design);
        }
        else {
            return this.updateDesign(design);
        }
    };
    RunService.prototype.deleteDesign = function (design) {
        return this.http.delete("api://smrt-link/smrt-link/runs/" + design.uniqueId)
            .toPromise();
    };
    RunService.prototype.parseCSV = function (csv) {
        return design_csv_1.parse(csv, this.partsService);
    };
    RunService.prototype.responseToDesignModel = function (response) {
        var _this = this;
        if (response.dataModel) {
            response.run = design_xml_1.parse(response.dataModel);
            // TODO: (bforbes)(2016-03-22): This code creates a fake barcode
            // from the control kit name. Once the XML for the control kit
            // comes back with a bar code, this can be removed.
            response.run.samples.forEach(function (sample) {
                if (sample.controlKit) {
                    var name_1 = sample.controlKit;
                    var partNumber = _this.partsService.partNumberFromName(name_1);
                    if (partNumber) {
                        sample.controlKit = "XXXXXX" + partNumber.replace(/-/g, "") + moment().format("MMDDYY");
                    }
                    else {
                        sample.controlKit = String.EMPTY;
                    }
                }
            });
        }
        return new run_model_1.DesignModel(response);
    };
    RunService.prototype.designModelToData = function (model) {
        var data = {
            dataModel: String.EMPTY
        };
        this.populateUuids(model.run);
        var doc = design_xml_1.update(model.run, this.partsService);
        data.dataModel = doc.toString();
        return data;
    };
    RunService.prototype.populateUuids = function (run) {
        if (run.uuid === String.EMPTY) {
            run.uuid = uuid_1.v4();
        }
        run.samples.forEach(function (s) {
            if (s.subreadSetUuid === String.EMPTY) {
                s.subreadSetUuid = uuid_1.v4();
            }
            if (s.collectionMetadataUuid === String.EMPTY) {
                s.collectionMetadataUuid = uuid_1.v4();
            }
        });
    };
    RunService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, parts_service_1.PartsService])
    ], RunService);
    return RunService;
}());
exports.RunService = RunService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL3NlcnZpY2VzL3J1bi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFFekMscUJBQW1CLHlCQUF5QixDQUFDLENBQUE7QUFDN0MsMkJBQStCLHNCQUFzQixDQUFDLENBQUE7QUFDdEQsOEJBQTJCLDJCQUEyQixDQUFDLENBQUE7QUFFdkQsMEJBQWtELHFCQUFxQixDQUFDLENBQUE7QUFTcEUsbUJBQVc7QUFSZiwyQkFBcUQsdUJBQXVCLENBQUMsQ0FBQTtBQUM3RSwyQkFBaUUsdUJBQXVCLENBQUMsQ0FBQTtBQUtyRixrQkFBVTtBQUNWLDJCQUFtQjtBQUx2QixJQUFZLE1BQU0sV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUNqQyxxQkFBaUIsTUFBTSxDQUFDLENBQUE7QUFReEIsaUJBQWMscUJBQXFCLENBQUMsRUFBQTtBQUdwQztJQVFJLG9CQUFZLElBQVUsRUFBRSxZQUEwQjtRQUM5QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBVkQsc0JBQUksc0NBQWM7YUFBbEI7WUFDSSxNQUFNLENBQUMsNkJBQWdCLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFVRCwrQkFBVSxHQUFWO1FBQUEsaUJBSUM7UUFIRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUM7YUFDMUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxFQUFuRCxDQUFtRCxDQUFDO2FBQ2pFLFNBQVMsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCw4QkFBUyxHQUFULFVBQVUsRUFBbUI7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QyxDQUFDLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxzQkFBc0IsR0FBRyxTQUFFLEVBQUUsQ0FBQztZQUNwQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBekdMO1FBQUMsaUJBQVUsRUFBRTs7a0JBQUE7SUEwR2IsaUJBQUM7QUFBRCxDQXpHQSxBQXlHQyxJQUFBO0FBekdZLGtCQUFVLGFBeUd0QixDQUFBIiwiZmlsZSI6ImFwcC9kYXRhL3NlcnZpY2VzL3J1bi1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuXG5pbXBvcnQge0h0dHB9IGZyb20gXCJhdGhlbmFldW0vc2VydmljZXMvaHR0cFwiO1xuaW1wb3J0IHtSVU5fREVTSUdOX0ZBQ0VUfSBmcm9tIFwiLi4vZmFjZXRzL3J1bi1kZXNpZ25cIjtcbmltcG9ydCB7UGFydHNTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvcGFydHMtc2VydmljZVwiO1xuXG5pbXBvcnQge0Rlc2lnbk1vZGVsLCBEZXNpZ25PYmplY3QsIFJ1bk1vZGVsfSBmcm9tIFwiLi4vbW9kZWxzL3J1bi1tb2RlbFwiO1xuaW1wb3J0IHtwYXJzZSBhcyBwYXJzZVhNTCwgdXBkYXRlIGFzIHVwZGF0ZVhNTH0gZnJvbSBcIi4uL3BhcnNlcnMvZGVzaWduLXhtbFwiO1xuaW1wb3J0IHtwYXJzZSBhcyBwYXJzZUNTViwgUGFyc2VFcnJvciwgTWlzc2luZ0NvbHVtbnNFcnJvcn0gZnJvbSBcIi4uL3BhcnNlcnMvZGVzaWduLWNzdlwiO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCB7djR9IGZyb20gXCJ1dWlkXCI7XG5cbmV4cG9ydCB7XG4gICAgUGFyc2VFcnJvcixcbiAgICBNaXNzaW5nQ29sdW1uc0Vycm9yLFxuICAgIERlc2lnbk1vZGVsXG59XG5cbmV4cG9ydCAqIGZyb20gXCIuLi9tb2RlbHMvcnVuLW1vZGVsXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSdW5TZXJ2aWNlIHtcbiAgICBnZXQgcnVuRGVzaWduRmFjZXQoKSB7XG4gICAgICAgIHJldHVybiBSVU5fREVTSUdOX0ZBQ0VUO1xuICAgIH1cblxuICAgIHByaXZhdGUgaHR0cDogSHR0cDtcbiAgICBwcml2YXRlIHBhcnRzU2VydmljZTogUGFydHNTZXJ2aWNlO1xuXG4gICAgY29uc3RydWN0b3IoaHR0cDogSHR0cCwgcGFydHNTZXJ2aWNlOiBQYXJ0c1NlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5odHRwID0gaHR0cDtcbiAgICAgICAgdGhpcy5wYXJ0c1NlcnZpY2UgPSBwYXJ0c1NlcnZpY2U7XG4gICAgfVxuXG4gICAgZ2V0RGVzaWducygpOiBQcm9taXNlPERlc2lnbk1vZGVsW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoXCJhcGk6Ly9zbXJ0LWxpbmsvc21ydC1saW5rL3J1bnNcIilcbiAgICAgICAgICAgICAgICAgICAubWFwKGl0ZW1zID0+IGl0ZW1zLm1hcChpdGVtID0+IHRoaXMucmVzcG9uc2VUb0Rlc2lnbk1vZGVsKGl0ZW0pKSlcbiAgICAgICAgICAgICAgICAgICAudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgZ2V0RGVzaWduKGlkOiBzdHJpbmcgfCBudW1iZXIpOiBQcm9taXNlPERlc2lnbk1vZGVsPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGBhcGk6Ly9zbXJ0LWxpbmsvc21ydC1saW5rL3J1bnMvJHtpZH1gKVxuICAgICAgICAgICAgICAgICAgIC5tYXAoaXRlbSA9PiB0aGlzLnJlc3BvbnNlVG9EZXNpZ25Nb2RlbChpdGVtKSlcbiAgICAgICAgICAgICAgICAgICAudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgYWRkRGVzaWduKGRlc2lnbjogRGVzaWduTW9kZWwpOiBQcm9taXNlPERlc2lnbk1vZGVsPiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRlc2lnbk1vZGVsVG9EYXRhKGRlc2lnbik7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcImFwaTovL3NtcnQtbGluay9zbXJ0LWxpbmsvcnVuc1wiLCBkYXRhKVxuICAgICAgICAgICAgICAgICAgIC5tYXAoaXRlbSA9PiB0aGlzLnJlc3BvbnNlVG9EZXNpZ25Nb2RlbChpdGVtKSlcbiAgICAgICAgICAgICAgICAgICAudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGVzaWduKGRlc2lnbjogRGVzaWduTW9kZWwpOiBQcm9taXNlPERlc2lnbk1vZGVsPiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRlc2lnbk1vZGVsVG9EYXRhKGRlc2lnbik7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgYXBpOi8vc21ydC1saW5rL3NtcnQtbGluay9ydW5zLyR7ZGVzaWduLnVuaXF1ZUlkfWAsIGRhdGEpXG4gICAgICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBzZXJ2ZXIgcmV0dXJucyB0aGUgcGFydGlhbCBkZXNpZ24gcmF0aGVyIHRoYW4gdGhlIGZ1bGxcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVzaWduLCBzbyB3ZSByZXF1ZXN0IHRoZSBmdWxsIGRlc2lnbiBhZ2FpblxuICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuZ2V0RGVzaWduKGRlc2lnbi51bmlxdWVJZCkpO1xuICAgIH1cblxuICAgIHNhdmVEZXNpZ24oZGVzaWduOiBEZXNpZ25Nb2RlbCk6IFByb21pc2U8RGVzaWduTW9kZWw+IHtcbiAgICAgICAgaWYgKGRlc2lnbi51bmlxdWVJZCA9PT0gU3RyaW5nLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZGREZXNpZ24oZGVzaWduKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZURlc2lnbihkZXNpZ24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVsZXRlRGVzaWduKGRlc2lnbjogRGVzaWduTW9kZWwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoYGFwaTovL3NtcnQtbGluay9zbXJ0LWxpbmsvcnVucy8ke2Rlc2lnbi51bmlxdWVJZH1gKVxuICAgICAgICAgICAgICAgICAgIC50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBwYXJzZUNTVihjc3Y6IHN0cmluZyk6IERlc2lnbk1vZGVsIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlQ1NWKGNzdiwgdGhpcy5wYXJ0c1NlcnZpY2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzcG9uc2VUb0Rlc2lnbk1vZGVsKHJlc3BvbnNlOiBEZXNpZ25PYmplY3QpOiBEZXNpZ25Nb2RlbCB7XG4gICAgICAgIGlmIChyZXNwb25zZS5kYXRhTW9kZWwpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLnJ1biA9IHBhcnNlWE1MKHJlc3BvbnNlLmRhdGFNb2RlbCk7XG4gICAgICAgICAgICAvLyBUT0RPOiAoYmZvcmJlcykoMjAxNi0wMy0yMik6IFRoaXMgY29kZSBjcmVhdGVzIGEgZmFrZSBiYXJjb2RlXG4gICAgICAgICAgICAvLyBmcm9tIHRoZSBjb250cm9sIGtpdCBuYW1lLiBPbmNlIHRoZSBYTUwgZm9yIHRoZSBjb250cm9sIGtpdFxuICAgICAgICAgICAgLy8gY29tZXMgYmFjayB3aXRoIGEgYmFyIGNvZGUsIHRoaXMgY2FuIGJlIHJlbW92ZWQuXG4gICAgICAgICAgICByZXNwb25zZS5ydW4uc2FtcGxlcy5mb3JFYWNoKHNhbXBsZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNhbXBsZS5jb250cm9sS2l0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBzYW1wbGUuY29udHJvbEtpdDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydE51bWJlciA9IHRoaXMucGFydHNTZXJ2aWNlLnBhcnROdW1iZXJGcm9tTmFtZShuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnROdW1iZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZS5jb250cm9sS2l0ID0gXCJYWFhYWFhcIiArIHBhcnROdW1iZXIucmVwbGFjZSgvLS9nLCBcIlwiKSArIG1vbWVudCgpLmZvcm1hdChcIk1NRERZWVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZS5jb250cm9sS2l0ID0gU3RyaW5nLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBEZXNpZ25Nb2RlbChyZXNwb25zZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXNpZ25Nb2RlbFRvRGF0YShtb2RlbDogRGVzaWduTW9kZWwpOiB7fSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBkYXRhTW9kZWw6IFN0cmluZy5FTVBUWVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucG9wdWxhdGVVdWlkcyhtb2RlbC5ydW4pO1xuXG4gICAgICAgIGNvbnN0IGRvYyA9IHVwZGF0ZVhNTChtb2RlbC5ydW4sIHRoaXMucGFydHNTZXJ2aWNlKTtcbiAgICAgICAgZGF0YS5kYXRhTW9kZWwgPSBkb2MudG9TdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZVV1aWRzKHJ1bjogUnVuTW9kZWwpIHtcbiAgICAgICAgaWYgKHJ1bi51dWlkID09PSBTdHJpbmcuRU1QVFkpIHtcbiAgICAgICAgICAgIHJ1bi51dWlkID0gdjQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJ1bi5zYW1wbGVzLmZvckVhY2gocyA9PiB7XG4gICAgICAgICAgICBpZiAocy5zdWJyZWFkU2V0VXVpZCA9PT0gU3RyaW5nLkVNUFRZKSB7XG4gICAgICAgICAgICAgICAgcy5zdWJyZWFkU2V0VXVpZCA9IHY0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5jb2xsZWN0aW9uTWV0YWRhdGFVdWlkID09PSBTdHJpbmcuRU1QVFkpIHtcbiAgICAgICAgICAgICAgICBzLmNvbGxlY3Rpb25NZXRhZGF0YVV1aWQgPSB2NCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=