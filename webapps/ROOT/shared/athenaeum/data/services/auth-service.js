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
var Rx_1 = require("rxjs/Rx");
var http_1 = require("../../services/http");
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this._http = http;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._http
                .get("api://smrt-link/smrt-base/user/" + username + "/token", { "Authorization": "Basic " + btoa(username + ":" + password),
                "Accept": "text/plain,application/json" })
                .subscribe(function (token) {
                var parts = token.split(".");
                var jwtUser = JSON.parse(atob(parts[1]));
                var user = {
                    name: jwtUser.firstName + " " + jwtUser.lastName,
                    email: jwtUser.email,
                    userName: jwtUser.userName,
                    expoiration: jwtUser.exp,
                    roles: jwtUser.roles
                };
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
                resolve(token);
            }, function (error) {
                reject("AuthenticationService failure");
            });
        });
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return Rx_1.Observable.of(true);
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        return Boolean(localStorage.getItem("token"));
    };
    AuthenticationService.prototype.getUser = function () {
        return JSON.parse(localStorage.getItem("user"));
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvc2VydmljZXMvYXV0aC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFLQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsbUJBQXlCLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLHFCQUFtQixxQkFBcUIsQ0FBQyxDQUFBO0FBWXpDO0lBR0ksK0JBQVksSUFBVTtRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRU0scUNBQUssR0FBWixVQUFhLFFBQWdCLEVBQUUsUUFBZ0I7UUFBL0MsaUJBNEJDO1FBM0JHLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLEtBQUksQ0FBQyxLQUFLO2lCQUNMLEdBQUcsQ0FBQyxvQ0FBa0MsUUFBUSxXQUFRLEVBQ2xELEVBQUUsZUFBZSxFQUFHLFdBQVMsSUFBSSxDQUFJLFFBQVEsU0FBSSxRQUFVLENBQUc7Z0JBQzVELFFBQVEsRUFBRyw2QkFBNkIsRUFBRSxDQUFDO2lCQUNqRCxTQUFTLENBQ04sVUFBQyxLQUFhO2dCQUNWLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQU0sSUFBSSxHQUFVO29CQUNoQixJQUFJLEVBQUssT0FBTyxDQUFDLFNBQVMsU0FBSSxPQUFPLENBQUMsUUFBVTtvQkFDaEQsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO29CQUNwQixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7b0JBQzFCLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRztvQkFDeEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO2lCQUN2QixDQUFDO2dCQUVGLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBRXJDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNGLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FDSixDQUFDO1FBQ1YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sc0NBQU0sR0FBYjtRQUNJLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqQyxNQUFNLENBQUMsZUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU0sMENBQVUsR0FBakI7UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU0sdUNBQU8sR0FBZDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBbkRMO1FBQUMsaUJBQVUsRUFBRTs7NkJBQUE7SUFvRGIsNEJBQUM7QUFBRCxDQW5EQSxBQW1EQyxJQUFBO0FBbkRZLDZCQUFxQix3QkFtRGpDLENBQUEiLCJmaWxlIjoiZGF0YS9zZXJ2aWNlcy9hdXRoLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE2LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpkYmFycmV0b0BwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+RGF2aWQgQmFycmV0bzwvYT5cbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL1J4XCI7XG5pbXBvcnQge0h0dHB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9odHRwXCI7XG5pbXBvcnQge3N1YnNjcmliZU9ufSBmcm9tIFwicnhqcy9vcGVyYXRvci9zdWJzY3JpYmVPblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElVc2VyIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICB1c2VyTmFtZTogc3RyaW5nO1xuICAgIGV4cG9pcmF0aW9uOiBzdHJpbmc7XG4gICAgcm9sZXM6IHN0cmluZ1tdO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb25TZXJ2aWNlIHtcbiAgICBwcml2YXRlIF9odHRwOiBIdHRwO1xuXG4gICAgY29uc3RydWN0b3IoaHR0cDogSHR0cCkge1xuICAgICAgICB0aGlzLl9odHRwID0gaHR0cDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9naW4odXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9odHRwXG4gICAgICAgICAgICAgICAgLmdldChgYXBpOi8vc21ydC1saW5rL3NtcnQtYmFzZS91c2VyLyR7dXNlcm5hbWV9L3Rva2VuYCxcbiAgICAgICAgICAgICAgICAgICAgIHsgXCJBdXRob3JpemF0aW9uXCIgOiBgQmFzaWMgJHtidG9hKGAke3VzZXJuYW1lfToke3Bhc3N3b3JkfWApfWAsXG4gICAgICAgICAgICAgICAgICAgICAgIFwiQWNjZXB0XCIgOiBcInRleHQvcGxhaW4sYXBwbGljYXRpb24vanNvblwiIH0pXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gdG9rZW4uc3BsaXQoXCIuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgand0VXNlciA9IEpTT04ucGFyc2UoYXRvYihwYXJ0c1sxXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlcjogSVVzZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7and0VXNlci5maXJzdE5hbWV9ICR7and0VXNlci5sYXN0TmFtZX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiBqd3RVc2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lOiBqd3RVc2VyLnVzZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9pcmF0aW9uOiBqd3RVc2VyLmV4cCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlczogand0VXNlci5yb2xlc1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyXCIsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9rZW5cIiwgdG9rZW4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJBdXRoZW50aWNhdGlvblNlcnZpY2UgZmFpbHVyZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2dvdXQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidXNlclwiKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ0b2tlblwiKTtcblxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih0cnVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNMb2dnZWRJbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4obG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXIoKTogSVVzZXIge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJcIikpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==