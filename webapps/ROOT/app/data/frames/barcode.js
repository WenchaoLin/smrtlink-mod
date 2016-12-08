/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
"use strict";
var frame_1 = require("../frames/frame");
var api_1 = require("../io/api");
exports.BARCODE_FRAME = new frame_1.Frame({
    endpoint: api_1.API.aDatasetType.and({ $set_type: "barcodes" }),
    properties: {
        name: {
            title: "Name",
            description: "",
            type: "string",
            idField: "id"
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL2ZyYW1lcy9iYXJjb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFFSCxzQkFBb0IsaUJBQWlCLENBQUMsQ0FBQTtBQUN0QyxvQkFBa0IsV0FBVyxDQUFDLENBQUE7QUFFakIscUJBQWEsR0FBRyxJQUFJLGFBQUssQ0FBQztJQUNuQyxRQUFRLEVBQUUsU0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFDLENBQUM7SUFDdkQsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFO1lBQ0YsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLElBQUk7U0FDaEI7UUFDRCxTQUFTLEVBQUU7WUFDUCxLQUFLLEVBQUUsY0FBYztZQUNyQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1lBQ2QsTUFBTSxFQUFFLFdBQVc7U0FDdEI7UUFDRCxVQUFVLEVBQUU7WUFDUixLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFNBQVM7U0FDbEI7UUFDRCxXQUFXLEVBQUU7WUFDVCxLQUFLLEVBQUUsY0FBYztZQUNyQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxTQUFTO1NBQ2xCO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFFLGNBQWM7WUFDckIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU0sRUFBRSxXQUFXO1NBQ3RCO1FBQ0QsRUFBRSxFQUFFO1lBQ0EsS0FBSyxFQUFFLElBQUk7WUFDWCxXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBRUQsSUFBSSxFQUFFO1lBQ0YsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFFLFlBQVk7WUFDbkIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNsQjtRQUNELE9BQU8sRUFBRTtZQUNMLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxHQUFHLEVBQUU7WUFDRCxLQUFLLEVBQUUsS0FBSztZQUNaLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxNQUFNLEVBQUU7WUFDSixLQUFLLEVBQUUsU0FBUztZQUNoQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxTQUFTO1NBQ2xCO1FBQ0QsUUFBUSxFQUFFO1lBQ04sS0FBSyxFQUFFLFVBQVU7WUFDakIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNqQjtLQUNKO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6ImFwcC9kYXRhL2ZyYW1lcy9iYXJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhLCBJbmMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86YnNraW5uZXJAcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbVwiPkJyaWFuIFNraW5uZXI8L2E+XG4gKi9cblxuaW1wb3J0IHtGcmFtZX0gZnJvbSBcIi4uL2ZyYW1lcy9mcmFtZVwiO1xuaW1wb3J0IHtBUEl9IGZyb20gXCIuLi9pby9hcGlcIjtcblxuZXhwb3J0IGNvbnN0IEJBUkNPREVfRlJBTUUgPSBuZXcgRnJhbWUoe1xuICAgIGVuZHBvaW50OiBBUEkuYURhdGFzZXRUeXBlLmFuZCh7JHNldF90eXBlOiBcImJhcmNvZGVzXCJ9KSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk5hbWVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIGlkRmllbGQ6IFwiaWRcIlxuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVkQXQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRhdGUgVXBkYXRlZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgZm9ybWF0OiBcImRhdGUtdGltZVwiXG4gICAgICAgIH0sXG4gICAgICAgIG51bVJlY29yZHM6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk51bWJlciBvZiBSZWNvcmRzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW50ZWdlclwiXG4gICAgICAgIH0sXG4gICAgICAgIHRvdGFsTGVuZ3RoOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJUb3RhbCBMZW5ndGhcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbnRlZ2VyXCJcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlZEF0OiB7XG4gICAgICAgICAgICB0aXRsZTogXCJEYXRlIENyZWF0ZWRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIGZvcm1hdDogXCJkYXRlLXRpbWVcIlxuICAgICAgICB9LFxuICAgICAgICBpZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiSWRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICB1dWlkOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJVVUlEXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgcGF0aDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiUGF0aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG5cbiAgICAgICAgdGFnczoge1xuICAgICAgICAgICAgdGl0bGU6IFwiVGFnc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHByb2plY3RJZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiUHJvamVjdCBJZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcImludGVnZXJcIlxuICAgICAgICB9LFxuICAgICAgICB2ZXJzaW9uOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJWZXJzaW9uXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgbWQ1OiB7XG4gICAgICAgICAgICB0aXRsZTogXCJNRDVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICB1c2VySWQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlVzZXIgSWRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbnRlZ2VyXCJcbiAgICAgICAgfSxcbiAgICAgICAgY29tbWVudHM6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkNvbW1lbnRzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9