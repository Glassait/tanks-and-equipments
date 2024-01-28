import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MemberService } from '../../commons/abstract/member.service';
import { ModeService } from '../../commons/abstract/mode.service';
import { WordingService } from '../../commons/services/wording.service';
import { HeaderStore } from '../../commons/stores/header.store';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { defaultHttpType, DefaultHttpType } from '../../commons/types/default-httpType';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { ButtonTypeEnum } from '../../components/button/enums/button-type.enum';
import { ButtonThemeEnum } from '../../components/button/enums/button-theme.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { ClanReserveType } from './types/clan-reserve.type';
import { ClanReserveEnum } from './enums/clan-reserve.enum';
import { SelectOptionType } from '../../components/select/types/select-option.type';
import moment from 'moment';
import { map, share, takeWhile, timer } from 'rxjs';
import { InventoryService } from '../../commons/services/inventory.service';
import { ClanReserveData, ClanReservesResponse, Reserve, StrongholdService } from '../../../generated-api/stronghold';
import { MembersService } from '../../../generated-api/members';

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
    protected clanReserves: DefaultHttpType & { reserves?: ClanReserveType[] } = { ...defaultHttpType };
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
        private readonly inventory: InventoryService,
        protected readonly member: MemberService,
        protected readonly mode: ModeService,
        // ANGULAR
        private readonly router: Router,
        private readonly title: Title,
        private readonly snackBar: MatSnackBar,
        // PIPE
        private readonly sentenceCasePipe: SentenceCasePipe,
        // API
        private readonly membersService: MembersService,
        private readonly strongholdService: StrongholdService
    ) {}

    /**
     * Implementation of the {@link OnInit} interface
     */
    ngOnInit(): void {
        if (!this.member.isAdmin || this.member.isVisitor) {
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
        this.membersService.updateMembers(this.member.accessToken).subscribe({
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
        const clanReserve: ClanReserveType | undefined = this.clanReserves.reserves?.find(
            (clanReserves: ClanReserveType): boolean => clanReserves.type === type
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

        this.strongholdService
            .activateReserve(this.inventory.applicationId, this.member.accessToken, level, clanReserve.type, 'fr')
            .subscribe({
                next: (value: any): void => {
                    if (value.status === 'error') {
                        this.snackBar.open('La reserve ne doit plus existé, merci de recharger la page', '', {
                            duration: this.snackBarDuration,
                        });
                    } else {
                        this.snackBar.open('La réserve a bien été activée', '', { duration: this.snackBarDuration });
                        this.createTimer(clanReserve, option.metadata);
                        this.checkActivatedReserves();
                    }
                },
                error: (err: any): void => {
                    console.error(err);
                    this.snackBar.open("Une erreur est survenue lors de l'activation de la reserve, merci de réessayer plus tard", '', {
                        duration: this.snackBarDuration,
                    });
                },
            });
    }

    /**
     * Get all the clan reserves with the wot api
     * @private
     */
    private getClanReserves(): void {
        this.strongholdService.clanReserves(this.inventory.applicationId, this.member.accessToken, 'fr').subscribe({
            next: (response: ClanReservesResponse): void => {
                if (response.status === 'error') {
                    this.clanReserves.isError = true;
                    this.clanReserves.isLoading = false;
                    return;
                }

                response.data
                    .filter((clanReserve: ClanReserveData) => !clanReserve.disposable)
                    .forEach((clanReserve: ClanReserveData): void => {
                        this.clanReservesFormGroup.addControl(clanReserve.type, new FormControl());

                        if (!this.clanReserves.reserves) {
                            this.clanReserves.reserves = [];
                        }

                        const clanReserves: ClanReserveType = {
                            name: clanReserve.name,
                            type: clanReserve.type,
                            bonus_type: clanReserve.bonus_type,
                            options: [],
                            link_to: ClanReserveEnum[clanReserve.type as keyof typeof ClanReserveEnum],
                        };

                        clanReserve.in_stock.forEach((reserve: Reserve): void => {
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
                if (this.clanReserves.isError) {
                    return;
                }

                console.log(this.clanReserves);
                this.clanReserves.isLoading = false;
            },
        });
    }

    /**
     * Checks the bond reserves
     * @private
     */
    private checkActivatedReserves(): void {
        this.clanReserves.reserves?.forEach((clanReserves: ClanReserveType): void => {
            const linked = this.clanReserves.reserves?.find((value: ClanReserveType): boolean => value.type === clanReserves.link_to);

            if (linked?.active_till) {
                clanReserves.active_till = linked.active_till;
                clanReserves.duration = linked.duration;
                clanReserves.clock = linked.clock;
            }
        });
    }

    /**
     * Create the timer when the reserve is activated or has been activated
     * @param clanReserve The clan reserve
     * @param reserve The in stock reserve
     * @private
     */
    private createTimer(clanReserve: ClanReserveType, reserve: Reserve): void {
        const target = new Date();
        target.setHours(target.getHours() + reserve.action_time / 3600);
        const linked = this.clanReserves.reserves?.find((value: ClanReserveType): boolean => value.type === clanReserve.link_to);

        clanReserve.active_till = clanReserve.active_till ?? target;
        clanReserve.duration = reserve.action_time;
        timer(0, 1000)
            .pipe(
                map(() => new Date()),
                share(),
                takeWhile((date: Date): boolean => {
                    const duration = moment.duration(moment(clanReserve.active_till).diff(date));
                    if (duration.seconds() <= 0 && duration.minutes() <= 0 && duration.hours() <= 0) {
                        clanReserve.duration = undefined;
                        clanReserve.active_till = undefined;
                        clanReserve.clock = undefined;
                        reserve.amount--;

                        if (linked) {
                            linked.active_till = undefined;
                            linked.duration = undefined;
                            linked.clock = undefined;
                        }
                    }
                    return !(duration.seconds() < 0 && duration.minutes() < 0 && duration.hours() < 0);
                })
            )
            .subscribe((date: Date): void => {
                clanReserve.clock = moment.duration(moment(clanReserve.active_till).diff(date));
                if (linked) {
                    linked.clock = clanReserve.clock;
                }
            });
    }
}
