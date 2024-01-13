import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangelogRoutingModule } from './changelog-routing.module';
import { ChangelogComponent } from './changelog.component';
import { CardModule } from '../../components/card/card.module';
import { IconModule } from '../../components/icon/icon.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    declarations: [ChangelogComponent],
    imports: [CommonModule, ChangelogRoutingModule, CardModule, IconModule, PipesModule],
})
export class ChangelogModule {}
