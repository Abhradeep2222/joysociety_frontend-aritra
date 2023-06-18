import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentagePollComponent } from './percentage-poll.component';

describe('PercentagePollComponent', () => {
  let component: PercentagePollComponent;
  let fixture: ComponentFixture<PercentagePollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentagePollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercentagePollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
