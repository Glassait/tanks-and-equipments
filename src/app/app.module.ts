import { NgOptimizedImage } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { forwardRef, NgModule, Provider } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule, Title } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpMockInterceptor } from './commons/interceptors/http-mock.interceptor';
import { AgreementsComponent } from './components/agreements/agreements.component';
import { ButtonComponent } from './components/button/button.component';
import { CardChangelogComponent } from './components/card/changelog/card-changelog.component';
import { CardLittleComponent } from './components/card/little/card-little.component';
import { ChangelogComponent } from './components/changelog/changelog.component';
import { ClanWarComponent } from './components/clan-war/clan-war.component';
import { UnsubscribeComponent } from './components/commons/unsubscribe.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { IconComponent } from './components/icon/icon.component';
import { SkeletonLoadingComponent } from './components/skeleton-loading/skeleton-loading.component';
import { TankEquipmentDescriptionComponent } from './components/tanks-equipment/tank-equipment-description/tank-equipment-description.component';
import { TanksEquipmentComponent } from './components/tanks-equipment/tanks-equipment.component';
import { SandboxComponent } from './pages/sandbox/sandbox.component';

import { ClanDataPipe } from './pipes/clanRatings/clan-data.pipe';
import { FieldUrlPipe } from './pipes/field/url.pipe';
import { ImagePipe } from './pipes/image/image.pipe';
import { PathPipe } from './pipes/inventory/path.pipe';
import { ReplacePipe } from './pipes/replace/replace.pipe';
import { SentenceCasePipe } from './pipes/sentenceCase/sentence-case.pipe';
import { AgreementPipe } from './pipes/wording/agreement.pipe';
import { ChangelogPipe } from './pipes/wording/changelog.pipe';
import { FooterPipe } from './pipes/wording/footer.pipe';
import { HeaderPipe } from './pipes/wording/header.pipe';
import { HomePipe } from './pipes/wording/home.pipe';

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
    declarations: [
        // PAGE
        AppComponent,
        HomeComponent,
        TanksEquipmentComponent,
        TankEquipmentDescriptionComponent,
        ClanWarComponent,
        SandboxComponent,
        // COMPONENTS
        IconComponent,
        UnsubscribeComponent,
        FooterComponent,
        ChangelogComponent,
        CardLittleComponent,
        CardChangelogComponent,
        AgreementsComponent,
        SkeletonLoadingComponent,
        HeaderComponent,
        // ANGULAR MATERIAL
        ButtonComponent,
        ExpansionPanelComponent,
        // PIPE
        ImagePipe,
        HeaderPipe,
        ReplacePipe,
        PathPipe,
        HomePipe,
        FieldUrlPipe,
        ClanDataPipe,
        SentenceCasePipe,
        FooterPipe,
        ChangelogPipe,
        AgreementPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatCardModule,
        MatIconModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatSlideToggleModule,
        NgOptimizedImage,
        MatButtonModule,
        NgxSkeletonLoaderModule,
    ],
    providers: [...mockProviders, Title, CookieService],
})
export class AppModule {}
