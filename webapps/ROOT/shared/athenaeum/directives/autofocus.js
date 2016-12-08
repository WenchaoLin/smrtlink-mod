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
var Autofocus = (function () {
    function Autofocus(el, renderer) {
        this._el = el;
        this._renderer = renderer;
        this._el.nativeElement.focus();
    }
    Autofocus = __decorate([
        core_1.Directive({
            selector: "[autofocus]"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], Autofocus);
    return Autofocus;
}());
exports.Autofocus = Autofocus;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvYXV0b2ZvY3VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBOEMsZUFBZSxDQUFDLENBQUE7QUFNOUQ7SUFJSSxtQkFBWSxFQUFjLEVBQ2QsUUFBa0I7UUFDMUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUcxQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBZEw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7U0FDMUIsQ0FBQzs7aUJBQUE7SUFhRixnQkFBQztBQUFELENBWkEsQUFZQyxJQUFBO0FBWlksaUJBQVMsWUFZckIsQ0FBQSIsImZpbGUiOiJkaXJlY3RpdmVzL2F1dG9mb2N1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBSZW5kZXJlciwgRWxlbWVudFJlZn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcblxuLy8gU2ltcGxlIGV4YW1wbGUgZGlyZWN0aXZlIHRoYXQgZml4ZXMgYXV0b2ZvY3VzIHByb2JsZW0gd2l0aCBtdWx0aXBsZSB2aWV3c1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW2F1dG9mb2N1c11cIiAvLyB1c2luZyBbIF0gbWVhbnMgc2VsZWN0aW5nIGF0dHJpYnV0ZXNcbn0pXG5leHBvcnQgY2xhc3MgQXV0b2ZvY3VzIHtcbiAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZjtcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogUmVuZGVyZXIpIHtcbiAgICAgICAgdGhpcy5fZWwgPSBlbDtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcblxuICAgICAgICAvLyBhdXRvZm9jdXMgZml4IGZvciBtdWx0aXBsZSB2aWV3c1xuICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9