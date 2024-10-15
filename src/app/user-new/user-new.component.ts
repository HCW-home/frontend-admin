import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  constructor(private userService: UserService,
              private location: Location,
              private router: Router,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    console.log('init new user');
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  createUser(user) {
    this.userService.create(user).subscribe(
      (res) => {
        if (res.id) {
          this.router.navigate(['user', res.id])
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
