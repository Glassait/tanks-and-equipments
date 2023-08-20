import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { WordingService } from '../../commons/services/wording.service';
import { FooterStore } from '../../commons/stores/footer.store';
import { HeaderStore } from '../../commons/stores/header.store';
import { MemberStore } from '../../commons/stores/member.store';
import { ModeStore } from '../../commons/stores/mode.store';
import { SentenceCasePipe } from '../../pipes/sentenceCase/sentence-case.pipe';

@Component({
    selector: 'app-agreements',
    templateUrl: './agreements.component.html',
})
export class AgreementsComponent implements OnInit, OnDestroy {
    protected isDarkMode: boolean;

    private modeSubscribe: Subscription;

    constructor(
        protected wording: WordingService,
        private memberStore: MemberStore,
        private headerStore: HeaderStore,
        private modeStore: ModeStore,
        private footerStore: FooterStore,
        private router: Router,
        private title: Title
    ) {
        this.checkUser();
        this.patchHeaderAndFooter();

        this.title.setTitle(
            new SentenceCasePipe().transform(this.wording.footer.agreements)
        );
    }

    ngOnDestroy(): void {
        this.modeSubscribe.unsubscribe();
    }

    ngOnInit(): void {
        this.modeSubscribe = this.modeStore
            .watch()
            .subscribe((modeInterface: ModeInterface): void => {
                this.isDarkMode = modeInterface.dark;
            });
    }

    private patchHeaderAndFooter(): void {
        this.headerStore.patch({
            showHome: true,
            showTank: true,
            showWar: !this.modeStore.get('mobile'),
        });

        this.footerStore.patch({
            showChangelog: true,
            showAgreement: false,
        });
    }

    private checkUser(): void {
        if (this.memberStore.isVisitor()) {
            this.router.navigate(['/']).then((): void => {
                // Ignored
            });
        }
    }
}
