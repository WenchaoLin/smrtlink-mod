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
var ModalUnderlay = (function () {
    function ModalUnderlay(_manager, _elementRef) {
        this._manager = _manager;
        this.hiddenEvent = new core_1.EventEmitter(false);
        this.shownEvent = new core_1.EventEmitter(false);
        this._hidden = true;
        this._shown = false;
        this._nativeElement = _elementRef.nativeElement;
        this._nativeElement.hidden = true;
        this._nativeElement.addEventListener("transitionend", this.onTransitionEnd.bind(this));
    }
    Object.defineProperty(ModalUnderlay.prototype, "hidden", {
        get: function () {
            return this._hidden;
        },
        set: function (value) {
            this._hidden = Boolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalUnderlay.prototype, "hiding", {
        get: function () {
            return !this.hidden &&
                !this._shown &&
                !this._nativeElement.classList.contains("in");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalUnderlay.prototype, "showing", {
        get: function () {
            return !this._shown &&
                !this.hidden &&
                this._nativeElement.classList.contains("in");
        },
        enumerable: true,
        configurable: true
    });
    ModalUnderlay.prototype.ngOnInit = function () {
        this._manager.registerUnderlay(this);
    };
    ModalUnderlay.prototype.show = function () {
        if (this.showing) {
            return;
        }
        else if (this._shown) {
            this.shownEvent.next(null);
            return;
        }
        this.hidden = false;
        this._nativeElement.hidden = false;
        var _ = this._nativeElement.offsetWidth;
        this._nativeElement.classList.add("in");
    };
    ModalUnderlay.prototype.hide = function () {
        if (this.hiding) {
            return;
        }
        else if (this.hidden) {
            this.hiddenEvent.next(null);
            return;
        }
        this._shown = false;
        this._nativeElement.classList.remove("in");
    };
    ModalUnderlay.prototype.onTransitionEnd = function (event) {
        if (event.target !== this._nativeElement) {
            return;
        }
        if (this._nativeElement.classList.contains("in")) {
            this._shown = true;
            this.shownEvent.next(null);
        }
        else {
            this.hidden = true;
            this._nativeElement.hidden = true;
            var _ = this._nativeElement.offsetWidth;
            this.hiddenEvent.next(null);
        }
    };
    ModalUnderlay = __decorate([
        core_1.Component({
            selector: "pb-modal-underlay",
            moduleId: module.id,
            template: "",
            styleUrls: ["modal-underlay.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [modal_manager_1.ModalManager, core_1.ElementRef])
    ], ModalUnderlay);
    return ModalUnderlay;
}());
exports.ModalUnderlay = ModalUnderlay;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbW9kYWwvbW9kYWwtdW5kZXJsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUVPLGVBQWUsQ0FBQyxDQUFBO0FBRXZCLDhCQUEyQixpQkFBaUIsQ0FBQyxDQUFBO0FBUzdDO0lBUUksdUJBQW9CLFFBQXNCLEVBQzlCLFdBQXVCO1FBRGYsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQVAxQyxnQkFBVyxHQUFHLElBQUksbUJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxlQUFVLEdBQUcsSUFBSSxtQkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBS25CLElBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUNoRCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FDaEMsZUFBZSxFQUNmLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNsQyxDQUFDO0lBQ04sQ0FBQztJQUVELHNCQUFJLGlDQUFNO2FBQVY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDO2FBRUQsVUFBVyxLQUFjO1lBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUM7OztPQUpBO0lBTUQsc0JBQUksaUNBQU07YUFBVjtZQUNJLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNO2dCQUNaLENBQUMsSUFBSSxDQUFDLE1BQU07Z0JBQ1osQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxrQ0FBTzthQUFY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cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyXG59IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCB7TW9kYWxNYW5hZ2VyfSBmcm9tIFwiLi9tb2RhbC1tYW5hZ2VyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBiLW1vZGFsLXVuZGVybGF5XCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZTogXCJcIixcbiAgICBzdHlsZVVybHM6IFtcIm1vZGFsLXVuZGVybGF5LmNzc1wiXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsVW5kZXJsYXkge1xuICAgIGhpZGRlbkV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gICAgc2hvd25FdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuXG4gICAgcHJpdmF0ZSBfaGlkZGVuID0gdHJ1ZTtcbiAgICBwcml2YXRlIF9zaG93biA9IGZhbHNlO1xuICAgIHByaXZhdGUgX25hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFuYWdlcjogTW9kYWxNYW5hZ2VyLFxuICAgICAgICAgICAgICAgIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuX25hdGl2ZUVsZW1lbnQgPSBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLl9uYXRpdmVFbGVtZW50LmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuX25hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIFwidHJhbnNpdGlvbmVuZFwiLFxuICAgICAgICAgICAgdGhpcy5vblRyYW5zaXRpb25FbmQuYmluZCh0aGlzKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldCBoaWRkZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaWRkZW47XG4gICAgfVxuXG4gICAgc2V0IGhpZGRlbih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9oaWRkZW4gPSBCb29sZWFuKHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQgaGlkaW5nKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuaGlkZGVuICYmXG4gICAgICAgICAgICAgICAhdGhpcy5fc2hvd24gJiZcbiAgICAgICAgICAgICAgICF0aGlzLl9uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImluXCIpO1xuICAgIH1cblxuICAgIGdldCBzaG93aW5nKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuX3Nob3duICYmXG4gICAgICAgICAgICAgICAhdGhpcy5oaWRkZW4gJiZcbiAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5cIik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZXIucmVnaXN0ZXJVbmRlcmxheSh0aGlzKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICBpZiAodGhpcy5zaG93aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2hvd24pIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd25FdmVudC5uZXh0KG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fbmF0aXZlRWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcblxuICAgICAgICAvLyBmb3JjZSBhIHJlZmxvd1xuICAgICAgICBjb25zdCBfID0gdGhpcy5fbmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgICAgICB0aGlzLl9uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpblwiKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICBpZiAodGhpcy5oaWRpbmcpIHtcbiAgICAgICAgICAgIC8vIEluIHRoZSBwcm9jZXNzIG9mIGhpZGluZ1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGlkZGVuKSB7XG4gICAgICAgICAgICAvLyBIaWRkZW4gYW5kIGRvbmUgaGlkaW5nXG4gICAgICAgICAgICB0aGlzLmhpZGRlbkV2ZW50Lm5leHQobnVsbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zaG93biA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJpblwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVHJhbnNpdGlvbkVuZChldmVudDogVHJhbnNpdGlvbkV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgIT09IHRoaXMuX25hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJpblwiKSkge1xuICAgICAgICAgICAgdGhpcy5fc2hvd24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zaG93bkV2ZW50Lm5leHQobnVsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVFbGVtZW50LmhpZGRlbiA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIGZvcmNlIGEgcmVmbG93XG4gICAgICAgICAgICBjb25zdCBfID0gdGhpcy5fbmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgICAgICAgICAgdGhpcy5oaWRkZW5FdmVudC5uZXh0KG51bGwpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9