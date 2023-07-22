import { ReplacePipe } from './replace.pipe';

describe('ReplacePipe', () => {
    const pipe = new ReplacePipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('Replace `b` to `_` in `abc`', () => {
        expect(pipe.transform('abc', 'b', '_')).toBe('a_c');
    });

    it('Replace `b` to `_` in `abcb`', () => {
        expect(pipe.transform('abcb', 'b', '_')).toBe('a_c_');
    });

    it('Replace `c` to `b` in `abcb` and replace `b` to `_` in the result', () => {
        const abbb = pipe.transform('abcb', 'c', 'b');
        expect(abbb).toBe('abbb');
        expect(pipe.transform(abbb, 'b', '_')).toBe('a___');
    });
});
