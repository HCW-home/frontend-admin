import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../types/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;
  loading: boolean;
  error;
  userId;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location

  ) { }

  ngOnInit(): void {

    this.userId = this.route.snapshot.paramMap.get('id');
    this.userService.findOne(this.userId).subscribe((res) => {
      this.user = res;
      // this.dataSource = new MatTableDataSource<User>(this.users);

      this.loading = false;

    },
      (err) => {
        this.loading = false;
        this.error = err;
      }
    );
    console.log(this.userId);
  }
  updateUser() {
    console.log("userDetail", this.user)
    this.userService.update(this.userId, this.user).subscribe(
      (res) => console.log(res),
      (err) => console.log(err));
  }
}
