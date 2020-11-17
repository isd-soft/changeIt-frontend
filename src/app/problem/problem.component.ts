import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Problem} from '@app/models/problem';
import {ProblemModel} from '@app/repository/problem_repository.model';
import {CommentService} from '@app/services/comment.service';
import {Comment} from '@app/models/comment';
import {AccountService} from '@app/services';


@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {

  problem: Problem = new Problem();
  comments: Comment[];

  constructor(
    private route: ActivatedRoute,
    private problemModel: ProblemModel,
    private commentService: CommentService,
    private accountService: AccountService,
  ) {
    route.params.subscribe(params => {
      const id = params.id;
      if (id != null) {
        Object.assign(this.problem, problemModel.getProblem(id));
      }
    });
    commentService.getData(this.problem).subscribe(data => {
      this.comments = data;
    });
  }

  ngOnInit(): void {

  }

  vote(): void {
    this.problem.votes++;
    this.problemModel.saveProblem(this.problem);
  }

  addComment(content: string): void {
    const comment: Comment = new Comment();
    comment.content = content;
    comment.user = this.accountService.userValue;
    comment.problem = this.problem;
    this.commentService.saveComment( comment ).subscribe( );
    this.comments.push(comment);
  }

}
