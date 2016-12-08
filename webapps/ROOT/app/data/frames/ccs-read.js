/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
"use strict";
var frame_1 = require("../frames/frame");
var api_1 = require("../io/api");
exports.CCS_READ_FRAME = new frame_1.Frame({
    endpoint: api_1.API.aDatasetType.and({ $set_type: "ccsreads" }),
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL2ZyYW1lcy9jY3MtcmVhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsc0JBQW9CLGlCQUFpQixDQUFDLENBQUE7QUFDdEMsb0JBQWtCLFdBQVcsQ0FBQyxDQUFBO0FBRWpCLHNCQUFjLEdBQUcsSUFBSSxhQUFLLENBQUM7SUFDcEMsUUFBUSxFQUFFLFNBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDO0lBQ3ZELFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRTtZQUNGLEtBQUssRUFBRSxNQUFNO1lBQ2IsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFFLGNBQWM7WUFDckIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU0sRUFBRSxXQUFXO1NBQ3RCO1FBQ0QsVUFBVSxFQUFFO1lBQ1IsS0FBSyxFQUFFLG1CQUFtQjtZQUMxQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxTQUFTO1NBQ2xCO1FBQ0QsV0FBVyxFQUFFO1lBQ1QsS0FBSyxFQUFFLGNBQWM7WUFDckIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNsQjtRQUNELFNBQVMsRUFBRTtZQUNQLEtBQUssRUFBRSxjQUFjO1lBQ3JCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNLEVBQUUsV0FBVztTQUN0QjtRQUNELEVBQUUsRUFBRTtZQUNBLEtBQUssRUFBRSxJQUFJO1lBQ1gsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELElBQUksRUFBRTtZQUNGLEtBQUssRUFBRSxNQUFNO1lBQ2IsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELElBQUksRUFBRTtZQUNGLEtBQUssRUFBRSxNQUFNO1lBQ2IsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUVELElBQUksRUFBRTtZQUNGLEtBQUssRUFBRSxNQUFNO1lBQ2IsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELFNBQVMsRUFBRTtZQUNQLEtBQUssRUFBRSxZQUFZO1lBQ25CLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFNBQVM7U0FDbEI7UUFDRCxPQUFPLEVBQUU7WUFDTCxLQUFLLEVBQUUsU0FBUztZQUNoQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsS0FBSyxFQUFFLEtBQUs7WUFDWixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsTUFBTSxFQUFFO1lBQ0osS0FBSyxFQUFFLFNBQVM7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNsQjtRQUNELFFBQVEsRUFBRTtZQUNOLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7S0FDSjtDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJhcHAvZGF0YS9mcmFtZXMvY2NzLXJlYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge0ZyYW1lfSBmcm9tIFwiLi4vZnJhbWVzL2ZyYW1lXCI7XG5pbXBvcnQge0FQSX0gZnJvbSBcIi4uL2lvL2FwaVwiO1xuXG5leHBvcnQgY29uc3QgQ0NTX1JFQURfRlJBTUUgPSBuZXcgRnJhbWUoe1xuICAgIGVuZHBvaW50OiBBUEkuYURhdGFzZXRUeXBlLmFuZCh7JHNldF90eXBlOiBcImNjc3JlYWRzXCJ9KSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk5hbWVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIGlkRmllbGQ6IFwiaWRcIlxuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVkQXQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRhdGUgVXBkYXRlZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgZm9ybWF0OiBcImRhdGUtdGltZVwiXG4gICAgICAgIH0sXG4gICAgICAgIG51bVJlY29yZHM6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk51bWJlciBvZiBSZWNvcmRzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW50ZWdlclwiXG4gICAgICAgIH0sXG4gICAgICAgIHRvdGFsTGVuZ3RoOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJUb3RhbCBMZW5ndGhcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbnRlZ2VyXCJcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlZEF0OiB7XG4gICAgICAgICAgICB0aXRsZTogXCJEYXRlIENyZWF0ZWRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIGZvcm1hdDogXCJkYXRlLXRpbWVcIlxuICAgICAgICB9LFxuICAgICAgICBpZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiSWRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICB1dWlkOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJVVUlEXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgcGF0aDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiUGF0aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG5cbiAgICAgICAgdGFnczoge1xuICAgICAgICAgICAgdGl0bGU6IFwiVGFnc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHByb2plY3RJZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiUHJvamVjdCBJZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcImludGVnZXJcIlxuICAgICAgICB9LFxuICAgICAgICB2ZXJzaW9uOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJWZXJzaW9uXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgbWQ1OiB7XG4gICAgICAgICAgICB0aXRsZTogXCJNRDVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICB1c2VySWQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlVzZXIgSWRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbnRlZ2VyXCJcbiAgICAgICAgfSxcbiAgICAgICAgY29tbWVudHM6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkNvbW1lbnRzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9