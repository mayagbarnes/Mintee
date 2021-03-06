import { combineReducers } from 'redux';
import entitiesReducer from './entities_ui/entities_reducer';
import errorsReducer from './errors/errors_reducer';
import sessionReducer from './session_reducer';
import uiReducer from './entities_ui/ui_reducer';

export default combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer,
    ui: uiReducer,
});

