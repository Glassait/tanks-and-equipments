import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModeService } from '../../commons/abstract/mode.service';
import { UnsubscribeDirective } from '../../commons/directives/unsubscribe.directive';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { WordingService } from '../../commons/services/wording.service';
import { HeaderStore } from '../../commons/stores/header.store';
import { MemberStore } from '../../commons/stores/member.store';
import { ButtonSizeEnum } from '../../components/button/enums/button-size.enum';
import { ButtonThemeEnum } from '../../components/button/enums/button-theme.enum';
import { IconColorEnum } from '../../components/icon/enums/icon-enum';
import { SentenceCasePipe } from '../../pipes/sentenceCase/sentence-case.pipe';

@Component({
    selector: 'app-agreements',
    templateUrl: './agreements.component.html',
})
export class AgreementsComponent extends UnsubscribeDirective implements OnInit {
    /**
     * ENUM
     * @protected
     */
    protected readonly IconColorEnum = IconColorEnum;
    protected readonly ModeEnum = ModeEnum;
    protected readonly ButtonThemeEnum = ButtonThemeEnum;
    protected readonly ButtonSizeEnum = ButtonSizeEnum;

    constructor(
        // SERVICE
        protected modeService: ModeService,
        private wording: WordingService,
        // STORE
        private memberStore: MemberStore,
        private headerStore: HeaderStore,
        // ANGULAR
        private router: Router,
        private title: Title
    ) {
        super();
    }

    /**
     * Implementation of the {@link OnInit} interface
     */
    ngOnInit(): void {
        if (this.memberStore.isVisitor()) {
            this.router.navigate(['/']).then((): void => {});
        }

        this.headerStore.patch({
            showHome: true,
            showTank: true,
            showWar: !this.modeService.isMobile,
        });

        this.title.setTitle(new SentenceCasePipe().transform(this.wording.footer.agreements));

        this.modeService.watchModeStore();
    }

    protected redirectTo(link: string): void {
        window.open(link);
    }
}
