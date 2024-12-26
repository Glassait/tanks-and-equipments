import { makeStateKey, StateKey } from '@angular/core';
import { FoldResult, TankOverview, WotNews } from 'fold';

// HOME
export const TANKS_OVERVIEW_KEY: StateKey<TankOverview[]> = makeStateKey('tanksOverview');
export const WOT_NEWS_KEY: StateKey<WotNews[]>  = makeStateKey('wotNews');
export const FOLD_RESULTS_KEY: StateKey<FoldResult[]>  = makeStateKey('foldResults');
