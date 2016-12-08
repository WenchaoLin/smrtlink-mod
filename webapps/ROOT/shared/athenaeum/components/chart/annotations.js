"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var charts_1 = require("./charts");
(function (AnnotationType) {
    AnnotationType[AnnotationType["Line"] = 0] = "Line";
    AnnotationType[AnnotationType["VerticalLine"] = 1] = "VerticalLine";
    AnnotationType[AnnotationType["HorizontalLine"] = 2] = "HorizontalLine";
    AnnotationType[AnnotationType["Point"] = 3] = "Point";
    AnnotationType[AnnotationType["Rectangle"] = 4] = "Rectangle";
    AnnotationType[AnnotationType["Text"] = 5] = "Text";
})(exports.AnnotationType || (exports.AnnotationType = {}));
var AnnotationType = exports.AnnotationType;
var Align = (function () {
    function Align(align) {
        this.align = align;
    }
    Align.prototype.toString = function () {
        return this.align;
    };
    Object.defineProperty(Align, "left", {
        get: function () {
            return this._left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Align, "right", {
        get: function () {
            return this._right;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Align, "center", {
        get: function () {
            return this._center;
        },
        enumerable: true,
        configurable: true
    });
    Align._left = new Align("left");
    Align._right = new Align("right");
    Align._center = new Align("center");
    return Align;
}());
exports.Align = Align;
var Baseline = (function () {
    function Baseline(baseline) {
        this.baseline = baseline;
    }
    Baseline.prototype.toString = function () {
        return this.baseline;
    };
    Object.defineProperty(Baseline, "top", {
        get: function () {
            return this._top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Baseline, "bottom", {
        get: function () {
            return this._bottom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Baseline, "middle", {
        get: function () {
            return this._middle;
        },
        enumerable: true,
        configurable: true
    });
    Baseline._top = new Baseline("top");
    Baseline._bottom = new Baseline("bottom");
    Baseline._middle = new Baseline("middle");
    return Baseline;
}());
exports.Baseline = Baseline;
var Annotation = (function () {
    function Annotation(annoObj) {
        this.type = annoObj.type;
        for (var prop in annoObj) {
            if (annoObj.hasOwnProperty(prop)) {
                this[prop] = annoObj[prop];
            }
        }
    }
    Annotation.Create = function (annoObj) {
        switch (annoObj.type) {
            case AnnotationType.Line:
                return new LineAnnotation(annoObj);
            case AnnotationType.VerticalLine:
                return new VerticalLineAnnotation(annoObj);
            case AnnotationType.HorizontalLine:
                return new HorizontalLineAnnotation(annoObj);
            case AnnotationType.Point:
                return new PointAnnotation(annoObj);
            case AnnotationType.Rectangle:
                return new RectAnnotation(annoObj);
            case AnnotationType.Text:
                return new TextAnnotation(annoObj);
            default:
                throw "unknown annotation type";
        }
    };
    return Annotation;
}());
exports.Annotation = Annotation;
var AbstractLinedAnnotation = (function (_super) {
    __extends(AbstractLinedAnnotation, _super);
    function AbstractLinedAnnotation(annoObj) {
        _super.call(this, annoObj);
        this.color = this.color ? this.color : "black";
    }
    return AbstractLinedAnnotation;
}(Annotation));
exports.AbstractLinedAnnotation = AbstractLinedAnnotation;
var LineAnnotation = (function (_super) {
    __extends(LineAnnotation, _super);
    function LineAnnotation(annoObj) {
        if (annoObj === void 0) { annoObj = null; }
        _super.call(this, annoObj != null ? annoObj : { type: AnnotationType.Line });
        this.pt1 = this.pt1 ? this.pt1 : { "x": 0, "y": 0 };
        this.pt2 = this.pt2 ? this.pt2 : { "x": 0, "y": 0 };
    }
    return LineAnnotation;
}(AbstractLinedAnnotation));
exports.LineAnnotation = LineAnnotation;
var VerticalLineAnnotation = (function (_super) {
    __extends(VerticalLineAnnotation, _super);
    function VerticalLineAnnotation(annoObj) {
        if (annoObj === void 0) { annoObj = null; }
        _super.call(this, annoObj != null ? annoObj : { type: AnnotationType.VerticalLine });
        this.x = this.x ? this.x : 0;
    }
    return VerticalLineAnnotation;
}(AbstractLinedAnnotation));
exports.VerticalLineAnnotation = VerticalLineAnnotation;
var HorizontalLineAnnotation = (function (_super) {
    __extends(HorizontalLineAnnotation, _super);
    function HorizontalLineAnnotation(annoObj) {
        if (annoObj === void 0) { annoObj = null; }
        _super.call(this, annoObj != null ? annoObj : { type: AnnotationType.HorizontalLine });
        this.y = this.y ? this.y : 0;
    }
    return HorizontalLineAnnotation;
}(AbstractLinedAnnotation));
exports.HorizontalLineAnnotation = HorizontalLineAnnotation;
var PointAnnotation = (function (_super) {
    __extends(PointAnnotation, _super);
    function PointAnnotation(annoObj) {
        if (annoObj === void 0) { annoObj = null; }
        _super.call(this, annoObj != null ? annoObj : { type: AnnotationType.Point });
        this.location = this.location ? this.location : { "x": 0, "y": 0 };
    }
    return PointAnnotation;
}(AbstractLinedAnnotation));
exports.PointAnnotation = PointAnnotation;
var RectAnnotation = (function (_super) {
    __extends(RectAnnotation, _super);
    function RectAnnotation(annoObj) {
        if (annoObj === void 0) { annoObj = null; }
        _super.call(this, annoObj != null ? annoObj : { type: AnnotationType.Rectangle });
        this.location = this.location ? this.location : { "x": 0, "y": 0 };
        this.size = this.size ? this.size : { "width": 0, "height": 0 };
    }
    return RectAnnotation;
}(AbstractLinedAnnotation));
exports.RectAnnotation = RectAnnotation;
var TextAnnotation = (function (_super) {
    __extends(TextAnnotation, _super);
    function TextAnnotation(annoObj) {
        if (annoObj === void 0) { annoObj = null; }
        _super.call(this, annoObj != null ? annoObj : { type: AnnotationType.Text });
        this.location = this.location ? this.location : { x: 0, y: 0 };
        this.offsetpixels = this.offsetpixels ? this.offsetpixels : { x: 0, y: 0 };
        this.fill = this.fill ? this.fill : "black";
        this.font = charts_1.ChartDefaultSettings.getFontWithDefaults(this.font, charts_1.ChartDefaultSettings.annotationFont);
        this.angle = this.angle ? this.angle : 0;
    }
    return TextAnnotation;
}(Annotation));
exports.TextAnnotation = TextAnnotation;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2hhcnQvYW5ub3RhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUEsdUJBQW1DLFVBQVUsQ0FBQyxDQUFBO0FBSzlDLFdBQVksY0FBYztJQUN0QixtREFBSSxDQUFBO0lBQUUsbUVBQVksQ0FBQTtJQUFFLHVFQUFjLENBQUE7SUFBRSxxREFBSyxDQUFBO0lBQUUsNkRBQVMsQ0FBQTtJQUFFLG1EQUFJLENBQUE7QUFDOUQsQ0FBQyxFQUZXLHNCQUFjLEtBQWQsc0JBQWMsUUFFekI7QUFGRCxJQUFZLGNBQWMsR0FBZCxzQkFFWCxDQUFBO0FBRUQ7SUFHSSxlQUFZLEtBQWE7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVNLHdCQUFRLEdBQWY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsc0JBQVcsYUFBSTthQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyxjQUFLO2FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyxlQUFNO2FBQWpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFUYyxXQUFLLEdBQVUsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFLakMsWUFBTSxHQUFVLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBS25DLGFBQU8sR0FBVSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RCxZQUFDO0FBQUQsQ0F6QkEsQUF5QkMsSUFBQTtBQXpCWSxhQUFLLFFBeUJqQixDQUFBO0FBRUQ7SUFHSSxrQkFBWSxRQUFnQjtRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FB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QUFFLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRWpFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFFL0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUUzRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRSxPQUFPLENBQUM7UUFFM0MsSUFBSSxDQUFDLElBQUksR0FBRyw2QkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLDZCQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRXJHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBV0wscUJBQUM7QUFBRCxDQXhCQSxBQXdCQyxDQXhCbUMsVUFBVSxHQXdCN0M7QUF4Qlksc0JBQWMsaUJBd0IxQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvY2hhcnQvYW5ub3RhdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWV3YW4gb24gMy80LzIwMTYuXG4gKi9cbmltcG9ydCB7Rm9udCwgUG9pbnQsIFNpemUsIE9mZnNldH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7Q2hhcnREZWZhdWx0U2V0dGluZ3N9IGZyb20gXCIuL2NoYXJ0c1wiO1xuXG4vKipcbiAqIEFubm90YXRpb24gdHlwZXNcbiAqL1xuZXhwb3J0IGVudW0gQW5ub3RhdGlvblR5cGUge1xuICAgIExpbmUsIFZlcnRpY2FsTGluZSwgSG9yaXpvbnRhbExpbmUsIFBvaW50LCBSZWN0YW5nbGUsIFRleHRcbn1cblxuZXhwb3J0IGNsYXNzIEFsaWduIHtcbiAgICBwcml2YXRlIGFsaWduOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihhbGlnbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYWxpZ24gPSBhbGlnbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxpZ247XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBsZWZ0KCk6IEFsaWduIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlZnQ7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIF9sZWZ0OiBBbGlnbiA9IG5ldyBBbGlnbihcImxlZnRcIik7XG5cbiAgICBzdGF0aWMgZ2V0IHJpZ2h0KCk6IEFsaWduIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JpZ2h0O1xuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBfcmlnaHQ6IEFsaWduID0gbmV3IEFsaWduKFwicmlnaHRcIik7XG5cbiAgICBzdGF0aWMgZ2V0IGNlbnRlcigpOiBBbGlnbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZW50ZXI7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIF9jZW50ZXI6IEFsaWduID0gbmV3IEFsaWduKFwiY2VudGVyXCIpO1xufVxuXG5leHBvcnQgY2xhc3MgQmFzZWxpbmUge1xuICAgIHByaXZhdGUgYmFzZWxpbmU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGJhc2VsaW5lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5iYXNlbGluZSA9IGJhc2VsaW5lO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlbGluZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHRvcCgpOiBCYXNlbGluZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b3A7XG4gICAgfVxuICAgIHByaXZhdGUgc3RhdGljIF90b3A6IEJhc2VsaW5lID0gbmV3IEJhc2VsaW5lKFwidG9wXCIpO1xuXG4gICAgc3RhdGljIGdldCBib3R0b20oKTogQmFzZWxpbmUge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm90dG9tO1xuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBfYm90dG9tOiBCYXNlbGluZSA9IG5ldyBCYXNlbGluZShcImJvdHRvbVwiKTtcblxuICAgIHN0YXRpYyBnZXQgbWlkZGxlKCk6IEJhc2VsaW5lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pZGRsZTtcbiAgICB9XG4gICAgcHJpdmF0ZSBzdGF0aWMgX21pZGRsZTogQmFzZWxpbmUgPSBuZXcgQmFzZWxpbmUoXCJtaWRkbGVcIik7XG59XG5cblxuLyoqXG4gKiBBbm5vdGF0aW9uIGRlZmluaXRpb24gYXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUFubm90YXRpb24ge1xuICAgIC8vIGFubm90YXRpb24gdHlwZSAoTGluZSwgVmVydGljYWxMaW5lLCBIb3Jpem9udGFsTGluZSwgUG9pbnQsIFJlY3RhbmdsZSwgVGV4dClcbiAgICB0eXBlOiBBbm5vdGF0aW9uVHlwZTtcblxuICAgIC8vIGxpbmUgZHJhd2luZyBzZXR0aW5ncyBmb3IgYWxsIGxpbmVzIChpbmNsdWRpbmcgcG9pbnQgYW5kIHJlY3RhbmdsZSBvdXRsaW5lcylcbiAgICBjb2xvcj86IHN0cmluZztcbiAgICBsaW5ld2lkdGg/OiBudW1iZXI7XG4gICAgb3BhY2l0eT86IG51bWJlcjtcblxuICAgIC8vIGxpbmUgZW5kcG9pbnRzXG4gICAgcHQxPzogUG9pbnQ7XG4gICAgcHQyPzogUG9pbnQ7XG5cbiAgICAvLyB2ZXJ0aWNhbCBsaW5lIHggcG9zaXRpb25cbiAgICB4PzogbnVtYmVyO1xuXG4gICAgLy8gaG9yaXpvbnRhbCBsaW5lIHkgcG9zaXRpb25cbiAgICB5PzogbnVtYmVyO1xuXG4gICAgLy8gbG9jYXRpb24gZm9yIHBvaW50LCByZWN0YW5nbGUsIGFuZCB0ZXh0XG4gICAgbG9jYXRpb24/OiBQb2ludDtcblxuICAgIC8vIHBvaW50IG1hcmtlciBzaXplXG4gICAgbWFya2Vyc2l6ZT86IG51bWJlcjtcblxuICAgIC8vIHBvaW50LCByZWN0YW5nbGUgYW5kIHRleHQgZmlsbCBzZXR0aW5nc1xuICAgIGZpbGw/OiBzdHJpbmc7XG4gICAgZmlsbG9wYWNpdHk/OiBudW1iZXI7XG5cbiAgICAvLyByZWN0YW5nbGUgc2l6ZVxuICAgIHNpemU/OiBTaXplO1xuXG4gICAgLy8gdGV4dCBhbm5vdGF0aW9uIHNldHRpbmdzXG4gICAgdGV4dD86IHN0cmluZztcbiAgICBmb250PzogRm9udDtcbiAgICBhbGlnbj86IEFsaWduOyAgICAgICAgICAvLyBsZWZ0LCByaWdodCBvciBjZW50ZXJcbiAgICBiYXNlbGluZT86IEJhc2VsaW5lOyAgICAgICAvLyB0b3AsIGJvdHRvbSBvciBtaWRkbGVcbiAgICBhbmdsZT86IG51bWJlcjsgICAgICAgICAgLy8gaW4gZGVncmVlc1xuICAgIG9mZnNldHBpeGVscz86IE9mZnNldDsgICAgLy8gb2Zmc2V0IGluIHBpeGVscyBmcm9tIGxvY2F0aW9uXG59XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgY2hhcnQgYW5ub3RhdGlvbnNcbiAqL1xuZXhwb3J0IGNsYXNzIEFubm90YXRpb24gaW1wbGVtZW50cyBJQW5ub3RhdGlvbiB7XG4gICAgcHVibGljIHR5cGU6IEFubm90YXRpb25UeXBlO1xuXG4gICAgY29uc3RydWN0b3IoYW5ub09iajogSUFubm90YXRpb24pIHtcbiAgICAgICAgdGhpcy50eXBlID0gYW5ub09iai50eXBlO1xuXG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gYW5ub09iaikge1xuICAgICAgICAgICAgaWYgKGFubm9PYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzW3Byb3BdID0gYW5ub09ialtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBDcmVhdGUoYW5ub09iajogSUFubm90YXRpb24pOiBBbm5vdGF0aW9uIHtcbiAgICAgICAgc3dpdGNoKGFubm9PYmoudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBBbm5vdGF0aW9uVHlwZS5MaW5lOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTGluZUFubm90YXRpb24oYW5ub09iaik7XG4gICAgICAgICAgICBjYXNlIEFubm90YXRpb25UeXBlLlZlcnRpY2FsTGluZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZlcnRpY2FsTGluZUFubm90YXRpb24oYW5ub09iaik7XG4gICAgICAgICAgICBjYXNlIEFubm90YXRpb25UeXBlLkhvcml6b250YWxMaW5lOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSG9yaXpvbnRhbExpbmVBbm5vdGF0aW9uKGFubm9PYmopO1xuICAgICAgICAgICAgY2FzZSBBbm5vdGF0aW9uVHlwZS5Qb2ludDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFBvaW50QW5ub3RhdGlvbihhbm5vT2JqKTtcbiAgICAgICAgICAgIGNhc2UgQW5ub3RhdGlvblR5cGUuUmVjdGFuZ2xlOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVjdEFubm90YXRpb24oYW5ub09iaik7XG4gICAgICAgICAgICBjYXNlIEFubm90YXRpb25UeXBlLlRleHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBUZXh0QW5ub3RhdGlvbihhbm5vT2JqKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJ1bmtub3duIGFubm90YXRpb24gdHlwZVwiO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEFic3RyYWN0IExpbmUgQW5ub3RhdGlvbjogZm9yIGFubm90YXRpb25zIHRoYXQgaW52b2x2ZSBkcmF3aW5nIGxpbmVzXG4gKi9cbmV4cG9ydCBjbGFzcyBBYnN0cmFjdExpbmVkQW5ub3RhdGlvbiBleHRlbmRzIEFubm90YXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGFubm9PYmo6IElBbm5vdGF0aW9uKSB7XG4gICAgICAgIHN1cGVyKGFubm9PYmopO1xuXG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmNvbG9yID8gdGhpcy5jb2xvciA6IFwiYmxhY2tcIjtcbiAgICB9XG5cbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIGxpbmV3aWR0aDogbnVtYmVyO1xuICAgIG9wYWNpdHk6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBMaW5lIEFubm90YXRpb246IHRvIGRyYXcgYSBsaW5lIGJldHdlZW4gMiBzcGVjaWZpZWQgcG9pbnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBMaW5lQW5ub3RhdGlvbiBleHRlbmRzIEFic3RyYWN0TGluZWRBbm5vdGF0aW9uIHtcbiAgICBjb25zdHJ1Y3Rvcihhbm5vT2JqOiBJQW5ub3RhdGlvbiA9IG51bGwpIHtcbiAgICAgICAgc3VwZXIoYW5ub09iaiAhPSBudWxsID8gYW5ub09iaiA6IHsgdHlwZTogQW5ub3RhdGlvblR5cGUuTGluZSB9KTtcblxuICAgICAgICB0aGlzLnB0MSA9IHRoaXMucHQxID8gdGhpcy5wdDEgOiB7IFwieFwiOiAwLCBcInlcIjogMCB9O1xuICAgICAgICB0aGlzLnB0MiA9IHRoaXMucHQyID8gdGhpcy5wdDIgOiB7IFwieFwiOiAwLCBcInlcIjogMCB9O1xuICAgIH1cblxuICAgIHB0MTogUG9pbnQ7XG4gICAgcHQyOiBQb2ludDtcbn1cblxuLyoqXG4gKiBWZXJ0aWNhbCBMaW5lIEFubm90YXRpb246IHRvIGRyYXcgYSB2ZXJ0aWNhbCBsaW5lIG9uIGNoYXJ0IGF0IGEgc3BlY2lmaWVkIHggcG9zaXRpb25cbiAqL1xuZXhwb3J0IGNsYXNzIFZlcnRpY2FsTGluZUFubm90YXRpb24gZXh0ZW5kcyBBYnN0cmFjdExpbmVkQW5ub3RhdGlvbiB7XG4gICAgY29uc3RydWN0b3IoYW5ub09iajogSUFubm90YXRpb24gPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKGFubm9PYmogIT0gbnVsbCA/IGFubm9PYmogOiB7IHR5cGU6IEFubm90YXRpb25UeXBlLlZlcnRpY2FsTGluZSB9KTtcblxuICAgICAgICB0aGlzLnggPSB0aGlzLnggPyB0aGlzLnggOiAwO1xuICAgIH1cblxuICAgIHg6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBIb3Jpem9udGFsIExpbmUgQW5ub3RhdGlvbjogdG8gZHJhdyBhIHZlcnRpY2FsIGxpbmUgb24gY2hhcnQgYXQgYSBzcGVjaWZpZWQgeSBwb3NpdGlvblxuICovXG5leHBvcnQgY2xhc3MgSG9yaXpvbnRhbExpbmVBbm5vdGF0aW9uIGV4dGVuZHMgQWJzdHJhY3RMaW5lZEFubm90YXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGFubm9PYmo6IElBbm5vdGF0aW9uID0gbnVsbCkge1xuICAgICAgICBzdXBlcihhbm5vT2JqICE9IG51bGwgPyBhbm5vT2JqIDogeyB0eXBlOiBBbm5vdGF0aW9uVHlwZS5Ib3Jpem9udGFsTGluZSB9KTtcblxuICAgICAgICB0aGlzLnkgPSB0aGlzLnkgPyB0aGlzLnkgOiAwO1xuICAgIH1cblxuICAgIHk6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBQb2ludCBBbm5vdGF0aW9uOiBUbyBkcmF3IGEgcG9pbnQgKGZpbGxlZCBjaXJjbGUpIGF0IGEgc3BlY2lmaWVkIGxvY2F0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBQb2ludEFubm90YXRpb24gZXh0ZW5kcyBBYnN0cmFjdExpbmVkQW5ub3RhdGlvbiB7XG4gICAgY29uc3RydWN0b3IoYW5ub09iajogSUFubm90YXRpb24gPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKGFubm9PYmogIT0gbnVsbCA/IGFubm9PYmogOiB7IHR5cGU6IEFubm90YXRpb25UeXBlLlBvaW50IH0pO1xuXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSB0aGlzLmxvY2F0aW9uID8gdGhpcy5sb2NhdGlvbiA6IHsgXCJ4XCI6IDAsIFwieVwiOiAwIH07XG4gICAgfVxuXG4gICAgbG9jYXRpb246IFBvaW50O1xuICAgIG1hcmtlcnNpemU6IG51bWJlcjtcbiAgICBmaWxsOiBzdHJpbmc7XG4gICAgZmlsbG9wYWNpdHk6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBSZWN0YW5nbGUgQW5ub3RhdGlvbjogIFRvIGRyYXcgYSByZWN0YW5nbGUgb2Ygc3BlY2lmaWVkIGxvY2F0aW9uIGFuZCBzaXplXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWN0QW5ub3RhdGlvbiBleHRlbmRzIEFic3RyYWN0TGluZWRBbm5vdGF0aW9uIHtcbiAgICBjb25zdHJ1Y3Rvcihhbm5vT2JqOiBJQW5ub3RhdGlvbiA9IG51bGwpIHtcbiAgICAgICAgc3VwZXIoYW5ub09iaiAhPSBudWxsID8gYW5ub09iaiA6IHsgdHlwZTogQW5ub3RhdGlvblR5cGUuUmVjdGFuZ2xlIH0pO1xuXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSB0aGlzLmxvY2F0aW9uID8gdGhpcy5sb2NhdGlvbiA6IHsgXCJ4XCI6IDAsIFwieVwiOiAwIH07XG5cbiAgICAgICAgdGhpcy5zaXplID0gdGhpcy5zaXplID8gdGhpcy5zaXplIDogeyBcIndpZHRoXCI6IDAsIFwiaGVpZ2h0XCI6IDAgfTtcbiAgICB9XG5cbiAgICBsb2NhdGlvbjogUG9pbnQ7XG4gICAgc2l6ZTogU2l6ZTtcbiAgICBmaWxsOiBzdHJpbmc7XG4gICAgZmlsbG9wYWNpdHk6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBUZXh0IEFubm90YXRpb246IFRvIGRyYXcgdGV4dCBhdCBzcGVjaWZpZWQgbG9jYXRpb25cbiAqL1xuZXhwb3J0IGNsYXNzIFRleHRBbm5vdGF0aW9uIGV4dGVuZHMgQW5ub3RhdGlvbiB7XG4gICAgY29uc3RydWN0b3IoYW5ub09iajogSUFubm90YXRpb24gPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKGFubm9PYmogIT0gbnVsbCA/IGFubm9PYmogOiB7IHR5cGU6IEFubm90YXRpb25UeXBlLlRleHQgfSk7XG5cbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IHRoaXMubG9jYXRpb24gPyB0aGlzLmxvY2F0aW9uIDogeyB4OiAwLCB5OiAwIH07XG5cbiAgICAgICAgdGhpcy5vZmZzZXRwaXhlbHMgPSB0aGlzLm9mZnNldHBpeGVscyA/IHRoaXMub2Zmc2V0cGl4ZWxzIDogeyB4OiAwLCB5OiAwIH07XG5cbiAgICAgICAgdGhpcy5maWxsID0gdGhpcy5maWxsID8gdGhpcy5maWxsOiBcImJsYWNrXCI7XG5cbiAgICAgICAgdGhpcy5mb250ID0gQ2hhcnREZWZhdWx0U2V0dGluZ3MuZ2V0Rm9udFdpdGhEZWZhdWx0cyh0aGlzLmZvbnQsIENoYXJ0RGVmYXVsdFNldHRpbmdzLmFubm90YXRpb25Gb250KTtcblxuICAgICAgICB0aGlzLmFuZ2xlID0gdGhpcy5hbmdsZSA/IHRoaXMuYW5nbGUgOiAwO1xuICAgIH1cblxuICAgIHRleHQ6IHN0cmluZztcbiAgICBmb250OiBGb250O1xuICAgIGFsaWduOiBBbGlnbjsgICAgICAgICAgLy8gbGVmdCwgcmlnaHQgb3IgY2VudGVyXG4gICAgYmFzZWxpbmU6IEJhc2VsaW5lOyAgICAgICAvLyB0b3AsIGJvdHRvbSBvciBtaWRkbGVcbiAgICBhbmdsZTogbnVtYmVyOyAgICAgICAgICAvLyBpbiBkZWdyZWVzXG4gICAgbG9jYXRpb246IFBvaW50OyAgICAgICAgLy8gbG9jYXRpb24gaW4gZG9tYWluIHNwYWNlXG4gICAgb2Zmc2V0cGl4ZWxzOiBPZmZzZXQ7ICAgIC8vIG9mZnNldCBpbiBwaXhlbHNcbiAgICBmaWxsOiBzdHJpbmc7XG4gICAgZmlsbG9wYWNpdHk6IG51bWJlcjtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==