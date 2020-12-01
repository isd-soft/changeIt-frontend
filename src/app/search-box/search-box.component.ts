import {Component,Input, OnInit, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  searchTerm: string;

  @Output() searchCriteria = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  searchThis() {
    this.searchCriteria.emit(this.searchTerm);
  }
}
