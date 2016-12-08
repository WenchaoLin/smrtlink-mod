/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
"use strict";
var facet_1 = require("../facets/facet");
var hdf_subread_1 = require("../frames/hdf-subread");
var property_sort_1 = require("athenaeum/common/property-sort");
exports.HDF_SUBREAD_FACET = new facet_1.Facet({
    frame: hdf_subread_1.HDF_SUBREAD_FRAME,
    defaultColumns: [
        "name", "runName", "cellIndex", "numRecords", "totalLength",
        "createdAt"],
    initialSort: property_sort_1.multisort(property_sort_1.desc(property_sort_1.valueToDate("updatedAt")), property_sort_1.desc(property_sort_1.valueToDate("createdAt"))),
    additionalColumns: [
        "instrumentName", "wellName", "wellSampleName", "bioSampleName",
        "plateId", "jobId", "id", "uuid", "path", "updatedAt",
        "tags", "projectId", "version", "md5", "userId", "comments",
        "metadataContextId"],
    displayProperties: [
        "name", "runName", "cellIndex", "numRecords", "totalLength",
        "createdAt", "instrumentName", "wellName", "wellSampleName",
        "bioSampleName", "plateId", "jobId", "id", "uuid", "path", "updatedAt",
        "tags", "projectId", "version", "md5", "userId", "comments",
        "metadataContextId"]
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL2ZhY2V0cy9oZGYtc3VicmVhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsc0JBQW9CLGlCQUFpQixDQUFDLENBQUE7QUFDdEMsNEJBQWdDLHVCQUF1QixDQUFDLENBQUE7QUFDeEQsOEJBQTJDLGdDQUFnQyxDQUFDLENBQUE7QUFFL0QseUJBQWlCLEdBQUcsSUFBSSxhQUFLLENBQUM7SUFDdkMsS0FBSyxFQUFFLCtCQUFpQjtJQUN4QixjQUFjLEVBQUU7UUFDWixNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsYUFBYTtRQUMzRCxXQUFXLENBQUM7SUFDaEIsV0FBVyxFQUFFLHlCQUFTLENBQUMsb0JBQUksQ0FBQywyQkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsb0JBQUksQ0FBQywyQkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDdEYsaUJBQWlCLEVBQUU7UUFDZixnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZTtRQUMvRCxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVc7UUFDckQsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVO1FBQzNELG1CQUFtQixDQUFDO0lBQ3hCLGlCQUFpQixFQUFFO1FBQ2YsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGFBQWE7UUFDM0QsV0FBVyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxnQkFBZ0I7UUFDM0QsZUFBZSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVztRQUN0RSxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVU7UUFDM0QsbUJBQW1CLENBQUM7Q0FDM0IsQ0FBQyxDQUFDIiwiZmlsZSI6ImFwcC9kYXRhL2ZhY2V0cy9oZGYtc3VicmVhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTUsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYSwgSW5jLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmJza2lubmVyQHBhY2lmaWNiaW9zY2llbmNlcy5jb21cIj5CcmlhbiBTa2lubmVyPC9hPlxuICovXG5cbmltcG9ydCB7RmFjZXR9IGZyb20gXCIuLi9mYWNldHMvZmFjZXRcIjtcbmltcG9ydCB7SERGX1NVQlJFQURfRlJBTUV9IGZyb20gXCIuLi9mcmFtZXMvaGRmLXN1YnJlYWRcIjtcbmltcG9ydCB7dmFsdWVUb0RhdGUsIGRlc2MsIG11bHRpc29ydH0gZnJvbSBcImF0aGVuYWV1bS9jb21tb24vcHJvcGVydHktc29ydFwiO1xuXG5leHBvcnQgY29uc3QgSERGX1NVQlJFQURfRkFDRVQgPSBuZXcgRmFjZXQoe1xuICAgIGZyYW1lOiBIREZfU1VCUkVBRF9GUkFNRSxcbiAgICBkZWZhdWx0Q29sdW1uczogW1xuICAgICAgICBcIm5hbWVcIiwgXCJydW5OYW1lXCIsIFwiY2VsbEluZGV4XCIsIFwibnVtUmVjb3Jkc1wiLCBcInRvdGFsTGVuZ3RoXCIsXG4gICAgICAgIFwiY3JlYXRlZEF0XCJdLFxuICAgIGluaXRpYWxTb3J0OiBtdWx0aXNvcnQoZGVzYyh2YWx1ZVRvRGF0ZShcInVwZGF0ZWRBdFwiKSksIGRlc2ModmFsdWVUb0RhdGUoXCJjcmVhdGVkQXRcIikpKSxcbiAgICBhZGRpdGlvbmFsQ29sdW1uczogW1xuICAgICAgICBcImluc3RydW1lbnROYW1lXCIsIFwid2VsbE5hbWVcIiwgXCJ3ZWxsU2FtcGxlTmFtZVwiLCBcImJpb1NhbXBsZU5hbWVcIixcbiAgICAgICAgXCJwbGF0ZUlkXCIsIFwiam9iSWRcIiwgXCJpZFwiLCBcInV1aWRcIiwgXCJwYXRoXCIsIFwidXBkYXRlZEF0XCIsXG4gICAgICAgIFwidGFnc1wiLCBcInByb2plY3RJZFwiLCBcInZlcnNpb25cIiwgXCJtZDVcIiwgXCJ1c2VySWRcIiwgXCJjb21tZW50c1wiLFxuICAgICAgICBcIm1ldGFkYXRhQ29udGV4dElkXCJdLFxuICAgIGRpc3BsYXlQcm9wZXJ0aWVzOiBbXG4gICAgICAgIFwibmFtZVwiLCBcInJ1bk5hbWVcIiwgXCJjZWxsSW5kZXhcIiwgXCJudW1SZWNvcmRzXCIsIFwidG90YWxMZW5ndGhcIixcbiAgICAgICAgXCJjcmVhdGVkQXRcIiwgXCJpbnN0cnVtZW50TmFtZVwiLCBcIndlbGxOYW1lXCIsIFwid2VsbFNhbXBsZU5hbWVcIixcbiAgICAgICAgXCJiaW9TYW1wbGVOYW1lXCIsIFwicGxhdGVJZFwiLCBcImpvYklkXCIsIFwiaWRcIiwgXCJ1dWlkXCIsIFwicGF0aFwiLCBcInVwZGF0ZWRBdFwiLFxuICAgICAgICBcInRhZ3NcIiwgXCJwcm9qZWN0SWRcIiwgXCJ2ZXJzaW9uXCIsIFwibWQ1XCIsIFwidXNlcklkXCIsIFwiY29tbWVudHNcIixcbiAgICAgICAgXCJtZXRhZGF0YUNvbnRleHRJZFwiXVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=