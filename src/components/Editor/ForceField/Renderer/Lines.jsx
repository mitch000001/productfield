import React from 'react';
import ForceFieldDescriptor from '../../../../ForceFieldDescriptor';
import ForceFieldAnatomy from '../../../../ForceFieldAnatomy';

function getLine(from, to, GU) {
  return <line stroke={'black'} strokeWidth={2} x1={from.x * GU} y1={-from.y * GU} x2={to.x * GU} y2={-to.y * GU} />
}

function P(x, y) {
  return {
    x: x,
    y: y
  }
}

export default React.createClass({


  render: function() {

    const fieldSize = this.props.fieldSize;
    const GU = this.props.gridUnit;
    const origin = {x: this.props.stageWidth / 2, y: this.props.stageHeight / 2};
    const dotsColor = this.props.skin.dots;
    const highlights = new Set(this.props.highlights || []);

    let lines = [];
    lines.push(getLine(P(-5, 5), P(5, 5), GU));
    lines.push(getLine(P(5, 5), P(5, -5), GU));
    lines.push(getLine(P(5, -5), P(-5, -5), GU));
    lines.push(getLine(P(-5, -5), P(-5, 5), GU));

    ForceFieldAnatomy.QUADRANTS.forEach(function(quadrant) {

      let x1 = 0 * quadrant.coefficient.x;
      let y1 = 1.8 * quadrant.coefficient.y;
      let x2 = 0 * quadrant.coefficient.x;
      let y2 = 5 * quadrant.coefficient.y;

      lines.push(getLine(P(x1, y1), P(x2, y2), GU));

      x1 = 1.8 * quadrant.coefficient.x;
      y1 = 0 * quadrant.coefficient.y;
      x2 = 5 * quadrant.coefficient.x;
      y2 = 0 * quadrant.coefficient.y;

      lines.push(getLine(P(x1, y1), P(x2, y2), GU));

      // dashed
      x1 = 0 * quadrant.coefficient.x;
      y1 = 5 * quadrant.coefficient.y;
      x2 = 0 * quadrant.coefficient.x;
      y2 = 8.5 * quadrant.coefficient.y;

      lines.push(getLine(P(x1, y1), P(x2, y2), GU));

      x1 = 5 * quadrant.coefficient.x;
      y1 = 0 * quadrant.coefficient.y;
      x2 = 8.5 * quadrant.coefficient.x;
      y2 = 0 * quadrant.coefficient.y;

      lines.push(getLine(P(x1, y1), P(x2, y2), GU));

      x1 = 5 * quadrant.coefficient.x;
      y1 = 5 * quadrant.coefficient.y;
      x2 = 8 * quadrant.coefficient.x;
      y2 = 8 * quadrant.coefficient.y;

      lines.push(getLine(P(x1, y1), P(x2, y2), GU));

      //lines.push(<text className="Labels-character" x={x * GU} y={-y * GU + considerHeight * LABEL_HEIGHT} textAnchor={textAnchor}>{quadrant.name}</text>)

    });

    let transform = 'translate(' + origin.x + ',' + origin.y + ')';
    return <g id="Lines" transform={transform}>{lines}</g>;
  }

});
