import {Component, Input, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {Problem} from '@app/models/problem';
import {ProblemModel} from '@app/repository/problem_repository.model';

@Component({
  selector: 'app-our-problems-result',
  templateUrl: './our-problems-result.component.html',
  styleUrls: ['./our-problems-result.component.css']
})
export class OurProblemsResultComponent implements OnInit {

  @Input() private problems: Problem[];
  private activeProblemsCount: number;
  private inProgressProblemsCount: number;
  private doneProblemsCount: number;
  private rejectedProblemsCount: number;

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Active', 'In Progress', 'Done', 'Rejected'];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private problemModel: ProblemModel) {
    this.problems = problemModel.getProblems();
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.activeProblemsCount = this.problems.filter(problem => problem.status == 'ACTIVE').length;
    this.inProgressProblemsCount = this.problems.filter(problem => problem.status == 'IN_PROGRESS').length;
    this.doneProblemsCount = this.problems.filter(problem => problem.status == 'DONE').length;
    this.rejectedProblemsCount = this.problems.filter(problem => problem.status == 'REJECTED').length;

    this.pieChartData = [this.activeProblemsCount, this.inProgressProblemsCount, this.doneProblemsCount, this.rejectedProblemsCount];
  }


}
