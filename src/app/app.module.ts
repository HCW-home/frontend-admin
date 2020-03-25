import { TopNavComponent } from './top-nav/top-nav.component';
import { ErrorInterceptor } from './auth/error.interceptor';
import { AuthService } from './auth/auth.service';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [AppComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    TopNavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule
    // MatFormFieldModule,
    // MatCheckboxModule,
    // MatToolbarModule,
    // ReactiveFormsModule,
    // MatGridListModule,
    // MatCardModule,
    // MatDialogModule,
    // MatSelectModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
