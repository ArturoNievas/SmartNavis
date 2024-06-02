import { TestBed } from '@angular/core/testing';

import { AmarraService } from './amarra.service';

describe('AmarraService', () => {
  let service: AmarraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmarraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
