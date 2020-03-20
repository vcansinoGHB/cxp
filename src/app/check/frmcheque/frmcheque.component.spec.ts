import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmchequeComponent } from './frmcheque.component';

describe('FrmchequeComponent', () => {
  let component: FrmchequeComponent;
  let fixture: ComponentFixture<FrmchequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmchequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmchequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
