import {Location} from "@app/models/location"
import {District} from "@app/models/district";

export class Problem {
  problem_id: number;
  title: string;
  description: string;
  votes: number;
  created_at: string;
  updated_at: string;
  status: string;
  location: Location;
  district: District;
}
