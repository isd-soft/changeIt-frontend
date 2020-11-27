import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(
    private http: HttpClient,
  ) { }

  postImages(formData: FormData, problemId: number, param2: { responseType: string }): Observable<Response> {
    return this.sendRequest<Response>('POST', `${environment.apiUrl}/problem/${problemId}/image`, formData);
  }

  private sendRequest<T>(verb: string, url: string, formData?: FormData): Observable<T> {

    console.log('\n\n---Request ', verb, url);


    return this.http.post<T>(url, formData).pipe(catchError((error: Response) =>
      throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
