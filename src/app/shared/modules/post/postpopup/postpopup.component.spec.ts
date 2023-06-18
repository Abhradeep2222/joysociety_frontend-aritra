import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostpopupComponent } from './postpopup.component';

describe('PostpopupComponent', () => {
  let component: PostpopupComponent;
  let fixture: ComponentFixture<PostpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
