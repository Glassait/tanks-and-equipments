import { makeStateKey } from '@angular/core';
import type { TankOverview } from 'generated-api/tanks';
import type { WotNews } from 'generated-api/wot';
import type { FoldResult } from 'generated-api/fold';
import type { SelectItem } from 'fold';

// HOME
export const TANKS_OVERVIEW_KEY = makeStateKey<TankOverview[]>('tanksOverview');
export const WOT_NEWS_KEY = makeStateKey<WotNews[]>('wotNews');
export const FOLD_RESULTS_KEY = makeStateKey<FoldResult[]>('foldResults');

// TANK EQUIPMENTS
export const NATIONS_KEY = makeStateKey<SelectItem[]>('nations');
export const TIERS_KEY = makeStateKey<SelectItem[]>('tiers');
export const TYPES_KEY = makeStateKey<SelectItem[]>('types');
export const PRIORITIES_KEY = makeStateKey<SelectItem[]>('priorities');
export const ROLES_KEY = makeStateKey<SelectItem[]>('roles');
