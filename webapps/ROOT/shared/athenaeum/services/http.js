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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("angular2/core");
var http_1 = require("angular2/http");
var Observable_1 = require("rxjs/Observable");
var error_factory_1 = require("../common/errors/error-factory");
var apiRE = /^api:\/\/([^\/]*)\//;
exports.API_SERVER_CONFIGURATION = new core_1.OpaqueToken("API_SERVER_CONFIGURATION");
var APIServers = (function () {
    function APIServers(config) {
        var _this = this;
        this.servers = {};
        Object.keys(config).forEach(function (key) {
            _this.servers[key] = _this.resolveConfigEntry(config[key]);
        });
    }
    APIServers.prototype.getUrl = function (url) {
        var _this = this;
        if (url.match(apiRE)) {
            return url.replace(apiRE, function (match, serverName) {
                return _this.servers[serverName];
            });
        }
        return url;
    };
    APIServers.prototype.resolveConfigEntry = function (entry, serverName) {
        if (serverName === void 0) { serverName = "default-server"; }
        var value = entry[serverName];
        if (typeof value === "string") {
            if (!value.endsWith("/")) {
                return value + "/";
            }
            return value;
        }
        else if (value.goto) {
            return this.resolveConfigEntry(entry, value.goto);
        }
        return String.EMPTY;
    };
    APIServers = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(exports.API_SERVER_CONFIGURATION)), 
        __metadata('design:paramtypes', [Object])
    ], APIServers);
    return APIServers;
}());
exports.APIServers = APIServers;
var Http = (function () {
    function Http(http, servers) {
        this.http = http;
        this.servers = servers;
    }
    Http.prototype.doGet = function (url, options) {
        return this.get(url, options).toPromise();
    };
    Http.prototype.doPost = function (url, payload, headers) {
        return this.post(url, payload, headers).toPromise();
    };
    Http.prototype.doPut = function (url, payload, headers) {
        return this.put(url, payload, headers).toPromise();
    };
    Http.prototype.doDelete = function (url, headers) {
        return this.delete(url, headers).toPromise();
    };
    Http.prototype.get = function (url, headers) {
        return this._request(http_1.RequestMethod.Get, url, null, headers);
    };
    Http.prototype.post = function (url, payload, headers) {
        return this._request(http_1.RequestMethod.Post, url, payload, headers);
    };
    Http.prototype.put = function (url, payload, headers) {
        return this._request(http_1.RequestMethod.Put, url, payload, headers);
    };
    Http.prototype.delete = function (url, headers) {
        return this._request(http_1.RequestMethod.Delete, url, null, headers);
    };
    Http.prototype._request = function (method, url, body, headers) {
        url = this.servers.getUrl(url);
        var requestHeaders = {
            "Accept": "application/json"
        };
        if (method !== http_1.RequestMethod.Get && method !== http_1.RequestMethod.Delete) {
            requestHeaders["Content-Type"] = "application/json";
        }
        if (headers) {
            requestHeaders = Object.assign(requestHeaders, headers);
        }
        var options = new http_1.RequestOptions({
            method: method,
            headers: new http_1.Headers(requestHeaders),
            body: body ? JSON.stringify(body) : String.EMPTY,
            url: url
        });
        return this.http.request(url, options)
            .map(function (response) {
            if (response.headers
                .get("Content-Type")
                .startsWith("application/json")) {
                return response.json();
            }
            else {
                return response.text();
            }
        })
            .catch(function (err) {
            var error = error_factory_1.ErrorFactory.toPacBioError(err);
            return Observable_1.Observable.throw(error);
        });
    };
    Http = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, APIServers])
    ], Http);
    return Http;
}());
exports.Http = Http;
exports.HTTP_PROVIDERS = [
    http_1.HTTP_PROVIDERS,
    Http,
    APIServers
];

