/**
 * Called in response to Slider changes to alter the matrix size, if the
 * new value is different than the old.
 *
 * @param inWhichDimension Which way the matrix is to expand ("across" or
 *                         "down").
 * @param inValue          The new number of tiles in that dimension.
 */
module.exports = function(inWhichDimension, inValue) {

  switch (inWhichDimension) {
    case "across":
      if (inValue !== this.state.numberOfTilesAcross) {
        // Use callback form of setState() so that the call to buildMatrix()
        // is deterministic.
        // noinspection JSUnresolvedVariable
        this.setState({ numberOfTilesAcross : inValue },
            global.buildMatrix
        );
      }
    break;
    case "down":
      if (inValue !== this.state.numberOfTilesDown) {
        // Use callback form of setState() so that the call to buildMatrix()
        // is deterministic.
        // noinspection JSUnresolvedVariable
        this.setState({ numberOfTilesDown : inValue },
          global.buildMatrix
        );
      }
    break;
  }

};
