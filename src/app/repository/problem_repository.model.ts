import {Injectable} from '@angular/core';
import {Problem} from '../models/problem';
import {ProblemService} from '../service/problem.service';

@Injectable()
export class ProblemModel {
  private problems: Problem[] = new Array<Problem>();
  private problemsByVoteAsc: Problem[] = new Array<Problem>();
  private problemsByVoteDesc: Problem[] = new Array<Problem>();
  private problemsByDateAsc: Problem[] = new Array<Problem>();
  private problemsByDateDesc: Problem[] = new Array<Problem>();
  private locator = (p: Problem, id: number) => p.problem_id == id;

  constructor(private problemService: ProblemService) {
    problemService.getDataByDateAsc().subscribe(data => {
      this.problems = data;
    });
    problemService.getDataByVoteAsc().subscribe(data => {
      this.problemsByVoteAsc = data;
    });
    problemService.getDataByVoteDesc().subscribe(data => {
      this.problemsByVoteDesc = data;
    });
    problemService.getDataByDateAsc().subscribe(data => {
      this.problemsByDateAsc = data;
    });
    problemService.getDataByDateDesc().subscribe(data => {
      this.problemsByDateDesc = data;
    });
  }

  getProblems(): Problem[]{
    return this.problemsByDateDesc;
  }

  getProblemsByVote(voteSorting?: boolean): Problem[] {
    if (voteSorting) {
      return this.problemsByVoteDesc;
    } else if (!voteSorting) {
      return this.problemsByVoteAsc;
    }
  }

  getProblemsByDate(dateSorting?: boolean): Problem[] {
    if (dateSorting) {
      return this.problemsByDateAsc;
    } else if (!dateSorting) {
      return this.problemsByDateDesc;
    }
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
