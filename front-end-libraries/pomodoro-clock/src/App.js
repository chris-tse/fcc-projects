import React, {Component} from 'react';
import './App.css';
import Control from './Control'
import Timer from './Timer'

let intID

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sessLength: 25,
      breakLength: 5,
      currMin: 25,
      currSec: 0,
      isSession: true,
      isRunning: false
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.checkRunning = this.checkRunning.bind(this)

    this.handlePlay = this.handlePlay.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleSessUp = this.handleSessUp.bind(this)
    this.handleSessDown = this.handleSessDown.bind(this)
    this.handleBreakDown = this.handleBreakDown.bind(this)
    this.handleBreakUp = this.handleBreakUp.bind(this)
  }
  handleSessDown() {
    let curr = this.state.sessLength
    if (curr > 1) {
      curr--
      this.setState({
        sessLength: curr,
        currMin: curr
      })
    }
    this.handleReset()
  }

  handleSessUp() {
    let curr = this.state.sessLength
    if (curr < 60) {
      curr++
      this.setState({
        sessLength: curr,
        currMin: curr
      })
    }
    this.handleReset()
  }

  handleBreakDown() {
    let curr = this.state.breakLength
    if (curr > 1) {
      curr--
      this.setState({
        breakLength: curr
      })
    }
  }

  handleBreakUp() {
    let curr = this.state.breakLength
    if (curr < 60) {
      curr++
      this.setState({
        breakLength: curr
      })
    }
  }

  handlePlay(e) {
    e.preventDefault()
    if (this.state.isRunning) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }

  handleReset(e) {
    e.preventDefault()
    this.setState({currSec: 0, currMin: this.state.sessLength, isSession: true})
  }

  startTimer() {
    this.setState({isRunning: true})
    let min = this.state.currMin
    let sec = this.state.currSec
    intID = setInterval(() => {
      if (sec > 0) {
        sec--
        this.setState({currSec: sec})
      } else {
        min--
        sec = 59
        this.setState({currMin: min, currSec: sec})
      }

      if (min === 0 && sec === 0) {
        if (this.state.isSession) {
          this.setState({isSession: false})
          min = this.state.breakLength
          sec = 0
        } else {
          this.setState({isSession: true})
          min = this.state.sessLength
          sec = 0
        }
      }

    }, 1000)
  }

  stopTimer() {
    clearInterval(intID)
    this.setState({isRunning: false})
  }

  checkRunning() {
    return (this.state.isRunning ? "fa fa-pause" : "fa fa-play")
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>React Pomodoro</h1>
        </div>
        <div className="row">
          <div className="col">
            <Control lengthType="Break" value={this.state.breakLength} defaultValue={this.state.breakLength} breakLength={this.state.breakLength} handleDown={this.handleBreakDown} handleUp={this.handleBreakUp}/>
          </div>
          <div className="col">
            <Control lengthType="Session" value={this.state.sessLength} sessLength={this.state.sessLength} handleDown={this.handleSessDown} handleUp={this.handleSessUp}/>
          </div>
        </div>
        <div className="row">
            <div className="col">
              <Timer
                onClick={this.startTimer}
                currMin={this.state.currMin}
                currSec={this.state.currSec}
                isSession={this.state.isSession}
                isRunning={this.state.isRunning}/>
            </div>
          </div>
          <div className="row grouped">
            <div className="col right-pad">
              <a href="#" onClick={this.handlePlay}><i className={(this.state.isRunning ? "fa fa-pause" : "fa fa-play")}/></a>
            </div>
            <div className="col left-pad">
              <a href="#" onClick={this.handleReset}><i className="fa fa-undo"/></a>
            </div>
          </div>
      </div>





    );
  }
}

export default App
