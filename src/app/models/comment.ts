import {User} from './user';
import {Problem} from '@app/models/problem';
import {Likes} from '@app/models/Likes';
import {Dislikes} from '@app/models/Dislikes';

export class Comment {
  comment_id: number;
  problem: Problem;
  user: User;
  votes: number;
  likes: Likes[];
  dislikes: Dislikes[];
  content: string;
  created_at: string;
}
