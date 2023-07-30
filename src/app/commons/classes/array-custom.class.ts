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
}
