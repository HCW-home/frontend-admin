import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http: HttpClient
  ) {
  }

  getCSV(): Observable<string> {
    return this.http.get(environment.api + '/consultations-csv', { responseType: 'text' });
  }

}
