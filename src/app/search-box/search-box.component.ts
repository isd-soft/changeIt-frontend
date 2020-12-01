import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Problem} from "@app/models/problem";
import {HomeComponent} from "@app/home";

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  @Input() searchTerm: string;
  @Output() problems: EventEmitter<Problem>;
  problemList: Problem[];

  constructor(private homeComponent: HomeComponent) {
    this.problems = new EventEmitter();
    this.problemList = this.homeComponent.getProblems();
  }

  ngOnInit(): void {
  }

}
