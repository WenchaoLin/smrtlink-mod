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
var css = require("./tooltip.css!");
exports.Placement = {
    default: "",
    top: "tooltip-top",
    left: "tooltip-left",
    bottom: "tooltip-bottom",
    right: "tooltip-right"
};
var Tooltip = (function () {
    function Tooltip(_el) {
        this._el = _el;
        this._placement = exports.Placement.default;
        var style = document.createElement("style");
        style.textContent = "" + css;
        this._el.nativeElement.appendChild(style);
    }
    Object.defineProperty(Tooltip.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (value) {
            if (value) {
                this._text = value;
                this._el.nativeElement.setAttribute("data-tooltip", this._text);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "placement", {
        get: function () {
            return this._placement;
        },
        set: function (value) {
            if (value) {
                var currentPlacement = exports.Placement[this._placement];
                if (currentPlacement) {
                    this._el.nativeElement.classList.remove(currentPlacement);
                }
                this._placement = exports.Placement[value] || exports.Placement.default;
                this._el.nativeElement.classList.add(this._placement);
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input("tooltip"), 
        __metadata('design:type', String)
    ], Tooltip.prototype, "text", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Tooltip.prototype, "placement", null);
    Tooltip = __decorate([
        core_1.Directive({
            selector: "[tooltip]"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Tooltip);
    return Tooltip;
}());
exports.Tooltip = Tooltip;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvdG9vbHRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTJDLGVBQWUsQ0FBQyxDQUFBO0FBRTNELElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRXZCLGlCQUFTLEdBQUc7SUFDckIsT0FBTyxFQUFFLEVBQUU7SUFDWCxHQUFHLEVBQUUsYUFBYTtJQUNsQixJQUFJLEVBQUUsY0FBYztJQUNwQixNQUFNLEVBQUUsZ0JBQWdCO0lBQ3hCLEtBQUssRUFBRSxlQUFlO0NBQ3pCLENBQUM7QUFLRjtJQUlJLGlCQUFvQixHQUFlO1FBQWYsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUZuQyxlQUFVLEdBQVcsaUJBQVMsQ0FBQyxPQUFPLENBQUM7UUFHbkMsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUcsR0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBR0Qsc0JBQUkseUJBQUk7YUFBUjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFTLEtBQWE7WUFDbEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEUsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBVUQsc0JBQUksOEJBQVM7YUFBYjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7YUFFRCxVQUFjLEtBQWE7WUFDdkIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixJQUFNLGdCQUFnQixHQUFHLGlCQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7b0JBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDOUQsQ0FBQztnQkFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFTLENBQUMsS0FBSyxDQUFDLElBQUksaUJBQVMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFELENBQUM7UUFDTCxDQUFDOzs7T0FaQTtJQWZEO1FBQUMsWUFBSyxDQUFDLFNBQVMsQ0FBQzs7dUNBQUE7SUFZakI7UUFBQyxZQUFLLEVBQUU7OzRDQUFBO0lBekJaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1NBQ3hCLENBQUM7O2VBQUE7SUF1Q0YsY0FBQztBQUFELENBdENBLEFBc0NDLElBQUE7QUF0Q1ksZUFBTyxVQXNDbkIsQ0FBQSIsImZpbGUiOiJkaXJlY3RpdmVzL3Rvb2x0aXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5cbmxldCBjc3MgPSByZXF1aXJlKFwiLi90b29sdGlwLmNzcyFcIik7XG5cbmV4cG9ydCBjb25zdCBQbGFjZW1lbnQgPSB7XG4gICAgZGVmYXVsdDogXCJcIixcbiAgICB0b3A6IFwidG9vbHRpcC10b3BcIixcbiAgICBsZWZ0OiBcInRvb2x0aXAtbGVmdFwiLFxuICAgIGJvdHRvbTogXCJ0b29sdGlwLWJvdHRvbVwiLFxuICAgIHJpZ2h0OiBcInRvb2x0aXAtcmlnaHRcIlxufTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3Rvb2x0aXBdXCJcbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcCB7XG4gICAgX3RleHQ6IHN0cmluZztcbiAgICBfcGxhY2VtZW50OiBzdHJpbmcgPSBQbGFjZW1lbnQuZGVmYXVsdDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgICBzdHlsZS50ZXh0Q29udGVudCA9IGAke2Nzc31gO1xuICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoXCJ0b29sdGlwXCIpXG4gICAgZ2V0IHRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gICAgfVxuXG4gICAgc2V0IHRleHQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS10b29sdGlwXCIsIHRoaXMuX3RleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgcGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgc2V0IHBsYWNlbWVudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFBsYWNlbWVudCA9IFBsYWNlbWVudFt0aGlzLl9wbGFjZW1lbnRdO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRQbGFjZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY3VycmVudFBsYWNlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3BsYWNlbWVudCA9IFBsYWNlbWVudFt2YWx1ZV0gfHwgUGxhY2VtZW50LmRlZmF1bHQ7XG4gICAgICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fcGxhY2VtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==