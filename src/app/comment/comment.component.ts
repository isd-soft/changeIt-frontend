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

  @Input() myComment: Comment;
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
      console.log(this.myComment);
      this.user = accountService.userValue;
      this.getVote();
  }

  ngOnInit(): void {
  }

  getVote(): void {
    console.log(this.myComment);
    this.commentVoteService.getVote(this.myComment.comment_id, this.user.user_id).subscribe(data => this.commentVote = data);
  }

  voteCommentOnClick(comment: Comment): void{
    this.myComment = comment;
    console.log(this.myComment);
    this.commentVote = new CommentVote(comment, this.user);
    this.commentVoteService.vote(this.commentVote).subscribe();
    comment.votes++;
    this.commentService.updateComment(comment).subscribe();
  }
}
