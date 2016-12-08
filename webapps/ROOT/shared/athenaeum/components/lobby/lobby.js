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
var router_1 = require("angular2/router");
var Lobby = (function () {
    function Lobby() {
        this.pbArgs = {
            lobbyBackground: "black"
        };
    }
    Object.defineProperty(Lobby.prototype, "showButton", {
        get: function () {
            if (this.pbArgs.button && this.pbArgs.sections) {
                return this.pbArgs.sections.length < 2;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Lobby.prototype.ngOnInit = function () {
        this.background = this.pbArgs.lobbyBackground;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Lobby.prototype, "pbArgs", void 0);
    __decorate([
        core_1.HostBinding("style.background"), 
        __metadata('design:type', Object)
    ], Lobby.prototype, "background", void 0);
    Lobby = __decorate([
        core_1.Component({
            selector: "pb-lobby",
            moduleId: module.id,
            templateUrl: "lobby.html",
            styleUrls: ["lobby.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [common_1.CORE_DIRECTIVES, router_1.RouterLink]
        }), 
        __metadata('design:paramtypes', [])
    ], Lobby);
    return Lobby;
}());
exports.Lobby = Lobby;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbG9iYnkvbG9iYnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLHFCQUVPLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLHVCQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hELHVCQUF5QixpQkFBaUIsQ0FBQyxDQUFBO0FBMEIzQztJQWFJO1FBWmlCLFdBQU0sR0FBZTtZQUNsQyxlQUFlLEVBQUUsT0FBTztTQUMzQixDQUFDO0lBVXlCLENBQUM7SUFQNUIsc0JBQVksNkJBQVU7YUFBdEI7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7OztPQUFBO0lBSUQsd0JBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDbEQsQ0FBQztJQWhCRDtRQUFDLFlBQUssRUFBRTs7eUNBQUE7SUFHUjtRQUFDLGtCQUFXLENBQUMsa0JBQWtCLENBQUM7OzZDQUFBO0lBWnBDO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsWUFBWTtZQUN6QixTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDeEIsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7WUFDckMsVUFBVSxFQUFFLENBQUMsd0JBQWUsRUFBRSxtQkFBVSxDQUFDO1NBQzVDLENBQUM7O2FBQUE7SUFtQkYsWUFBQztBQUFELENBbEJBLEFBa0JDLElBQUE7QUFsQlksYUFBSyxRQWtCakIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2xvYmJ5L2xvYmJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhLCBJbmMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86YnNraW5uZXJAcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbVwiPkJyaWFuIFNraW5uZXI8L2E+XG4gKi9cblxuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCwgSG9zdEJpbmRpbmdcbn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tIFwiYW5ndWxhcjIvY29tbW9uXCI7XG5pbXBvcnQge1JvdXRlckxpbmt9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJTGluayB7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICByb3V0ZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElMb2JieUFyZ3Mge1xuICAgIHRpdGxlPzogc3RyaW5nO1xuICAgIGxvYmJ5QmFja2dyb3VuZD86IHN0cmluZztcbiAgICBpY29uPzogc3RyaW5nO1xuICAgIGJ1dHRvbj86IElMaW5rO1xuICAgIHNlY3Rpb25zPzogW3tcbiAgICAgICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgICAgIHNob3J0Y3V0cz86IFtJTGlua11cbiAgICB9XTtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicGItbG9iYnlcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcImxvYmJ5Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcImxvYmJ5LmNzc1wiXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGRpcmVjdGl2ZXM6IFtDT1JFX0RJUkVDVElWRVMsIFJvdXRlckxpbmtdXG59KVxuZXhwb3J0IGNsYXNzIExvYmJ5IHtcbiAgICBASW5wdXQoKSBwcml2YXRlIHBiQXJnczogSUxvYmJ5QXJncyA9IHtcbiAgICAgICAgbG9iYnlCYWNrZ3JvdW5kOiBcImJsYWNrXCJcbiAgICB9O1xuICAgIEBIb3N0QmluZGluZyhcInN0eWxlLmJhY2tncm91bmRcIikgcHJpdmF0ZSBiYWNrZ3JvdW5kO1xuXG4gICAgcHJpdmF0ZSBnZXQgc2hvd0J1dHRvbigpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMucGJBcmdzLmJ1dHRvbiAmJiB0aGlzLnBiQXJncy5zZWN0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGJBcmdzLnNlY3Rpb25zLmxlbmd0aCA8IDI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkgeyAvKiBwYXNzICovIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSB0aGlzLnBiQXJncy5sb2JieUJhY2tncm91bmQ7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9