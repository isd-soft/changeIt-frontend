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

  getCommentById(id: number): Observable<Comment>{
    return this.sendRequest<Comment>('GET', `${environment.apiUrl}/comment/${id}`);
  }

  getVote(id: number): Observable<number> {
    return this.sendRequest<number>('GET', `${environment.apiUrl}/comment/${id}/votes`);
  }

  saveComment(comment: Comment): Observable<Comment> {
    return this.sendRequest<Comment>('POST', environment.apiUrl + '/comment', comment);
  }

  updateComment(comment: Comment): Observable<Comment>{
    return this.sendRequest<Comment>('PUT', `${environment.apiUrl}/comment/${comment.comment_id}`, comment);
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
