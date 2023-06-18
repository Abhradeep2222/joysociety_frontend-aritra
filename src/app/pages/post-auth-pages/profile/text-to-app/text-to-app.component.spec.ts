import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextToAppComponent } from './text-to-app.component';

describe('TextToAppComponent', () => {
  let component: TextToAppComponent;
  let fixture: ComponentFixture<TextToAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextToAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextToAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
