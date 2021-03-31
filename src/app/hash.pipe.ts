import { Pipe, PipeTransform } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IGithubResponse} from './interface';

@Pipe({
  name: 'hash',
  pure: false
})
export class HashPipe implements PipeTransform {

  private cachedData: any = null;
  private cachedUrl: any = '';

  constructor(private http: HttpClient) { }

  transform(url: any): any {
    if (url !== this.cachedUrl && typeof url === 'string') {
      url = this.transformUrl(url)
      this.cachedData = null;
      this.cachedUrl = url;
      this.http.get<IGithubResponse>(url, {
        headers: {accept: 'application/json; charset=utf-8'}
      }).subscribe(result => {
        this.cachedData = this.getHash(result.body)
        console.log( this.cachedData)
      });
    }

    return this.cachedData;
  }

  private transformUrl (url: string) {
    const urlObj = new URL(url)
    if (urlObj.host === 'github.com') {
      const urlObj = new URL(url)
      return `${urlObj.protocol}//api.${urlObj.host}/repos${urlObj.pathname}`
    }
    return url
  }

  private getHash (str: string, seed = 0) {
    let h1 = 0xdeadbeef ^ seed //eslint-disable-line no-bitwise
    let h2 = 0x41c6ce57 ^ seed //eslint-disable-line no-bitwise
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i)
      h1 = Math.imul(h1 ^ ch, 2654435761) //eslint-disable-line no-bitwise
      h2 = Math.imul(h2 ^ ch, 1597334677) //eslint-disable-line no-bitwise
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909) //eslint-disable-line no-bitwise
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909) //eslint-disable-line no-bitwise
    return 4294967296 * (2097151 & h2) + (h1 >>> 0) //eslint-disable-line no-bitwise
  }

}
