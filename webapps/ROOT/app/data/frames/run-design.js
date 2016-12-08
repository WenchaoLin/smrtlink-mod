/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
"use strict";
var frame_1 = require("../frames/frame");
var api_1 = require("../io/api");
exports.RUN_DESIGN_FRAME = new frame_1.Frame({
    endpoint: api_1.API.nRunDesigns,
    properties: {
        name: {
            title: "Name",
            description: "Name assigned to the run",
            type: "string",
            idField: "uniqueId"
        },
        uniqueId: {
            title: "UUID",
            description: "Unique id number for the run",
            type: "string"
        },
        runSummary: {
            title: "Summary",
            description: "Summary description of the run",
            type: "string"
        },
        createdAt: {
            title: "Date Created",
            description: "Date & time at which the run was created",
            type: "string",
            format: "date-time"
        },
        createdBy: {
            title: "Created By",
            description: "Creator of the run",
            type: "string"
        },
        reserved: {
            title: "Reserved",
            description: "Flag indicating the run has been reserved for use on an instrument",
            type: "boolean"
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL2ZyYW1lcy9ydW4tZGVzaWduLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFFSCxzQkFBb0IsaUJBQWlCLENBQUMsQ0FBQTtBQUN0QyxvQkFBa0IsV0FBVyxDQUFDLENBQUE7QUFFakIsd0JBQWdCLEdBQUcsSUFBSSxhQUFLLENBQUM7SUFDdEMsUUFBUSxFQUFFLFNBQUcsQ0FBQyxXQUFXO0lBQ3pCLFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRTtZQUNGLEtBQUssRUFBRSxNQUFNO1lBQ2IsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSxVQUFVO1NBQ3RCO1FBQ0QsUUFBUSxFQUFFO1lBQ04sS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsVUFBVSxFQUFFO1lBQ1IsS0FBSyxFQUFFLFNBQVM7WUFDaEIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELFNBQVMsRUFBRTtZQUNQLEtBQUssRUFBRSxjQUFjO1lBQ3JCLFdBQVcsRUFBRSwwQ0FBMEM7WUFDdkQsSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNLEVBQUUsV0FBVztTQUN0QjtRQUNELFNBQVMsRUFBRTtZQUNQLEtBQUssRUFBRSxZQUFZO1lBQ25CLFdBQVcsRUFBRSxvQkFBb0I7WUFDakMsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxRQUFRLEVBQUU7WUFDTixLQUFLLEVBQUUsVUFBVTtZQUNqQixXQUFXLEVBQUUsb0VBQW9FO1lBQ2pGLElBQUksRUFBRSxTQUFTO1NBQ2xCO0tBQ0o7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoiYXBwL2RhdGEvZnJhbWVzL3J1bi1kZXNpZ24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge0ZyYW1lfSBmcm9tIFwiLi4vZnJhbWVzL2ZyYW1lXCI7XG5pbXBvcnQge0FQSX0gZnJvbSBcIi4uL2lvL2FwaVwiO1xuXG5leHBvcnQgY29uc3QgUlVOX0RFU0lHTl9GUkFNRSA9IG5ldyBGcmFtZSh7XG4gICAgZW5kcG9pbnQ6IEFQSS5uUnVuRGVzaWducyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk5hbWVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk5hbWUgYXNzaWduZWQgdG8gdGhlIHJ1blwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIGlkRmllbGQ6IFwidW5pcXVlSWRcIlxuICAgICAgICB9LFxuICAgICAgICB1bmlxdWVJZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwiVVVJRFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVW5pcXVlIGlkIG51bWJlciBmb3IgdGhlIHJ1blwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBydW5TdW1tYXJ5OiB7XG4gICAgICAgICAgICB0aXRsZTogXCJTdW1tYXJ5XCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTdW1tYXJ5IGRlc2NyaXB0aW9uIG9mIHRoZSBydW5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlZEF0OiB7XG4gICAgICAgICAgICB0aXRsZTogXCJEYXRlIENyZWF0ZWRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRhdGUgJiB0aW1lIGF0IHdoaWNoIHRoZSBydW4gd2FzIGNyZWF0ZWRcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBmb3JtYXQ6IFwiZGF0ZS10aW1lXCJcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlZEJ5OiB7XG4gICAgICAgICAgICB0aXRsZTogXCJDcmVhdGVkIEJ5XCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDcmVhdG9yIG9mIHRoZSBydW5cIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgcmVzZXJ2ZWQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlJlc2VydmVkXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJGbGFnIGluZGljYXRpbmcgdGhlIHJ1biBoYXMgYmVlbiByZXNlcnZlZCBmb3IgdXNlIG9uIGFuIGluc3RydW1lbnRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiYm9vbGVhblwiXG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9