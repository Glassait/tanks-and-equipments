import { Component, isDevMode } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sandbox',
    templateUrl: './sandbox.component.html',
})
export class SandboxComponent {
    constructor(private router: Router) {
        if (!isDevMode()) {
            this.router.navigate(['/']).then((): void => {
                // Ignored
            });
        }
    }
}
