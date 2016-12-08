"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var errors = {
    "unknown-name": "Unknown Error",
    "unknown-message": "An unknown error has occurred.",
    "server-not-found-name": "Server Not Found",
    "server-not-found-message": "Server cannot be reached.",
    "400-name": "Bad Request",
    "400-message": "Bad request.",
    "401-name": "Unauthorized",
    "401-message": "Invalid credentials.",
    "403-name": "Forbidden",
    "403-message": "Access denied or forbidden.",
    "404-name": "Resource Not Found",
    "404-message": "Resource not found..",
    "405-name": "Method Not Allowed",
    "405-message": "The HTTP method is is not supported.",
    "500-name": "Internal Server Error",
    "500-message": "The server encountered an unexpected error.",
    "501-name": "Not Implemented",
    "501-message": "The server does not support the requested function.",
    "503-name": "Service Unavailable",
    "503-message": "The server is unable to handle the request due to maintenance or a temporary overload of the server."
};
var ErrorFactory = (function () {
    function ErrorFactory() {
    }
    ErrorFactory.isServerNotFoundError = function (error) {
        return ((error instanceof TypeError) &&
            (error.toString() === "TypeError: Failed to fetch"));
    };
    ErrorFactory.toPacBioError = function (error) {
        var result;
        if (error.status) {
            var message = error.message;
            var url = error.url || String.EMPTY;
            var statusText = error.statusText || String.EMPTY;
            switch (error.status) {
                case 400:
                    result = new BadRequestError(message, url, statusText);
                    break;
                case 401:
                    result = new UnauthorizedError(message, url, statusText);
                    break;
                case 403:
                    result = new ForbiddenError(message, url, statusText);
                    break;
                case 404:
                    result = new ResourceNotFoundError(message, url, statusText);
                    break;
                case 405:
                    result = new MethodNotAllowedError(message, url, statusText);
                    break;
                case 500:
                    result = new InternalServerErrorError(message, url, statusText);
                    break;
                case 501:
                    result = new NotImplementedError(message, url, statusText);
                    break;
                case 503:
                    result = new ServiceUnavailableError(message, url, statusText);
                    break;
                default:
                    break;
            }
        }
        if (!result) {
            if (ErrorFactory.isServerNotFoundError(error)) {
                return new ServerNotFoundError(error);
            }
            else {
                return new UnknownError(error);
            }
        }
        return result;
    };
    return ErrorFactory;
}());
exports.ErrorFactory = ErrorFactory;
var PacBioError = (function (_super) {
    __extends(PacBioError, _super);
    function PacBioError(message, innerException) {
        _super.call(this, message);
        this.name = "PacBioError";
        this.message = message;
        this.innerException = innerException;
    }
    PacBioError.prototype.toString = function () {
        return this.message;
    };
    return PacBioError;
}(Error));
exports.PacBioError = PacBioError;
var ServerNotFoundError = (function (_super) {
    __extends(ServerNotFoundError, _super);
    function ServerNotFoundError(innerException) {
        _super.call(this, errors["server-not-found-message"], innerException);
        this.name = errors["server-not-found-name"];
    }
    return ServerNotFoundError;
}(PacBioError));
exports.ServerNotFoundError = ServerNotFoundError;
var UnknownError = (function (_super) {
    __extends(UnknownError, _super);
    function UnknownError(innerException) {
        _super.call(this, errors["unknown-message"], innerException);
        this.name = errors["unknown-name"];
    }
    return UnknownError;
}(PacBioError));
exports.UnknownError = UnknownError;
var ServerError = (function (_super) {
    __extends(ServerError, _super);
    function ServerError(status, message, url, statusText) {
        _super.call(this, message || errors["%d-message".sprintf(status)]);
        this.name = errors["%d-name".sprintf(status)];
        this.status = status;
        this.url = url;
        this.statusText = statusText.toLowerCase() !== "ok" ? statusText : String.EMPTY;
    }
    ServerError.prototype.toString = function () {
        return this.message + " (" + this.status + ")";
    };
    return ServerError;
}(PacBioError));
exports.ServerError = ServerError;
var BadRequestError = (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(message, url, statusText) {
        _super.call(this, 400, message, url, statusText);
    }
    return BadRequestError;
}(ServerError));
exports.BadRequestError = BadRequestError;
var UnauthorizedError = (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message, url, statusText) {
        _super.call(this, 401, message, url, statusText);
    }
    return UnauthorizedError;
}(ServerError));
exports.UnauthorizedError = UnauthorizedError;
var InvalidCredentialsError = (function (_super) {
    __extends(InvalidCredentialsError, _super);
    function InvalidCredentialsError(message, url, statusText) {
        _super.call(this, message, url, statusText);
    }
    return InvalidCredentialsError;
}(UnauthorizedError));
exports.InvalidCredentialsError = InvalidCredentialsError;
var ForbiddenError = (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(message, url, statusText) {
        _super.call(this, 403, message, url, statusText);
    }
    return ForbiddenError;
}(ServerError));
exports.ForbiddenError = ForbiddenError;
var ResourceNotFoundError = (function (_super) {
    __extends(ResourceNotFoundError, _super);
    function ResourceNotFoundError(message, url, statusText) {
        _super.call(this, 404, message, url, statusText);
    }
    return ResourceNotFoundError;
}(ServerError));
exports.ResourceNotFoundError = ResourceNotFoundError;
var MethodNotAllowedError = (function (_super) {
    __extends(MethodNotAllowedError, _super);
    function MethodNotAllowedError(message, url, statusText) {
        _super.call(this, 405, message, url, statusText);
    }
    return MethodNotAllowedError;
}(ServerError));
exports.MethodNotAllowedError = MethodNotAllowedError;
var InternalServerErrorError = (function (_super) {
    __extends(InternalServerErrorError, _super);
    function InternalServerErrorError(message, url, statusText) {
        _super.call(this, 500, message, url, statusText);
    }
    return InternalServerErrorError;
}(ServerError));
exports.InternalServerErrorError = InternalServerErrorError;
var NotImplementedError = (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError(message, url, statusText) {
        _super.call(this, 501, message, url, statusText);
    }
    return NotImplementedError;
}(ServerError));
exports.NotImplementedError = NotImplementedError;
var ServiceUnavailableError = (function (_super) {
    __extends(ServiceUnavailableError, _super);
    function ServiceUnavailableError(message, url, statusText) {
        _super.call(this, 503, message, url, statusText);
    }
    return ServiceUnavailableError;
}(ServerError));
exports.ServiceUnavailableError = ServiceUnavailableError;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9lcnJvcnMvZXJyb3ItZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFRQSxJQUFNLE1BQU0sR0FBRztJQUNYLGNBQWMsRUFBZSxlQUFlO0lBQzVDLGlCQUFpQixFQUFZLGdDQUFnQztJQUM3RCx1QkFBdUIsRUFBTSxrQkFBa0I7SUFDL0MsMEJBQTBCLEVBQUcsMkJBQTJCO0lBRXhELFVBQVUsRUFBTSxhQUFhO0lBQzdCLGFBQWEsRUFBRyxjQUFjO0lBQzlCLFVBQVUsRUFBTSxjQUFjO0lBQzlCLGFBQWEsRUFBRyxzQkFBc0I7SUFDdEMsVUFBVSxFQUFNLFdBQVc7SUFDM0IsYUFBYSxFQUFHLDZCQUE2QjtJQUM3QyxVQUFVLEVBQU0sb0JBQW9CO0lBQ3BDLGFBQWEsRUFBRyxzQkFBc0I7SUFDdEMsVUFBVSxFQUFNLG9CQUFvQjtJQUNwQyxhQUFhLEVBQUcsc0NBQXNDO0lBQ3RELFVBQVUsRUFBTSx1QkFBdUI7SUFDdkMsYUFBYSxFQUFHLDZDQUE2QztJQUM3RCxVQUFVLEVBQU0saUJBQWlCO0lBQ2pDLGFBQWEsRUFBRyxxREFBcUQ7SUFDckUsVUFBVSxFQUFNLHFCQUFxQjtJQUNyQyxhQUFhLEVBQUcsc0dBQXNHO0NBQ3pILENBQUM7QUFFRjtJQUFBO0lBcURBLENBQUM7SUFwRFUsa0NBQXFCLEdBQTVCLFVBQTZCLEtBQUs7UUFDOUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksU0FBUyxDQUFDO1lBQ3BDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLDRCQUE0QixDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU0sMEJBQWEsR0FBcEIsVUFBcUIsS0FBMkQ7UUFDNUUsSUFBSSxNQUFtQixDQUFDO1FBRXhCLEVBQUUsQ0FBQyxDQUFnQixLQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQzVCLElBQUksR0FBRyxH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Qyx5Q0FBVztJQUNsRCwrQkFBWSxPQUFnQixFQUFFLEdBQVksRUFBRSxVQUFtQjtRQUMzRCxrQkFBTSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQUpBLEFBSUMsQ0FKMEMsV0FBVyxHQUlyRDtBQUpZLDZCQUFxQix3QkFJakMsQ0FBQTtBQU1EO0lBQThDLDRDQUFXO0lBQ3JELGtDQUFZLE9BQWdCLEVBQUUsR0FBWSxFQUFFLFVBQW1CO1FBQzNELGtCQUFNLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFDTCwrQkFBQztBQUFELENBSkEsQUFJQyxDQUo2QyxXQUFXLEdBSXhEO0FBSlksZ0NBQXdCLDJCQUlwQyxDQUFBO0FBT0Q7SUFBeUMsdUNBQVc7SUFDaEQsNkJBQVksT0FBZ0IsRUFBRSxHQUFZLEVBQUUsVUFBbUI7UUFDM0Qsa0JBQU0sR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FKQSxBQUlDLENBSndDLFdBQVcsR0FJbkQ7QUFKWSwyQkFBbUIsc0JBSS9CLENBQUE7QUFNRDtJQUE2QywyQ0FBVztJQUNwRCxpQ0FBWSxPQUFnQixFQUFFLEdBQVksRUFBRSxVQUFtQjtRQUMzRCxrQkFBTSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0wsOEJBQUM7QUFBRCxDQUpBLEFBSUMsQ0FKNEMsV0FBVyxHQUl2RDtBQUpZLCtCQUF1QiwwQkFJbkMsQ0FBQSIsImZpbGUiOiJjb21tb24vZXJyb3JzL2Vycm9yLWZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSwgUGFjaWZpYyBCaW9zY2llbmNlcyBvZiBDYWxpZm9ybmlhXG4gKlxuICogQ3JlYXRlZCBieSBTYWwgU2FuZmlsaXBwbyA8c3NhbmZpbGlwcG9AcGFjaWZpY2Jpb3NjaWVuY2VzLmNvbT4gb24gMTEvMTcvMjAxNS5cbiAqL1xuXG5pbXBvcnQge1dyYXBwZWRFeGNlcHRpb259IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5cbmNvbnN0IGVycm9ycyA9IHtcbiAgICBcInVua25vd24tbmFtZVwiICAgICAgICAgICAgIDogXCJVbmtub3duIEVycm9yXCIsXG4gICAgXCJ1bmtub3duLW1lc3NhZ2VcIiAgICAgICAgICA6IFwiQW4gdW5rbm93biBlcnJvciBoYXMgb2NjdXJyZWQuXCIsXG4gICAgXCJzZXJ2ZXItbm90LWZvdW5kLW5hbWVcIiAgICA6IFwiU2VydmVyIE5vdCBGb3VuZFwiLFxuICAgIFwic2VydmVyLW5vdC1mb3VuZC1tZXNzYWdlXCIgOiBcIlNlcnZlciBjYW5ub3QgYmUgcmVhY2hlZC5cIixcblxuICAgIFwiNDAwLW5hbWVcIiAgICA6IFwiQmFkIFJlcXVlc3RcIixcbiAgICBcIjQwMC1tZXNzYWdlXCIgOiBcIkJhZCByZXF1ZXN0LlwiLFxuICAgIFwiNDAxLW5hbWVcIiAgICA6IFwiVW5hdXRob3JpemVkXCIsXG4gICAgXCI0MDEtbWVzc2FnZVwiIDogXCJJbnZhbGlkIGNyZWRlbnRpYWxzLlwiLFxuICAgIFwiNDAzLW5hbWVcIiAgICA6IFwiRm9yYmlkZGVuXCIsXG4gICAgXCI0MDMtbWVzc2FnZVwiIDogXCJBY2Nlc3MgZGVuaWVkIG9yIGZvcmJpZGRlbi5cIixcbiAgICBcIjQwNC1uYW1lXCIgICAgOiBcIlJlc291cmNlIE5vdCBGb3VuZFwiLFxuICAgIFwiNDA0LW1lc3NhZ2VcIiA6IFwiUmVzb3VyY2Ugbm90IGZvdW5kLi5cIixcbiAgICBcIjQwNS1uYW1lXCIgICAgOiBcIk1ldGhvZCBOb3QgQWxsb3dlZFwiLFxuICAgIFwiNDA1LW1lc3NhZ2VcIiA6IFwiVGhlIEhUVFAgbWV0aG9kIGlzIGlzIG5vdCBzdXBwb3J0ZWQuXCIsXG4gICAgXCI1MDAtbmFtZVwiICAgIDogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICBcIjUwMC1tZXNzYWdlXCIgOiBcIlRoZSBzZXJ2ZXIgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci5cIixcbiAgICBcIjUwMS1uYW1lXCIgICAgOiBcIk5vdCBJbXBsZW1lbnRlZFwiLFxuICAgIFwiNTAxLW1lc3NhZ2VcIiA6IFwiVGhlIHNlcnZlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSByZXF1ZXN0ZWQgZnVuY3Rpb24uXCIsXG4gICAgXCI1MDMtbmFtZVwiICAgIDogXCJTZXJ2aWNlIFVuYXZhaWxhYmxlXCIsXG4gICAgXCI1MDMtbWVzc2FnZVwiIDogXCJUaGUgc2VydmVyIGlzIHVuYWJsZSB0byBoYW5kbGUgdGhlIHJlcXVlc3QgZHVlIHRvIG1haW50ZW5hbmNlIG9yIGEgdGVtcG9yYXJ5IG92ZXJsb2FkIG9mIHRoZSBzZXJ2ZXIuXCJcbn07XG5cbmV4cG9ydCBjbGFzcyBFcnJvckZhY3Rvcnkge1xuICAgIHN0YXRpYyBpc1NlcnZlck5vdEZvdW5kRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuICgoZXJyb3IgaW5zdGFuY2VvZiBUeXBlRXJyb3IpICYmXG4gICAgICAgIChlcnJvci50b1N0cmluZygpID09PSBcIlR5cGVFcnJvcjogRmFpbGVkIHRvIGZldGNoXCIpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9QYWNCaW9FcnJvcihlcnJvcjogRXJyb3IgfCBXcmFwcGVkRXhjZXB0aW9uIHwgUGFjQmlvRXJyb3IgfCBTZXJ2ZXJFcnJvcik6IFBhY0Jpb0Vycm9yIHtcbiAgICAgICAgbGV0IHJlc3VsdDogUGFjQmlvRXJyb3I7XG5cbiAgICAgICAgaWYgKCg8U2VydmVyRXJyb3I+IGVycm9yKS5zdGF0dXMpIHtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgIGxldCB1cmwgPSAoPFNlcnZlckVycm9yPiBlcnJvcikudXJsIHx8IFN0cmluZy5FTVBUWTtcbiAgICAgICAgICAgIGxldCBzdGF0dXNUZXh0ID0gKDxTZXJ2ZXJFcnJvcj4gZXJyb3IpLnN0YXR1c1RleHQgfHwgU3RyaW5nLkVNUFRZO1xuICAgICAgICAgICAgc3dpdGNoICgoPFNlcnZlckVycm9yPiBlcnJvcikuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSA0MDA6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBCYWRSZXF1ZXN0RXJyb3IobWVzc2FnZSwgdXJsLCBzdGF0dXNUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0MDE6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBVbmF1dGhvcml6ZWRFcnJvcihtZXNzYWdlLCB1cmwsIHN0YXR1c1RleHQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQwMzpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IEZvcmJpZGRlbkVycm9yKG1lc3NhZ2UsIHVybCwgc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDA0OlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgUmVzb3VyY2VOb3RGb3VuZEVycm9yKG1lc3NhZ2UsIHVybCwgc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDA1OlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgTWV0aG9kTm90QWxsb3dlZEVycm9yKG1lc3NhZ2UsIHVybCwgc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNTAwOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgSW50ZXJuYWxTZXJ2ZXJFcnJvckVycm9yKG1lc3NhZ2UsIHVybCwgc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNTAxOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgTm90SW1wbGVtZW50ZWRFcnJvcihtZXNzYWdlLCB1cmwsIHN0YXR1c1RleHQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDUwMzpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFNlcnZpY2VVbmF2YWlsYWJsZUVycm9yKG1lc3NhZ2UsIHVybCwgc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChFcnJvckZhY3RvcnkuaXNTZXJ2ZXJOb3RGb3VuZEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU2VydmVyTm90Rm91bmRFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVW5rbm93bkVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGFjQmlvRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiUGFjQmlvRXJyb3JcIjtcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBzdGFjazogc3RyaW5nO1xuICAgIHB1YmxpYyBpbm5lckV4Y2VwdGlvbjogRXJyb3IgfCBXcmFwcGVkRXhjZXB0aW9uIHwgUGFjQmlvRXJyb3I7XG5cbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIGlubmVyRXhjZXB0aW9uPzogRXJyb3IgfCBXcmFwcGVkRXhjZXB0aW9uIHwgUGFjQmlvRXJyb3IpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuaW5uZXJFeGNlcHRpb24gPSBpbm5lckV4Y2VwdGlvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZXJ2ZXJOb3RGb3VuZEVycm9yIGV4dGVuZHMgUGFjQmlvRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGlubmVyRXhjZXB0aW9uPzogRXJyb3IgfCBXcmFwcGVkRXhjZXB0aW9uIHwgUGFjQmlvRXJyb3IpIHtcbiAgICAgICAgc3VwZXIoZXJyb3JzW1wic2VydmVyLW5vdC1mb3VuZC1tZXNzYWdlXCJdLCBpbm5lckV4Y2VwdGlvbik7XG4gICAgICAgIHRoaXMubmFtZSA9IGVycm9yc1tcInNlcnZlci1ub3QtZm91bmQtbmFtZVwiXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBVbmtub3duRXJyb3IgZXh0ZW5kcyBQYWNCaW9FcnJvciB7XG4gICAgY29uc3RydWN0b3IoaW5uZXJFeGNlcHRpb24/OiBFcnJvciB8IFdyYXBwZWRFeGNlcHRpb24gfCBQYWNCaW9FcnJvcikge1xuICAgICAgICBzdXBlcihlcnJvcnNbXCJ1bmtub3duLW1lc3NhZ2VcIl0sIGlubmVyRXhjZXB0aW9uKTtcbiAgICAgICAgdGhpcy5uYW1lID0gZXJyb3JzW1widW5rbm93bi1uYW1lXCJdO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNlcnZlckVycm9yIGV4dGVuZHMgUGFjQmlvRXJyb3Ige1xuICAgIHB1YmxpYyBzdGF0dXNUZXh0OiBzdHJpbmc7XG4gICAgcHVibGljIHVybDogc3RyaW5nO1xuICAgIHB1YmxpYyBzdGF0dXM6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHN0YXR1czogbnVtYmVyLCBtZXNzYWdlPzogc3RyaW5nLCB1cmw/OiBzdHJpbmcsIHN0YXR1c1RleHQ/OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSB8fCBlcnJvcnNbXCIlZC1tZXNzYWdlXCIuc3ByaW50ZihzdGF0dXMpXSk7XG4gICAgICAgIHRoaXMubmFtZSA9IGVycm9yc1tcIiVkLW5hbWVcIi5zcHJpbnRmKHN0YXR1cyldO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuc3RhdHVzVGV4dCA9IHN0YXR1c1RleHQudG9Mb3dlckNhc2UoKSAhPT0gXCJva1wiID8gc3RhdHVzVGV4dCA6IFN0cmluZy5FTVBUWTtcbiAgICB9XG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm1lc3NhZ2V9ICgke3RoaXMuc3RhdHVzfSlgO1xuICAgIH1cbn1cblxuLyoqXG4gKiBUaGUgc2VydmVyIGNhbm5vdCBvciB3aWxsIG5vdCBwcm9jZXNzIHRoZSByZXF1ZXN0IGR1ZSB0byBzb21ldGhpbmcgdGhhdCBpcyBwZXJjZWl2ZWRcbiAqIHRvIGJlIGEgY2xpZW50IGVycm9yIChlLmcuLCBtYWxmb3JtZWQgcmVxdWVzdCBzeW50YXgsIGludmFsaWQgcmVxdWVzdCBtZXNzYWdlIGZyYW1pbmcsXG4gKiBvciBkZWNlcHRpdmUgcmVxdWVzdCByb3V0aW5nKS5cbiAqL1xuZXhwb3J0IGNsYXNzIEJhZFJlcXVlc3RFcnJvciBleHRlbmRzIFNlcnZlckVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlPzogc3RyaW5nLCB1cmw/OiBzdHJpbmcsIHN0YXR1c1RleHQ/OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoNDAwLCBtZXNzYWdlLCB1cmwsIHN0YXR1c1RleHQpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBTaW1pbGFyIHRvIDQwMyBGb3JiaWRkZW4sIGJ1dCBzcGVjaWZpY2FsbHkgZm9yIHVzZSB3aGVuIGF1dGhlbnRpY2F0aW9uIGlzIHJlcXVpcmVkIGFuZCBoYXNcbiAqIGZhaWxlZCBvciBoYXMgbm90IHlldCBiZWVuIHByb3ZpZGVkLiBUaGUgcmVzcG9uc2UgbXVzdCBpbmNsdWRlIGEgV1dXLUF1dGhlbnRpY2F0ZSBoZWFkZXJcbiAqIGZpZWxkIGNvbnRhaW5pbmcgYSBjaGFsbGVuZ2UgYXBwbGljYWJsZSB0byB0aGUgcmVxdWVzdGVkIHJlc291cmNlLiBTZWVcbiAqIDxhIGhyZWY9XCIvd2lraS9CYXNpY19hY2Nlc3NfYXV0aGVudGljYXRpb25cIj5CYXNpYyBhY2Nlc3MgYXV0aGVudGljYXRpb248L2E+IGFuZFxuICogPGEgaHJlZj1cIi93aWtpL0RpZ2VzdF9hY2Nlc3NfYXV0aGVudGljYXRpb25cIj5EaWdlc3QgYWNjZXNzIGF1dGhlbnRpY2F0aW9uPC9hPi5cbiAqL1xuZXhwb3J0IGNsYXNzIFVuYXV0aG9yaXplZEVycm9yIGV4dGVuZHMgU2VydmVyRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U/OiBzdHJpbmcsIHVybD86IHN0cmluZywgc3RhdHVzVGV4dD86IHN0cmluZykge1xuICAgICAgICBzdXBlcig0MDEsIG1lc3NhZ2UsIHVybCwgc3RhdHVzVGV4dCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW52YWxpZENyZWRlbnRpYWxzRXJyb3IgZXh0ZW5kcyBVbmF1dGhvcml6ZWRFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZT86IHN0cmluZywgdXJsPzogc3RyaW5nLCBzdGF0dXNUZXh0Pzogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsIHVybCwgc3RhdHVzVGV4dCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFRoZSByZXF1ZXN0IHdhcyBhIHZhbGlkIHJlcXVlc3QsIGJ1dCB0aGUgc2VydmVyIGlzIHJlZnVzaW5nIHRvIHJlc3BvbmQgdG8gaXQuIFVubGlrZSBhIDQwMVxuICogVW5hdXRob3JpemVkIHJlc3BvbnNlLCBhdXRoZW50aWNhdGluZyB3aWxsIG1ha2Ugbm8gZGlmZmVyZW5jZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEZvcmJpZGRlbkVycm9yIGV4dGVuZHMgU2VydmVyRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U/OiBzdHJpbmcsIHVybD86IHN0cmluZywgc3RhdHVzVGV4dD86IHN0cmluZykge1xuICAgICAgICBzdXBlcig0MDMsIG1lc3NhZ2UsIHVybCwgc3RhdHVzVGV4dCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY291bGQgbm90IGJlIGZvdW5kIGJ1dCBtYXkgYmUgYXZhaWxhYmxlIGFnYWluIGluIHRoZSBmdXR1cmUuXG4gKiBTdWJzZXF1ZW50IHJlcXVlc3RzIGJ5IHRoZSBjbGllbnQgYXJlIHBlcm1pc3NpYmxlLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VOb3RGb3VuZEVycm9yIGV4dGVuZHMgU2VydmVyRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U/OiBzdHJpbmcsIHVybD86IHN0cmluZywgc3RhdHVzVGV4dD86IHN0cmluZykge1xuICAgICAgICBzdXBlcig0MDQsIG1lc3NhZ2UsIHVybCwgc3RhdHVzVGV4dCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY291bGQgbm90IGJlIGZvdW5kIGJ1dCBtYXkgYmUgYXZhaWxhYmxlIGFnYWluIGluIHRoZSBmdXR1cmUuXG4gKiBTdWJzZXF1ZW50IHJlcXVlc3RzIGJ5IHRoZSBjbGllbnQgYXJlIHBlcm1pc3NpYmxlLlxuICovXG5leHBvcnQgY2xhc3MgTWV0aG9kTm90QWxsb3dlZEVycm9yIGV4dGVuZHMgU2VydmVyRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U/OiBzdHJpbmcsIHVybD86IHN0cmluZywgc3RhdHVzVGV4dD86IHN0cmluZykge1xuICAgICAgICBzdXBlcig0MDUsIG1lc3NhZ2UsIHVybCwgc3RhdHVzVGV4dCk7XG4gICAgfVxufVxuXG4vKipcbiAqIEEgZ2VuZXJpYyBlcnJvciBtZXNzYWdlLCBnaXZlbiB3aGVuIGFuIHVuZXhwZWN0ZWQgY29uZGl0aW9uIHdhcyBlbmNvdW50ZXJlZCBhbmQgbm8gbW9yZVxuICogc3BlY2lmaWMgbWVzc2FnZSBpcyBzdWl0YWJsZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEludGVybmFsU2VydmVyRXJyb3JFcnJvciBleHRlbmRzIFNlcnZlckVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlPzogc3RyaW5nLCB1cmw/OiBzdHJpbmcsIHN0YXR1c1RleHQ/OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoNTAwLCBtZXNzYWdlLCB1cmwsIHN0YXR1c1RleHQpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBUaGUgc2VydmVyIGVpdGhlciBkb2VzIG5vdCByZWNvZ25pemUgdGhlIHJlcXVlc3QgbWV0aG9kLCBvciBpdCBsYWNrcyB0aGUgYWJpbGl0eSB0byBmdWxmaWxcbiAqIHRoZSByZXF1ZXN0LiBVc3VhbGx5IHRoaXMgaW1wbGllcyBmdXR1cmUgYXZhaWxhYmlsaXR5IChlLmcuLCBhIG5ldyBmZWF0dXJlIG9mIGEgd2ViLXNlcnZpY2VcbiAqIEFQSSkuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb3RJbXBsZW1lbnRlZEVycm9yIGV4dGVuZHMgU2VydmVyRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U/OiBzdHJpbmcsIHVybD86IHN0cmluZywgc3RhdHVzVGV4dD86IHN0cmluZykge1xuICAgICAgICBzdXBlcig1MDEsIG1lc3NhZ2UsIHVybCwgc3RhdHVzVGV4dCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFRoZSBzZXJ2ZXIgaXMgY3VycmVudGx5IHVuYXZhaWxhYmxlIChiZWNhdXNlIGl0IGlzIG92ZXJsb2FkZWQgb3IgZG93biBmb3IgbWFpbnRlbmFuY2UpLlxuICogR2VuZXJhbGx5LCB0aGlzIGlzIGEgdGVtcG9yYXJ5IHN0YXRlLlxuICovXG5leHBvcnQgY2xhc3MgU2VydmljZVVuYXZhaWxhYmxlRXJyb3IgZXh0ZW5kcyBTZXJ2ZXJFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZT86IHN0cmluZywgdXJsPzogc3RyaW5nLCBzdGF0dXNUZXh0Pzogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKDUwMywgbWVzc2FnZSwgdXJsLCBzdGF0dXNUZXh0KTtcbiAgICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==