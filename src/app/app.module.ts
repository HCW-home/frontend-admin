import { WithCredentialsInterceptor } from './auth/with-credentials.interceptor';
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

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';




import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { UserNewComponent } from './user-new/user-new.component';
import { QueuesComponent } from './queues/queues.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [AppComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    TopNavComponent,
    UserDetailComponent,
    UserFormComponent,
    UserNewComponent,
    QueuesComponent,
    DialogBoxComponent,
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
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,

    // MatFormFieldModule,
    // MatToolbarModule,
    // ReactiveFormsModule,
    // MatGridListModule,
    // MatCardModule,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
