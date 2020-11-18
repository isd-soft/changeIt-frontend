import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Problem} from '@app/models/problem';
import {ProblemModel} from '@app/repository/problem_repository.model';
import {CommentService} from '@app/services/comment.service';
import {Comment} from '@app/models/comment';
import {AccountService} from '@app/services';
import {User} from '@app/models';
import {ProblemService} from '@app/services/problem.service';
import {VoteService} from '@app/services/vote.service';
import {Vote} from '@app/models/Vote';


@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {

  problem: Problem = new Problem();
  vote: Vote;
  user: User;
  comments: Comment[];

  constructor(
    private route: ActivatedRoute,
    private problemModel: ProblemModel,
    private problemService: ProblemService,
    private commentService: CommentService,
    private accountService: AccountService,
    private voteService: VoteService,
  ) {
    route.params.subscribe(params => {
      const id = params.id;
      if (id != null) {
        Object.assign(this.problem, problemModel.getProblem(id));
      }

      this.user = this.accountService.userValue;
      console.log('user : ', this.user);

      this.getVote();
    });

    commentService.getData(this.problem).subscribe(data => {
      this.comments = data;
    });

  }

  getVote(): void {
    this.voteService.getVote(this.problem.problem_id, this.user.user_id).subscribe(data => this.vote = data);
  }

  ngOnInit(): void {

  }

  voteOnClick(): void {
    this.vote = new Vote(this.problem, this.user);
    this.voteService.vote(this.vote).subscribe();
    this.problem.votesCount++;
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
