import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/models';
import {UserLogo} from '@app/models/userLogo';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email, password) {
        return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/user/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.user_id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.user_id) {
                    this.logout();
                }
                return x;
            }));
    }

  uploadUserLogo(userLogo: UserLogo, id: number): Observable<UserLogo> {
    return this.sendRequest('POST', `${environment.apiUrl}/user/${id}/user_logo`, userLogo);
  }

  getUserLogo(id: number): Observable<UserLogo> {
    return this.sendRequest('GET', `${environment.apiUrl}/user/${id}/user_logo`);
  }

  private sendRequest<T>(verb: string, url: string, body?: UserLogo): Observable<T> {

    console.log('\n\n---Request ', verb, url, body);

    const myHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.request<T>(verb, url, {
      body,
      headers: myHeaders,
    }).pipe(catchError((error: Response) =>
      throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }

}
