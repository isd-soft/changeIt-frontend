import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '@environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {User} from '@app/models';
import {ResetPasswordDetailsDto} from '@app/models/resetPasswordDetailsDto';
import {Problem} from '@app/models/problem';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  getData(): Observable<User[]> {
    return this.sendRequestWithParams<User[]>('GET', environment.apiUrl + '/user/all');
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${id}`);
  }

  confirmEmail(token: string): Observable<any> {
    const myParams = new HttpParams().set('token', token);
    return this.sendRequestWithParams('GET', `${environment.apiUrl}/user/registrationConfirm`, myParams );
  }

  getVerificationToken(email: string): Observable<any> {
    const myParams = new HttpParams().set('email', email);
    return this.sendRequestWithParams('GET', `${environment.apiUrl}/user/verificationToken`, myParams );
  }

  resetPassword(email: string): Observable<boolean> {
    const myParams = new HttpParams().set('userEmail', email);
    return this.sendRequestWithParams('POST', `${environment.apiUrl}/user/resetPassword`, myParams );
  }

  savePassword(id: string, token: string, password: string, passwordConfirmation: string): Observable<any> {
    const resetDetails: ResetPasswordDetailsDto = new ResetPasswordDetailsDto(id, token, password, passwordConfirmation);
    return this.sendRequestWithBody('POST', `${environment.apiUrl}/user/savePassword`, resetDetails);
  }

  getProblemAuthor(problemId: number): Observable<User> {
    return this.sendRequestWithParams('GET', `${environment.apiUrl}/problem/${problemId}/user`);
  }

  updateUser(id: number, status: string): Observable<User> {
    return this.sendRequestWithBody('PUT', `${environment.apiUrl}/admin/user/${id}?userStatus=${status}`);
  }

  private sendRequestWithParams<T>(verb: string, url: string, myParams?: HttpParams): Observable<T> {

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

  private sendRequestWithBody<T>(verb: string, url: string, myBody?: ResetPasswordDetailsDto): Observable<T> {

    console.log('\n\n---Request ', verb, url);

    const myHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.request<T>(verb, url, {
      headers: myHeaders,
      body: myBody,
    }).pipe(catchError((error: Response) =>
      throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }


}
