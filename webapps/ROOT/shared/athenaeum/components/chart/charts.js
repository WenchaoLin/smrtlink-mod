"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vega_1 = require("vega");
var parameters_1 = require("./parameters");
var parameters_2 = require("./parameters");
var styles_1 = require("./styles");
var types_1 = require("./types");
var annotations_1 = require("./annotations");
(function (ChartType) {
    ChartType[ChartType["Bar"] = 0] = "Bar";
    ChartType[ChartType["SimpleLine"] = 1] = "SimpleLine";
    ChartType[ChartType["Line"] = 2] = "Line";
    ChartType[ChartType["SimpleScatterPlot"] = 3] = "SimpleScatterPlot";
    ChartType[ChartType["ScatterPlot"] = 4] = "ScatterPlot";
    ChartType[ChartType["Histogram"] = 5] = "Histogram";
    ChartType[ChartType["MultiHistogram"] = 6] = "MultiHistogram";
    ChartType[ChartType["HistogramPlusLine"] = 7] = "HistogramPlusLine";
    ChartType[ChartType["DualHistogram"] = 8] = "DualHistogram";
})(exports.ChartType || (exports.ChartType = {}));
var ChartType = exports.ChartType;
var ChartFactory = (function () {
    function ChartFactory() {
    }
    ChartFactory.MakeChart = function (chartType, axistitles, parameters, style) {
        if (axistitles === void 0) { axistitles = null; }
        if (parameters === void 0) { parameters = null; }
        if (style === void 0) { style = null; }
        var xaxistitle = axistitles != null && axistitles.xaxis ? axistitles.xaxis : null;
        var yaxistitle = axistitles != null && axistitles.yaxis ? axistitles.yaxis : null;
        switch (chartType) {
            case ChartType.Bar:
                return new BarChart(xaxistitle, yaxistitle, new parameters_1.BarChartParameters(parameters), new styles_1.BarChartStyle(style));
            case ChartType.SimpleLine:
                return new SimpleLineChart(xaxistitle, yaxistitle, new parameters_1.SimpleLineChartParameters(parameters), new styles_1.SimpleLineChartStyle(style));
            case ChartType.Line:
                return new MultiLineChart(xaxistitle, yaxistitle, new parameters_1.MultiLineChartParameters(parameters), new styles_1.MultiLineChartStyle(style));
            case ChartType.Histogram:
                return new Histogram(xaxistitle, yaxistitle, new parameters_1.HistogramParameters(parameters), new styles_1.HistogramStyle(style));
            case ChartType.DualHistogram:
                return new DualHistograms(xaxistitle, yaxistitle, new parameters_1.DualHistogramsParameters(parameters), new styles_1.DualHistogramStyle(style));
            case ChartType.MultiHistogram:
                return new MultiHistogram(xaxistitle, yaxistitle, new parameters_1.MultiHistogramParameters(parameters), new styles_1.MultiHistogramStyle(style));
            case ChartType.ScatterPlot:
                return new MultiScatterPlot(xaxistitle, yaxistitle, new parameters_1.MultiScatterPlotParameters(parameters), new styles_1.MultiScatterPlotStyle(style));
            case ChartType.HistogramPlusLine:
                var y2axistitle = axistitles != null && axistitles.y2axis ? axistitles.y2axis : null;
                return new HistogramPlusLine(xaxistitle, yaxistitle, y2axistitle, new parameters_1.HistogramPlusLineParameters(parameters), new styles_1.HistogramPlusLineStyle(style));
            case ChartType.SimpleScatterPlot:
                return new ScatterPlot(xaxistitle, yaxistitle, new parameters_1.ScatterPlotParameters(parameters), new styles_1.ScatterPlotStyle(style));
            default:
                throw "unknown chart type";
        }
    };
    return ChartFactory;
}());
exports.ChartFactory = ChartFactory;
var ChartDefaultSettings = (function () {
    function ChartDefaultSettings() {
    }
    ChartDefaultSettings.getColorPalette = function () {
        return this.colorPalette;
    };
    ChartDefaultSettings.setColorPalette = function (colors) {
        if (colors == null) {
            throw "provided color palette was null";
        }
        for (var i = 0; i < Math.min(colors.length, this.colorPalette.length); i++) {
            this.colorPalette[i] = colors[i];
        }
    };
    ChartDefaultSettings.getPaletteColor = function (i) {
        if (i < 0 || i >= this.colorPalette.length) {
            return null;
        }
        return this.colorPalette[i];
    };
    ChartDefaultSettings.setPaletteColor = function (i, color) {
        if (i < 0 || i >= this.colorPalette.length) {
            return;
        }
        this.colorPalette[i] = color;
    };
    ChartDefaultSettings.getColorsWithDefaults = function (colors, numberOfColors) {
        if (colors == null) {
            colors = [];
        }
        for (var i = 0; i < numberOfColors; i++) {
            if (colors.length === i) {
                colors.push(ChartDefaultSettings.getPaletteColor(i));
            }
            else if (colors[i] == null) {
                colors.push(ChartDefaultSettings.getPaletteColor(i));
            }
        }
        return colors;
    };
    ChartDefaultSettings.getPaddingWithDefaults = function (padding, defaultPadding) {
        if (defaultPadding === void 0) { defaultPadding = ChartDefaultSettings.padding; }
        return ChartDefaultSettings.getSettingWithDefaults(padding, defaultPadding);
    };
    ChartDefaultSettings.getFontWithDefaults = function (font, defaultFont) {
        if (defaultFont === void 0) { defaultFont = ChartDefaultSettings.font; }
        return ChartDefaultSettings.getSettingWithDefaults(font, defaultFont);
    };
    ChartDefaultSettings.getOffsetWithDefaults = function (offset, defaultOffset) {
        if (defaultOffset === void 0) { defaultOffset = { x: 0, y: 0 }; }
        return ChartDefaultSettings.getSettingWithDefaults(offset, defaultOffset);
    };
    ChartDefaultSettings.getSettingWithDefaults = function (setting, defaultSetting) {
        if (setting == null) {
            return defaultSetting;
        }
        for (var si in defaultSetting) {
            if (defaultSetting.hasOwnProperty(si)) {
                if (typeof (setting[si]) != 'undefined' && setting[si] != null) {
                    continue;
                }
                setting[si] = defaultSetting[si];
            }
        }
        return setting;
    };
    ChartDefaultSettings.chartWidth = 500;
    ChartDefaultSettings.chartHeight = 500;
    ChartDefaultSettings.padding = { top: 20, left: 70, bottom: 50, right: 10 };
    ChartDefaultSettings.secondyaxispadding = { top: 20, left: 70, bottom: 50, right: 70 };
    ChartDefaultSettings.legendedpadding = { top: 10, left: 70, bottom: 50, right: 100 };
    ChartDefaultSettings.font = { name: "sans-serif", size: 13, weight: null, style: null };
    ChartDefaultSettings.annotationFont = { name: "sans-serif", size: 11, weight: null, style: null };
    ChartDefaultSettings.hovercolor = "orange";
    ChartDefaultSettings.colorPalette = ["#264868", "#7A99BC", "green", "#40cc40", "orange", "red", "violet", "cyan"];
    return ChartDefaultSettings;
}());
exports.ChartDefaultSettings = ChartDefaultSettings;
var ChartBase = (function () {
    function ChartBase(xaxistitle, yaxistitle, parameters, style) {
        if (xaxistitle === void 0) { xaxistitle = null; }
        if (yaxistitle === void 0) { yaxistitle = null; }
        if (parameters === void 0) { parameters = null; }
        if (style === void 0) { style = null; }
        this.xaxistitle = xaxistitle;
        this.yaxistitle = yaxistitle;
        this.parameters = parameters;
        this.style = style;
        if (this.parameters == null) {
            this.parameters = this.createParameters();
        }
        if (this.style == null) {
            this.style = this.createStyle();
        }
        this.setParameterDefaults();
        this.setStyleDefaults();
    }
    ChartBase.prototype.createParameters = function () {
        return undefined;
    };
    ChartBase.prototype.createStyle = function () {
        return undefined;
    };
    ChartBase.prototype.setParameterDefaults = function () {
        var p = this.parameters;
        if (p.width == null) {
            p.width = ChartDefaultSettings.chartWidth;
        }
        if (p.height == null) {
            p.height = ChartDefaultSettings.chartHeight;
        }
        p.padding = ChartDefaultSettings.getPaddingWithDefaults(p.padding);
    };
    ChartBase.prototype.setStyleDefaults = function () {
        var s = this.style;
        s.defaultFont = ChartDefaultSettings.getFontWithDefaults(s.defaultFont);
        if (s.defaultTextColor == null) {
            s.defaultTextColor = "black";
        }
    };
    ChartBase.prototype.createSpec = function (data) {
        var p = this.parameters;
        return {
            width: p.width - p.padding.right - p.padding.left,
            height: p.height - p.padding.top - p.padding.bottom,
            padding: p.padding
        };
    };
    ChartBase.prototype.show = function (chartid, data) {
        var spec = this.createSpec(data);
        var element = "#" + chartid;
        var p = this.parameters;
        var that = this;
        vega_1.parse.spec(spec, function (chart) {
            var c = chart({ el: element, renderer: "svg" });
            that.addChartBehaviors(c, p);
            c.update();
        });
    };
    ChartBase.prototype.addChartBehaviors = function (c, p) {
    };
    ChartBase.prototype.writePng = function (data, filepath) {
    };
    ChartBase.prototype.writeSvg = function (data, filepath) {
    };
    ChartBase.prototype.endsWith = function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    };
    return ChartBase;
}());
exports.ChartBase = ChartBase;
var XyChart = (function (_super) {
    __extends(XyChart, _super);
    function XyChart(xaxistitle, yaxistitle, parameters, style) {
        if (xaxistitle === void 0) { xaxistitle = null; }
        if (yaxistitle === void 0) { yaxistitle = null; }
        _super.call(this, xaxistitle, yaxistitle, parameters, style);
    }
    XyChart.prototype.setParameterDefaults = function () {
        _super.prototype.setParameterDefaults.call(this);
        var p = this.parameters;
        if (p.showaxes == null) {
            p.showaxes = parameters_2.Axes.XY;
        }
        if (p.showgridlines == null) {
            p.showgridlines = parameters_2.Axes.XY;
        }
        if (p.xmin == null) {
            p.xmin = NaN;
        }
        if (p.xmax == null) {
            p.xmax = NaN;
        }
        if (p.ymin == null) {
            p.ymin = 0;
        }
        if (p.ymax == null) {
            p.ymax = NaN;
        }
        if (p.xticks == null) {
            p.xticks = ChartDefaultSettings.xticks;
        }
        if (p.yticks == null) {
            p.yticks = ChartDefaultSettings.xticks;
        }
    };
    XyChart.prototype.setStyleDefaults = function () {
        _super.prototype.setStyleDefaults.call(this);
        var s = this.style;
        s.axisLabelFont = ChartDefaultSettings.getFontWithDefaults(s.axisLabelFont, s.defaultFont);
        var defaultTitleFont = ChartDefaultSettings.getFontWithDefaults({ weight: types_1.FontWeight.bold }, s.defaultFont);
        s.axisTitleFont = ChartDefaultSettings.getFontWithDefaults(s.axisTitleFont, defaultTitleFont);
        if (s.axisLabelColor == null) {
            s.axisLabelColor = s.defaultTextColor;
        }
        if (s.axisTitleColor == null) {
            s.axisTitleColor = s.defaultTextColor;
        }
        if (s.axisColor == null) {
            s.axisColor = "black";
        }
        if (s.axisStrokeWidth == null) {
            s.axisStrokeWidth = 1;
        }
        if (s.axisGridColor == null) {
            s.axisGridColor = "blue";
        }
    };
    XyChart.prototype.createSpec = function (data) {
        var spec = _super.prototype.createSpec.call(this, data);
        var p = this.parameters;
        var s = this.style;
        spec["scales"] = [
            {
                name: "xscale",
                type: this.getXscaleType(),
                range: "width",
                zero: false,
                domain: this.getXScaleData(data)
            },
            {
                name: "yscale",
                type: this.getYscaleType(),
                range: "height",
                zero: false,
                nice: false,
                domain: this.getYScaleData(data)
            }
        ];
        spec["axes"] = [];
        if (p.showaxes === parameters_2.Axes.XY || p.showaxes === parameters_2.Axes.X) {
            spec["axes"].push({
                type: "x",
                scale: "xscale",
                ticks: p.xticks,
                values: (p.xticks != null && p.xticks <= 0) ? [] : null,
                grid: p.showgridlines === parameters_2.Axes.XY || p.showgridlines === parameters_2.Axes.X,
                title: this.xaxistitle,
                properties: {
                    ticks: {
                        stroke: { value: s.axisColor }
                    },
                    labels: {
                        fill: { value: s.axisLabelColor },
                        font: { value: s.axisLabelFont.name },
                        fontSize: { value: s.axisLabelFont.size },
                        fontWeight: { value: s.axisLabelFont.weight ? s.axisLabelFont.weight.toString() : null },
                        fontStyle: { value: s.axisLabelFont.style ? s.axisLabelFont.style.toString() : null }
                    },
                    title: {
                        fill: { value: s.axisTitleColor },
                        font: { value: s.axisTitleFont.name },
                        fontSize: { value: s.axisTitleFont.size },
                        fontWeight: { value: s.axisTitleFont.weight ? s.axisTitleFont.weight.toString() : null },
                        fontStyle: { value: s.axisTitleFont.style ? s.axisTitleFont.style.toString() : null }
                    },
                    axis: {
                        stroke: { value: s.axisColor },
                        strokeWidth: { value: s.axisStrokeWidth }
                    },
                    grid: {
                        stroke: { value: s.axisGridColor }
                    }
                }
            });
        }
        if (p.showaxes === parameters_2.Axes.XY || p.showaxes === parameters_2.Axes.Y) {
            spec["axes"].push({
                type: "y",
                scale: "yscale",
                ticks: p.yticks,
                values: (p.yticks != null && p.yticks <= 0) ? [] : null,
                grid: p.showgridlines === parameters_2.Axes.XY || p.showgridlines === parameters_2.Axes.Y,
                title: this.yaxistitle,
                properties: {
                    ticks: {
                        stroke: { value: s.axisColor }
                    },
                    labels: {
                        fill: { value: s.axisLabelColor },
                        font: { value: s.axisLabelFont.name },
                        fontSize: { value: s.axisLabelFont.size },
                        fontWeight: { value: s.axisLabelFont.weight ? s.axisLabelFont.weight.toString() : null },
                        fontStyle: { value: s.axisLabelFont.style ? s.axisLabelFont.style.toString() : null }
                    },
                    title: {
                        fill: { value: s.axisTitleColor },
                        font: { value: s.axisTitleFont.name },
                        fontSize: { value: s.axisTitleFont.size },
                        fontWeight: { value: s.axisTitleFont.weight ? s.axisTitleFont.weight.toString() : null },
                        fontStyle: { value: s.axisTitleFont.style ? s.axisTitleFont.style.toString() : null }
                    },
                    axis: {
                        stroke: { value: s.axisColor },
                        strokeWidth: { value: s.axisStrokeWidth }
                    },
                    grid: {
                        stroke: { value: s.axisGridColor }
                    }
                }
            });
        }
        spec["data"] = [];
        spec["marks"] = [];
        if (p.annotations != null) {
            for (var aidx in p.annotations) {
                if (p.annotations.hasOwnProperty(aidx)) {
                    this.addAnnotationMark(parseInt(aidx, 10), p.annotations[aidx], spec);
                }
            }
        }
        return spec;
    };
    XyChart.prototype.getMinMax = function (array, fixedmin, fixedmax) {
        if (fixedmin != null && !isNaN(fixedmin) && fixedmax != null && !isNaN(fixedmax)) {
            return [fixedmin, fixedmax];
        }
        var min = fixedmin;
        var max = fixedmax;
        for (var i in array) {
            if (!array.hasOwnProperty(i)) {
                continue;
            }
            var val = array[i];
            if ((fixedmin == null || isNaN(fixedmin)) && (!min || min > val)) {
                min = val;
            }
            if ((fixedmax == null || isNaN(fixedmax)) && (!max || max < val)) {
                max = val;
            }
        }
        return [min, max];
    };
    XyChart.prototype.getXScaleData = function (data) {
        return [];
    };
    XyChart.prototype.getYScaleData = function (data) {
        return [];
    };
    XyChart.prototype.getXscaleType = function () {
        return "linear";
    };
    XyChart.prototype.getYscaleType = function () {
        return "linear";
    };
    XyChart.prototype.addAnnotationMark = function (index, annotation, spec) {
        switch (annotation.type) {
            case annotations_1.AnnotationType.Line:
                this.addLineMark(index, annotation, spec);
                break;
            case annotations_1.AnnotationType.VerticalLine:
                this.addVerticalLineMark(index, annotation, spec);
                break;
            case annotations_1.AnnotationType.HorizontalLine:
                this.addHorizontalLineMark(index, annotation, spec);
                break;
            case annotations_1.AnnotationType.Point:
                this.addPointMark(index, annotation, spec);
                break;
            case annotations_1.AnnotationType.Rectangle:
                this.addRectangleMark(index, annotation, spec);
                break;
            case annotations_1.AnnotationType.Text:
                this.addTextMark(index, annotation, spec);
                break;
            default:
                throw "unknown annotation type";
        }
    };
    XyChart.prototype.addLineMark = function (index, annotation, spec) {
        var a = annotation;
        spec["data"].push({
            name: "lineanno" + index,
            values: [{ x: a.pt1.x, y: a.pt1.y }, { x: a.pt2.x, y: a.pt2.y }]
        });
        spec["marks"].push({
            type: "line",
            from: { data: "lineanno" + index },
            properties: {
                enter: {
                    stroke: { value: a.color },
                    strokeWidth: { value: a.linewidth },
                    opacity: { value: a.opacity },
                    x: { scale: "xscale", field: "x" },
                    y: { scale: "yscale", field: "y" }
                }
            }
        });
    };
    XyChart.prototype.addVerticalLineMark = function (index, annotation, spec) {
        var a = annotation;
        spec["marks"].push({
            type: "rule",
            properties: {
                enter: {
                    stroke: { value: a.color },
                    strokeWidth: { value: a.linewidth },
                    opacity: { value: a.opacity },
                    x: { scale: "xscale", value: a.x },
                    x2: { scale: "xscale", value: a.x },
                    y: { value: 0 },
                    y2: { field: { group: "height" } }
                }
            }
        });
    };
    XyChart.prototype.addHorizontalLineMark = function (index, annotation, spec) {
        var a = annotation;
        spec["marks"].push({
            type: "rule",
            properties: {
                enter: {
                    stroke: { value: a.color },
                    strokeWidth: { value: a.linewidth },
                    opacity: { value: a.opacity },
                    x: { value: 0 },
                    x2: { field: { group: "width" } },
                    y: { scale: "yscale", value: a.y },
                    y2: { scale: "yscale", value: a.y }
                }
            }
        });
    };
    XyChart.prototype.addPointMark = function (index, annotation, spec) {
        var a = annotation;
        spec["marks"].push({
            type: "symbol",
            properties: {
                enter: {
                    stroke: { value: a.color },
                    strokeWidth: { value: a.linewidth },
                    fill: { value: a.fill },
                    fillOpacity: { value: a.fillopacity },
                    opacity: { value: a.opacity },
                    size: { value: a.markersize },
                    x: { scale: "xscale", value: a.location.x },
                    y: { scale: "yscale", value: a.location.y }
                }
            }
        });
    };
    XyChart.prototype.addRectangleMark = function (index, annotation, spec) {
        var a = annotation;
        spec["marks"].push({
            type: "rect",
            properties: {
                enter: {
                    stroke: { value: a.color },
                    strokeWidth: { value: a.linewidth },
                    fill: { value: a.fill },
                    fillOpacity: { value: a.fillopacity },
                    opacity: { value: a.opacity },
                    x: { scale: "xscale", value: a.location.x },
                    y: { scale: "yscale", value: a.location.y },
                    x2: { scale: "xscale", value: a.location.x + a.size.width },
                    y2: { scale: "yscale", value: a.location.y + a.size.height }
                }
            }
        });
    };
    XyChart.prototype.addTextMark = function (index, annotation, spec) {
        var a = annotation;
        spec["marks"].push({
            type: "text",
            properties: {
                enter: {
                    text: { value: a.text },
                    fill: { value: a.fill },
                    fillOpacity: { value: a.fillopacity },
                    x: { scale: "xscale", value: a.location.x },
                    y: { scale: "yscale", value: a.location.y },
                    dx: { value: a.offsetpixels.x },
                    dy: { value: a.offsetpixels.y },
                    align: { value: a.align ? a.align.toString() : null },
                    baseline: { value: a.baseline ? a.baseline.toString() : null },
                    angle: { value: a.angle },
                    font: { value: a.font.name },
                    fontSize: { value: a.font.size },
                    fontWeight: { value: a.font.weight ? a.font.weight.toString() : null },
                    fontStyle: { value: a.font.style ? a.font.style.toString() : null }
                }
            }
        });
    };
    return XyChart;
}(ChartBase));
exports.XyChart = XyChart;
var XyyChart = (function (_super) {
    __extends(XyyChart, _super);
    function XyyChart(xaxistitle, yaxistitle, y2axistitle, parameters, style) {
        if (xaxistitle === void 0) { xaxistitle = null; }
        if (yaxistitle === void 0) { yaxistitle = null; }
        if (y2axistitle === void 0) { y2axistitle = null; }
        if (parameters === void 0) { parameters = null; }
        if (style === void 0) { style = null; }
        _super.call(this, xaxistitle, yaxistitle, parameters, style);
        this.y2axistitle = y2axistitle;
    }
    XyyChart.prototype.setParameterDefaults = function () {
        var p = this.parameters;
        p.padding = ChartDefaultSettings.getPaddingWithDefaults(p.padding, ChartDefaultSettings.secondyaxispadding);
        _super.prototype.setParameterDefaults.call(this);
    };
    XyyChart.prototype.createSpec = function (data) {
        var spec = _super.prototype.createSpec.call(this, data);
        var p = this.parameters;
        var s = this.style;
        spec["scales"].push({
            name: "y2scale",
            type: this.getY2scaleType(),
            range: "height",
            zero: false,
            nice: false,
            domain: this.getY2ScaleData(data)
        });
        if (p.showaxes === parameters_2.Axes.XY || p.showaxes === parameters_2.Axes.Y) {
            spec["axes"].push({
                type: "y",
                orient: "right",
                scale: "y2scale",
                ticks: p.y2ticks,
                values: (p.y2ticks != null && p.y2ticks <= 0) ? [] : null,
                title: this.y2axistitle,
                properties: {
                    ticks: {
                        stroke: { value: s.axisColor }
                    },
                    labels: {
                        fill: { value: s.axisLabelColor },
                        font: { value: s.axisLabelFont.name },
                        fontSize: { value: s.axisLabelFont.size },
                        fontWeight: { value: s.axisLabelFont.weight ? s.axisLabelFont.weight.toString() : null },
                        fontStyle: { value: s.axisLabelFont.style ? s.axisLabelFont.style.toString() : null }
                    },
                    title: {
                        fill: { value: s.axisTitleColor },
                        font: { value: s.axisTitleFont.name },
                        fontSize: { value: s.axisTitleFont.size },
                        fontWeight: { value: s.axisTitleFont.weight ? s.axisTitleFont.weight.toString() : null },
                        fontStyle: { value: s.axisTitleFont.style ? s.axisTitleFont.style.toString() : null },
                        angle: { value: -90 }
                    },
                    axis: {
                        stroke: { value: s.axisColor },
                        strokeWidth: { value: s.axisStrokeWidth }
                    }
                }
            });
        }
        return spec;
    };
    XyyChart.prototype.getY2ScaleData = function (data) {
        return [];
    };
    XyyChart.prototype.getY2scaleType = function () {
        return "linear";
    };
    return XyyChart;
}(XyChart));
exports.XyyChart = XyyChart;
var LegendRenderer = (function () {
    function LegendRenderer(parameters, style) {
        this.parameters = parameters;
        this.style = style;
        this.labeloffset = { x: 15, y: 10 };
    }
    LegendRenderer.prototype.render = function (spec, names) {
        var p = this.parameters;
        var s = this.style;
        if (p.showlegend === false) {
            return;
        }
        var legends = [];
        for (var i = 0; i < names.length; i++) {
            legends.push({
                type: "group",
                properties: {
                    enter: {
                        y: { value: i * 15 }
                    }
                },
                marks: [
                    this.getLegendColorMark(i),
                    {
                        type: "text",
                        properties: {
                            enter: {
                                x: { value: this.labeloffset.x },
                                y: { value: this.labeloffset.y },
                                text: { value: names[i] },
                                fill: { value: s.legendLabelColor },
                                font: { value: s.legendLabelFont.name },
                                fontSize: { value: s.legendLabelFont.size },
                                fontWeight: { value: s.legendLabelFont.weight ? s.legendLabelFont.weight.toString() : null },
                                fontStyle: { value: s.legendLabelFont.style ? s.legendLabelFont.style.toString() : null }
                            }
                        }
                    }
                ]
            });
        }
        spec["marks"].push({
            type: "group",
            properties: {
                enter: {
                    x: { field: { group: "width" }, offset: 10 - p.legendoffset.x },
                    y: { value: 10 + p.legendoffset.y }
                }
            },
            marks: legends
        });
    };
    LegendRenderer.prototype.getLegendColorMark = function (i) {
    };
    return LegendRenderer;
}());
var BarChart = (function (_super) {
    __extends(BarChart, _super);
    function BarChart(xaxistitle, yaxistitle, parameters, style) {
        if (xaxistitle === void 0) { xaxistitle = null; }
        if (yaxistitle === void 0) { yaxistitle = null; }
        if (parameters === void 0) { parameters = new parameters_1.BarChartParameters(); }
        if (style === void 0) { style = new styles_1.BarChartStyle(); }
        _super.call(this, xaxistitle, yaxistitle, parameters, style);
    }
    BarChart.prototype.createParameters = function () {
        return new parameters_1.BarChartParameters();
    };
    BarChart.prototype.createStyle = function () {
        return new styles_1.BarChartStyle;
    };
    BarChart.prototype.setParameterDefaults = function () {
        var p = this.parameters;
        if (p.showgridlines == null) {
            p.showgridlines = parameters_2.Axes.None;
        }
        _super.prototype.setParameterDefaults.call(this);
        if (p.barspacing == null) {
            p.barspacing = 1;
        }
        if (p.highlight == null) {
            p.highlight = true;
        }
        p.xticks = null;
    };
    BarChart.prototype.setStyleDefaults = function () {
        _super.prototype.setStyleDefaults.call(this);
        var s = this.style;
        if (s.color == null) {
            s.color = ChartDefaultSettings.getPaletteColor(0);
        }
        if (s.hovercolor == null) {
            s.hovercolor = ChartDefaultSettings.hovercolor;
        }
    };
    BarChart.prototype.getXScaleData = function (data) {
        var labels = [];
        for (var bi in data) {
            if (data.hasOwnProperty(bi)) {
                labels.push(data[bi].label);
            }
        }
        return labels;
    };
    BarChart.prototype.getYScaleData = function (data) {
        var values = [];
        for (var bi in data) {
            if (data.hasOwnProperty(bi)) {
                values.push(data[bi].value);
            }
        }
        var p = this.parameters;
        return this.getMinMax(values, p.ymin, p.ymax);
    };
    BarChart.prototype.getXscaleType = function () {
        return "ordinal";
    };
    BarChart.prototype.createSpec = function (data) {
        var spec = _super.prototype.createSpec.call(this, data);
        var p = this.parameters;
        var s = this.style;
        spec["data"].push({
            name: "table",
            values: data
        });
        spec["signals"] = [
            {
                name: "tooltip",
                init: {},
                streams: [
                    { type: "rect:mouseover", expr: "datum" },
                    { type: "rect:mouseout", expr: "{}" }
                ]
            },
            {
                name: "barclick",
                streams: [
                    { type: "rect:mousedown", expr: "datum" }
                ]
            },
            {
                name: "barhover",
                streams: [
                    { type: "rect:mouseover", expr: "datum" }
                ]
            }
        ];
        spec["predicates"] = [
            {
                name: "tooltip", type: "==",
                operands: [{ signal: "tooltip._id" }, { arg: "id" }]
            }
        ];
        spec["marks"].push({
            type: "rect",
            from: { data: "table" },
            properties: {
                enter: {
                    x: {
                        scale: "xscale",
                        field: "label",
                        offset: p && p.barspacing ? (p.barspacing - 1) / 2 : 0
                    },
                    width: {
                        scale: "xscale",
                        band: true,
                        offset: p && p.barspacing ? -p.barspacing : -1
                    },
                    y: { scale: "yscale", field: "value" },
                    y2: { field: { group: "height" } },
                    fill: { value: s.color }
                },
                update: p.highlight ? {
                    fill: {
                        rule: [
                            {
                                predicate: {
                                    name: "tooltip",
                                    id: { field: "_id" }
                                },
                                value: s.hovercolor
                            },
                            { value: s.color }
                        ]
                    }
                } : {}
            }
        });
        if (p.highlight) {
            spec["marks"].push({
                type: "text",
                properties: {
                    enter: {
                        align: { value: annotations_1.Align.center.toString() },
                        fill: { value: s.hovercolor }
                    },
                    update: {
                        x: { scale: "xscale", signal: "tooltip.label" },
                        dx: { scale: "xscale", band: true, mult: 0.5 },
                        y: { scale: "yscale", signal: "tooltip.value", offset: -5 },
                        text: { signal: "tooltip.value" },
                        fillOpacity: {
                            rule: [
                                {
                                    predicate: {
                                        name: "tooltip",
                                        id: { value: null }
                                    },
                                    value: 0
                                },
                                { value: 1 }
                            ]
                        }
                    }
                }
            });
        }
        return spec;
    };
    BarChart.prototype.addChartBehaviors = function (c, p) {
        c.onSignal("barclick", function (name, datum) {
            if (p.onbarclick) {
                p.onbarclick(datum);
            }
        });
        c.onSignal("barhover", function (name, datum) {
            if (p.onbarhover) {
                p.onbarhover(datum);
            }
        });
    };
    return BarChart;
}(XyChart));
exports.BarChart = BarChart;
var Histogram = (function (_super) {
    __extends(Histogram, _super);
    function Histogram(xaxistitle, yaxistitle, parameters, style) {
        if (xaxistitle === void 0) { xaxistitle = null; }
        if (yaxistitle === void 0) { yaxistitle = null; }
        if (parameters === void 0) { parameters = new parameters_1.HistogramParameters(); }
        if (style === void 0) { style = new styles_1.HistogramStyle(); }
        _super.call(this, xaxistitle, yaxistitle, parameters, style);
    }
    Histogram.prototype.createParameters = function () {
        return new parameters_1.HistogramParameters();
    };
    Histogram.prototype.createStyle = function () {
        return new styles_1.HistogramStyle;
    };
    Histogram.prototype.setParameterDefaults = function () {
        _super.prototype.setParameterDefaults.call(this);
        var p = this.parameters;
        if (p.highlight == null) {
            p.highlight = true;
        }
    };
    Histogram.prototype.setStyleDefaults = function () {
        _super.prototype.setStyleDefaults.call(this);
        var s = this.style;
        if (s.color == null) {
            s.color = ChartDefaultSettings.getPaletteColor(0);
        }
        if (s.hovercolor == null) {
            s.hovercolor = ChartDefaultSettings.hovercolor;
        }
    };
    Histogram.prototype.getXScaleData = function (data) {
        var p = this.parameters;
        return this.getMinMax([data.binMin, data.binMax], p.xmin, p.xmax);
    };
    Histogram.prototype.getYScaleData = function (data) {
        var p = this.parameters;
        return this.getMinMax(data.bins, p.ymin, p.ymax);
    };
    Histogram.prototype.createSpec = function (data) {
        var spec = _super.prototype.createSpec.call(this, data);
        var p = this.parameters;
        var s = this.style;
        var bars = [];
        var binSize = (data.binMax - data.binMin) / data.bins.length;
        for (var i = 0; i < data.bins.length; i++) {
            var x = data.binMin + (binSize * i);
            bars.push({ x: x, x2: (x + binSize), y: data.bins[i] });
        }
        spec["data"].push({
            name: "table",
            values: bars
        });
        spec["signals"] = [
            {
                name: "tooltip",
                init: {},
                streams: [
                    { type: "rect:mouseover", expr: "datum" },
                    { type: "rect:mouseout", expr: "{}" }
                ]
            }
        ];
        spec["predicates"] = [
            {
                name: "tooltip", type: "==",
                operands: [{ signal: "tooltip._id" }, { arg: "id" }]
            }
        ];
        spec["marks"].push({
            type: "rect",
            from: { data: "table" },
            properties: {
                enter: {
                    x: {
                        scale: "xscale",
                        field: "x"
                    },
                    x2: {
                        scale: "xscale",
                        field: "x2",
                        offset: -1
                    },
                    y: { scale: "yscale", field: "y" },
                    y2: { field: { group: "height" } },
                    fill: { value: s.color }
                },
                update: p.highlight ? {
                    fill: {
                        rule: [
                            {
                                predicate: {
                                    name: "tooltip",
                                    id: { field: "_id" }
                                },
                                value: s.hovercolor
                            },
                            { value: s.color }
                        ]
                    }
                } : {}
            }
        });
        if (p.highlight) {
            spec["marks"].push({
                type: "text",
                properties: {
                    enter: {
                        align: { value: annotations_1.Align.left.toString() },
                        fill: { value: s.hovercolor }
                    },
                    update: {
                        x: { scale: "xscale", signal: "tooltip.x" },
                        y: { scale: "yscale", signal: "tooltip.y", offset: -5 },
                        text: { signal: "tooltip.y" },
                        fillOpacity: {
                            rule: [
                                {
                                    predicate: {
                                        name: "tooltip",
                                        id: { value: null }
                                    },
                                    value: 0
                                },
                                { value: 1 }
                            ]
                        }
                    }
                }
            });
        }
        return spec;
    };
    return Histogram;
}(XyChart));
exports.Histogram = Histogram;
var HistogramPlusLine = (function (_super) {
    __extends(HistogramPlusLine, _super);
    function HistogramPlusLine(xaxistitle, yaxistitle, y2axistitle, parameters, style) {
        if (xaxistitle === void 0) { xaxistitle = null; }
        if (yaxistitle === void 0) { yaxistitle = null; }
        if (y2axistitle === void 0) { y2axistitle = null; }
        if (parameters === void 0) { parameters = new parameters_1.HistogramPlusLineParameters(); }
        if (style === void 0) { style = new styles_1.HistogramPlusLineStyle(); }
        _super.call(this, xaxistitle, yaxistitle, y2axistitle, parameters, style);
    }
    HistogramPlusLine.prototype.createParameters = function () {
        return new parameters_1.HistogramPlusLineParameters();
    };
    HistogramPlusLine.prototype.createStyle = function () {
        return new styles_1.HistogramPlusLineStyle;
    };
    HistogramPlusLine.prototype.setParameterDefaults = function () {
        var p = this.parameters;
        if (p.y2min == null) {
            p.y2min = NaN;
        }
        if (p.showgridlines == null) {
            p.showgridlines = parameters_2.Axes.None;
        }
        _super.prototype.setParameterDefaults.call(this);
        if (p.highlight == null) {
            p.highlight = true;
        }
    };
    HistogramPlusLine.prototype.setStyleDefaults = function () {
        _super.prototype.setStyleDefaults.call(this);
        var s = this.style;
        s.colors = ChartDefaultSettings.getColorsWithDefaults(s.colors, 2);
        if (s.linewidth == null) {
            s.linewidth = 2;
        }
        if (s.hovercolor == null) {
            s.hovercolor = ChartDefaultSettings.hovercolor;
        }
    };
    HistogramPlusLine.prototype.getXScaleData = function (data) {
        var p = this.parameters;
        var values = [data.dist.binMin, data.dist.binMax];
        for (var di in data.line) {
            if (data.line.hasOwnProperty(di)) {
                values.push(data.line[di].x);
            }
        }
        return this.getMinMax(values, p.xmin, p.xmax);
    };
    HistogramPlusLine.prototype.getYScaleData = function (data) {
        var p = this.parameters;
        return this.getMinMax(data.dist.bins, p.ymin, p.ymax);
    };
    HistogramPlusLine.prototype.getY2ScaleData = function (data) {
        var p = this.parameters;
        var values = [];
        for (var di in data.line) {
            if (data.line.hasOwnProperty(di)) {
                values.push(data.line[di].y);
            }
        }
        return this.getMinMax(values, p.y2min, p.y2max);
    };
    HistogramPlusLine.prototype.createSpec = function (data) {
        var spec = _super.prototype.createSpec.call(this, data);
        var p = this.parameters;
        var s = this.style;
        var bars = [];
        var binSize = (data.dist.binMax - data.dist.binMin) / data.dist.bins.length;
        for (var i = 0; i < data.dist.bins.length; i++) {
            var x = data.dist.binMin + (binSize * i);
            bars.push({ x: x, x2: (x + binSize), y: data.dist.bins[i] });
        }
        spec["data"].push({
            name: "dist",
            values: bars
        });
        spec["signals"] = [
            {
                name: "tooltip",
                init: {},
                streams: [
                    { type: "rect:mouseover", expr: "datum" },
                    { type: "rect:mouseout", expr: "{}" }
                ]
            }
        ];
        spec["predicates"] = [
            {
                name: "tooltip", type: "==",
                operands: [{ signal: "tooltip._id" }, { arg: "id" }]
            }
        ];
        spec["marks"].push({
            type: "rect",
            from: { data: "dist" },
            properties: {
                enter: {
                    x: {
                        scale: "xscale",
                        field: "x"
                    },
                    x2: {
                        scale: "xscale",
                        field: "x2",
                        offset: -1
                    },
                    y: { scale: "yscale", field: "y" },
                    y2: { field: { group: "height" } },
                    fill: { value: s.colors[0] }
                },
                update: p.highlight ? {
                    fill: {
                        rule: [
                            {
                                predicate: {
                                    name: "tooltip",
                                    id: { field: "_id" }
                                },
                                value: s.hovercolor
                            },
                            { value: s.colors[0] }
                        ]
                    }
                } : {}
            }
        });
        if (p.highlight) {
            spec["marks"].push({
                type: "text",
                properties: {
                    enter: {
                        align: { value: annotations_1.Align.left.toString() },
                        fill: { value: s.hovercolor }
                    },
                    update: {
                        x: { scale: "xscale", signal: "tooltip.x" },
                        y: { scale: "yscale", signal: "tooltip.y", offset: -5 },
                        text: { signal: "tooltip.y" },
                        fillOpacity: {
                            rule: [
                                {
                                    predicate: {
                                        name: "tooltip",
                                        id: { value: null }
                                    },
                                    value: 0
                                },
                                { value: 1 }
                            ]
                        }
                    }
                }
            });
        }
        spec["data"].push({
            name: "points",
            values: data.line
        });
        spec["marks"].push({
            type: "line",
            from: { data: "points" },
            properties: {
                enter: {
                    stroke: { value: s.colors[1] },
                    strokeWidth: { value: s.linewidth },
                    x: { scale: "xscale", field: "x" },
                    y: { scale: "y2scale", field: "y" }
                }
            }
        });
        return spec;
    };
    return HistogramPlusLine;
}(XyyChart));
exports.HistogramPlusLine = HistogramPlusLine;
var DualHistograms = (function (_super) {
    __extends(DualHistograms, _super);
    function DualHistograms(xaxistitle, yaxistitle, parameters, style) {
        if (xaxistitle === void 0) { xaxistitle = null; }
        if (yaxistitle === void 0) { yaxistitle = null; }
        if (parameters === void 0) { parameters = new parameters_1.DualHistogramsParameters(); }
        if (style === void 0) { style = new styles_1.DualHistogramStyle(); }
        _super.call(this, xaxistitle, yaxistitle, parameters, style);
        this.multihistogram = new MultiHistogram(this.xaxistitle, this.yaxistitle, this.parameters, this.style);
    }
    DualHistograms.prototype.createParameters = function () {
        return new parameters_1.DualHistogramsParameters();
    };
    DualHistograms.prototype.createStyle = function () {
        return new styles_1.DualHistogramStyle;
    };
    DualHistograms.prototype.show = function (chartid, data) {
        this.multihistogram.show(chartid, [data.dist1, data.dist2]);
    };
    DualHistograms.prototype.writePng = function (data, filepath) {
        this.multihistogram.writePng([data.dist1, data.dist2], filepath);
    };
    DualHistograms.prototype.writeSvg = function (data, filepath) {
        this.multihistogram.writeSvg([data.dist1, data.dist2], filepath);
    };
    DualHistograms.prototype.setParameterDefaults = function () {
        _super.prototype.setParameterDefaults.call(this);
        var p = this.parameters;
        p.legendoffset = ChartDefaultSettings.getOffsetWithDefaults(p.legendoffset, { x: 100, y: 20 });
    };
    DualHistograms.prototype.setStyleDefaults = function () {
        _super.prototype.setStyleDefaults.call(this);
        var s = this.style;
        s.colors = ChartDefaultSettings.getColorsWithDefaults(s.colors, 2);
    };
    return DualHistograms;
}(XyChart));
exports.DualHistograms = DualHistograms;
var HistogramLegend = (function (_super) {
    __extends(HistogramLegend, _super);
    function HistogramLegend(parameters, style) {
        _super.call(this, parameters, style);
    }
    HistogramLegend.prototype.getLegendColorMark = function (i) {
        var s = this.style;
        return {
            type: "rect",
            properties: {
                enter: {
                    stroke: { value: s.colors[i] },
                    fill: { value: s.colors[i] },
                    strokeWidth: { value: 2 },
                    fillOpacity: { value: 0.5 },
                    x: { value: 0 },
                    x2: { value: 10 },
                    y: { value: 0 },
                    y2: { value: 10 }
                }
            }
        };
    };
    return HistogramLegend;
}(LegendRenderer));
var MultiHistogram = (function (_super) {
    __extends(MultiHistogram, _super);
    function MultiHistogram(xaxistitle, yaxistitle, parameters, style) {
        if (xaxistitle === void 0) { xaxistitle = null; }
        if (yaxistitle === void 0) { yaxistitle = null; }
        if (parameters === void 0) { parameters = new parameters_1.MultiHistogramParameters(); }
        if (style === void 0) { style = new styles_1.MultiHistogramStyle(); }
        _super.call(this, xaxistitle, yaxistitle, parameters, style);
    }
    MultiHistogram.prototype.createParameters = function () {
        return new parameters_1.MultiHistogramParameters();
    };
    MultiHistogram.prototype.createStyle = function () {
        return new styles_1.MultiHistogramStyle;
    };
    MultiHistogram.prototype.setParameterDefaults = function () {
        var p = this.parameters;
        p.padding = ChartDefaultSettings.getPaddingWithDefaults(p.padding, ChartDefaultSettings.legendedpadding);
        _super.prototype.setParameterDefaults.call(this);
        if (p.showlegend == null) {
            p.showlegend = true;
        }
        p.legendoffset = ChartDefaultSettings.getOffsetWithDefaults(p.legendoffset);
    };
    MultiHistogram.prototype.setStyleDefaults = function () {
        _super.prototype.setStyleDefaults.call(this);
        var s = this.style;
        s.colors = ChartDefaultSettings.getColorsWithDefaults(s.colors, 8);
        s.legendLabelFont = ChartDefaultSettings.getFontWithDefaults(s.legendLabelFont, s.defaultFont);
        if (s.legendLabelColor == null) {
            s.legendLabelColor = s.defaultTextColor;
        }
    };
    MultiHistogram.prototype.getXScaleData = function (data) {
        var p = this.parameters;
        var binMinMaxs = [];
        for (var di in data) {
            if (data.hasOwnProperty(di)) {
                binMinMaxs.push(data[di].binMin);
                binMinMaxs.push(data[di].binMax);
            }
        }
        return this.getMinMax(binMinMaxs, p.xmin, p.xmax);
    };
    MultiHistogram.prototype.getYScaleData = function (data) {
        var p = this.parameters;
        var binValues = [];
        for (var di in data) {
            if (data.hasOwnProperty(di)) {
                binValues = binValues.concat(data[di].bins);
            }
        }
        return this.getMinMax(binValues, p.ymin, p.ymax);
    };
    MultiHistogram.prototype.createSpec = function (data) {
        var spec = _super.prototype.createSpec.call(this, data);
        var p = this.parameters;
        var s = this.style;
        var legendmarks = [];
        for (var i = 0; i < data.length; i++) {
            var dist = data[i];
            var name_1 = "dist" + (i + 1);
            var points = [];
            var binSize = (dist.binMax - dist.binMin) / dist.bins.length;
            for (var j = 0; j < dist.bins.length; j++) {
                points.push({ x: dist.binMin + (binSize * 0.5) + (binSize * j), y: dist.bins[j] });
            }
            spec["data"].push({
                name: name_1,
                values: points
            });
            spec["marks"].push({
                type: "area",
                name: name_1,
                from: { data: name_1 },
                properties: {
                    enter: {
                        stroke: { value: s.colors[i] },
                        fill: { value: s.colors[i] },
                        strokeWidth: { value: 2 },
                        fillOpacity: { value: 0.5 },
                        interpolate: { value: "monotone" },
                        x: { scale: "xscale", field: "x" },
                        y: { scale: "yscale", field: "y" },
                        y2: { field: { group: "height" } }
                    }
                }
            });
        }
        var names = [];
        for (var i = 0; i < data.length; i++) {
            names.push(data[i].name);
        }
        var legend = new HistogramLegend(p, s);
        legend.render(spec, names);
        return spec;
    };
    return MultiHistogram;
}(XyChart));
exports.MultiHistogram = MultiHistogram;
var LineChartLegend = (function (_super) {
    __extends(LineChartLegend, _super);
    function LineChartLegend(parameters, style) {
        _super.call(this, parameters, style);
        this.labeloffset.x = 25;
    }
    LineChartLegend.prototype.getLegendColorMark = function (i) {
        var s = this.style;
        return {
            type: "rule",
            properties: {
                enter: {
                    stroke: { value: s.colors[i % 8] },
                    strokeWidth: { value: s.linewidth },
                    strokeDash: { value: i < 8 ? null : [2, 2] },
                    x: { value: 0 },
                    x2: { value: 20 },
                    y: { value: 6 },
                    y2: { value: 6 }
                }
            }
        };
    };
    return LineChartLegend;
}(LegendRenderer));
var MultiLineChart = (function (_super) {
    __extends(MultiLineChart, _super);
    function MultiLineChart(xaxistitle, yaxistitle, parameters, style) {
        if (xaxistitle === void 0) { xaxistitle = null; }
        if (yaxistitle === void 0) { yaxistitle = null; }
        if (parameters === void 0) { parameters = new parameters_1.MultiLineChartParameters(); }
        if (style === void 0) { style = new styles_1.MultiLineChartStyle(); }
        _super.call(this, xaxistitle, yaxistitle, parameters, style);
    }
    MultiLineChart.prototype.createParameters = function () {
        return new parameters_1.MultiLineChartParameters();
    };
    MultiLineChart.prototype.createStyle = function () {
        return new styles_1.MultiLineChartStyle;
    };
    MultiLineChart.prototype.setParameterDefaults = function () {
        var p = this.parameters;
        p.padding = ChartDefaultSettings.getPaddingWithDefaults(p.padding, ChartDefaultSettings.legendedpadding);
        _super.prototype.setParameterDefaults.call(this);
        if (p.showlegend == null) {
            p.showlegend = true;
        }
        p.legendoffset = ChartDefaultSettings.getOffsetWithDefaults(p.legendoffset);
    };
    MultiLineChart.prototype.setStyleDefaults = function () {
        _super.prototype.setStyleDefaults.call(this);
        var s = this.style;
        s.legendLabelFont = ChartDefaultSettings.getFontWithDefaults(s.legendLabelFont, s.defaultFont);
        if (s.legendLabelColor == null) {
            s.legendLabelColor = s.defaultTextColor;
        }
        s.colors = ChartDefaultSettings.getColorsWithDefaults(s.colors, 8);
        if (s.linewidth == null) {
            s.linewidth = 1;
        }
    };
    MultiLineChart.prototype.getXScaleData = function (data) {
        var p = this.parameters;
        var values = [];
        for (var di in data) {
            if (data.hasOwnProperty(di)) {
                var points = data[di].points;
                for (var pi in points) {
                    if (points.hasOwnProperty(pi)) {
                        values.push(points[pi].x);
                    }
                }
            }
        }
        return this.getMinMax(values, p.xmin, p.xmax);
    };
    MultiLineChart.prototype.getYScaleData = function (data) {
        var p = this.parameters;
        var values = [];
        for (var di in data) {
            if (data.hasOwnProperty(di)) {
                var points = data[di].points;
                for (var pi in points) {
                    if (points.hasOwnProperty(pi)) {
                        values.push(points[pi].y);
                    }
                }
            }
        }
        return this.getMinMax(values, p.ymin, p.ymax);
    };
    MultiLineChart.prototype.createSpec = function (data) {
        var spec = _super.prototype.createSpec.call(this, data);
        var p = this.parameters;
        var s = this.style;
        for (var i = 0; i < data.length; i++) {
            var points = data[i].points;
            spec["data"].push({
                name: "plot" + (i + 1),
                values: points
            });
        }
        spec["signals"] = [
            {
                name: "tooltip",
                init: {},
                streams: [
                    { type: "@plot:mouseover", expr: "datum" },
                    { type: "@plot:mouseout", expr: "{}" }
                ]
            }
        ];
        spec["predicates"] = [
            {
                name: "tooltip", type: "==",
                operands: [{ signal: "tooltip._id" }, { arg: "id" }]
            }
        ];
        var lines = [];
        for (var i = 0; i < data.length; i++) {
            lines.push({
                name: "plot",
                type: "line",
                from: { data: "plot" + (i + 1) },
                properties: {
                    enter: {
                        stroke: { value: s.colors[i % 8] },
                        strokeDash: { value: i < 8 ? null : [2, 2] },
                        x: { scale: "xscale", field: "x" },
                        y: { scale: "yscale", field: "y" }
                    },
                    update: {
                        strokeWidth: {
                            rule: [
                                {
                                    predicate: {
                                        name: "tooltip",
                                        id: { field: "_id" }
                                    },
                                    value: s.linewidth * 3
                                },
                                { value: s.linewidth }
                            ]
                        }
                    }
                }
            });
        }
        spec["marks"].push({
            type: "group",
            marks: lines
        });
        var names = [];
        for (var i = 0; i < data.length; i++) {
            names.push(data[i].name);
        }
        var legend = new LineChartLegend(p, s);
        legend.render(spec, names);
        return spec;
    };
    return MultiLineChart;
}(XyChart));
exports.MultiLineChart = MultiLineChart;
var SimpleLineChart = (function (_super) {
    __extends(SimpleLineChart, _super);
    function SimpleLineChart(xaxistitle, yaxistitle, parameters, style) {
        if (xaxistitle === void 0) { xaxistitle = null; }
        if (yaxistitle === void 0) { yaxistitle = null; }
        if (parameters === void 0) { parameters = new parameters_1.SimpleLineChartParameters(); }
        if (style === void 0) { style = new styles_1.SimpleLineChartStyle(); }
        _super.call(this, xaxistitle, yaxistitle, parameters, style);
    }
    SimpleLineChart.prototype.createParameters = function () {
        return new parameters_1.SimpleLineChartParameters();
    };
    SimpleLineChart.prototype.createStyle = function () {
        return new styles_1.SimpleLineChartStyle;
    };
    SimpleLineChart.prototype.setParameterDefaults = function () {
        var p = this.parameters;
        if (p.ymin == null) {
            p.ymin = NaN;
        }
        if (p.showgridlines == null) {
            p.showgridlines = parameters_2.Axes.None;
        }
        _super.prototype.setParameterDefaults.call(this);
    };
    SimpleLineChart.prototype.setStyleDefaults = function () {
        _super.prototype.setStyleDefaults.call(this);
        var s = this.style;
        if (s.color == null) {
            s.color = ChartDefaultSettings.getPaletteColor(0);
        }
        if (s.linewidth == null) {
            s.linewidth = 1;
        }
    };
    SimpleLineChart.prototype.getXScaleData = function (data) {
        var p = this.parameters;
        var values = [];
        for (var di in data) {
            if (data.hasOwnProperty(di)) {
                values.push(data[di].x);
            }
        }
        return this.getMinMax(values, p.xmin, p.xmax);
    };
    SimpleLineChart.prototype.getYScaleData = function (data) {
        var p = this.parameters;
        var values = [];
        for (var di in data) {
            if (data.hasOwnProperty(di)) {
                values.push(data[di].y);
            }
        }
        return this.getMinMax(values, p.ymin, p.ymax);
    };
    SimpleLineChart.prototype.createSpec = function (data) {
        var spec = _super.prototype.createSpec.call(this, data);
        var s = this.style;
        spec["data"].push({
            name: "points",
            values: data
        });
        spec["marks"].push({
            type: "line",
            from: { data: "points" },
            properties: {
                enter: {
                    stroke: { value: s.color },
                    strokeWidth: { value: s.linewidth },
                    x: { scale: "xscale", field: "x" },
                    y: { scale: "yscale", field: "y" }
                }
            }
        });
        return spec;
    };
    return SimpleLineChart;
}(XyChart));
exports.SimpleLineChart = SimpleLineChart;
var ScatterPlotLegend = (function (_super) {
    __extends(ScatterPlotLegend, _super);
    function ScatterPlotLegend(parameters, style) {
        _super.call(this, parameters, style);
        this.labeloffset.x += 4;
    }
    ScatterPlotLegend.prototype.getLegendColorMark = function (i) {
        var s = this.style;
        return {
            type: "rect",
            properties: {
                enter: {
                    fill: { value: s.colors[i] },
                    x: { value: 8 },
                    width: { value: 8 },
                    y: { value: 2 },
                    height: { value: 8 }
                }
            }
        };
    };
    return ScatterPlotLegend;
}(LegendRenderer));
var MultiScatterPlot = (function (_super) {
    __extends(MultiScatterPlot, _super);
    function MultiScatterPlot(xaxistitle, yaxistitle, parameters, style) {
        if (xaxistitle === void 0) { xaxistitle = null; }
        if (yaxistitle === void 0) { yaxistitle = null; }
        if (parameters === void 0) { parameters = new parameters_1.MultiScatterPlotParameters(); }
        if (style === void 0) { style = new styles_1.MultiScatterPlotStyle(); }
        _super.call(this, xaxistitle, yaxistitle, parameters, style);
    }
    MultiScatterPlot.prototype.createParameters = function () {
        return new parameters_1.MultiScatterPlotParameters();
    };
    MultiScatterPlot.prototype.createStyle = function () {
        return new styles_1.MultiScatterPlotStyle;
    };
    MultiScatterPlot.prototype.setParameterDefaults = function () {
        var p = this.parameters;
        p.padding = ChartDefaultSettings.getPaddingWithDefaults(p.padding, ChartDefaultSettings.legendedpadding);
        if (p.ymin == null) {
            p.ymin = NaN;
        }
        if (p.showgridlines == null) {
            p.showgridlines = parameters_2.Axes.None;
        }
        _super.prototype.setParameterDefaults.call(this);
        if (p.showlegend == null) {
            p.showlegend = true;
        }
        p.legendoffset = ChartDefaultSettings.getOffsetWithDefaults(p.legendoffset);
    };
    MultiScatterPlot.prototype.setStyleDefaults = function () {
        _super.prototype.setStyleDefaults.call(this);
        var s = this.style;
        s.legendLabelFont = ChartDefaultSettings.getFontWithDefaults(s.legendLabelFont, s.defaultFont);
        if (s.legendLabelColor == null) {
            s.legendLabelColor = s.defaultTextColor;
        }
        s.colors = ChartDefaultSettings.getColorsWithDefaults(s.colors, 8);
        if (s.hovercolor == null) {
            s.hovercolor = ChartDefaultSettings.hovercolor;
            ;
        }
        if (s.symbolshape == null) {
            s.symbolshape = types_1.Shape.circle;
        }
        if (s.symbolsize == null) {
            s.symbolsize = 20;
        }
    };
    MultiScatterPlot.prototype.getXScaleData = function (data) {
        var p = this.parameters;
        var values = [];
        for (var di in data) {
            if (data.hasOwnProperty(di)) {
                var points = data[di].points;
                for (var pi in points) {
                    if (points.hasOwnProperty(pi)) {
                        values.push(points[pi].x);
                    }
                }
            }
        }
        return this.getMinMax(values, p.xmin, p.xmax);
    };
    MultiScatterPlot.prototype.getYScaleData = function (data) {
        var p = this.parameters;
        var values = [];
        for (var di in data) {
            if (data.hasOwnProperty(di)) {
                var points = data[di].points;
                for (var pi in points) {
                    if (points.hasOwnProperty(pi)) {
                        values.push(points[pi].y);
                    }
                }
            }
        }
        return this.getMinMax(values, p.ymin, p.ymax);
    };
    MultiScatterPlot.prototype.createSpec = function (data) {
        var spec = _super.prototype.createSpec.call(this, data);
        var p = this.parameters;
        var s = this.style;
        spec["signals"] = [
            {
                name: "hover",
                init: {},
                streams: [
                    { type: "symbol:mouseover", expr: "datum" },
                    { type: "symbol:mouseout", expr: "{}" }
                ]
            },
            {
                name: "dotclick",
                streams: [
                    { type: "symbol:mousedown", expr: "datum" }
                ]
            },
            {
                name: "dothover",
                streams: [
                    { type: "symbol:mouseover", expr: "datum" }
                ]
            }
        ];
        spec["predicates"] = [
            {
                name: "hover", type: "==",
                operands: [{ signal: "hover._id" }, { arg: "id" }]
            }
        ];
        for (var i = 0; i < data.length; i++) {
            var plot = data[i];
            var name_2 = "plot" + (i + 1);
            spec["data"].push({
                name: name_2,
                values: plot.points
            });
            spec["marks"].push({
                type: "symbol",
                from: { data: name_2 },
                properties: {
                    enter: {
                        shape: { value: s.symbolshape.toString() },
                        size: { value: s.symbolsize },
                        fill: { value: s.colors[i] },
                        x: { scale: "xscale", field: "x" },
                        y: { scale: "yscale", field: "y" }
                    },
                    update: {
                        fill: {
                            rule: [
                                {
                                    predicate: {
                                        name: "hover",
                                        id: { field: "_id" }
                                    },
                                    value: s.hovercolor
                                },
                                { value: s.colors[i] }
                            ]
                        }
                    }
                }
            });
        }
        var names = [];
        for (var di in data) {
            if (data.hasOwnProperty(di)) {
                names.push(data[di].name);
            }
        }
        var legend = new ScatterPlotLegend(p, s);
        legend.render(spec, names);
        return spec;
    };
    MultiScatterPlot.prototype.addChartBehaviors = function (c, p) {
        c.onSignal("dotclick", function (name, datum) {
            if (p.ondotclick) {
                p.ondotclick(datum);
            }
        });
        c.onSignal("dothover", function (name, datum) {
            if (p.ondothover) {
                p.ondothover(datum);
            }
        });
    };
    return MultiScatterPlot;
}(XyChart));
exports.MultiScatterPlot = MultiScatterPlot;
var ScatterPlot = (function (_super) {
    __extends(ScatterPlot, _super);
    function ScatterPlot(xaxistitle, yaxistitle, parameters, style) {
        if (xaxistitle === void 0) { xaxistitle = null; }
        if (yaxistitle === void 0) { yaxistitle = null; }
        if (parameters === void 0) { parameters = new parameters_1.ScatterPlotParameters(); }
        if (style === void 0) { style = new styles_1.ScatterPlotStyle(); }
        _super.call(this, xaxistitle, yaxistitle, parameters, style);
        this.multiscatterplot = new MultiScatterPlot(this.xaxistitle, this.yaxistitle, this.parameters, this.style);
    }
    ScatterPlot.prototype.createParameters = function () {
        return new parameters_1.ScatterPlotParameters();
    };
    ScatterPlot.prototype.createStyle = function () {
        return new styles_1.ScatterPlotStyle;
    };
    ScatterPlot.prototype.setParameterDefaults = function () {
        var p = this.parameters;
        p.padding = ChartDefaultSettings.getPaddingWithDefaults(p.padding);
        if (p.ymin == null) {
            p.ymin = NaN;
        }
        if (p.showgridlines == null) {
            p.showgridlines = parameters_2.Axes.None;
        }
        p.showlegend = false;
        _super.prototype.setParameterDefaults.call(this);
    };
    ScatterPlot.prototype.setStyleDefaults = function () {
        _super.prototype.setStyleDefaults.call(this);
        var s = this.style;
        if (s.color == null) {
            s.color = ChartDefaultSettings.getPaletteColor(0);
        }
        s.colors = [s.color];
    };
    ScatterPlot.prototype.show = function (chartid, data) {
        this.multiscatterplot.show(chartid, [{ name: null, desc: null, points: data }]);
    };
    ScatterPlot.prototype.writePng = function (data, filepath) {
        this.multiscatterplot.writePng([{ name: null, desc: null, points: data }], filepath);
    };
    ScatterPlot.prototype.writeSvg = function (data, filepath) {
        this.multiscatterplot.writeSvg([{ name: null, desc: null, points: data }], filepath);
    };
    return ScatterPlot;
}(XyChart));
exports.ScatterPlot = ScatterPlot;

