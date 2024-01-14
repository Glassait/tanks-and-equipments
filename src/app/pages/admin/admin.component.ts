import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MemberService } from '../../commons/abstract/member.service';
import { ModeService } from '../../commons/abstract/mode.service';
import { WordingService } from '../../commons/services/wording.service';
import { HeaderStore } from '../../commons/stores/header.store';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';

@Component({
    selector: 'app-home',
    templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
    //endregion

    constructor(
        // STORE
        private readonly headerStore: HeaderStore,
        // SERVICE
        private readonly wording: WordingService,
        protected readonly memberService: MemberService,
        protected readonly modeService: ModeService,
        // ANGULAR
        private readonly router: Router,
        private readonly title: Title,
        // PIPE
        private readonly sentenceCasePipe: SentenceCasePipe
    ) {}

    /**
     * Implementation of the {@link OnInit} interface
     */
    ngOnInit(): void {
        if (!this.memberService.isAdmin || !this.memberService.isVisitor) {
            this.router.navigate(['/']).then((): void => {});
        }

        this.title.setTitle(this.sentenceCasePipe.transform(this.wording.header.admin));

        this.headerStore.patch({
            showHome: true,
            showWar: true,
            showTank: true,
            showAdmin: false,
        });
    }
}
