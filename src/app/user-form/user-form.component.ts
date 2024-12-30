import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../models/user';
import { UntypedFormBuilder, UntypedFormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Location } from '@angular/common';
import { Roles } from '../constants/user';
import { Queue } from '../models/queue';
import { TranslateService } from '@ngx-translate/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
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

  constructor(
    private translate: TranslateService,
    private formBuilder: UntypedFormBuilder,
    private location: Location
  ) {
  }

  @Input() user: User;
  @Input() allQueues: Queue[];
  @Output() submmit: EventEmitter<{ user: User, selectedQueue: Queue[] }> = new EventEmitter<{
    user: User,
    selectedQueue: Queue[]
  }>();

  roles = [
    { name: this.translate.instant('roles.doctor'), value: Roles.ROLE_DOCTOR },
    { name: 'Admin', value: Roles.ROLE_ADMIN },
    { name: 'Scheduler', value: Roles.ROLE_SCHEDULER },
    { name: 'Requester', value: Roles.ROLE_NURSE }
  ];

  myForm;
  matcher = new MyErrorStateMatcher();
  loading = false;
  error = '';


  Roles = Roles;

  ngOnInit(): void {
    if (!this.user) {
      this.user = {} as User;
    }
    this.createFormGroup();
  }

  ngAfterViewInit(): void {
    console.log('[ngOnInitView] user', this.user);
    if (!this.user) {
      this.user = {} as User;
    }
    this.createFormGroup();
  }

  createFormGroup() {
    // this.user.role = Role.doctor;
    this.myForm = this.formBuilder.group({
      emailFormControl: new UntypedFormControl(this.user.email, [Validators.email]),
      phoneNumberFormControl: new UntypedFormControl(this.user.phoneNumber, [Validators.pattern(new RegExp(/^\+[0-9 ]+$/))]),
      firstNameFormControl: new UntypedFormControl(this.user.firstName, [Validators.required]),
      lastNameFormControl: new UntypedFormControl(this.user.lastName, [Validators.required]),
      functionFormControl: new UntypedFormControl(this.user._function),
      departmentFormControl: new UntypedFormControl(this.user.department),
      viewAllQueuesFormControl: new UntypedFormControl(this.user.viewAllQueues),
      authPhoneNumberFormControl: new UntypedFormControl(this.user.authPhoneNumber, [Validators.pattern(new RegExp(/^\+[0-9 ]+$/))]),
      genderFormControl: new UntypedFormControl(this.user.gender),
      role: new UntypedFormControl(this.user.role),
      password: new UntypedFormControl(''),
      queue: new UntypedFormControl([])

      // genderFormControl: new FormControl(false),

      // our custom validator
    }, {});
    (window as any).myForm = this.myForm;
  }

  cancel() {
    this.location.back();
  }

  onSubmit() {
    if (this.myForm.valid) {
      const selectedQueue = this.myForm.get('role').value === Roles.ROLE_DOCTOR ? this.myForm.get('queue').value : [];
      this.submmit.emit({ user: this.user, selectedQueue });
    }
  }
}
