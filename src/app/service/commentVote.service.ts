import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '@environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {CommentVote} from '@app/models/CommentVote';

@Injectable({
  providedIn: 'root'
})
export class CommentVoteService{

  constructor(
    private http: HttpClient,
  ) { }

  vote(commentVote: CommentVote): Observable<CommentVote> {
    return this.sendRequest<CommentVote>('POST', `${environment.apiUrl}/comment_vote/`, commentVote);
  }

  getVote(commentId: number, userId: number): Observable<CommentVote> {
    return this.sendRequest<CommentVote>('GET', `${environment.apiUrl}/comment_vote/${commentId}/${userId}`);
  }

  unVote(commentId: number, userId: number): Observable<CommentVote> {
    return this.sendRequest<CommentVote>('DELETE', `${environment.apiUrl}/comment_vote/${commentId}/${userId}`);
  }

  private sendRequest<T>(verb: string, url: string, body?: CommentVote): Observable<T> {

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
