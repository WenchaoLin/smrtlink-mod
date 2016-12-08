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
var status_1 = require("../../navigation/status");
var text_1 = require("../../strings/en-us/text");
var imprint_1 = require("../../directives/imprint");
var binding_calculation_service_1 = require("./binding-calculation-service");
var BindingCalculationEditor = (function () {
    function BindingCalculationEditor() {
        this.TEXT = text_1.TEXT;
        this.allBindingCalculations = binding_calculation_service_1.allBindingCalculations;
        this.calculations = binding_calculation_service_1.editedBindingCalculations;
    }
    BindingCalculationEditor.prototype.routerOnActivate = function (next, prev) {
        var id = next.params["id"];
        /*
        const type = id == null ? "New" : "Edit";

        this.siloService.setState({
            title: "%s Binding Calculation".sprintf(type)
        });
        */
        if (id) {
            //  TODO: Need to use promise for when getting from server
            this.calculations.length = 0;
            var calculation = this.allBindingCalculations.find(function (calculation) {
                return calculation.id === id;
            });
            if (calculation) {
                this.calculations.push(calculation);
            }
        }
        if (this.calculations.length === 0) {
            this.addNewBindingCalculation();
        }
    };
    BindingCalculationEditor.prototype.addNewBindingCalculation = function () {
        var item = binding_calculation_service_1.newBindingCalculation();
        item.createdAt = new Date().toString();
        // TODO: User current logged in user
        item.createdBy = "John Tester";
        this.calculations.push(item);
    };
    BindingCalculationEditor.prototype.newSample = function () {
        this.addNewBindingCalculation();
    };
    BindingCalculationEditor.prototype.addExistingBindingCalculation = function () {
        alert("TODO: Unfinished");
    };
    BindingCalculationEditor.prototype.removeCalculation = function (calculation) {
        var i = this.calculations.indexOf(calculation);
        if (i === -1) {
            return;
        }
        this.calculations.splice(i, 1);
    };
    BindingCalculationEditor.prototype.copyCalculation = function (calculation) {
        var copy = binding_calculation_service_1.newBindingCalculation(calculation);
        this.calculations.push(copy);
    };
    BindingCalculationEditor = __decorate([
        core_1.Component({
            selector: "binding-calculation-editor",
            moduleId: module.id,
            templateUrl: "binding-calculation-editor.html",
            styleUrls: [
                "binding-calculation-editor.css"
            ],
            directives: [imprint_1.Imprint, router_1.ROUTER_DIRECTIVES],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        router_1.CanActivate(status_1.canConnect), 
        __metadata('design:paramtypes', [])
    ], BindingCalculationEditor);
    return BindingCalculationEditor;
}());
exports.BindingCalculationEditor = BindingCalculationEditor;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9zYW1wbGUtc2V0dXAvYmluZGluZy1jYWxjdWxhdGlvbi1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUE2QyxlQUFlLENBQUMsQ0FBQTtBQUM3RCx1QkFBaUYsaUJBQWlCLENBQUMsQ0FBQTtBQUVuRyx1QkFBMkIseUJBQXlCLENBQUMsQ0FBQTtBQUdyRCxxQkFBcUIsMEJBQTBCLENBQUMsQ0FBQTtBQUNoRCx3QkFBd0IsMEJBQTBCLENBQUMsQ0FBQTtBQUVuRCw0Q0FBeUYsK0JBQStCLENBQUMsQ0FBQTtBQWV6SDtJQU9JO1FBRlEsU0FBSSxHQUFHLFdBQUksQ0FBQztRQUdoQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsb0RBQXNCLENBQUM7UUFDckQsSUFBSSxDQUFDLFlBQVksR0FBRyx1REFBeUIsQ0FBQztJQUNsRCxDQUFDO0lBRUQsbURBQWdCLEdBQWhCLFVBQWlCLElBQTBCLEVBQUUsSUFBMEI7UUFDbkUsSUFBTSxFQUFFLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyQzs7Ozs7O1VBTUU7UUFFRixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ0wsMERBQTBEO1lBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUM3QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFVBQVUsV0FBb0M7Z0JBQzdGLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEMsQ0FBQztRQUNMLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ3BDLENBQUM7SUFDTCxDQUFDO0lBRUQsMkRBQXdCLEdBQXhCO1FBQ0ksSUFBSSxJQUFJLEdBQTRCLG1EQUFxQixFQUFFLENBQUM7UUFDNUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZDLG9DQUFvQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsNENBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxnRUFBNkIsR0FBN0I7UUFDSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsb0RBQWlCLEdBQWpCLFVBQWtCLFdBQW9DO1FBQ2xELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7UUFBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsa0RBQWUsR0FBZixVQUFnQixXQUFvQztRQUNoRCxJQUFJLElBQUksR0FBRyxtREFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBNUVMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSw0QkFBNEI7WUFDdEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxpQ0FBaUM7WUFFOUMsU0FBUyxFQUFFO2dCQUNQLGdDQUFnQzthQUNuQztZQUVELFVBQVUsRUFBRSxDQUFFLGlCQUFPLEVBQUUsMEJBQWlCLENBQUU7WUFDMUMsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7U0FDeEMsQ0FBQztRQUNELG9CQUFXLENBQUMsbUJBQVUsQ0FBQzs7Z0NBQUE7SUFpRXhCLCtCQUFDO0FBQUQsQ0FoRUEsQUFnRUMsSUFBQTtBQWhFWSxnQ0FBd0IsMkJBZ0VwQyxDQUFBIiwiZmlsZSI6ImFwcC9zaWxvcy9zYW1wbGUtc2V0dXAvYmluZGluZy1jYWxjdWxhdGlvbi1lZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7IFJPVVRFUl9ESVJFQ1RJVkVTLCBDYW5BY3RpdmF0ZSwgT25BY3RpdmF0ZSwgQ29tcG9uZW50SW5zdHJ1Y3Rpb24gfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5cbmltcG9ydCB7IGNhbkNvbm5lY3QgfSBmcm9tIFwiLi4vLi4vbmF2aWdhdGlvbi9zdGF0dXNcIjtcblxuaW1wb3J0IHsgQmluZGluZ0NhbGN1bGF0aW9uTW9kZWwgfSBmcm9tIFwiLi4vLi4vZGF0YS9tb2RlbHMvc2FtcGxlLXNldHVwLW1vZGVsXCI7XG5pbXBvcnQgeyBURVhUIH0gZnJvbSBcIi4uLy4uL3N0cmluZ3MvZW4tdXMvdGV4dFwiO1xuaW1wb3J0IHsgSW1wcmludCB9IGZyb20gXCIuLi8uLi9kaXJlY3RpdmVzL2ltcHJpbnRcIjtcblxuaW1wb3J0IHsgYWxsQmluZGluZ0NhbGN1bGF0aW9ucywgZWRpdGVkQmluZGluZ0NhbGN1bGF0aW9ucywgbmV3QmluZGluZ0NhbGN1bGF0aW9uIH0gZnJvbSBcIi4vYmluZGluZy1jYWxjdWxhdGlvbi1zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImJpbmRpbmctY2FsY3VsYXRpb24tZWRpdG9yXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCJiaW5kaW5nLWNhbGN1bGF0aW9uLWVkaXRvci5odG1sXCIsXG5cbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgXCJiaW5kaW5nLWNhbGN1bGF0aW9uLWVkaXRvci5jc3NcIlxuICAgIF0sXG5cbiAgICBkaXJlY3RpdmVzOiBbIEltcHJpbnQsIFJPVVRFUl9ESVJFQ1RJVkVTIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbkBDYW5BY3RpdmF0ZShjYW5Db25uZWN0KVxuZXhwb3J0IGNsYXNzIEJpbmRpbmdDYWxjdWxhdGlvbkVkaXRvciBpbXBsZW1lbnRzIE9uQWN0aXZhdGUge1xuXG4gICAgYWxsQmluZGluZ0NhbGN1bGF0aW9uczogQmluZGluZ0NhbGN1bGF0aW9uTW9kZWxbXTtcbiAgICBjYWxjdWxhdGlvbnM6IEJpbmRpbmdDYWxjdWxhdGlvbk1vZGVsW107XG5cbiAgICBwcml2YXRlIFRFWFQgPSBURVhUO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYWxsQmluZGluZ0NhbGN1bGF0aW9ucyA9IGFsbEJpbmRpbmdDYWxjdWxhdGlvbnM7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRpb25zID0gZWRpdGVkQmluZGluZ0NhbGN1bGF0aW9ucztcbiAgICB9XG5cbiAgICByb3V0ZXJPbkFjdGl2YXRlKG5leHQ6IENvbXBvbmVudEluc3RydWN0aW9uLCBwcmV2OiBDb21wb25lbnRJbnN0cnVjdGlvbikge1xuICAgICAgICBjb25zdCBpZDogc3RyaW5nID0gbmV4dC5wYXJhbXNbXCJpZFwiXTtcblxuICAgICAgICAvKlxuICAgICAgICBjb25zdCB0eXBlID0gaWQgPT0gbnVsbCA/IFwiTmV3XCIgOiBcIkVkaXRcIjtcblxuICAgICAgICB0aGlzLnNpbG9TZXJ2aWNlLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIiVzIEJpbmRpbmcgQ2FsY3VsYXRpb25cIi5zcHJpbnRmKHR5cGUpXG4gICAgICAgIH0pO1xuICAgICAgICAqL1xuXG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgLy8gIFRPRE86IE5lZWQgdG8gdXNlIHByb21pc2UgZm9yIHdoZW4gZ2V0dGluZyBmcm9tIHNlcnZlclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGlvbnMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGxldCBjYWxjdWxhdGlvbiA9IHRoaXMuYWxsQmluZGluZ0NhbGN1bGF0aW9ucy5maW5kKGZ1bmN0aW9uIChjYWxjdWxhdGlvbjogQmluZGluZ0NhbGN1bGF0aW9uTW9kZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsY3VsYXRpb24uaWQgPT09IGlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY2FsY3VsYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0aW9ucy5wdXNoKGNhbGN1bGF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jYWxjdWxhdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmFkZE5ld0JpbmRpbmdDYWxjdWxhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkTmV3QmluZGluZ0NhbGN1bGF0aW9uKCkge1xuICAgICAgICBsZXQgaXRlbTogQmluZGluZ0NhbGN1bGF0aW9uTW9kZWwgPSBuZXdCaW5kaW5nQ2FsY3VsYXRpb24oKTtcbiAgICAgICAgaXRlbS5jcmVhdGVkQXQgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIFRPRE86IFVzZXIgY3VycmVudCBsb2dnZWQgaW4gdXNlclxuICAgICAgICBpdGVtLmNyZWF0ZWRCeSA9IFwiSm9obiBUZXN0ZXJcIjtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbnMucHVzaChpdGVtKTtcbiAgICB9XG5cbiAgICBuZXdTYW1wbGUoKSB7XG4gICAgICAgIHRoaXMuYWRkTmV3QmluZGluZ0NhbGN1bGF0aW9uKCk7XG4gICAgfVxuXG4gICAgYWRkRXhpc3RpbmdCaW5kaW5nQ2FsY3VsYXRpb24oKSB7XG4gICAgICAgIGFsZXJ0KFwiVE9ETzogVW5maW5pc2hlZFwiKTtcbiAgICB9XG5cbiAgICByZW1vdmVDYWxjdWxhdGlvbihjYWxjdWxhdGlvbjogQmluZGluZ0NhbGN1bGF0aW9uTW9kZWwpIHtcbiAgICAgICAgbGV0IGkgPSB0aGlzLmNhbGN1bGF0aW9ucy5pbmRleE9mKGNhbGN1bGF0aW9uKTtcbiAgICAgICAgaWYgKGkgPT09IC0xKSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLmNhbGN1bGF0aW9ucy5zcGxpY2UoaSwgMSk7XG4gICAgfVxuXG4gICAgY29weUNhbGN1bGF0aW9uKGNhbGN1bGF0aW9uOiBCaW5kaW5nQ2FsY3VsYXRpb25Nb2RlbCkge1xuICAgICAgICBsZXQgY29weSA9IG5ld0JpbmRpbmdDYWxjdWxhdGlvbihjYWxjdWxhdGlvbik7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRpb25zLnB1c2goY29weSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9