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
var Toggle = (function () {
    function Toggle(tabindex) {
        this.toggleChanged = new core_1.EventEmitter();
        this._toggled = false;
        this._disabled = false;
        this.tabindex = lang_1.isPresent(tabindex) ? Number.parseInt(tabindex, 10) : 0;
    }
    Object.defineProperty(Toggle.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = lang_1.isPresent(value) && value !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toggle.prototype, "toggled", {
        get: function () {
            return this._toggled;
        },
        set: function (value) {
            value = lang_1.isPresent(value) && value !== false;
            if (this._toggled !== value) {
                this._toggled = value;
                this.toggleChanged.emit(this._toggled);
            }
            this._toggled = value;
        },
        enumerable: true,
        configurable: true
    });
    Toggle.prototype.onKeydown = function (event) {
        if (event.keyCode === constants_1.SPACE) {
            event.preventDefault();
            this.toggle(event);
        }
    };
    Toggle.prototype.toggle = function (event) {
        if (this.disabled) {
            event.stopPropagation();
            return;
        }
        this.toggled = !this.toggled;
    };
    __decorate([
        core_1.Output("toggledChange"), 
        __metadata('design:type', Object)
    ], Toggle.prototype, "toggleChanged", void 0);
    __decorate([
        core_1.HostBinding("attr.aria-checked"), 
        __metadata('design:type', Boolean)
    ], Toggle.prototype, "_toggled", void 0);
    __decorate([
        core_1.HostBinding("attr.aria-disabled"), 
        __metadata('design:type', Boolean)
    ], Toggle.prototype, "_disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Toggle.prototype, "disabled", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Toggle.prototype, "toggled", null);
    __decorate([
        core_1.HostListener("keydown", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Toggle.prototype, "onKeydown", null);
    Toggle = __decorate([
        core_1.Component({
            selector: "pb-toggle",
            host: {
                "[attr.role]": "'checkbox'"
            },
            moduleId: module.id,
            templateUrl: "toggle.html",
            styleUrls: ["toggle.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(0, core_1.Attribute("tabindex")), 
        __metadata('design:paramtypes', [String])
    ], Toggle);
    return Toggle;
}());
exports.Toggle = Toggle;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdG9nZ2xlL3RvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EscUJBR08sZUFBZSxDQUFDLENBQUE7QUFDdkIscUJBQXdCLDBCQUEwQixDQUFDLENBQUE7QUFDbkQsMEJBQWlDLHdCQUF3QixDQUFDLENBQUE7QUFZMUQ7SUFZSSxnQkFBbUMsUUFBZ0I7UUFUMUIsa0JBQWEsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUlwRCxhQUFRLEdBQVksS0FBSyxDQUFDO1FBRzFCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFHL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxnQkFBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBR0Qsc0JBQUksNEJBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFhLEtBQWM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUM7UUFDekQsQ0FBQzs7O09BSkE7SUFPRCxzQkFBSSwyQkFBTzthQUFYO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQVksS0FBYztZQUN0QixLQUFLLEdBQUcsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDO1lBRTVDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQzs7O09BVkE7SUFhRCwwQkFBUyxHQUFULFVBQVUsS0FBVTtRQUNoQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLGlCQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzlCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFDTCxDQUFDO0lBRUQsdUJBQU0sR0FBTixVQUFPLEtBQUs7UUFDUixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2pDLENBQUM7SUFwREQ7UUFBQyxhQUFNLENBQUMsZUFBZSxDQUFDOztpREFBQTtJQUd4QjtRQUFDLGtCQUFXLENBQUMsbUJBQW1CLENBQUM7OzRDQUFBO0lBR2pDO1FBQUMsa0JBQVcsQ0FBQyxvQkFBb0IsQ0FBQzs7NkNBQUE7SUFPbEM7UUFBQyxZQUFLLEVBQUU7OzBDQUFBO0lBU1I7UUFBQyxZQUFLLEVBQUU7O3lDQUFBO0lBZVI7UUFBQyxtQkFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OzJDQUFBO0lBbER4QztRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixJQUFJLEVBQUU7Z0JBQ0YsYUFBYSxFQUFFLFlBQVk7YUFDOUI7WUFDRCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGFBQWE7WUFDMUIsU0FBUyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3pCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3hDLENBQUM7bUJBYWUsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7O2NBYnBDO0lBeURGLGFBQUM7QUFBRCxDQXhEQSxBQXdEQyxJQUFBO0FBeERZLGNBQU0sU0F3RGxCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy90b2dnbGUvdG9nZ2xlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVE9ETzogUmVzb2x2ZSBLZXlib2FyZEV2ZW50XG5pbXBvcnQge1xuICAgIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIEF0dHJpYnV0ZSwgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LCBPdXRwdXQsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXJcbn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nXCI7XG5pbXBvcnQge1NQQUNFIGFzIEtFWV9TUEFDRX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicGItdG9nZ2xlXCIsXG4gICAgaG9zdDoge1xuICAgICAgICBcIlthdHRyLnJvbGVdXCI6IFwiJ2NoZWNrYm94J1wiXG4gICAgfSxcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcInRvZ2dsZS5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJ0b2dnbGUuY3NzXCJdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlIHtcbiAgICBwdWJsaWMgdGFiaW5kZXg6IG51bWJlcjtcblxuICAgIEBPdXRwdXQoXCJ0b2dnbGVkQ2hhbmdlXCIpIHRvZ2dsZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKiogV2hldGhlciB0aGlzIHN3aXRjaCBpcyBjaGVja2VkLiAqL1xuICAgIEBIb3N0QmluZGluZyhcImF0dHIuYXJpYS1jaGVja2VkXCIpXG4gICAgcHJpdmF0ZSBfdG9nZ2xlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKiBXaGV0aGVyIHRoaXMgc3dpdGNoIGlzIGRpc2FibGVkLiAqL1xuICAgIEBIb3N0QmluZGluZyhcImF0dHIuYXJpYS1kaXNhYmxlZFwiKVxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihAQXR0cmlidXRlKFwidGFiaW5kZXhcIikgdGFiaW5kZXg6IHN0cmluZykge1xuICAgICAgICB0aGlzLnRhYmluZGV4ID0gaXNQcmVzZW50KHRhYmluZGV4KSA/IE51bWJlci5wYXJzZUludCh0YWJpbmRleCwgMTApIDogMDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGlzUHJlc2VudCh2YWx1ZSkgJiYgdmFsdWUgIT09IGZhbHNlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHRvZ2dsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b2dnbGVkO1xuICAgIH1cblxuICAgIHNldCB0b2dnbGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHZhbHVlID0gaXNQcmVzZW50KHZhbHVlKSAmJiB2YWx1ZSAhPT0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RvZ2dsZWQgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl90b2dnbGVkID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUNoYW5nZWQuZW1pdCh0aGlzLl90b2dnbGVkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90b2dnbGVkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImtleWRvd25cIiwgW1wiJGV2ZW50XCJdKVxuICAgIG9uS2V5ZG93bihldmVudDogYW55KSB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLRVlfU1BBQ0UpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b2dnbGVkID0gIXRoaXMudG9nZ2xlZDtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=