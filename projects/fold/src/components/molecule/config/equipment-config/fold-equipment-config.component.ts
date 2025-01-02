import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    input,
    type InputSignal,
    type InputSignalWithTransform,
    type OnInit,
} from '@angular/core';
import { type Consumable, type Directive, type Equipment } from '../../../../generated-api/tanks';
import { FoldTextComponent } from '../../../atomic/text/fold-text.component';
import { FoldIconComponent } from '../../../atomic/icon/fold-icon.component';
import type { FoldIcon } from '../../../atomic/icon/icons-ts/icon.model';

type ConsumableOverride = Omit<Consumable, 'wotName'> & { wotName: FoldIcon };

@Component({
    selector: 'fold-config fold-equipment-config',
    templateUrl: './fold-equipment-config.component.html',
    styleUrl: './fold-equipment-config.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldTextComponent, FoldIconComponent],
})
export class FoldEquipmentConfigComponent implements OnInit {
    public static id: number = 0;

    public equipments: InputSignal<Equipment[]> = input.required();
    public directive: InputSignal<Directive> = input.required();
    public consumables: InputSignalWithTransform<ConsumableOverride[], Consumable[]> = input.required({
        transform: (v: Consumable[]): ConsumableOverride[] => v as ConsumableOverride[],
    });
    /**
     * Show the deluxe version of the equipment.
     *
     * We don't want to show deluxe version by default
     *
     * @default false
     */
    public showDeluxe: InputSignal<boolean> = input(false);

    @HostBinding('class')
    get cssClasses(): string {
        return 'flex gap-32';
    }

    protected componentId: number = 0;

    ngOnInit(): void {
        this.componentId = ++FoldEquipmentConfigComponent.id;
    }
}
