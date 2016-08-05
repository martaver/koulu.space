import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {PhotoBooth} from "../photo-booth/photo-booth";
import {KouluToolbar} from "../koulu-toolbar/koulu-toolbar";

@Component({
  selector: 'teach',
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './teach.style.css' ],
  directives: [PhotoBooth, KouluToolbar],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
<div id="teach-container">

  <koulu-toolbar title="Start teaching"></koulu-toolbar>  
  
  <div class="teach-container-content">
    <h2>Cool!</h2>
    <p>Give us a smile, so that people can find you!</p>
        <br>
        <br>
        <br>
        <br>
        <br>        
    <photo-booth></photo-booth>  
  </div>
  
  <div class="teach-container-actions">
    
  </div>
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
