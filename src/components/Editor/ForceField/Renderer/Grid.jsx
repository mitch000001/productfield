import React from 'react';
import ForceFieldDescriptor from '../../../../ForceFieldDescriptor';

export default React.createClass({


  render: function() {

    const fieldSize = this.props.fieldSize;
    const GU = this.props.gridUnit;
    const origin = {x: this.props.stageWidth / 2, y: this.props.stageHeight / 2};
    const dotsColor = this.props.skin.dots;
    let circles = [];

    [{x: 1, y: 1}, {x: 1, y: -1}, {x: -1, y: -1}, {x: -1, y: 1}].forEach(function(quadrantCoefficient) {

      for(let ix = 0; ix < 10; ix++) {
        for(let iy = 0; iy < 10; iy++) {

          let x = quadrantCoefficient.x * ix;
          let y = quadrantCoefficient.y * iy;
          let forceFieldDescriptor = new ForceFieldDescriptor(x / 10, y / 10);
          let radius = 1;
          if(forceFieldDescriptor.isCenter()) {
            continue;
          }
          if(forceFieldDescriptor.isContext()) {
            radius = 1.5;
          }
          const classNames = forceFieldDescriptor.getClassNames();
          circles.push(<circle key={`${x},${y}`} className={classNames} cx={x * GU} cy={-y * GU} r={radius} stroke={dotsColor} ></circle>)
        }
      }

    });

    let transform = 'translate(' + origin.x + ',' + origin.y + ')';
    return <g id="Grid-dots" transform={transform}>{circles}</g>;
  }

});
