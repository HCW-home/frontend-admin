import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  WhatsAppTemplate,
  IBodyRefreshStatus,
  IParamsGetTemplates,
  IBodySubmitWhatsAppTemplate,
  IBodyUpdateWhatsAppTemplate,
  IBodyDeleteWhatsAppTemplate,
  IBodyBulkSubmitWhatsAppTemplate
} from '../models/whatsapp-template';

@Injectable({
  providedIn: 'root'
})
export class WhatsappTemplatesService {
  constructor(private http: HttpClient) {
  }

  loadTemplates(params: IParamsGetTemplates) {
    return this.http.get<WhatsAppTemplate[]>(environment.api + `/templates`, { params });
  }

  submitTemplate(body: IBodySubmitWhatsAppTemplate) {
    return this.http.post<WhatsAppTemplate>(environment.api + `/templates/submit`, body);
  }

  bulkSubmitTemplate(body: IBodyBulkSubmitWhatsAppTemplate) {
    return this.http.post<WhatsAppTemplate>(environment.api + `/templates/bulk-submit`, body);
  }

  updateTemplate(id: string, body: IBodyUpdateWhatsAppTemplate) {
    return this.http.patch<WhatsAppTemplate>(environment.api + `/templates/${id}`, body);
  }

  deleteTemplate(body: IBodyDeleteWhatsAppTemplate) {
    return this.http.delete<WhatsAppTemplate>(environment.api + `/templates/delete`, { body });
  }

  refreshStatus(body: IBodyRefreshStatus) {
    return this.http.post<WhatsAppTemplate>(environment.api + `/templates/refresh-status`, body);
  }
}
