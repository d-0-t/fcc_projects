import React from "react";
import ReactDOM from 'react-dom';
import './index.css';

/*const projectName = 'drum-machine';*/

//operators
const operas = /[-+*/]/;
//invalid operators to begin an expression with
const operaStartInvalid = /^[*/]/;
//handling minus as a different operator in the else if conditions
const operaAfterNum = /[0-9][+*/]$/;
const operaMinusAfterNum = /[0-9][-]$/;
//when there is an +*/ following a -, the operators should be deleted and replaced by the new operator
const operaOverride = /[+*/][-]$/;
//if expression ending with operators
const operaEnd = /[-+*/]$/
//ending with numbers
const numbers = /[0-9]$/;
//numbers that start with 0 after a previous operator, not actual double zero checker, just functions as its prevention
const doubleZero = /[-+*/][0]$/;
//displayed formula starting with 0
const zeroStart = /^[0]$/;
//check previous state for validity (last number group), whether it already has a decimal
const deciCheck = /[-+*/]*[0-9]*[.][0-9]*$/;    
//check if expression starts / ends with decimal
const deciStart = /^[.]/;
const deciEnd = /[.]$/;
const deciZeroEnd = /[0][.]$/;
//check if it ends with operator + decimal
const deciAndOperaEnd = /[-+*/][.]$/;
const deciAndTwoOperasEnd = /[-+*/][-+*/]+[.]$/;
const equalEnd = /[=]$/;
const operaStart = /^[*/]/;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed: "0"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(num) {
    this.setState(prevState => {
      if (this.state.displayed == "Infinity" || this.state.displayed == "-Infinity" || !this.state.displayed /* = NaN */ ) { 
        if (operaStart.test(num)) {
          return {
            displayed: "0"
          }
        } else {
          return {
            displayed: num
          }
        }
      } else if (deciEnd.test(this.state.displayed) && num === ".") {
        return {
          displayed: this.state.displayed.slice(0,-1)
        }
      } else if (deciAndOperaEnd.test(this.state.displayed)) {
        if (num !== "=") {
          return {
            displayed: this.state.displayed.slice(0,-1) + "0." + num
          }
        } else {
          if (deciAndTwoOperasEnd.test(this.state.displayed)) {
            return {
              displayed: Math.floor(10000000000000*eval(this.state.displayed.slice(0,-3)))/10000000000000
            }
          } else {
            return {
              displayed: Math.floor(10000000000000*eval(this.state.displayed.slice(0,-2)))/10000000000000
            }
          }
        }
      } else if (this.state.displayed === "AC" || this.state.displayed === "=" || this.state.displayed === ".") {
        if (num === "0" || num === "AC" || num === "=") {
          return {
            displayed: "0"
          }
        } else if (numbers.test(num)) {
            return {
              displayed: num
            }
        }
      } else if (equalEnd.test(this.state.displayed)) {
        return {
          displayed: this.state.displayed.slice(0,-1) + num
        }
      } else if (num === "AC") {
        return {
          displayed: "0"
          }
      } else if (num === "=") {
        if (operaOverride.test(this.state.displayed)) {
          return {
            displayed: Math.floor(10000000000000*eval(this.state.displayed.slice(0,-2)))/10000000000000
          }
        } else if (operaEnd.test(this.state.displayed) || deciEnd.test(this.state.displayed)) {
          return {
            displayed: Math.floor(10000000000000*eval(this.state.displayed.slice(0,-1)))/10000000000000
          }
        }
        else {
          return {
            displayed: Math.floor(10000000000000*eval(this.state.displayed))/10000000000000
          }
        }
      } else if (numbers.test(num)) {
          if (zeroStart.test(this.state.displayed) || doubleZero.test(this.state.displayed)) {
            if (num === "0") {
              return {
                displayed: this.state.displayed
              }
            }
            else {
              return {
                displayed: this.state.displayed.slice(0,-1) + "" + num
              }
            }
          } else {
            return {
              displayed: this.state.displayed + "" + num
            }
          }
      } else if (num === ".") {
        if (deciCheck.test(this.state.displayed) || deciStart.test(this.state.displayed)) {
          return {
            displayed: this.state.displayed
          }
        } else {
          return {
            displayed: this.state.displayed + "" + num
          }
        }
      } else if (operas.test(num)) {
        if (this.state.displayed === "") {
          if (operaStartInvalid.test(num)) {
            return {
              displayed: this.state.displayed
            }
          } else {
            return {
              displayed: this.state.displayed + "" + num
            }
          }
        } else if (numbers.test(this.state.displayed)) {
          return {
            displayed: this.state.displayed + "" + num
          }
        } else if (operaOverride.test(this.state.displayed)) {
          return {
            displayed: this.state.displayed.slice(0,-2) + "" + num
          }
        } else if (num !== "-" && operaAfterNum.test(this.state.displayed)) {
          return {
            displayed: this.state.displayed.slice(0,-1) + "" + num
          }
        } else if (num === "-" && operaAfterNum.test(this.state.displayed)) {
          return {
            displayed: this.state.displayed + "" + num
          }
        } else if (num === "-" && operaMinusAfterNum.test(this.state.displayed)) {
          return {
            displayed: this.state.displayed.slice(0,-1) + "+" 
          }
        }
      }
    });
  }

  render() {
    return (
      <div id="calculator" className="disable-select">
        <CalcHead />
        <div id="display" >{this.state.displayed}</div>
        <div id="calcpad">
          <div id="threebyfive">
            <div className="threerow">
              <button id="clear" className="buttons" onClick={() => {this.handleClick("AC")}}>AC</button>
              <button id="multiply" className="buttons" onClick={() => {this.handleClick("*")}}>∗</button>
              <button id="divide" className="buttons" onClick={() => {this.handleClick("/")}}>/</button>
            </div>
            <div className="threerow">
              <button id="seven" className="buttons" onClick={() => {this.handleClick("7")}}>7</button>
              <button id="eight" className="buttons" onClick={() => {this.handleClick("8")}}>8</button>
              <button id="nine" className="buttons" onClick={() => {this.handleClick("9")}}>9</button>
            </div>
            <div className="threerow">
              <button id="four" className="buttons" onClick={() => {this.handleClick("4")}}>4</button>
              <button id="five" className="buttons" onClick={() => {this.handleClick("5")}}>5</button>
              <button id="six" className="buttons" onClick={() => {this.handleClick("6")}}>6</button>
            </div>
            <div className="threerow">
              <button id="one" className="buttons" onClick={() => {this.handleClick("1")}}>1</button>
              <button id="two" className="buttons" onClick={() => {this.handleClick("2")}}>2</button>
              <button id="three" className="buttons" onClick={() => {this.handleClick("3")}}>3</button>
            </div>
              <div className="threerow">
              <button id="zero" className="buttons" onClick={() => {this.handleClick("0")}}>0</button>
              <button id="decimal" className="buttons" onClick={() => {this.handleClick(".")}}>.</button>
            </div>
          </div>
          <div id="onebyfive">
            <button id="subtract" className="buttons" onClick={() => {this.handleClick("-")}}>-</button>
            <button id="add" className="buttons" onClick={() => {this.handleClick("+")}}>+</button>
            <button id="equals" className="buttons" onClick={() => {this.handleClick("=")}}>=</button>
          </div>
        </div>
      </div>
    )
  }
}

const CalcHead = () => {
  return (
      <div id="head">
        <div id="titletext">JASIO</div>
        <div id="version">v0.1</div>
        <div id="signature"><a href="https://github.com/d-0-t" target="_blank" rel="noreferrer">by d0t</a></div>
      </div>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
