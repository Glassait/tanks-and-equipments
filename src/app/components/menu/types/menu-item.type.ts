/**
 * All the valu possible for the menu item
 */
export type MenuItemType = {
    text: string;
    callback?: () => void;
    externalLink?: string;
    routerLink?: string;
};
