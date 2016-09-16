import React from 'react';

var monthNames = {
  '01':"January",
  '02':"February",
  '03':"March",
  '04':"April",
  '05':"May",
  '06':"June",
  '07':"July",
  '08':"August",
  '09':"September",
  '10':"October",
  '11':"November",
  '12':"December"
}

export default class Statement extends React.Component {

  render () {
    var name = this.props.name;

    var year = name.slice(0,4);
    var month = name.slice(4,6);
    var monthName = monthNames[month];

    var text = monthName + ' ' + year;
    var value = 'statements/' + year + '/' + month;

    return (
      <option
        name={name}
        value={value}
      >
        {text}
      </option>
    );
  }
}
