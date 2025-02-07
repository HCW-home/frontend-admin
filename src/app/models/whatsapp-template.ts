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

export interface IParamsGetTemplates {
  language: string;
  approvalStatus?: string;
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
}

export interface IBodySubmitWhatsAppTemplate {
  id: string;
}

export interface IBodyBulkSubmitWhatsAppTemplate {
  ids: string[];
}

export interface IBodyUpdateWhatsAppTemplate {
  body: string;
}

export interface IBodyDeleteWhatsAppTemplate {
  id: string;
}

export interface IBodyRefreshStatus {
  id: string;
}

export interface WhatsAppTemplate {
  id: string;
  key: string;
  createdAt: number;
  dateCreated: Date;
  dateUpdated: Date;
  friendlyName: string;
  language: string;
  links: JSON;
  sid: string;
  types: JSON;
  updatedAt: number;
  url: string;
  variables: JSON;
  rejectionReason: string | null;
  approvalStatus: TemplateStatus;
  body: string;
  actions: []
}


export enum  TemplateStatus {
  'draft' = 'draft',
  'received' = 'received',
  'pending' = 'pending',
  'approved' = 'approved',
  'rejected' = 'rejected',
  'unknown' = 'unknown'
}

export interface ContentType {
  type: string;
  description: string;
}
