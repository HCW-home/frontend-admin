import { QueueService } from './../queue.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../types/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user: User;
  loading: boolean;
  loadingUserQueue: boolean;
  loadingAllQueues: boolean;
  isAddingQueues = false;
  isRemovingQueues = false;
  error;
  userId;
  allQueues: any[];
  allowedQueues: any;
  queuesNotAllowed = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private queueService: QueueService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.userService.findOne(this.userId).subscribe(
      (res) => {
        this.user = res;
        // this.dataSource = new MatTableDataSource<User>(this.users);

        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.error = err;
      }
    );
    this.getUserQueues();
  }
  addQueueToUser(queueId) {}
  removeQueueToUser(queueId) {}
  getUserQueues() {
    this.loadingUserQueue = true;

    this.userService.getUserQueuesById(this.userId).subscribe(
      (res) => {
        this.allowedQueues = res;
        console.log('allowedQueues', this.allowedQueues);

        this.getAllQueues();
        this.loadingUserQueue = false;
      },
      (err) => {
        this.loadingUserQueue = false;
        this.error = err;
      }
    );
  }

  getAllQueues() {
    this.loadingAllQueues = true;
    this.queueService.find().subscribe(
      (res) => {
        console.log('get all queues', res);
        this.allQueues = res;
        this.loadingAllQueues = false;
        this.filterQueuesNotAllowed();
      },
      (err) => {
        this.loading = false;
        this.error = err;
      }
    );
  }

  filterQueuesNotAllowed() {
    let queuesIds = this.allowedQueues.map(function (e) {
      return e.id;
    });
    this.queuesNotAllowed = this.allQueues.filter((queue) => {
      //if id not found in the allowedQueues of the user it means that this queue isn't allowed.
      return queuesIds.indexOf(queue.id) < 0;
    });
    console.log('queuesNotAllowed', this.queuesNotAllowed);
  }
  selectQueueToRemove(queue) {
    queue.checked = !queue.checked;
  }
  selectQueueToAdd(queue) {
    queue.checked = !queue.checked;
  }
  addQueue() {
    let queuesToAdd = this.queuesNotAllowed.filter((q) => q.checked).map((q) => q.id);
    if (!queuesToAdd || queuesToAdd.length == 0 || this.isAddingQueues) return;
    console.log(queuesToAdd);
    this.isAddingQueues = true;
    this.userService.addDoctorToQueue(this.user.id, queuesToAdd).subscribe(
      (res) => {
        console.log(res);
        this.isAddingQueues = false;
        this.getUserQueues();
      },
      (err) => {
        console.log(err);
        this.isAddingQueues = false;
      }
    );
  }

  removeQueue() {
    let queuesToRemove = this.allowedQueues.filter((q) => q.checked).map((q) => q.id);
    if (!queuesToRemove || queuesToRemove.length == 0 || this.isRemovingQueues) return;
    this.isRemovingQueues = true;
    this.userService.removeDoctorToQueue(this.user.id, queuesToRemove).subscribe(
      (res) => {
        console.log(res);
        this.isRemovingQueues = false;
        this.getUserQueues();
      },
      (err) => {
        console.log(err);
        this.isRemovingQueues = false;
      }
    );
  }
  updateUser() {
    console.log('userDetail', this.user);
    this.userService.update(this.userId, this.user).subscribe(
      (res) => {
        console.log(res);
        this.location.back();
      },
      (err) => console.log(err)
    );
  }
}
