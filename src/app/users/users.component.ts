import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { RoleMapper, Roles } from '../constants/user';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  rolesList: { id: string, label: string }[] = [{ id: Roles.ROLE_DOCTOR, label: 'Doctor' }, {
    id: Roles.ROLE_SCHEDULER,
    label: 'Scheduler'
  }, {
    id: Roles.ROLE_ADMIN, label: 'Admin'
  }, { id: Roles.ROLE_NURSE, label: 'Requester' }];
  selectedRoles = new FormControl([Roles.ROLE_DOCTOR, Roles.ROLE_SCHEDULER, Roles.ROLE_ADMIN, Roles.ROLE_NURSE]);
  subscriptions: Subscription[] = [];
  users: User[] = [];
  loading = false;
  error;

  displayedColumns: string[] = ['name', 'email', 'role', 'doctorTermsVersion',
    'phoneNumber', 'organization', 'country', 'status', 'action'];
  dataSource = new MatTableDataSource<User>(this.users);

  count = 0;
  pageSize = '10';
  pageSizeOptions = [10, 50, 100];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  RoleMapper = RoleMapper;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.getDoctors();
    this.dataSource.paginator = this.paginator;
  }

  onRoleSelectionChange() {
    this.getDoctors();
  }

  getDoctors() {
    this.loading = true;
    const roles = { role: { in: this.selectedRoles.value } };

    this.subscriptions.push(
      this.userService.find(roles).subscribe(
        (res) => {
          this.users = res;
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

  selectUser(user) {
    this.router.navigate(['/user', user.id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onToggle(event: MatSlideToggleChange, user: any) {
    const { checked } = event;
    this.userService.updateUserStatus(user.id, checked ? 'approved' : 'not-approved')
      .subscribe({
        next: (res) => {
          this.getDoctors();
        }, error: (err) => {
          console.log(err, 'err');
        }
      });
  }


  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
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
}
