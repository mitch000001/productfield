import React, {Component} from 'react';
import Anatomy from 'ForceFieldAnatomy';

export default class Marker extends Component {

  render() {

    /*eslint no-magic-numbers:0*/

    const GU = this.props.gridUnit;
    const origin = this.props.origin;
    const skin = this.props.skin;

    const circleRadius = Anatomy.CENTER_RADIUS;
    
    const groups = [];

    Anatomy.QUADRANTS.forEach((quadrant) => {

      const deg = quadrant.deg;
      const transform = `rotate(${deg})`;
      const characterMarkerCoordinates = [8 * GU + 1/2 * GU , -8 * GU, 8 * GU, -8 * GU, 8 * GU, -8 * GU - 1/2 * GU].join();

      groups.push(
        <g key={deg} transform={transform}>
          <polyline points={characterMarkerCoordinates} strokeWidth='3' fill='none' stroke={skin.marker} />
          <circle r='6' cx={5 * GU} cy={-5 * GU} fill={skin.marker} />
        </g>
      );

    });

    groups.push(
      <circle key={'circle'} cx={0} cy={0} r={circleRadius * GU} fill='none' strokeWidth='3' stroke={this.props.skin.marker} />
    );

    const transform = `translate(${origin.x},${origin.y})`;
    return <g id="Marker" className="Marker" transform={transform}>{groups}</g>;

  }
}