import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../types/user';
import { FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user: User;
  @Output() change: EventEmitter<User> = new EventEmitter<User>();

  roles = [
    {name: 'Doctor', value: 'doctor'},
    {name: 'Admin', value: 'admin'},
    {name: 'Scheduler', value: 'scheduler'},
  ]

  myForm;
  matcher = new MyErrorStateMatcher();
  loading = false;
  error = '';
  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private router: Router

  ) {

  }

  ngOnInit(): void {
    console.log("[ngOnInit] user", this.user)
    if (!this.user) {
      this.user = {} as User;
    }
    this.createFormGroup();

  }

  ngAfterViewInit(): void {
    console.log("[ngOnInitView] user", this.user)
    if (!this.user) {
      this.user = {} as User;
    }
    this.createFormGroup();
  }

  createFormGroup() {
    // this.user.role = Role.doctor;
    this.myForm = this.formBuilder.group({
      emailFormControl: new FormControl(this.user.email, [Validators.email]),
      phoneNumberFormControl: new FormControl(this.user.phoneNumber, [Validators.pattern(new RegExp(/^\+[0-9 ]+$/))]),
      firstNameFormControl: new FormControl(this.user.firstName, [Validators.required]),
      lastNameFormControl: new FormControl(this.user.lastName, [Validators.required]),
      //roleFormControl: new FormControl(this.user.role, [Validators.required]),
      functionFormControl: new FormControl(this.user._function),
      departmentFormControl: new FormControl(this.user.department),
      viewAllQueuesFormControl: new FormControl(this.user.viewAllQueues),
      authPhoneNumberFormControl: new FormControl(this.user.authPhoneNumber, [Validators.pattern(new RegExp(/^\+[0-9 ]+$/))]),
      genderFormControl: new FormControl(this.user.gender),
      role: new FormControl(this.user.role),

      // genderFormControl: new FormControl(false),

      // our custom validator
    }, {});
    (window as any).myForm = this.myForm;
  }

  cancel() {
    this.location.back();
  }

  onSubmit() {
    this.change.emit(this.user);
  }
}
