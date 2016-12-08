/**
 * @copyright Copyright (c) 2016, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:dbarreto@pacificbiosciences.com">David Barreto</a>
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
var navbar_settings_1 = require("../../navbar-settings");
var silo_1 = require("../silo");
var core_1 = require("angular2/core");
var router_1 = require("angular2/router");
var login_1 = require("athenaeum/components/login/login");
var LoginPage = (function () {
    function LoginPage(router, routeParams, location) {
        this.router = router;
        this.routeParams = routeParams;
        this.location = location;
        navbar_settings_1.navbarSettings.setSilo(silo_1.SILO.LOGIN);
    }
    LoginPage.prototype.onLogin = function () {
        this.router.navigate(["/Welcome"]);
    };
    LoginPage = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "login",
            directives: [login_1.Login],
            templateUrl: "login.html",
            styleUrls: ["login.css"]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, router_1.Location])
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9sb2dpbi9sb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7Ozs7Ozs7Ozs7O0FBRUgsZ0NBQTZCLHVCQUF1QixDQUFDLENBQUE7QUFDckQscUJBQW1CLFNBQVMsQ0FBQyxDQUFBO0FBRTdCLHFCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUMzRCx1QkFBNEMsaUJBQWlCLENBQUMsQ0FBQTtBQUM5RCxzQkFBb0Isa0NBQWtDLENBQUMsQ0FBQTtBQVN2RDtJQUtJLG1CQUFZLE1BQWMsRUFBRSxXQUF3QixFQUFFLFFBQWtCO1FBQ3BFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLGdDQUFjLENBQUMsT0FBTyxDQUFDLFdBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0sMkJBQU8sR0FBZDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBckJMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsT0FBTztZQUNqQixVQUFVLEVBQUUsQ0FBQyxhQUFLLENBQUM7WUFDbkIsV0FBVyxFQUFFLFlBQVk7WUFDekIsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDO1NBQzNCLENBQUM7O2lCQUFBO0lBZ0JGLGdCQUFDO0FBQUQsQ0FmQSxBQWVDLElBQUE7QUFmWSxpQkFBUyxZQWVyQixDQUFBIiwiZmlsZSI6ImFwcC9zaWxvcy9sb2dpbi9sb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTYsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYSwgSW5jLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmRiYXJyZXRvQHBhY2lmaWNiaW9zY2llbmNlcy5jb21cIj5EYXZpZCBCYXJyZXRvPC9hPlxuICovXG5cbmltcG9ydCB7bmF2YmFyU2V0dGluZ3N9IGZyb20gXCIuLi8uLi9uYXZiYXItc2V0dGluZ3NcIjtcbmltcG9ydCB7U0lMT30gZnJvbSBcIi4uL3NpbG9cIjtcblxuaW1wb3J0IHtDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlUGFyYW1zLCBMb2NhdGlvbn0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuaW1wb3J0IHtMb2dpbn0gZnJvbSBcImF0aGVuYWV1bS9jb21wb25lbnRzL2xvZ2luL2xvZ2luXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwibG9naW5cIixcbiAgICBkaXJlY3RpdmVzOiBbTG9naW5dLFxuICAgIHRlbXBsYXRlVXJsOiBcImxvZ2luLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcImxvZ2luLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBMb2dpblBhZ2Uge1xuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XG4gICAgcHJpdmF0ZSByb3V0ZVBhcmFtczogUm91dGVQYXJhbXM7XG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihyb3V0ZXI6IFJvdXRlciwgcm91dGVQYXJhbXM6IFJvdXRlUGFyYW1zLCBsb2NhdGlvbjogTG9jYXRpb24pIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgICAgIHRoaXMucm91dGVQYXJhbXMgPSByb3V0ZVBhcmFtcztcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgICBuYXZiYXJTZXR0aW5ncy5zZXRTaWxvKFNJTE8uTE9HSU4pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkxvZ2luKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvV2VsY29tZVwiXSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9