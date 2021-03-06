import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router} from "@angular/router";
import { FlashMessage} from "angular-flash-message";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage : FlashMessage

  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data =>{
          if(data.success){
            this.authService.storeUserDatta(data.token, data.user);
            this.flashMessage.success('You are now logged in',{delay:3000});
            this.router.navigate(['dashboard']);
          }
          else{
            this.flashMessage.warning(data.msg,{delay:3000});
            this.router.navigate(['login']);
          }
    })
  }


}
