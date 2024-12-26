import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from '../user.service';
import { User } from '../types/user';
import {  Roles } from '../constants/user';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  rolesList: { id: string, label: string }[] = [];
  selectedRoles = new UntypedFormControl([Roles.ROLE_DOCTOR, Roles.ROLE_SCHEDULER, Roles.ROLE_ADMIN, Roles.ROLE_NURSE]);
  query = '';
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
  searchInputChanged$: Subject<string> = new Subject<string>();

  protected readonly Roles = Roles;

  constructor(
    private translate: TranslateService,
    private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.rolesList = [{ id: Roles.ROLE_DOCTOR, label: this.translate.instant('roles.doctor') }, {
      id: Roles.ROLE_SCHEDULER,
      label: 'Scheduler'
    }, {
      id: Roles.ROLE_ADMIN, label: 'Admin'
    }, { id: Roles.ROLE_NURSE, label: 'Requester' }];

    this.getDoctors();
    this.dataSource.paginator = this.paginator;
    this.searchInputChanged$
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.getDoctors();
      });
  }

  onRoleSelectionChange() {
    this.getDoctors();
  }

  getDoctors() {
    this.loading = true;

    const roles = this.selectedRoles.value.length > 0
      ? { role: { in: this.selectedRoles.value } }
      : {};

    const searchQuery = this.query?.trim();
    let filters;

    if (searchQuery) {
      const searchTerms = searchQuery.split(' ').filter((term) => term);

      const nameFilters = searchTerms.map((term) => ({
        or: [
          { firstName: { contains: term,  $options: 'i'  } },
          { lastName: { contains: term,  $options: 'i'  } },
          { email: { contains: term,  $options: 'i'  } }
        ]
      }));

      filters = {
        ...roles,
        and: nameFilters
      };
    } else {
      filters = roles;
    }

    this.subscriptions.push(
      this.userService.find(filters).subscribe(
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

  applyFilter(event: string) {
    this.searchInputChanged$.next(event);
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

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
