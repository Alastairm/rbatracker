import React from 'react';
import Diff from 'text-diff';

export default class StatementDiff extends React.Component {
 render() {
    var id = 0
    var diff = new Diff();
    let diffText = diff.main(this.props.statementA, this.props.statementB);
    diff.cleanupSemantic(diffText);

    var result = diffText.map(function (part) {
      id ++;
      return React.createElement(
        part[0]==0 ? 'span' : part[0]==1 ? 'ins' : 'del',
        {
          style: part[0]==0 ? style.span : part[0]==1 ? style.ins : style.del,
          key: String(id)
        },
        part[1]
      );
    });

    return React.createElement(
      'div',
      { className: 'diff-result',
        style: style.div,
      },
      result
    );
  }
};


const style = {
  span: {
    backgroundColor: 'white',
  },
  ins: {
    backgroundColor: 'lightgreen',
    textDecoration: 'none',
  },
  del: {
    backgroundColor: 'salmon',
  },
  div: {},
}
