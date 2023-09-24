export class Icon {
    private readonly _name: string;
    private readonly _data: string;
    private readonly _isStrokeSVG: boolean;

    constructor(name: string, isStroke: boolean, data: string) {
        this._name = name;
        this._data = data;
        this._isStrokeSVG = isStroke;
    }

    public get name(): string {
        return this._name;
    }

    public get data(): string {
        return this._data;
    }

    public get isStroke(): boolean {
        return this._isStrokeSVG;
    }
}
