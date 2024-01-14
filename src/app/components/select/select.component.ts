import { booleanAttribute, Component, Input } from '@angular/core';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { MatSelectModule } from '@angular/material/select';
import { SkeletonLoadingComponent } from '../skeleton-loading/skeleton-loading.component';
import { AppearanceEnum } from '../skeleton-loading/enums/appearance.enum';
import { AnimationEnum } from '../skeleton-loading/enums/animation.enum';
import { SelectThemeEnum } from './enums/select-theme.enum';
import { SelectOptionType } from './types/select-option.type';

@Component({
    selector: 'glassait-select',
    standalone: true,
    imports: [MatSelectModule, SkeletonLoadingComponent],
    templateUrl: './select.component.html',
    styles: ':host() { @apply block }',
})
export class SelectComponent {
    //region INPUT
    /**
     * The floating label of the select
     * @example <glassait-select label="label test" [option]="option"></glassait-select>
     */
    @Input({ required: true }) label: string;
    /**
     * The list of option for the select
     * @example <glassait-select label="label test" [option]="option"></glassait-select>
     */
    @Input({ required: true }) options: SelectOptionType[];
    //endregion

    //region PROTECTED FIELD
    /**
     * The color of the loading component
     * @protected
     */
    protected loadingColor: ModeEnum;
    //endregion

    //region ENUM
    protected readonly AppearanceEnum = AppearanceEnum;
    protected readonly AnimationEnum = AnimationEnum;
    protected readonly ModeEnum = ModeEnum;
    //endregion

    //region OVERRIDE INPUT
    protected _theme: SelectThemeEnum;

    @Input({ required: true })
    get theme(): SelectThemeEnum {
        return this._theme;
    }

    set theme(value: ModeEnum) {
        if (this._disabled) {
            this._theme = value === ModeEnum.DARK ? SelectThemeEnum.DARK_DISABLED : SelectThemeEnum.LIGHT_DISABLED;
        } else {
            this._theme = value === ModeEnum.DARK ? SelectThemeEnum.DARK : SelectThemeEnum.LIGHT;
        }
        this.loadingColor = value === ModeEnum.DARK ? ModeEnum.LIGHT : ModeEnum.DARK;
    }

    /**
     * If the select is loading
     * @example <glassait-select loading="true"></glassait-select>
     * @example <glassait-select [loading]="true"></glassait-select>
     * @implements booleanAttribute
     */
    private _loading: boolean;

    /**
     * Getter for {@link _loading}
     */
    @Input({ transform: booleanAttribute })
    get loading(): boolean {
        return this._loading;
    }

    /**
     * Setter for {@link _loading}
     */
    set loading(value: boolean) {
        this._loading = value;
        if (value) {
            setTimeout((): void => {
                this.disabled = true;
            }, 1);
        }
    }

    /**
     * If the select is disabled
     * @example <glassait-select disabled="true"></glassait-select>
     * @example <glassait-select [disabled]="true"></glassait-select>
     * @implements booleanAttribute
     */
    private _disabled: boolean;

    /**
     * Getter for {@link _disabled}
     */
    @Input({ transform: booleanAttribute })
    get disabled(): boolean {
        return this._disabled;
    }

    /**
     * Setter for {@link _disabled}
     */
    set disabled(value: boolean) {
        this._disabled = value;
        this.theme = this._theme === SelectThemeEnum.DARK ? ModeEnum.DARK : ModeEnum.LIGHT;
    }

    //endregion
}
