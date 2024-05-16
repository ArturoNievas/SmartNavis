import { TestBed } from '@angular/core/testing';

import { EmbarcacionService } from './embarcacion.service';

describe('EmbarcacionService', () => {
  let service: EmbarcacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmbarcacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