//# sourceMappingURL=data:application/json;base64,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RSxRQUFnQjtRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0E3REEsQUE2REMsQ0E3RGdDLE9BQU8sR0E2RHZDO0FBN0RZLG1CQUFXLGNBNkR2QixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvY2hhcnQvY2hhcnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtwYXJzZSwgVmlld30gZnJvbSBcInZlZ2FcIjtcblxuaW1wb3J0IHtcbiAgICBDaGFydFBhcmFtZXRlcnMsIFh5Q2hhcnRQYXJhbWV0ZXJzLCBYeXlDaGFydFBhcmFtZXRlcnMsIExlZ2VuZFBhcmFtZXRlcnMsXG4gICAgQmFyQ2hhcnRQYXJhbWV0ZXJzLCBTaW1wbGVMaW5lQ2hhcnRQYXJhbWV0ZXJzLCBNdWx0aUxpbmVDaGFydFBhcmFtZXRlcnMsIEhpc3RvZ3JhbVBhcmFtZXRlcnMsXG4gICAgRHVhbEhpc3RvZ3JhbXNQYXJhbWV0ZXJzLCBNdWx0aUhpc3RvZ3JhbVBhcmFtZXRlcnMsIE11bHRpU2NhdHRlclBsb3RQYXJhbWV0ZXJzLFxuICAgIEhpc3RvZ3JhbVBsdXNMaW5lUGFyYW1ldGVycywgU2NhdHRlclBsb3RQYXJhbWV0ZXJzfSBmcm9tIFwiLi9wYXJhbWV0ZXJzXCI7XG5cbmltcG9ydCB7IEF4ZXMgfSBmcm9tIFwiLi9wYXJhbWV0ZXJzXCI7XG5cbmltcG9ydCB7XG4gICAgQ2hhcnRTdHlsZSwgWHlDaGFydFN0eWxlLCBYeXlDaGFydFN0eWxlLCBMZWdlbmRTdHlsZSxcbiAgICBCYXJDaGFydFN0eWxlLCBTaW1wbGVMaW5lQ2hhcnRTdHlsZSwgTXVsdGlMaW5lQ2hhcnRTdHlsZSwgSGlzdG9ncmFtU3R5bGUsXG4gICAgRHVhbEhpc3RvZ3JhbVN0eWxlLCBNdWx0aUhpc3RvZ3JhbVN0eWxlLCBNdWx0aVNjYXR0ZXJQbG90U3R5bGUsXG4gICAgSGlzdG9ncmFtUGx1c0xpbmVTdHlsZSwgU2NhdHRlclBsb3RTdHlsZX0gZnJvbSBcIi4vc3R5bGVzXCI7XG5cbmltcG9ydCB7IFBhZGRpbmcsIEZvbnQsIEZvbnRXZWlnaHQsIEZvbnRTdHlsZSwgT2Zmc2V0LCBTaGFwZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmltcG9ydCB7IEJhciwgUG9pbnQsIFBsb3QsIERpc3RyaWJ1dGlvbiwgTmFtZWREaXN0cmlidXRpb24sIER1YWxEaXN0cmlidXRpb25zLCBEaXN0cmlidXRpb25QbHVzTGluZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmltcG9ydCB7XG4gICAgQW5ub3RhdGlvblR5cGUsIExpbmVBbm5vdGF0aW9uLCBIb3Jpem9udGFsTGluZUFubm90YXRpb24sIFZlcnRpY2FsTGluZUFubm90YXRpb24sXG4gICAgUG9pbnRBbm5vdGF0aW9uLCBSZWN0QW5ub3RhdGlvbiwgVGV4dEFubm90YXRpb24sIEFsaWduIH0gZnJvbSBcIi4vYW5ub3RhdGlvbnNcIjtcblxuZXhwb3J0IGVudW0gQ2hhcnRUeXBlIHtcbiAgICBCYXIsIFNpbXBsZUxpbmUsIExpbmUsIFNpbXBsZVNjYXR0ZXJQbG90LCBTY2F0dGVyUGxvdCwgSGlzdG9ncmFtLCBNdWx0aUhpc3RvZ3JhbSwgSGlzdG9ncmFtUGx1c0xpbmUsIER1YWxIaXN0b2dyYW1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBBeGlzVGl0bGVzIHtcbiAgICB4YXhpcz86IHN0cmluZztcbiAgICB5YXhpcz86IHN0cmluZztcbiAgICB5MmF4aXM/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQ2hhcnQgZmFjdG9yeVxuICovXG5leHBvcnQgY2xhc3MgQ2hhcnRGYWN0b3J5IHtcbiAgICBwdWJsaWMgc3RhdGljIE1ha2VDaGFydChjaGFydFR5cGU6IENoYXJ0VHlwZSwgYXhpc3RpdGxlczogQXhpc1RpdGxlcyA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyczogYW55ID0gbnVsbCwgc3R5bGU6IGFueSA9IG51bGwpOiBhbnkge1xuXG4gICAgICAgIGxldCB4YXhpc3RpdGxlID0gYXhpc3RpdGxlcyAhPSBudWxsICYmIGF4aXN0aXRsZXMueGF4aXMgPyBheGlzdGl0bGVzLnhheGlzIDogbnVsbDtcbiAgICAgICAgbGV0IHlheGlzdGl0bGUgPSBheGlzdGl0bGVzICE9IG51bGwgJiYgYXhpc3RpdGxlcy55YXhpcyA/IGF4aXN0aXRsZXMueWF4aXMgOiBudWxsO1xuXG4gICAgICAgIHN3aXRjaCAoY2hhcnRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIENoYXJ0VHlwZS5CYXI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCYXJDaGFydChcbiAgICAgICAgICAgICAgICAgICAgeGF4aXN0aXRsZSwgeWF4aXN0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IEJhckNoYXJ0UGFyYW1ldGVycyhwYXJhbWV0ZXJzKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IEJhckNoYXJ0U3R5bGUoc3R5bGUpKTtcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRUeXBlLlNpbXBsZUxpbmU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICBuZXcgU2ltcGxlTGluZUNoYXJ0KFxuICAgICAgICAgICAgICAgICAgICB4YXhpc3RpdGxlLCB5YXhpc3RpdGxlLFxuICAgICAgICAgICAgICAgICAgICBuZXcgU2ltcGxlTGluZUNoYXJ0UGFyYW1ldGVycyhwYXJhbWV0ZXJzKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNpbXBsZUxpbmVDaGFydFN0eWxlKHN0eWxlKSk7XG4gICAgICAgICAgICBjYXNlIENoYXJ0VHlwZS5MaW5lOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTXVsdGlMaW5lQ2hhcnQoXG4gICAgICAgICAgICAgICAgICAgIHhheGlzdGl0bGUsIHlheGlzdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIG5ldyBNdWx0aUxpbmVDaGFydFBhcmFtZXRlcnMocGFyYW1ldGVycyksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBNdWx0aUxpbmVDaGFydFN0eWxlKHN0eWxlKSk7XG4gICAgICAgICAgICBjYXNlIENoYXJ0VHlwZS5IaXN0b2dyYW06XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIaXN0b2dyYW0oXG4gICAgICAgICAgICAgICAgICAgIHhheGlzdGl0bGUsIHlheGlzdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIG5ldyBIaXN0b2dyYW1QYXJhbWV0ZXJzKHBhcmFtZXRlcnMpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgSGlzdG9ncmFtU3R5bGUoc3R5bGUpKTtcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRUeXBlLkR1YWxIaXN0b2dyYW06XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEdWFsSGlzdG9ncmFtcyhcbiAgICAgICAgICAgICAgICAgICAgeGF4aXN0aXRsZSwgeWF4aXN0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IER1YWxIaXN0b2dyYW1zUGFyYW1ldGVycyhwYXJhbWV0ZXJzKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IER1YWxIaXN0b2dyYW1TdHlsZShzdHlsZSkpO1xuICAgICAgICAgICAgY2FzZSBDaGFydFR5cGUuTXVsdGlIaXN0b2dyYW06XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNdWx0aUhpc3RvZ3JhbShcbiAgICAgICAgICAgICAgICAgICAgeGF4aXN0aXRsZSwgeWF4aXN0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IE11bHRpSGlzdG9ncmFtUGFyYW1ldGVycyhwYXJhbWV0ZXJzKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IE11bHRpSGlzdG9ncmFtU3R5bGUoc3R5bGUpKTtcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRUeXBlLlNjYXR0ZXJQbG90OlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTXVsdGlTY2F0dGVyUGxvdChcbiAgICAgICAgICAgICAgICAgICAgeGF4aXN0aXRsZSwgeWF4aXN0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IE11bHRpU2NhdHRlclBsb3RQYXJhbWV0ZXJzKHBhcmFtZXRlcnMpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgTXVsdGlTY2F0dGVyUGxvdFN0eWxlKHN0eWxlKSk7XG4gICAgICAgICAgICBjYXNlIENoYXJ0VHlwZS5IaXN0b2dyYW1QbHVzTGluZTpcbiAgICAgICAgICAgICAgICBsZXQgeTJheGlzdGl0bGUgPSBheGlzdGl0bGVzICE9IG51bGwgJiYgYXhpc3RpdGxlcy55MmF4aXMgPyBheGlzdGl0bGVzLnkyYXhpcyA6IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIaXN0b2dyYW1QbHVzTGluZShcbiAgICAgICAgICAgICAgICAgICAgeGF4aXN0aXRsZSwgeWF4aXN0aXRsZSwgeTJheGlzdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIG5ldyBIaXN0b2dyYW1QbHVzTGluZVBhcmFtZXRlcnMocGFyYW1ldGVycyksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBIaXN0b2dyYW1QbHVzTGluZVN0eWxlKHN0eWxlKSk7XG4gICAgICAgICAgICBjYXNlIENoYXJ0VHlwZS5TaW1wbGVTY2F0dGVyUGxvdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNjYXR0ZXJQbG90KFxuICAgICAgICAgICAgICAgICAgICB4YXhpc3RpdGxlLCB5YXhpc3RpdGxlLFxuICAgICAgICAgICAgICAgICAgICBuZXcgU2NhdHRlclBsb3RQYXJhbWV0ZXJzKHBhcmFtZXRlcnMpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgU2NhdHRlclBsb3RTdHlsZShzdHlsZSkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBcInVua25vd24gY2hhcnQgdHlwZVwiO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbi8qKlxuICogU3RhdGljIGNsYXNzIGZvciBjaGFydCBkZWZhdWx0IHNldHRpbmdzXG4gKi9cbmV4cG9ydCBjbGFzcyBDaGFydERlZmF1bHRTZXR0aW5ncyB7XG5cbiAgICAvLyBkZWZhdWx0IGNoYXJ0IGJvZHkgd2lkdGhcbiAgICBzdGF0aWMgY2hhcnRXaWR0aDogbnVtYmVyID0gNTAwO1xuXG4gICAgLy8gZGVmYXVsdCBjaGFydCBib2R5IGhlaWdodFxuICAgIHN0YXRpYyBjaGFydEhlaWdodDogbnVtYmVyID0gNTAwO1xuXG4gICAgLy8gZGVmYXVsdCBwYWRkaW5nIG9mIGNoYXJ0IHBhbmUgd2l0aGluIHRoZSBjaGFydCBib2R5XG4gICAgc3RhdGljIHBhZGRpbmc6IFBhZGRpbmcgPSB7dG9wOiAyMCwgbGVmdDogNzAsIGJvdHRvbTogNTAsIHJpZ2h0OiAxMH07XG5cbiAgICAvLyBkZWZhdWx0IHBhZGRpbmcgZm9yIGNoYXJ0cyB3aXRoIGEgc2Vjb25kYXkgeSBheGlzXG4gICAgc3RhdGljIHNlY29uZHlheGlzcGFkZGluZzogUGFkZGluZyA9IHt0b3A6IDIwLCBsZWZ0OiA3MCwgYm90dG9tOiA1MCwgcmlnaHQ6IDcwfTtcblxuICAgIC8vIGRlZmF1bHQgcGFkZGluZyBmb3IgY2hhcnRzIHdpdGggYSBsZWdlbmRcbiAgICBzdGF0aWMgbGVnZW5kZWRwYWRkaW5nOiBQYWRkaW5nID0ge3RvcDogMTAsIGxlZnQ6IDcwLCBib3R0b206IDUwLCByaWdodDogMTAwfTtcblxuICAgIC8vIGRlZmF1bHQgbnVtYmVyIG9mIHRpY2tzIG9uIHggYXhpc1xuICAgIHN0YXRpYyB4dGlja3M6IG51bWJlcjtcblxuICAgIC8vIGRlZmF1bHQgbnVtYmVyIG9mIHRpY2tzIG9uIHkgYXhpc1xuICAgIHN0YXRpYyB5dGlja3M6IG51bWJlcjtcblxuICAgIC8vIGRlZmF1bHQgZm9udCBmb3IgYWxsIGNoYXJ0IGxhYmVscyBhbmQgdGl0bGVcbiAgICBzdGF0aWMgZm9udDogRm9udCA9IHtuYW1lOiBcInNhbnMtc2VyaWZcIiwgc2l6ZTogMTMsIHdlaWdodDogbnVsbCwgc3R5bGU6IG51bGx9O1xuXG4gICAgLy8gZGVmYXVsdCBmb250IGZvciB0ZXh0IGFubm90YXRpb25zXG4gICAgc3RhdGljIGFubm90YXRpb25Gb250OiBGb250ID0ge25hbWU6IFwic2Fucy1zZXJpZlwiLCBzaXplOiAxMSwgd2VpZ2h0OiBudWxsLCBzdHlsZTogbnVsbH07XG5cbiAgICAvLyBkZWZhdWx0IGhvdmVyIGNvbG9yXG4gICAgc3RhdGljIGhvdmVyY29sb3I6IHN0cmluZyA9IFwib3JhbmdlXCI7XG5cbiAgICAvLyBkZWZhdWx0IGNvbG9yIHBhbGV0dGUgZm9yIGNoYXJ0c1xuICAgIHByaXZhdGUgc3RhdGljIGNvbG9yUGFsZXR0ZTogc3RyaW5nW10gPSBbIFwiIzI2NDg2OFwiLCBcIiM3QTk5QkNcIiwgXCJncmVlblwiLCBcIiM0MGNjNDBcIiwgXCJvcmFuZ2VcIiwgXCJyZWRcIiwgXCJ2aW9sZXRcIiwgXCJjeWFuXCIgXTtcblxuICAgIC8vIHJldHVybnMgdGhlIGRlZmF1bHQgY29sb3IgcGFsZXR0ZVxuICAgIHN0YXRpYyBnZXRDb2xvclBhbGV0dGUoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xvclBhbGV0dGU7XG4gICAgfVxuXG4gICAgLy8gc2V0cyB0aGUgZGVmYXVsdCBjb2xvciBwYWxldHRlIChtYXggb2YgOCBjb2xvcnMpXG4gICAgc3RhdGljIHNldENvbG9yUGFsZXR0ZShjb2xvcnM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGlmIChjb2xvcnMgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgXCJwcm92aWRlZCBjb2xvciBwYWxldHRlIHdhcyBudWxsXCI7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1hdGgubWluKGNvbG9ycy5sZW5ndGgsIHRoaXMuY29sb3JQYWxldHRlLmxlbmd0aCk7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jb2xvclBhbGV0dGVbaV0gPSBjb2xvcnNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnZXQgdGhlIGRlZmF1bHQgY29sb3IgZm9yIGEgcHJvdmlkZWQgaW5kZXggKG1heCBvZiA4IGNvbG9ycylcbiAgICBzdGF0aWMgZ2V0UGFsZXR0ZUNvbG9yKGk6bnVtYmVyKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAoaSA8IDAgfHwgaSA+PSB0aGlzLmNvbG9yUGFsZXR0ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JQYWxldHRlW2ldO1xuICAgIH1cblxuICAgIC8vIHNldCB0aGUgZGVmYXVsdCBjb2xvciBmb3IgYSBwcm92aWRlZCBpbmRleCAobWF4IG9mIDggY29sb3JzKVxuICAgIHN0YXRpYyBzZXRQYWxldHRlQ29sb3IoaTpudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcblxuICAgICAgICBpZiAoaSA8IDAgfHwgaSA+PSB0aGlzLmNvbG9yUGFsZXR0ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29sb3JQYWxldHRlW2ldID0gY29sb3I7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyBhbiBhcnJheSBvZiBjb2xvcnMgd2l0aCBhbnkgdW5zZXQgY29sb3JzIHNldCB0byB0aGVpciBkZWZhdWx0IGNvbG9yXG4gICAgc3RhdGljIGdldENvbG9yc1dpdGhEZWZhdWx0cyhjb2xvcnM6IHN0cmluZ1tdLCBudW1iZXJPZkNvbG9yczogbnVtYmVyKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoY29sb3JzID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbG9ycyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZkNvbG9yczsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY29sb3JzLmxlbmd0aCA9PT0gaSkge1xuICAgICAgICAgICAgICAgIGNvbG9ycy5wdXNoKENoYXJ0RGVmYXVsdFNldHRpbmdzLmdldFBhbGV0dGVDb2xvcihpKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbG9yc1tpXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29sb3JzLnB1c2goQ2hhcnREZWZhdWx0U2V0dGluZ3MuZ2V0UGFsZXR0ZUNvbG9yKGkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2xvcnM7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyBhIHBhZGRpbmcgd2l0aCBkZWZhdWx0cyBmaWxsZWQgaW5cbiAgICBzdGF0aWMgZ2V0UGFkZGluZ1dpdGhEZWZhdWx0cyhwYWRkaW5nOiBQYWRkaW5nLCBkZWZhdWx0UGFkZGluZzogUGFkZGluZyA9IENoYXJ0RGVmYXVsdFNldHRpbmdzLnBhZGRpbmcpOiBQYWRkaW5nIHtcbiAgICAgICAgcmV0dXJuIENoYXJ0RGVmYXVsdFNldHRpbmdzLmdldFNldHRpbmdXaXRoRGVmYXVsdHMocGFkZGluZywgZGVmYXVsdFBhZGRpbmcpO1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgYSBmb250IHdpdGggZGVmYXVsdHMgZmlsbGVkIGluXG4gICAgc3RhdGljIGdldEZvbnRXaXRoRGVmYXVsdHMoZm9udDogRm9udCwgZGVmYXVsdEZvbnQ6IEZvbnQgPSBDaGFydERlZmF1bHRTZXR0aW5ncy5mb250KTogRm9udCB7XG4gICAgICAgIHJldHVybiBDaGFydERlZmF1bHRTZXR0aW5ncy5nZXRTZXR0aW5nV2l0aERlZmF1bHRzKGZvbnQsIGRlZmF1bHRGb250KTtcbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIGFuIG9mZnNldCB3aXRoIGRlZmF1bHRzIGZpbGxlZCBpblxuICAgIHN0YXRpYyBnZXRPZmZzZXRXaXRoRGVmYXVsdHMob2Zmc2V0OiBPZmZzZXQsIGRlZmF1bHRPZmZzZXQ6IE9mZnNldCA9IHsgeDogMCwgeTogMCB9KTogT2Zmc2V0IHtcbiAgICAgICAgcmV0dXJuIENoYXJ0RGVmYXVsdFNldHRpbmdzLmdldFNldHRpbmdXaXRoRGVmYXVsdHMob2Zmc2V0LCBkZWZhdWx0T2Zmc2V0KTtcbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIGEgc2V0dGluZyB3aXRoIGRlZmF1bHRzIGZpbGxlZCBpblxuICAgIHByaXZhdGUgc3RhdGljIGdldFNldHRpbmdXaXRoRGVmYXVsdHMoc2V0dGluZzogYW55LCBkZWZhdWx0U2V0dGluZzogYW55KTogYW55IHtcbiAgICAgICAgaWYgKHNldHRpbmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRTZXR0aW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgc2kgaW4gZGVmYXVsdFNldHRpbmcpIHtcbiAgICAgICAgICAgIGlmIChkZWZhdWx0U2V0dGluZy5oYXNPd25Qcm9wZXJ0eShzaSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHNldHRpbmdbc2ldKSAhPSAndW5kZWZpbmVkJyAmJiBzZXR0aW5nW3NpXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXR0aW5nW3NpXSA9IGRlZmF1bHRTZXR0aW5nW3NpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZXR0aW5nO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEJhc2UgY2hhcnQgY2xhc3Mgd2hpY2ggaGFuZGxlcyBzZXR1cCBvZiBiYXNpYyBjaGFydCBkaW1lbnNpb25zXG4gKi9cbmV4cG9ydCBjbGFzcyBDaGFydEJhc2U8VCBleHRlbmRzIENoYXJ0UGFyYW1ldGVycywgVSBleHRlbmRzIENoYXJ0U3R5bGUsIFY+IHtcbiAgICBwdWJsaWMgeGF4aXN0aXRsZTogc3RyaW5nO1xuICAgIHB1YmxpYyB5YXhpc3RpdGxlOiBzdHJpbmc7XG4gICAgcHVibGljIHBhcmFtZXRlcnM6IFQ7XG4gICAgcHVibGljIHN0eWxlOiBVO1xuXG4gICAgY29uc3RydWN0b3IoeGF4aXN0aXRsZTogc3RyaW5nID0gbnVsbCwgeWF4aXN0aXRsZTogc3RyaW5nID0gbnVsbCxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiBUID0gbnVsbCwgc3R5bGU6IFUgPSBudWxsKSB7XG5cbiAgICAgICAgdGhpcy54YXhpc3RpdGxlID0geGF4aXN0aXRsZTtcbiAgICAgICAgdGhpcy55YXhpc3RpdGxlID0geWF4aXN0aXRsZTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcbiAgICAgICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xuXG4gICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gdGhpcy5jcmVhdGVQYXJhbWV0ZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdHlsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gdGhpcy5jcmVhdGVTdHlsZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXJEZWZhdWx0cygpO1xuXG4gICAgICAgIHRoaXMuc2V0U3R5bGVEZWZhdWx0cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVQYXJhbWV0ZXJzKCk6IFQge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVTdHlsZSgpOiBVIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkZWZhdWx0IHBhcmFtZXRlcnMgZm9yIHRoZSBjaGFydC5cbiAgICAgKiBPdmVycmlkZSB0byBzZXR1cCBkZWZhdWx0cyBhcyBuZWVkZWQgZm9yIHRoZSBwYXJ0aWN1bGFyIGNoYXJ0IHR5cGUuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHNldFBhcmFtZXRlckRlZmF1bHRzKCkgIHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBhcmFtZXRlcnM7XG5cbiAgICAgICAgaWYgKHAud2lkdGggPT0gbnVsbCkge1xuICAgICAgICAgICAgcC53aWR0aCA9IENoYXJ0RGVmYXVsdFNldHRpbmdzLmNoYXJ0V2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocC5oZWlnaHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcC5oZWlnaHQgPSBDaGFydERlZmF1bHRTZXR0aW5ncy5jaGFydEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHAucGFkZGluZyA9IENoYXJ0RGVmYXVsdFNldHRpbmdzLmdldFBhZGRpbmdXaXRoRGVmYXVsdHMocC5wYWRkaW5nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkZWZhdWx0IHN0eWxlIHNldHRpbmdzIGZvciB0aGUgY2hhcnQuXG4gICAgICogT3ZlcnJpZGUgdG8gc2V0dXAgZGVmYXVsdHMgYXMgbmVlZGVkIGZvciB0aGUgcGFydGljdWxhciBjaGFydCB0eXBlLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzZXRTdHlsZURlZmF1bHRzKCkgIHtcbiAgICAgICAgbGV0IHMgPSB0aGlzLnN0eWxlO1xuXG4gICAgICAgIHMuZGVmYXVsdEZvbnQgPSBDaGFydERlZmF1bHRTZXR0aW5ncy5nZXRGb250V2l0aERlZmF1bHRzKHMuZGVmYXVsdEZvbnQpO1xuXG4gICAgICAgIGlmIChzLmRlZmF1bHRUZXh0Q29sb3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgcy5kZWZhdWx0VGV4dENvbG9yID0gXCJibGFja1wiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSB2ZWdhIHNwZWMgZm9yIHJlbmRlcmluZyBvZiB0aGUgY2hhcnQuXG4gICAgICogQWRkcyB0aGUgdGhlIGNoYXJ0IGRpbWVuc2lvbiBzcGVjIGl0ZW1zXG4gICAgICogT3ZlcnJpZGUgdG8gYWRkIHRoZSBuZWNlc3Nhcnkgc3BlYyBpdGVtcyBmb3IgdGhlIHBhcnRpY3VsYXIgY2hhcnQgdHlwZS5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY3JlYXRlU3BlYyhkYXRhOiBWKTogT2JqZWN0IHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBhcmFtZXRlcnM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogcC53aWR0aCAtIHAucGFkZGluZy5yaWdodCAtIHAucGFkZGluZy5sZWZ0LFxuICAgICAgICAgICAgaGVpZ2h0OiBwLmhlaWdodCAtIHAucGFkZGluZy50b3AgLSBwLnBhZGRpbmcuYm90dG9tLFxuICAgICAgICAgICAgcGFkZGluZzogcC5wYWRkaW5nXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyAocmVuZGVyKSB0aGUgY2hhcnQgd2l0aCB0aGUgcHJvdmlkZWQgY2hhcnQgZGF0YSBhdCB0aGUgY2hhcnQgZWxlbWVudCBpZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvdyhjaGFydGlkOiBzdHJpbmcsIGRhdGE6Vikge1xuICAgICAgICBsZXQgc3BlYyA9IHRoaXMuY3JlYXRlU3BlYyhkYXRhKTtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBcIiNcIiArIGNoYXJ0aWQ7XG4gICAgICAgIGxldCBwID0gdGhpcy5wYXJhbWV0ZXJzO1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgcGFyc2Uuc3BlYyhzcGVjLCBmdW5jdGlvbiAoY2hhcnQpIHtcbiAgICAgICAgICAgIGxldCBjID0gY2hhcnQoe2VsOiBlbGVtZW50LCByZW5kZXJlcjogXCJzdmdcIn0pO1xuICAgICAgICAgICAgdGhhdC5hZGRDaGFydEJlaGF2aW9ycyhjLCBwKTtcbiAgICAgICAgICAgIGMudXBkYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogQWRkcyBhbnkgZGVzaXJlZCBjaGFydCBiZWhhdmlvcnMgdG8gc2lnbmFsIGV2ZW50cy5cbiAgICAgKiBPdmVycmlkZSB0byBhZGQgYmVoYXZpb3JzIGZvciBwYXJ0aWN1bGFyIGNoYXJ0IHR5cGVzLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhZGRDaGFydEJlaGF2aW9ycyhjOiBWaWV3LCBwOiBUKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHRoZSBjaGFydCBhbmQgd3JpdGVzIGFzIGEgcG5nIGZpbGUuXG4gICAgICovXG4gICAgcHVibGljIHdyaXRlUG5nKGRhdGE6ViwgZmlsZXBhdGg6IHN0cmluZykge1xuLypcblxuICAgICAgICBpZiAodHlwZW9mIGZzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbm5vdCB3cml0ZSBwbmcgZmlsZSBmcm9tIGJyb3dzZXJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNwZWMgPSB0aGlzLmNyZWF0ZVNwZWMoZGF0YSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZW5kc1dpdGgoZmlsZXBhdGgsIFwiLnBuZ1wiKSA9PT0gZmFsc2UpXG4gICAgICAgICAgICBmaWxlcGF0aCA9IGZpbGVwYXRoICsgXCIucG5nXCI7XG5cbiAgICAgICAgdmcucGFyc2Uuc3BlYyhzcGVjLCBmdW5jdGlvbiAoY2hhcnQpIHtcbiAgICAgICAgICAgIGxldCBjID0gY2hhcnQoe3JlbmRlcmVyOiBcImNhbnZhc1wifSk7XG4gICAgICAgICAgICBjLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICBsZXQgY2FudmFzID0gYy5jYW52YXMoKTtcblxuICAgICAgICAgICAgbGV0IG91dCA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGZpbGVwYXRoKVxuICAgICAgICAgICAgbGV0IHN0cmVhbSA9IGNhbnZhcy5wbmdTdHJlYW0oKTtcblxuICAgICAgICAgICAgc3RyZWFtLm9uKFwiZGF0YVwiLCBmdW5jdGlvbihjaHVuayl7XG4gICAgICAgICAgICAgICAgb3V0LndyaXRlKGNodW5rKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzdHJlYW0ub24oJ2VuZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NhdmVkIHBuZzogJyArIGZpbGVwYXRoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiovXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHRoZSBjaGFydCBhbmQgd3JpdGVzIGFzIGFuIHN2ZyBmaWxlLlxuICAgICAqL1xuICAgIHB1YmxpYyB3cml0ZVN2ZyhkYXRhOlYsIGZpbGVwYXRoOiBzdHJpbmcpIHtcbi8qXG5cbiAgICAgICAgaWYgKHR5cGVvZiBmcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgZnMgPSByZXF1aXJlKCdmcycpO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW5ub3Qgd3JpdGUgcG5nIGZpbGUgZnJvbSBicm93c2VyXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzcGVjID0gdGhpcy5jcmVhdGVTcGVjKGRhdGEpO1xuXG4gICAgICAgIGlmICh0aGlzLmVuZHNXaXRoKGZpbGVwYXRoLCBcIi5zdmdcIikgPT09IGZhbHNlKVxuICAgICAgICAgICAgZmlsZXBhdGggPSBmaWxlcGF0aCArIFwiLnN2Z1wiO1xuXG4gICAgICAgIHZnLnBhcnNlLnNwZWMoc3BlYywgZnVuY3Rpb24gKGNoYXJ0KSB7XG4gICAgICAgICAgICBsZXQgYyA9IGNoYXJ0KHtyZW5kZXJlcjogXCJzdmdcIn0pO1xuICAgICAgICAgICAgYy51cGRhdGUoKTtcblxuICAgICAgICAgICAgbGV0IHN2ZyA9IGMuc3ZnKCk7XG5cbiAgICAgICAgICAgIGxldCBvdXQgPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShmaWxlcGF0aClcbiAgICAgICAgICAgIG91dC53cml0ZShzdmcpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2F2ZWQgc3ZnOiAnICsgZmlsZXBhdGgpO1xuICAgICAgICB9KTtcbiovXG4gICAgfVxuXG4gICAgLy8gdGVzdHMgaWYgYSBzdHJpbmcgZW5kcyB3aXRoIHRoZSBwcm92aWRlIHN1ZmZpeFxuICAgIHByaXZhdGUgZW5kc1dpdGgoc3RyLCBzdWZmaXgpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5pbmRleE9mKHN1ZmZpeCwgc3RyLmxlbmd0aCAtIHN1ZmZpeC5sZW5ndGgpICE9PSAtMTtcbiAgICB9XG59XG5cbi8qKlxuICogQmFzZSBjaGFydCBjbGFzcyBmb3IgY2hhcnQgd2hpY2ggY29udGFpbiB4IGFuZCB5IGF4ZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBYeUNoYXJ0PFQgZXh0ZW5kcyBYeUNoYXJ0UGFyYW1ldGVycywgVSBleHRlbmRzIFh5Q2hhcnRTdHlsZSwgVj4gIGV4dGVuZHMgQ2hhcnRCYXNlPFQsIFUsIFY+IHtcbiAgICBjb25zdHJ1Y3Rvcih4YXhpc3RpdGxlOnN0cmluZyA9IG51bGwsIHlheGlzdGl0bGU6c3RyaW5nID0gbnVsbCwgcGFyYW1ldGVyczogVCwgc3R5bGU6IFUpIHtcbiAgICAgICAgc3VwZXIoeGF4aXN0aXRsZSwgeWF4aXN0aXRsZSwgcGFyYW1ldGVycywgc3R5bGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGRlZmF1bHQgeCBhbmQgeSBheGlzIHBhcmFtZXRlcnMgZm9yIHRoZSBjaGFydC5cbiAgICAgKiBPdmVycmlkZSB0byBzZXR1cCBkZWZhdWx0cyBhcyBuZWVkZWQgZm9yIHRoZSBwYXJ0aWN1bGFyIGNoYXJ0IHR5cGUuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHNldFBhcmFtZXRlckRlZmF1bHRzKCkge1xuXG4gICAgICAgIHN1cGVyLnNldFBhcmFtZXRlckRlZmF1bHRzKCk7XG5cbiAgICAgICAgbGV0IHAgPSB0aGlzLnBhcmFtZXRlcnM7XG5cbiAgICAgICAgaWYgKHAuc2hvd2F4ZXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgcC5zaG93YXhlcyA9IEF4ZXMuWFk7IC8vIGRlZmF1bHQgdG8gc2hvdyB4IGFuZCB5IGF4ZXNcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwLnNob3dncmlkbGluZXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgcC5zaG93Z3JpZGxpbmVzID0gQXhlcy5YWTsgIC8vIGRlZmF1bHQgdG8gc2hvdyB4IGFuZCB5IGdyaWQgbGluZXNcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwLnhtaW4gPT0gbnVsbCkge1xuICAgICAgICAgICAgcC54bWluID0gTmFOOyAgLy8gTmFOIGxldHMgaXQgYmUgc2V0IGJ5IHRoZSBkYXRhXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocC54bWF4ID09IG51bGwpIHtcbiAgICAgICAgICAgIHAueG1heCA9IE5hTjsgIC8vIE5hTiBsZXRzIGl0IGJlIHNldCBieSB0aGUgZGF0YVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHAueW1pbiA9PSBudWxsKSB7XG4gICAgICAgICAgICBwLnltaW4gPSAwOyAgLy8gZ2VuZXJhbGx5IHkgbWluIG9mIHplcm8gaXMgZGVzaXJlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHAueW1heCA9PSBudWxsKSB7XG4gICAgICAgICAgICBwLnltYXggPSBOYU47ICAvLyBOYU4gbGV0cyBpdCBiZSBzZXQgYnkgdGhlIGRhdGFcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwLnh0aWNrcyA9PSBudWxsKSB7XG4gICAgICAgICAgICBwLnh0aWNrcyA9IENoYXJ0RGVmYXVsdFNldHRpbmdzLnh0aWNrcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwLnl0aWNrcyA9PSBudWxsKSB7XG4gICAgICAgICAgICBwLnl0aWNrcyA9IENoYXJ0RGVmYXVsdFNldHRpbmdzLnh0aWNrcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICogU2V0cyB0aGUgZGVmYXVsdCB4IGFuZCB5IGF4aXMgc3R5bGUgc2V0dGluZ3MgZm9yIHRoZSBjaGFydC5cbiAgICAgKiBPdmVycmlkZSB0byBzZXR1cCBkZWZhdWx0cyBhcyBuZWVkZWQgZm9yIHRoZSBwYXJ0aWN1bGFyIGNoYXJ0IHR5cGUuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHNldFN0eWxlRGVmYXVsdHMoKSAge1xuICAgICAgICBzdXBlci5zZXRTdHlsZURlZmF1bHRzKCk7XG5cbiAgICAgICAgbGV0IHMgPSB0aGlzLnN0eWxlO1xuXG4gICAgICAgIHMuYXhpc0xhYmVsRm9udCA9IENoYXJ0RGVmYXVsdFNldHRpbmdzLmdldEZvbnRXaXRoRGVmYXVsdHMocy5heGlzTGFiZWxGb250LCBzLmRlZmF1bHRGb250KTtcblxuICAgICAgICBsZXQgZGVmYXVsdFRpdGxlRm9udCA9IENoYXJ0RGVmYXVsdFNldHRpbmdzLmdldEZvbnRXaXRoRGVmYXVsdHMoeyB3ZWlnaHQ6IEZvbnRXZWlnaHQuYm9sZCB9LCBzLmRlZmF1bHRGb250KVxuXG4gICAgICAgIHMuYXhpc1RpdGxlRm9udCA9IENoYXJ0RGVmYXVsdFNldHRpbmdzLmdldEZvbnRXaXRoRGVmYXVsdHMocy5heGlzVGl0bGVGb250LCBkZWZhdWx0VGl0bGVGb250KTtcblxuICAgICAgICBpZiAocy5heGlzTGFiZWxDb2xvciA9PSBudWxsKSB7XG4gICAgICAgICAgICBzLmF4aXNMYWJlbENvbG9yID0gcy5kZWZhdWx0VGV4dENvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHMuYXhpc1RpdGxlQ29sb3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgcy5heGlzVGl0bGVDb2xvciA9IHMuZGVmYXVsdFRleHRDb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzLmF4aXNDb2xvciA9PSBudWxsKSB7XG4gICAgICAgICAgICBzLmF4aXNDb2xvciA9IFwiYmxhY2tcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzLmF4aXNTdHJva2VXaWR0aCA9PSBudWxsKSB7XG4gICAgICAgICAgICBzLmF4aXNTdHJva2VXaWR0aCA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocy5heGlzR3JpZENvbG9yID09IG51bGwpIHtcbiAgICAgICAgICAgIHMuYXhpc0dyaWRDb2xvciA9IFwiYmx1ZVwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBDcmVhdGUgdGhlIGNoYXJ0IHNwZWMgZm9yIHJlbmRlcmluZyBvZiB0aGUgY2hhcnQuXG4gICAgICogQWRkcyB0aGUgdGhlIGNoYXJ0IHggYW5kIHkgc2NhbGUgYW5kIGF4ZXMgc3BlYyBpdGVtc1xuICAgICAqIE92ZXJyaWRlIHRvIGFkZCB0aGUgbmVjZXNzYXJ5IHNwZWMgaXRlbXMgZm9yIHRoZSBwYXJ0aWN1bGFyIGNoYXJ0IHR5cGUuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVNwZWMoZGF0YTogVik6IE9iamVjdCB7XG4gICAgICAgIGxldCBzcGVjID0gc3VwZXIuY3JlYXRlU3BlYyhkYXRhKTtcblxuICAgICAgICBsZXQgcCA9IHRoaXMucGFyYW1ldGVycztcbiAgICAgICAgbGV0IHMgPSB0aGlzLnN0eWxlO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgeCBhbmQgeSBzY2FsZXNcbiAgICAgICAgc3BlY1tcInNjYWxlc1wiXSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcInhzY2FsZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuZ2V0WHNjYWxlVHlwZSgpLFxuICAgICAgICAgICAgICAgIHJhbmdlOiBcIndpZHRoXCIsXG4gICAgICAgICAgICAgICAgemVybzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZG9tYWluOiB0aGlzLmdldFhTY2FsZURhdGEoZGF0YSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJ5c2NhbGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLmdldFlzY2FsZVR5cGUoKSxcbiAgICAgICAgICAgICAgICByYW5nZTogXCJoZWlnaHRcIixcbiAgICAgICAgICAgICAgICB6ZXJvOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBuaWNlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkb21haW46IHRoaXMuZ2V0WVNjYWxlRGF0YShkYXRhKVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgeCBhbmQgeSBheGVzIGFjY29yZGluZyB0byB0aGUgc2hvd2F4ZXMgcGFyYW1ldGVyXG4gICAgICAgIHNwZWNbXCJheGVzXCJdID0gW107XG5cbiAgICAgICAgaWYgKHAuc2hvd2F4ZXMgPT09IEF4ZXMuWFkgfHwgcC5zaG93YXhlcyA9PT0gQXhlcy5YKSB7IC8vIGFkZCB0aGUgeCBheGlzXG4gICAgICAgICAgICBzcGVjW1wiYXhlc1wiXS5wdXNoKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ4XCIsXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlOiBcInhzY2FsZVwiLFxuICAgICAgICAgICAgICAgICAgICB0aWNrczogcC54dGlja3MsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogKHAueHRpY2tzICE9IG51bGwgJiYgcC54dGlja3MgPD0gMCkgPyBbXSA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGdyaWQ6IHAuc2hvd2dyaWRsaW5lcyA9PT0gQXhlcy5YWSB8fCBwLnNob3dncmlkbGluZXMgPT09IEF4ZXMuWCxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMueGF4aXN0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U6IHt2YWx1ZTogcy5heGlzQ29sb3J9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDoge3ZhbHVlOiBzLmF4aXNMYWJlbENvbG9yfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250OiB7dmFsdWU6IHMuYXhpc0xhYmVsRm9udC5uYW1lfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZToge3ZhbHVlOiBzLmF4aXNMYWJlbEZvbnQuc2l6ZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDoge3ZhbHVlOiBzLmF4aXNMYWJlbEZvbnQud2VpZ2h0ID8gcy5heGlzTGFiZWxGb250LndlaWdodC50b1N0cmluZygpIDogbnVsbH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFN0eWxlOiB7dmFsdWU6IHMuYXhpc0xhYmVsRm9udC5zdHlsZSA/IHMuYXhpc0xhYmVsRm9udC5zdHlsZS50b1N0cmluZygpIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw6IHt2YWx1ZTogcy5heGlzVGl0bGVDb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udDoge3ZhbHVlOiBzLmF4aXNUaXRsZUZvbnQubmFtZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IHt2YWx1ZTogcy5heGlzVGl0bGVGb250LnNpemV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IHt2YWx1ZTogcy5heGlzVGl0bGVGb250LndlaWdodCA/IHMuYXhpc1RpdGxlRm9udC53ZWlnaHQudG9TdHJpbmcoKSA6IG51bGx9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTdHlsZToge3ZhbHVlOiBzLmF4aXNUaXRsZUZvbnQuc3R5bGUgPyBzLmF4aXNUaXRsZUZvbnQuc3R5bGUudG9TdHJpbmcoKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgYXhpczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZToge3ZhbHVlOiBzLmF4aXNDb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IHt2YWx1ZTogcy5heGlzU3Ryb2tlV2lkdGh9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZToge3ZhbHVlOiBzLmF4aXNHcmlkQ29sb3J9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwLnNob3dheGVzID09PSBBeGVzLlhZIHx8IHAuc2hvd2F4ZXMgPT09IEF4ZXMuWSkgeyAgIC8vIGFkZCB0aGUgeSBheGlzXG4gICAgICAgICAgICBzcGVjW1wiYXhlc1wiXS5wdXNoKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ5XCIsXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlOiBcInlzY2FsZVwiLFxuICAgICAgICAgICAgICAgICAgICB0aWNrczogcC55dGlja3MsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogKHAueXRpY2tzICE9IG51bGwgJiYgcC55dGlja3MgPD0gMCkgPyBbXSA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGdyaWQ6IHAuc2hvd2dyaWRsaW5lcyA9PT0gQXhlcy5YWSB8fCBwLnNob3dncmlkbGluZXMgPT09IEF4ZXMuWSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMueWF4aXN0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U6IHt2YWx1ZTogcy5heGlzQ29sb3J9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDoge3ZhbHVlOiBzLmF4aXNMYWJlbENvbG9yfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250OiB7dmFsdWU6IHMuYXhpc0xhYmVsRm9udC5uYW1lfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZToge3ZhbHVlOiBzLmF4aXNMYWJlbEZvbnQuc2l6ZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDoge3ZhbHVlOiBzLmF4aXNMYWJlbEZvbnQud2VpZ2h0ID8gcy5heGlzTGFiZWxGb250LndlaWdodC50b1N0cmluZygpIDogbnVsbH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFN0eWxlOiB7dmFsdWU6IHMuYXhpc0xhYmVsRm9udC5zdHlsZSA/IHMuYXhpc0xhYmVsRm9udC5zdHlsZS50b1N0cmluZygpIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw6IHt2YWx1ZTogcy5heGlzVGl0bGVDb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udDoge3ZhbHVlOiBzLmF4aXNUaXRsZUZvbnQubmFtZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IHt2YWx1ZTogcy5heGlzVGl0bGVGb250LnNpemV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IHt2YWx1ZTogcy5heGlzVGl0bGVGb250LndlaWdodCA/IHMuYXhpc1RpdGxlRm9udC53ZWlnaHQudG9TdHJpbmcoKSA6IG51bGx9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTdHlsZToge3ZhbHVlOiBzLmF4aXNUaXRsZUZvbnQuc3R5bGUgPyBzLmF4aXNUaXRsZUZvbnQuc3R5bGUudG9TdHJpbmcoKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgYXhpczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZToge3ZhbHVlOiBzLmF4aXNDb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IHt2YWx1ZTogcy5heGlzU3Ryb2tlV2lkdGh9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZToge3ZhbHVlOiBzLmF4aXNHcmlkQ29sb3J9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgZGF0YSBhbmQgbWFya3Mgc3BlYyBhcnJheXNcbiAgICAgICAgc3BlY1tcImRhdGFcIl0gPSBbXTtcbiAgICAgICAgc3BlY1tcIm1hcmtzXCJdID0gW107XG5cbiAgICAgICAgLy8gYWRkIGFueSBwcm92aWRlZCBhbm5vdGF0aW9uIG1hcmtzIHRvIHRoZSBzcGVjXG4gICAgICAgIGlmIChwLmFubm90YXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGFpZHggaW4gcC5hbm5vdGF0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChwLmFubm90YXRpb25zLmhhc093blByb3BlcnR5KGFpZHgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQW5ub3RhdGlvbk1hcmsocGFyc2VJbnQoYWlkeCwgMTApLCBwLmFubm90YXRpb25zW2FpZHhdLCBzcGVjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3BlYztcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIEZpbmRzIGFuZCByZXR1cm5zIHRoZSBtaW4gYW5kIG1heCBmb3IgdGhlIHByb3ZpZGVkIGFycmF5LiAgVXNlcyB0aGUgZml4ZWRtaW4gYW5kIGZpeGVkbWF4XG4gICAgICogdmFsdWVzIGlmIHByb3ZpZGVkLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRNaW5NYXgoYXJyYXk6IG51bWJlcltdLCBmaXhlZG1pbjogbnVtYmVyLCBmaXhlZG1heDogbnVtYmVyKTogbnVtYmVyW10ge1xuICAgICAgICBpZiAoZml4ZWRtaW4gIT0gbnVsbCAmJiAhaXNOYU4oZml4ZWRtaW4pICYmIGZpeGVkbWF4ICE9IG51bGwgJiYgIWlzTmFOKGZpeGVkbWF4KSkge1xuICAgICAgICAgICAgcmV0dXJuIFtmaXhlZG1pbiwgZml4ZWRtYXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1pbiA9IGZpeGVkbWluO1xuICAgICAgICBsZXQgbWF4ID0gZml4ZWRtYXg7XG5cbiAgICAgICAgZm9yIChsZXQgaSBpbiBhcnJheSkge1xuICAgICAgICAgICAgaWYgKCFhcnJheS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHZhbCA9IGFycmF5W2ldO1xuICAgICAgICAgICAgaWYgKChmaXhlZG1pbiA9PSBudWxsIHx8IGlzTmFOKGZpeGVkbWluKSkgJiYgKCFtaW4gfHwgbWluID4gdmFsKSkge1xuICAgICAgICAgICAgICAgIG1pbiA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoZml4ZWRtYXggPT0gbnVsbCB8fCBpc05hTihmaXhlZG1heCkpICYmICghbWF4IHx8IG1heCA8IHZhbCkpIHtcbiAgICAgICAgICAgICAgICBtYXggPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gWyBtaW4sIG1heCBdO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogT3ZlcnJpZGUgdG8gcmV0dXJuIHRoZSBkYXRhIHRvIHVzZSBmb3IgZGVmaW5pbmcgdGhlIHggc2NhbGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0WFNjYWxlRGF0YShkYXRhOiBWKTogYW55W10ge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBPdmVycmlkZSB0byByZXR1cm4gdGhlIGRhdGEgdG8gdXNlIGZvciBkZWZpbmluZyB0aGUgeSBzY2FsZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRZU2NhbGVEYXRhKGRhdGE6IFYpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIFJldHVybnMgdGhlIHNjYWxlIHR5cGUgKGxpbmVhciwgb3JkaW5hbCwgZXRjKSBmb3IgdGhlIHggc2NhbGVcbiAgICAgKiBUaGUgZGVmYXVsdCBpcyBsaW5lYXIuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldFhzY2FsZVR5cGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwibGluZWFyXCI7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBSZXR1cm5zIHRoZSBzY2FsZSB0eXBlIChsaW5lYXIsIG9yZGluYWwsIGV0YykgZm9yIHRoZSB5IHNjYWxlXG4gICAgICogVGhlIGRlZmF1bHQgaXMgbGluZWFyLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRZc2NhbGVUeXBlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcImxpbmVhclwiO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogIEFkZCBhbiBhbm5vdGF0aW9uIG1hcmsgZm9yIHRoZSBwcm92aWRlZCBhbm5vdGF0aW9uIGRhdGEgdG8gdGhlIGNoYXJ0IHNwZWNcbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZEFubm90YXRpb25NYXJrKGluZGV4OiBudW1iZXIsIGFubm90YXRpb246YW55LCBzcGVjOiBPYmplY3QpIHtcbiAgICAgICAgc3dpdGNoIChhbm5vdGF0aW9uLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgQW5ub3RhdGlvblR5cGUuTGluZTpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZExpbmVNYXJrKGluZGV4LCBhbm5vdGF0aW9uLCBzcGVjKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQW5ub3RhdGlvblR5cGUuVmVydGljYWxMaW5lOlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkVmVydGljYWxMaW5lTWFyayhpbmRleCwgYW5ub3RhdGlvbiwgc3BlYyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFubm90YXRpb25UeXBlLkhvcml6b250YWxMaW5lOlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkSG9yaXpvbnRhbExpbmVNYXJrKGluZGV4LCBhbm5vdGF0aW9uLCBzcGVjKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQW5ub3RhdGlvblR5cGUuUG9pbnQ6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQb2ludE1hcmsoaW5kZXgsIGFubm90YXRpb24sIHNwZWMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBbm5vdGF0aW9uVHlwZS5SZWN0YW5nbGU6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSZWN0YW5nbGVNYXJrKGluZGV4LCBhbm5vdGF0aW9uLCBzcGVjKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQW5ub3RhdGlvblR5cGUuVGV4dDpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRleHRNYXJrKGluZGV4LCBhbm5vdGF0aW9uLCBzcGVjKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJ1bmtub3duIGFubm90YXRpb24gdHlwZVwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiAgQWRkIGEgbGluZSBhbm5vdGF0aW9uIG1hcmsgdG8gdGhlIGNoYXJ0IHNwZWNcbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZExpbmVNYXJrKGluZGV4OiBudW1iZXIsIGFubm90YXRpb246TGluZUFubm90YXRpb24sIHNwZWM6T2JqZWN0KSB7XG4gICAgICAgIGxldCBhID0gYW5ub3RhdGlvbjtcblxuICAgICAgICAvLyBhZGQgdGhlIGRhdGEgbmVlZGVkIHRvIGRyYXcgdGhlIGxpbmUgdG8gdGhlIHNwZWNcbiAgICAgICAgc3BlY1tcImRhdGFcIl0ucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBcImxpbmVhbm5vXCIgKyBpbmRleCxcbiAgICAgICAgICAgIHZhbHVlczogW3t4OiBhLnB0MS54LCB5OiBhLnB0MS55fSwge3g6IGEucHQyLngsIHk6IGEucHQyLnl9XVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBhZGQgdGhlIGxpbmUgbWFyayB0byB0aGUgc3BlY1xuICAgICAgICBzcGVjW1wibWFya3NcIl0ucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBcImxpbmVcIixcbiAgICAgICAgICAgIGZyb206IHsgZGF0YTogXCJsaW5lYW5ub1wiICsgaW5kZXggfSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBlbnRlcjoge1xuICAgICAgICAgICAgICAgICAgICBzdHJva2U6IHt2YWx1ZTogYS5jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoOiB7dmFsdWU6IGEubGluZXdpZHRofSxcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eToge3ZhbHVlOiBhLm9wYWNpdHl9LFxuICAgICAgICAgICAgICAgICAgICB4OiB7c2NhbGU6IFwieHNjYWxlXCIsIGZpZWxkOiBcInhcIn0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHtzY2FsZTogXCJ5c2NhbGVcIiwgZmllbGQ6IFwieVwifVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBBZGQgYSB2ZXJ0aWNhbCBsaW5lIGFubm90YXRpb24gdG8gdGhlIGNoYXJ0IHNwZWNcbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZFZlcnRpY2FsTGluZU1hcmsoaW5kZXg6IG51bWJlciwgYW5ub3RhdGlvbjpWZXJ0aWNhbExpbmVBbm5vdGF0aW9uLCBzcGVjOk9iamVjdCkge1xuICAgICAgICBsZXQgYSA9IGFubm90YXRpb247XG5cbiAgICAgICAgc3BlY1tcIm1hcmtzXCJdLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogXCJydWxlXCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgZW50ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiB7dmFsdWU6IGEuY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aDoge3ZhbHVlOiBhLmxpbmV3aWR0aH0sXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IHt2YWx1ZTogYS5vcGFjaXR5fSxcbiAgICAgICAgICAgICAgICAgICAgeDoge3NjYWxlOiBcInhzY2FsZVwiLCB2YWx1ZTogYS54IH0sXG4gICAgICAgICAgICAgICAgICAgIHgyOiB7c2NhbGU6IFwieHNjYWxlXCIsIHZhbHVlOiBhLnh9LFxuICAgICAgICAgICAgICAgICAgICB5OiB7dmFsdWU6IDB9LFxuICAgICAgICAgICAgICAgICAgICB5Mjoge2ZpZWxkOiB7Z3JvdXA6IFwiaGVpZ2h0XCJ9fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBBZGQgYSBob3Jpem9udGFsIGxpbmUgYW5ub3RhdGlvbiB0byB0aGUgY2hhcnQgc3BlY1xuICAgICAqL1xuICAgIHByaXZhdGUgYWRkSG9yaXpvbnRhbExpbmVNYXJrKGluZGV4OiBudW1iZXIsIGFubm90YXRpb246SG9yaXpvbnRhbExpbmVBbm5vdGF0aW9uLCBzcGVjOk9iamVjdCkge1xuICAgICAgICBsZXQgYSA9IGFubm90YXRpb247XG5cbiAgICAgICAgc3BlY1tcIm1hcmtzXCJdLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogXCJydWxlXCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgZW50ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiB7dmFsdWU6IGEuY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aDoge3ZhbHVlOiBhLmxpbmV3aWR0aH0sXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IHt2YWx1ZTogYS5vcGFjaXR5fSxcbiAgICAgICAgICAgICAgICAgICAgeDoge3ZhbHVlOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgeDI6IHtmaWVsZDoge2dyb3VwOiBcIndpZHRoXCJ9fSxcbiAgICAgICAgICAgICAgICAgICAgeToge3NjYWxlOiBcInlzY2FsZVwiLCB2YWx1ZTogYS55IH0sXG4gICAgICAgICAgICAgICAgICAgIHkyOiB7c2NhbGU6IFwieXNjYWxlXCIsIHZhbHVlOiBhLnkgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBBZGQgYSBwb2ludCAoY2lyY2xlKSBhbm5vdGF0aW9uIHRvIHRoZSBjaGFydCBzcGVjXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGRQb2ludE1hcmsoaW5kZXg6IG51bWJlciwgYW5ub3RhdGlvbjpQb2ludEFubm90YXRpb24sIHNwZWM6T2JqZWN0KSB7XG4gICAgICAgIGxldCBhID0gYW5ub3RhdGlvbjtcblxuICAgICAgICBzcGVjW1wibWFya3NcIl0ucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBcInN5bWJvbFwiLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGVudGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZToge3ZhbHVlOiBhLmNvbG9yfSxcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IHt2YWx1ZTogYS5saW5ld2lkdGh9LFxuICAgICAgICAgICAgICAgICAgICBmaWxsOiB7dmFsdWU6IGEuZmlsbH0sXG4gICAgICAgICAgICAgICAgICAgIGZpbGxPcGFjaXR5OiB7dmFsdWU6IGEuZmlsbG9wYWNpdHl9LFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiB7dmFsdWU6IGEub3BhY2l0eX0sXG4gICAgICAgICAgICAgICAgICAgIHNpemU6ICB7dmFsdWU6IGEubWFya2Vyc2l6ZX0sXG4gICAgICAgICAgICAgICAgICAgIHg6IHtzY2FsZTogXCJ4c2NhbGVcIiwgdmFsdWU6IGEubG9jYXRpb24ueCB9LFxuICAgICAgICAgICAgICAgICAgICB5OiB7c2NhbGU6IFwieXNjYWxlXCIsIHZhbHVlOiBhLmxvY2F0aW9uLnkgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBBZGQgYSByZWN0YW5nbGUgYW5ub3RhdGlvbiB0byB0aGUgY2hhcnQgc3BlY1xuICAgICAqL1xuICAgIHByaXZhdGUgYWRkUmVjdGFuZ2xlTWFyayhpbmRleDogbnVtYmVyLCBhbm5vdGF0aW9uOlJlY3RBbm5vdGF0aW9uLCBzcGVjOk9iamVjdCkge1xuICAgICAgICBsZXQgYSA9IGFubm90YXRpb247XG5cbiAgICAgICAgc3BlY1tcIm1hcmtzXCJdLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogXCJyZWN0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgZW50ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiB7dmFsdWU6IGEuY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aDoge3ZhbHVlOiBhLmxpbmV3aWR0aH0sXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IHt2YWx1ZTogYS5maWxsfSxcbiAgICAgICAgICAgICAgICAgICAgZmlsbE9wYWNpdHk6IHt2YWx1ZTogYS5maWxsb3BhY2l0eX0sXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IHt2YWx1ZTogYS5vcGFjaXR5fSxcbiAgICAgICAgICAgICAgICAgICAgeDoge3NjYWxlOiBcInhzY2FsZVwiLCB2YWx1ZTogYS5sb2NhdGlvbi54IH0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHtzY2FsZTogXCJ5c2NhbGVcIiwgdmFsdWU6IGEubG9jYXRpb24ueSB9LFxuICAgICAgICAgICAgICAgICAgICB4Mjoge3NjYWxlOiBcInhzY2FsZVwiLCB2YWx1ZTogYS5sb2NhdGlvbi54ICsgYS5zaXplLndpZHRoIH0sXG4gICAgICAgICAgICAgICAgICAgIHkyOiB7c2NhbGU6IFwieXNjYWxlXCIsIHZhbHVlOiBhLmxvY2F0aW9uLnkgKyBhLnNpemUuaGVpZ2h0IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogQWRkIGEgdGV4dCBhbm5vdGF0aW9uIHRvIHRoZSBjaGFydCBzcGVjXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGRUZXh0TWFyayhpbmRleDogbnVtYmVyLCBhbm5vdGF0aW9uOlRleHRBbm5vdGF0aW9uLCBzcGVjOk9iamVjdCkge1xuICAgICAgICBsZXQgYSA9IGFubm90YXRpb247XG5cbiAgICAgICAgc3BlY1tcIm1hcmtzXCJdLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgZW50ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDoge3ZhbHVlOiBhLnRleHR9LFxuICAgICAgICAgICAgICAgICAgICBmaWxsOiB7dmFsdWU6IGEuZmlsbH0sXG4gICAgICAgICAgICAgICAgICAgIGZpbGxPcGFjaXR5OiB7dmFsdWU6IGEuZmlsbG9wYWNpdHl9LFxuICAgICAgICAgICAgICAgICAgICB4OiB7c2NhbGU6IFwieHNjYWxlXCIsIHZhbHVlOiBhLmxvY2F0aW9uLnggfSxcbiAgICAgICAgICAgICAgICAgICAgeToge3NjYWxlOiBcInlzY2FsZVwiLCB2YWx1ZTogYS5sb2NhdGlvbi55IH0sXG4gICAgICAgICAgICAgICAgICAgIGR4OiB7dmFsdWU6IGEub2Zmc2V0cGl4ZWxzLnggfSxcbiAgICAgICAgICAgICAgICAgICAgZHk6IHt2YWx1ZTogYS5vZmZzZXRwaXhlbHMueSB9LFxuICAgICAgICAgICAgICAgICAgICBhbGlnbjoge3ZhbHVlOiBhLmFsaWduID8gYS5hbGlnbi50b1N0cmluZygpIDogbnVsbCB9LFxuICAgICAgICAgICAgICAgICAgICBiYXNlbGluZToge3ZhbHVlOiBhLmJhc2VsaW5lID8gYS5iYXNlbGluZS50b1N0cmluZygpIDogbnVsbCB9LFxuICAgICAgICAgICAgICAgICAgICBhbmdsZTogeyB2YWx1ZTogYS5hbmdsZSB9LFxuICAgICAgICAgICAgICAgICAgICBmb250OiB7dmFsdWU6IGEuZm9udC5uYW1lfSxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IHt2YWx1ZTogYS5mb250LnNpemV9LFxuICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiB7dmFsdWU6IGEuZm9udC53ZWlnaHQgPyBhLmZvbnQud2VpZ2h0LnRvU3RyaW5nKCkgOiBudWxsfSxcbiAgICAgICAgICAgICAgICAgICAgZm9udFN0eWxlOiB7dmFsdWU6IGEuZm9udC5zdHlsZSA/IGEuZm9udC5zdHlsZS50b1N0cmluZygpIDogbnVsbH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLypcbiAqIEJhc2UgY2hhcnQgY2xhc3MgZm9yIGNoYXJ0IHdoaWNoIGNvbnRhaW4gYW4geCBhbmQgdHdvIHkgYXhlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFh5eUNoYXJ0PFQgZXh0ZW5kcyBYeXlDaGFydFBhcmFtZXRlcnMsIFUgZXh0ZW5kcyBYeXlDaGFydFN0eWxlLCBWPiBleHRlbmRzIFh5Q2hhcnQ8VCwgVSwgVj4ge1xuICAgIHB1YmxpYyB5MmF4aXN0aXRsZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoeGF4aXN0aXRsZTogc3RyaW5nID0gbnVsbCwgeWF4aXN0aXRsZTogc3RyaW5nID0gbnVsbCwgeTJheGlzdGl0bGU6IHN0cmluZyA9IG51bGwsXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVyczogVCA9IG51bGwsIHN0eWxlOiBVID0gbnVsbCkge1xuICAgICAgICBzdXBlcih4YXhpc3RpdGxlLCB5YXhpc3RpdGxlLCBwYXJhbWV0ZXJzLCBzdHlsZSk7XG5cbiAgICAgICAgdGhpcy55MmF4aXN0aXRsZSA9IHkyYXhpc3RpdGxlO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogU2V0cyB0aGUgZGVmYXVsdCB5MiBheGlzIHBhcmFtZXRlcnMgZm9yIHRoZSBjaGFydC5cbiAgICAgKiBPdmVycmlkZSB0byBzZXR1cCBkZWZhdWx0cyBhcyBuZWVkZWQgZm9yIHRoZSBwYXJ0aWN1bGFyIGNoYXJ0IHR5cGUuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHNldFBhcmFtZXRlckRlZmF1bHRzKCkgIHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBhcmFtZXRlcnM7XG5cbiAgICAgICAgcC5wYWRkaW5nID0gQ2hhcnREZWZhdWx0U2V0dGluZ3MuZ2V0UGFkZGluZ1dpdGhEZWZhdWx0cyhwLnBhZGRpbmcsIENoYXJ0RGVmYXVsdFNldHRpbmdzLnNlY29uZHlheGlzcGFkZGluZyk7XG5cbiAgICAgICAgc3VwZXIuc2V0UGFyYW1ldGVyRGVmYXVsdHMoKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIENyZWF0ZSB0aGUgY2hhcnQgc3BlYyBmb3IgcmVuZGVyaW5nIG9mIHRoZSBjaGFydC5cbiAgICAgKiBBZGRzIHRoZSB0aGUgY2hhcnQgeTIgc2NhbGUgYW5kIGF4aXMgc3BlYyBpdGVtc1xuICAgICAqIE92ZXJyaWRlIHRvIGFkZCB0aGUgbmVjZXNzYXJ5IHNwZWMgaXRlbXMgZm9yIHRoZSBwYXJ0aWN1bGFyIGNoYXJ0IHR5cGUuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVNwZWMoZGF0YTogVik6IE9iamVjdCB7XG4gICAgICAgIGxldCBzcGVjID0gc3VwZXIuY3JlYXRlU3BlYyhkYXRhKTtcblxuICAgICAgICBsZXQgcCA9IHRoaXMucGFyYW1ldGVycztcbiAgICAgICAgbGV0IHMgPSB0aGlzLnN0eWxlO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgeTIgc2NhbGVcbiAgICAgICAgc3BlY1tcInNjYWxlc1wiXS5wdXNoKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcInkyc2NhbGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLmdldFkyc2NhbGVUeXBlKCksXG4gICAgICAgICAgICAgICAgcmFuZ2U6IFwiaGVpZ2h0XCIsXG4gICAgICAgICAgICAgICAgemVybzogZmFsc2UsXG4gICAgICAgICAgICAgICAgbmljZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZG9tYWluOiB0aGlzLmdldFkyU2NhbGVEYXRhKGRhdGEpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBhZGQgdGhlIHkyIGF4aXMgaWYgc2hvd2luZyB5IGF4ZXNcbiAgICAgICAgaWYgKHAuc2hvd2F4ZXMgPT09IEF4ZXMuWFkgfHwgcC5zaG93YXhlcyA9PT0gQXhlcy5ZKSB7XG4gICAgICAgICAgICBzcGVjW1wiYXhlc1wiXS5wdXNoKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ5XCIsXG4gICAgICAgICAgICAgICAgICAgIG9yaWVudDogXCJyaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICBzY2FsZTogXCJ5MnNjYWxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRpY2tzOiBwLnkydGlja3MsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogKHAueTJ0aWNrcyAhPSBudWxsICYmIHAueTJ0aWNrcyA8PSAwKSA/IFtdIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMueTJheGlzdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiB7dmFsdWU6IHMuYXhpc0NvbG9yfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw6IHt2YWx1ZTogcy5heGlzTGFiZWxDb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udDoge3ZhbHVlOiBzLmF4aXNMYWJlbEZvbnQubmFtZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IHt2YWx1ZTogcy5heGlzTGFiZWxGb250LnNpemV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IHt2YWx1ZTogcy5heGlzTGFiZWxGb250LndlaWdodCA/IHMuYXhpc0xhYmVsRm9udC53ZWlnaHQudG9TdHJpbmcoKSA6IG51bGx9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTdHlsZToge3ZhbHVlOiBzLmF4aXNMYWJlbEZvbnQuc3R5bGUgPyBzLmF4aXNMYWJlbEZvbnQuc3R5bGUudG9TdHJpbmcoKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsOiB7dmFsdWU6IHMuYXhpc1RpdGxlQ29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQ6IHt2YWx1ZTogcy5heGlzVGl0bGVGb250Lm5hbWV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiB7dmFsdWU6IHMuYXhpc1RpdGxlRm9udC5zaXplfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiB7dmFsdWU6IHMuYXhpc1RpdGxlRm9udC53ZWlnaHQgPyBzLmF4aXNUaXRsZUZvbnQud2VpZ2h0LnRvU3RyaW5nKCkgOiBudWxsfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U3R5bGU6IHt2YWx1ZTogcy5heGlzVGl0bGVGb250LnN0eWxlID8gcy5heGlzVGl0bGVGb250LnN0eWxlLnRvU3RyaW5nKCkgOiBudWxsfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmdsZToge3ZhbHVlOiAtOTAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF4aXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U6IHt2YWx1ZTogcy5heGlzQ29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoOiB7dmFsdWU6IHMuYXhpc1N0cm9rZVdpZHRofVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3BlYztcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIE92ZXJyaWRlIHRvIHJldHVybiB0aGUgZGF0YSB0byB1c2UgZm9yIGRlZmluaW5nIHRoZSB5MiBzY2FsZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRZMlNjYWxlRGF0YShkYXRhOiBWKTogYW55W10ge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBSZXR1cm5zIHRoZSBzY2FsZSB0eXBlIChsaW5lYXIsIG9yZGluYWwsIGV0YykgZm9yIHRoZSB5MiBzY2FsZVxuICAgICAqIFRoZSBkZWZhdWx0IGlzIGxpbmVhci5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0WTJzY2FsZVR5cGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwibGluZWFyXCI7XG4gICAgfVxufVxuXG4vKlxuICogIEJhc2UgY2xhc3MgZm9yIGRyYXdpbmcgY2hhcnQgbGVnZW5kc1xuICovXG5jbGFzcyBMZWdlbmRSZW5kZXJlcjxUIGV4dGVuZHMgTGVnZW5kU3R5bGU+IHtcbiAgICBwdWJsaWMgcGFyYW1ldGVyczogTGVnZW5kUGFyYW1ldGVycztcbiAgICBwdWJsaWMgc3R5bGU6IFQ7XG5cbiAgICAvLyB0aGUgb2Zmc2V0IG9mIHRoZSBsYWJlbCBmcm9tIHRoZSBsZWdlbmQgb3JpZ2luIGxvY2F0aW9uXG4gICAgcHVibGljIGxhYmVsb2Zmc2V0OiBQb2ludDtcblxuICAgIGNvbnN0cnVjdG9yKHBhcmFtZXRlcnM6IExlZ2VuZFBhcmFtZXRlcnMsIHN0eWxlOiBUKSB7XG5cbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcbiAgICAgICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xuXG4gICAgICAgIHRoaXMubGFiZWxvZmZzZXQgPSB7IHg6IDE1LCB5OiAxMCB9O1xuICAgIH1cblxuICAgIC8qXG4gICAgICogcmVuZGVycyB0aGUgbGVnZW5kXG4gICAgICovXG4gICAgcmVuZGVyKHNwZWM6IE9iamVjdCwgbmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGxldCBwID0gdGhpcy5wYXJhbWV0ZXJzO1xuICAgICAgICBsZXQgcyA9IHRoaXMuc3R5bGU7XG5cbiAgICAgICAgaWYgKHAuc2hvd2xlZ2VuZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsZWdlbmRzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGVnZW5kcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImdyb3VwXCIsXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICBlbnRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgeToge3ZhbHVlOiBpKjE1fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtYXJrczogW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldExlZ2VuZENvbG9yTWFyayhpKSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDoge3ZhbHVlOiB0aGlzLmxhYmVsb2Zmc2V0LnggfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeToge3ZhbHVlOiB0aGlzLmxhYmVsb2Zmc2V0LnkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDoge3ZhbHVlOiBuYW1lc1tpXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw6IHt2YWx1ZTogcy5sZWdlbmRMYWJlbENvbG9yfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udDogeyB2YWx1ZTogcy5sZWdlbmRMYWJlbEZvbnQubmFtZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiB7IHZhbHVlOiBzLmxlZ2VuZExhYmVsRm9udC5zaXplfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogeyB2YWx1ZTogcy5sZWdlbmRMYWJlbEZvbnQud2VpZ2h0ID8gcy5sZWdlbmRMYWJlbEZvbnQud2VpZ2h0LnRvU3RyaW5nKCkgOiBudWxsfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFN0eWxlOiB7IHZhbHVlOiBzLmxlZ2VuZExhYmVsRm9udC5zdHlsZSA/IHMubGVnZW5kTGFiZWxGb250LnN0eWxlLnRvU3RyaW5nKCkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNwZWNbXCJtYXJrc1wiXS5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IFwiZ3JvdXBcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBlbnRlcjoge1xuICAgICAgICAgICAgICAgICAgICB4OiB7ZmllbGQ6IHsgZ3JvdXA6IFwid2lkdGhcIiB9LCBvZmZzZXQ6IDEwIC0gcC5sZWdlbmRvZmZzZXQueH0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHt2YWx1ZTogMTAgKyBwLmxlZ2VuZG9mZnNldC55IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWFya3M6IGxlZ2VuZHNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBEcmF3cyB0aGUgY29sb3IgbWFya2VyIGZvciBlYWNoIGl0ZW0gaW4gdGhlIGxlZ2VuZFxuICAgICAqIE92ZXJyaWRlIHRvIGRyYXcgdGhlIGNvbG9yIG1hcmtlciBhcyBuZWVkZWQgZm9yIGEgcGFydGljdWxhciBjaGFydCBsZWdlbmRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0TGVnZW5kQ29sb3JNYXJrKGk6IG51bWJlcikge1xuXG4gICAgfVxufVxuXG4vKlxuICogQmFyIGNoYXJ0IGNsYXNzIGZvciBkcmF3aW5nIGEgc2ltcGxlIGJhciBjaGFydFxuICovXG5leHBvcnQgY2xhc3MgQmFyQ2hhcnQgZXh0ZW5kcyBYeUNoYXJ0PEJhckNoYXJ0UGFyYW1ldGVycywgQmFyQ2hhcnRTdHlsZSwgQmFyW10+IHtcbiAgICBjb25zdHJ1Y3Rvcih4YXhpc3RpdGxlOnN0cmluZyA9IG51bGwsIHlheGlzdGl0bGU6c3RyaW5nID0gbnVsbCxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOkJhckNoYXJ0UGFyYW1ldGVycyA9IG5ldyBCYXJDaGFydFBhcmFtZXRlcnMoKSxcbiAgICAgICAgICAgICAgICBzdHlsZTogQmFyQ2hhcnRTdHlsZSA9IG5ldyBCYXJDaGFydFN0eWxlKCkpIHtcbiAgICAgICAgc3VwZXIoeGF4aXN0aXRsZSwgeWF4aXN0aXRsZSwgcGFyYW1ldGVycywgc3R5bGUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVQYXJhbWV0ZXJzKCk6IEJhckNoYXJ0UGFyYW1ldGVycyB7XG4gICAgICAgIHJldHVybiBuZXcgQmFyQ2hhcnRQYXJhbWV0ZXJzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVN0eWxlKCk6IEJhckNoYXJ0U3R5bGUge1xuICAgICAgICByZXR1cm4gbmV3IEJhckNoYXJ0U3R5bGU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFBhcmFtZXRlckRlZmF1bHRzKCkge1xuICAgICAgICBsZXQgcCA9IHRoaXMucGFyYW1ldGVycztcblxuICAgICAgICBpZiAocC5zaG93Z3JpZGxpbmVzID09IG51bGwpIHtcbiAgICAgICAgICAgIHAuc2hvd2dyaWRsaW5lcyA9IEF4ZXMuTm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLnNldFBhcmFtZXRlckRlZmF1bHRzKCk7XG5cbiAgICAgICAgaWYgKHAuYmFyc3BhY2luZyA9PSBudWxsKSB7XG4gICAgICAgICAgICBwLmJhcnNwYWNpbmcgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHAuaGlnaGxpZ2h0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHAuaGlnaGxpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFsd2F5cyB3YW50IGEgdGljayBwZXIgYmFyXG4gICAgICAgIHAueHRpY2tzID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0U3R5bGVEZWZhdWx0cygpICB7XG5cbiAgICAgICAgc3VwZXIuc2V0U3R5bGVEZWZhdWx0cygpO1xuXG4gICAgICAgIGxldCBzID0gdGhpcy5zdHlsZTtcblxuICAgICAgICBpZiAocy5jb2xvciA9PSBudWxsKSB7XG4gICAgICAgICAgICBzLmNvbG9yID0gQ2hhcnREZWZhdWx0U2V0dGluZ3MuZ2V0UGFsZXR0ZUNvbG9yKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHMuaG92ZXJjb2xvciA9PSBudWxsKSB7XG4gICAgICAgICAgICBzLmhvdmVyY29sb3IgPSBDaGFydERlZmF1bHRTZXR0aW5ncy5ob3ZlcmNvbG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFhTY2FsZURhdGEoZGF0YTogQmFyW10pOiBzdHJpbmdbXSB7XG4gICAgICAgIGxldCBsYWJlbHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgYmkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoYmkpKSB7XG4gICAgICAgICAgICAgICAgbGFiZWxzLnB1c2goZGF0YVtiaV0ubGFiZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxhYmVscztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0WVNjYWxlRGF0YShkYXRhOiBCYXJbXSk6IG51bWJlcltdIHtcbiAgICAgICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBiaSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShiaSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChkYXRhW2JpXS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcCA9IHRoaXMucGFyYW1ldGVycztcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNaW5NYXgodmFsdWVzLCBwLnltaW4sIHAueW1heCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFhzY2FsZVR5cGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwib3JkaW5hbFwiO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVTcGVjKGRhdGE6QmFyW10pOk9iamVjdCB7XG4gICAgICAgIGxldCBzcGVjID0gc3VwZXIuY3JlYXRlU3BlYyhkYXRhKTtcblxuICAgICAgICBsZXQgcCA9IHRoaXMucGFyYW1ldGVycztcbiAgICAgICAgbGV0IHMgPSB0aGlzLnN0eWxlO1xuXG4gICAgICAgIHNwZWNbXCJkYXRhXCJdLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IFwidGFibGVcIixcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IGRhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3BlY1tcInNpZ25hbHNcIl0gPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0b29sdGlwXCIsXG4gICAgICAgICAgICAgICAgaW5pdDoge30sXG4gICAgICAgICAgICAgICAgc3RyZWFtczogW1xuICAgICAgICAgICAgICAgICAgICB7dHlwZTogXCJyZWN0Om1vdXNlb3ZlclwiLCBleHByOiBcImRhdHVtXCJ9LFxuICAgICAgICAgICAgICAgICAgICB7dHlwZTogXCJyZWN0Om1vdXNlb3V0XCIsIGV4cHI6IFwie31cIn1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiYmFyY2xpY2tcIixcbiAgICAgICAgICAgICAgICBzdHJlYW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOiBcInJlY3Q6bW91c2Vkb3duXCIsIGV4cHI6IFwiZGF0dW1cIn1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiYmFyaG92ZXJcIixcbiAgICAgICAgICAgICAgICBzdHJlYW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOiBcInJlY3Q6bW91c2VvdmVyXCIsIGV4cHI6IFwiZGF0dW1cIn1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgc3BlY1tcInByZWRpY2F0ZXNcIl0gPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0b29sdGlwXCIsIHR5cGU6IFwiPT1cIixcbiAgICAgICAgICAgICAgICBvcGVyYW5kczogW3tzaWduYWw6IFwidG9vbHRpcC5faWRcIn0sIHthcmc6IFwiaWRcIn1dXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgc3BlY1tcIm1hcmtzXCJdLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogXCJyZWN0XCIsXG4gICAgICAgICAgICBmcm9tOiB7ZGF0YTogXCJ0YWJsZVwifSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBlbnRlcjoge1xuICAgICAgICAgICAgICAgICAgICB4OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogXCJ4c2NhbGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IHAgJiYgcC5iYXJzcGFjaW5nID8gKHAuYmFyc3BhY2luZyAtIDEpIC8gMiA6IDBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiBcInhzY2FsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFuZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldDogcCAmJiBwLmJhcnNwYWNpbmcgPyAtcC5iYXJzcGFjaW5nIDogLTFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeToge3NjYWxlOiBcInlzY2FsZVwiLCBmaWVsZDogXCJ2YWx1ZVwifSxcbiAgICAgICAgICAgICAgICAgICAgeTI6IHtmaWVsZDoge2dyb3VwOiBcImhlaWdodFwifX0sXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IHt2YWx1ZTogcy5jb2xvcn1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHVwZGF0ZTogcC5oaWdobGlnaHQgPyB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGU6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWRpY2F0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0b29sdGlwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDoge2ZpZWxkOiBcIl9pZFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcy5ob3ZlcmNvbG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dmFsdWU6IHMuY29sb3J9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IDoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHAuaGlnaGxpZ2h0KSB7XG4gICAgICAgICAgICBzcGVjW1wibWFya3NcIl0ucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICBlbnRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ246IHt2YWx1ZTogQWxpZ24uY2VudGVyLnRvU3RyaW5nKCl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDoge3ZhbHVlOiBzLmhvdmVyY29sb3J9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDoge3NjYWxlOiBcInhzY2FsZVwiLCBzaWduYWw6IFwidG9vbHRpcC5sYWJlbFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGR4OiB7c2NhbGU6IFwieHNjYWxlXCIsIGJhbmQ6IHRydWUsIG11bHQ6IDAuNX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB7c2NhbGU6IFwieXNjYWxlXCIsIHNpZ25hbDogXCJ0b29sdGlwLnZhbHVlXCIsIG9mZnNldDogLTV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDoge3NpZ25hbDogXCJ0b29sdGlwLnZhbHVlXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbE9wYWNpdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWRpY2F0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB7dmFsdWU6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ZhbHVlOiAxfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNwZWM7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFkZENoYXJ0QmVoYXZpb3JzKGM6IFZpZXcsIHA6IEJhckNoYXJ0UGFyYW1ldGVycykge1xuICAgICAgICBjLm9uU2lnbmFsKFwiYmFyY2xpY2tcIiwgZnVuY3Rpb24obmFtZSwgZGF0dW0pIHtcbiAgICAgICAgICAgIGlmIChwLm9uYmFyY2xpY2spIHtcbiAgICAgICAgICAgICAgICBwLm9uYmFyY2xpY2soZGF0dW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYy5vblNpZ25hbChcImJhcmhvdmVyXCIsIGZ1bmN0aW9uKG5hbWUsIGRhdHVtKSB7XG4gICAgICAgICAgICBpZiAocC5vbmJhcmhvdmVyKSB7XG4gICAgICAgICAgICAgICAgcC5vbmJhcmhvdmVyKGRhdHVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKlxuICogSGlzdG9ncmFtIGNsYXNzIGZvciBkcmF3aW5nIGEgc2ltcGxlIChiYXIpIGhpc3RvZ3JhbVxuICovXG5leHBvcnQgY2xhc3MgSGlzdG9ncmFtIGV4dGVuZHMgWHlDaGFydDxIaXN0b2dyYW1QYXJhbWV0ZXJzLCBIaXN0b2dyYW1TdHlsZSwgRGlzdHJpYnV0aW9uPiB7XG4gICAgY29uc3RydWN0b3IoeGF4aXN0aXRsZTogc3RyaW5nID0gbnVsbCwgeWF4aXN0aXRsZTogc3RyaW5nID0gbnVsbCxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiBIaXN0b2dyYW1QYXJhbWV0ZXJzID0gbmV3IEhpc3RvZ3JhbVBhcmFtZXRlcnMoKSxcbiAgICAgICAgICAgICAgICBzdHlsZTogSGlzdG9ncmFtU3R5bGUgPSBuZXcgSGlzdG9ncmFtU3R5bGUoKSkge1xuICAgICAgICBzdXBlcih4YXhpc3RpdGxlLCB5YXhpc3RpdGxlLCBwYXJhbWV0ZXJzLCBzdHlsZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVBhcmFtZXRlcnMoKTogSGlzdG9ncmFtUGFyYW1ldGVycyB7XG4gICAgICAgIHJldHVybiBuZXcgSGlzdG9ncmFtUGFyYW1ldGVycygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVTdHlsZSgpOiBIaXN0b2dyYW1TdHlsZSB7XG4gICAgICAgIHJldHVybiBuZXcgSGlzdG9ncmFtU3R5bGU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFBhcmFtZXRlckRlZmF1bHRzKCkge1xuICAgICAgICBzdXBlci5zZXRQYXJhbWV0ZXJEZWZhdWx0cygpO1xuXG4gICAgICAgIGxldCBwID0gdGhpcy5wYXJhbWV0ZXJzO1xuXG4gICAgICAgIGlmIChwLmhpZ2hsaWdodCA9PSBudWxsKSB7XG4gICAgICAgICAgICBwLmhpZ2hsaWdodCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0U3R5bGVEZWZhdWx0cygpICB7XG5cbiAgICAgICAgc3VwZXIuc2V0U3R5bGVEZWZhdWx0cygpO1xuXG4gICAgICAgIGxldCBzID0gdGhpcy5zdHlsZTtcblxuICAgICAgICBpZiAocy5jb2xvciA9PSBudWxsKSB7XG4gICAgICAgICAgICBzLmNvbG9yID0gQ2hhcnREZWZhdWx0U2V0dGluZ3MuZ2V0UGFsZXR0ZUNvbG9yKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHMuaG92ZXJjb2xvciA9PSBudWxsKSB7XG4gICAgICAgICAgICBzLmhvdmVyY29sb3IgPSBDaGFydERlZmF1bHRTZXR0aW5ncy5ob3ZlcmNvbG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFhTY2FsZURhdGEoZGF0YTogRGlzdHJpYnV0aW9uKTogbnVtYmVyW10ge1xuICAgICAgICBsZXQgcCA9IHRoaXMucGFyYW1ldGVycztcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNaW5NYXgoWyBkYXRhLmJpbk1pbiwgZGF0YS5iaW5NYXggXSwgcC54bWluLCBwLnhtYXgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRZU2NhbGVEYXRhKGRhdGE6IERpc3RyaWJ1dGlvbik6IG51bWJlcltdIHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBhcmFtZXRlcnM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWluTWF4KGRhdGEuYmlucywgcC55bWluLCBwLnltYXgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVTcGVjKGRhdGE6IERpc3RyaWJ1dGlvbik6IE9iamVjdCB7XG4gICAgICAgIGxldCBzcGVjID0gc3VwZXIuY3JlYXRlU3BlYyhkYXRhKTtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBhcmFtZXRlcnM7XG4gICAgICAgIGxldCBzID0gdGhpcy5zdHlsZTtcblxuICAgICAgICBsZXQgYmFycyA9IFtdO1xuICAgICAgICBsZXQgYmluU2l6ZSA9IChkYXRhLmJpbk1heCAtIGRhdGEuYmluTWluKSAvIGRhdGEuYmlucy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5iaW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgeCA9IGRhdGEuYmluTWluICsgKGJpblNpemUgKiBpKTtcbiAgICAgICAgICAgIGJhcnMucHVzaCh7eDogeCwgeDI6KHggKyBiaW5TaXplKSwgeTogZGF0YS5iaW5zW2ldfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzcGVjW1wiZGF0YVwiXS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IFwidGFibGVcIixcbiAgICAgICAgICAgIHZhbHVlczogYmFyc1xuICAgICAgICB9KTtcblxuICAgICAgICBzcGVjW1wic2lnbmFsc1wiXSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcInRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICBpbml0OiB7fSxcbiAgICAgICAgICAgICAgICBzdHJlYW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOiBcInJlY3Q6bW91c2VvdmVyXCIsIGV4cHI6IFwiZGF0dW1cIn0sXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOiBcInJlY3Q6bW91c2VvdXRcIiwgZXhwcjogXCJ7fVwifVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICBzcGVjW1wicHJlZGljYXRlc1wiXSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcInRvb2x0aXBcIiwgdHlwZTogXCI9PVwiLFxuICAgICAgICAgICAgICAgIG9wZXJhbmRzOiBbe3NpZ25hbDogXCJ0b29sdGlwLl9pZFwifSwge2FyZzogXCJpZFwifV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICBzcGVjW1wibWFya3NcIl0ucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBcInJlY3RcIixcbiAgICAgICAgICAgIGZyb206IHtkYXRhOiBcInRhYmxlXCJ9LFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGVudGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiBcInhzY2FsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwieFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHgyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogXCJ4c2NhbGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcIngyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IC0xXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHtzY2FsZTogXCJ5c2NhbGVcIiwgZmllbGQ6IFwieVwifSxcbiAgICAgICAgICAgICAgICAgICAgeTI6IHtmaWVsZDoge2dyb3VwOiBcImhlaWdodFwifX0sXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IHt2YWx1ZTogcy5jb2xvcn1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHVwZGF0ZTogcC5oaWdobGlnaHQgPyB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGU6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWRpY2F0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0b29sdGlwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDoge2ZpZWxkOiBcIl9pZFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcy5ob3ZlcmNvbG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dmFsdWU6IHMuY29sb3J9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IDoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHAuaGlnaGxpZ2h0KSB7XG4gICAgICAgICAgICBzcGVjW1wibWFya3NcIl0ucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICBlbnRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ246IHt2YWx1ZTogQWxpZ24ubGVmdC50b1N0cmluZygpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw6IHt2YWx1ZTogcy5ob3ZlcmNvbG9yfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHtzY2FsZTogXCJ4c2NhbGVcIiwgc2lnbmFsOiBcInRvb2x0aXAueFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHtzY2FsZTogXCJ5c2NhbGVcIiwgc2lnbmFsOiBcInRvb2x0aXAueVwiLCBvZmZzZXQ6IC01fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHtzaWduYWw6IFwidG9vbHRpcC55XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbE9wYWNpdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWRpY2F0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB7dmFsdWU6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ZhbHVlOiAxfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNwZWM7XG4gICAgfVxufVxuXG4vKlxuICogSGlzdG9ncmFtIHBsdXMgbGluZSBjaGFydCBjbGFzcyBmb3IgZHJhd2luZyBhIHNpbXBsZSBoaXN0b2dyYW0gd2l0aCBhbiBvdmVybGFpZCBsaW5lIGNoYXJ0LlxuICogVGhlIHkgYXhpcyBmb3IgdGhlIGhpc3RvZ3JhbSBpcyBzaG93biBvbiB0aGUgbGVmdCB3aGlsZSB0aGUgbGluZSBjaGFydCdzIGlzIG9uIHRoZSByaWdodC5cbiAqL1xuZXhwb3J0IGNsYXNzIEhpc3RvZ3JhbVBsdXNMaW5lIGV4dGVuZHMgWHl5Q2hhcnQ8SGlzdG9ncmFtUGx1c0xpbmVQYXJhbWV0ZXJzLCBIaXN0b2dyYW1QbHVzTGluZVN0eWxlLCBEaXN0cmlidXRpb25QbHVzTGluZT4ge1xuICAgIGNvbnN0cnVjdG9yKHhheGlzdGl0bGU6IHN0cmluZyA9IG51bGwsIHlheGlzdGl0bGU6IHN0cmluZyA9IG51bGwsIHkyYXhpc3RpdGxlOiBzdHJpbmcgPSBudWxsLFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IEhpc3RvZ3JhbVBsdXNMaW5lUGFyYW1ldGVycyA9IG5ldyBIaXN0b2dyYW1QbHVzTGluZVBhcmFtZXRlcnMoKSxcbiAgICAgICAgICAgICAgICBzdHlsZTogSGlzdG9ncmFtUGx1c0xpbmVTdHlsZSA9IG5ldyBIaXN0b2dyYW1QbHVzTGluZVN0eWxlKCkpIHtcbiAgICAgICAgc3VwZXIoeGF4aXN0aXRsZSwgeWF4aXN0aXRsZSwgeTJheGlzdGl0bGUsIHBhcmFtZXRlcnMsIHN0eWxlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlUGFyYW1ldGVycygpOiBIaXN0b2dyYW1QbHVzTGluZVBhcmFtZXRlcnMge1xuICAgICAgICByZXR1cm4gbmV3IEhpc3RvZ3JhbVBsdXNMaW5lUGFyYW1ldGVycygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVTdHlsZSgpOiBIaXN0b2dyYW1QbHVzTGluZVN0eWxlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBIaXN0b2dyYW1QbHVzTGluZVN0eWxlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRQYXJhbWV0ZXJEZWZhdWx0cygpIHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBhcmFtZXRlcnM7XG5cbiAgICAgICAgaWYgKHAueTJtaW4gPT0gbnVsbCkge1xuICAgICAgICAgICAgcC55Mm1pbiA9IE5hTjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwLnNob3dncmlkbGluZXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgcC5zaG93Z3JpZGxpbmVzID0gQXhlcy5Ob25lO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIuc2V0UGFyYW1ldGVyRGVmYXVsdHMoKTtcblxuICAgICAgICBpZiAocC5oaWdobGlnaHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcC5oaWdobGlnaHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFN0eWxlRGVmYXVsdHMoKSAge1xuXG4gICAgICAgIHN1cGVyLnNldFN0eWxlRGVmYXVsdHMoKTtcblxuICAgICAgICBsZXQgcyA9IHRoaXMuc3R5bGU7XG5cbiAgICAgICAgcy5jb2xvcnMgPSBDaGFydERlZmF1bHRTZXR0aW5ncy5nZXRDb2xvcnNXaXRoRGVmYXVsdHMocy5jb2xvcnMsIDIpO1xuXG4gICAgICAgIGlmIChzLmxpbmV3aWR0aCA9PSBudWxsKSB7XG4gICAgICAgICAgICBzLmxpbmV3aWR0aCA9IDI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocy5ob3ZlcmNvbG9yID09IG51bGwpIHtcbiAgICAgICAgICAgIHMuaG92ZXJjb2xvciA9IENoYXJ0RGVmYXVsdFNldHRpbmdzLmhvdmVyY29sb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0WFNjYWxlRGF0YShkYXRhOiBEaXN0cmlidXRpb25QbHVzTGluZSk6IG51bWJlcltdIHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBhcmFtZXRlcnM7XG5cbiAgICAgICAgbGV0IHZhbHVlcyA9IFsgZGF0YS5kaXN0LmJpbk1pbiwgZGF0YS5kaXN0LmJpbk1heCBdO1xuXG4gICAgICAgIGZvciAobGV0IGRpIGluIGRhdGEubGluZSkge1xuICAgICAgICAgICAgaWYgKGRhdGEubGluZS5oYXNPd25Qcm9wZXJ0eShkaSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChkYXRhLmxpbmVbZGldLngpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWluTWF4KHZhbHVlcywgcC54bWluLCBwLnhtYXgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRZU2NhbGVEYXRhKGRhdGE6IERpc3RyaWJ1dGlvblBsdXNMaW5lKTogbnVtYmVyW10ge1xuICAgICAgICBsZXQgcCA9IHRoaXMucGFyYW1ldGVycztcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNaW5NYXgoZGF0YS5kaXN0LmJpbnMsIHAueW1pbiwgcC55bWF4KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0WTJTY2FsZURhdGEoZGF0YTogRGlzdHJpYnV0aW9uUGx1c0xpbmUpOiBudW1iZXJbXSB7XG4gICAgICAgIGxldCBwID0gdGhpcy5wYXJhbWV0ZXJzO1xuXG4gICAgICAgIGxldCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBkaSBpbiBkYXRhLmxpbmUpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmxpbmUuaGFzT3duUHJvcGVydHkoZGkpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goZGF0YS5saW5lW2RpXS55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1pbk1heCh2YWx1ZXMsIHAueTJtaW4sIHAueTJtYXgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVTcGVjKGRhdGE6IERpc3RyaWJ1dGlvblBsdXNMaW5lKTogT2JqZWN0IHtcbiAgICAgICAgbGV0IHNwZWMgPSBzdXBlci5jcmVhdGVTcGVjKGRhdGEpO1xuXG4gICAgICAgIGxldCBwID0gdGhpcy5wYXJhbWV0ZXJzO1xuICAgICAgICBsZXQgcyA9IHRoaXMuc3R5bGU7XG5cbiAgICAgICAgbGV0IGJhcnMgPSBbXTtcbiAgICAgICAgbGV0IGJpblNpemUgPSAoZGF0YS5kaXN0LmJpbk1heCAtIGRhdGEuZGlzdC5iaW5NaW4pIC8gZGF0YS5kaXN0LmJpbnMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuZGlzdC5iaW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgeCA9IGRhdGEuZGlzdC5iaW5NaW4gKyAoYmluU2l6ZSAqIGkpO1xuICAgICAgICAgICAgYmFycy5wdXNoKHt4OiB4LCB4MjooeCArIGJpblNpemUpLCB5OiBkYXRhLmRpc3QuYmluc1tpXX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc3BlY1tcImRhdGFcIl0ucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBcImRpc3RcIixcbiAgICAgICAgICAgIHZhbHVlczogYmFyc1xuICAgICAgICB9KTtcblxuICAgICAgICBzcGVjW1wic2lnbmFsc1wiXSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcInRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICBpbml0OiB7fSxcbiAgICAgICAgICAgICAgICBzdHJlYW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOiBcInJlY3Q6bW91c2VvdmVyXCIsIGV4cHI6IFwiZGF0dW1cIn0sXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOiBcInJlY3Q6bW91c2VvdXRcIiwgZXhwcjogXCJ7fVwifVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICBzcGVjW1wicHJlZGljYXRlc1wiXSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcInRvb2x0aXBcIiwgdHlwZTogXCI9PVwiLFxuICAgICAgICAgICAgICAgIG9wZXJhbmRzOiBbe3NpZ25hbDogXCJ0b29sdGlwLl9pZFwifSwge2FyZzogXCJpZFwifV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICBzcGVjW1wibWFya3NcIl0ucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBcInJlY3RcIixcbiAgICAgICAgICAgIGZyb206IHtkYXRhOiBcImRpc3RcIn0sXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgZW50ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgeDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGU6IFwieHNjYWxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJ4XCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeDI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiBcInhzY2FsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwieDJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldDogLTFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeToge3NjYWxlOiBcInlzY2FsZVwiLCBmaWVsZDogXCJ5XCJ9LFxuICAgICAgICAgICAgICAgICAgICB5Mjoge2ZpZWxkOiB7Z3JvdXA6IFwiaGVpZ2h0XCJ9fSxcbiAgICAgICAgICAgICAgICAgICAgZmlsbDoge3ZhbHVlOiBzLmNvbG9yc1swXX1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHVwZGF0ZTogcC5oaWdobGlnaHQgPyB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGU6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWRpY2F0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0b29sdGlwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDoge2ZpZWxkOiBcIl9pZFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcy5ob3ZlcmNvbG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dmFsdWU6IHMuY29sb3JzWzBdfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSA6IHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChwLmhpZ2hsaWdodCkge1xuICAgICAgICAgICAgc3BlY1tcIm1hcmtzXCJdLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgZW50ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduOiB7dmFsdWU6IEFsaWduLmxlZnQudG9TdHJpbmcoKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsOiB7dmFsdWU6IHMuaG92ZXJjb2xvcn1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB7c2NhbGU6IFwieHNjYWxlXCIsIHNpZ25hbDogXCJ0b29sdGlwLnhcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB7c2NhbGU6IFwieXNjYWxlXCIsIHNpZ25hbDogXCJ0b29sdGlwLnlcIiwgb2Zmc2V0OiAtNX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB7c2lnbmFsOiBcInRvb2x0aXAueVwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxPcGFjaXR5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVsZTogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVkaWNhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDoge3ZhbHVlOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZTogMX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNwZWNbXCJkYXRhXCJdLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogXCJwb2ludHNcIixcbiAgICAgICAgICAgIHZhbHVlczogZGF0YS5saW5lXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNwZWNbXCJtYXJrc1wiXS5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IFwibGluZVwiLFxuICAgICAgICAgICAgZnJvbToge2RhdGE6IFwicG9pbnRzXCJ9LFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGVudGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZToge3ZhbHVlOiBzLmNvbG9yc1sxXX0sXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoOiB7dmFsdWU6IHMubGluZXdpZHRofSxcbiAgICAgICAgICAgICAgICAgICAgeDoge3NjYWxlOiBcInhzY2FsZVwiLCBmaWVsZDogXCJ4XCJ9LFxuICAgICAgICAgICAgICAgICAgICB5OiB7c2NhbGU6IFwieTJzY2FsZVwiLCBmaWVsZDogXCJ5XCJ9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc3BlYztcbiAgICB9XG59XG5cbi8qXG4gKiBEdWFsIGhpc3RvZ3JhbSBjbGFzcyBmb3IgZHJhd2luZyBhIHBhaXIgb2YgaGlzdG9ncmFtcyAob3IgZGlzdHJpYnV0aW9ucykgb3ZlcmxhaWQgYXMgYXJlYSBwbG90cy5cbiAqL1xuZXhwb3J0IGNsYXNzIER1YWxIaXN0b2dyYW1zIGV4dGVuZHMgWHlDaGFydDxEdWFsSGlzdG9ncmFtc1BhcmFtZXRlcnMsIER1YWxIaXN0b2dyYW1TdHlsZSwgRHVhbERpc3RyaWJ1dGlvbnM+IHtcbiAgICBwcml2YXRlIG11bHRpaGlzdG9ncmFtOiBNdWx0aUhpc3RvZ3JhbTtcblxuICAgIGNvbnN0cnVjdG9yKHhheGlzdGl0bGU6IHN0cmluZyA9IG51bGwsIHlheGlzdGl0bGU6IHN0cmluZyA9IG51bGwsXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVyczogRHVhbEhpc3RvZ3JhbXNQYXJhbWV0ZXJzID0gbmV3IER1YWxIaXN0b2dyYW1zUGFyYW1ldGVycygpLFxuICAgICAgICAgICAgICAgIHN0eWxlOiBEdWFsSGlzdG9ncmFtU3R5bGUgPSBuZXcgRHVhbEhpc3RvZ3JhbVN0eWxlKCkpIHtcbiAgICAgICAgc3VwZXIoeGF4aXN0aXRsZSwgeWF4aXN0aXRsZSwgcGFyYW1ldGVycywgc3R5bGUpO1xuXG4gICAgICAgIHRoaXMubXVsdGloaXN0b2dyYW0gPSBuZXcgTXVsdGlIaXN0b2dyYW0odGhpcy54YXhpc3RpdGxlLCB0aGlzLnlheGlzdGl0bGUsIHRoaXMucGFyYW1ldGVycywgdGhpcy5zdHlsZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVBhcmFtZXRlcnMoKTogRHVhbEhpc3RvZ3JhbXNQYXJhbWV0ZXJzIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEdWFsSGlzdG9ncmFtc1BhcmFtZXRlcnMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlU3R5bGUoKTogRHVhbEhpc3RvZ3JhbVN0eWxlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEdWFsSGlzdG9ncmFtU3R5bGU7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3coY2hhcnRpZDogc3RyaW5nLCBkYXRhOiBEdWFsRGlzdHJpYnV0aW9ucykge1xuICAgICAgICB0aGlzLm11bHRpaGlzdG9ncmFtLnNob3coY2hhcnRpZCwgWyBkYXRhLmRpc3QxLCBkYXRhLmRpc3QyIF0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZVBuZyhkYXRhOiBEdWFsRGlzdHJpYnV0aW9ucywgZmlsZXBhdGg6IHN0cmluZykge1xuICAgICAgICB0aGlzLm11bHRpaGlzdG9ncmFtLndyaXRlUG5nKFsgZGF0YS5kaXN0MSwgZGF0YS5kaXN0MiBdLCBmaWxlcGF0aCk7XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlU3ZnKGRhdGE6IER1YWxEaXN0cmlidXRpb25zLCBmaWxlcGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubXVsdGloaXN0b2dyYW0ud3JpdGVTdmcoWyBkYXRhLmRpc3QxLCBkYXRhLmRpc3QyIF0sIGZpbGVwYXRoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0UGFyYW1ldGVyRGVmYXVsdHMoKSB7XG4gICAgICAgIHN1cGVyLnNldFBhcmFtZXRlckRlZmF1bHRzKCk7XG5cbiAgICAgICAgbGV0IHAgPSB0aGlzLnBhcmFtZXRlcnM7XG5cbiAgICAgICAgcC5sZWdlbmRvZmZzZXQgPSBDaGFydERlZmF1bHRTZXR0aW5ncy5nZXRPZmZzZXRXaXRoRGVmYXVsdHMocC5sZWdlbmRvZmZzZXQsIHsgeDogMTAwLCB5OiAyMCB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0U3R5bGVEZWZhdWx0cygpICB7XG4gICAgICAgIHN1cGVyLnNldFN0eWxlRGVmYXVsdHMoKTtcblxuICAgICAgICBsZXQgcyA9IHRoaXMuc3R5bGU7XG5cbiAgICAgICAgcy5jb2xvcnMgPSBDaGFydERlZmF1bHRTZXR0aW5ncy5nZXRDb2xvcnNXaXRoRGVmYXVsdHMocy5jb2xvcnMsIDIpO1xuICAgIH1cbn1cblxuLypcbiAqIExlZ2VuZCByZW5kZXJlciBjbGFzcyBmb3IgaGlzdG9ncmFtIGxlZ2VuZHNcbiAqL1xuY2xhc3MgSGlzdG9ncmFtTGVnZW5kIGV4dGVuZHMgTGVnZW5kUmVuZGVyZXI8TXVsdGlIaXN0b2dyYW1TdHlsZT4ge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtZXRlcnM6IE11bHRpSGlzdG9ncmFtUGFyYW1ldGVycywgc3R5bGU6IE11bHRpSGlzdG9ncmFtU3R5bGUpIHtcbiAgICAgICAgc3VwZXIocGFyYW1ldGVycywgc3R5bGUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRMZWdlbmRDb2xvck1hcmsoaTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBzID0gdGhpcy5zdHlsZTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJyZWN0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgZW50ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiB7dmFsdWU6IHMuY29sb3JzW2ldfSxcbiAgICAgICAgICAgICAgICAgICAgZmlsbDoge3ZhbHVlOiBzLmNvbG9yc1tpXX0sXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoOiB7dmFsdWU6IDJ9LFxuICAgICAgICAgICAgICAgICAgICBmaWxsT3BhY2l0eToge3ZhbHVlOiAwLjV9LFxuICAgICAgICAgICAgICAgICAgICB4OiB7dmFsdWU6IDB9LFxuICAgICAgICAgICAgICAgICAgICB4Mjoge3ZhbHVlOiAxMH0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHt2YWx1ZTogMH0sXG4gICAgICAgICAgICAgICAgICAgIHkyOiB7dmFsdWU6IDEwfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8qXG4gKiBNdWx0aS1oaXN0b2dyYW0gY2xhc3MgZm9yIGRyYXdpbmcgbXVsdGlwbGUgKHVwIHRvIDgpIGhpc3RvZ3JhbXMgKG9yIGRpc3RyaWJ1dGlvbnMpIGFzIG92ZXJsYWlkIGFyZWEgcGxvdHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBNdWx0aUhpc3RvZ3JhbSBleHRlbmRzIFh5Q2hhcnQ8TXVsdGlIaXN0b2dyYW1QYXJhbWV0ZXJzLCBNdWx0aUhpc3RvZ3JhbVN0eWxlLCBOYW1lZERpc3RyaWJ1dGlvbltdPiB7XG4gICAgY29uc3RydWN0b3IoeGF4aXN0aXRsZTogc3RyaW5nID0gbnVsbCwgeWF4aXN0aXRsZTogc3RyaW5nID0gbnVsbCxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiBNdWx0aUhpc3RvZ3JhbVBhcmFtZXRlcnMgPSBuZXcgTXVsdGlIaXN0b2dyYW1QYXJhbWV0ZXJzKCksXG4gICAgICAgICAgICAgICAgc3R5bGU6IE11bHRpSGlzdG9ncmFtU3R5bGUgPSBuZXcgTXVsdGlIaXN0b2dyYW1TdHlsZSgpKSB7XG4gICAgICAgIHN1cGVyKHhheGlzdGl0bGUsIHlheGlzdGl0bGUsIHBhcmFtZXRlcnMsIHN0eWxlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlUGFyYW1ldGVycygpOiBNdWx0aUhpc3RvZ3JhbVBhcmFtZXRlcnMge1xuICAgICAgICByZXR1cm4gbmV3IE11bHRpSGlzdG9ncmFtUGFyYW1ldGVycygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVTdHlsZSgpOiBNdWx0aUhpc3RvZ3JhbVN0eWxlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNdWx0aUhpc3RvZ3JhbVN0eWxlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRQYXJhbWV0ZXJEZWZhdWx0cygpIHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBhcmFtZXRlcnM7XG5cbiAgICAgICAgcC5wYWRkaW5nID0gQ2hhcnREZWZhdWx0U2V0dGluZ3MuZ2V0UGFkZGluZ1dpdGhEZWZhdWx0cyhwLnBhZGRpbmcsIENoYXJ0RGVmYXVsdFNldHRpbmdzLmxlZ2VuZGVkcGFkZGluZyk7XG5cbiAgICAgICAgc3VwZXIuc2V0UGFyYW1ldGVyRGVmYXVsdHMoKTtcblxuICAgICAgICBpZiAocC5zaG93bGVnZW5kID09IG51bGwpIHtcbiAgICAgICAgICAgIHAuc2hvd2xlZ2VuZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBwLmxlZ2VuZG9mZnNldCA9IENoYXJ0RGVmYXVsdFNldHRpbmdzLmdldE9mZnNldFdpdGhEZWZhdWx0cyhwLmxlZ2VuZG9mZnNldCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFN0eWxlRGVmYXVsdHMoKSAge1xuXG4gICAgICAgIHN1cGVyLnNldFN0eWxlRGVmYXVsdHMoKTtcblxuICAgICAgICBsZXQgcyA9IHRoaXMuc3R5bGU7XG5cbiAgICAgICAgcy5jb2xvcnMgPSBDaGFydERlZmF1bHRTZXR0aW5ncy5nZXRDb2xvcnNXaXRoRGVmYXVsdHMocy5jb2xvcnMsIDgpO1xuXG4gICAgICAgIHMubGVnZW5kTGFiZWxGb250ID0gQ2hhcnREZWZhdWx0U2V0dGluZ3MuZ2V0Rm9udFdpdGhEZWZhdWx0cyhzLmxlZ2VuZExhYmVsRm9udCwgcy5kZWZhdWx0Rm9udCk7XG5cbiAgICAgICAgaWYgKHMubGVnZW5kTGFiZWxDb2xvciA9PSBudWxsKSB7XG4gICAgICAgICAgICBzLmxlZ2VuZExhYmVsQ29sb3IgPSBzLmRlZmF1bHRUZXh0Q29sb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0WFNjYWxlRGF0YShkYXRhOiBOYW1lZERpc3RyaWJ1dGlvbltdKTogbnVtYmVyW10ge1xuICAgICAgICBsZXQgcCA9IHRoaXMucGFyYW1ldGVycztcblxuICAgICAgICBsZXQgYmluTWluTWF4cyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGRpIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGRpKSkge1xuICAgICAgICAgICAgICAgIGJpbk1pbk1heHMucHVzaChkYXRhW2RpXS5iaW5NaW4pO1xuICAgICAgICAgICAgICAgIGJpbk1pbk1heHMucHVzaChkYXRhW2RpXS5iaW5NYXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWluTWF4KGJpbk1pbk1heHMsIHAueG1pbiwgcC54bWF4KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0WVNjYWxlRGF0YShkYXRhOiBOYW1lZERpc3RyaWJ1dGlvbltdKTogbnVtYmVyW10ge1xuICAgICAgICBsZXQgcCA9IHRoaXMucGFyYW1ldGVycztcblxuICAgICAgICBsZXQgYmluVmFsdWVzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgZGkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoZGkpKSB7XG4gICAgICAgICAgICAgICAgYmluVmFsdWVzID0gYmluVmFsdWVzLmNvbmNhdChkYXRhW2RpXS5iaW5zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1pbk1heChiaW5WYWx1ZXMsIHAueW1pbiwgcC55bWF4KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlU3BlYyhkYXRhOiBOYW1lZERpc3RyaWJ1dGlvbltdKTogT2JqZWN0IHtcbiAgICAgICAgbGV0IHNwZWMgPSBzdXBlci5jcmVhdGVTcGVjKGRhdGEpO1xuXG4gICAgICAgIGxldCBwID0gdGhpcy5wYXJhbWV0ZXJzO1xuICAgICAgICBsZXQgcyAgPSB0aGlzLnN0eWxlO1xuXG4gICAgICAgIGxldCBsZWdlbmRtYXJrcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRpc3QgPSBkYXRhW2ldO1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBcImRpc3RcIisoaSsxKTtcblxuICAgICAgICAgICAgbGV0IHBvaW50cyA9IFtdO1xuICAgICAgICAgICAgbGV0IGJpblNpemUgPSAoZGlzdC5iaW5NYXggLSBkaXN0LmJpbk1pbikgLyBkaXN0LmJpbnMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkaXN0LmJpbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBwb2ludHMucHVzaCh7eDogZGlzdC5iaW5NaW4gKyAoYmluU2l6ZSAqIDAuNSkgKyAoYmluU2l6ZSAqIGopLCB5OiBkaXN0LmJpbnNbal19KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3BlY1tcImRhdGFcIl0ucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IHBvaW50c1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNwZWNbXCJtYXJrc1wiXS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFyZWFcIixcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgIGZyb206IHtkYXRhOiBuYW1lfSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGVudGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U6IHt2YWx1ZTogcy5jb2xvcnNbaV19LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDoge3ZhbHVlOiBzLmNvbG9yc1tpXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aDoge3ZhbHVlOiAyfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxPcGFjaXR5OiB7dmFsdWU6IDAuNX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnBvbGF0ZToge3ZhbHVlOiBcIm1vbm90b25lXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeDoge3NjYWxlOiBcInhzY2FsZVwiLCBmaWVsZDogXCJ4XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeToge3NjYWxlOiBcInlzY2FsZVwiLCBmaWVsZDogXCJ5XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTI6IHsgZmllbGQ6IHsgZ3JvdXA6IFwiaGVpZ2h0XCIgfSB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuYW1lcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbmFtZXMucHVzaChkYXRhW2ldLm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxlZ2VuZCA9IG5ldyBIaXN0b2dyYW1MZWdlbmQocCwgcyk7XG4gICAgICAgIGxlZ2VuZC5yZW5kZXIoc3BlYywgbmFtZXMpO1xuXG4gICAgICAgIHJldHVybiBzcGVjO1xuICAgIH1cbn1cblxuLypcbiAqIExlZ2VuZCByZW5kZXJlciBjbGFzcyBmb3IgbGluZSBjaGFydCBsZWdlbmRzXG4gKi9cbmNsYXNzIExpbmVDaGFydExlZ2VuZCBleHRlbmRzIExlZ2VuZFJlbmRlcmVyPE11bHRpTGluZUNoYXJ0U3R5bGU+IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbWV0ZXJzOiBNdWx0aUxpbmVDaGFydFBhcmFtZXRlcnMsIHN0eWxlOiBNdWx0aUxpbmVDaGFydFN0eWxlKSB7XG4gICAgICAgIHN1cGVyKHBhcmFtZXRlcnMsIHN0eWxlKTtcblxuICAgICAgICB0aGlzLmxhYmVsb2Zmc2V0LnggPSAyNTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0TGVnZW5kQ29sb3JNYXJrKGk6IG51bWJlcikge1xuICAgICAgICBsZXQgcyA9IHRoaXMuc3R5bGU7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwicnVsZVwiLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGVudGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZToge3ZhbHVlOiBzLmNvbG9yc1tpICUgOF19LFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aDoge3ZhbHVlOiBzLmxpbmV3aWR0aH0sXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZURhc2g6IHt2YWx1ZTogaSA8IDggPyBudWxsIDogWzIsIDJdfSxcbiAgICAgICAgICAgICAgICAgICAgeDoge3ZhbHVlOiAwfSxcbiAgICAgICAgICAgICAgICAgICAgeDI6IHt2YWx1ZTogMjB9LFxuICAgICAgICAgICAgICAgICAgICB5OiB7dmFsdWU6IDZ9LFxuICAgICAgICAgICAgICAgICAgICB5Mjoge3ZhbHVlOiA2fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8qXG4gKiBNdWx0aS1saW5lIGNoYXJ0IGNsYXNzIGZvciBkcmF3aW5nIG11bHRpcGxlICh1cCB0byAxNikgbGluZSBwbG90cyBpbiBhIHNpbmdsZSBjaGFydC5cbiAqL1xuZXhwb3J0IGNsYXNzIE11bHRpTGluZUNoYXJ0IGV4dGVuZHMgWHlDaGFydDxNdWx0aUxpbmVDaGFydFBhcmFtZXRlcnMsIE11bHRpTGluZUNoYXJ0U3R5bGUsIFBsb3RbXT4ge1xuICAgIGNvbnN0cnVjdG9yKHhheGlzdGl0bGU6IHN0cmluZyA9IG51bGwsIHlheGlzdGl0bGU6IHN0cmluZyA9IG51bGwsXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVyczogTXVsdGlMaW5lQ2hhcnRQYXJhbWV0ZXJzID0gbmV3IE11bHRpTGluZUNoYXJ0UGFyYW1ldGVycygpLFxuICAgICAgICAgICAgICAgIHN0eWxlOiBNdWx0aUxpbmVDaGFydFN0eWxlID0gbmV3IE11bHRpTGluZUNoYXJ0U3R5bGUoKSkge1xuICAgICAgICBzdXBlcih4YXhpc3RpdGxlLCB5YXhpc3RpdGxlLCBwYXJhbWV0ZXJzLCBzdHlsZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVBhcmFtZXRlcnMoKTogTXVsdGlMaW5lQ2hhcnRQYXJhbWV0ZXJzIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNdWx0aUxpbmVDaGFydFBhcmFtZXRlcnMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlU3R5bGUoKTogTXVsdGlMaW5lQ2hhcnRTdHlsZSB7XG4gICAgICAgIHJldHVybiBuZXcgTXVsdGlMaW5lQ2hhcnRTdHlsZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0UGFyYW1ldGVyRGVmYXVsdHMoKSB7XG4gICAgICAgIGxldCBwID0gdGhpcy5wYXJhbWV0ZXJzO1xuXG4gICAgICAgIHAucGFkZGluZyA9IENoYXJ0RGVmYXVsdFNldHRpbmdzLmdldFBhZGRpbmdXaXRoRGVmYXVsdHMocC5wYWRkaW5nLCBDaGFydERlZmF1bHRTZXR0aW5ncy5sZWdlbmRlZHBhZGRpbmcpO1xuXG4gICAgICAgIHN1cGVyLnNldFBhcmFtZXRlckRlZmF1bHRzKCk7XG5cbiAgICAgICAgaWYgKHAuc2hvd2xlZ2VuZCA9PSBudWxsKSB7XG4gICAgICAgICAgICBwLnNob3dsZWdlbmQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcC5sZWdlbmRvZmZzZXQgPSBDaGFydERlZmF1bHRTZXR0aW5ncy5nZXRPZmZzZXRXaXRoRGVmYXVsdHMocC5sZWdlbmRvZmZzZXQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRTdHlsZURlZmF1bHRzKCkgIHtcblxuICAgICAgICBzdXBlci5zZXRTdHlsZURlZmF1bHRzKCk7XG5cbiAgICAgICAgbGV0IHMgPSB0aGlzLnN0eWxlO1xuXG4gICAgICAgIHMubGVnZW5kTGFiZWxGb250ID0gQ2hhcnREZWZhdWx0U2V0dGluZ3MuZ2V0Rm9udFdpdGhEZWZhdWx0cyhzLmxlZ2VuZExhYmVsRm9udCwgcy5kZWZhdWx0Rm9udCk7XG5cbiAgICAgICAgaWYgKHMubGVnZW5kTGFiZWxDb2xvciA9PSBudWxsKSB7XG4gICAgICAgICAgICBzLmxlZ2VuZExhYmVsQ29sb3IgPSBzLmRlZmF1bHRUZXh0Q29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBzLmNvbG9ycyA9IENoYXJ0RGVmYXVsdFNldHRpbmdzLmdldENvbG9yc1dpdGhEZWZhdWx0cyhzLmNvbG9ycywgOCk7XG5cbiAgICAgICAgaWYgKHMubGluZXdpZHRoID09IG51bGwpIHtcbiAgICAgICAgICAgIHMubGluZXdpZHRoID0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRYU2NhbGVEYXRhKGRhdGE6IFBsb3RbXSk6IG51bWJlcltdIHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBhcmFtZXRlcnM7XG5cbiAgICAgICAgbGV0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGRpIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGRpKSkge1xuICAgICAgICAgICAgICAgIGxldCBwb2ludHMgPSBkYXRhW2RpXS5wb2ludHM7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGkgaW4gcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2ludHMuaGFzT3duUHJvcGVydHkocGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChwb2ludHNbcGldLngpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWluTWF4KHZhbHVlcywgcC54bWluLCBwLnhtYXgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRZU2NhbGVEYXRhKGRhdGE6IFBsb3RbXSk6IG51bWJlcltdIHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBhcmFtZXRlcnM7XG5cbiAgICAgICAgbGV0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGRpIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGRpKSkge1xuICAgICAgICAgICAgICAgIGxldCBwb2ludHMgPSBkYXRhW2RpXS5wb2ludHM7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGkgaW4gcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2ludHMuaGFzT3duUHJvcGVydHkocGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChwb2ludHNbcGldLnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWluTWF4KHZhbHVlcywgcC55bWluLCBwLnltYXgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVTcGVjKGRhdGE6IFBsb3RbXSk6IE9iamVjdCB7XG4gICAgICAgIGxldCBzcGVjID0gc3VwZXIuY3JlYXRlU3BlYyhkYXRhKTtcblxuICAgICAgICBsZXQgcCA9IHRoaXMucGFyYW1ldGVycztcbiAgICAgICAgbGV0IHMgPSB0aGlzLnN0eWxlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHBvaW50cyA9IGRhdGFbaV0ucG9pbnRzO1xuICAgICAgICAgICAgc3BlY1tcImRhdGFcIl0ucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJwbG90XCIgKyAoaSArIDEpLFxuICAgICAgICAgICAgICAgIHZhbHVlczogcG9pbnRzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNwZWNbXCJzaWduYWxzXCJdID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwidG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgIGluaXQ6IHt9LFxuICAgICAgICAgICAgICAgIHN0cmVhbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge3R5cGU6IFwiQHBsb3Q6bW91c2VvdmVyXCIsIGV4cHI6IFwiZGF0dW1cIn0sXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOiBcIkBwbG90Om1vdXNlb3V0XCIsIGV4cHI6IFwie31cIn1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgc3BlY1tcInByZWRpY2F0ZXNcIl0gPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0b29sdGlwXCIsIHR5cGU6IFwiPT1cIixcbiAgICAgICAgICAgICAgICBvcGVyYW5kczogW3tzaWduYWw6IFwidG9vbHRpcC5faWRcIn0sIHthcmc6IFwiaWRcIn1dXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IGxpbmVzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsaW5lcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBsb3RcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImxpbmVcIixcbiAgICAgICAgICAgICAgICBmcm9tOiB7ZGF0YTogXCJwbG90XCIgKyAoaSArIDEpfSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGVudGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U6IHt2YWx1ZTogcy5jb2xvcnNbaSAlIDhdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZURhc2g6IHt2YWx1ZTogaSA8IDggPyBudWxsIDogWzIsIDJdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHtzY2FsZTogXCJ4c2NhbGVcIiwgZmllbGQ6IFwieFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHtzY2FsZTogXCJ5c2NhbGVcIiwgZmllbGQ6IFwieVwifVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVsZTogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVkaWNhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDoge2ZpZWxkOiBcIl9pZFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBzLmxpbmV3aWR0aCAqIDNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ZhbHVlOiBzLmxpbmV3aWR0aH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgc3BlY1tcIm1hcmtzXCJdLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogXCJncm91cFwiLFxuICAgICAgICAgICAgbWFya3M6IGxpbmVzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBuYW1lcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbmFtZXMucHVzaChkYXRhW2ldLm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxlZ2VuZCA9IG5ldyBMaW5lQ2hhcnRMZWdlbmQocCwgcyk7XG4gICAgICAgIGxlZ2VuZC5yZW5kZXIoc3BlYywgbmFtZXMpO1xuXG4gICAgICAgIHJldHVybiBzcGVjO1xuICAgIH1cbn1cblxuLypcbiAqIFNpbXBsZSBsaW5lIGNoYXJ0IGNsYXNzIGZvciBkcmF3aW5nIGEgc2luZ2xlIGxpbmUgcGxvdCBjaGFydC5cbiAqL1xuZXhwb3J0IGNsYXNzIFNpbXBsZUxpbmVDaGFydCBleHRlbmRzIFh5Q2hhcnQ8U2ltcGxlTGluZUNoYXJ0UGFyYW1ldGVycywgU2ltcGxlTGluZUNoYXJ0U3R5bGUsIFBvaW50W10+IHtcbiAgICBjb25zdHJ1Y3Rvcih4YXhpc3RpdGxlOiBzdHJpbmcgPSBudWxsLCB5YXhpc3RpdGxlOiBzdHJpbmcgPSBudWxsLFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IFNpbXBsZUxpbmVDaGFydFBhcmFtZXRlcnMgPSBuZXcgU2ltcGxlTGluZUNoYXJ0UGFyYW1ldGVycygpLFxuICAgICAgICAgICAgICAgIHN0eWxlOiBTaW1wbGVMaW5lQ2hhcnRTdHlsZSA9IG5ldyBTaW1wbGVMaW5lQ2hhcnRTdHlsZSgpKSB7XG4gICAgICAgIHN1cGVyKHhheGlzdGl0bGUsIHlheGlzdGl0bGUsIHBhcmFtZXRlcnMsIHN0eWxlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlUGFyYW1ldGVycygpOiBTaW1wbGVMaW5lQ2hhcnRQYXJhbWV0ZXJzIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTaW1wbGVMaW5lQ2hhcnRQYXJhbWV0ZXJzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVN0eWxlKCk6IFNpbXBsZUxpbmVDaGFydFN0eWxlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTaW1wbGVMaW5lQ2hhcnRTdHlsZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0UGFyYW1ldGVyRGVmYXVsdHMoKSB7XG4gICAgICAgIGxldCBwID0gdGhpcy5wYXJhbWV0ZXJzO1xuXG4gICAgICAgIGlmIChwLnltaW4gPT0gbnVsbCkge1xuICAgICAgICAgICAgcC55bWluID0gTmFOO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHAuc2hvd2dyaWRsaW5lcyA9PSBudWxsKSB7XG4gICAgICAgICAgICBwLnNob3dncmlkbGluZXMgPSBBeGVzLk5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlci5zZXRQYXJhbWV0ZXJEZWZhdWx0cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRTdHlsZURlZmF1bHRzKCkgIHtcblxuICAgICAgICBzdXBlci5zZXRTdHlsZURlZmF1bHRzKCk7XG5cbiAgICAgICAgbGV0IHMgPSB0aGlzLnN0eWxlO1xuXG4gICAgICAgIGlmIChzLmNvbG9yID09IG51bGwpIHtcbiAgICAgICAgICAgIHMuY29sb3IgPSBDaGFydERlZmF1bHRTZXR0aW5ncy5nZXRQYWxldHRlQ29sb3IoMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocy5saW5ld2lkdGggPT0gbnVsbCkge1xuICAgICAgICAgICAgcy5saW5ld2lkdGggPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFhTY2FsZURhdGEoZGF0YTogUG9pbnRbXSk6IG51bWJlcltdIHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBhcmFtZXRlcnM7XG5cbiAgICAgICAgbGV0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGRpIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGRpKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGRhdGFbZGldLngpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWluTWF4KHZhbHVlcywgcC54bWluLCBwLnhtYXgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRZU2NhbGVEYXRhKGRhdGE6IFBvaW50W10pOiBudW1iZXJbXSB7XG4gICAgICAgIGxldCBwID0gdGhpcy5wYXJhbWV0ZXJzO1xuXG4gICAgICAgIGxldCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBkaSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShkaSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChkYXRhW2RpXS55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1pbk1heCh2YWx1ZXMsIHAueW1pbiwgcC55bWF4KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlU3BlYyhkYXRhOiBQb2ludFtdKTogT2JqZWN0IHtcbiAgICAgICAgbGV0IHNwZWMgPSBzdXBlci5jcmVhdGVTcGVjKGRhdGEpO1xuXG4gICAgICAgIGxldCBzID0gdGhpcy5zdHlsZTtcblxuICAgICAgICBzcGVjW1wiZGF0YVwiXS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IFwicG9pbnRzXCIsXG4gICAgICAgICAgICB2YWx1ZXM6IGRhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3BlY1tcIm1hcmtzXCJdLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogXCJsaW5lXCIsXG4gICAgICAgICAgICBmcm9tOiB7ZGF0YTogXCJwb2ludHNcIn0sXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgZW50ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiB7dmFsdWU6IHMuY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aDoge3ZhbHVlOiBzLmxpbmV3aWR0aH0sXG4gICAgICAgICAgICAgICAgICAgIHg6IHtzY2FsZTogXCJ4c2NhbGVcIiwgZmllbGQ6IFwieFwifSxcbiAgICAgICAgICAgICAgICAgICAgeToge3NjYWxlOiBcInlzY2FsZVwiLCBmaWVsZDogXCJ5XCJ9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc3BlYztcbiAgICB9XG59XG5cbi8qXG4gKiBMZWdlbmQgcmVuZGVyZWQgZm9yIGRyYXdpbmcgYSBzY2F0dGVyIHBsb3QgbGVnZW5kXG4gKi9cbmNsYXNzIFNjYXR0ZXJQbG90TGVnZW5kIGV4dGVuZHMgTGVnZW5kUmVuZGVyZXI8TXVsdGlTY2F0dGVyUGxvdFN0eWxlPiB7XG4gICAgY29uc3RydWN0b3IocGFyYW1ldGVyczogTXVsdGlTY2F0dGVyUGxvdFBhcmFtZXRlcnMsIHN0eWxlOiBNdWx0aVNjYXR0ZXJQbG90U3R5bGUpIHtcbiAgICAgICAgc3VwZXIocGFyYW1ldGVycywgc3R5bGUpO1xuXG4gICAgICAgIHRoaXMubGFiZWxvZmZzZXQueCArPSA0O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRMZWdlbmRDb2xvck1hcmsoaTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBzID0gdGhpcy5zdHlsZTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJyZWN0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgZW50ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgZmlsbDoge3ZhbHVlOiBzLmNvbG9yc1tpXX0sXG4gICAgICAgICAgICAgICAgICAgIHg6IHt2YWx1ZTogOH0sXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB7dmFsdWU6IDh9LFxuICAgICAgICAgICAgICAgICAgICB5OiB7dmFsdWU6IDJ9LFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHt2YWx1ZTogOH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufVxuXG4vKlxuICogTXVsdGktc2NhdHRlciBwbG90IGNsYXNzIGZvciBkcmF3aW5nIG11bHRpcGxlICh1cCB0byA4KSBzY2F0dGVyIHBsb3RzIGluIGEgc2luZ2xlIGNoYXJ0LlxuICovXG5leHBvcnQgY2xhc3MgTXVsdGlTY2F0dGVyUGxvdCBleHRlbmRzIFh5Q2hhcnQ8TXVsdGlTY2F0dGVyUGxvdFBhcmFtZXRlcnMsIE11bHRpU2NhdHRlclBsb3RTdHlsZSwgUGxvdFtdPiB7XG4gICAgY29uc3RydWN0b3IoeGF4aXN0aXRsZTogc3RyaW5nID0gbnVsbCwgeWF4aXN0aXRsZTogc3RyaW5nID0gbnVsbCxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiBNdWx0aVNjYXR0ZXJQbG90UGFyYW1ldGVycyA9IG5ldyBNdWx0aVNjYXR0ZXJQbG90UGFyYW1ldGVycygpLFxuICAgICAgICAgICAgICAgIHN0eWxlOiBNdWx0aVNjYXR0ZXJQbG90U3R5bGUgPSBuZXcgTXVsdGlTY2F0dGVyUGxvdFN0eWxlKCkpIHtcbiAgICAgICAgc3VwZXIoeGF4aXN0aXRsZSwgeWF4aXN0aXRsZSwgcGFyYW1ldGVycywgc3R5bGUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVQYXJhbWV0ZXJzKCk6IE11bHRpU2NhdHRlclBsb3RQYXJhbWV0ZXJzIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNdWx0aVNjYXR0ZXJQbG90UGFyYW1ldGVycygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVTdHlsZSgpOiBNdWx0aVNjYXR0ZXJQbG90U3R5bGUge1xuICAgICAgICByZXR1cm4gbmV3IE11bHRpU2NhdHRlclBsb3RTdHlsZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0UGFyYW1ldGVyRGVmYXVsdHMoKSB7XG4gICAgICAgIGxldCBwID0gdGhpcy5wYXJhbWV0ZXJzO1xuXG4gICAgICAgIHAucGFkZGluZyA9IENoYXJ0RGVmYXVsdFNldHRpbmdzLmdldFBhZGRpbmdXaXRoRGVmYXVsdHMocC5wYWRkaW5nLCBDaGFydERlZmF1bHRTZXR0aW5ncy5sZWdlbmRlZHBhZGRpbmcpO1xuXG4gICAgICAgIGlmIChwLnltaW4gPT0gbnVsbCkge1xuICAgICAgICAgICAgcC55bWluID0gTmFOO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHAuc2hvd2dyaWRsaW5lcyA9PSBudWxsKSB7XG4gICAgICAgICAgICBwLnNob3dncmlkbGluZXMgPSBBeGVzLk5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlci5zZXRQYXJhbWV0ZXJEZWZhdWx0cygpO1xuXG4gICAgICAgIGlmIChwLnNob3dsZWdlbmQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcC5zaG93bGVnZW5kID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHAubGVnZW5kb2Zmc2V0ID0gQ2hhcnREZWZhdWx0U2V0dGluZ3MuZ2V0T2Zmc2V0V2l0aERlZmF1bHRzKHAubGVnZW5kb2Zmc2V0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0U3R5bGVEZWZhdWx0cygpICB7XG5cbiAgICAgICAgc3VwZXIuc2V0U3R5bGVEZWZhdWx0cygpO1xuXG4gICAgICAgIGxldCBzID0gdGhpcy5zdHlsZTtcblxuICAgICAgICBzLmxlZ2VuZExhYmVsRm9udCA9IENoYXJ0RGVmYXVsdFNldHRpbmdzLmdldEZvbnRXaXRoRGVmYXVsdHMocy5sZWdlbmRMYWJlbEZvbnQsIHMuZGVmYXVsdEZvbnQpO1xuXG4gICAgICAgIGlmIChzLmxlZ2VuZExhYmVsQ29sb3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgcy5sZWdlbmRMYWJlbENvbG9yID0gcy5kZWZhdWx0VGV4dENvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgcy5jb2xvcnMgPSBDaGFydERlZmF1bHRTZXR0aW5ncy5nZXRDb2xvcnNXaXRoRGVmYXVsdHMocy5jb2xvcnMsIDgpO1xuXG4gICAgICAgIGlmIChzLmhvdmVyY29sb3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgcy5ob3ZlcmNvbG9yID0gQ2hhcnREZWZhdWx0U2V0dGluZ3MuaG92ZXJjb2xvcjs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocy5zeW1ib2xzaGFwZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBzLnN5bWJvbHNoYXBlID0gU2hhcGUuY2lyY2xlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHMuc3ltYm9sc2l6ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBzLnN5bWJvbHNpemUgPSAyMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRYU2NhbGVEYXRhKGRhdGE6IFBsb3RbXSk6IG51bWJlcltdIHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBhcmFtZXRlcnM7XG5cbiAgICAgICAgbGV0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGRpIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGRpKSkge1xuICAgICAgICAgICAgICAgIGxldCBwb2ludHMgPSBkYXRhW2RpXS5wb2ludHM7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGkgaW4gcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2ludHMuaGFzT3duUHJvcGVydHkocGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChwb2ludHNbcGldLngpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWluTWF4KHZhbHVlcywgcC54bWluLCBwLnhtYXgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRZU2NhbGVEYXRhKGRhdGE6IFBsb3RbXSk6IG51bWJlcltdIHtcbiAgICAgICAgbGV0IHAgPSB0aGlzLnBhcmFtZXRlcnM7XG5cbiAgICAgICAgbGV0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGRpIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGRpKSkge1xuICAgICAgICAgICAgICAgIGxldCBwb2ludHMgPSBkYXRhW2RpXS5wb2ludHM7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGkgaW4gcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2ludHMuaGFzT3duUHJvcGVydHkocGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChwb2ludHNbcGldLnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWluTWF4KHZhbHVlcywgcC55bWluLCBwLnltYXgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVTcGVjKGRhdGE6IFBsb3RbXSk6IE9iamVjdCB7XG4gICAgICAgIGxldCBzcGVjID0gc3VwZXIuY3JlYXRlU3BlYyhkYXRhKTtcblxuICAgICAgICBsZXQgcCA9IHRoaXMucGFyYW1ldGVycztcbiAgICAgICAgbGV0IHMgPSB0aGlzLnN0eWxlO1xuXG4gICAgICAgIHNwZWNbXCJzaWduYWxzXCJdID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiaG92ZXJcIixcbiAgICAgICAgICAgICAgICBpbml0OiB7fSxcbiAgICAgICAgICAgICAgICBzdHJlYW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOiBcInN5bWJvbDptb3VzZW92ZXJcIiwgZXhwcjogXCJkYXR1bVwifSxcbiAgICAgICAgICAgICAgICAgICAge3R5cGU6IFwic3ltYm9sOm1vdXNlb3V0XCIsIGV4cHI6IFwie31cIn1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiZG90Y2xpY2tcIixcbiAgICAgICAgICAgICAgICBzdHJlYW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOiBcInN5bWJvbDptb3VzZWRvd25cIiwgZXhwcjogXCJkYXR1bVwifVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJkb3Rob3ZlclwiLFxuICAgICAgICAgICAgICAgIHN0cmVhbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge3R5cGU6IFwic3ltYm9sOm1vdXNlb3ZlclwiLCBleHByOiBcImRhdHVtXCJ9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuXG4gICAgICAgIHNwZWNbXCJwcmVkaWNhdGVzXCJdID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiaG92ZXJcIiwgdHlwZTogXCI9PVwiLFxuICAgICAgICAgICAgICAgIG9wZXJhbmRzOiBbe3NpZ25hbDogXCJob3Zlci5faWRcIn0sIHthcmc6IFwiaWRcIn1dXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcGxvdCA9IGRhdGFbaV07XG4gICAgICAgICAgICBsZXQgbmFtZSA9IFwicGxvdFwiICsgKGkrMSk7XG5cbiAgICAgICAgICAgIHNwZWNbXCJkYXRhXCJdLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgdmFsdWVzOiBwbG90LnBvaW50c1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNwZWNbXCJtYXJrc1wiXS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN5bWJvbFwiLFxuICAgICAgICAgICAgICAgIGZyb206IHtkYXRhOiBuYW1lfSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGVudGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFwZToge3ZhbHVlOiBzLnN5bWJvbHNoYXBlLnRvU3RyaW5nKCkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IHt2YWx1ZTogcy5zeW1ib2xzaXplfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw6IHt2YWx1ZTogcy5jb2xvcnNbaV19LFxuICAgICAgICAgICAgICAgICAgICAgICAgeDoge3NjYWxlOiBcInhzY2FsZVwiLCBmaWVsZDogXCJ4XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeToge3NjYWxlOiBcInlzY2FsZVwiLCBmaWVsZDogXCJ5XCJ9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGU6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZGljYXRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJob3ZlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB7ZmllbGQ6IFwiX2lkXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHMuaG92ZXJjb2xvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dmFsdWU6IHMuY29sb3JzW2ldfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5hbWVzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgZGkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoZGkpKSB7XG4gICAgICAgICAgICAgICAgbmFtZXMucHVzaChkYXRhW2RpXS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsZWdlbmQgPSBuZXcgU2NhdHRlclBsb3RMZWdlbmQocCwgcyk7XG4gICAgICAgIGxlZ2VuZC5yZW5kZXIoc3BlYywgbmFtZXMpO1xuXG4gICAgICAgIHJldHVybiBzcGVjO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGRDaGFydEJlaGF2aW9ycyhjOiBWaWV3LCBwOiBTY2F0dGVyUGxvdFBhcmFtZXRlcnMpIHtcbiAgICAgICAgYy5vblNpZ25hbChcImRvdGNsaWNrXCIsIGZ1bmN0aW9uKG5hbWUsIGRhdHVtKSB7XG4gICAgICAgICAgICBpZiAocC5vbmRvdGNsaWNrKSB7XG4gICAgICAgICAgICAgICAgcC5vbmRvdGNsaWNrKGRhdHVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGMub25TaWduYWwoXCJkb3Rob3ZlclwiLCBmdW5jdGlvbihuYW1lLCBkYXR1bSkge1xuICAgICAgICAgICAgaWYgKHAub25kb3Rob3Zlcikge1xuICAgICAgICAgICAgICAgIHAub25kb3Rob3ZlcihkYXR1bSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLypcbiAqIFNjYXR0ZXIgcGxvdCBjbGFzcyBmb3IgZHJhd2luZyBhIHNpbmdsZSBzY2F0dGVyIHBsb3QgaW4gYSBjaGFydC5cbiAqL1xuZXhwb3J0IGNsYXNzIFNjYXR0ZXJQbG90IGV4dGVuZHMgWHlDaGFydDxTY2F0dGVyUGxvdFBhcmFtZXRlcnMsIFNjYXR0ZXJQbG90U3R5bGUsIFBvaW50W10+IHtcbiAgICBjb25zdHJ1Y3Rvcih4YXhpc3RpdGxlOiBzdHJpbmcgPSBudWxsLCB5YXhpc3RpdGxlOiBzdHJpbmcgPSBudWxsLFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IFNjYXR0ZXJQbG90UGFyYW1ldGVycyA9IG5ldyBTY2F0dGVyUGxvdFBhcmFtZXRlcnMoKSxcbiAgICAgICAgICAgICAgICBzdHlsZTogU2NhdHRlclBsb3RTdHlsZSA9IG5ldyBTY2F0dGVyUGxvdFN0eWxlKCkpIHtcbiAgICAgICAgc3VwZXIoeGF4aXN0aXRsZSwgeWF4aXN0aXRsZSwgcGFyYW1ldGVycywgc3R5bGUpO1xuXG4gICAgICAgIHRoaXMubXVsdGlzY2F0dGVycGxvdCA9IG5ldyBNdWx0aVNjYXR0ZXJQbG90KHRoaXMueGF4aXN0aXRsZSwgdGhpcy55YXhpc3RpdGxlLCB0aGlzLnBhcmFtZXRlcnMsIHRoaXMuc3R5bGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbXVsdGlzY2F0dGVycGxvdDogTXVsdGlTY2F0dGVyUGxvdDtcblxuICAgIHByb3RlY3RlZCBjcmVhdGVQYXJhbWV0ZXJzKCk6IFNjYXR0ZXJQbG90UGFyYW1ldGVycyB7XG4gICAgICAgIHJldHVybiBuZXcgU2NhdHRlclBsb3RQYXJhbWV0ZXJzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVN0eWxlKCk6IFNjYXR0ZXJQbG90U3R5bGUge1xuICAgICAgICByZXR1cm4gbmV3IFNjYXR0ZXJQbG90U3R5bGU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFBhcmFtZXRlckRlZmF1bHRzKCkge1xuICAgICAgICBsZXQgcCA9IHRoaXMucGFyYW1ldGVycztcblxuICAgICAgICBwLnBhZGRpbmcgPSBDaGFydERlZmF1bHRTZXR0aW5ncy5nZXRQYWRkaW5nV2l0aERlZmF1bHRzKHAucGFkZGluZyk7XG5cbiAgICAgICAgaWYgKHAueW1pbiA9PSBudWxsKSB7XG4gICAgICAgICAgICBwLnltaW4gPSBOYU47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocC5zaG93Z3JpZGxpbmVzID09IG51bGwpIHtcbiAgICAgICAgICAgIHAuc2hvd2dyaWRsaW5lcyA9IEF4ZXMuTm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHAuc2hvd2xlZ2VuZCA9IGZhbHNlO1xuXG4gICAgICAgIHN1cGVyLnNldFBhcmFtZXRlckRlZmF1bHRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFN0eWxlRGVmYXVsdHMoKSAge1xuXG4gICAgICAgIHN1cGVyLnNldFN0eWxlRGVmYXVsdHMoKTtcblxuICAgICAgICBsZXQgcyA9IHRoaXMuc3R5bGU7XG5cbiAgICAgICAgaWYgKHMuY29sb3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgcy5jb2xvciA9IENoYXJ0RGVmYXVsdFNldHRpbmdzLmdldFBhbGV0dGVDb2xvcigwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHMuY29sb3JzID0gWyBzLmNvbG9yIF07XG4gICAgfVxuXG4gICAgcHVibGljIHNob3coY2hhcnRpZDogc3RyaW5nLCBkYXRhOiBQb2ludFtdKSB7XG4gICAgICAgIHRoaXMubXVsdGlzY2F0dGVycGxvdC5zaG93KGNoYXJ0aWQsIFsge25hbWU6bnVsbCwgZGVzYzogbnVsbCwgcG9pbnRzOiBkYXRhIH1dKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVQbmcoZGF0YTogUG9pbnRbXSwgZmlsZXBhdGg6IHN0cmluZykge1xuICAgICAgICB0aGlzLm11bHRpc2NhdHRlcnBsb3Qud3JpdGVQbmcoW3tuYW1lOm51bGwsIGRlc2M6IG51bGwsIHBvaW50czogZGF0YSB9XSwgZmlsZXBhdGgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZVN2ZyhkYXRhOiBQb2ludFtdLCBmaWxlcGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubXVsdGlzY2F0dGVycGxvdC53cml0ZVN2Zyhbe25hbWU6bnVsbCwgZGVzYzogbnVsbCwgcG9pbnRzOiBkYXRhIH1dLCBmaWxlcGF0aCk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9