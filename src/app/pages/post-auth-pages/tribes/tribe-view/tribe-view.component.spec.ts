import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TribeViewComponent } from './tribe-view.component';

describe('TribeViewComponent', () => {
  let component: TribeViewComponent;
  let fixture: ComponentFixture<TribeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TribeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TribeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
