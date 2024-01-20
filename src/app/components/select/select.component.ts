import { booleanAttribute, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { MatSelectModule } from '@angular/material/select';
import { SkeletonLoadingComponent } from '../skeleton-loading/skeleton-loading.component';
import { AppearanceEnum } from '../skeleton-loading/enums/appearance.enum';
import { AnimationEnum } from '../skeleton-loading/enums/animation.enum';
import { SelectThemeEnum } from './enums/select-theme.enum';
import { SelectOptionType } from './types/select-option.type';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'glassait-select',
    standalone: true,
    imports: [MatSelectModule, SkeletonLoadingComponent, FormsModule, ReactiveFormsModule],
    templateUrl: './select.component.html',
    styles: ':host() { @apply block }',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true,
        },
    ],
})
export class SelectComponent implements ControlValueAccessor, OnInit {
    /**
     * The value selected in the mat-select
     */
    public selected: FormControl<string> = new FormControl();

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
        if (this.selected.disabled) {
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
                this.selected.disable();
            }, 1);
        }
    }

    //endregion

    constructor(private readonly changeDetector: ChangeDetectorRef) {}

    //region ANGULAR INTERFACE
    ngOnInit(): void {
        this.selected.valueChanges.subscribe((): void => {
            this.onChange(this.selected.value);
        });
    }

    //endregion

    //region CONTROL VALUE ACCESSORS
    protected onChange: any = (): void => {
        // This is intentional
    };
    protected onTouched: any = (): void => {
        // This is intentional
    };

    writeValue(obj: string): void {
        if (!obj) {
            return;
        }

        this.selected.setValue(obj);
        this.changeDetector.markForCheck();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.selected.disable();
        } else {
            this.selected.enable();
        }
        this.theme = this._theme === SelectThemeEnum.DARK ? ModeEnum.DARK : ModeEnum.LIGHT;
    }

    //endregion
}
