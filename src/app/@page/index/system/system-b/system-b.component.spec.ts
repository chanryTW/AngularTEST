import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemBComponent } from './system-b.component';

describe('SystemBComponent', () => {
  let component: SystemBComponent;
  let fixture: ComponentFixture<SystemBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
