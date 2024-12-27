export interface Language {
  value: string;
  viewValue: string;
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

export interface WhatsAppTemplate {
  id: string;
  params: JSON;
  name: string;
  body: string;
  status: string;
  category: string;
  language: string;
  createdAt: number;
  contentType: string;
  twilioTemplateId: string | null;
}
