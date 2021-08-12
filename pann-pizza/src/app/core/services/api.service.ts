import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    console.log("error", error, error.error);
    return  throwError(error.error);
  };

  get(path: string): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`)
      .pipe(catchError(this.formatErrors));
  };

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  };

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  };

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`)
      .pipe(catchError(this.formatErrors));
  };
};
