import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivestreamRecordingComponent } from './livestream-recording.component';

describe('LivestreamRecordingComponent', () => {
  let component: LivestreamRecordingComponent;
  let fixture: ComponentFixture<LivestreamRecordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivestreamRecordingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivestreamRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
