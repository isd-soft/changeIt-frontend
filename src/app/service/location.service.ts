import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '@environments/environment';
import {Location} from '@app/models/location';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<Location[]> {
    return this.sendRequest<Location[]>('GET', environment.apiUrl + '/location');
  }

  getData(): Observable<Location[]> {
    return this.sendRequest<Location[]>('GET', environment.apiUrl + '/location');
  }

  createLocation(article: Location): Observable<Location> {
    return this.sendRequest<Location>('POST', environment.apiUrl + '/location', article);
  }

  updateLocation(location: Location): Observable<Location> {
    return this.sendRequest<Location>('PUT',
      `${environment.apiUrl}/location/${location.location_id}`, location);
  }

  deleteLocation(id: number): Observable<Location> {
    return this.sendRequest<Location>('DELETE', `${environment.apiUrl}/location/${id}`);
  }

  private sendRequest<T>(verb: string, url: string, body?: Location): Observable<T> {


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
