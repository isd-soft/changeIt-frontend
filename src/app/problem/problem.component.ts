import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Problem} from "@app/models/problem";
import {ProblemModel} from "@app/repository/problem_repository.model";

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {

  problem: Problem = new Problem();

  constructor(
    private route: ActivatedRoute,
    private problemModel: ProblemModel
  ) {
    route.params.subscribe(params => {

      const id = params.id;
      if (id != null) {
        Object.assign(this.problem, problemModel.getProblem(id));
      }
    });
  }

  ngOnInit(): void {

  }

  vote(): void {
    this.problem.votes++;
    this.problemModel.saveProblem(this.problem);
  }

}
