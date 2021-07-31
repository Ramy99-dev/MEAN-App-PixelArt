import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: string;
  noUser: boolean;
  constructor(private userService: UserService, private cookieService: CookieService) { }

  ngOnInit(): void {
    console.log(this.cookieService.get('jwt'))
    if (this.cookieService.get('jwt') != "") {
      this.userService.getProfile().subscribe((result) => {
        this.noUser = false;
        this.user = result.firstName + " " + result.lastName;
      })
    }
    else {
      this.noUser = true;
      console.log("No User")
    }
  }

  logout(): void {
    this.cookieService.delete('jwt')
    this.ngOnInit()
  }

}
