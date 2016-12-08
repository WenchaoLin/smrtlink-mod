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
var icon_1 = require("../strings/icon");
var Imprint = (function () {
    function Imprint(el) {
        this.el = el;
    }
    Object.defineProperty(Imprint.prototype, "content", {
        set: function (value) {
            this.el.nativeElement.innerHTML = this.makeHtmlForElement(value);
        },
        enumerable: true,
        configurable: true
    });
    Imprint.prototype.makeHtmlForElement = function (value) {
        var GAP = "&nbsp;";
        var listOfStrings;
        if (!value) {
            listOfStrings = [];
        }
        else {
            if (Array.isArray(value)) {
                listOfStrings = value;
            }
            else {
                listOfStrings = [value];
            }
        }
        var results = [];
        for (var _i = 0, listOfStrings_1 = listOfStrings; _i < listOfStrings_1.length; _i++) {
            var string = listOfStrings_1[_i];
            if (string.substring(0, 10) === "glyphicon-") {
                results.push("<span class=\"glyphicon " + string + "\"></span>");
            }
            else if (string.substring(0, 9) === "flaticon-") {
                results.push("<span class=\"" + string + "\"></span>");
            }
            else {
                if (string === icon_1.ICON.CARET) {
                    results.push("<span class=\"caret\"></span>");
                }
                else {
                    results.push(string);
                }
            }
        }
        return results.join(GAP);
    };
    __decorate([
        core_1.Input("pbImprint"), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], Imprint.prototype, "content", null);
    Imprint = __decorate([
        core_1.Directive({
            selector: "[pbImprint]"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Imprint);
    return Imprint;
}());
exports.Imprint = Imprint;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kaXJlY3RpdmVzL2ltcHJpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOzs7Ozs7Ozs7OztBQUVILHFCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUMzRCxxQkFBbUIsaUJBQWlCLENBQUMsQ0FBQTtBQU1yQztJQUdJLGlCQUFZLEVBQWM7UUFDdEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUdELHNCQUFJLDRCQUFPO2FBQVgsVUFBWSxLQUFLO1lBQ2IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxDQUFDOzs7T0FBQTtJQUVPLG9DQUFrQixHQUExQixVQUEyQixLQUFLO1FBQzVCLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUNyQixJQUFJLGFBQWEsQ0FBQztRQUNsQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVCxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzFCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixhQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixDQUFDO1FBQ0wsQ0FBQztRQUNELElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNqQixHQUFHLENBQUMsQ0FBZSxVQUFhLEVBQWIsK0JBQWEsRUFBYiwyQkFBYSxFQUFiLElBQWEsQ0FBQztZQUE1QixJQUFJLE1BQU0sc0JBQUE7WUFDWCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLDZCQUEwQixNQUFNLGVBQVcsQ0FBQyxDQUFDO1lBQzlELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBZ0IsTUFBTSxlQUFXLENBQUMsQ0FBQztZQUNwRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFdBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLCtCQUE2QixDQUFDLENBQUM7Z0JBQ2hELENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekIsQ0FBQztZQUNMLENBQUM7U0FDSjtRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFoQ0Q7UUFBQyxZQUFLLENBQUMsV0FBVyxDQUFDOzs7MENBQUE7SUFYdkI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7U0FDMUIsQ0FBQzs7ZUFBQTtJQTBDRixjQUFDO0FBQUQsQ0F4Q0EsQUF3Q0MsSUFBQTtBQXhDWSxlQUFPLFVBd0NuQixDQUFBIiwiZmlsZSI6ImFwcC9kaXJlY3RpdmVzL2ltcHJpbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge0lDT059IGZyb20gXCIuLi9zdHJpbmdzL2ljb25cIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3BiSW1wcmludF1cIlxufSlcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGNsYXNzIEltcHJpbnQge1xuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmVsID0gZWw7XG4gICAgfVxuXG4gICAgQElucHV0KFwicGJJbXByaW50XCIpXG4gICAgc2V0IGNvbnRlbnQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMubWFrZUh0bWxGb3JFbGVtZW50KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1ha2VIdG1sRm9yRWxlbWVudCh2YWx1ZSkge1xuICAgICAgICBjb25zdCBHQVAgPSBcIiZuYnNwO1wiO1xuICAgICAgICBsZXQgbGlzdE9mU3RyaW5ncztcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgbGlzdE9mU3RyaW5ncyA9IFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgbGlzdE9mU3RyaW5ncyA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaXN0T2ZTdHJpbmdzID0gW3ZhbHVlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBzdHJpbmcgb2YgbGlzdE9mU3RyaW5ncykge1xuICAgICAgICAgICAgaWYgKHN0cmluZy5zdWJzdHJpbmcoMCwgMTApID09PSBcImdseXBoaWNvbi1cIikge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gJHtzdHJpbmd9XCI+PC9zcGFuPmApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHJpbmcuc3Vic3RyaW5nKDAsIDkpID09PSBcImZsYXRpY29uLVwiKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGA8c3BhbiBjbGFzcz1cIiR7c3RyaW5nfVwiPjwvc3Bhbj5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0cmluZyA9PT0gSUNPTi5DQVJFVCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goYDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+YCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHN0cmluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzLmpvaW4oR0FQKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=