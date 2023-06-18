import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruPartOneComponent } from './tru-part-one.component';

describe('TruPartOneComponent', () => {
  let component: TruPartOneComponent;
  let fixture: ComponentFixture<TruPartOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruPartOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruPartOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
