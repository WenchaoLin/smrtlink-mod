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
;
var StateService = (function () {
    function StateService() {
        var _this = this;
        this._subject = new Rx_1.BehaviorSubject({});
        this._subject.subscribe(function (args) { return _this.notify(args); });
    }
    StateService.prototype.dispatch = function (type, payload) {
        var newState = this.reducer(this._subject.getValue(), { type: type, payload: payload });
        this._subject.next(newState);
    };
    StateService.prototype.getState = function () {
        return this._subject.getValue();
    };
    StateService.prototype.reducer = function (state, action) {
        if (state === void 0) { state = {}; }
        return state;
    };
    StateService.prototype.notify = function (args) {
    };
    StateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StateService);
    return StateService;
}());
exports.StateService = StateService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3N0YXRlLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU1BLHFCQUErQyxlQUFlLENBQUMsQ0FBQTtBQUMvRCxtQkFBOEIsU0FBUyxDQUFDLENBQUE7QUFFa0IsQ0FBQztBQUkzRDtJQUdJO1FBSEosaUJBd0JDO1FBcEJPLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxvQkFBZSxDQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTSwrQkFBUSxHQUFmLFVBQWdCLElBQVksRUFBRSxPQUFZO1FBQ3RDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLCtCQUFRLEdBQWY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRVMsOEJBQU8sR0FBakIsVUFBa0IsS0FBaUIsRUFDakIsTUFBaUI7UUFEakIscUJBQWlCLEdBQWpCLFFBQWUsRUFBRTtRQUUvQixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFUyw2QkFBTSxHQUFoQixVQUFpQixJQUFTO0lBQzFCLENBQUM7SUF4Qkw7UUFBQyxpQkFBVSxFQUFFOztvQkFBQTtJQXlCYixtQkFBQztBQUFELENBeEJBLEFBd0JDLElBQUE7QUF4QnFCLG9CQUFZLGVBd0JqQyxDQUFBIiwiZmlsZSI6InNlcnZpY2VzL3N0YXRlLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhXG4gKlxuICogQ3JlYXRlZCBieSBzc2FuZmlsaXBwbyA8c3NhbmZpbGlwcG9AcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbT4gb24gMi8zLzE2LlxuICovXG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSBcInJ4anMvUnhcIjtcblxuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25BcmdzIHsgdHlwZTogc3RyaW5nLCBwYXlsb2FkOiBhbnkgfTtcbmV4cG9ydCB0eXBlIFJlZHVjZXJGbjxUPiA9IHsgKHN0YXRlOiBULCBhcmdzOiBBY3Rpb25BcmdzKTogVCB9O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RhdGVTZXJ2aWNlPFQ+IHtcbiAgICBwcm90ZWN0ZWQgX3N1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxUPjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9zdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUPig8VD4ge30pO1xuICAgICAgICB0aGlzLl9zdWJqZWN0LnN1YnNjcmliZSgoYXJncykgPT4gdGhpcy5ub3RpZnkoYXJncykpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNwYXRjaCh0eXBlOiBzdHJpbmcsIHBheWxvYWQ6IGFueSkge1xuICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IHRoaXMucmVkdWNlcih0aGlzLl9zdWJqZWN0LmdldFZhbHVlKCksIHsgdHlwZTogdHlwZSwgcGF5bG9hZDogcGF5bG9hZCB9KTtcbiAgICAgICAgdGhpcy5fc3ViamVjdC5uZXh0KG5ld1N0YXRlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U3RhdGUoKTogVCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdWJqZWN0LmdldFZhbHVlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlZHVjZXIoc3RhdGU6IFQgPSA8VD4ge30sXG4gICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOkFjdGlvbkFyZ3MpOiBUIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBub3RpZnkoYXJnczogYW55KSB7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9