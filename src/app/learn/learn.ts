import { Component } from '@angular/core';
import {AppState} from "../app.service";
import {KouluToolbar} from "../koulu-toolbar/koulu-toolbar";


@Component({
  selector: 'learn',
  directives: [ KouluToolbar ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './learn.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
<div id="learn-container">  
  
  <div class="learn-container-content">
    <koulu-toolbar title="Start learning"></koulu-toolbar>
  </div>
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
