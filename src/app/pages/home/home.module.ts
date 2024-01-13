import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardComponent } from '../../components/card/card.component';
import { WordingPipe } from '../../pipes/wording.pipe';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';
import { IconComponent } from '../../components/icon/icon.component';
import { ToStringPipe } from '../../pipes/to-string.pipe';
import { ReplacePipe } from '../../pipes/replace.pipe';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, HomeRoutingModule, CardComponent, WordingPipe, SentenceCasePipe, IconComponent, ToStringPipe, ReplacePipe],
})
export class HomeModule {}
