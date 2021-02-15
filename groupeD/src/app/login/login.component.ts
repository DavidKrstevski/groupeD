import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../index/index.component.css', './login.component.css']
})
export class LoginComponent implements OnInit {

  myUsername = "";
  password = "";

  constructor() { }

  ngOnInit(): void {
  }

  onLogin(username: string, password: string) {
    this.myUsername = username;
    this.password = password;

    this.dataToJSON();
    this.postData();
  }

  dataToJSON() {

  }

  postData() {

  }
}
