import './index.css';
import React from "react";
import ReactDOM from 'react-dom';

function palindrome(original_str) {
  let reverse = [];
  let reverseCompare = [];

  for (let i = 0; i < original_str.length; i++) {
    reverse.unshift(original_str[i]);
  } reverse = reverse.join("");

  let str = original_str.toLowerCase().match(/[a-z0-9]/g);

  if (original_str !== undefined && original_str.length !== 0 && str === null) {
    return [reverse, "No letters detected."];
  }
  if (original_str === undefined || str === null) {
    return ["", "Invalid input."];
  }
  for (let i = 0; i < str.length; i++) {
    reverseCompare.unshift(str[i]);
  }
  str = str.join("");
  reverseCompare = reverseCompare.join("");

  if (str === reverseCompare) {
    return [reverse, "This is a palindrome."];
  }
  return [reverse, "This is not a palindrome."];
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "Go hang a salami, I'm a lasagna hog",
      reversed: "Click Go! to find out what the reversed text would be.",
      checker: "This is a palindrome."
    };
    this.changeInput = this.changeInput.bind(this);
    this.ask = this.ask.bind(this);
  }
  changeInput(event) {
    this.setState({
      input: event.target.value
    });
  }

  ask() {
    this.setState({
      reversed: palindrome(this.state.input)[0],
      checker: palindrome(this.state.input)[1]
    });
  }

  render() {
    return (
      <center>
        <div id="pagetitle" className="noselect">
          <div id="logo">
            <h1>Palindrome Checker</h1>
          </div>
        </div>
        <div id="description">
          This app will determine whether the text you input is a palindrome.<br/>
          It will only check for alphabetical letters [a-z] and arabic numbers [0-9], but it will reverse anything.
        </div>
        <div id="workarea">
          <textarea cols="30" rows="5"
          value={this.state.input} onChange={this.changeInput}>
          </textarea>
          <br/>
          <button id="ask-btn" onClick={this.ask}>Go!</button>
        </div>
        <div className="res">Validity:</div>
        <div className="resultblock" dangerouslySetInnerHTML={{__html: this.state.checker}}></div>
        <div className="res">Reversed text:</div>
        <div className="resultblock" dangerouslySetInnerHTML={{__html: this.state.reversed}}></div>
        <div id="signature"><a href="https://github.com/d-0-t" target="_blank" rel="noreferrer">by d0t</a></div>
      </center>
    )
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));