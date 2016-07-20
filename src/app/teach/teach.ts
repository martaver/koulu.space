import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'teach',

  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './teach.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
<div id="main-content">
  <img class="main-content-bg" src="../../assets/img/bm-night-purple-head.jpg">
</div> 

`
})
export class Teach {

  // TypeScript public modifiers
  constructor(public router: Router) {

  }

  ngOnInit() {

  }

}
