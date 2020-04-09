import { ResourcesResponse } from './types/resourcesResponse';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from './types/user';
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

  find(criteria = {}): Observable<ResourcesResponse<User>> {
    console.log('find users ');
    return this.http.get<ResourcesResponse<User>>(environment.api + `/user?where=${JSON.stringify(criteria)}`);
  }

  getUsersbyPage(limit, skip): Observable<ResourcesResponse<User>> {
    return this.http.get<ResourcesResponse<User>>(environment.api + `/user?limit=${limit}&` + `skip=${skip}` );
  }



  create(user: User): Observable<User> {
    return this.http.post<User>(environment.api + '/user', user);
  }

  update(id, newFields) {
    return this.http.patch(environment.api + `/user/${id}`, newFields);
  }
  delete(user : User){
    return this.http.delete(environment.api + `/user/${user.id}`);
  }
  addDoctorToQueue(id, queues: []) {

  }

}
