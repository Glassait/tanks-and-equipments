import { Injectable } from '@angular/core';
import changelog from 'src/assets/json/changelog.json';
import { VersionType } from '../types/version.type';

@Injectable({
    providedIn: 'root',
})
export class ChangelogApi {
    private _changelogs = changelog;

    get changelogs(): VersionType[] {
        return this._changelogs.changelog;
    }
}
