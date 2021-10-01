import './index.css';
import React from "react";
import ReactDOM from 'react-dom';

let convertedNum = "";
let convertedNumOneLine = "";

function convertToRoman(num) {

  if (num < 1 || num > 3999) {
    return 0;
  }

  num = num.toString().split("");
  num = num.map(x => parseInt(x));
  num = num.reverse();

  let len = num.length;
  let rom = [];

  let assign = [];
  assign = [ 
    function(ones) {
      switch (ones) {
        case 0: rom.push(""); break;
        case 1: rom.push("I"); break;
        case 2: rom.push("II"); break;
        case 3: rom.push("III"); break;
        case 4: rom.push("IV"); break;
        case 5: rom.push("V"); break;
        case 6: rom.push("VI"); break;
        case 7: rom.push("VII"); break;
        case 8: rom.push("VIII"); break;
        case 9: rom.push("IX"); break;
      }
    },
    function(tens) {
      switch (tens) {
        case 0: rom.push(""); break;
        case 1: rom.push("X"); break;
        case 2: rom.push("XX"); break;
        case 3: rom.push("XXX"); break;
        case 4: rom.push("XL"); break;
        case 5: rom.push("L"); break;
        case 6: rom.push("LX"); break;
        case 7: rom.push("LXX"); break;
        case 8: rom.push("LXXX"); break;
        case 9: rom.push("XC"); break;
      }
    },
    function(hundreds) {
      switch (hundreds) {
        case 0: rom.push(""); break;
        case 1: rom.push("C"); break;
        case 2: rom.push("CC"); break;
        case 3: rom.push("CCC"); break;
        case 4: rom.push("CD"); break;
        case 5: rom.push("D"); break;
        case 6: rom.push("DC"); break;
        case 7: rom.push("DCC"); break;
        case 8: rom.push("DCCC"); break;
        case 9: rom.push("CM"); break;
      }
    },
    function(thousands) {
      switch (thousands) {
        case 0: rom.push(""); break;
        case 1: rom.push("M"); break;
        case 2: rom.push("MM"); break;
        case 3: rom.push("MMM"); break;
      }
    }
  ]
  
  for (var i = 0; i < len; i++) {
    assign[i](num[i]);
  }

  rom = rom.reverse().join("");
  convertedNumOneLine = rom;

  rom = rom.split("");
  convertedNum = rom.join("<br/>");
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "2021",
      converted: "M<br/>M<br/>X<br/>X<br/>I"
    };
    this.handleChange = this.handleChange.bind(this);
    this.ask = this.ask.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
      });
  }
  ask() {
    convertToRoman(this.state.input);
    this.setState({
      converted: convertedNum
      });
    console.log("Asked: " + this.state.input + ", Answer: " + convertedNumOneLine);
  }

  render() {
    return (
      <div id="wrapper">
        <div id="content">
          <div id="pagetitle" className="disable-select">Roman Numeral Converter</div>
          <div id="questionblock">
            <button id="ask-btn" onClick={this.ask}>?</button>
            <input type="number" id="question" placeholder=" 1-3999"
            min="1" max="3999" step="1"
            value={this.state.input} onChange={this.handleChange}></input>
            <div id="instructions" className="disable-select">from 1 to 3999</div>
          </div>
          <div id="resultblock" dangerouslySetInnerHTML={{__html: this.state.converted}}></div>
          <img id="venus"src="https://raw.githubusercontent.com/d-0-t/fcc_projects/main/javascript/elements/venus-6121452.png" /* AUTHOR: GDJ (Pixabay): https://pixabay.com/vectors/venus-goddess-line-art-beauty-6121452/ */ />
          <div id="signature"><a href="https://github.com/d-0-t" target="_blank" rel="noreferrer">by d0t</a></div>
        </div>
      </div>
    )
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
