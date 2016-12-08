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
var SchemaPropertyPipe = (function () {
    function SchemaPropertyPipe() {
    }
    SchemaPropertyPipe.prototype.transform = function (rawValue, _a) {
        var schemaProperty = _a[0];
        switch (schemaProperty.type) {
            case "integer":
            case "number":
                // return rawValue.toLocaleString();
                var value = parseInt(rawValue, 10);
                return (value || value === 0) ? (value.toLocaleString()) : "";
            case "string":
                var strValue = rawValue;
                if (schemaProperty.format === "date-time") {
                    var date = new Date(rawValue);
                    strValue = date.toLocaleString();
                }
                return strValue;
            default:
                return rawValue;
        }
    };
    SchemaPropertyPipe = __decorate([
        core_1.Pipe({
            name: "schemaProperty"
        }), 
        __metadata('design:paramtypes', [])
    ], SchemaPropertyPipe);
    return SchemaPropertyPipe;
}());
exports.SchemaPropertyPipe = SchemaPropertyPipe;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9waXBlcy9zY2hlbWEtcHJvcGVydHktcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWtDLGVBQWUsQ0FBQyxDQUFBO0FBTWxEO0lBQUE7SUFtQkEsQ0FBQztJQWxCRyxzQ0FBUyxHQUFULFVBQVUsUUFBZ0IsRUFBRSxFQUE2QjtZQUE1QixzQkFBYztRQUN2QyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssUUFBUTtnQkFDVCxvQ0FBb0M7Z0JBQ3BDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDbEUsS0FBSyxRQUFRO2dCQUNULElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDeEIsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDOUIsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDckMsQ0FBQztnQkFDRCxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3BCO2dCQUNJLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDeEIsQ0FBQztJQUNMLENBQUM7SUFyQkw7UUFBQyxXQUFJLENBQUM7WUFDRixJQUFJLEVBQUUsZ0JBQWdCO1NBQ3pCLENBQUM7OzBCQUFBO0lBb0JGLHlCQUFDO0FBQUQsQ0FuQkEsQUFtQkMsSUFBQTtBQW5CWSwwQkFBa0IscUJBbUI5QixDQUFBIiwiZmlsZSI6ImFwcC9waXBlcy9zY2hlbWEtcHJvcGVydHktcGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7SVByb3BlcnR5fSBmcm9tIFwiLi4vZGF0YS9mcmFtZXMvZnJhbWVcIjtcblxuQFBpcGUoe1xuICAgIG5hbWU6IFwic2NoZW1hUHJvcGVydHlcIlxufSlcbmV4cG9ydCBjbGFzcyBTY2hlbWFQcm9wZXJ0eVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0ocmF3VmFsdWU6IHN0cmluZywgW3NjaGVtYVByb3BlcnR5XTogW0lQcm9wZXJ0eV0pOiBhbnkge1xuICAgICAgICBzd2l0Y2ggKHNjaGVtYVByb3BlcnR5LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJpbnRlZ2VyXCI6XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHJhd1ZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcGFyc2VJbnQocmF3VmFsdWUsIDEwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHZhbHVlIHx8IHZhbHVlID09PSAwKSA/ICh2YWx1ZS50b0xvY2FsZVN0cmluZygpKSA6IFwiXCI7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgbGV0IHN0clZhbHVlID0gcmF3VmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHNjaGVtYVByb3BlcnR5LmZvcm1hdCA9PT0gXCJkYXRlLXRpbWVcIikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHJhd1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc3RyVmFsdWUgPSBkYXRlLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJWYWx1ZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhd1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9