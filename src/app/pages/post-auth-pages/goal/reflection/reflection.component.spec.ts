import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReflectionComponent } from './reflection.component';

describe('ReflectionComponent', () => {
  let component: ReflectionComponent;
  let fixture: ComponentFixture<ReflectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReflectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReflectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
