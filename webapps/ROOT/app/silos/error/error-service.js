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
var router_1 = require("angular2/router");
var url_parser_1 = require("./url-parser");
var http_1 = require("athenaeum/services/http");
// Stop-gap until this class gets reworked
var getUrl;
var ErrorService = (function () {
    function ErrorService(router, servers) {
        this.router = router;
        if (!getUrl) {
            getUrl = servers.getUrl.bind(servers);
        }
    }
    // constructor(private router: Router) { /* pass */ }
    ErrorService.messageForError = function (error) {
        if (error) {
            return ErrorService.messageForHttpError(error);
        }
        return "No error message";
    };
    ErrorService.urlForError = function (error) {
        if (error) {
            return "" + (error.url || "");
        }
        return String.EMPTY;
    };
    ErrorService.detailsForError = function (error) {
        if (error) {
            return "" + (error.statusText || "");
        }
        return String.EMPTY;
    };
    ErrorService.messageForHttpError = function (error) {
        // console.log("messageForHttpError", error);
        var FFF = "TypeError: Failed to fetch";
        if (error instanceof TypeError && error.toLocaleString() === FFF) {
            return ErrorService.messageForFailedToFetchError(error);
        }
        if (error.status) {
            return ErrorService.messageByReturnStatusCode(error);
        }
        if (error.httpCode) {
            return ErrorService.messageByHttpCodeInReturnBody(error);
        }
        return "unrecognized error";
    };
    ErrorService.messageByHttpCodeInReturnBody = function (error) {
        return error.message + ".\nCode " + error.httpCode + ".";
    };
    ErrorService.messageByReturnStatusCode = function (error) {
        var message = "could not load data from: " + error.url;
        switch (error.status) {
            case 0:
                // TODO(bskinner): add protractor test for this case by
                // using path = "http://localhost:9999/" + restSegment,
                return "Unable to get a response from the server. Code 0.\n(A) The server may not exist or may not be running.\n(B) The server may have failed to set the 'Access-Control-Allow-Origin'\nresponse header.\nExpected the server to be at " + url_parser_1.getOriginFromPath(error.url);
            // On 2014-11-18, I experimented with writing code that
            // directly uses XMLHttpRequest(), rather than using
            // $http.get(). I wanted to see if I could get more detailed
            // error information that way, in order to distinguish
            // between errors (A) and (B). Unfortunately, using
            // XMLHttpRequest() didn't help. Here's the code I tried:
            //     var xhr = new window.XMLHttpRequest();
            //     xhr.open("GET", "http://localhost:9999/foo", false);
            //     xhr.onreadystatechange = function() {assert(false);};
            //     try {
            //       xhr.send();
            //    } catch (e) {
            //      assert(e.name === "NetworkError");
            //      // DOMException.NETWORK_ERR === 19
            //      assert(e.code === 19);
            //      assert(xhr.status === 0);
            //      assert(xhr.statusText === "");
            //      assert(xhr.getAllResponseHeaders() === "");
            //    }
            // I used the above XMLHttpRequest() code to try two
            // scenarios:
            //   (A) connecting to a server that doesn't exist.
            //   (B) connecting to a server that doesn't return an
            //     "Access-Control-Allow-Origin", and
            // In both cases (A) and (B), the following were true:
            //   (1) the xhr.onreadystatechange callback is never called
            //   (2) xhr.status is 0
            //   (3) xhr.statusText is ""
            //   (4) xhr.getAllResponseHeaders() returns ""
            //   (5) exception is thrown if you call xhr synchronously
            //      (5a) e.name is "NetworkError"
            //      (5b) e.code is 19
            case 401:
                return "Server says we are unauthorized for URL. Code 401.";
            case 404:
                // TODO(bskinner): add protractor test for this case
                return "Server doesn't recognize the requested URL. Code 404.";
            case 405:
                return "HTTP verb not supported. Code 405.";
            case 500:
                return "Internal Server Error. Code 500.";
            default:
                return JSON.stringify({
                    status: error.status,
                    statusText: error.statusText,
                    url: error.url
                });
        }
    };
    ErrorService.messageForFailedToFetchError = function (error) {
        return "The browser is getting a \"" + error.toLocaleString() + "\" result.\nThis may be happening for any of a variety of reasons.\nOne possibility is that there is no server running at the address\nthe web browser expects. You can test that out by copying this URL\nand pasting it in your browser's address bar:\n\n    " + getUrl("api://smrt-link/status") + "\n\nIf the server is running, you will get a result like:\n{\n    \"uuid\":\"face7f2a-ecf6-4d37-a0e0-543452de0379\",\n    \"version\":\"0.40.7-SNAPSHOT\",\n    \"id\":\"pacbio.smrtservices.smrtlink_analysis\",\n    \"uptime\":67849,\n    \"message\":\"Services have been up for 67849 secs.\"\n}";
    };
    ErrorService.prototype.getError = function () {
        return window[ErrorService.PB_ERROR_INFO];
    };
    ErrorService.prototype.logError = function (rawError) {
        window[ErrorService.PB_ERROR_INFO] = rawError;
        // console.log(rawError);
        return this;
    };
    ErrorService.prototype.showError = function (rawError) {
        this.logError(rawError);
        this.router.navigate(["/Error"]);
    };
    ErrorService.PB_ERROR_INFO = "pbErrorInfo";
    ErrorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.APIServers])
    ], ErrorService);
    return ErrorService;
}());
exports.ErrorService = ErrorService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9lcnJvci9lcnJvci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7Ozs7Ozs7Ozs7QUFFSCxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsdUJBQXFCLGlCQUFpQixDQUFDLENBQUE7QUFDdkMsMkJBQWdDLGNBQWMsQ0FBQyxDQUFBO0FBQy9DLHFCQUF5Qix5QkFBeUIsQ0FBQyxDQUFBO0FBRW5ELDBDQUEwQztBQUMxQyxJQUFJLE1BQStCLENBQUM7QUFHcEM7SUFLSSxzQkFBWSxNQUFjLEVBQUUsT0FBbUI7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLENBQUM7SUFDTCxDQUFDO0lBQ0QscURBQXFEO0lBRTlDLDRCQUFlLEdBQXRCLFVBQXVCLEtBQUs7UUFDeEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLE1BQU0sQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztJQUM5QixDQUFDO0lBRU0sd0JBQVcsR0FBbEIsVUFBbUIsS0FBSztRQUNwQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsTUFBTSxDQUFDLE1BQUcsS0FBSyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUUsQ0FBQztRQUNoQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVNLDRCQUFlLEdBQXRCLFVBQXVCLEtBQUs7UUFDeEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLE1BQU0sQ0FBQyxN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U0FTcEMsQ0FBQztJQUNDLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELCtCQUFRLEdBQVIsVUFBUyxRQUFRO1FBQ2IsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDOUMseUJBQXlCO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELGdDQUFTLEdBQVQsVUFBVSxRQUFRO1FBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQWxKTSwwQkFBYSxHQUFHLGFBQWEsQ0FBQztJQUZ6QztRQUFDLGlCQUFVLEVBQUU7O29CQUFBO0lBc0piLG1CQUFDO0FBQUQsQ0FySkEsQUFxSkMsSUFBQTtBQXJKWSxvQkFBWSxlQXFKeEIsQ0FBQSIsImZpbGUiOiJhcHAvc2lsb3MvZXJyb3IvZXJyb3Itc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTUsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYSwgSW5jLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmJza2lubmVyQHBhY2lmaWNiaW9zY2llbmNlcy5jb21cIj5CcmlhbiBTa2lubmVyPC9hPlxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge2dldE9yaWdpbkZyb21QYXRofSBmcm9tIFwiLi91cmwtcGFyc2VyXCI7XG5pbXBvcnQge0FQSVNlcnZlcnN9IGZyb20gXCJhdGhlbmFldW0vc2VydmljZXMvaHR0cFwiO1xuXG4vLyBTdG9wLWdhcCB1bnRpbCB0aGlzIGNsYXNzIGdldHMgcmV3b3JrZWRcbmxldCBnZXRVcmw6ICh1cmw6IHN0cmluZykgPT4gc3RyaW5nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXJyb3JTZXJ2aWNlIHtcbiAgICBzdGF0aWMgUEJfRVJST1JfSU5GTyA9IFwicGJFcnJvckluZm9cIjtcblxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihyb3V0ZXI6IFJvdXRlciwgc2VydmVyczogQVBJU2VydmVycykge1xuICAgICAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcbiAgICAgICAgaWYgKCFnZXRVcmwpIHtcbiAgICAgICAgICAgIGdldFVybCA9IHNlcnZlcnMuZ2V0VXJsLmJpbmQoc2VydmVycyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyAvKiBwYXNzICovIH1cblxuICAgIHN0YXRpYyBtZXNzYWdlRm9yRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gRXJyb3JTZXJ2aWNlLm1lc3NhZ2VGb3JIdHRwRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIk5vIGVycm9yIG1lc3NhZ2VcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgdXJsRm9yRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7ZXJyb3IudXJsIHx8IFwiXCJ9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU3RyaW5nLkVNUFRZO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZXRhaWxzRm9yRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7ZXJyb3Iuc3RhdHVzVGV4dCB8fCBcIlwifWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFN0cmluZy5FTVBUWTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBtZXNzYWdlRm9ySHR0cEVycm9yKGVycm9yKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWVzc2FnZUZvckh0dHBFcnJvclwiLCBlcnJvcik7XG4gICAgICAgIGNvbnN0IEZGRiA9IFwiVHlwZUVycm9yOiBGYWlsZWQgdG8gZmV0Y2hcIjtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgVHlwZUVycm9yICYmIGVycm9yLnRvTG9jYWxlU3RyaW5nKCkgPT09IEZGRikge1xuICAgICAgICAgICAgcmV0dXJuIEVycm9yU2VydmljZS5tZXNzYWdlRm9yRmFpbGVkVG9GZXRjaEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICAgICAgICByZXR1cm4gRXJyb3JTZXJ2aWNlLm1lc3NhZ2VCeVJldHVyblN0YXR1c0NvZGUoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5odHRwQ29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIEVycm9yU2VydmljZS5tZXNzYWdlQnlIdHRwQ29kZUluUmV0dXJuQm9keShlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwidW5yZWNvZ25pemVkIGVycm9yXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgbWVzc2FnZUJ5SHR0cENvZGVJblJldHVybkJvZHkoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGAke2Vycm9yLm1lc3NhZ2V9LlxuQ29kZSAke2Vycm9yLmh0dHBDb2RlfS5gO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIG1lc3NhZ2VCeVJldHVyblN0YXR1c0NvZGUoZXJyb3IpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBcImNvdWxkIG5vdCBsb2FkIGRhdGEgZnJvbTogXCIgKyBlcnJvci51cmw7XG4gICAgICAgIHN3aXRjaCAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgLy8gVE9ETyhic2tpbm5lcik6IGFkZCBwcm90cmFjdG9yIHRlc3QgZm9yIHRoaXMgY2FzZSBieVxuICAgICAgICAgICAgICAgIC8vIHVzaW5nIHBhdGggPSBcImh0dHA6Ly9sb2NhbGhvc3Q6OTk5OS9cIiArIHJlc3RTZWdtZW50LFxuICAgICAgICAgICAgICAgIHJldHVybiBgVW5hYmxlIHRvIGdldCBhIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlci4gQ29kZSAwLlxuKEEpIFRoZSBzZXJ2ZXIgbWF5IG5vdCBleGlzdCBvciBtYXkgbm90IGJlIHJ1bm5pbmcuXG4oQikgVGhlIHNlcnZlciBtYXkgaGF2ZSBmYWlsZWQgdG8gc2V0IHRoZSAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJ1xucmVzcG9uc2UgaGVhZGVyLlxuRXhwZWN0ZWQgdGhlIHNlcnZlciB0byBiZSBhdCAke2dldE9yaWdpbkZyb21QYXRoKGVycm9yLnVybCl9YDtcbiAgICAgICAgICAgICAgICAvLyBPbiAyMDE0LTExLTE4LCBJIGV4cGVyaW1lbnRlZCB3aXRoIHdyaXRpbmcgY29kZSB0aGF0XG4gICAgICAgICAgICAgICAgLy8gZGlyZWN0bHkgdXNlcyBYTUxIdHRwUmVxdWVzdCgpLCByYXRoZXIgdGhhbiB1c2luZ1xuICAgICAgICAgICAgICAgIC8vICRodHRwLmdldCgpLiBJIHdhbnRlZCB0byBzZWUgaWYgSSBjb3VsZCBnZXQgbW9yZSBkZXRhaWxlZFxuICAgICAgICAgICAgICAgIC8vIGVycm9yIGluZm9ybWF0aW9uIHRoYXQgd2F5LCBpbiBvcmRlciB0byBkaXN0aW5ndWlzaFxuICAgICAgICAgICAgICAgIC8vIGJldHdlZW4gZXJyb3JzIChBKSBhbmQgKEIpLiBVbmZvcnR1bmF0ZWx5LCB1c2luZ1xuICAgICAgICAgICAgICAgIC8vIFhNTEh0dHBSZXF1ZXN0KCkgZGlkbid0IGhlbHAuIEhlcmUncyB0aGUgY29kZSBJIHRyaWVkOlxuICAgICAgICAgICAgICAgIC8vICAgICB2YXIgeGhyID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIC8vICAgICB4aHIub3BlbihcIkdFVFwiLCBcImh0dHA6Ly9sb2NhbGhvc3Q6OTk5OS9mb29cIiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIC8vICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7YXNzZXJ0KGZhbHNlKTt9O1xuICAgICAgICAgICAgICAgIC8vICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgICAgICAgICAgLy8gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgYXNzZXJ0KGUubmFtZSA9PT0gXCJOZXR3b3JrRXJyb3JcIik7XG4gICAgICAgICAgICAgICAgLy8gICAgICAvLyBET01FeGNlcHRpb24uTkVUV09SS19FUlIgPT09IDE5XG4gICAgICAgICAgICAgICAgLy8gICAgICBhc3NlcnQoZS5jb2RlID09PSAxOSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICBhc3NlcnQoeGhyLnN0YXR1cyA9PT0gMCk7XG4gICAgICAgICAgICAgICAgLy8gICAgICBhc3NlcnQoeGhyLnN0YXR1c1RleHQgPT09IFwiXCIpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgYXNzZXJ0KHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSA9PT0gXCJcIik7XG4gICAgICAgICAgICAgICAgLy8gICAgfVxuICAgICAgICAgICAgICAgIC8vIEkgdXNlZCB0aGUgYWJvdmUgWE1MSHR0cFJlcXVlc3QoKSBjb2RlIHRvIHRyeSB0d29cbiAgICAgICAgICAgICAgICAvLyBzY2VuYXJpb3M6XG4gICAgICAgICAgICAgICAgLy8gICAoQSkgY29ubmVjdGluZyB0byBhIHNlcnZlciB0aGF0IGRvZXNuJ3QgZXhpc3QuXG4gICAgICAgICAgICAgICAgLy8gICAoQikgY29ubmVjdGluZyB0byBhIHNlcnZlciB0aGF0IGRvZXNuJ3QgcmV0dXJuIGFuXG4gICAgICAgICAgICAgICAgLy8gICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIGFuZFxuICAgICAgICAgICAgICAgIC8vIEluIGJvdGggY2FzZXMgKEEpIGFuZCAoQiksIHRoZSBmb2xsb3dpbmcgd2VyZSB0cnVlOlxuICAgICAgICAgICAgICAgIC8vICAgKDEpIHRoZSB4aHIub25yZWFkeXN0YXRlY2hhbmdlIGNhbGxiYWNrIGlzIG5ldmVyIGNhbGxlZFxuICAgICAgICAgICAgICAgIC8vICAgKDIpIHhoci5zdGF0dXMgaXMgMFxuICAgICAgICAgICAgICAgIC8vICAgKDMpIHhoci5zdGF0dXNUZXh0IGlzIFwiXCJcbiAgICAgICAgICAgICAgICAvLyAgICg0KSB4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgcmV0dXJucyBcIlwiXG4gICAgICAgICAgICAgICAgLy8gICAoNSkgZXhjZXB0aW9uIGlzIHRocm93biBpZiB5b3UgY2FsbCB4aHIgc3luY2hyb25vdXNseVxuICAgICAgICAgICAgICAgIC8vICAgICAgKDVhKSBlLm5hbWUgaXMgXCJOZXR3b3JrRXJyb3JcIlxuICAgICAgICAgICAgICAgIC8vICAgICAgKDViKSBlLmNvZGUgaXMgMTlcbiAgICAgICAgICAgIGNhc2UgNDAxOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIlNlcnZlciBzYXlzIHdlIGFyZSB1bmF1dGhvcml6ZWQgZm9yIFVSTC4gQ29kZSA0MDEuXCI7XG4gICAgICAgICAgICBjYXNlIDQwNDpcbiAgICAgICAgICAgICAgICAvLyBUT0RPKGJza2lubmVyKTogYWRkIHByb3RyYWN0b3IgdGVzdCBmb3IgdGhpcyBjYXNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiU2VydmVyIGRvZXNuJ3QgcmVjb2duaXplIHRoZSByZXF1ZXN0ZWQgVVJMLiBDb2RlIDQwNC5cIjtcbiAgICAgICAgICAgIGNhc2UgNDA1OlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkhUVFAgdmVyYiBub3Qgc3VwcG9ydGVkLiBDb2RlIDQwNS5cIjtcbiAgICAgICAgICAgIGNhc2UgNTAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkludGVybmFsIFNlcnZlciBFcnJvci4gQ29kZSA1MDAuXCI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogZXJyb3Iuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiBlcnJvci5zdGF0dXNUZXh0LFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGVycm9yLnVybFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgbWVzc2FnZUZvckZhaWxlZFRvRmV0Y2hFcnJvcihlcnJvcjogVHlwZUVycm9yKSB7XG4gICAgICAgIHJldHVybiBgVGhlIGJyb3dzZXIgaXMgZ2V0dGluZyBhIFwiJHtlcnJvci50b0xvY2FsZVN0cmluZygpfVwiIHJlc3VsdC5cblRoaXMgbWF5IGJlIGhhcHBlbmluZyBmb3IgYW55IG9mIGEgdmFyaWV0eSBvZiByZWFzb25zLlxuT25lIHBvc3NpYmlsaXR5IGlzIHRoYXQgdGhlcmUgaXMgbm8gc2VydmVyIHJ1bm5pbmcgYXQgdGhlIGFkZHJlc3NcbnRoZSB3ZWIgYnJvd3NlciBleHBlY3RzLiBZb3UgY2FuIHRlc3QgdGhhdCBvdXQgYnkgY29weWluZyB0aGlzIFVSTFxuYW5kIHBhc3RpbmcgaXQgaW4geW91ciBicm93c2VyJ3MgYWRkcmVzcyBiYXI6XG5cbiAgICAke2dldFVybChcImFwaTovL3NtcnQtbGluay9zdGF0dXNcIil9XG5cbklmIHRoZSBzZXJ2ZXIgaXMgcnVubmluZywgeW91IHdpbGwgZ2V0IGEgcmVzdWx0IGxpa2U6XG57XG4gICAgXCJ1dWlkXCI6XCJmYWNlN2YyYS1lY2Y2LTRkMzctYTBlMC01NDM0NTJkZTAzNzlcIixcbiAgICBcInZlcnNpb25cIjpcIjAuNDAuNy1TTkFQU0hPVFwiLFxuICAgIFwiaWRcIjpcInBhY2Jpby5zbXJ0c2VydmljZXMuc21ydGxpbmtfYW5hbHlzaXNcIixcbiAgICBcInVwdGltZVwiOjY3ODQ5LFxuICAgIFwibWVzc2FnZVwiOlwiU2VydmljZXMgaGF2ZSBiZWVuIHVwIGZvciA2Nzg0OSBzZWNzLlwiXG59YDtcbiAgICB9XG5cbiAgICBnZXRFcnJvcigpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvd1tFcnJvclNlcnZpY2UuUEJfRVJST1JfSU5GT107XG4gICAgfVxuXG4gICAgbG9nRXJyb3IocmF3RXJyb3IpIHtcbiAgICAgICAgd2luZG93W0Vycm9yU2VydmljZS5QQl9FUlJPUl9JTkZPXSA9IHJhd0Vycm9yO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyYXdFcnJvcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihyYXdFcnJvcikge1xuICAgICAgICB0aGlzLmxvZ0Vycm9yKHJhd0Vycm9yKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL0Vycm9yXCJdKTtcbiAgICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==