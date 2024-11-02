import { ChangeDetectionStrategy, Component, input, type InputSignal, type OnInit } from '@angular/core';
import { FoldTagComponent } from '../../atomic/tag/fold-tag.component';
import { FoldTextComponent } from '../../atomic/text/fold-text.component';
import { FoldLinkDirective } from '../../../directives/link/fold-link.directive';
import { SentenceCasePipe } from '../../../pipes/sentence-case/sentence-case.pipe';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'fold-news-card',
    templateUrl: './fold-news-card.component.html',
    styleUrl: './fold-news-card.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldTagComponent, FoldTextComponent, FoldLinkDirective, SentenceCasePipe, NgOptimizedImage],
})
export class FoldNewsCardComponent implements OnInit {
    public static id: number = 0; // NOSONAR

    /**
     * @default true
     */
    public isArticle: InputSignal<boolean> = input(true);

    /**
     * Only when {@link isArticle} is true
     */
    public title: InputSignal<string> = input('');

    /**
     * Only when {@link isArticle} is true
     */
    public url: InputSignal<string> = input('');

    /**
     * Only when {@link isArticle} is false
     */
    public description: InputSignal<string> = input('');

    public tags: InputSignal<string[]> = input.required();

    public imageUrl: InputSignal<string> = input.required();

    protected componentId: number = 0;

    ngOnInit(): void {
        this.componentId = ++FoldNewsCardComponent.id;
    }
}
