import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  constructor(private http: HttpClient) {}

  checkPrefix(phoneNumber: string, language?: string, type?: string) {
    let params = new HttpParams();
    params = params.append('phoneNumber', phoneNumber);
    if (language) {
      params = params.append('language', language);
    }
    if (type) {
      params = params.append('type', type);
    }
    return this.http.get<{ status: number; message: string }>(
      environment.api + `/check-prefix`,
      { params }
    );
  }
}
