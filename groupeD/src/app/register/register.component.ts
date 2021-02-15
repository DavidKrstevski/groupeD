import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  myUsername = "";
  password = "";
  confirmPassword = "";

  constructor() { }

  ngOnInit(): void {
  }

  onRegister(username: string, password: string, confirmPassword: string) {
    this.myUsername = username;
    this.password = password;
    this.confirmPassword = confirmPassword;

    this.dataToJSON();
    this.postData();
  }

  dataToJSON() {

  }

  postData() {

  }
}
