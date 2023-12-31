import { Subscription } from 'rxjs';
import { UserService } from './../user.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
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

  displayedColumns: string[] = ['name', 'email', 'role', 'action'];
  dataSource = new MatTableDataSource<User>(this.users);

  count = 0;
  pageIndex = 0;
  pageSize = '10';
  pageSizeOptions = ['10', '50', '100'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getDoctors();
    /* this.countUsers();*/
    this.dataSource.paginator = this.paginator;
    //this.getUsersByPage(this.pageSize, this.pageIndex);
  }

  getDoctors() {
    this.loading = true;
      const roles = { role: { in: ['doctor', 'scheduler'] }}
    this.subscriptions.push(
      this.userService.find(roles).subscribe(
        (res) => {
          this.users = res;
          // this.count = res.totalCount;
          this.dataSource.data = this.users;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          this.error = err;
        }
      )
    );
  }

  /* useful if multiple role managed filterByRole(role) {
    console.log(role);
    if (role) {
      this.dataSource.data = this.users.filter(user => user.role == role);

    } else {
      this.dataSource.data = this.users;
    }
  }*/

  selectUser(user) {
    this.router.navigate(['/user', user.id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  countUsers() {
    // this.loading = true;
    this.subscriptions.push(
      this.userService.find().subscribe(
        (res) => {
          // this.count = res.totalCount;
          console.log('total length', this.count);
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
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  pageChange(event) {
    /* useful for dynamic pagination console.log('page changed length', event);
     console.log('page changed limit', event.pageSize);
     console.log('page changed skip', event.pageIndex);
     this.pageSize = event.pageSize;
     this.pageIndex = event.pageIndex;
     this.getUsersByPage(this.pageSize, this.pageIndex);*/
  }
  deleteUser(user) {
    if (confirm('Etes-vous sûr de vouloir supprimer cet utilisateur?')) {
      this.userService.delete(user).subscribe(
        (res) => {
          this.getDoctors();
        },
        (err) => {
          this.error = err;
        }
      );
    }
  }
  /* useful for dynamic pagination getUsersByPage(limit, skip) {
// this.loading = true;
this.subscriptions.push(
  this.userService.getUsersByPage(limit, skip).subscribe(
    (res) => {
      console.log("getUsersByPage totalcount", res.totalCount)
      this.count = res.totalCount;
      this.users = res.results;
      this.dataSource.data = this.users;

      this.loading = false;

    },
    (err) => {
      this.loading = false;
      this.error = err;
    }
  )
);
}*/
}
