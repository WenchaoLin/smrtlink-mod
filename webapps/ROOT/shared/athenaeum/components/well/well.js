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
var common_1 = require("angular2/common");
var WELL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Well; }),
    multi: true
});
var Well = (function () {
    function Well() {
        this.valueChange = new core_1.EventEmitter();
        this._value = String.EMPTY;
        this.disabled = false;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    Object.defineProperty(Well.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this._value !== value) {
                this._value = value;
                this.valueChange.emit(this._value);
                this.onChange(this._value);
            }
            var _a = this.decomposeWellString(), letter = _a.letter, num = _a.num;
            this.letter = letter;
            this.num = num;
        },
        enumerable: true,
        configurable: true
    });
    Well.prototype.writeValue = function (value) {
        this.value = value;
    };
    Well.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    Well.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    Well.prototype.onChangeLetter = function (event) {
        this.letter = event.target.value;
        this.value = this.letter + this.num;
    };
    Well.prototype.onChangeNum = function (event) {
        this.num = event.target.value;
        this.value = this.letter + this.num;
    };
    Well.prototype.ngOnInit = function () {
    };
    Well.prototype.decomposeWellString = function () {
        if (this.value) {
            return {
                letter: this.value.charAt(0),
                num: this.value.slice(1)
            };
        }
        else {
            return {
                letter: String.EMPTY,
                num: String.EMPTY
            };
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Well.prototype, "valueChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Well.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Well.prototype, "value", null);
    Well = __decorate([
        core_1.Component({
            selector: "pb-well",
            moduleId: module.id,
            templateUrl: "well.html",
            styleUrls: ["well.css"],
            bindings: [WELL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], Well);
    return Well;
}());
exports.Well = Well;

//# sourceMappingURL=data:application/json;base64,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QUs7YUFDcEIsQ0FBQztRQUNOLENBQUM7SUFDTCxDQUFDO0lBbkVEO1FBQUMsYUFBTSxFQUFFOzs2Q0FBQTtJQVFUO1FBQUMsWUFBSyxFQUFFOzswQ0FBQTtJQUdSO1FBQUMsWUFBSyxFQUFFOztxQ0FBQTtJQW5CWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLFdBQVc7WUFDeEIsU0FBUyxFQUFFLENBQUUsVUFBVSxDQUFFO1lBQ3pCLFFBQVEsRUFBRSxDQUFDLG1CQUFtQixDQUFDO1NBQ2xDLENBQUM7O1lBQUE7SUF5RUYsV0FBQztBQUFELENBeEVBLEFBd0VDLElBQUE7QUF4RVksWUFBSSxPQXdFaEIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL3dlbGwvd2VsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIFByb3ZpZGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT3V0cHV0fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuaW1wb3J0IHtDb250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gXCJhbmd1bGFyMi9jb21tb25cIjtcblxuY29uc3QgV0VMTF9WQUxVRV9BQ0NFU1NPUiA9IG5ldyBQcm92aWRlcihcbiAgICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB7XG4gICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFdlbGwpLFxuICAgICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbik7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBiLXdlbGxcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIndlbGwuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWyBcIndlbGwuY3NzXCIgXSxcbiAgICBiaW5kaW5nczogW1dFTExfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFdlbGwgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBsZXR0ZXI6IHN0cmluZztcbiAgICBwcml2YXRlIG51bTogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfdmFsdWUgPSBTdHJpbmcuRU1QVFk7XG5cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBsZXR0ZXIsIG51bSB9ID0gdGhpcy5kZWNvbXBvc2VXZWxsU3RyaW5nKCk7XG4gICAgICAgIHRoaXMubGV0dGVyID0gbGV0dGVyO1xuICAgICAgICB0aGlzLm51bSA9IG51bTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHt9KSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBvbkNoYW5nZUxldHRlcihldmVudCkge1xuICAgICAgICB0aGlzLmxldHRlciA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubGV0dGVyICsgdGhpcy5udW07XG4gICAgfVxuXG4gICAgb25DaGFuZ2VOdW0oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5udW0gPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmxldHRlciArIHRoaXMubnVtO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvLyB0aGlzLndyaXRlVmFsdWUodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgZGVjb21wb3NlV2VsbFN0cmluZygpOiBhbnkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBsZXR0ZXI6IHRoaXMudmFsdWUuY2hhckF0KDApLFxuICAgICAgICAgICAgICAgIG51bTogdGhpcy52YWx1ZS5zbGljZSgxKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbGV0dGVyOiBTdHJpbmcuRU1QVFksXG4gICAgICAgICAgICAgICAgbnVtOiBTdHJpbmcuRU1QVFlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2hhbmdlID0gKF8pID0+IHsgfTtcbiAgICBwcml2YXRlIG9uVG91Y2hlZCA9ICgpID0+IHsgfTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==