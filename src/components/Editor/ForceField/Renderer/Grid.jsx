import React from 'react';
import ForceFieldDescriptor from '../../../../ForceFieldDescriptor';
import ForceFieldAnatomy from '../../../../ForceFieldAnatomy';

export default React.createClass({


  render: function() {

    const fieldSize = this.props.fieldSize;
    const GU = this.props.gridUnit;
    const origin = {x: this.props.stageWidth / 2, y: this.props.stageHeight / 2};
    const dotsColor = this.props.skin.dots;
    const dotHighlights = new Set(this.props.dots || []);

    let circles = [];

    ForceFieldAnatomy.QUADRANTS.forEach(function(quadrant) {

      for(let ix = 0; ix < 10; ix++) {
        for(let iy = 0; iy < 10; iy++) {

          if (ix + iy == 0) {
            continue;
          }

          let x = quadrant.coefficient.x * ix;
          let y = quadrant.coefficient.y * iy;
          let forceFieldDescriptor = new ForceFieldDescriptor(x / 10, y / 10);
          var radius = 1;
          if(forceFieldDescriptor.isCenter()) {
            continue;
          }
          const classNames = forceFieldDescriptor.getClassNames();
          const names = new Set(forceFieldDescriptor.getNames());

          let intersection = new Set([...names].filter(x => dotHighlights.has(x)));

          if(intersection.size) {
            radius = 4;
          }

          circles.push(<circle key={`${quadrant.deg}:${x},${y}`} className={classNames} cx={x * GU} cy={-y * GU} r={radius} stroke={dotsColor} ></circle>)

        }
      }

    });

    let transform = 'translate(' + origin.x + ',' + origin.y + ')';
    return <g id="Grid" className="Grid" transform={transform}>{circles}</g>;
  }

});
