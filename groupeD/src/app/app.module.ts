import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './myGroups/myGroups.component';
import { SignedInIndexComponent } from './signedInIndex/signedInIndex.component';
import { GroupComponent } from './group/group.component';

import { JoinGroupComponent } from './joinGroup/join-group.component'
import { CreateGroupComponent } from './createGroup/create-group.component'
import { QuickGroupComponent } from './quickGroup/quick-group.component'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ProfileComponent,
    SignedInIndexComponent,
    GroupComponent,
    JoinGroupComponent,
    CreateGroupComponent,
    QuickGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
