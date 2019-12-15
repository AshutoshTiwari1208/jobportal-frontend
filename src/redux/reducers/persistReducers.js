import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducers } from './index';

const persistConfig = {
    key: 'job_portal',
    storage : storage
}

const configPersistReducer = () => {
    return  persistReducer(persistConfig, reducers);
}

export default configPersistReducer();

