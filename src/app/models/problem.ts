import {Vote} from '@app/models/Vote';

export class Problem {
  problem_id: number;
  votesCount: number;
  title: string;
  description: string;
  votes: Vote[];
  created_at: string;
  updated_at: string;
  status: string;

}
