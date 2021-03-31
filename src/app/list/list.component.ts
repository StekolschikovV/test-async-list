import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ListI} from '../interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input('list') item$!: Subject<ListI[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
