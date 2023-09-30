import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ColorEnum } from '../../commons/enums/color.enum';
import { IconColorEnum } from '../../commons/enums/icon-enum';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { WordingService } from '../../commons/services/wording.service';
import { FooterStore } from '../../commons/stores/footer.store';
import { HeaderStore } from '../../commons/stores/header.store';
import { MemberStore } from '../../commons/stores/member.store';
import { ModeStore } from '../../commons/stores/mode.store';
import { SentenceCasePipe } from '../../pipes/sentenceCase/sentence-case.pipe';
import { UnsubscribeComponent } from '../commons/unsubscribe.component';

@Component({
    selector: 'app-agreements',
    templateUrl: './agreements.component.html',
})
export class AgreementsComponent extends UnsubscribeComponent implements OnInit {
    protected isDarkMode: boolean;
    protected readonly IconColorEnum = IconColorEnum;

    constructor(
        protected wording: WordingService,
        private memberStore: MemberStore,
        private headerStore: HeaderStore,
        private modeStore: ModeStore,
        private footerStore: FooterStore,
        private router: Router,
        private title: Title
    ) {
        super();
        this.checkUser();
        this.patchHeaderAndFooter();

        this.title.setTitle(new SentenceCasePipe().transform(this.wording.footer.agreements));
    }

    ngOnInit(): void {
        this.addSubscription(
            this.modeStore.watch().subscribe((modeInterface: ModeInterface): void => {
                this.isDarkMode = modeInterface.color === ColorEnum.DARK;
            })
        );
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
