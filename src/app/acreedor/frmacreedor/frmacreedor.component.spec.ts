import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmacreedorComponent } from './frmacreedor.component';

describe('FrmacreedorComponent', () => {
  let component: FrmacreedorComponent;
  let fixture: ComponentFixture<FrmacreedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmacreedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmacreedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
