import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'span[fold-tag]',
    template: '<ng-content></ng-content>',
    styleUrl: './fold-tag.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldTagComponent {
    @HostBinding('class')
    get cssClasses(): string {
        return 'flex align-center justify-center caption-2 bg-neutral-900 warning-300';
    }
}
