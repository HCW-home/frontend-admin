export class User {
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
}

enum Role {
  'admin'= 'admin',
  'doctor'= 'doctor',
  'patient'= 'patient',
}
