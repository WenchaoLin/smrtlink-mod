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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("angular2/core");
var common_1 = require("angular2/common");
var accordion_1 = require("../accordion/accordion");
var entity_form_1 = require("./entity-form");
var AccordionFormsController = (function () {
    function AccordionFormsController(builder) {
        this.builder = builder;
    }
    AccordionFormsController.provide = function (fn) {
        return new core_1.Provider(AccordionFormsController, {
            useExisting: core_1.forwardRef(fn)
        });
    };
    AccordionFormsController.prototype.afCopy = function (item, index) { };
    AccordionFormsController.prototype.afCreate = function (item, index) { };
    AccordionFormsController.prototype.afUpdate = function (item, index) { };
    AccordionFormsController.prototype.afDelete = function (item, index) { };
    AccordionFormsController.prototype.afCreateGroup = function (entity) {
        var _this = this;
        var formGroup = this.afFields.map(function (definition) {
            var control = _this.builder.control(entity[definition.field], definition.validator);
            return [definition.field, control];
        }).reduce(function (controls, _a) {
            var key = _a[0], control = _a[1];
            controls[key] = control;
            return controls;
        }, {});
        return this.builder.group(formGroup);
    };
    return AccordionFormsController;
}());
exports.AccordionFormsController = AccordionFormsController;
var accordionFormsProvider = new core_1.Provider(common_1.ControlContainer, {
    useExisting: core_1.forwardRef(function () { return AccordionForms; })
});
var AccordionForms = (function (_super) {
    __extends(AccordionForms, _super);
    function AccordionForms(validators, asyncValidators, controller, builder, copy, create, del, update) {
        _super.call(this, validators, asyncValidators);
        this.buttonLabels = {
            update: "Update",
            copy: "Copy",
            create: "Create",
            delete: "Delete"
        };
        this.maxItems = Infinity;
        this.exclusive = false;
        this.disabled = false;
        this.controller = controller;
        this.builder = builder;
        this.actions = {
            copy: copy !== null,
            create: create !== null,
            delete: del !== null,
            update: update !== null
        };
    }
    Object.defineProperty(AccordionForms.prototype, "form", {
        get: function () {
            return this.array;
        },
        set: function (form) {
            this.array = form;
            this.groups = this.array ? this.array.controls : null;
        },
        enumerable: true,
        configurable: true
    });
    AccordionForms.prototype.ngOnInit = function () {
        if (!this.form) {
            throw new Error("pb-accordion-forms must be passed 'formArray'");
        }
    };
    __decorate([
        core_1.Input("formArray"), 
        __metadata('design:type', common_1.ControlGroup)
    ], AccordionForms.prototype, "form", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AccordionForms.prototype, "buttonLabels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AccordionForms.prototype, "maxItems", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AccordionForms.prototype, "exclusive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AccordionForms.prototype, "disabled", void 0);
    AccordionForms = __decorate([
        core_1.Component({
            selector: "pb-accordion-forms",
            moduleId: module.id,
            encapsulation: core_1.ViewEncapsulation.None,
            templateUrl: "accordion-forms.html",
            styleUrls: ["accordion-forms.css"],
            directives: [common_1.CORE_DIRECTIVES, accordion_1.ACCORDION_DIRECTIVES, common_1.FORM_DIRECTIVES, entity_form_1.EntityForm],
            viewProviders: [accordionFormsProvider]
        }),
        __param(0, core_1.Optional()),
        __param(0, core_1.Self()),
        __param(0, core_1.Inject(common_1.NG_VALIDATORS)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Self()),
        __param(1, core_1.Inject(common_1.NG_ASYNC_VALIDATORS)),
        __param(2, core_1.Host()),
        __param(2, core_1.SkipSelf()),
        __param(4, core_1.Attribute("copy")),
        __param(5, core_1.Attribute("create")),
        __param(6, core_1.Attribute("delete")),
        __param(7, core_1.Attribute("update")), 
        __metadata('design:paramtypes', [Array, Array, AccordionFormsController, common_1.FormBuilder, Object, Object, Object, Object])
    ], AccordionForms);
    return AccordionForms;
}(common_1.NgFormModel));
exports.AccordionForms = AccordionForms;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYWNjb3JkaW9uLWZvcm1zL2FjY29yZGlvbi1mb3Jtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFHTyxlQUFlLENBQUMsQ0FBQTtBQUN2Qix1QkFHTyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pCLDBCQUFtQyx3QkFBd0IsQ0FBQyxDQUFBO0FBRTVELDRCQUF5QixlQUFlLENBQUMsQ0FBQTtBQWdCekM7SUFLSSxrQ0FBWSxPQUFvQjtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRU0sZ0NBQU8sR0FBZCxVQUFlLEVBQWM7UUFDekIsTUFBTSxDQUFDLElBQUksZUFBUSxDQUNmLHdCQUF3QixFQUN4QjtZQUNJLFdBQVcsRUFBRSxpQkFBVSxDQUFDLEVBQUUsQ0FBQztTQUM5QixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQseUNBQU0sR0FBTixVQUFPLElBQU8sRUFBRSxLQUFhLElBQWdCLENBQUM7SUFDOUMsMkNBQVEsR0FBUixVQUFTLElBQU8sRUFBRSxLQUFhLElBQWdCLENBQUM7SUFDaEQsMkNBQVEsR0FBUixVQUFTLElBQU8sRUFBRSxLQUFhLElBQWdCLENBQUM7SUFDaEQsMkNBQVEsR0FBUixVQUFTLElBQU8sRUFBRSxLQUFhLElBQWdCLENBQUM7SUFJdEMsZ0RBQWEsR0FBdkIsVUFBd0IsTUFBUztRQUFqQyxpQkFpQkM7UUFoQkcsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxVQUFVO1lBQzNDLElBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUNoQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUN4QixVQUFVLENBQUMsU0FBUyxDQUN2QixDQUFDO1lBRUYsTUFBTSxDQUFDLENBQUUsVUFBVSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUUsQ0FBQztRQUN6QyxD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QUFFLFdBQUksRUFBRTttQkFBRSxhQUFNLENBQUMsc0JBQWEsQ0FBQzttQkFDekMsZUFBUSxFQUFFO21CQUFFLFdBQUksRUFBRTttQkFBRSxhQUFNLENBQUMsNEJBQW1CLENBQUM7bUJBQy9DLFdBQUksRUFBRTttQkFBRSxlQUFRLEVBQUU7bUJBRWxCLGdCQUFTLENBQUMsTUFBTSxDQUFDO21CQUNqQixnQkFBUyxDQUFDLFFBQVEsQ0FBQzttQkFDbkIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7bUJBQ25CLGdCQUFTLENBQUMsUUFBUSxDQUFDOztzQkExQ2xDO0lBNkRGLHFCQUFDO0FBQUQsQ0E1REEsQUE0REMsQ0E1RHNDLG9CQUFXLEdBNERqRDtBQTVEWSxzQkFBYyxpQkE0RDFCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9hY2NvcmRpb24tZm9ybXMvYWNjb3JkaW9uLWZvcm1zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIElucHV0LCBBdHRyaWJ1dGUsIFZpZXdFbmNhcHN1bGF0aW9uLCBIb3N0LCBTa2lwU2VsZiwgU2VsZixcbiAgICBQcm92aWRlciwgZm9yd2FyZFJlZiwgVHlwZSwgT3B0aW9uYWwsIEluamVjdFxufSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBDT1JFX0RJUkVDVElWRVMsIEZPUk1fRElSRUNUSVZFUywgQ29udHJvbENvbnRhaW5lciwgQ29udHJvbEFycmF5LCBDb250cm9sLFxuICAgIENvbnRyb2xHcm91cCwgRm9ybUJ1aWxkZXIsIE5nRm9ybU1vZGVsLCBOR19WQUxJREFUT1JTLCBOR19BU1lOQ19WQUxJREFUT1JTXG59IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcbmltcG9ydCB7QUNDT1JESU9OX0RJUkVDVElWRVN9IGZyb20gXCIuLi9hY2NvcmRpb24vYWNjb3JkaW9uXCI7XG5pbXBvcnQge0ZpZWxkRGVmaW5pdGlvbn0gZnJvbSBcIi4vZm9ybS1kZWZpbml0aW9uXCI7XG5pbXBvcnQge0VudGl0eUZvcm19IGZyb20gXCIuL2VudGl0eS1mb3JtXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWNjb3JkaW9uRm9ybXNBY3Rpb25zIHtcbiAgICBjb3B5OiBib29sZWFuO1xuICAgIGNyZWF0ZTogYm9vbGVhbjtcbiAgICBkZWxldGU6IGJvb2xlYW47XG4gICAgdXBkYXRlOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFjY29yZGlvbkZvcm1zTGFiZWxzIHtcbiAgICBjb3B5OiBzdHJpbmc7XG4gICAgY3JlYXRlOiBzdHJpbmc7XG4gICAgZGVsZXRlOiBzdHJpbmc7XG4gICAgdXBkYXRlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBY2NvcmRpb25Gb3Jtc0NvbnRyb2xsZXI8VD4ge1xuICAgIGFmRmllbGRzOiBGaWVsZERlZmluaXRpb25bXTtcblxuICAgIHByb3RlY3RlZCBidWlsZGVyOiBGb3JtQnVpbGRlcjtcblxuICAgIGNvbnN0cnVjdG9yKGJ1aWxkZXI6IEZvcm1CdWlsZGVyKSB7XG4gICAgICAgIHRoaXMuYnVpbGRlciA9IGJ1aWxkZXI7XG4gICAgfVxuXG4gICAgc3RhdGljIHByb3ZpZGUoZm46ICgpID0+IFR5cGUpOiBQcm92aWRlciB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvdmlkZXIoXG4gICAgICAgICAgICBBY2NvcmRpb25Gb3Jtc0NvbnRyb2xsZXIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoZm4pXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYWZDb3B5KGl0ZW06IFQsIGluZGV4OiBudW1iZXIpIHsgLyogYmxhbmsgKi8gfVxuICAgIGFmQ3JlYXRlKGl0ZW06IFQsIGluZGV4OiBudW1iZXIpIHsgLyogYmxhbmsgKi8gfVxuICAgIGFmVXBkYXRlKGl0ZW06IFQsIGluZGV4OiBudW1iZXIpIHsgLyogYmxhbmsgKi8gfVxuICAgIGFmRGVsZXRlKGl0ZW06IFQsIGluZGV4OiBudW1iZXIpIHsgLyogYmxhbmsgKi8gfVxuXG4gICAgYWJzdHJhY3QgYWZTdW1tYXJpemUoaXRlbTogVCwgaW5kZXg6IG51bWJlcik6IHN0cmluZztcblxuICAgIHByb3RlY3RlZCBhZkNyZWF0ZUdyb3VwKGVudGl0eTogVCkge1xuICAgICAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLmFmRmllbGRzLm1hcCgoZGVmaW5pdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuYnVpbGRlci5jb250cm9sKFxuICAgICAgICAgICAgICAgIGVudGl0eVtkZWZpbml0aW9uLmZpZWxkXSxcbiAgICAgICAgICAgICAgICBkZWZpbml0aW9uLnZhbGlkYXRvclxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIFsgZGVmaW5pdGlvbi5maWVsZCwgY29udHJvbCBdO1xuICAgICAgICB9KS5yZWR1Y2U8eyBba2V5OiBzdHJpbmddOiBDb250cm9sIH0+KFxuICAgICAgICAgICAgKGNvbnRyb2xzLCBba2V5LCBjb250cm9sXTogW3N0cmluZywgQ29udHJvbF0pID0+IHtcbiAgICAgICAgICAgICAgICBjb250cm9sc1trZXldID0gY29udHJvbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbHM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge31cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5idWlsZGVyLmdyb3VwKGZvcm1Hcm91cCk7XG4gICAgfVxufVxuXG5jb25zdCBhY2NvcmRpb25Gb3Jtc1Byb3ZpZGVyID0gbmV3IFByb3ZpZGVyKFxuICAgIENvbnRyb2xDb250YWluZXIsXG4gICAge1xuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBY2NvcmRpb25Gb3JtcylcbiAgICB9XG4pO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwYi1hY2NvcmRpb24tZm9ybXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGVVcmw6IFwiYWNjb3JkaW9uLWZvcm1zLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsgXCJhY2NvcmRpb24tZm9ybXMuY3NzXCIgXSxcbiAgICBkaXJlY3RpdmVzOiBbIENPUkVfRElSRUNUSVZFUywgQUNDT1JESU9OX0RJUkVDVElWRVMsIEZPUk1fRElSRUNUSVZFUywgRW50aXR5Rm9ybSBdLFxuICAgIHZpZXdQcm92aWRlcnM6IFthY2NvcmRpb25Gb3Jtc1Byb3ZpZGVyXVxufSlcbmV4cG9ydCBjbGFzcyBBY2NvcmRpb25Gb3JtczxUPiBleHRlbmRzIE5nRm9ybU1vZGVsIHtcbiAgICBASW5wdXQoXCJmb3JtQXJyYXlcIilcbiAgICBnZXQgZm9ybSgpOiBDb250cm9sR3JvdXAge1xuICAgICAgICByZXR1cm4gPGFueT4gdGhpcy5hcnJheTtcbiAgICB9XG5cbiAgICBzZXQgZm9ybShmb3JtOiBDb250cm9sR3JvdXApIHtcbiAgICAgICAgdGhpcy5hcnJheSA9IDxhbnk+IGZvcm07XG4gICAgICAgIHRoaXMuZ3JvdXBzID0gdGhpcy5hcnJheSA/IDxhbnk+IHRoaXMuYXJyYXkuY29udHJvbHMgOiBudWxsO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgYnV0dG9uTGFiZWxzOiBBY2NvcmRpb25Gb3Jtc0xhYmVscyA9IHtcbiAgICAgICAgdXBkYXRlOiBcIlVwZGF0ZVwiLFxuICAgICAgICBjb3B5OiBcIkNvcHlcIixcbiAgICAgICAgY3JlYXRlOiBcIkNyZWF0ZVwiLFxuICAgICAgICBkZWxldGU6IFwiRGVsZXRlXCJcbiAgICB9O1xuXG4gICAgQElucHV0KClcbiAgICBtYXhJdGVtcyA9IEluZmluaXR5O1xuXG4gICAgQElucHV0KClcbiAgICBleGNsdXNpdmUgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgYWN0aW9uczogQWNjb3JkaW9uRm9ybXNBY3Rpb25zO1xuICAgIHByaXZhdGUgYXJyYXk6IENvbnRyb2xBcnJheTtcbiAgICBwcml2YXRlIGJ1aWxkZXI6IEZvcm1CdWlsZGVyO1xuICAgIHByaXZhdGUgY29udHJvbGxlcjogQWNjb3JkaW9uRm9ybXNDb250cm9sbGVyPFQ+O1xuICAgIHByaXZhdGUgZ3JvdXBzOiBDb250cm9sR3JvdXBbXTtcblxuICAgIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19WQUxJREFUT1JTKSB2YWxpZGF0b3JzOiBhbnlbXSxcbiAgICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIEBJbmplY3QoTkdfQVNZTkNfVkFMSURBVE9SUykgYXN5bmNWYWxpZGF0b3JzOiBhbnlbXSxcbiAgICAgICAgICAgICAgICBASG9zdCgpIEBTa2lwU2VsZigpIGNvbnRyb2xsZXI6IEFjY29yZGlvbkZvcm1zQ29udHJvbGxlcjxUPixcbiAgICAgICAgICAgICAgICBidWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICAgICAgICAgICAgICBAQXR0cmlidXRlKFwiY29weVwiKSBjb3B5LFxuICAgICAgICAgICAgICAgIEBBdHRyaWJ1dGUoXCJjcmVhdGVcIikgY3JlYXRlLFxuICAgICAgICAgICAgICAgIEBBdHRyaWJ1dGUoXCJkZWxldGVcIikgZGVsLFxuICAgICAgICAgICAgICAgIEBBdHRyaWJ1dGUoXCJ1cGRhdGVcIikgdXBkYXRlKSB7XG4gICAgICAgIHN1cGVyKHZhbGlkYXRvcnMsIGFzeW5jVmFsaWRhdG9ycyk7XG5cbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gY29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5idWlsZGVyID0gYnVpbGRlcjtcblxuICAgICAgICB0aGlzLmFjdGlvbnMgPSB7XG4gICAgICAgICAgICBjb3B5OiBjb3B5ICE9PSBudWxsLFxuICAgICAgICAgICAgY3JlYXRlOiBjcmVhdGUgIT09IG51bGwsXG4gICAgICAgICAgICBkZWxldGU6IGRlbCAhPT0gbnVsbCxcbiAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlICE9PSBudWxsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5mb3JtKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwYi1hY2NvcmRpb24tZm9ybXMgbXVzdCBiZSBwYXNzZWQgJ2Zvcm1BcnJheSdcIik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=