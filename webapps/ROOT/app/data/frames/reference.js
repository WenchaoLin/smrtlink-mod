/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
"use strict";
var frame_1 = require("../frames/frame");
var api_1 = require("../io/api");
exports.REFERENCE_FRAME = new frame_1.Frame({
    endpoint: api_1.API.aDatasetType.and({ $set_type: "references" }),
    properties: {
        name: {
            title: "Name",
            description: "",
            type: "string",
            idField: "id"
        },
        organism: {
            title: "Organism",
            description: "",
            type: "string"
        },
        ploidy: {
            title: "Haploid/Diploid",
            description: "",
            type: "string"
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL2ZyYW1lcy9yZWZlcmVuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILHNCQUFvQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3RDLG9CQUFrQixXQUFXLENBQUMsQ0FBQTtBQUVqQix1QkFBZSxHQUFHLElBQUksYUFBSyxDQUFDO0lBQ3JDLFFBQVEsRUFBRSxTQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUMsQ0FBQztJQUN6RCxVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUU7WUFDRixLQUFLLEVBQUUsTUFBTTtZQUNiLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsSUFBSTtTQUNoQjtRQUNELFFBQVEsRUFBRTtZQUNOLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxNQUFNLEVBQUU7WUFDSixLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDUCxLQUFLLEVBQUUsY0FBYztZQUNyQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1lBQ2QsTUFBTSxFQUFFLFdBQVc7U0FDdEI7UUFDRCxVQUFVLEVBQUU7WUFDUixLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFNBQVM7U0FDbEI7UUFDRCxXQUFXLEVBQUU7WUFDVCxLQUFLLEVBQUUsY0FBYztZQUNyQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxTQUFTO1NBQ2xCO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFFLGNBQWM7WUFDckIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU0sRUFBRSxXQUFXO1NBQ3RCO1FBQ0QsRUFBRSxFQUFFO1lBQ0EsS0FBSyxFQUFFLElBQUk7WUFDWCxXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBRUQsSUFBSSxFQUFFO1lBQ0YsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFFLFlBQVk7WUFDbkIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNsQjtRQUNELE9BQU8sRUFBRTtZQUNMLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxHQUFHLEVBQUU7WUFDRCxLQUFLLEVBQUUsS0FBSztZQUNaLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxNQUFNLEVBQUU7WUFDSixLQUFLLEVBQUUsU0FBUztZQUNoQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxTQUFTO1NBQ2xCO1FBQ0QsUUFBUSxFQUFFO1lBQ04sS0FBSyxFQUFFLFVBQVU7WUFDakIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNqQjtLQUNKO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6ImFwcC9kYXRhL2ZyYW1lcy9yZWZlcmVuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge0ZyYW1lfSBmcm9tIFwiLi4vZnJhbWVzL2ZyYW1lXCI7XG5pbXBvcnQge0FQSX0gZnJvbSBcIi4uL2lvL2FwaVwiO1xuXG5leHBvcnQgY29uc3QgUkVGRVJFTkNFX0ZSQU1FID0gbmV3IEZyYW1lKHtcbiAgICBlbmRwb2ludDogQVBJLmFEYXRhc2V0VHlwZS5hbmQoeyRzZXRfdHlwZTogXCJyZWZlcmVuY2VzXCJ9KSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk5hbWVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIGlkRmllbGQ6IFwiaWRcIlxuICAgICAgICB9LFxuICAgICAgICBvcmdhbmlzbToge1xuICAgICAgICAgICAgdGl0bGU6IFwiT3JnYW5pc21cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwbG9pZHk6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkhhcGxvaWQvRGlwbG9pZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZWRBdDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiRGF0ZSBVcGRhdGVkXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBmb3JtYXQ6IFwiZGF0ZS10aW1lXCJcbiAgICAgICAgfSxcbiAgICAgICAgbnVtUmVjb3Jkczoge1xuICAgICAgICAgICAgdGl0bGU6IFwiTnVtYmVyIG9mIFJlY29yZHNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbnRlZ2VyXCJcbiAgICAgICAgfSxcbiAgICAgICAgdG90YWxMZW5ndGg6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlRvdGFsIExlbmd0aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcImludGVnZXJcIlxuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVkQXQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRhdGUgQ3JlYXRlZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgZm9ybWF0OiBcImRhdGUtdGltZVwiXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJJZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHV1aWQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlVVSURcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwYXRoOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJQYXRoXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcblxuICAgICAgICB0YWdzOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJUYWdzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgcHJvamVjdElkOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJQcm9qZWN0IElkXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW50ZWdlclwiXG4gICAgICAgIH0sXG4gICAgICAgIHZlcnNpb246IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlZlcnNpb25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBtZDU6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk1ENVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHVzZXJJZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiVXNlciBJZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcImludGVnZXJcIlxuICAgICAgICB9LFxuICAgICAgICBjb21tZW50czoge1xuICAgICAgICAgICAgdGl0bGU6IFwiQ29tbWVudHNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9XG4gICAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=