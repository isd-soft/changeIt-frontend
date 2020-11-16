import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {User} from '@app/models';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '@environments/environment';
import {Problem} from '@app/models/problem';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(private http: HttpClient, ) {
    // http.get<Problem[]>(`${environment.apiUrl}/problem`);
  }

  getData(): Observable<Problem[]> {
    return this.sendRequest<Problem[]>('GET', environment.apiUrl + '/problem');
  }

  saveProblem(article: Problem): Observable<Problem> {
    return this.sendRequest<Problem>('POST', environment.apiUrl + '/problem', article);
  }

  updateProblem(problem: Problem): Observable<Problem> {
    return this.sendRequest<Problem>('PUT',
      `${environment.apiUrl}/problem/${problem.problem_id}`, problem);
  }

  deleteProblem(id: number): Observable<Problem> {
    return this.sendRequest<Problem>('DELETE', `${environment.apiUrl}/problem/${id}`);
  }

  vote(problem: Problem): Observable<Problem> {
    return this.sendRequest<Problem>('POST', `${environment.apiUrl}/problem/${problem.problem_id}`, problem);
  }

  private sendRequest<T>(verb: string, url: string, body?: Problem): Observable<T> {

    console.log('\n\n---Request ', verb, url, body);

    const myHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.request<T>(verb, url, {
      body,
      headers: myHeaders
    }).pipe(catchError((error: Response) =>
      throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
