import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [],
})
export class AppComponent {
    title = 'app';

    protected showHome = false;
    protected showTank = false;
    protected showWar = false;

    constructor(private router: Router) {
        if (router.url === '/') {
            this.showTank = true;
            this.showWar = true;
        }
    }
}
