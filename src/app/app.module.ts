import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReplacePipe } from './pipes/replace.pipe';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HeaderComponent } from './components/global/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { TanksEquipmentComponent } from './components/tanks-equipment/tanks-equipment.component';
import { TankEquipmentDescriptionComponent } from './components/tanks-equipment/tank-equipment-description/tank-equipment-description.component';
import { ClanWarComponent } from './components/clan-war/clan-war.component';
import { ClanMembersComponent } from './components/clan-members/clan-members.component';

@NgModule({
    declarations: [AppComponent, ReplacePipe, HeaderComponent, HomeComponent, TanksEquipmentComponent, TankEquipmentDescriptionComponent, ClanWarComponent, ClanMembersComponent],
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
