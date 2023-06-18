import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInviteComponent } from './event-invite.component';

describe('EventInviteComponent', () => {
  let component: EventInviteComponent;
  let fixture: ComponentFixture<EventInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventInviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
