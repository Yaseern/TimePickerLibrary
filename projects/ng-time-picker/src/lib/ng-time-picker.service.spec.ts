import { TestBed } from '@angular/core/testing';

import { NgTimePickerService } from './ng-time-picker.service';

describe('NgTimePickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgTimePickerService = TestBed.get(NgTimePickerService);
    expect(service).toBeTruthy();
  });
});
