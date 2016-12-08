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
var filterbar_1 = require("../filterbar/filterbar");
var column_helper_1 = require("./column-helper");
var catalog_storage_service_1 = require("./catalog-storage-service");
var local_storage_service_1 = require("../../services/local-storage-service");
function matches(element, selector) {
    while (!element.matches(selector)) {
        if (!element.parentNode || !element.parentNode.matches) {
            return null;
        }
        element = element.parentNode;
    }
    return element;
}
var Catalog = (function () {
    function Catalog(elementRef, storage) {
        this.linkCellClick = new core_1.EventEmitter();
        this.rowSelect = new core_1.EventEmitter();
        this.valuesToExclude = [];
        this._columnSelectorShowing = false;
        this.isSearchFilterInitialized = false;
        this.rootNode = elementRef.nativeElement;
        this.storage = storage;
    }
    Object.defineProperty(Catalog.prototype, "hasControls", {
        get: function () {
            return Boolean(this.pbArgs && (this.pbArgs.filterBarArgs || (this.pbArgs && (this.pbArgs.show.searchBox ||
                this.pbArgs.show.customizeButton))));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Catalog.prototype, "title", {
        get: function () {
            return Boolean(this.pbArgs && this.pbArgs.title);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Catalog.prototype, "columnSelectorShowing", {
        get: function () {
            return this._columnSelectorShowing;
        },
        set: function (value) {
            value = Boolean(value);
            var panelNode = this.gridContainerNode
                .querySelector(":scope .ag-tool-panel-container");
            if (panelNode) {
                if (value) {
                    panelNode.style.left =
                        "calc(100% - " + panelNode.offsetWidth + "px)";
                }
                else {
                    panelNode.style.left = "";
                }
            }
            this._columnSelectorShowing = value;
        },
        enumerable: true,
        configurable: true
    });
    Catalog.hasSelectedRows = function (catalogArgs) {
        return (catalogArgs.agGridOptions.selectedRows &&
            catalogArgs.agGridOptions.selectedRows.length > 0);
    };
    Catalog.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.setStorageKeys(this.pbArgs.storageId);
        this.gridOptions = this.pbArgs.agGridOptions;
        this.gridOptions.columnVisibilityChanged = function () {
            _this.storage.saveColumnState(_this.gridOptions.api.getColumnState());
            _this.gridOptions.api.sizeColumnsToFit();
        };
        this.gridOptions.columnOrderChanged = function () {
            _this.gridOptions.api.sizeColumnsToFit();
        };
        this.gridOptions.columnResized = function () {
            _this.gridOptions.api.sizeColumnsToFit();
        };
        this.gridOptions.rowSelected = function (item) {
            _this.onRowSelected(item);
        };
        this._columnSelectorShowing = Boolean(this.gridOptions.showToolPanel);
        this.gridOptions.showToolPanel = true;
        this.pbArgs.show.spinner = false;
        this.pbArgs.show.error = false;
        if (this.pbArgs.registerCatalogInstance) {
            this.pbArgs.registerCatalogInstance(this);
        }
        if (!this.gridOptions.icons) {
            this.gridOptions.icons = {
                groupExpanded: "\n                    <span class='glyphicon glyphicon-chevron-up'></span>\n                ",
                groupContracted: "\n                    <span class='glyphicon glyphicon-chevron-down'></span>\n                ",
                columnHidden: "\n                    <span class=\"fa fa-circle-o\"></span>\n                ",
                columnVisible: "\n                    <span class=\"fa fa-check-circle-o\"></span>\n                "
            };
        }
    };
    Catalog.prototype.ngAfterViewInit = function () {
        this.gridContainerNode = this.gridElementRef.nativeElement;
        window["angularGrid"](this.gridContainerNode, this.gridOptions);
        this.columnSelectorShowing = this.columnSelectorShowing;
    };
    Catalog.prototype.ngOnDestroy = function () {
        this.gridOptions.api.grid.setFinished();
        this.gridContainerNode.innerHTML = "";
    };
    Catalog.prototype.setFilterText = function (filterText, event) {
        this.gridOptions.api.setQuickFilter(filterText.value);
        this.storage.saveSearchFilter(filterText.value);
    };
    Catalog.prototype.customizeTable = function () {
        this.columnSelectorShowing = !this.columnSelectorShowing;
    };
    Catalog.prototype.setSchemaProperties = function (properties, defaultColumns, additionalColumns) {
        this.defineColumnsInJsonSettings(properties);
        this.loadAndDefineColumns(properties, defaultColumns, additionalColumns);
        if (this.storage.isMultipleFilterStored()) {
            this.initializeMultipleFilter();
        }
        if (this.storage.isSearchFilterStored()) {
            this.initializeSearchFilter();
        }
    };
    Catalog.prototype.setColumnDefs = function (columnDefs) {
        if (this.gridOptions.enableRowHeaderSelection) {
            column_helper_1.columnHelper.addCheckboxColumn(columnDefs);
        }
        this.gridOptions.columnDefs = columnDefs;
    };
    Catalog.prototype.getContentItems = function () {
        return this.allItems;
    };
    Catalog.prototype.setContentItems = function (contentItems, filterFunction, initialSort) {
        var _this = this;
        if (this.pbArgs && this.pbArgs.filterBarArgs && this.pbArgs.filterBarArgs.items)
            this.setValuesToExcludeFromFilters(this.pbArgs.filterBarArgs.items);
        if (Array.isArray(contentItems)) {
            this.allItems = this.extractJsonSettingsValues(contentItems);
            this.displayItems();
        }
        else {
            this.displaySpinner();
            contentItems.then(function (result) {
                _this.allItems = _this.extractJsonSettingsValues(result);
                if (filterFunction) {
                    _this.allItems = _this.allItems.filter(filterFunction);
                }
                if (initialSort && _this.allItems.sort) {
                    _this.allItems.sort(initialSort);
                }
                for (var _i = 0, _a = _this.allItems; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.hasOwnProperty("name") &&
                        item.hasOwnProperty("id")) {
                        var itemWithNameAndId = item;
                        itemWithNameAndId.nameAndId = {
                            name: itemWithNameAndId.name,
                            id: itemWithNameAndId.id,
                            toString: function () {
                                return this.name;
                            }
                        };
                    }
                }
                _this.displayItems();
            });
            contentItems.catch(function (error) {
                _this.displayFetchFailureError(error);
            });
        }
    };
    Catalog.prototype.loadAndDefineColumns = function (properties, defaultColumns, additionalColumns) {
        if (defaultColumns === void 0) { defaultColumns = []; }
        if (additionalColumns === void 0) { additionalColumns = []; }
        var storedColumnState = this.storage.loadColumnState();
        if (storedColumnState) {
            var columns = this.getColumnVisibilityFromState(storedColumnState);
            var allStored_1 = columns.visible.concat(columns.hidden);
            var allDefined_1 = defaultColumns.concat(additionalColumns);
            if (!allStored_1.filter(function (name) { return allDefined_1.indexOf(name) < 0; }).length &&
                !allDefined_1.filter(function (name) { return allStored_1.indexOf(name) < 0; }).length) {
                defaultColumns = columns.visible;
                additionalColumns = columns.hidden;
            }
            else {
                this.storage.saveColumnState(null);
            }
        }
        var columnDefs = column_helper_1.columnHelper.makeColumnDefsForProperties(properties, defaultColumns, additionalColumns);
        this.setColumnDefs(columnDefs);
    };
    Catalog.prototype.initializeSearchFilter = function () {
        var searchTerm = this.storage.loadSearchFilter();
        this.searchBox.nativeElement.value = searchTerm;
        this.isSearchFilterInitialized = true;
    };
    Catalog.prototype.initializeMultipleFilter = function () {
        var storedFilterState = this.storage.loadMultipleFilter();
        this.pbArgs.filterBarArgs.property = storedFilterState.property;
        this.valuesToExclude = storedFilterState.excludeList;
        this.updateFilterBarItems();
    };
    Catalog.prototype.defineColumnsInJsonSettings = function (properties) {
        var keys = Object.keys(properties);
        var columnsInJsonSettings = [];
        keys.forEach(function (key) {
            if (properties[key].jsonSettings) {
                columnsInJsonSettings.push(key);
            }
        });
        this.columnsInJsonSettings = columnsInJsonSettings;
    };
    Catalog.prototype.extractJsonSettingsValues = function (items) {
        var _this = this;
        items.forEach(function (item) {
            if (item.jsonSettings) {
                var jsonSettings_1 = item.__jsonSettings__ = JSON.parse(item.jsonSettings);
                _this.columnsInJsonSettings.forEach(function (key) {
                    item[key] = jsonSettings_1[key];
                });
            }
        });
        return items;
    };
    Catalog.prototype.updateFilterBarItems = function () {
        var _this = this;
        this.pbArgs.filterBarArgs.items.forEach(function (item) {
            if (_this.valuesToExclude.indexOf(item.field) >= 0) {
                item.checked = false;
            }
        }, this);
    };
    Catalog.prototype.getColumnVisibilityFromState = function (columnState) {
        var visible = [];
        var hidden = [];
        columnState.forEach(function (column) {
            var colId = (column.colId === "nameAndId") ? "name" : column.colId;
            if (colId !== "generated-checkbox-column-field") {
                if (column.hide) {
                    hidden.push(colId);
                }
                else {
                    visible.push(colId);
                }
            }
        });
        return { visible: visible, hidden: hidden };
    };
    Catalog.prototype.applyFilterbarFilters = function (items) {
        var filteredItems = [];
        if (this.valuesToExclude.length === 0) {
            return items;
        }
        else {
            var propertyName = this.pbArgs.filterBarArgs.property;
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                var value = item[propertyName].toUpperCase();
                if (this.valuesToExclude.indexOf(value) === -1) {
                    filteredItems.push(item);
                }
            }
        }
        return filteredItems;
    };
    Catalog.prototype.displayItems = function () {
        var columnDefs = this.gridOptions.columnDefs;
        column_helper_1.columnHelper.setColumnWidthsBasedOnData(columnDefs, this.allItems);
        var filteredItems = this.applyFilterbarFilters(this.allItems);
        this.displayRows(filteredItems);
        if (this.isSearchFilterInitialized) {
            var searchTerm = this.storage.loadSearchFilter();
            this.gridOptions.api.setQuickFilter(searchTerm);
        }
    };
    Catalog.prototype.displayRows = function (records) {
        var _this = this;
        this.pbArgs.show.spinner = false;
        this.pbArgs.show.error = false;
        if (this.gridOptions.api) {
            this.gridOptions.api.onNewCols();
            this.gridOptions.api.setRows(records);
            this.gridOptions.api.sizeColumnsToFit();
        }
        else {
            setTimeout(function () {
                _this.displayRows(records);
            });
        }
    };
    Catalog.prototype.displaySpinner = function () {
        this.pbArgs.show.spinner = true;
        this.pbArgs.show.error = false;
    };
    Catalog.prototype.displayFetchFailureError = function (error) {
        this.errorMessage = error.message;
        this.pbArgs.show.spinner = false;
        this.pbArgs.show.error = true;
    };
    Catalog.prototype.onFilterBarChange = function (items) {
        this.setValuesToExcludeFromFilters(items);
        this.storage.saveMultipleFilter(this.pbArgs.filterBarArgs.property, this.valuesToExclude);
        this.displayItems();
    };
    Catalog.prototype.setValuesToExcludeFromFilters = function (items) {
        var valuesToExclude = [];
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var item = items_2[_i];
            if (!item.checked) {
                valuesToExclude.push(item.field);
            }
        }
        this.valuesToExclude = valuesToExclude;
    };
    Catalog.prototype.onGridClick = function (event) {
        var eventTarget = event.target;
        if (eventTarget.nodeType !== 1) {
            eventTarget = eventTarget.parentNode;
        }
        this.rootNode.setAttribute("id", "__catalog_root__");
        var matchedEventTarget;
        try {
            matchedEventTarget = matches(eventTarget, "[id=\"__catalog_root__\"] a.link-cell-link[data-itemid]");
        }
        catch (error) {
        }
        finally {
            this.rootNode.removeAttribute("id");
        }
        if (!matchedEventTarget) {
            return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
        this.linkCellClick.next({
            event: event,
            target: matchedEventTarget,
            itemId: eventTarget.getAttribute("data-itemid")
        });
    };
    Catalog.prototype.onRowSelected = function (item) {
        this.rowSelect.next(item);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Catalog.prototype, "pbArgs", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Catalog.prototype, "linkCellClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Catalog.prototype, "rowSelect", void 0);
    __decorate([
        core_1.ViewChild("grid"), 
        __metadata('design:type', core_1.ElementRef)
    ], Catalog.prototype, "gridElementRef", void 0);
    __decorate([
        core_1.ViewChild("inputFilterText"), 
        __metadata('design:type', core_1.ElementRef)
    ], Catalog.prototype, "searchBox", void 0);
    __decorate([
        core_1.HostBinding("class.with-controls"), 
        __metadata('design:type', Object)
    ], Catalog.prototype, "hasControls", null);
    __decorate([
        core_1.HostBinding("class.with-title"), 
        __metadata('design:type', Object)
    ], Catalog.prototype, "title", null);
    Catalog = __decorate([
        core_1.Component({
            selector: "pb-catalog",
            moduleId: module.id,
            templateUrl: "catalog.html",
            styleUrls: ["catalog.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [filterbar_1.Filterbar],
            providers: [catalog_storage_service_1.CatalogStorageService, local_storage_service_1.LocalStorageService]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, catalog_storage_service_1.CatalogStorageService])
    ], Catalog);
    return Catalog;
}());
exports.Catalog = Catalog;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2F0YWxvZy9jYXRhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFLQSxxQkFHTyxlQUFlLENBQUMsQ0FBQTtBQUd2QiwwQkFBK0Msd0JBQXdCLENBQUMsQ0FBQTtBQUN4RSw4QkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQU03Qyx3Q0FBb0MsMkJBQTJCLENBQUMsQ0FBQTtBQUNoRSxzQ0FBa0Msc0NBQXNDLENBQUMsQ0FBQTtBQUV6RSxpQkFBaUIsT0FBb0IsRUFBRSxRQUFnQjtJQUtuRCxPQUFPLENBQVEsT0FBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFRLE9BQU8sQ0FBQyxVQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxPQUFPLEdBQWlCLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDL0MsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQXNDRDtJQXlCSSxpQkFBWSxVQUFzQixFQUFFLE9BQThCO1FBdkJqRCxrQkFBYSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ25DLGNBQVMsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUl4QyxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUlyQiwyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFLL0IsOEJBQXlCLEdBQVksS0FBSyxDQUFDO1FBVS9DLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBR0Qsc0JBQVksZ0NBQVc7YUFBdkI7WUFDSSxNQUFNLENBQUMsT0FBTyxDQUNWLElBQUksQ0FBQyxNQUFNLElBQUksQ0FDWCxJQUFJLENB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b3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge1xuICAgIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIEF0dHJpYnV0ZSwgRXZlbnRFbWl0dGVyLFxuICAgIEVsZW1lbnRSZWYsIElucHV0LCBPdXRwdXQsIEhvc3RCaW5kaW5nLCBWaWV3Q2hpbGRcbn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tIFwiYW5ndWxhcjIvY29tbW9uXCI7XG5cbmltcG9ydCB7RmlsdGVyYmFyLCBJSXRlbSwgSUZpbHRlcmJhckFyZ3N9IGZyb20gXCIuLi9maWx0ZXJiYXIvZmlsdGVyYmFyXCI7XG5pbXBvcnQge2NvbHVtbkhlbHBlcn0gZnJvbSBcIi4vY29sdW1uLWhlbHBlclwiO1xuXG5pbXBvcnQge0lTY2hlbWFQcm9wZXJ0eX0gZnJvbSBcIi4vaS1zY2hlbWEtcHJvcGVydHlcIjtcbmltcG9ydCB7SUNvbHVtbkRlZn0gZnJvbSBcIi4vaS1jb2x1bW4tZGVmXCI7XG5pbXBvcnQge0lHcmlkT3B0aW9uc30gZnJvbSBcIi4vaS1ncmlkLW9wdGlvbnNcIjtcblxuaW1wb3J0IHtDYXRhbG9nU3RvcmFnZVNlcnZpY2V9IGZyb20gXCIuL2NhdGFsb2ctc3RvcmFnZS1zZXJ2aWNlXCI7XG5pbXBvcnQge0xvY2FsU3RvcmFnZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9sb2NhbC1zdG9yYWdlLXNlcnZpY2VcIjtcblxuZnVuY3Rpb24gbWF0Y2hlcyhlbGVtZW50OiBIVE1MRWxlbWVudCwgc2VsZWN0b3I6IHN0cmluZykge1xuICAgIC8vIFNlYXJjaCBpbiBwYXJlbnRzIG9mIHRoZSBnaXZlbiBlbGVtZW50IGFzIHdlbGwsXG4gICAgLy8gc2luY2UgdGhlIGV2ZW50IGNvdWxkIGhhdmUgYnViYmxlZCBpbnRvIGFuIGVsZW1lbnQgbWF0Y2hpbmcgdGhlIHNlbGVjdG9yXG5cbiAgICAvLyBUUzcwMTdcbiAgICB3aGlsZSAoISg8YW55PiBlbGVtZW50KS5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICBpZiAoIWVsZW1lbnQucGFyZW50Tm9kZSB8fCAhKDxhbnk+IGVsZW1lbnQucGFyZW50Tm9kZSkubWF0Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudCA9IDxIVE1MRWxlbWVudD4gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xufVxuXG5pbnRlcmZhY2UgSUNvbHVtblZpc2liaWxpdHkge1xuICAgIHZpc2libGU6IHN0cmluZ1tdO1xuICAgIGhpZGRlbjogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxpbmtDZWxsQ2xpY2tFdmVudCB7XG4gICAgZXZlbnQ6IE1vdXNlRXZlbnQ7XG4gICAgdGFyZ2V0OiBIVE1MRWxlbWVudDtcbiAgICBpdGVtSWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU2hvdyB7XG4gICAgc2VhcmNoQm94PzogYm9vbGVhbjtcbiAgICBjdXN0b21pemVCdXR0b24/OiBib29sZWFuO1xuICAgIHNwaW5uZXI/OiBib29sZWFuO1xuICAgIGVycm9yPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGJBcmdzIHtcbiAgICBmaWx0ZXJCYXJBcmdzPzogSUZpbHRlcmJhckFyZ3M7XG4gICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgc2hvdzogSVNob3c7XG4gICAgYWdHcmlkT3B0aW9uczogSUdyaWRPcHRpb25zO1xuICAgIHN0b3JhZ2VJZD86IHN0cmluZztcbiAgICByZWdpc3RlckNhdGFsb2dJbnN0YW5jZT86IEZ1bmN0aW9uO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwYi1jYXRhbG9nXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCJjYXRhbG9nLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcImNhdGFsb2cuY3NzXCJdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgZGlyZWN0aXZlczogW0ZpbHRlcmJhcl0sXG4gICAgcHJvdmlkZXJzOiBbQ2F0YWxvZ1N0b3JhZ2VTZXJ2aWNlLCBMb2NhbFN0b3JhZ2VTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBDYXRhbG9nIHtcbiAgICBASW5wdXQoKSBwdWJsaWMgcGJBcmdzOiBJUGJBcmdzO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgbGlua0NlbGxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIHJvd1NlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHByaXZhdGUgZ3JpZE9wdGlvbnM6IElHcmlkT3B0aW9ucztcbiAgICBwcml2YXRlIGFsbEl0ZW1zOiB7fVtdO1xuICAgIHByaXZhdGUgdmFsdWVzVG9FeGNsdWRlID0gW107XG4gICAgcHJpdmF0ZSBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgICBwcml2YXRlIHJvb3ROb2RlOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGdyaWRDb250YWluZXJOb2RlOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIF9jb2x1bW5TZWxlY3RvclNob3dpbmcgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgY29sdW1uU3RvcmFnZUtleTogc3RyaW5nO1xuICAgIHByaXZhdGUgc2VhcmNoRmlsdGVyU3RvcmFnZUtleTogc3RyaW5nO1xuICAgIHByaXZhdGUgbXVsdGlwbGVGaWx0ZXJTdG9yYWdlS2V5OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBpc1NlYXJjaEZpbHRlckluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHN0b3JhZ2U6IENhdGFsb2dTdG9yYWdlU2VydmljZTtcblxuICAgIHByaXZhdGUgY29sdW1uc0luSnNvblNldHRpbmdzOiBzdHJpbmdbXTtcblxuICAgIEBWaWV3Q2hpbGQoXCJncmlkXCIpIHByaXZhdGUgZ3JpZEVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcImlucHV0RmlsdGVyVGV4dFwiKSBwcml2YXRlIHNlYXJjaEJveDogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHN0b3JhZ2U6IENhdGFsb2dTdG9yYWdlU2VydmljZSkge1xuICAgICAgICB0aGlzLnJvb3ROb2RlID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLndpdGgtY29udHJvbHNcIilcbiAgICBwcml2YXRlIGdldCBoYXNDb250cm9scygpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oXG4gICAgICAgICAgICB0aGlzLnBiQXJncyAmJiAoXG4gICAgICAgICAgICAgICAgdGhpcy5wYkFyZ3MuZmlsdGVyQmFyQXJncyB8fCAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGJBcmdzICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGJBcmdzLnNob3cuc2VhcmNoQm94IHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBiQXJncy5zaG93LmN1c3RvbWl6ZUJ1dHRvblxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLndpdGgtdGl0bGVcIilcbiAgICBwcml2YXRlIGdldCB0aXRsZSgpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5wYkFyZ3MgJiYgdGhpcy5wYkFyZ3MudGl0bGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IGNvbHVtblNlbGVjdG9yU2hvd2luZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtblNlbGVjdG9yU2hvd2luZztcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldCBjb2x1bW5TZWxlY3RvclNob3dpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdmFsdWUgPSBCb29sZWFuKHZhbHVlKTtcblxuICAgICAgICBjb25zdCBwYW5lbE5vZGU6IEhUTUxFbGVtZW50ID0gPGFueT4gdGhpcy5ncmlkQ29udGFpbmVyTm9kZVxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCI6c2NvcGUgLmFnLXRvb2wtcGFuZWwtY29udGFpbmVyXCIpO1xuXG4gICAgICAgIGlmIChwYW5lbE5vZGUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHBhbmVsTm9kZS5zdHlsZS5sZWZ0ID1cbiAgICAgICAgICAgICAgICAgICAgYGNhbGMoMTAwJSAtICR7cGFuZWxOb2RlLm9mZnNldFdpZHRofXB4KWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhbmVsTm9kZS5zdHlsZS5sZWZ0ID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvbHVtblNlbGVjdG9yU2hvd2luZyA9IHZhbHVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBoYXNTZWxlY3RlZFJvd3MoY2F0YWxvZ0FyZ3MpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChjYXRhbG9nQXJncy5hZ0dyaWRPcHRpb25zLnNlbGVjdGVkUm93cyAmJlxuICAgICAgICBjYXRhbG9nQXJncy5hZ0dyaWRPcHRpb25zLnNlbGVjdGVkUm93cy5sZW5ndGggPiAwKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnNldFN0b3JhZ2VLZXlzKHRoaXMucGJBcmdzLnN0b3JhZ2VJZCk7XG5cbiAgICAgICAgdGhpcy5ncmlkT3B0aW9ucyA9IHRoaXMucGJBcmdzLmFnR3JpZE9wdGlvbnM7XG5cbiAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5jb2x1bW5WaXNpYmlsaXR5Q2hhbmdlZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zYXZlQ29sdW1uU3RhdGUodGhpcy5ncmlkT3B0aW9ucy5hcGkuZ2V0Q29sdW1uU3RhdGUoKSk7XG4gICAgICAgICAgICB0aGlzLmdyaWRPcHRpb25zLmFwaS5zaXplQ29sdW1uc1RvRml0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5jb2x1bW5PcmRlckNoYW5nZWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdyaWRPcHRpb25zLmFwaS5zaXplQ29sdW1uc1RvRml0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5jb2x1bW5SZXNpemVkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5hcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMucm93U2VsZWN0ZWQgPSAoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uUm93U2VsZWN0ZWQoaXRlbSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU3RvcmUgdGhlIG9wdGlvbiBmcm9tIHRoZSB1c2VyIGluIHRoZSBwcml2YXRlIHZhciB0byBpbml0aWFsaXplXG4gICAgICAgIC8vIHRoZSBjYXRhbG9nJ3Mgc3RhdGUgYmFzZWQgb24gdGhhdCB2YWx1ZVxuICAgICAgICB0aGlzLl9jb2x1bW5TZWxlY3RvclNob3dpbmcgPSBCb29sZWFuKHRoaXMuZ3JpZE9wdGlvbnMuc2hvd1Rvb2xQYW5lbCk7XG5cbiAgICAgICAgLy8gVGhlIHBhbmVsIG5lZWRzIHRvIGFsd2F5cyBvcGVuIHRvIHNsaWRlIGl0IGluIHVzaW5nIENTU1xuICAgICAgICB0aGlzLmdyaWRPcHRpb25zLnNob3dUb29sUGFuZWwgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMucGJBcmdzLnNob3cuc3Bpbm5lciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBiQXJncy5zaG93LmVycm9yID0gZmFsc2U7XG5cbiAgICAgICAgLy8gVE9ETyhiZm9yYmVzKSgyMDE1LTA5LTI0KTogVGhpcyBpcyBvbmx5IGJlaW5nIHVzZWQgaW5cbiAgICAgICAgLy8gbWFrZS1hbmFseXNpcy50cyBhbmQgc2hvdWxkIHByb2JhYmx5IGJlIGNoYW5nZWQgdG8gdXNlIEBWaWV3UXVlcnlcbiAgICAgICAgaWYgKHRoaXMucGJBcmdzLnJlZ2lzdGVyQ2F0YWxvZ0luc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLnBiQXJncy5yZWdpc3RlckNhdGFsb2dJbnN0YW5jZSh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5ncmlkT3B0aW9ucy5pY29ucykge1xuICAgICAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5pY29ucyA9IHtcbiAgICAgICAgICAgICAgICBncm91cEV4cGFuZGVkOiBgXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tdXAnPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICBgLFxuICAgICAgICAgICAgICAgIGdyb3VwQ29udHJhY3RlZDogYFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLWRvd24nPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICBgLFxuICAgICAgICAgICAgICAgIGNvbHVtbkhpZGRlbjogYFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWNpcmNsZS1vXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIGAsXG4gICAgICAgICAgICAgICAgY29sdW1uVmlzaWJsZTogYFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWNoZWNrLWNpcmNsZS1vXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuZ3JpZENvbnRhaW5lck5vZGUgPSB0aGlzLmdyaWRFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgLyogdHNsaW50OmRpc2FibGU6bm8tc3RyaW5nLWxpdGVyYWwgKi9cbiAgICAgICAgd2luZG93W1wiYW5ndWxhckdyaWRcIl0oXG4gICAgICAgIC8qIHRzbGludDplbmFibGU6bm8tc3RyaW5nLWxpdGVyYWwgKi9cbiAgICAgICAgICAgIHRoaXMuZ3JpZENvbnRhaW5lck5vZGUsXG4gICAgICAgICAgICB0aGlzLmdyaWRPcHRpb25zXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29sdW1uU2VsZWN0b3JTaG93aW5nID0gdGhpcy5jb2x1bW5TZWxlY3RvclNob3dpbmc7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIC8vIHdoZW4gdGhpcyBjYXRhbG9nIGlzIGRlc3Ryb3llZCwgcmVtb3ZlIHRoZVxuICAgICAgICAvLyB3aW5kb3cgcmVzaXplIGV2ZW50IGxpc3RlbmVyIG90aGVyd2lzZSBpdCB3aWxsXG4gICAgICAgIC8vIGZpcmUgZm9yIGV0ZXJuaXR5XG4gICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuYXBpLmdyaWQuc2V0RmluaXNoZWQoKTtcblxuICAgICAgICAvLyBUT0RPKGJmb3JiZXMpKDIwMTUtMTAtMDEpOiBUaGlzIGlzIHRvIHdvcmsgYXJvdW5kIGFuIGlzc3VlIHdoZXJlXG4gICAgICAgIC8vIGl0IHNlZW1zIGxpa2UgKGFuZCBtYXkgYmUgdGhlIGNhc2UpIHRoYXQgQW5ndWxhciAyIGlzIGtlZXBpbmcgYSBjb3B5XG4gICAgICAgIC8vIG9mIHRoZSBjdXJyZW50IERPTSBhbmQgcmV1c2luZyBpdCB3aGVuIHRoZSBzYW1lIGNvbXBvbmVudFxuICAgICAgICAvLyBpcyBjcmVhdGVkIGluIHRoZSBzYW1lIHZpZXcgbGF0ZXIgb24uIFRoaXMgcmVtb3ZlcyBhbnkgZ3JpZHNcbiAgICAgICAgLy8gY3JlYXRlZCBzbyBjcmVhdGluZyBhbm90aGVyIG9uZSBsYXRlciB3aWxsIHJlc3VsdCBpbiBpdCBiZWluZ1xuICAgICAgICAvLyB0aGUgb25seSBncmlkIGluIHRoZSBET00uXG4gICAgICAgIHRoaXMuZ3JpZENvbnRhaW5lck5vZGUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB9XG5cbiAgICAvLyBUT0RPKGJza2lubmVyKSgyMDE1LTA4LTI3KTogZmluZCBzb21lIHdheSB0byBkbyB0aGlzIHdpdGggemVybyBjb2RlXG4gICAgcHVibGljIHNldEZpbHRlclRleHQoZmlsdGVyVGV4dCwgZXZlbnQ/KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuYXBpLnNldFF1aWNrRmlsdGVyKGZpbHRlclRleHQudmFsdWUpO1xuICAgICAgICB0aGlzLnN0b3JhZ2Uuc2F2ZVNlYXJjaEZpbHRlcihmaWx0ZXJUZXh0LnZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3VzdG9taXplVGFibGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29sdW1uU2VsZWN0b3JTaG93aW5nID0gIXRoaXMuY29sdW1uU2VsZWN0b3JTaG93aW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTY2hlbWFQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IGFueSwgZGVmYXVsdENvbHVtbnM/OiBzdHJpbmdbXSwgYWRkaXRpb25hbENvbHVtbnM/OiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlZmluZUNvbHVtbnNJbkpzb25TZXR0aW5ncyhwcm9wZXJ0aWVzKTtcblxuICAgICAgICB0aGlzLmxvYWRBbmREZWZpbmVDb2x1bW5zKHByb3BlcnRpZXMsIGRlZmF1bHRDb2x1bW5zLCBhZGRpdGlvbmFsQ29sdW1ucyk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RvcmFnZS5pc011bHRpcGxlRmlsdGVyU3RvcmVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZU11bHRpcGxlRmlsdGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdG9yYWdlLmlzU2VhcmNoRmlsdGVyU3RvcmVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNlYXJjaEZpbHRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldENvbHVtbkRlZnMoY29sdW1uRGVmcyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5ncmlkT3B0aW9ucy5lbmFibGVSb3dIZWFkZXJTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGNvbHVtbkhlbHBlci5hZGRDaGVja2JveENvbHVtbihjb2x1bW5EZWZzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyaWRPcHRpb25zLmNvbHVtbkRlZnMgPSBjb2x1bW5EZWZzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDb250ZW50SXRlbXMoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGxJdGVtcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q29udGVudEl0ZW1zKGNvbnRlbnRJdGVtczoge31bXSB8IFByb21pc2U8e31bXT4sIGZpbHRlckZ1bmN0aW9uPywgaW5pdGlhbFNvcnQ/KTogdm9pZCB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSBmaWx0ZXJzIHNldHVwIGJlZm9yZSBkaXNwbGF5IG9mIHRoZSBjb250ZW50IGl0ZW1zXG4gICAgICAgIGlmICh0aGlzLnBiQXJncyAmJiB0aGlzLnBiQXJncy5maWx0ZXJCYXJBcmdzICYmIHRoaXMucGJBcmdzLmZpbHRlckJhckFyZ3MuaXRlbXMpXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlc1RvRXhjbHVkZUZyb21GaWx0ZXJzKHRoaXMucGJBcmdzLmZpbHRlckJhckFyZ3MuaXRlbXMpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbnRlbnRJdGVtcykpIHtcbiAgICAgICAgICAgIHRoaXMuYWxsSXRlbXMgPSB0aGlzLmV4dHJhY3RKc29uU2V0dGluZ3NWYWx1ZXMoY29udGVudEl0ZW1zKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUl0ZW1zKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlTcGlubmVyKCk7XG4gICAgICAgICAgICBjb250ZW50SXRlbXMudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsSXRlbXMgPSB0aGlzLmV4dHJhY3RKc29uU2V0dGluZ3NWYWx1ZXMocmVzdWx0KTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxJdGVtcyA9IHRoaXMuYWxsSXRlbXMuZmlsdGVyKGZpbHRlckZ1bmN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYWxTb3J0ICYmIHRoaXMuYWxsSXRlbXMuc29ydCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbEl0ZW1zLnNvcnQoaW5pdGlhbFNvcnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuYWxsSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoXCJuYW1lXCIpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhhc093blByb3BlcnR5KFwiaWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtV2l0aE5hbWVBbmRJZDogYW55ID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1XaXRoTmFtZUFuZElkLm5hbWVBbmRJZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpdGVtV2l0aE5hbWVBbmRJZC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpdGVtV2l0aE5hbWVBbmRJZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPKGJza2lubmVyKTogd2Ugc2hvdWxkIGhhdmUgYSBzaW5nbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzaGFyZWQgZnVuY3Rpb24sIHJhdGhlciB0aGFuIG9uZSBwZXIgcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5SXRlbXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udGVudEl0ZW1zLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlGZXRjaEZhaWx1cmVFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSBjb2x1bW5zIHZpc2liaWxpdHkgZnJvbSB0aGUgTG9jYWwgU3RvcmFnZSBpZiBhdmFpbGFibGUgYW5kIGNyZWF0ZXNcbiAgICAgKiB0aGUgY29sdW1ucyBkZWZpbml0aW9uIGZvciB0aGUgZGF0YVxuICAgICAqL1xuICAgIHByaXZhdGUgbG9hZEFuZERlZmluZUNvbHVtbnMocHJvcGVydGllczogYW55LCBkZWZhdWx0Q29sdW1uczogc3RyaW5nW10gPSBbXSwgYWRkaXRpb25hbENvbHVtbnM6IHN0cmluZ1tdID0gW10pOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkQ29sdW1uU3RhdGUgPSB0aGlzLnN0b3JhZ2UubG9hZENvbHVtblN0YXRlKCk7XG5cbiAgICAgICAgaWYgKHN0b3JlZENvbHVtblN0YXRlKSB7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5nZXRDb2x1bW5WaXNpYmlsaXR5RnJvbVN0YXRlKHN0b3JlZENvbHVtblN0YXRlKTtcbiAgICAgICAgICAgIGNvbnN0IGFsbFN0b3JlZCA9IGNvbHVtbnMudmlzaWJsZS5jb25jYXQoY29sdW1ucy5oaWRkZW4pO1xuICAgICAgICAgICAgY29uc3QgYWxsRGVmaW5lZCA9IGRlZmF1bHRDb2x1bW5zLmNvbmNhdChhZGRpdGlvbmFsQ29sdW1ucyk7XG5cbiAgICAgICAgICAgIGlmICghYWxsU3RvcmVkLmZpbHRlcihuYW1lID0+IGFsbERlZmluZWQuaW5kZXhPZihuYW1lKSA8IDApLmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgICFhbGxEZWZpbmVkLmZpbHRlcihuYW1lID0+IGFsbFN0b3JlZC5pbmRleE9mKG5hbWUpIDwgMCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdENvbHVtbnMgPSBjb2x1bW5zLnZpc2libGU7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbENvbHVtbnMgPSBjb2x1bW5zLmhpZGRlbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNhdmVDb2x1bW5TdGF0ZShudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb2x1bW5EZWZzID0gY29sdW1uSGVscGVyLm1ha2VDb2x1bW5EZWZzRm9yUHJvcGVydGllcyhcbiAgICAgICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgICAgICBkZWZhdWx0Q29sdW1ucyxcbiAgICAgICAgICAgIGFkZGl0aW9uYWxDb2x1bW5zXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2V0Q29sdW1uRGVmcyhjb2x1bW5EZWZzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRpYWxpemVTZWFyY2hGaWx0ZXIoKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSB0aGlzLnN0b3JhZ2UubG9hZFNlYXJjaEZpbHRlcigpO1xuICAgICAgICB0aGlzLnNlYXJjaEJveC5uYXRpdmVFbGVtZW50LnZhbHVlID0gc2VhcmNoVGVybTtcbiAgICAgICAgdGhpcy5pc1NlYXJjaEZpbHRlckluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyB0aGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgbXVsdGlwbGUgZmlsdGVyIGZyb20gdGhlIGxvY2FsIHN0b3JhZ2VcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRpYWxpemVNdWx0aXBsZUZpbHRlcigpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkRmlsdGVyU3RhdGUgPSB0aGlzLnN0b3JhZ2UubG9hZE11bHRpcGxlRmlsdGVyKCk7XG4gICAgICAgIHRoaXMucGJBcmdzLmZpbHRlckJhckFyZ3MucHJvcGVydHkgPSBzdG9yZWRGaWx0ZXJTdGF0ZS5wcm9wZXJ0eTtcbiAgICAgICAgdGhpcy52YWx1ZXNUb0V4Y2x1ZGUgPSBzdG9yZWRGaWx0ZXJTdGF0ZS5leGNsdWRlTGlzdDtcbiAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJCYXJJdGVtcygpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSB3aXRoIGFsbCB0aGUgY29sdW1ucyB3aG9zZSB2YWx1ZXMgbmVlZHMgdG8gYmUgZXh0cmFjdGVkIGZyb21cbiAgICAgKiB0aGUgYGpzb25TZXR0aW5nc2Agb2JqZWN0IHJldHVybmVkIGJ5IHRoZSBzZXJ2ZXIgYWxvbmcgdGhlIHJlc3Qgb2YgdGhlIGl0ZW1zIHRvIGJlXG4gICAgICogZGlzcGxheWVkIGluIHRoZSBDYXRhbG9nLlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2QgbmVlZHMgdG8gYmUgY2FsbGVkIG9ubHkgb25jZSBkdXJpbmcgdGhlIGNhdGFsb2cgY29uZmlnIHBoYXNlLlxuICAgICAqXG4gICAgICogKipOb3RlOioqIFRoZSBkYXRhIGZvciAqKnNvbWUqKiBjb2x1bW5zIGRlZmluZWQgYnkgdGhlIHVzZXIgaW4gdGhlIGBzZXRTY2hlbWFQcm9wZXJ0aWVzYFxuICAgICAqIG1ldGhvZCwgYXJlIG5vdCBzdG9yZSBkaXJlY3RseSBpbiB0aGUgcmVzdWx0cyBvYmplY3QgcmV0dXJuZWQgZnJvbSB0aGUgc2VydmVyLCBidXRcbiAgICAgKiBpbiBhbiBpbnRlcm5hbCBwcm9wZXJ0eSBjYWxsZWQgYGpzb25TZXR0aW5nc2AuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkZWZpbmVDb2x1bW5zSW5Kc29uU2V0dGluZ3MocHJvcGVydGllczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTtcbiAgICAgICAgbGV0IGNvbHVtbnNJbkpzb25TZXR0aW5ncyA9IFtdO1xuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYocHJvcGVydGllc1trZXldLmpzb25TZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIGNvbHVtbnNJbkpzb25TZXR0aW5ncy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbHVtbnNJbkpzb25TZXR0aW5ncyA9IGNvbHVtbnNJbkpzb25TZXR0aW5ncztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBhbmQgbW92ZXMgb25lIGxldmVsIHVwIGFsbCB0aGUgKip2YWx1ZXMqKiBkZWZpbmVkIGluIHRoZSBganNvblNldHRpbmdzYCBwcm9wZXJ0eVxuICAgICAqIG9mIHRoZSBgaXRlbXNgIG9iamVjdCAodGhlIGRhdGEgcmV0dXJuZWQgYnkgdGhlIHNlcnZlciksIHRoYXQgYXJlIG1lYW50IHRvIGJlIHNob3cgaW4gdGhlXG4gICAgICogdGFibGUgYWNjb3JkaW5nIHRvIHRoZSBhcnJheSBganNvblNldHRpbmdzUHJvcGVydGllc2AuXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBuZWVkcyB0byBiZSBjYWxsZWQgZXZlcnkgdGltZSBuZXcgZGF0YSBpcyBnb2luZyB0byBiZSBzaG93biBpbiB0aGUgQ2F0YWxvZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGV4dHJhY3RKc29uU2V0dGluZ3NWYWx1ZXMoaXRlbXMpIHtcbiAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYoaXRlbS5qc29uU2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICBsZXQganNvblNldHRpbmdzID0gaXRlbS5fX2pzb25TZXR0aW5nc19fID0gSlNPTi5wYXJzZShpdGVtLmpzb25TZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5zSW5Kc29uU2V0dGluZ3MuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1ba2V5XSA9IGpzb25TZXR0aW5nc1trZXldO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlRmlsdGVyQmFySXRlbXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGJBcmdzLmZpbHRlckJhckFyZ3MuaXRlbXMuZm9yRWFjaChcbiAgICAgICAgICAgIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVzVG9FeGNsdWRlLmluZGV4T2YoaXRlbS5maWVsZCkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNvbHVtbiB2aXNpYmlsaXR5IGZyb20gdGhlIHN0YXRlLiBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIHR3byBhcnJheXM6XG4gICAgICogdmlzaWJsZTogYSBsaXN0IChzdHJpbmcpIG9mIHRoZSB2aXNpYmxlIGNvbHVtbnNcbiAgICAgKiBoaWRkZW46IGEgbGlzdCAoc3RyaW5nKSBvZiB0aGUgaGlkZGVuIGNvbHVtbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldENvbHVtblZpc2liaWxpdHlGcm9tU3RhdGUoY29sdW1uU3RhdGU6IGFueSk6IElDb2x1bW5WaXNpYmlsaXR5IHtcbiAgICAgICAgY29uc3QgdmlzaWJsZTogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgY29uc3QgaGlkZGVuOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGNvbHVtblN0YXRlLmZvckVhY2goKGNvbHVtbjogYW55KSA9PiB7XG4gICAgICAgICAgICAvLyAoZGJhcnJldG8pIHRoaXMgcmV2ZXJzZXMgYSBoYWNrICg/KSBkb25lIGluIFwiY29sdW1uLWhlbHBlci50c1wiXG4gICAgICAgICAgICBsZXQgY29sSWQgPSAoY29sdW1uLmNvbElkID09PSBcIm5hbWVBbmRJZFwiKSA/IFwibmFtZVwiIDogY29sdW1uLmNvbElkO1xuICAgICAgICAgICAgaWYgKGNvbElkICE9PSBcImdlbmVyYXRlZC1jaGVja2JveC1jb2x1bW4tZmllbGRcIikge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW4uaGlkZSkge1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW4ucHVzaChjb2xJZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZS5wdXNoKGNvbElkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7IHZpc2libGUsIGhpZGRlbiB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlGaWx0ZXJiYXJGaWx0ZXJzKGl0ZW1zKSB7XG4gICAgICAgIGxldCBmaWx0ZXJlZEl0ZW1zID0gW107XG4gICAgICAgIGlmICh0aGlzLnZhbHVlc1RvRXhjbHVkZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwcm9wZXJ0eU5hbWU6IHN0cmluZyA9IHRoaXMucGJBcmdzLmZpbHRlckJhckFyZ3MucHJvcGVydHk7XG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gaXRlbVtwcm9wZXJ0eU5hbWVdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVzVG9FeGNsdWRlLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEl0ZW1zO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzcGxheUl0ZW1zKCkge1xuICAgICAgICBsZXQgY29sdW1uRGVmcyA9IHRoaXMuZ3JpZE9wdGlvbnMuY29sdW1uRGVmcztcbiAgICAgICAgY29sdW1uSGVscGVyLnNldENvbHVtbldpZHRoc0Jhc2VkT25EYXRhKGNvbHVtbkRlZnMsIHRoaXMuYWxsSXRlbXMpO1xuICAgICAgICBsZXQgZmlsdGVyZWRJdGVtcyA9IHRoaXMuYXBwbHlGaWx0ZXJiYXJGaWx0ZXJzKHRoaXMuYWxsSXRlbXMpO1xuICAgICAgICB0aGlzLmRpc3BsYXlSb3dzKGZpbHRlcmVkSXRlbXMpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzU2VhcmNoRmlsdGVySW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGxldCBzZWFyY2hUZXJtOiBzdHJpbmcgPSB0aGlzLnN0b3JhZ2UubG9hZFNlYXJjaEZpbHRlcigpO1xuICAgICAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5hcGkuc2V0UXVpY2tGaWx0ZXIoc2VhcmNoVGVybSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRpc3BsYXlSb3dzKHJlY29yZHM6IEFycmF5PHt9Pikge1xuICAgICAgICB0aGlzLnBiQXJncy5zaG93LnNwaW5uZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wYkFyZ3Muc2hvdy5lcnJvciA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5ncmlkT3B0aW9ucy5hcGkpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuYXBpLm9uTmV3Q29scygpO1xuICAgICAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5hcGkuc2V0Um93cyhyZWNvcmRzKTtcbiAgICAgICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuYXBpLnNpemVDb2x1bW5zVG9GaXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheVJvd3MocmVjb3Jkcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGlzcGxheVNwaW5uZXIoKSB7XG4gICAgICAgIHRoaXMucGJBcmdzLnNob3cuc3Bpbm5lciA9IHRydWU7XG4gICAgICAgIHRoaXMucGJBcmdzLnNob3cuZXJyb3IgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRpc3BsYXlGZXRjaEZhaWx1cmVFcnJvcihlcnJvcjogRXJyb3IpIHtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICB0aGlzLnBiQXJncy5zaG93LnNwaW5uZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wYkFyZ3Muc2hvdy5lcnJvciA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gY2FsbGVkIHdoZW4gdGhlIHVzZXIgYWN0aXZhdGVzL2RlYWN0aXZhdGVzIGEgZmlsdGVyIChzdGF0ZSlcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uRmlsdGVyQmFyQ2hhbmdlKGl0ZW1zOiBBcnJheTxJSXRlbT4pIHtcbiAgICAgICAgdGhpcy5zZXRWYWx1ZXNUb0V4Y2x1ZGVGcm9tRmlsdGVycyhpdGVtcyk7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5zYXZlTXVsdGlwbGVGaWx0ZXIoXG4gICAgICAgICAgICB0aGlzLnBiQXJncy5maWx0ZXJCYXJBcmdzLnByb3BlcnR5LFxuICAgICAgICAgICAgdGhpcy52YWx1ZXNUb0V4Y2x1ZGVcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5SXRlbXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgbGlzdCBvZiBkYXRhc2V0IHN0YXRlcyB0byBleGNsdWRlIGZyb20gdGhlIHJlc3VsdCBsaXN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRWYWx1ZXNUb0V4Y2x1ZGVGcm9tRmlsdGVycyhpdGVtczogQXJyYXk8SUl0ZW0+KTogdm9pZCB7XG4gICAgICAgIGxldCB2YWx1ZXNUb0V4Y2x1ZGUgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgaWYgKCFpdGVtLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXNUb0V4Y2x1ZGUucHVzaChpdGVtLmZpZWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbHVlc1RvRXhjbHVkZSA9IHZhbHVlc1RvRXhjbHVkZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR3JpZENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGxldCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgICBpZiAoKDxOb2RlPiBldmVudFRhcmdldCkubm9kZVR5cGUgIT09IDEpIHtcbiAgICAgICAgICAgIC8vIFRleHQgbm9kZXMgZG9uJ3QgaGF2ZSAubWF0Y2hlczsgb3RoZXIgbm9kZSB0eXBlc1xuICAgICAgICAgICAgLy8gZ2VuZXJhbGx5IGFyZW4ndCBhcHBsaWNhYmxlXG4gICAgICAgICAgICBldmVudFRhcmdldCA9ICg8Tm9kZT4gZXZlbnRUYXJnZXQpLnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOT1RFKGJmb3JiZXMpOiBBZGRpbmcgX19jYXRhbG9nX3Jvb3RfXyB0byB0aGUgcm9vdCBub2RlIHByZXZlbnRzXG4gICAgICAgIC8vIEhUTUxFbGVtZW50I21hdGNoZXMgZnJvbSBtYXRjaGluZyBub2RlcyBvdXRzaWRlIG9mIHRoZSBET00gdHJlZVxuICAgICAgICAvLyBvZiB0aGUgY2F0YWxvZ1xuICAgICAgICB0aGlzLnJvb3ROb2RlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiX19jYXRhbG9nX3Jvb3RfX1wiKTtcblxuICAgICAgICBsZXQgbWF0Y2hlZEV2ZW50VGFyZ2V0OiBIVE1MRWxlbWVudDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbWF0Y2hlZEV2ZW50VGFyZ2V0ID0gbWF0Y2hlcyhcbiAgICAgICAgICAgICAgICA8SFRNTEVsZW1lbnQ+IGV2ZW50VGFyZ2V0LFxuICAgICAgICAgICAgICAgIGBbaWQ9XCJfX2NhdGFsb2dfcm9vdF9fXCJdIGEubGluay1jZWxsLWxpbmtbZGF0YS1pdGVtaWRdYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8qIFNpbGVuY2UgZXJyb3JzICovXG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLnJvb3ROb2RlLnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFtYXRjaGVkRXZlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMubGlua0NlbGxDbGljay5uZXh0KHtcbiAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIHRhcmdldDogbWF0Y2hlZEV2ZW50VGFyZ2V0LFxuICAgICAgICAgICAgaXRlbUlkOiAoPEhUTUxFbGVtZW50PiBldmVudFRhcmdldCkuZ2V0QXR0cmlidXRlKFwiZGF0YS1pdGVtaWRcIilcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblJvd1NlbGVjdGVkKGl0ZW06IGFueSkge1xuICAgICAgICB0aGlzLnJvd1NlbGVjdC5uZXh0KGl0ZW0pO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==