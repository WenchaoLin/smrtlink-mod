/**
 * @copyright Copyright (c) 2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
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
var io_1 = require("athenaeum/data/api/io");
var endpoint_1 = require("athenaeum/data/api/endpoint");
var Stash = (function () {
    function Stash(io) {
        this.io = io;
    }
    Stash.prototype.getAllItems = function (frame, withParams) {
        var promise = this.io.getEndpointAsync(frame.endpoint, withParams);
        // TODO(bskinner):
        if (frame.processFetchedData) {
            promise = frame.processFetchedData(promise);
        }
        return promise;
    };
    Stash.prototype.getItemById = function (frame, id) {
        // TODO(bskinner): get rid of this hack as soon as we have better
        // support for multiple endpoints
        var url = frame.endpoint.url() + "/" + id;
        return this.io.getEndpointAsync(new endpoint_1.Endpoint(url));
    };
    Stash.prototype.postToEndpoint = function (data, endpoint, withParams) {
        return this.io.postToEndpointAsync(data, endpoint, withParams);
    };
    Stash = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [io_1.IO])
    ], Stash);
    return Stash;
}());
exports.Stash = Stash;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL2lvL3N0YXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7Ozs7Ozs7Ozs7QUFFSCxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFFekMsbUJBQWlCLHVCQUF1QixDQUFDLENBQUE7QUFDekMseUJBQXVCLDZCQUE2QixDQUFDLENBQUE7QUFJckQ7SUFHSSxlQUFZLEVBQU07UUFDZCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU0sMkJBQVcsR0FBbEIsVUFBbUIsS0FBWSxFQUFFLFVBQWU7UUFDNUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ25FLGtCQUFrQjtRQUNsQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE9BQU8sR0FBRyxLQUFLLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVNLDJCQUFXLEdBQWxCLFVBQW1CLEtBQVksRUFBRSxFQUFtQjtRQUNoRCxpRUFBaUU7UUFDakUsaUNBQWlDO1FBQ2pDLElBQUksR0FBRyxHQUFNLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFNBQUksRUFBSSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksbUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFTSw4QkFBYyxHQUFyQixVQUFzQixJQUFRLEVBQUUsUUFBa0IsRUFBRSxVQUFlO1FBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQTFCTDtRQUFDLGlCQUFVLEVBQUU7O2FBQUE7SUEyQmIsWUFBQztBQUFELENBMUJBLEFBMEJDLElBQUE7QUExQlksYUFBSyxRQTBCakIsQ0FBQSIsImZpbGUiOiJhcHAvZGF0YS9pby9zdGFzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTUsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYSwgSW5jLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmJza2lubmVyQHBhY2lmaWNiaW9zY2llbmNlcy5jb21cIj5CcmlhbiBTa2lubmVyPC9hPlxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcblxuaW1wb3J0IHtJT30gZnJvbSBcImF0aGVuYWV1bS9kYXRhL2FwaS9pb1wiO1xuaW1wb3J0IHtFbmRwb2ludH0gZnJvbSBcImF0aGVuYWV1bS9kYXRhL2FwaS9lbmRwb2ludFwiO1xuaW1wb3J0IHtGcmFtZX0gZnJvbSBcIi4uL2ZyYW1lcy9mcmFtZVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3Rhc2gge1xuICAgIHByaXZhdGUgaW86IElPO1xuXG4gICAgY29uc3RydWN0b3IoaW86IElPKSB7XG4gICAgICAgIHRoaXMuaW8gPSBpbztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsSXRlbXMoZnJhbWU6IEZyYW1lLCB3aXRoUGFyYW1zPzoge30pIHtcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLmlvLmdldEVuZHBvaW50QXN5bmMoZnJhbWUuZW5kcG9pbnQsIHdpdGhQYXJhbXMpO1xuICAgICAgICAvLyBUT0RPKGJza2lubmVyKTpcbiAgICAgICAgaWYgKGZyYW1lLnByb2Nlc3NGZXRjaGVkRGF0YSkge1xuICAgICAgICAgICAgcHJvbWlzZSA9IGZyYW1lLnByb2Nlc3NGZXRjaGVkRGF0YShwcm9taXNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SXRlbUJ5SWQoZnJhbWU6IEZyYW1lLCBpZDogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgICAgIC8vIFRPRE8oYnNraW5uZXIpOiBnZXQgcmlkIG9mIHRoaXMgaGFjayBhcyBzb29uIGFzIHdlIGhhdmUgYmV0dGVyXG4gICAgICAgIC8vIHN1cHBvcnQgZm9yIG11bHRpcGxlIGVuZHBvaW50c1xuICAgICAgICBsZXQgdXJsID0gYCR7ZnJhbWUuZW5kcG9pbnQudXJsKCl9LyR7aWR9YDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW8uZ2V0RW5kcG9pbnRBc3luYyhuZXcgRW5kcG9pbnQodXJsKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHBvc3RUb0VuZHBvaW50KGRhdGE6IHt9LCBlbmRwb2ludDogRW5kcG9pbnQsIHdpdGhQYXJhbXM/OiB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pby5wb3N0VG9FbmRwb2ludEFzeW5jKGRhdGEsIGVuZHBvaW50LCB3aXRoUGFyYW1zKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=