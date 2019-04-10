import React, {Component} from 'react';

class Timer extends Component {

    render() {
        let session = this.props.isSession
        let running = this.props.isRunning
        let sec = this.props.currSec
        let phrase = " "

        if (running) {
            if (session) {
                phrase = "Get Working!"
            } else {
                phrase = "Break Time"
            }
        }

        if (sec < 10) {
            sec = "0" + sec
        }

        return (
            <div className="Timer">
                <p>{phrase}</p>
                <span id="minute">{this.props.currMin}:</span>
                <span id="second">{sec}</span>
            </div>
        );
    }
}

export default Timer