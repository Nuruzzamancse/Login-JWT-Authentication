import { Component, OnInit } from '@angular/core';
import { ValidateService} from "../../services/validate.service";
import {flatMap} from "tslint/lib/utils";
import { FlashMessage} from "angular-flash-message";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessage,
              private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){

    const user = {
      name : this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    //Required Fiels
    if(!this.validateService.validateRegister(user)){
      // this.flashMessages.show('Please fill in all fields',{cssClass: 'alert-danger',timeout:300});
      this.flashMessage.warning('Please fill in all fields',{delay:2000});
      return false;
    }

    //Validate Email
    if(!this.validateService.validateEmail(user.email)){
      // this.flashMessages.show('Please use a valid email',{cssClass: 'alert-danger',timeout:300});

      this.flashMessage.warning('Please use valid email',{delay:2000});
      return false;
    }

    //Register User

    this.authService.registerUser(user).subscribe(data =>{
      if(data.success){
        this.flashMessage.success('You are registered and can login',{delay:2000});
        this.router.navigate(['/login']);

      }else{

        this.flashMessage.warning('Something went wrong',{delay:2000});
        this.router.navigate(['/register']);
      }
    })

  }

}
