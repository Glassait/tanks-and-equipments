import { Injectable } from '@angular/core';
import { CookieNameEnum } from '../enums/cookie-name.enum';
import { FeaturesStore } from '../stores/features.store';
import { FeatureDto, FeaturesService } from '../../../generated-api/features';
import { DateCustom } from '../utils/date.custom';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarDuration } from '../variables.global';

@Injectable({
    providedIn: 'root',
})
export class FeaturesApi {
    constructor(
        // OPEN API
        private readonly featuresService: FeaturesService,
        // STORE
        private readonly featuresStore: FeaturesStore,
        // SERVICE
        private readonly cookie: CookieService,
        // ANGULAR
        private readonly snackBar: MatSnackBar
    ) {}

    /**
     * Get the feature from the server and store it in the store
     * @param access_token - The wot access token
     */
    public getFeature(access_token: string): void {
        const cookie: string = this.cookie.get(CookieNameEnum.FEATURES);
        if (cookie) {
            this.featuresStore.patch(JSON.parse(cookie));
            return;
        }

        let feature: FeatureDto;

        this.featuresService.features(access_token).subscribe({
            next: (value: FeatureDto): void => {
                this.featuresStore.patch(value);
                feature = value;
            },
            error: err => {
                console.log(err);
            },
            complete: (): void => {
                this.setFeatureCookie(feature);
            },
        });
    }

    /**
     * Set the feature cookie
     * @param feature The value to store in the cookie
     * @private
     */
    public setFeatureCookie(feature: FeatureDto): void {
        this.cookie.set(CookieNameEnum.FEATURES, JSON.stringify(feature), DateCustom.getTodayDatePlusTenMinute());
    }

    /**
     * Update the feature specified in the database
     * @param feature The feature to update
     * @param access_token The WoT access token
     */
    public updateFeature(feature: string, access_token: string): void {
        this.featuresService.updateFeatures(access_token, feature).subscribe({
            next: (dto: FeatureDto): void => {
                this.featuresStore.patch(dto);
                this.setFeatureCookie(dto);
            },
            error: err => {
                console.error(err);
                this.snackBar.open("Une erreur est survenue lors du changement d'état de la feature", '', { duration: snackBarDuration });
            },
            complete: (): void => {
                const status = this.featuresStore.get(feature as keyof FeatureDto);

                this.snackBar.open(`${status ? 'Désactivation' : 'Activation'} de la fonctionnalité réalisé avec succès`, '', {
                    duration: snackBarDuration,
                });
            },
        });
    }
}
