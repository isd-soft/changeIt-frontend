import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Problem} from '@app/models/problem';
import {ProblemModel} from '@app/repository/problem_repository.model';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {

  problem: Problem;

  constructor(
    private route: ActivatedRoute,
    private problemModel: ProblemModel
  ) { }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id: number = parseInt(params.id, 10);
        if (id != null) {
          this.problem = this.problemModel.getProblem(id);
        }
      });
  }

}
