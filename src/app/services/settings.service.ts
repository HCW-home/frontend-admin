import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Settings } from '../settings/settings.component';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private baseUrl = `${environment.api}/sms-provider`;

  constructor(private http: HttpClient) {
  }


  getSmsProviders() {
    return this.http.get<Settings[]>(`${this.baseUrl}s`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateSetting(setting: Settings): Observable<any> {
    return this.http.put(`${this.baseUrl}/${setting.id}`, setting);
  }

  updateSettingsOrders(updates: { id: string, order: number }[]): Observable<any> {
    return this.http.put(`${this.baseUrl}s/update-orders`, updates);
  }
}
