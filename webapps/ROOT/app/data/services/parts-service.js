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
exports.PART_NUMBERS_JSON = new core_1.OpaqueToken("PART_NUMBERS_JSON");
(function (PartType) {
    PartType[PartType["Workflow"] = 0] = "Workflow";
    PartType[PartType["BindingKit"] = 1] = "BindingKit";
    PartType[PartType["TemplatePrepKit"] = 2] = "TemplatePrepKit";
    PartType[PartType["SequencingKit"] = 3] = "SequencingKit";
    PartType[PartType["ControlKit"] = 4] = "ControlKit";
    PartType[PartType["CellPack"] = 5] = "CellPack";
    PartType[PartType["OSEnzyme"] = 6] = "OSEnzyme";
    PartType[PartType["CellMineralOil"] = 7] = "CellMineralOil";
})(exports.PartType || (exports.PartType = {}));
var PartType = exports.PartType;
function isBindingKit(object) {
    return object.type === PartType.BindingKit;
}
exports.isBindingKit = isBindingKit;
function isControlKit(object) {
    return object.type === PartType.ControlKit;
}
exports.isControlKit = isControlKit;
function isSequencingKit(object) {
    return object.type === PartType.SequencingKit;
}
exports.isSequencingKit = isSequencingKit;
function isTemplatePrepKit(object) {
    return object.type === PartType.TemplatePrepKit;
}
exports.isTemplatePrepKit = isTemplatePrepKit;
var prefixMap = {
    WFA: PartType.Workflow,
    BDK: PartType.BindingKit,
    TPK: PartType.TemplatePrepKit,
    SQK: PartType.SequencingKit,
    CCK: PartType.ControlKit,
    CPK: PartType.CellPack,
    OSE: PartType.OSEnzyme,
    CMO: PartType.CellMineralOil
};
var barcodePattern = /^[A-Z0-9]{6}[0-9]{9}[0-9]{6}$/;
var PartsService = (function () {
    function PartsService(json) {
        var _this = this;
        this.parts = {};
        this.bindingKits = {};
        this.controlKits = {};
        this.sequencingKits = {};
        this.templateKits = {};
        json.parts.forEach(function (partJSON) {
            var part = {};
            Object.keys(partJSON).forEach(function (key) {
                var partValue = partJSON[key];
                if (key === "PartNumber") {
                    part.type = prefixMap[partValue.slice(0, 3)];
                    partValue = partValue.slice(4);
                }
                part[key.charAt(0).toLowerCase() + key.slice(1)] = partValue;
            });
            _this.parts[part.partNumber] = part;
            if (isBindingKit(part)) {
                _this.bindingKits[part.partNumber] = part;
            }
            else if (isSequencingKit(part)) {
                _this.sequencingKits[part.partNumber] = part;
            }
            else if (isControlKit(part)) {
                _this.controlKits[part.partNumber] = part;
            }
            else if (isTemplatePrepKit(part)) {
                _this.templateKits[part.partNumber] = part;
            }
        });
    }
    PartsService.prototype.getPart = function (partNumber) {
        var part = this.parts[partNumber];
        if (part) {
            return Object.assign({}, part);
        }
        return null;
    };
    PartsService.prototype.getBindingKit = function (partNumber) {
        var part = this.getPart(partNumber);
        if (part && isBindingKit(part)) {
            return part;
        }
        return null;
    };
    PartsService.prototype.getControlKit = function (partNumber) {
        var part = this.getPart(partNumber);
        if (part && isControlKit(part)) {
            return part;
        }
        return null;
    };
    PartsService.prototype.getSequencingKit = function (partNumber) {
        var part = this.getPart(partNumber);
        if (part && isSequencingKit(part)) {
            return part;
        }
        return null;
    };
    PartsService.prototype.getTemplatePrepKit = function (partNumber) {
        var part = this.getPart(partNumber);
        if (part && isTemplatePrepKit(part)) {
            return part;
        }
        return null;
    };
    PartsService.prototype.fromBarcode = function (barcode) {
        var info = this.parseBarcode(barcode);
        var object = this.parts[info.partNumber];
        if (object) {
            return Object.assign({}, object);
        }
        return null;
    };
    PartsService.prototype.bindingKitFromBarcode = function (barcode) {
        var object = this.fromBarcode(barcode);
        if (object && isBindingKit(object)) {
            return object;
        }
        return null;
    };
    PartsService.prototype.controlKitFromBarcode = function (barcode) {
        var object = this.fromBarcode(barcode);
        if (object && isControlKit(object)) {
            return object;
        }
        return null;
    };
    PartsService.prototype.sequencingKitFromBarcode = function (barcode) {
        var object = this.fromBarcode(barcode);
        if (object && isSequencingKit(object)) {
            return object;
        }
        return null;
    };
    PartsService.prototype.templatePrepKitFromBarcode = function (barcode) {
        var object = this.fromBarcode(barcode);
        if (object && isTemplatePrepKit(object)) {
            return object;
        }
        return null;
    };
    PartsService.prototype.partNumberFromName = function (name) {
        var _this = this;
        var partNumber = String.EMPTY;
        Object.keys(this.parts).some(function (key) {
            var part = _this.parts[key];
            if (part.name === name) {
                partNumber = key;
                return true;
            }
            return false;
        });
        return partNumber;
    };
    PartsService.prototype.parseBarcode = function (barcode) {
        if (!barcodePattern.test(barcode)) {
            return null;
        }
        var lotNumber = barcode.slice(0, 6);
        var rawPartNumber = barcode.slice(6, 15);
        var rawExpDate = barcode.slice(15);
        var partNumber = "%s-%s-%s".sprintf(rawPartNumber.slice(0, 3), rawPartNumber.slice(3, 6), rawPartNumber.slice(6));
        var expDate = "20%s-%s-%s".sprintf(rawExpDate.slice(4), rawExpDate.slice(0, 2), rawExpDate.slice(2, 4));
        return {
            lotNumber: lotNumber,
            partNumber: partNumber,
            expDate: expDate
        };
    };
    PartsService = __decorate([
        __param(0, core_1.Inject(exports.PART_NUMBERS_JSON)), 
        __metadata('design:paramtypes', [Object])
    ], PartsService);
    return PartsService;
}());
exports.PartsService = PartsService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXRhL3NlcnZpY2VzL3BhcnRzLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUFrQyxlQUFlLENBQUMsQ0FBQTtBQUVyQyx5QkFBaUIsR0FBRyxJQUFJLGtCQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQWN0RSxXQUFZLFFBQVE7SUFDaEIsK0NBQVEsQ0FBQTtJQUNSLG1EQUFVLENBQUE7SUFDViw2REFBZSxDQUFBO0lBQ2YseURBQWEsQ0FBQTtJQUNiLG1EQUFVLENBQUE7SUFDViwrQ0FBUSxDQUFBO0lBQ1IsK0NBQVEsQ0FBQTtJQUNSLDJEQUFjLENBQUE7QUFDbEIsQ0FBQyxFQVRXLGdCQUFRLEtBQVIsZ0JBQVEsUUFTbkI7QUFURCxJQUFZLFFBQVEsR0FBUixnQkFTWCxDQUFBO0FBb0JELHNCQUE2QixNQUFXO0lBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxVQUFVLENBQUM7QUFDL0MsQ0FBQztBQUZlLG9CQUFZLGVBRTNCLENBQUE7QUFFRCxzQkFBNkIsTUFBVztJQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsVUFBVSxDQUFDO0FBQy9DLENBQUM7QUFGZSxvQkFBWSxlQUUzQixDQUFBO0FBRUQseUJBQWdDLE1BQVc7SUFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLGFBQWEsQ0FBQztBQUNsRCxDQUFDO0FBRmUsdUJBQWUsa0JBRTlCLENBQUE7QUFFRCwyQkFBa0MsTUFBVztJQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsZUFBZSxDQUFDO0FBQ3BELENBQUM7QUFGZSx5QkFBaUIsb0JBRWhDLENBQUE7QUFRRCxJQUFNLFNBQVMsR0FBRztJQUNkLEdBQUcsRUFBRSxRQUFRLENBQUMsUUFBUTtJQUN0QixHQUFHLEVBQUUsUUFBUSxDQUFDLFVBQVU7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O1FBQ3RDLElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFckMsSUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FDakMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3pCLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUN6QixhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUN6QixDQUFDO1FBQ0YsSUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FDaEMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDbkIsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3RCLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUN6QixDQUFDO1FBRUYsTUFBTSxDQUFDO1lBQ0gsV0FBQSxTQUFTO1lBQ1QsWUFBQSxVQUFVO1lBQ1YsU0FBQSxPQUFPO1NBQ1YsQ0FBQztJQUNOLENBQUM7SUFoSlc7bUJBQUMsYUFBTSxDQUFDLHlCQUFpQixDQUFDOztvQkFBQTtJQWlKMUMsbUJBQUM7QUFBRCxDQXhKQSxBQXdKQyxJQUFBO0FBeEpZLG9CQUFZLGVBd0p4QixDQUFBIiwiZmlsZSI6ImFwcC9kYXRhL3NlcnZpY2VzL3BhcnRzLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wYXF1ZVRva2VuLCBJbmplY3R9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5cbmV4cG9ydCBjb25zdCBQQVJUX05VTUJFUlNfSlNPTiA9IG5ldyBPcGFxdWVUb2tlbihcIlBBUlRfTlVNQkVSU19KU09OXCIpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBhcnRKU09OIHtcbiAgICBOYW1lOiBzdHJpbmc7XG4gICAgRGVzY3JpcHRpb246IHN0cmluZztcbiAgICBQYXJ0TnVtYmVyOiBzdHJpbmc7XG4gICAgSXNPYnNvbGV0ZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXJ0TnVtYmVyc0pTT04ge1xuICAgIHR5cGVNYXA6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nOyB9O1xuICAgIHBhcnRzOiBQYXJ0SlNPTltdO1xufVxuXG5leHBvcnQgZW51bSBQYXJ0VHlwZSB7XG4gICAgV29ya2Zsb3csXG4gICAgQmluZGluZ0tpdCxcbiAgICBUZW1wbGF0ZVByZXBLaXQsXG4gICAgU2VxdWVuY2luZ0tpdCxcbiAgICBDb250cm9sS2l0LFxuICAgIENlbGxQYWNrLFxuICAgIE9TRW56eW1lLFxuICAgIENlbGxNaW5lcmFsT2lsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFydCB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHBhcnROdW1iZXI6IHN0cmluZztcbiAgICB0eXBlOiBQYXJ0VHlwZTtcbiAgICBpc09ic29sZXRlOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJpbmRpbmdLaXQgZXh0ZW5kcyBQYXJ0IHt9XG5leHBvcnQgaW50ZXJmYWNlIENvbnRyb2xLaXQgZXh0ZW5kcyBQYXJ0IHt9XG5leHBvcnQgaW50ZXJmYWNlIFNlcXVlbmNpbmdLaXQgZXh0ZW5kcyBQYXJ0IHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVtcGxhdGVQcmVwS2l0IGV4dGVuZHMgUGFydCB7XG4gICAgbWluSW5zZXJ0U2l6ZTogbnVtYmVyO1xuICAgIG1heEluc2VydFNpemU6IG51bWJlcjtcbiAgICBsZWZ0QWRhcHRvclNlcXVlbmNlOiBzdHJpbmc7XG4gICAgcmlnaHRBZGFwdG9yU2VxdWVuY2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmluZGluZ0tpdChvYmplY3Q6IGFueSk6IG9iamVjdCBpcyBCaW5kaW5nS2l0IHtcbiAgICByZXR1cm4gb2JqZWN0LnR5cGUgPT09IFBhcnRUeXBlLkJpbmRpbmdLaXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbnRyb2xLaXQob2JqZWN0OiBhbnkpOiBvYmplY3QgaXMgQ29udHJvbEtpdCB7XG4gICAgcmV0dXJuIG9iamVjdC50eXBlID09PSBQYXJ0VHlwZS5Db250cm9sS2l0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTZXF1ZW5jaW5nS2l0KG9iamVjdDogYW55KTogb2JqZWN0IGlzIFNlcXVlbmNpbmdLaXQge1xuICAgIHJldHVybiBvYmplY3QudHlwZSA9PT0gUGFydFR5cGUuU2VxdWVuY2luZ0tpdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGVtcGxhdGVQcmVwS2l0KG9iamVjdDogYW55KTogb2JqZWN0IGlzIFRlbXBsYXRlUHJlcEtpdCB7XG4gICAgcmV0dXJuIG9iamVjdC50eXBlID09PSBQYXJ0VHlwZS5UZW1wbGF0ZVByZXBLaXQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFyY29kZUluZm8ge1xuICAgIGxvdE51bWJlcjogc3RyaW5nO1xuICAgIHBhcnROdW1iZXI6IHN0cmluZztcbiAgICBleHBEYXRlOiBzdHJpbmc7XG59XG5cbmNvbnN0IHByZWZpeE1hcCA9IHtcbiAgICBXRkE6IFBhcnRUeXBlLldvcmtmbG93LFxuICAgIEJESzogUGFydFR5cGUuQmluZGluZ0tpdCxcbiAgICBUUEs6IFBhcnRUeXBlLlRlbXBsYXRlUHJlcEtpdCxcbiAgICBTUUs6IFBhcnRUeXBlLlNlcXVlbmNpbmdLaXQsXG4gICAgQ0NLOiBQYXJ0VHlwZS5Db250cm9sS2l0LFxuICAgIENQSzogUGFydFR5cGUuQ2VsbFBhY2ssXG4gICAgT1NFOiBQYXJ0VHlwZS5PU0VuenltZSxcbiAgICBDTU86IFBhcnRUeXBlLkNlbGxNaW5lcmFsT2lsXG59O1xuXG5jb25zdCBiYXJjb2RlUGF0dGVybiA9IC9eW0EtWjAtOV17Nn1bMC05XXs5fVswLTldezZ9JC87XG5cbmV4cG9ydCBjbGFzcyBQYXJ0c1NlcnZpY2Uge1xuICAgIHByaXZhdGUgcGFydHM6IHsgW3BhcnROdW1iZXI6IHN0cmluZ106IFBhcnQ7IH0gPSB7fTtcbiAgICBwcml2YXRlIGJpbmRpbmdLaXRzOiB7IFtwYXJ0TnVtYmVyOiBzdHJpbmddOiBCaW5kaW5nS2l0OyB9ID0ge307XG4gICAgcHJpdmF0ZSBjb250cm9sS2l0czogeyBbcGFydE51bWJlcjogc3RyaW5nXTogQ29udHJvbEtpdDsgfSA9IHt9O1xuICAgIHByaXZhdGUgc2VxdWVuY2luZ0tpdHM6IHsgW3BhcnROdW1iZXI6IHN0cmluZ106IFNlcXVlbmNpbmdLaXQ7IH0gPSB7fTtcbiAgICBwcml2YXRlIHRlbXBsYXRlS2l0czogeyBbcGFydE51bWJlcjogc3RyaW5nXTogVGVtcGxhdGVQcmVwS2l0OyB9ID0ge307XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KFBBUlRfTlVNQkVSU19KU09OKSBqc29uOiBQYXJ0TnVtYmVyc0pTT04pIHtcbiAgICAgICAganNvbi5wYXJ0cy5mb3JFYWNoKHBhcnRKU09OID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnQ6IFBhcnQgPSA8YW55PiB7fTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHBhcnRKU09OKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcnRWYWx1ZSA9IHBhcnRKU09OW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJQYXJ0TnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydC50eXBlID0gcHJlZml4TWFwW3BhcnRWYWx1ZS5zbGljZSgwLCAzKV07XG4gICAgICAgICAgICAgICAgICAgIHBhcnRWYWx1ZSA9IHBhcnRWYWx1ZS5zbGljZSg0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwYXJ0W2tleS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIGtleS5zbGljZSgxKV0gPSBwYXJ0VmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucGFydHNbcGFydC5wYXJ0TnVtYmVyXSA9IHBhcnQ7XG4gICAgICAgICAgICBpZiAoaXNCaW5kaW5nS2l0KHBhcnQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kaW5nS2l0c1twYXJ0LnBhcnROdW1iZXJdID0gcGFydDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTZXF1ZW5jaW5nS2l0KHBhcnQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXF1ZW5jaW5nS2l0c1twYXJ0LnBhcnROdW1iZXJdID0gcGFydDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNDb250cm9sS2l0KHBhcnQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sS2l0c1twYXJ0LnBhcnROdW1iZXJdID0gcGFydDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNUZW1wbGF0ZVByZXBLaXQocGFydCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBsYXRlS2l0c1twYXJ0LnBhcnROdW1iZXJdID0gcGFydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0UGFydChwYXJ0TnVtYmVyOiBzdHJpbmcpOiBQYXJ0IHtcbiAgICAgICAgY29uc3QgcGFydCA9IHRoaXMucGFydHNbcGFydE51bWJlcl07XG4gICAgICAgIGlmIChwYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcGFydCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZ2V0QmluZGluZ0tpdChwYXJ0TnVtYmVyOiBzdHJpbmcpOiBCaW5kaW5nS2l0IHtcbiAgICAgICAgY29uc3QgcGFydCA9IHRoaXMuZ2V0UGFydChwYXJ0TnVtYmVyKTtcbiAgICAgICAgaWYgKHBhcnQgJiYgaXNCaW5kaW5nS2l0KHBhcnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFydDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBnZXRDb250cm9sS2l0KHBhcnROdW1iZXI6IHN0cmluZyk6IENvbnRyb2xLaXQge1xuICAgICAgICBjb25zdCBwYXJ0ID0gdGhpcy5nZXRQYXJ0KHBhcnROdW1iZXIpO1xuICAgICAgICBpZiAocGFydCAmJiBpc0NvbnRyb2xLaXQocGFydCkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJ0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGdldFNlcXVlbmNpbmdLaXQocGFydE51bWJlcjogc3RyaW5nKTogU2VxdWVuY2luZ0tpdCB7XG4gICAgICAgIGNvbnN0IHBhcnQgPSB0aGlzLmdldFBhcnQocGFydE51bWJlcik7XG4gICAgICAgIGlmIChwYXJ0ICYmIGlzU2VxdWVuY2luZ0tpdChwYXJ0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZ2V0VGVtcGxhdGVQcmVwS2l0KHBhcnROdW1iZXI6IHN0cmluZyk6IFRlbXBsYXRlUHJlcEtpdCB7XG4gICAgICAgIGNvbnN0IHBhcnQgPSB0aGlzLmdldFBhcnQocGFydE51bWJlcik7XG4gICAgICAgIGlmIChwYXJ0ICYmIGlzVGVtcGxhdGVQcmVwS2l0KHBhcnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFydDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmcm9tQmFyY29kZShiYXJjb2RlOiBzdHJpbmcpOiBQYXJ0IHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHRoaXMucGFyc2VCYXJjb2RlKGJhcmNvZGUpO1xuICAgICAgICBjb25zdCBvYmplY3QgPSB0aGlzLnBhcnRzW2luZm8ucGFydE51bWJlcl07XG4gICAgICAgIGlmIChvYmplY3QpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBvYmplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGJpbmRpbmdLaXRGcm9tQmFyY29kZShiYXJjb2RlOiBzdHJpbmcpOiBCaW5kaW5nS2l0IHtcbiAgICAgICAgY29uc3Qgb2JqZWN0ID0gdGhpcy5mcm9tQmFyY29kZShiYXJjb2RlKTtcbiAgICAgICAgaWYgKG9iamVjdCAmJiBpc0JpbmRpbmdLaXQob2JqZWN0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb250cm9sS2l0RnJvbUJhcmNvZGUoYmFyY29kZTogc3RyaW5nKTogQ29udHJvbEtpdCB7XG4gICAgICAgIGNvbnN0IG9iamVjdCA9IHRoaXMuZnJvbUJhcmNvZGUoYmFyY29kZSk7XG4gICAgICAgIGlmIChvYmplY3QgJiYgaXNDb250cm9sS2l0KG9iamVjdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc2VxdWVuY2luZ0tpdEZyb21CYXJjb2RlKGJhcmNvZGU6IHN0cmluZyk6IFNlcXVlbmNpbmdLaXQge1xuICAgICAgICBjb25zdCBvYmplY3QgPSB0aGlzLmZyb21CYXJjb2RlKGJhcmNvZGUpO1xuICAgICAgICBpZiAob2JqZWN0ICYmIGlzU2VxdWVuY2luZ0tpdChvYmplY3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRlbXBsYXRlUHJlcEtpdEZyb21CYXJjb2RlKGJhcmNvZGU6IHN0cmluZyk6IFRlbXBsYXRlUHJlcEtpdCB7XG4gICAgICAgIGNvbnN0IG9iamVjdCA9IHRoaXMuZnJvbUJhcmNvZGUoYmFyY29kZSk7XG4gICAgICAgIGlmIChvYmplY3QgJiYgaXNUZW1wbGF0ZVByZXBLaXQob2JqZWN0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwYXJ0TnVtYmVyRnJvbU5hbWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHBhcnROdW1iZXIgPSBTdHJpbmcuRU1QVFk7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMucGFydHMpLnNvbWUoa2V5ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnQgPSB0aGlzLnBhcnRzW2tleV07XG4gICAgICAgICAgICBpZiAocGFydC5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgcGFydE51bWJlciA9IGtleTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwYXJ0TnVtYmVyO1xuICAgIH1cblxuICAgIHBhcnNlQmFyY29kZShiYXJjb2RlOiBzdHJpbmcpOiBCYXJjb2RlSW5mbyB7XG4gICAgICAgIGlmICghYmFyY29kZVBhdHRlcm4udGVzdChiYXJjb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb3ROdW1iZXIgPSBiYXJjb2RlLnNsaWNlKDAsIDYpO1xuICAgICAgICBjb25zdCByYXdQYXJ0TnVtYmVyID0gYmFyY29kZS5zbGljZSg2LCAxNSk7XG4gICAgICAgIGNvbnN0IHJhd0V4cERhdGUgPSBiYXJjb2RlLnNsaWNlKDE1KTtcblxuICAgICAgICBjb25zdCBwYXJ0TnVtYmVyID0gXCIlcy0lcy0lc1wiLnNwcmludGYoXG4gICAgICAgICAgICByYXdQYXJ0TnVtYmVyLnNsaWNlKDAsIDMpLFxuICAgICAgICAgICAgcmF3UGFydE51bWJlci5zbGljZSgzLCA2KSxcbiAgICAgICAgICAgIHJhd1BhcnROdW1iZXIuc2xpY2UoNilcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZXhwRGF0ZSA9IFwiMjAlcy0lcy0lc1wiLnNwcmludGYoXG4gICAgICAgICAgICByYXdFeHBEYXRlLnNsaWNlKDQpLFxuICAgICAgICAgICAgcmF3RXhwRGF0ZS5zbGljZSgwLCAyKSxcbiAgICAgICAgICAgIHJhd0V4cERhdGUuc2xpY2UoMiwgNClcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG90TnVtYmVyLFxuICAgICAgICAgICAgcGFydE51bWJlcixcbiAgICAgICAgICAgIGV4cERhdGVcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=