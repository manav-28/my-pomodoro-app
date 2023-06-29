import { Component } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent {
  breakLength: number = 5;
  sessionLength: number = 25;
  sessionType: string = 'Session';
  timeLeft: any = this.sessionLength;
  fillHeight = '0%';
  sessionString: string = 'Session';
  breakString: string = 'Break!';
  currentLength: number = 0;
  fillColor: any;
  secs: number = 60 * this.timeLeft;
  timerRunning = false;
  originalTime = this.sessionLength;
  interval: any;

  addTime(value: string) {
    if (value === 'Break!') {
      this.breakLength += 1;
      if (this.sessionType === value) this.timeLeft = this.breakLength;
      this.originalTime = this.breakLength;
      this.secs = 60 * this.breakLength;
    } else if (value === 'Session') {
      this.sessionLength += 1;
      if (this.sessionType === value) this.timeLeft = this.sessionLength;
      this.originalTime = this.sessionLength;
      this.secs = 60 * this.sessionLength;
    }
  }

  minusTime(value: string) {
    if (value === 'Break!') {
      this.breakLength -= 1;
      if (this.breakLength < 1) {
        this.breakLength = 1;
      }
      if (this.sessionType === value) this.timeLeft = this.breakLength;
      this.originalTime = this.breakLength;
      this.secs = 60 * this.breakLength;
    } else if (value === 'Session') {
      this.sessionLength -= 1;
      if (this.sessionLength < 1) {
        this.sessionLength = 1;
      }
      if (this.sessionType === value) this.timeLeft = this.sessionLength;
      this.originalTime = this.sessionLength;
      this.secs = 60 * this.sessionLength;
    }
  }

  displayTimeRemaining(d: number) {
    d = Number(d);
    var hours = Math.floor(d / 3600);
    var minutes = Math.floor((d % 3600) / 60);
    var seconds = Math.floor((d % 3600) % 60);
    return (
      (hours > 0 ? hours + ':' + (minutes < 10 ? 0 : '') : '') +
      minutes +
      ':' +
      (seconds < 10 ? 0 : '') +
      seconds
    );
  }

  timerStartStop() {
    if (!this.timerRunning) {
      if (this.sessionType === 'Session') {
        this.currentLength = this.sessionLength;
      } else {
        this.currentLength = this.breakLength;
      }
      this.timerRunning = true;
      this.interval = setInterval(() => {
        this.updateTimer();
      }, 1000);
    } else {
      clearInterval(this.interval);
      this.timerRunning = false;
    }
  }

  updateTimer() {
    this.secs -= 1;
    if (this.secs < 0) {
      this.fillColor = '#333';
      if (this.sessionType === 'Break!') {
        this.sessionType = 'Session';
        this.currentLength = this.sessionLength;
        this.timeLeft = 60 * this.sessionLength;
        this.originalTime = this.sessionLength;
        this.secs = 60 * this.sessionLength;
      } else {
        this.sessionType = 'Break!';
        this.currentLength = this.breakLength;
        this.timeLeft = 60 * this.breakLength;
        this.originalTime = this.breakLength;
        this.secs = 60 * this.breakLength;
      }
    } else {
      if (this.sessionType === 'Break!') {
        this.fillColor = '#E88B8B';
      } else {
        this.fillColor = '#7DE891';
      }
      this.timeLeft = this.displayTimeRemaining(this.secs);

      var totalTime = 60 * this.originalTime;
      var perc = Math.abs((this.secs / totalTime) * 100 - 100);
      this.fillHeight = perc + '%';
    }
  }
}
