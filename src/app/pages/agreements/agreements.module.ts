import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { AgreementsRoutingModule } from './agreements-routing.module';
import { AgreementsComponent } from './agreements.component';
import { CardModule } from '../../components/card/card.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ButtonModule } from '../../components/button/button.module';

@NgModule({
    declarations: [AgreementsComponent],
    imports: [CommonModule, AgreementsRoutingModule, CardModule, PipesModule, ButtonModule, NgOptimizedImage],
})
export class AgreementsModule {}
