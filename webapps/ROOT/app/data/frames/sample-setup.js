"use strict";
var frame_1 = require("../frames/frame");
var api_1 = require("../io/api");
exports.SAMPLE_SETUP_FRAME = new frame_1.Frame({
    // TODO: Fix API endpoint -- currently a dummy one
    endpoint: api_1.API.nRunQCs,
    properties: {
        name: {
            title: "Sample Name",
            description: "Name assigned to the sample",
            type: "string",
            idField: "id"
        },
        id: {
            title: "UUID",
            description: "Unique UUID for the binding calculation",
            type: "string"
        },
        createdAt: {
            title: "Date Created",
            description: "Date & time at which the binding calculation was created",
            type: "string",
            format: "date-time"
        },
        createdBy: {
            title: "Created By",
            description: "Creator of the binding calculation",
            type: "string"
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL2ZyYW1lcy9zYW1wbGUtc2V0dXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNCQUFvQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3RDLG9CQUFrQixXQUFXLENBQUMsQ0FBQTtBQUVqQiwwQkFBa0IsR0FBRyxJQUFJLGFBQUssQ0FBQztJQUN4QyxrREFBa0Q7SUFDbEQsUUFBUSxFQUFFLFNBQUcsQ0FBQyxPQUFPO0lBRXJCLFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRTtZQUNGLEtBQUssRUFBRSxhQUFhO1lBQ3BCLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsSUFBSTtTQUNoQjtRQUNELEVBQUUsRUFBRTtZQUNBLEtBQUssRUFBRSxNQUFNO1lBQ2IsV0FBVyxFQUFFLHlDQUF5QztZQUN0RCxJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELFNBQVMsRUFBRTtZQUNQLEtBQUssRUFBRSxjQUFjO1lBQ3JCLFdBQVcsRUFBRSwwREFBMEQ7WUFDdkUsSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNLEVBQUUsV0FBVztTQUN0QjtRQUNELFNBQVMsRUFBRTtZQUNQLEtBQUssRUFBRSxZQUFZO1lBQ25CLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsSUFBSSxFQUFFLFFBQVE7U0FDakI7S0FDSjtDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJhcHAvZGF0YS9mcmFtZXMvc2FtcGxlLXNldHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGcmFtZX0gZnJvbSBcIi4uL2ZyYW1lcy9mcmFtZVwiO1xuaW1wb3J0IHtBUEl9IGZyb20gXCIuLi9pby9hcGlcIjtcblxuZXhwb3J0IGNvbnN0IFNBTVBMRV9TRVRVUF9GUkFNRSA9IG5ldyBGcmFtZSh7XG4gICAgLy8gVE9ETzogRml4IEFQSSBlbmRwb2ludCAtLSBjdXJyZW50bHkgYSBkdW1teSBvbmVcbiAgICBlbmRwb2ludDogQVBJLm5SdW5RQ3MsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlNhbXBsZSBOYW1lXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOYW1lIGFzc2lnbmVkIHRvIHRoZSBzYW1wbGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBpZEZpZWxkOiBcImlkXCJcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlVVSURcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlVuaXF1ZSBVVUlEIGZvciB0aGUgYmluZGluZyBjYWxjdWxhdGlvblwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVkQXQ6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRhdGUgQ3JlYXRlZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGF0ZSAmIHRpbWUgYXQgd2hpY2ggdGhlIGJpbmRpbmcgY2FsY3VsYXRpb24gd2FzIGNyZWF0ZWRcIixcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBmb3JtYXQ6IFwiZGF0ZS10aW1lXCJcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlZEJ5OiB7XG4gICAgICAgICAgICB0aXRsZTogXCJDcmVhdGVkIEJ5XCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDcmVhdG9yIG9mIHRoZSBiaW5kaW5nIGNhbGN1bGF0aW9uXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==