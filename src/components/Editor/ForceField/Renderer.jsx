import React from 'react';

import Marker from './Renderer/Marker';
import Grid from './Renderer/Grid';
import Forces from './Renderer/Forces';

export default React.createClass({

  render: function() {
    var rendererStyles = this.getRendererStyle();

    return <svg style={rendererStyles}>
      <Grid stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} normalizeCoordinates={this.props.normalizeCoordinates}  skin={this.props.skin} />
      <Marker stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} skin={this.props.skin} />
      { this.props.visibility.forces ?
        <Forces stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} normalizeCoordinates={this.props.normalizeCoordinates}  skin={this.props.skin} />
      : null }
    </svg>;
  },

  getRendererStyle: function() {
    return {
      height: this.props.height,
      width: '100%',
      backgroundColor: this.props.skin.background
    }
  }
});
