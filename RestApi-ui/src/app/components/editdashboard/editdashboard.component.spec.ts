import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdashboardComponent } from './editdashboard.component';

describe('EditdashboardComponent', () => {
  let component: EditdashboardComponent;
  let fixture: ComponentFixture<EditdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
