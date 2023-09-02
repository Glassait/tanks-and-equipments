export class ArrayCustom {
    public static transformToObject<TArray extends string>(array: TArray[]) {
        let obj = {};
        array.forEach(valeur => {
            const st = valeur.split('=');
            obj = {
                ...obj,
                [st[0]]: st[1],
            };
        });
        return obj;
    }

    public static sortArrayOfObjectFromNumberDecroissant<T>(
        array: T[],
        key: keyof T
    ) {
        return array.sort((a, b) => (b[key] as number) - (a[key] as number));
    }
}
