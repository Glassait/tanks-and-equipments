import { ChangeDetectionStrategy, Component, computed, inject, type OnInit, PLATFORM_ID, signal, type WritableSignal } from '@angular/core';
import {
    BreadcrumbModel,
    FoldBreadcrumbComponent,
    FoldSelectComponent,
    FoldTankCardComponent,
    type SelectItem,
    SentenceCasePipe,
} from 'fold';
import { PathEnum } from 'core/enums/path.enum';
import { type TankOverview, TankOverviewNationEnum, TankOverviewRoleEnum, TankOverviewTypeEnum } from 'generated-api/tanks';
import { TransferState } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer, TitleCasePipe } from '@angular/common';
import { NATIONS_KEY, PRIORITIES_KEY, ROLES_KEY, TANKS_OVERVIEW_KEY, TIERS_KEY, TYPES_KEY } from 'shared/variables/transfer.key';
import { TanksOverviewProxy } from 'shared/proxy/tanks-overview.proxy';
import { CacheManagerService } from 'shared/services/cache-manager.service';

@Component({
    selector: 'tank-equipments',
    standalone: true,
    imports: [FoldBreadcrumbComponent, FoldSelectComponent, FoldTankCardComponent],
    providers: [TitleCasePipe, SentenceCasePipe],
    templateUrl: './tank-equipments.component.html',
    styleUrl: './tank-equipments.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankEquipmentsComponent implements OnInit {
    //region INJECTION
    private readonly tanksOverviewService: TanksOverviewProxy = inject(TanksOverviewProxy);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly transferState = inject(TransferState);
    private readonly titleCase: TitleCasePipe = inject(TitleCasePipe);
    private readonly sentenceCase: SentenceCasePipe = inject(SentenceCasePipe);
    private readonly cacheManager: CacheManagerService = inject(CacheManagerService);
    //endregion

    protected breadcrumb: BreadcrumbModel[] = [
        {
            name: 'accueil',
            url: '/',
        },
        {
            name: 'Chars et ÉQuipements',
            url: '/' + PathEnum.CHARS_EQUIPMENT,
        },
    ];
    private readonly defaultValue: string = 'all';
    protected nations: SelectItem[] = [
        {
            text: 'Tout',
            value: this.defaultValue,
            selectedByDefault: true,
        },
    ];
    protected level: SelectItem[] = [
        {
            text: 'Tout',
            value: this.defaultValue,
            selectedByDefault: true,
        },
    ];
    protected types: SelectItem[] = [
        {
            text: 'Tout',
            value: this.defaultValue,
            selectedByDefault: true,
        },
    ];
    protected priorities: SelectItem[] = [
        {
            text: 'Tout',
            value: this.defaultValue,
            selectedByDefault: true,
        },
    ];
    protected roles: SelectItem[] = [
        {
            text: 'Tout',
            value: this.defaultValue,
            selectedByDefault: true,
        },
    ];

    protected readonly filterNation: WritableSignal<string> = signal(this.defaultValue);
    protected readonly filterLevel: WritableSignal<string> = signal(this.defaultValue);
    protected readonly filterType: WritableSignal<string> = signal(this.defaultValue);
    protected readonly filterPriority: WritableSignal<string> = signal(this.defaultValue);
    protected readonly filterRole: WritableSignal<string> = signal(this.defaultValue);
    protected readonly carrousel = computed(() =>
        this.tanksOverview.filter(
            (tankOverview: TankOverview): boolean =>
                this.checkNation(tankOverview) &&
                this.checkLevel(tankOverview) &&
                this.checkType(tankOverview) &&
                this.checkPriority(tankOverview) &&
                this.checkRole(tankOverview)
        )
    );

    private tanksOverview: TankOverview[] = [];

    private readonly typesTraduction: { [k in TankOverviewTypeEnum]: string } = {
        heavy: 'Lourd',
        medium: 'Moyen',
        light: 'Leger',
        tankDestroyer: 'Chasseur de chars',
    };

    private readonly rolesTraduction: { [k in TankOverviewRoleEnum]: string } = {
        assault: "Chars d'assaut",
        heavyPush: 'Chars lourds de percé',
        sniper: 'Chars tireurs de précision',
        supports: 'Chars de soutien',
        versatile: 'Chars polyvalent',
        wheels: 'Chars à roues',
    };

    private readonly nationTraduction: { [k in TankOverviewNationEnum]: string } = {
        China: 'Chine',
        Czech: 'Tchécoslovaquie',
        France: 'France',
        Germany: 'Allemagne',
        Italy: 'Italie',
        Japan: 'Japon',
        Poland: 'Pologne',
        Sweden: 'Suède',
        USA: 'États-unis',
        USSR: 'Urss',
        UK: 'Royaume-Uni',
    };

    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            if (this.cacheManager.hasKey(TANKS_OVERVIEW_KEY)) {
                this.tanksOverview = this.sortTanksOverview(this.cacheManager.getData(TANKS_OVERVIEW_KEY)!);
            } else {
                this.tanksOverviewService.tanksOverview().subscribe({
                    next: (tankOverviews: TankOverview[]): void => {
                        this.tanksOverview = this.sortTanksOverview(tankOverviews);
                        this.cacheManager.addData(TANKS_OVERVIEW_KEY, tankOverviews);
                    },
                    error: err => {
                        console.error(err);
                    },
                });
            }
        }

        if (isPlatformBrowser(this.platformId)) {
            this.tanksOverview = this.sortTanksOverview(this.transferState.get(TANKS_OVERVIEW_KEY, []));

            this.extractNation();
            this.extractTiers();
            this.extractTypes();
            this.extractPriorities();
            this.extractRoles();

            this.nations = this.transferState.get(NATIONS_KEY, []);
            this.level = this.transferState.get(TIERS_KEY, []);
            this.types = this.transferState.get(TYPES_KEY, []);
            this.priorities = this.transferState.get(PRIORITIES_KEY, []);
            this.roles = this.transferState.get(ROLES_KEY, []);
        }
    }

    private sortTanksOverview(tanksOverview: TankOverview[]): TankOverview[] {
        return tanksOverview.sort((a: TankOverview, b: TankOverview) => b.priority - a.priority); // NOSONAR
    }

    private extractNation(): void {
        const set: Set<string> = new Set<string>();

        this.tanksOverview.forEach(({ nation }) => {
            if (set.has(nation)) {
                return;
            }

            set.add(nation);
            const formated: string = this.titleCase.transform(nation);
            this.nations.push({
                text: this.nationTraduction[nation],
                value: nation,
                icon: `filter${formated}`,
            } as SelectItem);
        });

        this.nations.sort(this.sort);

        this.transferState.set(NATIONS_KEY, this.nations);
    }

    private extractTiers(): void {
        const set: Set<number> = new Set<number>();

        this.tanksOverview.forEach(({ level }) => {
            if (set.has(level)) {
                return;
            }

            set.add(level);
            const formated: string = String(level);
            this.level.push({
                text: formated,
                value: formated,
                icon: `level${formated}`,
            } as SelectItem);
        });

        this.level.sort(this.sort);

        this.transferState.set(TIERS_KEY, this.level);
    }

    private extractTypes(): void {
        const set: Set<string> = new Set<string>();

        this.tanksOverview.forEach(({ type }) => {
            if (set.has(type)) {
                return;
            }

            set.add(type);
            const formated: string = this.sentenceCase.transform(type);
            this.types.push({
                text: this.typesTraduction[type],
                value: type,
                icon: `tankType${formated}`,
            } as SelectItem);
        });

        this.types.sort(this.sort);

        this.transferState.set(TYPES_KEY, this.types);
    }

    private extractPriorities(): void {
        const set: Set<number> = new Set<number>();

        this.tanksOverview.forEach(({ priority }) => {
            if (set.has(priority)) {
                return;
            }

            set.add(priority);
            const formated: string = String(priority);
            this.priorities.push({
                text: formated,
                value: formated,
                icon: `priority${formated}`,
            } as SelectItem);
        });

        this.priorities.sort(this.reverseSort);

        this.transferState.set(PRIORITIES_KEY, this.priorities);
    }

    private extractRoles(): void {
        const set: Set<string> = new Set<string>();

        this.tanksOverview.forEach(({ role }) => {
            if (set.has(role)) {
                return;
            }

            set.add(role);
            const formated: string = this.sentenceCase.transform(role);
            this.roles.push({
                text: this.rolesTraduction[role],
                value: role,
                icon: `tankRole${formated}`,
            } as SelectItem);
        });

        this.roles.sort(this.sort);

        this.transferState.set(ROLES_KEY, this.roles);
    }

    private sort(a: SelectItem, b: SelectItem): number {
        if (a.text === 'Tout' || b.text === 'Tout') {
            return 1;
        }

        return a.text < b.text ? -1 : 1;
    }

    private reverseSort(a: SelectItem, b: SelectItem): number {
        if (a.text === 'Tout' || b.text === 'Tout') {
            return 1;
        }

        return a.text < b.text ? 1 : -1;
    }

    private checkNation({ nation }: TankOverview) {
        return this.filterNation() === this.defaultValue || this.filterNation() === nation;
    }

    private checkLevel({ level }: TankOverview) {
        return this.filterLevel() === this.defaultValue || this.filterLevel() === String(level);
    }

    private checkType({ type }: TankOverview) {
        return this.filterType() === this.defaultValue || this.filterType() === type;
    }

    private checkPriority({ priority }: TankOverview) {
        return this.filterPriority() === this.defaultValue || this.filterPriority() === String(priority);
    }

    private checkRole({ role }: TankOverview) {
        return this.filterRole() === this.defaultValue || this.filterRole() === role;
    }
}
