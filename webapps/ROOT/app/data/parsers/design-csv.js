"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var papaparse_1 = require("papaparse");
var parts_service_1 = require("../services/parts-service");
var run_model_1 = require("../models/run-model");
var HEADERS = {
    experimentName: "Experiment Name",
    experimentId: "Experiment Id",
    experimentDescription: "Experiment Description",
    runName: "Run Name",
    runDescription: "Run Description",
    wellName: "Well No.",
    sampleName: "Sample Name",
    sampleDescription: "Sample Description",
    collectionTime: "Collection Time",
    insertSize: "Insert Size",
    sizeSelection: "Size Selection",
    stageStart: "Stage Start",
    prepKitBarcode: "DNA Template Prep Kit Box Barcode",
    prepKitParameters: "Prep Kit Parameters",
    controlKitBarcode: "DNA Control Complex Box Barcode",
    controlKitParameters: "Control Kit Parameters",
    bindingKitBarcode: "Binding Kit Box Barcode",
    bindingKitParameters: "Binding Kit Parameters",
    sequencingKitBarcode: "Sequencing Kit Box Barcode",
    sequencingKitParameters: "Sequencing Kit Parameters",
    automationName: "Automation Name",
    automationParameters: "Automation Parameters",
    primaryAnalysis: "Primary Analysis",
    primaryAnalysisParameters: "Primary Analysis Parameters",
    secondaryAnalysis: "Secondary Analysis",
    secondaryAnalysisParameters: "Secondary Analysis Parameters",
    userField1: "User Field 1",
    userField2: "User Field 2",
    userField3: "User Field 3",
    userField4: "User Field 4",
    userField5: "User Field 5",
    userField6: "User Field 6"
};
var REQUIRED_HEADERS = [
    HEADERS.runName,
    HEADERS.wellName,
    HEADERS.sampleName,
    HEADERS.collectionTime,
    HEADERS.insertSize,
    HEADERS.prepKitBarcode,
    HEADERS.controlKitBarcode,
    HEADERS.bindingKitBarcode,
    HEADERS.sequencingKitBarcode,
    HEADERS.automationName
];
var NULL_EXPR_ID = "$NULL_EXPR_ID$";
var ParseError = (function (_super) {
    __extends(ParseError, _super);
    function ParseError(messages) {
        _super.call(this);
        this.message = "Error occurred while parsing";
        this.messages = messages;
    }
    ParseError.is = function (object) {
        return object instanceof ParseError;
    };
    return ParseError;
}(Error));
exports.ParseError = ParseError;
var MissingColumnsError = (function (_super) {
    __extends(MissingColumnsError, _super);
    function MissingColumnsError(missingColumns) {
        _super.call(this);
        this.message = "These required columns are missing: " + missingColumns.join(", ");
        this.missingColumns = missingColumns;
    }
    MissingColumnsError.is = function (object) {
        return object instanceof MissingColumnsError;
    };
    return MissingColumnsError;
}(Error));
exports.MissingColumnsError = MissingColumnsError;
var illegalPathCharsRE = /[<>:"\\|?\*]/g;
var spacesRE = / /g;
var illegalPathSeparatorsRE = /(?:^\/)|\/\/|(?:\/$)/;
var wellNameRE = /^[A-H](?:0[1-9]|1[0-2])$/;
var booleanMap = {
    "true": true,
    "t": true,
    "y": true,
    "yes": true,
    "false": false,
    "f": false,
    "n": false,
    "no": false
};
var magBeadMap = {
    diffusion: false,
    magbead: true
};
var primaryParametersMap = {
    readout: "Readout",
    metricsverbosity: "MetricsVerbosity",
    copyfiletrace: "CopyFileTrace",
    copyfilebaz: "CopyFileBaz",
    copyfiledarkframe: "CopyFileDarkFrame"
};
var validPrimaryParams = Object.keys(primaryParametersMap).map(function (key) { return primaryParametersMap[key]; }).join(", ");
var readoutMap = {
    pulses: "Pulses",
    bases: "Bases",
    baseswithoutqvs: "Bases_Without_QVs",
    bases_without_qvs: "Bases_Without_QVs"
};
var validReadoutValues = Object.keys(readoutMap).map(function (key) { return readoutMap[key]; }).join(", ");
var metricsMap = {
    minimal: "Minimal",
    high: "High",
    none: "None"
};
var validMetricsValues = Object.keys(metricsMap).map(function (key) { return metricsMap[key]; }).join(", ");
function get(object, key, defaultValue) {
    if (defaultValue === void 0) { defaultValue = String.EMPTY; }
    if (object.hasOwnProperty(key)) {
        return object[key];
    }
    return defaultValue;
}
var paramTypeMap = {
    string: "String",
    int: "Int32",
    uint: "UInt32",
    double: "Double",
    float: "Single",
    boolean: "Boolean",
    datetime: "DateTime"
};
function getParameters(input) {
    var result = {};
    if (input) {
        var params = input.split("|");
        params.forEach(function (raw) {
            var type;
            var valid = false;
            var _a = raw.split("="), rawName = _a[0], rawTypeValue = _a[1];
            var name = rawName != null ? rawName.toLowerCase().trim() : String.EMPTY;
            var rawValue = rawTypeValue;
            var value = rawValue;
            if (rawValue != null) {
                var values = rawValue.split(":");
                if (values.length > 0 && values.length < 3) {
                    type = paramTypeMap.string;
                    rawValue = String.EMPTY;
                    if (values.length === 2) {
                        var key = values[0].toLowerCase().trim();
                        if (paramTypeMap.hasOwnProperty(key)) {
                            type = paramTypeMap[key];
                            rawValue = values[1];
                            valid = true;
                        }
                    }
                    else if (values.length === 1) {
                        rawValue = values[0];
                        valid = true;
                    }
                    value = rawValue.trim().toLowerCase();
                }
            }
            else {
                rawValue = value = String.EMPTY;
            }
            result[name] = {
                raw: raw,
                rawName: rawName,
                rawValue: rawValue,
                rawTypeValue: rawTypeValue,
                type: type,
                value: value,
                valid: valid
            };
        });
    }
    return result;
}
var kitsToParse = [
    {
        header: HEADERS.bindingKitBarcode,
        type: parts_service_1.PartType.BindingKit,
        typeName: "binding"
    },
    {
        header: HEADERS.prepKitBarcode,
        type: parts_service_1.PartType.TemplatePrepKit,
        typeName: "template prep"
    },
    {
        header: HEADERS.sequencingKitBarcode,
        type: parts_service_1.PartType.SequencingKit,
        typeName: "sequencing"
    } /*,
    {
        header: HEADERS.controlKitBarcode,
        type: PartType.ControlKit,
        typeName: "DNA complex control"
    }*/
];
function parse(csv, partsService) {
    var result = papaparse_1.parse(csv, {
        header: true,
        skipEmptyLines: true
    });
    var data = result.data;
    var missing = REQUIRED_HEADERS.filter(function (header) { return result.meta.fields.indexOf(header) === -1; });
    if (missing.length) {
        throw new MissingColumnsError(missing);
    }
    if (!data.length) {
        throw new Error("No well/sample rows provided.");
    }
    if (data.length > 16) {
        throw new Error("Too many well/sample rows provided. (Max = 16)");
    }
    var run = {};
    var messages = [];
    run.runName = get(data[0], HEADERS.runName);
    if (!run.runName) {
        messages.push({
            row: 1,
            header: HEADERS.runName,
            message: "Run name missing in the first row."
        });
    }
    run.runDescription = get(data[0], HEADERS.runDescription);
    run.experimentName = get(data[0], HEADERS.experimentName, run.runName);
    run.experimentDescription = get(data[0], HEADERS.experimentDescription, run.runDescription);
    run.experimentId = get(data[0], HEADERS.experimentId, NULL_EXPR_ID);
    var message;
    if (!run.experimentId) {
        message = "\"%s\" missing in the first row.";
    }
    else if (run.experimentId === NULL_EXPR_ID) {
        run.experimentId = String.EMPTY;
    }
    else if (illegalPathCharsRE.test(run.experimentId)) {
        message = "\"%s\" contains illegal characters. (Illegal characters: < > : \" \\ | ? *)";
    }
    else if (spacesRE.test(run.experimentId)) {
        message = "\"%s\" contains spaces. (Spaces are not allowed)";
    }
    else if (illegalPathSeparatorsRE.test(run.experimentId)) {
        message = "\"%s\" has improper placement of path separator \"/\". (Not allowed at start, end, or back-to-back \"//\")";
    }
    if (message) {
        messages.push({
            row: 1,
            header: HEADERS.experimentId,
            message: message.sprintf(HEADERS.experimentId)
        });
    }
    message = null;
    var wells = {};
    run.samples = data.map(function (data, index) {
        var row = index + 1;
        var sample = {};
        sample.sampleName = get(data, HEADERS.sampleName);
        if (!sample.sampleName) {
            messages.push({
                row: row,
                header: HEADERS.sampleName,
                message: "Required field is empty."
            });
        }
        sample.wellName = get(data, HEADERS.wellName);
        if (!wellNameRE.test(sample.wellName)) {
            message = "\"%s\" is not a valid well number.".sprintf(sample.wellName);
        }
        else {
            if (wells[sample.wellName]) {
                message = "Well number \"%s\" is assigned to multiple rows.";
            }
            wells[sample.wellName] = true;
        }
        if (message) {
            messages.push({
                row: row,
                header: HEADERS.wellName,
                message: message
            });
        }
        message = null;
        sample.insertSize = parseInt(get(data, HEADERS.insertSize), 10);
        if (isNaN(sample.insertSize)) {
            message = "\"%s\" is not a valid integer.".sprintf(data.insertSize);
        }
        else if (sample.insertSize < 10) {
            message = "\"%s\" is less than the minimum insert size (Min = 10).".sprintf(data.insertSize);
        }
        if (message) {
            messages.push({
                row: row,
                header: HEADERS.insertSize,
                message: message
            });
        }
        message = null;
        var stageStartEnabled = get(data, HEADERS.stageStart, "false");
        if (!stageStartEnabled) {
            messages.push({
                row: row,
                header: HEADERS.stageStart,
                message: "Required field is empty (T or F required)."
            });
        }
        sample.stageStartEnabled = booleanMap[stageStartEnabled.toLowerCase()];
        var sizeSelection = get(data, HEADERS.sizeSelection, "false");
        if (!sizeSelection) {
            messages.push({
                row: row,
                header: HEADERS.sizeSelection,
                message: "Required field is empty (T or F required)."
            });
        }
        sample.sizeSelectionEnabled = booleanMap[sizeSelection.toLowerCase()];
        var automationName = get(data, HEADERS.automationName).toLowerCase();
        if (!magBeadMap.hasOwnProperty(automationName)) {
            messages.push({
                row: row,
                header: HEADERS.automationName,
                message: "\"%s\" is not a valid automation name (Valid entries: Diffusion, Magbead)."
            });
        }
        sample.magBead = Boolean(magBeadMap[automationName]);
        kitsToParse.forEach(function (kit) {
            var barcode = get(data, kit.header);
            var part = partsService.fromBarcode(barcode);
            if (!part || part.type !== kit.type) {
                messages.push({
                    row: row,
                    header: kit.header,
                    message: "No %s kit found for barcode \"%s\""
                        .sprintf(kit.typeName, barcode)
                });
            }
            else if (part.isObsolete) {
                messages.push({
                    row: row,
                    header: kit.header,
                    message: kit.typeName + " barcode " + barcode + " specifies obsolete part " + part.partNumber
                });
            }
            var keyName = parts_service_1.PartType[kit.type];
            sample[keyName.charAt(0).toLowerCase() + keyName.slice(1)] = barcode;
        });
        var controlKitBarcode = get(data, HEADERS.controlKitBarcode);
        if (controlKitBarcode) {
            var controlKit = partsService.controlKitFromBarcode(controlKitBarcode);
            if (!controlKit) {
                messages.push({
                    row: row,
                    header: HEADERS.controlKitBarcode,
                    message: "No DNA control complex kit found for barcode \"%s\"".sprintf(controlKitBarcode)
                });
            }
            else if (controlKit.isObsolete) {
                messages.push({
                    row: row,
                    header: HEADERS.controlKitBarcode,
                    message: "DNA control complex barcode " + controlKitBarcode + " specifies obsolete part " + controlKit.partNumber
                });
            }
            sample.controlKit = controlKitBarcode;
        }
        sample.primaryAutomationName = get(data, HEADERS.primaryAnalysis);
        var primaryParameters = getParameters(get(data, HEADERS.primaryAnalysisParameters));
        Object.keys(primaryParameters).forEach(function (parameterName) {
            var parameter = primaryParameters[parameterName];
            if (parameter.valid) {
                if (!primaryParametersMap.hasOwnProperty(parameterName)) {
                    messages.push({
                        row: row,
                        header: HEADERS.primaryAnalysisParameters,
                        message: "\"%s\" is not a known primary analysis parameter. (Known parameters: %s)"
                            .sprintf(parameter.rawName, validPrimaryParams)
                    });
                }
            }
            else {
                messages.push({
                    row: row,
                    header: HEADERS.primaryAnalysisParameters,
                    message: "\"%s\" is not a valid input parameter format.".sprintf(parameter.raw)
                });
            }
        });
        var readoutParam = primaryParameters["readout"];
        if (readoutParam) {
            sample.readout = get(readoutMap, readoutParam.value);
            if (!sample.readout) {
                messages.push({
                    row: row,
                    header: HEADERS.primaryAnalysisParameters,
                    message: "\"%s\" is not a valid Readout option. (Valid options: %s)"
                        .sprintf(readoutParam.rawTypeValue, validReadoutValues)
                });
                sample.readout = readoutMap.bases_without_qvs;
            }
        }
        else {
            sample.readout = readoutMap.bases_without_qvs;
        }
        var metricsParam = primaryParameters["metricsverbosity"];
        if (metricsParam) {
            sample.metricsVerbosity = get(metricsMap, metricsParam.value);
            if (!sample.metricsVerbosity) {
                messages.push({
                    row: row,
                    header: HEADERS.primaryAnalysisParameters,
                    message: "\"%s\" is not a valid MetricsVerbosity option. (Valid options: %s)"
                        .sprintf(metricsParam.rawTypeValue, validMetricsValues)
                });
                sample.metricsVerbosity = metricsMap.minimal;
            }
        }
        else {
            sample.metricsVerbosity = metricsMap.minimal;
        }
        sample.copyFiles = [];
        var traceParam = primaryParameters["copyfiletrace"];
        if (traceParam && booleanMap[traceParam.value]) {
            sample.copyFiles.push("Trace");
        }
        sample.copyFiles.push("Fasta", "Bam");
        var bazParam = primaryParameters["copyfilebaz"];
        if (bazParam && booleanMap[bazParam.value]) {
            sample.copyFiles.push("Baz");
        }
        var darkFrameParam = primaryParameters["copyfiledarkframe"];
        if (darkFrameParam && booleanMap[darkFrameParam.value]) {
            sample.copyFiles.push("DarkFrame");
        }
        sample.automationParameters = [];
        var parsedAutomationParameters = {};
        var movieLengthString = get(data, HEADERS.collectionTime);
        var movieLength = parseFloat(movieLengthString);
        if (isNaN(movieLength)) {
            message = "\"%s\" is not a valid number.".sprintf(movieLengthString);
        }
        else if (movieLength > 360) {
            message = "\"%s\" exceeds maximum time of 360 minutes.".sprintf(movieLengthString);
        }
        else if (movieLength < 1) {
            message = "\"%s\" is below the minimum time of 1 minute.".sprintf(movieLengthString);
        }
        if (message) {
            messages.push({
                row: row,
                header: HEADERS.collectionTime,
                message: message
            });
        }
        else {
            sample.automationParameters.push({ name: "MovieLength", type: "Double", value: movieLengthString });
            parsedAutomationParameters["movielength"] = true;
        }
        message = null;
        var automationParameters = getParameters(get(data, HEADERS.automationParameters));
        Object.keys(automationParameters).forEach(function (parameterName) {
            var parameter = automationParameters[parameterName];
            if (parameter.valid) {
                if (!parsedAutomationParameters[parameterName]) {
                    sample.automationParameters.push({
                        name: parameter.rawName,
                        type: parameter.type,
                        value: parameter.rawValue
                    });
                }
            }
            else {
                messages.push({
                    row: row,
                    header: HEADERS.automationParameters,
                    message: "\"%s\" is not a valid input parameter format."
                        .sprintf(parameter.raw)
                });
            }
        });
        return sample;
    });
    if (messages.length) {
        throw new ParseError(messages);
    }
    return new run_model_1.DesignModel({
        name: run.runName,
        summary: "%d SMRT Cell%s, %s".sprintf(run.samples.length, run.samples.length !== 1 ? "s" : "", run.runDescription),
        run: run
    });
}
exports.parse = parse;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL3BhcnNlcnMvZGVzaWduLWNzdi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwwQkFBNkMsV0FBVyxDQUFDLENBQUE7QUFDekQsOEJBQXFDLDJCQUEyQixDQUFDLENBQUE7QUFDakUsMEJBQW1ELHFCQUFxQixDQUFDLENBQUE7QUFFekUsSUFBTSxPQUFPLEdBQUc7SUFDWixjQUFjLEVBQUUsaUJBQWlCO0lBQ2pDLFlBQVksRUFBRSxlQUFlO0lBQzdCLHFCQUFxQixFQUFFLHdCQUF3QjtJQUMvQyxPQUFPLEVBQUUsVUFBVTtJQUNuQixjQUFjLEVBQUUsaUJBQWlCO0lBQ2pDLFFBQVEsRUFBRSxVQUFVO0lBQ3BCLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLGlCQUFpQixFQUFFLG9CQUFvQjtJQUN2QyxjQUFjLEVBQUUsaUJBQWlCO0lBQ2pDLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLGFBQWEsRUFBRSxnQkFBZ0I7SUFDL0IsVUFBVSxFQUFFLGFBQWE7SUFDekIsY0FBYyxFQUFFLG1DQUFtQztJQUNuRCxpQkFBaUIsRUFBRSxxQkFBcUI7SUFDeEMsaUJBQWlCLEVBQUUsaUNBQWlDO0lBQ3BELG9CQUFvQixFQUFFLHdCQUF3QjtJQUM5QyxpQkFBaUIsRUFBRSx5QkFBeUI7SUFDNUMsb0JBQW9CLEVBQUUsd0JBQXdCO0lBQzlDLG9CQUFvQixFQUFFLDRCQUE0QjtJQUNsRCx1QkFBdUIsRUFBRSwyQkFBMkI7SUFDcEQsY0FBYyxFQUFFLGlCQUFpQjtJQUNqQyxvQkFBb0IsRUFBRSx1QkFBdUI7SUFDN0MsZUFBZSxFQUFFLGtCQUFrQjtJQUNuQyx5QkFBeUIsRUFBRSw2QkFBNkI7SUFDeEQsaUJBQWlCLEVBQUUsb0JBQW9CO0lBQ3ZDLDJCQUEyQixFQUFFLCtCQUErQjtJQUM1RCxVQUFVLEVBQUUsY0FBYztJQUMxQixVQUFVLEVBQUUsY0FBYztJQUMxQixVQUFVLEVBQUUsY0FBYztJQUMxQixVQUFVLEVBQUUsY0FBYztJQUMxQixVQUFV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TSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQzt3QkFDN0IsSUFBSSxFQUFFLFNBQVMsQ0FBQyxPQUFPO3dCQUN2QixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7d0JBQ3BCLEtBQUssRUFBRSxTQUFTLENBQUMsUUFBUTtxQkFDNUIsQ0FBQyxDQUFDO2dCQUNQLENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDVixLQUFBLEdBQUc7b0JBQ0gsTUFBTSxFQUFFLE9BQU8sQ0FBQyxvQkFBb0I7b0JBQ3BDLE9BQU8sRUFBRSwrQ0FBK0M7eUJBQ25ELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO2lCQUM5QixDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbEIsTUFBTSxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksdUJBQVcsQ0FBQztRQUNuQixJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU87UUFDakIsT0FBTyxFQUFFLG9CQUFvQixDQUFDLE9BQU8sQ0FDakMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQ2xCLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxFQUNuQyxHQUFHLENBQUMsY0FBYyxDQUNyQjtRQUNELEtBQUEsR0FBRztLQUNOLENBQUMsQ0FBQztBQUNQLENBQUM7QUFuVWUsYUFBSyxRQW1VcEIsQ0FBQSIsImZpbGUiOiJhcHAvZGF0YS9wYXJzZXJzL2Rlc2lnbi1jc3YuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BhcnNlUmVzdWx0LCBwYXJzZSBhcyBwYXJzZUNTVn0gZnJvbSBcInBhcGFwYXJzZVwiO1xuaW1wb3J0IHtQYXJ0c1NlcnZpY2UsIFBhcnRUeXBlfSBmcm9tIFwiLi4vc2VydmljZXMvcGFydHMtc2VydmljZVwiO1xuaW1wb3J0IHtEZXNpZ25Nb2RlbCwgUnVuT2JqZWN0LCBTYW1wbGVPYmplY3R9IGZyb20gXCIuLi9tb2RlbHMvcnVuLW1vZGVsXCI7XG5cbmNvbnN0IEhFQURFUlMgPSB7XG4gICAgZXhwZXJpbWVudE5hbWU6IFwiRXhwZXJpbWVudCBOYW1lXCIsXG4gICAgZXhwZXJpbWVudElkOiBcIkV4cGVyaW1lbnQgSWRcIixcbiAgICBleHBlcmltZW50RGVzY3JpcHRpb246IFwiRXhwZXJpbWVudCBEZXNjcmlwdGlvblwiLFxuICAgIHJ1bk5hbWU6IFwiUnVuIE5hbWVcIixcbiAgICBydW5EZXNjcmlwdGlvbjogXCJSdW4gRGVzY3JpcHRpb25cIixcbiAgICB3ZWxsTmFtZTogXCJXZWxsIE5vLlwiLFxuICAgIHNhbXBsZU5hbWU6IFwiU2FtcGxlIE5hbWVcIixcbiAgICBzYW1wbGVEZXNjcmlwdGlvbjogXCJTYW1wbGUgRGVzY3JpcHRpb25cIixcbiAgICBjb2xsZWN0aW9uVGltZTogXCJDb2xsZWN0aW9uIFRpbWVcIixcbiAgICBpbnNlcnRTaXplOiBcIkluc2VydCBTaXplXCIsXG4gICAgc2l6ZVNlbGVjdGlvbjogXCJTaXplIFNlbGVjdGlvblwiLFxuICAgIHN0YWdlU3RhcnQ6IFwiU3RhZ2UgU3RhcnRcIixcbiAgICBwcmVwS2l0QmFyY29kZTogXCJETkEgVGVtcGxhdGUgUHJlcCBLaXQgQm94IEJhcmNvZGVcIixcbiAgICBwcmVwS2l0UGFyYW1ldGVyczogXCJQcmVwIEtpdCBQYXJhbWV0ZXJzXCIsXG4gICAgY29udHJvbEtpdEJhcmNvZGU6IFwiRE5BIENvbnRyb2wgQ29tcGxleCBCb3ggQmFyY29kZVwiLFxuICAgIGNvbnRyb2xLaXRQYXJhbWV0ZXJzOiBcIkNvbnRyb2wgS2l0IFBhcmFtZXRlcnNcIixcbiAgICBiaW5kaW5nS2l0QmFyY29kZTogXCJCaW5kaW5nIEtpdCBCb3ggQmFyY29kZVwiLFxuICAgIGJpbmRpbmdLaXRQYXJhbWV0ZXJzOiBcIkJpbmRpbmcgS2l0IFBhcmFtZXRlcnNcIixcbiAgICBzZXF1ZW5jaW5nS2l0QmFyY29kZTogXCJTZXF1ZW5jaW5nIEtpdCBCb3ggQmFyY29kZVwiLFxuICAgIHNlcXVlbmNpbmdLaXRQYXJhbWV0ZXJzOiBcIlNlcXVlbmNpbmcgS2l0IFBhcmFtZXRlcnNcIixcbiAgICBhdXRvbWF0aW9uTmFtZTogXCJBdXRvbWF0aW9uIE5hbWVcIixcbiAgICBhdXRvbWF0aW9uUGFyYW1ldGVyczogXCJBdXRvbWF0aW9uIFBhcmFtZXRlcnNcIixcbiAgICBwcmltYXJ5QW5hbHlzaXM6IFwiUHJpbWFyeSBBbmFseXNpc1wiLFxuICAgIHByaW1hcnlBbmFseXNpc1BhcmFtZXRlcnM6IFwiUHJpbWFyeSBBbmFseXNpcyBQYXJhbWV0ZXJzXCIsXG4gICAgc2Vjb25kYXJ5QW5hbHlzaXM6IFwiU2Vjb25kYXJ5IEFuYWx5c2lzXCIsXG4gICAgc2Vjb25kYXJ5QW5hbHlzaXNQYXJhbWV0ZXJzOiBcIlNlY29uZGFyeSBBbmFseXNpcyBQYXJhbWV0ZXJzXCIsXG4gICAgdXNlckZpZWxkMTogXCJVc2VyIEZpZWxkIDFcIixcbiAgICB1c2VyRmllbGQyOiBcIlVzZXIgRmllbGQgMlwiLFxuICAgIHVzZXJGaWVsZDM6IFwiVXNlciBGaWVsZCAzXCIsXG4gICAgdXNlckZpZWxkNDogXCJVc2VyIEZpZWxkIDRcIixcbiAgICB1c2VyRmllbGQ1OiBcIlVzZXIgRmllbGQgNVwiLFxuICAgIHVzZXJGaWVsZDY6IFwiVXNlciBGaWVsZCA2XCJcbn07XG5cbmNvbnN0IFJFUVVJUkVEX0hFQURFUlMgPSBbXG4gICAgSEVBREVSUy5ydW5OYW1lLFxuICAgIEhFQURFUlMud2VsbE5hbWUsXG4gICAgSEVBREVSUy5zYW1wbGVOYW1lLFxuICAgIEhFQURFUlMuY29sbGVjdGlvblRpbWUsXG4gICAgSEVBREVSUy5pbnNlcnRTaXplLFxuICAgIEhFQURFUlMucHJlcEtpdEJhcmNvZGUsXG4gICAgSEVBREVSUy5jb250cm9sS2l0QmFyY29kZSxcbiAgICBIRUFERVJTLmJpbmRpbmdLaXRCYXJjb2RlLFxuICAgIEhFQURFUlMuc2VxdWVuY2luZ0tpdEJhcmNvZGUsXG4gICAgSEVBREVSUy5hdXRvbWF0aW9uTmFtZVxuXTtcblxuY29uc3QgTlVMTF9FWFBSX0lEID0gXCIkTlVMTF9FWFBSX0lEJFwiO1xuXG5pbnRlcmZhY2UgQ3N2RGF0YU9iamVjdCB7XG4gICAgZXhwZXJpbWVudE5hbWU/OiBzdHJpbmc7XG4gICAgZXhwZXJpbWVudElkPzogc3RyaW5nO1xuICAgIGV4cGVyaW1lbnREZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICBydW5OYW1lPzogc3RyaW5nO1xuICAgIHJ1bkRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIHdlbGxOYW1lPzogc3RyaW5nO1xuICAgIHNhbXBsZU5hbWU/OiBzdHJpbmc7XG4gICAgc2FtcGxlRGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgY29sbGVjdGlvblRpbWU/OiBzdHJpbmc7XG4gICAgaW5zZXJ0U2l6ZT86IHN0cmluZztcbiAgICBzaXplU2VsZWN0aW9uPzogc3RyaW5nO1xuICAgIHN0YWdlU3RhcnQ/OiBzdHJpbmc7XG4gICAgcHJlcEtpdEJhcmNvZGU/OiBzdHJpbmc7XG4gICAgcHJlcEtpdFBhcmFtZXRlcnM/OiBzdHJpbmc7XG4gICAgY29udHJvbEtpdEJhcmNvZGU/OiBzdHJpbmc7XG4gICAgY29udHJvbEtpdFBhcmFtZXRlcnM/OiBzdHJpbmc7XG4gICAgYmluZGluZ0tpdEJhcmNvZGU/OiBzdHJpbmc7XG4gICAgYmluZGluZ0tpdFBhcmFtZXRlcnM/OiBzdHJpbmc7XG4gICAgc2VxdWVuY2luZ0tpdEJhcmNvZGU/OiBzdHJpbmc7XG4gICAgc2VxdWVuY2luZ0tpdFBhcmFtZXRlcnM/OiBzdHJpbmc7XG4gICAgYXV0b21hdGlvbk5hbWU/OiBzdHJpbmc7XG4gICAgYXV0b21hdGlvblBhcmFtZXRlcnM/OiBzdHJpbmc7XG4gICAgcHJpbWFyeUFuYWx5c2lzPzogc3RyaW5nO1xuICAgIHByaW1hcnlBbmFseXNpc1BhcmFtZXRlcnM/OiBzdHJpbmc7XG4gICAgc2Vjb25kYXJ5QW5hbHlzaXM/OiBzdHJpbmc7XG4gICAgc2Vjb25kYXJ5QW5hbHlzaXNQYXJhbWV0ZXJzPzogc3RyaW5nO1xuICAgIHVzZXJGaWVsZDE/OiBzdHJpbmc7XG4gICAgdXNlckZpZWxkMj86IHN0cmluZztcbiAgICB1c2VyRmllbGQzPzogc3RyaW5nO1xuICAgIHVzZXJGaWVsZDQ/OiBzdHJpbmc7XG4gICAgdXNlckZpZWxkNT86IHN0cmluZztcbiAgICB1c2VyRmllbGQ2Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhcnNlRXJyb3JNZXNzYWdlIHtcbiAgICByb3c6IG51bWJlcjtcbiAgICBoZWFkZXI6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBQYXJzZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIG1lc3NhZ2VzOiBQYXJzZUVycm9yTWVzc2FnZVtdO1xuXG4gICAgY29uc3RydWN0b3IobWVzc2FnZXM6IFBhcnNlRXJyb3JNZXNzYWdlW10pIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBcIkVycm9yIG9jY3VycmVkIHdoaWxlIHBhcnNpbmdcIjtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IG1lc3NhZ2VzO1xuICAgIH1cblxuICAgIHN0YXRpYyBpcyhvYmplY3Q6IGFueSk6IG9iamVjdCBpcyBQYXJzZUVycm9yIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdCBpbnN0YW5jZW9mIFBhcnNlRXJyb3I7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWlzc2luZ0NvbHVtbnNFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBtaXNzaW5nQ29sdW1uczogc3RyaW5nW107XG5cbiAgICBjb25zdHJ1Y3RvcihtaXNzaW5nQ29sdW1uczogc3RyaW5nW10pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gYFRoZXNlIHJlcXVpcmVkIGNvbHVtbnMgYXJlIG1pc3Npbmc6ICR7bWlzc2luZ0NvbHVtbnMuam9pbihcIiwgXCIpfWA7XG4gICAgICAgIHRoaXMubWlzc2luZ0NvbHVtbnMgPSBtaXNzaW5nQ29sdW1ucztcbiAgICB9XG5cbiAgICBzdGF0aWMgaXMob2JqZWN0OiBhbnkpOiBvYmplY3QgaXMgTWlzc2luZ0NvbHVtbnNFcnJvciB7XG4gICAgICAgIHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiBNaXNzaW5nQ29sdW1uc0Vycm9yO1xuICAgIH1cbn1cblxuY29uc3QgaWxsZWdhbFBhdGhDaGFyc1JFID0gL1s8PjpcIlxcXFx8P1xcKl0vZztcbmNvbnN0IHNwYWNlc1JFID0gLyAvZztcbmNvbnN0IGlsbGVnYWxQYXRoU2VwYXJhdG9yc1JFID0gLyg/Ol5cXC8pfFxcL1xcL3woPzpcXC8kKS87XG5jb25zdCB3ZWxsTmFtZVJFID0gL15bQS1IXSg/OjBbMS05XXwxWzAtMl0pJC87XG5cbmNvbnN0IGJvb2xlYW5NYXAgPSB7XG4gICAgXCJ0cnVlXCI6IHRydWUsXG4gICAgXCJ0XCI6IHRydWUsXG4gICAgXCJ5XCI6IHRydWUsXG4gICAgXCJ5ZXNcIjogdHJ1ZSxcbiAgICBcImZhbHNlXCI6IGZhbHNlLFxuICAgIFwiZlwiOiBmYWxzZSxcbiAgICBcIm5cIjogZmFsc2UsXG4gICAgXCJub1wiOiBmYWxzZVxufTtcblxuY29uc3QgbWFnQmVhZE1hcCA9IHtcbiAgICBkaWZmdXNpb246IGZhbHNlLFxuICAgIG1hZ2JlYWQ6IHRydWVcbn07XG5cbmNvbnN0IHByaW1hcnlQYXJhbWV0ZXJzTWFwID0ge1xuICAgIHJlYWRvdXQ6IFwiUmVhZG91dFwiLFxuICAgIG1ldHJpY3N2ZXJib3NpdHk6IFwiTWV0cmljc1ZlcmJvc2l0eVwiLFxuICAgIGNvcHlmaWxldHJhY2U6IFwiQ29weUZpbGVUcmFjZVwiLFxuICAgIGNvcHlmaWxlYmF6OiBcIkNvcHlGaWxlQmF6XCIsXG4gICAgY29weWZpbGVkYXJrZnJhbWU6IFwiQ29weUZpbGVEYXJrRnJhbWVcIlxufTtcblxuY29uc3QgdmFsaWRQcmltYXJ5UGFyYW1zID0gT2JqZWN0LmtleXMocHJpbWFyeVBhcmFtZXRlcnNNYXApLm1hcChrZXkgPT4gcHJpbWFyeVBhcmFtZXRlcnNNYXBba2V5XSkuam9pbihcIiwgXCIpO1xuXG5jb25zdCByZWFkb3V0TWFwID0ge1xuICAgIHB1bHNlczogXCJQdWxzZXNcIixcbiAgICBiYXNlczogXCJCYXNlc1wiLFxuICAgIGJhc2Vzd2l0aG91dHF2czogXCJCYXNlc19XaXRob3V0X1FWc1wiLFxuICAgIGJhc2VzX3dpdGhvdXRfcXZzOiBcIkJhc2VzX1dpdGhvdXRfUVZzXCJcbn07XG5cbmNvbnN0IHZhbGlkUmVhZG91dFZhbHVlcyA9IE9iamVjdC5rZXlzKHJlYWRvdXRNYXApLm1hcChrZXkgPT4gcmVhZG91dE1hcFtrZXldKS5qb2luKFwiLCBcIik7XG5cbmNvbnN0IG1ldHJpY3NNYXAgPSB7XG4gICAgbWluaW1hbDogXCJNaW5pbWFsXCIsXG4gICAgaGlnaDogXCJIaWdoXCIsXG4gICAgbm9uZTogXCJOb25lXCJcbn07XG5cbmNvbnN0IHZhbGlkTWV0cmljc1ZhbHVlcyA9IE9iamVjdC5rZXlzKG1ldHJpY3NNYXApLm1hcChrZXkgPT4gbWV0cmljc01hcFtrZXldKS5qb2luKFwiLCBcIik7XG5cbmZ1bmN0aW9uIGdldChvYmplY3Q6IGFueSwga2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogYW55ID0gU3RyaW5nLkVNUFRZKSB7XG4gICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Rba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbn1cblxuY29uc3QgcGFyYW1UeXBlTWFwID0ge1xuICAgIHN0cmluZzogXCJTdHJpbmdcIixcbiAgICBpbnQ6IFwiSW50MzJcIixcbiAgICB1aW50OiBcIlVJbnQzMlwiLFxuICAgIGRvdWJsZTogXCJEb3VibGVcIixcbiAgICBmbG9hdDogXCJTaW5nbGVcIixcbiAgICBib29sZWFuOiBcIkJvb2xlYW5cIixcbiAgICBkYXRldGltZTogXCJEYXRlVGltZVwiXG59O1xuXG5pbnRlcmZhY2UgUGFyYW1ldGVyIHtcbiAgICByYXc6IHN0cmluZztcbiAgICByYXdOYW1lOiBzdHJpbmc7XG4gICAgcmF3VHlwZVZhbHVlOiBzdHJpbmc7XG4gICAgcmF3VmFsdWU6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICB2YWxpZDogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIFBhcmFtZXRlck1hcCB7XG4gICAgW2tleTogc3RyaW5nXTogUGFyYW1ldGVyO1xufVxuXG5mdW5jdGlvbiBnZXRQYXJhbWV0ZXJzKGlucHV0OiBzdHJpbmcpOiBQYXJhbWV0ZXJNYXAge1xuICAgIGNvbnN0IHJlc3VsdDogUGFyYW1ldGVyTWFwID0ge307XG5cbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gaW5wdXQuc3BsaXQoXCJ8XCIpO1xuICAgICAgICBwYXJhbXMuZm9yRWFjaChyYXcgPT4ge1xuICAgICAgICAgICAgbGV0IHR5cGU6IHN0cmluZztcbiAgICAgICAgICAgIGxldCB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IFtyYXdOYW1lLCByYXdUeXBlVmFsdWVdID0gcmF3LnNwbGl0KFwiPVwiKTtcblxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHJhd05hbWUgIT0gbnVsbCA/IHJhd05hbWUudG9Mb3dlckNhc2UoKS50cmltKCkgOiBTdHJpbmcuRU1QVFk7XG5cbiAgICAgICAgICAgIGxldCByYXdWYWx1ZSA9IHJhd1R5cGVWYWx1ZTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHJhd1ZhbHVlO1xuICAgICAgICAgICAgaWYgKHJhd1ZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSByYXdWYWx1ZS5zcGxpdChcIjpcIik7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA+IDAgJiYgdmFsdWVzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IHBhcmFtVHlwZU1hcC5zdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgIHJhd1ZhbHVlID0gU3RyaW5nLkVNUFRZO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSB2YWx1ZXNbMF0udG9Mb3dlckNhc2UoKS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbVR5cGVNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBwYXJhbVR5cGVNYXBba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdWYWx1ZSA9IHZhbHVlc1sxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmF3VmFsdWUgPSB2YWx1ZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHJhd1ZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmF3VmFsdWUgPSB2YWx1ZSA9IFN0cmluZy5FTVBUWTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0W25hbWVdID0ge1xuICAgICAgICAgICAgICAgIHJhdyxcbiAgICAgICAgICAgICAgICByYXdOYW1lLFxuICAgICAgICAgICAgICAgIHJhd1ZhbHVlLFxuICAgICAgICAgICAgICAgIHJhd1R5cGVWYWx1ZSxcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgIHZhbGlkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5pbnRlcmZhY2UgS2l0VG9QYXJzZSB7XG4gICAgaGVhZGVyOiBzdHJpbmc7XG4gICAgdHlwZTogUGFydFR5cGU7XG4gICAgdHlwZU5hbWU/OiBzdHJpbmc7XG59XG5cbmNvbnN0IGtpdHNUb1BhcnNlOiBLaXRUb1BhcnNlW10gPSBbXG4gICAge1xuICAgICAgICBoZWFkZXI6IEhFQURFUlMuYmluZGluZ0tpdEJhcmNvZGUsXG4gICAgICAgIHR5cGU6IFBhcnRUeXBlLkJpbmRpbmdLaXQsXG4gICAgICAgIHR5cGVOYW1lOiBcImJpbmRpbmdcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBoZWFkZXI6IEhFQURFUlMucHJlcEtpdEJhcmNvZGUsXG4gICAgICAgIHR5cGU6IFBhcnRUeXBlLlRlbXBsYXRlUHJlcEtpdCxcbiAgICAgICAgdHlwZU5hbWU6IFwidGVtcGxhdGUgcHJlcFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGhlYWRlcjogSEVBREVSUy5zZXF1ZW5jaW5nS2l0QmFyY29kZSxcbiAgICAgICAgdHlwZTogUGFydFR5cGUuU2VxdWVuY2luZ0tpdCxcbiAgICAgICAgdHlwZU5hbWU6IFwic2VxdWVuY2luZ1wiXG4gICAgfS8qLFxuICAgIHtcbiAgICAgICAgaGVhZGVyOiBIRUFERVJTLmNvbnRyb2xLaXRCYXJjb2RlLFxuICAgICAgICB0eXBlOiBQYXJ0VHlwZS5Db250cm9sS2l0LFxuICAgICAgICB0eXBlTmFtZTogXCJETkEgY29tcGxleCBjb250cm9sXCJcbiAgICB9Ki9cbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZShjc3Y6IHN0cmluZywgcGFydHNTZXJ2aWNlOiBQYXJ0c1NlcnZpY2UpOiBEZXNpZ25Nb2RlbCB7XG4gICAgY29uc3QgcmVzdWx0ID0gcGFyc2VDU1YoY3N2LCB7XG4gICAgICAgIGhlYWRlcjogdHJ1ZSxcbiAgICAgICAgc2tpcEVtcHR5TGluZXM6IHRydWVcbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdGE6IENzdkRhdGFPYmplY3RbXSA9IHJlc3VsdC5kYXRhO1xuXG4gICAgY29uc3QgbWlzc2luZyA9IFJFUVVJUkVEX0hFQURFUlMuZmlsdGVyKGhlYWRlciA9PiByZXN1bHQubWV0YS5maWVsZHMuaW5kZXhPZihoZWFkZXIpID09PSAtMSk7XG5cbiAgICBpZiAobWlzc2luZy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1pc3NpbmdDb2x1bW5zRXJyb3IobWlzc2luZyk7XG4gICAgfVxuXG4gICAgaWYgKCFkYXRhLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB3ZWxsL3NhbXBsZSByb3dzIHByb3ZpZGVkLlwiKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggPiAxNikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUb28gbWFueSB3ZWxsL3NhbXBsZSByb3dzIHByb3ZpZGVkLiAoTWF4ID0gMTYpXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJ1bjogUnVuT2JqZWN0ID0ge307XG4gICAgY29uc3QgbWVzc2FnZXM6IFBhcnNlRXJyb3JNZXNzYWdlW10gPSBbXTtcblxuICAgIHJ1bi5ydW5OYW1lID0gZ2V0KGRhdGFbMF0sIEhFQURFUlMucnVuTmFtZSk7XG4gICAgaWYgKCFydW4ucnVuTmFtZSkge1xuICAgICAgICBtZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICAgIHJvdzogMSxcbiAgICAgICAgICAgIGhlYWRlcjogSEVBREVSUy5ydW5OYW1lLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJSdW4gbmFtZSBtaXNzaW5nIGluIHRoZSBmaXJzdCByb3cuXCJcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bi5ydW5EZXNjcmlwdGlvbiA9IGdldChkYXRhWzBdLCBIRUFERVJTLnJ1bkRlc2NyaXB0aW9uKTtcblxuICAgIHJ1bi5leHBlcmltZW50TmFtZSA9IGdldChkYXRhWzBdLCBIRUFERVJTLmV4cGVyaW1lbnROYW1lLCBydW4ucnVuTmFtZSk7XG4gICAgcnVuLmV4cGVyaW1lbnREZXNjcmlwdGlvbiA9IGdldChkYXRhWzBdLCBIRUFERVJTLmV4cGVyaW1lbnREZXNjcmlwdGlvbiwgcnVuLnJ1bkRlc2NyaXB0aW9uKTtcbiAgICBydW4uZXhwZXJpbWVudElkID0gZ2V0KGRhdGFbMF0sIEhFQURFUlMuZXhwZXJpbWVudElkLCBOVUxMX0VYUFJfSUQpO1xuXG4gICAgbGV0IG1lc3NhZ2U6IHN0cmluZztcbiAgICBpZiAoIXJ1bi5leHBlcmltZW50SWQpIHtcbiAgICAgICAgbWVzc2FnZSA9IFwiXFxcIiVzXFxcIiBtaXNzaW5nIGluIHRoZSBmaXJzdCByb3cuXCI7XG4gICAgfSBlbHNlIGlmIChydW4uZXhwZXJpbWVudElkID09PSBOVUxMX0VYUFJfSUQpIHtcbiAgICAgICAgcnVuLmV4cGVyaW1lbnRJZCA9IFN0cmluZy5FTVBUWTtcbiAgICB9IGVsc2UgaWYgKGlsbGVnYWxQYXRoQ2hhcnNSRS50ZXN0KHJ1bi5leHBlcmltZW50SWQpKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBcIlxcXCIlc1xcXCIgY29udGFpbnMgaWxsZWdhbCBjaGFyYWN0ZXJzLiAoSWxsZWdhbCBjaGFyYWN0ZXJzOiA8ID4gOiBcXFwiIFxcXFwgfCA/ICopXCI7XG4gICAgfSBlbHNlIGlmIChzcGFjZXNSRS50ZXN0KHJ1bi5leHBlcmltZW50SWQpKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBcIlxcXCIlc1xcXCIgY29udGFpbnMgc3BhY2VzLiAoU3BhY2VzIGFyZSBub3QgYWxsb3dlZClcIjtcbiAgICB9IGVsc2UgaWYgKGlsbGVnYWxQYXRoU2VwYXJhdG9yc1JFLnRlc3QocnVuLmV4cGVyaW1lbnRJZCkpIHtcbiAgICAgICAgbWVzc2FnZSA9IFwiXFxcIiVzXFxcIiBoYXMgaW1wcm9wZXIgcGxhY2VtZW50IG9mIHBhdGggc2VwYXJhdG9yIFxcXCIvXFxcIi4gKE5vdCBhbGxvd2VkIGF0IHN0YXJ0LCBlbmQsIG9yIGJhY2stdG8tYmFjayBcXFwiLy9cXFwiKVwiO1xuICAgIH1cblxuICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgIG1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgICAgcm93OiAxLFxuICAgICAgICAgICAgaGVhZGVyOiBIRUFERVJTLmV4cGVyaW1lbnRJZCxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2Uuc3ByaW50ZihIRUFERVJTLmV4cGVyaW1lbnRJZClcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1lc3NhZ2UgPSBudWxsO1xuXG4gICAgY29uc3Qgd2VsbHM6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbjsgfSA9IHt9O1xuXG4gICAgcnVuLnNhbXBsZXMgPSBkYXRhLm1hcCgoZGF0YSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3Qgcm93ID0gaW5kZXggKyAxO1xuICAgICAgICBjb25zdCBzYW1wbGU6IFNhbXBsZU9iamVjdCA9IHt9O1xuXG4gICAgICAgIHNhbXBsZS5zYW1wbGVOYW1lID0gZ2V0KGRhdGEsIEhFQURFUlMuc2FtcGxlTmFtZSk7XG4gICAgICAgIGlmICghc2FtcGxlLnNhbXBsZU5hbWUpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgICAgICAgIHJvdyxcbiAgICAgICAgICAgICAgICBoZWFkZXI6IEhFQURFUlMuc2FtcGxlTmFtZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlJlcXVpcmVkIGZpZWxkIGlzIGVtcHR5LlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNhbXBsZS53ZWxsTmFtZSA9IGdldChkYXRhLCBIRUFERVJTLndlbGxOYW1lKTtcbiAgICAgICAgaWYgKCF3ZWxsTmFtZVJFLnRlc3Qoc2FtcGxlLndlbGxOYW1lKSkge1xuICAgICAgICAgICAgbWVzc2FnZSA9IFwiXFxcIiVzXFxcIiBpcyBub3QgYSB2YWxpZCB3ZWxsIG51bWJlci5cIi5zcHJpbnRmKHNhbXBsZS53ZWxsTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAod2VsbHNbc2FtcGxlLndlbGxOYW1lXSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIldlbGwgbnVtYmVyIFxcXCIlc1xcXCIgaXMgYXNzaWduZWQgdG8gbXVsdGlwbGUgcm93cy5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdlbGxzW3NhbXBsZS53ZWxsTmFtZV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICByb3csXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBIRUFERVJTLndlbGxOYW1lLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2UgPSBudWxsO1xuXG4gICAgICAgIHNhbXBsZS5pbnNlcnRTaXplID0gcGFyc2VJbnQoZ2V0KGRhdGEsIEhFQURFUlMuaW5zZXJ0U2l6ZSksIDEwKTtcbiAgICAgICAgaWYgKGlzTmFOKHNhbXBsZS5pbnNlcnRTaXplKSkge1xuICAgICAgICAgICAgbWVzc2FnZSA9IFwiXFxcIiVzXFxcIiBpcyBub3QgYSB2YWxpZCBpbnRlZ2VyLlwiLnNwcmludGYoZGF0YS5pbnNlcnRTaXplKTtcbiAgICAgICAgfSBlbHNlIGlmIChzYW1wbGUuaW5zZXJ0U2l6ZSA8IDEwKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gXCJcXFwiJXNcXFwiIGlzIGxlc3MgdGhhbiB0aGUgbWluaW11bSBpbnNlcnQgc2l6ZSAoTWluID0gMTApLlwiLnNwcmludGYoZGF0YS5pbnNlcnRTaXplKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgbWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgICAgIGhlYWRlcjogSEVBREVSUy5pbnNlcnRTaXplLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2UgPSBudWxsO1xuXG4gICAgICAgIGNvbnN0IHN0YWdlU3RhcnRFbmFibGVkID0gZ2V0KGRhdGEsIEhFQURFUlMuc3RhZ2VTdGFydCwgXCJmYWxzZVwiKTtcbiAgICAgICAgaWYgKCFzdGFnZVN0YXJ0RW5hYmxlZCkge1xuICAgICAgICAgICAgbWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgICAgIGhlYWRlcjogSEVBREVSUy5zdGFnZVN0YXJ0LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiUmVxdWlyZWQgZmllbGQgaXMgZW1wdHkgKFQgb3IgRiByZXF1aXJlZCkuXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNhbXBsZS5zdGFnZVN0YXJ0RW5hYmxlZCA9IGJvb2xlYW5NYXBbc3RhZ2VTdGFydEVuYWJsZWQudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgY29uc3Qgc2l6ZVNlbGVjdGlvbiA9IGdldChkYXRhLCBIRUFERVJTLnNpemVTZWxlY3Rpb24sIFwiZmFsc2VcIik7XG4gICAgICAgIGlmICghc2l6ZVNlbGVjdGlvbikge1xuICAgICAgICAgICAgbWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgICAgIGhlYWRlcjogSEVBREVSUy5zaXplU2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiUmVxdWlyZWQgZmllbGQgaXMgZW1wdHkgKFQgb3IgRiByZXF1aXJlZCkuXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNhbXBsZS5zaXplU2VsZWN0aW9uRW5hYmxlZCA9IGJvb2xlYW5NYXBbc2l6ZVNlbGVjdGlvbi50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICBjb25zdCBhdXRvbWF0aW9uTmFtZSA9IGdldChkYXRhLCBIRUFERVJTLmF1dG9tYXRpb25OYW1lKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoIW1hZ0JlYWRNYXAuaGFzT3duUHJvcGVydHkoYXV0b21hdGlvbk5hbWUpKSB7XG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICByb3csXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBIRUFERVJTLmF1dG9tYXRpb25OYW1lLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiXFxcIiVzXFxcIiBpcyBub3QgYSB2YWxpZCBhdXRvbWF0aW9uIG5hbWUgKFZhbGlkIGVudHJpZXM6IERpZmZ1c2lvbiwgTWFnYmVhZCkuXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNhbXBsZS5tYWdCZWFkID0gQm9vbGVhbihtYWdCZWFkTWFwW2F1dG9tYXRpb25OYW1lXSk7XG5cbiAgICAgICAga2l0c1RvUGFyc2UuZm9yRWFjaChraXQgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmFyY29kZSA9IGdldChkYXRhLCBraXQuaGVhZGVyKTtcbiAgICAgICAgICAgIGNvbnN0IHBhcnQgPSBwYXJ0c1NlcnZpY2UuZnJvbUJhcmNvZGUoYmFyY29kZSk7XG5cbiAgICAgICAgICAgIGlmICghcGFydCB8fCBwYXJ0LnR5cGUgIT09IGtpdC50eXBlKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHJvdyxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBraXQuaGVhZGVyLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIk5vICVzIGtpdCBmb3VuZCBmb3IgYmFyY29kZSBcXFwiJXNcXFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwcmludGYoa2l0LnR5cGVOYW1lLCBiYXJjb2RlKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGFydC5pc09ic29sZXRlKXtcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IGtpdC5oZWFkZXIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAke2tpdC50eXBlTmFtZX0gYmFyY29kZSAke2JhcmNvZGV9IHNwZWNpZmllcyBvYnNvbGV0ZSBwYXJ0ICR7cGFydC5wYXJ0TnVtYmVyfWBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qga2V5TmFtZSA9IFBhcnRUeXBlW2tpdC50eXBlXTtcbiAgICAgICAgICAgIHNhbXBsZVtrZXlOYW1lLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsga2V5TmFtZS5zbGljZSgxKV0gPSBiYXJjb2RlO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjb250cm9sS2l0QmFyY29kZSA9IGdldChkYXRhLCBIRUFERVJTLmNvbnRyb2xLaXRCYXJjb2RlKTtcbiAgICAgICAgaWYgKGNvbnRyb2xLaXRCYXJjb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBjb250cm9sS2l0ID0gcGFydHNTZXJ2aWNlLmNvbnRyb2xLaXRGcm9tQmFyY29kZShjb250cm9sS2l0QmFyY29kZSk7XG4gICAgICAgICAgICBpZiAoIWNvbnRyb2xLaXQpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IEhFQURFUlMuY29udHJvbEtpdEJhcmNvZGUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiTm8gRE5BIGNvbnRyb2wgY29tcGxleCBraXQgZm91bmQgZm9yIGJhcmNvZGUgXFxcIiVzXFxcIlwiLnNwcmludGYoY29udHJvbEtpdEJhcmNvZGUpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb250cm9sS2l0LmlzT2Jzb2xldGUpe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICByb3csXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogSEVBREVSUy5jb250cm9sS2l0QmFyY29kZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYEROQSBjb250cm9sIGNvbXBsZXggYmFyY29kZSAke2NvbnRyb2xLaXRCYXJjb2RlfSBzcGVjaWZpZXMgb2Jzb2xldGUgcGFydCAke2NvbnRyb2xLaXQucGFydE51bWJlcn1gXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNhbXBsZS5jb250cm9sS2l0ID0gY29udHJvbEtpdEJhcmNvZGU7XG4gICAgICAgIH1cblxuICAgICAgICBzYW1wbGUucHJpbWFyeUF1dG9tYXRpb25OYW1lID0gZ2V0KGRhdGEsIEhFQURFUlMucHJpbWFyeUFuYWx5c2lzKTtcblxuICAgICAgICBjb25zdCBwcmltYXJ5UGFyYW1ldGVycyA9IGdldFBhcmFtZXRlcnMoZ2V0KGRhdGEsIEhFQURFUlMucHJpbWFyeUFuYWx5c2lzUGFyYW1ldGVycykpO1xuICAgICAgICBPYmplY3Qua2V5cyhwcmltYXJ5UGFyYW1ldGVycykuZm9yRWFjaChwYXJhbWV0ZXJOYW1lID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtZXRlciA9IHByaW1hcnlQYXJhbWV0ZXJzW3BhcmFtZXRlck5hbWVdO1xuXG4gICAgICAgICAgICBpZiAocGFyYW1ldGVyLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmltYXJ5UGFyYW1ldGVyc01hcC5oYXNPd25Qcm9wZXJ0eShwYXJhbWV0ZXJOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogSEVBREVSUy5wcmltYXJ5QW5hbHlzaXNQYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJcXFwiJXNcXFwiIGlzIG5vdCBhIGtub3duIHByaW1hcnkgYW5hbHlzaXMgcGFyYW1ldGVyLiAoS25vd24gcGFyYW1ldGVyczogJXMpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3ByaW50ZihwYXJhbWV0ZXIucmF3TmFtZSwgdmFsaWRQcmltYXJ5UGFyYW1zKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICByb3csXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogSEVBREVSUy5wcmltYXJ5QW5hbHlzaXNQYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlxcXCIlc1xcXCIgaXMgbm90IGEgdmFsaWQgaW5wdXQgcGFyYW1ldGVyIGZvcm1hdC5cIi5zcHJpbnRmKHBhcmFtZXRlci5yYXcpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlYWRvdXRQYXJhbSA9IHByaW1hcnlQYXJhbWV0ZXJzW1wicmVhZG91dFwiXTtcbiAgICAgICAgaWYgKHJlYWRvdXRQYXJhbSkge1xuICAgICAgICAgICAgc2FtcGxlLnJlYWRvdXQgPSBnZXQocmVhZG91dE1hcCwgcmVhZG91dFBhcmFtLnZhbHVlKTtcbiAgICAgICAgICAgIGlmICghc2FtcGxlLnJlYWRvdXQpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IEhFQURFUlMucHJpbWFyeUFuYWx5c2lzUGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJcXFwiJXNcXFwiIGlzIG5vdCBhIHZhbGlkIFJlYWRvdXQgb3B0aW9uLiAoVmFsaWQgb3B0aW9uczogJXMpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zcHJpbnRmKHJlYWRvdXRQYXJhbS5yYXdUeXBlVmFsdWUsIHZhbGlkUmVhZG91dFZhbHVlcylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzYW1wbGUucmVhZG91dCA9IHJlYWRvdXRNYXAuYmFzZXNfd2l0aG91dF9xdnM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzYW1wbGUucmVhZG91dCA9IHJlYWRvdXRNYXAuYmFzZXNfd2l0aG91dF9xdnM7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXRyaWNzUGFyYW0gPSBwcmltYXJ5UGFyYW1ldGVyc1tcIm1ldHJpY3N2ZXJib3NpdHlcIl07XG4gICAgICAgIGlmIChtZXRyaWNzUGFyYW0pIHtcbiAgICAgICAgICAgIHNhbXBsZS5tZXRyaWNzVmVyYm9zaXR5ID0gZ2V0KG1ldHJpY3NNYXAsIG1ldHJpY3NQYXJhbS52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoIXNhbXBsZS5tZXRyaWNzVmVyYm9zaXR5KSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHJvdyxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBIRUFERVJTLnByaW1hcnlBbmFseXNpc1BhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiXFxcIiVzXFxcIiBpcyBub3QgYSB2YWxpZCBNZXRyaWNzVmVyYm9zaXR5IG9wdGlvbi4gKFZhbGlkIG9wdGlvbnM6ICVzKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3ByaW50ZihtZXRyaWNzUGFyYW0ucmF3VHlwZVZhbHVlLCB2YWxpZE1ldHJpY3NWYWx1ZXMpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2FtcGxlLm1ldHJpY3NWZXJib3NpdHkgPSBtZXRyaWNzTWFwLm1pbmltYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzYW1wbGUubWV0cmljc1ZlcmJvc2l0eSA9IG1ldHJpY3NNYXAubWluaW1hbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNhbXBsZS5jb3B5RmlsZXMgPSBbXTtcblxuICAgICAgICBjb25zdCB0cmFjZVBhcmFtID0gcHJpbWFyeVBhcmFtZXRlcnNbXCJjb3B5ZmlsZXRyYWNlXCJdO1xuICAgICAgICBpZiAodHJhY2VQYXJhbSAmJiBib29sZWFuTWFwW3RyYWNlUGFyYW0udmFsdWVdKSB7XG4gICAgICAgICAgICBzYW1wbGUuY29weUZpbGVzLnB1c2goXCJUcmFjZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNhbXBsZS5jb3B5RmlsZXMucHVzaChcIkZhc3RhXCIsIFwiQmFtXCIpO1xuXG4gICAgICAgIGNvbnN0IGJhelBhcmFtID0gcHJpbWFyeVBhcmFtZXRlcnNbXCJjb3B5ZmlsZWJhelwiXTtcbiAgICAgICAgaWYgKGJhelBhcmFtICYmIGJvb2xlYW5NYXBbYmF6UGFyYW0udmFsdWVdKSB7XG4gICAgICAgICAgICBzYW1wbGUuY29weUZpbGVzLnB1c2goXCJCYXpcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkYXJrRnJhbWVQYXJhbSA9IHByaW1hcnlQYXJhbWV0ZXJzW1wiY29weWZpbGVkYXJrZnJhbWVcIl07XG4gICAgICAgIGlmIChkYXJrRnJhbWVQYXJhbSAmJiBib29sZWFuTWFwW2RhcmtGcmFtZVBhcmFtLnZhbHVlXSkge1xuICAgICAgICAgICAgc2FtcGxlLmNvcHlGaWxlcy5wdXNoKFwiRGFya0ZyYW1lXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2FtcGxlLmF1dG9tYXRpb25QYXJhbWV0ZXJzID0gW107XG4gICAgICAgIGNvbnN0IHBhcnNlZEF1dG9tYXRpb25QYXJhbWV0ZXJzOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW47IH0gPSB7fTtcblxuICAgICAgICBjb25zdCBtb3ZpZUxlbmd0aFN0cmluZyA9IGdldChkYXRhLCBIRUFERVJTLmNvbGxlY3Rpb25UaW1lKTtcbiAgICAgICAgY29uc3QgbW92aWVMZW5ndGggPSBwYXJzZUZsb2F0KG1vdmllTGVuZ3RoU3RyaW5nKTtcbiAgICAgICAgaWYgKGlzTmFOKG1vdmllTGVuZ3RoKSkge1xuICAgICAgICAgICAgbWVzc2FnZSA9IFwiXFxcIiVzXFxcIiBpcyBub3QgYSB2YWxpZCBudW1iZXIuXCIuc3ByaW50Zihtb3ZpZUxlbmd0aFN0cmluZyk7XG4gICAgICAgIH0gZWxzZSBpZiAobW92aWVMZW5ndGggPiAzNjApIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBcIlxcXCIlc1xcXCIgZXhjZWVkcyBtYXhpbXVtIHRpbWUgb2YgMzYwIG1pbnV0ZXMuXCIuc3ByaW50Zihtb3ZpZUxlbmd0aFN0cmluZyk7XG4gICAgICAgIH0gZWxzZSBpZiAobW92aWVMZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gXCJcXFwiJXNcXFwiIGlzIGJlbG93IHRoZSBtaW5pbXVtIHRpbWUgb2YgMSBtaW51dGUuXCIuc3ByaW50Zihtb3ZpZUxlbmd0aFN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgICAgICAgIHJvdyxcbiAgICAgICAgICAgICAgICBoZWFkZXI6IEhFQURFUlMuY29sbGVjdGlvblRpbWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzYW1wbGUuYXV0b21hdGlvblBhcmFtZXRlcnMucHVzaChcbiAgICAgICAgICAgICAgICB7IG5hbWU6IFwiTW92aWVMZW5ndGhcIiwgdHlwZTogXCJEb3VibGVcIiwgdmFsdWU6IG1vdmllTGVuZ3RoU3RyaW5nIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXJzZWRBdXRvbWF0aW9uUGFyYW1ldGVyc1tcIm1vdmllbGVuZ3RoXCJdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlID0gbnVsbDtcblxuICAgICAgICBjb25zdCBhdXRvbWF0aW9uUGFyYW1ldGVycyA9IGdldFBhcmFtZXRlcnMoZ2V0KGRhdGEsIEhFQURFUlMuYXV0b21hdGlvblBhcmFtZXRlcnMpKTtcbiAgICAgICAgT2JqZWN0LmtleXMoYXV0b21hdGlvblBhcmFtZXRlcnMpLmZvckVhY2gocGFyYW1ldGVyTmFtZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbWV0ZXIgPSBhdXRvbWF0aW9uUGFyYW1ldGVyc1twYXJhbWV0ZXJOYW1lXTtcblxuICAgICAgICAgICAgaWYgKHBhcmFtZXRlci52YWxpZCkge1xuICAgICAgICAgICAgICAgIGlmICghcGFyc2VkQXV0b21hdGlvblBhcmFtZXRlcnNbcGFyYW1ldGVyTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2FtcGxlLmF1dG9tYXRpb25QYXJhbWV0ZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcGFyYW1ldGVyLnJhd05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwYXJhbWV0ZXIudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJhbWV0ZXIucmF3VmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IEhFQURFUlMuYXV0b21hdGlvblBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiXFxcIiVzXFxcIiBpcyBub3QgYSB2YWxpZCBpbnB1dCBwYXJhbWV0ZXIgZm9ybWF0LlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3ByaW50ZihwYXJhbWV0ZXIucmF3KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2FtcGxlO1xuICAgIH0pO1xuXG4gICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihtZXNzYWdlcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEZXNpZ25Nb2RlbCh7XG4gICAgICAgIG5hbWU6IHJ1bi5ydW5OYW1lLFxuICAgICAgICBzdW1tYXJ5OiBcIiVkIFNNUlQgQ2VsbCVzLCAlc1wiLnNwcmludGYoXG4gICAgICAgICAgICBydW4uc2FtcGxlcy5sZW5ndGgsXG4gICAgICAgICAgICBydW4uc2FtcGxlcy5sZW5ndGggIT09IDEgPyBcInNcIiA6IFwiXCIsXG4gICAgICAgICAgICBydW4ucnVuRGVzY3JpcHRpb25cbiAgICAgICAgKSxcbiAgICAgICAgcnVuXG4gICAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=