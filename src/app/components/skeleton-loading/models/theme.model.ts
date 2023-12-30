import { Injectable } from '@angular/core';
import { NgxSkeletonLoaderConfigTheme } from 'ngx-skeleton-loader/lib/ngx-skeleton-loader-config.types';
import { ModeEnum } from '../../../commons/enums/modeEnum';
import { BORDER_RADIUS } from '../../../commons/scss/border-radius.scss';
import { COLORS } from '../../../commons/scss/colors.scss';
import { OPACITY } from '../../../commons/scss/opacity.scss';
import { AppearanceEnum } from '../enums/appearance.enum';

@Injectable({
    providedIn: 'root',
})
export class ThemeModel {
    //region PRIVATE FIELD
    /**
     * The base theme for the skeleton circle
     * @private
     */
    private circle: NgxSkeletonLoaderConfigTheme = {
        'border-radius': BORDER_RADIUS.full,
    };
    /**
     * The base theme for the skeleton line
     * @private
     */
    private line: NgxSkeletonLoaderConfigTheme = {
        'border-radius': BORDER_RADIUS.semi,
        height: '12px',
    };
    /**
     * The base theme for the skeleton fat line
     * @private
     */
    private fatLine: NgxSkeletonLoaderConfigTheme = {
        'border-radius': BORDER_RADIUS.normal,
        height: '25px',
    };
    /**
     * The base theme for the skeleton normal rectangle
     * @private
     */
    private rectangle_normal: NgxSkeletonLoaderConfigTheme = {
        'border-radius': BORDER_RADIUS.normal,
    };
    /**
     * The base theme for the skeleton semi rectangle
     * @private
     */
    private rectangle_semi: NgxSkeletonLoaderConfigTheme = {
        'border-radius': BORDER_RADIUS.semi,
    };
    /**
     * The base theme when dark
     * @private
     */
    private dark: NgxSkeletonLoaderConfigTheme = {
        'background-color': COLORS.secondary['50'],
        opacity: OPACITY['50'],
    };
    /**
     * The base theme when light
     * @private
     */
    private light: NgxSkeletonLoaderConfigTheme = {
        'background-color': COLORS.primary['50'],
        opacity: OPACITY['50'],
    };
    /**
     * The base theme for margin
     * @private
     */
    private margin: NgxSkeletonLoaderConfigTheme = {
        'margin-bottom': '0',
        margin: '0',
    };
    //endregion

    /**
     * Return the constructed theme for the skeleton loading
     * @param appearance The appearance of the skeleton loading
     * @param color Defined the color of the component
     * @param width The width of the skeleton loading. Only use for {@link AppearanceEnum.CIRCLE}, {@link AppearanceEnum.RECTANGLE_SEMI} and {@link AppearanceEnum.RECTANGLE_NORMAL}
     * @param height The height of the skeleton loading. Only use for {@link AppearanceEnum.RECTANGLE_SEMI} and {@link AppearanceEnum.RECTANGLE_NORMAL}
     */
    public constructTheme(appearance: AppearanceEnum, color: ModeEnum, width: string, height: string): NgxSkeletonLoaderConfigTheme {
        const mode: NgxSkeletonLoaderConfigTheme = color === ModeEnum.DARK ? this.dark : this.light;

        switch (appearance) {
            case AppearanceEnum.CIRCLE:
                return { ...this.circle, width: width, height: width, ...mode, ...this.margin };
            case AppearanceEnum.LINE:
                return { ...this.line, width: width, ...mode, ...this.margin };
            case AppearanceEnum.FAT_LINE:
                return { ...this.fatLine, width: width, ...mode, ...this.margin };
            case AppearanceEnum.RECTANGLE_SEMI:
                return {
                    ...this.rectangle_semi,
                    width: width,
                    height: height,
                    ...mode,
                    ...this.margin,
                };
            case AppearanceEnum.RECTANGLE_NORMAL:
                return {
                    ...this.rectangle_normal,
                    width: width,
                    height: height,
                    ...mode,
                    ...this.margin,
                };
        }
    }
}
