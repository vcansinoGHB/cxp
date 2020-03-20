import { TestBed } from '@angular/core/testing';

import { ApiconexionService } from './apiconexion.service';

describe('ApiconexionService', () => {
  let service: ApiconexionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiconexionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
