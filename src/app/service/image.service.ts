import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '@environments/environment';
import {Problem} from '@app/models/problem';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient,
  ) { }

  getImages(problemId: number): Observable<any> {
    return this.sendRequest<any>('GET', `${environment.apiUrl}/problem/${problemId}/image`);
  }

  deleteImage(problemId: number, imageId: number): Observable<any> {
    return this.sendRequest<any>('DELETE', `${environment.apiUrl}/problem/${problemId}/image/${imageId}`);
  }

  private sendRequest<T>(verb: string, url: string, body?: Problem): Observable<T> {

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
