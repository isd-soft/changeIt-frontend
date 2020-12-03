import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '@environments/environment';
import {District} from '@app/models/district';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private http: HttpClient) { }

  getData(): Observable<District[]> {
    return this.sendRequest<District[]>('GET', environment.apiUrl + '/district');
  }

  createDistrict(article: District): Observable<District> {
    return this.sendRequest<District>('POST', environment.apiUrl + '/district', article);
  }

  updateDistrict(district: District): Observable<District> {
    return this.sendRequest<District>('PUT',
      `${environment.apiUrl}/district/${district.district_id}`, district);
  }

  deleteDistrict(id: number): Observable<District> {
    return this.sendRequest<District>('DELETE', `${environment.apiUrl}/district/${id}`);
  }

  private sendRequest<T>(verb: string, url: string, body?: District): Observable<T> {


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
