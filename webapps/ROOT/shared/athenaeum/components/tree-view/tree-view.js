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
var lang_1 = require("angular2/src/facade/lang");
var change_detection_1 = require("angular2/src/core/change_detection/change_detection");
var tree_node_1 = require("./tree-node");
var tree_leaf_1 = require("./tree-leaf");
var TreeView = (function () {
    function TreeView(el) {
        this.root = false;
        this._nodeCollapsedEvent = new core_1.EventEmitter();
        this._nodeExpandedEvent = new core_1.EventEmitter();
        this._leafClickedEvent = new core_1.EventEmitter();
        this._el = el;
    }
    TreeView.prototype.ngOnInit = function () {
        if (this.root) {
            this._el.nativeElement.classList.add("tv-root");
        }
    };
    TreeView.prototype.onClick = function (node, $event) {
        node.check();
        $event.cancelBubble = true;
    };
    TreeView.prototype.onNodeCollapsed = function (node) {
        this._nodeCollapsedEvent.emit(node);
    };
    TreeView.prototype.onNodeExpanded = function (node) {
        this._nodeExpandedEvent.emit(node);
    };
    TreeView.prototype.onLeafClicked = function (leaf) {
        this._leafClickedEvent.emit(leaf);
    };
    TreeView.prototype.bubbleNodeCollapsed = function (node) {
        this.onNodeCollapsed(node);
    };
    TreeView.prototype.bubbleNodeExpanded = function (node) {
        this.onNodeExpanded(node);
    };
    TreeView.prototype.bubbleLeafClicked = function (leaf) {
        this.onLeafClicked(leaf);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TreeView.prototype, "nodes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TreeView.prototype, "leaves", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TreeView.prototype, "root", void 0);
    __decorate([
        core_1.Output("node-collapsed"), 
        __metadata('design:type', core_1.EventEmitter)
    ], TreeView.prototype, "_nodeCollapsedEvent", void 0);
    __decorate([
        core_1.Output("node-expanded"), 
        __metadata('design:type', core_1.EventEmitter)
    ], TreeView.prototype, "_nodeExpandedEvent", void 0);
    __decorate([
        core_1.Output("leaf-clicked"), 
        __metadata('design:type', core_1.EventEmitter)
    ], TreeView.prototype, "_leafClickedEvent", void 0);
    TreeView = __decorate([
        core_1.Component({
            selector: "pb-tree-view",
            moduleId: module.id,
            templateUrl: "tree-view.html",
            styleUrls: ["tree-view.css"],
            directives: [TreeView, tree_node_1.TreeNode, tree_leaf_1.TreeLeaf],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(0, core_1.Inject(core_1.ElementRef)), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TreeView);
    return TreeView;
}());
exports.TreeView = TreeView;
exports.TREE_VIEW_DIRECTIVES = [TreeView, tree_node_1.TreeNode, tree_leaf_1.TreeLeaf];
exports.TREE_VIEW_PROVIDERS = [
    new core_1.Provider(change_detection_1.ChangeDetectorGenConfig, {
        useFactory: function () {
            return new change_detection_1.ChangeDetectorGenConfig(lang_1.assertionsEnabled(), false, false);
        }
    })
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdHJlZS12aWV3L3RyZWUtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBTUEscUJBU08sZUFBZSxDQUFDLENBQUE7QUFDdkIscUJBQWdDLDBCQUEwQixDQUFDLENBQUE7QUFDM0QsaUNBQXNDLHFEQUFxRCxDQUFDLENBQUE7QUFFNUYsMEJBQXVCLGFBQWEsQ0FBQyxDQUFBO0FBQ3JDLDBCQUF1QixhQUFhLENBQUMsQ0FBQTtBQVdyQztJQVlJLGtCQUFnQyxFQUFjO1FBTnJDLFNBQUksR0FBWSxLQUFLLENBQUM7UUFFTCx3QkFBbUIsR0FBdUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDOUQsdUJBQWtCLEdBQXVCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzdELHNCQUFpQixHQUF1QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUcvRSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsMkJBQVEsR0FBUjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxDQUFDO0lBQ0wsQ0FBQztJQUVELDBCQUFPLEdBQVAsVUFBUSxJQUFVLEVBQUUsTUFBTTtRQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRUQsa0NBQWUsR0FBZixVQUFnQixJQUFVO1FBQ3RCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELGlDQUFjLEdBQWQsVUFBZSxJQUFVO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELGdDQUFhLEdBQWIsVUFBYyxJQUFVO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELHNDQUFtQixHQUFuQixVQUFvQixJQUFVO1FBQzFCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELHFDQUFrQixHQUFsQixVQUFtQixJQUFVO1FBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELG9DQUFpQixHQUFqQixVQUFrQixJQUFVO1FBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQTlDRDtRQUFDLFlBQUssRUFBRTs7MkNBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7NENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7MENBQUE7SUFFUjtRQUFDLGFBQU0sQ0FBQyxnQkFBZ0IsQ0FBQzs7eURBQUE7SUFDekI7UUFBQyxhQUFNLENBQUMsZUFBZSxDQUFDOzt3REFBQTtJQUN4QjtRQUFDLGFBQU0sQ0FBQyxjQUFjLENBQUM7O3VEQUFBO0lBbEIzQjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDNUIsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLG9CQUFRLEVBQUUsb0JBQVEsQ0FBQztZQUMxQyxhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtTQUN4QyxDQUFDO21CQWFlLGFBQU0sQ0FBQyxpQkFBVSxDQUFDOztnQkFiakM7SUFtREYsZUFBQztBQUFELENBbERBLEFBa0RDLElBQUE7QUFsRFksZ0JBQVEsV0FrRHBCLENBQUE7QUFFWSw0QkFBb0IsR0FBRyxDQUFFLFFBQVEsRUFBRSxvQkFBUSxFQUFFLG9CQUFRLENBQUUsQ0FBQztBQUt4RCwyQkFBbUIsR0FBRztJQUMvQixJQUFJLGVBQVEsQ0FDUiwwQ0FBdUIsRUFDdkI7UUFDSSxVQUFVO1lBQ04sTUFBTSxDQUFDLElBQUksMENBQXVCLENBQUMsd0JBQWlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUUsQ0FBQztLQUNKLENBQ0o7Q0FDSixDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvdHJlZS12aWV3L3RyZWUtdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWFcbiAqXG4gKiBDcmVhdGVkIGJ5IFNhbCBTYW5maWxpcHBvIDxzc2FuZmlsaXBwb0BwYWNpZmljYmlvc2NpZW5jZXMuY29tPiBvbiAzLzI4LzE2LlxuICovXG5cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBJbmplY3QsXG4gICAgUHJvdmlkZXJcbn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7YXNzZXJ0aW9uc0VuYWJsZWR9IGZyb20gXCJhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmdcIjtcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JHZW5Db25maWd9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb25cIjtcblxuaW1wb3J0IHtUcmVlTm9kZX0gZnJvbSBcIi4vdHJlZS1ub2RlXCI7XG5pbXBvcnQge1RyZWVMZWFmfSBmcm9tIFwiLi90cmVlLWxlYWZcIjtcbmltcG9ydCB7Tm9kZSwgTGVhZn0gZnJvbSBcIi4vbm9kZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwYi10cmVlLXZpZXdcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcInRyZWUtdmlldy5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJ0cmVlLXZpZXcuY3NzXCJdLFxuICAgIGRpcmVjdGl2ZXM6IFtUcmVlVmlldywgVHJlZU5vZGUsIFRyZWVMZWFmXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVWaWV3IHtcbiAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpIG5vZGVzOiBBcnJheTxOb2RlPjtcbiAgICBASW5wdXQoKSBsZWF2ZXM6IEFycmF5PExlYWY+O1xuXG4gICAgQElucHV0KCkgcm9vdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dChcIm5vZGUtY29sbGFwc2VkXCIpIF9ub2RlQ29sbGFwc2VkRXZlbnQ6IEV2ZW50RW1pdHRlcjxOb2RlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KFwibm9kZS1leHBhbmRlZFwiKSBfbm9kZUV4cGFuZGVkRXZlbnQ6IEV2ZW50RW1pdHRlcjxOb2RlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KFwibGVhZi1jbGlja2VkXCIpIF9sZWFmQ2xpY2tlZEV2ZW50OiBFdmVudEVtaXR0ZXI8TGVhZj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KEVsZW1lbnRSZWYpIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuX2VsID0gZWw7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvb3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInR2LXJvb3RcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsaWNrKG5vZGU6IE5vZGUsICRldmVudCkge1xuICAgICAgICBub2RlLmNoZWNrKCk7XG4gICAgICAgICRldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uTm9kZUNvbGxhcHNlZChub2RlOiBOb2RlKSB7XG4gICAgICAgIHRoaXMuX25vZGVDb2xsYXBzZWRFdmVudC5lbWl0KG5vZGUpO1xuICAgIH1cblxuICAgIG9uTm9kZUV4cGFuZGVkKG5vZGU6IE5vZGUpIHtcbiAgICAgICAgdGhpcy5fbm9kZUV4cGFuZGVkRXZlbnQuZW1pdChub2RlKTtcbiAgICB9XG5cbiAgICBvbkxlYWZDbGlja2VkKGxlYWY6IExlYWYpIHtcbiAgICAgICAgdGhpcy5fbGVhZkNsaWNrZWRFdmVudC5lbWl0KGxlYWYpO1xuICAgIH1cblxuICAgIGJ1YmJsZU5vZGVDb2xsYXBzZWQobm9kZTogTm9kZSkge1xuICAgICAgICB0aGlzLm9uTm9kZUNvbGxhcHNlZChub2RlKTtcbiAgICB9XG5cbiAgICBidWJibGVOb2RlRXhwYW5kZWQobm9kZTogTm9kZSkge1xuICAgICAgICB0aGlzLm9uTm9kZUV4cGFuZGVkKG5vZGUpO1xuICAgIH1cblxuICAgIGJ1YmJsZUxlYWZDbGlja2VkKGxlYWY6IExlYWYpIHtcbiAgICAgICAgdGhpcy5vbkxlYWZDbGlja2VkKGxlYWYpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IFRSRUVfVklFV19ESVJFQ1RJVkVTID0gWyBUcmVlVmlldywgVHJlZU5vZGUsIFRyZWVMZWFmIF07XG5cbi8vIFRPRE8oc3NhbmZpbGlwcG8pOiBUaGUgZm9sbG93aW5nIG5lZWRzIHRvIGJlIGFkZGVkIHRvIHRoZSBhcHBsaWNhdGlvblxuLy8gYm9vdHN0cmFwIGFycmF5IGZvciBhcHBsaWNhdGlvbnMgdGhhdCB1c2UgdGhlIHRyZWUgdmlld1xuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzcwMzdcbmV4cG9ydCBjb25zdCBUUkVFX1ZJRVdfUFJPVklERVJTID0gW1xuICAgIG5ldyBQcm92aWRlcihcbiAgICAgICAgQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVzZUZhY3RvcnkoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZyhhc3NlcnRpb25zRW5hYmxlZCgpLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKVxuXTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==