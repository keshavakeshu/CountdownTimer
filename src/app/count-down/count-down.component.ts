import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit {

  display: any = '00:00';
  username: any = 0;
  laps: any = [];
  previouslaps: any =  [];
  ms: number = 1000;
  milliseconds: any = '00';
  counter: any;
  running: boolean = false;
  startText = 'Start';
  timerRef: any;
  @Input() start: boolean = false;
  @Input() showTimerControls: boolean = true;


  @HostListener('document:keyup.Space', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // console.log('pressed space key');
    this.lapTimeSplit();
  }

  clickme() {
    console.log('it does nothing',this.username);
    this.timer(this.username);
  }
  constructor() {
    
  }

  ngOnInit(): void {
    this.display = '00:00'
    console.log(localStorage.getItem('dataSource'));
    this.username = this.display = localStorage.getItem('dataSource');
    this.previouslaps.push(localStorage.getItem('prvlapses'));
  }
  
  timer(minute:any) {
    console.log('after stop')
    this.running = !this.running;
      if(this.running) {
          this.startText = 'Stop'; 
        let seconds: number = minute * 60;
        let textSec: any = '0';
        let statSec: number = 60;
        const prefix = minute < 10 ? '0' : '';

        this.timerRef = setInterval(() => {
          seconds--;
          if (statSec != 0) statSec--;
          else statSec = this.username;

          if (statSec < 10) {
            textSec = '0' + statSec;
          } else textSec = statSec;
          
          this.display = `${Math.floor(seconds / 60)}:${textSec}`;
          localStorage.setItem('dataSource', this.display); 
          
              if (seconds == 0) {
                console.log('finished');
              }
        }, 1000);
      }
    else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
      this.running = false;
      console.log(this.display);
    }
  }
  lapTimeSplit() {
    let lapTime = this.display;
    this.laps.push(lapTime);
    localStorage.setItem("prvlapses", JSON.stringify(this.laps));
  }
  clearTimer() {
    this.running = false;
    this.startText = 'Start';
    this.counter = undefined;
    this.username = 0;
    this.laps = [];
    clearInterval(this.timerRef);
    console.log(this.timerRef);
    localStorage.removeItem('dataSource');
    localStorage.removeItem('prvlapses');
    this.display ='00:00';
    this.previouslaps = [];
  }
  ngOnDestroy() {
    clearInterval(this.timerRef);
  }
}
