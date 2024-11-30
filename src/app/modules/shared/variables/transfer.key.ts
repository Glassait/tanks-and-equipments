import { makeStateKey } from '@angular/core';
import type { TankOverview } from 'generated-api/tanks';
import type { WotNews } from 'generated-api/wot';
import type { FoldResult } from 'generated-api/fold';

// HOME
export const TANKS_OVERVIEW_KEY = makeStateKey<TankOverview[]>('tanksOverview');
export const WOT_NEWS_KEY = makeStateKey<WotNews[]>('wotNews');
export const FOLD_RESULTS_KEY = makeStateKey<FoldResult[]>('foldResults');
