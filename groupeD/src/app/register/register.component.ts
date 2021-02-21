import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  username = "";
  password = "";
  confirmPassword = "";

  constructor(
    private AuthService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
    ) { }

  ngOnInit(): void {
  }

  onRegister(myUsername: string, myPassword: string, myConfirmPassword: string) {
    if (myPassword !== myConfirmPassword)
      return;

    //Todo: res false && pass != confirmpass don't route
    

    const user = {
      username: myUsername,
      password: myPassword,
      confirmPassword: myConfirmPassword
    };
   
    this.AuthService.registerUser(user).subscribe(data => {
        if ((data as any).success){
          this.AuthService.storeUserData((data as any).token, (data as any).user)
        } else {
          this.flashMessage.show('You are now logged in', {
            cssClass: 'alert-success', 
            timeout: 5000});       

          this.flashMessage.show((data as any).msg, {
            cssClass: 'alert-danger', 
            timeout: 5000});
        }
    });
  }
}