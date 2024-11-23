import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'span[foldTag]',
    template: '<ng-content></ng-content>',
    styleUrl: './fold-tag.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldTagComponent {
    @HostBinding('class')
    get cssClasses() {
        return ['flex', 'align-center', 'justify-center', 'caption-2'];
    }
}
