import { ReplacePipe } from './replace.pipe';

describe('ReplacePipe', () => {
    it('create an instance', () => {
        const pipe = new ReplacePipe();
        expect(pipe).toBeTruthy();
    });

    it('should replace t by v', () => {
        const pipe = new ReplacePipe();

        const text = 'text';
        const transformedText = pipe.transform(text, 't', 'v');
        const expectedText = 'vexv';

        expect(transformedText).toEqual(expectedText);
    });

    it('should replace text by book', () => {
        const pipe = new ReplacePipe();

        const text = 'text';
        const transformedText = pipe.transform(text, 'text', 'book');
        const expectedText = 'book';

        expect(transformedText).toEqual(expectedText);
    });
});
