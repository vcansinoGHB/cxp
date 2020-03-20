import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacreedorComponent } from './listacreedor.component';

describe('ListacreedorComponent', () => {
  let component: ListacreedorComponent;
  let fixture: ComponentFixture<ListacreedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListacreedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListacreedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
