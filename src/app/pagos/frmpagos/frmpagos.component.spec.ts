import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmpagosComponent } from './frmpagos.component';

describe('FrmpagosComponent', () => {
  let component: FrmpagosComponent;
  let fixture: ComponentFixture<FrmpagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmpagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmpagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
