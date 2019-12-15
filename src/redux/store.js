import reducers from './reducers/persistReducers';
import { compose, applyMiddleware, createStore} from 'redux';
import { persistStore } from 'redux-persist';
import middlewares from '../middlewares';

const configureStore = () => {

    const enhancers = compose(applyMiddleware(...middlewares))
    
    const store = createStore(
        reducers,
        enhancers
    )

    const persistor =  persistStore(store);

    return { store, persistor}
}

export default configureStore();