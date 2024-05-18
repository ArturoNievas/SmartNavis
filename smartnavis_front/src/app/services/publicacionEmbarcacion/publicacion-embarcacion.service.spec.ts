import { TestBed } from '@angular/core/testing';

import { PublicacionEmbarcacionService } from './publicacion-embarcacion.service';

describe('PublicacionEmbarcacionService', () => {
  let service: PublicacionEmbarcacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicacionEmbarcacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
