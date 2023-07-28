import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HomeComponent } from './components/home/home.component';
import { TanksEquipmentComponent } from './components/tanks-equipment/tanks-equipment.component';
import { TankEquipmentDescriptionComponent } from './components/tanks-equipment/tank-equipment-description/tank-equipment-description.component';
import { ClanWarComponent } from './components/clan-war/clan-war.component';
import { ClanMembersComponent } from './components/clan-members/clan-members.component';
import { HeaderComponent } from './components/header/header.component';

import { ImagePipe } from './pipes/image/image.pipe';
import { ReplacePipe } from './pipes/replace/replace.pipe';

@NgModule({
    declarations: [
        AppComponent,
        ReplacePipe,
        HomeComponent,
        TanksEquipmentComponent,
        TankEquipmentDescriptionComponent,
        ClanWarComponent,
        ClanMembersComponent,
        HeaderComponent,
        ImagePipe,
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
        MatSidenavModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
