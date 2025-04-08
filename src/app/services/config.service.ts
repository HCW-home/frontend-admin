import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {of, Subject} from 'rxjs';
import { environment } from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public configSub: Subject<any> = new Subject();
  public config;
  constructor(private http: HttpClient, private titleService: Title) {}

  getConfig() {
    return this.http.get<any>(`${environment.api}/config`).pipe(
        tap(config => {
          this.config = config;

          if (config.branding) {
            this.titleService.setTitle(config.branding);
          }

          this.configSub.next(config);
        }),
        catchError(error => {
          console.error('Failed to fetch configuration:', error);
          return of(null);
        })
    );
  }

}
