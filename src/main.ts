import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

const dayNumber: number = new Date().getDay();

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.background = `url('/assets/backgrounds/bg-dark-${dayNumber}.png') center center no-repeat fixed`;
} else {
    document.documentElement.classList.add(`bg-light_${dayNumber}`);
    document.documentElement.style.background = `url('/assets/backgrounds/bg-light-${dayNumber}.png') center center no-repeat fixed`;
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
