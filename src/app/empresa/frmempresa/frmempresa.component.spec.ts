import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmempresaComponent } from './frmempresa.component';

describe('FrmempresaComponent', () => {
  let component: FrmempresaComponent;
  let fixture: ComponentFixture<FrmempresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
