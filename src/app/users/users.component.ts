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

  displayedColumns: string[] = ['name', 'email', 'role'];
  dataSource = new MatTableDataSource<User>(this.users);

  count = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    this.countUsers();
    this.dataSource.paginator = this.paginator;
  }

  getUsers() {

    this.loading = true;
    this.subscriptions.push(
      this.userService.find().subscribe(
        (users) => {
          this.users = users;
          this.dataSource.data = this.users;
          // this.dataSource = new MatTableDataSource<User>(this.users);
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

  countUsers() {
    this.loading = true;
    this.subscriptions.push(
      this.userService.count().subscribe(
        (res) => {
          this.count = res.count;
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

  pageChange(event: Event) {

    console.log('page changed ');
  }
}

