import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errMsg:string;
  constructor(private formBuilder: FormBuilder ,private userService :UserService ,  private cookieService: CookieService ,private router:Router ) {
    this.loginForm = this.formBuilder.group({

      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required,Validators.minLength(6)])
    })
   }

  ngOnInit(): void {
    if(this.cookieService.get('jwt')!="")
    {
      this.router.navigate(['/home']);
    }
  }

  login()
  {
    
    let user = {
      email : this.loginForm.value.email,
      password : this.loginForm.value.password
    }
    this.userService.getUser(user).subscribe((result)=>{
      
        if(result.state =="Connected")
        {
          
          this.cookieService.set( 'jwt', result.token );
          this.router.navigate(['/home']);
        }
        else if(result.state=="error")
        {
           this.errMsg=result.errMsg;
        }
      
      
     
     
    })
  }

}
