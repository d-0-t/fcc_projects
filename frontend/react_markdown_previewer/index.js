import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import marked from "marked";

import {
  ReflexContainer,
  ReflexElement
} from 'react-reflex';
import 'react-reflex/styles.css';

/*const projectName = 'md-preview';*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      md: text
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      md: event.target.value
    });
  }
  render() {
    return (
      <div className="full-screen-div">
        <Head />
        <ReflexContainer orientation="vertical">
          <ReflexElement className="left-pane">
            <Edit md={this.state.md} onChange={this.handleChange}/>
          </ReflexElement>
          <ReflexElement className="right-pane">
            <Preview md={this.state.md} />
          </ReflexElement>  
        </ReflexContainer>
      </div>
    );
  }
};

const Head = (props) => {
  return (
    <div id="header" className="disableSelection">
      <h1>React Markdown Previewer</h1>
      <h1 id="profile"><a href="https://github.com/d-0-t" target="_blank" rel="noreferrer">by Dot.</a></h1>
    </div>
  );
}

const Edit = (props) => {
  return (
    <div id="holdme">
      <textarea id="editor"
      onChange={props.onChange}
      value={props.md}
      />
    </div>
    );
}

const Preview = (props) => {
  return (
    <div id="preview" dangerouslySetInnerHTML={{
      __html: marked(props.md)}} />
    );
}

const text = `# How to Markdown? (h1)

## As of HEADINGS, this is the equivalent of h2.
### This is h3.
#### This is h4.
##### And so on (h5)...

## Formatting
*This is italic text*

**This is bold text**

***This is italic bold text***

New paragraph: two enters.

New line: two spaces at the end of the line,  
like so! Now you can write pretty poems!  
Or just format whatever else you need.


## Links

Like so: [My GitHub](https://github.com/d-0-t)

## Inline code & Code block

You can write a short code between 2 backtics:

\`\`<h1>React Markdown Previewer</h1>\`\`

or you can write longer code between 3 backticks:

\`\`\`
const Preview = (props) => {
  return ();
}
\`\`\`

## Lists - unordered & ordered

- This is an unordered list
- Yeah, it's just a hyphen
- Not so complicated, hey?

1. This is an ordered list.
2. This is the 2nd element of said list.
3. Third time's a charm.

## Blockquote

> There will come a time when you believe everything is finished. That will be the beginning.
*- Louis L’Amour*

## Image
You can also add images.

![freeCodeCamp Logo](https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/205_Markdown-512.png)

## Tables
And tables.

ID | Name  | Date of birth
---|-------|---------------
1  | Peter | 1985.01.09.
2  | Laura | 1901.13.21.
3  | Boone | Never
`;

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
