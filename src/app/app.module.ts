import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileDropModule } from 'ngx-file-drop';
import { ButtonsModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { DisplayResultComponent } from './display-result/display-result.component';
import { MowerHeaderComponent } from './mower-header.component';
import {SendDataService} from './service/senddata.service';
import {MowerService} from './service/mower.service';
import { TypeDecorator } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './store';
import { ListfilesuploadedComponent } from './listfilesuploaded/listfilesuploaded.component';
import { appRoutes } from './app.routing';
import { RouterModule } from '@angular/router';
import { UploadfileComponent } from './uploadfile/uploadfile.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayResultComponent,
    MowerHeaderComponent,
    ListfilesuploadedComponent,
    UploadfileComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FileDropModule,
    ButtonsModule,
    NgReduxModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SendDataService, MowerService ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
}
}
