import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../index/index.component.css', './login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";

  constructor() { }

  ngOnInit(): void {
  }

  onLogin() {

  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
  }
}
