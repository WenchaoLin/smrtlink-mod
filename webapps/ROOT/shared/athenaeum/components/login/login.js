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
var auth_service_1 = require("../../data/services/auth-service");
var ENTER_KEY_CODE = 13;
var Login = (function () {
    function Login(fb, auth) {
        this.login = new core_1.EventEmitter();
        this.authFailed = false;
        this.auth = auth;
        this.username = new common_1.Control("", common_1.Validators.required);
        this.password = new common_1.Control("", common_1.Validators.required);
        this.form = fb.group({
            username: this.username,
            password: this.password
        });
    }
    Login.prototype.onSubmit = function () {
        var _this = this;
        this.auth
            .login(this.username.value, this.password.value)
            .then(function (token) {
            _this.authFailed = false;
            _this.login.emit(true);
        }, function (error) {
            _this.authFailed = true;
            _this.failureMessage = error;
        });
    };
    Login.prototype.closeErrorMessage = function () {
        this.authFailed = false;
    };
    Login.prototype.captureReturn = function (event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            if (this.form.valid) {
                this.onSubmit();
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Login.prototype, "login", void 0);
    Login = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "pb-login",
            styleUrls: ["login.css"],
            templateUrl: "login.html",
            bindings: [auth_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, auth_service_1.AuthenticationService])
    ], Login);
    return Login;
}());
exports.Login = Login;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbG9naW4vbG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLHFCQUE4QyxlQUFlLENBQUMsQ0FBQTtBQUM5RCx1QkFBNkQsaUJBQWlCLENBQUMsQ0FBQTtBQUUvRSw2QkFBb0Msa0NBQWtDLENBQUMsQ0FBQTtBQUV2RSxJQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFTMUI7SUFXSSxlQUFZLEVBQWUsRUFBRSxJQUEyQjtRQVY5QyxVQUFLLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFLOUIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQU0vQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZ0JBQU8sQ0FBQyxFQUFFLEVBQUUsbUJBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZ0JBQU8sQ0FBQyxFQUFFLEVBQUUsbUJBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUMxQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sd0JBQVEsR0FBZjtRQUFBLGlCQVdDO1FBVkcsSUFBSSxDQUFDLElBQUk7YUFDSixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7YUFDL0MsSUFBSSxDQUFDLFVBQUMsS0FBSztZQUNKLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFTSxpQ0FBaUIsR0FBeEI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRU0sNkJBQWEsR0FBcEIsVUFBcUIsS0FBb0I7UUFDckMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQTdDRDtRQUFDLGFBQU0sRUFBRTs7d0NBQUE7SUFSYjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3hCLFdBQVcsRUFBRSxZQUFZO1lBQ3pCLFFBQVEsRUFBRSxDQUFDLG9DQUFxQixDQUFDO1NBQ3BDLENBQUM7O2FBQUE7SUFnREYsWUFBQztBQUFELENBL0NBLEFBK0NDLElBQUE7QUEvQ1ksYUFBSyxRQStDakIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2xvZ2luL2xvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNiwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhLCBJbmMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86ZGJhcnJldG9AcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbVwiPkRhdmlkIEJhcnJldG88L2E+XG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtGb3JtQnVpbGRlciwgQ29udHJvbCwgQ29udHJvbEdyb3VwLCBWYWxpZGF0b3JzfSBmcm9tIFwiYW5ndWxhcjIvY29tbW9uXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL1J4XCI7XG5pbXBvcnQge0F1dGhlbnRpY2F0aW9uU2VydmljZX0gZnJvbSBcIi4uLy4uL2RhdGEvc2VydmljZXMvYXV0aC1zZXJ2aWNlXCI7XG5cbmNvbnN0IEVOVEVSX0tFWV9DT0RFID0gMTM7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwicGItbG9naW5cIixcbiAgICBzdHlsZVVybHM6IFtcImxvZ2luLmNzc1wiXSxcbiAgICB0ZW1wbGF0ZVVybDogXCJsb2dpbi5odG1sXCIsXG4gICAgYmluZGluZ3M6IFtBdXRoZW50aWNhdGlvblNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luIHtcbiAgICBAT3V0cHV0KCkgbG9naW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgdXNlcm5hbWU6IENvbnRyb2w7XG4gICAgcHVibGljIHBhc3N3b3JkOiBDb250cm9sO1xuICAgIHB1YmxpYyBmb3JtOiBDb250cm9sR3JvdXA7XG4gICAgcHVibGljIGF1dGhGYWlsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgZmFpbHVyZU1lc3NhZ2U6IHN0cmluZztcblxuICAgIHByaXZhdGUgYXV0aDogQXV0aGVudGljYXRpb25TZXJ2aWNlO1xuXG4gICAgY29uc3RydWN0b3IoZmI6IEZvcm1CdWlsZGVyLCBhdXRoOiBBdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5hdXRoID0gYXV0aDtcblxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gbmV3IENvbnRyb2woXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBuZXcgQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcblxuICAgICAgICB0aGlzLmZvcm0gPSBmYi5ncm91cCh7XG4gICAgICAgICAgICB1c2VybmFtZTogdGhpcy51c2VybmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblN1Ym1pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hdXRoXG4gICAgICAgICAgICAubG9naW4odGhpcy51c2VybmFtZS52YWx1ZSwgdGhpcy5wYXNzd29yZC52YWx1ZSlcbiAgICAgICAgICAgIC50aGVuKCh0b2tlbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGhGYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbi5lbWl0KHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0aEZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFpbHVyZU1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2VFcnJvck1lc3NhZ2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXV0aEZhaWxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBjYXB0dXJlUmV0dXJuKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFTlRFUl9LRVlfQ09ERSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybS52YWxpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25TdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==