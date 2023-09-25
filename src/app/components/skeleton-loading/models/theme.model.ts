import { Injectable } from '@angular/core';
import { NgxSkeletonLoaderConfigTheme } from 'ngx-skeleton-loader/lib/ngx-skeleton-loader-config.types';
import { BORDER_RADIUS } from '../../../commons/scss/border-radius.scss';
import { COLORS } from '../../../commons/scss/colors.scss';
import { OPACITY } from '../../../commons/scss/opacity.scss';
import { AppearanceEnum } from '../enums/appearance.enum';

@Injectable({
    providedIn: 'root',
})
export class ThemeModel {
    private circle: NgxSkeletonLoaderConfigTheme = {
        'border-radius': BORDER_RADIUS.full,
    };
    private line: NgxSkeletonLoaderConfigTheme = {
        'border-radius': BORDER_RADIUS.semi,
        height: '12px',
    };
    private fatLine: NgxSkeletonLoaderConfigTheme = {
        'border-radius': BORDER_RADIUS.normal,
        height: '25px',
    };
    private rectangle_normal: NgxSkeletonLoaderConfigTheme = {
        'border-radius': BORDER_RADIUS.normal,
    };
    private rectangle_semi: NgxSkeletonLoaderConfigTheme = {
        'border-radius': BORDER_RADIUS.semi,
    };
    private dark: NgxSkeletonLoaderConfigTheme = {
        'background-color': COLORS.secondary['50'],
        opacity: OPACITY['50'],
    };
    private light: NgxSkeletonLoaderConfigTheme = {
        'background-color': COLORS.primary['50'],
        opacity: OPACITY['50'],
    };

    /**
     * Return the constructed theme for the skeleton loading
     * @param appearance The appearance of the skeleton loading
     * @param isDarkMode If the display is for dark mode
     * @param width The width of the skeleton loading. Only use for {@link AppearanceEnum.CIRCLE}, {@link AppearanceEnum.RECTANGLE_SEMI} and {@link AppearanceEnum.RECTANGLE_NORMAL}
     * @param height The height of the skeleton loading. Only use for {@link AppearanceEnum.RECTANGLE_SEMI} and {@link AppearanceEnum.RECTANGLE_NORMAL}
     */
    public constructTheme(
        appearance: AppearanceEnum,
        isDarkMode: boolean,
        width: number | string,
        height: number | string
    ): NgxSkeletonLoaderConfigTheme {
        const mode: { extendsFromRoot?: boolean; [p: string]: any } | null =
            isDarkMode ? this.dark : this.light;

        switch (appearance) {
            case AppearanceEnum.CIRCLE:
                return {
                    ...this.circle,
                    width: width.toString(),
                    height: width.toString(),
                    ...mode,
                };
            case AppearanceEnum.LINE:
                return { ...this.line, ...mode };
            case AppearanceEnum.FAT_LINE:
                return { ...this.fatLine, ...mode };
            case AppearanceEnum.RECTANGLE_SEMI:
                return {
                    ...this.rectangle_semi,
                    width: width.toString(),
                    height: height.toString(),
                    ...mode,
                };
            case AppearanceEnum.RECTANGLE_NORMAL:
                return {
                    ...this.rectangle_normal,
                    width: width.toString(),
                    height: height.toString(),
                    ...mode,
                };
        }
    }
}
