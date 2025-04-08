import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ErrorInterceptor } from './auth/error.interceptor';
import { QueuesComponent } from './queues/queues.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { UserNewComponent } from './user-new/user-new.component';
import { SettingsComponent } from './settings/settings.component';
import { UserFormComponent } from './user-form/user-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MediasoupComponent } from './mediasoup/mediasoup.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { WithCredentialsInterceptor } from './auth/with-credentials.interceptor';
import { WhatsappTemplatesComponent } from './whatsapp-templates/whatsapp-templates.component';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { EditWhatsappTemplateComponent } from './edit-whatsapp-template/edit-whatsapp-template.component';
import { ConfigService } from './services/config.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translate/', '.json');
}

export function initializeApp(translate: TranslateService) {
  return () => translate.use('en').toPromise();
}

@NgModule({
  declarations: [AppComponent,
    UsersComponent,
    LoginComponent,
    TopNavComponent,
    QueuesComponent,
    UserNewComponent,
    SettingsComponent,
    UserFormComponent,
    MediasoupComponent,
    DialogBoxComponent,
    DashboardComponent,
    UserDetailComponent,
    WhatsappTemplatesComponent,
    ConfirmationDialogComponent,
    EditWhatsappTemplateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatBadgeModule,
    DragDropModule,
    MatTableModule,
    MatChipsModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    AppRoutingModule,
    MatSidenavModule,
    MatTooltipModule,
    HttpClientModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (cs: ConfigService) => () => cs.getConfig(),
      deps: [ConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
