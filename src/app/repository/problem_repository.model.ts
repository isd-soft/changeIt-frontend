import {Injectable} from '@angular/core';
import {Problem} from '../models/problem';
import {ProblemService} from '../services/problem.service';

@Injectable()
export class ProblemModel {
  private problem: Problem[] = new Array<Problem>();
  private locator = (p: Problem, id: number) => p.problem_id == id;

  constructor(private problemService: ProblemService) {
    this.problemService.getData().subscribe(data => this.problem = data);
  }

  getProblems(voteSorting?: boolean): Problem[] {
    if (voteSorting) {
      return this.problem.sort((a, b) => b.votes - a.votes);
    } else if (!voteSorting) {
      return this.problem.sort((a, b) => a.votes - b.votes);
    }
    return this.problem;
  }

  getProblemsByDate(dateSorting?: boolean): Problem[] {
    if (dateSorting) {
      return this.problem.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
    } else if (!dateSorting) {
      return this.problem.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
    }
    return this.problem;
  }

  getProblem(id: number): Problem {
    return this.problem.find(p => this.locator(p, id));
  }

  saveProblem(problem: Problem): void {
    if (problem.problem_id == 0 || problem.problem_id == null) {
      this.problemService.saveProblem(problem)
        .subscribe(p => this.problem.push(p));
    } else {
      this.problemService.updateProblem(problem).subscribe(p => {
        const index = this.problem
          .findIndex(item => this.locator(item, p.problem_id));
        this.problem.splice(index, 1, p);
      });
    }
  }

  deleteProblem(id: number): void {
    this.problemService.deleteProblem(id).subscribe(() => {
      const index = this.problem.findIndex(p => this.locator(p, id));
      if (index > -1) {
        this.problem.splice(index, 1);
      }
    });
  }

}
