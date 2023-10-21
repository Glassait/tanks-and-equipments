import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { MemberService } from '../../commons/abstract/member.service';
import { ModeService } from '../../commons/abstract/mode.service';
import { TanksDataApi } from '../../commons/api/tank-data.api';
import { CookieNameEnum } from '../../commons/enums/cookie-name.enum';
import { SessionStorageService } from '../../commons/services/session-storage.service';
import { WordingService } from '../../commons/services/wording.service';
import { TankData } from '../../commons/types/tanks-data.type';
import { DateCustom } from '../../commons/utils/date.custom';
import { SentenceCasePipe } from '../../pipes/sentenceCase/sentence-case.pipe';

@Component({
    selector: 'app-tanks-equipment',
    templateUrl: './tanks-equipment.component.html',
})
export class TanksEquipmentComponent implements OnInit {
    /**
     * The data and states of the api call
     * @protected
     */
    protected tanksData: { isLoading: boolean; isError: boolean; data?: TankData[] } = {
        isLoading: true,
        isError: false,
    };

    constructor(
        // API
        private readonly tanksDataApi: TanksDataApi,
        // SERVICE
        private readonly wordingService: WordingService,
        private readonly sessionService: SessionStorageService,
        protected readonly modeService: ModeService,
        protected readonly memberService: MemberService,
        // STORE
        private readonly headerStore: HeaderStore,
        // ANGULAR
        private readonly router: Router,
        private readonly title: Title
    ) {
        if (!this.memberService.isVisitor) {
            return;
        }

        this.router.navigate(['/']).then((): void => {});
    }

    /**
     * Implementation of the {@link OnInit} interface
     */
    ngOnInit(): void {
        this.title.setTitle(
            new SentenceCasePipe().transform(this.wordingService.header['tanks-and-equipments'])
        );

        this.headerStore.patch({
            showHome: true,
            showTank: false,
            showWar: true,
        });

        this.getTanksData();
    }

    /**
     * Get the data of the tanks with an api call
     * @private
     */
    private getTanksData(): void {
        const token: { date: string | null; data: TankData[] | null } = {
            date: this.sessionService.getFromKey(CookieNameEnum.TANKS_DATE),
            data: this.sessionService.getFromKeyToObject<TankData[]>(CookieNameEnum.TANKS_DATA),
        };
        const dateToken: Date | null = token.date ? new Date(token.date) : null;

        if ((dateToken ? new Date() < dateToken : null) && token.data) {
            this.tanksData.data = token.data;
            this.tanksData.isLoading = false;
            return;
        }

        this.tanksDataApi.queryTanksData(this.memberService.accessToken).subscribe({
            next: (tankData: TankData[]): void => {
                this.tanksData.data = tankData;
                this.sessionService.store(CookieNameEnum.TANKS_DATA, JSON.stringify(tankData));
                this.sessionService.store(
                    CookieNameEnum.TANKS_DATE,
                    DateCustom.getMidnightDate().toDateString()
                );
            },
            error: _err => {
                this.tanksData.isError = true;
                this.tanksData.isLoading = false;
            },
            complete: (): void => {
                this.tanksData.isLoading = false;
            },
        });
    }
}
