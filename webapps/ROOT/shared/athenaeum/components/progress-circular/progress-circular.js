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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("angular2/core");
var lang_1 = require("angular2/src/facade/lang");
var constants_1 = require("../../common/constants");
var ProgressCircular = (function () {
    function ProgressCircular(el, diameter, mode) {
        this._el = el;
        this.mode = mode || Mode.DETERMINATE;
        diameter = diameter || 48;
        var scale = diameter / 48;
        this._el.nativeElement.style[constants_1.TRANSFORM] = "scale(" + scale + ")";
    }
    ProgressCircular.clamp = function (v) {
        return Math.max(0, Math.min(100, v));
    };
    Object.defineProperty(ProgressCircular.prototype, "value", {
        get: function () {
            return (this.mode === Mode["INDETERMINATE"]) ? 0 : this._value;
        },
        set: function (v) {
            if ((this.mode !== Mode["INDETERMINATE"]) &&
                (lang_1.isPresent(v))) {
                this._value = ProgressCircular.clamp(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ProgressCircular.prototype.ngOnChanges = function (_) {
        return;
    };
    __decorate([
        core_1.HostBinding("attr.aria-valuenow"),
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ProgressCircular.prototype, "value", null);
    ProgressCircular = __decorate([
        core_1.Component({
            selector: "pb-progress-circular",
            host: {
                "[attr.role]": "'progressbar'",
                "[attr.aria-valuemin]": "'0'",
                "[attr.aria-valuemax]": "'100'"
            },
            moduleId: module.id,
            templateUrl: "progress-circular.html",
            styleUrls: ["progress-circular.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(1, core_1.Attribute("pb-diameter")),
        __param(2, core_1.Attribute("pb-mode")), 
        __metadata('design:paramtypes', [core_1.ElementRef, Object, String])
    ], ProgressCircular);
    return ProgressCircular;
}());
exports.ProgressCircular = ProgressCircular;
var Mode = {
    DETERMINATE: "determinate",
    INDETERMINATE: "indeterminate",
    BUFFER: "buffer",
    QUERY: "query"
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcHJvZ3Jlc3MtY2lyY3VsYXIvcHJvZ3Jlc3MtY2lyY3VsYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUdPLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLHFCQUFpQywwQkFBMEIsQ0FBQyxDQUFBO0FBQzVELDBCQUF3Qix3QkFBd0IsQ0FBQyxDQUFBO0FBY2pEO0lBTUksMEJBQVksRUFBYyxFQUNZLFFBQVEsRUFDWixJQUFZO1FBQzFDLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUdyQyxRQUFRLEdBQUcsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUMxQixJQUFNLEtBQUssR0FBRyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRTVCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxxQkFBUyxDQUFDLEdBQUcsV0FBUyxLQUFLLE1BQUcsQ0FBQztJQUNoRSxDQUFDO0lBR00sc0JBQUssR0FBWixVQUFhLENBQUM7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBSUQsc0JBQUksbUNBQUs7YUFBVDtZQUNJLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDbkUsQ0FBQzthQUVELFVBQVUsQ0FBQztZQUNQLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ2pDLENBQUMsZ0JBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU0Qsc0NBQVcsR0FBWCxVQUFZLENBQUM7UUFDVCxNQUFNLENBQUM7SUFTWCxDQUFDO0lBdkJEO1FBQUMsa0JBQVcsQ0FBQyxvQkFBb0IsQ0FBQztRQUNqQyxZQUFLLEVBQUU7O2lEQUFBO0lBdENaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsSUFBSSxFQUFFO2dCQUNGLGFBQWEsRUFBRSxlQUFlO2dCQUM5QixzQkFBc0IsRUFBRSxLQUFLO2dCQUM3QixzQkFBc0IsRUFBRSxPQUFPO2FBQ2xDO1lBQ0QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBQyx3QkFBd0I7WUFDcEMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7WUFDcEMsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7U0FDeEMsQ0FBQzttQkFRZSxnQkFBUyxDQUFDLGFBQWEsQ0FBQzttQkFDeEIsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7O3dCQVRuQztJQWtERix1QkFBQztBQUFELENBakRBLEFBaURDLElBQUE7QUFqRFksd0JBQWdCLG1CQWlENUIsQ0FBQTtBQUdELElBQU0sSUFBSSxHQUFHO0lBQ1QsV0FBVyxFQUFFLGFBQWE7SUFDMUIsYUFBYSxFQUFFLGVBQWU7SUFDOUIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsS0FBSyxFQUFFLE9BQU87Q0FDakIsQ0FBQyIsImZpbGUiOiJjb21wb25lbnRzL3Byb2dyZXNzLWNpcmN1bGFyL3Byb2dyZXNzLWNpcmN1bGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBBdHRyaWJ1dGUsIEVsZW1lbnRSZWYsIE9uQ2hhbmdlcyxcbiAgICBJbnB1dCwgSG9zdEJpbmRpbmdcbn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nXCI7XG5pbXBvcnQge1RSQU5TRk9STX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicGItcHJvZ3Jlc3MtY2lyY3VsYXJcIixcbiAgICBob3N0OiB7XG4gICAgICAgIFwiW2F0dHIucm9sZV1cIjogXCIncHJvZ3Jlc3NiYXInXCIsXG4gICAgICAgIFwiW2F0dHIuYXJpYS12YWx1ZW1pbl1cIjogXCInMCdcIixcbiAgICAgICAgXCJbYXR0ci5hcmlhLXZhbHVlbWF4XVwiOiBcIicxMDAnXCJcbiAgICB9LFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6XCJwcm9ncmVzcy1jaXJjdWxhci5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJwcm9ncmVzcy1jaXJjdWxhci5jc3NcIl0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc0NpcmN1bGFyICBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgbW9kZTogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIEBBdHRyaWJ1dGUoXCJwYi1kaWFtZXRlclwiKSBkaWFtZXRlcixcbiAgICAgICAgICAgICAgICBAQXR0cmlidXRlKFwicGItbW9kZVwiKSBtb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZWwgPSBlbDtcblxuICAgICAgICB0aGlzLm1vZGUgPSBtb2RlIHx8IE1vZGUuREVURVJNSU5BVEU7XG5cbiAgICAgICAgLy8gU2NhbGUgdGhlIHByb2dyZXNzIGNpcmNsZSBiYXNlZCBvbiB0aGUgZGVmYXVsdCBkaWFtZXRlci5cbiAgICAgICAgZGlhbWV0ZXIgPSBkaWFtZXRlciB8fCA0ODtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSBkaWFtZXRlciAvIDQ4O1xuXG4gICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuc3R5bGVbVFJBTlNGT1JNXSA9IGBzY2FsZSgke3NjYWxlfSlgO1xuICAgIH1cblxuICAgIC8qKiBDbGFtcHMgYSB2YWx1ZSB0byBiZSBiZXR3ZWVuIDAgYW5kIDEwMC4gKi9cbiAgICBzdGF0aWMgY2xhbXAodikge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCB2KSk7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiYXR0ci5hcmlhLXZhbHVlbm93XCIpXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5tb2RlID09PSBNb2RlW1wiSU5ERVRFUk1JTkFURVwiXSkgPyAwIDogdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHYpIHtcbiAgICAgICAgaWYgKCh0aGlzLm1vZGUgIT09IE1vZGVbXCJJTkRFVEVSTUlOQVRFXCJdKSAmJlxuICAgICAgICAgICAgICAgIChpc1ByZXNlbnQodikpKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IFByb2dyZXNzQ2lyY3VsYXIuY2xhbXAodik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhfKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gSWYgdGhlIG1vZGUgZG9lcyBub3QgdXNlIGEgdmFsdWUsIG9yIGlmIHRoZXJlIGlzIG5vIHZhbHVlLCBkbyBub3RoaW5nLlxuICAgICAgICAvKmlmICgodGhpcy5tb2RlID09IE1vZGVbXCJRVUVSWVwiXSkgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5tb2RlID09IE1vZGVbXCJJTkRFVEVSTUlOQVRFXCJdKSB8fFxuICAgICAgICAgICAgICAgIChpc0JsYW5rKHRoaXMuX3ZhbHVlKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS12YWx1ZW5vd1wiLCB0aGlzLl92YWx1ZSk7Ki9cbiAgICB9XG59XG5cbi8qKiBAZW51bSB7c3RyaW5nfSBQcm9ncmVzcy1saW5lYXIgbW9kZXMuICovXG5jb25zdCBNb2RlID0ge1xuICAgIERFVEVSTUlOQVRFOiBcImRldGVybWluYXRlXCIsXG4gICAgSU5ERVRFUk1JTkFURTogXCJpbmRldGVybWluYXRlXCIsXG4gICAgQlVGRkVSOiBcImJ1ZmZlclwiLFxuICAgIFFVRVJZOiBcInF1ZXJ5XCJcbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=