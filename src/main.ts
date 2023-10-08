import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

const dayNumber: number = new Date().getDay();

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark', `bg-dark_${dayNumber}`);
} else {
    document.documentElement.classList.add(`bg-light_${dayNumber}`);
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
