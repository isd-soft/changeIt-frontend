import {Component, OnInit} from '@angular/core';
import {District} from '@app/models/district';
import {DistrictModel} from '@app/repository/district_repository.model';
import {Problem} from '@app/models/problem';
import {Location} from '../models/location';
import {ProblemModel} from '@app/repository/problem_repository.model';
import {LocationModel} from '@app/repository/location_repository.model';
import {Domain} from '@app/models/domain';
import {DomainModel} from '@app/repository/domain_repository.model';
import {ProblemPipe} from '@app/pipe/problem-pipe.pipe';
import {PaginationDetails} from '@app/models/paginationDetails';
import {ProblemService} from '@app/service/problem.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sortDir = 'ASC';
  sort = 'votesCount';
  page = 0;
  size = 5;
  selectedDistrict: District;
  selectedLocation: Location;
  selectedDomains: Domain[] = [];
  availableStatuses: string[];
  selectedStatuses: string[] = [];
  problemPipe = new ProblemPipe();
  problems: Problem[] = [];
  searchValue: string;

  constructor(public problemModel: ProblemModel, private districtModel: DistrictModel,
              private locationModel: LocationModel, private domainModel: DomainModel,
              private problemService: ProblemService) {
    this.availableStatuses = ['ACTIVE', 'IN_PROGRESS', 'REJECTED', 'DONE'];
    this.getProblems(0, 5);
  }

  ngOnInit(): void {
  }

  getDistricts(): District[] {
    return this.districtModel.getDistricts();
  }

  getProblems(page: number, size: number): void {
    const paginationDetails: PaginationDetails = new PaginationDetails(page, size, this.sortDir, this.sort);
    this.problemService.getData(paginationDetails).subscribe(data => {
      this.problems = data.Problems;
      this.problemModel.hasNext = data.hasNext;
      this.problemModel.hasPrevious = data.hasPrevious;
      this.problemModel.totalElements = data.totalElements;
      this.problemModel.totalPages = data.totalPages;
      this.problemModel.loadProblems(this.problems);

      this.problems = this.problemPipe.transform(this.problems,
        this.selectedDistrict, this.selectedLocation,
        this.selectedDomains, this.selectedStatuses, this.searchValue);
      if (this.problems.length < this.size && this.problemModel.hasNext) {
        this.getProblems(page, size + (this.size - this.problems.length));
      }
    });
  }

  getAllDomains(): Domain[] {
    return this.domainModel.getAllDomains();
  }

  getAllLocations(): Location[] {
    if (!this.selectedDistrict) {
      return null;
    }
    return this.locationModel.getAllLocations().filter(location =>
      location.district.district_id === this.selectedDistrict.district_id);
  }

  onSelectDomain(status: any, domain: Domain): void{
    if (status.target.checked) {
      this.selectedDomains.push(domain);
    }
    if (!status.target.checked) {
      const index: number = this.selectedDomains.indexOf(domain);
      if (index !== -1) {
        this.selectedDomains.splice(index, 1);
      }
    }
    this.getProblems(this.page, this.size);
  }

  toggleVoteSorting(): void {
    this.sort = 'votesCount';
    this.sortDir = (this.sortDir === 'ASC' ) ? 'DESC' : 'ASC';
    this.getProblems(this.page, this.size);
  }

  toggleDateSorting(): void {
    this.sort = 'createdAt';
    this.sortDir = (this.sortDir === 'ASC' ) ? 'DESC' : 'ASC';
    this.getProblems(this.page, this.size);
  }


  onChange(): void {
    this.getProblems(this.page, this.size);
  }

  onChangeDistrict(): void {
    this.selectedLocation = null;
    this.getProblems(this.page, this.size);
  }

  onStatusSelect(event: any, status: string): any {
    if (event.target.checked) {
      this.selectedStatuses.push(status);
    }
    if (!event.target.checked) {
      const index: number = this.selectedStatuses.indexOf(status);
      if (index !== -1) {
        this.selectedStatuses.splice(index, 1);
      }
    }
    this.getProblems(this.page, this.size);
  }

  previousPage(): void {
    this.page--;
    this.getProblems(this.page, this.size);
  }

  nextPage(): void {
    this.page++;
    this.getProblems(this.page, this.size);
  }

  searchThis(data) {
    this.searchValue = data;
    this.getProblems(this.page, this.size);
  }
}
