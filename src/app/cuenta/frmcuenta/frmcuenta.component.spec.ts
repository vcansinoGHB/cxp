import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmcuentaComponent } from './frmcuenta.component';

describe('FrmcuentaComponent', () => {
  let component: FrmcuentaComponent;
  let fixture: ComponentFixture<FrmcuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmcuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmcuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
