import {User} from './user';
import {Problem} from '@app/models/problem';
import {CommentVote} from '@app/models/commentVote';

export class Comment {
  comment_id: number;
  problem: Problem;
  user: User;
  votes: number;
  commentVotes: CommentVote[];
  content: string;
  created_at: string;
}
