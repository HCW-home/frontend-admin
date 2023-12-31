import { Component, OnInit, Input, NgZone, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Input() consultation;
  @Input() title: string;
  @Input() icon: string;
  currentUser;
  logoutToggle = false;
  infoToggle = false;
  @Input() showCloseConsBtn;
  @Output() closeCon = new EventEmitter<boolean>();
  constructor(
    private authService: AuthService,
    private location: Location,
    private zone: NgZone,
    ) { }

  ngOnInit() {

    this.currentUser = this.authService.currentUserValue;
  }

  goBack() {
    this.location.back();
  }

  toggleLogout() {
    this.zone.run(() => {
      this.logoutToggle = !this.logoutToggle;
    });
  }

  logout() {
    this.authService.logout();
  }



  showCloseModal() {
    this.closeCon.emit(true);
  }
}
