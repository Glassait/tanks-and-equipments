import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonLoadingComponent } from './skeleton-loading.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
    declarations: [SkeletonLoadingComponent],
    imports: [CommonModule, NgxSkeletonLoaderModule],
    exports: [SkeletonLoadingComponent],
})
export class SkeletonLoadingModule {}
