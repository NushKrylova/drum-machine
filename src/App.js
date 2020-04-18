import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: "Heater kit",
      sliderVal: 1,
      powerPressed: true,
      bank: bankOne,
    };
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress.bind(this));
  }
  handleKeyPress(e) {
    let key = e.key.toUpperCase()
    if (document.getElementById(key)) {
      this.playSound(key);
    }
  }
  adjustVolume(e) {
    this.setState({
      sliderVal: e.target.value,
      displayText: Math.round(e.target.value * 100)
    })
  }
  playSound(key) {
    if (this.state.powerPressed) {
      console.log(key);

      this.setState({
        displayText: key
      })

      const sound = document.getElementById(key);
      sound.currentTime = 0;
      sound.play();
      sound.volume = this.state.sliderVal;
    }
  }
  powerToggle() {
    this.setState(state => {
      return { powerPressed: !state.powerPressed }
    })
  }
  changeBank() {
    this.setState(state => {
      if (state.displayText === "Heater kit") {
        return {
          displayText: "Smooth Piano Kit",
          bank: bankTwo
        }
      } else {
        return {
          displayText: "Heater kit",
          bank: bankOne
        }
      }
    })
  }

  render() {
    const pads = this.state.bank.map(i =>
      <div className="gridButtons">
        <button id={i.id} type="button" className="drum-pad btn btn-primary" onClick={this.playSound.bind(this, i.keyTrigger)}>
          <audio id={i.keyTrigger} className="clip" src={i.url}></audio>
          {i.keyTrigger}
        </button>
      </div>
    );
    return (
      <div id="drum-machine" className="container d-flex">
        <div className="row mx-auto align-self-center">
          <div className="col">
            <div className="grid">
              {pads}
            </div>
          </div>
          <div className="col flex-column d-flex">
            <div id="display" className="border">
              <h4 className="display">{this.state.displayText}</h4>
            </div>
            <div id="volume-slider" className="volume-slider">
              <input type="range" min="0" max="1" step="0.01" value={this.state.sliderVal} onChange={this.adjustVolume.bind(this)} />
              <label id="label">Volume</label>
            </div>
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="customSwitch1" onClick={this.changeBank.bind(this)} />
              <label class="custom-control-label" for="customSwitch1">Bank</label>
            </div>
            <div class="powerButton">
              <button id="powerButton" type="button" className={`btn btn-primary btn-lg rounded-circle ${this.state.powerPressed ? "active" : ""}`} onClick={this.powerToggle.bind(this)}>
                <i class="fas fa-power-off"></i>
              </button>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

const bankOne = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];

const bankTwo = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];

export default App;

