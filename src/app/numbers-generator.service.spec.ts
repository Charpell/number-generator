import { TestBed, inject } from '@angular/core/testing';

import { NumbersGeneratorService } from './numbers-generator.service';

describe('NumbersGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumbersGeneratorService]
    });
  });

  it('should be created', inject([NumbersGeneratorService], (service: NumbersGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
