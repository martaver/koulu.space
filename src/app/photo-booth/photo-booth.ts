/**
 * Created by sebas_000 on 20/07/2016.
 */

import {Component, ElementRef, AfterViewInit} from '@angular/core';

interface VideoElement {

  src: string;
  play()
}

interface CanvasElement {

  drawImage(videoElement:VideoElement, number:number, number2:number):void;

  toDataURL(s2:string):string;
  getContext(s2:string):any;
}

enum State {
  Recording,
  Confirming
}

@Component({
  selector: 'photo-booth',
  styles: [`
    video {
      width: 100%;
    }
    canvas {
      display: none;
    }
    img {
      width: 100%;
    }
`],
  template: `

<div *ngIf="state == State.Recording" id="recorder">
  <video muted autoplay (click)="snapshot()"></video>
  <canvas></canvas>
  Testing
</div>

<div *ngIf="state == State.Confirming" id="confirmer">
  <img [src]="imgSrc">
</div>

`
})
export class PhotoBooth  implements AfterViewInit {


  public State = State;
  state: State = State.Recording;
  videoElement: VideoElement;
  canvasElement: CanvasElement;
  navigator: any;
  window: any;
  imgSrc: string;
  private ctx;

  constructor(public element: ElementRef) {


  }

  ngAfterViewInit() {

    this.start();
  }

  public start() {

    this.videoElement = this.element.nativeElement.querySelector('#recorder').querySelector('video');

    this.window = window;
    this.navigator = window.navigator;
    this.navigator.getUserMedia = this.navigator.getUserMedia || this.navigator.webkitGetUserMedia || this.navigator.mozGetUserMedia || this.navigator.msGetUserMedia;

    if (this.window.stream) {

      this.videoElement.src = null;
      if(this.window.stream.stop) this.window.stream.stop();
    }

    var constraints = {
      audio: false,
      video: true
    };

    this.navigator.getUserMedia(constraints, (stream) => {

      //Success
      this.window.stream = stream; // make stream available to console
      this.videoElement.src = this.window.URL.createObjectURL(stream);
      this.videoElement.play();

    }, (error) => {

      //Error
      console.log('navigator.getUserMedia error: ', error);

    });
  }


  public snapshot() {

    if(this.window.stream) {

      this.canvasElement = this.element.nativeElement.querySelector('#recorder').querySelector('canvas');
      this.ctx = this.canvasElement.getContext('2d');

      this.ctx.drawImage(this.videoElement, 0, 0);
      // "image/webp" works in Chrome.
      // Other browsers will fall back to image/png.
      this.imgSrc = this.canvasElement.toDataURL('image/webp');

      console.log('imgSrc', this.imgSrc);

      this.state = this.State.Confirming;
    }
  }
}
