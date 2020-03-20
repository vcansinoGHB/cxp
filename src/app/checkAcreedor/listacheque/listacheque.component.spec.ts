import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListachequeComponent } from './listacheque.component';

describe('ListachequeComponent', () => {
  let component: ListachequeComponent;
  let fixture: ComponentFixture<ListachequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListachequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListachequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
