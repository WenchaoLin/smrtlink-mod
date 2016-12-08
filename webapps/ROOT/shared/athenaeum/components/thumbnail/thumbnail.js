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
var Thumbnail = (function () {
    function Thumbnail() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Thumbnail.prototype, "pbArgs", void 0);
    Thumbnail = __decorate([
        core_1.Component({
            selector: "pb-thumbnail",
            moduleId: module.id,
            templateUrl: "thumbnail.html",
            styleUrls: ["thumbnail.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], Thumbnail);
    return Thumbnail;
}());
exports.Thumbnail = Thumbnail;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGh1bWJuYWlsL3RodW1ibmFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EscUJBQTZELGVBQWUsQ0FBQyxDQUFBO0FBUzdFO0lBRUk7SUFBMkIsQ0FBQztJQUQ1QjtRQUFDLFlBQUssRUFBRTs7NkNBQUE7SUFSWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFDLGdCQUFnQjtZQUM1QixTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDNUIsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7U0FDeEMsQ0FBQzs7aUJBQUE7SUFJRixnQkFBQztBQUFELENBSEEsQUFHQyxJQUFBO0FBSFksaUJBQVMsWUFHckIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL3RodW1ibmFpbC90aHVtYm5haWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIEF0dHJpYnV0ZSwgSW5wdXR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBiLXRodW1ibmFpbFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6XCJ0aHVtYm5haWwuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1widGh1bWJuYWlsLmNzc1wiXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFRodW1ibmFpbCB7XG4gICAgQElucHV0KCkgcHJpdmF0ZSBwYkFyZ3M7XG4gICAgY29uc3RydWN0b3IoKSB7IC8qIHBhc3MgKi8gfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9