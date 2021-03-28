import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgTimePickerComponent } from './ng-time-picker.component';
import { NgTimePickerService } from './ng-time-picker.service';
import { ScrollToDirective } from './ng-time-picker.directive';


@NgModule({
  declarations: [
    NgTimePickerComponent,
    ScrollToDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [NgTimePickerComponent],
  providers: [NgTimePickerService]
})
export class NgTimePickerModule { }