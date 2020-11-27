import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProblemModel} from '../repository/problem_repository.model';
import {ProblemService} from '../service/problem.service';
import {Problem} from '../models/problem';
import {DistrictModel} from '../repository/district_repository.model';
import {DistrictService} from '@app/service/district.service';


@Injectable()
export class ProblemModelResolver {

    constructor(
        private model: ProblemModel,
        private dataSource: ProblemService,
        private districtModel: DistrictModel,
        private districtService: DistrictService) { }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Problem[]> {

        if (this.model.getProblems().length == 0) {
            // this.messages.reportMessage(new Message('Loading data...'));
            return this.dataSource.getData();
        }
    }
}
