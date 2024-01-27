import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { MemberService } from '../../commons/abstract/member.service';
import { ModeService } from '../../commons/abstract/mode.service';
import { CookieNameEnum } from '../../commons/enums/cookie-name.enum';
import { SessionStorageService } from '../../commons/services/session-storage.service';
import { WordingService } from '../../commons/services/wording.service';
import { DateCustom } from '../../commons/utils/date.custom';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';
import { TankDto, TanksService } from '../../../generated-api/glassait/tanks';

@Component({
    selector: 'app-tanks-equipment',
    templateUrl: './tanks-equipment.component.html',
})
export class TanksEquipmentComponent implements OnInit {
    //region PROTECTED
    /**
     * The data and states of the api call
     * @protected
     */
    protected tanksData: { isLoading: boolean; isError: boolean; data?: TankDto[] } = {
        isLoading: true,
        isError: false,
    };

    //endregion

    constructor(
        // API
        private readonly tanksService: TanksService,
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
        this.title.setTitle(new SentenceCasePipe().transform(this.wordingService.header['tanks-and-equipments']));

        this.headerStore.patch({
            showHome: true,
            showTank: false,
            showWar: true,
            showAdmin: true,
        });

        this.getTanksData();
    }

    /**
     * Get the data of the tanks with an api call
     * @private
     */
    private getTanksData(): void {
        const token: { date: string | null; data: TankDto[] | null } = {
            date: this.sessionService.getFromKey(CookieNameEnum.TANKS_DATE),
            data: this.sessionService.getFromKeyToObject<TankDto[]>(CookieNameEnum.TANKS_DATA),
        };
        const dateToken: Date | null = token.date ? new Date(token.date) : null;

        if ((dateToken ? new Date() < dateToken : null) && token.data) {
            this.tanksData.data = token.data;
            this.tanksData.isLoading = false;
            return;
        }

        this.tanksService.tanks({ access_token: this.memberService.accessToken }).subscribe({
            next: (tankData: TankDto[]): void => {
                this.tanksData.data = tankData;
                this.sessionService.store(CookieNameEnum.TANKS_DATA, JSON.stringify(tankData));
                this.sessionService.store(CookieNameEnum.TANKS_DATE, DateCustom.getMidnightDate().toDateString());
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
