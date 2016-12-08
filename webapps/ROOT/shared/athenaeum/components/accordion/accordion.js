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
var Accordion = (function () {
    function Accordion() {
        this.exclusive = true;
    }
    Accordion.prototype.ngAfterViewInit = function () {
        if (!this.exclusive) {
            return;
        }
        var expanded;
        this.panes.map(function (pane) {
            if (pane.expanded) {
                expanded = pane;
            }
            pane.expanded = false;
        });
        if (expanded) {
            expanded.expanded = true;
        }
    };
    Accordion.prototype.collapseAll = function (origin) {
        if (!this.panes || !this.exclusive) {
            return;
        }
        this.panes.map(function (pane) {
            if (pane !== origin && pane.expanded) {
                pane.expanded = false;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Accordion.prototype, "exclusive", void 0);
    __decorate([
        core_1.ContentChildren(core_1.forwardRef(function () { return AccordionPane; })), 
        __metadata('design:type', core_1.QueryList)
    ], Accordion.prototype, "panes", void 0);
    Accordion = __decorate([
        core_1.Directive({
            selector: "pb-accordion"
        }), 
        __metadata('design:paramtypes', [])
    ], Accordion);
    return Accordion;
}());
exports.Accordion = Accordion;
var AccordionPane = (function () {
    function AccordionPane(elementRef, parent, expanded) {
        this.expandedChanged = new core_1.EventEmitter();
        this.nativeElement = elementRef.nativeElement;
        this.parent = parent;
        this._expanded = expanded != null;
        this._onTransitionEnd = this.onTransitionEnd.bind(this);
    }
    Object.defineProperty(AccordionPane.prototype, "exclusive", {
        get: function () {
            return this.parent && this.parent.exclusive;
        },
        enumerable: true,
        configurable: true
    });
    AccordionPane.prototype.ngAfterViewInit = function () {
        this.contentElement = this.contentRef.nativeElement;
        this.initializeContentChildren();
        this.setNodeExpanded(this.expanded);
        this.contentElement.addEventListener("transitionend", this._onTransitionEnd);
    };
    AccordionPane.prototype.ngOnDestroy = function () {
        this.contentElement.removeEventListener("transitionend", this._onTransitionEnd);
    };
    Object.defineProperty(AccordionPane.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (value) {
            if (typeof value === "string") {
                return;
            }
            if (value === this._expanded) {
                return;
            }
            if (this.exclusive && value) {
                this.parent.collapseAll(this);
            }
            this._expanded = value;
            this.expandedChanged.next(this._expanded);
            if (!this.contentElement) {
                this.setNodeExpanded(value);
                return;
            }
            if (!value) {
                this.contentElement.style.height = this.contentElement.offsetHeight + "px";
            }
            else {
                this.contentElement.style.height = "0px";
            }
            var _ = this.contentElement.offsetHeight;
            this.contentElement.classList.add("pb-accordion-pane__content_expanding");
            this.setNodeExpanded(value);
            if (value) {
                this.contentElement.style.height = this.contentElement.scrollHeight + "px";
            }
            else {
                this.contentElement.style.height = "0px";
            }
        },
        enumerable: true,
        configurable: true
    });
    AccordionPane.prototype.initializeContentChildren = function () {
        var children = this.nativeElement.querySelectorAll("\n            :scope > .pb-accordion-pane__header-container > header,\n            :scope > .pb-accordion-pane__content > section,\n            :scope > .pb-accordion-pane__content > footer\n        ");
        for (var i = 0; i < children.length; ++i) {
            var child = children[i];
            var tagName = child.tagName.toUpperCase();
            if (tagName === "HEADER") {
                child.classList.add("pb-accordion-pane__header");
            }
            else if (tagName === "FOOTER") {
                child.classList.add("pb-accordion-pane__footer");
            }
            else {
                child.classList.add("pb-accordion-pane__body");
            }
        }
    };
    AccordionPane.prototype.setNodeExpanded = function (value) {
        if (value) {
            this.nativeElement.setAttribute("expanded", "");
        }
        else {
            this.nativeElement.removeAttribute("expanded");
        }
    };
    AccordionPane.prototype.onHeaderClick = function (event) {
        if (this.exclusive) {
            this.expanded = true;
        }
        else {
            this.expanded = !this.expanded;
        }
    };
    AccordionPane.prototype.onTransitionEnd = function (event) {
        if (event.target !== this.contentElement) {
            return;
        }
        this.contentElement.classList.remove("pb-accordion-pane__content_expanding");
        if (this.expanded) {
            this.contentElement.style.height = "";
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AccordionPane.prototype, "expandedChanged", void 0);
    __decorate([
        core_1.ViewChild("content"), 
        __metadata('design:type', core_1.ElementRef)
    ], AccordionPane.prototype, "contentRef", void 0);
    __decorate([
        core_1.HostBinding("class.exclusive"), 
        __metadata('design:type', Boolean)
    ], AccordionPane.prototype, "exclusive", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AccordionPane.prototype, "expanded", null);
    AccordionPane = __decorate([
        core_1.Component({
            selector: "pb-accordion-pane",
            moduleId: module.id,
            templateUrl: "accordion.html",
            styleUrls: ["accordion.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(1, core_1.Optional()),
        __param(1, core_1.Host()),
        __param(2, core_1.Attribute("expanded")), 
        __metadata('design:paramtypes', [core_1.ElementRef, Accordion, String])
    ], AccordionPane);
    return AccordionPane;
}());
exports.AccordionPane = AccordionPane;
exports.ACCORDION_DIRECTIVES = [
    Accordion, AccordionPane
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYWNjb3JkaW9uL2FjY29yZGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEscUJBR08sZUFBZSxDQUFDLENBQUE7QUFLdkI7SUFBQTtRQUNhLGNBQVMsR0FBRyxJQUFJLENBQUM7SUFpQzlCLENBQUM7SUE5QkcsbUNBQWUsR0FBZjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUlELElBQUksUUFBYSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBUztZQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNwQixDQUFDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1gsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDN0IsQ0FBQztJQUNMLENBQUM7SUFFRCwrQkFBVyxHQUFYLFVBQVksTUFBc0I7UUFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSTtZQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUMxQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxD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MERBQUE7SUFJVDtRQUFDLGdCQUFTLENBQUMsU0FBUyxDQUFDOztxREFBQTtJQU1yQjtRQUFDLGtCQUFXLENBQUMsaUJBQWlCLENBQUM7O2tEQUFBO0lBMEIvQjtRQUFDLFlBQUssRUFBRTs7aURBQUE7SUE1Q1o7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDNUIsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7U0FDeEMsQ0FBQzttQkFrQmUsZUFBUSxFQUFFO21CQUFFLFdBQUksRUFBRTttQkFDbEIsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7O3FCQW5CcEM7SUFxSUYsb0JBQUM7QUFBRCxDQXBJQSxBQW9JQyxJQUFBO0FBcElZLHFCQUFhLGdCQW9JekIsQ0FBQTtBQUVZLDRCQUFvQixHQUFHO0lBQ2hDLFNBQVMsRUFBRSxhQUFhO0NBQzNCLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy9hY2NvcmRpb24vYWNjb3JkaW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIGZvcndhcmRSZWYsIEVsZW1lbnRSZWYsXG4gICAgUXVlcnlMaXN0LCBIb3N0LCBBdHRyaWJ1dGUsIE9wdGlvbmFsLCBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZHJlbiwgT3V0cHV0LCBJbnB1dCwgSG9zdEJpbmRpbmcsIFZpZXdDaGlsZFxufSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJwYi1hY2NvcmRpb25cIlxufSlcbmV4cG9ydCBjbGFzcyBBY2NvcmRpb24ge1xuICAgIEBJbnB1dCgpIGV4Y2x1c2l2ZSA9IHRydWU7XG4gICAgQENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IEFjY29yZGlvblBhbmUpKSBwcml2YXRlIHBhbmVzOiBRdWVyeUxpc3Q8QWNjb3JkaW9uUGFuZT47XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5leGNsdXNpdmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIG11bHRpcGxlIHBhbmVzIGFyZSBtYXJrZWQgYXMgZXhwYW5kZWQsIHRoZSBsYXN0IG9uZVxuICAgICAgICAvLyBpcyB0aGUgb25seSBvbmUgdGhhdCBzaG91bGQgYmUgZXhwYW5kZWQgKGxpa2UgPHNlbGVjdD4pLlxuICAgICAgICBsZXQgZXhwYW5kZWQ6IGFueTtcbiAgICAgICAgdGhpcy5wYW5lcy5tYXAoKHBhbmU6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHBhbmUuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICBleHBhbmRlZCA9IHBhbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYW5lLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIGV4cGFuZGVkLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbGxhcHNlQWxsKG9yaWdpbj86IEFjY29yZGlvblBhbmUpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBhbmVzIHx8ICF0aGlzLmV4Y2x1c2l2ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYW5lcy5tYXAoKHBhbmUpID0+IHtcbiAgICAgICAgICAgIGlmIChwYW5lICE9PSBvcmlnaW4gJiYgcGFuZS5leHBhbmRlZCkge1xuICAgICAgICAgICAgICAgIHBhbmUuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwYi1hY2NvcmRpb24tcGFuZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiYWNjb3JkaW9uLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcImFjY29yZGlvbi5jc3NcIl0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBBY2NvcmRpb25QYW5lIHtcbiAgICBAT3V0cHV0KCkgZXhwYW5kZWRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBfZXhwYW5kZWQ6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBuYXRpdmVFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBAVmlld0NoaWxkKFwiY29udGVudFwiKSBwcml2YXRlIGNvbnRlbnRSZWY6IEVsZW1lbnRSZWY7XG4gICAgcHJpdmF0ZSBjb250ZW50RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBwYW5lRWxlbWVudHM6IE5vZGVMaXN0O1xuICAgIHByaXZhdGUgcGFyZW50OiBBY2NvcmRpb247XG4gICAgcHJpdmF0ZSBfb25UcmFuc2l0aW9uRW5kOiAoZXZlbnQ6IFRyYW5zaXRpb25FdmVudCkgPT4gdm9pZDtcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmV4Y2x1c2l2ZVwiKVxuICAgIHByaXZhdGUgZ2V0IGV4Y2x1c2l2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmV4Y2x1c2l2ZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcGFyZW50OiBBY2NvcmRpb24sXG4gICAgICAgICAgICAgICAgQEF0dHJpYnV0ZShcImV4cGFuZGVkXCIpIGV4cGFuZGVkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50ID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgdGhpcy5fZXhwYW5kZWQgPSBleHBhbmRlZCAhPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX29uVHJhbnNpdGlvbkVuZCA9IHRoaXMub25UcmFuc2l0aW9uRW5kLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbGVtZW50ID0gdGhpcy5jb250ZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNvbnRlbnRDaGlsZHJlbigpO1xuICAgICAgICB0aGlzLnNldE5vZGVFeHBhbmRlZCh0aGlzLmV4cGFuZGVkKTtcbiAgICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCB0aGlzLl9vblRyYW5zaXRpb25FbmQpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIHRoaXMuX29uVHJhbnNpdGlvbkVuZCk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG4gICAgfVxuXG4gICAgc2V0IGV4cGFuZGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgZ3VhcmQgaXMgdG8gcHJldmVudCBjaGFuZ2UgZGV0ZWN0aW9uIGZyb20gcnVubmluZyB0aGVcbiAgICAgICAgICAgIC8vIGV4cGFuc2lvbiBsb2dpYyBmb3IgYSBub2RlIGF0dHJpYnV0ZS4gV2UncmUgYWxyZWFkeSBoYW5kbGluZ1xuICAgICAgICAgICAgLy8gdGhlIGF0dHJpYnV0ZSBpbiB0aGUgY29uc3RydWN0b3IsIHNvIHRoZXJlJ3Mgbm8gcmVhc29uIHRvXG4gICAgICAgICAgICAvLyBoYW5kbGUgaXQgYWdhaW4gYW5kIGhhbmRsaW5nIGl0IGhlcmUgb25seSBtYWtlcyB0aGUgbG9naWMgZm9yXG4gICAgICAgICAgICAvLyBrZWVwaW5nIHRoZSBhbmltYXRpb24gZnJvbSBydW5uaW5nIGR1cmluZyBpbml0aWFsaXphdGlvbiBtb3JlXG4gICAgICAgICAgICAvLyBjb21wbGV4LlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLl9leHBhbmRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZXhjbHVzaXZlICYmIHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5jb2xsYXBzZUFsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2V4cGFuZGVkID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2VkLm5leHQodGhpcy5fZXhwYW5kZWQpO1xuXG4gICAgICAgIGlmICghdGhpcy5jb250ZW50RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zZXROb2RlRXhwYW5kZWQodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHt0aGlzLmNvbnRlbnRFbGVtZW50Lm9mZnNldEhlaWdodH1weGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiMHB4XCI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBfID0gdGhpcy5jb250ZW50RWxlbWVudC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicGItYWNjb3JkaW9uLXBhbmVfX2NvbnRlbnRfZXhwYW5kaW5nXCIpO1xuICAgICAgICB0aGlzLnNldE5vZGVFeHBhbmRlZCh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LnN0eWxlLmhlaWdodCA9IGAke3RoaXMuY29udGVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0fXB4YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIwcHhcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUNvbnRlbnRDaGlsZHJlbigpIHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChgXG4gICAgICAgICAgICA6c2NvcGUgPiAucGItYWNjb3JkaW9uLXBhbmVfX2hlYWRlci1jb250YWluZXIgPiBoZWFkZXIsXG4gICAgICAgICAgICA6c2NvcGUgPiAucGItYWNjb3JkaW9uLXBhbmVfX2NvbnRlbnQgPiBzZWN0aW9uLFxuICAgICAgICAgICAgOnNjb3BlID4gLnBiLWFjY29yZGlvbi1wYW5lX19jb250ZW50ID4gZm9vdGVyXG4gICAgICAgIGApO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkOiBIVE1MRWxlbWVudCA9IDxhbnk+IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgY29uc3QgdGFnTmFtZSA9IGNoaWxkLnRhZ05hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGlmICh0YWdOYW1lID09PSBcIkhFQURFUlwiKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuY2xhc3NMaXN0LmFkZChcInBiLWFjY29yZGlvbi1wYW5lX19oZWFkZXJcIik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09IFwiRk9PVEVSXCIpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QuYWRkKFwicGItYWNjb3JkaW9uLXBhbmVfX2Zvb3RlclwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuY2xhc3NMaXN0LmFkZChcInBiLWFjY29yZGlvbi1wYW5lX19ib2R5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXROb2RlRXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZXhwYW5kZWRcIiwgXCJcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiZXhwYW5kZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uSGVhZGVyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZXhjbHVzaXZlKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25UcmFuc2l0aW9uRW5kKGV2ZW50OiBUcmFuc2l0aW9uRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCAhPT0gdGhpcy5jb250ZW50RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInBiLWFjY29yZGlvbi1wYW5lX19jb250ZW50X2V4cGFuZGluZ1wiKTtcblxuICAgICAgICBpZiAodGhpcy5leHBhbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgQUNDT1JESU9OX0RJUkVDVElWRVMgPSBbXG4gICAgQWNjb3JkaW9uLCBBY2NvcmRpb25QYW5lXG5dO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9