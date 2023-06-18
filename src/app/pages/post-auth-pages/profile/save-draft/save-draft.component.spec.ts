import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDraftComponent } from './save-draft.component';

describe('SaveDraftComponent', () => {
  let component: SaveDraftComponent;
  let fixture: ComponentFixture<SaveDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveDraftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
