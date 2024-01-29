import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { forwardRef, NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { HttpHerokuInterceptor } from './commons/interceptors/http-heroku.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppComponent } from './app.component';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';
import { HttpWgnInterceptor } from './commons/interceptors/http-wgn.interceptor';

const MOCK_HEROKU_INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    useExisting: forwardRef(() => HttpHerokuInterceptor),
    multi: true,
};

const MOCK_WGN_INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    useExisting: forwardRef(() => HttpWgnInterceptor),
    multi: true,
};

let mockProviders = [HttpHerokuInterceptor, MOCK_HEROKU_INTERCEPTOR_PROVIDER, HttpWgnInterceptor, MOCK_WGN_INTERCEPTOR_PROVIDER];

if (environment.production) {
    mockProviders = [];
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent,
        FooterComponent,
    ],
    providers: [...mockProviders, Title, CookieService, SentenceCasePipe],
})
export class AppModule {}
