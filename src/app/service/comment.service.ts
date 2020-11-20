import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Problem} from '@app/models/problem';
import {environment} from '@environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Comment} from '@app/models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getData(problem: Problem): Observable<Comment[]> {
    return this.sendRequest<Comment[]>('GET', `${environment.apiUrl}/problem/${problem.problem_id}/comments`);
  }

  saveComment(comment: Comment): Observable<Comment> {
    return this.sendRequest<Comment>('POST', environment.apiUrl + '/comment', comment);
  }

  private sendRequest<T>(verb: string, url: string, body?: Comment): Observable<T> {

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
