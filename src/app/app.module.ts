import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

// import {

//   MatFormFieldModule,
//   MatCheckboxModule,
//   MatToolbarModule,
//   MatListModule,
//   MatButtonModule,
//   MatBadgeModule,
//   MatInputModule,
//   MatGridListModule,
//   MatCardModule,
//   MatProgressSpinnerModule,
//   MatDialogModule,
//   MatSelectModule
// } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatBadgeModule,
    FormsModule
    // MatFormFieldModule,
    // MatCheckboxModule,
    // MatToolbarModule,
    // ReactiveFormsModule,
    // MatInputModule,
    // MatGridListModule,
    // MatCardModule,
    // MatProgressSpinnerModule,
    // MatDialogModule,
    // MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
