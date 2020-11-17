import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '@environments/environment';
import {Domain} from '@app/models/domain';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(private http: HttpClient, ) {
  }

  getData(): Observable<Domain[]> {
    return this.sendRequest<Domain[]>('GET', environment.apiUrl + '/domain');
  }

  saveDomain(article: Domain): Observable<Domain> {
    return this.sendRequest<Domain>('POST', environment.apiUrl + '/domain', article);
  }

  updateDomain(domain: Domain): Observable<Domain> {
    return this.sendRequest<Domain>('PUT',
      `${environment.apiUrl}/domain/${domain.domain_id}`, domain);
  }

  deleteDomain(id: number): Observable<Domain> {
    return this.sendRequest<Domain>('DELETE', `${environment.apiUrl}/domain/${id}`);
  }

  private sendRequest<T>(verb: string, url: string, body?: Domain): Observable<T> {

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
