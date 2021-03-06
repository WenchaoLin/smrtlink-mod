"use strict";
var Enum = (function () {
    function Enum() {
    }
    Enum.fromString = function (enumName, enumType) {
        enumName = enumName.split("_")
            .map(function (i) {
            return i[0].toUpperCase() +
                i.substring(1)
                    .toLowerCase();
        })
            .join("");
        return enumType[enumName];
    };
    Enum.toString = function (enumValue, enumType, pretty) {
        if (pretty === void 0) { pretty = false; }
        return enumType[enumValue].replace(/([A-Z])/g, (pretty) ? " $1" : "$1")
            .trim();
    };
    Enum.toDisplayString = function (enumValue, enumType) {
        return this.toString(enumValue, enumType, true);
    };
    return Enum;
}());
exports.Enum = Enum;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9lbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQTtJQUFBO0lBcUJBLENBQUM7SUFwQmlCLGVBQVUsR0FBeEIsVUFBeUIsUUFBZ0IsRUFBRSxRQUFRO1FBQy9DLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEdBQUcsQ0FBQyxVQUFTLENBQUM7WUFDTixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRTtnQkFDbEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7cUJBQ1osV0FBVyxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDO2FBQ04sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTdCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVhLGFBQVEsR0FBdEIsVUFBdUIsU0FBaUIsRUFBRSxRQUFRLEVBQUUsTUFBdUI7UUFBdkIsc0JBQXVCLEdBQXZCLGNBQXVCO1FBQ3ZFLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDNUMsSUFBSSxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVhLG9CQUFlLEdBQTdCLFVBQThCLFNBQWlCLEVBQUUsUUFBUTtRQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FyQkEsQUFxQkMsSUFBQTtBQXJCWSxZQUFJLE9BcUJoQixDQUFBIiwiZmlsZSI6ImNvbW1vbi9lbnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHNzYW5maWxpcHBvIG9uIDEwLzE5LzE1LlxuICovXG5cbmV4cG9ydCBjbGFzcyBFbnVtIHtcbiAgICBwdWJsaWMgc3RhdGljIGZyb21TdHJpbmcoZW51bU5hbWU6IHN0cmluZywgZW51bVR5cGUpOiBudW1iZXIge1xuICAgICAgICBlbnVtTmFtZSA9IGVudW1OYW1lLnNwbGl0KFwiX1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaVswXS50b1VwcGVyQ2FzZSgpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLnN1YnN0cmluZygxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKFwiXCIpO1xuXG4gICAgICAgIHJldHVybiBlbnVtVHlwZVtlbnVtTmFtZV07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB0b1N0cmluZyhlbnVtVmFsdWU6IG51bWJlciwgZW51bVR5cGUsIHByZXR0eTogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGVudW1UeXBlW2VudW1WYWx1ZV0ucmVwbGFjZSgvKFtBLVpdKS9nLCAocHJldHR5KSA/IFwiICQxXCIgOiBcIiQxXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyaW0oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHRvRGlzcGxheVN0cmluZyhlbnVtVmFsdWU6IG51bWJlciwgZW51bVR5cGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50b1N0cmluZyhlbnVtVmFsdWUsIGVudW1UeXBlLCB0cnVlKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=