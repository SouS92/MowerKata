import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileDropModule } from 'ngx-file-drop';
import { ButtonsModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { DisplayResultComponent } from './display-result/display-result.component';
import { MowerHeaderComponent } from './mower-header/mower-header.component';
import {sendService} from './utilities/SendData'

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
  providers: [sendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
