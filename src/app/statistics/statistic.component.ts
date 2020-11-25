import { Component, OnInit } from '@angular/core';
import {ProblemModel} from '@app/repository/problem_repository.model';
import {Problem} from '@app/models/problem';
import {ProblemService} from '@app/service/problem.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  public problems: Problem[];

  constructor(private problemService: ProblemService,) {
    problemService.getData().subscribe(data => this.problems = data);
  }

  ngOnInit(): void {
  }

}
