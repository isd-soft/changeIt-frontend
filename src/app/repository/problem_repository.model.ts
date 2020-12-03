import {Injectable} from '@angular/core';
import {Problem} from '../models/problem';
import {ProblemService} from '../service/problem.service';
import {HttpResponse} from '@angular/common/http';
import 'rxjs';
import {PaginationDetails} from '@app/models/paginationDetails';


@Injectable()
export class ProblemModel {

  private problems: Problem[] = new Array<Problem>();
  public hasNext: string;
  public hasPrevious: string;
  public totalPages: number;
  public totalElements: number;
  private locator = (p: Problem, id: number) => p.id == id;

  constructor(private problemService: ProblemService) {
  }

  getProblems(): Problem[]{
    return this.problems;
  }

  loadProblems(problems: Problem[]): void {
    this.problems = problems;
  }

  getProblem(id: number): Problem {
    return this.problems.find(p => this.locator(p, id));
  }

  getLatLang(address: string): any {
    return this.problemService.getLatLng(address);
  }

  saveProblem(problem: Problem): void {
    if (problem.id == 0 || problem.id == null) {
    this.problemService.saveProblem(problem)
        .subscribe(p => {
          this.problems.push(p);
          document.location.href = '/problem/' + p.id;
        });
    } else {
      this.problemService.updateProblem(problem).subscribe(p => {
        const index = this.problems
          .findIndex(item => this.locator(item, p.id));
        this.problems.splice(index, 1, p);
      });
    }
  }

  deleteProblem(id: number): void {
    this.problemService.deleteProblem(id).subscribe();
  }

}
