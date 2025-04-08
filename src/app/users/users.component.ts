import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from '../core/user.service';
import { User } from '../models/user';
import { Roles } from '../constants/user';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PageEvent } from '@angular/material/paginator';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  roles: { id: string, label: string }[] = [];
  selectedRoles;
  query = '';
  subscriptions: Subscription[] = [];
  users: User[] = [];
  loading = false;
  error;
  displayedColumns: string[] = ['name', 'email', 'role', 'doctorTermsVersion',
    'phoneNumber', 'organization', 'country', 'status', 'action'];
  dataSource = new MatTableDataSource<User>(this.users);
  totalUsers = 0;
  pageSize = 10;
  pageSizeOptions = [10, 50, 100];
  currentPageIndex = 0;
  searchInputChanged$: Subject<string> = new Subject<string>();

  protected readonly Roles = Roles;

  constructor(
    private router: Router,
    private userService: UserService,
    private translate: TranslateService,
    private configService: ConfigService
  ) {
  }

  ngOnInit(): void {
    this.initializeRoles();
    this.getUsers();
    this.searchInputChanged$
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.getUsers();
      });
  }

  initializeRoles(): void {
    this.roles = [
      { id: Roles.ROLE_DOCTOR, label: this.translate.instant('roles.doctor') },
      { id: Roles.ROLE_SCHEDULER, label: this.translate.instant('roles.scheduler') },
      { id: Roles.ROLE_ADMIN, label: this.translate.instant('roles.admin') },
      { id: Roles.ROLE_NURSE, label: this.translate.instant('roles.requester') }
    ];

    if (this.configService.config.hideSchedulerRole) {
      this.roles = this.roles.filter(role => role.id !== Roles.ROLE_SCHEDULER);
    }

    const defaultRoles = [
      Roles.ROLE_DOCTOR,
      Roles.ROLE_SCHEDULER,
      Roles.ROLE_ADMIN,
      Roles.ROLE_NURSE
    ];

    const filteredDefaultRoles = this.configService.config.hideSchedulerRole
      ? defaultRoles.filter(role => role !== Roles.ROLE_SCHEDULER)
      : defaultRoles;

    this.selectedRoles = new UntypedFormControl(filteredDefaultRoles);
  }


  onRoleSelectionChange() {
    this.currentPageIndex = 0;
    this.paginator.pageIndex = 0;
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    const params = {
      pageIndex: this.currentPageIndex,
      pageSize: this.pageSize,
      query: this.query,
      ['roles[]']: this.selectedRoles.value
    };
    this.subscriptions.push(
      this.userService.getPaginatedUsers(params).subscribe(
        (res) => {
          this.users = res.data;
          this.totalUsers = res.total;
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
    this.currentPageIndex = 0;
    this.paginator.pageIndex = 0;
    this.searchInputChanged$.next(event);
  }

  onToggle(event: MatSlideToggleChange, user: any) {
    const { checked } = event;
    this.userService.updateUserStatus(user.id, checked ? 'approved' : 'not-approved')
      .subscribe({
        next: (res) => {
          this.getUsers();
        }, error: (err) => {
          console.log(err, 'err');
        }
      });
  }

  deleteUser(user) {
    if (confirm('Etes-vous sûr de vouloir supprimer cet utilisateur?')) {
      this.userService.delete(user).subscribe(
        (res) => {
          this.getUsers();
        },
        (err) => {
          this.error = err;
        }
      );
    }
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPageIndex = event.pageIndex;
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
