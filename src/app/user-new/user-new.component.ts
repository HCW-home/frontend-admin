import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("init new user")
  }

}
