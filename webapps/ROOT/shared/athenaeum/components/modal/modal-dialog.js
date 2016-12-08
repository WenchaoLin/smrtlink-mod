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
var modal_manager_1 = require("./modal-manager");
var ModalDialog = (function () {
    function ModalDialog(_manager, _elementRef) {
        this._manager = _manager;
        this.zIndex = -1;
        this.hiddenChanged = new core_1.EventEmitter(false);
        this.hiddenEvent = new core_1.EventEmitter(false);
        this.shownEvent = new core_1.EventEmitter(false);
        this._hidden = true;
        this._shown = false;
        this._nativeElement = _elementRef.nativeElement;
        this._nativeElement.hidden = true;
        this._nativeElement.addEventListener("transitionend", this.onTransitionEnd.bind(this));
    }
    ModalDialog.HideOnDeactivate = function () {
        return function (prototype, propertyKey) {
            var routerOnDeactivate = prototype.routerOnDeactivate;
            prototype.routerOnDeactivate = function () {
                var _this = this;
                return Promise.resolve(routerOnDeactivate ? routerOnDeactivate.apply(this, arguments) : null).then(function () {
                    return ModalDialog.hideDialogs(_this[propertyKey]);
                });
            };
        };
    };
    ModalDialog.hideDialogs = function (modals) {
        if (!modals) {
            return Promise.resolve(null);
        }
        return Promise.all(modals.map(function (modal) {
            return new Promise(function (resolve) {
                if (modal.hidden) {
                    resolve();
                    return;
                }
                var handle = modal.hiddenEvent.subscribe(function () {
                    handle.unsubscribe();
                    handle = null;
                    resolve();
                });
                modal.hidden = true;
            });
        })).then(function () {
            modals = null;
        });
    };
    Object.defineProperty(ModalDialog.prototype, "hidden", {
        get: function () {
            return this._hidden;
        },
        set: function (value) {
            value = Boolean(value);
            if (value && this._manager.showingModal(this) ||
                value !== this._hidden) {
                if (value) {
                    this._manager.hide(this);
                }
                else {
                    this._manager.show(this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalDialog.prototype, "hiding", {
        get: function () {
            return !this._hidden &&
                !this._shown &&
                !this._nativeElement.classList.contains("in");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalDialog.prototype, "showing", {
        get: function () {
            return !this._shown &&
                !this._hidden &&
                this._nativeElement.classList.contains("in");
        },
        enumerable: true,
        configurable: true
    });
    ModalDialog.prototype.show = function () {
        this.hidden = false;
    };
    ModalDialog.prototype.hide = function () {
        this.hidden = true;
    };
    ModalDialog.prototype.doShow = function (zIndex) {
        this.zIndex = zIndex;
        if (this.showing) {
            return;
        }
        else if (this._shown) {
            this.shownEvent.next(null);
            return;
        }
        this._nativeElement.removeAttribute("hidden");
        var _ = this._nativeElement.offsetWidth;
        this._hidden = false;
        this.hiddenChanged.next(false);
        this._nativeElement.classList.add("in");
    };
    ModalDialog.prototype.doHide = function () {
        if (this.hiding) {
            return;
        }
        else if (this._hidden) {
            this.hiddenEvent.next(null);
            return;
        }
        this._shown = false;
        this._nativeElement.classList.remove("in");
    };
    ModalDialog.prototype.onTransitionEnd = function (event) {
        if (event.target !== this._nativeElement &&
            event.propertyName !== "transform") {
            return;
        }
        if (this._nativeElement.classList.contains("in")) {
            this._shown = true;
            this.shownEvent.next(null);
        }
        else {
            this._hidden = true;
            this.hiddenChanged.next(true);
            this._nativeElement.hidden = true;
            this.zIndex = -1;
            this.hiddenEvent.next(null);
        }
    };
    __decorate([
        core_1.HostBinding("style.zIndex"), 
        __metadata('design:type', Number)
    ], ModalDialog.prototype, "zIndex", void 0);
    __decorate([
        core_1.Output("hiddenChange"), 
        __metadata('design:type', Object)
    ], ModalDialog.prototype, "hiddenChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ModalDialog.prototype, "hidden", null);
    ModalDialog = __decorate([
        core_1.Component({
            selector: "pb-modal-dialog",
            moduleId: module.id,
            template: "<div class=\"modal-dialog-content\">\n    <ng-content></ng-content>\n</div>",
            styleUrls: ["modal-dialog.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [modal_manager_1.ModalManager, core_1.ElementRef])
    ], ModalDialog);
    return ModalDialog;
}());
exports.ModalDialog = ModalDialog;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbW9kYWwvbW9kYWwtZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFHTyxlQUFlLENBQUMsQ0FBQTtBQUV2Qiw4QkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQVc3QztJQTRESSxxQkFBcUIsUUFBc0IsRUFDOUIsV0FBdUI7UUFEZixhQUFRLEdBQVIsUUFBUSxDQUFjO1FBM0RkLFdBQU0sR0FBVyxDQUFDLENBQUMsQ0FBQztRQUN6QixrQkFBYSxHQUFHLElBQUksbUJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRSxnQkFBVyxHQUFHLElBQUksbUJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxlQUFVLEdBQUcsSUFBSSxtQkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBdURuQixJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDaEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQ2hDLGVBQWUsRUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbEMsQ0FBQztJQUNOLENBQUM7SUFqRE0sNEJBQWdCLEdBQXZCO1FBQ0ksTUFBTSxDQUFDLFVBQVUsU0FHQyxFQUNELFdBQW1CO1lBQ2hDLElBQU0sa0JBQWtCLEdBQUcsU0FBUyxDQUFDLGtCQUFrQixDQUFDO1lBQ3hELFNBQVMsQ0FBQyxrQkFBa0IsR0FBRztnQkFBQSxpQkFNOUI7Z0JBTEcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQ2xCLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUN4RSxDQUFDLElBQUksQ0FB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O1FBQ1gsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQztJQUNMLENBQUM7SUFqS0Q7UUFBQyxrQkFBVyxDQUFDLGNBQWMsQ0FBQzs7K0NBQUE7SUFDNUI7UUFBQyxhQUFNLENBQUMsY0FBYyxDQUFDOztzREFBQTtJQW9FdkI7UUFBQyxZQUFLLEVBQUU7OzZDQUFBO0lBL0VaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSw2RUFFUDtZQUNILFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1lBQy9CLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3hDLENBQUM7O21CQUFBO0lBb0tGLGtCQUFDO0FBQUQsQ0FuS0EsQUFtS0MsSUFBQTtBQW5LWSxtQkFBVyxjQW1LdkIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL21vZGFsL21vZGFsLWRpYWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLFxuICAgIElucHV0LCBPdXRwdXQsIEhvc3RCaW5kaW5nXG59IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCB7TW9kYWxNYW5hZ2VyfSBmcm9tIFwiLi9tb2RhbC1tYW5hZ2VyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBiLW1vZGFsLWRpYWxvZ1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nLWNvbnRlbnRcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5gLFxuICAgIHN0eWxlVXJsczogW1wibW9kYWwtZGlhbG9nLmNzc1wiXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsRGlhbG9nIHtcbiAgICBASG9zdEJpbmRpbmcoXCJzdHlsZS56SW5kZXhcIikgekluZGV4OiBudW1iZXIgPSAtMTtcbiAgICBAT3V0cHV0KFwiaGlkZGVuQ2hhbmdlXCIpIGhpZGRlbkNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgICBoaWRkZW5FdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuICAgIHNob3duRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICAgIHByaXZhdGUgX2hpZGRlbiA9IHRydWU7XG4gICAgcHJpdmF0ZSBfc2hvd24gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9uYXRpdmVFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIF9zaG93SGFuZGxlOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBfaGlkZUhhbmRsZTogU3Vic2NyaXB0aW9uO1xuXG4gICAgLyoqXG4gICAgICogQSBkZWNvcmF0b3IgdG8gYW5ub3RhdGUgcHJvcGVydGllcyBob2xkaW5nIFF1ZXJ5TGlzdDxNb2RhbERpYWxvZz5cbiAgICAgKiB0byBmYWNpbGl0YXRlIGhpZGluZyB0aGUgZGlhbG9ncyBwcm9wZXJseSB3aGVuIGEgY29tcG9uZW50IGlzXG4gICAgICogZGVhY3RpdmF0ZWQgYnkgdGhlIHJvdXRlci4gVGhpcyBkZWNvcmF0b3IgYWxzbyBlbnN1cmVzIGFueSBleGlzdGluZ1xuICAgICAqIGByb3V0ZXJPbkRlYWN0aXZhdGUoKWAgbWV0aG9kIGlzIHByZXNlcnZlZCBhbmQgcnVuIGJlZm9yZSB0aGUgZGVhY3RpdmF0ZVxuICAgICAqIGxvZ2ljIHRoaXMgZGVjb3JhdG9yIGFkZHMuXG4gICAgICovXG4gICAgc3RhdGljIEhpZGVPbkRlYWN0aXZhdGUoKTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHByb3RvdHlwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtrZXk6IHN0cmluZ106IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXJPbkRlYWN0aXZhdGU/OiAoKSA9PiB2b2lkXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleTogc3RyaW5nKSB7XG4gICAgICAgICAgICBjb25zdCByb3V0ZXJPbkRlYWN0aXZhdGUgPSBwcm90b3R5cGUucm91dGVyT25EZWFjdGl2YXRlO1xuICAgICAgICAgICAgcHJvdG90eXBlLnJvdXRlck9uRGVhY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAgICAgICAgICAgICByb3V0ZXJPbkRlYWN0aXZhdGUgPyByb3V0ZXJPbkRlYWN0aXZhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IG51bGxcbiAgICAgICAgICAgICAgICApLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTW9kYWxEaWFsb2cuaGlkZURpYWxvZ3ModGhpc1twcm9wZXJ0eUtleV0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGlkZURpYWxvZ3MobW9kYWxzOiB7IG1hcChjYWxsYmFjazogKG1vZGFsOiBNb2RhbERpYWxvZykgPT4gUHJvbWlzZTxhbnk+KTogUHJvbWlzZTxhbnk+W107IH0pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBpZiAoIW1vZGFscykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwobW9kYWxzLm1hcChtb2RhbCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGFsLmhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGhhbmRsZTogU3Vic2NyaXB0aW9uID0gbW9kYWwuaGlkZGVuRXZlbnQuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIG1vZGFsLmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbW9kYWxzID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IgKHByaXZhdGUgX21hbmFnZXI6IE1vZGFsTWFuYWdlcixcbiAgICAgICAgICAgICAgICAgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5fbmF0aXZlRWxlbWVudCA9IF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX25hdGl2ZUVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uZW5kXCIsXG4gICAgICAgICAgICB0aGlzLm9uVHJhbnNpdGlvbkVuZC5iaW5kKHRoaXMpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgaGlkZGVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGlkZGVuO1xuICAgIH1cblxuICAgIHNldCBoaWRkZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdmFsdWUgPSBCb29sZWFuKHZhbHVlKTtcblxuICAgICAgICBpZiAodmFsdWUgJiYgdGhpcy5fbWFuYWdlci5zaG93aW5nTW9kYWwodGhpcykgfHxcbiAgICAgICAgICAgIHZhbHVlICE9PSB0aGlzLl9oaWRkZW4pIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuaGlkZSh0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5zaG93KHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGhpZGluZygpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLl9oaWRkZW4gJiZcbiAgICAgICAgICAgICAgICF0aGlzLl9zaG93biAmJlxuICAgICAgICAgICAgICAgIXRoaXMuX25hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5cIik7XG4gICAgfVxuXG4gICAgZ2V0IHNob3dpbmcoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5fc2hvd24gJiZcbiAgICAgICAgICAgICAgICF0aGlzLl9oaWRkZW4gJiZcbiAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5cIik7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgZG9TaG93KHpJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuekluZGV4ID0gekluZGV4O1xuXG4gICAgICAgIGlmICh0aGlzLnNob3dpbmcpIHtcbiAgICAgICAgICAgIC8vIEluIHRoZSBwcm9jZXNzIG9mIHNob3dpbmdcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zaG93bikge1xuICAgICAgICAgICAgLy8gSGlkZGVuIGFuZCBkb25lIGhpZGluZ1xuICAgICAgICAgICAgdGhpcy5zaG93bkV2ZW50Lm5leHQobnVsbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9uYXRpdmVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKTtcblxuICAgICAgICAvLyBGb3JjZSBhIHJlZmxvd1xuICAgICAgICBjb25zdCBfID0gdGhpcy5fbmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgICAgICAvLyBEbyB0aGlzIGFmdGVyIHRoZSByZWZsb3cgc28gdGhlIGV2ZW50IGNhbiBiZSB1c2VkIHRvIG1hbnVhbGx5XG4gICAgICAgIC8vIHJlc2l6ZSBjb21wb25lbnRzIHdpdGhpbiB0aGUgbW9kYWxcbiAgICAgICAgdGhpcy5faGlkZGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGlkZGVuQ2hhbmdlZC5uZXh0KGZhbHNlKTtcblxuICAgICAgICB0aGlzLl9uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpblwiKTtcbiAgICB9XG5cbiAgICBkb0hpZGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmhpZGluZykge1xuICAgICAgICAgICAgLy8gSW4gdGhlIHByb2Nlc3Mgb2YgaGlkaW5nXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5faGlkZGVuKSB7XG4gICAgICAgICAgICAvLyBIaWRkZW4gYW5kIGRvbmUgaGlkaW5nXG4gICAgICAgICAgICB0aGlzLmhpZGRlbkV2ZW50Lm5leHQobnVsbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zaG93biA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJpblwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVHJhbnNpdGlvbkVuZChldmVudDogVHJhbnNpdGlvbkV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgIT09IHRoaXMuX25hdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgICAgIGV2ZW50LnByb3BlcnR5TmFtZSAhPT0gXCJ0cmFuc2Zvcm1cIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImluXCIpKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG93biA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNob3duRXZlbnQubmV4dChudWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2hpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmhpZGRlbkNoYW5nZWQubmV4dCh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuekluZGV4ID0gLTE7XG4gICAgICAgICAgICB0aGlzLmhpZGRlbkV2ZW50Lm5leHQobnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=