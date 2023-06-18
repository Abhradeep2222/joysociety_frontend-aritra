import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionChatComponent } from './section-chat.component';

describe('SectionChatComponent', () => {
  let component: SectionChatComponent;
  let fixture: ComponentFixture<SectionChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
