import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
})
export class AppComponent {}
