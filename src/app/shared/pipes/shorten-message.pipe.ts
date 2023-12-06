import { Pipe, PipeTransform } from '@angular/core';

/**
 * A pipe for sorting by answer date
 */
@Pipe({
  name: 'ShortenMessage',
})
export class ShortenMessagePipe implements PipeTransform {
  readonly maxMessageLength = 100;
  transform(text: string): string {
    if (text.length <= this.maxMessageLength) {
      return text;
    } else {
      return `${text.substring(0, this.maxMessageLength)}...`;
    }
  }
}
