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
var LocalStorageService = (function () {
    function LocalStorageService() {
    }
    LocalStorageService.prototype.save = function (_a) {
        var key = _a.key, value = _a.value;
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
            return true;
        }
        catch (err) {
            return false;
        }
    };
    LocalStorageService.prototype.load = function (_a) {
        var key = _a.key;
        return JSON.parse(window.localStorage.getItem(key));
    };
    LocalStorageService.prototype.hasValue = function (_a) {
        var key = _a.key;
        return Boolean(window.localStorage.getItem(key));
    };
    LocalStorageService.prototype.delete = function (_a) {
        var key = _a.key;
        window.localStorage.removeItem(key);
    };
    LocalStorageService.prototype.deleteAll = function () {
        window.localStorage.clear();
    };
    LocalStorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocalStorageService);
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2xvY2FsLXN0b3JhZ2Utc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBR3pDO0lBQUE7SUEwQkEsQ0FBQztJQXhCVSxrQ0FBSSxHQUFYLFVBQVksRUFBdUM7WUFBdEMsWUFBRyxFQUFFLGdCQUFLO1FBQ25CLElBQUksQ0FBQztZQUNELE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFFO1FBQUEsS0FBSyxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUM7SUFFTSxrQ0FBSSxHQUFYLFVBQVksRUFBb0I7WUFBbkIsWUFBRztRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVNLHNDQUFRLEdBQWYsVUFBZ0IsRUFBb0I7WUFBbkIsWUFBRztRQUNoQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLG9DQUFNLEdBQWIsVUFBYyxFQUFvQjtZQUFuQixZQUFHO1FBQ2QsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLHVDQUFTLEdBQWhCO1FBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBMUJMO1FBQUMsaUJBQVUsRUFBRTs7MkJBQUE7SUEyQmIsMEJBQUM7QUFBRCxDQTFCQSxBQTBCQyxJQUFBO0FBMUJZLDJCQUFtQixzQkEwQi9CLENBQUEiLCJmaWxlIjoic2VydmljZXMvbG9jYWwtc3RvcmFnZS1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlU2VydmljZSB7XG5cbiAgICBwdWJsaWMgc2F2ZSh7a2V5LCB2YWx1ZX06IHtrZXk6IHN0cmluZywgdmFsdWU6IGFueX0pOiBib29sZWFuIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKHtrZXl9OiB7a2V5OiBzdHJpbmd9KTogYW55IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYXNWYWx1ZSh7a2V5fToge2tleTogc3RyaW5nfSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZSh7a2V5fToge2tleTogc3RyaW5nfSk6IHZvaWQge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlQWxsKCk6IHZvaWQge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9