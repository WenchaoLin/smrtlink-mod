"use strict";
var sample_setup_model_1 = require("../../data/models/sample-setup-model");
var uuid_1 = require("uuid");
// TODO: Need to improve this
exports.allBindingCalculations = [];
exports.editedBindingCalculations = [];
function newBindingCalculation(copyFrom) {
    var bindingCalculation = new sample_setup_model_1.BindingCalculationModel(copyFrom);
    bindingCalculation.id = uuid_1.v4();
    bindingCalculation.createdAt = new Date().toString();
    // TODO: User current logged in user
    bindingCalculation.createdBy = "John Tester";
    exports.allBindingCalculations.push(bindingCalculation);
    return bindingCalculation;
}
exports.newBindingCalculation = newBindingCalculation;
// TODO: Remove this test data when start using real API
function addExampleDataForTesting() {
    var item;
    item = newBindingCalculation();
    item.name = "Toucan";
    item.createdAt = "4/11/2016, 5:25:03 PM";
    item.createdBy = "John Tester";
    item = newBindingCalculation();
    item.name = "Finch";
    item.createdAt = "4/12/2016, 1:19:06 PM";
    item.createdBy = "Jane Tester";
    item = newBindingCalculation();
    item.name = "Sparrow";
    item.createdAt = "4/14/2016, 4:20:33 PM";
    item.createdBy = "John Tester";
}
addExampleDataForTesting();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWxvcy9zYW1wbGUtc2V0dXAvYmluZGluZy1jYWxjdWxhdGlvbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxtQ0FBd0Msc0NBQXNDLENBQUMsQ0FBQTtBQUMvRSxxQkFBbUIsTUFBTSxDQUFDLENBQUE7QUFFMUIsNkJBQTZCO0FBRWhCLDhCQUFzQixHQUE4QixFQUFFLENBQUM7QUFDdkQsaUNBQXlCLEdBQThCLEVBQUUsQ0FBQztBQUV2RSwrQkFBc0MsUUFBa0M7SUFDcEUsSUFBSSxrQkFBa0IsR0FBNEIsSUFBSSw0Q0FBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RixrQkFBa0IsQ0FBQyxFQUFFLEdBQUcsU0FBRSxFQUFFLENBQUM7SUFDN0Isa0JBQWtCLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckQsb0NBQW9DO0lBQ3BDLGtCQUFrQixDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFFN0MsOEJBQXNCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDaEQsTUFBTSxDQUFDLGtCQUFrQixDQUFDO0FBQzlCLENBQUM7QUFUZSw2QkFBcUIsd0JBU3BDLENBQUE7QUFFRCx3REFBd0Q7QUFDeEQ7SUFDSSxJQUFJLElBQTZCLENBQUM7SUFFbEMsSUFBSSxHQUFHLHFCQUFxQixFQUFFLENBQUM7SUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7SUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyx1QkFBdUIsQ0FBQztJQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUUvQixJQUFJLEdBQUcscUJBQXFCLEVBQUUsQ0FBQztJQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztJQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLHVCQUF1QixDQUFDO0lBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBRS9CLElBQUksR0FBRyxxQkFBcUIsRUFBRSxDQUFDO0lBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0lBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsdUJBQXVCLENBQUM7SUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7QUFDbkMsQ0FBQztBQUVELHdCQUF3QixFQUFFLENBQUMiLCJmaWxlIjoiYXBwL3NpbG9zL3NhbXBsZS1zZXR1cC9iaW5kaW5nLWNhbGN1bGF0aW9uLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCaW5kaW5nQ2FsY3VsYXRpb25Nb2RlbCB9IGZyb20gXCIuLi8uLi9kYXRhL21vZGVscy9zYW1wbGUtc2V0dXAtbW9kZWxcIjtcbmltcG9ydCB7IHY0IH0gZnJvbSBcInV1aWRcIjtcblxuLy8gVE9ETzogTmVlZCB0byBpbXByb3ZlIHRoaXNcblxuZXhwb3J0IGNvbnN0IGFsbEJpbmRpbmdDYWxjdWxhdGlvbnM6IEJpbmRpbmdDYWxjdWxhdGlvbk1vZGVsW10gPSBbXTtcbmV4cG9ydCBjb25zdCBlZGl0ZWRCaW5kaW5nQ2FsY3VsYXRpb25zOiBCaW5kaW5nQ2FsY3VsYXRpb25Nb2RlbFtdID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdCaW5kaW5nQ2FsY3VsYXRpb24oY29weUZyb20/OiBCaW5kaW5nQ2FsY3VsYXRpb25Nb2RlbCk6IEJpbmRpbmdDYWxjdWxhdGlvbk1vZGVsIHtcbiAgICBsZXQgYmluZGluZ0NhbGN1bGF0aW9uOiBCaW5kaW5nQ2FsY3VsYXRpb25Nb2RlbCA9IG5ldyBCaW5kaW5nQ2FsY3VsYXRpb25Nb2RlbChjb3B5RnJvbSk7XG4gICAgYmluZGluZ0NhbGN1bGF0aW9uLmlkID0gdjQoKTtcbiAgICBiaW5kaW5nQ2FsY3VsYXRpb24uY3JlYXRlZEF0ID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xuICAgIC8vIFRPRE86IFVzZXIgY3VycmVudCBsb2dnZWQgaW4gdXNlclxuICAgIGJpbmRpbmdDYWxjdWxhdGlvbi5jcmVhdGVkQnkgPSBcIkpvaG4gVGVzdGVyXCI7XG5cbiAgICBhbGxCaW5kaW5nQ2FsY3VsYXRpb25zLnB1c2goYmluZGluZ0NhbGN1bGF0aW9uKTtcbiAgICByZXR1cm4gYmluZGluZ0NhbGN1bGF0aW9uO1xufVxuXG4vLyBUT0RPOiBSZW1vdmUgdGhpcyB0ZXN0IGRhdGEgd2hlbiBzdGFydCB1c2luZyByZWFsIEFQSVxuZnVuY3Rpb24gYWRkRXhhbXBsZURhdGFGb3JUZXN0aW5nKCkge1xuICAgIGxldCBpdGVtOiBCaW5kaW5nQ2FsY3VsYXRpb25Nb2RlbDtcblxuICAgIGl0ZW0gPSBuZXdCaW5kaW5nQ2FsY3VsYXRpb24oKTtcbiAgICBpdGVtLm5hbWUgPSBcIlRvdWNhblwiO1xuICAgIGl0ZW0uY3JlYXRlZEF0ID0gXCI0LzExLzIwMTYsIDU6MjU6MDMgUE1cIjtcbiAgICBpdGVtLmNyZWF0ZWRCeSA9IFwiSm9obiBUZXN0ZXJcIjtcblxuICAgIGl0ZW0gPSBuZXdCaW5kaW5nQ2FsY3VsYXRpb24oKTtcbiAgICBpdGVtLm5hbWUgPSBcIkZpbmNoXCI7XG4gICAgaXRlbS5jcmVhdGVkQXQgPSBcIjQvMTIvMjAxNiwgMToxOTowNiBQTVwiO1xuICAgIGl0ZW0uY3JlYXRlZEJ5ID0gXCJKYW5lIFRlc3RlclwiO1xuXG4gICAgaXRlbSA9IG5ld0JpbmRpbmdDYWxjdWxhdGlvbigpO1xuICAgIGl0ZW0ubmFtZSA9IFwiU3BhcnJvd1wiO1xuICAgIGl0ZW0uY3JlYXRlZEF0ID0gXCI0LzE0LzIwMTYsIDQ6MjA6MzMgUE1cIjtcbiAgICBpdGVtLmNyZWF0ZWRCeSA9IFwiSm9obiBUZXN0ZXJcIjtcbn1cblxuYWRkRXhhbXBsZURhdGFGb3JUZXN0aW5nKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=