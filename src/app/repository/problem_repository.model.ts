import {Injectable} from '@angular/core';
import {Problem} from '../models/problem';
import {ProblemService} from '../services/problem.service';

@Injectable()
export class ProblemModel {
  private problems: Problem[] = new Array<Problem>();
  private locator = (p: Problem, id: number) => p.problem_id == id;

  constructor(private problemService: ProblemService) {
    problemService.getData().subscribe(data => {
      this.problems = data;
    });
  }

  getProblems(voteSorting?: boolean): Problem[] {
    if (voteSorting) {
      return this.problems.sort((a, b) => b.votesCount - a.votesCount);
    } else if (!voteSorting) {
      return this.problems.sort((a, b) => a.votesCount - b.votesCount);
    }
    return this.problems;
  }

  getProblem(id: number): Problem {
    return this.problems.find(p => this.locator(p, id));
  }

  saveProblem(problem: Problem): void {
    if (problem.problem_id == 0 || problem.problem_id == null) {
      this.problemService.saveProblem(problem)
        .subscribe(p => this.problems.push(p));
    } else {
      this.problemService.updateProblem(problem).subscribe(p => {
        const index = this.problems
          .findIndex(item => this.locator(item, p.problem_id));
        this.problems.splice(index, 1, p);
      });
    }
  }

  deleteProblem(id: number): void {
    this.problemService.deleteProblem(id).subscribe(() => {
      const index = this.problems.findIndex(p => this.locator(p, id));
      if (index > -1) {
        this.problems.splice(index, 1);
      }
    });
  }

}
