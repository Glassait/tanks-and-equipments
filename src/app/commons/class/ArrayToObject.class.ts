export class ArrayToObject {
    static transform(array: string[]) {
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