import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxObjectDiffModule} from "../../../ngx-object-diff/src/lib/ngx-object-diff.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxObjectDiffModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
