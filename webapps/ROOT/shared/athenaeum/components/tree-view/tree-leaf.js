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
var TreeLeaf = (function () {
    function TreeLeaf(el) {
        this._selectedEvent = new core_1.EventEmitter();
        this._el = el;
    }
    TreeLeaf.prototype.onClick = function (leaf, $event) {
        this._selectedEvent.emit(leaf);
        $event.cancelBubble = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeLeaf.prototype, "leaf", void 0);
    __decorate([
        core_1.Output("selected"), 
        __metadata('design:type', core_1.EventEmitter)
    ], TreeLeaf.prototype, "_selectedEvent", void 0);
    TreeLeaf = __decorate([
        core_1.Component({
            selector: "pb-tree-leaf",
            moduleId: module.id,
            templateUrl: "tree-leaf.html",
            styleUrls: ["tree-leaf.css"],
            directives: [],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(0, core_1.Inject(core_1.ElementRef)), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TreeLeaf);
    return TreeLeaf;
}());
exports.TreeLeaf = TreeLeaf;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdHJlZS12aWV3L3RyZWUtbGVhZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBTUEscUJBUU8sZUFBZSxDQUFDLENBQUE7QUFXdkI7SUFNSSxrQkFBZ0MsRUFBYztRQUZsQixtQkFBYyxHQUF1QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUdoRixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsMEJBQU8sR0FBUCxVQUFRLElBQUksRUFBRSxNQUFNO1FBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFWRDtRQUFDLFlBQUssRUFBRTs7MENBQUE7SUFDUjtRQUFDLGFBQU0sQ0FBQyxVQUFVLENBQUM7O29EQUFBO0lBWnZCO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQztZQUM1QixVQUFVLEVBQUUsRUFBRTtZQUNkLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3hDLENBQUM7bUJBT2UsYUFBTSxDQUFDLGlCQUFVLENBQUM7O2dCQVBqQztJQWVGLGVBQUM7QUFBRCxDQWRBLEFBY0MsSUFBQTtBQWRZLGdCQUFRLFdBY3BCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy90cmVlLXZpZXcvdHJlZS1sZWFmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYVxuICpcbiAqIENyZWF0ZWQgYnkgU2FsIFNhbmZpbGlwcG8gPHNzYW5maWxpcHBvQHBhY2lmaWNiaW9zY2llbmNlcy5jb20+IG9uIDMvMjgvMTYuXG4gKi9cblxuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIEluamVjdFxufSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtMZWFmfSBmcm9tIFwiLi9Ob2RlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBiLXRyZWUtbGVhZlwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwidHJlZS1sZWFmLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcInRyZWUtbGVhZi5jc3NcIl0sXG4gICAgZGlyZWN0aXZlczogW10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBUcmVlTGVhZiB7XG4gICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWY7XG5cbiAgICBASW5wdXQoKSBsZWFmOiBhbnk7XG4gICAgQE91dHB1dChcInNlbGVjdGVkXCIpIHByaXZhdGUgX3NlbGVjdGVkRXZlbnQ6IEV2ZW50RW1pdHRlcjxMZWFmPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRWxlbWVudFJlZikgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5fZWwgPSBlbDtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGxlYWYsICRldmVudCkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZEV2ZW50LmVtaXQobGVhZik7XG4gICAgICAgICRldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=