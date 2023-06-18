import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkSettingComponent } from './network-setting.component';

describe('NetworkSettingComponent', () => {
  let component: NetworkSettingComponent;
  let fixture: ComponentFixture<NetworkSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
