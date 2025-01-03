import {
    ChangeDetectionStrategy,
    Component,
    computed,
    HostBinding,
    input,
    type InputSignal,
    type InputSignalWithTransform,
    type OnInit,
    type Signal,
} from '@angular/core';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { type CrewMember, type Skill, TankOverviewNationEnum } from '../../../../generated-api/tanks';
import { FoldIconComponent } from '../../../atomic/icon/fold-icon.component';
import type { FoldIcon } from '../../../atomic/icon/icons-ts/icon.model';

type SkillOverride = Omit<Skill, 'wotName'> & { wotName: FoldIcon };
type CrewMemberOverride = Omit<CrewMember, 'skills'> & { skills: SkillOverride[] };
type Role = Required<Omit<CrewMemberOverride, 'secondary_roles'>> & { name: FoldIcon };

@Component({
    selector: 'fold-crew-config',
    templateUrl: './fold-crew-config.component.html',
    styleUrl: './fold-crew-config.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LowerCasePipe, TitleCasePipe, FoldIconComponent],
})
export class FoldCrewConfigComponent implements OnInit {
    public static id: number = 0;

    public nation: InputSignal<TankOverviewNationEnum> = input.required();
    public crew: InputSignalWithTransform<CrewMemberOverride, CrewMember> = input.required({
        transform: (v: CrewMember): CrewMemberOverride => v as CrewMemberOverride,
    });

    @HostBinding('class')
    get cssClasses(): string {
        return 'flex direction-column justify-center gap-8';
    }

    protected nameToWotId: Signal<number> = computed((): number => this.crewData[this.crew().name].wotId);
    protected nameToFrench: Signal<string> = computed((): string => this.crewData[this.crew().name].frenchName);
    protected roles: Signal<Role[]> = computed((): Role[] => {
        const data: Role[] = [{ name: this.crew().name as FoldIcon, skills: this.crew().skills }];

        if (this.crew().secondary_roles.length > 0) {
            data.push(...(this.crew().secondary_roles as Role[]));
        }

        return data;
    });

    protected componentId: number = 0;

    private readonly crewData: Record<string, { wotId: number; frenchName: string }> = {
        commander: { wotId: 1, frenchName: 'commandant' },
        gunner: { wotId: 2, frenchName: 'tirreur' },
        driver: { wotId: 3, frenchName: 'pilote' },
        radioman: { wotId: 4, frenchName: 'opérateur radio' },
        loader: { wotId: 5, frenchName: 'chargeur' },
    };

    ngOnInit(): void {
        this.componentId = ++FoldCrewConfigComponent.id;
    }
}
