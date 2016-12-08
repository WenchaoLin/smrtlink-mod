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
var Breadcrumbbar = (function () {
    function Breadcrumbbar() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Breadcrumbbar.prototype, "pbArgs", void 0);
    Breadcrumbbar = __decorate([
        core_1.Component({
            selector: "pb-breadcrumbbar",
            moduleId: module.id,
            properties: ["pbArgs"],
            templateUrl: "breadcrumbbar.html",
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], Breadcrumbbar);
    return Breadcrumbbar;
}());
exports.Breadcrumbbar = Breadcrumbbar;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYnJlYWRjcnVtYmJhci9icmVhZGNydW1iYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFLQSxxQkFBa0QsZUFBZSxDQUFDLENBQUE7QUFDbEUsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFVaEQ7SUFFSTtJQUEyQixDQUFDO0lBRDVCO1FBQUMsWUFBSyxFQUFFOztpREFBQTtJQVRaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUN0QixXQUFXLEVBQUUsb0JBQW9CO1lBQ2pDLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLFVBQVUsRUFBRSxDQUFDLHdCQUFlLENBQUM7U0FDaEMsQ0FBQzs7cUJBQUE7SUFJRixvQkFBQztBQUFELENBSEEsQUFHQyxJQUFBO0FBSFkscUJBQWEsZ0JBR3pCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9icmVhZGNydW1iYmFyL2JyZWFkY3J1bWJiYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIElucHV0fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicGItYnJlYWRjcnVtYmJhclwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvcGVydGllczogW1wicGJBcmdzXCJdLFxuICAgIHRlbXBsYXRlVXJsOiBcImJyZWFkY3J1bWJiYXIuaHRtbFwiLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgZGlyZWN0aXZlczogW0NPUkVfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYmJhciB7XG4gICAgQElucHV0KCkgcHJpdmF0ZSBwYkFyZ3M7XG4gICAgY29uc3RydWN0b3IoKSB7IC8qIHBhc3MgKi8gfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9