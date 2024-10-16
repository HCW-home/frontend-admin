import { Queue } from './queue';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  constructor(private http: HttpClient) {}

  findOne(id): Observable<Queue> {
    return this.http.get<Queue>(environment.api + `/queue/${id}`);
  }

  find(params = {}): Observable<Queue[]> {
    return this.http.get<Queue[]>(environment.api + `/queue`,  {params});
  }

  create(queue: Queue): Observable<Queue> {
    return this.http.post<Queue>(environment.api + '/queue', queue);
  }

  updateQueue(id, body) {
    return this.http.patch(environment.api + `/queue/${id}`, body);
  }

  delete(queue: Queue) {
    return this.http.delete(environment.api + `/queue/${queue.id}`);
  }
}
