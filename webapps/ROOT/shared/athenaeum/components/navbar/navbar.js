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
var menu_1 = require("../menu/menu");
var menu_button_1 = require("../menu/menu-button");
var Navbar = (function () {
    function Navbar(el, router) {
        var _this = this;
        this.baseUrl = __dirname.startsWith("//")
            ? __dirname.substr(1) : __dirname;
        this.selectableMenu = true;
        this.helpClicked = new core_1.EventEmitter();
        this.onLogout = new core_1.EventEmitter();
        this._el = el;
        this.helpClicked = new core_1.EventEmitter();
        router.subscribe(function (route) {
            _this.button.value = route;
        });
    }
    Object.defineProperty(Navbar.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Navbar.prototype, "customTitle", {
        get: function () {
            return this._customTitle;
        },
        set: function (value) {
            this._customTitle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Navbar.prototype, "bgColor", {
        get: function () {
            return this._bgColor;
        },
        set: function (value) {
            this._bgColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Navbar.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        set: function (value) {
            this._icon = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Navbar.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (value) {
            this._username = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Navbar.prototype, "isAdmin", {
        get: function () {
            return this._isAdmin;
        },
        set: function (value) {
            this._isAdmin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Navbar.prototype, "indexRoute", {
        get: function () {
            return this._indexRoute;
        },
        set: function (value) {
            this._indexRoute = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Navbar.prototype, "logoUrl", {
        get: function () {
            return this._logoUrl;
        },
        set: function (value) {
            this._logoUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Navbar.prototype, "titleRoute", {
        get: function () {
            return this._titleRoute;
        },
        set: function (value) {
            this._titleRoute = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Navbar.prototype, "aboutRoute", {
        get: function () {
            return this._aboutRoute;
        },
        set: function (value) {
            this._aboutRoute = value;
        },
        enumerable: true,
        configurable: true
    });
    Navbar.prototype.ngOnInit = function () {
        this.title = this.title || "";
        this.bgColor = this.bgColor || "";
        this.icon = this.icon || "";
        this.username = this.username || "";
        this.isAdmin = this.isAdmin || false;
        this.indexRoute = this.indexRoute;
        this.logoUrl = this.logoUrl || null;
        this.titleRoute = this.titleRoute || null;
        this.aboutRoute = this.aboutRoute || null;
        this.isUserLoggedIn = this.isUserLoggedIn || false;
    };
    Navbar.prototype.ngAfterViewInit = function () {
        this.button.menu = this.menu;
    };
    Navbar.prototype.onHelp = function () {
        this.helpClicked.next(this._el);
    };
    Navbar.prototype.logout = function (event) {
        event.preventDefault();
        this.onLogout.emit(true);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Navbar.prototype, "selectableMenu", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Navbar.prototype, "isUserLoggedIn", void 0);
    __decorate([
        core_1.Output("onhelp"), 
        __metadata('design:type', Object)
    ], Navbar.prototype, "helpClicked", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Navbar.prototype, "onLogout", void 0);
    __decorate([
        core_1.ViewChild(menu_button_1.MenuButton), 
        __metadata('design:type', menu_button_1.MenuButton)
    ], Navbar.prototype, "button", void 0);
    __decorate([
        core_1.ContentChild(menu_1.Menu), 
        __metadata('design:type', menu_1.Menu)
    ], Navbar.prototype, "menu", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Navbar.prototype, "title", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Navbar.prototype, "customTitle", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Navbar.prototype, "bgColor", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Navbar.prototype, "icon", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Navbar.prototype, "username", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Navbar.prototype, "isAdmin", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Navbar.prototype, "indexRoute", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Navbar.prototype, "logoUrl", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Navbar.prototype, "titleRoute", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Navbar.prototype, "aboutRoute", null);
    Navbar = __decorate([
        core_1.Component({
            selector: "pb-navbar",
            moduleId: module.id,
            templateUrl: "navbar.html",
            styleUrls: ["navbar.css"],
            directives: [common_1.CORE_DIRECTIVES, router_1.RouterLink, menu_1.MENU_DIRECTIVES, menu_button_1.MenuButton],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, router_1.Router])
    ], Navbar);
    return Navbar;
}());
exports.Navbar = Navbar;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbmF2YmFyL25hdmJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EscUJBSU8sZUFBZSxDQUFDLENBQUE7QUFDdkIsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQsdUJBQWlDLGlCQUFpQixDQUFDLENBQUE7QUFDbkQscUJBQW9DLGNBQWMsQ0FBQyxDQUFBO0FBQ25ELDRCQUF5QixxQkFBcUIsQ0FBQyxDQUFBO0FBVS9DO0lBK0JJLGdCQUFZLEVBQWMsRUFDZCxNQUFjO1FBaEM5QixpQkE0SkM7UUExSkcsWUFBTyxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2NBQ1gsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDaEQsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFHYixnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3pDLGFBQVEsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQXlCcEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRXRDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ2xCLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRCxzQkFBVyx5QkFBSzthQUFoQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7YUFFRCxVQUFpQixLQUFhO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7OztPQUpBO0lBT0Qsc0JBQVcsK0JBQVc7YUFBdEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDO2FBRUQsVUFBdUIsS0FBYztZQUNq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d0JBQWlCLENBQUMsSUFBSTtTQUN4QyxDQUFDOztjQUFBO0lBNkpGLGFBQUM7QUFBRCxDQTVKQSxBQTRKQyxJQUFBO0FBNUpZLGNBQU0sU0E0SmxCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhLCBJbmMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86YnNraW5uZXJAcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbVwiPkJyaWFuIFNraW5uZXI8L2E+XG4gKi9cblxuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsXG4gICAgT25Jbml0LCBRdWVyeSwgVmlld1F1ZXJ5LCBRdWVyeUxpc3QsIElucHV0LCBPdXRwdXQsXG4gICAgQ29udGVudENoaWxkLCBWaWV3Q2hpbGRcbn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tIFwiYW5ndWxhcjIvY29tbW9uXCI7XG5pbXBvcnQge1JvdXRlciwgUm91dGVyTGlua30gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuaW1wb3J0IHtNZW51LCBNRU5VX0RJUkVDVElWRVN9IGZyb20gXCIuLi9tZW51L21lbnVcIjtcbmltcG9ydCB7TWVudUJ1dHRvbn0gZnJvbSBcIi4uL21lbnUvbWVudS1idXR0b25cIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicGItbmF2YmFyXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDpcIm5hdmJhci5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJuYXZiYXIuY3NzXCJdLFxuICAgIGRpcmVjdGl2ZXM6IFtDT1JFX0RJUkVDVElWRVMsIFJvdXRlckxpbmssIE1FTlVfRElSRUNUSVZFUywgTWVudUJ1dHRvbl0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBOYXZiYXIgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8vIE5PVEU6IFRoZXJlIGFyZSBzb21lIGNhc2VzIHdoZXJlIHRoZSBkaXJuYW1lIGlzIHByZWNlZGVkIHdpdGggXCIvL1wiIGluc3RlYWQgb2YgXCIvXCJcbiAgICBiYXNlVXJsID0gX19kaXJuYW1lLnN0YXJ0c1dpdGgoXCIvL1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfX2Rpcm5hbWUuc3Vic3RyKDEpIDogX19kaXJuYW1lO1xuICAgIEBJbnB1dCgpIHNlbGVjdGFibGVNZW51ID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBpc1VzZXJMb2dnZWRJbjtcblxuICAgIEBPdXRwdXQoXCJvbmhlbHBcIikgaGVscENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIG9uTG9nb3V0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWY7XG5cbiAgICBwcml2YXRlIHBiQXJnczogYW55O1xuXG4gICAgcHJpdmF0ZSBfdGl0bGU6IHN0cmluZztcbiAgICBwcml2YXRlIF9jdXN0b21UaXRsZTogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9iZ0NvbG9yOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfaWNvbjogc3RyaW5nO1xuICAgIHByaXZhdGUgX3VzZXJuYW1lOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfaXNBZG1pbjogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9pbmRleFJvdXRlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfbG9nb1VybDogc3RyaW5nO1xuICAgIHByaXZhdGUgX3RpdGxlUm91dGU6IHN0cmluZztcbiAgICBwcml2YXRlIF9hYm91dFJvdXRlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfaXNVc2VyTG9nZ2VkSW46IGJvb2xlYW47XG5cbiAgICBAVmlld0NoaWxkKE1lbnVCdXR0b24pXG4gICAgICAgIHByaXZhdGUgYnV0dG9uOiBNZW51QnV0dG9uO1xuICAgIEBDb250ZW50Q2hpbGQoTWVudSlcbiAgICAgICAgcHJpdmF0ZSBtZW51OiBNZW51O1xuXG4gICAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICAgICAgdGhpcy5fZWwgPSBlbDtcbiAgICAgICAgdGhpcy5oZWxwQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgICAgICByb3V0ZXIuc3Vic2NyaWJlKHJvdXRlID0+IHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLnZhbHVlID0gcm91dGU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCB0aXRsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGl0bGU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCB0aXRsZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3RpdGxlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGN1c3RvbVRpdGxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tVGl0bGU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBjdXN0b21UaXRsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9jdXN0b21UaXRsZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBiZ0NvbG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iZ0NvbG9yO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgYmdDb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2JnQ29sb3IgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgaWNvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWNvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGljb24odmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pY29uID0gdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IHVzZXJuYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VybmFtZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHVzZXJuYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fdXNlcm5hbWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgaXNBZG1pbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzQWRtaW47XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBpc0FkbWluKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2lzQWRtaW4gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgaW5kZXhSb3V0ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5kZXhSb3V0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGluZGV4Um91dGUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9pbmRleFJvdXRlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGxvZ29VcmwoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvZ29Vcmw7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBsb2dvVXJsKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fbG9nb1VybCA9IHZhbHVlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCB0aXRsZVJvdXRlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aXRsZVJvdXRlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgdGl0bGVSb3V0ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3RpdGxlUm91dGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgYWJvdXRSb3V0ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWJvdXRSb3V0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGFib3V0Um91dGUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9hYm91dFJvdXRlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnRpdGxlIHx8IFwiXCI7XG4gICAgICAgIHRoaXMuYmdDb2xvciA9IHRoaXMuYmdDb2xvciB8fCBcIlwiO1xuICAgICAgICB0aGlzLmljb24gPSB0aGlzLmljb24gfHwgXCJcIjtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHRoaXMudXNlcm5hbWUgfHwgXCJcIjtcbiAgICAgICAgdGhpcy5pc0FkbWluID0gdGhpcy5pc0FkbWluIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmluZGV4Um91dGUgPSB0aGlzLmluZGV4Um91dGU7XG4gICAgICAgIHRoaXMubG9nb1VybCA9IHRoaXMubG9nb1VybCB8fCBudWxsO1xuICAgICAgICB0aGlzLnRpdGxlUm91dGUgPSB0aGlzLnRpdGxlUm91dGUgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5hYm91dFJvdXRlID0gdGhpcy5hYm91dFJvdXRlIHx8IG51bGw7XG4gICAgICAgIHRoaXMuaXNVc2VyTG9nZ2VkSW4gPSB0aGlzLmlzVXNlckxvZ2dlZEluIHx8IGZhbHNlO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgKDxhbnk+IHRoaXMuYnV0dG9uKS5tZW51ID0gdGhpcy5tZW51O1xuICAgIH1cblxuICAgIG9uSGVscCgpIHtcbiAgICAgICAgdGhpcy5oZWxwQ2xpY2tlZC5uZXh0KHRoaXMuX2VsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9nb3V0KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMub25Mb2dvdXQuZW1pdCh0cnVlKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=