import {Component, OnInit} from '@angular/core';
import {NgxObjectDiffService} from "ngx-object-diff";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ngx-object-diff-showcase';
  object1 = {
    a: {
      b: 1,
      c: [1, 2]
    },
    "2b": {
      foo: 'bar'
    }
  };
  object1View;
  object2 ={
    a: {
      b: 2,
      c: [1, 2, 3]
    },
    x: 1
  }
  object2View;
  diffView;

  constructor(private objectDiff: NgxObjectDiffService) {
  }

  ngOnInit(): void {
    this.object1View = this.objectDiff.objToJsonView(this.object1);
    this.object2View = this.objectDiff.objToJsonView(this.object2);
    let diff = this.objectDiff.diff(this.object1,this.object2);
    this.diffView = this.objectDiff.toJsonView(diff)
  }
}
