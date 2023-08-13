import { Component, OnDestroy } from '@angular/core';
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
import { SentenceCasePipe } from '../../pipes/sentenceCase/sentence-case.pipe';

@Component({
    selector: 'app-tanks-equipment',
    templateUrl: './tanks-equipment.component.html',
})
export class TanksEquipmentComponent implements OnDestroy {
    protected isDark: boolean;
    protected isMobile: boolean;

    private modeSubscribe: Subscription;

    constructor(
        protected tanksData: TanksDataService,
        private wording: WordingService,
        private headerStore: HeaderStore,
        private memberStore: MemberStore,
        private modeStore: ModeStore,
        private footerStore: FooterStore,
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
            showWar: true,
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
}
