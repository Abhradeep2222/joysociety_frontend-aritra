import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreauthLayoutComponent } from './preauth-layout.component';

describe('PreauthLayoutComponent', () => {
  let component: PreauthLayoutComponent;
  let fixture: ComponentFixture<PreauthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreauthLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreauthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
