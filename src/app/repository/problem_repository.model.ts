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

  getProblems(): Problem[] {
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