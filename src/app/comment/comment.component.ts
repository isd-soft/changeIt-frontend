import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Comment} from '@app/models/comment';
import {CommentModel} from '@app/repository/comment_repository.model';
import {User} from '@app/models';
import {Likes} from '@app/models/likes';
import {Dislikes} from '@app/models/dislikes';
import {CommentService} from '@app/service/comment.service';
import {UserService} from '@app/service/user.service';
import {LikesService} from '@app/service/likes.service';
import {DislikesService} from '@app/service/dislikes.service';
import {AccountService} from '@app/service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  likes: Likes;
  dislikes: Dislikes;
  user: User;
  logo: string;
  commentComponent: CommentComponent;


  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private commentModel: CommentModel,
    private userService: UserService,
    private likesService: LikesService,
    private dislikesService: DislikesService,
    private accountService: AccountService,
    private router: Router,
  ) {
      this.user = accountService.userValue;
  }

  ngOnInit(): void {
    this.getLike();
    this.getDislike();
    this.accountService.getUserLogo(this.comment.user.user_id).subscribe(data => {
      if (data.logo){
        this.logo = 'data:image/png;base64,' + data.logo;
      } else {
        this.logo = 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg';
      }
    });
  }

  getLike(): void {
    this.likesService.getLike(this.comment.comment_id, this.user.user_id).subscribe(data => this.likes = data);
  }

  getDislike(): void {
    this.dislikesService.getDislike(this.comment.comment_id, this.user.user_id).subscribe(data => this.dislikes = data);
  }

  likeCommentOnClick(): void{
    this.likes = new Likes(this.comment, this.user);
    this.likesService.like(this.likes).subscribe();
    this.comment.votes++;
    this.commentService.updateComment(this.comment).subscribe();
  }

  dislikeCommentOnClick(): void{
    this.dislikes = new Dislikes(this.comment, this.user);
    this.dislikesService.dislike(this.dislikes).subscribe();
    this.comment.votes--;
    this.commentService.updateComment(this.comment).subscribe();
  }

  deleteLikeCommentOnClick(): void{
    this.likesService.deleteLike(this.comment.comment_id, this.user.user_id).subscribe();
    this.comment.votes--;
    this.commentService.updateComment(this.comment).subscribe();
    this.likes = null;
  }

  deleteDislikeCommentOnClick(): void{
    this.dislikesService.deleteDislike(this.comment.comment_id, this.user.user_id).subscribe();
    this.comment.votes++;
    this.commentService.updateComment(this.comment).subscribe();
    this.dislikes = null;
  }

  onClick(comment: Comment) {
    this.router.navigate(['/user-show/' + comment.user.user_id] );
  }
}
