import React, {Component} from 'react';
import PropTypes from 'PropTypes';
import Anatomy from 'ForceFieldAnatomy';
import ForceFieldDescriptor from 'ForceFieldDescriptor';


function hasIntersection(a, b) {
  const intersection = new Set([...a].filter((x) => b.has(x)))
  return intersection.size;
}

export default class Grid extends Component {

  render() {

    const GU = this.props.gridUnit;
    const origin = this.props.origin;

    const dotsColor = this.props.skin.dots;
    const dotHighlights = new Set(this.props.dots || []);

    const circles = [];

    Anatomy.QUADRANTS.forEach((quadrant) => {

      for(let ix = 0; ix <= Anatomy.DOTS_PER_SIDE; ix++) {
        for(let iy = 0; iy <= Anatomy.DOTS_PER_SIDE; iy++) {

          if (ix + iy === 0) {
            continue;
          }

          const x = quadrant.coefficient.x * ix;
          const y = quadrant.coefficient.y * iy;
          const TEN = 10;
          const forceFieldDescriptor = new ForceFieldDescriptor(x / TEN, y / TEN);
          
          if(forceFieldDescriptor.isCenter()) {
            continue;
          }
          let radius = 1;
          const classNames = forceFieldDescriptor.getClassNames();
          const names = new Set(forceFieldDescriptor.getNames());

          if(hasIntersection(names, dotHighlights)) {
            radius = 4;
          }

          circles.push(<circle key={`${quadrant.deg}:${x},${y}`} className={classNames} cx={x * GU} cy={-y * GU} r={radius} stroke={dotsColor} ></circle>);

        }
      }

    });

    const transform = `translate(${origin.x},${origin.y})`;
    return <g id="Grid" className="Grid" transform={transform}>{circles}</g>;
  }

}
