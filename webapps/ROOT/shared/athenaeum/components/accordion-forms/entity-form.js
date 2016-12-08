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
var well_1 = require("../well/well");
var lookup_input_1 = require("../lookup-input/lookup-input");
var square_toggle_1 = require("../square-toggle/square-toggle");
var entityFormProvider = new core_1.Provider(common_1.ControlContainer, {
    useExisting: core_1.forwardRef(function () { return EntityForm; })
});
var EntityForm = (function (_super) {
    __extends(EntityForm, _super);
    function EntityForm(container) {
        _super.call(this);
        this.disabled = false;
        this.container = container;
    }
    Object.defineProperty(EntityForm.prototype, "control", {
        get: function () {
            return this.container.control;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityForm.prototype, "formDirective", {
        get: function () {
            return this.container.formDirective;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityForm.prototype, "path", {
        get: function () {
            return this.container.path;
        },
        enumerable: true,
        configurable: true
    });
    EntityForm.prototype.ngOnInit = function () {
        this.group = this.container.control;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EntityForm.prototype, "entity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EntityForm.prototype, "fields", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EntityForm.prototype, "disabled", void 0);
    EntityForm = __decorate([
        core_1.Component({
            selector: "pb-entity-form",
            moduleId: module.id,
            templateUrl: "entity-form.html",
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, well_1.Well, lookup_input_1.LookupInput, square_toggle_1.SquareToggle],
            viewProviders: [entityFormProvider]
        }),
        __param(0, core_1.Host()),
        __param(0, core_1.SkipSelf()), 
        __metadata('design:paramtypes', [common_1.ControlContainer])
    ], EntityForm);
    return EntityForm;
}(common_1.ControlContainer));
exports.EntityForm = EntityForm;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYWNjb3JkaW9uLWZvcm1zL2VudGl0eS1mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUF3RixlQUFlLENBQUMsQ0FBQTtBQUN4Ryx1QkFBK0UsaUJBQWlCLENBQUMsQ0FBQTtBQUVqRyxxQkFBbUIsY0FBYyxDQUFDLENBQUE7QUFDbEMsNkJBQTBCLDhCQUE4QixDQUFDLENBQUE7QUFDekQsOEJBQTJCLGdDQUFnQyxDQUFDLENBQUE7QUFFNUQsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLGVBQVEsQ0FDbkMseUJBQWdCLEVBQ2hCO0lBQ0ksV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLFVBQVUsRUFBVixDQUFVLENBQUM7Q0FDNUMsQ0FDSixDQUFDO0FBU0Y7SUFBbUMsOEJBQWdCO0lBeUIvQyxvQkFBZ0MsU0FBMkI7UUFDdkQsaUJBQU8sQ0FBQztRQWxCWixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBb0JiLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFuQkQsc0JBQUksK0JBQU87YUFBWDtZQUNJLE1BQU0sQ0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHFDQUFhO2FBQWpCO1lBQ0ksTUFBTSxDQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQzlDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNEJBQUk7YUFBUjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUMvQixDQUFDOzs7T0FBQTtJQVdELDZCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO0lBQzlDLENBQUM7SUFoQ0Q7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBR1I7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBR1I7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBZFo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGtCQUFrQjtZQUMvQixVQUFVLEVBQUUsQ0FBQyx3QkFBZSxFQUFFLHdCQUFlLEVBQUUsV0FBSSxFQUFFLDBCQUFXLEVBQUUsNEJBQVksQ0FBQztZQUMvRSxhQUFhLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUN0QyxDQUFDO21CQTBCZSxXQUFJLEVBQUU7bUJBQUUsZUFBUSxFQUFFOztrQkExQmpDO0lBbUNGLGlCQUFDO0FBQUQsQ0FsQ0EsQUFrQ0MsQ0FsQ2tDLHlCQUFnQixHQWtDbEQ7QUFsQ1ksa0JBQVUsYUFrQ3RCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9hY2NvcmRpb24tZm9ybXMvZW50aXR5LWZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIElucHV0LCBIb3N0LCBTa2lwU2VsZiwgUHJvdmlkZXIsIGZvcndhcmRSZWZ9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge0NPUkVfRElSRUNUSVZFUywgRk9STV9ESVJFQ1RJVkVTLCBDb250cm9sQ29udGFpbmVyLCBDb250cm9sR3JvdXB9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcbmltcG9ydCB7RmllbGREZWZpbml0aW9ufSBmcm9tIFwiLi9mb3JtLWRlZmluaXRpb25cIjtcbmltcG9ydCB7V2VsbH0gZnJvbSBcIi4uL3dlbGwvd2VsbFwiO1xuaW1wb3J0IHtMb29rdXBJbnB1dH0gZnJvbSBcIi4uL2xvb2t1cC1pbnB1dC9sb29rdXAtaW5wdXRcIjtcbmltcG9ydCB7U3F1YXJlVG9nZ2xlfSBmcm9tIFwiLi4vc3F1YXJlLXRvZ2dsZS9zcXVhcmUtdG9nZ2xlXCI7XG5cbmNvbnN0IGVudGl0eUZvcm1Qcm92aWRlciA9IG5ldyBQcm92aWRlcihcbiAgICBDb250cm9sQ29udGFpbmVyLFxuICAgIHtcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRW50aXR5Rm9ybSlcbiAgICB9XG4pO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwYi1lbnRpdHktZm9ybVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiZW50aXR5LWZvcm0uaHRtbFwiLFxuICAgIGRpcmVjdGl2ZXM6IFtDT1JFX0RJUkVDVElWRVMsIEZPUk1fRElSRUNUSVZFUywgV2VsbCwgTG9va3VwSW5wdXQsIFNxdWFyZVRvZ2dsZV0sXG4gICAgdmlld1Byb3ZpZGVyczogW2VudGl0eUZvcm1Qcm92aWRlcl1cbn0pXG5leHBvcnQgY2xhc3MgRW50aXR5Rm9ybTxUPiBleHRlbmRzIENvbnRyb2xDb250YWluZXIge1xuICAgIEBJbnB1dCgpXG4gICAgZW50aXR5OiBUO1xuXG4gICAgQElucHV0KClcbiAgICBmaWVsZHM6IEZpZWxkRGVmaW5pdGlvbltdO1xuXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgZ2V0IGNvbnRyb2woKTogQ29udHJvbEdyb3VwIHtcbiAgICAgICAgcmV0dXJuIDxhbnk+IHRoaXMuY29udGFpbmVyLmNvbnRyb2w7XG4gICAgfVxuXG4gICAgZ2V0IGZvcm1EaXJlY3RpdmUoKSB7XG4gICAgICAgIHJldHVybiA8YW55PiB0aGlzLmNvbnRhaW5lci5mb3JtRGlyZWN0aXZlO1xuICAgIH1cblxuICAgIGdldCBwYXRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIucGF0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnRhaW5lcjogQ29udHJvbENvbnRhaW5lcjtcbiAgICBwcml2YXRlIGdyb3VwOiBDb250cm9sR3JvdXA7XG5cbiAgICBjb25zdHJ1Y3RvcihASG9zdCgpIEBTa2lwU2VsZigpIGNvbnRhaW5lcjogQ29udHJvbENvbnRhaW5lcikge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmdyb3VwID0gPGFueT4gdGhpcy5jb250YWluZXIuY29udHJvbDtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=