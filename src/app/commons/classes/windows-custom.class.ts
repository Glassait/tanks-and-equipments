export class WindowsCustom {
    public static getSearch(): string {
        return window.location.search;
    }

    public static getHref(): string {
        return window.location.href;
    }

    public static getDisplay(element: Element): string {
        return window.getComputedStyle(element).display;
    }

    public static setCurrentUrl(url: string | URL): void {
        window.location.replace(url);
    }
}
