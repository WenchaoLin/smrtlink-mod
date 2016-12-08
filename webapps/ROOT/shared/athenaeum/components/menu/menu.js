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
var constants_1 = require("../../common/constants");
var MenuItem = (function () {
    function MenuItem(elementRef, value) {
        this.tabindex = -1;
        this.activateEvent = new core_1.EventEmitter();
        this._selected = false;
        this.nativeElement = elementRef.nativeElement;
        this.selected = this.selected != null && this.selected !== false;
        if (value != null) {
            this._value = value;
        }
    }
    MenuItem.prototype.ngAfterContentInit = function () {
        this._expanded = this.hasMenu ? false : undefined;
        this._value = this.hasMenu ? null : this._value;
    };
    MenuItem.prototype.ngAfterContentChecked = function () {
        this.nativeElement.setAttribute("aria-haspopup", String(this.hasMenu));
        if (this.expanded === undefined) {
            this.nativeElement.removeAttribute("aria-expanded");
        }
        else {
            this.nativeElement.setAttribute("aria-expanded", String(this.expanded));
        }
        this.nativeElement.classList.toggle("selected", this.selected);
    };
    MenuItem.prototype.onClick = function (event) {
        if (event.srcComponent) {
            if (!event.srcComponent.hasMenu && this.hasMenu) {
                this.expanded = false;
            }
            return;
        }
        event.srcComponent = this;
        if (!this.hasMenu) {
            this.activateEvent.next(this);
        }
        else {
            this.expanded = !this.expanded;
        }
    };
    MenuItem.prototype.onKeyDown = function (event) {
        var _this = this;
        if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) {
            return;
        }
        var keyCode = event.which || event.keyCode;
        if (event.srcComponent) {
            if (keyCode === constants_1.ENTER &&
                !event.srcComponent.hasMenu && this.hasMenu) {
                this.expanded = false;
            }
            if (keyCode === constants_1.ESCAPE || keyCode === constants_1.LEFT_ARROW) {
                this.expanded = false;
                this.focus();
                event.preventDefault();
                event.stopPropagation();
            }
            return;
        }
        event.srcComponent = this;
        if (keyCode === constants_1.ENTER) {
            if (!this.hasMenu) {
                this.activateEvent.next(this);
            }
            else {
                this.expanded = !this.expanded;
                if (this.expanded) {
                    setTimeout(function () {
                        _this.menu.focus();
                    });
                }
            }
        }
        else if (keyCode === constants_1.RIGHT_ARROW) {
            if (this.hasMenu) {
                this.expanded = true;
                setTimeout(function () {
                    _this.menu.focus();
                });
                event.preventDefault();
                event.stopPropagation();
            }
        }
    };
    MenuItem.prototype.focus = function () {
        this.focusable = true;
        this.nativeElement.focus();
    };
    Object.defineProperty(MenuItem.prototype, "value", {
        get: function () {
            if (this.hasMenu) {
                return null;
            }
            return this._value;
        },
        set: function (value) {
            if (this.hasMenu) {
                this.menu.value = value;
            }
            else {
                this._value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "focusable", {
        get: function () {
            return this.tabindex > -1;
        },
        set: function (value) {
            this.tabindex = (value != null && value !== false) ? 0 : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "offsetTop", {
        get: function () {
            return this.nativeElement.offsetTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "offsetHeight", {
        get: function () {
            return this.nativeElement.offsetHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "hasMenu", {
        get: function () {
            return Boolean(this.menu);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (value) {
            if (!this.hasMenu) {
                value = undefined;
            }
            else {
                this.menu.open = value;
            }
            this._expanded = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "visible", {
        get: function () {
            return !(!this.nativeElement.offsetWidth ||
                !this.nativeElement.offsetHeight);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MenuItem.prototype, "selected", void 0);
    __decorate([
        core_1.ContentChild(core_1.forwardRef(function () { return Menu; })), 
        __metadata('design:type', Menu)
    ], MenuItem.prototype, "menu", void 0);
    __decorate([
        core_1.HostBinding("attr.tabindex"), 
        __metadata('design:type', Number)
    ], MenuItem.prototype, "tabindex", void 0);
    __decorate([
        core_1.Output("activate"), 
        __metadata('design:type', Object)
    ], MenuItem.prototype, "activateEvent", void 0);
    __decorate([
        core_1.HostListener("click", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MenuItem.prototype, "onClick", null);
    __decorate([
        core_1.HostListener("keydown", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MenuItem.prototype, "onKeyDown", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuItem.prototype, "value", null);
    MenuItem = __decorate([
        core_1.Directive({
            selector: "pb-menu-item",
            host: {
                "[attr.role]": "'menuitem'"
            }
        }),
        __param(1, core_1.Attribute("value")), 
        __metadata('design:paramtypes', [core_1.ElementRef, Object])
    ], MenuItem);
    return MenuItem;
}());
exports.MenuItem = MenuItem;
var MENU_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Menu; }),
    multi: true
});
var Menu = (function () {
    function Menu(elementRef, parentItem) {
        this._open = false;
        this.valueChanged = new core_1.EventEmitter();
        this.openEvent = new core_1.EventEmitter(false);
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.nativeElement = elementRef.nativeElement;
        this.isSubMenu = Boolean(parentItem);
        this.nativeElement.hidden = this.closed;
        this._onBlur = this.onBlur.bind(this);
    }
    Menu.prototype.ngOnInit = function () {
        if (!this.isSubMenu) {
            this.nativeElement.addEventListener("blur", this._onBlur, true);
        }
    };
    Menu.prototype.ngAfterContentInit = function () {
        var value = this._value;
        this._value = {};
        this.value = value;
    };
    Menu.prototype.ngOnDestroy = function () {
        if (!this.isSubMenu) {
            this.nativeElement.removeEventListener("blur", this._onBlur, true);
        }
    };
    Menu.prototype.writeValue = function (value) {
        this.value = value;
    };
    Menu.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    Menu.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    Menu.prototype.show = function (buttonRect) {
        var _this = this;
        this.nativeElement.classList.add("offscreen");
        this.nativeElement.style.width = buttonRect.width + "px";
        this.open = true;
        var _ = this.nativeElement.offsetWidth;
        var overflowParent = this.nativeElement;
        do {
            overflowParent = overflowParent.parentElement;
        } while (overflowParent !== document.body &&
            window.getComputedStyle(overflowParent).overflow === "visible");
        var overflowRect = overflowParent.getBoundingClientRect();
        var menuHeight = this.nativeElement.offsetHeight;
        var menuRect = this.nativeElement.getBoundingClientRect();
        if (menuRect.bottom > overflowRect.bottom) {
            this.nativeElement.classList.add("up");
        }
        this.nativeElement.classList.remove("offscreen");
        var menuClientHeight = this.nativeElement.clientHeight;
        if (this.nativeElement.scrollHeight > menuClientHeight) {
            this.children.map(function (item) {
                if (item.focusable && !item.selected) {
                    item.focusable = false;
                }
                if (item.selected) {
                    item.focusable = true;
                    var scrollPosition = item.offsetTop - _this.nativeElement.scrollTop;
                    var scrollBottom = scrollPosition + item.offsetHeight;
                    if (scrollPosition < 0 ||
                        scrollBottom >= menuClientHeight) {
                        _this.nativeElement.scrollTop = item.offsetTop;
                    }
                }
            });
        }
    };
    Menu.prototype.hide = function () {
        this.open = false;
        this.nativeElement.classList.remove("up");
        this.nativeElement.style.width =
            this.nativeElement.style.bottom =
                this.nativeElement.style.top =
                    this.nativeElement.style.left = "";
    };
    Menu.prototype.onClick = function (event) {
        if (event.srcComponent && !event.srcComponent.hasMenu) {
            this.value = event.srcComponent.value;
            this.open = false;
        }
    };
    Menu.prototype.onKeyDown = function (event) {
        if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) {
            return;
        }
        var which = event.which || event.keyCode;
        var handled = false;
        switch (which) {
            case constants_1.UP_ARROW:
                this._focusPrev(event);
                handled = true;
                break;
            case constants_1.DOWN_ARROW:
                this._focusNext(event);
                handled = true;
                break;
            case constants_1.ENTER:
                this.onClick(event);
                break;
            case constants_1.ESCAPE:
                if (!this.isSubMenu) {
                    this.open = false;
                    handled = true;
                }
                break;
            default:
                break;
        }
        if (handled) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    Menu.prototype.focus = function (last) {
        if (last === void 0) { last = false; }
        if (last) {
            this.children.last.focus();
        }
        else {
            this.children.first.focus();
        }
    };
    Object.defineProperty(Menu.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (!this.children.length) {
                this._value = value;
                return;
            }
            if (value !== this._value) {
                var found_1 = false;
                this.children.map(function (child) {
                    if (!child.hasMenu) {
                        if (!found_1 && child.value === value) {
                            found_1 = child.selected = true;
                        }
                        else {
                            child.selected = false;
                        }
                    }
                    else {
                        if (!found_1) {
                            child.value = value;
                            found_1 = child.value === value;
                        }
                        else {
                            child.value = null;
                        }
                    }
                });
                if (found_1 || !this.isSubMenu) {
                    this._value = value;
                    this.valueChanged.next(value);
                    this.onChange(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (value) {
            value = Boolean(value);
            var oldValue = this._open;
            this._open = value;
            this.nativeElement.hidden = this.closed;
            var _ = this.nativeElement.offsetWidth;
            if (value) {
                this.children.first.focusable = true;
            }
            else {
                this.children.map(function (child) {
                    if (child.hasMenu) {
                        child.expanded = false;
                    }
                    child.focusable = false;
                });
            }
            this.openEvent.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "closed", {
        get: function () {
            return !this.open;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "visible", {
        get: function () {
            return !(!this.nativeElement.offsetWidth ||
                !this.nativeElement.offsetHeight);
        },
        enumerable: true,
        configurable: true
    });
    Menu.prototype._focusPrev = function (event) {
        this._moveFocus(event, -1);
    };
    Menu.prototype._focusNext = function (event) {
        this._moveFocus(event, 1);
    };
    Menu.prototype._moveFocus = function (event, direction) {
        var children = this.children.map(function (child) { return child; })
            .filter(function (child) { return child.visible; });
        var targetIndex = children.findIndex(function (child) { return child === event.srcComponent; });
        if (targetIndex > -1) {
            var siblingIndex = targetIndex + direction;
            if (siblingIndex === children.length) {
                siblingIndex = 0;
            }
            else if (siblingIndex < 0) {
                siblingIndex = children.length - 1;
            }
            children[targetIndex].focusable = false;
            children[siblingIndex].focus();
        }
    };
    Menu.prototype.onBlur = function (event) {
        if (!event.relatedTarget ||
            !this.nativeElement.contains(event.relatedTarget)) {
            this.open = false;
            this.onTouched();
        }
    };
    __decorate([
        core_1.ContentChildren(MenuItem), 
        __metadata('design:type', core_1.QueryList)
    ], Menu.prototype, "children", void 0);
    __decorate([
        core_1.HostBinding("class.sub-menu"), 
        __metadata('design:type', Boolean)
    ], Menu.prototype, "isSubMenu", void 0);
    __decorate([
        core_1.Output("valueChange"), 
        __metadata('design:type', Object)
    ], Menu.prototype, "valueChanged", void 0);
    __decorate([
        core_1.Output("openChange"), 
        __metadata('design:type', Object)
    ], Menu.prototype, "openEvent", void 0);
    __decorate([
        core_1.HostListener("click", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Menu.prototype, "onClick", null);
    __decorate([
        core_1.HostListener("keydown", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Menu.prototype, "onKeyDown", null);
    __decorate([
        core_1.HostBinding("attr.aria-hidden"), 
        __metadata('design:type', Object)
    ], Menu.prototype, "closed", null);
    Menu = __decorate([
        core_1.Component({
            selector: "pb-menu",
            host: {
                "[attr.role]": "'menu'"
            },
            moduleId: module.id,
            template: "<ng-content></ng-content>",
            styleUrls: ["menu.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(1, core_1.Optional()),
        __param(1, core_1.Host()),
        __param(1, core_1.Inject(MenuItem)), 
        __metadata('design:paramtypes', [core_1.ElementRef, Object])
    ], Menu);
    return Menu;
}());
exports.Menu = Menu;
exports.MENU_DIRECTIVES = [Menu, MenuItem];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWVudS9tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFLTyxlQUFlLENBQUMsQ0FBQTtBQUN2Qix1QkFBc0QsaUJBQWlCLENBQUMsQ0FBQTtBQUV4RSwwQkFFTyx3QkFBd0IsQ0FBQyxDQUFBO0FBZ0JoQztJQWNJLGtCQUFZLFVBQXNCLEVBQXNCLEtBQUs7UUFSdkIsYUFBUSxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRWhDLGtCQUFhLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFJdkQsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUcvQixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFFOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQztRQUNqRSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDO0lBQ0wsQ0FBQztJQUVELHFDQUFrQixHQUFsQjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ2xELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNwRCxDQUFDO0lBRUQsd0NBQXFCLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN2RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FB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LENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUM7SUFDTCxDQUFDO0lBNVJEO1FBQUMsc0JBQWUsQ0FBQyxRQUFRLENBQUM7OzBDQUFBO0lBRzFCO1FBQUMsa0JBQVcsQ0FBQyxnQkFBZ0IsQ0FBQzs7MkNBQUE7SUFJOUI7UUFBQyxhQUFNLENBQUMsYUFBYSxDQUFDOzs4Q0FBQTtJQUN0QjtRQUFDLGFBQU0sQ0FBQyxZQUFZLENBQUM7OzJDQUFBO0lBOEdyQjtRQUFDLG1CQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7dUNBQUE7SUFRbEM7UUFBQyxtQkFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O3lDQUFBO0lBOEdwQztRQUFDLGtCQUFXLENBQUMsa0JBQWtCLENBQUM7O3NDQUFBO0lBelBwQztRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixJQUFJLEVBQUU7Z0JBQ0YsYUFBYSxFQUFFLFFBQVE7YUFHMUI7WUFDRCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDdkIsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7U0FDeEMsQ0FBQzttQkFrQmUsZUFBUSxFQUFFO21CQUFFLFdBQUksRUFBRTttQkFBRSxhQUFNLENBQUMsUUFBUSxDQUFDOztZQWxCbkQ7SUErUkYsV0FBQztBQUFELENBOVJBLEFBOFJDLElBQUE7QUE5UlksWUFBSSxPQThSaEIsQ0FBQTtBQUVZLHVCQUFlLEdBQUcsQ0FBRSxJQUFJLEVBQUUsUUFBUSxDQUFFLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy9tZW51L21lbnUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLFxuICAgIE9wdGlvbmFsLCBIb3N0LCBRdWVyeUxpc3QsIEF0dHJpYnV0ZSwgSW5qZWN0LCBJbnB1dCwgT3V0cHV0LFxuICAgIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIENvbnRlbnRDaGlsZHJlbiwgQ29udGVudENoaWxkLCBmb3J3YXJkUmVmLFxuICAgIFByb3ZpZGVyXG59IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSBcImFuZ3VsYXIyL2NvbW1vblwiO1xuaW1wb3J0IHtTY2hlZHVsZXJ9IGZyb20gXCJyeGpzL1J4XCI7XG5pbXBvcnQge1xuICAgIExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBVUF9BUlJPVywgRE9XTl9BUlJPVywgRU5URVIsIEVTQ0FQRVxufSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNZW51SXRlbUtleUV2ZW50IGV4dGVuZHMgS2V5Ym9hcmRFdmVudCB7XG4gICAgc3JjQ29tcG9uZW50OiBNZW51SXRlbTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTWVudUl0ZW1Nb3VzZUV2ZW50IGV4dGVuZHMgTW91c2VFdmVudCB7XG4gICAgc3JjQ29tcG9uZW50OiBNZW51SXRlbTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwicGItbWVudS1pdGVtXCIsXG4gICAgaG9zdDoge1xuICAgICAgICBcIlthdHRyLnJvbGVdXCI6IFwiJ21lbnVpdGVtJ1wiXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNZW51SXRlbSB7XG4gICAgQElucHV0KCkgcHVibGljIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBuYXRpdmVFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBAQ29udGVudENoaWxkKGZvcndhcmRSZWYoKCkgPT4gTWVudSkpIHByaXZhdGUgbWVudTogTWVudTtcblxuICAgIEBIb3N0QmluZGluZyhcImF0dHIudGFiaW5kZXhcIikgcHJpdmF0ZSB0YWJpbmRleDogbnVtYmVyID0gLTE7XG5cbiAgICBAT3V0cHV0KFwiYWN0aXZhdGVcIikgcHJpdmF0ZSBhY3RpdmF0ZUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IHN0cmluZztcbiAgICBwcml2YXRlIF9leHBhbmRlZDogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9zZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgQEF0dHJpYnV0ZShcInZhbHVlXCIpIHZhbHVlKSB7XG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZCAhPSBudWxsICYmIHRoaXMuc2VsZWN0ZWQgIT09IGZhbHNlO1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5fZXhwYW5kZWQgPSB0aGlzLmhhc01lbnUgPyBmYWxzZSA6IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB0aGlzLmhhc01lbnUgPyBudWxsIDogdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1oYXNwb3B1cFwiLCBTdHJpbmcodGhpcy5oYXNNZW51KSk7XG4gICAgICAgIGlmICh0aGlzLmV4cGFuZGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgU3RyaW5nKHRoaXMuZXhwYW5kZWQpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcInNlbGVjdGVkXCIsIHRoaXMuc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogRXZlbnQgaGFuZGxlcnNcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIiwgW1wiJGV2ZW50XCJdKVxuICAgIG9uQ2xpY2soZXZlbnQ6IElNZW51SXRlbU1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnNyY0NvbXBvbmVudCkge1xuICAgICAgICAgICAgaWYgKCFldmVudC5zcmNDb21wb25lbnQuaGFzTWVudSAmJiB0aGlzLmhhc01lbnUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5zcmNDb21wb25lbnQgPSB0aGlzO1xuXG4gICAgICAgIGlmICghdGhpcy5oYXNNZW51KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlRXZlbnQubmV4dCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJrZXlkb3duXCIsIFtcIiRldmVudFwiXSlcbiAgICBvbktleURvd24oZXZlbnQ6IElNZW51SXRlbUtleUV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5jdHJsS2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5tZXRhS2V5IHx8IGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQud2hpY2ggfHwgZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBpZiAoZXZlbnQuc3JjQ29tcG9uZW50KSB7XG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PT0gRU5URVIgJiZcbiAgICAgICAgICAgICAgICAgICAgIWV2ZW50LnNyY0NvbXBvbmVudC5oYXNNZW51ICYmIHRoaXMuaGFzTWVudSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09PSBFU0NBUEUgfHwga2V5Q29kZSA9PT0gTEVGVF9BUlJPVykge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnNyY0NvbXBvbmVudCA9IHRoaXM7XG5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzTWVudSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVFdmVudC5uZXh0KHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFJJR0hUX0FSUk9XKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNNZW51KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAqIEFQSVxuICAgICAqL1xuICAgIGZvY3VzKCkge1xuICAgICAgICB0aGlzLmZvY3VzYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogR2V0dGVycyBhbmQgU2V0dGVyc1xuICAgICAqL1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc01lbnUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5oYXNNZW51KSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZm9jdXNhYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50YWJpbmRleCA+IC0xO1xuICAgIH1cblxuICAgIHNldCBmb2N1c2FibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy50YWJpbmRleCA9ICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBmYWxzZSkgPyAwIDogLTE7XG4gICAgfVxuXG4gICAgZ2V0IG9mZnNldFRvcCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcDtcbiAgICB9XG5cbiAgICBnZXQgb2Zmc2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIH1cblxuICAgIC8qXG4gICAgICogaGFzTWVudSBwcm9wZXJ0eVxuICAgICAqL1xuICAgIGdldCBoYXNNZW51KCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLm1lbnUpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogZXhwYW5kZWQgcHJvcGVydHlcbiAgICAgKi9cbiAgICBnZXQgZXhwYW5kZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHBhbmRlZDtcbiAgICB9XG5cbiAgICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc01lbnUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZW51Lm9wZW4gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9leHBhbmRlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogdmlzaWJsZSBwcm9wZXJ0eVxuICAgICAqL1xuICAgIGdldCB2aXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gISghdGhpcy5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIHx8XG4gICAgICAgICAgICAhdGhpcy5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCk7XG4gICAgfVxufVxuXG5jb25zdCBNRU5VX1ZBTFVFX0FDQ0VTU09SID0gbmV3IFByb3ZpZGVyKFxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHtcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWVudSksXG4gICAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicGItbWVudVwiLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgXCJbYXR0ci5yb2xlXVwiOiBcIidtZW51J1wiXG4gICAgICAgIC8vIFwiW2hpZGRlbl1cIiBpcyBub3QgaGFuZGxlZCBoZXJlIHNvIHdlIGNhbiBpbW1lZGlhdGVseVxuICAgICAgICAvLyByZWZsb3cgdGhlIGRvY3VtZW50IHdoZW4gaXQgaXMgYXBwbGllZFxuICAgIH0sXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZTogXCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XCIsXG4gICAgc3R5bGVVcmxzOiBbXCJtZW51LmNzc1wiXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1lbnUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgQENvbnRlbnRDaGlsZHJlbihNZW51SXRlbSkgcHJpdmF0ZSBjaGlsZHJlbjogUXVlcnlMaXN0PE1lbnVJdGVtPjtcblxuICAgIHByaXZhdGUgbmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3Muc3ViLW1lbnVcIikgcHJpdmF0ZSBpc1N1Yk1lbnU6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIF92YWx1ZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX29wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBAT3V0cHV0KFwidmFsdWVDaGFuZ2VcIikgcHJpdmF0ZSB2YWx1ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dChcIm9wZW5DaGFuZ2VcIikgcHJpdmF0ZSBvcGVuRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICAgIHByaXZhdGUgX29uQmx1cjogKGV2OiBGb2N1c0V2ZW50KSA9PiBhbnk7XG5cbiAgICBwcml2YXRlIG9uQ2hhbmdlID0gKF8pID0+IHsgLyogYmxhbmsgKi8gfTtcbiAgICBwcml2YXRlIG9uVG91Y2hlZCA9ICgpID0+IHsgLyogYmxhbmsgKi8gfTtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBASW5qZWN0KE1lbnVJdGVtKVxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRJdGVtOiBhbnkpIHtcblxuICAgICAgICAvLyByZW1lbWJlciBvdXIgRE9NIGVsZW1lbnRcbiAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50ID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLmlzU3ViTWVudSA9IEJvb2xlYW4ocGFyZW50SXRlbSk7XG5cbiAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LmhpZGRlbiA9IHRoaXMuY2xvc2VkO1xuXG4gICAgICAgIHRoaXMuX29uQmx1ciA9IHRoaXMub25CbHVyLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N1Yk1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCB0aGlzLl9vbkJsdXIsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IDxhbnk+IHt9O1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N1Yk1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYmx1clwiLCB0aGlzLl9vbkJsdXIsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNob3coYnV0dG9uUmVjdDogQ2xpZW50UmVjdCkge1xuICAgICAgICAvLyB0aGlzLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImZpeGVkXCIpO1xuICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm9mZnNjcmVlblwiKTtcbiAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gYCR7YnV0dG9uUmVjdC53aWR0aH1weGA7XG5cbiAgICAgICAgdGhpcy5vcGVuID0gdHJ1ZTtcblxuICAgICAgICAvLyBmb3JjZSBhIHJlZmxvd1xuICAgICAgICBsZXQgXyA9IHRoaXMubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgICAgICBsZXQgb3ZlcmZsb3dQYXJlbnQgPSB0aGlzLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIG92ZXJmbG93UGFyZW50ID0gb3ZlcmZsb3dQYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfSB3aGlsZSAob3ZlcmZsb3dQYXJlbnQgIT09IGRvY3VtZW50LmJvZHkgJiZcbiAgICAgICAgICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG92ZXJmbG93UGFyZW50KS5vdmVyZmxvdyA9PT0gXCJ2aXNpYmxlXCIpO1xuXG4gICAgICAgIGNvbnN0IG92ZXJmbG93UmVjdCA9IG92ZXJmbG93UGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBtZW51SGVpZ2h0ID0gdGhpcy5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgY29uc3QgbWVudVJlY3QgPSB0aGlzLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgaWYgKG1lbnVSZWN0LmJvdHRvbSA+IG92ZXJmbG93UmVjdC5ib3R0b20pIHtcbiAgICAgICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidXBcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJvZmZzY3JlZW5cIik7XG5cbiAgICAgICAgY29uc3QgbWVudUNsaWVudEhlaWdodCA9IHRoaXMubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGlmICh0aGlzLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gbWVudUNsaWVudEhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5mb2N1c2FibGUgJiYgIWl0ZW0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mb2N1c2FibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mb2N1c2FibGUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFNjcm9sbCB0aGUgaXRlbSBpbnRvIHZpZXcgb25seSBpZiBuZWVkZWRcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbFBvc2l0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub2Zmc2V0VG9wIC0gdGhpcy5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbEJvdHRvbSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxQb3NpdGlvbiArIGl0ZW0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsUG9zaXRpb24gPCAwIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxCb3R0b20gID49IG1lbnVDbGllbnRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBpdGVtLm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwidXBcIik7XG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9XG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYm90dG9tID1cbiAgICAgICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPVxuICAgICAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBcIlwiO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogZXZlbnQgaGFuZGxlcnNcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIiwgW1wiJGV2ZW50XCJdKVxuICAgIG9uQ2xpY2soZXZlbnQ6IElNZW51SXRlbU1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnNyY0NvbXBvbmVudCAmJiAhZXZlbnQuc3JjQ29tcG9uZW50Lmhhc01lbnUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBldmVudC5zcmNDb21wb25lbnQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJrZXlkb3duXCIsIFtcIiRldmVudFwiXSlcbiAgICBvbktleURvd24oZXZlbnQ6IElNZW51SXRlbUtleUV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5jdHJsS2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5tZXRhS2V5IHx8IGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB3aGljaCA9IGV2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGU7XG4gICAgICAgIGxldCBoYW5kbGVkID0gZmFsc2U7XG5cbiAgICAgICAgc3dpdGNoICh3aGljaCkge1xuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgICAgICAgICB0aGlzLl9mb2N1c1ByZXYoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMuX2ZvY3VzTmV4dChldmVudCk7XG4gICAgICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxuICAgICAgICAgICAgICAgIHRoaXMub25DbGljayg8YW55PiBldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVTQ0FQRTpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTdWJNZW51KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhbmRsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzKGxhc3Q6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAobGFzdCkge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5sYXN0LmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmZpcnN0LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAqIFByb3BlcnR5IGdldHRlcnMgYW5kIHNldHRlcnNcbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5tYXAoY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghY2hpbGQuaGFzTWVudSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kICYmIGNoaWxkLnZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSBjaGlsZC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gY2hpbGQudmFsdWUgPT09IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZm91bmQgfHwgIXRoaXMuaXNTdWJNZW51KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZC5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBvcGVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbjtcbiAgICB9XG5cbiAgICBzZXQgb3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB2YWx1ZSA9IEJvb2xlYW4odmFsdWUpO1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuX29wZW47XG5cbiAgICAgICAgdGhpcy5fb3BlbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuaGlkZGVuID0gdGhpcy5jbG9zZWQ7XG5cbiAgICAgICAgLy8gZm9yY2UgYSByZWZsb3dcbiAgICAgICAgY29uc3QgXyA9IHRoaXMubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uZmlyc3QuZm9jdXNhYmxlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ubWFwKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuaGFzTWVudSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGlsZC5mb2N1c2FibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3BlbkV2ZW50Lm5leHQodmFsdWUpO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImF0dHIuYXJpYS1oaWRkZW5cIilcbiAgICBnZXQgY2xvc2VkKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMub3BlbjtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIHZpc2libGUgcHJvcGVydHlcbiAgICAgKi9cbiAgICBnZXQgdmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuICEoIXRoaXMubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fFxuICAgICAgICAgICAgICAgICAhdGhpcy5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZm9jdXNQcmV2KGV2ZW50OiBJTWVudUl0ZW1LZXlFdmVudCkge1xuICAgICAgICB0aGlzLl9tb3ZlRm9jdXMoZXZlbnQsIC0xKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9mb2N1c05leHQoZXZlbnQ6IElNZW51SXRlbUtleUV2ZW50KSB7XG4gICAgICAgIHRoaXMuX21vdmVGb2N1cyhldmVudCwgMSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbW92ZUZvY3VzKGV2ZW50OiBJTWVudUl0ZW1LZXlFdmVudCwgZGlyZWN0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihjaGlsZCA9PiBjaGlsZC52aXNpYmxlKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0SW5kZXggPSBjaGlsZHJlbi5maW5kSW5kZXgoXG4gICAgICAgICAgICBjaGlsZCA9PiBjaGlsZCA9PT0gZXZlbnQuc3JjQ29tcG9uZW50XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRhcmdldEluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIGxldCBzaWJsaW5nSW5kZXg6IG51bWJlciA9IHRhcmdldEluZGV4ICsgZGlyZWN0aW9uO1xuXG4gICAgICAgICAgICBpZiAoc2libGluZ0luZGV4ID09PSBjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzaWJsaW5nSW5kZXggPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzaWJsaW5nSW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgc2libGluZ0luZGV4ID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2hpbGRyZW5bdGFyZ2V0SW5kZXhdLmZvY3VzYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgY2hpbGRyZW5bc2libGluZ0luZGV4XS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkJsdXIoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5yZWxhdGVkVGFyZ2V0IHx8XG4gICAgICAgICAgICAhdGhpcy5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKDxhbnk+IGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBNRU5VX0RJUkVDVElWRVMgPSBbIE1lbnUsIE1lbnVJdGVtIF07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=