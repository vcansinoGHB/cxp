import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmacreedorchqComponent } from './frmacreedorchq.component';

describe('FrmacreedorchqComponent', () => {
  let component: FrmacreedorchqComponent;
  let fixture: ComponentFixture<FrmacreedorchqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmacreedorchqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmacreedorchqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
