import React, { Component } from 'react';
import './App.less';
import Switch from "react-switch";
const timeout = 5000;
class App extends Component {
  constructor() {
    super();
    this.state = {
      manual: true, signal: {
        northSouth: 'halt-stop',
        eastWest: 'halt-go'
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleSignal = this.toggleSignal.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.manual) {
      setTimeout(this.toggleSignal, timeout);
    }
  }

  toggleSignal(force) {
    if (force) {
      this.setState({ signal: this.state.signal === 'east-west' ? 'north-south' : 'east-west' });
    }
    else {
      const newSignal = {}
      debugger;
      switch (this.state.signal.northSouth) {
        case 'halt-stop':
          newSignal['eastWest'] = 'stop';
          newSignal['northSouth'] = 'go';
          break;
        case 'go':
          newSignal['eastWest'] = 'halt-stop';
          newSignal['northSouth'] = 'halt-go';
          break;
        case 'halt-go':
          newSignal['eastWest'] = 'go';
          newSignal['northSouth'] = 'stop';
          break;
        case 'stop':
          newSignal['eastWest'] = 'halt-go';
          newSignal['northSouth'] = 'halt-stop';
          break;
        default:
          newSignal['eastWest'] = 'halt-stop';
          newSignal['northSouth'] = 'halt-go';
          break;

      }
      this.setState({ signal: newSignal });
    }
  }


  handleChange(checked) {
    this.setState({ manual: checked });
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-4">
                  <Switch
                    checked={this.state.manual}
                    onChange={this.handleChange}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                    id="material-switch"
                  />
                </div>
                <div className="col-md-8">
                  Manual Toggle
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <button onClick={() => this.toggleSignal()} className={this.state.manual ? 'btn btn-primary' : 'btn btn-primary disabled'}>Click here to manually change the signal</button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div id="traffic-light" className={this.state.signal.northSouth}>
                <input type="radio" name="traffic-light-color" className="red" />
                <input type="radio" name="traffic-light-color" className="yellow" />
                <input type="radio" name="traffic-light-color" className="green" />
              </div>

              <span>North-South</span>
            </div>
            <div className="col-md-6">
              <div id="traffic-light" className={this.state.signal.eastWest}>
                <input type="radio" name="traffic-light-color" className="red" />
                <input type="radio" name="traffic-light-color" className="yellow" />
                <input type="radio" name="traffic-light-color" className="green" />
              </div>

              <span>East-West</span>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;