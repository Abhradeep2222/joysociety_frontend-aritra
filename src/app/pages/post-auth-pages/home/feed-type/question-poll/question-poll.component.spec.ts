import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPollComponent } from './question-poll.component';

describe('QuestionPollComponent', () => {
  let component: QuestionPollComponent;
  let fixture: ComponentFixture<QuestionPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionPollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
