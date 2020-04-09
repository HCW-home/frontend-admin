import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  constructor(private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    console.log("init new user")
  }

  createUser(user) {
    console.log("userDetail", user);
    this.userService.create(user).subscribe(
      (res) => {
        console.log(res);
        this.location.back();
      },
      (err) => console.log(err));
  }


}
