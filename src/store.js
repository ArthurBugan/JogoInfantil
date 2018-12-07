import { composeWithDevTools } from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
// import createSagaMiddleware from 'redux-saga';
import Reactotron from 'reactotron-react-native';
import reducer from 'Redux/Reducers';
import rootSaga from 'Redux/Sagas';
// import './ReactotronConfig';

// let sagaMiddleware = createSagaMiddleware();
// let composeEnhancers = compose;

// const sagaMonitor = Reactotron.createSagaMonitor();
// sagaMiddleware = createSagaMiddleware({ sagaMonitor });
//
// const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

export default function configureStore(initialState) {
  let store = createStore(reducer, initialState);
  // if (__DEV__) {
  //   store = Reactotron.createStore(reducer, initialState, enhancer);
  // }

  // sagaMiddleware.run(rootSaga);
  return store;
}
