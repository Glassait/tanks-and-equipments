import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { AgreementsRoutingModule } from './agreements-routing.module';
import { AgreementsComponent } from './agreements.component';
import { CardComponent } from '../../components/card/card.component';
import { WordingPipe } from '../../pipes/wording.pipe';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';
import { ButtonComponent } from '../../components/button/button.component';

@NgModule({
    declarations: [AgreementsComponent],
    imports: [CommonModule, AgreementsRoutingModule, NgOptimizedImage, CardComponent, WordingPipe, SentenceCasePipe, ButtonComponent],
})
export class AgreementsModule {}
