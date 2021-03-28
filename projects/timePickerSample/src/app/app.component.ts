import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Time picker';

  timeModel1 : string;

  timeModel2 : string;
  timeModel3 : string;
}
