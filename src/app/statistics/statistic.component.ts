import { Component, OnInit } from '@angular/core';
import {ProblemModel} from '@app/repository/problem_repository.model';
import {Problem} from '@app/models/problem';
import {ProblemService} from '@app/service/problem.service';
import {PaginationDetails} from '@app/models/paginationDetails';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  public problems: Problem[] = [];

  constructor(private problemService: ProblemService) {
    const paginationDetails: PaginationDetails = new PaginationDetails(0, 1000, 'DESC', 'votesCount');
    problemService.getData(paginationDetails).subscribe(data => this.problems = data.Problems);
  }

  ngOnInit(): void {
  }

}
