import { Directive, ElementRef, HostBinding, HostListener, inject, input, type InputSignal } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: 'button[fold-link], a[fold-link]',
    standalone: true,
})
export class FoldLinkDirective {
    public url: InputSignal<string> = input.required();

    public openInNew: InputSignal<boolean> = input(false);

    public disabled: InputSignal<boolean> = input(false);

    @HostBinding('attr.href')
    get href(): string | null {
        return !this.disabled() && !this.isButton() && this.url()?.startsWith('http') ? this.url() : null;
    }

    @HostBinding('attr.target')
    get target(): string | null {
        return !this.disabled() && !this.isButton() && this.url()?.startsWith('http') && this.openInNew() ? '_blank' : null;
    }

    @HostBinding('attr.rel')
    get rel(): string | null {
        return !this.disabled() && !this.isButton() && this.url()?.startsWith('http') && this.openInNew() ? 'noreferrer' : null;
    }

    @HostBinding('attr.disabled')
    get attrDisabled(): boolean | null {
        return this.disabled() ? true : null;
    }

    @HostBinding('attr.aria-hidden')
    get ariaHidden(): boolean | null {
        return this.disabled() ? true : null;
    }

    @HostBinding('attr.tabindex')
    get focusable(): number | null {
        return this.disabled() ? -1 : 0;
    }

    @HostListener('click', ['$event'])
    public click(event: Event): void {
        this.manageActionOnLink(event);
    }

    @HostListener('keydown.enter', ['$event'])
    public enter(event: Event): void {
        this.manageActionOnLink(event);
    }

    private readonly elementRef: ElementRef<HTMLButtonElement | HTMLAnchorElement> = inject(ElementRef);

    private readonly router: Router = inject(Router);

    private isButton(): boolean {
        return this.elementRef.nativeElement.localName === 'button';
    }

    private manageActionOnLink(event: Event): void {
        if ((!this.isButton() && this.url()?.startsWith('http')) || this.disabled()) {
            return;
        }

        event.preventDefault();

        if (this.url()?.startsWith('http') && this.isButton()) {
            window.open(this.url(), this.openInNew() ? '_blank' : '_self');
            return;
        }

        this.router.navigateByUrl(this.url()).catch(reason => {
            console.error(reason);
        });
    }
}
