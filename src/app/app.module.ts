import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileDropModule } from 'ngx-file-drop';
import { ButtonsModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { DisplayResultComponent } from './display-result/display-result.component';
import { MowerHeaderComponent } from './mower-header/mower-header.component';
import {SendService} from './utilities/senddata';
import {MowerLogic} from './utilities/mowerlogic';
import { TypeDecorator } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    DisplayResultComponent,
    MowerHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FileDropModule,
    ButtonsModule
  ],
  providers: [SendService, MowerLogic ],
  bootstrap: [AppComponent]
})
export class AppModule { }
