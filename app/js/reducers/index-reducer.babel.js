// Redux utility functions
import { combineReducers } from 'redux';
// redux-undo higher-order reducer
import undoable from 'redux-undo';

import resizeReducer    from './resize-reducer';
import pointsReducer    from './points-reducer';
import pointControlsReducer  from './point-controls-reducer';

const UNDOABLE_OPTS = {
  limit: 10,
  filter: function filterActions(action, currState, history) {
    return action.isRecord; // only add to history if isRecord set on action
  },
  debug: false
};

const reducer = combineReducers({
  pointControls: undoable(pointControlsReducer, { ...UNDOABLE_OPTS }),
  resize:        resizeReducer,
  points:        undoable(pointsReducer, { ...UNDOABLE_OPTS })
});

export default reducer;