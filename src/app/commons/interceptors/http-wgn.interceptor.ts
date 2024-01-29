import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MockEnum } from '../enums/mock.enum';
import { WotApiEnum } from '../enums/wot-api.enum';

@Injectable({
    providedIn: 'root',
})
export class HttpWgnInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if ([MockEnum.NO_MOCK].includes(environment.mock)) {
            return next.handle(req);
        }

        const endPoint: string[] = req.url.split('api.worldoftanks.eu');

        if (endPoint.length < 2) {
            return next.handle(req);
        }

        let jsonFile: string = '';

        for (const key of Object.keys(WotApiEnum)) {
            if (endPoint[1].includes(WotApiEnum[key as keyof typeof WotApiEnum])) {
                jsonFile = WotApiEnum[key as keyof typeof WotApiEnum];
                break;
            }
        }

        const mockReq: HttpRequest<any> = req.clone({
            url: `/assets/mocks/${jsonFile}.json`,
            params: new HttpParams(),
            method: 'GET',
        });

        return next.handle(mockReq);
    }
}
