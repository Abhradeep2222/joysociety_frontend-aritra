import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruIntroductionComponent } from './tru-introduction.component';

describe('TruIntroductionComponent', () => {
  let component: TruIntroductionComponent;
  let fixture: ComponentFixture<TruIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruIntroductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
