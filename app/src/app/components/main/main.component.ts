import { Component } from '@angular/core';
import dataJson from '../../../assets/data.json';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent {
    public datas: any;
    public idDisplayed: number = -1;

    private stateOfDisplay = {
        show: 'block',
        hidden: 'hidden',
    }

    constructor() {
        this.datas = dataJson.data;
    }

    public displayTankConfig(id: number): void {
        this.idDisplayed = id;
    }
}
