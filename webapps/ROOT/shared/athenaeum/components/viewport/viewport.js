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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("angular2/core");
var Viewport = (function () {
    function Viewport(el, color, bgColor) {
        this.changed = new core_1.EventEmitter();
        this.el_ = el;
        this.color = color || "white";
        this.bgColor = bgColor || "rgba(0,0,0,.5)";
    }
    Viewport.getSize = function () {
        var size;
        if (window.innerWidth < 768) {
            size = "xs";
        }
        else if ((window.innerWidth >= 768) && (window.innerWidth < 992)) {
            size = "sm";
        }
        else if ((window.innerWidth >= 992) && (window.innerWidth < 1200)) {
            size = "md";
        }
        else if (window.innerWidth >= 1200) {
            size = "lg";
        }
        return size;
    };
    Viewport.getStyleBySelector = function (selector) {
        var sheetList = document.styleSheets;
        var ruleList;
        var i, j;
        for (i = sheetList.length - 1; i >= 0; i--) {
            ruleList = sheetList[i].cssRules;
            for (j = 0; j < ruleList.length; j++) {
                if (ruleList[j].type === CSSRule.STYLE_RULE &&
                    ruleList[j].selectorText === selector) {
                    return ruleList[j].style;
                }
            }
        }
        return null;
    };
    Viewport.prototype.ngOnInit = function () {
        var rule = Viewport.getStyleBySelector("#viewport-div::before");
        this.styleSheet_ = (rule != null) &&
            (rule.parentRule != null) &&
            (rule.parentRule.parentStyleSheet != null)
            ? rule.parentRule.parentStyleSheet
            : null;
        this.applyStyles();
        this.size = Viewport.getSize();
        var self = this;
        window.addEventListener("resize", function (event) { return self.resized(event); });
    };
    Viewport.prototype.applyStyles = function () {
        if (!this.styleSheet_) {
            return;
        }
        this.styleSheet_.addRule("#viewport-div::before", "background-color: " + this.bgColor);
        this.styleSheet_.addRule("#viewport-div::before", "color: " + this.color);
    };
    Viewport.prototype.resized = function (event) {
        var oldSize = this.size;
        this.size = Viewport.getSize();
        if (oldSize !== this.size) {
            this.changed.emit({
                src: this,
                old: oldSize,
                new: this.size
            });
        }
    };
    Viewport = __decorate([
        core_1.Component({
            selector: "pb-viewport",
            outputs: ["changed"],
            moduleId: module.id,
            templateUrl: "viewport.html",
            styleUrls: ["viewport.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(1, core_1.Attribute("color")),
        __param(2, core_1.Attribute("bg-color")), 
        __metadata('design:paramtypes', [core_1.ElementRef, String, String])
    ], Viewport);
    return Viewport;
}());
exports.Viewport = Viewport;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdmlld3BvcnQvdmlld3BvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUdPLGVBQWUsQ0FBQyxDQUFBO0FBVXZCO0lBOENJLGtCQUFZLEVBQWMsRUFDTSxLQUFhLEVBQ1YsT0FBZTtRQTNDM0MsWUFBTyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBNENoQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQztJQUMvQyxDQUFDO0lBMUNNLGdCQUFPLEdBQWQ7UUFDSSxJQUFJLElBQVksQ0FBQztRQUVqQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsQ0FBQztR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QUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBQyxlQUFlO1lBQzNCLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUMzQixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtTQUN4QyxDQUFDO21CQWdEZSxnQkFBUyxDQUFDLE9BQU8sQ0FBQzttQkFDbEIsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7O2dCQWpEcEM7SUE0RkYsZUFBQztBQUFELENBM0ZBLEFBMkZDLElBQUE7QUEzRlksZ0JBQVEsV0EyRnBCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy92aWV3cG9ydC92aWV3cG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgRWxlbWVudFJlZiwgQXR0cmlidXRlLCBPbkluaXQsIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCwgT3V0cHV0XG59IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBiLXZpZXdwb3J0XCIsXG4gICAgb3V0cHV0czogW1wiY2hhbmdlZFwiXSxcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOlwidmlld3BvcnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1widmlld3BvcnQuY3NzXCJdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgVmlld3BvcnQge1xuICAgIHB1YmxpYyBiZ0NvbG9yOiBzdHJpbmc7XG4gICAgcHVibGljIGNvbG9yOiBzdHJpbmc7XG4gICAgcHVibGljIHNpemU6IHN0cmluZztcblxuICAgIHB1YmxpYyBjaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBlbF86IEVsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBzdHlsZVNoZWV0XzogYW55O1xuXG4gICAgc3RhdGljIGdldFNpemUoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHNpemU6IHN0cmluZztcblxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgICAgICAgIHNpemUgPSBcInhzXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoKHdpbmRvdy5pbm5lcldpZHRoID49IDc2OCkgJiYgKHdpbmRvdy5pbm5lcldpZHRoIDwgOTkyKSkge1xuICAgICAgICAgICAgc2l6ZSA9IFwic21cIjtcbiAgICAgICAgfSBlbHNlIGlmICgod2luZG93LmlubmVyV2lkdGggPj0gOTkyKSAmJiAod2luZG93LmlubmVyV2lkdGggPCAxMjAwKSkge1xuICAgICAgICAgICAgc2l6ZSA9IFwibWRcIjtcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMjAwKSB7XG4gICAgICAgICAgICBzaXplID0gXCJsZ1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFN0eWxlQnlTZWxlY3RvcihzZWxlY3Rvcik6IGFueSB7XG4gICAgICAgIGNvbnN0IHNoZWV0TGlzdCA9IGRvY3VtZW50LnN0eWxlU2hlZXRzO1xuICAgICAgICBsZXQgcnVsZUxpc3Q7XG4gICAgICAgIGxldCBpLCBqO1xuXG4gICAgICAgIC8qIGxvb2sgdGhyb3VnaCBzdHlsZXNoZWV0cyBpbiByZXZlcnNlIG9yZGVyIHRoYXRcbiAgICAgICAgIHRoZXkgYXBwZWFyIGluIHRoZSBkb2N1bWVudCAqL1xuICAgICAgICBmb3IgKGkgPSBzaGVldExpc3QubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBydWxlTGlzdCA9ICg8YW55PiBzaGVldExpc3RbaV0pLmNzc1J1bGVzO1xuICAgICAgICAgICAgZm9yIChqPTA7IGo8cnVsZUxpc3QubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocnVsZUxpc3Rbal0udHlwZSA9PT0gQ1NTUnVsZS5TVFlMRV9SVUxFICYmXG4gICAgICAgICAgICAgICAgICAgIHJ1bGVMaXN0W2pdLnNlbGVjdG9yVGV4dCA9PT0gc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1bGVMaXN0W2pdLnN0eWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIEBBdHRyaWJ1dGUoXCJjb2xvclwiKSBjb2xvcjogc3RyaW5nLFxuICAgICAgICAgICAgICAgIEBBdHRyaWJ1dGUoXCJiZy1jb2xvclwiKSBiZ0NvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5lbF8gPSBlbDtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yIHx8IFwid2hpdGVcIjtcbiAgICAgICAgdGhpcy5iZ0NvbG9yID0gYmdDb2xvciB8fCBcInJnYmEoMCwwLDAsLjUpXCI7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IHJ1bGUgPSBWaWV3cG9ydC5nZXRTdHlsZUJ5U2VsZWN0b3IoXCIjdmlld3BvcnQtZGl2OjpiZWZvcmVcIik7XG4gICAgICAgIHRoaXMuc3R5bGVTaGVldF8gPSAocnVsZSAhPSBudWxsKSAmJlxuICAgICAgICAocnVsZS5wYXJlbnRSdWxlICE9IG51bGwpICYmXG4gICAgICAgIChydWxlLnBhcmVudFJ1bGUucGFyZW50U3R5bGVTaGVldCAhPSBudWxsKVxuICAgICAgICAgICAgPyBydWxlLnBhcmVudFJ1bGUucGFyZW50U3R5bGVTaGVldFxuICAgICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgIHRoaXMuYXBwbHlTdHlsZXMoKTtcblxuICAgICAgICB0aGlzLnNpemUgPSBWaWV3cG9ydC5nZXRTaXplKCk7XG5cbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIChldmVudCkgPT4geyByZXR1cm4gc2VsZi5yZXNpemVkKGV2ZW50KTsgfSk7XG4gICAgfVxuXG4gICAgYXBwbHlTdHlsZXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdHlsZVNoZWV0Xykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdHlsZVNoZWV0Xy5hZGRSdWxlKFwiI3ZpZXdwb3J0LWRpdjo6YmVmb3JlXCIsIGBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuYmdDb2xvcn1gKTtcbiAgICAgICAgdGhpcy5zdHlsZVNoZWV0Xy5hZGRSdWxlKFwiI3ZpZXdwb3J0LWRpdjo6YmVmb3JlXCIsIGBjb2xvcjogJHt0aGlzLmNvbG9yfWApO1xuICAgIH1cblxuICAgIHJlc2l6ZWQoZXZlbnQpIHtcbiAgICAgICAgbGV0IG9sZFNpemUgPSB0aGlzLnNpemU7XG4gICAgICAgIHRoaXMuc2l6ZSA9IFZpZXdwb3J0LmdldFNpemUoKTtcblxuICAgICAgICBpZiAob2xkU2l6ZSAhPT0gdGhpcy5zaXplKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZDogb2xkU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXc6IHRoaXMuc2l6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=