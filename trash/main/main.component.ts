import { Component } from '@angular/core';
import dataJson from '../../src/assets/json/data.json';
import { scrollTarget } from 'src/app/commons/class/global';

// @Component({
//     selector: 'app-main',
//     templateUrl: './main.component.html',
// })
export class MainComponent {
    public datas: any[];
    public idDisplayed: number = -1;
    public scrollName = scrollTarget;
    public panelOpenState = false;

    constructor() {
        this.datas = dataJson.data;
        // this.test()
    }

    public displayTankConfig(id: number): void {
        this.idDisplayed = id;
    }

    //https://developers.wargaming.net/reference/all/wot/?application_id=d5cfa347c97b1997c50c1797e2f1cfdc&r_realm=eu
    /*     async test() {
        const response = await fetch('https://api.worldoftanks.eu/wot/clans/info/?application_id=d5cfa347c97b1997c50c1797e2f1cfdc&clan_id=500179430&language=fr');
        const data = await response.json();
        
        console.log(data);
    } */
}
