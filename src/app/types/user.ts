import { Role } from './role';

enum LoginType {
  'saml' = 'saml',
  'local' = 'local',
  'sslcert' = 'sslcert',
  'invite' = 'invite'
}

export interface User {
  id?: string;
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  viewAllQueues?: boolean;
  temporaryAccount?: boolean;
  createdAt?: number;
  updatedAt?: number;
  authPhoneNumber?: string;
  phoneNumber?: string;
  token?: string;
  refreshToken: string;
  gender?: string;
  department?: string;
  _function?: string;
  lastLoginType: LoginType;

}