//# sourceMappingURL=data:application/json;base64,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QUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM1QixDQUFDO1FBQ0osQ0FBQyxDQUFDO2FBQ04sS0FBSyxDQUFDLFVBQUEsR0FBRztZQUNOLElBQU0sS0FBSyxHQUFHLDRCQUFZLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFyRkw7UUFBQyxpQkFBVSxFQUFFOztZQUFBO0lBc0ZiLFdBQUM7QUFBRCxDQXJGQSxBQXFGQyxJQUFBO0FBckZZLFlBQUksT0FxRmhCLENBQUE7QUFFWSxzQkFBYyxHQUFHO0lBQzFCLHFCQUFpQjtJQUNqQixJQUFJO0lBQ0osVUFBVTtDQUNiLENBQUMiLCJmaWxlIjoic2VydmljZXMvaHR0cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgT3BhcXVlVG9rZW4sIEluamVjdH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgSFRUUF9QUk9WSURFUlMgYXMgTkdfSFRUUF9QUk9WSURFUlMsXG4gICAgSHR0cCBhcyBOZ0h0dHAsXG4gICAgSGVhZGVycyxcbiAgICBSZXF1ZXN0T3B0aW9ucyxcbiAgICBSZXF1ZXN0TWV0aG9kXG59IGZyb20gXCJhbmd1bGFyMi9odHRwXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7RXJyb3JGYWN0b3J5fSBmcm9tIFwiLi4vY29tbW9uL2Vycm9ycy9lcnJvci1mYWN0b3J5XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGVhZGVyc01hcCB7XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5jb25zdCBhcGlSRSA9IC9eYXBpOlxcL1xcLyhbXlxcL10qKVxcLy87XG5cbmV4cG9ydCBjb25zdCBBUElfU0VSVkVSX0NPTkZJR1VSQVRJT04gPSBuZXcgT3BhcXVlVG9rZW4oXCJBUElfU0VSVkVSX0NPTkZJR1VSQVRJT05cIik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQVBJU2VydmVyQ29uZmlnIHtcbiAgICBba2V5OiBzdHJpbmddOiBBUElTZXJ2ZXJFbnRyeTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBUElTZXJ2ZXJFbnRyeSB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgQVBJU2VydmVyUmVkaXJlY3Q7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQVBJU2VydmVyUmVkaXJlY3Qge1xuICAgIGdvdG86IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFQSVNlcnZlcnMge1xuICAgIHByaXZhdGUgc2VydmVyczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmc7IH0gPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoQVBJX1NFUlZFUl9DT05GSUdVUkFUSU9OKSBjb25maWc6IEFQSVNlcnZlckNvbmZpZykge1xuICAgICAgICBPYmplY3Qua2V5cyhjb25maWcpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VydmVyc1trZXldID0gdGhpcy5yZXNvbHZlQ29uZmlnRW50cnkoY29uZmlnW2tleV0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAodXJsLm1hdGNoKGFwaVJFKSkge1xuICAgICAgICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKGFwaVJFLCAobWF0Y2gsIHNlcnZlck5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXJzW3NlcnZlck5hbWVdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVzb2x2ZUNvbmZpZ0VudHJ5KGVudHJ5OiBBUElTZXJ2ZXJFbnRyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlck5hbWU6IHN0cmluZyA9IFwiZGVmYXVsdC1zZXJ2ZXJcIik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZW50cnlbc2VydmVyTmFtZV07XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZS5lbmRzV2l0aChcIi9cIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgKyBcIi9cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZS5nb3RvKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlQ29uZmlnRW50cnkoZW50cnksIHZhbHVlLmdvdG8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTdHJpbmcuRU1QVFk7XG4gICAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cCB7XG4gICAgcHJpdmF0ZSBodHRwOiBOZ0h0dHA7XG4gICAgcHJpdmF0ZSBzZXJ2ZXJzOiBBUElTZXJ2ZXJzO1xuXG4gICAgY29uc3RydWN0b3IoaHR0cDogTmdIdHRwLCBzZXJ2ZXJzOiBBUElTZXJ2ZXJzKSB7XG4gICAgICAgIHRoaXMuaHR0cCA9IGh0dHA7XG4gICAgICAgIHRoaXMuc2VydmVycyA9IHNlcnZlcnM7XG4gICAgfVxuXG4gICAgLyoqIEBkZXByZWNhdGVkICovXG4gICAgcHVibGljIGRvR2V0KHVybDogc3RyaW5nLCBvcHRpb25zPzogSGVhZGVyc01hcCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldCh1cmwsIG9wdGlvbnMpLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIHB1YmxpYyBkb1Bvc3QodXJsOiBzdHJpbmcsIHBheWxvYWQ6IGFueSwgaGVhZGVycz86IEhlYWRlcnNNYXApOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0KHVybCwgcGF5bG9hZCwgaGVhZGVycykudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgLyoqIEBkZXByZWNhdGVkICovXG4gICAgcHVibGljIGRvUHV0KHVybDogc3RyaW5nLCBwYXlsb2FkOiBhbnksIGhlYWRlcnM/OiBIZWFkZXJzTWFwKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHV0KHVybCwgcGF5bG9hZCwgaGVhZGVycykudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgLyoqIEBkZXByZWNhdGVkICovXG4gICAgcHVibGljIGRvRGVsZXRlKHVybDogc3RyaW5nLCBoZWFkZXJzPzogSGVhZGVyc01hcCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZSh1cmwsIGhlYWRlcnMpLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQodXJsOiBzdHJpbmcsIGhlYWRlcnM/OiBIZWFkZXJzTWFwKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoUmVxdWVzdE1ldGhvZC5HZXQsIHVybCwgbnVsbCwgaGVhZGVycyk7XG4gICAgfVxuXG4gICAgcHVibGljIHBvc3QodXJsOiBzdHJpbmcsIHBheWxvYWQ6IGFueSwgaGVhZGVycz86IEhlYWRlcnNNYXApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdChSZXF1ZXN0TWV0aG9kLlBvc3QsIHVybCwgcGF5bG9hZCwgaGVhZGVycyk7XG4gICAgfVxuXG4gICAgcHVibGljIHB1dCh1cmw6IHN0cmluZywgcGF5bG9hZDogYW55LCBoZWFkZXJzPzogSGVhZGVyc01hcCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KFJlcXVlc3RNZXRob2QuUHV0LCB1cmwsIHBheWxvYWQsIGhlYWRlcnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGUodXJsOiBzdHJpbmcsIGhlYWRlcnM/OiBIZWFkZXJzTWFwKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoUmVxdWVzdE1ldGhvZC5EZWxldGUsIHVybCwgbnVsbCwgaGVhZGVycyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9yZXF1ZXN0KG1ldGhvZDogUmVxdWVzdE1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgIGJvZHk/OiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM/OiBIZWFkZXJzTWFwKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdXJsID0gdGhpcy5zZXJ2ZXJzLmdldFVybCh1cmwpO1xuXG4gICAgICAgIGxldCByZXF1ZXN0SGVhZGVycyA9IHtcbiAgICAgICAgICAgIFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG1ldGhvZCAhPT0gUmVxdWVzdE1ldGhvZC5HZXQgJiYgbWV0aG9kICE9PSBSZXF1ZXN0TWV0aG9kLkRlbGV0ZSkge1xuICAgICAgICAgICAgcmVxdWVzdEhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoZWFkZXJzKSB7XG4gICAgICAgICAgICByZXF1ZXN0SGVhZGVycyA9IE9iamVjdC5hc3NpZ24ocmVxdWVzdEhlYWRlcnMsIGhlYWRlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoe1xuICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyhyZXF1ZXN0SGVhZGVycyksXG4gICAgICAgICAgICBib2R5OiBib2R5ID8gSlNPTi5zdHJpbmdpZnkoYm9keSkgOiBTdHJpbmcuRU1QVFksXG4gICAgICAgICAgICB1cmw6IHVybFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QodXJsLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuaGVhZGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldChcIkNvbnRlbnQtVHlwZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0c1dpdGgoXCJhcHBsaWNhdGlvbi9qc29uXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IEVycm9yRmFjdG9yeS50b1BhY0Jpb0Vycm9yKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgSFRUUF9QUk9WSURFUlMgPSBbXG4gICAgTkdfSFRUUF9QUk9WSURFUlMsXG4gICAgSHR0cCxcbiAgICBBUElTZXJ2ZXJzXG5dO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9