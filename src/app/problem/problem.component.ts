import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
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
import {Timestamp} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css'],
})
export class ProblemComponent implements OnInit {

  problem: Problem = new Problem();
  vote: Vote;
  user: User;
  comments: Comment[];
  canLoadComments = false;

  constructor(
    private problemService: ProblemService,
    private route: ActivatedRoute,
    private problemModel: ProblemModel,
    private commentService: CommentService,
    private voteService: VoteService,
    private userService: UserService,
    private accountService: AccountService,
  ) {
    route.params.subscribe(params => {
      const id = params.id;
      if (id != null) {
        Object.assign(this.problem, problemModel.getProblem(id));
      }

      this.user = accountService.userValue;

      this.getVote();

      commentService.getData(this.problem).subscribe(data => {
        this.comments = data;
        this.canLoadComments = true;
      });
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
    comment.problem = this.problem;
    comment.user = this.user;
    comment.votes = 0;
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
