export class PaginationDetails {
  page: number;
  size: number;
  sortDir: string;
  sort: string;


  constructor(page: number, size: number, sortDir: string, sort: string) {
    this.page = page;
    this.size = size;
    this.sortDir = sortDir;
    this.sort = sort;
  }
}
