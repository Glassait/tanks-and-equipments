import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { MemberStore } from 'src/app/commons/stores/member.store';
import { WordingService } from '../../commons/services/wording.service';
import { FooterStore } from '../../commons/stores/footer.store';
import { SentenceCasePipe } from '../../pipes/sentenceCase/sentence-case.pipe';

@Component({
    selector: 'app-clan-war',
    templateUrl: './clan-war.component.html',
})
export class ClanWarComponent {
    constructor(
        private wording: WordingService,
        private headerStore: HeaderStore,
        private memberStore: MemberStore,
        private footerStore: FooterStore,
        private router: Router,
        private title: Title
    ) {
        this.checkUser();
        this.patchHeaderAndFooter();

        this.title.setTitle(
            new SentenceCasePipe().transform(this.wording.header.clanWar)
        );
    }

    private patchHeaderAndFooter(): void {
        this.headerStore.patch({
            showHome: true,
            showTank: true,
            showWar: false,
        });

        this.footerStore.patch({
            showChangelog: true,
            showAgreement: true,
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
