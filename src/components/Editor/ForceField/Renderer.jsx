import React from 'react';

import Grid from './Renderer/Grid';
import Marker from './Renderer/Marker';
import Lines from './Renderer/Lines';
import Labels from './Renderer/Labels';
import Areas from './Renderer/Areas';
import Forces from './Renderer/Forces';

var defaultVisibility = ['Grid', 'Marker', 'Lines', 'Areas', 'Labels']

export default React.createClass({

  statics: {
    visibility: defaultVisibility
  },

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    gridUnit: React.PropTypes.number.isRequired,
    fieldSize: React.PropTypes.number.isRequired,
    normalizeCoordinates: React.PropTypes.func.isRequired,
    skin: React.PropTypes.object.isRequired,
    highlights: React.PropTypes.array,
    lables: React.PropTypes.array,
    dots: React.PropTypes.array,
    visibility: React.PropTypes.array
  },

  defaultProps: {
    highlights: ['all'],
    lables: ['all'],
    lables: ['all'],
    visibility: defaultVisibility
  },

  isVisible: function(name) {
    return (this.props.visibility.indexOf(name) != -1)
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

    this.props.lines.forEach(function(name) {
      classNames.push('line-' + name);
    });
    var className = classNames.join(' ');

    const offsetX = Math.floor(this.props.width / 2 - this.props.fieldSize / 2) % this.props.gridUnit
    const offsetY = Math.floor(this.props.height / 2 - this.props.fieldSize / 2) % this.props.gridUnit

    let defs = Areas.getDefs()
              .concat(Labels.getDefs())
              .concat(Grid.getDefs(this.props.gridUnit, offsetX, offsetY))

    return <svg className={className} width={this.props.width} height={this.props.height} viewBox={"0 0 " + this.props.width + " " + this.props.height} style={rendererStyles}>
      <defs>{defs}</defs>
      { this.isVisible('Grid') ?
        <g>
          <rect width={this.props.width} height={this.props.height} fill="url(#dots)" />
          <Grid stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} normalizeCoordinates={this.props.normalizeCoordinates} skin={this.props.skin} dots={this.props.dots} />
        </g>
      : null }
      { this.isVisible('Marker') ?
        <Marker stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} skin={this.props.skin} />
      : null }
      { this.isVisible('Lines') ?
        <Lines stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} skin={this.props.skin} />
      : null }
      { this.isVisible('Areas') ?
        <Areas stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} normalizeCoordinates={this.props.normalizeCoordinates} skin={this.props.skin} />
      : null }
      { this.isVisible('Labels') ?
        <Labels stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} normalizeCoordinates={this.props.normalizeCoordinates} skin={this.props.skin} />
      : null }
      { this.isVisible('Forces') ?
        <Forces stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} normalizeCoordinates={this.props.normalizeCoordinates} skin={this.props.skin} />
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


