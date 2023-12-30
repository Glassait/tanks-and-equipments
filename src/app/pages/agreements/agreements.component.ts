import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MemberService } from '../../commons/abstract/member.service';
import { ModeService } from '../../commons/abstract/mode.service';
import { UnsubscribeDirective } from '../../commons/directives/unsubscribe.directive';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { WordingService } from '../../commons/services/wording.service';
import { HeaderStore } from '../../commons/stores/header.store';
import { ButtonSizeEnum } from '../../components/button/enums/button-size.enum';
import { ButtonThemeEnum } from '../../components/button/enums/button-theme.enum';
import { IconColorEnum } from '../../components/icon/enums/icon-enum';
import { SentenceCasePipe } from '../../pipes/sentenceCase/sentence-case.pipe';

@Component({
    selector: 'app-agreements',
    templateUrl: './agreements.component.html',
})
export class AgreementsComponent extends UnsubscribeDirective implements OnInit {
    //region ENUM
    protected readonly IconColorEnum = IconColorEnum;
    protected readonly ModeEnum = ModeEnum;
    protected readonly ButtonThemeEnum = ButtonThemeEnum;
    protected readonly ButtonSizeEnum = ButtonSizeEnum;
    //endregion

    constructor(
        // SERVICE
        protected readonly modeService: ModeService,
        private readonly wording: WordingService,
        protected readonly memberService: MemberService,
        // STORE
        private readonly headerStore: HeaderStore,
        // ANGULAR
        private readonly router: Router,
        private readonly title: Title,
        // PIPE
        private readonly sentenceCasePipe: SentenceCasePipe
    ) {
        super();
    }

    /**
     * Implementation of the {@link OnInit} interface
     */
    ngOnInit(): void {
        if (this.memberService.isVisitor) {
            this.router.navigate(['/']).then((): void => {});
        }

        this.headerStore.patch({
            showHome: true,
            showTank: true,
            showWar: true,
        });

        this.title.setTitle(this.sentenceCasePipe.transform(this.wording.footer.agreements));
    }

    /**
     * Callback for the button, open in new tab the link
     * @param link The link to open
     * @protected
     */
    protected redirectTo(link: string): void {
        window.open(link);
    }
}
