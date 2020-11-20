import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Vote} from '@app/models/Vote';
import {environment} from '@environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {User} from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  getUser(user: User): Observable<User> {
    return this.sendRequest<User>('GET', `${environment.apiUrl}/user`, user);
  }

  private sendRequest<T>(verb: string, url: string, body?: User): Observable<T> {

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
