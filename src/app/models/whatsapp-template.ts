export interface Language {
  value: string;
  text: string;
}

export interface IBodyCreateWhatsAppTemplate {
  name: string;
  language: string;
  body: string;
  category: string;
  contentType: string;
}

export interface IBodySubmitWhatsAppTemplate {
  id: string;
}

export interface IBodyDeleteWhatsAppTemplate {
  id: string;
}

export interface IBodyRefreshStatus {
  id: string;
}

export interface WhatsAppTemplate {
  id: string;
  params: JSON;
  name: string;
  body: string;
  status: TemplateStatus;
  category: string;
  language: string;
  createdAt: number;
  contentType: string;
  twilioTemplateId: string | null;
  rejectionReason: string | null;
}


export enum  TemplateStatus {
  'draft' = 'draft',
  'received' = 'received',
  'pending' = 'pending',
  'approved' = 'approved',
  'rejected' = 'rejected',
}

export interface ContentType {
  type: string;
  description: string;
}
