import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Reports} from '../../models/reports/reports';
import {catchError, Observable, retry, throwError} from 'rxjs';
import {EvacuationPlans} from '../../models/evacuation-plans/evacuationPlans';

@Injectable({
  providedIn: 'root'
})
export class EvacuationPlansService {
  baseUrl = "https://clever-vibrancy-production.up.railway.app/api/v1/evacuation-plans";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something went wrong; please try again later.');
  }

  getList(): Observable<EvacuationPlans[]> {
    return this.http.get<EvacuationPlans[]>(this.baseUrl).pipe(retry(2), catchError(this.handleError));
  }

  createItem(item: any): Observable<EvacuationPlans> {
    return this.http.post<EvacuationPlans>(this.baseUrl, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
