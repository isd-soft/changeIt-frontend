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
import {ImageService} from "@app/service/image.service";


@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css'],
})
export class ProblemComponent implements OnInit {

  problem: Problem;
  vote: Vote;
  user: User;
  authorId: number;
  author = false;
  comments: Comment[];
  canLoadComments = false;
  problemId: number;
  imageNumber: number;

  latitude = 47.059;
  longitude = 28.88;
  zoom = 15;


  // editing
  editDescription = false;

  constructor(
    private problemService: ProblemService,
    private route: ActivatedRoute,
    private problemModel: ProblemModel,
    private commentService: CommentService,
    private voteService: VoteService,
    private userService: UserService,
    private accountService: AccountService,
    private imageService: ImageService,
  ) {
    route.params.subscribe(params => {
      this.problemId = params.id;
      if (this.problemId != null) {
        problemService.getProblem(this.problemId).subscribe(data => {
          this.problem = data;

          commentService.getData(this.problem).subscribe(comments => {
            this.comments = comments;
            this.canLoadComments = true;
          });


          userService.getProblemAuthor(this.problem.id).subscribe(data => {
            // this.authorId = data.user_id;
            if (data.user_id == this.user.user_id) {
              this.author = true;
            }
          });

          this.user = accountService.userValue;
          this.getVote();
        });

        this.imageService.getImages(this.problemId).subscribe(data => {
          this.imageNumber = data.length;
        });
      }

      // this.latitude = parseFloat(String(this.problem.address.lat));
      // this.longitude = parseFloat(String(this.problem.address.lng));
      // console.log(this.latitude);
      // console.log(this.longitude);
      // console.log(this.problem);
      // console.log(this.problem.address.lat);
      // console.log(this.problem.address.lng);

      commentService.getData(this.problem).subscribe(data => {
        this.comments = data;
        this.canLoadComments = true;
      });
    });
  }



  ngOnInit(): void {

  }

  location(): any {
    this.latitude = parseFloat(String(this.problem.address.lat));
    this.longitude = parseFloat(String(this.problem.address.lng));
  }

  getVote(): void {
    this.voteService.getVote(this.problem.id, this.user.user_id).subscribe(data => this.vote = data);
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
    this.problem.status = status;
    this.problemService.updateProblem(this.problem).subscribe();
  }

  toggleEditingDescription(): void {
    this.editDescription = !this.editDescription;
  }


  saveDescription(): void {
    this.editDescription = !this.editDescription;
    this.problemModel.saveProblem(this.problem);
  }

}
