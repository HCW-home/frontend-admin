import { ResourcesResponse } from './types/resourcesResponse';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from './types/user';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http: HttpClient
  ) { }

  getCSV(): Observable<string> {
    console.log('find users ');
    return this.http.get(environment.api + "/consultations-csv", { responseType: 'text' })
  }




}
