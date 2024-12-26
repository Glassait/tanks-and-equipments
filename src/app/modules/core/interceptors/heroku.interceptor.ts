import { type HttpHandlerFn, type HttpInterceptorFn, HttpParams, HttpRequest } from '@angular/common/http';
import { MockEnum } from '../enums/mock.enum';
import { environment } from 'env/environment';

export const httpHerokuInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    if ([MockEnum.NO_MOCK].includes(environment.mock)) {
        return next(req);
    }

    const endPoint: string[] = req.url.split('herokuapp.com/');

    if (endPoint.length < 2) {
        return next(req);
    }

    let mockReq: HttpRequest<unknown>;

    if ([MockEnum.EXTERNAL_MOCK].includes(environment.mock)) {
        mockReq = req.clone({
            url: `http://localhost:8080/api/${endPoint[1]}`,
            method: req.method,
        });
    } else {
        mockReq = req.clone({
            url: `mocks/${endPoint[1].replace(/\//g, '.')}.json`,
            params: new HttpParams(),
            method: 'GET',
        });
    }
    return next(mockReq);
};
