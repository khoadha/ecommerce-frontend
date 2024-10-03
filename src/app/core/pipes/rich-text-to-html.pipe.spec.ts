import { RichTextToHtmlPipe } from './rich-text-to-html.pipe';

describe('RichTextToHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new RichTextToHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
