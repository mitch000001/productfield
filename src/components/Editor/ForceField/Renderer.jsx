import React from 'react';

import Grid from './Renderer/Grid';
import Marker from './Renderer/Marker';
import Lines from './Renderer/Lines';
import Labels from './Renderer/Labels';
import Areas from './Renderer/Areas';
import Forces from './Renderer/Forces';

import {Crosshatch, Stripe, Dots} from './Renderer/Defs/Patterns';
import {Circle} from './Renderer/Defs/Masks';
import {Solid} from './Renderer/Defs/Filters';

import {allowCustomAttributes} from 'utils';
import DOMProperty from 'react/lib/DOMProperty';

allowCustomAttributes(DOMProperty, ['mask', 'maskUnits']);

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
    const origin = {x: Math.floor(this.props.width / 2), y: Math.floor(this.props.height / 2)};

    let defsProps = {
      gridUnit: this.props.gridUnit,
      offset: {x: offsetX, y: offsetY},
      origin: origin,
      size: {width: this.props.width, height: this.props.height},
    }
    return <svg className={className} width={this.props.width} height={this.props.height} viewBox={"0 0 " + this.props.width + " " + this.props.height} style={rendererStyles}>
      <defs>
        <Solid {...defsProps} />
        <Circle {...defsProps} />
        <Crosshatch {...defsProps} />
        <Stripe {...defsProps} />
        <Dots {...defsProps} />
      </defs>
      { this.isVisible('Grid') ?
        <g>
          <rect mask={"url(#circle)"} width={this.props.width} height={this.props.height} fill="url(#dots)" />
          <Grid origin={origin} gridUnit={this.props.gridUnit} skin={this.props.skin} dots={this.props.dots} />
        </g>
      : null }
      { this.isVisible('Marker') ?
        <Marker origin={origin} gridUnit={this.props.gridUnit} skin={this.props.skin} />
      : null }
      { this.isVisible('Lines') ?
        <Lines origin={origin} gridUnit={this.props.gridUnit} skin={this.props.skin} />
      : null }
      { this.isVisible('Areas') ?
        <g mask={"url(#circle)"}>
          <Areas origin={origin} gridUnit={this.props.gridUnit} skin={this.props.skin} />
        </g>
      : null }
      { this.isVisible('Labels') ?
        <Labels origin={origin} gridUnit={this.props.gridUnit} skin={this.props.skin} />
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


