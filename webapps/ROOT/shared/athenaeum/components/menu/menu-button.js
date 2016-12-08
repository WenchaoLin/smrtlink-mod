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
var core_1 = require("angular2/core");
var common_1 = require("angular2/common");
var menu_1 = require("./menu");
var constants_1 = require("../../common/constants");
var MENU_BUTTON_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return MenuButton; }),
    multi: true
});
var MenuButton = (function () {
    function MenuButton(elementRef) {
        this.disabled = false;
        this.activated = new core_1.EventEmitter();
        this.valueChanged = new core_1.EventEmitter();
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.nativeElement = elementRef.nativeElement;
        this._onBlur = this.onBlur.bind(this);
    }
    MenuButton.prototype.ngOnInit = function () {
        this.nativeElement.addEventListener("blur", this._onBlur, true);
    };
    MenuButton.prototype.ngAfterContentInit = function () {
        if (this.menu) {
            this.menu.value = this.value;
        }
    };
    MenuButton.prototype.ngAfterContentChecked = function () {
        this.nativeElement.setAttribute("aria-haspopup", String(this.hasMenu));
        this.nativeElement.setAttribute("aria-expanded", String(this.expanded));
    };
    MenuButton.prototype.ngOnDestroy = function () {
        this.nativeElement.removeEventListener("blur", this._onBlur, true);
    };
    MenuButton.prototype.writeValue = function (value) {
        this.value = value;
    };
    MenuButton.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    MenuButton.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    Object.defineProperty(MenuButton.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (value !== this._value) {
                if (this.menu) {
                    this.menu.value = value;
                }
                this._value = value;
                this.valueChanged.emit(value);
                this.onChange(value);
            }
            this.activated.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuButton.prototype, "hasMenu", {
        get: function () {
            return Boolean(this.menu);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuButton.prototype, "expanded", {
        get: function () {
            return this.menu && this.menu.open;
        },
        enumerable: true,
        configurable: true
    });
    MenuButton.prototype.onButtonClick = function (event) {
        if (this.menu.open) {
            this.menu.hide();
        }
        else {
            this.menu.show(this.nativeElement.getBoundingClientRect());
        }
    };
    MenuButton.prototype.onButtonKeyDown = function (event) {
        if (this.menu.open) {
            var handled = false;
            if (event.keyCode === constants_1.DOWN_ARROW) {
                this.menu.focus();
                handled = true;
            }
            else if (event.keyCode === constants_1.UP_ARROW) {
                this.menu.focus(true);
                handled = true;
            }
            else if (event.keyCode === constants_1.ESCAPE) {
                this.menu.hide();
                var button = this.nativeElement
                    .querySelector(":scope > button");
                button.focus();
                handled = true;
            }
            event.preventDefault();
            event.stopPropagation();
        }
    };
    MenuButton.prototype.onMenuClick = function (event) {
        var _this = this;
        if (event.srcComponent && !event.srcComponent.hasMenu) {
            this.value = event.srcComponent.value;
            setTimeout(function () {
                var button = _this.nativeElement
                    .querySelector(":scope > button");
                button.focus();
            });
        }
    };
    MenuButton.prototype.onMenuKeyDown = function (event) {
        if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) {
            return;
        }
        if (event.keyCode === constants_1.ENTER) {
            this.onMenuClick(event);
        }
    };
    MenuButton.prototype.onBlur = function (event) {
        if (!event.relatedTarget ||
            !this.nativeElement.contains(event.relatedTarget)) {
            this.menu.hide();
            this.onTouched();
            event.preventDefault();
            event.stopPropagation();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuButton.prototype, "disabled", void 0);
    __decorate([
        core_1.ContentChild(core_1.forwardRef(function () { return menu_1.Menu; })), 
        __metadata('design:type', menu_1.Menu)
    ], MenuButton.prototype, "menu", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuButton.prototype, "activated", void 0);
    __decorate([
        core_1.Output("valueChange"), 
        __metadata('design:type', Object)
    ], MenuButton.prototype, "valueChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuButton.prototype, "value", null);
    MenuButton = __decorate([
        core_1.Component({
            selector: "pb-menu-button",
            host: {
                "[attr.role]": "'button'"
            },
            moduleId: module.id,
            templateUrl: "menu-button.html",
            styleUrls: ["menu-button.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            bindings: [MENU_BUTTON_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MenuButton);
    return MenuButton;
}());
exports.MenuButton = MenuButton;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWVudS9tZW51LWJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBSU8sZUFBZSxDQUFDLENBQUE7QUFDdkIsdUJBQXNELGlCQUFpQixDQUFDLENBQUE7QUFDeEUscUJBQTJELFFBQVEsQ0FBQyxDQUFBO0FBQ3BFLDBCQUFvRCx3QkFBd0IsQ0FBQyxDQUFBO0FBRTdFLElBQU0sMEJBQTBCLEdBQUcsSUFBSSxlQUFRLENBQzNDLDBCQUFpQixFQUNqQjtJQUNJLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxVQUFVLEVBQVYsQ0FBVSxDQUFDO0lBQ3pDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FDSixDQUFDO0FBYUY7SUFlSSxvQkFBWSxVQUFzQjtRQWIzQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBTU4sY0FBUyxHQUF5QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUd4QyxpQkFBWSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBbUV6RCxhQUFRLEdBQUcsVUFBQyxDQUFDLElBQW1CLENBQUMsQ0FBQztRQUNsQyxjQUFTLEdBQUcsY0FBb0IsQ0FBQyxDQUFDO1FBL0R0QyxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFFOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsNkJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELHVDQUFrQixHQUFsQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtB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QixDQUFDO1NBQ3pDLENBQUM7O2tCQUFBO0lBOElGLGlCQUFDO0FBQUQsQ0E3SUEsQUE2SUMsSUFBQTtBQTdJWSxrQkFBVSxhQTZJdEIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL21lbnUvbWVudS1idXR0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLCBRdWVyeSwgUXVlcnlMaXN0LCBJbmplY3QsIElucHV0LCBPdXRwdXQsIENvbnRlbnRDaGlsZCxcbiAgICBQcm92aWRlclxufSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcbmltcG9ydCB7TWVudSwgSU1lbnVJdGVtTW91c2VFdmVudCwgSU1lbnVJdGVtS2V5RXZlbnR9IGZyb20gXCIuL21lbnVcIjtcbmltcG9ydCB7IERPV05fQVJST1csIFVQX0FSUk9XLCBFU0NBUEUsIEVOVEVSIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25zdGFudHNcIjtcblxuY29uc3QgTUVOVV9CVVRUT05fVkFMVUVfQUNDRVNTT1IgPSBuZXcgUHJvdmlkZXIoXG4gICAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAge1xuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNZW51QnV0dG9uKSxcbiAgICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4pO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwYi1tZW51LWJ1dHRvblwiLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgXCJbYXR0ci5yb2xlXVwiOiBcIididXR0b24nXCJcbiAgICB9LFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwibWVudS1idXR0b24uaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wibWVudS1idXR0b24uY3NzXCJdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgYmluZGluZ3M6IFtNRU5VX0JVVFRPTl9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTWVudUJ1dHRvbiBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBuYXRpdmVFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBAQ29udGVudENoaWxkKGZvcndhcmRSZWYoKCkgPT4gTWVudSkpXG4gICAgICAgIHByaXZhdGUgbWVudTogTWVudTtcblxuICAgIEBPdXRwdXQoKSBwcml2YXRlIGFjdGl2YXRlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwcml2YXRlIF92YWx1ZTogc3RyaW5nO1xuICAgIEBPdXRwdXQoXCJ2YWx1ZUNoYW5nZVwiKSBwcml2YXRlIHZhbHVlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHByaXZhdGUgX29uQmx1cjogKGV2OiBGb2N1c0V2ZW50KSA9PiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICB0aGlzLl9vbkJsdXIgPSB0aGlzLm9uQmx1ci5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgdGhpcy5fb25CbHVyLCB0cnVlKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMubWVudS52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhhc3BvcHVwXCIsIFN0cmluZyh0aGlzLmhhc01lbnUpKTtcbiAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgU3RyaW5nKHRoaXMuZXhwYW5kZWQpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIHRoaXMuX29uQmx1ciwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl92YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVudS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkLmVtaXQodmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFjdGl2YXRlZC5lbWl0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQgaGFzTWVudSgpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5tZW51KTtcbiAgICB9XG5cbiAgICBnZXQgZXhwYW5kZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lbnUgJiYgdGhpcy5tZW51Lm9wZW47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNoYW5nZSA9IChfKSA9PiB7IC8qIGJsYW5rICovIH07XG4gICAgcHJpdmF0ZSBvblRvdWNoZWQgPSAoKSA9PiB7IC8qIGJsYW5rICovIH07XG5cbiAgICBwcml2YXRlIG9uQnV0dG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMubWVudS5vcGVuKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZW51LnNob3codGhpcy5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25CdXR0b25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLm1lbnUub3Blbikge1xuICAgICAgICAgICAgbGV0IGhhbmRsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IFVQX0FSUk9XKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51LmZvY3VzKHRydWUpO1xuICAgICAgICAgICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnUuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IDxIVE1MRWxlbWVudD4gdGhpcy5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiOnNjb3BlID4gYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5mb2N1cygpO1xuICAgICAgICAgICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1lbnVDbGljayhldmVudDogSU1lbnVJdGVtTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuc3JjQ29tcG9uZW50ICYmICFldmVudC5zcmNDb21wb25lbnQuaGFzTWVudSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGV2ZW50LnNyY0NvbXBvbmVudC52YWx1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IDxIVE1MRWxlbWVudD4gdGhpcy5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiOnNjb3BlID4gYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5mb2N1cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTWVudUtleURvd24oZXZlbnQ6IElNZW51SXRlbUtleUV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5jdHJsS2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5tZXRhS2V5IHx8IGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgICAgICAgIHRoaXMub25NZW51Q2xpY2soPGFueT4gZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJsdXIoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5yZWxhdGVkVGFyZ2V0IHx8XG4gICAgICAgICAgICAhdGhpcy5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKDxhbnk+IGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9