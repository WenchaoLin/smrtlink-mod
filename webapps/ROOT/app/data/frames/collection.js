/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
"use strict";
var frame_1 = require("../frames/frame");
var api_1 = require("../io/api");
exports.COLLECTION_FRAME = new frame_1.Frame({
    endpoint: api_1.API.aDatasetDetailsByInt
        .and({ $set_type: "subreads" }),
    properties: {
        sampleName: {
            title: "Sample Name",
            description: "",
            type: "string"
        },
        runName: {
            title: "Run Name",
            description: "",
            type: "string"
        },
        completedOn: {
            title: "Completed On",
            description: "",
            type: "string",
            format: "date-time"
        },
        operator: {
            title: "Operator",
            description: "",
            type: "string"
        }
    },
    processFetchedData: function (promise) {
        return new Promise(function (resolve, reject) {
            promise.then(function (result) {
                var data = [];
                var collections = result.DataSetMetadata.Collections;
                if (collections) {
                    for (var _i = 0, _a = collections.CollectionMetadata; _i < _a.length; _i++) {
                        var entry = _a[_i];
                        data.push({
                            sampleName: entry.WellSample.Name,
                            runName: entry.RunDetails.Name,
                            completedOn: "",
                            operator: ""
                        });
                    }
                }
                result = data;
                resolve(result);
            });
            promise.catch(function (reason) {
                reject(reason);
            });
        });
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL2ZyYW1lcy9jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFFSCxzQkFBb0IsaUJBQWlCLENBQUMsQ0FBQTtBQUN0QyxvQkFBa0IsV0FBVyxDQUFDLENBQUE7QUFFakIsd0JBQWdCLEdBQUcsSUFBSSxhQUFLLENBQUM7SUFDdEMsUUFBUSxFQUFFLFNBQUcsQ0FBQyxvQkFBb0I7U0FDcEIsR0FBRyxDQUFDLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDO0lBQzFDLFVBQVUsRUFBRTtRQUNSLFVBQVUsRUFBRTtZQUNSLEtBQUssRUFBRSxhQUFhO1lBQ3BCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxPQUFPLEVBQUU7WUFDTCxLQUFLLEVBQUUsVUFBVTtZQUNqQixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsV0FBVyxFQUFFO1lBQ1QsS0FBSyxFQUFFLGNBQWM7WUFDckIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU0sRUFBRSxXQUFXO1NBQ3RCO1FBQ0QsUUFBUSxFQUFFO1lBQ04sS0FBSyxFQUFFLFVBQVU7WUFDakIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNqQjtLQUNKO0lBQ0Qsa0JBQWtCLEVBQUUsVUFBUyxPQUFPO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO2dCQUNmLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDZCxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztnQkFDckQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDZCxHQUFHLENBQUMsQ0FBYyxVQUE4QixFQUE5QixLQUFBLFdBQVcsQ0FBQyxrQkFBa0IsRUFBOUIsY0FBOEIsRUFBOUIsSUFBOEIsQ0FBQzt3QkFBNUMsSUFBSSxLQUFLLFNBQUE7d0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDTixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJOzRCQUNqQyxPQUFPLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJOzRCQUM5QixXQUFXLEVBQUUsRUFBRTs0QkFDZixRQUFRLEVBQUUsRUFBRTt5QkFDZixDQUFDLENBQUM7cUJBQ047Z0JBQ0wsQ0FBQztnQkFDRCxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNkLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBQSxNQUFNO2dCQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoiYXBwL2RhdGEvZnJhbWVzL2NvbGxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE1LCBQYWNpZmljIEJpb3NjaWVuY2VzIG9mIENhbGlmb3JuaWEsIEluYy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpic2tpbm5lckBwYWNpZmljYmlvc2NpZW5jZXMuY29tXCI+QnJpYW4gU2tpbm5lcjwvYT5cbiAqL1xuXG5pbXBvcnQge0ZyYW1lfSBmcm9tIFwiLi4vZnJhbWVzL2ZyYW1lXCI7XG5pbXBvcnQge0FQSX0gZnJvbSBcIi4uL2lvL2FwaVwiO1xuXG5leHBvcnQgY29uc3QgQ09MTEVDVElPTl9GUkFNRSA9IG5ldyBGcmFtZSh7XG4gICAgZW5kcG9pbnQ6IEFQSS5hRGF0YXNldERldGFpbHNCeUludFxuICAgICAgICAgICAgICAgICAuYW5kKHskc2V0X3R5cGU6IFwic3VicmVhZHNcIn0pLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc2FtcGxlTmFtZToge1xuICAgICAgICAgICAgdGl0bGU6IFwiU2FtcGxlIE5hbWVcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBydW5OYW1lOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJSdW4gTmFtZVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlZE9uOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJDb21wbGV0ZWQgT25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIGZvcm1hdDogXCJkYXRlLXRpbWVcIlxuICAgICAgICB9LFxuICAgICAgICBvcGVyYXRvcjoge1xuICAgICAgICAgICAgdGl0bGU6IFwiT3BlcmF0b3JcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICBwcm9jZXNzRmV0Y2hlZERhdGE6IGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gW107XG4gICAgICAgICAgICAgICAgbGV0IGNvbGxlY3Rpb25zID0gcmVzdWx0LkRhdGFTZXRNZXRhZGF0YS5Db2xsZWN0aW9ucztcbiAgICAgICAgICAgICAgICBpZiAoY29sbGVjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgY29sbGVjdGlvbnMuQ29sbGVjdGlvbk1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZU5hbWU6IGVudHJ5LldlbGxTYW1wbGUuTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5OYW1lOiBlbnRyeS5SdW5EZXRhaWxzLk5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkT246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3I6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhdGE7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKHJlYXNvbiA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHJlYXNvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=