import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListproveedorComponent } from './listproveedor.component';

describe('ListproveedorComponent', () => {
  let component: ListproveedorComponent;
  let fixture: ComponentFixture<ListproveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListproveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListproveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
