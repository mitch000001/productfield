import React from 'react';

import Marker from './Renderer/Marker';
import Lines from './Renderer/Lines';
import Labels from './Renderer/Labels';
import Grid from './Renderer/Grid';
import Forces from './Renderer/Forces';

export default React.createClass({

  render: function() {
    var rendererStyles = this.getRendererStyle();

    return <svg width={this.props.width} height={this.props.height} viewBox={"0 0 " + this.props.width + " " + this.props.height} style={rendererStyles}>
      <Grid stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} normalizeCoordinates={this.props.normalizeCoordinates} skin={this.props.skin} highlights={this.props.highlights || []} />
      //<Marker stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} skin={this.props.skin} />
      <Lines stageWidth={this.props.width} stageHeight={this.props.height} fieldSize={this.props.fieldSize} gridUnit={this.props.gridUnit} skin={this.props.skin} />
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
