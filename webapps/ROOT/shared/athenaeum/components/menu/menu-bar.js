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
var constants_1 = require("../../common/constants");
var MenuBar = (function () {
    function MenuBar() {
        this.change = new core_1.EventEmitter();
    }
    MenuBar.prototype.onClick = function (e) {
        this.openOrSelect(e);
    };
    MenuBar.prototype.openOrSelect = function (e) {
    };
    MenuBar.prototype.onKeydown = function (e) {
        var which = e.which || e.keyCode;
        var handled = false;
        var keysWeHandle = [
            constants_1.LEFT_ARROW, constants_1.RIGHT_ARROW, constants_1.UP_ARROW, constants_1.DOWN_ARROW, constants_1.ENTER
        ];
        if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
            return;
        }
        if (keysWeHandle.indexOf(which) !== -1) {
            switch (which) {
                case constants_1.LEFT_ARROW:
                    this._focusPrev(e);
                    handled = true;
                    break;
                case constants_1.RIGHT_ARROW:
                    this._focusNext(e);
                    handled = true;
                    break;
                case constants_1.DOWN_ARROW:
                case constants_1.ENTER:
                    this.openOrSelect(e);
                    handled = true;
                    break;
                default:
                    break;
            }
            if (handled) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    };
    Object.defineProperty(MenuBar.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            this.change.next(null);
        },
        enumerable: true,
        configurable: true
    });
    MenuBar.prototype._focusPrev = function (e) {
    };
    MenuBar.prototype._focusNext = function (e) {
    };
    MenuBar.prototype.blur = function () {
    };
    MenuBar.prototype.focus = function () {
    };
    __decorate([
        core_1.ContentChildren(core_1.forwardRef(function () { return MenuBarItem; })), 
        __metadata('design:type', core_1.QueryList)
    ], MenuBar.prototype, "children", void 0);
    __decorate([
        core_1.Output("valueChange"), 
        __metadata('design:type', Object)
    ], MenuBar.prototype, "change", void 0);
    __decorate([
        core_1.HostListener("click", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MenuBar.prototype, "onClick", null);
    __decorate([
        core_1.HostListener("keydown", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MenuBar.prototype, "onKeydown", null);
    __decorate([
        core_1.HostBinding("attr.value"),
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuBar.prototype, "value", null);
    MenuBar = __decorate([
        core_1.Component({
            selector: "pb-menu-bar",
            moduleId: module.id,
            host: {
                "[attr.role]": "'menubar'"
            },
            template: "<ng-content></ng-content>",
            styleUrls: ["menu-bar.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], MenuBar);
    return MenuBar;
}());
exports.MenuBar = MenuBar;
var MenuBarItem = (function () {
    function MenuBarItem() {
    }
    MenuBarItem = __decorate([
        core_1.Component({
            selector: "pb-menu-bar-item",
            moduleId: module.id,
            template: "<ng-content></ng-content>",
            styleUrls: ["menu-bar-item.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], MenuBarItem);
    return MenuBarItem;
}());
exports.MenuBarItem = MenuBarItem;
exports.MENUBAR_DIRECTIVES = [MenuBar, MenuBarItem];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWVudS9tZW51LWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBR08sZUFBZSxDQUFDLENBQUE7QUFDdkIsMEJBRU8sd0JBQXdCLENBQUMsQ0FBQTtBQWNoQztJQUFBO1FBR2tDLFdBQU0sR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQXlKOUQsQ0FBQztJQXJJRyx5QkFBTyxHQUFQLFVBQVEsQ0FBQztRQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELDhCQUFZLEdBQVosVUFBYyxDQUFDO0lBZWYsQ0FBQztJQUdELDJCQUFTLEdBQVQsVUFBVSxDQUFDO1FBQ1AsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ25DLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFNLFlBQVksR0FBRztZQUNqQixzQkFBVSxFQUFFLHVCQUFXLEVBQUUsb0JBQVEsRUFBRSxzQkFBVSxFQUFFLGlCQUFLO1NBQ3ZELENBQUM7UUFFRixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNuRCxNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDWCxLQUFLLHNCQUFVO29CQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25CLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ2YsS0FBSyxDQUFDO2dCQUNWLEtBQUssdUJBQVc7b0JBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDZixLQUFLLENBQUM7Z0JBQ1YsS0FBSyxzQkFBVSxDQUFDO2dCQUNoQixLQUFLLGlCQUFLO29CQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ2YsS0FBSyxDQUFDO2dCQUNWO29CQUNJLEtBQUssQ0FBQztZQUNkLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNWLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQVlELHNCQUFJLDBCQUFLO2FBQVQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBQ0QsVUFBVSxLQUFLO1lBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsQ0FBQzs7O09BSkE7SUFTRCw0QkFBVSxHQUFWLFVBQVcsQ0FBQztJQXNCWixDQUFDO0lBRUQsNEJBQVUsR0FBVixVQUFXLENBQUM7SUFxQlosQ0FBQztJQUdELHNCQUFJLEdBQUo7SUFDQSxDQUFDO0lBRUQsdUJBQUssR0FBTDtJQUNBLENBQUM7SUExSkQ7UUFBQyxzQkFBZSxDQUFDLGlCQUFVLENBQUMsY0FBTSxPQUFBLFdBQVcsRUFBWCxDQUFXLENBQUMsQ0FBQzs7NkNBQUE7SUFFL0M7UUFBQyxhQUFNLENBQUMsYUFBYSxDQUFDOzsyQ0FBQTtJQW1CdEI7UUFBQyxtQkFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OzBDQUFBO0lBc0JsQztRQUFDLG1CQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7NENBQUE7SUE4Q3BDO1FBQUMsa0JBQVcsQ0FBQyxZQUFZLENBQUM7UUFDekIsWUFBSyxFQUFFOzt3Q0FBQTtJQXJHWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsSUFBSSxFQUFFO2dCQUNGLGFBQWEsRUFBRSxXQUFXO2FBQzdCO1lBQ0QsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDM0IsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7U0FDeEMsQ0FBQzs7ZUFBQTtJQTZKRixjQUFDO0FBQUQsQ0E1SkEsQUE0SkMsSUFBQTtBQTVKWSxlQUFPLFVBNEpuQixDQUFBO0FBU0Q7SUFBQTtJQUNBLENBQUM7SUFSRDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO1lBQ2hDLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3hDLENBQUM7O21CQUFBO0lBRUYsa0JBQUM7QUFBRCxDQURBLEFBQ0MsSUFBQTtBQURZLG1CQUFXLGNBQ3ZCLENBQUE7QUFFWSwwQkFBa0IsR0FBRyxDQUFFLE9BQU8sRUFBRSxXQUFXLENBQUUsQ0FBQyIsImZpbGUiOiJjb21wb25lbnRzL21lbnUvbWVudS1iYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIEV2ZW50RW1pdHRlciwgUXVlcnlMaXN0LFxuICAgIGZvcndhcmRSZWYsIElucHV0LCBPdXRwdXQsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIENvbnRlbnRDaGlsZHJlblxufSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVywgVVBfQVJST1csIERPV05fQVJST1csIEVOVEVSXG59IGZyb20gXCIuLi8uLi9jb21tb24vY29uc3RhbnRzXCI7XG5cbi8vIFRPRE86IEJ1aWxkIHRoaXMgb3V0IGlmIG5lZWRlZFxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwYi1tZW51LWJhclwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgaG9zdDoge1xuICAgICAgICBcIlthdHRyLnJvbGVdXCI6IFwiJ21lbnViYXInXCJcbiAgICB9LFxuICAgIHRlbXBsYXRlOiBcIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cIixcbiAgICBzdHlsZVVybHM6IFtcIm1lbnUtYmFyLmNzc1wiXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVCYXIge1xuICAgIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBNZW51QmFySXRlbSkpXG4gICAgICAgIHB1YmxpYyBjaGlsZHJlbjogUXVlcnlMaXN0PE1lbnVCYXJJdGVtPjtcbiAgICBAT3V0cHV0KFwidmFsdWVDaGFuZ2VcIikgcHVibGljIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHByaXZhdGUgX3ZhbHVlOiBzdHJpbmc7XG5cbiAgICAvKlxuICAgICAqIEFQSVxuICAgICAqL1xuICAgIC8qc2V0U2VsZWN0ZWQoY2hpbGQpIHtcbiAgICAgICAgdGhpcy5jaGlsZHJlblxuICAgICAgICAgICAgLmZvckVhY2goKGNoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoICE9PSBjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaC5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgIH0qL1xuXG4gICAgLypcbiAgICAgKiBFdmVudCBoYW5kbGVyc1xuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiLCBbXCIkZXZlbnRcIl0pXG4gICAgb25DbGljayhlKSB7XG4gICAgICAgIHRoaXMub3Blbk9yU2VsZWN0KGUpO1xuICAgIH1cblxuICAgIG9wZW5PclNlbGVjdCAoZSkge1xuICAgICAgICAvKnRoaXMuY2hpbGRyZW5cbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZC5pc015TmF0aXZlT3JMYWJlbChlLnRhcmdldCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWNoaWxkLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoaWxkLmlzTXlOYXRpdmVPckxhYmVsKGUudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hpbGQuaGFzTWVudSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsqL1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJrZXlkb3duXCIsIFtcIiRldmVudFwiXSlcbiAgICBvbktleWRvd24oZSkge1xuICAgICAgICBjb25zdCB3aGljaCA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgICAgICBsZXQgaGFuZGxlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBrZXlzV2VIYW5kbGUgPSBbXG4gICAgICAgICAgICBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVywgVVBfQVJST1csIERPV05fQVJST1csIEVOVEVSXG4gICAgICAgIF07XG5cbiAgICAgICAgaWYgKGUuY3RybEtleSB8fCBlLmFsdEtleSB8fCBlLm1ldGFLZXkgfHwgZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleXNXZUhhbmRsZS5pbmRleE9mKHdoaWNoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHN3aXRjaCh3aGljaCkge1xuICAgICAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZm9jdXNQcmV2KGUpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZm9jdXNOZXh0KGUpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3Blbk9yU2VsZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChoYW5kbGVkKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAqIEdldHRlcnMgYW5kIHNldHRlcnNcbiAgICAgKi9cblxuICAgIC8qXG4gICAgICogdmFsdWUgcHJvcGVydHlcbiAgICAgKi9cblxuICAgIEBIb3N0QmluZGluZyhcImF0dHIudmFsdWVcIilcbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jaGFuZ2UubmV4dChudWxsKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIEhlbHBlcnNcbiAgICAgKi9cbiAgICBfZm9jdXNQcmV2KGUpIHtcbiAgICAgICAgLyp2YXIgaW5kZXg7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGQudmlzaWJsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGluZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQuaXNNeU5hdGl2ZU9yTGFiZWwoZS50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGluZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNoaWxkcmVuW2luZGV4XS5yZW1vdmVGb2N1cygpO1xuXG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIGluZGV4IC09IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbmRleCA9IGNoaWxkcmVuLmxlbmd0aCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBjaGlsZHJlbltpbmRleF0udGFrZUZvY3VzKCk7Ki9cbiAgICB9XG5cbiAgICBfZm9jdXNOZXh0KGUpIHtcbiAgICAgICAgLyp2YXIgaW5kZXg7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW5cbiAgICAgICAgICAgIC5maWx0ZXIoKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGQudmlzaWJsZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGluZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQuaXNNeU5hdGl2ZU9yTGFiZWwoZS50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGluZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNoaWxkcmVuW2luZGV4XS5yZW1vdmVGb2N1cygpO1xuICAgICAgICBpZiAoaW5kZXggPCBjaGlsZHJlbi5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hpbGRyZW5baW5kZXhdLnRha2VGb2N1cygpOyovXG4gICAgfVxuXG4gICAgLy8gdGhlc2UgZnVuY3Rpb25zIGFyZSByZXF1aXJlZCBieSB0aGUgbWVudWl0ZW1cbiAgICBibHVyKCkge1xuICAgIH1cblxuICAgIGZvY3VzKCkge1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicGItbWVudS1iYXItaXRlbVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGU6IFwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlwiLFxuICAgIHN0eWxlVXJsczogW1wibWVudS1iYXItaXRlbS5jc3NcIl0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNZW51QmFySXRlbSB7XG59XG5cbmV4cG9ydCBjb25zdCBNRU5VQkFSX0RJUkVDVElWRVMgPSBbIE1lbnVCYXIsIE1lbnVCYXJJdGVtIF07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=