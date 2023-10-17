import { Component, Input } from '@angular/core';
import { TankData } from 'src/app/commons/types/tanks-data.type';
import { IconColorEnum } from 'src/app/components/icon/enums/icon-enum';
import { ModeEnum } from '../../../commons/enums/modeEnum';
import { ButtonSizeEnum } from '../../../components/button/enums/button-size.enum';
import { ButtonThemeEnum } from '../../../components/button/enums/button-theme.enum';

@Component({
    selector: 'app-tank-equipment-description',
    templateUrl: './tank-equipment-description.component.html',
})
export class TankEquipmentDescriptionComponent {
    /**
     * The data of the tank
     */
    @Input() data: TankData;
    /**
     * The settings of the user (light or dark mode)
     */
    @Input() mode: ModeEnum;
    /**
     * The size of the screen of the mobile
     */
    @Input() isMobile: boolean;

    /**
     * ENUM
     * @protected
     */
    protected readonly IconColorEnum = IconColorEnum;
    protected readonly ModeEnum = ModeEnum;
    protected readonly ButtonSizeEnum = ButtonSizeEnum;
    protected readonly ButtonThemeEnum = ButtonThemeEnum;

    protected openLink(url: string): void {
        window.open(url, '_blank');
    }
}
