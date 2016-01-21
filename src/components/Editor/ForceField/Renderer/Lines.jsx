import React, {Component} from 'react';
import PropTypes from 'PropTypes';
import ForceFieldDescriptor from 'ForceFieldDescriptor';
import Anatomy from 'ForceFieldAnatomy';

import {allowCustomAttributes} from 'utils';
import DOMProperty from 'react/lib/DOMProperty';

allowCustomAttributes(DOMProperty, ['stroke-dasharray']);

class Line extends Component {

  render() {
    const from = this.props.from;
    const to = this.props.to;
    const GU = this.props.gridUnit;
    const className = this.props.className;
    if(this.props.dashed) {
      return <line className={className} stroke-dasharray="5, 5" stroke={'black'} strokeWidth={2} x1={from.x * GU} y1={-from.y * GU} x2={to.x * GU} y2={-to.y * GU} />;
    } else {
      return <line className={className} stroke={'black'} strokeWidth={2} x1={from.x * GU} y1={-from.y * GU} x2={to.x * GU} y2={-to.y * GU} />;
    }
    
  }
}

Line.propTypes = {
  gridUnit: PropTypes.number.isRequired,
  from: PropTypes.point.isRequired,
  to: PropTypes.point.isRequired,
  dashed: PropTypes.bool,
  className: PropTypes.string,
};

function P(x, y) {
  return {
    x: x,
    y: y,
  };
}

export default class Lines extends Component {


  render() {
    /*eslint no-magic-numbers:0*/

    const GU = this.props.gridUnit;
    const origin = this.props.origin;
    const dotsColor = this.props.skin.dots;

    const lines = [];
    lines.push(<Line key={'core-1'} className='Lines-core' from={P(-5, 5)} to={P(5, 5)} gridUnit={GU} />);
    lines.push(<Line key={'core-2'} className='Lines-core' from={P(5, 5)} to={P(5, -5)} gridUnit={GU} />);
    lines.push(<Line key={'core-3'} className='Lines-core' from={P(5, -5)} to={P(-5, -5)} gridUnit={GU} />);
    lines.push(<Line key={'core-4'} className='Lines-core' from={P(-5, -5)} to={P(-5, 5)} gridUnit={GU} />);

    Anatomy.QUADRANTS.forEach((quadrant) => {

      let x1 = 0 * quadrant.coefficient.x;
      let y1 = Anatomy.CENTER_RADIUS * quadrant.coefficient.y;
      let x2 = 0 * quadrant.coefficient.x;
      let y2 = 5 * quadrant.coefficient.y;
      let key = `${quadrant.deg}-1`;

      lines.push(<Line key={key} className='Lines-core' from={P(x1, y1)} to={P(x2, y2)} gridUnit={GU} />);

      x1 = Anatomy.CENTER_RADIUS * quadrant.coefficient.x;
      y1 = 0 * quadrant.coefficient.y;
      x2 = 5 * quadrant.coefficient.x;
      y2 = 0 * quadrant.coefficient.y;
      key = `${quadrant.deg}-2`;

      lines.push(<Line key={key} className='Lines-core' from={P(x1, y1)} to={P(x2, y2)} gridUnit={GU} />);

      // dashed
      x1 = 0 * quadrant.coefficient.x;
      y1 = 5 * quadrant.coefficient.y;
      x2 = 0 * quadrant.coefficient.x;
      y2 = 8.5 * quadrant.coefficient.y;
      key = `${quadrant.deg}-3`;

      lines.push(<Line key={key} className='Lines-context' dashed={true} from={P(x1, y1)} to={P(x2, y2)} gridUnit={GU} />);

      x1 = 5 * quadrant.coefficient.x;
      y1 = 0 * quadrant.coefficient.y;
      x2 = 8.5 * quadrant.coefficient.x;
      y2 = 0 * quadrant.coefficient.y;
      key = `${quadrant.deg}-4`;

      lines.push(<Line key={key} className='Lines-context' dashed={true} from={P(x1, y1)} to={P(x2, y2)} gridUnit={GU} />);

      x1 = 5 * quadrant.coefficient.x;
      y1 = 5 * quadrant.coefficient.y;
      x2 = 8 * quadrant.coefficient.x;
      y2 = 8 * quadrant.coefficient.y;
      key = `${quadrant.deg}-5`;

      lines.push(<Line key={key} className='Lines-context' from={P(x1, y1)} to={P(x2, y2)} gridUnit={GU} />);

    });

    const transform = `translate(${origin.x},${origin.y})`;
    return <g id="Lines" className="Lines" transform={transform}>{lines}</g>;
  }

}
