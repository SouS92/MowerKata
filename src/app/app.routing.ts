import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ListfilesuploadedComponent } from './listfilesuploaded/listfilesuploaded.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';


export const appRoutes: Routes = [
  { path: '', component: UploadfileComponent },
  { path: 'history', component: ListfilesuploadedComponent },
];

