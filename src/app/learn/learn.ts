import { Component } from '@angular/core';
import {AppState} from "../app.service";


@Component({
  selector: 'learn',

  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './learn.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
<div id="main-content">
  <img class="main-content-bg" src="../../assets/img/bm-sunset-silhouettes.jpg">
</div>

`
})
export class Learn {

  // TypeScript public modifiers
  constructor(public appState: AppState) {

  }

  ngOnInit() {

  }


}
