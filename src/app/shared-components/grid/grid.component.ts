import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

    constructor() { }

    @Output() addEvent = new EventEmitter<any>();
    @Output() editEvent = new EventEmitter<any>();
    @Output() deleteEvent = new EventEmitter<any>();

  ngOnInit() {
  }

  //data
  private _data: [any];
  @Input()
  set data(data: [any]) {
      this._data = data;
  }
  get data(): [any] {
      return this._data;
  }

  //columns
  private _columns: [any];
  @Input()
  set columns(columns: [any]) {
      this._columns = columns;
  }
  get columns(): [any] {
      return this._columns;
  }

  //toolbarItems
  private _toolbarItems: [any];
  @Input()
  set toolbarItems(toolbarItems: [any]) {
      this._toolbarItems = toolbarItems;
  }
  get toolbarItems(): [any] {
      return this._toolbarItems;
  }

  add(args) {
      this.addEvent.emit(args);
  }
  edit(args) {
      this.editEvent.emit(args);
  }
  delete(args) {
      this.deleteEvent.emit(args);
  }
}
