import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListchequeComponent } from './listcheque.component';

describe('ListchequeComponent', () => {
  let component: ListchequeComponent;
  let fixture: ComponentFixture<ListchequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListchequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListchequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
