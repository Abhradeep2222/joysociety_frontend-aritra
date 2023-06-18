import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruPartTwoReportComponent } from './tru-part-two-report.component';

describe('TruPartTwoReportComponent', () => {
  let component: TruPartTwoReportComponent;
  let fixture: ComponentFixture<TruPartTwoReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruPartTwoReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruPartTwoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
