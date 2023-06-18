import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeDetailComponent } from './like-detail.component';

describe('LikeDetailComponent', () => {
  let component: LikeDetailComponent;
  let fixture: ComponentFixture<LikeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
