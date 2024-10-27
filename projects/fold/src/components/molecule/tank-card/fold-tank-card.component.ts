import { ChangeDetectionStrategy, Component, computed, input, type InputSignal, type OnInit, type Signal } from '@angular/core';
import { FoldLinkDirective } from '../../../directives/link/fold-link.directive';
import { LowerCasePipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { FoldIconComponent } from '../../atomic/icon/fold-icon.component';
import type { FoldIcon } from '../../atomic/icon/icons-ts/icon.model';
import { SentenceCasePipe } from '../../../pipes/sentence-case/sentence-case.pipe';
import { ReplacePipe } from '../../../pipes/replace/replace.pipe';

@Component({
    selector: 'fold-tank-card',
    templateUrl: './fold-tank-card.component.html',
    styleUrl: './fold-tank-card.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldLinkDirective, NgOptimizedImage, TitleCasePipe, FoldIconComponent, ReplacePipe, LowerCasePipe],
    providers: [SentenceCasePipe],
})
export class FoldTankCardComponent implements OnInit {
    public static id: number = 0; // NOSONAR

    public nation: InputSignal<string> = input.required();

    public name: InputSignal<string> = input.required();

    public wotName: InputSignal<string> = input.required();

    public type: InputSignal<string> = input.required();

    public level: InputSignal<number> = input.required();

    public role: InputSignal<string> = input.required();

    public priority: InputSignal<number> = input.required();

    public isReward: InputSignal<boolean | undefined> = input();

    protected tankImageUrl: Signal<string> = computed(
        (): string => `https://eu-wotp.wgcdn.co/dcont/tankopedia_images/${this.wotName()}/${this.wotName()}_image_resized.png`
    );

    protected flagImageUrl: Signal<string> = computed((): string => `images/nation/flag-${this.nation().toLowerCase()}.png`);

    protected typeIcon: Signal<FoldIcon> = computed((): FoldIcon => `tankType${this.sentenceCase.transform(this.type())}` as FoldIcon);

    protected roleIcon: Signal<FoldIcon> = computed((): FoldIcon => `tankRole${this.sentenceCase.transform(this.role())}` as FoldIcon);

    protected levelIcon: Signal<FoldIcon> = computed((): FoldIcon => `level${this.level()}` as FoldIcon);

    protected priorityIcon: Signal<FoldIcon> = computed((): FoldIcon => `priority${this.priority()}` as FoldIcon);

    protected componentId: number = 0;

    constructor(private readonly sentenceCase: SentenceCasePipe) {}

    ngOnInit(): void {
        this.componentId = ++FoldTankCardComponent.id;
    }
}
