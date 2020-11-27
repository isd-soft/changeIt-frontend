import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserLogoUploadService{
  constructor(
    private http: HttpClient,
  ) { }

  postUserLogo(formData: FormData, userId: number, param2: { responseType: string }): Observable<Response> {
    return this.sendRequest<Response>('POST', `${environment.apiUrl}/user/${userId}/user_logo`, formData);
  }

  private sendRequest<T>(verb: string, url: string, formData?: FormData): Observable<T> {

    console.log('\n\n---Request ', verb, url);


    return this.http.post<T>(url, formData).pipe(catchError((error: Response) =>
      throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
