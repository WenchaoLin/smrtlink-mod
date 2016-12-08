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
var Checkbox = (function () {
    function Checkbox(tabindex) {
        this.checkChanged = new core_1.EventEmitter();
        this._checked = false;
        this._disabled = false;
        this.tabindex = lang_1.isPresent(tabindex) ? Number.parseInt(tabindex, 10) : 0;
    }
    Object.defineProperty(Checkbox.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (value) {
            if (!lang_1.isPresent(value)) {
                return;
            }
            if (this._checked !== value) {
                this._checked = value;
                this.checkChanged.next(this._checked);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Checkbox.prototype, "hasDisabledAttribute", {
        get: function () {
            return this._disabled ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Checkbox.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = lang_1.isPresent(value) && value !== false;
        },
        enumerable: true,
        configurable: true
    });
    Checkbox.prototype.onKeydown = function (event) {
        if (event.keyCode === constants_1.SPACE) {
            event.preventDefault();
            this.toggle(event);
        }
    };
    Checkbox.prototype.toggle = function (event) {
        if (this.disabled) {
            event.stopPropagation();
            return;
        }
        this.checked = !this.checked;
    };
    __decorate([
        core_1.Output("checkedChange"), 
        __metadata('design:type', Object)
    ], Checkbox.prototype, "checkChanged", void 0);
    __decorate([
        core_1.HostBinding("tabindex"), 
        __metadata('design:type', Number)
    ], Checkbox.prototype, "tabindex", void 0);
    __decorate([
        core_1.HostBinding("attr.aria-checked"),
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Checkbox.prototype, "checked", null);
    __decorate([
        core_1.HostBinding("attr.disabled"), 
        __metadata('design:type', Object)
    ], Checkbox.prototype, "hasDisabledAttribute", null);
    __decorate([
        core_1.HostBinding("attr.aria-disabled"),
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Checkbox.prototype, "disabled", null);
    __decorate([
        core_1.HostListener("keydown", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Checkbox.prototype, "onKeydown", null);
    __decorate([
        core_1.HostListener("click", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Checkbox.prototype, "toggle", null);
    Checkbox = __decorate([
        core_1.Component({
            selector: "pb-checkbox",
            host: {
                "[attr.role]": "'checkbox'"
            },
            moduleId: module.id,
            templateUrl: "checkbox.html",
            styleUrls: ["checkbox.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(0, core_1.Attribute("tabindex")), 
        __metadata('design:paramtypes', [String])
    ], Checkbox);
    return Checkbox;
}());
exports.Checkbox = Checkbox;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2hlY2tib3gvY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBLHFCQUE4RyxlQUFlLENBQUMsQ0FBQTtBQUM5SCxxQkFBd0IsMEJBQTBCLENBQUMsQ0FBQTtBQUNuRCwwQkFBaUMsd0JBQXdCLENBQUMsQ0FBQTtBQVkxRDtJQU9FLGtCQUFtQyxRQUFnQjtRQU4xQixpQkFBWSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBR25ELGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUd4QixJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFJRCxzQkFBSSw2QkFBTzthQUFYO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzthQUVELFVBQVksS0FBSztZQUNmLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQztZQUNULENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEMsQ0FBQztRQUNILENBQUM7OztPQVhBO0lBY0Qsc0JBQVksMENBQW9CO2FBQWhDO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUlELHNCQUFJLDhCQUFRO2FBQVo7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDO2FBRUQsVUFBYSxLQUFLO1lBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDO1FBQ3ZELENBQUM7OztPQUpBO0lBT0QsNEJBQVMsR0FBVCxVQUFVLEtBQVU7UUFDbEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxpQkFBUyxDQUFDLENBQUMsQ0FBQztZQUNoQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixDQUFDO0lBQ0gsQ0FBQztJQUdELHlCQUFNLEdBQU4sVUFBTyxLQUFLO1FBQ1YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMvQixDQUFDO0lBMUREO1FBQUMsYUFBTSxDQUFDLGVBQWUsQ0FBQzs7a0RBQUE7SUFDeEI7UUFBQyxrQkFBVyxDQUFDLFVBQVUsQ0FBQzs7OENBQUE7SUFTeEI7UUFBQyxrQkFBVyxDQUFDLG1CQUFtQixDQUFDO1FBQ2hDLFlBQUssRUFBRTs7MkNBQUE7SUFnQlI7UUFBQyxrQkFBVyxDQUFDLGVBQWUsQ0FBQzs7d0RBQUE7SUFLN0I7UUFBQyxrQkFBVyxDQUFDLG9CQUFvQixDQUFDO1FBQ2pDLFlBQUssRUFBRTs7NENBQUE7SUFTUjtRQUFDLG1CQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7NkNBQUE7SUFRcEM7UUFBQyxtQkFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OzBDQUFBO0lBN0RwQztRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsYUFBYTtZQUN2QixJQUFJLEVBQUU7Z0JBQ0osYUFBYSxFQUFFLFlBQVk7YUFDNUI7WUFDRCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGVBQWU7WUFDNUIsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQzNCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3RDLENBQUM7bUJBUWEsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7O2dCQVJsQztJQTZERixlQUFDO0FBQUQsQ0E1REEsQUE0REMsSUFBQTtBQTVEWSxnQkFBUSxXQTREcEIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2NoZWNrYm94L2NoZWNrYm94LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVE9ETzogUmVzb2x2ZSBLZXlib2FyZEV2ZW50XG5pbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIEF0dHJpYnV0ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gXCJhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmdcIjtcbmltcG9ydCB7U1BBQ0UgYXMgS0VZX1NQQUNFfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwicGItY2hlY2tib3hcIixcbiAgaG9zdDoge1xuICAgIFwiW2F0dHIucm9sZV1cIjogXCInY2hlY2tib3gnXCJcbiAgfSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgdGVtcGxhdGVVcmw6IFwiY2hlY2tib3guaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcImNoZWNrYm94LmNzc1wiXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveCB7XG4gIEBPdXRwdXQoXCJjaGVja2VkQ2hhbmdlXCIpIGNoZWNrQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQEhvc3RCaW5kaW5nKFwidGFiaW5kZXhcIikgdGFiaW5kZXg6IG51bWJlcjtcblxuICBwcml2YXRlIF9jaGVja2VkID0gZmFsc2U7XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoQEF0dHJpYnV0ZShcInRhYmluZGV4XCIpIHRhYmluZGV4OiBzdHJpbmcpIHtcbiAgICB0aGlzLnRhYmluZGV4ID0gaXNQcmVzZW50KHRhYmluZGV4KSA/IE51bWJlci5wYXJzZUludCh0YWJpbmRleCwgMTApIDogMDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZyhcImF0dHIuYXJpYS1jaGVja2VkXCIpXG4gIEBJbnB1dCgpXG4gIGdldCBjaGVja2VkKCkge1xuICAgIHJldHVybiB0aGlzLl9jaGVja2VkO1xuICB9XG5cbiAgc2V0IGNoZWNrZWQodmFsdWUpIHtcbiAgICBpZiAoIWlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY2hlY2tlZCAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2NoZWNrZWQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2hlY2tDaGFuZ2VkLm5leHQodGhpcy5fY2hlY2tlZCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKFwiYXR0ci5kaXNhYmxlZFwiKVxuICBwcml2YXRlIGdldCBoYXNEaXNhYmxlZEF0dHJpYnV0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgPyB0cnVlIDogbnVsbDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZyhcImF0dHIuYXJpYS1kaXNhYmxlZFwiKVxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBpc1ByZXNlbnQodmFsdWUpICYmIHZhbHVlICE9PSBmYWxzZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoXCJrZXlkb3duXCIsIFtcIiRldmVudFwiXSlcbiAgb25LZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS0VZX1NQQUNFKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy50b2dnbGUoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiLCBbXCIkZXZlbnRcIl0pXG4gIHRvZ2dsZShldmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=