import { booleanAttribute, Component, HostListener, Input, OnInit } from '@angular/core';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { IconColorEnum } from '../icon/enums/icon-enum';
import { TankIconType } from '../icon/types/tank-icon.type';
import { AnimationEnum } from '../skeleton-loading/enums/animation.enum';
import { AppearanceEnum } from '../skeleton-loading/enums/appearance.enum';

/**
 * This component manage the angular material expansion-panel.<p>
 * * The header is manage by the input
 * * The content is pass by <ng-content>
 * @example
 * <glassait-expansion-panel [color]='ColorEnum.DARK' description='test' title='TITLE'>
 *      Ceci est un text simple
 * </glassait-expansion-panel>
 * @see https://material.angular.io/components/expansion/overview
 */
@Component({
    selector: 'glassait-expansion-panel',
    templateUrl: './expansion-panel.component.html',
    styleUrls: ['./expansion-panel.component.scss'],
})
export class ExpansionPanelComponent implements OnInit {
    /**
     * The title of the header i.e. the left text.<p>
     * ! ATTENTION : If title and icon are given, the component throw an error
     * @example <glassait-expansion-panel title="this is a title"></glassait-expansion-panel>
     */
    @Input() title: string;
    /**
     * The icon of the header i.e. the left position.<p>
     * ! ATTENTION : If title and icon are given, the component throw an error
     * @example <glassait-expansion-panel icon="leopard_1"></glassait-expansion-panel>
     */
    @Input() icon: TankIconType | string;
    /**
     * The description of the header i.e. the middle text.
     * @example <glassait-expansion-panel description="description test"></glassait-expansion-panel>
     */
    @Input() description: string;
    /**
     * Show the loading form of the expansion panel
     * @example <glassait-expansion-panel [isLoading]="true"></glassait-expansion-panel>
     * @example <glassait-expansion-panel isLoading="true"></glassait-expansion-panel>
     * @implements booleanAttribute
     */
    @Input({ transform: booleanAttribute }) isLoading: boolean;
    /**
     * The color of the skeleton loading
     * @example <glassait-expansion-panel [color]="ColorEnum.DARK"></glassait-expansion-panel>
     * @enum ColorEnum
     * @see ColorEnum
     */
    @Input({ required: true }) color: ModeEnum;

    /**
     * ENUM
     */
    protected readonly AppearanceEnum = AppearanceEnum;
    protected readonly ColorEnum = ModeEnum;
    protected readonly AnimationEnum = AnimationEnum;
    protected readonly IconColorEnum = IconColorEnum;

    /**
     * Define if the screen width is the width of a mobile
     * @protected
     */
    protected isMobile: boolean;

    /**
     * Implementation of {@link OnInit} interface
     * @throws Error When title and icon given
     */
    ngOnInit(): void {
        if (this.title && this.icon) {
            throw new Error('<glassait-expansion-panel>TEXT + ICON given, remove one !');
        }
        this.setIsMobile();
    }

    @HostListener('window:resize', ['$event'])
    protected onResize(_event: any): void {
        this.setIsMobile();
    }

    /**
     * Set the field {@link isMobile} from de width of the window
     * @private
     */
    private setIsMobile(): void {
        this.isMobile = window.innerWidth <= 320;
    }
}
