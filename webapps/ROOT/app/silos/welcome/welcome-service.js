/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
"use strict";
var silo_1 = require("../silo");
function fromSilo(initial, silo) {
    var result = Object.assign({}, initial);
    Object.assign(result, silo);
    return result;
}
var WelcomeService = (function () {
    function WelcomeService() {
        // private SAMPLE_SETUP_ARGS = {
        //    title: TEXT.SILO.SAMPLE_SETUP,
        //    route: ROUTE.WELCOME,
        //    backgroundColor: "rgba(202, 219, 68, .8)",
        //    icon: "images/calculator-icon.svg"
        //    /*
        //     button: {label: "New Calculation", route: "page/new-calc"},
        //     sections: [{
        //         title: "Recent",
        //         shortcuts: [
        //             {label: "H1Na Sample 2", route: "page/1234"},
        //             {label: "H1Na Sample 1A", route: "page/2456"},
        //             {label: "H1Na Sample 1B", route: "page/9213"}
        //         ]
        //     }]
        //     */
        // };
        //
        // private RUN_DESIGN_ARGS = {
        //    title: TEXT.SILO.RUN_DESIGN,
        //    route: ROUTE.WELCOME,
        //    backgroundColor: "rgba(103, 193, 140, .8)",
        //    icon: "images/drafting-icon.svg"
        //    /*
        //     button: {label: "New Run Design", route: "page/new-run"},
        //     sections: [{
        //         title: "Recent",
        //         shortcuts: [
        //             {label: 'H1N1 Run B sent to "Peabody"', route: "page/1234"},
        //             {label: 'H1N1 Run C sent to "Peabody"', route: "page/2456"},
        //             {label: 'H1N1 Run D sent to "Peabody"', route: "page/9213"}
        //         ]
        //     }]
        //     */
        // };
        //
        // private RUN_QC_ARGS = {
        //    title: TEXT.SILO.RUN_QC,
        //    route: ROUTE.WELCOME,
        //    backgroundColor: "rgba(35, 54, 82, .8)",
        //    icon: "images/pages-icon.svg"
        //    /*
        //     sections: [{
        //         title: "Run in progress",
        //         shortcuts: [
        //             {label: 'H1N1 Run B sequencing on "Peat"', route: "p/1234"},
        //             {label: 'HuRef Run 37 sequencing on "Peat"', route: "p/6"},
        //             {label: 'H1N1 Run A sequencing on "Peat"', route: "p/9213"}
        //         ]
        //         }, {
        //         title: "Recent",
        //         shortcuts: [
        //             {label: "H1Na Sample 2", route: "page/1234"},
        //             {label: "H1Na Sample 1A", route: "page/2456"},
        //             {label: "H1Na Sample 1B", route: "page/9213"}
        //         ]
        //     }]
        //     */
        // };
        //
        // private DATA_MANAGEMENT_ARGS = {
        //    title: TEXT.SILO.DATA_MANAGEMENT,
        //    route: ROUTE.WELCOME,
        //    backgroundColor: "rgba(85, 49, 118, .8)",
        //    icon: "images/folder-icon.svg"
        //    /*
        //     button: {label: "New Data Set", route: "page/new-ds"},
        //     sections: [{
        //         title: "Recent",
        //         shortcuts: [
        //             {label: 'H1N1 Run B sent to "Peabody"', route: "page/1234"},
        //             {label: 'H1N1 Run C sent to "Peabody"', route: "page/2456"},
        //             {label: 'H1N1 Run D sent to "Peabody"', route: "page/9213"}
        //         ]
        //     }]
        //     */
        // };
        // private DATA_ANALYSIS_ARGS = {
        //    title: TEXT.SILO.DATA_ANALYSIS,
        //    route: ROUTE.DATA_ANALYSIS,
        //    backgroundColor: "rgba(0, 142, 185, .8)",
        //    icon: "images/chart-icon.svg",
        //    button: {
        //        label: "New Data Set",
        //        route: ROUTE.DATA_ANALYSIS
        //    }
        //    /*
        //     sections: [{
        //         title: "Recent",
        //         shortcuts: [
        //             {label: "Set ABC on Dec 19, 2014", route: "page/1234"},
        //             {label: "Set DEF on Dec 19, 2014", route: "page/2456"},
        //         ]
        //     }]
        //     */
        // };
        // TODO: bforbes(2016-01-12) Generate sections from server responses
        this.tiles = [
            fromSilo({ id: "welcome" }, silo_1.SILO.WELCOME),
            fromSilo({
                id: "sample-setup",
                disabled: true,
                sections: [{
                        title: ""
                    }]
            }, silo_1.SILO.SAMPLE_SETUP),
            fromSilo({
                id: "run-design",
                sections: [{
                        title: ""
                    }],
                button: {
                    label: "New Run Design",
                    route: ["RunDesign", "NewRun"]
                }
            }, silo_1.SILO.RUN_DESIGN),
            /* tslint:disable:max-line-length */
            fromSilo({
                id: "run-qc"
            }, silo_1.SILO.RUN_QC),
            /* tslint:enable:max-line-length */
            fromSilo({
                id: "data-management",
                sections: [{
                        title: ""
                    }],
                button: {
                    label: "New Data Set",
                    route: ["DataManagement", "SelectDatasets"]
                }
            }, silo_1.SILO.DATA_MANAGEMENT),
            fromSilo({
                id: "data-analysis",
                sections: [{
                        title: ""
                    }],
                button: {
                    label: "New Analysis",
                    route: ["Analysis", "SelectData"]
                }
            }, silo_1.SILO.DATA_ANALYSIS)
        ];
    }
    return WelcomeService;
}());
exports.WelcomeService = WelcomeService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy93ZWxjb21lL3dlbGNvbWUtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBR0gscUJBQTBCLFNBQVMsQ0FBQyxDQUFBO0FBa0JwQyxrQkFBa0IsT0FBYyxFQUFFLElBQVc7SUFDekMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQ7SUFBQTtRQUNJLGdDQUFnQztRQUNoQyxvQ0FBb0M7UUFDcEMsMkJBQTJCO1FBQzNCLGdEQUFnRDtRQUNoRCx3Q0FBd0M7UUFDeEMsUUFBUTtRQUNSLGtFQUFrRTtRQUNsRSxtQkFBbUI7UUFDbkIsMkJBQTJCO1FBQzNCLHVCQUF1QjtRQUN2Qiw0REFBNEQ7UUFDNUQsNkRBQTZEO1FBQzdELDREQUE0RDtRQUM1RCxZQUFZO1FBQ1osU0FBUztRQUNULFNBQVM7UUFDVCxLQUFLO1FBQ0wsRUFBRTtRQUNGLDhCQUE4QjtRQUM5QixrQ0FBa0M7UUFDbEMsMkJBQTJCO1FBQzNCLGlEQUFpRDtRQUNqRCxzQ0FBc0M7UUFDdEMsUUFBUTtRQUNSLGdFQUFnRTtRQUNoRSxtQkFBbUI7UUFDbkIsMkJBQTJCO1FBQzNCLHVCQUF1QjtRQUN2QiwyRUFBMkU7UUFDM0UsMkVBQTJFO1FBQzNFLDBFQUEwRTtRQUMxRSxZQUFZO1FBQ1osU0FBUztRQUNULFNBQVM7UUFDVCxLQUFLO1FBQ0wsRUFBRTtRQUNGLDBCQUEwQjtRQUMxQiw4QkFBOEI7UUFDOUIsMkJBQTJCO1FBQzNCLDhDQUE4QztRQUM5QyxtQ0FBbUM7UUFDbkMsUUFBUTtRQUNSLG1CQUFtQjtRQUNuQixvQ0FBb0M7UUFDcEMsdUJBQXVCO1FBQ3ZCLDJFQUEyRTtRQUMzRSwwRUFBMEU7UUFDMUUsMEVBQTBFO1FBQzFFLFlBQVk7UUFDWixlQUFlO1FBQ2YsMkJBQTJCO1FBQzNCLHVCQUF1QjtRQUN2Qiw0REFBNEQ7UUFDNUQsNkRBQTZEO1FBQzdELDREQUE0RDtRQUM1RCxZQUFZO1FBQ1osU0FBUztRQUNULFNBQVM7UUFDVCxLQUFLO1FBQ0wsRUFBRTtRQUNGLG1DQUFtQztRQUNuQyx1Q0FBdUM7UUFDdkMsMkJBQTJCO1FBQzNCLCtDQUErQztRQUMvQyxvQ0FBb0M7UUFDcEMsUUFBUTtRQUNSLDZEQUE2RDtRQUM3RCxtQkFBbUI7UUFDbkIsMkJBQTJCO1FBQzNCLHVCQUF1QjtRQUN2QiwyRUFBMkU7UUFDM0UsMkVBQTJFO1FBQzNFLDBFQUEwRTtRQUMxRSxZQUFZO1FBQ1osU0FBUztRQUNULFNBQVM7UUFDVCxLQUFLO1FBQ0wsaUNBQWlDO1FBQ2pDLHFDQUFxQztRQUNyQyxpQ0FBaUM7UUFDakMsK0NBQStDO1FBQy9DLG9DQUFvQztRQUNwQyxlQUFlO1FBQ2YsZ0NBQWdDO1FBQ2hDLG9DQUFvQztRQUNwQyxPQUFPO1FBQ1AsUUFBUTtRQUNSLG1CQUFtQjtRQUNuQiwyQkFBMkI7UUFDM0IsdUJBQXVCO1FBQ3ZCLHNFQUFzRTtRQUN0RSxzRUFBc0U7UUFDdEUsWUFBWTtRQUNaLFNBQVM7UUFDVCxTQUFTO1FBQ1QsS0FBSztRQUVMLG9FQUFvRTtRQUM3RCxVQUFLLEdBQVk7WUFDcEIsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLFdBQUksQ0FBQyxPQUFPLENBQUM7WUFDekMsUUFBUSxDQUNKO2dCQUNJLEVBQUUsRUFBRSxjQUFjO2dCQUNsQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxRQUFRLEVBQUUsQ0FBQzt3QkFDUCxLQUFLLEVBQUUsRUFBRTtxQkFDWixDQUFDO2FBa0JMLEVBQ0QsV0FBSSxDQUFDLFlBQVksQ0FDcEI7WUFDRCxRQUFRLENBQ0o7Z0JBQ0ksRUFBRSxFQUFFLFlBQVk7Z0JBQ2hCLFFBQVEsRUFBRSxDQUFDO3dCQUNQLEtBQUssRUFBRSxFQUFFO3FCQUNaLENBQUM7Z0JBQ0YsTUFBTSxFQUFFO29CQUNMLEtBQUssRUFBRSxnQkFBZ0I7b0JBQ3ZCLEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUM7aUJBQ2hDO2FBQ0osRUFDRCxXQUFJLENBQUMsVUFBVSxDQUNsQjtZQUNELG9DQUFvQztZQUNwQyxRQUFRLENBQ0o7Z0JBQ0ksRUFBRSxFQUFFLFFBQVE7YUFDZixFQUNELFdBQUksQ0FBQyxNQUFNLENBQ2Q7WUFDRCxtQ0FBbUM7WUFDbkMsUUFBUSxDQUNKO2dCQUNJLEVBQUUsRUFBRSxpQkFBaUI7Z0JBQ3JCLFFBQVEsRUFBRSxDQUFDO3dCQUNQLEtBQUssRUFBRSxFQUFFO3FCQUNaLENBQUM7Z0JBQ0YsTUFBTSxFQUFFO29CQUNKLEtBQUssRUFBRSxjQUFjO29CQUNyQixLQUFLLEVBQUUsQ0FBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBRTtpQkFDaEQ7YUFDSixFQUNELFdBQUksQ0FBQyxlQUFlLENBQ3ZCO1lBQ0QsUUFBUSxDQUNKO2dCQUNJLEVBQUUsRUFBRSxlQUFlO2dCQUNuQixRQUFRLEVBQUUsQ0FBQzt3QkFDUCxLQUFLLEVBQUUsRUFBRTtxQkFDWixDQUFDO2dCQUNGLE1BQU0sRUFBRTtvQkFDSixLQUFLLEVBQUUsY0FBYztvQkFDckIsS0FBSyxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQztpQkFDcEM7YUFDSixFQUNELFdBQUksQ0FBQyxhQUFhLENBQ3JCO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFBRCxxQkFBQztBQUFELENBaExBLEFBZ0xDLElBQUE7QUFoTFksc0JBQWMsaUJBZ0wxQixDQUFBIiwiZmlsZSI6ImFwcC9zaWxvcy93ZWxjb21lL3dlbGNvbWUtc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTUsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYSwgSW5jLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmJza2lubmVyQHBhY2lmaWNiaW9zY2llbmNlcy5jb21cIj5CcmlhbiBTa2lubmVyPC9hPlxuICovXG5cbmltcG9ydCB7VEVYVH0gZnJvbSBcIi4uLy4uL3N0cmluZ3MvZW4tdXMvdGV4dFwiO1xuaW1wb3J0IHtTSUxPLCBJU2lsb30gZnJvbSBcIi4uL3NpbG9cIjtcblxuZXhwb3J0IGludGVyZmFjZSBJU2VjdGlvbiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBzaG9ydGN1dHM/OiBJU2hvcnRjdXRbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU2hvcnRjdXQge1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgcm91dGU6IGFueVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUaWxlIGV4dGVuZHMgSVNpbG8ge1xuICAgIGJ1dHRvbj86IElTaG9ydGN1dDtcbiAgICBpZDogc3RyaW5nO1xuICAgIHNlY3Rpb25zPzogSVNlY3Rpb25bXTtcbn1cblxuZnVuY3Rpb24gZnJvbVNpbG8oaW5pdGlhbDogSVRpbGUsIHNpbG86IElTaWxvKTogSVRpbGUge1xuICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oe30sIGluaXRpYWwpO1xuICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LCBzaWxvKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY2xhc3MgV2VsY29tZVNlcnZpY2Uge1xuICAgIC8vIHByaXZhdGUgU0FNUExFX1NFVFVQX0FSR1MgPSB7XG4gICAgLy8gICAgdGl0bGU6IFRFWFQuU0lMTy5TQU1QTEVfU0VUVVAsXG4gICAgLy8gICAgcm91dGU6IFJPVVRFLldFTENPTUUsXG4gICAgLy8gICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjAyLCAyMTksIDY4LCAuOClcIixcbiAgICAvLyAgICBpY29uOiBcImltYWdlcy9jYWxjdWxhdG9yLWljb24uc3ZnXCJcbiAgICAvLyAgICAvKlxuICAgIC8vICAgICBidXR0b246IHtsYWJlbDogXCJOZXcgQ2FsY3VsYXRpb25cIiwgcm91dGU6IFwicGFnZS9uZXctY2FsY1wifSxcbiAgICAvLyAgICAgc2VjdGlvbnM6IFt7XG4gICAgLy8gICAgICAgICB0aXRsZTogXCJSZWNlbnRcIixcbiAgICAvLyAgICAgICAgIHNob3J0Y3V0czogW1xuICAgIC8vICAgICAgICAgICAgIHtsYWJlbDogXCJIMU5hIFNhbXBsZSAyXCIsIHJvdXRlOiBcInBhZ2UvMTIzNFwifSxcbiAgICAvLyAgICAgICAgICAgICB7bGFiZWw6IFwiSDFOYSBTYW1wbGUgMUFcIiwgcm91dGU6IFwicGFnZS8yNDU2XCJ9LFxuICAgIC8vICAgICAgICAgICAgIHtsYWJlbDogXCJIMU5hIFNhbXBsZSAxQlwiLCByb3V0ZTogXCJwYWdlLzkyMTNcIn1cbiAgICAvLyAgICAgICAgIF1cbiAgICAvLyAgICAgfV1cbiAgICAvLyAgICAgKi9cbiAgICAvLyB9O1xuICAgIC8vXG4gICAgLy8gcHJpdmF0ZSBSVU5fREVTSUdOX0FSR1MgPSB7XG4gICAgLy8gICAgdGl0bGU6IFRFWFQuU0lMTy5SVU5fREVTSUdOLFxuICAgIC8vICAgIHJvdXRlOiBST1VURS5XRUxDT01FLFxuICAgIC8vICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDEwMywgMTkzLCAxNDAsIC44KVwiLFxuICAgIC8vICAgIGljb246IFwiaW1hZ2VzL2RyYWZ0aW5nLWljb24uc3ZnXCJcbiAgICAvLyAgICAvKlxuICAgIC8vICAgICBidXR0b246IHtsYWJlbDogXCJOZXcgUnVuIERlc2lnblwiLCByb3V0ZTogXCJwYWdlL25ldy1ydW5cIn0sXG4gICAgLy8gICAgIHNlY3Rpb25zOiBbe1xuICAgIC8vICAgICAgICAgdGl0bGU6IFwiUmVjZW50XCIsXG4gICAgLy8gICAgICAgICBzaG9ydGN1dHM6IFtcbiAgICAvLyAgICAgICAgICAgICB7bGFiZWw6ICdIMU4xIFJ1biBCIHNlbnQgdG8gXCJQZWFib2R5XCInLCByb3V0ZTogXCJwYWdlLzEyMzRcIn0sXG4gICAgLy8gICAgICAgICAgICAge2xhYmVsOiAnSDFOMSBSdW4gQyBzZW50IHRvIFwiUGVhYm9keVwiJywgcm91dGU6IFwicGFnZS8yNDU2XCJ9LFxuICAgIC8vICAgICAgICAgICAgIHtsYWJlbDogJ0gxTjEgUnVuIEQgc2VudCB0byBcIlBlYWJvZHlcIicsIHJvdXRlOiBcInBhZ2UvOTIxM1wifVxuICAgIC8vICAgICAgICAgXVxuICAgIC8vICAgICB9XVxuICAgIC8vICAgICAqL1xuICAgIC8vIH07XG4gICAgLy9cbiAgICAvLyBwcml2YXRlIFJVTl9RQ19BUkdTID0ge1xuICAgIC8vICAgIHRpdGxlOiBURVhULlNJTE8uUlVOX1FDLFxuICAgIC8vICAgIHJvdXRlOiBST1VURS5XRUxDT01FLFxuICAgIC8vICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDM1LCA1NCwgODIsIC44KVwiLFxuICAgIC8vICAgIGljb246IFwiaW1hZ2VzL3BhZ2VzLWljb24uc3ZnXCJcbiAgICAvLyAgICAvKlxuICAgIC8vICAgICBzZWN0aW9uczogW3tcbiAgICAvLyAgICAgICAgIHRpdGxlOiBcIlJ1biBpbiBwcm9ncmVzc1wiLFxuICAgIC8vICAgICAgICAgc2hvcnRjdXRzOiBbXG4gICAgLy8gICAgICAgICAgICAge2xhYmVsOiAnSDFOMSBSdW4gQiBzZXF1ZW5jaW5nIG9uIFwiUGVhdFwiJywgcm91dGU6IFwicC8xMjM0XCJ9LFxuICAgIC8vICAgICAgICAgICAgIHtsYWJlbDogJ0h1UmVmIFJ1biAzNyBzZXF1ZW5jaW5nIG9uIFwiUGVhdFwiJywgcm91dGU6IFwicC82XCJ9LFxuICAgIC8vICAgICAgICAgICAgIHtsYWJlbDogJ0gxTjEgUnVuIEEgc2VxdWVuY2luZyBvbiBcIlBlYXRcIicsIHJvdXRlOiBcInAvOTIxM1wifVxuICAgIC8vICAgICAgICAgXVxuICAgIC8vICAgICAgICAgfSwge1xuICAgIC8vICAgICAgICAgdGl0bGU6IFwiUmVjZW50XCIsXG4gICAgLy8gICAgICAgICBzaG9ydGN1dHM6IFtcbiAgICAvLyAgICAgICAgICAgICB7bGFiZWw6IFwiSDFOYSBTYW1wbGUgMlwiLCByb3V0ZTogXCJwYWdlLzEyMzRcIn0sXG4gICAgLy8gICAgICAgICAgICAge2xhYmVsOiBcIkgxTmEgU2FtcGxlIDFBXCIsIHJvdXRlOiBcInBhZ2UvMjQ1NlwifSxcbiAgICAvLyAgICAgICAgICAgICB7bGFiZWw6IFwiSDFOYSBTYW1wbGUgMUJcIiwgcm91dGU6IFwicGFnZS85MjEzXCJ9XG4gICAgLy8gICAgICAgICBdXG4gICAgLy8gICAgIH1dXG4gICAgLy8gICAgICovXG4gICAgLy8gfTtcbiAgICAvL1xuICAgIC8vIHByaXZhdGUgREFUQV9NQU5BR0VNRU5UX0FSR1MgPSB7XG4gICAgLy8gICAgdGl0bGU6IFRFWFQuU0lMTy5EQVRBX01BTkFHRU1FTlQsXG4gICAgLy8gICAgcm91dGU6IFJPVVRFLldFTENPTUUsXG4gICAgLy8gICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoODUsIDQ5LCAxMTgsIC44KVwiLFxuICAgIC8vICAgIGljb246IFwiaW1hZ2VzL2ZvbGRlci1pY29uLnN2Z1wiXG4gICAgLy8gICAgLypcbiAgICAvLyAgICAgYnV0dG9uOiB7bGFiZWw6IFwiTmV3IERhdGEgU2V0XCIsIHJvdXRlOiBcInBhZ2UvbmV3LWRzXCJ9LFxuICAgIC8vICAgICBzZWN0aW9uczogW3tcbiAgICAvLyAgICAgICAgIHRpdGxlOiBcIlJlY2VudFwiLFxuICAgIC8vICAgICAgICAgc2hvcnRjdXRzOiBbXG4gICAgLy8gICAgICAgICAgICAge2xhYmVsOiAnSDFOMSBSdW4gQiBzZW50IHRvIFwiUGVhYm9keVwiJywgcm91dGU6IFwicGFnZS8xMjM0XCJ9LFxuICAgIC8vICAgICAgICAgICAgIHtsYWJlbDogJ0gxTjEgUnVuIEMgc2VudCB0byBcIlBlYWJvZHlcIicsIHJvdXRlOiBcInBhZ2UvMjQ1NlwifSxcbiAgICAvLyAgICAgICAgICAgICB7bGFiZWw6ICdIMU4xIFJ1biBEIHNlbnQgdG8gXCJQZWFib2R5XCInLCByb3V0ZTogXCJwYWdlLzkyMTNcIn1cbiAgICAvLyAgICAgICAgIF1cbiAgICAvLyAgICAgfV1cbiAgICAvLyAgICAgKi9cbiAgICAvLyB9O1xuICAgIC8vIHByaXZhdGUgREFUQV9BTkFMWVNJU19BUkdTID0ge1xuICAgIC8vICAgIHRpdGxlOiBURVhULlNJTE8uREFUQV9BTkFMWVNJUyxcbiAgICAvLyAgICByb3V0ZTogUk9VVEUuREFUQV9BTkFMWVNJUyxcbiAgICAvLyAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLCAxNDIsIDE4NSwgLjgpXCIsXG4gICAgLy8gICAgaWNvbjogXCJpbWFnZXMvY2hhcnQtaWNvbi5zdmdcIixcbiAgICAvLyAgICBidXR0b246IHtcbiAgICAvLyAgICAgICAgbGFiZWw6IFwiTmV3IERhdGEgU2V0XCIsXG4gICAgLy8gICAgICAgIHJvdXRlOiBST1VURS5EQVRBX0FOQUxZU0lTXG4gICAgLy8gICAgfVxuICAgIC8vICAgIC8qXG4gICAgLy8gICAgIHNlY3Rpb25zOiBbe1xuICAgIC8vICAgICAgICAgdGl0bGU6IFwiUmVjZW50XCIsXG4gICAgLy8gICAgICAgICBzaG9ydGN1dHM6IFtcbiAgICAvLyAgICAgICAgICAgICB7bGFiZWw6IFwiU2V0IEFCQyBvbiBEZWMgMTksIDIwMTRcIiwgcm91dGU6IFwicGFnZS8xMjM0XCJ9LFxuICAgIC8vICAgICAgICAgICAgIHtsYWJlbDogXCJTZXQgREVGIG9uIERlYyAxOSwgMjAxNFwiLCByb3V0ZTogXCJwYWdlLzI0NTZcIn0sXG4gICAgLy8gICAgICAgICBdXG4gICAgLy8gICAgIH1dXG4gICAgLy8gICAgICovXG4gICAgLy8gfTtcblxuICAgIC8vIFRPRE86IGJmb3JiZXMoMjAxNi0wMS0xMikgR2VuZXJhdGUgc2VjdGlvbnMgZnJvbSBzZXJ2ZXIgcmVzcG9uc2VzXG4gICAgcHVibGljIHRpbGVzOiBJVGlsZVtdID0gW1xuICAgICAgICBmcm9tU2lsbyh7IGlkOiBcIndlbGNvbWVcIiB9LCBTSUxPLldFTENPTUUpLFxuICAgICAgICBmcm9tU2lsbyhcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJzYW1wbGUtc2V0dXBcIixcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZWN0aW9uczogW3tcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIC8vIHNlY3Rpb25zOiBbe1xuICAgICAgICAgICAgICAgIC8vICAgICB0aXRsZTogXCJSZWNlbnRcIixcbiAgICAgICAgICAgICAgICAvLyAgICAgc2hvcnRjdXRzOiBbe1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGFiZWw6IFwiSDFOYSBTYW1wbGUgMlwiLFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcm91dGU6IFtcIlNhbXBsZVNldHVwXCJdXG4gICAgICAgICAgICAgICAgLy8gICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxhYmVsOiBcIkgxTmEgU2FtcGxlIDFBXCIsXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICByb3V0ZTogW1wiU2FtcGxlU2V0dXBcIl1cbiAgICAgICAgICAgICAgICAvLyAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGFiZWw6IFwiSDFOYSBTYW1wbGUgMUJcIixcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJvdXRlOiBbXCJTYW1wbGVTZXR1cFwiXVxuICAgICAgICAgICAgICAgIC8vICAgICB9XVxuICAgICAgICAgICAgICAgIC8vIH1dLFxuICAgICAgICAgICAgICAgIC8vIGJ1dHRvbjoge1xuICAgICAgICAgICAgICAgIC8vICAgIGxhYmVsOiBcIk5ldyBDYWxjdWxhdGlvblwiLFxuICAgICAgICAgICAgICAgIC8vICAgIHJvdXRlOiBbXCJTYW1wbGVTZXR1cFwiLCBcIk5ld0JpbmRpbmdDYWxjdWxhdGlvblwiXVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBTSUxPLlNBTVBMRV9TRVRVUFxuICAgICAgICApLFxuICAgICAgICBmcm9tU2lsbyhcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJydW4tZGVzaWduXCIsXG4gICAgICAgICAgICAgICAgc2VjdGlvbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgYnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmV3IFJ1biBEZXNpZ25cIixcbiAgICAgICAgICAgICAgICAgICByb3V0ZTogW1wiUnVuRGVzaWduXCIsIFwiTmV3UnVuXCJdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFNJTE8uUlVOX0RFU0lHTlxuICAgICAgICApLFxuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbiAgICAgICAgZnJvbVNpbG8oXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicnVuLXFjXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBTSUxPLlJVTl9RQ1xuICAgICAgICApLFxuICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuICAgICAgICBmcm9tU2lsbyhcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkYXRhLW1hbmFnZW1lbnRcIixcbiAgICAgICAgICAgICAgICBzZWN0aW9uczogW3tcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCJcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICBidXR0b246IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmV3IERhdGEgU2V0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJvdXRlOiBbIFwiRGF0YU1hbmFnZW1lbnRcIiwgXCJTZWxlY3REYXRhc2V0c1wiIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgU0lMTy5EQVRBX01BTkFHRU1FTlRcbiAgICAgICAgKSxcbiAgICAgICAgZnJvbVNpbG8oXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZGF0YS1hbmFseXNpc1wiLFxuICAgICAgICAgICAgICAgIHNlY3Rpb25zOiBbe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJcIlxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIGJ1dHRvbjoge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOZXcgQW5hbHlzaXNcIixcbiAgICAgICAgICAgICAgICAgICAgcm91dGU6IFtcIkFuYWx5c2lzXCIsIFwiU2VsZWN0RGF0YVwiXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBTSUxPLkRBVEFfQU5BTFlTSVNcbiAgICAgICAgKVxuICAgIF07XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=