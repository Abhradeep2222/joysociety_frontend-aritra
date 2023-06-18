import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedHeadComponent } from './feed-head.component';

describe('FeedHeadComponent', () => {
  let component: FeedHeadComponent;
  let fixture: ComponentFixture<FeedHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
