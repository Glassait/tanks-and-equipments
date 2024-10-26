import { ChangeDetectionStrategy, Component, input, type InputSignal, type OnInit, ViewChild } from '@angular/core';
import { FoldTagComponent } from '../../atomic/tag/fold-tag.component';
import { FoldTextComponent } from '../../atomic/text/fold-text.component';
import { FoldLinkDirective } from '../../../directives/link/fold-link.directive';
import { SentenceCasePipe } from '../../../pipes/sentence-case/sentence-case.pipe';

@Component({
    selector: 'fold-news-card',
    templateUrl: './fold-news-card.component.html',
    styleUrl: './fold-news-card.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldTagComponent, FoldTextComponent, FoldLinkDirective, SentenceCasePipe],
})
export class FoldNewsCardComponent implements OnInit {
    public static id: number = 0; // NOSONAR

    @ViewChild(FoldLinkDirective, { static: true }) linkDirective: FoldLinkDirective;

    public title: InputSignal<string> = input.required();

    public url: InputSignal<string> = input.required();

    public tags: InputSignal<string[]> = input.required();

    public imageUrl: InputSignal<string> = input.required();

    protected componentId: number = 0;

    ngOnInit(): void {
        this.componentId = ++FoldNewsCardComponent.id;
    }
}
