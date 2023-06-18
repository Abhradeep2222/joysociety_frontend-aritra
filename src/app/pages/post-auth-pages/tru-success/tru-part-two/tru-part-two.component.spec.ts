import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruPartTwoComponent } from './tru-part-two.component';

describe('TruPartTwoComponent', () => {
  let component: TruPartTwoComponent;
  let fixture: ComponentFixture<TruPartTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruPartTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruPartTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
