import React from 'react';
import Diff from './text-diff.js';


const style = {
  span: `backgroundColor: white,`,
  ins: `backgroundColor: lightgreen; textDecoration: none;`,
  del: `backgroundColor: salmon; textDecoration: none;`,
  div: {},
}

const open = {
  span: ``,
  ins: `<ins class="ins">`,
  del: `<del class="del">`
}
const close = {
  span: ``,
  ins: `</ins>`,
  del: `</del>`
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}



export default class StatementDiff extends React.Component {
 render() {
    var diff = new Diff();

    // Do some preprocessing of statements
    var textA = this.props.statementA;
    var textB = this.props.statementB;
    textA = replaceAll(textA, '\t', '');
    textA = replaceAll(textA, '\n', ' ');
    textA = replaceAll(textA, '>', '> ');
    textA = replaceAll(textA, '<', ' <');
    textA = replaceAll(textA, '&nbsp;', ' ');
    textA = replaceAll(textA, '<p>', ' <br>');
    textA = replaceAll(textA, '</p>', ' <br>');
    textB = replaceAll(textB, '\t', '');
    textB = replaceAll(textB, '\n', ' ');
    textB = replaceAll(textB, '>', '> ');
    textB = replaceAll(textB, '<', ' <');
    textB = replaceAll(textB, '&nbsp;', ' ');
    textB = replaceAll(textB, '<p>', ' <br>');
    textB = replaceAll(textB, '</p>', ' <br>');
    console.log(textA)
    console.log(textB)
    // Normal diff
    // var diffs = diff.main(textA, textB);

    // Each word diff
    var a = diff.linesToChars_(textA, textB);
    var diffs = diff.main(a.chars1, a.chars2);
    diff.cleanupSemantic(diffs);
    diff.charsToLines_(diffs, a.lineArray);

    diffs = diffs.map(function (diff) {
      return [diff[0], replaceAll(diff[1], `\n\t`, ` `)]
    })

    var i = 0;
    var length = diffs.length;
    while (i < length - 2){
      if (diffs[i][1] == diffs[i+1][1]){
        diffs[i][0] = 0;
        diffs.splice(i+1,1);
        length--;
      }
      i++
    }
    console.log(diffs)
    console.log(JSON.stringify(diffs))

    var result = diffs.map(function (part) {
      let type = part[0] // either -1,0,1 (del,span,ins)
      let tag = type==0 ? 'span' : type==1 ? 'ins' : 'del'

      let text = part[1] // the text
      // ignore empty strings
      if (text.trim() == '') {
        return null;
      }
      return `${open[tag]}${text}${close[tag]}`
    });
    result = result.join(``);
    return React.createElement(
      'div',
      { className: 'diff-result',
        style: style.div,
        dangerouslySetInnerHTML: {__html: result}
      }
    );
  }
};
