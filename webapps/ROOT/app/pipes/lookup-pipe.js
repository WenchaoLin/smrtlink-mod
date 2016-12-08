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
var LookupPipe = (function () {
    function LookupPipe() {
    }
    LookupPipe.prototype.transform = function (value, _a) {
        var map = _a[0];
        if (!map) {
            throw new Error("Must provide an object to do a lookup on");
        }
        return map[value] || map.UNKNOWN || "Unknown";
    };
    LookupPipe = __decorate([
        core_1.Pipe({
            name: "lookup"
        }), 
        __metadata('design:paramtypes', [])
    ], LookupPipe);
    return LookupPipe;
}());
exports.LookupPipe = LookupPipe;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9waXBlcy9sb29rdXAtcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWtDLGVBQWUsQ0FBQyxDQUFBO0FBVWxEO0lBQUE7SUFPQSxDQUFDO0lBTkcsOEJBQVMsR0FBVCxVQUFVLEtBQWEsRUFBRSxFQUFrQjtZQUFqQixXQUFHO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztRQUNoRSxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQztJQUNsRCxDQUFDO0lBVEw7UUFBQyxXQUFJLENBQUM7WUFDRixJQUFJLEVBQUUsUUFBUTtTQUNqQixDQUFDOztrQkFBQTtJQVFGLGlCQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFQWSxrQkFBVSxhQU90QixDQUFBIiwiZmlsZSI6ImFwcC9waXBlcy9sb29rdXAtcGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBMb29rdXBNYXAge1xuICAgIFtrZXk6IHN0cmluZ106IGFueTtcbiAgICBVTktOT1dOPzogYW55O1xufVxuXG5AUGlwZSh7XG4gICAgbmFtZTogXCJsb29rdXBcIlxufSlcbmV4cG9ydCBjbGFzcyBMb29rdXBQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcsIFttYXBdOiBbTG9va3VwTWFwXSk6IGFueSB7XG4gICAgICAgIGlmICghbWFwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgYW4gb2JqZWN0IHRvIGRvIGEgbG9va3VwIG9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXBbdmFsdWVdIHx8IG1hcC5VTktOT1dOIHx8IFwiVW5rbm93blwiO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==