import React from 'react';
import ForceFieldDescriptor from '../../../../ForceFieldDescriptor';
import ForceFieldAnatomy from '../../../../ForceFieldAnatomy';
import DOMProperty from 'react/lib/DOMProperty';

DOMProperty.injection.injectDOMPropertyConfig({
  isCustomAttribute: function (attributeName) {
    return (attributeName === 'filter' || 'flood-color');
  }
});

export default React.createClass({


  statics: {
    getDefs: function() {
      return [<filter key="lables-defs-filter" x="-0.1" y="-0.1" width="1.2" height="1.2" id="solid">
      <feFlood flood-color="white"/>
      <feComposite in="SourceGraphic"/>
    </filter>]

    }
  },

  render: function() {

    const fieldSize = this.props.fieldSize;
    const GU = this.props.gridUnit;
    const origin = {x: Math.floor(this.props.stageWidth / 2), y: Math.floor(this.props.stageHeight / 2)};
    const dotsColor = this.props.skin.dots;
    const highlights = new Set(this.props.highlights || []);

    const LABEL_HEIGHT = 18;

    let labels = [];

    ForceFieldAnatomy.QUADRANTS.forEach(function(quadrant) {

      let x = 8 * quadrant.coefficient.x;
      let y = 8 * quadrant.coefficient.y;
      let textAnchor = quadrant.coefficient.x > 0 ? 'start' : 'end';
      let considerHeight = quadrant.coefficient.y > 0 ? 0 : 0.5;

      labels.push(<text key={quadrant.name} className={`Labels-character Labels-${quadrant.name}`} x={x * GU} y={-y * GU + considerHeight * LABEL_HEIGHT} textAnchor={textAnchor}>{quadrant.name}</text>)

      x = 4.5 * quadrant.coefficient.x;
      y = 5.5 * quadrant.coefficient.y;
      textAnchor = quadrant.coefficient.x > 0 ? 'end' : 'start';
      considerHeight = quadrant.coefficient.y > 0 ? 0 : 0.5;
      labels.push(<text key={quadrant.labels[0]} filter="url(#solid)" className={`Labels-context Labels-${quadrant.labels[0]}`} x={x * GU} y={-y * GU + considerHeight * LABEL_HEIGHT} textAnchor={textAnchor}>{quadrant.labels[0]}</text>)

      x = 5.5 * quadrant.coefficient.x;
      y = 4.5 * quadrant.coefficient.y;
      textAnchor = quadrant.coefficient.x > 0 ? 'start' : 'end';
      considerHeight = quadrant.coefficient.y > 0 ? 0.5 : 0;
      labels.push(<text key={quadrant.labels[1]} filter="url(#solid)" className={`Labels-context Labels-${quadrant.labels[1]}`} x={x * GU} y={-y * GU + considerHeight * LABEL_HEIGHT} textAnchor={textAnchor}>{quadrant.labels[1]}</text>)

      x = 2.5 * quadrant.coefficient.x;
      y = 2.5 * quadrant.coefficient.y;
      considerHeight = quadrant.coefficient.y > 0 ? 0 : 0.5;
      textAnchor = 'middle';
      labels.push(<text key={quadrant.labels[2]} className={`Labels-core Labels-${quadrant.labels[2]}`} x={x * GU} y={-y * GU + considerHeight * LABEL_HEIGHT} textAnchor={textAnchor}>{quadrant.labels[2]}</text>)

    });

    let transform = 'translate(' + origin.x + ',' + origin.y + ')';
    return <g id="Labels" className="Labels" transform={transform}>{labels}</g>;
  }

});
