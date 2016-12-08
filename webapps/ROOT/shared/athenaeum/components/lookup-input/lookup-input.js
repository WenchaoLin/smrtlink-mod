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
var lang_1 = require("angular2/src/facade/lang");
var LookupService = (function () {
    function LookupService() {
    }
    return LookupService;
}());
exports.LookupService = LookupService;
var lookupInputAccessor = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return LookupInput; }),
    multi: true
});
var LookupInput = (function () {
    function LookupInput(renderer, lookupService) {
        this.disabled = false;
        this.valueChange = new core_1.EventEmitter();
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.renderer = renderer;
        this.lookupService = lookupService;
    }
    Object.defineProperty(LookupInput.prototype, "value", {
        set: function (value) {
            this.label = this.lookupService.getLabel(value);
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LookupInput.prototype, "labelHidden", {
        set: function (value) {
            this.renderer.setElementProperty(this.idRef.nativeElement, "hidden", !value);
            this.renderer.setElementProperty(this.labelRef.nativeElement, "hidden", value);
        },
        enumerable: true,
        configurable: true
    });
    LookupInput.prototype.writeValue = function (value) {
        this.value = value;
        if (!this.idRef) {
            return;
        }
        var normalized = lang_1.isBlank(value) ? String.EMPTY : value;
        this.renderer.setElementProperty(this.idRef.nativeElement, "value", normalized);
    };
    LookupInput.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    LookupInput.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    LookupInput.prototype.ngAfterViewInit = function () {
        this.labelHidden = false;
        this.writeValue(this._value);
    };
    LookupInput.prototype.emitChange = function (value) {
        this.onChange(value);
        this.valueChange.next(value);
    };
    LookupInput.prototype.onIdInput = function (value) {
        this.value = value;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(this.emitChange.bind(this, value), 200);
    };
    LookupInput.prototype.onIdBlur = function () {
        if (this.disabled) {
            return;
        }
        this.labelHidden = false;
        this.onTouched();
    };
    LookupInput.prototype.onLabelFocus = function (event) {
        event.preventDefault();
        if (this.disabled) {
            return;
        }
        this.labelHidden = true;
        this.renderer.invokeElementMethod(this.idRef.nativeElement, "focus", []);
        var length = this._value == null ? 0 : this._value.length;
        this.renderer.invokeElementMethod(this.idRef.nativeElement, "setSelectionRange", [length, length]);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LookupInput.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], LookupInput.prototype, "value", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LookupInput.prototype, "valueChange", void 0);
    __decorate([
        core_1.ViewChild("idNode"), 
        __metadata('design:type', core_1.ElementRef)
    ], LookupInput.prototype, "idRef", void 0);
    __decorate([
        core_1.ViewChild("labelNode"), 
        __metadata('design:type', core_1.ElementRef)
    ], LookupInput.prototype, "labelRef", void 0);
    LookupInput = __decorate([
        core_1.Component({
            selector: "pb-lookup-input",
            moduleId: module.id,
            templateUrl: "lookup-input.html",
            styleUrls: ["lookup-input.css"],
            providers: [lookupInputAccessor]
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, LookupService])
    ], LookupInput);
    return LookupInput;
}());
exports.LookupInput = LookupInput;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbG9va3VwLWlucHV0L2xvb2t1cC1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBR08sZUFBZSxDQUFDLENBQUE7QUFDdkIsdUJBQWtGLGlCQUFpQixDQUFDLENBQUE7QUFDcEcscUJBQXNCLDBCQUEwQixDQUFDLENBQUE7QUFFakQ7SUFBQTtJQUVBLENBQUM7SUFBRCxvQkFBQztBQUFELENBRkEsQUFFQyxJQUFBO0FBRnFCLHFCQUFhLGdCQUVsQyxDQUFBO0FBRUQsSUFBTSxtQkFBbUIsR0FBRyxJQUFJLGVBQVEsQ0FDcEMsMEJBQWlCLEVBQ2pCO0lBQ0ksV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLFdBQVcsRUFBWCxDQUFXLENBQUM7SUFDMUMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUNKLENBQUM7QUFTRjtJQWdDSSxxQkFBWSxRQUFrQixFQUNsQixhQUE0QjtRQS9CeEMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQVNqQixnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBMkJqQyxhQUFRLEdBQUcsVUFBQyxDQUFNLElBQU0sQ0FBQyxDQUFDO1FBQzFCLGNBQVMsR0FBRyxjQUFPLENBQUMsQ0FBQztRQUxqQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBL0JELHNCQUFJLDhCQUFLO2FBQVQsVUFBVSxLQUFhO1lBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFtQkQsc0JBQVksb0NBQVc7YUFBdkIsVUFBd0IsS0FBYztZQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FB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RUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUFuR0Q7UUFBQyxZQUFLLEVBQUU7O2lEQUFBO0lBR1I7UUFBQyxZQUFLLEVBQUU7Ozs0Q0FBQTtJQU1SO1FBQUMsYUFBTSxFQUFFOztvREFBQTtJQUdUO1FBQUMsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7OzhDQUFBO0lBR3BCO1FBQUMsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7O2lEQUFBO0lBdkIzQjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsbUJBQW1CO1lBQ2hDLFNBQVMsRUFBRSxDQUFFLGtCQUFrQixDQUFFO1lBQ2pDLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO1NBQ25DLENBQUM7O21CQUFBO0lBc0dGLGtCQUFDO0FBQUQsQ0FyR0EsQUFxR0MsSUFBQTtBQXJHWSxtQkFBVyxjQXFHdkIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2xvb2t1cC1pbnB1dC9sb29rdXAtaW5wdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgUmVuZGVyZXIsXG4gICAgSW5wdXQsIE91dHB1dCwgUHJvdmlkZXIsIFNlbGYsIEluamVjdCwgZm9yd2FyZFJlZlxufSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5nQ29udHJvbCwgTmdDb250cm9sU3RhdHVzfSBmcm9tIFwiYW5ndWxhcjIvY29tbW9uXCI7XG5pbXBvcnQge2lzQmxhbmt9IGZyb20gXCJhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmdcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExvb2t1cFNlcnZpY2Uge1xuICAgIGFic3RyYWN0IGdldExhYmVsKGlkOiBzdHJpbmcpOiBzdHJpbmc7XG59XG5cbmNvbnN0IGxvb2t1cElucHV0QWNjZXNzb3IgPSBuZXcgUHJvdmlkZXIoXG4gICAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAge1xuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBMb29rdXBJbnB1dCksXG4gICAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicGItbG9va3VwLWlucHV0XCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCJsb29rdXAtaW5wdXQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWyBcImxvb2t1cC1pbnB1dC5jc3NcIiBdLFxuICAgIHByb3ZpZGVyczogW2xvb2t1cElucHV0QWNjZXNzb3JdXG59KVxuZXhwb3J0IGNsYXNzIExvb2t1cElucHV0IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5sYWJlbCA9IHRoaXMubG9va3VwU2VydmljZS5nZXRMYWJlbCh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpXG4gICAgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKFwiaWROb2RlXCIpXG4gICAgcHJpdmF0ZSBpZFJlZjogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoXCJsYWJlbE5vZGVcIilcbiAgICBwcml2YXRlIGxhYmVsUmVmOiBFbGVtZW50UmVmO1xuXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXI7XG4gICAgcHJpdmF0ZSBsb29rdXBTZXJ2aWNlOiBMb29rdXBTZXJ2aWNlO1xuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IHN0cmluZztcbiAgICBwcml2YXRlIGxhYmVsOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIHRpbWVyOiBhbnk7XG5cbiAgICBwcml2YXRlIHNldCBsYWJlbEhpZGRlbih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eSh0aGlzLmlkUmVmLm5hdGl2ZUVsZW1lbnQsIFwiaGlkZGVuXCIsICF2YWx1ZSk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KHRoaXMubGFiZWxSZWYubmF0aXZlRWxlbWVudCwgXCJoaWRkZW5cIiwgdmFsdWUpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHJlbmRlcmVyOiBSZW5kZXJlcixcbiAgICAgICAgICAgICAgICBsb29rdXBTZXJ2aWNlOiBMb29rdXBTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICAgICAgdGhpcy5sb29rdXBTZXJ2aWNlID0gbG9va3VwU2VydmljZTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICAgIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAoIXRoaXMuaWRSZWYpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBub3JtYWxpemVkID0gaXNCbGFuayh2YWx1ZSkgPyBTdHJpbmcuRU1QVFkgOiB2YWx1ZTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkodGhpcy5pZFJlZi5uYXRpdmVFbGVtZW50LCBcInZhbHVlXCIsIG5vcm1hbGl6ZWQpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmxhYmVsSGlkZGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbWl0Q2hhbmdlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbklkSW5wdXQodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KHRoaXMuZW1pdENoYW5nZS5iaW5kKHRoaXMsIHZhbHVlKSwgMjAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uSWRCbHVyKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25MYWJlbEZvY3VzKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhYmVsSGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuaWRSZWYubmF0aXZlRWxlbWVudCwgXCJmb2N1c1wiLCBbXSk7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuX3ZhbHVlID09IG51bGwgPyAwIDogdGhpcy5fdmFsdWUubGVuZ3RoO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QodGhpcy5pZFJlZi5uYXRpdmVFbGVtZW50LCBcInNldFNlbGVjdGlvblJhbmdlXCIsIFtsZW5ndGgsIGxlbmd0aF0pO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==