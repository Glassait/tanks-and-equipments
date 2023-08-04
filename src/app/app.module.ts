import { NgModule, Provider, forwardRef } from '@angular/core';
import { HttpMockInterceptor } from './commons/interceptors/http-mock.interceptor';
import { environment } from 'src/environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TanksEquipmentComponent } from './components/tanks-equipment/tanks-equipment.component';
import { TankEquipmentDescriptionComponent } from './components/tanks-equipment/tank-equipment-description/tank-equipment-description.component';
import { ClanWarComponent } from './components/clan-war/clan-war.component';
import { ClanMembersComponent } from './components/clan-members/clan-members.component';
import { HeaderComponent } from './components/header/header.component';
import { CardLittleComponent } from './components/card-little/card-little.component';
import { IconComponent } from './components/icon/icon.component';

import { ImagePipe } from './pipes/image/image.pipe';
import { ReplacePipe } from './pipes/replace/replace.pipe';
import { HeaderPipe } from './pipes/wording/header.pipe';
import { FeatureFlippingPipe } from './pipes/inventory/feature-flipping.pipe';
import { PathPipe } from './pipes/inventory/path.pipe';
import { HomePipe } from './pipes/wording/home.pipe';
import { TextPipe } from './pipes/information/text.pipe';
import { UrlPipe } from './pipes/information/url.pipe';
import { LinkTextPipe } from './pipes/information/link-text.pipe';
import { DataPipe } from './pipes/tank/data.pipe';
import { FieldUrlPipe } from './pipes/field/url.pipe';

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
    declarations: [
        AppComponent,
        HomeComponent,
        TanksEquipmentComponent,
        TankEquipmentDescriptionComponent,
        ClanWarComponent,
        ClanMembersComponent,
        HeaderComponent,
        CardLittleComponent,
        IconComponent,
        ImagePipe,
        HeaderPipe,
        ReplacePipe,
        FeatureFlippingPipe,
        PathPipe,
        HomePipe,
        TextPipe,
        UrlPipe,
        LinkTextPipe,
        DataPipe,
        FieldUrlPipe,
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
    ],
    providers: [...mockProviders],
    bootstrap: [AppComponent],
})
export class AppModule {}
