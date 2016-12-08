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
var ProgressLinear = (function () {
    function ProgressLinear(mode) {
        this._value = 0;
        this._bufferValue = 0;
        this.primaryBarTransform = "";
        this.secondaryBarTransform = "";
        this.mode = "" + (lang_1.isPresent(mode) ? mode : Mode.DETERMINATE);
    }
    ProgressLinear.clamp = function (v) {
        return Math.max(0, Math.min(100, v));
    };
    Object.defineProperty(ProgressLinear.prototype, "bufferValue", {
        get: function () {
            return this._bufferValue;
        },
        set: function (bv) {
            if (lang_1.isPresent(bv)) {
                this._bufferValue = ProgressLinear.clamp(bv);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressLinear.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (lang_1.isPresent(v)) {
                this._value = ProgressLinear.clamp(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ProgressLinear.prototype.ngOnChanges = function (changeRecord) {
        if ((this.mode === Mode["QUERY"]) ||
            (this.mode === Mode["INDETERMINATE"]) ||
            (lang_1.isBlank(this._value))) {
            return;
        }
        this.primaryBarTransform = this.transformForValue(this.value);
        if (this.mode === Mode["BUFFER"]) {
            this.secondaryBarTransform = this.transformForValue(this._bufferValue);
        }
    };
    ProgressLinear.prototype.transformForValue = function (value) {
        var scale = value / 100;
        var translateX = (value - 100) / 2;
        return "translateX(" + translateX + "%) scale(" + scale + ", 1)";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ProgressLinear.prototype, "bufferValue", null);
    __decorate([
        core_1.HostBinding("attr.aria-valuenow"),
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ProgressLinear.prototype, "value", null);
    ProgressLinear = __decorate([
        core_1.Component({
            selector: "pb-progress-linear",
            host: {
                "[attr.role]": "'progressbar'",
                "[attr.aria-valuemin]": "'0'",
                "[attr.aria-valuemax]": "'100'"
            },
            moduleId: module.id,
            templateUrl: "progress-linear.html",
            styleUrls: ["progress-linear.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(0, core_1.Attribute("pb-mode")), 
        __metadata('design:paramtypes', [String])
    ], ProgressLinear);
    return ProgressLinear;
}());
exports.ProgressLinear = ProgressLinear;
var Mode = {
    DETERMINATE: "determinate",
    INDETERMINATE: "indeterminate",
    BUFFER: "buffer",
    QUERY: "query"
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcHJvZ3Jlc3MtbGluZWFyL3Byb2dyZXNzLWxpbmVhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEscUJBRU8sZUFBZSxDQUFDLENBQUE7QUFDdkIscUJBQWlDLDBCQUEwQixDQUFDLENBQUE7QUFjNUQ7SUFnQkksd0JBQWtDLElBQVk7UUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFFdEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDO1FBRWhDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFHTSxvQkFBSyxHQUFaLFVBQWEsQ0FBQztRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFHRCxzQkFBVyx1Q0FBVzthQUF0QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7YUFFRCxVQUF1QixFQUFVO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakQsQ0FBQztRQUNMLENBQUM7OztPQU5BO0lBVUQsc0JBQVcsaUNBQUs7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBaUIsQ0FBUztZQUN0QixFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsQ0FBQztRQUNMLENBQUM7OztPQU5BO0lBUUQsb0NBQVcsR0FBWCxVQUFZLFlBQVk7UUFFcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsY0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFHOUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNFLENBQUM7SUFDTCxDQUFDO0lBR08sMENBQWlCLEdBQXpCLFVBQTBCLEtBQWE7UUFFbkMsSUFBTSxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUMxQixJQUFNLFVBQVUsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLGdCQUFjLFVBQVUsaUJBQVksS0FBSyxTQUFNLENBQUM7SUFDM0QsQ0FBQztJQTdDRDtRQUFDLFlBQUssRUFBRTs7cURBQUE7SUFXUjtRQUFDLGtCQUFXLENBQUMsb0JBQW9CLENBQUM7UUFDakMsWUFBSyxFQUFFOzsrQ0FBQTtJQXZEWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLElBQUksRUFBRTtnQkFDRixhQUFhLEVBQUUsZUFBZTtnQkFDOUIsc0JBQXNCLEVBQUUsS0FBSztnQkFDN0Isc0JBQXNCLEVBQUUsT0FBTzthQUNsQztZQUNELFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO1lBQ2xDLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3hDLENBQUM7bUJBaUJlLGdCQUFTLENBQUMsU0FBUyxDQUFDOztzQkFqQm5DO0lBOEVGLHFCQUFDO0FBQUQsQ0E3RUEsQUE2RUMsSUFBQTtBQTdFWSxzQkFBYyxpQkE2RTFCLENBQUE7QUFHRCxJQUFNLElBQUksR0FBRztJQUNULFdBQVcsRUFBRSxhQUFhO0lBQzFCLGFBQWEsRUFBRSxlQUFlO0lBQzlCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEtBQUssRUFBRSxPQUFPO0NBQ2pCLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy9wcm9ncmVzcy1saW5lYXIvcHJvZ3Jlc3MtbGluZWFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE9uQ2hhbmdlcywgVmlld0VuY2Fwc3VsYXRpb24sIEF0dHJpYnV0ZSwgSW5wdXQsIEhvc3RCaW5kaW5nXG59IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNCbGFua30gZnJvbSBcImFuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZ1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwYi1wcm9ncmVzcy1saW5lYXJcIixcbiAgICBob3N0OiB7XG4gICAgICAgIFwiW2F0dHIucm9sZV1cIjogXCIncHJvZ3Jlc3NiYXInXCIsXG4gICAgICAgIFwiW2F0dHIuYXJpYS12YWx1ZW1pbl1cIjogXCInMCdcIixcbiAgICAgICAgXCJbYXR0ci5hcmlhLXZhbHVlbWF4XVwiOiBcIicxMDAnXCJcbiAgICB9LFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwicHJvZ3Jlc3MtbGluZWFyLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcInByb2dyZXNzLWxpbmVhci5jc3NcIl0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc0xpbmVhciBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgLyoqIFRoZSByZW5kZXIgbW9kZSBmb3IgdGhlIHByb2dyZXNzIGJhci4gKi9cbiAgICBtb2RlOiBzdHJpbmc7XG5cbiAgICAvKiogQ1NTIGB0cmFuc2Zvcm1gIHByb3BlcnR5IGFwcGxpZWQgdG8gdGhlIHByaW1hcnkgYmFyLiAqL1xuICAgIHByaW1hcnlCYXJUcmFuc2Zvcm06IHN0cmluZztcblxuICAgIC8qKiBDU1MgYHRyYW5zZm9ybWAgcHJvcGVydHkgYXBwbGllZCB0byB0aGUgc2Vjb25kYXJ5IGJhci4gKi9cbiAgICBzZWNvbmRhcnlCYXJUcmFuc2Zvcm06IHN0cmluZztcblxuICAgIC8qKiBWYWx1ZSBmb3IgdGhlIHByaW1hcnkgYmFyLiAqL1xuICAgIHByaXZhdGUgX3ZhbHVlOiBudW1iZXI7XG5cbiAgICAvKiogVmFsdWUgZm9yIHRoZSBzZWNvbmRhcnkgYmFyLiAqL1xuICAgIHByaXZhdGUgX2J1ZmZlclZhbHVlOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihAQXR0cmlidXRlKFwicGItbW9kZVwiKSBtb2RlOiBzdHJpbmcpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gMDtcbiAgICAgIHRoaXMuX2J1ZmZlclZhbHVlID0gMDtcblxuICAgICAgdGhpcy5wcmltYXJ5QmFyVHJhbnNmb3JtID0gXCJcIjtcbiAgICAgIHRoaXMuc2Vjb25kYXJ5QmFyVHJhbnNmb3JtID0gXCJcIjtcblxuICAgICAgdGhpcy5tb2RlID0gXCJcIiArIChpc1ByZXNlbnQobW9kZSkgPyBtb2RlIDogTW9kZS5ERVRFUk1JTkFURSk7XG4gICAgfVxuXG4gICAgLyoqIENsYW1wcyBhIHZhbHVlIHRvIGJlIGJldHdlZW4gMCBhbmQgMTAwLiAqL1xuICAgIHN0YXRpYyBjbGFtcCh2KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIHYpKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgYnVmZmVyVmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlclZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgYnVmZmVyVmFsdWUoYnY6IG51bWJlcikge1xuICAgICAgICBpZiAoaXNQcmVzZW50KGJ2KSkge1xuICAgICAgICAgICAgdGhpcy5fYnVmZmVyVmFsdWUgPSBQcm9ncmVzc0xpbmVhci5jbGFtcChidik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJhdHRyLmFyaWEtdmFsdWVub3dcIilcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgdmFsdWUodjogbnVtYmVyKSB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodikpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gUHJvZ3Jlc3NMaW5lYXIuY2xhbXAodik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VSZWNvcmQpIHtcbiAgICAgICAgLy8gSWYgdGhlIG1vZGUgZG9lcyBub3QgdXNlIGEgdmFsdWUsIG9yIGlmIHRoZXJlIGlzIG5vIHZhbHVlLCBkbyBub3RoaW5nLlxuICAgICAgICBpZiAoKHRoaXMubW9kZSA9PT0gTW9kZVtcIlFVRVJZXCJdKSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLm1vZGUgPT09IE1vZGVbXCJJTkRFVEVSTUlOQVRFXCJdKSB8fFxuICAgICAgICAgICAgICAgIChpc0JsYW5rKHRoaXMuX3ZhbHVlKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJpbWFyeUJhclRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtRm9yVmFsdWUodGhpcy52YWx1ZSk7XG5cbiAgICAgICAgLy8gVGhlIGJ1ZmZlclZhbHVlIGlzIG9ubHkgdXNlZCBpbiBidWZmZXIgbW9kZS5cbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTW9kZVtcIkJVRkZFUlwiXSkge1xuICAgICAgICAgICAgdGhpcy5zZWNvbmRhcnlCYXJUcmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybUZvclZhbHVlKHRoaXMuX2J1ZmZlclZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBHZXRzIHRoZSBDU1MgYHRyYW5zZm9ybWAgcHJvcGVydHkgZm9yIGEgcHJvZ3Jlc3MgYmFyIGJhc2VkIG9uIHRoZSBnaXZlbiB2YWx1ZSAoMCAtIDEwMCkuICovXG4gICAgcHJpdmF0ZSB0cmFuc2Zvcm1Gb3JWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIC8vIFRPRE8oamVsYm91cm4pOiB0ZXN0IHBlcmYgZ2FpbiBvZiBjYWNoaW5nIHRoZXNlLCBzaW5jZSB0aGVyZSBhcmUgb25seSAxMDEgdmFsdWVzLlxuICAgICAgICBjb25zdCBzY2FsZSA9IHZhbHVlIC8gMTAwO1xuICAgICAgICBjb25zdCB0cmFuc2xhdGVYID0gKHZhbHVlIC0gMTAwKSAvIDI7XG4gICAgICAgIHJldHVybiBgdHJhbnNsYXRlWCgke3RyYW5zbGF0ZVh9JSkgc2NhbGUoJHtzY2FsZX0sIDEpYDtcbiAgICB9XG59XG5cbi8qKiBAZW51bSB7c3RyaW5nfSBQcm9ncmVzcy1saW5lYXIgbW9kZXMuICovXG5jb25zdCBNb2RlID0ge1xuICAgIERFVEVSTUlOQVRFOiBcImRldGVybWluYXRlXCIsXG4gICAgSU5ERVRFUk1JTkFURTogXCJpbmRldGVybWluYXRlXCIsXG4gICAgQlVGRkVSOiBcImJ1ZmZlclwiLFxuICAgIFFVRVJZOiBcInF1ZXJ5XCJcbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=