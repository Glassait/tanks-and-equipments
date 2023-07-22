import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryClass } from '../class/inventory.class';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationClient {
    private header: HttpHeaders
    constructor(
        private http: HttpClient,
        private inventoryClass: InventoryClass
    ) {
        this.header = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json; charset=utf-8'
        })
    }

    public login(): Observable<any> {
        console.log(
            this.http.get(this.inventoryClass.getWargammingApi().login, {
                headers: this.header,
            })
        );

        return this.http.get(this.inventoryClass.getWargammingApi().login, {
            headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }),
        });
    }
}
