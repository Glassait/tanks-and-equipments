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
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { ClanWarComponent } from './components/clan-war/clan-war.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';
import { MenuComponent } from './components/menu/menu.component';
import { SkeletonLoadingComponent } from './components/skeleton-loading/skeleton-loading.component';

// Page
import { AgreementsComponent } from './pages/agreements/agreements.component';
import { ChangelogComponent } from './pages/changelog/changelog.component';
import { HomeComponent } from './pages/home/home.component';
import { SandboxComponent } from './pages/sandbox/sandbox.component';
import { TankEquipmentDescriptionComponent } from './pages/tanks-equipments/tank-equipment-description/tank-equipment-description.component';
import { TanksEquipmentComponent } from './pages/tanks-equipments/tanks-equipment.component';

// Pipe
import { FieldUrlPipe } from './pipes/field/url.pipe';
import { ImagePipe } from './pipes/image/image.pipe';
import { InventoryPipe } from './pipes/inventory.pipe';
import { ReplacePipe } from './pipes/replace/replace.pipe';
import { SentenceCasePipe } from './pipes/sentenceCase/sentence-case.pipe';
import { WordingPipe } from './pipes/wording.pipe';
import { ToStringPipe } from './pipes/to-string.pipe';

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
        FieldUrlPipe,
        SentenceCasePipe,
        ToStringPipe,
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
    providers: [...mockProviders, Title, CookieService, SentenceCasePipe],
})
export class AppModule {}
