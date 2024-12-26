import { WithCredentialsInterceptor } from './auth/with-credentials.interceptor';
import { TopNavComponent } from './top-nav/top-nav.component';
import { ErrorInterceptor } from './auth/error.interceptor';
import { AuthService } from './auth/auth.service';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserNewComponent } from './user-new/user-new.component';
import { QueuesComponent } from './queues/queues.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MediasoupComponent } from './mediasoup/mediasoup.component';
import { SettingsComponent } from './settings/settings.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { WhatsappTemplatesComponent } from './whatsapp-templates/whatsapp-templates.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translate/', '.json');
}


export function initializeApp(translate: TranslateService) {
  return () => translate.use('en').toPromise();
}

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
    MediasoupComponent,
    SettingsComponent,
    WhatsappTemplatesComponent
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
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    DragDropModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatProgressSpinnerModule
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
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [TranslateService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
