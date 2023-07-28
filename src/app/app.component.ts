import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [],
})
export class AppComponent {
    @ViewChild('checkBoxDrawer') checkbox: any;

    protected title = 'app';
    protected cssClassTop: string = 'top-0';
    protected cssClassBottom: string = 'bottom-0';

    protected updateCSS() {
        if (this.checkbox.nativeElement.checked) {
            this.cssClassTop = 'top-[5px] rotate-45';
            this.cssClassBottom = 'bottom-[5px] -rotate-45';
        } else {
            this.cssClassTop = 'top-0';
            this.cssClassBottom = 'bottom-0';
        }
    }
}
