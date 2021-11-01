import './index.css';
import React from "react";
import ReactDOM from 'react-dom';

function caesar(str, rot, mode) {
  let newText = [];
  str = str.split("");
  rot = Number(rot);
  
  if (mode === "decode") {
    rot = 26 - rot
  }

  for (let i = 0; i < str.length; i++) {
    if (/^[^A-Za-z]/ig.test(str[i])) {
      newText.push(str[i]);
    }
    
    let asci = str[i].charCodeAt(0);
    if (/[A-Z]/g.test(str[i])) {
      if (asci <= 90-rot) {
        asci = String.fromCharCode(asci+rot);
      }
      if (asci > 90-rot) {
        asci = String.fromCharCode(asci-26+rot)
      }
      newText.push(asci);
    }
    if (/[a-z]/g.test(str[i])) {
      if (asci <= 122-rot) {
        asci = String.fromCharCode(asci+rot);
      }
      if (asci > 122-rot) {
        asci = String.fromCharCode(asci-26+rot)
      }
      newText.push(asci);
    } 
  }
  newText = newText.join("");
  //console.log("orig: " + str.join("") + ", new: " + newText + ", rot: " + rot);
  return newText;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "Enter text here",
      rot: 13,
      mode: "encode",
      encrypted: "Results will show up here."
    };
    this.changeInput = this.changeInput.bind(this);
    this.changeRot = this.changeRot.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.ask = this.ask.bind(this);
  }
  changeInput(event) {
    this.setState({
      input: event.target.value
    });
  }
  changeRot(event) {
    this.setState({
      rot: event.target.value
    });
  }
  changeMode(event) {
    this.setState({
      mode: event.target.value
    });
  }
  ask() {
    if (this.state.rot > 25 || this.state.rot < 0 || this.state.rot%1 !== 0 ) {
      this.setState({
        encrypted: "Invalid ROT, please input an integer between 0 and 25!"
      });
    }
    else {
      this.setState({
        encrypted: caesar(this.state.input, this.state.rot, this.state.mode)
      });
    }
  }

  render() {
    return (
      <center>
        <div id="pagetitle" className="noselect">
          <img id="logo" src="https://raw.githubusercontent.com/d-0-t/fcc_projects/main/javascript/elements/fame-156160.svg" />
          <h1>Caesar's Cipher</h1>
        </div>
        <div id="description">
          This app will encode and decode English text with the Caesar rotation.<br/>
          It will not rotate numbers.
        </div>
        <div id="workarea">
          <textarea cols="30" rows="5"
          value={this.state.input} onChange={this.changeInput}>
          </textarea>
          <br/>
          <div id="rot">
          <b>ROT: </b>
          <input id="rotfield" type="number" placeholder="13" min="0" max="25" step="1"
          value={this.state.rot} onChange={this.changeRot}></input>
          <span> (0-25) </span> 
          </div>
          <select name="mode" value={this.state.mode} onChange={this.changeMode}>
            <option value="encode">Encode</option>
            <option value="decode">Decode</option>
          </select>
          <button id="ask-btn" onClick={this.ask}>Go!</button>
        </div>
        <div id="res">Results:</div>
        <div id="resultblock" dangerouslySetInnerHTML={{__html: this.state.encrypted}}></div>
        <div id="signature"><a href="https://github.com/d-0-t" target="_blank" rel="noreferrer">by d0t</a></div>
      </center>
    )
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));