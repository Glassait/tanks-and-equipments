import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './components/main/main.component';
import { AppComponent } from './app.component';
import { ReplacePipe } from './pipes/replace.pipe';
import { TankSmallComponent } from './components/tank-small/tank-small.component';
import { TankFullComponent } from './components/tank-full/tank-full.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ReplacePipe,
    TankSmallComponent,
    TankFullComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
