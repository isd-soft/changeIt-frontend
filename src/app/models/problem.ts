import {Vote} from '@app/models/Vote';
import { District } from './district';
import { Domain } from './domain';
import {Location} from '@app/models/location';
import {Address} from './address';

export class Problem {
  id: number;
  votesCount: number;
  title: string;
  description: string;
  votes: Vote[];
  createdAt: string;
  updatedAt: string;
  status: string;
  location: Location;
  district: District;
  domains: Domain[];
  address: Address;

}
