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
var ls_service_1 = require("../../data/services/ls-service");
var node_1 = require("../tree-view/node");
var ls_model_1 = require("../../data/models/ls-model");
var tree_view_1 = require("../tree-view/tree-view");
var FileChooser = (function () {
    function FileChooser(el, ls) {
        this._rootPath = String.EMPTY;
        this.selectedLeaf = null;
        this.title = "Select File:";
        this._selectedEvent = new core_1.EventEmitter();
        this.errorEvent = new core_1.EventEmitter();
        this._el = el;
        this._ls = ls;
    }
    Object.defineProperty(FileChooser.prototype, "rootPath", {
        get: function () {
            return this._rootPath;
        },
        set: function (value) {
            if (!Boolean(value)) {
                this.reset();
            }
            else if (this._rootPath !== value) {
                this._rootPath = value;
                this.fetchRoot();
            }
        },
        enumerable: true,
        configurable: true
    });
    FileChooser.prototype.ngOnInit = function () {
    };
    FileChooser.prototype.fetchRoot = function () {
        var _this = this;
        this._ls
            .get(this.rootPath)
            .then(function (folder) {
            var folderModel = new ls_model_1.FolderModel(folder, _this.fileFilterFn);
            _this.root = new node_1.RootNode(folderModel.toNode());
        })
            .catch(function (error) {
            _this.errorEvent.emit(error);
        });
    };
    FileChooser.prototype.reset = function () {
        this._rootPath = String.EMPTY;
        this.selectedLeaf = null;
        this.root = undefined;
        this.nodes = undefined;
        this.leaves = undefined;
    };
    Object.defineProperty(FileChooser.prototype, "selectedFileFullpath", {
        get: function () {
            return Boolean(this.selectedLeaf) ? this.selectedLeaf.data.path : "None";
        },
        enumerable: true,
        configurable: true
    });
    FileChooser.prototype.onChildNodeCollapsed = function (node) {
    };
    FileChooser.prototype.onChildNodeExpanded = function (node) {
    };
    FileChooser.prototype.onChildLeafClicked = function (leaf) {
        this.selectedLeaf = leaf;
        this._selectedEvent.emit(leaf.data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileChooser.prototype, "rootPath", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileChooser.prototype, "title", void 0);
    __decorate([
        core_1.Input("file-filter-fn"), 
        __metadata('design:type', Function)
    ], FileChooser.prototype, "fileFilterFn", void 0);
    __decorate([
        core_1.Output("selected"), 
        __metadata('design:type', core_1.EventEmitter)
    ], FileChooser.prototype, "_selectedEvent", void 0);
    __decorate([
        core_1.Output("error"), 
        __metadata('design:type', Object)
    ], FileChooser.prototype, "errorEvent", void 0);
    FileChooser = __decorate([
        core_1.Component({
            selector: "pb-file-chooser",
            moduleId: module.id,
            templateUrl: "file-chooser.html",
            styleUrls: ["file-chooser.css"],
            directives: [
                common_1.CORE_DIRECTIVES,
                tree_view_1.TREE_VIEW_DIRECTIVES
            ],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, ls_service_1.LS])
    ], FileChooser);
    return FileChooser;
}());
exports.FileChooser = FileChooser;
exports.FILE_CHOOSER_PROVIDERS = [
    tree_view_1.TREE_VIEW_PROVIDERS,
    ls_service_1.LS
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsZS1jaG9vc2VyL2ZpbGUtY2hvb3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEscUJBUU8sZUFBZSxDQUFDLENBQUE7QUFFdkIsdUJBRU8saUJBQWlCLENBQUMsQ0FBQTtBQUl6QiwyQkFBaUIsZ0NBQWdDLENBQUMsQ0FBQTtBQUVsRCxxQkFBNkMsbUJBQW1CLENBQUMsQ0FBQTtBQUNqRSx5QkFBbUQsNEJBQTRCLENBQUMsQ0FBQTtBQUNoRiwwQkFBd0Qsd0JBQXdCLENBQUMsQ0FBQTtBQWFqRjtJQStCSSxxQkFBWSxFQUFjLEVBQUUsRUFBTTtRQTlCMUIsY0FBUyxHQUFXLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFNbEMsaUJBQVksR0FBUyxJQUFJLENBQUM7UUFleEIsVUFBSyxHQUFXLGNBQWMsQ0FBQztRQUdwQixtQkFBYyxHQUE0QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNoRSxlQUFVLEdBQUcsSUFBSSxtQkFBWSxFQUFTLENBQUM7UUFNcEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBeEJELHNCQUFJLGlDQUFRO2FBQVo7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO2FBQ0QsVUFBYSxLQUFhO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3JCLENBQUM7UUFDTCxDQUFDOzs7T0FSQTtJQXdCRCw4QkFBUSxHQUFSO0lBT0EsQ0FBQztJQUVPLCtCQUFTLEdBQWpCO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsR0FBRzthQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2xCLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDUixJQUFJLFdBQVcsR0FBZ0IsSUFBSSxzQkFBVyxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUUsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLGVBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sMkJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUV6QixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBRUQsc0JBQVcsNkNBQW9CO2FBQS9CO1lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUM3RSxDQUFDOzs7T0FBQTtJQUVELDBDQUFvQixHQUFwQixVQUFxQixJQUFVO0lBQy9CLENBQUM7SUFFRCx5Q0FBbUIsR0FBbkIsVUFBb0IsSUFBVTtJQUM5QixDQUFDO0lBRUQsd0NBQWtCLEdBQWxCLFVBQW1CLElBQVU7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUF0RUQ7UUFBQyxZQUFLLEVBQUU7OytDQUFBO0lBYVI7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBQ1I7UUFBQyxZQUFLLENBQUMsZ0JBQWdCLENBQUM7O3FEQUFBO0lBRXhCO1FBQUMsYUFBTSxDQUFDLFVBQVUsQ0FBQzs7dURBQUE7SUFDbkI7UUFBQyxhQUFNLENBQUMsT0FBTyxDQUFDOzttREFBQTtJQXJDcEI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLG1CQUFtQjtZQUNoQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztZQUMvQixVQUFVLEVBQUU7Z0JBQ1Isd0JBQWU7Z0JBQ2YsZ0NBQW9CO2FBQ3ZCO1lBQ0QsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7U0FDeEMsQ0FBQzs7bUJBQUE7SUFpRkYsa0JBQUM7QUFBRCxDQWhGQSxBQWdGQyxJQUFBO0FBaEZZLG1CQUFXLGNBZ0Z2QixDQUFBO0FBTVksOEJBQXNCLEdBQUc7SUFDbEMsK0JBQW1CO0lBQ25CLGVBQUU7Q0FDTCxDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvZmlsZS1jaG9vc2VyL2ZpbGUtY2hvb3Nlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWFcbiAqXG4gKiBDcmVhdGVkIGJ5IFNhbCBTYW5maWxpcHBvIDxzc2FuZmlsaXBwb0BwYWNpZmljYmlvc2NpZW5jZXMuY29tPiBvbiAzLzI4LzE2LlxuICovXG5cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBQcm92aWRlclxufSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuXG5pbXBvcnQge1xuICAgIENPUkVfRElSRUNUSVZFU1xufSBmcm9tIFwiYW5ndWxhcjIvY29tbW9uXCI7XG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JHZW5Db25maWd9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb25cIjtcblxuaW1wb3J0IHtMU30gZnJvbSBcIi4uLy4uL2RhdGEvc2VydmljZXMvbHMtc2VydmljZVwiO1xuXG5pbXBvcnQge1Jvb3ROb2RlLCBOb2RlLCBMZWFmLCBMZWFmRGF0YX0gZnJvbSBcIi4uL3RyZWUtdmlldy9ub2RlXCI7XG5pbXBvcnQge0ZvbGRlck1vZGVsLCBGaWxlTW9kZWwsIEZpbGVGaWx0ZXJGbn0gZnJvbSBcIi4uLy4uL2RhdGEvbW9kZWxzL2xzLW1vZGVsXCI7XG5pbXBvcnQge1RSRUVfVklFV19ESVJFQ1RJVkVTLCBUUkVFX1ZJRVdfUFJPVklERVJTfSBmcm9tIFwiLi4vdHJlZS12aWV3L3RyZWUtdmlld1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwYi1maWxlLWNob29zZXJcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcImZpbGUtY2hvb3Nlci5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJmaWxlLWNob29zZXIuY3NzXCJdLFxuICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgQ09SRV9ESVJFQ1RJVkVTLFxuICAgICAgICBUUkVFX1ZJRVdfRElSRUNUSVZFU1xuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBGaWxlQ2hvb3NlciB7XG4gICAgcHJpdmF0ZSBfcm9vdFBhdGg6IHN0cmluZyA9IFN0cmluZy5FTVBUWTtcblxuICAgIHB1YmxpYyByb290OiBSb290Tm9kZTtcbiAgICBwdWJsaWMgbm9kZXM6IEFycmF5PE5vZGU+O1xuICAgIHB1YmxpYyBsZWF2ZXM6IEFycmF5PExlYWY+O1xuXG4gICAgcHVibGljIHNlbGVjdGVkTGVhZjogTGVhZiA9IG51bGw7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCByb290UGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdFBhdGg7XG4gICAgfVxuICAgIHNldCByb290UGF0aCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9yb290UGF0aCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RQYXRoID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmZldGNoUm9vdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgdGl0bGU6IHN0cmluZyA9IFwiU2VsZWN0IEZpbGU6XCI7XG4gICAgQElucHV0KFwiZmlsZS1maWx0ZXItZm5cIikgZmlsZUZpbHRlckZuOiBGaWxlRmlsdGVyRm47XG5cbiAgICBAT3V0cHV0KFwic2VsZWN0ZWRcIikgX3NlbGVjdGVkRXZlbnQ6IEV2ZW50RW1pdHRlcjxGaWxlTW9kZWw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoXCJlcnJvclwiKSBlcnJvckV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxFcnJvcj4oKTtcblxuICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmO1xuICAgIHByaXZhdGUgX2xzOiBMUztcblxuICAgIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmLCBsczogTFMpIHtcbiAgICAgICAgdGhpcy5fZWwgPSBlbDtcbiAgICAgICAgdGhpcy5fbHMgPSBscztcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbi8qICAgICAgICB0aGlzLl9sc1xuICAgICAgICAgICAgLmdldCh0aGlzLnJvb3RQYXRoKVxuICAgICAgICAgICAgLnRoZW4oZm9sZGVyID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZm9sZGVyTW9kZWw6IEZvbGRlck1vZGVsID0gbmV3IEZvbGRlck1vZGVsKGZvbGRlciwgdGhpcy5maWxlRmlsdGVyRm4pO1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdCA9IG5ldyBSb290Tm9kZShmb2xkZXJNb2RlbC50b05vZGUoKSk7XG4gICAgICAgICAgICB9KTsqL1xuICAgIH1cblxuICAgIHByaXZhdGUgZmV0Y2hSb290KCkge1xuICAgICAgICB0aGlzLl9sc1xuICAgICAgICAgICAgLmdldCh0aGlzLnJvb3RQYXRoKVxuICAgICAgICAgICAgLnRoZW4oZm9sZGVyID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZm9sZGVyTW9kZWw6IEZvbGRlck1vZGVsID0gbmV3IEZvbGRlck1vZGVsKGZvbGRlciwgdGhpcy5maWxlRmlsdGVyRm4pO1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdCA9IG5ldyBSb290Tm9kZShmb2xkZXJNb2RlbC50b05vZGUoKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yRXZlbnQuZW1pdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuX3Jvb3RQYXRoID0gU3RyaW5nLkVNUFRZO1xuICAgICAgICB0aGlzLnNlbGVjdGVkTGVhZiA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5yb290ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm5vZGVzID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmxlYXZlcyA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNlbGVjdGVkRmlsZUZ1bGxwYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuc2VsZWN0ZWRMZWFmKSA/IHRoaXMuc2VsZWN0ZWRMZWFmLmRhdGEucGF0aCA6IFwiTm9uZVwiO1xuICAgIH1cblxuICAgIG9uQ2hpbGROb2RlQ29sbGFwc2VkKG5vZGU6IE5vZGUpIHtcbiAgICB9XG5cbiAgICBvbkNoaWxkTm9kZUV4cGFuZGVkKG5vZGU6IE5vZGUpIHtcbiAgICB9XG5cbiAgICBvbkNoaWxkTGVhZkNsaWNrZWQobGVhZjogTGVhZikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkTGVhZiA9IGxlYWY7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkRXZlbnQuZW1pdCg8RmlsZU1vZGVsPiBsZWFmLmRhdGEpO1xuICAgIH1cbn1cblxuXG4vLyBUT0RPKHNzYW5maWxpcHBvKTogVGhlIGZvbGxvd2luZyBuZWVkcyB0byBiZSBhZGRlZCB0byB0aGUgYXBwbGljYXRpb25cbi8vIGJvb3RzdHJhcCBhcnJheSBmb3IgYXBwbGljYXRpb25zIHRoYXQgdXNlIHRoZSB0cmVlIHZpZXdcbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy83MDM3XG5leHBvcnQgY29uc3QgRklMRV9DSE9PU0VSX1BST1ZJREVSUyA9IFtcbiAgICBUUkVFX1ZJRVdfUFJPVklERVJTLFxuICAgIExTXG5dO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9