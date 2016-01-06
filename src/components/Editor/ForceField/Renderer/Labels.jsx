import React from 'react';
import ForceFieldDescriptor from '../../../../ForceFieldDescriptor';
import ForceFieldAnatomy from '../../../../ForceFieldAnatomy';

export default React.createClass({


  render: function() {

    const fieldSize = this.props.fieldSize;
    const GU = this.props.gridUnit;
    const origin = {x: this.props.stageWidth / 2, y: this.props.stageHeight / 2};
    const dotsColor = this.props.skin.dots;
    const highlights = new Set(this.props.highlights || []);

    const LABEL_HEIGHT = 18;

    let labels = [];

    ForceFieldAnatomy.QUADRANTS.forEach(function(quadrant) {

      let x = 8 * quadrant.coefficient.x;
      let y = 8 * quadrant.coefficient.y;
      let textAnchor = quadrant.coefficient.x > 0 ? 'start' : 'end';
      let considerHeight = quadrant.coefficient.y > 0 ? 0 : 0.5;

      labels.push(<text className="Labels-character" x={x * GU} y={-y * GU + considerHeight * LABEL_HEIGHT} textAnchor={textAnchor}>{quadrant.name}</text>)

      x = 4.5 * quadrant.coefficient.x;
      y = 5.5 * quadrant.coefficient.y;
      textAnchor = quadrant.coefficient.x > 0 ? 'end' : 'start';
      considerHeight = quadrant.coefficient.y > 0 ? 0 : 0.5;
      labels.push(<text className="Labels-context" x={x * GU} y={-y * GU + considerHeight * LABEL_HEIGHT} textAnchor={textAnchor}>{quadrant.labels[0]}</text>)

      x = 5.5 * quadrant.coefficient.x;
      y = 4.5 * quadrant.coefficient.y;
      textAnchor = quadrant.coefficient.x > 0 ? 'start' : 'end';
      considerHeight = quadrant.coefficient.y > 0 ? 0.5 : 0;
      labels.push(<text className="Labels-context" x={x * GU} y={-y * GU + considerHeight * LABEL_HEIGHT} textAnchor={textAnchor}>{quadrant.labels[1]}</text>)

      x = 2.5 * quadrant.coefficient.x;
      y = 2.5 * quadrant.coefficient.y;
      considerHeight = quadrant.coefficient.y > 0 ? 0 : 0.5;
      textAnchor = 'middle';
      labels.push(<text className="Labels-context" x={x * GU} y={-y * GU + considerHeight * LABEL_HEIGHT} textAnchor={textAnchor}>{quadrant.labels[2]}</text>)

    });

    let transform = 'translate(' + origin.x + ',' + origin.y + ')';
    return <g id="Labels" transform={transform}>{labels}</g>;
  }

});
