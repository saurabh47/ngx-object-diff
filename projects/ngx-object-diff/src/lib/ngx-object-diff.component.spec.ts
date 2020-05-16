import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxObjectDiffComponent } from './ngx-object-diff.component';

describe('NgxObjectDiffComponent', () => {
  let component: NgxObjectDiffComponent;
  let fixture: ComponentFixture<NgxObjectDiffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxObjectDiffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxObjectDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
