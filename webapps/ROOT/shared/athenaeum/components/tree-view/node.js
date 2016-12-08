"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Node = (function () {
    function Node(data, nodes, leaves) {
        this.data = data;
        this.nodes = nodes;
        this.leaves = leaves;
        this.expanded = this.data.loaded;
        this.checked = false;
    }
    Node.prototype.toggle = function () {
        var _this = this;
        this.expanded = !this.expanded;
        if (this.expanded) {
            if (!this.isLoading && this.data.lazyLoaded && !this.data.loaded) {
                this.isLoading = true;
                if (this.data.fetch) {
                    this.data
                        .fetch(this)
                        .then(function (_) {
                        _this.isLoading = false;
                    })
                        .catch(function (err) {
                        _this.isLoading = false;
                    });
                }
            }
        }
    };
    Node.prototype.check = function () {
        var newState = !this.checked;
        this.checked = newState;
        this.checkRecursive(newState);
    };
    Node.prototype.checkRecursive = function (state) {
        this.nodes
            .forEach(function (n) {
            n.checked = state;
            n.checkRecursive(state);
        });
    };
    Node.prototype.toString = function () {
        return this.data.text;
    };
    return Node;
}());
exports.Node = Node;
var RootNode = (function (_super) {
    __extends(RootNode, _super);
    function RootNode(root) {
        _super.call(this, { path: "root://", text: String.EMPTY, lazyLoaded: false, loaded: true }, [root], []);
        root.data.loaded = true;
        root.expanded = true;
    }
    Object.defineProperty(RootNode.prototype, "isRoot", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RootNode.prototype, "rootNode", {
        get: function () {
            return this.nodes[0];
        },
        enumerable: true,
        configurable: true
    });
    return RootNode;
}(Node));
exports.RootNode = RootNode;
var Leaf = (function () {
    function Leaf(data) {
        this.data = data;
    }
    Leaf.prototype.toString = function () {
        return this.data.text;
    };
    return Leaf;
}());
exports.Leaf = Leaf;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdHJlZS12aWV3L25vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBbUJBO0lBVUksY0FBWSxJQUFjLEVBQUUsS0FBbUIsRUFBRSxNQUFvQjtRQUNqRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFTSxxQkFBTSxHQUFiO1FBQUEsaUJBcUJDO1FBcEJHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRS9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBRXRCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLElBQUk7eUJBQ0osS0FBSyxDQUFDLElBQUksQ0FBQzt5QkFDWCxJQUFJLENBQUMsVUFBQyxDQUFDO3dCQUNKLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUMzQixDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDLFVBQUEsR0FBRzt3QkFDTixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFHM0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVNLG9CQUFLLEdBQVo7UUFDSSxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sNkJBQWMsR0FBckIsVUFBc0IsS0FBSztRQUN2QixJQUFJLENBQUMsS0FBSzthQUNMLE9BQU8sQ0FBQyxVQUFDLENBQU87WUFDYixDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNsQixDQUFDLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQUVNLHVCQUFRLEdBQWY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQTNEQSxBQTJEQyxJQUFBO0FBM0RZLFlBQUksT0EyRGhCLENBQUE7QUFFRDtJQUE4Qiw0QkFBSTtJQUM5QixrQkFBWSxJQUFVO1FBQ2xCLGtCQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFFLElBQUksQ0FBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTlGLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRUQsc0JBQVcsNEJBQU07YUFBakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsOEJBQVE7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUNMLGVBQUM7QUFBRCxDQWZBLEFBZUMsQ0FmNkIsSUFBSSxHQWVqQztBQWZZLGdCQUFRLFdBZXBCLENBQUE7QUFFRDtJQUdJLGNBQVksSUFBYztRQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRU0sdUJBQVEsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0lBQ0wsV0FBQztBQUFELENBVkEsQUFVQyxJQUFBO0FBVlksWUFBSSxPQVVoQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvdHJlZS12aWV3L25vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhXG4gKlxuICogQ3JlYXRlZCBieSBTYWwgU2FuZmlsaXBwbyA8c3NhbmZpbGlwcG9AcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbT4gb24gMy8yOC8xNi5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vZGVEYXRhIHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgdGV4dDogc3RyaW5nO1xuICAgIGxhenlMb2FkZWQ6IGJvb2xlYW47XG4gICAgbG9hZGVkOiBib29sZWFuO1xuICAgIGZldGNoPzogeyhub2RlOiBOb2RlKTogUHJvbWlzZTxhbnk+IH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGVhZkRhdGEge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICB0ZXh0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBOb2RlIHtcbiAgICBwdWJsaWMgZGF0YTogTm9kZURhdGE7XG4gICAgcHVibGljIG5vZGVzOiBBcnJheTxOb2RlPjtcbiAgICBwdWJsaWMgbGVhdmVzOiBBcnJheTxMZWFmPjtcblxuICAgIHB1YmxpYyBleHBhbmRlZDogYm9vbGVhbjtcbiAgICBwdWJsaWMgY2hlY2tlZDogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBpc0xvYWRpbmc6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBOb2RlRGF0YSwgbm9kZXM/OiBBcnJheTxOb2RlPiwgbGVhdmVzPzogQXJyYXk8TGVhZj4pIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5ub2RlcyA9IG5vZGVzO1xuICAgICAgICB0aGlzLmxlYXZlcyA9IGxlYXZlcztcblxuICAgICAgICB0aGlzLmV4cGFuZGVkID0gdGhpcy5kYXRhLmxvYWRlZDtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuXG4gICAgICAgIGlmICh0aGlzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNMb2FkaW5nICYmIHRoaXMuZGF0YS5sYXp5TG9hZGVkICYmICF0aGlzLmRhdGEubG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5mZXRjaCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mZXRjaCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKF8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByYWlzZSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjaGVjaygpIHtcbiAgICAgICAgbGV0IG5ld1N0YXRlID0gIXRoaXMuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gbmV3U3RhdGU7XG4gICAgICAgIHRoaXMuY2hlY2tSZWN1cnNpdmUobmV3U3RhdGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjaGVja1JlY3Vyc2l2ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLm5vZGVzXG4gICAgICAgICAgICAuZm9yRWFjaCgobjogTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIG4uY2hlY2tlZCA9IHN0YXRlO1xuICAgICAgICAgICAgICAgIG4uY2hlY2tSZWN1cnNpdmUoc3RhdGUpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEudGV4dDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSb290Tm9kZSBleHRlbmRzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKHJvb3Q6IE5vZGUpIHtcbiAgICAgICAgc3VwZXIoeyBwYXRoOiBcInJvb3Q6Ly9cIiwgdGV4dDogU3RyaW5nLkVNUFRZLCBsYXp5TG9hZGVkOiBmYWxzZSwgbG9hZGVkOiB0cnVlIH0sIFsgcm9vdCBdLCBbXSk7XG5cbiAgICAgICAgcm9vdC5kYXRhLmxvYWRlZCA9IHRydWU7XG4gICAgICAgIHJvb3QuZXhwYW5kZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNSb290KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJvb3ROb2RlKCk6IE5vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlc1swXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMZWFmIHtcbiAgICBwdWJsaWMgZGF0YTogTGVhZkRhdGE7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBMZWFmRGF0YSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS50ZXh0O1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==