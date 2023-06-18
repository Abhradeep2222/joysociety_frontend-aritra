import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotColdPollComponent } from './hot-cold-poll.component';

describe('HotColdPollComponent', () => {
  let component: HotColdPollComponent;
  let fixture: ComponentFixture<HotColdPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotColdPollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotColdPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
