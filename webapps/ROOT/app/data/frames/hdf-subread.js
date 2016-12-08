/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
"use strict";
var frame_1 = require("../frames/frame");
var api_1 = require("../io/api");
exports.HDF_SUBREAD_FRAME = new frame_1.Frame({
    endpoint: api_1.API.aDatasetType.and({ $set_type: "hdfsubreads" }),
    processFetchedData: function (promise) {
        // TODO(bskinner)(2015-12-07): refactor this with frames/subread.ts
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL2ZyYW1lcy9oZGYtc3VicmVhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsc0JBQXFDLGlCQUFpQixDQUFDLENBQUE7QUFDdkQsb0JBQWtCLFdBQVcsQ0FBQyxDQUFBO0FBRWpCLHlCQUFpQixHQUFHLElBQUksYUFBSyxDQUFDO0lBQ3ZDLFFBQVEsRUFBRSxTQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFDLFNBQVMsRUFBRSxhQUFhLEVBQUMsQ0FBQztJQUMxRCxrQkFBa0IsRUFBRSxVQUFTLE9BQU87UUFDaEMsbUVBQW1FO1FBQ25FLDZEQUE2RDtRQUM3RCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsdUJBQWUsQ0FBQyxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQztZQUM1RCxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFkLENBQWMsQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRTtZQUNGLEtBQUssRUFBRSxNQUFNO1lBQ2IsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFFLFlBQVk7WUFDbkIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNsQjtRQUNELFNBQVMsRUFBRTtZQUNQLEtBQUssRUFBRSxjQUFjO1lBQ3JCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNLEVBQUUsV0FBVztTQUN0QjtRQUNELFVBQVUsRUFBRTtZQUNSLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNsQjtRQUNELFdBQVcsRUFBRTtZQUNULEtBQUssRUFBRSxjQUFjO1lBQ3JCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFNBQVM7U0FDbEI7UUFDRCxTQUFTLEVBQUU7WUFDUCxLQUFLLEVBQUUsY0FBYztZQUNyQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1lBQ2QsTUFBTSxFQUFFLFdBQVc7U0FDdEI7UUFDRCxFQUFFLEVBQUU7WUFDQSxLQUFLLEVBQUUsSUFBSTtZQUNYLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDRixLQUFLLEVBQUUsTUFBTTtZQUNiLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDRixLQUFLLEVBQUUsTUFBTTtZQUNiLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFFRCxPQUFPLEVBQUU7WUFDTCxLQUFLLEVBQUUsVUFBVTtZQUNqQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsS0FBSyxFQUFFLFVBQVU7WUFDakIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELGNBQWMsRUFBRTtZQUNaLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELFFBQVEsRUFBRTtZQUNOLEtBQUssRUFBRSxXQUFXO1lBQ2xCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxjQUFjLEVBQUU7WUFDWixLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxhQUFhLEVBQUU7WUFDWCxLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxpQkFBaUIsRUFBRTtZQUNmLEtBQUssRUFBRSxxQkFBcUI7WUFDNUIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUVELElBQUksRUFBRTtZQUNGLEtBQUssRUFBRSxNQUFNO1lBQ2IsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELFNBQVMsRUFBRTtZQUNQLEtBQUssRUFBRSxZQUFZO1lBQ25CLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFNBQVM7U0FDbEI7UUFDRCxLQUFLLEVBQUU7WUFDSCxLQUFLLEVBQUUsUUFBUTtZQUNmLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFNBQVM7U0FDbEI7UUFDRCxPQUFPLEVBQUU7WUFDTCxLQUFLLEVBQUUsU0FBUztZQUNoQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsS0FBSyxFQUFFLEtBQUs7WUFDWixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsTUFBTSxFQUFFO1lBQ0osS0FBSyxFQUFFLFNBQVM7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNsQjtRQUNELFFBQVEsRUFBRTtZQUNOLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7S0FDSjtDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJhcHAvZGF0YS9mcmFtZXMvaGRmLXN1YnJlYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge0ZyYW1lLCBhdXRvTWVyZ2VGaWx0ZXJ9IGZyb20gXCIuLi9mcmFtZXMvZnJhbWVcIjtcbmltcG9ydCB7QVBJfSBmcm9tIFwiLi4vaW8vYXBpXCI7XG5cbmV4cG9ydCBjb25zdCBIREZfU1VCUkVBRF9GUkFNRSA9IG5ldyBGcmFtZSh7XG4gICAgZW5kcG9pbnQ6IEFQSS5hRGF0YXNldFR5cGUuYW5kKHskc2V0X3R5cGU6IFwiaGRmc3VicmVhZHNcIn0pLFxuICAgIHByb2Nlc3NGZXRjaGVkRGF0YTogZnVuY3Rpb24ocHJvbWlzZSkge1xuICAgICAgICAvLyBUT0RPKGJza2lubmVyKSgyMDE1LTEyLTA3KTogcmVmYWN0b3IgdGhpcyB3aXRoIGZyYW1lcy9zdWJyZWFkLnRzXG4gICAgICAgIC8vIFRPRE8oYnNraW5uZXIpKDIwMTUtMTItMDcpOiByZW1vdmUgb25jZSBidWcgMzAwMzggaXMgZml4ZWRcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihsaXN0ID0+IHJlc29sdmUobGlzdC5maWx0ZXIoYXV0b01lcmdlRmlsdGVyKSkpO1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChyZWFzb24gPT4gcmVqZWN0KHJlYXNvbikpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgdGl0bGU6IFwiTmFtZVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgaWRGaWVsZDogXCJpZFwiXG4gICAgICAgIH0sXG4gICAgICAgIGNlbGxJbmRleDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiQ2VsbCBJbmRleFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcImludGVnZXJcIlxuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVkQXQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRhdGUgVXBkYXRlZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgZm9ybWF0OiBcImRhdGUtdGltZVwiXG4gICAgICAgIH0sXG4gICAgICAgIG51bVJlY29yZHM6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk51bWJlciBvZiBSZWNvcmRzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW50ZWdlclwiXG4gICAgICAgIH0sXG4gICAgICAgIHRvdGFsTGVuZ3RoOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJUb3RhbCBMZW5ndGhcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbnRlZ2VyXCJcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlZEF0OiB7XG4gICAgICAgICAgICB0aXRsZTogXCJEYXRlIENyZWF0ZWRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIGZvcm1hdDogXCJkYXRlLXRpbWVcIlxuICAgICAgICB9LFxuICAgICAgICBpZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiSWRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICB1dWlkOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJVVUlEXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgcGF0aDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiUGF0aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG5cbiAgICAgICAgcnVuTmFtZToge1xuICAgICAgICAgICAgdGl0bGU6IFwiUnVuIE5hbWVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwbGF0ZUlkOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJQbGF0ZSBJZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIGluc3RydW1lbnROYW1lOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJJbnN0cnVtZW50IE5hbWVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICB3ZWxsTmFtZToge1xuICAgICAgICAgICAgdGl0bGU6IFwiV2VsbCBOYW1lXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgd2VsbFNhbXBsZU5hbWU6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIldlbGwgU2FtcGxlIE5hbWVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBiaW9TYW1wbGVOYW1lOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJCaW8gU2FtcGxlIE5hbWVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBtZXRhZGF0YUNvbnRleHRJZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiTWV0YWRhdGEgQ29udGV4dCBJZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG5cbiAgICAgICAgdGFnczoge1xuICAgICAgICAgICAgdGl0bGU6IFwiVGFnc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHByb2plY3RJZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiUHJvamVjdCBJZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcImludGVnZXJcIlxuICAgICAgICB9LFxuICAgICAgICBqb2JJZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiSm9iIElkXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW50ZWdlclwiXG4gICAgICAgIH0sXG4gICAgICAgIHZlcnNpb246IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlZlcnNpb25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBtZDU6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk1ENVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHVzZXJJZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiVXNlciBJZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcImludGVnZXJcIlxuICAgICAgICB9LFxuICAgICAgICBjb21tZW50czoge1xuICAgICAgICAgICAgdGl0bGU6IFwiQ29tbWVudHNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9XG4gICAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=