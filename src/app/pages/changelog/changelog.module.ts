import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangelogRoutingModule } from './changelog-routing.module';
import { ChangelogComponent } from './changelog.component';
import { CardComponent } from '../../components/card/card.component';
import { WordingPipe } from '../../pipes/wording.pipe';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';
import { IconComponent } from '../../components/icon/icon.component';

@NgModule({
    declarations: [ChangelogComponent],
    imports: [CommonModule, ChangelogRoutingModule, CardComponent, WordingPipe, SentenceCasePipe, IconComponent],
})
export class ChangelogModule {}
