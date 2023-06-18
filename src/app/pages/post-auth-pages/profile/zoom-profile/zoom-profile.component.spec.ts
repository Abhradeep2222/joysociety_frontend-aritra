import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomProfileComponent } from './zoom-profile.component';

describe('ZoomProfileComponent', () => {
  let component: ZoomProfileComponent;
  let fixture: ComponentFixture<ZoomProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoomProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
