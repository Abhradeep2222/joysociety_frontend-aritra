import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruPartOneReportComponent } from './tru-part-one-report.component';

describe('TruPartOneReportComponent', () => {
  let component: TruPartOneReportComponent;
  let fixture: ComponentFixture<TruPartOneReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruPartOneReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruPartOneReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
