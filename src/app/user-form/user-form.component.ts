import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../models/user';
import { UntypedFormBuilder, UntypedFormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Location } from '@angular/common';
import { Roles } from '../constants/user';
import { Queue } from '../models/queue';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../services/config.service';
import { InviteService } from '../core/invite.service';

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
  @Input() user: User;
  @Input() allQueues: Queue[];
  @Output() submmit: EventEmitter<{ user: User, selectedQueue: Queue[] }> = new EventEmitter<{
    user: User,
    selectedQueue: Queue[]
  }>();

  roles = [
    { name: this.translate.instant('roles.doctor'), value: Roles.ROLE_DOCTOR },
    { name: this.translate.instant('roles.admin'), value: Roles.ROLE_ADMIN },
    { name: this.translate.instant('roles.scheduler'), value: Roles.ROLE_SCHEDULER },
    { name: this.translate.instant('roles.requester'), value: Roles.ROLE_NURSE }
  ];

  myForm;
  matcher = new MyErrorStateMatcher();
  loading = false;
  error = '';
  showMessageServiceRadio = false;
  phoneNumberRegex = new RegExp(/^\+[0-9 ]+$/);

  Roles = Roles;

  constructor(
    private location: Location,
    private translate: TranslateService,
    private configService: ConfigService,
    private formBuilder: UntypedFormBuilder,
    private inviteService: InviteService,
  ) {
  }

  ngOnInit(): void {
    this.initializeRoles();

    if (!this.user) {
      this.user = {} as User;
    }
    this.createFormGroup();
  }

  initializeRoles() {
    this.roles = [
      { name: this.translate.instant('roles.doctor'), value: Roles.ROLE_DOCTOR },
      { name: this.translate.instant('roles.admin'), value: Roles.ROLE_ADMIN },
      { name: this.translate.instant('roles.scheduler'), value: Roles.ROLE_SCHEDULER },
      { name: this.translate.instant('roles.requester'), value: Roles.ROLE_NURSE }
    ];
    if (this.configService.config.hideSchedulerRole) {
      this.roles = this.roles.filter(role => role.value !== Roles.ROLE_SCHEDULER);
    }
  }

  ngAfterViewInit(): void {
    if (!this.user) {
      this.user = {} as User;
    }
    this.createFormGroup();
  }

  createFormGroup() {
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
      queue: new UntypedFormControl([]),
      enableNotifFormControl: new UntypedFormControl(this.user.enableNotif || false),
      notifPhoneNumberFormControl: new UntypedFormControl(this.user.notifPhoneNumber, [Validators.pattern(new RegExp(/^\+[0-9 ]+$/))]),
      messageServiceFormControl: new UntypedFormControl(this.user.messageService || '2'),
    }, {});
    (window as any).myForm = this.myForm;

    if (this.user.notifPhoneNumber) {
      this.checkPrefix(this.user.notifPhoneNumber);
    }
  }

  onNotifPhoneNumberChange() {
    const phoneNumber = this.user.notifPhoneNumber;
    if (phoneNumber && this.phoneNumberRegex.test(phoneNumber)) {
      this.checkPrefix(phoneNumber);
    } else {
      this.showMessageServiceRadio = false;
    }
  }

  checkPrefix(phoneNumber: string) {
    this.inviteService.checkPrefix(phoneNumber, 'en', 'notification for offline action text for doctor')
      .subscribe({
        next: res => {
          switch (res.status) {
            case 0:
              this.showMessageServiceRadio = false;
              break;
            case 1:
              this.showMessageServiceRadio = true;
              break;
            case 2:
              this.showMessageServiceRadio = false;
              if (this.user.messageService !== '1') {
                this.user.messageService = '1';
              }
              break;
            case 3:
              this.showMessageServiceRadio = false;
              if (this.user.messageService !== '2') {
                this.user.messageService = '2';
              }
              break;
          }
        },
        error: () => {
          this.showMessageServiceRadio = false;
        },
      });
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
