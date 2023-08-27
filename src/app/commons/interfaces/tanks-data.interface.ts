import { TankData } from '../types/tanks-data.type';

export interface TanksDataInterface {
    data: TankData[];
}

export const INITIAL_STATE_TANKS_DATA: TanksDataInterface = {
    data: [],
};
