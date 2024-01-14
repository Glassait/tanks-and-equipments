import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CardComponent } from '../../components/card/card.component';
import { WordingPipe } from '../../pipes/wording.pipe';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';

@NgModule({
    declarations: [AdminComponent],
    imports: [CommonModule, AdminRoutingModule, CardComponent, WordingPipe, SentenceCasePipe],
})
export class AdminModule {}
