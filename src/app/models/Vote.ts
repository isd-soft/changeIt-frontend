import {Problem} from './problem';
import {User} from './user';

export class Vote {
  problem: Problem;
  user: User;


  constructor(problem: Problem, user: User) {
    this.problem = problem;
    this.user = user;
  }
}
