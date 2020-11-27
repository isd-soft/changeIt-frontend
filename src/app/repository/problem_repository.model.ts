import {Injectable} from '@angular/core';
import {Problem} from '../models/problem';
import {ProblemService} from '../service/problem.service';
import {HttpResponse} from '@angular/common/http';
import 'rxjs';
@Injectable()
export class ProblemModel {

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
  private problems: Problem[] = new Array<Problem>();
  private problemsByVoteAsc: Problem[] = new Array<Problem>();
  private problemsByVoteDesc: Problem[] = new Array<Problem>();
  private problemsByDateAsc: Problem[] = new Array<Problem>();
  private problemsByDateDesc: Problem[] = new Array<Problem>();
  addedProblemId: number;
  private locator = (p: Problem, id: number) => p.problem_id == id;

  getProblems(): Problem[]{
    return this.problems;
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
        .subscribe(p => {
          this.problems.push(p);
          document.location.href = '/problem/' + p.problem_id;
        });
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
