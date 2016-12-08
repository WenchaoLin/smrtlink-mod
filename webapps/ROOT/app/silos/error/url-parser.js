/**
 * @copyright Copyright (c) 2014-2015, Pacific Biosciences of California, Inc.
 * @author <a href="mailto:bskinner@pacificbiosciences.com">Brian Skinner</a>
 */
"use strict";
/**
 * @description
 * Given a path like "http://foo:8080/bar/baz",
 * returns "http://foo:8080".
 *
 * @example
 * ```js
 * var result = urlParser.getOriginFromPath("http://foo:8080/bar/baz");
 * expect(result).toBe("http://foo:8080");
 * ```
 *
 * @param {string} path Any valid URL or relative path.
 * @returns {string} A URL with just the "origin" of the path.
 */
function getOriginFromPath(path) {
    var anchor = window.document.createElement("a");
    anchor.href = path;
    return anchor.origin;
}
exports.getOriginFromPath = getOriginFromPath;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9lcnJvci91cmwtcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFFSDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsMkJBQWtDLElBQVk7SUFDMUMsSUFBSSxNQUFNLEdBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckQsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDekIsQ0FBQztBQUplLHlCQUFpQixvQkFJaEMsQ0FBQSIsImZpbGUiOiJhcHAvc2lsb3MvZXJyb3IvdXJsLXBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhLCBJbmMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86YnNraW5uZXJAcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbVwiPkJyaWFuIFNraW5uZXI8L2E+XG4gKi9cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdpdmVuIGEgcGF0aCBsaWtlIFwiaHR0cDovL2Zvbzo4MDgwL2Jhci9iYXpcIixcbiAqIHJldHVybnMgXCJodHRwOi8vZm9vOjgwODBcIi5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSB1cmxQYXJzZXIuZ2V0T3JpZ2luRnJvbVBhdGgoXCJodHRwOi8vZm9vOjgwODAvYmFyL2JhelwiKTtcbiAqIGV4cGVjdChyZXN1bHQpLnRvQmUoXCJodHRwOi8vZm9vOjgwODBcIik7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBBbnkgdmFsaWQgVVJMIG9yIHJlbGF0aXZlIHBhdGguXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBIFVSTCB3aXRoIGp1c3QgdGhlIFwib3JpZ2luXCIgb2YgdGhlIHBhdGguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPcmlnaW5Gcm9tUGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBhbmNob3I6IGFueSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICBhbmNob3IuaHJlZiA9IHBhdGg7XG4gICAgcmV0dXJuIGFuY2hvci5vcmlnaW47XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=