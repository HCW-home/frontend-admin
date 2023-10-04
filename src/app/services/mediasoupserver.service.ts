import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Config} from "../models/config.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MediasoupserverService {
  private baseUrl = `${environment.api}/mediasoupserver`;

  constructor(private http: HttpClient) {}

  create(config: Config): Observable<any> {
    return this.http.post(this.baseUrl, config);
  }

  getConfig(): Observable<Config[]> {
    return this.http.get<Config[]>(this.baseUrl);
  }

  update(id: string, config: Config): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, config);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
