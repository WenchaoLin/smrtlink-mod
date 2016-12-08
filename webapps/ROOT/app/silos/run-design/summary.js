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
var router_1 = require("angular2/router");
var plural_pipe_1 = require("athenaeum/pipes/plural-pipe");
var silo_service_1 = require("../silo-service");
var run_service_1 = require("../../data/services/run-service");
var catalog_1 = require("athenaeum/components/catalog/catalog");
var Summary = (function () {
    function Summary(siloService, runService, router) {
        this.design = null;
        this.run = null;
        this.sampleCatalogArgs = {
            show: {
                searchBox: false,
                customizeButton: false,
                spinner: false,
                error: false
            },
            agGridOptions: {
                columnDefs: [
                    {
                        headerName: "#",
                        cellRenderer: function (_a) {
                            var rowIndex = _a.rowIndex;
                            return rowIndex + 1;
                        }
                    },
                    {
                        headerName: "Sample Name",
                        field: "sampleName"
                    },
                    {
                        headerName: "Insert Size (bp)",
                        field: "insertSize"
                    },
                    {
                        headerName: "Sample Well",
                        field: "wellName"
                    },
                    {
                        headerName: "Sample Loading",
                        field: "magBead",
                        cellRenderer: function (_a) {
                            var value = _a.value;
                            if (value) {
                                return "Mag Bead";
                            }
                            else {
                                return "Diffusion";
                            }
                        }
                    },
                    {
                        headerName: "Movie Time (min)",
                        field: "movieTime"
                    }
                ],
                rowData: [],
                enableSorting: false,
                enableFilter: false,
                // groupKeys: ["status"],
                groupUseEntireRow: true,
                groupDefaultExpanded: true,
                enableColResize: true,
                dontUseScrolls: false,
                toolPanelSuppressPivot: true,
                toolPanelSuppressValues: true,
                // note: the 40 below needs to match the 40px in catalog.css
                // TODO(bforbes)(2016-03-08): refactor to make code more DRY
                rowHeight: 40,
                headerHeight: 40
            }
        };
        siloService.setState({
            title: "Summary of Run Design",
            buttons: [
                {
                    label: "Cancel",
                    className: "btn btn-primary btn-lg",
                    onClick: this.onCancel.bind(this)
                },
                {
                    label: "Edit",
                    className: "btn btn-primary btn-lg",
                    onClick: this.onEdit.bind(this)
                }
            ]
        });
        this.runService = runService;
        this.router = router;
    }
    Summary.prototype.routerOnActivate = function (next) {
        var _this = this;
        return this.runService.getDesign(next.params["id"]).then(function (object) {
            _this.design = object;
            _this.run = object.run;
            _this.cellsRequired = _this.run.samples.length;
            _this.reagentPlatesRequired = _this.cellsRequired < 9 ? 1 : 2;
            _this.samples.setContentItems(_this.run.samples);
        });
    };
    Summary.prototype.onCancel = function () {
        this.router.navigate(["../Index"]);
    };
    Summary.prototype.onEdit = function () {
        this.router.navigate(["../EditRun", { id: this.design.uniqueId }]);
    };
    __decorate([
        core_1.ViewChild(catalog_1.Catalog), 
        __metadata('design:type', catalog_1.Catalog)
    ], Summary.prototype, "samples", void 0);
    Summary = __decorate([
        core_1.Component({
            selector: "run-design-summary",
            moduleId: module.id,
            templateUrl: "summary.html",
            styleUrls: ["summary.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            pipes: [plural_pipe_1.PluralPipe],
            directives: [catalog_1.Catalog]
        }), 
        __metadata('design:paramtypes', [silo_service_1.SiloService, run_service_1.RunService, router_1.Router])
    ], Summary);
    return Summary;
}());
exports.Summary = Summary;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9ydW4tZGVzaWduL3N1bW1hcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFzRCxlQUFlLENBQUMsQ0FBQTtBQUN0RSx1QkFBdUQsaUJBQWlCLENBQUMsQ0FBQTtBQUV6RSw0QkFBeUIsNkJBQTZCLENBQUMsQ0FBQTtBQUV2RCw2QkFBMEIsaUJBQWlCLENBQUMsQ0FBQTtBQUU1Qyw0QkFBZ0QsaUNBQWlDLENBQUMsQ0FBQTtBQUVsRix3QkFBc0Isc0NBQXNDLENBQUMsQ0FBQTtBQVc3RDtJQXVFSSxpQkFBWSxXQUFtQyxFQUNuQyxVQUFzQixFQUN0QixNQUFjO1FBeEVsQixXQUFNLEdBQWdCLElBQUksQ0FBQztRQUMzQixRQUFHLEdBQWEsSUFBSSxDQUFDO1FBSXJCLHNCQUFpQixHQUFHO1lBQ3hCLElBQUksRUFBRTtnQkFDRixTQUFTLEVBQUUsS0FBSztnQkFDaEIsZUFBZSxFQUFFLEtBQUs7Z0JBQ3RCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxLQUFLO2FBQ2Y7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsVUFBVSxFQUFFO29CQUNSO3dCQUNJLFVBQVUsRUFBRSxHQUFHO3dCQUNmLFlBQVksRUFBRSxVQUFVLEVBQW1DO2dDQUFqQyxzQkFBUTs0QkFDOUIsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7d0JBQ3hCLENBQUM7cUJBQ0o7b0JBQ0Q7d0JBQ0ksVUFBVSxFQUFFLGFBQWE7d0JBQ3pCLEtBQUssRUFBRSxZQUFZO3FCQUN0QjtvQkFDRDt3QkFDSSxVQUFVLEVBQUUsa0JBQWtCO3dCQUM5QixLQUFLLEVBQUUsWUFBWTtxQkFDdEI7b0JBQ0Q7d0JBQ0ksVUFBVSxFQUFFLGFBQWE7d0JBQ3pCLEtBQUssRUFBRSxVQUFVO3FCQUNwQjtvQkFDRDt3QkFDSSxVQUFVLEVBQUUsZ0JBQWdCO3dCQUM1QixLQUFLLEVBQUUsU0FBUzt3QkFDaEIsWUFBWSxFQUFFLFVBQVUsRUFBOEI7Z0NB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QixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtZQUNyQyxLQUFLLEVBQUUsQ0FBQyx3QkFBVSxDQUFDO1lBQ25CLFVBQVUsRUFBRSxDQUFDLGlCQUFPLENBQUM7U0FDeEIsQ0FBQzs7ZUFBQTtJQWdIRixjQUFDO0FBQUQsQ0EvR0EsQUErR0MsSUFBQTtBQS9HWSxlQUFPLFVBK0duQixDQUFBIiwiZmlsZSI6ImFwcC9zaWxvcy9ydW4tZGVzaWduL3N1bW1hcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIFZpZXdDaGlsZH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVyLCBPbkFjdGl2YXRlLCBDb21wb25lbnRJbnN0cnVjdGlvbn0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuXG5pbXBvcnQge1BsdXJhbFBpcGV9IGZyb20gXCJhdGhlbmFldW0vcGlwZXMvcGx1cmFsLXBpcGVcIjtcblxuaW1wb3J0IHtTaWxvU2VydmljZX0gZnJvbSBcIi4uL3NpbG8tc2VydmljZVwiO1xuaW1wb3J0IHtTaWxvU3RhdGV9IGZyb20gXCIuLi9ydW4tZGVzaWduXCI7XG5pbXBvcnQge1J1blNlcnZpY2UsIERlc2lnbk1vZGVsLCBSdW5Nb2RlbH0gZnJvbSBcIi4uLy4uL2RhdGEvc2VydmljZXMvcnVuLXNlcnZpY2VcIjtcblxuaW1wb3J0IHtDYXRhbG9nfSBmcm9tIFwiYXRoZW5hZXVtL2NvbXBvbmVudHMvY2F0YWxvZy9jYXRhbG9nXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInJ1bi1kZXNpZ24tc3VtbWFyeVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwic3VtbWFyeS5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbIFwic3VtbWFyeS5jc3NcIiBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcGlwZXM6IFtQbHVyYWxQaXBlXSxcbiAgICBkaXJlY3RpdmVzOiBbQ2F0YWxvZ11cbn0pXG5leHBvcnQgY2xhc3MgU3VtbWFyeSBpbXBsZW1lbnRzIE9uQWN0aXZhdGUge1xuICAgIHByaXZhdGUgZGVzaWduOiBEZXNpZ25Nb2RlbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBydW46IFJ1bk1vZGVsID0gbnVsbDtcblxuICAgIEBWaWV3Q2hpbGQoQ2F0YWxvZykgcHJpdmF0ZSBzYW1wbGVzOiBDYXRhbG9nO1xuXG4gICAgcHJpdmF0ZSBzYW1wbGVDYXRhbG9nQXJncyA9IHtcbiAgICAgICAgc2hvdzoge1xuICAgICAgICAgICAgc2VhcmNoQm94OiBmYWxzZSxcbiAgICAgICAgICAgIGN1c3RvbWl6ZUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICBzcGlubmVyOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBhZ0dyaWRPcHRpb25zOiB7XG4gICAgICAgICAgICBjb2x1bW5EZWZzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJOYW1lOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgY2VsbFJlbmRlcmVyOiBmdW5jdGlvbiAoeyByb3dJbmRleCB9OiB7IHJvd0luZGV4OiBudW1iZXI7IH0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByb3dJbmRleCArIDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyTmFtZTogXCJTYW1wbGUgTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJzYW1wbGVOYW1lXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyTmFtZTogXCJJbnNlcnQgU2l6ZSAoYnApXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcImluc2VydFNpemVcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJOYW1lOiBcIlNhbXBsZSBXZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcIndlbGxOYW1lXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyTmFtZTogXCJTYW1wbGUgTG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJtYWdCZWFkXCIsXG4gICAgICAgICAgICAgICAgICAgIGNlbGxSZW5kZXJlcjogZnVuY3Rpb24gKHsgdmFsdWUgfTogeyB2YWx1ZTogYm9vbGVhbjsgfSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTWFnIEJlYWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiRGlmZnVzaW9uXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyTmFtZTogXCJNb3ZpZSBUaW1lIChtaW4pXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcIm1vdmllVGltZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJvd0RhdGE6IFtdLFxuICAgICAgICAgICAgZW5hYmxlU29ydGluZzogZmFsc2UsXG4gICAgICAgICAgICBlbmFibGVGaWx0ZXI6IGZhbHNlLFxuICAgICAgICAgICAgLy8gZ3JvdXBLZXlzOiBbXCJzdGF0dXNcIl0sXG4gICAgICAgICAgICBncm91cFVzZUVudGlyZVJvdzogdHJ1ZSxcbiAgICAgICAgICAgIGdyb3VwRGVmYXVsdEV4cGFuZGVkOiB0cnVlLFxuICAgICAgICAgICAgZW5hYmxlQ29sUmVzaXplOiB0cnVlLFxuICAgICAgICAgICAgZG9udFVzZVNjcm9sbHM6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbFBhbmVsU3VwcHJlc3NQaXZvdDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2xQYW5lbFN1cHByZXNzVmFsdWVzOiB0cnVlLFxuICAgICAgICAgICAgLy8gbm90ZTogdGhlIDQwIGJlbG93IG5lZWRzIHRvIG1hdGNoIHRoZSA0MHB4IGluIGNhdGFsb2cuY3NzXG4gICAgICAgICAgICAvLyBUT0RPKGJmb3JiZXMpKDIwMTYtMDMtMDgpOiByZWZhY3RvciB0byBtYWtlIGNvZGUgbW9yZSBEUllcbiAgICAgICAgICAgIHJvd0hlaWdodDogNDAsXG4gICAgICAgICAgICBoZWFkZXJIZWlnaHQ6IDQwXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBydW5TZXJ2aWNlOiBSdW5TZXJ2aWNlO1xuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XG4gICAgcHJpdmF0ZSBjZWxsc1JlcXVpcmVkOiBudW1iZXI7XG4gICAgcHJpdmF0ZSByZWFnZW50UGxhdGVzUmVxdWlyZWQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHNpbG9TZXJ2aWNlOiBTaWxvU2VydmljZTxTaWxvU3RhdGU+LFxuICAgICAgICAgICAgICAgIHJ1blNlcnZpY2U6IFJ1blNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICAgICAgc2lsb1NlcnZpY2Uuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdGl0bGU6IFwiU3VtbWFyeSBvZiBSdW4gRGVzaWduXCIsXG4gICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDYW5jZWxcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tcHJpbWFyeSBidG4tbGdcIixcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5vbkNhbmNlbC5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkVkaXRcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0biBidG4tcHJpbWFyeSBidG4tbGdcIixcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5vbkVkaXQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ydW5TZXJ2aWNlID0gcnVuU2VydmljZTtcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgfVxuXG4gICAgcm91dGVyT25BY3RpdmF0ZShuZXh0OiBDb21wb25lbnRJbnN0cnVjdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5ydW5TZXJ2aWNlLmdldERlc2lnbihuZXh0LnBhcmFtc1tcImlkXCJdKS50aGVuKChvYmplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzaWduID0gb2JqZWN0O1xuICAgICAgICAgICAgdGhpcy5ydW4gPSBvYmplY3QucnVuO1xuICAgICAgICAgICAgdGhpcy5jZWxsc1JlcXVpcmVkID0gdGhpcy5ydW4uc2FtcGxlcy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLnJlYWdlbnRQbGF0ZXNSZXF1aXJlZCA9IHRoaXMuY2VsbHNSZXF1aXJlZCA8IDkgPyAxIDogMjtcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlcy5zZXRDb250ZW50SXRlbXModGhpcy5ydW4uc2FtcGxlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DYW5jZWwoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi4uL0luZGV4XCJdKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRWRpdCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiLi4vRWRpdFJ1blwiLCB7IGlkOiB0aGlzLmRlc2lnbi51bmlxdWVJZCB9XSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9