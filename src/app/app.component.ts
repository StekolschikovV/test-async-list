import {Component} from '@angular/core';
import {ListI} from './interface';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  list$ = new Subject<ListI[]>();

  constructor() {
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
  }
}
