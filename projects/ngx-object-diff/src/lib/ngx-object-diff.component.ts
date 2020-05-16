import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-object-diff',
  template: `
    <pre [innerHTML]="obj"></pre>
  `,
  styles: [`
    pre{
      display: block;
      padding: 9.5px;
      margin: 0 0 10px;
      font-size: 13px;
      line-height: 1.428571429;
      color: #333;
      word-break: break-all;
      word-wrap: break-word;
      background-color: #f5f5f5;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    :host >>> .diff {
        display: inline-block;
    }
    :host >>> .diff-level {
        margin-left: 1.6em;
    }
    :host >>> .diff-holder {
        color: #666;
        margin: 0;
    }
    :host >>> .diff-holder span {
        color: #AAA;
    }
    :host >>> del.diff {
        text-decoration: none;
        color: #b30000;
        background: #fadad7;
    }
    :host >>> ins.diff {
        background: #eaf2c2;
        color: #406619;
        text-decoration: none;
    }
    :host >>> del.diff-key {
        border: 1px solid #f8a4a4;
    }
    :host >>> ins.diff-key {
        border: 1px solid #a3ce4c;
        margin-top: -1px;
        position: relative;
    }
    :host >>> ins.diff span {
        color: #AABF40;
    }
    :host >>> del.diff span {
        color: #EE8177;
    }
  `]
})
export class NgxObjectDiffComponent {
  @Input() public obj: any;
}
