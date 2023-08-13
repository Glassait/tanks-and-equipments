import { Component, Input } from '@angular/core';
import { WordingService } from '../../../commons/services/wording.service';
import { VersionType } from '../../../commons/types/version.type';

@Component({
    selector: 'card-changelog',
    templateUrl: './card-changelog.component.html',
})
export class CardChangelogComponent {
    @Input() changelog: VersionType;

    constructor(protected wording: WordingService) {}
}
