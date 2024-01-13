import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card';
import { IconModule } from '../icon/icon.module';
import { ButtonModule } from '../button/button.module';
import { SkeletonLoadingModule } from '../skeleton-loading/skeleton-loading.module';

@NgModule({
    declarations: [CardComponent],
    imports: [CommonModule, MatCardModule, IconModule, ButtonModule, SkeletonLoadingModule],
    exports: [CardComponent],
})
export class CardModule {}
