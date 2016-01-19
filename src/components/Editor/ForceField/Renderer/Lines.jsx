import React from 'react';
import ForceFieldDescriptor from '../../../../ForceFieldDescriptor';
import ForceFieldAnatomy from '../../../../ForceFieldAnatomy';
import DOMProperty from 'react/lib/DOMProperty';

// wating for https://github.com/facebook/react/pull/5714/files in react 0.15.0
// for now:
// https://github.com/facebook/react/issues/1657#issuecomment-70786561

DOMProperty.injection.injectDOMPropertyConfig({
  isCustomAttribute: function (attributeName) {
    return (attributeName === 'stroke-dasharray');
  }
});

var Line = React.createClass({

  propTypes: {
    GU: React.PropTypes.number,
    from: React.PropTypes.object,
    to: React.PropTypes.object,
    dashed: React.PropTypes.bool,
    className: React.PropTypes.string
  },

  render: function() {
    let from = this.props.from;
    let to = this.props.to;
    let GU = this.props.gridUnit;
    let className = this.props.className;
    if(this.props.dashed) {
      return <line className={className} stroke-dasharray="5, 5" stroke={'black'}  strokeWidth={2} x1={from.x * GU} y1={-from.y * GU} x2={to.x * GU} y2={-to.y * GU} />
    } else {
      return <line className={className} stroke={'black'} strokeWidth={2} x1={from.x * GU} y1={-from.y * GU} x2={to.x * GU} y2={-to.y * GU} />
    }
    
  }
});

function getLine(from, to, GU) {
  return <line stroke-dasharray="5, 5" stroke={'black'} strokeWidth={2} x1={from.x * GU} y1={-from.y * GU} x2={to.x * GU} y2={-to.y * GU} />
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
    const origin = {x: Math.floor(this.props.stageWidth / 2), y: Math.floor(this.props.stageHeight / 2)};
    const dotsColor = this.props.skin.dots;
    const highlights = new Set(this.props.highlights || []);

    let lines = [];
    lines.push(<Line key={'core-1'} className='Lines-core' from={P(-5, 5)} to={P(5, 5)} gridUnit={GU} />);
    lines.push(<Line key={'core-2'} className='Lines-core' from={P(5, 5)} to={P(5, -5)} gridUnit={GU} />);
    lines.push(<Line key={'core-3'} className='Lines-core' from={P(5, -5)} to={P(-5, -5)} gridUnit={GU} />);
    lines.push(<Line key={'core-4'} className='Lines-core' from={P(-5, -5)} to={P(-5, 5)} gridUnit={GU} />);

    ForceFieldAnatomy.QUADRANTS.forEach(function(quadrant) {

      let x1 = 0 * quadrant.coefficient.x;
      let y1 = ForceFieldAnatomy.CENTER_RADIUS * quadrant.coefficient.y;
      let x2 = 0 * quadrant.coefficient.x;
      let y2 = 5 * quadrant.coefficient.y;
      let key = quadrant.deg + '-1';

      lines.push(<Line key={key} className='Lines-core' from={P(x1, y1)} to={P(x2, y2)} gridUnit={GU} />);

      x1 = ForceFieldAnatomy.CENTER_RADIUS * quadrant.coefficient.x;
      y1 = 0 * quadrant.coefficient.y;
      x2 = 5 * quadrant.coefficient.x;
      y2 = 0 * quadrant.coefficient.y;
      key = quadrant.deg + '-2';

      lines.push(<Line key={key} className='Lines-core' from={P(x1, y1)} to={P(x2, y2)} gridUnit={GU} />);

      // dashed
      x1 = 0 * quadrant.coefficient.x;
      y1 = 5 * quadrant.coefficient.y;
      x2 = 0 * quadrant.coefficient.x;
      y2 = 8.5 * quadrant.coefficient.y;
      key = quadrant.deg + '-3';

      lines.push(<Line key={key} className='Lines-context' dashed={true} from={P(x1, y1)} to={P(x2, y2)} gridUnit={GU} />);

      x1 = 5 * quadrant.coefficient.x;
      y1 = 0 * quadrant.coefficient.y;
      x2 = 8.5 * quadrant.coefficient.x;
      y2 = 0 * quadrant.coefficient.y;
      key = quadrant.deg + '-4';

      lines.push(<Line key={key} className='Lines-context' dashed={true} from={P(x1, y1)} to={P(x2, y2)} gridUnit={GU} />);

      x1 = 5 * quadrant.coefficient.x;
      y1 = 5 * quadrant.coefficient.y;
      x2 = 8 * quadrant.coefficient.x;
      y2 = 8 * quadrant.coefficient.y;
      key = quadrant.deg + '-5';

      lines.push(<Line key={key} className='Lines-context' from={P(x1, y1)} to={P(x2, y2)} gridUnit={GU} />);

      //lines.push(<text className="Labels-character" x={x * GU} y={-y * GU + considerHeight * LABEL_HEIGHT} textAnchor={textAnchor}>{quadrant.name}</text>)

    });

    let transform = 'translate(' + origin.x + ',' + origin.y + ')';
    return <g id="Lines" className="Lines" transform={transform}>{lines}</g>;
  }

});
