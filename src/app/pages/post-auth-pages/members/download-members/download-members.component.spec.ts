import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadMembersComponent } from './download-members.component';

describe('DownloadMembersComponent', () => {
  let component: DownloadMembersComponent;
  let fixture: ComponentFixture<DownloadMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
