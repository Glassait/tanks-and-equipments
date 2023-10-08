import { booleanAttribute, Component, Input, OnInit } from '@angular/core';
import { MenuPositionX, MenuPositionY } from '@angular/material/menu';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { ButtonThemeEnum } from '../button/enums/button-theme.enum';
import { ButtonTypeEnum } from '../button/enums/button-type.enum';
import { MenuItemType } from './types/menu-item.type';

@Component({
    selector: 'glassait-menu',
    templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
    /**
     * The text of the menu button
     * @example <glassait-menu textMenu="Text menu" [theme]="ModeEnum.DARK" [menuItems]="menuItems"></glassait-menu>
     */
    @Input({ required: true }) textMenu: string;
    /**
     * All the items of the menu
     * @example <glassait-menu textMenu="Text menu" [theme]="ModeEnum.DARK" [menuItems]="menuItems"></glassait-menu>
     */
    @Input({ required: true }) menuItems: MenuItemType[];
    /**
     * Disabled the menu
     */
    @Input({ transform: booleanAttribute }) disabled: boolean;
    /**
     * The vertical position of the item list
     * @example <glassait-menu textMenu="Text menu" [theme]="ModeEnum.DARK" [menuItems]="menuItems" yPosition="above"></glassait-menu>
     * @default 'below'
     */
    @Input() yPosition: MenuPositionY = 'below';
    /**
     * The horizontal position of the item list
     * @example <glassait-menu textMenu="Text menu" [theme]="ModeEnum.DARK" [menuItems]="menuItems" xPosition="before"></glassait-menu>
     * @default 'after'
     */
    @Input() xPosition: MenuPositionX = 'after';
    /**
     * The position of the menu item
     * @example <glassait-menu textMenu="Text menu" [theme]="ModeEnum.DARK" [menuItems]="menuItems" alignItem="END"></glassait-menu>
     * @default 'START'
     */
    @Input() alignItem: 'START' | 'END' = 'START';

    /**
     * The theme of the button
     * @protected
     */
    protected buttonTheme: ButtonThemeEnum;

    /**
     * ENUM
     */
    protected readonly ButtonTypeEnum = ButtonTypeEnum;

    /**
     * The theme of the menu button
     * @example <glassait-menu textMenu="Text menu" [theme]="ModeEnum.DARK" [menuItems]="menuItems"></glassait-menu>
     */
    private _theme: ModeEnum;

    /**
     * @see _theme
     */
    @Input({ required: true })
    get theme(): ModeEnum {
        return this._theme;
    }

    set theme(value: ModeEnum) {
        this._theme = value;
        this.buttonTheme = ButtonThemeEnum[value];
    }

    ngOnInit(): void {
        if (this.disabled) {
            this.buttonTheme =
                this._theme === ModeEnum.DARK
                    ? ButtonThemeEnum.DARK_DISABLED
                    : ButtonThemeEnum.LIGHT_DISABLED;
        }
    }
}
