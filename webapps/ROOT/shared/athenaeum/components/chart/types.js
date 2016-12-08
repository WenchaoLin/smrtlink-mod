"use strict";
var FontWeight = (function () {
    function FontWeight(weight) {
        this.weight = weight;
    }
    FontWeight.prototype.toString = function () {
        return this.weight;
    };
    Object.defineProperty(FontWeight, "normal", {
        get: function () {
            return this._normal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontWeight, "bold", {
        get: function () {
            return this._bold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontWeight, "bolder", {
        get: function () {
            return this._bolder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontWeight, "lighter", {
        get: function () {
            return this._lighter;
        },
        enumerable: true,
        configurable: true
    });
    FontWeight._normal = new FontWeight("normal");
    FontWeight._bold = new FontWeight("bold");
    FontWeight._bolder = new FontWeight("bolder");
    FontWeight._lighter = new FontWeight("lighter");
    return FontWeight;
}());
exports.FontWeight = FontWeight;
var FontStyle = (function () {
    function FontStyle(style) {
        this.style = style;
    }
    FontStyle.prototype.toString = function () {
        return this.style;
    };
    Object.defineProperty(FontStyle, "normal", {
        get: function () {
            return this._normal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontStyle, "italic", {
        get: function () {
            return this._italic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FontStyle, "oblique", {
        get: function () {
            return this._oblique;
        },
        enumerable: true,
        configurable: true
    });
    FontStyle._normal = new FontStyle("normal");
    FontStyle._italic = new FontStyle("italic");
    FontStyle._oblique = new FontStyle("oblique");
    return FontStyle;
}());
exports.FontStyle = FontStyle;
var Shape = (function () {
    function Shape(shape) {
        this.shape = shape;
    }
    Shape.prototype.toString = function () {
        return this.shape;
    };
    Object.defineProperty(Shape, "circle", {
        get: function () {
            return this._circle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape, "square", {
        get: function () {
            return this._square;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape, "cross", {
        get: function () {
            return this._cross;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape, "diamond", {
        get: function () {
            return this._diamond;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape, "triangleup", {
        get: function () {
            return this._triangleup;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape, "triangledown", {
        get: function () {
            return this._triangledown;
        },
        enumerable: true,
        configurable: true
    });
    Shape._circle = new Shape("circle");
    Shape._square = new Shape("square");
    Shape._cross = new Shape("cross");
    Shape._diamond = new Shape("diamond");
    Shape._triangleup = new Shape("triangle-up");
    Shape._triangledown = new Shape("triangle-down");
    return Shape;
}());
exports.Shape = Shape;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2hhcnQvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQWlHQTtJQUdJLG9CQUFZLE1BQWM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVNLDZCQUFRLEdBQWY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsc0JBQWtCLG9CQUFNO2FBQXhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBa0Isa0JBQUk7YUFBdEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUdELHNCQUFrQixvQkFBTTthQUF4QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBR0Qsc0JBQWtCLHFCQUFPO2FBQXpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFkYyxrQkFBTyxHQUFlLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBSy9DLGdCQUFLLEdBQWUsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFLM0Msa0JBQU8sR0FBZSxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUsvQyxtQkFBUSxHQUFlLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BFLGlCQUFDO0FBQUQsQ0E5QkEsQUE4QkMsSUFBQTtBQTlCWSxrQkFBVSxhQThCdEIsQ0FBQTtBQUVEO0lBR0ksbUJBQVksS0FBYTtRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRU0sNEJBQVEsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxzQkFBa0IsbUJBQU07YUFBeEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUdELHNCQUFrQixtQkFBTTthQUF4QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBR0Qsc0JBQWtCLG9CQUFPO2FBQXpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFUYyxpQkFBTyxHQUFjLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBSzdDLGlCQUFPLEdBQWMsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFLN0Msa0JBQVEsR0FBYyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRSxnQkFBQztBQUFELENBekJBLEFBeUJDLElBQUE7QUF6QlksaUJBQVMsWUF5QnJCLENBQUE7QUFFRDtJQUdJLGVBQVksS0FBYTtRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRU0sd0JBQVEsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxzQkFBa0IsZUFBTTthQUF4QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBR0Qsc0JBQWtCLGVBQU07YUFBeEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUdELHNCQUFrQixjQUFLO2FBQXZCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBa0IsZ0JBQU87YUFBekI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUdELHNCQUFrQixtQkFBVTthQUE1QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBR0Qsc0JBQWtCLHFCQUFZO2FBQTlCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUF4QmMsYUFBTyxHQUFVLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBS3JDLGFBQU8sR0FBVSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUtyQyxZQUFNLEdBQVUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFLbkMsY0FBUSxHQUFVLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBS3ZDLGlCQUFXLEdBQVUsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFLOUMsbUJBQWEsR0FBVSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNyRSxZQUFDO0FBQUQsQ0F4Q0EsQUF3Q0MsSUFBQTtBQXhDWSxhQUFLLFFBd0NqQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvY2hhcnQvdHlwZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWV3YW4gb24gMy80LzIwMTYuXG4gKi9cblxuLyoqXG4gKiBEYXRhIGZvciBzaW5nbGUgYmFyIG9mIGEgYmFyIGNoYXJ0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQmFyIHtcbiAgICB2YWx1ZTogbnVtYmVyO1xuICAgIGxhYmVsOiBzdHJpbmc7XG59XG5cbi8qKlxuICogRGlzdHJpYnV0aW9uIGRhdGEgZm9yIGEgaGlzdG9ncmFtXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGlzdHJpYnV0aW9uIHtcbiAgICBiaW5NaW46IG51bWJlcjtcbiAgICBiaW5NYXg6IG51bWJlcjtcbiAgICBiaW5zOiBudW1iZXJbXTtcbn1cblxuLyoqXG4gKiBEaXN0cmlidXRpb24gZGF0YSB3aXRoIGEgbmFtZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5hbWVkRGlzdHJpYnV0aW9uIGV4dGVuZHMgRGlzdHJpYnV0aW9uIHtcbiAgICBuYW1lOiBzdHJpbmc7XG59XG5cbi8qKlxuICogRGF0YSBmb3IgYSBkdWFsIGRpc3RyaWJ1dGlvbnMgKGhpc3RvZ3JhbSkgY2hhcnRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEdWFsRGlzdHJpYnV0aW9ucyB7XG4gICAgZGlzdDE6IE5hbWVkRGlzdHJpYnV0aW9uO1xuICAgIGRpc3QyOiBOYW1lZERpc3RyaWJ1dGlvbjtcbn1cblxuLyoqXG4gKiBEYXRhIGZvciBhIHNpbmdsZSBwbG90IGluIGxpbmUgb3Igc2NhdHRlciBwbG90c1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFBsb3Qge1xuICAgIHBvaW50czogUG9pbnRbXTtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzYzogc3RyaW5nO1xufVxuXG4vKipcbiAqIERhdGEgZm9yIGEgc2luZ2xlIGRpc3RyaWJ1dGlvbiBhbmQgYSBsaW5lIHBsb3RcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEaXN0cmlidXRpb25QbHVzTGluZSB7XG4gICAgZGlzdDogRGlzdHJpYnV0aW9uO1xuICAgIGxpbmU6IFBvaW50W107XG59XG5cbi8qKlxuICogUG9pbnQgKGxvY2F0aW9uKSBpbiAyIGRpbWVuc2lvbmFsIHNwYWNlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUG9pbnQge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG59XG5cbi8qKlxuICogU2l6ZSBpbiAyIGRpbWVuc2lvbmFsIHNwYWNlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2l6ZSB7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBPZmZzZXQgaW4gMiBkaW1lbnNpb25hbCBzcGFjZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIE9mZnNldCB7XG4gICAgeD86IG51bWJlcjtcbiAgICB5PzogbnVtYmVyO1xufVxuXG4vKipcbiAqIFBhZGRpbmcgZGltZW5zaW9uc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFBhZGRpbmcge1xuICAgIHRvcD86bnVtYmVyO1xuICAgIGJvdHRvbT86bnVtYmVyO1xuICAgIGxlZnQ/Om51bWJlcjtcbiAgICByaWdodD86bnVtYmVyO1xufVxuXG4vKipcbiAqIFRleHQgZm9udCBwcm9wZXJ0aWVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRm9udCB7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICBzaXplPzogbnVtYmVyO1xuICAgIHdlaWdodD86IEZvbnRXZWlnaHQ7XG4gICAgc3R5bGU/OiBGb250U3R5bGU7XG59XG5cbmV4cG9ydCBjbGFzcyBGb250V2VpZ2h0IHtcbiAgICBwcml2YXRlIHdlaWdodDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3Iod2VpZ2h0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy53ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLndlaWdodDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBub3JtYWwoKTogRm9udFdlaWdodCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub3JtYWw7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIF9ub3JtYWw6IEZvbnRXZWlnaHQgPSBuZXcgRm9udFdlaWdodChcIm5vcm1hbFwiKTtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGJvbGQoKTogRm9udFdlaWdodCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib2xkO1xuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBfYm9sZDogRm9udFdlaWdodCA9IG5ldyBGb250V2VpZ2h0KFwiYm9sZFwiKTtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGJvbGRlcigpOiBGb250V2VpZ2h0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvbGRlcjtcbiAgICB9XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2JvbGRlcjogRm9udFdlaWdodCA9IG5ldyBGb250V2VpZ2h0KFwiYm9sZGVyXCIpO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgbGlnaHRlcigpOiBGb250V2VpZ2h0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpZ2h0ZXI7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIF9saWdodGVyOiBGb250V2VpZ2h0ID0gbmV3IEZvbnRXZWlnaHQoXCJsaWdodGVyXCIpO1xufVxuXG5leHBvcnQgY2xhc3MgRm9udFN0eWxlIHtcbiAgICBwcml2YXRlIHN0eWxlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihzdHlsZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc3R5bGUgPSBzdHlsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3R5bGU7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgbm9ybWFsKCk6IEZvbnRTdHlsZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub3JtYWw7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIF9ub3JtYWw6IEZvbnRTdHlsZSA9IG5ldyBGb250U3R5bGUoXCJub3JtYWxcIik7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBpdGFsaWMoKTogRm9udFN0eWxlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0YWxpYztcbiAgICB9XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2l0YWxpYzogRm9udFN0eWxlID0gbmV3IEZvbnRTdHlsZShcIml0YWxpY1wiKTtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IG9ibGlxdWUoKTogRm9udFN0eWxlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29ibGlxdWU7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIF9vYmxpcXVlOiBGb250U3R5bGUgPSBuZXcgRm9udFN0eWxlKFwib2JsaXF1ZVwiKTtcbn1cblxuZXhwb3J0IGNsYXNzIFNoYXBlIHtcbiAgICBwcml2YXRlIHNoYXBlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihzaGFwZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcGU7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgY2lyY2xlKCk6IFNoYXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NpcmNsZTtcbiAgICB9XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2NpcmNsZTogU2hhcGUgPSBuZXcgU2hhcGUoXCJjaXJjbGVcIik7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBzcXVhcmUoKTogU2hhcGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3F1YXJlO1xuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBfc3F1YXJlOiBTaGFwZSA9IG5ldyBTaGFwZShcInNxdWFyZVwiKTtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGNyb3NzKCk6IFNoYXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nyb3NzO1xuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBfY3Jvc3M6IFNoYXBlID0gbmV3IFNoYXBlKFwiY3Jvc3NcIik7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBkaWFtb25kKCk6IFNoYXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpYW1vbmQ7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIF9kaWFtb25kOiBTaGFwZSA9IG5ldyBTaGFwZShcImRpYW1vbmRcIik7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCB0cmlhbmdsZXVwKCk6IFNoYXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyaWFuZ2xldXA7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIF90cmlhbmdsZXVwOiBTaGFwZSA9IG5ldyBTaGFwZShcInRyaWFuZ2xlLXVwXCIpO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgdHJpYW5nbGVkb3duKCk6IFNoYXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyaWFuZ2xlZG93bjtcbiAgICB9XG4gICAgcHJpdmF0ZSBzdGF0aWMgX3RyaWFuZ2xlZG93bjogU2hhcGUgPSBuZXcgU2hhcGUoXCJ0cmlhbmdsZS1kb3duXCIpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9