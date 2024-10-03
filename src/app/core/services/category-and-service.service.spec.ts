import { TestBed } from '@angular/core/testing';

import { CategoryAndMaterialService } from './category-and-service.service';

describe('CategoryAndMaterialService', () => {
  let service: CategoryAndMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryAndMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
