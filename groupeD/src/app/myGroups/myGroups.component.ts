import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myGroups.component',
  templateUrl: './myGroups.component.html',
  styleUrls: ['./myGroups.component.css']
})
export class ProfileComponent implements OnInit {
  groups: any[] = []

  constructor(
    private AuthService: AuthService,
    private _flashMessage: FlashMessagesService,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    this.groupInfos()
  }

  async groupInfos() {
    this.AuthService.getAllGroups().subscribe(async data => {
      if (data as any === null){
        this._flashMessage.show('Was unable to load data')
        setTimeout(function() { window.location.reload()}, 1500)
        this.router.navigate(["signedInIndex"])
      }
      for(let i = 0; i < (data as any).length; i++) {
        this.groups.push(await this.getGroups((data as any)[i]))
      }
    })
  }
  
  async getGroups(groupCode: string): Promise<string> {
    console.log(groupCode)
    return new Promise(resolve => {
    this.AuthService.getGroupWithoutCookie(groupCode).subscribe(data => {
      console.log(data)
      if (data as any === null){
        this._flashMessage.show('Was unable to load data')
        setTimeout(function() { window.location.reload()}, 1500)
        this.router.navigate(["signedInIndex"])
      }
      resolve((data as any).body);
      })
    })
  }
  
  onLogout() {
    this.AuthService.logout();
    this._flashMessage.show("You are logged out", { timeout: 5000 });
    this.router.navigate(['home']);
    return false;
  }
}
