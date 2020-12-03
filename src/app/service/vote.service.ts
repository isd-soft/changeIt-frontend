import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '@environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Vote} from '@app/models/Vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private http: HttpClient,
  ) { }

  vote(vote: Vote): Observable<Vote> {
    return this.sendRequest<Vote>('POST', `${environment.apiUrl}/vote`, vote);
  }

  getVote(problemId: number, userId: number): Observable<Vote> {
    return this.sendRequest<Vote>('GET', `${environment.apiUrl}/vote/${problemId}/${userId}`);
  }

  private sendRequest<T>(verb: string, url: string, body?: Vote): Observable<T> {

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
