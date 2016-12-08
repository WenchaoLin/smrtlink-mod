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
var router_1 = require("angular2/router");
var navbar_settings_1 = require("../../navbar-settings");
var silo_1 = require("../silo");
var error_service_1 = require("./error-service");
var ErrorIndex = (function () {
    function ErrorIndex(errorService) {
        this.errorService = errorService;
        navbar_settings_1.navbarSettings.setSilo(silo_1.SILO.ERROR);
    }
    ErrorIndex.prototype.getHeader = function () {
        return error_service_1.ErrorService.messageForError(this.errorService.getError());
    };
    ErrorIndex.prototype.getUrl = function () {
        return error_service_1.ErrorService.urlForError(this.errorService.getError());
    };
    ErrorIndex.prototype.getDetails = function () {
        return error_service_1.ErrorService.detailsForError(this.errorService.getError());
    };
    ErrorIndex = __decorate([
        core_1.Component({
            selector: "error",
            providers: [error_service_1.ErrorService],
            moduleId: module.id,
            templateUrl: "index.html",
            directives: [router_1.RouterLink],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [error_service_1.ErrorService])
    ], ErrorIndex);
    return ErrorIndex;
}());
exports.ErrorIndex = ErrorIndex;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9lcnJvci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7Ozs7Ozs7Ozs7O0FBRUgscUJBQTJDLGVBQWUsQ0FBQyxDQUFBO0FBQzNELHVCQUF5QixpQkFBaUIsQ0FBQyxDQUFBO0FBRTNDLGdDQUE2Qix1QkFBdUIsQ0FBQyxDQUFBO0FBRXJELHFCQUFtQixTQUFTLENBQUMsQ0FBQTtBQUM3Qiw4QkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQVU3QztJQUVJLG9CQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQyxnQ0FBYyxDQUFDLE9BQU8sQ0FBQyxXQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDhCQUFTLEdBQVQ7UUFDSSxNQUFNLENBQUMsNEJBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCwyQkFBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLDRCQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsK0JBQVUsR0FBVjtRQUNJLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQXhCTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1lBQ3pCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsWUFBWTtZQUN6QixVQUFVLEVBQUUsQ0FBQyxtQkFBVSxDQUFDO1lBQ3hCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3hDLENBQUM7O2tCQUFBO0lBa0JGLGlCQUFDO0FBQUQsQ0FqQkEsQUFpQkMsSUFBQTtBQWpCWSxrQkFBVSxhQWlCdEIsQ0FBQSIsImZpbGUiOiJhcHAvc2lsb3MvZXJyb3IvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge1JvdXRlckxpbmt9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcblxuaW1wb3J0IHtuYXZiYXJTZXR0aW5nc30gZnJvbSBcIi4uLy4uL25hdmJhci1zZXR0aW5nc1wiO1xuXG5pbXBvcnQge1NJTE99IGZyb20gXCIuLi9zaWxvXCI7XG5pbXBvcnQge0Vycm9yU2VydmljZX0gZnJvbSBcIi4vZXJyb3Itc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJlcnJvclwiLFxuICAgIHByb3ZpZGVyczogW0Vycm9yU2VydmljZV0sXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCJpbmRleC5odG1sXCIsXG4gICAgZGlyZWN0aXZlczogW1JvdXRlckxpbmtdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRXJyb3JJbmRleCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9yU2VydmljZTogRXJyb3JTZXJ2aWNlKSB7XG4gICAgICAgIG5hdmJhclNldHRpbmdzLnNldFNpbG8oU0lMTy5FUlJPUik7XG4gICAgfVxuXG4gICAgZ2V0SGVhZGVyKCkge1xuICAgICAgICByZXR1cm4gRXJyb3JTZXJ2aWNlLm1lc3NhZ2VGb3JFcnJvcih0aGlzLmVycm9yU2VydmljZS5nZXRFcnJvcigpKTtcbiAgICB9XG5cbiAgICBnZXRVcmwoKSB7XG4gICAgICAgIHJldHVybiBFcnJvclNlcnZpY2UudXJsRm9yRXJyb3IodGhpcy5lcnJvclNlcnZpY2UuZ2V0RXJyb3IoKSk7XG4gICAgfVxuXG4gICAgZ2V0RGV0YWlscygpIHtcbiAgICAgICAgcmV0dXJuIEVycm9yU2VydmljZS5kZXRhaWxzRm9yRXJyb3IodGhpcy5lcnJvclNlcnZpY2UuZ2V0RXJyb3IoKSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9