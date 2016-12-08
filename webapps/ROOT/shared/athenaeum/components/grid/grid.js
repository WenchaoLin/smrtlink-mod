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
var Rx_1 = require("rxjs/Rx");
var dom_1 = require("../../common/dom");
var subscribeToResize = (function () {
    var resizeStream;
    function subscribeToResize(callback) {
        if (!resizeStream) {
            resizeStream = new Rx_1.Subject();
            window.addEventListener("resize", function () {
                resizeStream.next(null);
            });
        }
        return resizeStream.subscribe(callback);
    }
    return subscribeToResize;
})();
var getScrollbarWidth = (function () {
    var scrollbarWidth;
    function getScrollbarWidth(element) {
        if (typeof scrollbarWidth !== "undefined") {
            return scrollbarWidth;
        }
        var doc = element.ownerDocument;
        var testElement = doc.createElement("div");
        var style = testElement.style;
        style.width = "100px";
        style.height = "100px";
        style.overflow = "scroll";
        style.position = "absolute";
        style.top = "-9999px";
        doc.body.appendChild(testElement);
        var size = testElement.offsetWidth - testElement.clientWidth;
        doc.body.removeChild(testElement);
        return size;
    }
    return getScrollbarWidth;
})();
var Grid = (function () {
    function Grid(elementRef) {
        this.sorter = new Sorter();
        this.objectToRow = new WeakMap();
        this._selectable = false;
        this._sortable = false;
        this._destroyed = false;
        this.selectedEvent = new core_1.EventEmitter();
        this._bordered = false;
        this._striped = false;
        this._rootNode = elementRef.nativeElement;
    }
    Grid.prototype.ngAfterViewInit = function () {
        this.headerNode = this._rootNode.querySelector(".pb-grid__header:not(.pb-grid__header-scroll)");
        this.bodyNode = this._rootNode.querySelector(".pb-grid__body");
        this.footerNode = this._rootNode.querySelector(".pb-grid__footer:not(.pb-grid__footer-scroll)");
        this.headerScrollNode = this._rootNode.querySelector(".pb-grid__header-scroll");
        this.footerScrollNode = this._rootNode.querySelector(".pb-grid__footer-scroll");
        this.contentNode = this.bodyNode.firstElementChild;
        this._onBodyScroll = this.onBodyScroll.bind(this);
        this.bodyNode.addEventListener("scroll", this._onBodyScroll);
        this._onHeaderClick = dom_1.delegatedHandler(".pb-grid__column", this.onHeaderClick);
        this._onContentClick = dom_1.delegatedHandler(".pb-grid__row", this.onContentClick);
    };
    Object.defineProperty(Grid.prototype, "bordered", {
        get: function () {
            return this._bordered;
        },
        set: function (value) {
            this._bordered = value != null && value !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "striped", {
        get: function () {
            return this._striped;
        },
        set: function (value) {
            this._striped = value != null && value !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "sortable", {
        get: function () {
            return this._sortable;
        },
        set: function (value) {
            this._sortable = value != null && value !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "data", {
        set: function (value) {
            var _this = this;
            this.idToRow = {};
            this.rows = [];
            var now = Date.now();
            var i = 0;
            if (!value) {
                this.rows = [];
            }
            else {
                this.rows = value.map(function (object) {
                    var id = now + i++;
                    var row = {
                        id: id,
                        object: object,
                        selected: false
                    };
                    _this.objectToRow.set(object, row);
                    return _this.idToRow[id] = row;
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "selectable", {
        get: function () {
            return this._selectable;
        },
        set: function (value) {
            this._selectable = value != null && value !== false;
            this.selectedData = null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "selectedData", {
        get: function () {
            return this._selectedData;
        },
        set: function (value) {
            if (typeof value !== "object") {
                value = null;
            }
            if (this._selectedData === value) {
                return;
            }
            if (this._selectedData) {
                var oldRow = this.objectToRow.get(this.selectedData);
                oldRow.selected = false;
            }
            if (value) {
                this.objectToRow.get(value).selected = true;
            }
            this._selectedData = value;
            this.selectedEvent.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Grid.prototype.sort = function (key) {
        this.sorter.sort(key, this.rows);
    };
    Grid.prototype.resize = function () {
        var scrollWidth = getScrollbarWidth(this.headerNode) || 0;
        this.headerNode.style.width = "calc(100% - " + scrollWidth + "px";
        this.headerScrollNode.style.width = scrollWidth + "px";
        var headerHeight = this.headerNode.offsetHeight;
        var footerHeight = this.footerNode.offsetHeight || 0;
        this.bodyNode.style.height =
            "calc(100% - " + (headerHeight + footerHeight) + "px)";
        this.headerScrollNode.style.height = headerHeight + "px";
        this.footerScrollNode.style.height = footerHeight + "px";
        var contentNode = this.contentNode;
        var headerTableNode = this.headerNode.firstElementChild;
        contentNode.style.width = "";
        var headerWidth = headerTableNode.offsetWidth;
        if (headerWidth > contentNode.offsetWidth) {
            contentNode.style.width = headerWidth + "px";
        }
    };
    Grid.prototype.onChange = function (changes) {
        if (changes.hasOwnProperty("footerData") ||
            changes.hasOwnProperty("columns")) {
            setTimeout(this.resize.bind(this));
        }
    };
    Grid.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            if (_this._destroyed) {
                return;
            }
            _this.resizeHandle = subscribeToResize(_this.resize.bind(_this));
            _this.resize();
        });
    };
    Grid.prototype.ngOnDestroy = function () {
        this._destroyed = true;
        this.rows = this.idToRow = null;
        if (this.resizeHandle) {
            this.resizeHandle.unsubscribe();
        }
        this.bodyNode.removeEventListener("scroll", this._onBodyScroll);
    };
    Grid.prototype.format = function (row, column) {
        return row[column.field];
    };
    Grid.prototype.onBodyScroll = function (event) {
        this.headerNode.scrollLeft = this.footerNode.scrollLeft =
            event.scrollLeft || this.bodyNode.scrollLeft;
    };
    Grid.prototype.onHeaderClick = function (columnElement, event) {
        if (!this.sortable) {
            return;
        }
        var field = columnElement.getAttribute("data-column-field");
        this.sorter.sort(field, this.rows);
    };
    Grid.prototype.onContentClick = function (rowElement, event) {
        if (!this.selectable) {
            return;
        }
        var id = parseInt(rowElement.getAttribute("data-object-id"), 10);
        this.selectedData = this.idToRow[id].object;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Grid.prototype, "columns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Grid.prototype, "footerData", void 0);
    __decorate([
        core_1.Output("selectedChange"), 
        __metadata('design:type', Object)
    ], Grid.prototype, "selectedEvent", void 0);
    __decorate([
        core_1.HostBinding("class.table-bordered"),
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], Grid.prototype, "bordered", null);
    __decorate([
        core_1.HostBinding("class.table-striped"),
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], Grid.prototype, "striped", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], Grid.prototype, "sortable", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], Grid.prototype, "data", null);
    __decorate([
        core_1.HostBinding("class.table-hover"),
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], Grid.prototype, "selectable", null);
    __decorate([
        core_1.Input("selected"), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], Grid.prototype, "selectedData", null);
    Grid = __decorate([
        core_1.Component({
            selector: "pb-grid",
            moduleId: module.id,
            templateUrl: "grid.html",
            styleUrls: ["grid.css"],
            directives: [common_1.CORE_DIRECTIVES],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Grid);
    return Grid;
}());
exports.Grid = Grid;
var Sorter = (function () {
    function Sorter() {
        this.direction = 1;
    }
    Sorter.prototype.sort = function (key, data) {
        var _this = this;
        if (this.key === key) {
            this.direction = -this.direction;
        }
        else {
            this.direction = 1;
        }
        this.key = key;
        data.sort(function (a, b) {
            if (a.object[key] === b.object[key]) {
                return 0;
            }
            else if (a.object[key] > b.object[key]) {
                return _this.direction;
            }
            else {
                return -_this.direction;
            }
        });
    };
    return Sorter;
}());
exports.Sorter = Sorter;

//# sourceMappingURL=data:application/json;base64,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QUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQztZQUMzQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsYUFBQztBQUFELENBM0JBLEFBMkJDLElBQUE7QUEzQlksY0FBTSxTQTJCbEIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2dyaWQvZ3JpZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBIb3N0QmluZGluZ1xufSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcbmltcG9ydCB7U3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IHtkZWxlZ2F0ZWRIYW5kbGVyfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RvbVwiO1xuXG5jb25zdCBzdWJzY3JpYmVUb1Jlc2l6ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHJlc2l6ZVN0cmVhbTogU3ViamVjdDx2b2lkPjtcbiAgICBmdW5jdGlvbiBzdWJzY3JpYmVUb1Jlc2l6ZShjYWxsYmFjazogKCkgPT4gdm9pZCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIGlmICghcmVzaXplU3RyZWFtKSB7XG4gICAgICAgICAgICByZXNpemVTdHJlYW0gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc2l6ZVN0cmVhbS5uZXh0KG51bGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc2l6ZVN0cmVhbS5zdWJzY3JpYmUoY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBzdWJzY3JpYmVUb1Jlc2l6ZTtcbn0pKCk7XG5cbmNvbnN0IGdldFNjcm9sbGJhcldpZHRoID0gKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgc2Nyb2xsYmFyV2lkdGg6IG51bWJlcjtcbiAgICBmdW5jdGlvbiBnZXRTY3JvbGxiYXJXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2Nyb2xsYmFyV2lkdGggIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBzY3JvbGxiYXJXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRvYyA9IGVsZW1lbnQub3duZXJEb2N1bWVudDtcbiAgICAgICAgY29uc3QgdGVzdEVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB0ZXN0RWxlbWVudC5zdHlsZTtcblxuICAgICAgICBzdHlsZS53aWR0aCA9IFwiMTAwcHhcIjtcbiAgICAgICAgc3R5bGUuaGVpZ2h0ID0gXCIxMDBweFwiO1xuICAgICAgICBzdHlsZS5vdmVyZmxvdyA9IFwic2Nyb2xsXCI7XG4gICAgICAgIHN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICBzdHlsZS50b3AgPSBcIi05OTk5cHhcIjtcblxuICAgICAgICBkb2MuYm9keS5hcHBlbmRDaGlsZCh0ZXN0RWxlbWVudCk7XG5cbiAgICAgICAgY29uc3Qgc2l6ZSA9IHRlc3RFbGVtZW50Lm9mZnNldFdpZHRoIC0gdGVzdEVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICAgICAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQodGVzdEVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBzaXplO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0U2Nyb2xsYmFyV2lkdGg7XG59KSgpO1xuXG5pbnRlcmZhY2UgSVJvdyB7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBvYmplY3Q6IGFueTtcbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ29sdW1uIHtcbiAgICBmaWVsZDogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBiLWdyaWRcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcImdyaWQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiZ3JpZC5jc3NcIl0sXG4gICAgZGlyZWN0aXZlczogW0NPUkVfRElSRUNUSVZFU10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkIHtcbiAgICBASW5wdXQoKSBjb2x1bW5zOiBBcnJheTxJQ29sdW1uPjtcbiAgICBASW5wdXQoKSBmb290ZXJEYXRhOiBhbnk7XG5cbiAgICBzb3J0ZXIgPSBuZXcgU29ydGVyKCk7XG5cbiAgICBwcml2YXRlIGlkVG9Sb3c6IHsgW2tleTogbnVtYmVyXTogSVJvdyB9O1xuICAgIHByaXZhdGUgb2JqZWN0VG9Sb3cgPSBuZXcgV2Vha01hcDxhbnksIElSb3c+KCk7XG4gICAgcHJpdmF0ZSByb3dzOiBJUm93W107XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWREYXRhOiBhbnk7XG4gICAgcHJpdmF0ZSBfc2VsZWN0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3NvcnRhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGhlYWRlck5vZGU6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgYm9keU5vZGU6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgZm9vdGVyTm9kZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBoZWFkZXJTY3JvbGxOb2RlOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGZvb3RlclNjcm9sbE5vZGU6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgY29udGVudE5vZGU6IEhUTUxFbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBfZGVzdHJveWVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSByZXNpemVIYW5kbGU6IFN1YnNjcmlwdGlvbjtcbiAgICBAT3V0cHV0KFwic2VsZWN0ZWRDaGFuZ2VcIikgcHJpdmF0ZSBzZWxlY3RlZEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBfb25IZWFkZXJDbGljazogRnVuY3Rpb247XG4gICAgcHJpdmF0ZSBfb25Db250ZW50Q2xpY2s6IEZ1bmN0aW9uO1xuICAgIHByaXZhdGUgX29uQm9keVNjcm9sbDogRXZlbnRMaXN0ZW5lcjtcblxuICAgIHByaXZhdGUgX2JvcmRlcmVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfc3RyaXBlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfcm9vdE5vZGU6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLl9yb290Tm9kZSA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyTm9kZSA9IDxhbnk+IHRoaXMuX3Jvb3ROb2RlLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBcIi5wYi1ncmlkX19oZWFkZXI6bm90KC5wYi1ncmlkX19oZWFkZXItc2Nyb2xsKVwiXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYm9keU5vZGUgPSA8YW55PiB0aGlzLl9yb290Tm9kZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgXCIucGItZ3JpZF9fYm9keVwiXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZm9vdGVyTm9kZSA9IDxhbnk+IHRoaXMuX3Jvb3ROb2RlLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBcIi5wYi1ncmlkX19mb290ZXI6bm90KC5wYi1ncmlkX19mb290ZXItc2Nyb2xsKVwiXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaGVhZGVyU2Nyb2xsTm9kZSA9IDxhbnk+IHRoaXMuX3Jvb3ROb2RlLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBcIi5wYi1ncmlkX19oZWFkZXItc2Nyb2xsXCJcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb290ZXJTY3JvbGxOb2RlID0gPGFueT4gdGhpcy5fcm9vdE5vZGUucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIFwiLnBiLWdyaWRfX2Zvb3Rlci1zY3JvbGxcIlxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbnRlbnROb2RlID0gPGFueT4gdGhpcy5ib2R5Tm9kZS5maXJzdEVsZW1lbnRDaGlsZDtcblxuICAgICAgICAvLyBUaGlzIGV2ZW50IGlzIGhhbmRsZWQgaGVyZSBzbyBzY3JvbGwgZXZlbnRzIGRvbid0IGNhdXNlIGNoYW5nZVxuICAgICAgICAvLyBkZXRlY3Rpb24gdG8gZ28gY3JhenlcbiAgICAgICAgdGhpcy5fb25Cb2R5U2Nyb2xsID0gdGhpcy5vbkJvZHlTY3JvbGwuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5ib2R5Tm9kZS5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuX29uQm9keVNjcm9sbCk7XG5cbiAgICAgICAgdGhpcy5fb25IZWFkZXJDbGljayA9IGRlbGVnYXRlZEhhbmRsZXIoXG4gICAgICAgICAgICBcIi5wYi1ncmlkX19jb2x1bW5cIixcbiAgICAgICAgICAgIHRoaXMub25IZWFkZXJDbGlja1xuICAgICAgICApO1xuICAgICAgICB0aGlzLl9vbkNvbnRlbnRDbGljayA9IGRlbGVnYXRlZEhhbmRsZXIoXG4gICAgICAgICAgICBcIi5wYi1ncmlkX19yb3dcIixcbiAgICAgICAgICAgIHRoaXMub25Db250ZW50Q2xpY2tcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy50YWJsZS1ib3JkZXJlZFwiKVxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGJvcmRlcmVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fYm9yZGVyZWQgPSB2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgYm9yZGVyZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib3JkZXJlZDtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy50YWJsZS1zdHJpcGVkXCIpXG4gICAgQElucHV0KClcbiAgICBzZXQgc3RyaXBlZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3N0cmlwZWQgPSB2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgc3RyaXBlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmlwZWQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgc29ydGFibGUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9zb3J0YWJsZSA9IHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBzb3J0YWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvcnRhYmxlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGRhdGEodmFsdWU6IGFueVtdKSB7XG4gICAgICAgIHRoaXMuaWRUb1JvdyA9IHt9O1xuICAgICAgICB0aGlzLnJvd3MgPSBbXTtcblxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgaSA9IDA7XG5cbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5yb3dzID0gW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJvd3MgPSB2YWx1ZS5tYXAob2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IG5vdyArIGkrKztcbiAgICAgICAgICAgICAgICBjb25zdCByb3c6IElSb3cgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBvYmplY3QsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RUb1Jvdy5zZXQob2JqZWN0LCByb3cpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlkVG9Sb3dbaWRdID0gcm93O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy50YWJsZS1ob3ZlclwiKVxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHNlbGVjdGFibGUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RhYmxlID0gdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0YWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGFibGU7XG4gICAgfVxuXG4gICAgQElucHV0KFwic2VsZWN0ZWRcIilcbiAgICBzZXQgc2VsZWN0ZWREYXRhKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkRGF0YSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZERhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFJvdyA9IHRoaXMub2JqZWN0VG9Sb3cuZ2V0KHRoaXMuc2VsZWN0ZWREYXRhKTtcbiAgICAgICAgICAgIG9sZFJvdy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLm9iamVjdFRvUm93LmdldCh2YWx1ZSkuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0ZWREYXRhID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRFdmVudC5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWREYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWREYXRhO1xuICAgIH1cblxuICAgIHNvcnQoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zb3J0ZXIuc29ydChrZXksIHRoaXMucm93cyk7XG4gICAgfVxuXG4gICAgcmVzaXplKCkge1xuICAgICAgICBjb25zdCBzY3JvbGxXaWR0aCA9IGdldFNjcm9sbGJhcldpZHRoKHRoaXMuaGVhZGVyTm9kZSkgfHwgMDtcbiAgICAgICAgdGhpcy5oZWFkZXJOb2RlLnN0eWxlLndpZHRoID0gYGNhbGMoMTAwJSAtICR7c2Nyb2xsV2lkdGh9cHhgO1xuICAgICAgICB0aGlzLmhlYWRlclNjcm9sbE5vZGUuc3R5bGUud2lkdGggPSBgJHtzY3JvbGxXaWR0aH1weGA7XG5cbiAgICAgICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gdGhpcy5oZWFkZXJOb2RlLm9mZnNldEhlaWdodDtcbiAgICAgICAgY29uc3QgZm9vdGVySGVpZ2h0ID0gdGhpcy5mb290ZXJOb2RlLm9mZnNldEhlaWdodCB8fCAwO1xuXG4gICAgICAgIHRoaXMuYm9keU5vZGUuc3R5bGUuaGVpZ2h0ID1cbiAgICAgICAgICAgIGBjYWxjKDEwMCUgLSAke2hlYWRlckhlaWdodCArIGZvb3RlckhlaWdodH1weClgO1xuICAgICAgICB0aGlzLmhlYWRlclNjcm9sbE5vZGUuc3R5bGUuaGVpZ2h0ID0gYCR7aGVhZGVySGVpZ2h0fXB4YDtcbiAgICAgICAgdGhpcy5mb290ZXJTY3JvbGxOb2RlLnN0eWxlLmhlaWdodCA9IGAke2Zvb3RlckhlaWdodH1weGA7XG5cbiAgICAgICAgY29uc3QgY29udGVudE5vZGUgPSB0aGlzLmNvbnRlbnROb2RlO1xuICAgICAgICBjb25zdCBoZWFkZXJUYWJsZU5vZGU6IEhUTUxFbGVtZW50ID1cbiAgICAgICAgICAgIDxhbnk+IHRoaXMuaGVhZGVyTm9kZS5maXJzdEVsZW1lbnRDaGlsZDtcblxuICAgICAgICBjb250ZW50Tm9kZS5zdHlsZS53aWR0aCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGhlYWRlcldpZHRoID0gaGVhZGVyVGFibGVOb2RlLm9mZnNldFdpZHRoO1xuICAgICAgICBpZiAoaGVhZGVyV2lkdGggPiBjb250ZW50Tm9kZS5vZmZzZXRXaWR0aCkge1xuICAgICAgICAgICAgY29udGVudE5vZGUuc3R5bGUud2lkdGggPSBgJHtoZWFkZXJXaWR0aH1weGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2hhbmdlKGNoYW5nZXM6IHt9KSB7XG4gICAgICAgIC8vIFRPRE8oYmZvcmJlcykoMjAxNS0xMC0xNCk6IFRoaXMgc2hvdWxkIGJlIGNoYW5nZWQgdG8gY2FsbFxuICAgICAgICAvLyByZXN6aWUgaW4gYWZ0ZXJWaWV3Q2hlY2tlZCBvbmNlIHdlIHN3aXRjaCB0byBzb21ldGhpbmdcbiAgICAgICAgLy8gYWZ0ZXIgYWxwaGEgMzdcbiAgICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoXCJmb290ZXJEYXRhXCIpIHx8XG4gICAgICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KFwiY29sdW1uc1wiKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vIFRPRE8oYmZvcmJlcykoMjAxNS0xMC0xNCk6IFRoaXMgc2hvdWxkIGJlIGNoYW5nZWQgdG8gY2FsbFxuICAgICAgICAvLyByZXN6aWUgaW4gYWZ0ZXJDb250ZW50SW5pdCBvbmNlIHdlIHN3aXRjaCB0byBzb21ldGhpbmdcbiAgICAgICAgLy8gYWZ0ZXIgYWxwaGEgMzdcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBJbiBzb21lIHNjZW5hcmlvcywgdGhpcyBoYW5kbGVyIHdpbGwgYmUgcmVnaXN0ZXJlZCBiZWZvcmVcbiAgICAgICAgICAgIC8vIGJ1dCBmaXJlIGFmdGVyIG9uRGVzdHJveSgpIGlzIGNhbGxlZC4gVGhpcyBmbGFnIHByZXZlbnRzXG4gICAgICAgICAgICAvLyB0aGlzIGhhbmRsZXIgZnJvbSBydW5uaW5nIGluIHRoYXQgY2FzZS5cbiAgICAgICAgICAgIGlmICh0aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUhhbmRsZSA9IHN1YnNjcmliZVRvUmVzaXplKHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgLy8gSW4gc29tZSBzY2VuYXJpb3MsIHRoaXMgc2V0VGltZW91dCgpIGhhbmRsZXIgaW4gb25Jbml0KCkgd2lsbCBiZVxuICAgICAgICAvLyByZWdpc3RlcmVkIGJlZm9yZSBidXQgZmlyZSBhZnRlciBvbkRlc3Ryb3koKSBpcyBjYWxsZWQuXG4gICAgICAgIC8vIFRoaXMgZmxhZyBwcmV2ZW50cyB0aGUgaGFuZGxlciBmcm9tIHJ1bm5pbmcgaW4gdGhhdCBjYXNlLlxuICAgICAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnJvd3MgPSB0aGlzLmlkVG9Sb3cgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZUhhbmRsZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNpemVIYW5kbGUudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJvZHlOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5fb25Cb2R5U2Nyb2xsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZvcm1hdChyb3c6IGFueSwgY29sdW1uOiBJQ29sdW1uKSB7XG4gICAgICAgIHJldHVybiByb3dbY29sdW1uLmZpZWxkXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQm9keVNjcm9sbChldmVudDogVUlFdmVudCkge1xuICAgICAgICB0aGlzLmhlYWRlck5vZGUuc2Nyb2xsTGVmdCA9IHRoaXMuZm9vdGVyTm9kZS5zY3JvbGxMZWZ0ID1cbiAgICAgICAgICAgICg8YW55PiBldmVudCkuc2Nyb2xsTGVmdCB8fCB0aGlzLmJvZHlOb2RlLnNjcm9sbExlZnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkhlYWRlckNsaWNrKGNvbHVtbkVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuc29ydGFibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpZWxkID0gY29sdW1uRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbHVtbi1maWVsZFwiKTtcbiAgICAgICAgdGhpcy5zb3J0ZXIuc29ydChmaWVsZCwgdGhpcy5yb3dzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29udGVudENsaWNrKHJvd0VsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaWQgPSBwYXJzZUludChyb3dFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtb2JqZWN0LWlkXCIpLCAxMCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRhID0gdGhpcy5pZFRvUm93W2lkXS5vYmplY3Q7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU29ydGVyIHtcbiAgICBkaXJlY3Rpb246IG51bWJlcjtcbiAgICBrZXk6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IDE7XG4gICAgfVxuXG4gICAgc29ydChrZXk6IHN0cmluZywgZGF0YTogeyBvYmplY3Q6IGFueSB9W10pIHtcbiAgICAgICAgaWYgKHRoaXMua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gLXRoaXMuZGlyZWN0aW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG5cbiAgICAgICAgZGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBpZiAoYS5vYmplY3Rba2V5XSA9PT0gYi5vYmplY3Rba2V5XSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhLm9iamVjdFtrZXldID4gYi5vYmplY3Rba2V5XSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC10aGlzLmRpcmVjdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9