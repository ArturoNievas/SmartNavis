import { TestBed } from '@angular/core/testing';

import { PermutaService } from './permuta.service';

describe('PermutaService', () => {
  let service: PermutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
