import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { MemberStore } from 'src/app/commons/stores/member.store';
import { WordingService } from '../../commons/services/wording.service';
import { FeatureStore } from '../../commons/stores/feature.store';
import { ModeStore } from '../../commons/stores/mode.store';
import { SentenceCasePipe } from '../../pipes/sentenceCase/sentence-case.pipe';

// TODO TO PASS IN PAGE FOLDER
@Component({
    selector: 'app-clan-war',
    templateUrl: './clan-war.component.html',
})
export class ClanWarComponent {
    constructor(
        private wording: WordingService,
        private headerStore: HeaderStore,
        private memberStore: MemberStore,
        private modeStore: ModeStore,
        private featureStore: FeatureStore,
        private router: Router,
        private title: Title
    ) {
        this.checkUser();
        this.patchHeaderAndFooter();

        this.title.setTitle(new SentenceCasePipe().transform(this.wording.header['clan-war']));
    }

    private patchHeaderAndFooter(): void {
        this.headerStore.patch({
            showHome: true,
            showTank: true,
            showWar: false,
        });
    }

    private checkUser(): void {
        if (this.memberStore.get('isVisitor') || this.modeStore.get('mobile') || !this.featureStore.get('clanWar')) {
            this.router.navigate(['/']).then((): void => {
                // Ignored
            });
        }
    }
}
