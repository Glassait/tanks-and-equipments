import { booleanAttribute, Component, Input, OnInit } from '@angular/core';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { IconColorEnum } from '../icon/enums/icon-enum';
import { IconsType } from '../icon/types/icon.type';
import { AnimationEnum } from '../skeleton-loading/enums/animation.enum';
import { AppearanceEnum } from '../skeleton-loading/enums/appearance.enum';
import { ButtonSizeEnum, ButtonSizeInRemEnum } from './enums/button-size.enum';
import { ButtonThemeEnum } from './enums/button-theme.enum';
import { ButtonTypeEnum } from './enums/button-type.enum';

/**
 * Button component
 */
@Component({
    selector: 'glassait-button',
    templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
    /**
     * Le texte du bouton
     * @example text="button"
     */
    @Input({ required: true }) text: string;
    /**
     * The type of button
     * @example <glassait-button [type]="ButtonTypeEnum.BASIC"></glassait-button>
     * @default ButtonTypeEnum.BASIC
     * @enum ButtonTypeEnum
     * @see ButtonTypeEnum
     */
    @Input() type: ButtonTypeEnum = ButtonTypeEnum.BASIC;
    /**
     * The size of the button
     * @example <glassait-button [size]="ButtonSizeEnum.NORMAL"></glassait-button>
     * @default ButtonSizeEnum.NORMAL
     * @enum ButtonSizeEnum
     * @see ButtonSizeEnum
     */
    @Input() size: ButtonSizeEnum = ButtonSizeEnum.NORMAL;
    /**
     * The left icon of the button<p>
     * @example <glassait-button leftIcon="plus"  [iconColor]="IconColorEnum.DARK"></glassait-button>
     */
    @Input() leftIcon: IconsType;
    /**
     * The right icon of the button<p>
     * @example <glassait-button rightIcon="plus" [iconColor]="IconColorEnum.DARK"></glassait-button>
     */
    @Input() rightIcon: IconsType;
    /**
     * If the button is loading
     * @example <glassait-button rightIcon="plus" loading="true"></glassait-button>
     * @example <glassait-button rightIcon="plus" [loading]="true"></glassait-button>
     * @implements booleanAttribute
     */
    @Input({ transform: booleanAttribute }) loading: boolean;
    /**
     * The color of the icon
     * @protected
     */
    protected iconColor: IconColorEnum;
    /**
     * The color of the loading component
     */
    protected loadingColor: ModeEnum;

    /**
     * ENUM
     */
    protected readonly ButtonTypeEnum = ButtonTypeEnum;
    protected readonly AnimationEnum = AnimationEnum;
    protected readonly AppearanceEnum = AppearanceEnum;
    protected readonly SizeInRemEnum = ButtonSizeInRemEnum;
    protected readonly IconColorEnum = IconColorEnum;

    /**
     * The theme of the button.
     * @private
     */
    private _theme: ButtonThemeEnum;

    /**
     * @see _theme
     */
    @Input({ required: true })
    get theme(): ButtonThemeEnum {
        return this._theme;
    }

    set theme(value: ButtonThemeEnum) {
        this._theme = value;
        this.loadingColor = [
            ButtonThemeEnum.DARK,
            ButtonThemeEnum.DARK_BLUE,
            ButtonThemeEnum.DARK_DISABLED,
        ].includes(value)
            ? ModeEnum.DARK
            : ModeEnum.LIGHT;
        this.iconColor = IconColorEnum[value];
    }

    /**
     * If the button is disabled.<p>
     * @example <glassait-button disabled="true"></glassait-button>
     * @example <glassait-button [disabled]="true"></glassait-button>
     * @default false
     * @implements booleanAttribute
     * @override iconColor
     */
    private _disabled: boolean = false;

    /**
     * @see _disabled
     */
    @Input({ transform: booleanAttribute })
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = value;
        this.setDisabledTheme();
    }

    /**
     * Implementation of {@link OnInit} interface
     */
    ngOnInit(): void {
        if (this._disabled) {
            this.setDisabledTheme();
        }
    }

    /**
     * Set the theme to the disabled one
     * @private
     */
    private setDisabledTheme(): void {
        this.theme = [
            ButtonThemeEnum.DARK,
            ButtonThemeEnum.DARK_BLUE,
            ButtonThemeEnum.DARK_DISABLED,
        ].includes(this._theme)
            ? ButtonThemeEnum.DARK_DISABLED
            : ButtonThemeEnum.LIGHT_DISABLED;
    }
}
