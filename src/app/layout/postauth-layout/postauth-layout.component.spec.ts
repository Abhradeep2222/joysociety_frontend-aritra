import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostauthLayoutComponent } from './postauth-layout.component';

describe('PostauthLayoutComponent', () => {
  let component: PostauthLayoutComponent;
  let fixture: ComponentFixture<PostauthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostauthLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostauthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
