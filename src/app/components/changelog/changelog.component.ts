import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChangelogService } from '../../commons/services/changelog.service';
import { WordingService } from '../../commons/services/wording.service';
import { HeaderStore } from '../../commons/stores/header.store';
import { VersionType } from '../../commons/types/version.type';
import { SentenceCasePipe } from '../../pipes/sentenceCase/sentence-case.pipe';

@Component({
    selector: 'app-changelog',
    templateUrl: './changelog.component.html',
})
export class ChangelogComponent {
    protected changelogs: VersionType[];

    constructor(
        protected changelogService: ChangelogService,
        private wording: WordingService,
        private headerStore: HeaderStore,
        private title: Title
    ) {
        this.headerStore.patch({
            showHome: true,
            showWar: true,
            showTank: true,
        });

        this.changelogs = changelogService.changelogs;

        this.title.setTitle(
            new SentenceCasePipe().transform(this.wording.footer.changelog)
        );
    }
}
