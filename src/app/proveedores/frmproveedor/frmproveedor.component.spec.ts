import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmproveedorComponent } from './frmproveedor.component';

describe('FrmproveedorComponent', () => {
  let component: FrmproveedorComponent;
  let fixture: ComponentFixture<FrmproveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmproveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmproveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
