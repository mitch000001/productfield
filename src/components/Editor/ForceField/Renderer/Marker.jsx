import React from 'react';
import ForceFieldAnatomy from '../../../../ForceFieldAnatomy';

export default React.createClass({

  render: function() {

    const fieldSize = this.props.fieldSize;
    const GU = this.props.gridUnit;
    const origin = {x: this.props.stageWidth / 2, y: this.props.stageHeight / 2};

    const circleRadius = ForceFieldAnatomy.CENTER_RADIUS;
    // circelA = 14 => r = 2.11 für contextA = 21.5 == coreA = 5*5 - 1/4 circleA
    // const circleRadius = 2.11 * this.props.gridUnit;

    const gridUnit = this.props.gridUnit;
    
    var groups = [];
    var props = this.props;

    ForceFieldAnatomy.QUADRANTS.forEach(function(quadrant) {

      var deg = quadrant.deg;
      var transform = "rotate(" + deg + ")";
      var characterMarkerCoordinates = [8 * GU + 1/2 * GU , -8 * GU, 8 * GU, -8 * gridUnit, 8 * gridUnit, -8 * gridUnit - 1/2 * gridUnit].join()

      groups.push(
        <g key={deg} transform={transform}>
        <polyline points={characterMarkerCoordinates} strokeWidth='3' fill='none' stroke={props.skin.marker} />
        <circle r='6' cx={5 * GU} cy={-5 * GU} fill={props.skin.marker} />
        </g>
      );

    });

    groups.push(
      <circle key={'circle'} cx={0} cy={0} r={circleRadius * GU} fill='none' strokeWidth='3' stroke={this.props.skin.marker} />
    )

    let transform = 'translate(' + origin.x + ',' + origin.y + ')';
    return <g className="Marker" transform={transform}>{groups}</g>;

  }
});