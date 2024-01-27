import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModeService } from '../../commons/abstract/mode.service';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { WordingService } from '../../commons/services/wording.service';
import { HeaderStore } from '../../commons/stores/header.store';
import { VersionType } from '../../commons/types/version.type';
import { Icon } from '../../commons/utils/icon.util';
import { IconColorEnum } from '../../components/icon/enums/icon-enum';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';
import changelog from 'src/assets/json/changelog.json';

@Component({
    selector: 'app-changelog',
    templateUrl: './changelog.component.html',
})
export class ChangelogComponent implements OnInit {
    //region PROTECTED FIELD
    /**
     * Represent the field for the link with the json
     * @protected
     */
    protected changelogs: VersionType[];
    //endregion

    //region ENUM
    protected readonly ModeEnum = ModeEnum;
    protected readonly IconColorEnum = IconColorEnum;
    protected readonly Icon = Icon;

    //endregion

    constructor(
        // SERVICE
        protected readonly modeService: ModeService,
        private readonly wording: WordingService,
        private readonly headerStore: HeaderStore,
        // ANGULAR
        private readonly title: Title,
        // PIPE
        private readonly sentenceCasePipe: SentenceCasePipe
    ) {}

    /**
     * Implementation of the {@link OnInit} interface
     */
    ngOnInit(): void {
        this.changelogs = changelog as unknown as VersionType[];

        this.headerStore.patch({
            showHome: true,
            showTank: true,
            showWar: true,
            showAdmin: true,
        });

        this.title.setTitle(this.sentenceCasePipe.transform(this.wording.footer.changelog));
    }
}
