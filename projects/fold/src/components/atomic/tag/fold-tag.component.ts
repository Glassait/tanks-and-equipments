import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'span[foldTag]',
    template: '<ng-content></ng-content>',
    styleUrl: './fold-tag.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldTagComponent {}
