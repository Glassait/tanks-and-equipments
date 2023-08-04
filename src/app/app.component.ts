import { Component } from '@angular/core';
import { IconRegistryService } from './commons/services/icon-registry.service';
import { chargeurIcon } from './components/icon/files/chargeur';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [],
})
export class AppComponent {
    protected title = 'app';

    constructor(private iconRegistry: IconRegistryService) {
        iconRegistry.register([chargeurIcon]);
    }
}
