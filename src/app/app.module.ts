import { NgOptimizedImage } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { forwardRef, NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

// Component
import { AppComponent } from './app.component';
import { HttpMockInterceptor } from './commons/interceptors/http-mock.interceptor';
import { AgreementsComponent } from './components/agreements/agreements.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { CardChangelogComponent } from './components/card/changelog/card-changelog.component';
import { CardLittleComponent } from './components/card/little/card-little.component';
import { ChangelogComponent } from './components/changelog/changelog.component';
import { ClanWarComponent } from './components/clan-war/clan-war.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';
import { MenuComponent } from './components/menu/menu.component';
import { SkeletonLoadingComponent } from './components/skeleton-loading/skeleton-loading.component';
import { TankEquipmentDescriptionComponent } from './components/tanks-equipment/tank-equipment-description/tank-equipment-description.component';
import { TanksEquipmentComponent } from './components/tanks-equipment/tanks-equipment.component';

// Page
import { HomeComponent } from './pages/home/home.component';
import { SandboxComponent } from './pages/sandbox/sandbox.component';

// Pipe
import { ClanDataPipe } from './pipes/clanRatings/clan-data.pipe';
import { FieldUrlPipe } from './pipes/field/url.pipe';
import { ImagePipe } from './pipes/image/image.pipe';
import { InventoryPipe } from './pipes/inventory.pipe';
import { ReplacePipe } from './pipes/replace/replace.pipe';
import { SentenceCasePipe } from './pipes/sentenceCase/sentence-case.pipe';
import { WordingPipe } from './pipes/wording.pipe';
import { AgreementPipe } from './pipes/wording/agreement.pipe';
import { ChangelogPipe } from './pipes/wording/changelog.pipe';
import { FooterPipe } from './pipes/wording/footer.pipe';
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
        CardComponent,
        MenuComponent,
        // PIPE
        ImagePipe,
        WordingPipe,
        ReplacePipe,
        InventoryPipe,
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
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [...mockProviders, Title, CookieService],
})
export class AppModule {}
