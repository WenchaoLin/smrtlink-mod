"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var http_1 = require("../../services/http");
var __data = {
    "/": {
        "fullpath": "/",
        "folders": [
            {
                "fullpath": "/pbi",
                "folders": [],
                "files": [],
                "lazyLoaded": true
            }
        ],
        "files": [],
        "lazyLoaded": true
    },
    "/pbi": {
        "fullpath": "/pbi",
        "folders": [
            {
                "fullpath": "/pbi/collections",
                "folders": [],
                "files": [],
                "lazyLoaded": true
            }
        ],
        "files": [
            {
                "fullpath": "/pbi/file1.xml",
                "name": "file1.xml",
                "size": 2048,
                "sizeReadable": "2 KB",
                "mimeType": "text/xml"
            },
            {
                "fullpath": "/pbi/file2.xml",
                "name": "file2.xml",
                "size": 1024,
                "sizeReadable": "1 KB",
                "mimeType": "text/xml"
            },
            {
                "fullpath": "/pbi/file3.xml",
                "name": "file3.xml",
                "size": 512,
                "sizeReadable": "512 B",
                "mimeType": "text/xml"
            }
        ],
        "lazyLoaded": true
    },
    "/pbi/collections": {
        "fullpath": "/pbi/collections",
        "folders": [
            {
                "fullpath": "/pbi/collections/03.25.2016",
                "folders": [],
                "files": [],
                "lazyLoaded": true
            }
        ],
        "files": [],
        "lazyLoaded": true
    }
};
var LS = (function () {
    function LS(http) {
        this.http = http;
    }
    LS.prototype.get = function (path, lazyLoad) {
        if (lazyLoad === void 0) { lazyLoad = true; }
        var headers = {};
        var token = localStorage.getItem("token");
        if (token && localStorage.getItem("user")) {
            headers["Authorization"] = "Bearer " + token;
        }
        return this.http.doGet("api://smrt-link/smrt-base/files" + path, headers);
    };
    LS = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LS);
    return LS;
}());
exports.LS = LS;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvc2VydmljZXMvbHMtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBR3pDLHFCQUFtQixxQkFBcUIsQ0FBQyxDQUFBO0FBSXpDLElBQU0sTUFBTSxHQUFHO0lBQ1gsR0FBRyxFQUFFO1FBQ0QsVUFBVSxFQUFFLEdBQUc7UUFDZixTQUFTLEVBQUU7WUFDUDtnQkFDSSxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsU0FBUyxFQUFFLEVBQ1Y7Z0JBQ0QsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsWUFBWSxFQUFFLElBQUk7YUFDckI7U0FDSjtRQUNELE9BQU8sRUFBRSxFQUNSO1FBQ0QsWUFBWSxFQUFFLElBQUk7S0FDckI7SUFDRCxNQUFNLEVBQUU7UUFDSixVQUFVLEVBQUUsTUFBTTtRQUNsQixTQUFTLEVBQUU7WUFDUDtnQkFDSSxVQUFVLEVBQUUsa0JBQWtCO2dCQUM5QixTQUFTLEVBQUUsRUFDVjtnQkFDRCxPQUFPLEVBQUUsRUFDUjtnQkFDRCxZQUFZLEVBQUUsSUFBSTthQUNyQjtTQUNKO1FBQ0QsT0FBTyxFQUFFO1lBQ0w7Z0JBQ0ksVUFBVSxFQUFFLGdCQUFnQjtnQkFDNUIsTUFBTSxFQUFFLFdBQVc7Z0JBQ25CLE1BQU0sRUFBRSxJQUFJO2dCQUNaLGNBQWMsRUFBRSxNQUFNO2dCQUN0QixVQUFVLEVBQUUsVUFBVTthQUN6QjtZQUNEO2dCQUNJLFVBQVUsRUFBRSxnQkFBZ0I7Z0JBQzVCLE1BQU0sRUFBRSxXQUFXO2dCQUNuQixNQUFNLEVBQUUsSUFBSTtnQkFDWixjQUFjLEVBQUUsTUFBTTtnQkFDdEIsVUFBVSxFQUFFLFVBQVU7YUFDekI7WUFDRDtnQkFDSSxVQUFVLEVBQUUsZ0JBQWdCO2dCQUM1QixNQUFNLEVBQUUsV0FBVztnQkFDbkIsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsY0FBYyxFQUFFLE9BQU87Z0JBQ3ZCLFVBQVUsRUFBRSxVQUFVO2FBQ3pCO1NBQ0o7UUFDRCxZQUFZLEVBQUUsSUFBSTtLQUNyQjtJQUNELGtCQUFrQixFQUFFO1FBQ2hCLFVBQVUsRUFBRSxrQkFBa0I7UUFDOUIsU0FBUyxFQUFFO1lBQ1A7Z0JBQ0ksVUFBVSxFQUFFLDZCQUE2QjtnQkFDekMsU0FBUyxFQUFFLEVBQ1Y7Z0JBQ0QsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsWUFBWSxFQUFFLElBQUk7YUFDckI7U0FDSjtRQUNELE9BQU8sRUFBRSxFQUNSO1FBQ0QsWUFBWSxFQUFFLElBQUk7S0FDckI7Q0FDSixDQUFDO0FBR0Y7SUFHSSxZQUFZLElBQVU7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVNLGdCQUFHLEdBQVYsVUFBVyxJQUFZLEVBQUUsUUFBd0I7UUFBeEIsd0JBQXdCLEdBQXhCLGVBQXdCO1FBRzdDLElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsWUFBVSxLQUFPLENBQUM7UUFDakQsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQ0FBa0MsSUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFuQkw7UUFBQyxpQkFBVSxFQUFFOztVQUFBO0lBb0JiLFNBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBbkJZLFVBQUUsS0FtQmQsQ0FBQSIsImZpbGUiOiJkYXRhL3NlcnZpY2VzL2xzLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhXG4gKlxuICogQ3JlYXRlZCBieSBTYWwgU2FuZmlsaXBwbyA8c3NhbmZpbGlwcG9AcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbT4gb24gMy8yOC8xNi5cbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5cbmltcG9ydCB7QVBJfSBmcm9tIFwiLi4vYXBpL2FwaVwiO1xuaW1wb3J0IHtIdHRwfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaHR0cFwiO1xuXG5pbXBvcnQge0ZvbGRlck1vZGVsfSBmcm9tIFwiLi4vbW9kZWxzL2xzLW1vZGVsXCI7XG5cbmNvbnN0IF9fZGF0YSA9IHtcbiAgICBcIi9cIjoge1xuICAgICAgICBcImZ1bGxwYXRoXCI6IFwiL1wiLFxuICAgICAgICBcImZvbGRlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZnVsbHBhdGhcIjogXCIvcGJpXCIsXG4gICAgICAgICAgICAgICAgXCJmb2xkZXJzXCI6IFtcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFwiZmlsZXNcIjogW1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgXCJsYXp5TG9hZGVkXCI6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJmaWxlc1wiOiBbXG4gICAgICAgIF0sXG4gICAgICAgIFwibGF6eUxvYWRlZFwiOiB0cnVlXG4gICAgfSxcbiAgICBcIi9wYmlcIjoge1xuICAgICAgICBcImZ1bGxwYXRoXCI6IFwiL3BiaVwiLFxuICAgICAgICBcImZvbGRlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZnVsbHBhdGhcIjogXCIvcGJpL2NvbGxlY3Rpb25zXCIsXG4gICAgICAgICAgICAgICAgXCJmb2xkZXJzXCI6IFtcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFwiZmlsZXNcIjogW1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgXCJsYXp5TG9hZGVkXCI6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJmaWxlc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmdWxscGF0aFwiOiBcIi9wYmkvZmlsZTEueG1sXCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiZmlsZTEueG1sXCIsXG4gICAgICAgICAgICAgICAgXCJzaXplXCI6IDIwNDgsXG4gICAgICAgICAgICAgICAgXCJzaXplUmVhZGFibGVcIjogXCIyIEtCXCIsXG4gICAgICAgICAgICAgICAgXCJtaW1lVHlwZVwiOiBcInRleHQveG1sXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmdWxscGF0aFwiOiBcIi9wYmkvZmlsZTIueG1sXCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiZmlsZTIueG1sXCIsXG4gICAgICAgICAgICAgICAgXCJzaXplXCI6IDEwMjQsXG4gICAgICAgICAgICAgICAgXCJzaXplUmVhZGFibGVcIjogXCIxIEtCXCIsXG4gICAgICAgICAgICAgICAgXCJtaW1lVHlwZVwiOiBcInRleHQveG1sXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmdWxscGF0aFwiOiBcIi9wYmkvZmlsZTMueG1sXCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiZmlsZTMueG1sXCIsXG4gICAgICAgICAgICAgICAgXCJzaXplXCI6IDUxMixcbiAgICAgICAgICAgICAgICBcInNpemVSZWFkYWJsZVwiOiBcIjUxMiBCXCIsXG4gICAgICAgICAgICAgICAgXCJtaW1lVHlwZVwiOiBcInRleHQveG1sXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJsYXp5TG9hZGVkXCI6IHRydWVcbiAgICB9LFxuICAgIFwiL3BiaS9jb2xsZWN0aW9uc1wiOiB7XG4gICAgICAgIFwiZnVsbHBhdGhcIjogXCIvcGJpL2NvbGxlY3Rpb25zXCIsXG4gICAgICAgIFwiZm9sZGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmdWxscGF0aFwiOiBcIi9wYmkvY29sbGVjdGlvbnMvMDMuMjUuMjAxNlwiLFxuICAgICAgICAgICAgICAgIFwiZm9sZGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBcImZpbGVzXCI6IFtcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFwibGF6eUxvYWRlZFwiOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiZmlsZXNcIjogW1xuICAgICAgICBdLFxuICAgICAgICBcImxhenlMb2FkZWRcIjogdHJ1ZVxuICAgIH1cbn07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMUyB7XG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwO1xuXG4gICAgY29uc3RydWN0b3IoaHR0cDogSHR0cCkge1xuICAgICAgICB0aGlzLmh0dHAgPSBodHRwO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQocGF0aDogc3RyaW5nLCBsYXp5TG9hZDogYm9vbGVhbiA9IHRydWUpOiBQcm9taXNlPEZvbGRlck1vZGVsPiB7XG4gICAgICAgIC8vIFRPRE8gKGJmb3JiZXMpKDIwMTYtMDUtMDQpOiBEdXJpbmcgcmVmYWN0b3Igb2YgYXV0aCwgdGhpcyBuZWVkc1xuICAgICAgICAvLyB0byBiZSByZW1vdmVkIG9uY2UgYXV0aCBoZWFkZXJzIGFyZSBzZW50IGFzIHBhcnQgb2YgSHR0cFxuICAgICAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKTtcblxuICAgICAgICBpZiAodG9rZW4gJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyXCIpKSB7XG4gICAgICAgICAgICBoZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kb0dldChgYXBpOi8vc21ydC1saW5rL3NtcnQtYmFzZS9maWxlcyR7cGF0aH1gLCBoZWFkZXJzKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=