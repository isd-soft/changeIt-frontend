import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "@environments/environment";
import {catchError} from "rxjs/operators";
import {Location} from "../models/location";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<Location[]> {
    return this.sendRequest<Location[]>('GET', environment.apiUrl + '/location');
  }

  private sendRequest<T>(verb: string, url: string, body?: Location): Observable<T> {

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
