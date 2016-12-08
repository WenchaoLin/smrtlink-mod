"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var injector_1 = require("../../common/injector");
var node_1 = require("../../components/tree-view/node");
var model_1 = require("../../common/model");
var ls_service_1 = require("../services/ls-service");
var FolderModel = (function (_super) {
    __extends(FolderModel, _super);
    function FolderModel(object, filterFileFn) {
        var _this = this;
        _super.call(this);
        this.injector = injector_1.get();
        this.ls = this.injector.get(ls_service_1.LS);
        this.fullPath = String.EMPTY;
        this.folders = [];
        this.files = [];
        this.lazyLoaded = true;
        this.loaded = true;
        this._text = String.EMPTY;
        this.initialize(object);
        this._filterFileFn = filterFileFn;
        if (this.fullPath === "/") {
            this._text = "/";
        }
        else {
            var segments = this.fullPath.split("/");
            this._text = segments[segments.length - 1];
        }
        this.loaded = !this.lazyLoaded;
        if (object) {
            if (object.subDirectories) {
                this.folders = object.subDirectories.map(function (folder) {
                    return new FolderModel(folder, _this._filterFileFn);
                });
                this.sortCollectionOnFullPath(this.folders);
            }
            if (object.files) {
                this.files = object.files.map(function (file) {
                    return new FileModel(file);
                });
                this.files = this.sortCollectionOnFullPath(this.files, Boolean(this._filterFileFn));
            }
        }
    }
    FolderModel.prototype.fetch = function (node) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.ls
                .get(_this.fullPath)
                .then(function (folder) {
                _this.loaded = true;
                var folderModel = new FolderModel(folder, _this._filterFileFn);
                _this.sortCollectionOnFullPath(folderModel.folders);
                folderModel.files = _this.sortCollectionOnFullPath(folderModel.files, Boolean(_this._filterFileFn));
                node.nodes = folderModel.folders.map(function (child) { return child.toNode(); });
                node.leaves = folderModel.files.map(function (file) { return file.toLeaf(); });
                resolve();
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    FolderModel.prototype.toNode = function () {
        var _this = this;
        var nodes = [];
        var leaves = [];
        this.folders
            .forEach(function (folder) {
            nodes.push((_this.lazyLoaded) ? new node_1.Node(folder) : folder.toNode());
        });
        this.files
            .forEach(function (file) { return leaves.push(file.toLeaf()); });
        return new node_1.Node(this, nodes, leaves);
    };
    Object.defineProperty(FolderModel.prototype, "path", {
        get: function () {
            return this.fullPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FolderModel.prototype, "text", {
        get: function () {
            return this._text;
        },
        enumerable: true,
        configurable: true
    });
    FolderModel.prototype.toString = function () {
        return this.text;
    };
    FolderModel.prototype.sortCollectionOnFullPath = function (collection, applyFilter) {
        if (applyFilter === void 0) { applyFilter = false; }
        if (applyFilter) {
            collection = collection.filter(this._filterFileFn);
        }
        collection.sort(function (a, b) {
            if (a.fullPath > b.fullPath) {
                return 1;
            }
            else if (a.fullPath < b.fullPath) {
                return -1;
            }
            else {
                return 0;
            }
        });
        return collection;
    };
    return FolderModel;
}(model_1.Model));
exports.FolderModel = FolderModel;
var FileModel = (function (_super) {
    __extends(FileModel, _super);
    function FileModel(object) {
        _super.call(this);
        this.fullPath = String.EMPTY;
        this.name = String.EMPTY;
        this.sizeInBytes = 0;
        this.sizeReadable = "0 B";
        this.mimeType = "text/plain";
        this.initialize(object);
    }
    Object.defineProperty(FileModel.prototype, "path", {
        get: function () {
            return this.fullPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileModel.prototype, "text", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    FileModel.prototype.toLeaf = function () {
        return new node_1.Leaf(this);
    };
    FileModel.prototype.toString = function () {
        return this.text;
    };
    return FileModel;
}(model_1.Model));
exports.FileModel = FileModel;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvbW9kZWxzL2xzLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1BLHlCQUFpQyx1QkFBdUIsQ0FBQyxDQUFBO0FBRXpELHFCQUE2QyxpQ0FBaUMsQ0FBQyxDQUFBO0FBQy9FLHNCQUFvQixvQkFBb0IsQ0FBQyxDQUFBO0FBRXpDLDJCQUFpQix3QkFBd0IsQ0FBQyxDQUFBO0FBWTFDO0lBQWlDLCtCQUFLO0lBY2xDLHFCQUFZLE1BQXFCLEVBQUUsWUFBMkI7UUFkbEUsaUJBZ0hDO1FBakdPLGlCQUFPLENBQUM7UUFkSixhQUFRLEdBQUcsY0FBVyxFQUFFLENBQUM7UUFDekIsT0FBRSxHQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQUUsQ0FBQyxDQUFDO1FBSWhDLGFBQVEsR0FBVyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2hDLFlBQU8sR0FBdUIsRUFBRSxDQUFDO1FBQ2pDLFVBQUssR0FBcUIsRUFBRSxDQUFDO1FBQzdCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsV0FBTSxHQUFZLElBQUksQ0FBQztRQUV0QixVQUFLLEdBQVcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUlqQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1FBRWxDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNyQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFD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QUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2IsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQWhIQSxBQWdIQyxDQWhIZ0MsYUFBSyxHQWdIckM7QUFoSFksbUJBQVcsY0FnSHZCLENBQUE7QUFVRDtJQUErQiw2QkFBSztJQU9oQyxtQkFBWSxNQUFtQjtRQUMzQixpQkFBTyxDQUFDO1FBUEwsYUFBUSxHQUFXLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDaEMsU0FBSSxHQUFXLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDNUIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsaUJBQVksR0FBVyxLQUFLLENBQUM7UUFDN0IsYUFBUSxHQUFXLFlBQVksQ0FBQztRQUluQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxzQkFBVywyQkFBSTthQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywyQkFBSTthQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFFTSwwQkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSw0QkFBUSxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0EzQkEsQUEyQkMsQ0EzQjhCLGFBQUssR0EyQm5DO0FBM0JZLGlCQUFTLFlBMkJyQixDQUFBIiwiZmlsZSI6ImRhdGEvbW9kZWxzL2xzLW1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYVxuICpcbiAqIENyZWF0ZWQgYnkgU2FsIFNhbmZpbGlwcG8gPHNzYW5maWxpcHBvQHBhY2lmaWNiaW9zY2llbmNlcy5jb20+IG9uIDMvMjgvMTYuXG4gKi9cblxuaW1wb3J0IHtnZXQgYXMgZ2V0SW5qZWN0b3J9IGZyb20gXCIuLi8uLi9jb21tb24vaW5qZWN0b3JcIjtcblxuaW1wb3J0IHtOb2RlRGF0YSwgTGVhZkRhdGEsIE5vZGUsIExlYWZ9IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL3RyZWUtdmlldy9ub2RlXCI7XG5pbXBvcnQge01vZGVsfSBmcm9tIFwiLi4vLi4vY29tbW9uL21vZGVsXCI7XG5cbmltcG9ydCB7TFN9IGZyb20gXCIuLi9zZXJ2aWNlcy9scy1zZXJ2aWNlXCI7XG5cbmV4cG9ydCB0eXBlIEZpbGVGaWx0ZXJGbiA9IHsgKGZpbGU6IEZpbGVNb2RlbCk6IGJvb2xlYW4gfTtcblxuZXhwb3J0IGludGVyZmFjZSBGb2xkZXJPYmplY3Qge1xuICAgIGZ1bGxQYXRoPzogc3RyaW5nO1xuICAgIHN1YkRpcmVjdG9yaWVzPzogQXJyYXk8Rm9sZGVyTW9kZWw+O1xuICAgIGZpbGVzPzogQXJyYXk8RmlsZU1vZGVsPjtcbiAgICBsYXp5TG9hZGVkPzogYm9vbGVhbjtcbiAgICBsb2FkZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgRm9sZGVyTW9kZWwgZXh0ZW5kcyBNb2RlbCBpbXBsZW1lbnRzIEZvbGRlck9iamVjdCwgTm9kZURhdGEge1xuICAgIHByaXZhdGUgaW5qZWN0b3IgPSBnZXRJbmplY3RvcigpO1xuICAgIHByaXZhdGUgbHM6IExTID0gdGhpcy5pbmplY3Rvci5nZXQoTFMpO1xuXG4gICAgcHJpdmF0ZSBfZmlsdGVyRmlsZUZuOiBGaWxlRmlsdGVyRm47XG5cbiAgICBwdWJsaWMgZnVsbFBhdGg6IHN0cmluZyA9IFN0cmluZy5FTVBUWTtcbiAgICBwdWJsaWMgZm9sZGVyczogQXJyYXk8Rm9sZGVyTW9kZWw+ID0gW107XG4gICAgcHVibGljIGZpbGVzOiBBcnJheTxGaWxlTW9kZWw+ID0gW107XG4gICAgcHVibGljIGxhenlMb2FkZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBsb2FkZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBfdGV4dDogc3RyaW5nID0gU3RyaW5nLkVNUFRZO1xuXG4gICAgY29uc3RydWN0b3Iob2JqZWN0PzogRm9sZGVyT2JqZWN0LCBmaWx0ZXJGaWxlRm4/OiBGaWxlRmlsdGVyRm4pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKG9iamVjdCk7XG5cbiAgICAgICAgdGhpcy5fZmlsdGVyRmlsZUZuID0gZmlsdGVyRmlsZUZuO1xuXG4gICAgICAgIGlmICh0aGlzLmZ1bGxQYXRoID09PSBcIi9cIikge1xuICAgICAgICAgICAgdGhpcy5fdGV4dCA9IFwiL1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc2VnbWVudHMgPSB0aGlzLmZ1bGxQYXRoLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSBzZWdtZW50c1tzZWdtZW50cy5sZW5ndGgtMV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2FkZWQgPSAhdGhpcy5sYXp5TG9hZGVkO1xuXG4gICAgICAgIGlmIChvYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChvYmplY3Quc3ViRGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGRlcnMgPSBvYmplY3Quc3ViRGlyZWN0b3JpZXMubWFwKChmb2xkZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGb2xkZXJNb2RlbChmb2xkZXIsIHRoaXMuX2ZpbHRlckZpbGVGbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0Q29sbGVjdGlvbk9uRnVsbFBhdGgodGhpcy5mb2xkZXJzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9iamVjdC5maWxlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZXMgPSBvYmplY3QuZmlsZXMubWFwKChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRmlsZU1vZGVsKGZpbGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZXMgPSB0aGlzLnNvcnRDb2xsZWN0aW9uT25GdWxsUGF0aCh0aGlzLmZpbGVzLCBCb29sZWFuKHRoaXMuX2ZpbHRlckZpbGVGbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGZldGNoKG5vZGU6IE5vZGUpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sc1xuICAgICAgICAgICAgICAgIC5nZXQodGhpcy5mdWxsUGF0aClcbiAgICAgICAgICAgICAgICAudGhlbigoZm9sZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvbGRlck1vZGVsID0gbmV3IEZvbGRlck1vZGVsKGZvbGRlciwgdGhpcy5fZmlsdGVyRmlsZUZuKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRDb2xsZWN0aW9uT25GdWxsUGF0aChmb2xkZXJNb2RlbC5mb2xkZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgZm9sZGVyTW9kZWwuZmlsZXMgPSB0aGlzLnNvcnRDb2xsZWN0aW9uT25GdWxsUGF0aChmb2xkZXJNb2RlbC5maWxlcywgQm9vbGVhbih0aGlzLl9maWx0ZXJGaWxlRm4pKTtcblxuICAgICAgICAgICAgICAgICAgICBub2RlLm5vZGVzID0gZm9sZGVyTW9kZWwuZm9sZGVycy5tYXAoKGNoaWxkOiBGb2xkZXJNb2RlbCkgPT4gY2hpbGQudG9Ob2RlKCkpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLmxlYXZlcyA9IGZvbGRlck1vZGVsLmZpbGVzLm1hcCgoZmlsZTogRmlsZU1vZGVsKSA9PiBmaWxlLnRvTGVhZigpKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9Ob2RlKCk6IE5vZGUge1xuICAgICAgICBsZXQgbm9kZXM6QXJyYXk8Tm9kZT4gPSBbXTtcbiAgICAgICAgbGV0IGxlYXZlczogQXJyYXk8TGVhZj4gPSBbXTtcblxuICAgICAgICB0aGlzLmZvbGRlcnNcbiAgICAgICAgICAgIC5mb3JFYWNoKGZvbGRlciA9PiB7XG4gICAgICAgICAgICAgICAgbm9kZXMucHVzaCgodGhpcy5sYXp5TG9hZGVkKSA/IG5ldyBOb2RlKGZvbGRlcikgOiBmb2xkZXIudG9Ob2RlKCkpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZpbGVzXG4gICAgICAgICAgICAuZm9yRWFjaChmaWxlID0+IGxlYXZlcy5wdXNoKGZpbGUudG9MZWFmKCkpKTtcblxuICAgICAgICByZXR1cm4gbmV3IE5vZGUodGhpcywgbm9kZXMsIGxlYXZlcyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBwYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmZ1bGxQYXRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNvcnRDb2xsZWN0aW9uT25GdWxsUGF0aChjb2xsZWN0aW9uLCBhcHBseUZpbHRlcjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChhcHBseUZpbHRlcikge1xuICAgICAgICAgICAgY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24uZmlsdGVyKHRoaXMuX2ZpbHRlckZpbGVGbik7XG4gICAgICAgIH1cblxuICAgICAgICBjb2xsZWN0aW9uLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGlmIChhLmZ1bGxQYXRoID4gYi5mdWxsUGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhLmZ1bGxQYXRoIDwgYi5mdWxsUGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWxlT2JqZWN0IHtcbiAgICBmdWxsUGF0aD86IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHNpemVJbkJ5dGVzPzogbnVtYmVyO1xuICAgIHNpemVSZWFkYWJsZT86IHN0cmluZztcbiAgICBtaW1lVHlwZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEZpbGVNb2RlbCBleHRlbmRzIE1vZGVsIGltcGxlbWVudHMgRmlsZU9iamVjdCwgTGVhZkRhdGEge1xuICAgIHB1YmxpYyBmdWxsUGF0aDogc3RyaW5nID0gU3RyaW5nLkVNUFRZO1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBTdHJpbmcuRU1QVFk7XG4gICAgcHVibGljIHNpemVJbkJ5dGVzOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBzaXplUmVhZGFibGU6IHN0cmluZyA9IFwiMCBCXCI7XG4gICAgcHVibGljIG1pbWVUeXBlOiBzdHJpbmcgPSBcInRleHQvcGxhaW5cIjtcblxuICAgIGNvbnN0cnVjdG9yKG9iamVjdD86IEZpbGVPYmplY3QpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKG9iamVjdCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBwYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmZ1bGxQYXRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0xlYWYoKSB7XG4gICAgICAgIHJldHVybiBuZXcgTGVhZih0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dDtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=