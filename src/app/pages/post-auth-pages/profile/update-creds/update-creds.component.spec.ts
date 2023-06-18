import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCredsComponent } from './update-creds.component';

describe('UpdateCredsComponent', () => {
  let component: UpdateCredsComponent;
  let fixture: ComponentFixture<UpdateCredsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCredsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCredsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
