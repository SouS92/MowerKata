import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfilesuploadedComponent } from './listfilesuploaded.component';

describe('ListfilesuploadedComponent', () => {
  let component: ListfilesuploadedComponent;
  let fixture: ComponentFixture<ListfilesuploadedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListfilesuploadedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListfilesuploadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
