import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {



  }

  findOne(id): Observable<User> {
    return this.http.get<User>(environment.api + `/user/${id}`);
  }

  find(criteria = {}): Observable<User[]> {
    console.log('find users ');
    return this.http.get<User[]>(environment.api + `/user?where=${JSON.stringify(criteria)}`);
  }


  count(criteria = {}): Observable<any> {

    return this.http.get(environment.api + `/user/count?where=${JSON.stringify(criteria)}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(environment.api + '/user', user);
  }

  update(id, newFields) {
    return this.http.patch(environment.api + `/user/${id}`, newFields);
  }

  addDoctorToQueue(id, queues: []) {

  }

}
