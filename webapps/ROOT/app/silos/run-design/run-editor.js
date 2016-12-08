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
var plural_pipe_1 = require("athenaeum/pipes/plural-pipe");
var accordion_1 = require("athenaeum/components/accordion/accordion");
var lookup_input_1 = require("athenaeum/components/lookup-input/lookup-input");
var modal_1 = require("athenaeum/components/modal/modal");
var well_1 = require("athenaeum/components/well/well");
var square_toggle_1 = require("athenaeum/components/square-toggle/square-toggle");
var silo_service_1 = require("../silo-service");
var run_service_1 = require("../../data/services/run-service");
var parts_service_1 = require("../../data/services/parts-service");
function PartTypeValidator(service, type) {
    return function (control) {
        if (!control.value) {
            return null;
        }
        var info = service.parseBarcode(control.value);
        if (!info) {
            return {
                invalidBarcode: {
                    barcode: control.value
                }
            };
        }
        var part = service.getPart(info.partNumber);
        if (!part || part.type !== type || part.isObsolete) {
            return {
                partType: {
                    barcode: control.value,
                    unknownPartNumber: info.partNumber
                }
            };
        }
        return null;
    };
}
var PartNameService = (function (_super) {
    __extends(PartNameService, _super);
    function PartNameService(partsService) {
        _super.call(this);
        this.partsService = partsService;
    }
    PartNameService.prototype.getLabel = function (barcode) {
        var info = this.partsService.parseBarcode(barcode);
        if (info) {
            var part = this.partsService.getPart(info.partNumber);
            if (part) {
                if (!part.isObsolete) {
                    return part.name;
                }
                else {
                    return "Part " + part.partNumber + " is obsolete";
                }
            }
        }
        if (barcode) {
            return "Invalid Barcode";
        }
        return String.EMPTY;
    };
    PartNameService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [parts_service_1.PartsService])
    ], PartNameService);
    return PartNameService;
}(lookup_input_1.LookupService));
var RunEditor = (function () {
    function RunEditor(siloService, runService, partsService, routeParams, router, builder) {
        var _this = this;
        this.designId = null;
        this.design = null;
        this.run = null;
        this.deleting = false;
        this.maxSamples = 16;
        this.insertSizes = [500, 1000, 2000, 5000, 10000, 15000, 20000];
        this.movieTimes = [30, 120, 240, 360];
        this.immobilizationTimes = ["default", 60, 120, 240];
        this.siloService = siloService;
        this.runService = runService;
        this.partsService = partsService;
        this.router = router;
        this.builder = builder;
        siloService.setState({
            buttons: [
                {
                    label: "Delete",
                    className: "btn btn-danger btn-lg",
                    isDisabled: function () {
                        if (_this.deleting) {
                            return true;
                        }
                        if (!_this.form) {
                            return true;
                        }
                        if (_this.design.reserved) {
                            return true;
                        }
                        if (_this.design.uniqueId === String.EMPTY) {
                            return true;
                        }
                        return false;
                    },
                    onClick: this.onConfirmDelete.bind(this)
                },
                {
                    label: "Cancel",
                    className: "btn btn-primary btn-lg",
                    onClick: this.onCancel.bind(this),
                    isDisabled: function () {
                        if (_this.deleting) {
                            return true;
                        }
                        if (!_this.form) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    label: "View Summary",
                    className: "btn btn-primary btn-lg",
                    onClick: this.onViewSummary.bind(this),
                    isDisabled: function () {
                        if (_this.deleting) {
                            return true;
                        }
                        if (!_this.form) {
                            return true;
                        }
                        if (_this.design.uniqueId === String.EMPTY) {
                            return true;
                        }
                        if (_this.design.reserved) {
                            return false;
                        }
                        if (_this.form.dirty) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    label: "Save",
                    className: "btn btn-primary btn-lg",
                    isDisabled: function () {
                        if (_this.deleting) {
                            return true;
                        }
                        if (!_this.form) {
                            return true;
                        }
                        if (_this.design.reserved) {
                            return true;
                        }
                        if (!_this.form.dirty) {
                            return true;
                        }
                        return !_this.form.valid;
                    },
                    onClick: this.onSave.bind(this)
                }
            ]
        });
    }
    Object.defineProperty(RunEditor.prototype, "formDisabled", {
        get: function () {
            return this.deleting || (this.design && this.design.reserved);
        },
        enumerable: true,
        configurable: true
    });
    RunEditor.prototype.ngOnInit = function () {
        this.updateLabels();
    };
    RunEditor.prototype.routerOnActivate = function (next) {
        var _this = this;
        var id = next.params["id"];
        var type = id == null ? "New" : "Edit";
        this.siloService.setState({
            title: "%s Run Design".sprintf(type)
        });
        var promise = id == null ?
            Promise.resolve(new run_service_1.DesignModel()) :
            this.runService.getDesign(id);
        return promise.then(function (model) { return _this.initializeForm(_this.builder, model); });
    };
    RunEditor.prototype.copySample = function (item, index) {
        this.addSample(item);
    };
    RunEditor.prototype.createSample = function (item) {
        this.addSample();
    };
    RunEditor.prototype.deleteSample = function (item, index) {
        this.sampleGroups.removeAt(index);
        this.sampleGroups.markAsDirty();
        this.run.samples.splice(index, 1);
        this.updateLabels();
    };
    RunEditor.prototype.createGroup = function (sample) {
        return this.builder.group({
            sampleName: [sample.sampleName, common_1.Validators.required],
            sampleDescription: [sample.sampleDescription],
            wellName: [sample.wellName],
            magBead: [sample.magBead],
            controlKit: [sample.controlKit, PartTypeValidator(this.partsService, parts_service_1.PartType.ControlKit)],
            templatePrepKit: [
                sample.templatePrepKit,
                common_1.Validators.compose([
                    common_1.Validators.required,
                    PartTypeValidator(this.partsService, parts_service_1.PartType.TemplatePrepKit)
                ])
            ],
            bindingKit: [
                sample.bindingKit,
                common_1.Validators.compose([
                    common_1.Validators.required,
                    PartTypeValidator(this.partsService, parts_service_1.PartType.BindingKit)
                ])
            ],
            sequencingKit: [
                sample.sequencingKit,
                common_1.Validators.compose([
                    common_1.Validators.required,
                    PartTypeValidator(this.partsService, parts_service_1.PartType.SequencingKit)
                ])
            ],
            insertSize: [sample.insertSize],
            movieTime: [sample.movieTime],
            immobilizationTime: [sample.immobilizationTime]
        });
    };
    RunEditor.prototype.initializeForm = function (builder, model) {
        var _this = this;
        var run = model.run;
        this.sampleGroups = builder.array(run.samples.map(function (sample) { return _this.createGroup(sample); }), function (array) {
            var wellMap = {};
            array.controls.forEach(function (sample) {
                var wellNameControl = sample.find("wellName");
                var wellName = wellNameControl.value;
                var errors = null;
                if (wellMap[wellName]) {
                    errors = {
                        wellname: {
                            duplicateName: wellName
                        }
                    };
                }
                wellNameControl.setErrors(errors, { emitEvent: false });
                wellMap[wellName] = true;
            });
            var errors = null;
            if (array.length > 16) {
                errors = {
                    maxcells: {
                        requiredLength: 16,
                        actualLength: array.length
                    }
                };
            }
            return errors;
        });
        this.form = builder.group({
            runName: [run.runName, common_1.Validators.required],
            runDescription: [run.runDescription],
            experimentName: [run.experimentName],
            experimentId: [run.experimentId, common_1.Validators.pattern("[a-zA-Z0-9-_/]*")],
            samples: this.sampleGroups
        });
        this.design = model;
        this.run = run;
        this.updateLabels();
    };
    RunEditor.prototype.addSample = function (object) {
        var model = new run_service_1.SampleModel(object);
        model.wellName = this.getNextWellName();
        model.subreadSetUuid = String.EMPTY;
        model.collectionMetadataUuid = String.EMPTY;
        this.sampleGroups.push(this.createGroup(model));
        this.sampleGroups.markAsDirty();
        this.run.samples.push(model);
        this.updateLabels();
    };
    RunEditor.prototype.getNextWellName = function () {
        if (!this.sampleGroups.length) {
            return "A01";
        }
        var wellNames = this.sampleGroups.controls.map(function (group) {
            var name = group.find("wellName").value;
            // reverse the letter/number to sort correctly
            return name.slice(1) + name.charAt(0);
        });
        wellNames.sort();
        var last = wellNames.slice(-1)[0];
        if (last === "12H") {
            return last;
        }
        var letter = last.charCodeAt(2);
        var number = parseInt(last.slice(0, 2), 10);
        if (letter < 72) {
            letter++;
        }
        else {
            letter = 65; // 65 is the code for "A"
            number++;
        }
        return "%s%02d".sprintf(String.fromCharCode(letter), number);
    };
    RunEditor.prototype.updateLabels = function () {
        if (!this.sampleGroups) {
            return;
        }
        this.cellsRequired = this.sampleGroups.length;
        this.reagentPlatesRequired = this.cellsRequired < 9 ? 1 : 2;
    };
    RunEditor.prototype.onCancel = function () {
        this.router.navigate(["../Index"]);
    };
    RunEditor.prototype.onViewSummary = function () {
        this.router.navigate(["../Summary", { id: this.design.uniqueId }]);
    };
    RunEditor.prototype.onSave = function () {
        var _this = this;
        this.design.update({
            run: this.form.value
        });
        this.runService.saveDesign(this.design).then(function (design) {
            if (_this.design.uniqueId === String.EMPTY) {
                _this.router.navigate(["EditRun", { id: design.uniqueId }]);
            }
            else {
                _this.initializeForm(_this.builder, design);
            }
        });
    };
    RunEditor.prototype.onConfirmDelete = function () {
        this.confirmDelete.show();
    };
    RunEditor.prototype.onDelete = function () {
        var _this = this;
        this.deleting = true;
        this.confirmDelete.hide();
        this.runService.deleteDesign(this.design).then(function () {
            _this.router.navigate(["Index"]);
        });
    };
    __decorate([
        core_1.ViewChild("confirmDelete"), 
        __metadata('design:type', modal_1.ModalDialog)
    ], RunEditor.prototype, "confirmDelete", void 0);
    __decorate([
        modal_1.ModalDialog.HideOnDeactivate(),
        core_1.ViewChildren(modal_1.ModalDialog), 
        __metadata('design:type', Object)
    ], RunEditor.prototype, "__dialogs", void 0);
    RunEditor = __decorate([
        core_1.Component({
            selector: "run-editor",
            moduleId: module.id,
            templateUrl: "run-editor.html",
            styleUrls: [
                "../../css/accordion-pane.css",
                "run-editor.css"
            ],
            directives: [
                common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, modal_1.MODAL_DIRECTIVES,
                accordion_1.AccordionPane, well_1.Well, square_toggle_1.SquareToggle, lookup_input_1.LookupInput
            ],
            pipes: [plural_pipe_1.PluralPipe],
            viewProviders: [
                common_1.FormBuilder, core_1.provide(lookup_input_1.LookupService, { useClass: PartNameService })
            ]
        }), 
        __metadata('design:paramtypes', [silo_service_1.SiloService, run_service_1.RunService, parts_service_1.PartsService, router_1.RouteParams, router_1.Router, common_1.FormBuilder])
    ], RunEditor);
    return RunEditor;
}());
exports.RunEditor = RunEditor;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9ydW4tZGVzaWduL3J1bi1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUJBR08sZUFBZSxDQUFDLENBQUE7QUFDdkIsdUJBQW9HLGlCQUFpQixDQUFDLENBQUE7QUFDdEgsdUJBQW9FLGlCQUFpQixDQUFDLENBQUE7QUFFdEYsNEJBQXlCLDZCQUE2QixDQUFDLENBQUE7QUFDdkQsMEJBQTRCLDBDQUEwQyxDQUFDLENBQUE7QUFDdkUsNkJBQXlDLGdEQUFnRCxDQUFDLENBQUE7QUFDMUYsc0JBQTRDLGtDQUFrQyxDQUFDLENBQUE7QUFDL0UscUJBQW1CLGdDQUFnQyxDQUFDLENBQUE7QUFDcEQsOEJBQTJCLGtEQUFrRCxDQUFDLENBQUE7QUFFOUUsNkJBQTBCLGlCQUFpQixDQUFDLENBQUE7QUFFNUMsNEJBQTJFLGlDQUFpQyxDQUFDLENBQUE7QUFDN0csOEJBQXFDLG1DQUFtQyxDQUFDLENBQUE7QUFFekUsMkJBQTJCLE9BQXFCLEVBQUUsSUFBYztJQUM1RCxNQUFNLENBQUMsVUFBVSxPQUFZO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1IsTUFBTSxDQUFDO2dCQUNILGNBQWMsRUFBRTtvQkFDWixPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUs7aUJBQ3pCO2FBQ0osQ0FBQztRQUNOLENBQUM7UUFFRCxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUks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OUIsQ0FBQztJQUVPLDRCQUFRLEdBQWhCO1FBQUEsaUJBUUM7UUFQRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVyQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTFCLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWhVRDtRQUFDLGdCQUFTLENBQUMsZUFBZSxDQUFDOztvREFBQTtJQUszQjtRQUFDLG1CQUFXLENBQUMsZ0JBQWdCLEVBQUU7UUFDOUIsbUJBQVksQ0FBQyxtQkFBVyxDQUFDOztnREFBQTtJQXZDOUI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxpQkFBaUI7WUFDOUIsU0FBUyxFQUFFO2dCQUNQLDhCQUE4QjtnQkFDOUIsZ0JBQWdCO2FBQ25CO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLHdCQUFlLEVBQUUsd0JBQWUsRUFBRSx3QkFBZ0I7Z0JBQ2xELHlCQUFhLEVBQUUsV0FBSSxFQUFFLDRCQUFZLEVBQUUsMEJBQVc7YUFDakQ7WUFDRCxLQUFLLEVBQUUsQ0FBQyx3QkFBVSxDQUFDO1lBQ25CLGFBQWEsRUFBRTtnQkFDWCxvQkFBVyxFQUFFLGNBQU8sQ0FBQyw0QkFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxDQUFDO2FBQ3JFO1NBQ0osQ0FBQzs7aUJBQUE7SUFrVkYsZ0JBQUM7QUFBRCxDQWpWQSxBQWlWQyxJQUFBO0FBalZZLGlCQUFTLFlBaVZyQixDQUFBIiwiZmlsZSI6ImFwcC9zaWxvcy9ydW4tZGVzaWduL3J1bi1lZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgUHJvdmlkZXIsIGZvcndhcmRSZWYsIHByb3ZpZGUsIEluamVjdGFibGUsXG4gICAgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW5cbn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTLCBGT1JNX0RJUkVDVElWRVMsIEZvcm1CdWlsZGVyLCBDb250cm9sR3JvdXAsIENvbnRyb2xBcnJheSwgVmFsaWRhdG9yc30gZnJvbSBcImFuZ3VsYXIyL2NvbW1vblwiO1xuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlUGFyYW1zLCBPbkFjdGl2YXRlLCBDb21wb25lbnRJbnN0cnVjdGlvbn0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuXG5pbXBvcnQge1BsdXJhbFBpcGV9IGZyb20gXCJhdGhlbmFldW0vcGlwZXMvcGx1cmFsLXBpcGVcIjtcbmltcG9ydCB7QWNjb3JkaW9uUGFuZX0gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL2FjY29yZGlvbi9hY2NvcmRpb25cIjtcbmltcG9ydCB7TG9va3VwSW5wdXQsIExvb2t1cFNlcnZpY2V9IGZyb20gXCJhdGhlbmFldW0vY29tcG9uZW50cy9sb29rdXAtaW5wdXQvbG9va3VwLWlucHV0XCI7XG5pbXBvcnQge01PREFMX0RJUkVDVElWRVMsIE1vZGFsRGlhbG9nfSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvbW9kYWwvbW9kYWxcIjtcbmltcG9ydCB7V2VsbH0gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL3dlbGwvd2VsbFwiO1xuaW1wb3J0IHtTcXVhcmVUb2dnbGV9IGZyb20gXCJhdGhlbmFldW0vY29tcG9uZW50cy9zcXVhcmUtdG9nZ2xlL3NxdWFyZS10b2dnbGVcIjtcblxuaW1wb3J0IHtTaWxvU2VydmljZX0gZnJvbSBcIi4uL3NpbG8tc2VydmljZVwiO1xuaW1wb3J0IHtTaWxvU3RhdGV9IGZyb20gXCIuLi9ydW4tZGVzaWduXCI7XG5pbXBvcnQge1J1blNlcnZpY2UsIERlc2lnbk1vZGVsLCBSdW5Nb2RlbCwgU2FtcGxlTW9kZWwsIFNhbXBsZU9iamVjdH0gZnJvbSBcIi4uLy4uL2RhdGEvc2VydmljZXMvcnVuLXNlcnZpY2VcIjtcbmltcG9ydCB7UGFydHNTZXJ2aWNlLCBQYXJ0VHlwZX0gZnJvbSBcIi4uLy4uL2RhdGEvc2VydmljZXMvcGFydHMtc2VydmljZVwiO1xuXG5mdW5jdGlvbiBQYXJ0VHlwZVZhbGlkYXRvcihzZXJ2aWNlOiBQYXJ0c1NlcnZpY2UsIHR5cGU6IFBhcnRUeXBlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250cm9sOiBhbnkpOiBhbnkge1xuICAgICAgICBpZiAoIWNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW5mbyA9IHNlcnZpY2UucGFyc2VCYXJjb2RlKGNvbnRyb2wudmFsdWUpO1xuICAgICAgICBpZiAoIWluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaW52YWxpZEJhcmNvZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgYmFyY29kZTogY29udHJvbC52YWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJ0ID0gc2VydmljZS5nZXRQYXJ0KGluZm8ucGFydE51bWJlcik7XG4gICAgICAgIGlmICghcGFydCB8fCBwYXJ0LnR5cGUgIT09IHR5cGUgfHwgcGFydC5pc09ic29sZXRlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBhcnRUeXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGJhcmNvZGU6IGNvbnRyb2wudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHVua25vd25QYXJ0TnVtYmVyOiBpbmZvLnBhcnROdW1iZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbn1cblxuQEluamVjdGFibGUoKVxuY2xhc3MgUGFydE5hbWVTZXJ2aWNlIGV4dGVuZHMgTG9va3VwU2VydmljZSB7XG4gICAgcHJpdmF0ZSBwYXJ0c1NlcnZpY2U6IFBhcnRzU2VydmljZTtcblxuICAgIGNvbnN0cnVjdG9yKHBhcnRzU2VydmljZTogUGFydHNTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGFydHNTZXJ2aWNlID0gcGFydHNTZXJ2aWNlO1xuICAgIH1cblxuICAgIGdldExhYmVsKGJhcmNvZGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB0aGlzLnBhcnRzU2VydmljZS5wYXJzZUJhcmNvZGUoYmFyY29kZSk7XG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJ0ID0gdGhpcy5wYXJ0c1NlcnZpY2UuZ2V0UGFydChpbmZvLnBhcnROdW1iZXIpO1xuICAgICAgICAgICAgaWYgKHBhcnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXBhcnQuaXNPYnNvbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFydC5uYW1lO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgUGFydCAke3BhcnQucGFydE51bWJlcn0gaXMgb2Jzb2xldGVgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYmFyY29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiSW52YWxpZCBCYXJjb2RlXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFN0cmluZy5FTVBUWTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInJ1bi1lZGl0b3JcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcInJ1bi1lZGl0b3IuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1xuICAgICAgICBcIi4uLy4uL2Nzcy9hY2NvcmRpb24tcGFuZS5jc3NcIixcbiAgICAgICAgXCJydW4tZWRpdG9yLmNzc1wiXG4gICAgXSxcbiAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgIENPUkVfRElSRUNUSVZFUywgRk9STV9ESVJFQ1RJVkVTLCBNT0RBTF9ESVJFQ1RJVkVTLFxuICAgICAgICBBY2NvcmRpb25QYW5lLCBXZWxsLCBTcXVhcmVUb2dnbGUsIExvb2t1cElucHV0XG4gICAgXSxcbiAgICBwaXBlczogW1BsdXJhbFBpcGVdLFxuICAgIHZpZXdQcm92aWRlcnM6IFtcbiAgICAgICAgRm9ybUJ1aWxkZXIsIHByb3ZpZGUoTG9va3VwU2VydmljZSwgeyB1c2VDbGFzczogUGFydE5hbWVTZXJ2aWNlIH0pXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBSdW5FZGl0b3IgaW1wbGVtZW50cyBPbkFjdGl2YXRlIHtcbiAgICBwcml2YXRlIGRlc2lnbklkOiBzdHJpbmcgPSBudWxsO1xuICAgIHByaXZhdGUgZGVzaWduOiBEZXNpZ25Nb2RlbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBydW46IFJ1bk1vZGVsID0gbnVsbDtcbiAgICBwcml2YXRlIGZvcm06IENvbnRyb2xHcm91cDtcbiAgICBwcml2YXRlIHNhbXBsZUdyb3VwczogQ29udHJvbEFycmF5O1xuXG4gICAgcHJpdmF0ZSBjZWxsc1JlcXVpcmVkOiBudW1iZXI7XG4gICAgcHJpdmF0ZSByZWFnZW50UGxhdGVzUmVxdWlyZWQ6IG51bWJlcjtcblxuICAgIHByaXZhdGUgc2lsb1NlcnZpY2U6IFNpbG9TZXJ2aWNlPFNpbG9TdGF0ZT47XG4gICAgcHJpdmF0ZSBydW5TZXJ2aWNlOiBSdW5TZXJ2aWNlO1xuICAgIHByaXZhdGUgcGFydHNTZXJ2aWNlOiBQYXJ0c1NlcnZpY2U7XG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcjtcbiAgICBwcml2YXRlIGJ1aWxkZXI6IEZvcm1CdWlsZGVyO1xuXG4gICAgQFZpZXdDaGlsZChcImNvbmZpcm1EZWxldGVcIilcbiAgICBwcml2YXRlIGNvbmZpcm1EZWxldGU6IE1vZGFsRGlhbG9nO1xuXG4gICAgcHJpdmF0ZSBkZWxldGluZyA9IGZhbHNlO1xuXG4gICAgQE1vZGFsRGlhbG9nLkhpZGVPbkRlYWN0aXZhdGUoKVxuICAgIEBWaWV3Q2hpbGRyZW4oTW9kYWxEaWFsb2cpXG4gICAgcHJpdmF0ZSBfX2RpYWxvZ3M6IGFueTtcblxuICAgIHByaXZhdGUgZ2V0IGZvcm1EaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsZXRpbmcgfHwgKHRoaXMuZGVzaWduICYmIHRoaXMuZGVzaWduLnJlc2VydmVkKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBtYXhTYW1wbGVzID0gMTY7XG5cbiAgICBwcml2YXRlIGluc2VydFNpemVzID0gWyA1MDAsIDEwMDAsIDIwMDAsIDUwMDAsIDEwMDAwLCAxNTAwMCwgMjAwMDAgXTtcbiAgICBwcml2YXRlIG1vdmllVGltZXMgPSBbIDMwLCAxMjAsIDI0MCwgMzYwIF07XG4gICAgcHJpdmF0ZSBpbW1vYmlsaXphdGlvblRpbWVzID0gWyBcImRlZmF1bHRcIiwgNjAsIDEyMCwgMjQwIF07XG5cbiAgICBjb25zdHJ1Y3RvcihzaWxvU2VydmljZTogU2lsb1NlcnZpY2U8U2lsb1N0YXRlPixcbiAgICAgICAgICAgICAgICBydW5TZXJ2aWNlOiBSdW5TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHBhcnRzU2VydmljZTogUGFydHNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHJvdXRlUGFyYW1zOiBSb3V0ZVBhcmFtcyxcbiAgICAgICAgICAgICAgICByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBidWlsZGVyOiBGb3JtQnVpbGRlcikge1xuICAgICAgICB0aGlzLnNpbG9TZXJ2aWNlID0gc2lsb1NlcnZpY2U7XG4gICAgICAgIHRoaXMucnVuU2VydmljZSA9IHJ1blNlcnZpY2U7XG4gICAgICAgIHRoaXMucGFydHNTZXJ2aWNlID0gcGFydHNTZXJ2aWNlO1xuICAgICAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcbiAgICAgICAgdGhpcy5idWlsZGVyID0gYnVpbGRlcjtcblxuICAgICAgICBzaWxvU2VydmljZS5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJEZWxldGVcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tZGFuZ2VyIGJ0bi1sZ1wiLFxuICAgICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWxldGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlc2lnbi5yZXNlcnZlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVzaWduLnVuaXF1ZUlkID09PSBTdHJpbmcuRU1QVFkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5vbkNvbmZpcm1EZWxldGUuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDYW5jZWxcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tcHJpbWFyeSBidG4tbGdcIixcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5vbkNhbmNlbC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWxldGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJWaWV3IFN1bW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tcHJpbWFyeSBidG4tbGdcIixcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5vblZpZXdTdW1tYXJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlbGV0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVzaWduLnVuaXF1ZUlkID09PSBTdHJpbmcuRU1QVFkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlc2lnbi5yZXNlcnZlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm0uZGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTYXZlXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidG4gYnRuLXByaW1hcnkgYnRuLWxnXCIsXG4gICAgICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlbGV0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVzaWduLnJlc2VydmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZm9ybS5kaXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmZvcm0udmFsaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMub25TYXZlLmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUxhYmVscygpO1xuICAgIH1cblxuICAgIHJvdXRlck9uQWN0aXZhdGUobmV4dDogQ29tcG9uZW50SW5zdHJ1Y3Rpb24pIHtcbiAgICAgICAgY29uc3QgaWQ6IHN0cmluZyA9IG5leHQucGFyYW1zW1wiaWRcIl07XG4gICAgICAgIGNvbnN0IHR5cGUgPSBpZCA9PSBudWxsID8gXCJOZXdcIiA6IFwiRWRpdFwiO1xuXG4gICAgICAgIHRoaXMuc2lsb1NlcnZpY2Uuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdGl0bGU6IFwiJXMgUnVuIERlc2lnblwiLnNwcmludGYodHlwZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IGlkID09IG51bGwgP1xuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKG5ldyBEZXNpZ25Nb2RlbCgpKSA6XG4gICAgICAgICAgICB0aGlzLnJ1blNlcnZpY2UuZ2V0RGVzaWduKGlkKVxuICAgICAgICA7XG5cbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihtb2RlbCA9PiB0aGlzLmluaXRpYWxpemVGb3JtKHRoaXMuYnVpbGRlciwgbW9kZWwpKTtcbiAgICB9XG5cbiAgICBjb3B5U2FtcGxlKGl0ZW06IFNhbXBsZU9iamVjdCwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLmFkZFNhbXBsZShpdGVtKTtcbiAgICB9XG5cbiAgICBjcmVhdGVTYW1wbGUoaXRlbTogU2FtcGxlT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuYWRkU2FtcGxlKCk7XG4gICAgfVxuXG4gICAgZGVsZXRlU2FtcGxlKGl0ZW06IFNhbXBsZU9iamVjdCwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNhbXBsZUdyb3Vwcy5yZW1vdmVBdChpbmRleCk7XG4gICAgICAgIHRoaXMuc2FtcGxlR3JvdXBzLm1hcmtBc0RpcnR5KCk7XG4gICAgICAgIHRoaXMucnVuLnNhbXBsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy51cGRhdGVMYWJlbHMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUdyb3VwKHNhbXBsZTogU2FtcGxlTW9kZWwpOiBDb250cm9sR3JvdXAge1xuICAgICAgICByZXR1cm4gdGhpcy5idWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIHNhbXBsZU5hbWU6IFtzYW1wbGUuc2FtcGxlTmFtZSwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBzYW1wbGVEZXNjcmlwdGlvbjogW3NhbXBsZS5zYW1wbGVEZXNjcmlwdGlvbl0sXG4gICAgICAgICAgICB3ZWxsTmFtZTogW3NhbXBsZS53ZWxsTmFtZV0sXG4gICAgICAgICAgICBtYWdCZWFkOiBbc2FtcGxlLm1hZ0JlYWRdLFxuICAgICAgICAgICAgY29udHJvbEtpdDogW3NhbXBsZS5jb250cm9sS2l0LCBQYXJ0VHlwZVZhbGlkYXRvcih0aGlzLnBhcnRzU2VydmljZSwgUGFydFR5cGUuQ29udHJvbEtpdCldLFxuICAgICAgICAgICAgdGVtcGxhdGVQcmVwS2l0OiBbXG4gICAgICAgICAgICAgICAgc2FtcGxlLnRlbXBsYXRlUHJlcEtpdCxcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICBQYXJ0VHlwZVZhbGlkYXRvcih0aGlzLnBhcnRzU2VydmljZSwgUGFydFR5cGUuVGVtcGxhdGVQcmVwS2l0KVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYmluZGluZ0tpdDogW1xuICAgICAgICAgICAgICAgIHNhbXBsZS5iaW5kaW5nS2l0LFxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIFBhcnRUeXBlVmFsaWRhdG9yKHRoaXMucGFydHNTZXJ2aWNlLCBQYXJ0VHlwZS5CaW5kaW5nS2l0KVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2VxdWVuY2luZ0tpdDogW1xuICAgICAgICAgICAgICAgIHNhbXBsZS5zZXF1ZW5jaW5nS2l0LFxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIFBhcnRUeXBlVmFsaWRhdG9yKHRoaXMucGFydHNTZXJ2aWNlLCBQYXJ0VHlwZS5TZXF1ZW5jaW5nS2l0KVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaW5zZXJ0U2l6ZTogW3NhbXBsZS5pbnNlcnRTaXplXSxcbiAgICAgICAgICAgIG1vdmllVGltZTogW3NhbXBsZS5tb3ZpZVRpbWVdLFxuICAgICAgICAgICAgaW1tb2JpbGl6YXRpb25UaW1lOiBbc2FtcGxlLmltbW9iaWxpemF0aW9uVGltZV1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplRm9ybShidWlsZGVyOiBGb3JtQnVpbGRlciwgbW9kZWw6IERlc2lnbk1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHJ1biA9IG1vZGVsLnJ1bjtcblxuICAgICAgICB0aGlzLnNhbXBsZUdyb3VwcyA9IGJ1aWxkZXIuYXJyYXkoXG4gICAgICAgICAgICBydW4uc2FtcGxlcy5tYXAoKHNhbXBsZSkgPT4gdGhpcy5jcmVhdGVHcm91cChzYW1wbGUpKSxcbiAgICAgICAgICAgIChhcnJheTogQ29udHJvbEFycmF5KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2VsbE1hcDogeyBba2V5OiBzdHJpbmddOiBib29sZWFuOyB9ID0ge307XG4gICAgICAgICAgICAgICAgYXJyYXkuY29udHJvbHMuZm9yRWFjaCgoc2FtcGxlOiBDb250cm9sR3JvdXApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2VsbE5hbWVDb250cm9sID0gc2FtcGxlLmZpbmQoXCJ3ZWxsTmFtZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2VsbE5hbWU6IHN0cmluZyA9IHdlbGxOYW1lQ29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9ycyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3ZWxsTWFwW3dlbGxOYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlbGxuYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cGxpY2F0ZU5hbWU6IHdlbGxOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3ZWxsTmFtZUNvbnRyb2wuc2V0RXJyb3JzKFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBlbWl0RXZlbnQ6IGZhbHNlIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgd2VsbE1hcFt3ZWxsTmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IGVycm9yczogeyBba2V5OiBzdHJpbmddOiBhbnk7IH0gPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChhcnJheS5sZW5ndGggPiAxNikge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhjZWxsczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkTGVuZ3RoOiAxNixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWxMZW5ndGg6IGFycmF5Lmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JzO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvcm0gPSBidWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIHJ1bk5hbWU6IFtydW4ucnVuTmFtZSwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBydW5EZXNjcmlwdGlvbjogW3J1bi5ydW5EZXNjcmlwdGlvbl0sXG4gICAgICAgICAgICBleHBlcmltZW50TmFtZTogW3J1bi5leHBlcmltZW50TmFtZV0sXG4gICAgICAgICAgICBleHBlcmltZW50SWQ6IFtydW4uZXhwZXJpbWVudElkLCBWYWxpZGF0b3JzLnBhdHRlcm4oXCJbYS16QS1aMC05LV8vXSpcIildLFxuICAgICAgICAgICAgc2FtcGxlczogdGhpcy5zYW1wbGVHcm91cHNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kZXNpZ24gPSBtb2RlbDtcbiAgICAgICAgdGhpcy5ydW4gPSBydW47XG5cbiAgICAgICAgdGhpcy51cGRhdGVMYWJlbHMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFNhbXBsZShvYmplY3Q/OiBTYW1wbGVPYmplY3QpIHtcbiAgICAgICAgY29uc3QgbW9kZWwgPSBuZXcgU2FtcGxlTW9kZWwob2JqZWN0KTtcbiAgICAgICAgbW9kZWwud2VsbE5hbWUgPSB0aGlzLmdldE5leHRXZWxsTmFtZSgpO1xuICAgICAgICBtb2RlbC5zdWJyZWFkU2V0VXVpZCA9IFN0cmluZy5FTVBUWTtcbiAgICAgICAgbW9kZWwuY29sbGVjdGlvbk1ldGFkYXRhVXVpZCA9IFN0cmluZy5FTVBUWTtcbiAgICAgICAgdGhpcy5zYW1wbGVHcm91cHMucHVzaChcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JvdXAobW9kZWwpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2FtcGxlR3JvdXBzLm1hcmtBc0RpcnR5KCk7XG4gICAgICAgIHRoaXMucnVuLnNhbXBsZXMucHVzaChtb2RlbCk7XG4gICAgICAgIHRoaXMudXBkYXRlTGFiZWxzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXROZXh0V2VsbE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLnNhbXBsZUdyb3Vwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBcIkEwMVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgd2VsbE5hbWVzID0gdGhpcy5zYW1wbGVHcm91cHMuY29udHJvbHMubWFwKChncm91cCk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZ3JvdXAuZmluZChcIndlbGxOYW1lXCIpLnZhbHVlO1xuXG4gICAgICAgICAgICAvLyByZXZlcnNlIHRoZSBsZXR0ZXIvbnVtYmVyIHRvIHNvcnQgY29ycmVjdGx5XG4gICAgICAgICAgICByZXR1cm4gbmFtZS5zbGljZSgxKSArIG5hbWUuY2hhckF0KDApO1xuICAgICAgICB9KTtcbiAgICAgICAgd2VsbE5hbWVzLnNvcnQoKTtcblxuICAgICAgICBjb25zdCBsYXN0ID0gd2VsbE5hbWVzLnNsaWNlKC0xKVswXTtcblxuICAgICAgICBpZiAobGFzdCA9PT0gXCIxMkhcIikge1xuICAgICAgICAgICAgcmV0dXJuIGxhc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGV0dGVyID0gbGFzdC5jaGFyQ29kZUF0KDIpO1xuICAgICAgICBsZXQgbnVtYmVyID0gcGFyc2VJbnQobGFzdC5zbGljZSgwLCAyKSwgMTApO1xuXG4gICAgICAgIGlmIChsZXR0ZXIgPCA3MikgeyAvLyA3MiBpcyB0aGUgY29kZSBmb3IgXCJIXCJcbiAgICAgICAgICAgIGxldHRlcisrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0dGVyID0gNjU7IC8vIDY1IGlzIHRoZSBjb2RlIGZvciBcIkFcIlxuICAgICAgICAgICAgbnVtYmVyKys7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gXCIlcyUwMmRcIi5zcHJpbnRmKFN0cmluZy5mcm9tQ2hhckNvZGUobGV0dGVyKSwgbnVtYmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUxhYmVscygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNhbXBsZUdyb3Vwcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2VsbHNSZXF1aXJlZCA9IHRoaXMuc2FtcGxlR3JvdXBzLmxlbmd0aDtcbiAgICAgICAgdGhpcy5yZWFnZW50UGxhdGVzUmVxdWlyZWQgPSB0aGlzLmNlbGxzUmVxdWlyZWQgPCA5ID8gMSA6IDI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiLi4vSW5kZXhcIl0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25WaWV3U3VtbWFyeSgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiLi4vU3VtbWFyeVwiLCB7IGlkOiB0aGlzLmRlc2lnbi51bmlxdWVJZCB9XSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNhdmUoKSB7XG4gICAgICAgIHRoaXMuZGVzaWduLnVwZGF0ZSh7XG4gICAgICAgICAgICBydW46IHRoaXMuZm9ybS52YWx1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJ1blNlcnZpY2Uuc2F2ZURlc2lnbih0aGlzLmRlc2lnbikudGhlbihkZXNpZ24gPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVzaWduLnVuaXF1ZUlkID09PSBTdHJpbmcuRU1QVFkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJFZGl0UnVuXCIsIHsgaWQ6IGRlc2lnbi51bmlxdWVJZCB9XSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUZvcm0odGhpcy5idWlsZGVyLCBkZXNpZ24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29uZmlybURlbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5jb25maXJtRGVsZXRlLnNob3coKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRGVsZXRlKCkge1xuICAgICAgICB0aGlzLmRlbGV0aW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmNvbmZpcm1EZWxldGUuaGlkZSgpO1xuXG4gICAgICAgIHRoaXMucnVuU2VydmljZS5kZWxldGVEZXNpZ24odGhpcy5kZXNpZ24pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiSW5kZXhcIl0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=