import React from 'react';

import Statement from './Statement.js'

export default class StatementSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value:this.props.default};
    // Bind onChange functions
    this.readStatement = this.readStatement.bind(this);
    this.onChange = this.onChange.bind(this);
    // Run update function on default value
    this.readStatement(this.props.default);
  }

  onChange(event){
    this.setState({value: event.target.value});
    this.readStatement(event.target.value);
  }

  readStatement(event){
    readFile(event, (event) => {
      this.props.onChange(event);
    });
  }

  render () {
    return (
        <select ref='selector1' onChange={this.onChange} value={this.state.value}>
          <optgroup label="2017">
            <Statement name="201712"/>
            <Statement name="201711"/>
            <Statement name="201710"/>
            <Statement name="201709"/>
            <Statement name="201708"/>
            <Statement name="201707"/>
            <Statement name="201706"/>
            <Statement name="201705"/>
            <Statement name="201704"/>
            <Statement name="201703"/>
            <Statement name="201702"/>
          </optgroup>
        </select>
    );
  }
}
// <p>{this.state.value}</p>

function readFile(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
