import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { forwardRef, NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';

// Component
import { HttpMockInterceptor } from './commons/interceptors/http-mock.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// Page
import { AppComponent } from './app.component';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';

const MOCK_INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    useExisting: forwardRef(() => HttpMockInterceptor),
    multi: true,
};

let mockProviders = [HttpMockInterceptor, MOCK_INTERCEPTOR_PROVIDER];

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
