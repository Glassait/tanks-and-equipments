import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TanksDataService } from 'src/app/commons/services/tank-data.service';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { MemberStore } from 'src/app/commons/stores/member.store';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { WordingService } from '../../commons/services/wording.service';
import { FooterStore } from '../../commons/stores/footer.store';
import { ModeStore } from '../../commons/stores/mode.store';
import { TanksDataStore } from '../../commons/stores/tanks-data.store';
import { TankData } from '../../commons/types/tanks-data.type';
import { SentenceCasePipe } from '../../pipes/sentenceCase/sentence-case.pipe';

@Component({
    selector: 'app-tanks-equipment',
    templateUrl: './tanks-equipment.component.html',
})
export class TanksEquipmentComponent implements OnInit, OnDestroy {
    protected showSpinner: boolean = true;
    protected isDark: boolean;
    protected isMobile: boolean;

    protected tanksData: TankData[];

    private modeSubscribe: Subscription;

    constructor(
        private wording: WordingService,
        private tankDataService: TanksDataService,
        private headerStore: HeaderStore,
        private memberStore: MemberStore,
        private modeStore: ModeStore,
        private footerStore: FooterStore,
        private tanksDataStore: TanksDataStore,
        private router: Router,
        private title: Title
    ) {
        this.checkUser();
        this.patchHeaderAndFooter();
        this.createSubscribe();

        this.title.setTitle(
            new SentenceCasePipe().transform(
                this.wording.header.charEtEquipement
            )
        );
    }

    ngOnInit(): void {
        this.getTanksData();
    }

    ngOnDestroy(): void {
        this.modeSubscribe.unsubscribe();
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

        this.footerStore.patch({
            showChangelog: true,
            showAgreement: true,
        });
    }

    private createSubscribe(): void {
        this.modeSubscribe = this.modeStore
            .watch()
            .subscribe((modeInterface: ModeInterface): void => {
                this.isDark = modeInterface.dark;
                this.isMobile = modeInterface.mobile;
            });
    }

    private getTanksData(): void {
        if (this.tanksDataStore.get('data').length > 0) {
            this.tanksData = this.tanksDataStore.get('data');
            this.showSpinner = false;
        } else {
            this.tankDataService.queryTanksData().subscribe({
                next: (tankData: TankData[]): void => {
                    this.tanksData = tankData;
                    this.tanksDataStore.set('data', tankData);
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
