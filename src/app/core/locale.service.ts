import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  ContentType,
  IBodyCreateWhatsAppTemplate, IBodyDeleteWhatsAppTemplate,
  IBodySubmitWhatsAppTemplate,
  WhatsAppTemplate
} from '../models/whatsapp-template';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  constructor(private http: HttpClient) {}

  getSupportedLanguages() {
    return this.http.get<string[]>(environment.api + `/languages`);
  }

}
