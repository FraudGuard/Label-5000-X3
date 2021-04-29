import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Label', url: '/label', icon: 'mail' },
    { title: 'ToReview', url: '/review', icon: 'paper-plane' },
  ];
  constructor() {}
}
