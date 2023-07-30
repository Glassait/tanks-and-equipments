import { ShellEnum } from '../enums/shell.enum';

export type Shell = {
    name: ShellEnum;
    amount: number;
    premium: boolean;
};

export type FieldComposant = {
    name: string;
    image: string;
    active: boolean;
};

export type Field = {
    level: number;
    field: {
        left: FieldComposant;
        right: FieldComposant;
    } & Record<string, FieldComposant>;
};

export type Equipment = {
    name: string;
    modernized: boolean;
};

export type Equipments = {
    first: Equipment[];
    second: Equipment[];
};

export type Consomables = {
    first: string[];
    second: string[];
};

export type Directive = {
    name: string;
    image: string;
};

export type TankData = {
    name: string;
    priority: number;
    crew: string[];
    skills: string[][];
    shells: Shell[];
    fields: Field[];
    equipments: Equipments;
    consomables: Consomables;
    directive: Directive;
};

export type Tanks = {
    data: TankData[];
};
