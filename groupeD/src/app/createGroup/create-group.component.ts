import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['../index/index.component.css', './create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  groupname = "";

  constructor(
    private AuthService:AuthService,
    private router:Router,
    private _flashMessage:FlashMessagesService
    ) { }

    ngOnInit(): void {

    }

  createGroup(myGroupName: string) {
    if (myGroupName == "")
      return;

    if (!this.checkIfCodeIsValid(myGroupName)){
      setTimeout(function() { window.location.reload()}, 1500)
      return;
    }

    const groupdata = {
      gname: myGroupName
    }
    
    this.AuthService.createGroup(myGroupName).subscribe(data => {
      if (data.body as any === false){
        this._flashMessage.show('Something went wrong', {
        timeout: 1500});   
        setTimeout(function() { window.location.reload()}, 1500)
        return;
      }
      this._flashMessage.show('Group created')  
        this.AuthService.storeUserData((data as any).token, (data as any).user)
        this.groupname = myGroupName;
        this.router.navigate(['group']);   
    })
  }

  checkIfCodeIsValid(myGroupName: string) {
    if(myGroupName.length < 3)
    {
      this._flashMessage.show('Name is to short')
      return false;
    }
    return true;
  }

  onLogout() {
    this.AuthService.logout();
    this._flashMessage.show("You are logged out", { timeout: 5000 });
    this.router.navigate(['home']);
    return false;
  }
}