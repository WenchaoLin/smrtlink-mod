"use strict";
var Rx_1 = require("rxjs/Rx");
var SiloService = (function () {
    function SiloService() {
        this.state = new Rx_1.BehaviorSubject({});
    }
    SiloService.prototype.setState = function (state) {
        var current = this.state.getValue();
        this.state.next(Object.assign({}, current, state));
    };
    return SiloService;
}());
exports.SiloService = SiloService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9zaWxvLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG1CQUE4QixTQUFTLENBQUMsQ0FBQTtBQUV4QztJQUFBO1FBQ0ksVUFBSyxHQUFHLElBQUksb0JBQWUsQ0FBVSxFQUFFLENBQUMsQ0FBQztJQU03QyxDQUFDO0lBSkcsOEJBQVEsR0FBUixVQUFTLEtBQVE7UUFDYixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDTCxrQkFBQztBQUFELENBUEEsQUFPQyxJQUFBO0FBUFksbUJBQVcsY0FPdkIsQ0FBQSIsImZpbGUiOiJhcHAvc2lsb3Mvc2lsby1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gXCJyeGpzL1J4XCI7XG5cbmV4cG9ydCBjbGFzcyBTaWxvU2VydmljZTxUPiB7XG4gICAgc3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFQ+KDxhbnk+IHt9KTtcblxuICAgIHNldFN0YXRlKHN0YXRlOiBUKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLnN0YXRlLmdldFZhbHVlKCk7XG4gICAgICAgIHRoaXMuc3RhdGUubmV4dChPYmplY3QuYXNzaWduKHt9LCBjdXJyZW50LCBzdGF0ZSkpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==