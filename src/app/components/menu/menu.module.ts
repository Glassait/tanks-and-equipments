import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { ButtonModule } from '../button/button.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [MenuComponent],
    imports: [CommonModule, ButtonModule, MatMenuModule],
    exports: [MenuComponent],
})
export class MenuModule {}
