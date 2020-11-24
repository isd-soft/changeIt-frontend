import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Problem} from '@app/models/problem';
import {ProblemModel} from '@app/repository/problem_repository.model';
import {CommentService} from '@app/service/comment.service';
import {Comment} from '@app/models/comment';
import {AccountService} from '@app/service';
import {User} from '@app/models';
import {ProblemService} from '@app/service/problem.service';
import {VoteService} from '@app/service/vote.service';
import {Vote} from '@app/models/Vote';
import {UserService} from '@app/service/user.service';
import {CommentVote} from '@app/models/commentVote';
import {CommentComponent} from '@app/comment/comment.component';
import {District} from '@app/models/district';
import {CommentVoteService} from '@app/service/commentVote.service';
import {CommentModel} from '@app/repository/comment_repository.model';
import {DistrictModel} from '@app/repository/district_repository.model';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {

  problem: Problem = new Problem();
  vote: Vote;
  commentVote: CommentVote;
  user: User;
  comments: Comment[];

  constructor(
    private problemService: ProblemService,
    private route: ActivatedRoute,
    private problemModel: ProblemModel,
    private commentService: CommentService,
    private voteService: VoteService,
    private userService: UserService,
    private accountService: AccountService,
    private commentVoteService: CommentVoteService,
  ) {
    route.params.subscribe(params => {
      const id = params.id;
      if (id != null) {
        Object.assign(this.problem, problemModel.getProblem(id));
      }

      this.user = accountService.userValue;

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

  voteCommentOnClick(commentId: number): void{
    let comment: Comment = new Comment();
    this.commentService.getCommentById(commentId).subscribe(data => {
      comment = data; });
    this.commentVote = new CommentVote(comment, this.user);
    this.commentVoteService.vote(this.commentVote).subscribe();
    comment.votes++;
    this.commentService.updateComment(comment).subscribe();
  }

  addComment(content: string): void {
    const comment: Comment = new Comment();
    comment.content = content;
    comment.problem = this.problem;
    comment.user = this.user;
    this.commentService.saveComment( comment ).subscribe( );
    this.comments.push(comment);
  }



  getProblem(key: number): Problem {
    return this.problemModel.getProblem(key);
  }

  changeStatus(problemId: number, status: string): void{
    const problem: Problem = this.getProblem(problemId);
    problem.status = status;
    this.problemService.updateProblem(problem).subscribe();
  }
}
