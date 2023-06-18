import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollpopupComponent } from './pollpopup.component';

describe('PollpopupComponent', () => {
  let component: PollpopupComponent;
  let fixture: ComponentFixture<PollpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
