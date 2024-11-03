import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { CSP_NONCE, enableProdMode } from '@angular/core';
import { environment } from 'env/environment';

if (environment.production) {
    enableProdMode();
}

function getRandomHex(): string {
    return Math.floor(Math.random() * 16).toString(16);
}

function getNonceValue() {
    let hex = '';
    for (let i = 0; i < 16; i++) {
        hex += getRandomHex();
    }
    return hex;
}

let NONCE_VALUE = getNonceValue();

appConfig.providers.push({
    provide: CSP_NONCE,
    useValue: NONCE_VALUE,
});

const meta: HTMLMetaElement = document.createElement('meta');
meta.httpEquiv = 'Content-Security-Policy';
meta.content = `default-src 'self'; script-src 'self'; style-src 'self' 'nonce-${NONCE_VALUE}'; img-src 'self' https://eu-wotp.wgcdn.co; connect-src 'self'; font-src 'self';`;

document.querySelector('head')?.appendChild(meta);

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
