import React from 'react';
import StatementDiff from './diff.js';
// import Request from 'request';
import StatementSelector from './StatementSelector.js';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      default1: 'statements/2017/10',
      default2: 'statements/2017/11',
      statementA: '',
      statementB: '',
    };
    this.input1Handler1 = this.input1Handler1.bind(this);
    this.input1Handler2 = this.input1Handler2.bind(this);
  }

  input1Handler1(statement){
    this.setState({statementA: statement});
  }

  input1Handler2(statement){
    this.setState({statementB: statement});
  }

  render(){
    return (
      <div style={style}>
        
        <p>
          <del>&emsp;&emsp;
          <StatementSelector
            onChange={this.input1Handler1}
            default={this.state.default1}
            style="del"
          />&emsp;&emsp;
        </del>
        &emsp;→&emsp;
        <ins>&emsp;&emsp;
          <StatementSelector
            onChange={this.input1Handler2}
            default={this.state.default2}
            style="del"
          />&emsp;&emsp;
        </ins>
        </p>

        <h1>Statement by Philip Lowe, Governor: Monetary Policy Decision</h1>
        <StatementDiff
          statementA={this.state.statementA}
          statementB={this.state.statementB}
        />
      </div>
    );
  }
}


const style = {
  display: 'inline-block',
  margin: '0 auto',
  maxWidth: '50em',
  whiteSpace: 'normal',
  wordWrap: 'break-word',
}
