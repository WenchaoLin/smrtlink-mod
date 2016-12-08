/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
"use strict";
var frame_1 = require("../frames/frame");
var api_1 = require("../io/api");
exports.PRESET_FRAME = new frame_1.Frame({
    endpoint: api_1.API.nPresets,
    properties: {
        id: {
            title: "Id",
            description: "",
            type: "string"
        },
        name: {
            title: "Name",
            description: "",
            type: "string",
            idField: "id"
        },
        title: {
            title: "Title",
            description: "",
            type: "string"
        },
        templateId: {
            title: "Pipeline",
            description: "",
            type: "string"
        },
        options: {
            title: "Pipeline Options",
            description: "Workflow Level Options",
            type: "array"
        },
        taskOptions: {
            title: "Task Options",
            description: "Task Options",
            type: "array"
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL2ZyYW1lcy9wcmVzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILHNCQUFvQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3RDLG9CQUFrQixXQUFXLENBQUMsQ0FBQTtBQUVqQixvQkFBWSxHQUFHLElBQUksYUFBSyxDQUFDO0lBQ2xDLFFBQVEsRUFBRSxTQUFHLENBQUMsUUFBUTtJQUN0QixVQUFVLEVBQUU7UUFDUixFQUFFLEVBQUU7WUFDQSxLQUFLLEVBQUUsSUFBSTtZQUNYLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDRixLQUFLLEVBQUUsTUFBTTtZQUNiLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsSUFBSTtTQUNoQjtRQUNELEtBQUssRUFBRTtZQUNILEtBQUssRUFBRSxPQUFPO1lBQ2QsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELFVBQVUsRUFBRTtZQUNSLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxPQUFPLEVBQUU7WUFDTCxLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsSUFBSSxFQUFFLE9BQU87U0FDaEI7UUFDRCxXQUFXLEVBQUU7WUFDVCxLQUFLLEVBQUUsY0FBYztZQUNyQixXQUFXLEVBQUUsY0FBYztZQUMzQixJQUFJLEVBQUUsT0FBTztTQUNoQjtLQUNKO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6ImFwcC9kYXRhL2ZyYW1lcy9wcmVzZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge0ZyYW1lfSBmcm9tIFwiLi4vZnJhbWVzL2ZyYW1lXCI7XG5pbXBvcnQge0FQSX0gZnJvbSBcIi4uL2lvL2FwaVwiO1xuXG5leHBvcnQgY29uc3QgUFJFU0VUX0ZSQU1FID0gbmV3IEZyYW1lKHtcbiAgICBlbmRwb2ludDogQVBJLm5QcmVzZXRzLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIklkXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgdGl0bGU6IFwiTmFtZVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgaWRGaWVsZDogXCJpZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJUaXRsZVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlSWQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlBpcGVsaW5lXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgdGl0bGU6IFwiUGlwZWxpbmUgT3B0aW9uc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiV29ya2Zsb3cgTGV2ZWwgT3B0aW9uc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJhcnJheVwiXG4gICAgICAgIH0sXG4gICAgICAgIHRhc2tPcHRpb25zOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJUYXNrIE9wdGlvbnNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRhc2sgT3B0aW9uc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJhcnJheVwiXG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==