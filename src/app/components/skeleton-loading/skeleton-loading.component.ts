import { booleanAttribute, Component, Input } from '@angular/core';
import { NgxSkeletonLoaderConfigTheme } from 'ngx-skeleton-loader/lib/ngx-skeleton-loader-config.types';
import { AnimationEnum } from './enums/animation.enum';
import { AppearanceEnum } from './enums/appearance.enum';
import { ThemeModel } from './models/theme.model';

/**
 * This component use the npm library for create skeleton loading.
 * @see https://www.npmjs.com/package/ngx-skeleton-loader#setup
 */
@Component({
    selector: 'glassait-skeleton-loading',
    templateUrl: './skeleton-loading.component.html',
})
export class SkeletonLoadingComponent {
    /**
     * The number of element wanted. (1 by default)
     */
    @Input() count: number = 1;
    /**
     * The type of animation wanted. (progress by default)
     * @see AnimationEnum
     */
    @Input() animation: AnimationEnum = AnimationEnum.PROGRESS;
    /**
     * If the skeleton loading need to be in dark mode. (false by default)
     */
    @Input({ transform: booleanAttribute }) isDarkMode: boolean = false;
    /**
     * The width of the skeleton loading. (40px by default)
     */
    @Input() width: number | string = '40px';
    /**
     * The height of the skeleton loading. (40px by default)
     */
    @Input() height: number | string = '40px';

    /**
     * The traduction of the lchp different appearance in ngx appearance
     * @protected
     */
    protected ngxAppearance: 'circle' | 'line';
    /**
     * The theme of the skeleton loading
     * @see ThemeModel
     * @protected
     */
    protected ngxTheme: NgxSkeletonLoaderConfigTheme;

    constructor(private themeModel: ThemeModel) {}

    /**
     * The appearance of skeleton loading wanted. (line by default)
     * @see AppearanceEnum
     */
    private _appearance: AppearanceEnum;

    /**
     * @see _appearance
     */
    @Input({ required: true })
    get appearance(): AppearanceEnum {
        return this._appearance;
    }

    set appearance(appearance: AppearanceEnum) {
        this._appearance = appearance;
        this.ngxSetter();
    }

    /**
     * Set the {@link ngxAppearance} and the {@link ngxTheme} from the input {@link _appearance}
     * @see ThemeModel
     * @private
     */
    private ngxSetter(): void {
        switch (this._appearance) {
            case AppearanceEnum.CIRCLE:
                this.ngxAppearance = 'circle';
                break;
            case AppearanceEnum.LINE:
                this.ngxAppearance = 'line';
                break;
            case AppearanceEnum.FAT_LINE:
                this.ngxAppearance = 'line';
                break;
            case AppearanceEnum.RECTANGLE_SEMI:
                this.ngxAppearance = 'circle';
                break;
            case AppearanceEnum.RECTANGLE_NORMAL:
                this.ngxAppearance = 'circle';
                break;
        }

        this.ngxTheme = this.themeModel.constructTheme(
            this._appearance,
            this.isDarkMode,
            this.width,
            this.height
        );
    }
}
