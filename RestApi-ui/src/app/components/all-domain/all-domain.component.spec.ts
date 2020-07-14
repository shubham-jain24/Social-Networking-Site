import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDomainComponent } from './all-domain.component';

describe('AllDomainComponent', () => {
  let component: AllDomainComponent;
  let fixture: ComponentFixture<AllDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
