import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WotApiEnum } from '../enums/wot-api.enum';

@Injectable({
    providedIn: 'root',
})
export class HttpMockInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (!environment.production) {
            const endPoint: string[] = req.url.split('api.worldoftanks.eu');

            if (endPoint.length === 2) {
                let jsonFile: string = '';
                if (endPoint[1].includes(WotApiEnum.SERVERS)) {
                    jsonFile = WotApiEnum.SERVERS;
                } else if (endPoint[1].includes(WotApiEnum.CLANRATINGS)) {
                    jsonFile = WotApiEnum.CLANRATINGS;
                }

                const mockReq = req.clone({
                    url: `/assets/mocks/${jsonFile}.json`,
                    method: 'GET',
                });
                return next.handle(mockReq);
            }
        }
        return next.handle(req);
    }
}
