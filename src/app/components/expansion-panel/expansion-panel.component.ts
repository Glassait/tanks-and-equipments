import { booleanAttribute, Component, Input, OnInit } from '@angular/core';
import { ColorEnum } from '../../commons/enums/color.enum';
import { TankIconType } from '../../commons/types/icons/tank-icon.type';
import { AnimationEnum } from '../skeleton-loading/enums/animation.enum';
import { AppearanceEnum } from '../skeleton-loading/enums/appearance.enum';

@Component({
    selector: 'glassait-expansion-panel',
    templateUrl: './expansion-panel.component.html',
    styleUrls: ['./expansion-panel.component.scss'],
})
export class ExpansionPanelComponent implements OnInit {
    /**
     * The title of the header i.e. the left text.<p>
     * ! ATTENTION : If title and icon are given, the component throw an error
     * @example title="this is a title"
     */
    @Input() title: string;
    /**
     * The icon of the header i.e. the left position.<p>
     * ! ATTENTION : If title and icon are given, the component throw an error
     * @example icon="leopard_1"
     */
    @Input() icon: TankIconType;
    /**
     * The description of the header i.e. the middle text.
     * @example description="description test"
     */
    @Input() description: string;
    /**
     * Show the loading form of the expansion panel
     * @implements booleanAttribute
     * @example [isLoading]="true"
     * @example isLoading="true"
     */
    @Input({ transform: booleanAttribute }) isLoading: boolean;
    /**
     * The color of the skeleton loading
     * @enum ColorEnum
     * @example [color]="ColorEnum.DARK"
     * @see ColorEnum
     */
    @Input({ required: true }) color: ColorEnum;

    /**
     * ENUM
     */
    protected readonly AppearanceEnum = AppearanceEnum;
    protected readonly ColorEnum = ColorEnum;
    protected readonly AnimationEnum = AnimationEnum;

    /**
     * Implementation of {@link OnInit} interface
     * @throws Error When title and icon given
     */
    ngOnInit(): void {
        if (this.title && this.icon) {
            throw new Error('<glassait-expansion-panel>TEXT + ICON given, remove one !');
        }
    }
}
