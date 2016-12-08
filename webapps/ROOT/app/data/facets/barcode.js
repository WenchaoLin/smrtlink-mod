/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
"use strict";
var facet_1 = require("../facets/facet");
var barcode_1 = require("../frames/barcode");
var property_sort_1 = require("athenaeum/common/property-sort");
exports.BARCODE_FACET = new facet_1.Facet({
    frame: barcode_1.BARCODE_FRAME,
    defaultColumns: ["name", "updatedAt", "numRecords", "totalLength", "createdAt"],
    initialSort: property_sort_1.multisort(property_sort_1.desc(property_sort_1.valueToDate("updatedAt")), property_sort_1.desc(property_sort_1.valueToDate("createdAt"))),
    additionalColumns: [
        "id", "uuid", "path",
        "tags", "projectId", "version", "md5", "userId", "comments"],
    displayProperties: [
        "name", "updatedAt", "numRecords", "totalLength", "createdAt",
        "id", "uuid", "path",
        "tags", "projectId", "version", "md5", "userId", "comments"]
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL2ZhY2V0cy9iYXJjb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFFSCxzQkFBb0IsaUJBQWlCLENBQUMsQ0FBQTtBQUN0Qyx3QkFBNEIsbUJBQW1CLENBQUMsQ0FBQTtBQUNoRCw4QkFBMkMsZ0NBQWdDLENBQUMsQ0FBQTtBQUUvRCxxQkFBYSxHQUFHLElBQUksYUFBSyxDQUFDO0lBQ25DLEtBQUssRUFBRSx1QkFBYTtJQUNwQixjQUFjLEVBQ1YsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDO0lBQ25FLFdBQVcsRUFBRSx5QkFBUyxDQUFDLG9CQUFJLENBQUMsMkJBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLG9CQUFJLENBQUMsMkJBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLGlCQUFpQixFQUFFO1FBQ2YsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNO1FBQ3BCLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDO0lBQ2hFLGlCQUFpQixFQUFFO1FBQ2YsTUFBTSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVc7UUFDN0QsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNO1FBQ3BCLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDO0NBQ25FLENBQUMsQ0FBQyIsImZpbGUiOiJhcHAvZGF0YS9mYWNldHMvYmFyY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTUsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYSwgSW5jLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmJza2lubmVyQHBhY2lmaWNiaW9zY2llbmNlcy5jb21cIj5CcmlhbiBTa2lubmVyPC9hPlxuICovXG5cbmltcG9ydCB7RmFjZXR9IGZyb20gXCIuLi9mYWNldHMvZmFjZXRcIjtcbmltcG9ydCB7QkFSQ09ERV9GUkFNRX0gZnJvbSBcIi4uL2ZyYW1lcy9iYXJjb2RlXCI7XG5pbXBvcnQge3ZhbHVlVG9EYXRlLCBkZXNjLCBtdWx0aXNvcnR9IGZyb20gXCJhdGhlbmFldW0vY29tbW9uL3Byb3BlcnR5LXNvcnRcIjtcblxuZXhwb3J0IGNvbnN0IEJBUkNPREVfRkFDRVQgPSBuZXcgRmFjZXQoe1xuICAgIGZyYW1lOiBCQVJDT0RFX0ZSQU1FLFxuICAgIGRlZmF1bHRDb2x1bW5zOlxuICAgICAgICBbXCJuYW1lXCIsIFwidXBkYXRlZEF0XCIsIFwibnVtUmVjb3Jkc1wiLCBcInRvdGFsTGVuZ3RoXCIsIFwiY3JlYXRlZEF0XCJdLFxuICAgIGluaXRpYWxTb3J0OiBtdWx0aXNvcnQoZGVzYyh2YWx1ZVRvRGF0ZShcInVwZGF0ZWRBdFwiKSksIGRlc2ModmFsdWVUb0RhdGUoXCJjcmVhdGVkQXRcIikpKSxcbiAgICBhZGRpdGlvbmFsQ29sdW1uczogW1xuICAgICAgICBcImlkXCIsIFwidXVpZFwiLCBcInBhdGhcIixcbiAgICAgICAgXCJ0YWdzXCIsIFwicHJvamVjdElkXCIsIFwidmVyc2lvblwiLCBcIm1kNVwiLCBcInVzZXJJZFwiLCBcImNvbW1lbnRzXCJdLFxuICAgIGRpc3BsYXlQcm9wZXJ0aWVzOiBbXG4gICAgICAgIFwibmFtZVwiLCBcInVwZGF0ZWRBdFwiLCBcIm51bVJlY29yZHNcIiwgXCJ0b3RhbExlbmd0aFwiLCBcImNyZWF0ZWRBdFwiLFxuICAgICAgICBcImlkXCIsIFwidXVpZFwiLCBcInBhdGhcIixcbiAgICAgICAgXCJ0YWdzXCIsIFwicHJvamVjdElkXCIsIFwidmVyc2lvblwiLCBcIm1kNVwiLCBcInVzZXJJZFwiLCBcImNvbW1lbnRzXCJdXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==