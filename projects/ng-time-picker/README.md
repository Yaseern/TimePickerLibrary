<div align="center">
  <h1>ngy-time-picker</h1>
  <br>
  <h4>A simple time picker for Angular</h4>
</div>

# TimePickerLibrary

DEMO: https://yaseern.github.io/awesomeAngular/time

## Dependencies

- moment js must installed 
```bash
npm install moment
```

Latest version available for all version of Angular

## Install

```bash
npm install ngy-time-picker
```

## Setup

**step 1:** add NgTimePickerModule to app NgModule or import to the shared module

```typescript
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgTimePickerModule } from 'ngy-time-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgTimePickerModule// NgTimePickerModule added
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent]
})
class AppModule {}
```

```html
<ng-time-picker [(ngModel)]="example1" (ngModelChange)="onChangeDoSomething1()"></ng-time-picker>

<ng-time-picker [(ngModel)]="example2" (ngModelChange)="onChangeDoSomething2()" [isDisabled]="true"></ng-time-picker> <!--08:45-->

<ng-time-picker [(ngModel)]="example3" [timeRange]="08:45"></ng-time-picker> 

<ng-time-picker [(ngModel)]="example4" [timeRange]="example2" [defaultDuration]="0.5"></ng-time-picker> <!-- default time will be set when change the example2 : 09:15-->
```

## Options

| Option            | Type                           | Default           | Description                                                                                                                                     |
| ----------------- | ------------------------------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| ngModel         | input                          |                   | which binds select stores the user value in a variable                                                                                           |
| ngModelChange   | event                          |                   | On Change event when select the option                                                                                                           |
| format        | string                        | HH:mm             | Define the display time format (Ex: HH:mm, hh:mm:A)                                                                                                 |                                                                                                                                          | timeRange        | input                        |              | Define the hour values you want and disable the rest (Ex: disable before 07:30 then the value should apply as timeRange="07:30") 
| isDisabled        | boolean                        | false             | If field disabled then this should set true
| defaultDuration        | number                        | 0             | Define for default range between two times (Ex: If start time set as 08:45 then end time should auto reflect after specified duration, the duration is 30 minutes, end time will be 09:15) - number should be in hour format                                                                                                      |                                                                                   

## License

MIT

---

> GitHub [@Yaseern](https://github.com/Yaseern) &nbsp;&middot;&nbsp;