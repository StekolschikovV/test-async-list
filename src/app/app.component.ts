import {Component} from '@angular/core';
import {IGithubResponse, ListI} from './interface';
import {forkJoin, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  list$ = new Subject<ListI[]>();
  listJF$ = new Subject<ListI[]>();


  constructor(public http: HttpClient) {
    this.list$.next([{
        title: '',
        link: '',
        hash: null,
      }]
    );

    setTimeout(() => {
      this.list$.next([
          {
            title: 'Daofin - [Track 2. Web3.0 Development Grant] #32',
            link: 'https://github.com/Waves-Association/grants-program/issues/32',
            hash: null,
          },
          {
            title: '[Track 1. Disruptive Tech Grant] - Poison Ivy - Advanced WAVES.Exchange Trading Bot #35',
            link: 'https://github.com/Waves-Association/grants-program/issues/35',
            hash: null
          },
          {
            title: 'Funding for Dodo Drop #34',
            link: 'https://github.com/Waves-Association/grants-program/issues/34',
            hash: null
          }
        ]
      );
    }, 2000);

    setTimeout(() => {
      this.list$.next([
          {
            title: 'Daofin - [Track 2. Web3.0 Development Grant] #32',
            link: 'https://github.com/Waves-Association/grants-program/issues/32',
            hash: null,
          },
          {
            title: '[Track 1. Disruptive Tech Grant] - Poison Ivy - Advanced WAVES.Exchange Trading Bot #35',
            link: 'https://github.com/Waves-Association/grants-program/issues/35',
            hash: null
          },
          {
            title: 'Funding for Dodo Drop #34',
            link: 'https://github.com/Waves-Association/grants-program/issues/34',
            hash: null
          },
          {
            title: 'Daofin - [Track 2. Web3.0 Development Grant] #32',
            link: 'https://github.com/Waves-Association/grants-program/issues/32',
            hash: null,
          },
          {
            title: '[Track 1. Disruptive Tech Grant] - Poison Ivy - Advanced WAVES.Exchange Trading Bot #35',
            link: 'https://github.com/Waves-Association/grants-program/issues/35',
            hash: null
          },
          {
            title: 'Funding for Dodo Drop #34',
            link: 'https://github.com/Waves-Association/grants-program/issues/34',
            hash: null
          }
        ]
      );
    }, 5000);

    this.list$.subscribe(e => {
      let listTemp = e
      let listOfReq: Observable<{}>[] = [];
      e.forEach(e => {
        listOfReq.push(
          this.http.get<IGithubResponse>(this.transformUrl(e.link))
        );
      });
      forkJoin(listOfReq).subscribe((results) => {

        let i = 0
        results.forEach( res => {
          let data: IGithubResponse = res as IGithubResponse
          listTemp[i].hash = data.body.length
          i++
        } )
        // listTemp
        this.listJF$.next(listTemp)
      });
    });
  }

  private transformUrl(url: string) {
    const urlObj = new URL(url);
    if (urlObj.host === 'github.com') {
      const urlObj = new URL(url);
      return `${urlObj.protocol}//api.${urlObj.host}/repos${urlObj.pathname}`;
    }
    return url;
  }
}
