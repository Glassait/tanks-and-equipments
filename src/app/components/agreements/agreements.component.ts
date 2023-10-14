import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { UnsubscribeDirective } from '../../commons/directives/unsubscribe.directive';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { WordingService } from '../../commons/services/wording.service';
import { HeaderStore } from '../../commons/stores/header.store';
import { MemberStore } from '../../commons/stores/member.store';
import { ModeStore } from '../../commons/stores/mode.store';
import { SentenceCasePipe } from '../../pipes/sentenceCase/sentence-case.pipe';
import { IconColorEnum } from '../icon/enums/icon-enum';

@Component({
    selector: 'app-agreements',
    templateUrl: './agreements.component.html',
})
export class AgreementsComponent extends UnsubscribeDirective implements OnInit {
    protected isDarkMode: boolean;
    protected readonly IconColorEnum = IconColorEnum;

    constructor(
        protected wording: WordingService,
        private memberStore: MemberStore,
        private headerStore: HeaderStore,
        private modeStore: ModeStore,
        private router: Router,
        private title: Title
    ) {
        super();
        this.checkUser();
        this.patchHeaderAndFooter();

        this.title.setTitle(new SentenceCasePipe().transform(this.wording.footer.agreements));
    }

    ngOnInit(): void {
        this.modeStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((modeInterface: ModeInterface): void => {
                this.isDarkMode = modeInterface.color === ModeEnum.DARK;
            });
    }

    private patchHeaderAndFooter(): void {
        this.headerStore.patch({
            showHome: true,
            showTank: true,
            showWar: !this.modeStore.get('mobile'),
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
