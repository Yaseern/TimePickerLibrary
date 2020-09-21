<div align="center">
  <h1>ngy-time-picker</h1>
  <br>
  <h4>A simple time picker for Angular</h4>
</div>

# TimePickerLibrary

DEMO: Update soon

## Dependencies
Latest version available for all version of Angular

## Install

```bash
npm install ngy-time-picker
```

## Setup

**step 1:** add NgYasYearPickerModule to app NgModule or import to the shared module

```typescript
import { CommonModule } from '@angular/common';

import { NgTimePickerModule } from 'ng-time-picker/ng-year-picker';

@NgModule({
  imports: [
    CommonModule,
    NgTimePickerModule// NgTimePickerModule added
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent]
})
class AppModule {}
```

<ng-time-picker [timeModel]="model1" (timeModelChange)="onChangeDoSomething1()"></ng-time-picker>

<ng-time-picker [timeModel]="model2" (timeModelChange)="onChangeDoSomething2()" [isDisabled]="true"></ng-time-picker>


## Options

| Option            | Type                           | Default           | Description                                                                                                                                     |
| ----------------- | ------------------------------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| timeModel         | input                          |                   | which binds select stores the user value in a variable                                                                                           |
| timeModelChange   | event                          |                   | On Change event when select the option                                                                                                           |
| isDisabled        | boolean                        | false             | If field disabled then this should set true                                                                                                     |                                                                                         

## License

MIT

---

> GitHub [@Yaseern](https://github.com/Yaseern) &nbsp;&middot;&nbsp;
