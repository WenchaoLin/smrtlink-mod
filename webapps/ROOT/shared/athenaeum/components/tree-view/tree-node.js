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
var tree_view_1 = require("./tree-view");
var tree_leaf_1 = require("./tree-leaf");
var TreeNode = (function () {
    function TreeNode(parent, el) {
        this._collapsedEvent = new core_1.EventEmitter();
        this._expandedEvent = new core_1.EventEmitter();
        this.checkable = false;
        this._parent = parent;
        this._el = el;
    }
    TreeNode.prototype.onClick = function ($event) {
        this.node.toggle();
        $event.cancelBubble = true;
        ((this.node.expanded) ? this._expandedEvent : this._collapsedEvent).emit(this.node);
    };
    TreeNode.prototype.onCheckboxClick = function (node, $event) {
        node.check();
        $event.cancelBubble = true;
    };
    TreeNode.prototype.onBubbleNodeCollapsed = function (node) {
        this._parent.bubbleNodeCollapsed(node);
    };
    TreeNode.prototype.onBubbleNodeExpanded = function (node) {
        this._parent.bubbleNodeExpanded(node);
    };
    TreeNode.prototype.onBubbleLeafClicked = function (leaf) {
        this._parent.bubbleLeafClicked(leaf);
    };
    __decorate([
        core_1.Output("collapsed"), 
        __metadata('design:type', core_1.EventEmitter)
    ], TreeNode.prototype, "_collapsedEvent", void 0);
    __decorate([
        core_1.Output("expanded"), 
        __metadata('design:type', core_1.EventEmitter)
    ], TreeNode.prototype, "_expandedEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeNode.prototype, "node", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TreeNode.prototype, "checkable", void 0);
    TreeNode = __decorate([
        core_1.Component({
            selector: "pb-tree-node",
            moduleId: module.id,
            templateUrl: "tree-node.html",
            styleUrls: ["tree-node.css"],
            directives: [core_1.forwardRef(function () { return tree_view_1.TreeView; }), tree_leaf_1.TreeLeaf],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(0, core_1.Host()),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return tree_view_1.TreeView; }))),
        __param(1, core_1.Inject(core_1.ElementRef)), 
        __metadata('design:paramtypes', [tree_view_1.TreeView, core_1.ElementRef])
    ], TreeNode);
    return TreeNode;
}());
exports.TreeNode = TreeNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdHJlZS12aWV3L3RyZWUtbm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBTUEscUJBVU8sZUFBZSxDQUFDLENBQUE7QUFHdkIsMEJBQXVCLGFBQWEsQ0FBQyxDQUFBO0FBQ3JDLDBCQUF1QixhQUFhLENBQUMsQ0FBQTtBQVVyQztJQU9JLGtCQUF3RCxNQUFnQixFQUN4QyxFQUFjO1FBSmpCLG9CQUFlLEdBQXVCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzFELG1CQUFjLEdBQXVCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBUzNFLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFMaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUtELDBCQUFPLEdBQVAsVUFBUSxNQUFNO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNuQixNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUUzQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRCxrQ0FBZSxHQUFmLFVBQWdCLElBQUksRUFBRSxNQUFNO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFRCx3Q0FBcUIsR0FBckIsVUFBc0IsSUFBVTtRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCx1Q0FBb0IsR0FBcEIsVUFBcUIsSUFBVTtRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxzQ0FBbUIsR0FBbkIsVUFBb0IsSUFBVTtRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFsQ0Q7UUFBQyxhQUFNLENBQUMsV0FBVyxDQUFDOztxREFBQTtJQUNwQjtRQUFDLGFBQU0sQ0FBQyxVQUFVLENBQUM7O29EQUFBO0lBUW5CO1FBQUMsWUFBSyxFQUFFOzswQ0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzsrQ0FBQTtJQXRCWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDNUIsVUFBVSxFQUFFLENBQUMsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsb0JBQVEsRUFBUixDQUFRLENBQUMsRUFBRSxvQkFBUSxDQUFDO1lBQ2xELGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3hDLENBQUM7bUJBUWUsV0FBSSxFQUFFO21CQUFFLGFBQU0sQ0FBQyxpQkFBVSxDQUFDLGNBQU0sT0FBQSxvQkFBUSxFQUFSLENBQVEsQ0FBQyxDQUFDO21CQUMxQyxhQUFNLENBQUMsaUJBQVUsQ0FBQzs7Z0JBVGpDO0lBd0NGLGVBQUM7QUFBRCxDQXZDQSxBQXVDQyxJQUFBO0FBdkNZLGdCQUFRLFdBdUNwQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvdHJlZS12aWV3L3RyZWUtbm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWFcbiAqXG4gKiBDcmVhdGVkIGJ5IFNhbCBTYW5maWxpcHBvIDxzc2FuZmlsaXBwb0BwYWNpZmljYmlvc2NpZW5jZXMuY29tPiBvbiAzLzI4LzE2LlxuICovXG5cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEhvc3QsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIEluamVjdCxcbiAgICBmb3J3YXJkUmVmXG59IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5cbmltcG9ydCB7Tm9kZSwgTGVhZn0gZnJvbSBcIi4vbm9kZVwiO1xuaW1wb3J0IHtUcmVlVmlld30gZnJvbSBcIi4vdHJlZS12aWV3XCI7XG5pbXBvcnQge1RyZWVMZWFmfSBmcm9tIFwiLi90cmVlLWxlYWZcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicGItdHJlZS1ub2RlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCJ0cmVlLW5vZGUuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1widHJlZS1ub2RlLmNzc1wiXSxcbiAgICBkaXJlY3RpdmVzOiBbZm9yd2FyZFJlZigoKSA9PiBUcmVlVmlldyksIFRyZWVMZWFmXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlIHtcbiAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZjtcbiAgICBwcml2YXRlIF9wYXJlbnQ6IFRyZWVWaWV3O1xuXG4gICAgQE91dHB1dChcImNvbGxhcHNlZFwiKSBwcml2YXRlIF9jb2xsYXBzZWRFdmVudDogRXZlbnRFbWl0dGVyPE5vZGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoXCJleHBhbmRlZFwiKSBwcml2YXRlIF9leHBhbmRlZEV2ZW50OiBFdmVudEVtaXR0ZXI8Tm9kZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihASG9zdCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBUcmVlVmlldykpIHBhcmVudDogVHJlZVZpZXcsXG4gICAgICAgICAgICAgICAgQEluamVjdChFbGVtZW50UmVmKSBlbDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMuX2VsID0gZWw7XG4gICAgfVxuXG4gICAgQElucHV0KCkgbm9kZTogYW55O1xuICAgIEBJbnB1dCgpIGNoZWNrYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25DbGljaygkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ub2RlLnRvZ2dsZSgpO1xuICAgICAgICAkZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcblxuICAgICAgICAoKHRoaXMubm9kZS5leHBhbmRlZCkgPyB0aGlzLl9leHBhbmRlZEV2ZW50IDogdGhpcy5fY29sbGFwc2VkRXZlbnQpLmVtaXQodGhpcy5ub2RlKTtcbiAgICB9XG5cbiAgICBvbkNoZWNrYm94Q2xpY2sobm9kZSwgJGV2ZW50KSB7XG4gICAgICAgIG5vZGUuY2hlY2soKTtcbiAgICAgICAgJGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgb25CdWJibGVOb2RlQ29sbGFwc2VkKG5vZGU6IE5vZGUpIHtcbiAgICAgICAgdGhpcy5fcGFyZW50LmJ1YmJsZU5vZGVDb2xsYXBzZWQobm9kZSk7XG4gICAgfVxuXG4gICAgb25CdWJibGVOb2RlRXhwYW5kZWQobm9kZTogTm9kZSkge1xuICAgICAgICB0aGlzLl9wYXJlbnQuYnViYmxlTm9kZUV4cGFuZGVkKG5vZGUpO1xuICAgIH1cblxuICAgIG9uQnViYmxlTGVhZkNsaWNrZWQobGVhZjogTGVhZikge1xuICAgICAgICB0aGlzLl9wYXJlbnQuYnViYmxlTGVhZkNsaWNrZWQobGVhZik7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9