import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
  })
export class DataService {

    private messageSource = new BehaviorSubject<string>("none");
    currentMessage = this.messageSource.asObservable();

    constructor() { }

    changeMessage(username: string) {
        this.messageSource.next(username);
    }
}