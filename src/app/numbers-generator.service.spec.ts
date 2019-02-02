import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NumbersGeneratorService } from './numbers-generator.service';

describe('NumbersGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NumbersGeneratorService]
    });
  });

  it('should be created', inject([NumbersGeneratorService], (service: NumbersGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
