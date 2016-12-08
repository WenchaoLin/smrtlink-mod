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
var Filterbar = (function () {
    function Filterbar() {
        this.showRecordsWithAllFields = true;
        this.showRecordsWithField = {};
        this.itemsByField = {};
        this.filterChange = new core_1.EventEmitter();
    }
    Filterbar.prototype.ngOnInit = function () {
        var items = this.pbArgs.items;
        this.items = items;
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            this.itemsByField[item.field] = item;
        }
    };
    Filterbar.prototype.onClickItem = function (field) {
        this.toggleFilterForField(field);
    };
    Filterbar.prototype.onClickAll = function () {
        this.toggleFiltersForAllFields();
    };
    Filterbar.prototype.toggleFilterForField = function (field) {
        if (this.pbArgs.radioMode) {
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var item = _a[_i];
                item.checked = item.field === field;
            }
        }
        else {
            var item = this.itemsByField[field];
            item.checked = !item.checked;
        }
        this.filterChange.next(this.items);
    };
    Filterbar.prototype.toggleFiltersForAllFields = function () {
        var show = this.showRecordsWithAllFields =
            !this.showRecordsWithAllFields;
        if (this.items) {
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var item = _a[_i];
                item.checked = show;
            }
        }
        this.filterChange.next(this.items);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Filterbar.prototype, "pbArgs", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Filterbar.prototype, "filterChange", void 0);
    Filterbar = __decorate([
        core_1.Component({
            selector: "pb-filterbar",
            moduleId: module.id,
            templateUrl: "filterbar.html",
            styleUrls: ["filterbar.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], Filterbar);
    return Filterbar;
}());
exports.Filterbar = Filterbar;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsdGVyYmFyL2ZpbHRlcmJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EscUJBRU8sZUFBZSxDQUFDLENBQUE7QUFDdkIsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUEwQmhEO0lBQUE7UUFFWSw2QkFBd0IsR0FBRyxJQUFJLENBQUM7UUFDaEMseUJBQW9CLEdBQUcsRUFBRSxDQUFDO1FBRTFCLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBRVIsaUJBQVksR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQTBDeEQsQ0FBQztJQXhDVyw0QkFBUSxHQUFoQjtRQUNFLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxDQUFhLFVBQUssRUFBTCxlQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLLENBQUM7WUFBbEIsSUFBSSxJQUFJLGNBQUE7WUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRU8sK0JBQVcsR0FBbkIsVUFBb0IsS0FBYTtRQUM3QixJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLDhCQUFVLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVPLHdDQUFvQixHQUE1QixVQUE2QixLQUFhO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMxQixHQUFHLENBQUMsQ0FBYSxVQUFVLEVBQVYsS0FBQSxJQUFJLENBQUMsS0FBSyxFQUFWLGNBQVUsRUFBVixJQUFVLENBQUM7Z0JBQXZCLElBQUksSUFBSSxTQUFBO2dCQUNYLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7YUFDckM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQy9CLENBQUM7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVPLDZDQUF5QixHQUFqQztRQUNJLElBQU0sSUFBSSxHQUNSLElBQUksQ0FBQyx3QkFBd0I7WUFDN0IsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQy9CO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYixHQUFHLENBQUMsQ0FBYSxVQUFVLEVBQVYsS0FBQSxJQUFJLENBQUMsS0FBSyxFQUFWLGNBQVUsRUFBVixJQUFVLENBQUM7Z0JBQXZCLElBQUksSUFBSSxTQUFBO2dCQUNULElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1FBQ0wsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBL0NEO1FBQUMsWUFBSyxFQUFFOzs2Q0FBQTtJQU1SO1FBQUMsYUFBTSxFQUFFOzttREFBQTtJQWZiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQztZQUM1QixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtZQUNyQyxVQUFVLEVBQUUsQ0FBQyx3QkFBZSxDQUFDO1NBQ2hDLENBQUM7O2lCQUFBO0lBa0RGLGdCQUFDO0FBQUQsQ0FqREEsQUFpREMsSUFBQTtBQWpEWSxpQkFBUyxZQWlEckIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2ZpbHRlcmJhci9maWx0ZXJiYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXRcbn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tIFwiYW5ndWxhcjIvY29tbW9uXCI7XG5cbi8vIGltcG9ydCB7Q2F0YWxvZ30gZnJvbSBcIi4uL2NhdGFsb2cvY2F0YWxvZ1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElJdGVtIHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGNoZWNrZWQ6IGJvb2xlYW47XG4gICAgZmllbGQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRmlsdGVyYmFyQXJncyB7XG4gICAgcmFkaW9Nb2RlPzogYm9vbGVhbjtcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XG4gICAgaXRlbXM6IEFycmF5PElJdGVtPjtcbiAgICBwcm9wZXJ0eT86IHN0cmluZztcbiAgICBvbkNoYW5nZT86IEZ1bmN0aW9uO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwYi1maWx0ZXJiYXJcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcImZpbHRlcmJhci5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJmaWx0ZXJiYXIuY3NzXCJdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgZGlyZWN0aXZlczogW0NPUkVfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyYmFyIHtcbiAgICBASW5wdXQoKSBwdWJsaWMgcGJBcmdzOiBJRmlsdGVyYmFyQXJncztcbiAgICBwcml2YXRlIHNob3dSZWNvcmRzV2l0aEFsbEZpZWxkcyA9IHRydWU7XG4gICAgcHJpdmF0ZSBzaG93UmVjb3Jkc1dpdGhGaWVsZCA9IHt9O1xuICAgIHByaXZhdGUgaXRlbXM6IEFycmF5PElJdGVtPjtcbiAgICBwcml2YXRlIGl0ZW1zQnlGaWVsZCA9IHt9O1xuXG4gICAgQE91dHB1dCgpIHByaXZhdGUgZmlsdGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBuZ09uSW5pdCgpIHtcbiAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5wYkFyZ3MuaXRlbXM7XG4gICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgdGhpcy5pdGVtc0J5RmllbGRbaXRlbS5maWVsZF0gPSBpdGVtO1xuICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25DbGlja0l0ZW0oZmllbGQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLnRvZ2dsZUZpbHRlckZvckZpZWxkKGZpZWxkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2tBbGwoKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlRmlsdGVyc0ZvckFsbEZpZWxkcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdG9nZ2xlRmlsdGVyRm9yRmllbGQoZmllbGQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wYkFyZ3MucmFkaW9Nb2RlKSB7XG4gICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBpdGVtLmZpZWxkID09PSBmaWVsZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXNCeUZpZWxkW2ZpZWxkXTtcbiAgICAgICAgICBpdGVtLmNoZWNrZWQgPSAhaXRlbS5jaGVja2VkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmlsdGVyQ2hhbmdlLm5leHQodGhpcy5pdGVtcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b2dnbGVGaWx0ZXJzRm9yQWxsRmllbGRzKCkge1xuICAgICAgICBjb25zdCBzaG93OiBib29sZWFuID1cbiAgICAgICAgICB0aGlzLnNob3dSZWNvcmRzV2l0aEFsbEZpZWxkcyA9XG4gICAgICAgICAgIXRoaXMuc2hvd1JlY29yZHNXaXRoQWxsRmllbGRzXG4gICAgICAgIDtcbiAgICAgICAgaWYgKHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5pdGVtcykge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHNob3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWx0ZXJDaGFuZ2UubmV4dCh0aGlzLml0ZW1zKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=