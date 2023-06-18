import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoicePollComponent } from './multiple-choice-poll.component';

describe('MultipleChoicePollComponent', () => {
  let component: MultipleChoicePollComponent;
  let fixture: ComponentFixture<MultipleChoicePollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleChoicePollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleChoicePollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
