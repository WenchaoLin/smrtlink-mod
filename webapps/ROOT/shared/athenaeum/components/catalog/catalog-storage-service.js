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
var local_storage_service_1 = require("../../services/local-storage-service");
var CatalogStorageService = (function () {
    function CatalogStorageService(localStorage) {
        this.localStorage = localStorage;
    }
    CatalogStorageService.prototype.setStorageKeys = function (baseStorageId) {
        if (baseStorageId) {
            this.columnStorageKey = baseStorageId + "-column-state";
            this.searchFilterStorageKey = baseStorageId + "-search-filter-state";
            this.multipleFilterStorageKey = baseStorageId + "-multiple-filter-state";
        }
    };
    CatalogStorageService.prototype.saveColumnState = function (columnState) {
        if (this.columnStorageKey) {
            return this.localStorage.save({
                key: this.columnStorageKey,
                value: columnState
            });
        }
        return false;
    };
    CatalogStorageService.prototype.loadColumnState = function () {
        if (this.columnStorageKey) {
            return this.localStorage.load({ key: this.columnStorageKey });
        }
        return null;
    };
    CatalogStorageService.prototype.saveMultipleFilter = function (property, valuesToExclude) {
        if (this.multipleFilterStorageKey) {
            var filter = {
                property: property,
                excludeList: valuesToExclude
            };
            return this.localStorage.save({
                key: this.multipleFilterStorageKey,
                value: filter
            });
        }
        return false;
    };
    CatalogStorageService.prototype.loadMultipleFilter = function () {
        if (this.multipleFilterStorageKey) {
            return this.localStorage.load({ key: this.multipleFilterStorageKey });
        }
        return null;
    };
    CatalogStorageService.prototype.saveSearchFilter = function (searchTerm) {
        if (this.searchFilterStorageKey) {
            return this.localStorage.save({
                key: this.searchFilterStorageKey,
                value: searchTerm
            });
        }
        return false;
    };
    CatalogStorageService.prototype.loadSearchFilter = function () {
        if (this.searchFilterStorageKey) {
            return this.localStorage.load({ key: this.searchFilterStorageKey });
        }
        return null;
    };
    CatalogStorageService.prototype.isMultipleFilterStored = function () {
        if (this.multipleFilterStorageKey) {
            return this.localStorage.hasValue({ key: this.multipleFilterStorageKey });
        }
        return false;
    };
    CatalogStorageService.prototype.isSearchFilterStored = function () {
        if (this.searchFilterStorageKey) {
            return this.localStorage.hasValue({ key: this.searchFilterStorageKey });
        }
        return false;
    };
    CatalogStorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [local_storage_service_1.LocalStorageService])
    ], CatalogStorageService);
    return CatalogStorageService;
}());
exports.CatalogStorageService = CatalogStorageService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2F0YWxvZy9jYXRhbG9nLXN0b3JhZ2Utc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBQ3pDLHNDQUFrQyxzQ0FBc0MsQ0FBQyxDQUFBO0FBUXpFO0lBTUksK0JBQVksWUFBaUM7UUFDekMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDckMsQ0FBQztJQU1NLDhDQUFjLEdBQXJCLFVBQXNCLGFBQXFCO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGFBQWEsR0FBRyxlQUFlLENBQUM7WUFDeEQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQztZQUNyRSxJQUFJLENBQUMsd0JBQXdCLEdBQUcsYUFBYSxHQUFHLHdCQUF3QixDQUFDO1FBQzdFLENBQUM7SUFDTCxDQUFDO0lBT00sK0NBQWUsR0FBdEIsVUFBdUIsV0FBZ0I7UUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLEdBQUcsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO2dCQUMxQixLQUFLLEVBQUUsV0FBVzthQUNyQixDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBS00sK0NBQWUsR0FBdEI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFPTSxrREFBa0IsR0FBekIsVUFBMEIsUUFBZ0IsRUFBRSxlQUF5QjtRQUNqRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQU0sTUFBTSxHQUFpQjtnQkFDekIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFdBQVcsRUFBRSxlQUFlO2FBQy9CLENBQUM7WUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLEdBQUcsRUFBRSxJQUFJLENBQUMsd0JBQXdCO2dCQUNsQyxLQUFLLEVBQUUsTUFBTTthQUNoQixDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBS00sa0RBQWtCLEdBQXpCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBT00sZ0RBQWdCLEdBQXZCLFVBQXdCLFVBQWtCO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUMxQixHQUFHLEVBQUUsSUFBSSxDQUFDLHNCQUFzQjtnQkFDaEMsS0FBSyxFQUFFLFVBQVU7YUFDcEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUtNLGdEQUFnQixHQUF2QjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUtNLHNEQUFzQixHQUE3QjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUtNLG9EQUFvQixHQUEzQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQXhITDtRQUFDLGlCQUFVLEVBQUU7OzZCQUFBO0lBMEhiLDRCQUFDO0FBQUQsQ0F6SEEsQUF5SEMsSUFBQTtBQXpIWSw2QkFBcUIsd0JBeUhqQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvY2F0YWxvZy9jYXRhbG9nLXN0b3JhZ2Utc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7TG9jYWxTdG9yYWdlU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2xvY2FsLXN0b3JhZ2Utc2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElGaWx0ZXJTdGF0ZSB7XG4gICAgcHJvcGVydHk6IHN0cmluZztcbiAgICBleGNsdWRlTGlzdDogc3RyaW5nW107XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXRhbG9nU3RvcmFnZVNlcnZpY2Uge1xuICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlO1xuICAgIHByaXZhdGUgY29sdW1uU3RvcmFnZUtleTogc3RyaW5nO1xuICAgIHByaXZhdGUgc2VhcmNoRmlsdGVyU3RvcmFnZUtleTogc3RyaW5nO1xuICAgIHByaXZhdGUgbXVsdGlwbGVGaWx0ZXJTdG9yYWdlS2V5OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihsb2NhbFN0b3JhZ2U6IExvY2FsU3RvcmFnZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhbGwgdGhlIGtleXMgbmVlZGVkIHRvIHNhdmUgaW5mb3JtYXRpb24gaW50byB0aGUgbG9jYWwgc3RvcmFnZS5cbiAgICAgKiBBbGwgdGhlIGtleXMgYXJlIGRlcml2ZWQgZnJvbSBgYmFzZVN0b3JhZ2VJZGBcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0U3RvcmFnZUtleXMoYmFzZVN0b3JhZ2VJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmIChiYXNlU3RvcmFnZUlkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtblN0b3JhZ2VLZXkgPSBiYXNlU3RvcmFnZUlkICsgXCItY29sdW1uLXN0YXRlXCI7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEZpbHRlclN0b3JhZ2VLZXkgPSBiYXNlU3RvcmFnZUlkICsgXCItc2VhcmNoLWZpbHRlci1zdGF0ZVwiO1xuICAgICAgICAgICAgdGhpcy5tdWx0aXBsZUZpbHRlclN0b3JhZ2VLZXkgPSBiYXNlU3RvcmFnZUlkICsgXCItbXVsdGlwbGUtZmlsdGVyLXN0YXRlXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlcyB0aGUgY29sdW1uIHN0YXRlIGluIHRoZSBsb2NhbCBzdG9yYWdlLlxuICAgICAqIFxuICAgICAqIFJldHVybnMgJ3RydWUnIGlmIHRoZSBvcGVyYXRpb24gd2FzIHN1Y2Nlc3NmdWwsICdmYWxzZScgb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIHB1YmxpYyBzYXZlQ29sdW1uU3RhdGUoY29sdW1uU3RhdGU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5TdG9yYWdlS2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbFN0b3JhZ2Uuc2F2ZSh7XG4gICAgICAgICAgICAgICAga2V5OiB0aGlzLmNvbHVtblN0b3JhZ2VLZXksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGNvbHVtblN0YXRlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIGNvbHVtbiBzdGF0ZSBmcm9tIHRoZSBsb2NhbCBzdG9yYWdlLlxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkQ29sdW1uU3RhdGUoKTogYW55IHtcbiAgICAgICAgaWYgKHRoaXMuY29sdW1uU3RvcmFnZUtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxTdG9yYWdlLmxvYWQoeyBrZXk6IHRoaXMuY29sdW1uU3RvcmFnZUtleSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlcyB0aGUgcHJvcGVydHkgbmFtZSB0byBmaWx0ZXIgYW5kIHRoZSBleGNsdWRlZCB2YWx1ZXMuXG4gICAgICogXG4gICAgICogUmV0dXJucyAndHJ1ZScgaWYgdGhlIG9wZXJhdGlvbiB3YXMgc3VjY2Vzc2Z1bCwgJ2ZhbHNlJyBvdGhlcndpc2UuXG4gICAgICovXG4gICAgcHVibGljIHNhdmVNdWx0aXBsZUZpbHRlcihwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZXNUb0V4Y2x1ZGU6IHN0cmluZ1tdKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlRmlsdGVyU3RvcmFnZUtleSkge1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyOiBJRmlsdGVyU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgICAgICAgIGV4Y2x1ZGVMaXN0OiB2YWx1ZXNUb0V4Y2x1ZGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbFN0b3JhZ2Uuc2F2ZSh7XG4gICAgICAgICAgICAgICAga2V5OiB0aGlzLm11bHRpcGxlRmlsdGVyU3RvcmFnZUtleSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZmlsdGVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIHN0YXRlIG9mIHRoZSBtdWx0aXBsZSBmaWx0ZXIgZnJvbSB0aGUgbG9jYWwgc3RvcmFnZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgbG9hZE11bHRpcGxlRmlsdGVyKCk6IElGaWx0ZXJTdGF0ZSB7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlRmlsdGVyU3RvcmFnZUtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxTdG9yYWdlLmxvYWQoeyBrZXk6IHRoaXMubXVsdGlwbGVGaWx0ZXJTdG9yYWdlS2V5IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmVzIHRoZSBzZWFyY2ggZmlsdGVyIHRlcm0gaW4gdGhlIGxvY2FsIHN0b3JhZ2UuXG4gICAgICogXG4gICAgICogUmV0dXJucyAndHJ1ZScgaWYgdGhlIG9wZXJhdGlvbiB3YXMgc3VjY2Vzc2Z1bCwgJ2ZhbHNlJyBvdGhlcndpc2UuXG4gICAgICovXG4gICAgcHVibGljIHNhdmVTZWFyY2hGaWx0ZXIoc2VhcmNoVGVybTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEZpbHRlclN0b3JhZ2VLZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsU3RvcmFnZS5zYXZlKHtcbiAgICAgICAgICAgICAgICBrZXk6IHRoaXMuc2VhcmNoRmlsdGVyU3RvcmFnZUtleSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogc2VhcmNoVGVybVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSBzZWFyY2ggZmlsdGVyIHRlcm0gZnJvbSB0aGUgbG9jYWwgc3RvcmFnZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgbG9hZFNlYXJjaEZpbHRlcigpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hGaWx0ZXJTdG9yYWdlS2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbFN0b3JhZ2UubG9hZCh7IGtleTogdGhpcy5zZWFyY2hGaWx0ZXJTdG9yYWdlS2V5IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgaWYgYSB2YWx1ZSBpcyBzdG9yZWQgZm9yIG11bHRpcGxlIGZpbHRlclxuICAgICAqL1xuICAgIHB1YmxpYyBpc011bHRpcGxlRmlsdGVyU3RvcmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZUZpbHRlclN0b3JhZ2VLZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsU3RvcmFnZS5oYXNWYWx1ZSh7IGtleTogdGhpcy5tdWx0aXBsZUZpbHRlclN0b3JhZ2VLZXkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgaWYgYSB2YWx1ZSBpcyBzdG9yZWQgZm9yIHNlYXJjaCBmaWx0ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNTZWFyY2hGaWx0ZXJTdG9yZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEZpbHRlclN0b3JhZ2VLZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsU3RvcmFnZS5oYXNWYWx1ZSh7IGtleTogdGhpcy5zZWFyY2hGaWx0ZXJTdG9yYWdlS2V5IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==