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

    constructor(private problemModel: ProblemModel) { }

    ngOnInit(): void { }

  getProblem(key: number): Problem {
    return this.problemModel.getProblem(key);
  }

  getProblems(): Problem[] {
    return this.problemModel.getProblems(this.voteSorting);
  }

  deleteProblem(key: number): void {
    this.problemModel.deleteProblem(key);
  }

  editProblem(problem: Problem): void {
    this.problemModel.saveProblem(problem);
  }

  createProblem(problem: Problem): void {
    this.problemModel.saveProblem(problem);
  }

  toggleVoteSorting(): void {
      this.voteSorting = !this.voteSorting;
  }
}
