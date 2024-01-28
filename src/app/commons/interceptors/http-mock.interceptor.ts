import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MockEnum } from '../enums/mock.enum';
import { WotApiEnum } from '../enums/wot-api.enum';

@Injectable({
    providedIn: 'root',
})
export class HttpMockInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if ([MockEnum.EXTERNAL_MOCK, MockEnum.FULL_MOCK].includes(environment.mock)) {
            let endPoint: string[] = req.url.split('api.worldoftanks.eu');

            if (endPoint.length === 2) {
                let jsonFile: string = '';
                if (endPoint[1].includes(WotApiEnum.SERVERS)) {
                    jsonFile = WotApiEnum.SERVERS;
                } else if (endPoint[1].includes(WotApiEnum.ONLINE_MEMBERS)) {
                    jsonFile = WotApiEnum.ONLINE_MEMBERS;
                } else if (endPoint[1].includes(WotApiEnum.CLAN_RESERVES)) {
                    jsonFile = WotApiEnum.CLAN_RESERVES;
                } else if (endPoint[1].includes(WotApiEnum.ACTIVATE_CLAN_RESERVES)) {
                    jsonFile = WotApiEnum.ACTIVATE_CLAN_RESERVES;
                }

                const mockReq: HttpRequest<any> = req.clone({
                    url: `/assets/mocks/${jsonFile}.json`,
                    params: new HttpParams(),
                    method: 'GET',
                });
                return next.handle(mockReq);
            }

            endPoint = req.url.split('herokuapp.com/api/');

            if (endPoint.length === 2) {
                if (environment.mock === MockEnum.EXTERNAL_MOCK) {
                    const mockReq: HttpRequest<any> = req.clone({
                        url: `http://localhost:8080/api/${endPoint[1]}`,
                        method: req.method,
                    });
                    return next.handle(mockReq);
                } else {
                    const mockReq: HttpRequest<any> = req.clone({
                        url: `/assets/mocks/${endPoint[1].replace('/', '.').replace(/\?access_token=[0-9a-zA-Z]{40}/, '')}.json`,
                        params: new HttpParams(),
                        method: 'GET',
                    });
                    return next.handle(mockReq);
                }
            }
        }
        return next.handle(req);
    }
}
