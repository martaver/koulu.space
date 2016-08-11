import { Component } from '@angular/core';
import {AppState} from "../app.service";
import {KouluToolbar} from "../koulu-toolbar/koulu-toolbar";
import {Http, Response} from "@angular/http";
import {LazyLoadImageDirective} from "../lazyload-image/lazyload-image.directive";


class Person{
  constructor(public id: number, public code: string, public name: string, public email: string, public topic: string) {

  }
}

@Component({
  selector: 'learn',
  directives: [ KouluToolbar, LazyLoadImageDirective ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './learn.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
<div id="learn-container">  
  <koulu-toolbar title="Start learning"></koulu-toolbar>
  
  <div *ngFor="let person of people" class="person-container">  
    <div class="person-container-left">
      <img [lazyLoad]="imgSrc(person)">
    </div>
    <div class="person-container-right">
      <div class="label">
        <div class="topic">{{person.topic}}</div>
        <div class="name">by {{person.name}}</div>
      </div>
    </div>    
  </div>
</div>

`
})
export class Learn {

  people: Person[];

  // TypeScript public modifiers
  constructor(public appState: AppState, private http: Http) {

    // WebWorkerService.workerUrl =
  }

  ngOnInit() {

    this.http.get('/api/person')
      .map((res) => {
        this.people = res.json();
      })
      .catch((err) => {
        console.log(err);
      }).subscribe();
  }

  imgSrc(person: Person) {

    return '/api/selfies/'+person.id.toString()+'.png';
  }

}
