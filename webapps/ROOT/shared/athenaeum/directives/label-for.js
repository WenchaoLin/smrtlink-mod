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
var common_1 = require("angular2/common");
var LabelFor = (function () {
    function LabelFor(el, form, labelFor) {
        var _this = this;
        this._el = el;
        this._form = form;
        this.controlPath = labelFor;
        setTimeout(function () {
            _this._el.nativeElement.htmlFor = _this.controlPath;
        }, 100);
    }
    __decorate([
        core_1.Input("for"), 
        __metadata('design:type', String)
    ], LabelFor.prototype, "controlPath", void 0);
    LabelFor = __decorate([
        core_1.Directive({
            selector: "[for]"
        }),
        __param(1, core_1.Host()),
        __param(2, core_1.Attribute("for")), 
        __metadata('design:paramtypes', [core_1.ElementRef, common_1.NgFormModel, String])
    ], LabelFor);
    return LabelFor;
}());
exports.LabelFor = LabelFor;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbGFiZWwtZm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFBNEQsZUFBZSxDQUFDLENBQUE7QUFDNUUsdUJBQTBCLGlCQUFpQixDQUFDLENBQUE7QUFLNUM7SUFNSSxrQkFBWSxFQUFjLEVBQ04sSUFBaUIsRUFDUCxRQUFnQjtRQVJsRCxpQkFtQkM7UUFWTyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1FBRTVCLFVBQVUsQ0FBQztZQUNJLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3RELENBQUMsRUFDRCxHQUFHLENBQ2IsQ0FBQztJQUNOLENBQUM7SUFqQkQ7UUFBQyxZQUFLLENBQUMsS0FBSyxDQUFDOztpREFBQTtJQUpqQjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsT0FBTztTQUNwQixDQUFDO21CQVFlLFdBQUksRUFBRTttQkFDTixnQkFBUyxDQUFDLEtBQUssQ0FBQzs7Z0JBVC9CO0lBb0JGLGVBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBbkJZLGdCQUFRLFdBbUJwQixDQUFBIiwiZmlsZSI6ImRpcmVjdGl2ZXMvbGFiZWwtZm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEF0dHJpYnV0ZSwgSG9zdCwgSW5wdXR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge05nRm9ybU1vZGVsfSBmcm9tIFwiYW5ndWxhcjIvY29tbW9uXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltmb3JdXCJcbn0pXG5leHBvcnQgY2xhc3MgTGFiZWxGb3Ige1xuICAgIEBJbnB1dChcImZvclwiKSBwdWJsaWMgY29udHJvbFBhdGg6IHN0cmluZztcblxuICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmO1xuICAgIHByaXZhdGUgX2Zvcm06IE5nRm9ybU1vZGVsO1xuXG4gICAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgQEhvc3QoKSBmb3JtOiBOZ0Zvcm1Nb2RlbCxcbiAgICAgICAgICAgICAgICBAQXR0cmlidXRlKFwiZm9yXCIpIGxhYmVsRm9yOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZWwgPSBlbDtcbiAgICAgICAgdGhpcy5fZm9ybSA9IGZvcm07XG4gICAgICAgIHRoaXMuY29udHJvbFBhdGggPSBsYWJlbEZvcjtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5odG1sRm9yID0gdGhpcy5jb250cm9sUGF0aDtcbiAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgIDEwMFxuICAgICAgICApO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==