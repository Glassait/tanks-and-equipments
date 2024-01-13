import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FooterComponent } from './footer.component';
import { ButtonModule } from '../button/button.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    declarations: [FooterComponent],
    imports: [CommonModule, NgOptimizedImage, ButtonModule, PipesModule],
    exports: [FooterComponent],
})
export class FooterModule {}
