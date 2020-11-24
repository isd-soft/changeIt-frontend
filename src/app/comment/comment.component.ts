import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Comment} from '@app/models/comment';
import {CommentModel} from '@app/repository/comment_repository.model';
import {User} from '@app/models';
import {CommentVote} from '@app/models/commentVote';
import {CommentService} from '@app/service/comment.service';
import {UserService} from '@app/service/user.service';
import {CommentVoteService} from '@app/service/commentVote.service';
import {AccountService} from '@app/service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  commentVote: CommentVote;
  user: User;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private commentModel: CommentModel,
    private userService: UserService,
    private commentVoteService: CommentVoteService,
    private accountService: AccountService,
  ) {
      this.user = accountService.userValue;
  }

  ngOnInit(): void {
    this.getVote();
  }

  getVote(): void {
    this.commentVoteService.getVote(this.comment.comment_id, this.user.user_id).subscribe(data => this.commentVote = data);
  }

  voteCommentOnClick(): void{
    this.commentVote = new CommentVote(this.comment, this.user);
    this.commentVoteService.vote(this.commentVote).subscribe();
    this.comment.votes++;
    this.commentService.updateComment(this.comment).subscribe();
  }
}