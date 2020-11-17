import {User} from './user';
import {Problem} from '@app/models/problem';

export class Comment {
  comment_id: number;
  problem: Problem;
  user: User;
  votes: number;
  content: string;
  created_at: string;
}
