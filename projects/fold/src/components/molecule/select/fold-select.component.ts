import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    input,
    type InputSignal,
    type OnInit,
    output,
    OutputEmitterRef,
    PLATFORM_ID,
    signal,
    type WritableSignal,
} from '@angular/core';
import { isPlatformBrowser, LowerCasePipe, NgClass, NgStyle } from '@angular/common';
import { FoldTextComponent } from '../../atomic/text/fold-text.component';
import { FoldIconComponent } from '../../atomic/icon/fold-icon.component';
import { SentenceCasePipe } from '../../../pipes/sentence-case/sentence-case.pipe';
import type { SelectItem } from './select.model';

@Component({
    selector: 'fold-select',
    templateUrl: './fold-select.component.html',
    styleUrl: './fold-select.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass, FoldTextComponent, FoldIconComponent, LowerCasePipe, SentenceCasePipe, NgStyle],
})
export class FoldSelectComponent implements OnInit {
    public static id: number = 0; // NOSONAR

    public selectTitle: InputSignal<string> = input.required();
    public selectItems: InputSignal<SelectItem[]> = input.required();

    public selectedItem: OutputEmitterRef<SelectItem> = output();

    private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly platformId = inject(PLATFORM_ID);

    protected componentId: number = 0;
    protected dropdownWidth: number = 0;

    protected selected: WritableSignal<{ item: SelectItem; index: number } | undefined> = signal(undefined);

    private dialog: HTMLElement | null;

    ngOnInit(): void {
        this.componentId = ++FoldSelectComponent.id;
        this.dropdownWidth = this.elementRef.nativeElement.children[0].clientWidth;

        if (isPlatformBrowser(this.platformId)) {
            this.dialog = document.getElementById(`filter-popover-${this.componentId}`);
        }

        this.selectItems().forEach(({ selectedByDefault }, index) => (selectedByDefault ? this.select(index) : null));
    }

    protected select(index: number) {
        if (isPlatformBrowser(this.platformId)) {
            this.dialog?.hidePopover();
        }
        this.selected.set({ item: this.selectItems()[index], index });
        this.selectedItem.emit(this.selected()?.item!);
    }
}
