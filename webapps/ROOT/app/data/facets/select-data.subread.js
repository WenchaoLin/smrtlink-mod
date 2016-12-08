/**
 * @copyright Copyright (c) 2016, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:dbarreto@pacificbiosciences.com">David Barreto</a>
 */
"use strict";
var facet_1 = require("../facets/facet");
var subread_1 = require("../frames/subread");
var select_data_1 = require("./select-data");
exports.SELECT_DATA_SUBREAD_FACET = new facet_1.Facet({
    frame: subread_1.SUBREAD_FRAME,
    multiSelect: true,
    initialSort: select_data_1.INITIAL_SORT,
    defaultColumns: select_data_1.DEFAULT_COLUMNS,
    additionalColumns: select_data_1.ADDITIONAL_COLUMNS
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL2ZhY2V0cy9zZWxlY3QtZGF0YS5zdWJyZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFFSCxzQkFBb0IsaUJBQWlCLENBQUMsQ0FBQTtBQUN0Qyx3QkFBNEIsbUJBQW1CLENBQUMsQ0FBQTtBQUNoRCw0QkFBZ0UsZUFBZSxDQUFDLENBQUE7QUFFbkUsaUNBQXlCLEdBQUcsSUFBSSxhQUFLLENBQUM7SUFDL0MsS0FBSyxFQUFFLHVCQUFhO0lBQ3BCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLFdBQVcsRUFBRSwwQkFBWTtJQUN6QixjQUFjLEVBQUUsNkJBQWU7SUFDL0IsaUJBQWlCLEVBQUUsZ0NBQWtCO0NBQ3hDLENBQUMsQ0FBQyIsImZpbGUiOiJhcHAvZGF0YS9mYWNldHMvc2VsZWN0LWRhdGEuc3VicmVhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTYsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYSwgSW5jLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmRiYXJyZXRvQHBhY2lmaWNiaW9zY2llbmNlcy5jb21cIj5EYXZpZCBCYXJyZXRvPC9hPlxuICovXG5cbmltcG9ydCB7RmFjZXR9IGZyb20gXCIuLi9mYWNldHMvZmFjZXRcIjtcbmltcG9ydCB7U1VCUkVBRF9GUkFNRX0gZnJvbSBcIi4uL2ZyYW1lcy9zdWJyZWFkXCI7XG5pbXBvcnQge0RFRkFVTFRfQ09MVU1OUywgQURESVRJT05BTF9DT0xVTU5TLCBJTklUSUFMX1NPUlR9IGZyb20gXCIuL3NlbGVjdC1kYXRhXCI7XG5cbmV4cG9ydCBjb25zdCBTRUxFQ1RfREFUQV9TVUJSRUFEX0ZBQ0VUID0gbmV3IEZhY2V0KHtcbiAgICBmcmFtZTogU1VCUkVBRF9GUkFNRSxcbiAgICBtdWx0aVNlbGVjdDogdHJ1ZSxcbiAgICBpbml0aWFsU29ydDogSU5JVElBTF9TT1JULFxuICAgIGRlZmF1bHRDb2x1bW5zOiBERUZBVUxUX0NPTFVNTlMsXG4gICAgYWRkaXRpb25hbENvbHVtbnM6IEFERElUSU9OQUxfQ09MVU1OU1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=