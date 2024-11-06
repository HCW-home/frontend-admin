import { WithCredentialsInterceptor } from './auth/with-credentials.interceptor';
import { TopNavComponent } from './top-nav/top-nav.component';
import { ErrorInterceptor } from './auth/error.interceptor';
import { AuthService } from './auth/auth.service';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';




import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { UserNewComponent } from './user-new/user-new.component';
import { QueuesComponent } from './queues/queues.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MediasoupComponent } from './mediasoup/mediasoup.component';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { SettingsComponent } from './settings/settings.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translate/', '.json');
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
        })
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
    bootstrap: [AppComponent]
})
export class AppModule { }
