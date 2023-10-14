import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { TanksDataService } from 'src/app/commons/services/tank-data.service';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { MemberStore } from 'src/app/commons/stores/member.store';
import { UnsubscribeDirective } from '../../commons/directives/unsubscribe.directive';
import { CookieNameEnum } from '../../commons/enums/cookie-name.enum';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { SessionStorageService } from '../../commons/services/session-storage.service';
import { WordingService } from '../../commons/services/wording.service';
import { ModeStore } from '../../commons/stores/mode.store';
import { TankData } from '../../commons/types/tanks-data.type';
import { DateCustom } from '../../commons/utils/date.custom';
import { SentenceCasePipe } from '../../pipes/sentenceCase/sentence-case.pipe';

@Component({
    selector: 'app-tanks-equipment',
    templateUrl: './tanks-equipment.component.html',
})
export class TanksEquipmentComponent extends UnsubscribeDirective implements OnInit {
    protected showSpinner: boolean = true;
    protected isDark: boolean;
    protected isMobile: boolean;

    protected tanksData: TankData[];

    constructor(
        private wording: WordingService,
        private tankDataService: TanksDataService,
        private sessionService: SessionStorageService,
        private headerStore: HeaderStore,
        private memberStore: MemberStore,
        private modeStore: ModeStore,
        private router: Router,
        private title: Title
    ) {
        super();
        this.checkUser();
        this.patchHeaderAndFooter();
        this.createSubscribe();

        this.title.setTitle(new SentenceCasePipe().transform(this.wording.header.charEtEquipement));
    }

    ngOnInit(): void {
        this.getTanksData();
    }

    private checkUser(): void {
        if (!this.memberStore.isVisitor()) {
            return;
        }

        this.router.navigate(['/']).then((): void => {
            // Ignored
        });
    }

    private patchHeaderAndFooter(): void {
        this.headerStore.patch({
            showHome: true,
            showTank: false,
            showWar: !this.modeStore.get('mobile'),
        });
    }

    private createSubscribe(): void {
        this.modeStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((modeInterface: ModeInterface): void => {
                this.isDark = modeInterface.color === ModeEnum.DARK;
                this.isMobile = modeInterface.mobile;
            });
    }

    private getTanksData(): void {
        const token = {
            date: this.sessionService.getFromKey(CookieNameEnum.TANKS_DATE),
            data: this.sessionService.getFromKeyToObject<TankData[]>(CookieNameEnum.TANKS),
        };
        const dateToken: Date | null = token.date ? new Date(token.date) : null;

        if ((dateToken ? new Date() < dateToken : null) && token.data) {
            this.tanksData = token.data;
            this.showSpinner = false;
        } else {
            this.tankDataService.queryTanksData().subscribe({
                next: (tankData: TankData[]): void => {
                    this.tanksData = tankData;
                    this.sessionService.store(CookieNameEnum.TANKS, JSON.stringify(tankData));
                    this.sessionService.store(
                        CookieNameEnum.TANKS_DATE,
                        DateCustom.getMidnightDate().toDateString()
                    );
                },
                error: err => {
                    console.log(err);
                },
                complete: (): void => {
                    this.showSpinner = false;
                },
            });
        }
    }
}
