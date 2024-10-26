import { Component } from '@angular/core';
import { FoldTankCardComponent } from 'fold';

@Component({
    selector: 'home',
    standalone: true,
    imports: [FoldTankCardComponent],
    templateUrl: './home.component.html',
})
export class HomeComponent {
    tank = {
        name: 'object 260',
        nation: 'ussr',
        wotTankName: 'r110_object_260',
        url: '',
        role: 'heavyPush',
        type: 'heavy',
        level: 10,
        priority: 5,
        isReward: true,
    };
}
