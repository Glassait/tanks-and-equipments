import {
    ChangeDetectionStrategy,
    Component, HostBinding,
    input,
    InputSignal,
    OnInit,
    output,
    OutputEmitterRef,
    signal,
    WritableSignal,
} from '@angular/core';
import { FoldTabsRadioComponent } from './tabs-radio/fold-tabs-radio.component';
import { FoldTabsInput } from './tabs.model';

@Component({
    selector: 'fold-tabs',
    templateUrl: './fold-tabs.component.html',
    styleUrl: './fold-tabs.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldTabsRadioComponent],
})
export class FoldTabsComponent implements OnInit {
    public static id: number = 0;

    public radios: InputSignal<FoldTabsInput[]> = input.required();
    public radioGroupName: InputSignal<string> = input.required();
    public autoSelectFirst: InputSignal<boolean> = input(false);

    public selectionEvent: OutputEmitterRef<string> = output();

    @HostBinding("class")
    get scssClass(): string {
        return 'flex direction-column gap-8'
    }

    protected componentId: number = 0;

    protected selected: WritableSignal<string> = signal('');

    ngOnInit(): void {
        this.componentId = ++FoldTabsComponent.id;

        if (this.autoSelectFirst()) {
            const value: string = this.radios()[0].value;
            this.selected.set(value);
            this.selectionEvent.emit(value);
        }
    }
}
