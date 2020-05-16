import { NgModule } from '@angular/core';
import { NgxObjectDiffComponent } from './ngx-object-diff.component';
import {NgxObjectDiffService} from "./ngx-object-diff.service";


@NgModule({
  declarations: [NgxObjectDiffComponent],
  imports: [],
  providers:[NgxObjectDiffService],
  exports: [NgxObjectDiffComponent]
})
export class NgxObjectDiffModule { }
