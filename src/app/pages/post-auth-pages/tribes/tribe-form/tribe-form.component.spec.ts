import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TribeFormComponent } from './tribe-form.component';

describe('TribeFormComponent', () => {
  let component: TribeFormComponent;
  let fixture: ComponentFixture<TribeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TribeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TribeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
