import { UserNewComponent } from './user-new/user-new.component';
import { QueuesComponent } from './queues/queues.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './_guards/auth.guard';
import { RouterGuard } from './_guards/router.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, RouterGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard'
        },
        canActivate: [RouterGuard]
      },
      {
        path: 'user',
        component: UsersComponent,
        data: {
          title: 'User'
        },
        canActivate: [RouterGuard]
      },
      {
        path: 'user/:id',
        component: UserDetailComponent,
        data: {
          title: 'User Detail'
        },
        canActivate: [RouterGuard]
      },
      {
        path: 'new-user',
        component: UserNewComponent,
        data: {
          title: 'New User'
        },
        canActivate: [RouterGuard]
      },
      {
        path: 'queue',
        component: QueuesComponent,
        data: {
          title: 'Queue'
        },
        canActivate: [RouterGuard]
      },
    ]
  },
  {
  path: 'login',
  component: LoginComponent
}, ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
