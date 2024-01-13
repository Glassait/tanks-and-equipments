import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpansionPanelComponent } from './expansion-panel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SkeletonLoadingModule } from '../skeleton-loading/skeleton-loading.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
    declarations: [ExpansionPanelComponent],
    imports: [CommonModule, MatExpansionModule, SkeletonLoadingModule, IconModule],
    exports: [ExpansionPanelComponent],
})
export class ExpansionPanelModule {}
