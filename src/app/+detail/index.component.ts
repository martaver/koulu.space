import { Component } from '@angular/core';

@Component({
  selector: 'index',
  styles: [`
    md-card{
      margin: 25px;
    }
  `],
  template: `
    <router-outlet></router-outlet>    
  `
})
export class Index {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Index` component');
  }
}
