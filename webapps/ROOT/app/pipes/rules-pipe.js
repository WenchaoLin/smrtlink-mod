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
var RulesPipe = (function () {
    function RulesPipe() {
    }
    RulesPipe.prototype.transform = function (value, _a) {
        var rules = _a[0];
        if (typeof value === "string") {
            return value;
        }
        if (typeof value === "boolean") {
            return value.toString();
        }
        if (typeof value === "number") {
            if (rules.type === "int") {
                return value.toString();
            }
            if (rules.type === "double") {
                if (rules.pattern) {
                    var decimalPlaces = rules.pattern.match(/\.0*/g)[0].length - 1;
                    return getNumberFormatted(value, decimalPlaces, true);
                }
                else {
                    return getNumberFormatted(value);
                }
            }
        }
        return value.toString();
    };
    RulesPipe = __decorate([
        core_1.Pipe({
            name: "rules"
        }), 
        __metadata('design:paramtypes', [])
    ], RulesPipe);
    return RulesPipe;
}());
exports.RulesPipe = RulesPipe;
function getNumberFormatted(value, decimals, isPercentage) {
    if (decimals === void 0) { decimals = 2; }
    if (isPercentage === void 0) { isPercentage = false; }
    var factor = Math.pow(10, decimals);
    var suffix = "";
    if (isPercentage) {
        value *= 100;
        suffix = "%";
    }
    return (Math.floor(value * factor) / factor).toFixed(decimals) + suffix;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9waXBlcy9ydWxlcy1waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFVbEQ7SUFBQTtJQXVCQSxDQUFDO0lBdEJHLDZCQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsRUFBZ0I7WUFBZixhQUFLO1FBQ3hCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsRUFBRSxDQUFBLENBQUMsT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFDRCxFQUFFLENBQUEsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM1QixDQUFDO1lBQ0QsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDZixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUMvRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDMUQsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQXpCTDtRQUFDLFdBQUksQ0FBQztZQUNGLElBQUksRUFBRSxPQUFPO1NBQ2hCLENBQUM7O2lCQUFBO0lBd0JGLGdCQUFDO0FBQUQsQ0F2QkEsQUF1QkMsSUFBQTtBQXZCWSxpQkFBUyxZQXVCckIsQ0FBQTtBQUVELDRCQUE0QixLQUFhLEVBQUUsUUFBb0IsRUFBRSxZQUE2QjtJQUFuRCx3QkFBb0IsR0FBcEIsWUFBb0I7SUFBRSw0QkFBNkIsR0FBN0Isb0JBQTZCO0lBQzFGLElBQUksTUFBTSxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLElBQUksTUFBTSxHQUFXLEVBQUUsQ0FBQztJQUN4QixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ2YsS0FBSyxJQUFJLEdBQUcsQ0FBQztRQUNiLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDakIsQ0FBQztJQUNELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDMUUsQ0FBQyIsImZpbGUiOiJhcHAvcGlwZXMvcnVsZXMtcGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBSdWxlcyB7XG4gICAgcGF0dGVybj86IHN0cmluZztcbiAgICB0eXBlPzogc3RyaW5nO1xufVxuXG5AUGlwZSh7XG4gICAgbmFtZTogXCJydWxlc1wiXG59KVxuZXhwb3J0IGNsYXNzIFJ1bGVzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBbcnVsZXNdOiBbUnVsZXNdKTogc3RyaW5nIHtcbiAgICAgICAgaWYodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBpZihydWxlcy50eXBlID09PSBcImludFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihydWxlcy50eXBlID09PSBcImRvdWJsZVwiKSB7XG4gICAgICAgICAgICAgICAgaWYocnVsZXMucGF0dGVybikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGVjaW1hbFBsYWNlcyA9IHJ1bGVzLnBhdHRlcm4ubWF0Y2goL1xcLjAqL2cpWzBdLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXROdW1iZXJGb3JtYXR0ZWQodmFsdWUsIGRlY2ltYWxQbGFjZXMsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXROdW1iZXJGb3JtYXR0ZWQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldE51bWJlckZvcm1hdHRlZCh2YWx1ZTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyID0gMiwgaXNQZXJjZW50YWdlOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgIGxldCBmYWN0b3I6IG51bWJlciA9IE1hdGgucG93KDEwLCBkZWNpbWFscyk7XG4gICAgbGV0IHN1ZmZpeDogc3RyaW5nID0gXCJcIjtcbiAgICBpZiAoaXNQZXJjZW50YWdlKSB7XG4gICAgICAgIHZhbHVlICo9IDEwMDtcbiAgICAgICAgc3VmZml4ID0gXCIlXCI7XG4gICAgfVxuICAgIHJldHVybiAoTWF0aC5mbG9vcih2YWx1ZSAqIGZhY3RvcikvZmFjdG9yKS50b0ZpeGVkKGRlY2ltYWxzKSArIHN1ZmZpeDtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==