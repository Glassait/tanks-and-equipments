import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MockEnum } from '../enums/mock.enum';

@Injectable({
    providedIn: 'root',
})
export class HttpHerokuInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if ([MockEnum.NO_MOCK].includes(environment.mock)) {
            return next.handle(req);
        }

        const endPoint: string[] = req.url.split('herokuapp.com/api/');

        if (endPoint.length < 2) {
            return next.handle(req);
        }

        let mockReq: HttpRequest<any>;

        if (environment.mock === MockEnum.EXTERNAL_MOCK) {
            mockReq = req.clone({
                url: `http://localhost:8080/api/${endPoint[1]}`,
                method: req.method,
            });
        } else {
            mockReq = req.clone({
                url: `/assets/mocks/${endPoint[1].replace('/', '.').replace(/\?access_token=[0-9a-zA-Z]{40}/, '')}.json`,
                params: new HttpParams(),
                method: 'GET',
            });
        }
        return next.handle(mockReq);
    }
}
