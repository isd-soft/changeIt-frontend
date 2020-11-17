import { Component, OnInit } from '@angular/core';
import {Domain} from '@app/models/domain';
import {ActivatedRoute} from '@angular/router';
import {DomainModel} from '@app/repository/domain_repository.model';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  domain: Domain = new Domain();

  constructor(private route: ActivatedRoute, private domainModel: DomainModel) {
    route.params.subscribe(params => {
      const id = params.id;
      if (id != null) {
        Object.assign(this.domain, domainModel.getDomain(id));
      }
    });
  }

  ngOnInit(): void {
  }

}
