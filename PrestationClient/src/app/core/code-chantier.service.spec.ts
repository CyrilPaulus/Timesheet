import { TestBed } from '@angular/core/testing';

import { CodeChantierService } from './code-chantier.service';

describe('CodeChantierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodeChantierService = TestBed.get(CodeChantierService);
    expect(service).toBeTruthy();
  });
});
