import { UsersComponent } from './users/users.component';
import { AuthGuard } from './_guards/auth.guard';
import { RouterGuard } from './_guards/router.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
