/**
 * The default type state for http variable
 */
export type DefaultHttpType = {
    isLoading: boolean;
    isError: boolean;
};

/**
 * The default state for http variable
 * @clone To work is highly recommended to clone this object `{...defaultHttpType}`.
 * Else you will get side effect because this is a global variable
 */
export const defaultHttpType: DefaultHttpType = {
    isLoading: true,
    isError: false,
};
