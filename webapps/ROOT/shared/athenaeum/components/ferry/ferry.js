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
var catalog_1 = require("../catalog/catalog");
var Ferry = (function () {
    function Ferry() {
        this.leftCatArgs = {};
        this.leftCatArgs.gridId = "leftGridId";
        this.rightCatArgs = {};
        this.rightCatArgs.gridId = "rightGridId";
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Ferry.prototype, "pbArgs", void 0);
    Ferry = __decorate([
        core_1.Component({
            selector: "pb-ferry",
            moduleId: module.id,
            templateUrl: "ferry.html",
            styleUrls: ["ferry.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [catalog_1.Catalog]
        }), 
        __metadata('design:paramtypes', [])
    ], Ferry);
    return Ferry;
}());
exports.Ferry = Ferry;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmVycnkvZmVycnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLHFCQUE2RCxlQUFlLENBQUMsQ0FBQTtBQUU3RSx3QkFBc0Isb0JBQW9CLENBQUMsQ0FBQTtBQVUzQztJQU1JO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO1FBRXZDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQztJQUM3QyxDQUFDO0lBWEQ7UUFBQyxZQUFLLEVBQUU7O3lDQUFBO0lBVFo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxZQUFZO1lBQ3pCLFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUN4QixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtZQUNyQyxVQUFVLEVBQUUsQ0FBQyxpQkFBTyxDQUFDO1NBQ3hCLENBQUM7O2FBQUE7SUFjRixZQUFDO0FBQUQsQ0FiQSxBQWFDLElBQUE7QUFiWSxhQUFLLFFBYWpCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9mZXJyeS9mZXJyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTUsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYSwgSW5jLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmJza2lubmVyQHBhY2lmaWNiaW9zY2llbmNlcy5jb21cIj5CcmlhbiBTa2lubmVyPC9hPlxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQXR0cmlidXRlLCBJbnB1dH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcblxuaW1wb3J0IHtDYXRhbG9nfSBmcm9tIFwiLi4vY2F0YWxvZy9jYXRhbG9nXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBiLWZlcnJ5XCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCJmZXJyeS5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJmZXJyeS5jc3NcIl0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBkaXJlY3RpdmVzOiBbQ2F0YWxvZ11cbn0pXG5leHBvcnQgY2xhc3MgRmVycnkge1xuICAgIEBJbnB1dCgpIHBiQXJnczogYW55O1xuXG4gICAgcHVibGljIGxlZnRDYXRBcmdzO1xuICAgIHB1YmxpYyByaWdodENhdEFyZ3M7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sZWZ0Q2F0QXJncyA9IHt9O1xuICAgICAgICB0aGlzLmxlZnRDYXRBcmdzLmdyaWRJZCA9IFwibGVmdEdyaWRJZFwiO1xuXG4gICAgICAgIHRoaXMucmlnaHRDYXRBcmdzID0ge307XG4gICAgICAgIHRoaXMucmlnaHRDYXRBcmdzLmdyaWRJZCA9IFwicmlnaHRHcmlkSWRcIjtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=