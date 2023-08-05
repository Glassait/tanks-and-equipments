import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TanksDataService } from 'src/app/commons/services/tank-data.service';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { MemberStore } from 'src/app/commons/stores/member.store';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { ModeStore } from '../../commons/stores/mode.store';

@Component({
    selector: 'app-tanks-equipment',
    templateUrl: './tanks-equipment.component.html',
})
export class TanksEquipmentComponent implements OnDestroy {
    protected isDark: boolean;
    protected isMobile: boolean;

    private modeSubscribe: Subscription;

    constructor(
        protected tanksData: TanksDataService,
        private headerStore: HeaderStore,
        private memberStore: MemberStore,
        private modeStore: ModeStore,
        private router: Router
    ) {
        this.checkUser();
        this.patchHeader();
        this.createSubscribe();
    }

    ngOnDestroy(): void {
        this.modeSubscribe.unsubscribe();
    }

    private checkUser(): void {
        if (!this.memberStore.isVisitor()) {
            return;
        }

        this.router.navigate(['/']).then((_r: boolean): void => {
            // Ignored
        });
    }

    private patchHeader(): void {
        this.headerStore.patch({
            showHome: true,
            showTank: false,
            showWar: true,
        });
    }

    private createSubscribe(): void {
        this.modeSubscribe = this.modeStore
            .watch()
            .subscribe((modeInterface: ModeInterface): void => {
                this.isDark = modeInterface.dark;
                this.isMobile = modeInterface.mobile;
            });
    }
}
