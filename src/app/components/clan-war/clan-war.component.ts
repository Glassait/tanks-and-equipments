import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { MemberStore } from 'src/app/commons/stores/member.store';
import { WordingService } from '../../commons/services/wording.service';
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
        private router: Router,
        private title: Title
    ) {
        this.checkUser();
        this.setHeaderVariable();

        this.title.setTitle(
            new SentenceCasePipe().transform(this.wording.header.clanWar)
        );
    }

    private setHeaderVariable(): void {
        this.headerStore.patch({
            showHome: true,
            showTank: true,
            showWar: false,
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
