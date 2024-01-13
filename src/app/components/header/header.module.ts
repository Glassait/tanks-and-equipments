import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PipesModule } from '../../pipes/pipes.module';
import { MenuModule } from '../menu/menu.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, MatSlideToggleModule, PipesModule, MenuModule, ButtonModule, NgOptimizedImage],
    exports: [HeaderComponent],
})
export class HeaderModule {}
