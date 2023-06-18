import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCommunicationComponent } from './member-communication.component';

describe('MemberCommunicationComponent', () => {
  let component: MemberCommunicationComponent;
  let fixture: ComponentFixture<MemberCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberCommunicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
