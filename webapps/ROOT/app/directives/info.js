/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bforbes@pacificbiosciences.com">Bryan Forbes</a>
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("angular2/core");
var Info = (function () {
    function Info(elementRef, tabIndex) {
        this._open = false;
        this._info = "";
        this.tabIndex = "0";
        this.nativeElement = elementRef.nativeElement;
        this.nativeElement.tabIndex = -1;
        if (tabIndex != null && tabIndex) {
            this.tabIndex = tabIndex;
        }
    }
    Info.prototype.ngAfterViewInit = function () {
        this.infoElement = this.infoElementRef.nativeElement;
        this.infoElement.innerHTML = this._info;
    };
    Object.defineProperty(Info.prototype, "info", {
        get: function () {
            return this._info;
        },
        set: function (value) {
            // Prevent an XSS attack
            if (value.match(/<script[ >]/ig)) {
                throw new Error("Script injection detected!");
            }
            this._info = value || "";
            if (this.infoElement) {
                this.infoElement.innerHTML = this._info;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Info.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (value) {
            value = Boolean(value);
            this._open = value;
            if (value) {
                this.infoElement.classList.add("pb-info__info_offscreen");
                this.infoElement.classList.remove("pb-info__info_hidden");
                // force reflow
                var _ = this.infoElement.offsetHeight;
                var rect = this.infoElement.getBoundingClientRect();
                var offsetParent = this.offsetParent;
                var parentHeight = offsetParent.offsetHeight;
                var parentWidth = offsetParent.offsetWidth;
                var left = this.nativeElement.offsetLeft;
                if ((left + rect.width) > parentWidth) {
                    left = Math.max(0, parentWidth - rect.width);
                }
                this.infoElement.style.left = left + "px";
                var top_1 = this.nativeElement.offsetTop +
                    this.nativeElement.offsetHeight;
                if ((top_1 + rect.height) > (offsetParent.scrollTop + parentHeight)) {
                    top_1 = Math.max(0, this.nativeElement.offsetTop - rect.height);
                }
                this.infoElement.style.top = top_1 + "px";
                this.infoElement.classList.remove("pb-info__info_offscreen");
            }
            else {
                this.infoElement.style.top = this.infoElement.style.left = "";
                this.infoElement.classList.add("pb-info__info_hidden");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Info.prototype, "offsetParent", {
        get: function () {
            var offsetParent = this.nativeElement.offsetParent;
            while (offsetParent && this.isStatic(offsetParent)) {
                offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || document.body;
        },
        enumerable: true,
        configurable: true
    });
    Info.prototype.isStatic = function (element) {
        var position = window.getComputedStyle(element).position;
        return !position || position === "static";
    };
    Info.prototype.onClick = function (event) {
        if (event) {
            event.preventDefault();
        }
        this.open = !this.open;
    };
    Info.prototype.onBlur = function () {
        this.open = false;
    };
    __decorate([
        core_1.Input("tabindex"), 
        __metadata('design:type', String)
    ], Info.prototype, "tabIndex", void 0);
    __decorate([
        core_1.ViewChild("infoElement"), 
        __metadata('design:type', core_1.ElementRef)
    ], Info.prototype, "infoElementRef", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Info.prototype, "info", null);
    Info = __decorate([
        core_1.Component({
            selector: "pb-info",
            moduleId: module.id,
            templateUrl: "info.html",
            styleUrls: ["info.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(1, core_1.Attribute("tabindex")), 
        __metadata('design:paramtypes', [core_1.ElementRef, String])
    ], Info);
    return Info;
}());
exports.Info = Info;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kaXJlY3RpdmVzL2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOzs7Ozs7Ozs7Ozs7OztBQUVILHFCQUVPLGVBQWUsQ0FBQyxDQUFBO0FBU3ZCO0lBU0ksY0FBWSxVQUFzQixFQUNDLFFBQWdCO1FBVDNDLFVBQUssR0FBWSxLQUFLLENBQUM7UUFDdkIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNBLGFBQVEsR0FBVyxHQUFHLENBQUM7UUFROUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM3QixDQUFDO0lBQ0wsQ0FBQztJQUVELDhCQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQ3JELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDNUMsQ0FBQztJQUdELHNCQUFJLHNCQUFJO2FBQVI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBRUQsVUFBUyxLQUFhO1lBQ2xCLHdCQUF3QjtZQUN4QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ2xELENBQUM7WUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDNUMsQ0FBQztRQUNMLENBQUM7OztPQVhBO0lBYUQsc0JBQVksc0JBQUk7YUFvQ2hCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzthQXRDRCxVQUFpQixLQUFjO1lBQzNCLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFFbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBRTFELGVBQWU7Z0JBQ2YsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7Z0JBRXRDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDdEQsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDdkMsSUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztnQkFDL0MsSUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQztnQkFFN0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7Z0JBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakQsQ0FBQztnQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQU0sSUFBSSxPQUFJLENBQUM7Z0JBRTFDLElBQUksS0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUztvQkFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7Z0JBQzFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxLQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsRSxDQUFDO2dCQUNELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBTSxLQUFHLE9BQUksQ0FBQztnQkFFeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDakUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUMzRCxDQUFDO1FBQ0wsQ0FBQzs7O09BQUE7SUFNRCxzQkFBWSw4QkFBWTthQUF4QjtZQUNJLElBQUksWUFBWSxHQUFpQixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztZQUVqRSxPQUFPLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7Z0JBQ2pELFlBQVksR0FBaUIsWUFBWSxDQUFDLFlBQVksQ0FBQztZQUMzRCxDQUFDO1lBRUQsTUFBTSxDQUFDLFlBQVksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBRU8sdUJBQVEsR0FBaEIsVUFBaUIsT0FBZ0I7UUFDN0IsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUUzRCxNQUFNLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxLQUFLLFFBQVEsQ0FBQztJQUM5QyxDQUFDO0lBRU8sc0JBQU8sR0FBZixVQUFnQixLQUFhO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFTyxxQkFBTSxHQUFkO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQXRHRDtRQUFDLFlBQUssQ0FBQyxVQUFVLENBQUM7OzBDQUFBO0lBR2xCO1FBQUMsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7O2dEQUFBO0lBa0J6QjtRQUFDLFlBQUssRUFBRTs7b0NBQUE7SUEvQlo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLFNBQVMsRUFBRSxDQUFFLFVBQVUsQ0FBRTtZQUN6QixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtTQUN4QyxDQUFDO21CQVdlLGdCQUFTLENBQUMsVUFBVSxDQUFDOztZQVhwQztJQTJHRixXQUFDO0FBQUQsQ0ExR0EsQUEwR0MsSUFBQTtBQTFHWSxZQUFJLE9BMEdoQixDQUFBIiwiZmlsZSI6ImFwcC9kaXJlY3RpdmVzL2luZm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpiZm9yYmVzQHBhY2lmaWNiaW9zY2llbmNlcy5jb21cIj5CcnlhbiBGb3JiZXM8L2E+XG4gKi9cblxuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBFbGVtZW50UmVmLCBBdHRyaWJ1dGUsIElucHV0LCBWaWV3Q2hpbGRcbn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicGItaW5mb1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiaW5mby5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbIFwiaW5mby5jc3NcIiBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgSW5mbyB7XG4gICAgcHJpdmF0ZSBfb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2luZm86IHN0cmluZyA9IFwiXCI7XG4gICAgQElucHV0KFwidGFiaW5kZXhcIikgcHJpdmF0ZSB0YWJJbmRleDogc3RyaW5nID0gXCIwXCI7XG5cbiAgICBwcml2YXRlIG5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIEBWaWV3Q2hpbGQoXCJpbmZvRWxlbWVudFwiKSBwcml2YXRlIGluZm9FbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuICAgIHByaXZhdGUgaW5mb0VsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBAQXR0cmlidXRlKFwidGFiaW5kZXhcIikgdGFiSW5kZXg6IHN0cmluZykge1xuICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC50YWJJbmRleCA9IC0xO1xuXG4gICAgICAgIGlmICh0YWJJbmRleCAhPSBudWxsICYmIHRhYkluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnRhYkluZGV4ID0gdGFiSW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuaW5mb0VsZW1lbnQgPSB0aGlzLmluZm9FbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5mb0VsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5faW5mbztcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBpbmZvKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmZvO1xuICAgIH1cblxuICAgIHNldCBpbmZvKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gUHJldmVudCBhbiBYU1MgYXR0YWNrXG4gICAgICAgIGlmICh2YWx1ZS5tYXRjaCgvPHNjcmlwdFsgPl0vaWcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTY3JpcHQgaW5qZWN0aW9uIGRldGVjdGVkIVwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pbmZvID0gdmFsdWUgfHwgXCJcIjtcbiAgICAgICAgaWYgKHRoaXMuaW5mb0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5mb0VsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5faW5mbztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0IG9wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdmFsdWUgPSBCb29sZWFuKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fb3BlbiA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5pbmZvRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicGItaW5mb19faW5mb19vZmZzY3JlZW5cIik7XG4gICAgICAgICAgICB0aGlzLmluZm9FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJwYi1pbmZvX19pbmZvX2hpZGRlblwiKTtcblxuICAgICAgICAgICAgLy8gZm9yY2UgcmVmbG93XG4gICAgICAgICAgICBsZXQgXyA9IHRoaXMuaW5mb0VsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5pbmZvRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFBhcmVudCA9IHRoaXMub2Zmc2V0UGFyZW50O1xuICAgICAgICAgICAgY29uc3QgcGFyZW50SGVpZ2h0ID0gb2Zmc2V0UGFyZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudFdpZHRoID0gb2Zmc2V0UGFyZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgICAgICAgICBsZXQgbGVmdCA9IHRoaXMubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgaWYgKChsZWZ0ICsgcmVjdC53aWR0aCkgPiBwYXJlbnRXaWR0aCkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSBNYXRoLm1heCgwLCBwYXJlbnRXaWR0aCAtIHJlY3Qud2lkdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbmZvRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7bGVmdH1weGA7XG5cbiAgICAgICAgICAgIGxldCB0b3AgPSB0aGlzLm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wICtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgaWYgKCh0b3AgKyByZWN0LmhlaWdodCkgPiAob2Zmc2V0UGFyZW50LnNjcm9sbFRvcCArIHBhcmVudEhlaWdodCkpIHtcbiAgICAgICAgICAgICAgICB0b3AgPSBNYXRoLm1heCgwLCB0aGlzLm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wIC0gcmVjdC5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbmZvRWxlbWVudC5zdHlsZS50b3AgPSBgJHt0b3B9cHhgO1xuXG4gICAgICAgICAgICB0aGlzLmluZm9FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJwYi1pbmZvX19pbmZvX29mZnNjcmVlblwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5mb0VsZW1lbnQuc3R5bGUudG9wID0gdGhpcy5pbmZvRWxlbWVudC5zdHlsZS5sZWZ0ID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMuaW5mb0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBiLWluZm9fX2luZm9faGlkZGVuXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgb3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgb2Zmc2V0UGFyZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG9mZnNldFBhcmVudCA9IDxIVE1MRWxlbWVudD4gdGhpcy5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudDtcblxuICAgICAgICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIHRoaXMuaXNTdGF0aWMob2Zmc2V0UGFyZW50KSkge1xuICAgICAgICAgICAgb2Zmc2V0UGFyZW50ID0gPEhUTUxFbGVtZW50PiBvZmZzZXRQYXJlbnQub2Zmc2V0UGFyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9mZnNldFBhcmVudCB8fCBkb2N1bWVudC5ib2R5O1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTdGF0aWMoZWxlbWVudDogRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uO1xuXG4gICAgICAgIHJldHVybiAhcG9zaXRpb24gfHwgcG9zaXRpb24gPT09IFwic3RhdGljXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNsaWNrKGV2ZW50PzogRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3BlbiA9ICF0aGlzLm9wZW47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==