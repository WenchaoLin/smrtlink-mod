"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var moment = require("moment");
var model_1 = require("athenaeum/common/model");
var DesignModel = (function (_super) {
    __extends(DesignModel, _super);
    function DesignModel(object) {
        _super.call(this);
        this.uniqueId = String.EMPTY;
        this.name = String.EMPTY;
        this.summary = String.EMPTY;
        this.dateCreated = String.EMPTY;
        this.reserved = false;
        this.totalCells = 0;
        this.initialize(object);
        this.run = new RunModel(this.run);
    }
    DesignModel.prototype.update = function (object) {
        var _this = this;
        Object.keys(object).forEach(function (key) {
            if (key === "run") {
                _this.run.update(object[key]);
            }
            else {
                _this[key] = object[key];
            }
        });
        if (object.run) {
            if (!object.name) {
                this.name = this.run.runName;
            }
            if (!object.summary) {
                this.summary = "%d SMRT Cell%s, %s".sprintf(this.run.samples.length, this.run.samples.length !== 1 ? "s" : "", this.run.runDescription);
            }
        }
    };
    Object.defineProperty(DesignModel.prototype, "runSummary", {
        get: function () {
            var summaryPrefix = "%d SMRT Cell%s".sprintf(this.totalCells, ((this.totalCells !== 1) ? "s" : ""));
            return (!this.summary || !this.summary.startsWith(summaryPrefix))
                ? "%s, %s".sprintf(summaryPrefix, this.summary)
                : this.summary;
        },
        enumerable: true,
        configurable: true
    });
    return DesignModel;
}(model_1.Model));
exports.DesignModel = DesignModel;
var RunModel = (function (_super) {
    __extends(RunModel, _super);
    function RunModel(object) {
        _super.call(this);
        this.experimentId = String.EMPTY;
        this.experimentName = String.EMPTY;
        this.experimentDescription = String.EMPTY;
        this.runName = "Run " + moment().format("MM.DD.YYYY HH:mm");
        this.runDescription = String.EMPTY;
        this.uuid = String.EMPTY;
        this.samples = [
            new SampleModel()
        ];
        this.initialize(object);
        if (object) {
            if (object.samples) {
                this.samples = object.samples.map(function (sample) {
                    return new SampleModel(sample);
                });
            }
        }
    }
    RunModel.prototype.update = function (object) {
        var _this = this;
        Object.keys(object).forEach(function (key) {
            if (key !== "samples") {
                _this[key] = object[key];
            }
            else {
                object.samples.forEach(function (sample, index) {
                    _this.samples[index].update(sample);
                });
            }
        });
    };
    return RunModel;
}(model_1.Model));
exports.RunModel = RunModel;
var AutomationParameterModel = (function (_super) {
    __extends(AutomationParameterModel, _super);
    function AutomationParameterModel(object) {
        _super.call(this);
        this.name = String.EMPTY;
        this.type = String.EMPTY;
        this.value = String.EMPTY;
        this.initialize(object);
    }
    return AutomationParameterModel;
}(model_1.Model));
exports.AutomationParameterModel = AutomationParameterModel;
var SampleModel = (function (_super) {
    __extends(SampleModel, _super);
    function SampleModel(object) {
        var _this = this;
        _super.call(this);
        this.sampleName = "Well Sample";
        this.wellName = "A01";
        this.sampleDescription = String.EMPTY;
        this.insertSize = 10000;
        this.stageStartEnabled = false;
        this.sizeSelectionEnabled = false;
        this.magBead = true;
        this.automationParameters = null;
        this.primaryAutomationName = String.EMPTY;
        this.primaryConfigFileName = String.EMPTY;
        this.copyFiles = ["Fasta", "Bam"];
        this.readout = "Bases_Without_QVs";
        this.metricsVerbosity = "Minimal";
        this.templatePrepKit = String.EMPTY;
        this.bindingKit = String.EMPTY;
        this.sequencingKit = String.EMPTY;
        this.controlKit = String.EMPTY;
        this.subreadSetUuid = String.EMPTY;
        this.collectionMetadataUuid = String.EMPTY;
        this.initialize(object);
        var movieTime = 120;
        var immobilizationTime = "default";
        if (object) {
            if (object.copyFiles) {
                this.copyFiles = object.copyFiles.slice(0);
            }
            if (object.automationParameters) {
                this.automationParameters = object.automationParameters.map(function (parameter) {
                    var model = new AutomationParameterModel(parameter);
                    if (model.name === "MovieLength") {
                        _this.movieLengthModel = model;
                    }
                    else if (model.name === "ImmobilizationTime") {
                        _this.immobilizationTimeModel = model;
                    }
                    return model;
                });
            }
            if (object.movieTime) {
                movieTime = object.movieTime;
            }
            if (object.immobilizationTime) {
                immobilizationTime = object.immobilizationTime;
            }
        }
        if (!this.automationParameters) {
            this.automationParameters = [];
        }
        if (!this.movieLengthModel) {
            this.movieTime = movieTime;
        }
        if (immobilizationTime !== "default") {
            this.immobilizationTime = immobilizationTime;
        }
    }
    Object.defineProperty(SampleModel.prototype, "movieTime", {
        get: function () {
            if (!this.movieLengthModel) {
                return -1;
            }
            return parseInt(this.movieLengthModel.value, 10);
        },
        set: function (value) {
            if (!this.automationParameters) {
                return;
            }
            if (!this.movieLengthModel) {
                this.automationParameters.push(this.movieLengthModel = new AutomationParameterModel({
                    name: "MovieLength",
                    type: "Double",
                    value: value.toString()
                }));
            }
            else {
                this.movieLengthModel.value = value.toString();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SampleModel.prototype, "immobilizationTime", {
        get: function () {
            if (!this.immobilizationTimeModel) {
                return "default";
            }
            return parseInt(this.immobilizationTimeModel.value, 10);
        },
        set: function (value) {
            if (!this.automationParameters) {
                return;
            }
            if (value === "default") {
                if (this.immobilizationTimeModel) {
                    var index = this.automationParameters.indexOf(this.immobilizationTimeModel);
                    this.automationParameters.splice(index, 1);
                    this.immobilizationTimeModel = null;
                }
            }
            else {
                if (!this.immobilizationTimeModel) {
                    this.automationParameters.push(this.immobilizationTimeModel = new AutomationParameterModel({
                        name: "ImmobilizationTime",
                        type: "Double",
                        value: value.toString()
                    }));
                }
                else {
                    this.immobilizationTimeModel.value = value.toString();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    SampleModel.prototype.update = function (object) {
        var _this = this;
        var movieTime;
        var immobilizationTime;
        Object.keys(object).forEach(function (key) {
            if (key === "automationParameters") {
                _this.movieLengthModel = null;
                _this.immobilizationTimeModel = null;
                _this.automationParameters = object.automationParameters.map(function (parameter) {
                    var model = new AutomationParameterModel(parameter);
                    if (model.name === "MovieLength") {
                        _this.movieLengthModel = model;
                    }
                    else if (model.name === "ImmobilizationTime") {
                        _this.immobilizationTimeModel = model;
                    }
                    return model;
                });
            }
            else if (key === "movieTime") {
                movieTime = object[key];
            }
            else if (key === "immobilizationTime") {
                immobilizationTime = object[key];
            }
            else if (key === "copyFiles") {
                _this.copyFiles = object.copyFiles.slice();
            }
            else {
                _this[key] = object[key];
            }
        });
        if (typeof movieTime !== "undefined") {
            this.movieTime = movieTime;
        }
        if (typeof immobilizationTime !== "undefined") {
            this.immobilizationTime = immobilizationTime;
        }
    };
    return SampleModel;
}(model_1.Model));
exports.SampleModel = SampleModel;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL21vZGVscy9ydW4tbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxNQUFNLFdBQVcsUUFBUSxDQUFDLENBQUM7QUFDbEMsc0JBQW9CLHdCQUF3QixDQUFDLENBQUE7QUFhN0M7SUFBaUMsK0JBQUs7SUFTbEMscUJBQVksTUFBcUI7UUFDN0IsaUJBQU8sQ0FBQztRQVRaLGFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3hCLFNBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3BCLFlBQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLGdCQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMzQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFNWCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCw0QkFBTSxHQUFOLFVBQU8sTUFBb0I7UUFBM0IsaUJBcUJDO1FBcEJHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUMzQixFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENB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Q0FBQyxPQUFPLGtCQUFrQixLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBQ2pELENBQUM7SUFDTCxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQTFKQSxBQTBKQyxDQTFKZ0MsYUFBSyxHQTBKckM7QUExSlksbUJBQVcsY0EwSnZCLENBQUEiLCJmaWxlIjoiYXBwL2RhdGEvbW9kZWxzL3J1bi1tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb21lbnQgPSByZXF1aXJlKFwibW9tZW50XCIpO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSBcImF0aGVuYWV1bS9jb21tb24vbW9kZWxcIjtcblxuZXhwb3J0IGludGVyZmFjZSBEZXNpZ25PYmplY3Qge1xuICAgIHVuaXF1ZUlkPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgc3VtbWFyeT86IHN0cmluZztcbiAgICBkYXRlQ3JlYXRlZD86IHN0cmluZztcbiAgICByZXNlcnZlZD86IGJvb2xlYW47XG4gICAgZGF0YU1vZGVsPzogc3RyaW5nO1xuICAgIHRvdGFsQ2VsbHM/OiBudW1iZXI7XG4gICAgcnVuPzogUnVuT2JqZWN0O1xufVxuXG5leHBvcnQgY2xhc3MgRGVzaWduTW9kZWwgZXh0ZW5kcyBNb2RlbCBpbXBsZW1lbnRzIERlc2lnbk9iamVjdCB7XG4gICAgdW5pcXVlSWQgPSBTdHJpbmcuRU1QVFk7XG4gICAgbmFtZSA9IFN0cmluZy5FTVBUWTtcbiAgICBzdW1tYXJ5ID0gU3RyaW5nLkVNUFRZO1xuICAgIGRhdGVDcmVhdGVkID0gU3RyaW5nLkVNUFRZO1xuICAgIHJlc2VydmVkID0gZmFsc2U7XG4gICAgdG90YWxDZWxscyA9IDA7XG4gICAgcnVuOiBSdW5Nb2RlbDtcblxuICAgIGNvbnN0cnVjdG9yKG9iamVjdD86IERlc2lnbk9iamVjdCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZShvYmplY3QpO1xuXG4gICAgICAgIHRoaXMucnVuID0gbmV3IFJ1bk1vZGVsKHRoaXMucnVuKTtcbiAgICB9XG5cbiAgICB1cGRhdGUob2JqZWN0OiBEZXNpZ25PYmplY3QpIHtcbiAgICAgICAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBcInJ1blwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ydW4udXBkYXRlKG9iamVjdFtrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChvYmplY3QucnVuKSB7XG4gICAgICAgICAgICBpZiAoIW9iamVjdC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5ydW4ucnVuTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghb2JqZWN0LnN1bW1hcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1bW1hcnkgPSBcIiVkIFNNUlQgQ2VsbCVzLCAlc1wiLnNwcmludGYoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucnVuLnNhbXBsZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bi5zYW1wbGVzLmxlbmd0aCAhPT0gMSA/IFwic1wiIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW4ucnVuRGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHJ1blN1bW1hcnkoKSB7XG4gICAgICAgIGxldCBzdW1tYXJ5UHJlZml4ID0gXCIlZCBTTVJUIENlbGwlc1wiLnNwcmludGYodGhpcy50b3RhbENlbGxzLCAoKHRoaXMudG90YWxDZWxscyAhPT0gMSkgPyBcInNcIiA6IFwiXCIpKTtcbiAgICAgICAgcmV0dXJuICghdGhpcy5zdW1tYXJ5IHx8ICF0aGlzLnN1bW1hcnkuc3RhcnRzV2l0aChzdW1tYXJ5UHJlZml4KSlcbiAgICAgICAgICAgID8gXCIlcywgJXNcIi5zcHJpbnRmKHN1bW1hcnlQcmVmaXgsIHRoaXMuc3VtbWFyeSlcbiAgICAgICAgICAgIDogdGhpcy5zdW1tYXJ5O1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSdW5PYmplY3Qge1xuICAgIGV4cGVyaW1lbnRJZD86IHN0cmluZztcbiAgICBleHBlcmltZW50TmFtZT86IHN0cmluZztcbiAgICBleHBlcmltZW50RGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgcnVuTmFtZT86IHN0cmluZztcbiAgICBydW5EZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICB1dWlkPzogc3RyaW5nO1xuICAgIHNhbXBsZXM/OiBTYW1wbGVPYmplY3RbXTtcbn1cblxuZXhwb3J0IGNsYXNzIFJ1bk1vZGVsIGV4dGVuZHMgTW9kZWwgaW1wbGVtZW50cyBSdW5PYmplY3Qge1xuICAgIGV4cGVyaW1lbnRJZCA9IFN0cmluZy5FTVBUWTtcbiAgICBleHBlcmltZW50TmFtZSA9IFN0cmluZy5FTVBUWTtcbiAgICBleHBlcmltZW50RGVzY3JpcHRpb24gPSBTdHJpbmcuRU1QVFk7XG4gICAgcnVuTmFtZSA9IFwiUnVuIFwiICsgbW9tZW50KCkuZm9ybWF0KFwiTU0uREQuWVlZWSBISDptbVwiKTtcbiAgICBydW5EZXNjcmlwdGlvbiA9IFN0cmluZy5FTVBUWTtcbiAgICB1dWlkID0gU3RyaW5nLkVNUFRZO1xuICAgIHNhbXBsZXM6IFNhbXBsZU1vZGVsW10gPSBbXG4gICAgICAgIG5ldyBTYW1wbGVNb2RlbCgpXG4gICAgXTtcblxuICAgIGNvbnN0cnVjdG9yKG9iamVjdD86IFJ1bk9iamVjdCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZShvYmplY3QpO1xuXG4gICAgICAgIGlmIChvYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChvYmplY3Quc2FtcGxlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2FtcGxlcyA9IG9iamVjdC5zYW1wbGVzLm1hcCgoc2FtcGxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU2FtcGxlTW9kZWwoc2FtcGxlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZShvYmplY3Q6IFJ1bk9iamVjdCkge1xuICAgICAgICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IFwic2FtcGxlc1wiKSB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9iamVjdC5zYW1wbGVzLmZvckVhY2goKHNhbXBsZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYW1wbGVzW2luZGV4XS51cGRhdGUoc2FtcGxlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEF1dG9tYXRpb25QYXJhbWV0ZXJPYmplY3Qge1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdHlwZT86IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEF1dG9tYXRpb25QYXJhbWV0ZXJNb2RlbCBleHRlbmRzIE1vZGVsIGltcGxlbWVudHMgQXV0b21hdGlvblBhcmFtZXRlck9iamVjdCB7XG4gICAgbmFtZSA9IFN0cmluZy5FTVBUWTtcbiAgICB0eXBlID0gU3RyaW5nLkVNUFRZO1xuICAgIHZhbHVlID0gU3RyaW5nLkVNUFRZO1xuXG4gICAgY29uc3RydWN0b3Iob2JqZWN0PzogQXV0b21hdGlvblBhcmFtZXRlck9iamVjdCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemUob2JqZWN0KTtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIEltbW9iaWxpemF0aW9uVGltZVR5cGUgPSBcImRlZmF1bHRcIiB8IG51bWJlcjtcblxuZXhwb3J0IGludGVyZmFjZSBTYW1wbGVPYmplY3Qge1xuICAgIHNhbXBsZU5hbWU/OiBzdHJpbmc7XG4gICAgd2VsbE5hbWU/OiBzdHJpbmc7XG4gICAgc2FtcGxlRGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgaW5zZXJ0U2l6ZT86IG51bWJlcjtcbiAgICBzdGFnZVN0YXJ0RW5hYmxlZD86IGJvb2xlYW47XG4gICAgc2l6ZVNlbGVjdGlvbkVuYWJsZWQ/OiBib29sZWFuO1xuICAgIG1hZ0JlYWQ/OiBib29sZWFuO1xuICAgIG1vdmllVGltZT86IG51bWJlcjtcbiAgICBhdXRvbWF0aW9uUGFyYW1ldGVycz86IEF1dG9tYXRpb25QYXJhbWV0ZXJPYmplY3RbXTtcbiAgICB0ZW1wbGF0ZVByZXBLaXQ/OiBzdHJpbmc7XG4gICAgYmluZGluZ0tpdD86IHN0cmluZztcbiAgICBzZXF1ZW5jaW5nS2l0Pzogc3RyaW5nO1xuICAgIGNvbnRyb2xLaXQ/OiBzdHJpbmc7XG4gICAgcHJpbWFyeUF1dG9tYXRpb25OYW1lPzogc3RyaW5nO1xuICAgIHByaW1hcnlDb25maWdGaWxlTmFtZT86IHN0cmluZztcbiAgICBjb3B5RmlsZXM/OiBzdHJpbmdbXTtcbiAgICByZWFkb3V0Pzogc3RyaW5nO1xuICAgIG1ldHJpY3NWZXJib3NpdHk/OiBzdHJpbmc7XG4gICAgc3VicmVhZFNldFV1aWQ/OiBzdHJpbmc7XG4gICAgY29sbGVjdGlvbk1ldGFkYXRhVXVpZD86IHN0cmluZztcbiAgICBpbW1vYmlsaXphdGlvblRpbWU/OiBJbW1vYmlsaXphdGlvblRpbWVUeXBlO1xufVxuXG5leHBvcnQgY2xhc3MgU2FtcGxlTW9kZWwgZXh0ZW5kcyBNb2RlbCBpbXBsZW1lbnRzIFNhbXBsZU9iamVjdCB7XG4gICAgc2FtcGxlTmFtZSA9IFwiV2VsbCBTYW1wbGVcIjtcbiAgICB3ZWxsTmFtZSA9IFwiQTAxXCI7XG4gICAgc2FtcGxlRGVzY3JpcHRpb24gPSBTdHJpbmcuRU1QVFk7XG4gICAgaW5zZXJ0U2l6ZSA9IDEwMDAwO1xuICAgIHN0YWdlU3RhcnRFbmFibGVkID0gZmFsc2U7XG4gICAgc2l6ZVNlbGVjdGlvbkVuYWJsZWQgPSBmYWxzZTtcbiAgICBtYWdCZWFkID0gdHJ1ZTtcbiAgICBhdXRvbWF0aW9uUGFyYW1ldGVyczogQXV0b21hdGlvblBhcmFtZXRlck1vZGVsW10gPSBudWxsO1xuICAgIHByaW1hcnlBdXRvbWF0aW9uTmFtZSA9IFN0cmluZy5FTVBUWTtcbiAgICBwcmltYXJ5Q29uZmlnRmlsZU5hbWUgPSBTdHJpbmcuRU1QVFk7XG4gICAgY29weUZpbGVzOiBzdHJpbmdbXSA9IFsgXCJGYXN0YVwiLCBcIkJhbVwiIF07XG4gICAgcmVhZG91dCA9IFwiQmFzZXNfV2l0aG91dF9RVnNcIjtcbiAgICBtZXRyaWNzVmVyYm9zaXR5ID0gXCJNaW5pbWFsXCI7XG5cbiAgICB0ZW1wbGF0ZVByZXBLaXQgPSBTdHJpbmcuRU1QVFk7XG4gICAgYmluZGluZ0tpdCA9IFN0cmluZy5FTVBUWTtcbiAgICBzZXF1ZW5jaW5nS2l0ID0gU3RyaW5nLkVNUFRZO1xuICAgIGNvbnRyb2xLaXQgPSBTdHJpbmcuRU1QVFk7XG5cbiAgICBzdWJyZWFkU2V0VXVpZCA9IFN0cmluZy5FTVBUWTtcbiAgICBjb2xsZWN0aW9uTWV0YWRhdGFVdWlkID0gU3RyaW5nLkVNUFRZO1xuXG4gICAgc2V0IG1vdmllVGltZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5hdXRvbWF0aW9uUGFyYW1ldGVycykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5tb3ZpZUxlbmd0aE1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9tYXRpb25QYXJhbWV0ZXJzLnB1c2goXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpZUxlbmd0aE1vZGVsID0gbmV3IEF1dG9tYXRpb25QYXJhbWV0ZXJNb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiTW92aWVMZW5ndGhcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJEb3VibGVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW92aWVMZW5ndGhNb2RlbC52YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbW92aWVUaW1lKCk6IG51bWJlciB7XG4gICAgICAgIGlmICghdGhpcy5tb3ZpZUxlbmd0aE1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMubW92aWVMZW5ndGhNb2RlbC52YWx1ZSwgMTApO1xuICAgIH1cblxuICAgIHNldCBpbW1vYmlsaXphdGlvblRpbWUodmFsdWU6IEltbW9iaWxpemF0aW9uVGltZVR5cGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmF1dG9tYXRpb25QYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID09PSBcImRlZmF1bHRcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW1tb2JpbGl6YXRpb25UaW1lTW9kZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuYXV0b21hdGlvblBhcmFtZXRlcnMuaW5kZXhPZih0aGlzLmltbW9iaWxpemF0aW9uVGltZU1vZGVsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9tYXRpb25QYXJhbWV0ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbW1vYmlsaXphdGlvblRpbWVNb2RlbCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaW1tb2JpbGl6YXRpb25UaW1lTW9kZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9tYXRpb25QYXJhbWV0ZXJzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1tb2JpbGl6YXRpb25UaW1lTW9kZWwgPSBuZXcgQXV0b21hdGlvblBhcmFtZXRlck1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiSW1tb2JpbGl6YXRpb25UaW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkRvdWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltbW9iaWxpemF0aW9uVGltZU1vZGVsLnZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBpbW1vYmlsaXphdGlvblRpbWUoKTogSW1tb2JpbGl6YXRpb25UaW1lVHlwZSB7XG4gICAgICAgIGlmICghdGhpcy5pbW1vYmlsaXphdGlvblRpbWVNb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiZGVmYXVsdFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLmltbW9iaWxpemF0aW9uVGltZU1vZGVsLnZhbHVlLCAxMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3ZpZUxlbmd0aE1vZGVsOiBBdXRvbWF0aW9uUGFyYW1ldGVyTW9kZWw7XG4gICAgcHJpdmF0ZSBpbW1vYmlsaXphdGlvblRpbWVNb2RlbDogQXV0b21hdGlvblBhcmFtZXRlck1vZGVsO1xuXG4gICAgY29uc3RydWN0b3Iob2JqZWN0PzogU2FtcGxlT2JqZWN0KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZShvYmplY3QpO1xuXG4gICAgICAgIGxldCBtb3ZpZVRpbWUgPSAxMjA7XG4gICAgICAgIGxldCBpbW1vYmlsaXphdGlvblRpbWU6IEltbW9iaWxpemF0aW9uVGltZVR5cGUgPSBcImRlZmF1bHRcIjtcbiAgICAgICAgaWYgKG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKG9iamVjdC5jb3B5RmlsZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvcHlGaWxlcyA9IG9iamVjdC5jb3B5RmlsZXMuc2xpY2UoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2JqZWN0LmF1dG9tYXRpb25QYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvbWF0aW9uUGFyYW1ldGVycyA9IG9iamVjdC5hdXRvbWF0aW9uUGFyYW1ldGVycy5tYXAocGFyYW1ldGVyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZWwgPSBuZXcgQXV0b21hdGlvblBhcmFtZXRlck1vZGVsKHBhcmFtZXRlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlbC5uYW1lID09PSBcIk1vdmllTGVuZ3RoXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92aWVMZW5ndGhNb2RlbCA9IG1vZGVsO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1vZGVsLm5hbWUgPT09IFwiSW1tb2JpbGl6YXRpb25UaW1lXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW1tb2JpbGl6YXRpb25UaW1lTW9kZWwgPSBtb2RlbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9kZWw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2JqZWN0Lm1vdmllVGltZSkge1xuICAgICAgICAgICAgICAgIG1vdmllVGltZSA9IG9iamVjdC5tb3ZpZVRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2JqZWN0LmltbW9iaWxpemF0aW9uVGltZSkge1xuICAgICAgICAgICAgICAgIGltbW9iaWxpemF0aW9uVGltZSA9IG9iamVjdC5pbW1vYmlsaXphdGlvblRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmF1dG9tYXRpb25QYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9tYXRpb25QYXJhbWV0ZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLm1vdmllTGVuZ3RoTW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMubW92aWVUaW1lID0gbW92aWVUaW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbW1vYmlsaXphdGlvblRpbWUgIT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAgICAgICB0aGlzLmltbW9iaWxpemF0aW9uVGltZSA9IGltbW9iaWxpemF0aW9uVGltZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZShvYmplY3Q6IFNhbXBsZU9iamVjdCkge1xuICAgICAgICBsZXQgbW92aWVUaW1lOiBudW1iZXI7XG4gICAgICAgIGxldCBpbW1vYmlsaXphdGlvblRpbWU6IEltbW9iaWxpemF0aW9uVGltZVR5cGU7XG4gICAgICAgIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJhdXRvbWF0aW9uUGFyYW1ldGVyc1wiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpZUxlbmd0aE1vZGVsID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmltbW9iaWxpemF0aW9uVGltZU1vZGVsID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9tYXRpb25QYXJhbWV0ZXJzID0gb2JqZWN0LmF1dG9tYXRpb25QYXJhbWV0ZXJzLm1hcChwYXJhbWV0ZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IG5ldyBBdXRvbWF0aW9uUGFyYW1ldGVyTW9kZWwocGFyYW1ldGVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsLm5hbWUgPT09IFwiTW92aWVMZW5ndGhcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZpZUxlbmd0aE1vZGVsID0gbW9kZWw7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobW9kZWwubmFtZSA9PT0gXCJJbW1vYmlsaXphdGlvblRpbWVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbW1vYmlsaXphdGlvblRpbWVNb2RlbCA9IG1vZGVsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb2RlbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm1vdmllVGltZVwiKSB7XG4gICAgICAgICAgICAgICAgbW92aWVUaW1lID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJpbW1vYmlsaXphdGlvblRpbWVcIikge1xuICAgICAgICAgICAgICAgIGltbW9iaWxpemF0aW9uVGltZSA9IG9iamVjdFtrZXldO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwiY29weUZpbGVzXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvcHlGaWxlcyA9IG9iamVjdC5jb3B5RmlsZXMuc2xpY2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodHlwZW9mIG1vdmllVGltZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5tb3ZpZVRpbWUgPSBtb3ZpZVRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBpbW1vYmlsaXphdGlvblRpbWUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaW1tb2JpbGl6YXRpb25UaW1lID0gaW1tb2JpbGl6YXRpb25UaW1lO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9