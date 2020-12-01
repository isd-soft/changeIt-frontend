import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '@environments/environment';
import {Problem} from '@app/models/problem';
import {catchError} from 'rxjs/operators';
import {User} from '@app/models';
import {PaginationDetails} from '@app/models/paginationDetails';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(private http: HttpClient, ) {
  }

  getData(paginationDetails: PaginationDetails): Observable<any> {
    return this.sendRequest<any>('POST', environment.apiUrl + '/problem', paginationDetails);
  }

  getProblem(id: number): Observable<Problem> {
    return this.sendRequest<Problem>('GET', `${environment.apiUrl}/problem/${id}`);
  }

  getVote(id: number): Observable<number> {
    return this.sendRequest<number>('GET', `${environment.apiUrl}/problem/${id}/votes`);
  }

  getProblemsByUserId(user: User): Observable<Problem[]> {
    return this.sendRequest<Problem[]>('GET', `${environment.apiUrl}/user/${user.user_id}/problems`);
  }

  saveProblem(problem: Problem): Observable<Problem> {
    return this.sendRequest<Problem>('POST', environment.apiUrl + '/problem/new', problem);
  }

  updateProblem(problem: Problem): Observable<Problem> {
    return this.sendRequest<Problem>('PUT',
      `${environment.apiUrl}/problem/${problem.id}`, problem);
  }

  deleteProblem(id: number): Observable<Problem> {
    return this.sendRequest<Problem>('DELETE', `${environment.apiUrl}/problem/${id}`);
  }


  private sendRequest<T>(verb: string, url: string, body?: any): Observable<T> {

    console.log('\n\n---Request ', verb, url, body);

    const myHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.request<T>(verb, url, {
      body,
      headers: myHeaders,
    }).pipe(catchError((error: Response) =>
      throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
