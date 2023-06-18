import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopOrderComponent } from './workshop-order.component';

describe('WorkshopOrderComponent', () => {
  let component: WorkshopOrderComponent;
  let fixture: ComponentFixture<WorkshopOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
