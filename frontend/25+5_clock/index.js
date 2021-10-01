import './index.css';
import React from "react";
import ReactDOM from 'react-dom';
import {
  setDriftlessInterval,
  clearDriftless,
} from 'driftless';

/*const projectName = '25 + 5 Clock';*/
/*state is paused if you change browser tabs*/

const TICKSPEED = 1000; // 1000 = 1s

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      running: true, //it's opposite day!
      mmss: "25:00",
      breakTicks: 300,
      ticksLeft: 1500,
      stateOfTimer: "Paused",
      isItBreak: false,
      alarm: false
    };
    this.reset = this.reset.bind(this);
    this.breakPlus = this.breakPlus.bind(this);
    this.breakMinus = this.breakMinus.bind(this);
    this.sessPlus = this.sessPlus.bind(this);
    this.sessMinus = this.sessMinus.bind(this);
    this.reset = this.reset.bind(this);
    this.startStop = this.startStop.bind(this);
    this.decrementer = this.decrementer.bind(this);
    this.clock = this.clock.bind(this);
    this.control = this.control.bind(this);
    this.clockDisplay = this.clockDisplay.bind(this);
  }
  startStop() {
    this.clock();
    this.setState(prevState => {
      if (this.state.stateOfTimer === "Paused") {
        return {
          running: false,
          stateOfTimer: this.state.isItBreak ? "Break" : "Session"
        }
      } else if (this.state.running) {
        return {
          running: false,
          stateOfTimer: this.state.isItBreak ? "Break" : "Session"
        }
      } else if (!this.state.running) {
        return {
          running: true,
          stateOfTimer: "Paused"
        }
      }
    });
  }
  reset() {
    clearDriftless(this.state.clocking);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    this.setState(prevState => {
      return {
        breakLength: 5,
        sessionLength: 25,
        running: true,
        mmss: "25:00",
        breakTicks: 300,
        ticksLeft: 1500, 
        stateOfTimer: "Paused",
        clocking: "",
        alarm: false
      }
    });
  }
  breakPlus() {
    this.setState(prevState => {
      if (this.state.breakLength < 60) {
        return {
          breakTicks: (this.state.breakLength + 1)*60,
          breakLength: this.state.breakLength + 1
        }
      }
    });
  }
  breakMinus() {
    this.setState(prevState => {
      if (this.state.breakLength > 1) {
        return {
          breakTicks: (this.state.breakLength - 1)*60,
          breakLength: this.state.breakLength - 1
        }
      }
    });
  }
  sessPlus() {
    this.setState(prevState => {
      if (this.state.sessionLength < 60) {
        return {
          ticksLeft: (this.state.sessionLength + 1)*60,
          sessionLength: this.state.sessionLength + 1,
          mmss: (this.state.sessionLength + 1) + ":00"
        }
      }
    });
  }
  sessMinus() {
    this.setState(prevState => {
      if (this.state.sessionLength > 1) {
        return {
          ticksLeft: (this.state.sessionLength - 1)*60,
          sessionLength: this.state.sessionLength - 1,
          mmss: (this.state.sessionLength - 1) + ":00"
        }
      }
    });
  }

  decrementer() {
    this.setState(prevState => {
      return {
        ticksLeft: this.state.ticksLeft - 1
      }
    });
  }
  control() {
    this.clockDisplay();

    if (this.state.stateOfTimer === "Session" && this.state.isItBreak) {
      this.setState(prevState => {
        return {
          stateOfTimer: "Break"
        }
      });
    } else if (this.state.stateOfTimer === "Break" && !this.state.isItBreak) {
      this.setState(prevState => {
        return {
          stateOfTimer: "Session"
        }
      });
    }

    if (this.state.ticksLeft === 0) {
      this.setState(prevState => {
        return {
          alarm: true
        }
      });
    }
    if (this.state.alarm && !this.state.running) {
      document.getElementById("beep").play();
      this.setState(prevState => {
        return {
          alarm: false
        }
      });
    }

    if (this.state.ticksLeft < 1) {
      this.setState(prevState => {
      if (this.state.stateOfTimer === "Session") {
        return {
          ticksLeft: this.state.breakLength*60 + 1,
          isItBreak: true,
          running: false
        }
      } else if (this.state.stateOfTimer === "Break") {
        return {
          ticksLeft: this.state.sessionLength*60 + 1,
          isItBreak: false,
          running: false
        }
      }
      });
    }    
  }

  pause() {
    clearDriftless(this.state.clocking);
      this.setState(prevState => {
        return {
          clocking: "",
          running: true,
          stateOfTimer: "Paused"
        }
      });
  }

  clock() {
    if (!this.state.running) {
      this.pause();
    } else {
      this.setState(prevState => {
        return {
          clocking: setDriftlessInterval(() => {
            this.decrementer();
            this.control();
          }, TICKSPEED)
        }
      });
    }
  }
    

  clockDisplay() {
    this.setState(prevState => {
      let minutes = Math.floor(this.state.ticksLeft/60);
      let seconds = this.state.ticksLeft - minutes*60;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      if (this.state.ticksLeft > 0) {
        return {
          mmss: minutes + ":" + seconds
        }
      } else {
        return {
          mmss: minutes + ":" + seconds,
          running: true
        }
      }
    });
  }

  render() {
    return (
      <div id="wrapper" className="disable-select">
        <audio id="beep" src="https://freesound.org/data/previews/360/360831_1431924-lq.mp3"
        /* ARTIST: tec_studio, source: https://freesound.org/people/tec_studio/sounds/360831/ */ />
        <div id="pagetitle">25 + 5 Clock</div>
        <div id="signature"><a href="https://github.com/d-0-t" target="_blank" rel="noreferrer">by d0t</a></div>
        <div id ="setup">
          <div id="break">
            <div id="break-label">Break</div>
            <div className="smolblock">
              <div className="adjustgroup">
                <button id="break-increment" className="adjuster" onClick={this.breakPlus}><i className="fas fa-caret-up"></i></button>
                <button id="break-decrement" className="adjuster" onClick={this.breakMinus}><i className="fas fa-caret-down"></i></button>
              </div>
              <div id="break-length">{this.state.breakLength}</div>
            </div>
          </div>
          <div id="session">
            <div id="session-label">Session</div>
            <div className="smolblock">
            <div id="session-length">{this.state.sessionLength}</div>
              <div className="adjustgroup">
                <button id="session-increment" className="adjuster" onClick={this.sessPlus}><i className="fas fa-caret-up"></i></button>
                <button id="session-decrement" className="adjuster" onClick={this.sessMinus}><i className="fas fa-caret-down"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div id="timer">
          <div id="timerdisplay">
            <div id="timer-label">{this.state.stateOfTimer}</div>
            <div id="time-left">{this.state.mmss}</div>
          </div>
          <div id="functionbuttons">
            <button id="start_stop" onClick={this.startStop}><i className="fas fa-play"></i> <i className="fas fa-pause"></i></button>
            <button id="reset" onClick={this.reset}><i className="fas fa-undo"></i></button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));



/*
DRIFTLESS NPM PACKAGE
The MIT License (MIT)

Copyright (c) 2014 Dan Kaplun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
