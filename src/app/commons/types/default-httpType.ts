/**
 * The default type state for http variable
 */
export type DefaultHttpType = {
    isLoading: boolean;
    isError: boolean;
};

/**
 * The default state for http variable
 */
export const defaultHttpType: DefaultHttpType = {
    isLoading: true,
    isError: false,
};
