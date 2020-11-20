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
    dateSorting = true;
    sort = 'vote';

    constructor(
      private problemModel: ProblemModel,
) { }

    ngOnInit(): void { }


    getProblems(some: string): Problem[] {
      if (some == 'vote'){
        return this.problemModel.getProblems(this.voteSorting);
      } else {
        return this.problemModel.getProblemsByDate(this.dateSorting);
      }
    }

    toggleVoteSorting(): void {
      this.sort = 'vote';
      this.voteSorting = !this.voteSorting;
    }

    toggleDateSorting(): void {
      this.sort = 'date';
      this.dateSorting = !this.dateSorting;
    }

}
