import { SentenceCasePipe } from './sentence-case.pipe';

describe('SentenceCasePipe', (): void => {
    it('create an instance', (): void => {
        const pipe = new SentenceCasePipe();
        expect(pipe).toBeTruthy();
    });

    it('should make first letter in uppercase', () => {
        const pipe = new SentenceCasePipe();

        const text = 'text';
        const transformedText = pipe.transform(text);
        const expectedText = 'Text';

        expect(transformedText).toEqual(expectedText);
    });

    it('should not change the text when first letter is already in uppercase', () => {
        const pipe = new SentenceCasePipe();

        const text = 'Text';
        const transformedText = pipe.transform(text);
        const expectedText = 'Text';

        expect(transformedText).toEqual(expectedText);
    });

    it('should make first letter in uppercase in a sentence', () => {
        const pipe = new SentenceCasePipe();

        const text = 'this is a text';
        const transformedText = pipe.transform(text);
        const expectedText = 'This is a text';

        expect(transformedText).toEqual(expectedText);
    });
});
