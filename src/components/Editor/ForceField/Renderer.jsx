import React from 'react';

import Grid from './Renderer/Grid';
import Marker from './Renderer/Marker';
import Lines from './Renderer/Lines';
import Labels from './Renderer/Labels';
import Areas from './Renderer/Areas';
import Forces from './Renderer/Forces';

export default React.createClass({

  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    gridUnit: React.PropTypes.number,
    fieldSize: React.PropTypes.number,
    normalizeCoordinates: React.PropTypes.func,
    highlights: React.PropTypes.array,
    lables: React.PropTypes.array,
    dots: React.PropTypes.array,
    skin: React.PropTypes.object
  },

  render: function() {
    var rendererStyles = this.getRendererStyle();

    var classNames = [];
    this.props.highlights.forEach(function(name) {
      classNames.push('highlight-' + name);
    });

    this.props.labels.forEach(function(name) {
      classNames.push('label-' + name);
    });
    var className = classNames.join(' ');

    return <svg className={className} width={this.props.width} height={this.props.height} viewBox={"0 0 " + this.props.width + " " + this.props.height} style={rendererStyles}>
      <Grid stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} normalizeCoordinates={this.props.normalizeCoordinates} skin={this.props.skin} dots={this.props.dots} />
      <Marker stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} skin={this.props.skin} />
      <Lines stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} skin={this.props.skin} />
      <Areas stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} normalizeCoordinates={this.props.normalizeCoordinates} skin={this.props.skin} />
      <Labels stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} normalizeCoordinates={this.props.normalizeCoordinates} skin={this.props.skin} />
      { this.props.visibility.forces ?
        <Forces stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} normalizeCoordinates={this.props.normalizeCoordinates}  skin={this.props.skin} />
      : null }
    </svg>;
  },

  getRendererStyle: function() {
    return {
      height: this.props.height,
      width: this.props.width,
      backgroundColor: this.props.skin.background
    }
  }
});
