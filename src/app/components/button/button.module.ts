import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '../icon/icon.module';
import { SkeletonLoadingModule } from '../skeleton-loading/skeleton-loading.module';

@NgModule({
    declarations: [ButtonComponent],
    imports: [CommonModule, MatButtonModule, IconModule, SkeletonLoadingModule],
    exports: [ButtonComponent],
})
export class ButtonModule {}
