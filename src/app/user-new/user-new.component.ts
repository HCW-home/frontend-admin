import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { Location } from '@angular/common';
import { QueueService } from '../core/queue.service';
import { Queue } from '../models/queue';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  allQueues: Queue[] = [];

  constructor(private userService: UserService,
              private location: Location,
              private router: Router,
              private queueService: QueueService,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getAllQueues();
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  getAllQueues() {
    const params = {
      viewAllQueues: true
    };
    this.queueService.find(params).subscribe(
      (res) => {
        console.log('get all queues', res);
        this.allQueues = res;
      },
      (err) => {
        this.showError(err || 'An error occurred while saving data!');
      }
    );
  }

  createUser(values) {
    this.userService.create(values.user).subscribe(
      (res) => {
        if (res.id) {
          this.userService.addDoctorToQueue(res.id, values.selectedQueue).subscribe(
            () => {
              this.router.navigate(['user', res.id]);
            }
          );
        } else {
          this.location.back();
        }
      },
      (err) => {
        const error =
          err.details ||
          err.error?.message ||
          err.statusText ||
          err.message ||
          err;
        this.showError(error || 'An error occurred while saving data!');
      });
  }


}
