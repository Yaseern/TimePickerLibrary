import { Component, ElementRef, Input, ChangeDetectionStrategy, forwardRef, OnChanges, HostBinding, ChangeDetectorRef, SimpleChanges, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isValidTimeFormat, getZeroFillNumbers, getNUntilNumbers, fillZeroAsPrefixForNumber, addTime, showTimeFormat } from '../common/utils';
import { Time12HrFormatOptions, TimeFormat } from './time-picker-options';

@Component({
  selector: 'ng-time-picker',
  template: `
  <div class="time-picker">
    <div class="field-group">
      <div>
        <input type="text" [value]="value" [placeholder]="isDisabled ? '' : format" [id]="id" 
        (click)="isClicked=true" readonly [disabled]="isDisabled">
        <div class="controls" (click)="clearTime()">
          <span class="clear-btn"><span class="char">×</span></span>
        </div>
      </div>
    </div>
    
    <div class="dropdown" *ngIf="isClicked">
      <div class="select-list">
        <ul class="hours">
          <li class="hint">{{timeFormatLabel[0]}}</li>
          <li *ngFor="let item of hours;let i = index" [attr.data-index]="i" [class.active]="selectedHour == item"
            [attr.disabled]="isDisabledHour(item)" (click)="setHour(item)">{{item}}</li>
        </ul>

        <ul class="minutes">
          <li class="hint">{{timeFormatLabel[1]}}</li>
          <li *ngFor="let item of minutes;let i = index" [attr.data-index]="i" [class.active]="selectedMinute == item"
            [attr.disabled]="isDisabledMinute(item)" (click)="setMinute(item)">{{item}}</li>
        </ul>

        <ul class="time-format" *ngIf="isTime12HourFormat">
          <li class="hint">{{timeFormatLabel[2]}}</li>
          <li *ngFor="let item of time12Options;let i = index" [attr.data-index]="i"
            [class.active]="selectedAPms == item.value" (click)="setTimeAPms(item.value)">{{item.value}}</li>
        </ul>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./ng-time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgTimePickerComponent),
      multi: true,
    },
  ],
})
export class NgTimePickerComponent implements ControlValueAccessor, OnChanges {


  @HostBinding("attr.id")
  externalId = "";

  @Input()
  set id(value: string) {
    this._ID = value;
    this.externalId = null;
  }

  get id() {
    return this._ID;
  }

  private _ID = "";

  @Input("value") _value = "";
  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.setSelectedTime();
    this.onChange(val);
    this.onTouched();
  }

  @Input() isDisabled: boolean = false;
  @Input() format: TimeFormat = TimeFormat.time24;
  @Input() timeRange: string;
  @Input() defaultDuration = 0;

  hours: number[] | string[];
  minutes: number[] | string[];

  selectedHour: number | string;
  selectedMinute: number | string;
  selectedAPms: string;
  isClicked: boolean = false;
  disableHourRange: number | string;
  disableMinuteRange: number | string;

  constructor(
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) {
    this.initializePicker();
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

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case "timeRange": {
            this.onTimeRangeChange();
          }
        }
      }
    }
  }

  setSelectedTime(): void {
    if (this._value) {
      this._value = showTimeFormat(this._value, this.format);
      const timeArray = this._value.split(":");
      if (timeArray.length > 1) {
        this.selectedHour = fillZeroAsPrefixForNumber(timeArray[0]);
        this.selectedMinute = fillZeroAsPrefixForNumber(timeArray[1]);
      }
    }
  }

  setHour(value): void {
    if (this.isDisabledHour(value)) return;
    this.selectedHour = value;
    this.resetSelectedMinute();
    this.setTime();
  }

  setMinute(value): void {
    if (this.isDisabledMinute(value)) return;
    this.selectedMinute = value;
    this.setTime();
  }

  setTimeAPms(value): void {
    this.selectedAPms = value;
    this.setTime();
  }

  clearTime(): void {
    this.selectedMinute = undefined;
    this.selectedHour = undefined;
    this.selectedAPms = undefined;
    this.value = null;
    this.changeDetector.detectChanges();
  }

  setTime(): void {
    let time = `${this.selectedHour}:${this.selectedMinute}`;
    if (this.isTime12HourFormat) {
      this.selectedAPms = this.selectedAPms
        ? this.selectedAPms
        : this.time12Options[0].value;
      let apms =
        this.format === TimeFormat.time12a
          ? this.selectedAPms.toLowerCase()
          : this.selectedAPms.toUpperCase();
      time = `${time} ${apms}`;
    }

    if (isValidTimeFormat(time, !this.isTime12HourFormat)) {
      this.value = time;
      this.changeDetector.detectChanges();
    }
  }

  onTimeRangeChange(): void {
    if (this.timeRange) {
      let time = this.timeRange.split(":");
      this.disableHourRange = fillZeroAsPrefixForNumber(Number(time[0]));
      this.disableMinuteRange = fillZeroAsPrefixForNumber(Number(time[1]));

      if (this.defaultDuration > 0) {
        this.value = addTime(this.timeRange, this.defaultDuration);
      }
    } else {
      this.disableHourRange = undefined;
      this.disableMinuteRange = undefined;
    }
    this.resetSelectedHour();
  }

  initializePicker(): void {
    this.format =
      this.isTime12HourFormat || this.format === TimeFormat.time24
        ? this.format
        : TimeFormat.time24;

    this.hours = getZeroFillNumbers(this.getDisplayHours());
    this.minutes = getZeroFillNumbers(getNUntilNumbers(60));
  }

  getDisplayHours(): number[] {
    let formatValue = this.isTime12HourFormat ? 12 : 24;
    let hours = getNUntilNumbers(formatValue);
    let formattedHours = this.isTime12HourFormat
      ? hours.map((hr) => {
        return hr === 0 ? formatValue : hr;
      })
      : hours;
    return formattedHours;
  }

  isDisabledHour(hour): boolean {
    return this.disableHourRange > hour;
  }

  isDisabledMinute(minute): boolean {
    return (
      this.disableHourRange >= this.selectedHour &&
      this.disableMinuteRange > minute
    );
  }

  resetSelectedHour(): void {
    if (this.disableHourRange && this.selectedHour < this.disableHourRange) {
      this.selectedHour = this.disableHourRange;
      this.resetSelectedMinute();
      this.setTime();
    }
  }

  resetSelectedMinute(): void {
    if (
      this.timeRange &&
      this.disableHourRange <= this.selectedHour &&
      this.disableMinuteRange > this.selectedMinute
    ) {
      this.selectedMinute = this.disableMinuteRange;
    }
  }

  registerOnChange(fn): void {
    this.onChange = fn;
  }

  writeValue(value): void {
    if (value) {
      this.value = value;
      this.changeDetector.detectChanges();
    }
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  get isTime12HourFormat(): boolean {
    return (
      this.format === TimeFormat.time12a || this.format === TimeFormat.time12A
    );
  }

  get time12Options() {
    return Time12HrFormatOptions.filter((t) => t.format === this.format);
  }

  get timeFormatLabel(): string[] {
    if (!this.format) {
      this.format = TimeFormat.time24;
    }
    return this.format.split(":");
  }
}