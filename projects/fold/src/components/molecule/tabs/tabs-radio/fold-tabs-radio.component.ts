import { ChangeDetectionStrategy, Component, input, InputSignal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FoldTextComponent } from '../../../atomic/text/fold-text.component';
import { FoldIcon } from '../../../atomic/icon/icons-ts/icon.model';

@Component({
    selector: 'fold-tabs fold-tabs-radio',
    templateUrl: './fold-tabs-radio.component.html',
    styleUrl: './fold-tabs-radio.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, FoldTextComponent],
})
export class FoldTabsRadioComponent implements OnInit {
    public static id: number = 0;

    public label: InputSignal<string> = input.required();
    public value: InputSignal<string> = input.required();
    public radioGroupName: InputSignal<string> = input.required();
    public checked: InputSignal<boolean> = input(false);
    public icon: InputSignal<FoldIcon | undefined> = input();

    protected componentId: number = 0;

    ngOnInit(): void {
        this.componentId = ++FoldTabsRadioComponent.id;
    }
}
