import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '@environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Likes} from '@app/models/Likes';

@Injectable({
  providedIn: 'root'
})
export class LikesService{

  constructor(
    private http: HttpClient,
  ) { }

  like(likes: Likes): Observable<Likes> {
    return this.sendRequest<Likes>('POST', `${environment.apiUrl}/likes/`, likes);
  }

  getLike(commentId: number, userId: number): Observable<Likes> {
    return this.sendRequest<Likes>('GET', `${environment.apiUrl}/likes/${commentId}/${userId}`);
  }

  deleteLike(commentId: number, userId: number): Observable<Likes> {
    return this.sendRequest<Likes>('DELETE', `${environment.apiUrl}/likes/${commentId}/${userId}`);
  }

  private sendRequest<T>(verb: string, url: string, body?: Likes): Observable<T> {

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
