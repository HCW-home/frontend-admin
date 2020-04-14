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

  getUsersByPage(limit, skip): Observable<ResourcesResponse<User>> {
    return this.http.get<ResourcesResponse<User>>(environment.api + `/user?limit=${limit}&` + `skip=${skip}`);
  }



  create(user: User): Observable<User> {
    return this.http.post<User>(environment.api + '/user', user);
  }

  update(id, newFields) {
    return this.http.patch(environment.api + `/user/${id}`, newFields);
  }
  delete(user: User) {
    return this.http.delete(environment.api + `/user/${user.id}`);
  }

  addDoctorToQueue(id, queues: any[]) {
    let body = {queue:queues};
    return this.http.post(environment.api +  `/user/${id}/allowed-queues `, body);

  }
  removeDoctorToQueue(id, queues: any[]) {
    return this.http.request('delete',environment.api + `/user/${id}/allowed-queues`, { body: { queue:queues} });
  }
  //retrive queues by userId
  getUserQueuesById(userId) {
    return this.http.get(environment.api + `/user/${userId}/allowed-queues`);
  }
}
