import { TestBed } from '@angular/core/testing';

import { PuertoService } from './puerto.service';

describe('PuertoService', () => {
  let service: PuertoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuertoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
