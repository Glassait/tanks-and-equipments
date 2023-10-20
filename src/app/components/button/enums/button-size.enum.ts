/**
 * The height of the button
 * * XSMALL -> 20px/1.25rem
 * * SMALL -> 28px/1.75rem
 * * NORMAL -> 36px/2.25rem
 * * LARGE -> 44px/2.75rem
 * * XLARGE -> 52px/3.25rem
 */
export enum ButtonSizeEnum {
    XSMALL = 'XSMALL',
    SMALL = 'SMALL',
    NORMAL = 'NORMAL',
    LARGE = 'LARGE',
    XLARGE = 'XLARGE',
}

/**
 * This enum is the transcription of the previous enum {@link ButtonSizeEnum} in rem
 */
export enum ButtonSizeInRemEnum {
    XSMALL = '1.25rem',
    SMALL = '1.75rem',
    NORMAL = '2.25rem',
    LARGE = '2.75rem',
    XLARGE = '3.25rem',
}
