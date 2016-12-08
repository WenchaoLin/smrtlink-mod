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
var lang_1 = require("angular2/src/facade/lang");
var constants_1 = require("../../common/constants");
var SQUARE_TOGGLE_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return SquareToggle; }),
    multi: true
});
var SquareToggle = (function () {
    function SquareToggle(el, renderer, tabindex) {
        this.disabled = false;
        this.toggleChanged = new core_1.EventEmitter();
        this._toggled = false;
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.tabindex = lang_1.isPresent(tabindex) ? lang_1.NumberWrapper.parseInt(tabindex, 10) : 0;
        this._el = el;
        this._renderer = renderer;
    }
    Object.defineProperty(SquareToggle.prototype, "toggled", {
        get: function () {
            return this._toggled;
        },
        set: function (value) {
            value = lang_1.isPresent(value) && value !== false;
            if (this._toggled !== value) {
                this._toggled = value;
                this.toggleChanged.emit(this._toggled);
                if (this.onChange) {
                    this.onChange(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    SquareToggle.prototype.ngAfterViewChecked = function () {
        this._renderer.setElementAttribute(this._el.nativeElement, "value", String(this.toggled));
        this._renderer.setElementAttribute(this._el.nativeElement, "aria-value", String(this.toggled));
        this._renderer.setElementAttribute(this._el.nativeElement, "aria-checked", String(this.toggled));
        this._renderer.setElementAttribute(this._el.nativeElement, "aria-disabled", String(this.disabled));
    };
    SquareToggle.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    SquareToggle.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    SquareToggle.prototype.writeValue = function (value) {
        this.toggled = value;
        this._renderer.setElementProperty(this._el.nativeElement, "toggled", value);
    };
    SquareToggle.prototype.onKeydown = function (event) {
        if (event.keyCode === constants_1.SPACE) {
            event.preventDefault();
            this.toggle(event);
        }
    };
    SquareToggle.prototype.toggle = function (event) {
        if (this.disabled) {
            event.stopPropagation();
            return;
        }
        if (event.constructor.name !== "MouseEvent") {
            this.toggled = !this.toggled;
        }
        else {
            this.toggled = (event.target.className === "pb-on");
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SquareToggle.prototype, "disabled", void 0);
    __decorate([
        core_1.Output("toggledChange"), 
        __metadata('design:type', Object)
    ], SquareToggle.prototype, "toggleChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SquareToggle.prototype, "toggled", null);
    __decorate([
        core_1.HostListener("keydown", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], SquareToggle.prototype, "onKeydown", null);
    SquareToggle = __decorate([
        core_1.Component({
            selector: "pb-square-toggle",
            host: {
                "[attr.role]": "'checkbox'"
            },
            moduleId: module.id,
            templateUrl: "square-toggle.html",
            styleUrls: ["square-toggle.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            bindings: [SQUARE_TOGGLE_VALUE_ACCESSOR]
        }),
        __param(2, core_1.Attribute("tabindex")), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, String])
    ], SquareToggle);
    return SquareToggle;
}());
exports.SquareToggle = SquareToggle;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3F1YXJlLXRvZ2dsZS9zcXVhcmUtdG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFJTyxlQUFlLENBQUMsQ0FBQTtBQUN2Qix1QkFBc0QsaUJBQWlCLENBQUMsQ0FBQTtBQUV4RSxxQkFBdUMsMEJBQTBCLENBQUMsQ0FBQTtBQUNsRSwwQkFBaUMsd0JBQXdCLENBQUMsQ0FBQTtBQUUxRCxJQUFNLDRCQUE0QixHQUFHLElBQUksZUFBUSxDQUM3QywwQkFBaUIsRUFDakI7SUFDSSxXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsWUFBWSxFQUFaLENBQVksQ0FBQztJQUMzQyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQ0osQ0FBQztBQWFGO0lBb0NJLHNCQUFZLEVBQWMsRUFDZCxRQUFrQixFQUNLLFFBQWdCO1FBakNuRCxhQUFRLEdBQVksS0FBSyxDQUFDO1FBRzFCLGtCQUFhLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFNM0IsYUFBUSxHQUFZLEtBQUssQ0FBQztRQW1CMUIsYUFBUSxHQUFHLFVBQUMsQ0FBQyxJQUFPLENBQUMsQ0FBQztRQUN0QixjQUFTLEdBQUcsY0FBUSxDQUFDLENBQUM7UUFLMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxnQkFBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLG9CQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM5QixDQUFDO0lBekJELHNCQUFJLGlDQUFPO2FBQVg7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO2FBRUQsVUFBWSxLQUFjO1lBQ3RCLEtBQUssR0FBRyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxL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QUFZLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7aURBQUE7SUEvRnhDO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsSUFBSSxFQUFFO2dCQUNGLGFBQWEsRUFBRSxZQUFZO2FBQzlCO1lBQ0QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBQyxvQkFBb0I7WUFDaEMsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7WUFDaEMsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7WUFDckMsUUFBUSxFQUFFLENBQUMsNEJBQTRCLENBQUM7U0FDM0MsQ0FBQzttQkF1Q2UsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7O29CQXZDcEM7SUF5R0YsbUJBQUM7QUFBRCxDQXhHQSxBQXdHQyxJQUFBO0FBeEdZLG9CQUFZLGVBd0d4QixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvc3F1YXJlLXRvZ2dsZS9zcXVhcmUtdG9nZ2xlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBSZW5kZXJlciwgRWxlbWVudFJlZiwgQXR0cmlidXRlLCBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsIE91dHB1dCwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgUHJvdmlkZXIsIGZvcndhcmRSZWYsXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZFxufSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcblxuaW1wb3J0IHtpc1ByZXNlbnQsIE51bWJlcldyYXBwZXJ9IGZyb20gXCJhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmdcIjtcbmltcG9ydCB7U1BBQ0UgYXMgS0VZX1NQQUNFfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbnN0YW50c1wiO1xuXG5jb25zdCBTUVVBUkVfVE9HR0xFX1ZBTFVFX0FDQ0VTU09SID0gbmV3IFByb3ZpZGVyKFxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHtcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU3F1YXJlVG9nZ2xlKSxcbiAgICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4pO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwYi1zcXVhcmUtdG9nZ2xlXCIsXG4gICAgaG9zdDoge1xuICAgICAgICBcIlthdHRyLnJvbGVdXCI6IFwiJ2NoZWNrYm94J1wiXG4gICAgfSxcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOlwic3F1YXJlLXRvZ2dsZS5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJzcXVhcmUtdG9nZ2xlLmNzc1wiXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGJpbmRpbmdzOiBbU1FVQVJFX1RPR0dMRV9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgU3F1YXJlVG9nZ2xlIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIHB1YmxpYyB0YWJpbmRleDogbnVtYmVyO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhpcyBzd2l0Y2ggaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dChcInRvZ2dsZWRDaGFuZ2VcIilcbiAgICB0b2dnbGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhpcyBzd2l0Y2ggaXMgY2hlY2tlZC4gKi9cbiAgICBwcml2YXRlIF90b2dnbGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCB0b2dnbGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG9nZ2xlZDtcbiAgICB9XG5cbiAgICBzZXQgdG9nZ2xlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB2YWx1ZSA9IGlzUHJlc2VudCh2YWx1ZSkgJiYgdmFsdWUgIT09IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLl90b2dnbGVkICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdG9nZ2xlZCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVDaGFuZ2VkLmVtaXQodGhpcy5fdG9nZ2xlZCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vbkNoYW5nZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNoYW5nZSA9IChfKSA9PiB7IH07XG4gICAgcHJpdmF0ZSBvblRvdWNoZWQgPSAoKSA9PiB7IH07XG5cbiAgICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogUmVuZGVyZXIsXG4gICAgICAgICAgICAgICAgQEF0dHJpYnV0ZShcInRhYmluZGV4XCIpIHRhYmluZGV4OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50YWJpbmRleCA9IGlzUHJlc2VudCh0YWJpbmRleCkgPyBOdW1iZXJXcmFwcGVyLnBhcnNlSW50KHRhYmluZGV4LCAxMCkgOiAwO1xuICAgICAgICB0aGlzLl9lbCA9IGVsO1xuICAgICAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZShcbiAgICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICBcInZhbHVlXCIsXG4gICAgICAgICAgICBTdHJpbmcodGhpcy50b2dnbGVkKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKFxuICAgICAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgIFwiYXJpYS12YWx1ZVwiLFxuICAgICAgICAgICAgU3RyaW5nKHRoaXMudG9nZ2xlZClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZShcbiAgICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICBcImFyaWEtY2hlY2tlZFwiLFxuICAgICAgICAgICAgU3RyaW5nKHRoaXMudG9nZ2xlZClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZShcbiAgICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICBcImFyaWEtZGlzYWJsZWRcIixcbiAgICAgICAgICAgIFN0cmluZyh0aGlzLmRpc2FibGVkKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHt9KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50b2dnbGVkID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eShcbiAgICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICBcInRvZ2dsZWRcIixcbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImtleWRvd25cIiwgW1wiJGV2ZW50XCJdKVxuICAgIG9uS2V5ZG93bihldmVudDogYW55KSB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLRVlfU1BBQ0UpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHRvZ2dsZShldmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQuY29uc3RydWN0b3IubmFtZSAhPT0gXCJNb3VzZUV2ZW50XCIpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlZCA9ICF0aGlzLnRvZ2dsZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZWQgPSAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJwYi1vblwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==