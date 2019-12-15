import { combineReducers } from 'redux';
import authreducer from './auth';

export const reducers = combineReducers({
    auth: authreducer
})