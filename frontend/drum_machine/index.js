import React from "react";
import ReactDOM from 'react-dom';
import './index.css';

/*const projectName = 'drum-machine';*/

class App extends React.Component {
    render() {
      return (
        <div id="drum-machine">
          <div id="titletext" className="disable-select">Purple Drum Machine</div>
          <div id="display">Press a key!</div>
          <Drumpads />
        </div>
      )
  }
}

const Drumpads = (props) => {
  return (
    <div id="pads" className="disable-select">
      <div className="drum-pad" id="q" onClick={() => {keyPress(0)}}>Q
      <audio id="Q" className="clip" src={soundArray[0].sound}/></div>
      <div className="drum-pad" id="w" onClick={() => {keyPress(1)}}>W
      <audio id="W" className="clip" src={soundArray[1].sound}/></div>
      <div className="drum-pad" id="e" onClick={() => {keyPress(2)}}>E
      <audio id="E" className="clip" src={soundArray[2].sound}/></div>
      <div className="drum-pad" id="a" onClick={() => {keyPress(3)}}>A
      <audio id="A" className="clip" src={soundArray[3].sound}/></div>
      <div className="drum-pad" id="s" onClick={() => {keyPress(4)}}>S
      <audio id="S" className="clip" src={soundArray[4].sound}/></div>
      <div className="drum-pad" id="d" onClick={() => {keyPress(5)}}>D
      <audio id="D" className="clip" src={soundArray[5].sound}/></div>
      <div className="drum-pad" id="z" onClick={() => {keyPress(6)}}>Z
      <audio id="Z" className="clip" src={soundArray[6].sound}/></div>
      <div className="drum-pad" id="x" onClick={() => {keyPress(7)}}>X
      <audio id="X" className="clip" src={soundArray[7].sound}/></div>
      <div className="drum-pad" id="c" onClick={() => {keyPress(8)}}>C
      <audio id="C" className="clip" src={soundArray[8].sound}/></div>
    </div>
  )
}

const soundArray = [
  { id: "q",
    key: 81,
    name: "Kick 6",
    sound: "https://freesound.org/data/previews/509/509976_8033171-lq.mp3",
    source: "https://freesound.org/people/blakengouda/sounds/509976/",
    artist: "blakengouda"
  },
  { id: "w",
    key: 87,
    name: "wood_block",
    sound: "https://freesound.org/data/previews/555/555538_12183728-lq.mp3",
    source: "https://freesound.org/people/stwime/sounds/555538/",
    artist: "stwime"
  },
  { id: "e",
    key: 69,
    name: "dup",
    sound: "https://freesound.org/data/previews/17/17945_30267-lq.mp3",
    source: "https://freesound.org/people/zippi1/sounds/17945/",
    artist: "zippi1"
  },
  { id: "a",
    key: 65,
    name: "Snare 7",
    sound: "https://freesound.org/data/previews/510/510039_8033171-lq.mp3" ,
    source: "https://freesound.org/people/blakengouda/sounds/510039/",
    artist: "blakengouda"
  },
  { id: "s",
    key: 83,
    name: "Electronic Snare",
    sound: "https://freesound.org/data/previews/344/344960_6086014-lq.mp3" ,
    source: "https://freesound.org/people/ezequielTM/sounds/344960/",
    artist: "ezequielTM"
  },
  { id: "d",
    key: 68,
    name: "EDM Kick",
    sound: "https://freesound.org/data/previews/346/346029_5554674-lq.mp3" ,
    source: "https://freesound.org/people/Spennnyyy/sounds/346029/",
    artist: "Spennnyyy"
  },
  { id: "z",
    key: 90,
    name: "small_drum1",
    sound: "https://freesound.org/data/previews/213/213322_1979597-lq.mp3" ,
    source: "https://freesound.org/people/Taira%20Komori/sounds/213322/",
    artist: "Taira Komori"
  },
  { id: "x",
    key: 88,
    name: "Menu SD Click",
    sound: "https://freesound.org/data/previews/145/145439_2615119-lq.mp3" ,
    source: "https://freesound.org/people/Soughtaftersounds/sounds/145439/",
    artist: "Soughtaftersounds, varazuvi.com"
  },
  { id: "c",
    key: 67,
    name: "zilbel 6in 1chk",
    sound: "https://freesound.org/data/previews/316/316966_5364823-lq.mp3" ,
    source: "https://freesound.org/people/IowaSpaceWizard/sounds/316966/",
    artist: "IowaSpaceWizard"
  }
];

document.addEventListener('keydown', logKey);

let x = 0;
function logKey(e) {
  switch(e.keyCode) {
    case 81: x = 0; break;  //Q
    case 87: x = 1; break;  //W
    case 69: x = 2; break;  //E
    case 65: x = 3; break;  //A
    case 83: x = 4; break;  //S
    case 68: x = 5; break;  //D
    case 90: x = 6; break;  //Z
    case 88: x = 7; break;  //X
    case 67: x = 8; break;  //C
    default: break;
  }
  keyPress(x);
}

function keyPress(x) {
  document.getElementById(soundArray[x].id.toUpperCase()).play();
  document.getElementById("display").innerHTML = soundArray[x].name;
  document.getElementById(soundArray[x].id).classList.add("dp2");
  setTimeout(function() {
    document.getElementById(soundArray[x].id).classList.remove("dp2");
  }, 250);
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
