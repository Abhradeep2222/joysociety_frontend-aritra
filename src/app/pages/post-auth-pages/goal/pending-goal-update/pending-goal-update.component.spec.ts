import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingGoalUpdateComponent } from './pending-goal-update.component';

describe('PendingGoalUpdateComponent', () => {
  let component: PendingGoalUpdateComponent;
  let fixture: ComponentFixture<PendingGoalUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingGoalUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingGoalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
