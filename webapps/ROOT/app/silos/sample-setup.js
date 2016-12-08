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
var index_1 = require("./sample-setup/index");
var binding_calculation_editor_1 = require("./sample-setup/binding-calculation-editor");
var navbar_settings_1 = require("../navbar-settings");
var silo_1 = require("./silo");
var SampleSetup = (function () {
    function SampleSetup() {
        navbar_settings_1.navbarSettings.setSilo(silo_1.SILO.SAMPLE_SETUP);
    }
    SampleSetup = __decorate([
        core_1.Component({
            template: "\n        <router-outlet></router-outlet>\n    ",
            directives: [router_1.RouterOutlet],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        router_1.RouteConfig([
            { path: "/", name: "Index", component: index_1.Index, useAsDefault: true },
            { path: "/new", name: "NewBindingCalculation", component: binding_calculation_editor_1.BindingCalculationEditor }
        ]), 
        __metadata('design:paramtypes', [])
    ], SampleSetup);
    return SampleSetup;
}());
exports.SampleSetup = SampleSetup;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9zYW1wbGUtc2V0dXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUMzRCx1QkFBd0MsaUJBQWlCLENBQUMsQ0FBQTtBQUMxRCxzQkFBb0Isc0JBQXNCLENBQUMsQ0FBQTtBQUMzQywyQ0FBdUMsMkNBQTJDLENBQUMsQ0FBQTtBQUVuRixnQ0FBNkIsb0JBQW9CLENBQUMsQ0FBQTtBQUNsRCxxQkFBbUIsUUFBUSxDQUFDLENBQUE7QUFhNUI7SUFDSTtRQUNJLGdDQUFjLENBQUMsT0FBTyxDQUFDLFdBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBZEw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGlEQUVUO1lBQ0QsVUFBVSxFQUFFLENBQUMscUJBQVksQ0FBQztZQUMxQixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtTQUN4QyxDQUFDO1FBQ0Qsb0JBQVcsQ0FBQztZQUNULEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxhQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRTtZQUNsRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxxREFBd0IsRUFBRTtTQUN2RixDQUFDOzttQkFBQTtJQUtGLGtCQUFDO0FBQUQsQ0FKQSxBQUlDLElBQUE7QUFKWSxtQkFBVyxjQUl2QixDQUFBIiwiZmlsZSI6ImFwcC9zaWxvcy9zYW1wbGUtc2V0dXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge1JvdXRlck91dGxldCwgUm91dGVDb25maWd9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcbmltcG9ydCB7SW5kZXh9IGZyb20gXCIuL3NhbXBsZS1zZXR1cC9pbmRleFwiO1xuaW1wb3J0IHtCaW5kaW5nQ2FsY3VsYXRpb25FZGl0b3J9IGZyb20gXCIuL3NhbXBsZS1zZXR1cC9iaW5kaW5nLWNhbGN1bGF0aW9uLWVkaXRvclwiO1xuXG5pbXBvcnQge25hdmJhclNldHRpbmdzfSBmcm9tIFwiLi4vbmF2YmFyLXNldHRpbmdzXCI7XG5pbXBvcnQge1NJTE99IGZyb20gXCIuL3NpbG9cIjtcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICAgIGAsXG4gICAgZGlyZWN0aXZlczogW1JvdXRlck91dGxldF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbkBSb3V0ZUNvbmZpZyhbXG4gICAgeyBwYXRoOiBcIi9cIiwgbmFtZTogXCJJbmRleFwiLCBjb21wb25lbnQ6IEluZGV4LCB1c2VBc0RlZmF1bHQ6IHRydWUgfSxcbiAgICB7IHBhdGg6IFwiL25ld1wiLCBuYW1lOiBcIk5ld0JpbmRpbmdDYWxjdWxhdGlvblwiLCBjb21wb25lbnQ6IEJpbmRpbmdDYWxjdWxhdGlvbkVkaXRvciB9XG5dKVxuZXhwb3J0IGNsYXNzIFNhbXBsZVNldHVwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgbmF2YmFyU2V0dGluZ3Muc2V0U2lsbyhTSUxPLlNBTVBMRV9TRVRVUCk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9