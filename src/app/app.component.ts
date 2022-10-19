import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'to-do-list';

  constructor(@Inject(DOCUMENT) private document: Document){}

  updateDir(dir: 'ltr' | 'rtl'){
    const htmlElem = this.document.querySelector('html');
    if(!htmlElem) return;
    htmlElem.dir = dir;
  }
}
