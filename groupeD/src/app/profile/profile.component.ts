import { Component, OnInit, Input } from '@angular/core';

import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-profile.component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() login: LoginComponent | undefined;

  constructor() {
    
  }

  ngOnInit(): void {

  }

}
