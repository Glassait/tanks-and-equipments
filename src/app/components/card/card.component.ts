import { booleanAttribute, Component, Input, numberAttribute, OnInit } from '@angular/core';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { ButtonSizeEnum } from '../button/enums/button-size.enum';
import { ButtonThemeEnum } from '../button/enums/button-theme.enum';
import { ButtonTypeEnum } from '../button/enums/button-type.enum';
import { IconColorEnum } from '../icon/enums/icon-enum';
import { IconsType } from '../icon/types/icon.type';
import { AnimationEnum } from '../skeleton-loading/enums/animation.enum';
import { AppearanceEnum } from '../skeleton-loading/enums/appearance.enum';

/**
 * The design system component that use angular material card.<p>
 * The content is pass by ng-content
 *
 * @see https://material.angular.io/components/card/overview
 */
@Component({
    selector: 'glassait-card',
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
    //region INPUT
    /**
     * The title of the card
     * @example <glassait-card title='This is a title' ></glassait-card>
     */
    @Input({ required: true }) title: string;
    /**
     * The subtitle of the card
     * @example <glassait-card subtitle='This is a subtitle' ></glassait-card>
     */
    @Input() subtitle: string;
    /**
     * The icon that play the role of card avatar
     * ! Need {@link avatarColor} to be set
     * @example <glassait-card icon='pencil' [iconColor]="IconColorEnum.DARK"></glassait-card>
     */
    @Input() avatar: IconsType;
    /**
     * The color of the icon
     * ! Needed by {@link avatar}
     * @example <glassait-card icon='pencil' [iconColor]="IconColorEnum.DARK"></glassait-card>
     */
    @Input() avatarColor: IconColorEnum;
    /**
     * Defined if the card has the action part or not
     * ! Need {@link actionText} & {@link actionTheme} & {@link actionCallback} for the action button
     * @example <glassait-card hasAction='true' actionText='action text' [actionTheme]='ButtonThemeEnum.DARK'></glassait-card>
     * @example <glassait-card [hasAction]='true' actionText='action text' [actionTheme]='ButtonThemeEnum.DARK'></glassait-card>
     * @implements booleanAttribute
     * @see ButtonComponent
     */
    @Input({ transform: booleanAttribute }) hasAction: boolean;
    /**
     * The alignement of the action bar<p>
     * ? Useless without {@link hasAction}
     * @example <glassait-card actionAlign='end'></glassait-card>
     * @default 'start'
     */
    @Input() actionAlign: 'start' | 'end' = 'start';
    /**
     * The icon of the action button
     * ? Useless without {@link hasAction}
     * @example <glassait-card actionIcon='pencil'></glassait-card>
     */
    @Input() actionIcon: IconsType;
    /**
     * The text of the action button.
     * ! Needed for the action button
     * ? Useless without {@link hasAction}
     * @example <glassait-card actionText='action text'></glassait-card>
     */
    @Input() actionText: string;
    /**
     * The theme of the action button
     * ! Needed for the action button
     * ? Useless without {@link hasAction}
     * @example <glassait-card [actionTheme]='ButtonThemeEnum.DARK'></glassait-card>
     */
    @Input() actionTheme: ButtonThemeEnum;
    /**
     * The callback launch on click on the action button
     * ! Needed for the action button
     * ? Useless without {@link hasAction}
     */
    @Input() actionCallback: { func: any; parameter: any };
    /**
     * The icon of the action button
     * ? Useless without {@link hasAction}
     * @example <glassait-card actionIcon='pencil' size='50'></glassait-card>
     * @example <glassait-card actionIcon='pencil' [size]='50'></glassait-card>
     * @default 18
     * @implements numberAttribute
     */
    @Input({ transform: numberAttribute }) actionIconSize: number = 18;
    /**
     * Define if the card if display the loading part or not
     * ! Need {@link loadingColor} for the loading display
     * @example <glassait-card isLoading='true' [loadingColor]="ModeEnum.DARK"></glassait-card>
     * @example <glassait-card [isLoading]='true' [loadingColor]="ModeEnum.DARK"></glassait-card>
     * @implements booleanAttribute
     */
    @Input({ transform: booleanAttribute }) isLoading: boolean;
    /**
     * The color of the loading
     * ! Needed for the loading
     * ? Useless without {@link hasAction}
     */
    @Input() loadingColor: ModeEnum;
    //endregion

    //region ENUM
    protected readonly ButtonSizeEnum = ButtonSizeEnum;
    protected readonly ButtonTypeEnum = ButtonTypeEnum;
    protected readonly AnimationEnum = AnimationEnum;
    protected readonly AppearanceEnum = AppearanceEnum;
    //endregion

    //region PROTECTED READONLY
    /**
     * The instance of the javascript window
     * @protected
     */
    protected readonly window = window;
    //endregion

    //region OVERRIDE INPUT
    /**
     * The theme of the card
     * @private
     */
    private _theme: ModeEnum;

    /**
     * Getter of {@link _theme}
     */
    @Input()
    get theme(): ModeEnum {
        return this._theme;
    }

    /**
     * Setter of {@link _theme}
     * @param mode The theme of the card
     * @override avatarColor if not set
     *           actionTheme if not set
     */
    set theme(mode: ModeEnum) {
        this._theme = mode;

        this.avatarColor = mode === ModeEnum.DARK ? IconColorEnum.DARK : IconColorEnum.LIGHT;
        this.actionTheme = mode === ModeEnum.DARK ? ButtonThemeEnum.DARK : ButtonThemeEnum.LIGHT;
    }

    //endregion

    /**
     * Implementation of {@link OnInit} interface
     * @throws Error when {@link avatar} is given but not {@link avatarColor}
     */
    ngOnInit(): void {
        if (!this.isLoading) {
            if (this.avatar && !this.avatarColor) {
                throw new Error('<glassait-card> Avatar given but no color given. Please provide the color of the avatar');
            }
            if (this.hasAction && !this.actionText) {
                throw new Error('<glassait-card> The card has an action but no text given. Please provide the text for the action');
            }
            if (this.hasAction && !this.actionTheme) {
                throw new Error('<glassait-card> The card has an action but no theme given. Please provide the theme for the action');
            }
            if (this.hasAction && !this.actionCallback) {
                throw new Error('<glassait-card> The card has an action but no callback given. Please provide the callback for the action');
            }
        } else if (!this.loadingColor) {
            throw new Error(
                '<glassait-card> The card is in loading display but no loadingColor given. Please provide the loadingColor for the loading display'
            );
        }
    }
}
