import {Component, Input, OnInit} from '@angular/core';
import {Label, SingleDataSet} from 'ng2-charts';
import {ChartType} from 'chart.js';
import {Problem} from '@app/models/problem';
import {ProblemModel} from '@app/repository/problem_repository.model';
import {Domain} from '@app/models/domain';
import {DomainModel} from '@app/repository/domain_repository.model';
import {DomainService} from '@app/service/domain.service';

@Component({
  selector: 'app-problems-by-domains',
  templateUrl: './problems-by-domains.component.html',
  styleUrls: ['./problems-by-domains.component.css']
})
export class ProblemsByDomainsComponent {

  @Input() private problems: Problem[];
  private domains: Domain[];

  // PolarArea
  public polarAreaChartLabels: Label[];
  public polarAreaChartData: SingleDataSet;
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  constructor(
    private domainService: DomainService
  ) {
    domainService.getData().subscribe(data => {
      this.domains = data;
      this.setting();
    });
  }

  setting(): void {
    this.polarAreaChartLabels = this.domains.map(domain => domain.domainName.toLocaleUpperCase());
    let data = [];
    for (let dom of this.domains) {
      data.push(this.problems.filter(prob => prob.domains.some(domain => domain.domain_id == dom.domain_id) ).length);
    }
    this.polarAreaChartData = data;
  }

}
