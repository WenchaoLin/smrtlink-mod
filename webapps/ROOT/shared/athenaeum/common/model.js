"use strict";
var Model = (function () {
    function Model() {
    }
    Model.prototype.initialize = function (object) {
        if (object) {
            Object.assign(this, object);
        }
    };
    Model.prototype.clone = function () {
        return new this.constructor(this);
    };
    return Model;
}());
exports.Model = Model;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUE7SUFBQTtJQVVBLENBQUM7SUFUYSwwQkFBVSxHQUFwQixVQUFxQixNQUFXO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFCQUFLLEdBQUw7UUFDSSxNQUFNLENBQUMsSUFBVyxJQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FWQSxBQVVDLElBQUE7QUFWWSxhQUFLLFFBVWpCLENBQUEiLCJmaWxlIjoiY29tbW9uL21vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYVxuICpcbiAqIENyZWF0ZWQgYnkgc2FsIFNhbmZpbGlwcG8gPHNzYW5maWxpcHBvQHBhY2lmaWNiaW9zY2llbmNlcy5jb20+IG9uIDMvMjgvMTYuXG4gKi9cblxuZXhwb3J0IGNsYXNzIE1vZGVsIHtcbiAgICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZShvYmplY3Q/OiB7fSkge1xuICAgICAgICBpZiAob2JqZWN0KSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9iamVjdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9uZSgpOiB0aGlzIHtcbiAgICAgICAgcmV0dXJuIG5ldyAoPGFueT4gdGhpcykuY29uc3RydWN0b3IodGhpcyk7XG4gICAgfVxufVxuXG4gIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9