import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from './models/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  navigated = true;

  currentUser: User;

  constructor(
    private translate: TranslateService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private authService: AuthService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    iconRegistry.addSvgIcon('dashboard', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icon-dashboard.svg'));
    iconRegistry.addSvgIcon('queue', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icon-queue.svg'));
    iconRegistry.addSvgIcon('server', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/server.svg'));
    iconRegistry.addSvgIcon('chat', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icon-open.svg'));
    iconRegistry.addSvgIcon('history', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icon-history.svg'));
    iconRegistry.addSvgIcon('next', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icon-next.svg'));
    iconRegistry.addSvgIcon('back', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/arrow-back.svg'));
    iconRegistry.addSvgIcon('stat', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icon-user.svg'));
    iconRegistry.addSvgIcon('info', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/Icon-info.svg'));
    iconRegistry.addSvgIcon('phone', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/phone-solid.svg'));
    iconRegistry.addSvgIcon('camera', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icon-cameraOn.svg'));
    iconRegistry.addSvgIcon('mic', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icon-speak.svg'));
    iconRegistry.addSvgIcon('hangup', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icon-hangup.svg'));
    iconRegistry.addSvgIcon('incoming', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icon-audio.svg'));
    iconRegistry.addSvgIcon('cameraOff', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icon-cameraOff.svg'));
    iconRegistry.addSvgIcon('logout', sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/icon-logout.svg'));
    iconRegistry.addSvgIcon('attach', sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/icon-attachment.svg'));
    iconRegistry.addSvgIcon('pdf', sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/file-pdf-solid.svg'));
    iconRegistry.addSvgIcon('send', sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/paper-plane-solid.svg'));
    iconRegistry.addSvgIcon('question', sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/question-circle-solid.svg'));
    iconRegistry.addSvgIcon('invite', sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/icon-invite.svg'));

  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
}
