import {Vote} from '@app/models/Vote';
import { District } from './district';
import { Domain } from './domain';
import {Location} from '@app/models/location';




export class Problem {
  problem_id: number;
  votesCount: number;
  title: string;
  description: string;
  votes: Vote[];
  created_at: string;
  updated_at: string;
  status: string;
  location: Location;
  district: District;
  domains: Domain[];

}
