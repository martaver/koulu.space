/**
 * Created by sebas_000 on 22/07/2016.
 */

import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'koulu-toolbar',
  styleUrls: ['./koulu-toolbar.style.css'],
  template: `
  <div class="koulu-toolbar-container">
    <div class="koulu-toolbar">
        <div class="koulu-toolbar-logo" (click)="homeClicked()">
          <img src="../../assets/img/koulu-logo.png">      
        </div>
        <div class="koulu-toolbar-content">{{title}}</div>
        
    </div>
  </div>
`
})
export class KouluToolbar {

  @Input() title: string;

  constructor( public router: Router) {

  }

  ngOnInit() {

  }

  homeClicked() {

    this.router.navigate(['/']);
  }
}
