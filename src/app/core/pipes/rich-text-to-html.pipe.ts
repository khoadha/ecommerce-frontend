import { Pipe, PipeTransform } from '@angular/core';
import * as DOMPurify from 'dompurify';

@Pipe({
  name: 'richTextToHtml'
})
export class RichTextToHtmlPipe implements PipeTransform {

  transform(richText: string): string {
    return DOMPurify.sanitize(richText);
  }

}
