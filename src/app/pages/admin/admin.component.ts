import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MemberService } from '../../commons/abstract/member.service';
import { ModeService } from '../../commons/abstract/mode.service';
import { WordingService } from '../../commons/services/wording.service';
import { HeaderStore } from '../../commons/stores/header.store';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';
import { MembersApi } from '../../commons/api/members.api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WotService } from 'src/app/commons/services/wot.service';
import { ClanReserves, DefaultWargaming, Reserve } from '../../commons/types/wot.type';
import { defaultHttpType, DefaultHttpType } from '../../commons/types/default-httpType';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { ButtonTypeEnum } from '../../components/button/enums/button-type.enum';
import { ButtonThemeEnum } from '../../components/button/enums/button-theme.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { ClanReservesType } from './types/clan-reserves.type';
import { ClanReserveEnum } from './enums/clan-reserve.enum';
import { SelectOptionType } from '../../components/select/types/select-option.type';
import moment from 'moment';
import { map, share, takeWhile, timer } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
    //region PROTECTED FIELD
    /**
     * Show loading button on click on update bdd card action
     * @protected
     */
    protected updateBddLoading: boolean = false;
    protected clanReservesFormGroup: FormGroup = new FormGroup({});
    protected clanReserves: DefaultHttpType & { reserves?: ClanReservesType[] } = defaultHttpType;
    //endregion

    //region ENUM
    protected readonly ModeEnum = ModeEnum;
    protected readonly ButtonTypeEnum = ButtonTypeEnum;
    protected readonly ButtonThemeEnum = ButtonThemeEnum;
    //endregion

    //region PRIVATE READONLY FIELD
    /**
     * The duration in second of the snackbar/toast
     * @private
     */
    private readonly snackBarDuration = 2000;

    //endregion

    constructor(
        // STORE
        private readonly headerStore: HeaderStore,
        // SERVICE
        private readonly wording: WordingService,
        protected readonly memberService: MemberService,
        protected readonly modeService: ModeService,
        // ANGULAR
        private readonly router: Router,
        private readonly title: Title,
        private readonly snackBar: MatSnackBar,
        // PIPE
        private readonly sentenceCasePipe: SentenceCasePipe,
        // API
        private readonly membersApi: MembersApi,
        private readonly wotService: WotService
    ) {}

    /**
     * Implementation of the {@link OnInit} interface
     */
    ngOnInit(): void {
        if (!this.memberService.isAdmin || this.memberService.isVisitor) {
            this.router.navigate(['/']).then((): void => {});
        }

        this.title.setTitle(this.sentenceCasePipe.transform(this.wording.header.admin));

        this.headerStore.patch({
            showHome: true,
            showWar: true,
            showTank: true,
            showAdmin: false,
        });

        this.getClanReserves();
    }

    /**
     * Action callback fot the update button
     */
    protected actualiseBdd = (): void => {
        this.updateBddLoading = true;
        this.membersApi.updateMember(this.memberService.accessToken).subscribe({
            next: (_value: any): void => {},
            error: (err: any): void => {
                console.error(err);
                this.snackBar.open('Une erreur est survenue lors de la mise à jour de la base de données', '', {
                    duration: this.snackBarDuration,
                });
            },
            complete: (): void => {
                setTimeout((): void => {
                    this.updateBddLoading = false;
                }, 10000);
                this.snackBar.open('La base de données a bien été mise à jour', '', { duration: this.snackBarDuration });
            },
        });
    };

    protected activateReserve(event: MouseEvent, type: string): void {
        event.preventDefault();
        const level: string = this.clanReservesFormGroup.controls[type].value;
        const clanReserve: ClanReservesType | undefined = this.clanReserves.reserves?.find(
            (clanReserves: ClanReservesType): boolean => clanReserves.type === type
        );

        if (!clanReserve) {
            this.snackBar.open('Erreur lors de la recherche de la réserve', '', { duration: this.snackBarDuration });
            return;
        }

        const option = clanReserve.options.find((option: SelectOptionType): boolean => option.value === level);

        if (!option) {
            this.snackBar.open("Erreur lors de la recherche de l'option", '', { duration: this.snackBarDuration });
            return;
        }

        this.createTimer(clanReserve, option.metadata);
        this.checkActivatedReserves();
    }

    private getClanReserves(): void {
        this.wotService.getClanReserve(this.memberService.accessToken).subscribe({
            next: (response: DefaultWargaming<ClanReserves[]>): void => {
                response.data
                    .filter((clanReserves: ClanReserves) => !clanReserves.disposable)
                    .forEach((reserves: ClanReserves): void => {
                        this.clanReservesFormGroup.addControl(reserves.type, new FormControl());

                        if (!this.clanReserves.reserves) {
                            this.clanReserves.reserves = [];
                        }

                        const clanReserves: ClanReservesType = {
                            name: reserves.name,
                            type: reserves.type,
                            bonus_type: reserves.bonus_type,
                            options: [],
                            link_to: ClanReserveEnum[reserves.type as keyof typeof ClanReserveEnum],
                        };

                        reserves.in_stock.forEach((reserve: Reserve): void => {
                            if (reserve.active_till) {
                                clanReserves.active_till = new Date((reserve.active_till ?? 0) * 1000);
                                this.createTimer(clanReserves, reserve);
                            }

                            clanReserves.options.push({
                                value: String(reserve.level),
                                label: String(reserve.level),
                                metadata: reserve,
                            });
                        });

                        this.clanReserves.reserves.push(clanReserves);
                    });
                this.checkActivatedReserves();
            },
            error: (err: any): void => {
                console.error(err);
                this.clanReserves.isLoading = false;
                this.clanReserves.isError = true;
            },
            complete: (): void => {
                console.log(this.clanReserves);
                this.clanReserves.isLoading = false;
            },
        });
    }

    private checkActivatedReserves(): void {
        this.clanReserves.reserves?.forEach((clanReserves: ClanReservesType): void => {
            const linked = this.clanReserves.reserves?.find((value: ClanReservesType): boolean => value.type === clanReserves.link_to);

            if (linked?.active_till) {
                clanReserves.active_till = linked.active_till;
                clanReserves.duration = linked.duration;
                clanReserves.clock = linked.clock;
            }
        });
    }

    private createTimer(clanReserves: ClanReservesType, reserve: Reserve): void {
        const target = new Date();
        target.setHours(target.getHours() + reserve.action_time / 3600);
        const linked = this.clanReserves.reserves?.find((value: ClanReservesType): boolean => value.type === clanReserves.link_to);

        clanReserves.active_till = clanReserves.active_till ?? target;
        clanReserves.duration = reserve.action_time;
        timer(0, 1000)
            .pipe(
                map(() => new Date()),
                share(),
                takeWhile((date: Date): boolean => {
                    const seconds = moment.duration(moment(clanReserves.active_till).diff(date)).seconds();
                    if (seconds <= 0) {
                        clanReserves.duration = undefined;
                        clanReserves.active_till = undefined;
                        clanReserves.clock = undefined;
                        reserve.amount--;

                        if (linked) {
                            linked.active_till = undefined;
                            linked.duration = undefined;
                            linked.clock = undefined;
                        }
                    }
                    return seconds > 0;
                })
            )
            .subscribe((date: Date): void => {
                clanReserves.clock = moment.duration(moment(clanReserves.active_till).diff(date));
                if (linked) {
                    linked.clock = clanReserves.clock;
                }
            });
    }
}
