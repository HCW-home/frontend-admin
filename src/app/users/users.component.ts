import { Subscription } from 'rxjs';
import { UserService } from './../user.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { User } from '../user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  users: User[] = [];
  loading = false;
  error;

  displayedColumns: string[] = ['firstName', 'lastName', 'role'];
  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {

    this.loading = true;
    this.subscriptions.push(
      this.userService.find().subscribe(
        (users) => {
          this.users = users;
          this.dataSource = new MatTableDataSource<User>(this.users);
          console.log('got users ', users);
          this.loading = false;

        },
        (err) => {
          this.loading = false;
          this.error = err;
        }
      )
    );
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}

