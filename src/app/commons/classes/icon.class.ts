export class Icon {
    private _name: string;
    private _data: string;

    constructor(name: string, data: string) {
        this._name = name;
        this._data = data;
    }

    public get name(): string {
        return this._name;
    }

    public get data(): string {
        return this._data;
    }
}
