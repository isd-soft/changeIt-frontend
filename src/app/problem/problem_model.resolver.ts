import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProblemModel} from '../repository/problem_repository.model';
import {ProblemService} from '../services/problem.service';
import {Problem} from '../models/problem';


@Injectable()
export class ProblemModelResolver {

    constructor(
        private model: ProblemModel,
        private dataSource: ProblemService) { }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Problem[]> {

        if (this.model.getProblems().length === 0) {
            // this.messages.reportMessage(new Message('Loading data...'));
            return this.dataSource.getData();
        }
    }
}
