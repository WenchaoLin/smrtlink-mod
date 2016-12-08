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
var AccordionOld = (function () {
    function AccordionOld() {
        this.expandedChanged = new core_1.EventEmitter();
        this.title = "";
        this.footer = "";
        this._showFooterWhenCollapsed = true;
        this._customHeader = false;
        this._customFooter = false;
        this._expanded = true;
        this.expandedChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(AccordionOld.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (value) {
            if (this._expanded !== value) {
                this._expanded = value;
                this.expandedChanged.next(this._expanded);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionOld.prototype, "customHeader", {
        get: function () {
            return this._customHeader;
        },
        set: function (value) {
            this._customHeader = value && value.toString() === "true";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionOld.prototype, "showFooterWhenCollapsed", {
        get: function () {
            return this._showFooterWhenCollapsed;
        },
        set: function (value) {
            this._showFooterWhenCollapsed = value && value.toString() === "true";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionOld.prototype, "customFooter", {
        get: function () {
            return this._customFooter;
        },
        set: function (value) {
            this._customFooter = value && value.toString() === "true";
        },
        enumerable: true,
        configurable: true
    });
    AccordionOld.prototype.toggle = function () {
        this.expanded = !this.expanded;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AccordionOld.prototype, "expandedChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AccordionOld.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AccordionOld.prototype, "footer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AccordionOld.prototype, "expanded", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AccordionOld.prototype, "customHeader", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AccordionOld.prototype, "showFooterWhenCollapsed", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AccordionOld.prototype, "customFooter", null);
    AccordionOld = __decorate([
        core_1.Component({
            selector: "pb-accordion-old",
            moduleId: module.id,
            templateUrl: "accordion-old.html",
            styleUrls: ["accordion-old.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], AccordionOld);
    return AccordionOld;
}());
exports.AccordionOld = AccordionOld;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYWNjb3JkaW9uL2FjY29yZGlvbi1vbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3RSxlQUFlLENBQUMsQ0FBQTtBQUN4Rix1QkFBOEIsaUJBQWlCLENBQUMsQ0FBQTtBQVVoRDtJQVdJO1FBVmlCLG9CQUFlLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFdEMsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBRTVCLDZCQUF3QixHQUFZLElBQUksQ0FBQztRQUN6QyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBRzlCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVRLHNCQUFJLGtDQUFRO2FBQVo7WUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO2FBQ0QsVUFBYSxLQUFjO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5QyxDQUFDO1FBQ0wsQ0FBQzs7O09BTkE7SUFRUSxzQkFBSSxzQ0FBWTthQUFoQjtZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7YUFDRCxVQUFpQixLQUFjO1lBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxNQUFNLENBQUM7UUFDOUQsQ0FBQzs7O09BSEE7SUFLUSxzQkFBSSxpREFBdUI7YUFBM0I7WUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDO1FBQ3pDLENBQUM7YUFDRCxVQUE0QixLQUFjO1lBQ3RDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLE1BQU0sQ0FBQztRQUN6RSxDQUFDOzs7T0FIQTtJQUtRLHNCQUFJLHNDQUFZO2FBQWhCO1lBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzthQUNELFVBQWlCLEtBQWM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLE1BQU0sQ0FBQztRQUM5RCxDQUFDOzs7T0FIQTtJQUtELDZCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNuQyxDQUFDO0lBL0NEO1FBQUMsYUFBTSxFQUFFOzt5REFBQTtJQUVUO1FBQUMsWUFBSyxFQUFFOzsrQ0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOztnREFBQTtJQVdSO1FBQUMsWUFBSyxFQUFFOztnREFBQTtJQVVSO1FBQUMsWUFBSyxFQUFFOztvREFBQTtJQU9SO1FBQUMsWUFBSyxFQUFFOzsrREFBQTtJQU9SO1FBQUMsWUFBSyxFQUFFOztvREFBQTtJQS9DWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsb0JBQW9CO1lBQ2pDLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO1lBQ2hDLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLFVBQVUsRUFBRSxDQUFDLHdCQUFlLENBQUM7U0FDaEMsQ0FBQzs7b0JBQUE7SUFrREYsbUJBQUM7QUFBRCxDQWpEQSxBQWlEQyxJQUFBO0FBakRZLG9CQUFZLGVBaUR4QixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvYWNjb3JkaW9uL2FjY29yZGlvbi1vbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBJbnB1dH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tIFwiYW5ndWxhcjIvY29tbW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBiLWFjY29yZGlvbi1vbGRcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcImFjY29yZGlvbi1vbGQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiYWNjb3JkaW9uLW9sZC5jc3NcIl0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBkaXJlY3RpdmVzOiBbQ09SRV9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBBY2NvcmRpb25PbGQge1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgZXhwYW5kZWRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KCkgcHVibGljIHRpdGxlOiBzdHJpbmcgPSBcIlwiO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmb290ZXI6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBwcml2YXRlIF9zaG93Rm9vdGVyV2hlbkNvbGxhcHNlZDogYm9vbGVhbiA9IHRydWU7XG4gICAgcHJpdmF0ZSBfY3VzdG9tSGVhZGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfY3VzdG9tRm9vdGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfZXhwYW5kZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cGFuZGVkO1xuICAgIH1cbiAgICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuX2V4cGFuZGVkICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fZXhwYW5kZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2VkLm5leHQodGhpcy5fZXhwYW5kZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IGN1c3RvbUhlYWRlcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbUhlYWRlcjtcbiAgICB9XG4gICAgc2V0IGN1c3RvbUhlYWRlcih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9jdXN0b21IZWFkZXIgPSB2YWx1ZSAmJiB2YWx1ZS50b1N0cmluZygpID09PSBcInRydWVcIjtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgc2hvd0Zvb3RlcldoZW5Db2xsYXBzZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93Rm9vdGVyV2hlbkNvbGxhcHNlZDtcbiAgICB9XG4gICAgc2V0IHNob3dGb290ZXJXaGVuQ29sbGFwc2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Nob3dGb290ZXJXaGVuQ29sbGFwc2VkID0gdmFsdWUgJiYgdmFsdWUudG9TdHJpbmcoKSA9PT0gXCJ0cnVlXCI7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IGN1c3RvbUZvb3RlcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbUZvb3RlcjtcbiAgICB9XG4gICAgc2V0IGN1c3RvbUZvb3Rlcih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9jdXN0b21Gb290ZXIgPSB2YWx1ZSAmJiB2YWx1ZS50b1N0cmluZygpID09PSBcInRydWVcIjtcbiAgICB9XG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=