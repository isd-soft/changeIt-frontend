import {Injectable} from '@angular/core';
import {Domain} from '../models/domain';
import {DomainService} from '../services/domain.service';

@Injectable()
export class DomainModel {
  private domain: Domain[] = new Array<Domain>();
  private locator = (d: Domain, id: number) => d.domain_id == id;

  constructor(private domainService: DomainService) {
    this.domainService.getData().subscribe(data => this.domain = data);
  }


  getDomains(): Domain[] {
    return this.domain;
  }

  getDomain(id: number): Domain {
    return this.domain.find(d => this.locator(d, id));
  }

  saveDomain(domain: Domain): void {
    if (domain.domain_id == 0 || domain.domain_id == null) {
      this.domainService.saveDomain(domain)
        .subscribe(d => this.domain.push(d));
    } else {
      this.domainService.updateDomain(domain).subscribe(d => {
        const index = this.domain
          .findIndex(item => this.locator(item, d.domain_id));
        this.domain.splice(index, 1, d);
      });
    }
  }

  deleteDomain(id: number): void {
    this.domainService.deleteDomain(id).subscribe(() => {
      const index = this.domain.findIndex(p => this.locator(p, id));
      if (index > -1) {
        this.domain.splice(index, 1);
      }
    });
  }

}
