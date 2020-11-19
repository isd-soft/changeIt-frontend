import {Component, OnInit} from '@angular/core';
import {Problem} from '@app/models/problem';
import {ProblemModel} from '@app/repository/problem_repository.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

    voteSorting = true;

    constructor(
      private problemModel: ProblemModel,
) { }

    ngOnInit(): void { }


    getProblems(): Problem[] {
      return this.problemModel.getProblems(this.voteSorting);
    }

    toggleVoteSorting(): void {
        this.voteSorting = !this.voteSorting;
    }

}
