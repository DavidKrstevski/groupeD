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
    {
      this.flashMessage.show('Your passwords are not the same');
      console.log('Your passwords are not the same')
      this.router.navigate(['./register']);
    }

    if (myPassword.length < 7)
    {
      this.flashMessage.show('Your password is too short');
      console.log('Your password is too short')
      this.router.navigate(["./register"]);
    }
    //Todo: res false && pass != confirmpass don't route
    

    const user = {
      username: myUsername,
      password: myPassword,
      confirmPassword: myConfirmPassword
    };
   
    this.AuthService.registerUser(user).subscribe(data => {
      if (data as any === false){
        this.flashMessage.show('Register failed, try again', {
        timeout: 5000});   
        this.router.navigate(['register']);
      }
      
      this.AuthService.storeUserData((data as any).token, (data as any).user)
      this.router.navigate(['signedInIndex']);
    });
  }
}