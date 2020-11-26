import {Component, Input, OnInit} from '@angular/core';
import {Label, SingleDataSet} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Problem} from '@app/models/problem';
import {ProblemModel} from '@app/repository/problem_repository.model';
import {DomainModel} from '@app/repository/domain_repository.model';
import {District} from '@app/models/district';
import {DistrictModel} from '@app/repository/district_repository.model';
import {DistrictService} from '@app/service/district.service';

@Component({
  selector: 'app-problems-by-district',
  templateUrl: './problems-by-district.component.html',
  styleUrls: ['./problems-by-district.component.css']
})
export class ProblemsByDistrictComponent implements OnInit {

  @Input() private problems: Problem[];
  private districts: District[];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Orase' }
  ];


  constructor(
    private problemModel: ProblemModel,
    private districtService: DistrictService,
  ) {
    this.problems = problemModel.getProblems();
    districtService.getData().subscribe(data => {
      this.districts = data;
      this.setting();
    });
  }

  ngOnInit(): void {
    }

  setting(): void {
    this.barChartLabels = this.districts.map(district => district.districtName);
    let data = [];
    for (let district of this.districts) {
      data.push(this.problems.filter(prob => prob.location.district.district_id == district.district_id ).length);
    }
    this.barChartData[0].data = data;
  }
}
