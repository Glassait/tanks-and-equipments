import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CardComponent } from '../../components/card/card.component';
import { WordingPipe } from '../../pipes/wording.pipe';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';
import { ReplacePipe } from '../../pipes/replace.pipe';
import { SelectComponent } from '../../components/select/select.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AdminComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        CardComponent,
        WordingPipe,
        SentenceCasePipe,
        ReplacePipe,
        SelectComponent,
        ButtonComponent,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class AdminModule {}
