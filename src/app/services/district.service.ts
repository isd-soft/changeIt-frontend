import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {District} from '@app/models/district';
import {Problem} from '@app/models/problem';
import {catchError} from 'rxjs/operators';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private http: HttpClient) { }

  getAllDistricts(): Observable<District[]> {
    return this.sendRequest<District[]>('GET', environment.apiUrl + '/district');
  }

  private sendRequest<T>(verb: string, url: string, body?: District)
    : Observable<T> {

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
