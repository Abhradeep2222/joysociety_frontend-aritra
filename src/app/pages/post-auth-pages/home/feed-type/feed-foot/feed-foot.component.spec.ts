import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedFootComponent } from './feed-foot.component';

describe('FeedFootComponent', () => {
  let component: FeedFootComponent;
  let fixture: ComponentFixture<FeedFootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedFootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedFootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
