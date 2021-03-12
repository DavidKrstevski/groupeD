import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  gname = "";
  gcode = ""; 
  users : string[] = [];

  constructor(
    private AuthService:AuthService,
    private _flashMessage: FlashMessagesService,
    private router: Router,
    private AuthService2: AuthService
    ) { }

  ngOnInit(): void {
    this.getInfos()
  }
  
  async getInfos() {
    this.AuthService.getGroup().subscribe(async data => {

      if (data as any === null){
        this._flashMessage.show('Was unable to load data')
        setTimeout(function() { window.location.reload()}, 1500)
        this.router.navigate(["signedInIndex"])
      }
      console.log(data)
      this.gname = (data as any).groupName;
      this.gcode = (data as any).groupCode;
      
      for (let i = 0; i < (data as any).userList.length; i++) {
        this.users.push(await this.getName((data as any).userList[i]))
      }
      console.log(this.users)
    })
    
  }
  async getName(nameAsID: string): Promise<string> {
    return new Promise(resolve => {
      this.AuthService2.getUsernameWithoutCookie(nameAsID).subscribe(name => {
        console.log((name as any).body.username)
        if (name as any === null){
          this._flashMessage.show('Was unable to load data')
          setTimeout(function() { window.location.reload()}, 1500)
          this.router.navigate(["signedInIndex"])
        }
        resolve((name as any).body.username);
      })
    })
  }
}
