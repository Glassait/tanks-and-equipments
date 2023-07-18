import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import inventory from 'src/assets/json/inventory.json';

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

    private destroyed$ = new Subject();

    constructor(private router: Router) {
        router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntil(this.destroyed$)
            )
            .subscribe({
                next: event => {
                    this.changeBoolean(event);
                },
            });
    }

    private changeBoolean(route: any) {
        switch (route.url) {
            case this.addSlashToUrl(inventory.path.home):
                this.showTank = true;
                this.showWar = true;
                this.showHome = false;
                break;
            case this.addSlashToUrl(inventory.path.charsEtEquipements):
                this.showTank = false;
                this.showWar = true;
                this.showHome = true;
                break;
        }
    }

    private addSlashToUrl(url: string): string {
        return '/' + url;
    }
}
