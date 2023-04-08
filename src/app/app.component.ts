import { DOCUMENT } from '@angular/common';
import { Component, Inject, NgZone, Renderer2 } from '@angular/core';
import { FibonacciSeriesAction } from './action';
import { fibonacci } from './fibonacci';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-web-worker';
  worker: Worker | undefined;

  inProgress = false;
  start: Date | undefined;
  end: Date | undefined;
  time: number | undefined;
  isCyan = false;

  thread = 'worker';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private zone: NgZone
  ) {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./app.worker', import.meta.url));
      this.worker.onmessage = this.onMessage.bind(this);
    }
    // Just for demo purpose
    this.zone.runOutsideAngular(() => {
      setInterval(this.changeBackground.bind(this), 200);
    });
  }

  onMessage(event: MessageEvent<any>): void {
    this.inProgress = false;
    this.end = new Date();
    this.time = this.end.valueOf() - this.start!.valueOf();
  }

  fibonacciSeries(number: number): void {
    this.inProgress = true;
    this.start = new Date();
    // fallback
    // this.worker
    //   ? this.worker.postMessage(new FibonacciSeriesAction(number))
    //   : this.usingMainThread(number);
    this.thread === 'worker'
      ? this.worker?.postMessage(new FibonacciSeriesAction(number))
      : this.usingMainThread(number);
  }

  usingMainThread(number: number): void {
    const result = `Main: Fibonacci Series for ${number} is : ${fibonacci(
      number
    )}`;
    this.inProgress = false;
    this.end = new Date();
    this.time = this.end.valueOf() - this.start!.valueOf();
  }

  changeBackground(): void {
    // const ran = Math.random() > 0.5 ? 'cyan' : 'orange';
    this.isCyan = !this.isCyan;
    const ran = this.isCyan ? '#00ffff1c' : '#ffa5001c';
    this.renderer.setStyle(this.document.body, 'background-color', ran);
  }
}
