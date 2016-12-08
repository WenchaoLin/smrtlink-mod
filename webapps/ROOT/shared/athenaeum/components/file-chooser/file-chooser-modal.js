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
var file_chooser_1 = require("./file-chooser");
var modal_1 = require("../modal/modal");
var modal_dialog_1 = require("../modal/modal-dialog");
var FileChooserModal = (function () {
    function FileChooserModal(el) {
        this.isHidden = true;
        this.clearSelected = true;
        this.rootPath = String.EMPTY;
        this.cancelButtonIconClass = "fa-times";
        this.cancelButtonText = "cancel";
        this.okButtonIconClass = "fa-check";
        this.okButtonText = "OK";
        this.fileChosen = new core_1.EventEmitter();
        this.errorEvent = new core_1.EventEmitter();
        this.hiddenEvent = new core_1.EventEmitter(false);
        this._el = el;
    }
    FileChooserModal.prototype.ngOnInit = function () {
        var cancel = this._el.nativeElement.querySelector(".cancel i");
        cancel.classList.add(this.cancelButtonIconClass);
        if (!Boolean(this.cancelButtonIconClass)) {
            cancel.style.display = "none";
        }
        var ok = this._el.nativeElement.querySelector(".ok i");
        ok.classList.add(this.okButtonIconClass);
        if (!Boolean(this.okButtonIconClass)) {
            ok.style.display = "none";
        }
    };
    FileChooserModal.prototype.ngAfterViewInit = function () {
        this.dialog.hiddenEvent.subscribe(this.hiddenEvent);
        this.chooser.errorEvent.subscribe(this.errorEvent);
    };
    FileChooserModal.prototype.show = function () {
        this.selectedFile = null;
        this.chooser.reset();
        this.chooser.rootPath = this.rootPath;
        this.dialog.show();
    };
    FileChooserModal.prototype.hide = function () {
        this.dialog.hide();
    };
    Object.defineProperty(FileChooserModal.prototype, "canGo", {
        get: function () {
            return Boolean(this.selectedFile);
        },
        enumerable: true,
        configurable: true
    });
    FileChooserModal.prototype.onCancel = function ($event) {
        this.hide();
    };
    FileChooserModal.prototype.onOK = function ($event) {
        this.hide();
        this.fileChosen.emit(this.selectedFile);
    };
    FileChooserModal.prototype.fileSelected = function (file) {
        this.selectedFile = file;
    };
    __decorate([
        core_1.ViewChild("dialog"), 
        __metadata('design:type', modal_dialog_1.ModalDialog)
    ], FileChooserModal.prototype, "dialog", void 0);
    __decorate([
        core_1.ViewChild("chooser"), 
        __metadata('design:type', file_chooser_1.FileChooser)
    ], FileChooserModal.prototype, "chooser", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileChooserModal.prototype, "rootPath", void 0);
    __decorate([
        core_1.Input("file-filter-fn"), 
        __metadata('design:type', Function)
    ], FileChooserModal.prototype, "fileFilterFn", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileChooserModal.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileChooserModal.prototype, "cancelButtonIconClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileChooserModal.prototype, "cancelButtonText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileChooserModal.prototype, "okButtonIconClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileChooserModal.prototype, "okButtonText", void 0);
    __decorate([
        core_1.Output("file-chosen"), 
        __metadata('design:type', core_1.EventEmitter)
    ], FileChooserModal.prototype, "fileChosen", void 0);
    __decorate([
        core_1.Output("error"), 
        __metadata('design:type', Object)
    ], FileChooserModal.prototype, "errorEvent", void 0);
    FileChooserModal = __decorate([
        core_1.Component({
            selector: "pb-file-chooser-modal",
            moduleId: module.id,
            templateUrl: "file-chooser-modal.html",
            styleUrls: ["file-chooser-modal.css"],
            directives: [
                modal_1.MODAL_DIRECTIVES,
                modal_dialog_1.ModalDialog,
                common_1.CORE_DIRECTIVES,
                file_chooser_1.FileChooser],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], FileChooserModal);
    return FileChooserModal;
}());
exports.FileChooserModal = FileChooserModal;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmlsZS1jaG9vc2VyL2ZpbGUtY2hvb3Nlci1tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEscUJBU08sZUFBZSxDQUFDLENBQUE7QUFFdkIsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFHaEQsNkJBQTBCLGdCQUFnQixDQUFDLENBQUE7QUFDM0Msc0JBQStCLGdCQUFnQixDQUFDLENBQUE7QUFDaEQsNkJBQTBCLHVCQUF1QixDQUFDLENBQUE7QUFjbEQ7SUEwQkksMEJBQVksRUFBYztRQXJCbkIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUV6QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUc1QixhQUFRLEdBQVcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUtoQywwQkFBcUIsR0FBVyxVQUFVLENBQUM7UUFDM0MscUJBQWdCLEdBQVcsUUFBUSxDQUFDO1FBRXBDLHNCQUFpQixHQUFXLFVBQVUsQ0FBQztRQUN2QyxpQkFBWSxHQUFXLElBQUksQ0FBQztRQUVkLGVBQVUsR0FBNEIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDL0QsZUFBVSxHQUFHLElBQUksbUJBQVksRUFBUyxDQUFDO1FBRXhELGdCQUFXLEdBQUcsSUFBSSxtQkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBR2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQ0ksSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRWpELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsS0FBSyxDQUFDLE9B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b29zZXIvZmlsZS1jaG9vc2VyLW1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUsIFBhY2lmaWMgQmlvc2NpZW5jZXMgb2YgQ2FsaWZvcm5pYVxuICpcbiAqIENyZWF0ZWQgYnkgU2FsIFNhbmZpbGlwcG8gPHNzYW5maWxpcHBvQHBhY2lmaWNiaW9zY2llbmNlcy5jb20+IG9uIDMvMjgvMTYuXG4gKi9cblxuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBBZnRlclZpZXdJbml0XG59IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5cbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tIFwiYW5ndWxhcjIvY29tbW9uXCI7XG5cbmltcG9ydCB7RmlsZU1vZGVsLCBGaWxlRmlsdGVyRm59IGZyb20gXCIuLi8uLi9kYXRhL21vZGVscy9scy1tb2RlbFwiO1xuaW1wb3J0IHtGaWxlQ2hvb3Nlcn0gZnJvbSBcIi4vZmlsZS1jaG9vc2VyXCI7XG5pbXBvcnQge01PREFMX0RJUkVDVElWRVN9IGZyb20gXCIuLi9tb2RhbC9tb2RhbFwiO1xuaW1wb3J0IHtNb2RhbERpYWxvZ30gZnJvbSBcIi4uL21vZGFsL21vZGFsLWRpYWxvZ1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwYi1maWxlLWNob29zZXItbW9kYWxcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcImZpbGUtY2hvb3Nlci1tb2RhbC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJmaWxlLWNob29zZXItbW9kYWwuY3NzXCJdLFxuICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgTU9EQUxfRElSRUNUSVZFUyxcbiAgICAgICAgTW9kYWxEaWFsb2csXG4gICAgICAgIENPUkVfRElSRUNUSVZFUyxcbiAgICAgICAgRmlsZUNob29zZXJdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRmlsZUNob29zZXJNb2RhbCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJkaWFsb2dcIikgcHJpdmF0ZSBkaWFsb2c6IE1vZGFsRGlhbG9nO1xuICAgIEBWaWV3Q2hpbGQoXCJjaG9vc2VyXCIpIHByaXZhdGUgY2hvb3NlcjogRmlsZUNob29zZXI7XG5cbiAgICBwdWJsaWMgaXNIaWRkZW46IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHVibGljIGNsZWFyU2VsZWN0ZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBzZWxlY3RlZEZpbGU6IEZpbGVNb2RlbDtcblxuICAgIEBJbnB1dCgpIHJvb3RQYXRoOiBzdHJpbmcgPSBTdHJpbmcuRU1QVFk7XG4gICAgQElucHV0KFwiZmlsZS1maWx0ZXItZm5cIikgZmlsZUZpbHRlckZuOiBGaWxlRmlsdGVyRm47XG5cbiAgICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgY2FuY2VsQnV0dG9uSWNvbkNsYXNzOiBzdHJpbmcgPSBcImZhLXRpbWVzXCI7XG4gICAgQElucHV0KCkgY2FuY2VsQnV0dG9uVGV4dDogc3RyaW5nID0gXCJjYW5jZWxcIjtcblxuICAgIEBJbnB1dCgpIG9rQnV0dG9uSWNvbkNsYXNzOiBzdHJpbmcgPSBcImZhLWNoZWNrXCI7XG4gICAgQElucHV0KCkgb2tCdXR0b25UZXh0OiBzdHJpbmcgPSBcIk9LXCI7XG5cbiAgICBAT3V0cHV0KFwiZmlsZS1jaG9zZW5cIikgZmlsZUNob3NlbjogRXZlbnRFbWl0dGVyPEZpbGVNb2RlbD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dChcImVycm9yXCIpIGVycm9yRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPEVycm9yPigpO1xuXG4gICAgaGlkZGVuRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICAgIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuX2VsID0gZWw7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IGNhbmNlbCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwgaVwiKTtcbiAgICAgICAgY2FuY2VsLmNsYXNzTGlzdC5hZGQodGhpcy5jYW5jZWxCdXR0b25JY29uQ2xhc3MpO1xuXG4gICAgICAgIGlmICghQm9vbGVhbih0aGlzLmNhbmNlbEJ1dHRvbkljb25DbGFzcykpIHtcbiAgICAgICAgICAgIGNhbmNlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvayA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5vayBpXCIpO1xuICAgICAgICBvay5jbGFzc0xpc3QuYWRkKHRoaXMub2tCdXR0b25JY29uQ2xhc3MpO1xuXG4gICAgICAgIGlmICghQm9vbGVhbih0aGlzLm9rQnV0dG9uSWNvbkNsYXNzKSkge1xuICAgICAgICAgICAgb2suc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmRpYWxvZy5oaWRkZW5FdmVudC5zdWJzY3JpYmUodGhpcy5oaWRkZW5FdmVudCk7XG4gICAgICAgIHRoaXMuY2hvb3Nlci5lcnJvckV2ZW50LnN1YnNjcmliZSh0aGlzLmVycm9yRXZlbnQpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jaG9vc2VyLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuY2hvb3Nlci5yb290UGF0aCA9IHRoaXMucm9vdFBhdGg7XG5cbiAgICAgICAgdGhpcy5kaWFsb2cuc2hvdygpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nLmhpZGUoKTtcbiAgICB9XG5cbiAgICBnZXQgY2FuR28oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuc2VsZWN0ZWRGaWxlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DYW5jZWwoJGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbk9LKCRldmVudCkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgdGhpcy5maWxlQ2hvc2VuLmVtaXQodGhpcy5zZWxlY3RlZEZpbGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaWxlU2VsZWN0ZWQoZmlsZTogRmlsZU1vZGVsKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlID0gZmlsZTtcbiAgICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==