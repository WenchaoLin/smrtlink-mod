/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
"use strict";
var frame_1 = require("../frames/frame");
var api_1 = require("../io/api");
exports.RUN_QC_FRAME = new frame_1.Frame({
    endpoint: api_1.API.nRunQCs,
    properties: {
        name: {
            title: "Name",
            description: "Name assigned to the run",
            type: "string",
            idField: "uniqueId"
        },
        runSummary: {
            title: "Summary",
            description: "Summary description of the run",
            type: "string"
        },
        startedAt: {
            title: "Run Date",
            description: "Date & time at which the run was started",
            type: "string",
            format: "date-time"
        },
        completedAt: {
            title: "Completed At",
            description: "Date & time at which the run was completed",
            type: "string",
            format: "date-time"
        },
        status: {
            title: "Status",
            description: "Status of the run",
            type: "string"
        },
        instrumentName: {
            title: "Instrument",
            description: "Name of instrument on which run was performed",
            type: "string"
        },
        instrumentSerialNumber: {
            title: "Instrument SN",
            description: "Serial number of instrument on which run was performed",
            type: "string"
        },
        instrumentSwVersion: {
            title: "Instrument SW",
            description: "Version of instrument control softwaare with which run was performed",
            type: "string"
        },
        primaryAnalysisSwVersion: {
            title: "Primary Analysis SW",
            description: "Version of Primary Analysis software with which run was performed",
            type: "string"
        },
        context: {
            title: "Run Id",
            description: "Run Id of the run",
            type: "string"
        },
        totalCells: {
            title: "Total Cells",
            description: "Total cells for the run",
            type: "number"
        },
        numCellsCompleted: {
            title: "Completed Cells",
            description: "Cells completed for the run",
            type: "number"
        },
        numCellsFailed: {
            title: "Failed Cells",
            description: "Cells failed for the run",
            type: "number"
        },
        uniqueId: {
            title: "UUID",
            description: "Unique id for the run",
            type: "string"
        },
        sortValue: {
            title: "Sort Value",
            description: "Sorting value not to be displayed",
            type: "string"
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL2ZyYW1lcy9ydW4tcWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILHNCQUFvQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3RDLG9CQUFrQixXQUFXLENBQUMsQ0FBQTtBQUVqQixvQkFBWSxHQUFHLElBQUksYUFBSyxDQUFDO0lBQ2xDLFFBQVEsRUFBRSxTQUFHLENBQUMsT0FBTztJQUNyQixVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUU7WUFDRixLQUFLLEVBQUUsTUFBTTtZQUNiLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsVUFBVTtTQUN0QjtRQUNELFVBQVUsRUFBRTtZQUNSLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDUCxLQUFLLEVBQUUsVUFBVTtZQUNqQixXQUFXLEVBQUUsMENBQTBDO1lBQ3ZELElBQUksRUFBRSxRQUFRO1lBQ2QsTUFBTSxFQUFFLFdBQVc7U0FDdEI7UUFDRCxXQUFXLEVBQUU7WUFDVCxLQUFLLEVBQUUsY0FBYztZQUNyQixXQUFXLEVBQUUsNENBQTRDO1lBQ3pELElBQUksRUFBRSxRQUFRO1lBQ2QsTUFBTSxFQUFFLFdBQVc7U0FDdEI7UUFDRCxNQUFNLEVBQUU7WUFDSixLQUFLLEVBQUUsUUFBUTtZQUNmLFdBQVcsRUFBRSxtQkFBbUI7WUFDaEMsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxjQUFjLEVBQUU7WUFDWixLQUFLLEVBQUUsWUFBWTtZQUNuQixXQUFXLEVBQUUsK0NBQStDO1lBQzVELElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0Qsc0JBQXNCLEVBQUU7WUFDcEIsS0FBSyxFQUFFLGVBQWU7WUFDdEIsV0FBVyxFQUFFLHdEQUF3RDtZQUNyRSxJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELG1CQUFtQixFQUFFO1lBQ2pCLEtBQUssRUFBRSxlQUFlO1lBQ3RCLFdBQVcsRUFBRSxzRUFBc0U7WUFDbkYsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCx3QkFBd0IsRUFBRTtZQUN0QixLQUFLLEVBQUUscUJBQXFCO1lBQzVCLFdBQVcsRUFBRSxtRUFBbUU7WUFDaEYsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxPQUFPLEVBQUU7WUFDTCxLQUFLLEVBQUUsUUFBUTtZQUNmLFdBQVcsRUFBRSxtQkFBbUI7WUFDaEMsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxVQUFVLEVBQUU7WUFDUixLQUFLLEVBQUUsYUFBYTtZQUNwQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsaUJBQWlCLEVBQUU7WUFDZixLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxjQUFjLEVBQUU7WUFDWixLQUFLLEVBQUUsY0FBYztZQUNyQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsUUFBUSxFQUFFO1lBQ04sS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFFLFlBQVk7WUFDbkIsV0FBVyxFQUFFLG1DQUFtQztZQUNoRCxJQUFJLEVBQUUsUUFBUTtTQUNqQjtLQUNKO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6ImFwcC9kYXRhL2ZyYW1lcy9ydW4tcWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge0ZyYW1lfSBmcm9tIFwiLi4vZnJhbWVzL2ZyYW1lXCI7XG5pbXBvcnQge0FQSX0gZnJvbSBcIi4uL2lvL2FwaVwiO1xuXG5leHBvcnQgY29uc3QgUlVOX1FDX0ZSQU1FID0gbmV3IEZyYW1lKHtcbiAgICBlbmRwb2ludDogQVBJLm5SdW5RQ3MsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJOYW1lXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOYW1lIGFzc2lnbmVkIHRvIHRoZSBydW5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBpZEZpZWxkOiBcInVuaXF1ZUlkXCJcbiAgICAgICAgfSxcbiAgICAgICAgcnVuU3VtbWFyeToge1xuICAgICAgICAgICAgdGl0bGU6IFwiU3VtbWFyeVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3VtbWFyeSBkZXNjcmlwdGlvbiBvZiB0aGUgcnVuXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0ZWRBdDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiUnVuIERhdGVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRhdGUgJiB0aW1lIGF0IHdoaWNoIHRoZSBydW4gd2FzIHN0YXJ0ZWRcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBmb3JtYXQ6IFwiZGF0ZS10aW1lXCJcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGVkQXQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkNvbXBsZXRlZCBBdFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGF0ZSAmIHRpbWUgYXQgd2hpY2ggdGhlIHJ1biB3YXMgY29tcGxldGVkXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgZm9ybWF0OiBcImRhdGUtdGltZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXR1czoge1xuICAgICAgICAgICAgdGl0bGU6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTdGF0dXMgb2YgdGhlIHJ1blwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBpbnN0cnVtZW50TmFtZToge1xuICAgICAgICAgICAgdGl0bGU6IFwiSW5zdHJ1bWVudFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTmFtZSBvZiBpbnN0cnVtZW50IG9uIHdoaWNoIHJ1biB3YXMgcGVyZm9ybWVkXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIGluc3RydW1lbnRTZXJpYWxOdW1iZXI6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkluc3RydW1lbnQgU05cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNlcmlhbCBudW1iZXIgb2YgaW5zdHJ1bWVudCBvbiB3aGljaCBydW4gd2FzIHBlcmZvcm1lZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBpbnN0cnVtZW50U3dWZXJzaW9uOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJJbnN0cnVtZW50IFNXXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWZXJzaW9uIG9mIGluc3RydW1lbnQgY29udHJvbCBzb2Z0d2FhcmUgd2l0aCB3aGljaCBydW4gd2FzIHBlcmZvcm1lZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwcmltYXJ5QW5hbHlzaXNTd1ZlcnNpb246IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlByaW1hcnkgQW5hbHlzaXMgU1dcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZlcnNpb24gb2YgUHJpbWFyeSBBbmFseXNpcyBzb2Z0d2FyZSB3aXRoIHdoaWNoIHJ1biB3YXMgcGVyZm9ybWVkXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlJ1biBJZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUnVuIElkIG9mIHRoZSBydW5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgdG90YWxDZWxsczoge1xuICAgICAgICAgICAgdGl0bGU6IFwiVG90YWwgQ2VsbHNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRvdGFsIGNlbGxzIGZvciB0aGUgcnVuXCIsXG4gICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiXG4gICAgICAgIH0sXG4gICAgICAgIG51bUNlbGxzQ29tcGxldGVkOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJDb21wbGV0ZWQgQ2VsbHNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNlbGxzIGNvbXBsZXRlZCBmb3IgdGhlIHJ1blwiLFxuICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIlxuICAgICAgICB9LFxuICAgICAgICBudW1DZWxsc0ZhaWxlZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiRmFpbGVkIENlbGxzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDZWxscyBmYWlsZWQgZm9yIHRoZSBydW5cIixcbiAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgdW5pcXVlSWQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlVVSURcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlVuaXF1ZSBpZCBmb3IgdGhlIHJ1blwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBzb3J0VmFsdWU6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlNvcnQgVmFsdWVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNvcnRpbmcgdmFsdWUgbm90IHRvIGJlIGRpc3BsYXllZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==