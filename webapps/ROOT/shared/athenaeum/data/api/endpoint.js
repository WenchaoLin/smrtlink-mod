"use strict";
var Endpoint = (function () {
    function Endpoint(templateUrl, idTokens) {
        this.templateUrl = templateUrl;
        this.idTokens = idTokens;
    }
    Endpoint.prototype.and = function (withParams) {
        if (withParams) {
            var template = this.templateUrl;
            for (var param in withParams) {
                if (withParams.hasOwnProperty(param)) {
                    template = template.replace(param, withParams[param]);
                }
            }
            return new Endpoint(template);
        }
        else {
            return this;
        }
    };
    Endpoint.prototype.hasMissingSegments = function () {
        return this.templateUrl.indexOf("$") > -1;
    };
    Endpoint.prototype.url = function () {
        return this.templateUrl;
    };
    Endpoint.prototype.identifierTokens = function () {
        return this.idTokens;
    };
    return Endpoint;
}());
exports.Endpoint = Endpoint;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvYXBpL2VuZHBvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFLQTtJQUNJLGtCQUFvQixXQUFtQixFQUFVLFFBQWE7UUFBMUMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFLO0lBRTlELENBQUM7SUFNRCxzQkFBRyxHQUFILFVBQUksVUFBZTtRQUNmLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2hDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzFELENBQUM7WUFDTCxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7SUFFRCxxQ0FBa0IsR0FBbEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELHNCQUFHLEdBQUg7UUFLSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQsbUNBQWdCLEdBQWhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQXRDQSxBQXNDQyxJQUFBO0FBdENZLGdCQUFRLFdBc0NwQixDQUFBIiwiZmlsZSI6ImRhdGEvYXBpL2VuZHBvaW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhLCBJbmMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86YnNraW5uZXJAcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbVwiPkJyaWFuIFNraW5uZXI8L2E+XG4gKi9cblxuZXhwb3J0IGNsYXNzIEVuZHBvaW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRlbXBsYXRlVXJsOiBzdHJpbmcsIHByaXZhdGUgaWRUb2tlbnM/OiB7fSkge1xuICAgICAgICAvLyBwYXNzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHdpdGhQYXJhbXMgYW4gb2JqZWN0IGxpa2UgeyRmb286IFwiaG9tZVwiLCAkYmFyOiAyMn1cbiAgICAgKiBAcmV0dXJucyB7RW5kcG9pbnR9IGFuIEVuZHBvaW50IGxpa2UgXCJwYXRoL3RvL2hvbWUvZGV0YWlscy8yMlwiXG4gICAgICovXG4gICAgYW5kKHdpdGhQYXJhbXM/OiB7fSkge1xuICAgICAgICBpZiAod2l0aFBhcmFtcykge1xuICAgICAgICAgICAgbGV0IHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZVVybDtcbiAgICAgICAgICAgIGZvciAobGV0IHBhcmFtIGluIHdpdGhQYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBpZiAod2l0aFBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwYXJhbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKHBhcmFtLCB3aXRoUGFyYW1zW3BhcmFtXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbmRwb2ludCh0ZW1wbGF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc01pc3NpbmdTZWdtZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVVcmwuaW5kZXhPZihcIiRcIikgPiAtMTtcbiAgICB9XG5cbiAgICB1cmwoKSB7XG4gICAgICAgIC8vIGlmICh0aGlzLmhhc01pc3NpbmdTZWdtZW50cygpKSB7XG4gICAgICAgIC8vICBsZXQgbWVzc2FnZSA9IGBhcGkudXJsKCkgY2FsbCBvbiBhYnN0cmFjdCBBUEk6ICR7dGhpcy50ZW1wbGF0ZVVybH1gO1xuICAgICAgICAvLyAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICAvLyB9XG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlVXJsO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJUb2tlbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkVG9rZW5zO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==