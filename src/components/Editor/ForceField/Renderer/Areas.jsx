import React, {Component, PropTypes} from 'react';
import ForceFieldAnatomy from 'ForceFieldAnatomy';

function convertPointsToScaledSvgPath(points, GU) {
  points.map(
      (point) => {
        return Array(point[0] * GU, -point[1] * GU);
      }
    )
    .reduce(
      (a, b) => {
        return a.concat(b);
      }
    , [])
    .join(',');
}

export default class Areas extends Component {

  render() {

    /*eslint no-magic-numbers:0*/

    const GU = this.props.gridUnit;
    const origin = {x: Math.floor(this.props.stageWidth / 2), y: Math.floor(this.props.stageHeight / 2)};

    const groups = [];

    const s = 5;
     groups.push(
        <g key={'core'} className={'Areas-core'}>
          <rect className={'Areas-core Areas-problem'} x={0} y={-s * GU} width={s * GU} height={s * GU} />
          <rect className={'Areas-core Areas-competition'} x={0} y={0} width={s * GU} height={s * GU} />
          <rect className={'Areas-core Areas-solution'} x={-s * GU} y={0} width={s * GU} height={s * GU} />
          <rect className={'Areas-core Areas-uniqueness'} x={-s * GU} y={-s * GU} width={s * GU} height={s * GU} />
        </g>
      );

    const gridContextPoints1 = convertPointsToScaledSvgPath([[0,5], [0,8.5], [8,8.5], [8,8], [5,5]], GU);

    const gridContextPoints2 = convertPointsToScaledSvgPath([[5,5], [8,8], [8.5,8], [8.5,0], [5,0]], GU);

    ForceFieldAnatomy.QUADRANTS.forEach((quadrant) => {

      const deg = quadrant.deg;
      const transform = `rotate(${deg})`;

      const w = 5 * quadrant.coefficient.x;
      const h = 5 * quadrant.coefficient.y;

      let labelIndex1 = 0;
      let labelIndex2 = 1;
      if(deg === 90 || deg === 270) {
        labelIndex1 = 1;
        labelIndex2 = 0;
      }

      groups.push(
        <g key={`${deg}'-1'`} transform={transform}>
          <polygon className={`Areas-context Areas-${quadrant.labels[labelIndex1]}`} points={gridContextPoints1} />
          <polygon className={`Areas-context Areas-${quadrant.labels[labelIndex2]}`} points={gridContextPoints2} />
        </g>
      );

    });

    const transform = `translate(${origin.x},${origin.y})`;
    return <g id="Areas" className="Areas" transform={transform}>{groups}</g>;
  }

}

Areas.propTypes = {
  gridUnit: PropTypes.number.isRequired,
  origin: PropTypes.object.isRequired,
};
