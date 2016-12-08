/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
"use strict";
var frame_1 = require("../frames/frame");
var api_1 = require("../io/api");
exports.SUBREAD_FRAME = new frame_1.Frame({
    endpoint: api_1.API.aDatasetType.and({ $set_type: "subreads" }),
    processFetchedData: function (promise) {
        // TODO(bskinner)(2015-12-07): refactor this with frames/hdf-subread.ts
        // TODO(bskinner)(2015-12-07): remove once bug 30038 is fixed
        return new Promise(function (resolve, reject) {
            promise.then(function (list) { return resolve(list.filter(frame_1.autoMergeFilter)); });
            promise.catch(function (reason) { return reject(reason); });
        });
    },
    properties: {
        name: {
            title: "Name",
            description: "",
            type: "string",
            idField: "id"
        },
        cellIndex: {
            title: "Cell Index",
            description: "",
            type: "integer"
        },
        updatedAt: {
            title: "Date Updated",
            description: "",
            type: "string",
            format: "date-time"
        },
        numRecords: {
            title: "Number of Records",
            description: "",
            type: "integer"
        },
        totalLength: {
            title: "Total Length",
            description: "",
            type: "integer"
        },
        createdAt: {
            title: "Date Created",
            description: "",
            type: "string",
            format: "date-time"
        },
        id: {
            title: "Id",
            description: "",
            type: "string"
        },
        uuid: {
            title: "UUID",
            description: "",
            type: "string"
        },
        path: {
            title: "Path",
            description: "",
            type: "string"
        },
        runName: {
            title: "Run Name",
            description: "",
            type: "string"
        },
        plateId: {
            title: "Plate Id",
            description: "",
            type: "string"
        },
        instrumentName: {
            title: "Instrument Name",
            description: "",
            type: "string"
        },
        wellName: {
            title: "Well Name",
            description: "",
            type: "string"
        },
        wellSampleName: {
            title: "Well Sample Name",
            description: "",
            type: "string"
        },
        bioSampleName: {
            title: "Bio Sample Name",
            description: "",
            type: "string"
        },
        metadataContextId: {
            title: "Metadata Context Id",
            description: "",
            type: "string"
        },
        tags: {
            title: "Tags",
            description: "",
            type: "string"
        },
        projectId: {
            title: "Project Id",
            description: "",
            type: "integer"
        },
        jobId: {
            title: "Job Id",
            description: "",
            type: "integer"
        },
        version: {
            title: "Version",
            description: "",
            type: "string"
        },
        md5: {
            title: "MD5",
            description: "",
            type: "string"
        },
        userId: {
            title: "User Id",
            description: "",
            type: "integer"
        },
        comments: {
            title: "Comments",
            description: "",
            type: "string"
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL2ZyYW1lcy9zdWJyZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFFSCxzQkFBcUMsaUJBQWlCLENBQUMsQ0FBQTtBQUN2RCxvQkFBa0IsV0FBVyxDQUFDLENBQUE7QUFFakIscUJBQWEsR0FBRyxJQUFJLGFBQUssQ0FBQztJQUNuQyxRQUFRLEVBQUUsU0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFDLENBQUM7SUFDdkQsa0JBQWtCLEVBQUUsVUFBUyxPQUFPO1FBQ2hDLHVFQUF1RTtRQUN2RSw2REFBNkQ7UUFDN0QsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUFlLENBQUMsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDLENBQUM7WUFDNUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBZCxDQUFjLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUU7WUFDRixLQUFLLEVBQUUsTUFBTTtZQUNiLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsSUFBSTtTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNQLEtBQUssRUFBRSxZQUFZO1lBQ25CLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFNBQVM7U0FDbEI7UUFDRCxTQUFTLEVBQUU7WUFDUCxLQUFLLEVBQUUsY0FBYztZQUNyQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1lBQ2QsTUFBTSxFQUFFLFdBQVc7U0FDdEI7UUFDRCxVQUFVLEVBQUU7WUFDUixLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFNBQVM7U0FDbEI7UUFDRCxXQUFXLEVBQUU7WUFDVCxLQUFLLEVBQUUsY0FBYztZQUNyQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxTQUFTO1NBQ2xCO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFFLGNBQWM7WUFDckIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU0sRUFBRSxXQUFXO1NBQ3RCO1FBQ0QsRUFBRSxFQUFFO1lBQ0EsS0FBSyxFQUFFLElBQUk7WUFDWCxXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBRUQsT0FBTyxFQUFFO1lBQ0wsS0FBSyxFQUFFLFVBQVU7WUFDakIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELE9BQU8sRUFBRTtZQUNMLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxjQUFjLEVBQUU7WUFDWixLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxRQUFRLEVBQUU7WUFDTixLQUFLLEVBQUUsV0FBVztZQUNsQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsY0FBYyxFQUFFO1lBQ1osS0FBSyxFQUFFLGtCQUFrQjtZQUN6QixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsYUFBYSxFQUFFO1lBQ1gsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsaUJBQWlCLEVBQUU7WUFDZixLQUFLLEVBQUUscUJBQXFCO1lBQzVCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFFRCxJQUFJLEVBQUU7WUFDRixLQUFLLEVBQUUsTUFBTTtZQUNiLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDUCxLQUFLLEVBQUUsWUFBWTtZQUNuQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxTQUFTO1NBQ2xCO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsS0FBSyxFQUFFLFFBQVE7WUFDZixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxTQUFTO1NBQ2xCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsS0FBSyxFQUFFLFNBQVM7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELEdBQUcsRUFBRTtZQUNELEtBQUssRUFBRSxLQUFLO1lBQ1osV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELE1BQU0sRUFBRTtZQUNKLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFNBQVM7U0FDbEI7UUFDRCxRQUFRLEVBQUU7WUFDTixLQUFLLEVBQUUsVUFBVTtZQUNqQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO0tBQ0o7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoiYXBwL2RhdGEvZnJhbWVzL3N1YnJlYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge0ZyYW1lLCBhdXRvTWVyZ2VGaWx0ZXJ9IGZyb20gXCIuLi9mcmFtZXMvZnJhbWVcIjtcbmltcG9ydCB7QVBJfSBmcm9tIFwiLi4vaW8vYXBpXCI7XG5cbmV4cG9ydCBjb25zdCBTVUJSRUFEX0ZSQU1FID0gbmV3IEZyYW1lKHtcbiAgICBlbmRwb2ludDogQVBJLmFEYXRhc2V0VHlwZS5hbmQoeyRzZXRfdHlwZTogXCJzdWJyZWFkc1wifSksXG4gICAgcHJvY2Vzc0ZldGNoZWREYXRhOiBmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgICAgIC8vIFRPRE8oYnNraW5uZXIpKDIwMTUtMTItMDcpOiByZWZhY3RvciB0aGlzIHdpdGggZnJhbWVzL2hkZi1zdWJyZWFkLnRzXG4gICAgICAgIC8vIFRPRE8oYnNraW5uZXIpKDIwMTUtMTItMDcpOiByZW1vdmUgb25jZSBidWcgMzAwMzggaXMgZml4ZWRcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihsaXN0ID0+IHJlc29sdmUobGlzdC5maWx0ZXIoYXV0b01lcmdlRmlsdGVyKSkpO1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChyZWFzb24gPT4gcmVqZWN0KHJlYXNvbikpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgdGl0bGU6IFwiTmFtZVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgaWRGaWVsZDogXCJpZFwiXG4gICAgICAgIH0sXG4gICAgICAgIGNlbGxJbmRleDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiQ2VsbCBJbmRleFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcImludGVnZXJcIlxuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVkQXQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRhdGUgVXBkYXRlZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgZm9ybWF0OiBcImRhdGUtdGltZVwiXG4gICAgICAgIH0sXG4gICAgICAgIG51bVJlY29yZHM6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk51bWJlciBvZiBSZWNvcmRzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW50ZWdlclwiXG4gICAgICAgIH0sXG4gICAgICAgIHRvdGFsTGVuZ3RoOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJUb3RhbCBMZW5ndGhcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbnRlZ2VyXCJcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlZEF0OiB7XG4gICAgICAgICAgICB0aXRsZTogXCJEYXRlIENyZWF0ZWRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIGZvcm1hdDogXCJkYXRlLXRpbWVcIlxuICAgICAgICB9LFxuICAgICAgICBpZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiSWRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICB1dWlkOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJVVUlEXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgcGF0aDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiUGF0aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG5cbiAgICAgICAgcnVuTmFtZToge1xuICAgICAgICAgICAgdGl0bGU6IFwiUnVuIE5hbWVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwbGF0ZUlkOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJQbGF0ZSBJZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIGluc3RydW1lbnROYW1lOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJJbnN0cnVtZW50IE5hbWVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICB3ZWxsTmFtZToge1xuICAgICAgICAgICAgdGl0bGU6IFwiV2VsbCBOYW1lXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgd2VsbFNhbXBsZU5hbWU6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIldlbGwgU2FtcGxlIE5hbWVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBiaW9TYW1wbGVOYW1lOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJCaW8gU2FtcGxlIE5hbWVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBtZXRhZGF0YUNvbnRleHRJZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiTWV0YWRhdGEgQ29udGV4dCBJZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG5cbiAgICAgICAgdGFnczoge1xuICAgICAgICAgICAgdGl0bGU6IFwiVGFnc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHByb2plY3RJZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiUHJvamVjdCBJZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcImludGVnZXJcIlxuICAgICAgICB9LFxuICAgICAgICBqb2JJZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiSm9iIElkXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW50ZWdlclwiXG4gICAgICAgIH0sXG4gICAgICAgIHZlcnNpb246IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlZlcnNpb25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBtZDU6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk1ENVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHVzZXJJZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiVXNlciBJZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcImludGVnZXJcIlxuICAgICAgICB9LFxuICAgICAgICBjb21tZW50czoge1xuICAgICAgICAgICAgdGl0bGU6IFwiQ29tbWVudHNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9XG4gICAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=