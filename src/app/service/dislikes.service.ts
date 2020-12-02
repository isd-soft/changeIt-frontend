import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '@environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Dislikes} from '@app/models/dislikes';

@Injectable({
  providedIn: 'root'
})
export class DislikesService{

  constructor(
    private http: HttpClient,
  ) { }

  dislike(dislikes: Dislikes): Observable<Dislikes> {
    return this.sendRequest<Dislikes>('POST', `${environment.apiUrl}/dislikes/`, dislikes);
  }

  getDislike(commentId: number, userId: number): Observable<Dislikes> {
    return this.sendRequest<Dislikes>('GET', `${environment.apiUrl}/dislikes/comment/${commentId}/user/${userId}`);
  }

  deleteDislike(commentId: number, userId: number): Observable<Dislikes> {
    return this.sendRequest<Dislikes>('DELETE', `${environment.apiUrl}/dislikes/comment/${commentId}/user/${userId}`);
  }

  private sendRequest<T>(verb: string, url: string, body?: Dislikes): Observable<T> {

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
