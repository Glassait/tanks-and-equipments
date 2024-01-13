import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardModule } from '../../components/card/card.module';
import { PipesModule } from '../../pipes/pipes.module';
import { IconModule } from '../../components/icon/icon.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, HomeRoutingModule, CardModule, PipesModule, IconModule],
})
export class HomeModule {}
