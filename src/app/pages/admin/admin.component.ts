import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MemberService } from '../../commons/abstract/member.service';
import { ModeService } from '../../commons/abstract/mode.service';
import { WordingService } from '../../commons/services/wording.service';
import { HeaderStore } from '../../commons/stores/header.store';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';
import { MembersApi } from '../../commons/api/members.api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-home',
    templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
    //region PROTECTED FIELD
    protected updateBddLoading: boolean = false;

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
        private readonly snackBar: MatSnackBar,
        // PIPE
        private readonly sentenceCasePipe: SentenceCasePipe,
        // API
        private readonly membersApi: MembersApi
    ) {}

    /**
     * Implementation of the {@link OnInit} interface
     */
    ngOnInit(): void {
        if (!this.memberService.isAdmin || this.memberService.isVisitor) {
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

    /**
     * Action callback fot the update button
     */
    protected actualiseBdd = (): void => {
        this.updateBddLoading = true;
        this.membersApi.updateMember(this.memberService.accessToken).subscribe({
            next: (_value: any): void => {},
            error: (err: any): void => {
                console.error(err);
                this.snackBar.open('Une erreur est survenue lors de la mise à jour de la base de données', '', { duration: 2000 });
            },
            complete: (): void => {
                setTimeout((): void => {
                    this.updateBddLoading = false;
                }, 10000);
                this.snackBar.open('La base de données a bien été mise à jour', '', { duration: 2000 });
            },
        });
    };
}
