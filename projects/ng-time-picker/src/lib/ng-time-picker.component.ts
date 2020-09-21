import { Component, OnInit, HostListener, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import { isValidTimeFormat, getZeroFillNumbers, getNUntilNumbers, fillZeroAsPrefixForNumber } from '../common/utils';

@Component({
  selector: 'ng-time-picker',
  template: `
  <div class="time-picker">
    <div class="field-group">
      <div>
        <input type="text" [(ngModel)]="timeModel" (click)="isClicked=true" readonly [disabled]="isDisabled">
        <div class="controls" (click)="clearTime()">
          <span class="clear-btn"><span class="char">×</span></span>
        </div>
      </div>
    </div>
    
    <div class="dropdown" *ngIf="isClicked">
      <div class="select-list">
        <ul class="hours">
          <li class="hint">HH</li>
          <li *ngFor="let item of hours;let i = index" [attr.data-index]="i" [class.active]="selectedHour == item"
            (click)="setHour(item)">{{item}}</li>
        </ul>

        <ul class="minutes">
          <li class="hint">mm</li>
          <li *ngFor="let item of minutes;let i = index" [attr.data-index]="i" [class.active]="selectedMinute == item"
            (click)="setMinute(item)">{{item}}</li>
        </ul>

      </div>
    </div>
  </div>
  `,
  styleUrls: ['./ng-time-picker.component.scss']
})
export class NgTimePickerComponent implements OnInit {
  
  @Input() isDisabled: boolean = false;
  @Input() timeModel: string
  @Output() timeModelChange: EventEmitter<string> = new EventEmitter<string>();

  hours: number[] | string[];
  minutes: number[] | string[];

  selectedHour: number | string;
  selectedMinute: number | string;
  isClicked: boolean = false

  constructor(private elementRef: ElementRef) {
    this.hours = getZeroFillNumbers(getNUntilNumbers(24));
    this.minutes = getZeroFillNumbers(getNUntilNumbers(60));
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if (!this.elementRef.nativeElement.contains(targetElement)) {
      this.isClicked = false
    }
  }
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.isClicked = false
  }

  ngOnInit(): void {
    if (this.timeModel) {      
      const timeArray = this.timeModel.split(':');
      if (timeArray.length > 1) {
        this.selectedHour = fillZeroAsPrefixForNumber(timeArray[0]);
        this.selectedMinute = fillZeroAsPrefixForNumber(timeArray[1]);
      }
    }
  }

  setHour(value) {
    this.selectedHour = value;
    this.setTime();
  }

  setMinute(value) {
    this.selectedMinute = value;
    this.setTime();
  }

  clearTime() {
    this.selectedMinute = undefined;
    this.selectedHour = undefined;
    this.timeModel = null;
    this.timeModelChange.emit(this.timeModel)
  }

  setTime() {
    this.timeModel = `${this.selectedHour ? this.selectedHour : '00'}:${this.selectedMinute ? this.selectedMinute : '00'}`

    if (isValidTimeFormat(this.timeModel)) {
      this.timeModelChange.emit(this.timeModel)
    }
  }
}