/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
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
var status_1 = require("../../navigation/status");
var navbar_settings_1 = require("../../navbar-settings");
var lobby_1 = require("athenaeum/components/lobby/lobby");
var welcome_service_1 = require("./welcome-service");
var text_1 = require("../../strings/en-us/text");
var silo_1 = require("../silo");
var WelcomeIndex = (function () {
    function WelcomeIndex(welcomeService) {
        this.vm = {
            user: {
                isSignedIn: true
            }
        };
        this.TEXT = text_1.TEXT;
        this.tiles = welcomeService.tiles;
        navbar_settings_1.navbarSettings.setSilo(silo_1.SILO.WELCOME);
    }
    WelcomeIndex = __decorate([
        core_1.Component({
            selector: "welcome",
            providers: [welcome_service_1.WelcomeService],
            moduleId: module.id,
            templateUrl: "index.html",
            styleUrls: ["index.css"],
            directives: [lobby_1.Lobby, common_1.CORE_DIRECTIVES, router_1.RouterLink],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        router_1.CanActivate(status_1.canConnect), 
        __metadata('design:paramtypes', [welcome_service_1.WelcomeService])
    ], WelcomeIndex);
    return WelcomeIndex;
}());
exports.WelcomeIndex = WelcomeIndex;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy93ZWxjb21lL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7Ozs7Ozs7Ozs7QUFFSCxxQkFBMkMsZUFBZSxDQUFDLENBQUE7QUFDM0QsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQsdUJBQXNDLGlCQUFpQixDQUFDLENBQUE7QUFFeEQsdUJBQXlCLHlCQUF5QixDQUFDLENBQUE7QUFDbkQsZ0NBQTZCLHVCQUF1QixDQUFDLENBQUE7QUFDckQsc0JBQW9CLGtDQUFrQyxDQUFDLENBQUE7QUFDdkQsZ0NBQTZCLG1CQUFtQixDQUFDLENBQUE7QUFDakQscUJBQW1CLDBCQUEwQixDQUFDLENBQUE7QUFFOUMscUJBQW1CLFNBQVMsQ0FBQyxDQUFBO0FBWTdCO0lBU0ksc0JBQVksY0FBOEI7UUFSbkMsT0FBRSxHQUFHO1lBQ1IsSUFBSSxFQUFFO2dCQUNGLFVBQVUsRUFBRSxJQUFJO2FBQ25CO1NBQ0osQ0FBQztRQUNLLFNBQUksR0FBRyxXQUFJLENBQUM7UUFJZixJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFDbEMsZ0NBQWMsQ0FBQyxPQUFPLENBQUMsV0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUF0Qkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsU0FBUyxFQUFFLENBQUMsZ0NBQWMsQ0FBQztZQUMzQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLFlBQVk7WUFDekIsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3hCLFVBQVUsRUFBRSxDQUFDLGFBQUssRUFBRSx3QkFBZSxFQUFFLG1CQUFVLENBQUM7WUFDaEQsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7U0FDeEMsQ0FBQztRQUNELG9CQUFXLENBQUMsbUJBQVUsQ0FBQzs7b0JBQUE7SUFleEIsbUJBQUM7QUFBRCxDQWRBLEFBY0MsSUFBQTtBQWRZLG9CQUFZLGVBY3hCLENBQUEiLCJmaWxlIjoiYXBwL3NpbG9zL3dlbGNvbWUvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge0NPUkVfRElSRUNUSVZFU30gZnJvbSBcImFuZ3VsYXIyL2NvbW1vblwiO1xuaW1wb3J0IHtSb3V0ZXJMaW5rLCBDYW5BY3RpdmF0ZX0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuXG5pbXBvcnQge2NhbkNvbm5lY3R9IGZyb20gXCIuLi8uLi9uYXZpZ2F0aW9uL3N0YXR1c1wiO1xuaW1wb3J0IHtuYXZiYXJTZXR0aW5nc30gZnJvbSBcIi4uLy4uL25hdmJhci1zZXR0aW5nc1wiO1xuaW1wb3J0IHtMb2JieX0gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL2xvYmJ5L2xvYmJ5XCI7XG5pbXBvcnQge1dlbGNvbWVTZXJ2aWNlfSBmcm9tIFwiLi93ZWxjb21lLXNlcnZpY2VcIjtcbmltcG9ydCB7VEVYVH0gZnJvbSBcIi4uLy4uL3N0cmluZ3MvZW4tdXMvdGV4dFwiO1xuXG5pbXBvcnQge1NJTE99IGZyb20gXCIuLi9zaWxvXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIndlbGNvbWVcIixcbiAgICBwcm92aWRlcnM6IFtXZWxjb21lU2VydmljZV0sXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCJpbmRleC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJpbmRleC5jc3NcIl0sXG4gICAgZGlyZWN0aXZlczogW0xvYmJ5LCBDT1JFX0RJUkVDVElWRVMsIFJvdXRlckxpbmtdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5AQ2FuQWN0aXZhdGUoY2FuQ29ubmVjdClcbmV4cG9ydCBjbGFzcyBXZWxjb21lSW5kZXgge1xuICAgIHB1YmxpYyB2bSA9IHtcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgaXNTaWduZWRJbjogdHJ1ZVxuICAgICAgICB9XG4gICAgfTtcbiAgICBwdWJsaWMgVEVYVCA9IFRFWFQ7XG4gICAgcHVibGljIHRpbGVzO1xuXG4gICAgY29uc3RydWN0b3Iod2VsY29tZVNlcnZpY2U6IFdlbGNvbWVTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudGlsZXMgPSB3ZWxjb21lU2VydmljZS50aWxlcztcbiAgICAgICAgbmF2YmFyU2V0dGluZ3Muc2V0U2lsbyhTSUxPLldFTENPTUUpO1xuICAgIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9