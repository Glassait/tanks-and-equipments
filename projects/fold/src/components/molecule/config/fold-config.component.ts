import { ChangeDetectionStrategy, Component, computed, HostBinding, input, InputSignal, OnInit, Signal } from '@angular/core';
import { FoldTextComponent } from '../../atomic/text/fold-text.component';
import { FoldIcon } from '../../atomic/icon/icons-ts/icon.model';
import { SentenceCasePipe } from '../../../pipes/sentence-case/sentence-case.pipe';
import { FoldBadgeComponent } from '../../atomic/badge/fold-badge.component';
import { CssBgColorClasses } from '../../../models/types/css.type';
import { TankConfigurationPriorityEnum } from '../../../generated-api/tanks';
import { UpperCasePipe } from '@angular/common';

@Component({
    selector: 'fold-config',
    templateUrl: './fold-config.component.html',
    styleUrl: './fold-config.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldTextComponent, SentenceCasePipe, FoldBadgeComponent, UpperCasePipe],
})
export class FoldConfigComponent implements OnInit {
    public static id: number = 0;

    public title: InputSignal<string> = input.required();
    public priority: InputSignal<TankConfigurationPriorityEnum> = input.required();
    /**
     * @default true
     */
    public showFooter: InputSignal<boolean> = input(true);

    @HostBinding('class')
    get cssClasses(): string {
        return 'bg-neutral-700 flex direction-column gap-12';
    }

    protected iconFromPriority: Signal<FoldIcon> = computed((): FoldIcon => {
        switch (this.priority()) {
            case TankConfigurationPriorityEnum.Principal:
                return 'priority5';
            case TankConfigurationPriorityEnum.Secondaire:
                return 'priority3';
            case TankConfigurationPriorityEnum.Alternatif:
                return 'priority1';
            default:
                return 'priority5';
        }
    });
    protected bgColorFromPriority: Signal<CssBgColorClasses> = computed((): CssBgColorClasses => {
        switch (this.priority()) {
            case TankConfigurationPriorityEnum.Principal:
                return 'bg-primary-700';
            case TankConfigurationPriorityEnum.Secondaire:
                return 'bg-success-500';
            case TankConfigurationPriorityEnum.Alternatif:
                return 'bg-warning-500';
            default:
                return 'bg-primary-700';
        }
    });

    protected componentId: number = 0;

    ngOnInit(): void {
        this.componentId = ++FoldConfigComponent.id;
    }
}
