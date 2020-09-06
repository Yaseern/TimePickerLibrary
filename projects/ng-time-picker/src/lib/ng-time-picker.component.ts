import { Component, OnInit, HostListener, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import { isValidTimeFormat, getZeroFillNumbers, getNUntilNumbers } from '../common/utils';

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
  styles: [`.time-picker {
    .dropdown {
      position: absolute;
      z-index: 5;
      background: #fff;
      -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .15);
      box-shadow: 0 1px 6px rgba(0, 0, 0, .15);
      width: 10em;
      height: 10em;
      font-weight: 400;
  
      .select-list {
        width: 10em;
        height: 10em;
        overflow: hidden;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-flow: row nowrap;
        flex-flow: row nowrap;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }
  
      ul {
        padding: 0;
        margin: 0;
        list-style: none;
        outline: 0;
        -webkit-box-flex: 1;
        -ms-flex: 1 1 0.00001px;
        flex: 1 1 0.00001px;
        overflow-x: hidden;
        overflow-y: auto;
  
        :is(.hint) {
          pointer-events: none;
        }
  
        li {
          list-style: none;
          text-align: center;
          padding: .3em 0;
          color: #161616;
  
          &.active:not(.hint) {
            background: rgba(0, 0, 0, .12);
            color: #3f51b5;
          }
  
          &:hover:not(.active):not(.hint) {
            background: rgba(0, 0, 0, .04);
            cursor: pointer;
          }
        }
      }
    }
  
    .controls {
      position: absolute;
      z-index: 3;
      -webkit-box-orient: horizontal;
      -ms-flex-flow: row nowrap;
      flex-flow: row nowrap;
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      justify-content: flex-end;
      -webkit-box-align: stretch;
      -ms-flex-align: stretch;
      align-items: stretch;
      pointer-events: none;
      bottom: 5px;
      right: -10px;
  
      * {
        cursor: pointer;
        width: auto;
        -webkit-box-orient: vertical;
        -ms-flex-flow: column nowrap;
        flex-flow: column nowrap;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 .35em;
        color: #d2d2d2;
        line-height: 100%;
        font-style: normal;
        pointer-events: auto;
        -webkit-transition: color .2s, opacity .2s;
        transition: color .2s, opacity .2s;
  
        &:hover {
          color: #797979
        }
      }
  
      :active,
      :focus {
        outline: 0
      }
  
      .char {
        font-size: 1.1em;
        line-height: 100%;
        -webkit-margin-before: -.15em;
      }
    }
  
  }`]
})
export class NgTimePickerComponent implements OnInit {

  @Input() timeModel: string
  @Input() isDisabled: boolean = false;

  @Output() save: EventEmitter<string> = new EventEmitter<string>();

  hours: number[] | string[];
  minutes: number[] | string[];

  selectedHour: number
  selectedMinute: number
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

  ngOnInit(): void { }

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
  }

  setTime() {
    this.timeModel = `${this.selectedHour ? this.selectedHour : 0}:${this.selectedMinute ? this.selectedMinute : 0}`

    if (isValidTimeFormat(this.timeModel) || this.timeModel == null) {
      this.save.emit(this.timeModel)
    }
  }
}