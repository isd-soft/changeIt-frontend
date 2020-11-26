import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Vote} from '@app/models/Vote';
import {environment} from '@environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {User} from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  confirmEmail(token: string): Observable<any> {
    const myParams = new HttpParams().set('token', token);
    return this.sendRequest('GET', `${environment.apiUrl}/user/registrationConfirm`, myParams );
  }

  getVerificationToken(email: string): Observable<any> {
    const myParams = new HttpParams().set('email', email);
    return this.sendRequest('GET', `${environment.apiUrl}/user/verificationToken`, myParams );
  }

  resetPassword(email: string): Observable<boolean> {
    const myParams = new HttpParams().set('userEmail', email);
    return this.sendRequest('POST', `${environment.apiUrl}/user/resetPassword`, myParams );
  }

  savePassword(id: string, token: string, password: string, passwordConfirmation: string): Observable<any> {
    const myParams = new HttpParams()
                      .set('id', id)
                      .set('token', token)
                      .set('password', password)
                      .set('passwordConfirmation', passwordConfirmation);
    return this.sendRequest('POST', `${environment.apiUrl}/user/savePassword`, myParams);
  }


  private sendRequest<T>(verb: string, url: string, myParams?: HttpParams): Observable<T> {

    console.log('\n\n---Request ', verb, url, myParams);

    const myHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.request<T>(verb, url, {
      headers: myHeaders,
      params: myParams
    }).pipe(catchError((error: Response) =>
      throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
